/**
 * La Base 420 - API de reservas (Google Apps Script)
 * Hojas: "Reservas" (Fecha, Hora, Consola, Jugadores, Nombre, Teléfono, Estado, Notas, Código)
 *        "Bloqueos" (Fecha, Hora, Consola, Motivo)
 * Contraseña admin: Configuración del proyecto > Propiedades del script > ADMIN_PASSWORD
 * Publicar: Implementar > Nueva implementación > Aplicación web
 *           Ejecutar como: Yo · Acceso: Cualquier persona
 * Cada cambio de código requiere una NUEVA versión de la implementación.
 */
var SLOTS = ['16:30', '17:30', '18:30', '19:30', '20:30'];
var CONSOLAS = ['PS5', 'PS4 Pro'];
var TZ = 'Europe/Madrid';

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function sheet(n) { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(n); }
function s(v) { return String(v == null ? '' : v).trim(); }
function fechaStr(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : s(v); }
function horaStr(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'HH:mm') : s(v); }
function telStr(v) { return s(v).replace(/\D/g, ''); }

function leerReservas() {
  var d = sheet('Reservas').getDataRange().getValues(); d.shift();
  return d.filter(function (r) { return r[0] !== ''; }).map(function (r) {
    return { fecha: fechaStr(r[0]), hora: horaStr(r[1]), consola: s(r[2]), jugadores: Number(r[3]),
      nombre: s(r[4]), telefono: telStr(r[5]), estado: s(r[6]), notas: s(r[7]), codigo: s(r[8]) };
  });
}
function leerBloqueos() {
  var d = sheet('Bloqueos').getDataRange().getValues(); d.shift();
  return d.filter(function (r) { return r[0] !== ''; }).map(function (r) {
    return { fecha: fechaStr(r[0]), hora: horaStr(r[1]), consola: s(r[2]), motivo: s(r[3]) };
  });
}
function ocupadas(fecha) {
  var o = [];
  leerReservas().forEach(function (r) {
    if (r.fecha === fecha && r.estado === 'Confirmada') o.push({ hora: r.hora, consola: r.consola });
  });
  leerBloqueos().forEach(function (b) {
    if (b.fecha !== fecha) return;
    (b.consola === 'Todas' ? CONSOLAS : [b.consola]).forEach(function (c) { o.push({ hora: b.hora, consola: c }); });
  });
  return o;
}
function genCodigo() {
  var a = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', c = '';
  for (var i = 0; i < 6; i++) c += a.charAt(Math.floor(Math.random() * a.length));
  return c;
}
function adminOk(p) {
  var real = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  return real && p && String(p) === real;
}
function setRow(sh, row, col, val) { sh.getRange(row, col).setValue(val); }

function doGet(e) {
  var a = (e.parameter.accion || '').toString();
  if (a === 'listar') return out({ ok: true, ocupadas: ocupadas(s(e.parameter.fecha)) });
  if (a === 'config') return out({ ok: true, slots: SLOTS, consolas: CONSOLAS });
  return out({ ok: true, mensaje: 'API La Base 420' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var b = JSON.parse(e.postData.contents);
    switch (b.accion) {
      case 'listar': return out({ ok: true, ocupadas: ocupadas(s(b.fecha)) });

      case 'crear': {
        var fecha = s(b.fecha), hora = s(b.hora), consola = s(b.consola);
        var nombre = s(b.nombre).substring(0, 80), tel = telStr(b.telefono);
        var jug = Number(b.jugadores), notas = s(b.notas).substring(0, 300);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || SLOTS.indexOf(hora) < 0 || CONSOLAS.indexOf(consola) < 0 ||
            !nombre || !/^[6-9]\d{8}$/.test(tel) || (jug !== 1 && jug !== 2))
          return out({ ok: false, error: 'Datos de reserva no válidos.' });
        if (fecha < Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'))
          return out({ ok: false, error: 'No se puede reservar en una fecha pasada.' });
        var oc = ocupadas(fecha);
        for (var i = 0; i < oc.length; i++)
          if (oc[i].hora === hora && oc[i].consola === consola)
            return out({ ok: false, error: 'Esa franja ya no está disponible. Elige otra.' });
        var cod = genCodigo(), sh = sheet('Reservas'), row = sh.getLastRow() + 1;
        sh.getRange(row, 1, 1, 9).setNumberFormat('@')
          .setValues([[fecha, hora, consola, jug, nombre, tel, 'Confirmada', notas, cod]]);
        return out({ ok: true, codigo: cod });
      }

      case 'misReservas': {
        var t = telStr(b.telefono), c = s(b.codigo).toUpperCase();
        var r = leerReservas().filter(function (x) { return x.codigo === c && x.telefono === t; })[0];
        if (!r) return out({ ok: false, error: 'No encontramos ninguna reserva con esos datos.' });
        delete r.codigo; delete r.telefono;
        return out({ ok: true, reserva: r });
      }

      case 'cancelar': {
        var t2 = telStr(b.telefono), c2 = s(b.codigo).toUpperCase();
        var all = leerReservas();
        for (var j = 0; j < all.length; j++)
          if (all[j].codigo === c2 && all[j].telefono === t2) {
            if (all[j].estado !== 'Confirmada') return out({ ok: false, error: 'La reserva ya no está activa.' });
            setRow(sheet('Reservas'), j + 2, 7, 'Cancelada');
            return out({ ok: true });
          }
        return out({ ok: false, error: 'No encontramos ninguna reserva con esos datos.' });
      }
    }

    // --- Acciones de administrador ---
    if (String(b.accion).indexOf('admin_') === 0) {
      Utilities.sleep(500); // frena fuerza bruta
      if (!adminOk(b.password)) return out({ ok: false, error: 'Contraseña incorrecta.' });
      switch (b.accion) {
        case 'admin_listar': {
          var f = s(b.fecha);
          return out({ ok: true,
            reservas: leerReservas().filter(function (x) { return x.fecha === f; })
              .sort(function (x, y) { return x.hora < y.hora ? -1 : 1; }),
            bloqueos: leerBloqueos().filter(function (x) { return x.fecha === f; }) });
        }
        case 'admin_cancelar': {
          var all2 = leerReservas(), cc = s(b.codigo).toUpperCase();
          for (var k = 0; k < all2.length; k++)
            if (all2[k].codigo === cc) { setRow(sheet('Reservas'), k + 2, 7, 'Cancelada'); return out({ ok: true }); }
          return out({ ok: false, error: 'Reserva no encontrada.' });
        }
        case 'admin_bloquear': {
          var sb = sheet('Bloqueos');
          sb.getRange(sb.getLastRow() + 1, 1, 1, 4).setNumberFormat('@')
            .setValues([[s(b.fecha), s(b.hora), s(b.consola), s(b.motivo).substring(0, 120)]]);
          return out({ ok: true });
        }
        case 'admin_desbloquear': {
          var bl = leerBloqueos();
          for (var m = 0; m < bl.length; m++)
            if (bl[m].fecha === s(b.fecha) && bl[m].hora === s(b.hora) && bl[m].consola === s(b.consola)) {
              sheet('Bloqueos').deleteRow(m + 2); return out({ ok: true });
            }
          return out({ ok: false, error: 'Bloqueo no encontrado.' });
        }
      }
    }
    return out({ ok: false, error: 'Acción desconocida.' });
  } catch (err) {
    return out({ ok: false, error: 'Error del servidor. Inténtalo de nuevo.' });
  } finally {
    lock.releaseLock();
  }
}
