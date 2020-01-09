(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-import-import-module"],{

/***/ "./src/app/admin/admin-user-guard.ts":
/*!*******************************************!*\
  !*** ./src/app/admin/admin-user-guard.ts ***!
  \*******************************************/
/*! exports provided: OnlyAdminUsersGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnlyAdminUsersGuard", function() { return OnlyAdminUsersGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OnlyAdminUsersGuard = /** @class */ (function () {
    function OnlyAdminUsersGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    OnlyAdminUsersGuard.prototype.canActivate = function () {
        /*
         * Only authenticated users with admin role are allowed to pass.
         *
         * If user is not allowed, is redirected to home
         *
         */
        var _this = this;
        return this.authService.isLoggedIn().map(function (logged) {
            var user = window.user;
            if (logged && user && user.isAdmin)
                return true;
            else
                _this.router.navigate(['']);
        });
    };
    OnlyAdminUsersGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], OnlyAdminUsersGuard);
    return OnlyAdminUsersGuard;
}());



/***/ }),

/***/ "./src/app/admin/import/import-csv/import-csv.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/admin/import/import-csv/import-csv.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- <h2> Asignaturas </h2>-->\n  <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"100\">\n      <mat-toolbar color=\"accent\">\n          <mat-toolbar-row>\n            <div class=\"main-icon\"><mat-icon>import_export</mat-icon></div>\n            <div><span class=\"title\"> Importar </span></div>\n            <span class=\"spacer\"></span>\n            <button mat-icon-button>\n              <mat-icon>assessment</mat-icon>\n            </button>\n            <button routerLink=\"/\" mat-icon-button matTooltip=\"Volver al Inicio\">\n              <mat-icon>chevron_left</mat-icon>\n            </button>\n          </mat-toolbar-row>\n      </mat-toolbar>\n    </div>\n  </div>\n  <div class=\"subjects\" fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" fxLayoutGap=\"2%\">\n    <div fxFlex=\"49\" fxFlex.sm=\"49\">\n      <mat-card class=\"subject-card\">\n        <mat-card-header>\n          <mat-card-title class=\"title\"> Alumnos </mat-card-title>\n          <mat-card-subtitle class=\"subtitle\">Importación csv</mat-card-subtitle>\n        </mat-card-header>\n\n        <mat-card-content class=\"teacher\">\n          <input type=\"file\" #fileImportInput name=\"File Upload\" \n          id=\"txtFileUpload\" (change)=\"fileChangeListenerUsers($event)\" accept=\".csv\" />\n        </mat-card-content>\n\n        <mat-card-actions class=\"buttons\" fxLayoutAlign=\"end\">\n          <button mat-flat-button matTooltip=\"Enviar\" color=\"info\"><mat-icon aria-label=\"Ver detalles\">  save_alt </mat-icon> Enviar </button> </mat-card-actions>\n      </mat-card>\n    </div>\n    <div fxFlex=\"49\" fxFlex.sm=\"49\">\n      <mat-card class=\"subject-card\">\n        <mat-card-header>\n          <mat-card-title class=\"title\"> Asignaturas </mat-card-title>\n          <mat-card-subtitle class=\"subtitle\">Importación csv</mat-card-subtitle>\n        </mat-card-header>\n\n        <!-- Input file reader -->\n        <mat-card-content class=\"teacher\">\n          <input type=\"file\" #fileImportInput name=\"File Upload\" \n          id=\"txtFileUpload\" (change)=\"fileChangeListenerSubjects($event)\" accept=\".csv\" />\n        </mat-card-content>\n\n        <mat-card-actions class=\"buttons\" fxLayoutAlign=\"end\">\n          <button mat-flat-button matTooltip=\"Enviar\" color=\"info\">\n            <mat-icon aria-label=\"Ver detalles\">  save_alt </mat-icon> Enviar \n          </button> \n        </mat-card-actions>\n      </mat-card>\n    </div>\n  </div>\n</div>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/admin/import/import-csv/import-csv.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/import/import-csv/import-csv.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-----------------------------------------------\n                   Variables\n-----------------------------------------------*/\n::ng-deep body .dashboard .container {\n  max-width: 1200px;\n  width: 90%;\n  margin: 0px auto;\n  min-height: calc(100vh - 85px); }\n::ng-deep .dashboard.sidenav-main-content {\n  padding-top: 0px !important; }\n.main-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto;\n  padding: 20px 0px; }\n.title {\n  font-weight: 900;\n  font-size: 20px; }\n.subjects, .no-results-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto; }\n.no-results-container h3 {\n  font-size: 24px; }\n.subject-card {\n  margin-bottom: 20px; }\n.subject-card .teacher {\n    line-height: 0.8;\n    margin-top: 40px; }\n.subject-card .teacher span {\n      color: #002E67;\n      font-weight: 600px; }\n.subject-card .buttons {\n    margin-top: 20px;\n    margin-bottom: 0px;\n    margin-right: 0px; }\n.subject-card .buttons button {\n      margin-left: 10px; }\n"

/***/ }),

/***/ "./src/app/admin/import/import-csv/import-csv.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/import/import-csv/import-csv.component.ts ***!
  \*****************************************************************/
/*! exports provided: ImportCsvComponent, CSVRecordUsers, CSVRecordSubjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportCsvComponent", function() { return ImportCsvComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVRecordUsers", function() { return CSVRecordUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVRecordSubjects", function() { return CSVRecordSubjects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImportCsvComponent = /** @class */ (function () {
    function ImportCsvComponent() {
        this.title = 'app';
        this.csvRecords = [];
    }
    ImportCsvComponent.prototype.fileChangeListenerUsers = function ($event) {
        var _this = this;
        var files = $event.srcElement.files;
        if (this.isCSVFile(files[0])) {
            var input_1 = $event.target;
            var reader_1 = new FileReader();
            reader_1.readAsText(input_1.files[0]);
            reader_1.onload = function () {
                var csvData = reader_1.result;
                var csvRecordsArray = csvData.split(/\r\n|\n/);
                var headersRow = _this.getHeaderArray(csvRecordsArray);
                _this.csvRecords = _this.getDataRecordsArrayFromCSVFileUsers(csvRecordsArray, headersRow.length);
            };
            reader_1.onerror = function () {
                alert('Unable to read ' + input_1.files[0]);
            };
        }
        else {
            alert('Please import valid .csv file.');
            this.fileReset();
        }
    };
    ImportCsvComponent.prototype.fileChangeListenerSubjects = function ($event) {
        var _this = this;
        var files = $event.srcElement.files;
        if (this.isCSVFile(files[0])) {
            var input_2 = $event.target;
            var reader_2 = new FileReader();
            reader_2.readAsText(input_2.files[0]);
            reader_2.onload = function () {
                var csvData = reader_2.result;
                var csvRecordsArray = csvData.split(/\r\n|\n/);
                var headersRow = _this.getHeaderArray(csvRecordsArray);
                _this.csvRecords = _this.getDataRecordsArrayFromCSVFileUsers(csvRecordsArray, headersRow.length);
            };
            reader_2.onerror = function () {
                alert('Unable to read ' + input_2.files[0]);
            };
        }
        else {
            alert('Porfavor, seleciona un fichero .csv válido.');
            this.fileReset();
        }
    };
    ImportCsvComponent.prototype.getDataRecordsArrayFromCSVFileUsers = function (csvRecordsArray, headerLength) {
        var dataArrUsers = [];
        for (var i = 1; i < csvRecordsArray.length; i++) {
            var data = csvRecordsArray[i].split(',');
            // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
            // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
            if (data.length === headerLength) {
                var csvRecordUsers = new CSVRecordUsers();
                csvRecordUsers.fullname = data[0].trim();
                csvRecordUsers.imagen = data[1].trim();
                csvRecordUsers.email = data[2].trim();
                csvRecordUsers.dni = data[3].trim();
                csvRecordUsers.email = data[4].trim();
                csvRecordUsers.telefono = data[5].trim();
                csvRecordUsers.hashedPassword = data[6].trim();
                csvRecordUsers.bio = data[7].trim();
                csvRecordUsers.ciudad = data[8].trim();
                csvRecordUsers.direccion = data[9].trim();
                csvRecordUsers.nacimiento = data[10].trim();
                csvRecordUsers.roles = data[11].trim();
                dataArrUsers.push(csvRecordUsers);
            }
        }
        console.log(dataArrUsers);
        return dataArrUsers;
    };
    ImportCsvComponent.prototype.getDataRecordsArrayFromCSVFileSubjects = function (csvRecordsArray, headerLength) {
        var dataArrSubjects = [];
        for (var i = 1; i < csvRecordsArray.length; i++) {
            var data = csvRecordsArray[i].split(',');
            // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
            // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
            if (data.length === headerLength) {
                var csvRecordSubjects = new CSVRecordSubjects();
                csvRecordSubjects.codigo = data[0].trim();
                csvRecordSubjects.nombre = data[1].trim();
                csvRecordSubjects.descripcion = data[2].trim();
                csvRecordSubjects.titulacion = data[3].trim();
                csvRecordSubjects.especialidad = data[4].trim();
                csvRecordSubjects.centro = data[5].trim();
                csvRecordSubjects.departamento = data[6].trim();
                csvRecordSubjects.tipo = data[7].trim();
                csvRecordSubjects.caracter = data[8].trim();
                csvRecordSubjects.duracion = data[9].trim();
                csvRecordSubjects.creditos = data[10].trim();
                csvRecordSubjects.curso = data[11].trim();
                csvRecordSubjects.proyectoDocente = data[12].trim();
                csvRecordSubjects.enrollCode = data[13].trim();
                dataArrSubjects.push(csvRecordSubjects);
            }
        }
        console.log(dataArrSubjects);
        return dataArrSubjects;
    };
    // CHECK IF FILE IS A VALID CSV FILE
    ImportCsvComponent.prototype.isCSVFile = function (file) {
        return file.name.endsWith('.csv');
    };
    // GET CSV FILE HEADER COLUMNS
    ImportCsvComponent.prototype.getHeaderArray = function (csvRecordsArr) {
        var headers = csvRecordsArr[0].split(',');
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    ImportCsvComponent.prototype.fileReset = function () {
        this.fileImportInput.nativeElement.value = '';
        this.csvRecords = [];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileImportInput'),
        __metadata("design:type", Object)
    ], ImportCsvComponent.prototype, "fileImportInput", void 0);
    ImportCsvComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-import-csv',
            template: __webpack_require__(/*! ./import-csv.component.html */ "./src/app/admin/import/import-csv/import-csv.component.html"),
            styles: [__webpack_require__(/*! ./import-csv.component.scss */ "./src/app/admin/import/import-csv/import-csv.component.scss")]
        })
    ], ImportCsvComponent);
    return ImportCsvComponent;
}());

var CSVRecordUsers = /** @class */ (function () {
    function CSVRecordUsers() {
    }
    return CSVRecordUsers;
}());

var CSVRecordSubjects = /** @class */ (function () {
    function CSVRecordSubjects() {
    }
    return CSVRecordSubjects;
}());



/***/ }),

/***/ "./src/app/admin/import/import-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/import/import-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ImportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportRoutingModule", function() { return ImportRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
/* harmony import */ var _import_csv_import_csv_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./import-csv/import-csv.component */ "./src/app/admin/import/import-csv/import-csv.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [{
        path: '',
        canActivate: [_admin_user_guard__WEBPACK_IMPORTED_MODULE_2__["OnlyAdminUsersGuard"]],
        children: [
            { path: '', component: _import_csv_import_csv_component__WEBPACK_IMPORTED_MODULE_3__["ImportCsvComponent"], pathMatch: 'full' }
        ]
    }];
var ImportRoutingModule = /** @class */ (function () {
    function ImportRoutingModule() {
    }
    ImportRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ImportRoutingModule);
    return ImportRoutingModule;
}());



/***/ }),

/***/ "./src/app/admin/import/import.module.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/import/import.module.ts ***!
  \***********************************************/
/*! exports provided: ImportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportModule", function() { return ImportModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _import_csv_import_csv_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./import-csv/import-csv.component */ "./src/app/admin/import/import-csv/import-csv.component.ts");
/* harmony import */ var _import_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./import-routing.module */ "./src/app/admin/import/import-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ImportModule = /** @class */ (function () {
    function ImportModule() {
    }
    ImportModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _import_routing_module__WEBPACK_IMPORTED_MODULE_3__["ImportRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ],
            declarations: [_import_csv_import_csv_component__WEBPACK_IMPORTED_MODULE_2__["ImportCsvComponent"]]
        })
    ], ImportModule);
    return ImportModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-admin-import-import-module.js.map