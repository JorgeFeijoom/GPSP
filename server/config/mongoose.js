'use strict';

const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const config = require('./config');
var Subject = require('../models/subject.model');
var User = require('../models/user.model');

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });
console.log("++    ++      ++      Prueba      ++");
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// Create instances of Users
var alumno = new User ({
  fullname : "Alumno Prueba",
  dni : '44444444M',
  email : "jorge.feijoo101@alu.ulpgc.es",
  telefono : "661662663",
  hashedPassword : "$2b$10$NC8kZkcmyNBhIxgBoM83Tu/7I6h2zX.6GP/KEldL6cbil5IwObXwC",
  bio: "Lorem ipsum dolor sit amet alumno",
  ciudad: "Las Palmas de Gran Canaria",
  direccion: "Calle de prueba, 12",
  nacimiento: "08/10/1996",
  roles: ["alumno"]
});

var profesor = new User ({
  fullname : "Profesor Prueba",
  dni : '55555555M',
  email : "jorgefeijoom@gmail.com",
  telefono : "928333333",
  hashedPassword : "$2b$10$NC8kZkcmyNBhIxgBoM83Tu/7I6h2zX.6GP/KEldL6cbil5IwObXwC",
  bio: "Lorem ipsum dolor sit amet profesor",
  ciudad: "Las Palmas de Gran Canaria",
  direccion: "Calle de prueba, 13",
  nacimiento: "01/01/1960",
  roles: ["alumno", "profesor"]
});

var admin = new User ({
  fullname : "Jorge Feijoo",
  dni : '44747724M',
  email : "jorge.feijoo@21ninjas.es",
  telefono : "662222222",
  hashedPassword : "$2b$10$NC8kZkcmyNBhIxgBoM83Tu/7I6h2zX.6GP/KEldL6cbil5IwObXwC",
  bio: "Lorem ipsum dolor sit amet admin",
  ciudad: "Las Palmas de Gran Canaria",
  direccion: "Calle de prueba, 8",
  nacimiento: "01/01/1996",
  roles: ["alumno", "profesor", "admin"]
});

/* alumno.save(function (err) {
  if (err) return handleError(err);
  console.log("+ Alumno creado");
});

profesor.save(function (err) {
  if (err) return handleError(err);
  console.log("+ Profesor creado");
});

admin.save(function (err) {
  if (err) return handleError(err);
  console.log("+ Admin creado");
}); */


// Create instances of Subject
// Primer curso
var algebra = new Subject ({
  codigo : 40800,
  nombre : "Álgebra",
  descripcion : "0 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 1
});

var ii = new Subject ({
  codigo : 40803,
  nombre : "Introducción a la Informática",
  descripcion : "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 1
});

var fp = new Subject ({
  codigo : 40807,
  nombre : "Fundamentos de Programación",
  descripcion : "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 1
});

var fc = new Subject ({
  codigo : 40808,
  nombre : "Fundamentos de los Computadores",
  descripcion : "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 1
});

var ffi = new Subject ({
  codigo : 40806,
  nombre : "Fundamentos Físicos de la Informática",
  descripcion : "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 1
});

var mc = new Subject ({
  codigo : 40805,
  nombre : "Matemáticas Computacionales",
  descripcion : "5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 1
});

//Segundo curso
var p1 = new Subject ({
  codigo : 40813,
  nombre : "Programación I",
  descripcion : "6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 2
});

var bd1 = new Subject ({
  codigo : 40816,
  nombre : "Bases de Datos I",
  descripcion : "7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 2
});

var is1 = new Subject ({
  codigo : 40813,
  nombre : "Ingeniería del Software I",
  descripcion : "8 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 2
});

var p2 = new Subject ({
  codigo : 40818,
  nombre : "Programación II",
  descripcion : "9 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 2
});

var fso = new Subject ({
  codigo : 40814,
  nombre : "Fundamentos de los Sistemas Operativos",
  descripcion : "10 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 2
});

// Tercer curso
var aso = new Subject ({
  codigo : 40819,
  nombre : "Administración de Sistemas Operativos",
  descripcion :"11 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 3
});

var bd2 = new Subject ({
  codigo : 40821,
  nombre : "Bases de Datos II",
  descripcion :"12 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 3
});

var p3 = new Subject ({
  codigo : 40823,
  nombre : "Programación III",
  descripcion :"13 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 3
});

var p4 = new Subject ({
  codigo : 40826,
  nombre : "Programación IV",
  descripcion :"14 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 3
});

var ssr = new Subject ({
  codigo : 40824,
  nombre : "Servicios y Seguridad en Red",
  descripcion :"15 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 3
});

// Cuarto curso
var daw2 = new Subject ({
  codigo : 40863,
  nombre : "Desarrollo de Aplicaciones Web II",
  descripcion :"16 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 4
});

var mda = new Subject ({
  codigo : 40832,
  nombre : "Metodologías del Desarrollo Ágil",
  descripcion :"17 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 4
});

var as = new Subject ({
  codigo : 40829,
  nombre : "Arquitectura del Software",
  descripcion :"18 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Segundo semestre",
  creditos : 6,
  curso : 4
});

var daw1 = new Subject ({
  codigo : 40861,
  nombre : "Desarrollo de Aplicaciones Web I",
  descripcion :"19 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 4
});

var daw1 = new Subject ({
  codigo : 40830,
  nombre : "Diseño de Interfaces de Usuario",
  descripcion :"20 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  duracion : "Primer semestre",
  creditos : 6,
  curso : 4
});

// Save Subject instances, passing a callback 
/* algebra.save(function (err) {
  if (err) return handleError(err);
  console.log("Algebra creado");
});

ii.save(function (err) {
  if (err) return handleError(err);
  console.log("II creado");
});

fp.save(function (err) {
  if (err) return handleError(err);
  console.log("FP creado");
});

fc.save(function (err) {
  if (err) return handleError(err);
  console.log("FC creado");
});

ffi.save(function (err) {
  if (err) return handleError(err);
  console.log("FFI creado");
});

mc.save(function (err) {
  if (err) return handleError(err);
  console.log("MC creado");
});

p1.save(function (err) {
  if (err) return handleError(err);
  console.log("P1 creado");
});

bd1.save(function (err) {
  if (err) return handleError(err);
  console.log("BD1 creado");
});

is1.save(function (err) {
  if (err) return handleError(err);
  console.log("IS1 creado");
});

p2.save(function (err) {
  if (err) return handleError(err);
  console.log("P2 creado");
});

fso.save(function (err) {
  if (err) return handleError(err);
  console.log("FSO creado");
});

aso.save(function (err) {
  if (err) return handleError(err);
  console.log("ASO creado");
});

bd2.save(function (err) {
  if (err) return handleError(err);
  console.log("BD2 creado");
});

p3.save(function (err) {
  if (err) return handleError(err);
  console.log("P3 creado");
});

p4.save(function (err) {
  if (err) return handleError(err);
  console.log("P4 creado");
});

ssr.save(function (err) {
  if (err) return handleError(err);
  console.log("SSR creado");
});

daw2.save(function (err) {
  if (err) return handleError(err);
  console.log("DAW2 creado");
});

daw1.save(function (err) {
  if (err) return handleError(err);
  console.log("DAW1 creado");
});

mda.save(function (err) {
  if (err) return handleError(err);
  console.log("MDA creado");
});

as.save(function (err) {
  if (err) return handleError(err);
  console.log("AS creado");
});
*/