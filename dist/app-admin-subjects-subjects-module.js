(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-subjects-subjects-module"],{

/***/ "./src/app/admin/subjects/subject.service.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/subjects/subject.service.ts ***!
  \***************************************************/
/*! exports provided: SubjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectService", function() { return SubjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SubjectService = /** @class */ (function () {
    function SubjectService(http) {
        this.http = http;
    }
    /**
     * getAll
     * Retrieves subjects from backend. Different kind of
     * params are allowed.
     *
     * @param params - Query
     * @param loading - Must show main loading bar?
     */
    SubjectService.prototype.getAll = function (params, loading) {
        var url = '/api/subject/all';
        return this.http
            .get(url, {
            params: params,
            headers: loading === 'no-loading-bar' ? new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ ignoreLoadingBar: '' }) : {}
        });
    };
    /**
   * update
   * Updates the given subject.
   *
   * @param user - The given user to update
   */
    SubjectService.prototype.update = function (subject) {
        var url = '/api/subject/' + subject._id;
        return this.http
            .put(url, subject, { responseType: 'text' });
    };
    SubjectService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SubjectService);
    return SubjectService;
}());



/***/ }),

/***/ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-edit/subjects-edit.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Modificar asignatura</h1>\n<div mat-dialog-content class=\"user-edit-dialog\">\n\n  <mat-card>\n    <form [formGroup]=\"subjectForm\" (ngSubmit)=\"saveSubject()\">\n      <mat-card-header>\n        <mat-card-title>Información básica</mat-card-title>\n        <mat-card-subtitle>Modifica los datos básicos de la asignatura </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n\n        <!-- NOMBRE -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Nombre</mat-label>\n          <input matInput #nombre name=\"nombre\" formControlName=\"nombre\" maxlength=\"120\" placeholder=\"Nombre\">\n          <mat-error *ngIf=\"subjectForm.get('nombre').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /NOMBRE -->\n          \n        <!-- TITULACIÓN -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Titulación</mat-label>\n          <input matInput #titulacion name=\"titulacion\" formControlName=\"titulacion\" maxlength=\"120\" placeholder=\"Titulación\">\n          <mat-error *ngIf=\"subjectForm.get('titulacion').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /TITULACIÓN -->\n\n        <mat-form-field class=\"permits-container\">\n          <mat-label>Curso</mat-label>\n          <mat-select formControlName=\"curso\">\n            <mat-option *ngFor=\"let curso of cursos\" [value]=\"curso\">\n              {{ curso }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n      </mat-card-content>\n      <mat-card-actions mat-dialog-actions align=\"end\">\n        <button type=\"submit\" mat-button cdkFocusInitial color=\"success\">GUARDAR</button>\n      </mat-card-actions>\n    </form>\n  </mat-card>\n\n  <mat-card>\n    <form [formGroup]=\"subjectForm\" (ngSubmit)=\"saveSubject()\">\n      <mat-card-header>\n        <mat-card-title> Ficheros y Software</mat-card-title>\n        <mat-card-subtitle> Modifica los ficheros y el software necesario de la asignatura </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n\n        <!-- NOMBRE -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Nombre</mat-label>\n          <input matInput #nombre name=\"nombre\" formControlName=\"nombre\" maxlength=\"120\" placeholder=\"Nombre\">\n          <mat-error *ngIf=\"subjectForm.get('nombre').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /NOMBRE -->\n          \n        <!-- TITULACIÓN -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Titulación</mat-label>\n          <input matInput #titulacion name=\"titulacion\" formControlName=\"titulacion\" maxlength=\"120\" placeholder=\"Titulación\">\n          <mat-error *ngIf=\"subjectForm.get('titulacion').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /TITULACIÓN -->\n\n        <mat-form-field class=\"permits-container\">\n          <mat-label>Curso</mat-label>\n          <mat-select formControlName=\"curso\">\n            <mat-option *ngFor=\"let curso of cursos\" [value]=\"curso\">\n              {{ curso }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n      </mat-card-content>\n      <mat-card-actions mat-dialog-actions align=\"end\">\n        <button type=\"submit\" mat-button cdkFocusInitial color=\"success\">GUARDAR</button>\n      </mat-card-actions>\n    </form>\n  </mat-card>\n\n</div>\n<div mat-dialog-actions align=\"end\">\n  <button type=\"button\" mat-button mat-dialog-close color=\"warn\">CANCELAR</button>\n</div>"

/***/ }),

/***/ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-edit/subjects-edit.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-edit/subjects-edit.component.ts ***!
  \*************************************************************************/
/*! exports provided: SubjectsEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsEditComponent", function() { return SubjectsEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _subject_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subject.service */ "./src/app/admin/subjects/subject.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SubjectsEditComponent = /** @class */ (function () {
    //
    // Main password object
    //
    /* passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      send_email: [false]
    }); */
    //
    // Must show password?
    //
    /*isPasswordHidden: boolean = true; */
    function SubjectsEditComponent(fb, toastr, subject, dialog, data) {
        this.fb = fb;
        this.toastr = toastr;
        this.subject = subject;
        this.dialog = dialog;
        this.data = data;
        //
        // Permits
        //
        this.cursos = ['Primero', 'Segundo', 'Tercero', 'Cuarto'];
        //
        // Main user object
        //
        this.subjectForm = this.fb.group({
            _id: [''],
            fullname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            roles: ['']
        });
    }
    SubjectsEditComponent.prototype.ngOnInit = function () {
        if (this.data && this.data.subject) {
            this.subjectForm.addControl('_id', this.fb.control(''));
            this.subjectForm.reset(this.data.user);
            this.subjectForm.get('roles').setValue(this.data.user.roles[0]);
        }
        else {
            this.dialog.close();
        }
    };
    /**
     * saveSubject
     * Saves the new author to database.
     *
     */
    SubjectsEditComponent.prototype.saveSubject = function () {
        var _this = this;
        // Validation
        if (this.subjectForm.invalid) {
            return;
        }
        //
        // Validation OK
        //
        var subject = this.subjectForm.value;
        this
            .subject
            .update(subject)
            .subscribe(function (subject) {
            _this.toastr.success('Asignatura actualizada correctamente', 'Confirmación');
            _this.dialog.close(subject);
        }, function (error) {
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    SubjectsEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subjects-edit',
            template: __webpack_require__(/*! ./subjects-edit.component.html */ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.html"),
            styles: [__webpack_require__(/*! ./subjects-edit.component.scss */ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.scss")]
        }),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], SubjectsEditComponent);
    return SubjectsEditComponent;
}());



/***/ }),

/***/ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"100\">\n      <mat-toolbar color=\"accent\">\n        <mat-toolbar-row>        \n          <div class=\"main-icon\">\n              <a routerLink=\"/admin/blog\">\n                <mat-icon>create</mat-icon>\n              </a>\n          </div>\n          <div>\n            <a routerLink=\"/admin/blog\">\n              <strong>Asignatura</strong>\n            </a>\n          </div>\n          <div class=\"main-icon\">&nbsp;&nbsp;&nbsp;<mat-icon>chevron_right</mat-icon>&nbsp;&nbsp;&nbsp;</div>\n          <div>Ficheros y Software</div>\n          <span class=\"spacer\"></span>\n          <button type=\"button\" routerLink=\"/admin\" mat-icon-button matTooltip=\"Volver al Dashboard\">\n            <mat-icon>chevron_left</mat-icon>\n          </button>\n        </mat-toolbar-row>\n      </mat-toolbar>\n    </div>\n\n  </div>\n\n  <form novalidate>\n\n    <!-- BASIC INFO -->\n    <div class=\"block\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n      <div fxFlex=\"100\">\n\n        <mat-card>\n          <mat-card-title>Información básica</mat-card-title>\n          <mat-card-subtitle>Añade la información básica de los archivos para generarlos</mat-card-subtitle>\n\n          <!-- TITLE -->\n          <mat-form-field appearance=\"outline\" style=\"width: 100%;\">\n            <mat-label>Nombre</mat-label>\n            <input matInput #title name=\"title\" formControlName=\"title\" maxlength=\"120\" placeholder=\"Titular\" required>\n            <span matSuffix>0</span>\n            <mat-hint>Máximo 120 caracteres</mat-hint>\n            <mat-error>Debes introducir un título</mat-error>\n          </mat-form-field>\n          <!-- /TITLE -->\n\n          <div class=\"type-category-container\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" fxLayoutAlign.xs=\"center center\">\n            <div fxFlex=\"48\" fxFlex.xs=\"100\">\n              <!-- ARTICLE TYPE -->\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Versión del directorio</mat-label>\n                <input matInput #template formControlName=\"template\" [matAutocomplete]=\"templateAutocomplete\" placeholder=\"Tipo de artículo\" required>\n                <button type=\"button\" mat-button *ngIf=\"template.value\" matSuffix mat-icon-button aria-label=\"Borrar\" >\n                  <mat-icon>close</mat-icon>\n                </button>\n                <mat-error>Debes seleccionar un tipo de artículo</mat-error>\n              </mat-form-field>\n              <mat-autocomplete #templateAutocomplete=\"matAutocomplete\">\n                <mat-option [value]=\"template\">\n                  prueba\n                </mat-option>\n              </mat-autocomplete>\n              <!-- /ARTICLE TYPE -->\n            </div>\n            <div fxFlex=\"48\" fxFlex.xs=\"100\">\n\n            </div>\n          </div>\n\n          <div class=\"url-container\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"center center\">\n            <div fxFlex=\"100\">\n              <h4>\n                <div class=\"link-icon-div\"><mat-icon>link</mat-icon></div>\n                <div>&nbsp;URL del archivo</div>\n              </h4>\n              <p>https://localhost:4040/<span class=\"url-background\">temp/files/[code-asignatura]/[nombre-fichero]</span></p>\n            </div>\n          </div>\n\n        </mat-card>\n\n      </div>\n    </div>\n    <!-- /BASIC INFO -->\n\n    <!-- ARTICLE HEADER - IMAGE OR VIDEO -->\n    <div class=\"block\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n      <div fxFlex=\"100\">\n        <mat-card>\n          <mat-card-title>Gestión de archivos</mat-card-title>\n          <mat-card-subtitle>Gestiona los ficheros que se incluirán al directorio de la asignatura.</mat-card-subtitle>\n\n          <div fxLayout=\"column\" fxLayoutAlign=\"center center\" style=\"width: 100%;\">\n            <p>Selecciona qué tipo de ficheros quieres añadir.</p>\n            <mat-button-toggle-group formControlName=\"header_mode\" name=\"header\" aria-label=\"Cabecera\">\n              <mat-button-toggle value=\"image\"><mat-icon>description</mat-icon>&nbsp;&nbsp;Documento</mat-button-toggle>\n              <mat-button-toggle value=\"video\"><mat-icon>folder</mat-icon>&nbsp;&nbsp;Carpeta comprimida</mat-button-toggle>\n              <mat-button-toggle value=\"video\"><mat-icon>dns</mat-icon>&nbsp;&nbsp;Máquina Virtual</mat-button-toggle>\n            </mat-button-toggle-group>\n          </div>\n\n          <div class=\"header-image\" fxLayout=\"row\" fxLayoutAlign=\"center start\">\n            \n            <div fxFlex=\"50\" class=\"header-drag-drop-container\">\n              <div class=\"header-drag-drop\" ng2FileDrop  fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                <div>Arrastra ficheros aquí</div>\n              </div>\n              <input type=\"file\" mat-button ng2FileSelect />\n              <p class=\"error\">Debes subir un archivo válido</p>\n            </div>\n            \n            <div fxFlex=\"50\" class=\"header-image-preview-container\">\n              \n              <div fxLayout=\"column\" fxLayoutAlign=\"center center\">\n                <div>\n                  <img src mediaPreview class=\"media-object\" />\n                  <div class=\"progress-bar-container\">\n                    <mat-progress-bar #headerProgress mode=\"determinate\"></mat-progress-bar>\n                  </div>\n                </div>\n                <div>\n                  <button type=\"button\" mat-raised-button color=\"success\">\n                    <mat-icon>cloud_upload</mat-icon>&nbsp;Subir\n                  </button>\n                  <button type=\"button\" mat-raised-button color=\"accent\">\n                    <mat-icon>not_interested</mat-icon>&nbsp;Cancelar\n                  </button>\n                  <button type=\"button\" mat-raised-button color=\"warn\">\n                    <mat-icon>delete</mat-icon>&nbsp;Borrar\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"header-image-no-preview-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                <div><h3>PREVISUALIZACIÓN</h3></div>\n              </div>\n\n              <div class=\"buttons\">\n              </div>\n\n            </div>\n          </div>\n\n          <div formGroupName=\"video\" class=\"header-video\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n            <div class=\"header-video-input-container\">\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Enlace</mat-label>\n                <input matInput #video name=\"video\" formControlName=\"url\" placeholder=\"Enlace del fichero\">\n              </mat-form-field>\n            </div>\n            <div class=\"header-video-preview-container\">\n              <div fxLayout=\"row\" fxLayoutAlign=\"center start\">\n                <div class=\"video\" fxFlex=\"50\">\n                  <p><strong>Ficheros</strong></p>\n                  <iframe frameborder=\"0\" allowfullscreen></iframe>\n                </div>\n                <div class=\"preview\" fxFlex=\"50\">\n                  <p><strong>Previsualización</strong></p>\n                  <img alt=\"Previsualización del directorio\" />\n                </div>\n              </div>\n            </div>\n            <div>\n              <p class=\"error\">Hay errores en la generación del directorio.</p>\n            </div>\n          </div>\n\n        </mat-card>\n      </div>\n    </div>\n    <!-- /ARTICLE HEADER - IMAGE OR VIDEO -->\n\n  </form>\n\n  <div class=\"post-tools mat-elevation-z8\" [ngStyle]=\"{ 'right': areToolsExpanded ? '0' : '-365px' }\">\n    <button type=\"button\" mat-icon-button matTooltip=\"{{ !areToolsExpanded ? 'Expandir' : 'Ocultar' }}\" [matTooltipPosition]=\"'left'\"  (click)=\"areToolsExpanded = !areToolsExpanded\">\n      <mat-icon *ngIf=\"!areToolsExpanded\">chevron_left</mat-icon>\n      <mat-icon *ngIf=\"areToolsExpanded\">chevron_right</mat-icon>\n    </button>\n    <button type=\"button\" mat-stroked-button color=\"warn\">Cancelar</button>\n    <button type=\"button\" mat-stroked-button color=\"info\">Vista previa</button>\n    <button type=\"submit\" mat-stroked-button color=\"success\">Guardar</button>\n    <div><p>Rellena el formulario para activar el botón \"Guardar\"</p></div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto;\n  padding: 20px 0px; }\n\n.block {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto; }\n\n::ng-deep body .dashboard .container {\n  max-width: 1200px;\n  width: 90%;\n  margin: 0px auto;\n  min-height: calc(100vh - 85px); }\n\n::ng-deep .dashboard .sidenav-main-content {\n  padding-top: 0px !important; }\n\nmat-toolbar-row div mat-icon {\n  margin-top: 8px;\n  margin-left: 10px;\n  margin-right: 10px; }\n\nmat-toolbar-row .back-to-articles {\n  text-decoration: none;\n  color: #000; }\n\n.block {\n  margin-top: 20px;\n  margin-bottom: 5px; }\n\n.type-category-container {\n  width: 100%;\n  margin-top: 10px; }\n\nmat-form-field {\n  width: 100%; }\n\n.url-container h4 {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.url-container p {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: 29px; }\n\n.url-container .link-icon-div {\n  float: left;\n  margin-top: -2px; }\n\n.url-container .url-background {\n  background-color: #47979547; }\n\nmat-option .category {\n  float: left;\n  margin-top: 13px;\n  width: 20px;\n  height: 20px;\n  border-radius: 6px; }\n\nmat-option .category-name {\n  float: left;\n  margin-left: 10px; }\n\n.headings {\n  padding-left: 30px; }\n\n.headings .heading-container {\n    width: 100%; }\n\n.headings .heading-container mat-form-field {\n      width: 100%; }\n\n.headings .heading-container .heading-icon-container {\n      margin-top: -12px; }\n\n.interview .input-container {\n  width: 100%; }\n\n.interview .margin-left {\n  margin-left: 10px; }\n\n.interview .margin-right {\n  margin-right: 10px; }\n\n.author .create-button-container {\n  margin-top: -20px;\n  text-align: center; }\n\n.author .current-author {\n  margin-top: 20px; }\n\n.author .current-author .current-author-info {\n    margin-left: 20px; }\n\n.author .current-author .current-author-info h4 {\n      margin-bottom: 5px;\n      color: #888; }\n\n.author .current-author .current-author-info h3 {\n      margin-top: 0;\n      margin-bottom: 0;\n      color: #303030; }\n\n.author .current-author .current-author-info h3 small {\n        font-weight: 400; }\n\n.author .current-author .current-author-info p {\n      margin-top: 0;\n      font-size: 13px; }\n\n.author .avatar {\n  max-height: 200px;\n  width: auto; }\n\n.header-video,\n.header-image {\n  margin-top: 20px;\n  width: 100%; }\n\n.header-drag-drop-container {\n  width: 100%;\n  margin-right: 5px;\n  margin-bottom: 10px; }\n\n.header-drag-drop {\n  border: 3px dashed #c2c2c2;\n  border-radius: 6px;\n  color: #888;\n  width: 100%;\n  height: 250px; }\n\n.drag-drop-container-over {\n  border-color: #bce41a; }\n\n.header-image-preview-container {\n  width: 100%;\n  min-height: 250px;\n  margin-left: 5px;\n  margin-bottom: 10px; }\n\n.header-image-preview-container .progress-bar-container {\n    width: 100%;\n    margin-top: -5px;\n    margin-bottom: 10px; }\n\n.header-image-preview-container .progress-bar-container mat-progress-bar {\n      height: 10px; }\n\n.header-image-preview-container button {\n    margin-left: 5px; }\n\n.header-image-preview-container button mat-icon {\n      font-size: 20px; }\n\n.header-image-no-preview-container {\n  width: 100%;\n  min-height: 250px; }\n\n.header-image-no-preview-container h3 {\n    color: #888; }\n\nimg.media-object {\n  max-height: 250px;\n  width: auto;\n  max-width: 100%; }\n\n.header-video {\n  width: 100%; }\n\n.header-video .header-video-input-container {\n    width: 100%; }\n\n.header-video .header-video-input-container mat-form-field {\n      width: 100%; }\n\n.header-video .header-video-preview-container {\n    width: 100%;\n    margin-top: 20px; }\n\n.header-video .header-video-preview-container .video {\n      padding: 5px; }\n\n.header-video .header-video-preview-container .video iframe {\n        width: 100%;\n        height: 229px; }\n\n.header-video .header-video-preview-container .preview {\n      padding: 5px; }\n\n.header-video .header-video-preview-container .preview img {\n        width: 100%;\n        height: auto; }\n\n.header-video .error {\n    color: red; }\n\n.counter {\n  position: relative;\n  margin-top: 10px;\n  width: 100%;\n  text-align: right;\n  color: #888;\n  font-size: 14px; }\n\n.gallery-drag-drop {\n  border: 3px dashed #c2c2c2;\n  border-radius: 6px;\n  color: #888;\n  height: 300px; }\n\n.gallery-progress-bar-container {\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n\n.gallery-progress-bar-container mat-progress-bar {\n    height: 5px; }\n\n.gallery-progress-bar-container .left-progress {\n    float: left; }\n\n.gallery-progress-bar-container .right-icon {\n    float: right;\n    color: #8bbd19; }\n\n.gallery-images-container {\n  margin-top: 20px; }\n\n.gallery-images-container .not-uploaded-title {\n    width: 100%; }\n\n.gallery-images-container .not-uploaded-title span.not-uploaded {\n      color: red; }\n\n.gallery-images-container .not-uploaded-title button {\n      margin-left: 15px; }\n\n.gallery-images-container .not-uploaded-title button mat-icon {\n        font-size: 20px; }\n\n.gallery-images-container .not-uploaded-container {\n    margin-top: 15px;\n    width: 100%; }\n\n.gallery-images-container .not-uploaded-container .image-container {\n      margin-bottom: 20px;\n      padding: 10px;\n      background-color: rgba(194, 194, 194, 0.19);\n      border-radius: 6px; }\n\n.recommended .article-container {\n  padding: 10px;\n  text-align: center; }\n\n.recommended .article-container button {\n    margin-top: 10px; }\n\n.recommended .article-container .article {\n    border: 1px solid #c2c2c2;\n    border-radius: 6px;\n    width: 100%;\n    height: 150px; }\n\n.mat-option .container {\n  width: 100%; }\n\n.mat-option .container .avatar {\n    background-size: cover;\n    width: 40px;\n    height: 40px;\n    background-repeat: no-repeat; }\n\n.mat-option .container .name {\n    margin-left: 10px; }\n\nform {\n  margin-bottom: 150px; }\n\n.post-tools {\n  padding: 20px 40px 20px 0px;\n  background-color: #fff;\n  border-radius: 6px;\n  position: fixed;\n  bottom: 30px;\n  right: 0; }\n\n.post-tools button {\n    margin-left: 20px; }\n\n.post-tools p {\n    margin-left: 35px;\n    font-size: 13px;\n    margin-bottom: 0; }\n\n.error {\n  color: red;\n  font-size: 13px; }\n\n.success {\n  color: #8bbd19; }\n"

/***/ }),

/***/ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SubjectsFilesEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsFilesEditComponent", function() { return SubjectsFilesEditComponent; });
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

var SubjectsFilesEditComponent = /** @class */ (function () {
    function SubjectsFilesEditComponent() {
        this.areToolsExpanded = true;
    }
    SubjectsFilesEditComponent.prototype.ngOnInit = function () {
    };
    SubjectsFilesEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subjects-files-edit',
            template: __webpack_require__(/*! ./subjects-files-edit.component.html */ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.html"),
            styles: [__webpack_require__(/*! ./subjects-files-edit.component.scss */ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SubjectsFilesEditComponent);
    return SubjectsFilesEditComponent;
}());



/***/ }),

/***/ "./src/app/admin/subjects/subjects-list/subjects-list.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-list/subjects-list.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- <h2> Asignaturas </h2>-->\n    <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n      <div fxFlex=\"100\">\n          <mat-toolbar color=\"accent\">\n              <mat-toolbar-row>\n                <div class=\"main-icon\"><mat-icon>class</mat-icon></div>\n                <div><span class=\"title\">Asignaturas</span></div>\n                <span class=\"spacer\"></span>\n                <button (click)=\"toggleSearchBar();\" mat-icon-button matTooltip=\"Buscar\">\n                  <mat-icon>search</mat-icon>\n                </button>\n                <button routerLink=\"/admin\" mat-icon-button matTooltip=\"Volver al Inicio\">\n                  <mat-icon>chevron_left</mat-icon>\n                </button>\n              </mat-toolbar-row>\n          </mat-toolbar>\n          \n          <!-- SEARCH BAR -->\n            <div *ngIf=\"searchBar\" class=\"search-container\">\n              <mat-form-field>\n                <input matInput placeholder=\"Buscar\" [(ngModel)]=\"searchValue\" (ngModelChange)=\"didFilterSubjects($event);\">\n                <button mat-button *ngIf=\"searchValue\" matSuffix mat-icon-button aria-label=\"Borrar\" (click)=\"searchValue='';didFilterSubjects($event)\">\n                  <mat-icon>close</mat-icon>\n                </button>\n              </mat-form-field>\n            </div>\n\n            <!-- NO ITEMS FOR SHOWING -->\n            <div *ngIf=\"paginationConfig.totalItems === 0 && !isLoading\" class=\"no-results-container\">\n              <h3>No hay asignaturas para mostrar</h3>\n            </div>\n  \n            <table class=\"subjects-table\" mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"didSortSubjects($event)\" *ngIf=\"paginationConfig.totalItems > 0\">\n      \n              <!-- Codigo Column -->\n              <ng-container matColumnDef=\"codigo\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Código </th>\n                <td class=\"click\" mat-cell *matCellDef=\"let subject\"> <strong>{{ subject.codigo }}</strong> </td>\n              </ng-container>\n      \n              <!-- Nombre Column -->\n              <ng-container matColumnDef=\"nombre\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>\n                <td class=\"click\" mat-cell *matCellDef=\"let subject\"> <strong>{{ subject.nombre }} </strong></td>\n              </ng-container>\n  \n              <!--  Duracion Column -->\n              <ng-container matColumnDef=\"duracion\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Duración </th>\n                <td mat-cell *matCellDef=\"let subject\"> {{ subject.duracion}} </td>\n              </ng-container>\n      \n              <!-- Curso At Column -->\n              <ng-container matColumnDef=\"curso\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Curso </th>\n                <td mat-cell *matCellDef=\"let subject\"> {{ subject.curso }} </td>\n              </ng-container>\n              <!--  Updated Column -->\n              <ng-container matColumnDef=\"updated\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Actualizado </th>\n                <td mat-cell *matCellDef=\"let subject\"> {{ subject.updated | date:'longDate' }} </td>\n              </ng-container>\n  \n              <!-- Actions At Column -->\n              <ng-container matColumnDef=\"actions\">\n                <th mat-header-cell *matHeaderCellDef> </th>\n                <td mat-cell *matCellDef=\"let subject\" class=\"text-right\">\n                  <button mat-icon-button matTooltip=\"Editar información\" color=\"info\" (click)=\"openEditSubjectDialog(subject)\">\n                    <mat-icon aria-label=\"Editar usuario\">create</mat-icon>\n                  </button>\n                  <button mat-icon-button matTooltip=\"Editar ficheros\" color=\"info\" routerLink=\"/admin/subjects/files\">\n                    <mat-icon aria-label=\"Editar ficheros\"> note_add </mat-icon>\n                  </button>\n                </td>\n              </ng-container>\n  \n              <!-- Footer -->\n              <ng-container matColumnDef=\"pagination\" class=\"pagination\">\n                <td mat-footer-cell *matFooterCellDef colspan=\"5\">\n                  <div class=\"pagination-container\">\n                    <ul>\n                      <li *ngFor=\"let subject of subjects | paginate: paginationConfig\">Prueba</li>\n                    </ul>\n                    <pagination-controls [id]=\"paginationConfig.id\"\n                    (pageChange)=\"didPageChange($event)\"\n                    maxSize=\"7\"\n                    directionLinks=\"true\"\n                    autoHide=\"false\"\n                    responsive=\"true\"\n                    previousLabel=\"Anterior\"\n                    nextLabel=\"Siguiente\"\n                    screenReaderPaginationLabel=\"Paginación\"\n                    screenReaderPageLabel=\"página\"\n                    screenReaderCurrentLabel=\"Estás en la página\">\n                    </pagination-controls>\n                  </div>\n                </td>\n              </ng-container>\n      \n              <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n              <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n              <tr mat-footer-row *matFooterRowDef=\"['pagination']\"></tr>\n            </table>\n          <!-- /TABLE - All subjects -->\n        <!-- PROGRESS BAR  -->\n        <div class=\"progress-bar-container\" class=\"progress-bar-container\">\n          <mat-progress-bar *ngIf=\"isLoading\" mode=\"indeterminate\" color=\"primary\"></mat-progress-bar>\n        </div>\n      </div>\n    \n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/subjects/subjects-list/subjects-list.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-list/subjects-list.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-----------------------------------------------\n                   Variables\n-----------------------------------------------*/\nh3 {\n  font-size: 18px; }\n.subjects-table {\n  max-width: 1024px;\n  width: 100%;\n  margin: 50px auto; }\n.ngx-pagination {\n  padding: 0px;\n  text-align: center; }\n.subjects-table td {\n  padding: 40px 20px; }\n.subjects-table th {\n  padding: 20px 20px;\n  color: #002E67;\n  font-weight: bold; }\n.click {\n  transition: all .5s; }\n.click:hover {\n  color: #ff9a00; }\n.search-container {\n  max-width: 1024px;\n  margin: 20px auto 0px; }\n.title {\n  font-weight: 900;\n  padding-left: 5px; }\n.main-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto;\n  padding: 20px 0px; }\n::ng-deep body .dashboard .container {\n  max-width: 1200px;\n  width: 90%;\n  margin: 0px auto;\n  min-height: calc(100vh - 85px); }\n::ng-deep .dashboard .sidenav-main-content {\n  padding-top: 0px !important; }\ntable {\n  background-color: transparent; }\n"

/***/ }),

/***/ "./src/app/admin/subjects/subjects-list/subjects-list.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/subjects/subjects-list/subjects-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: SubjectsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsListComponent", function() { return SubjectsListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _subjects_edit_subjects_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../subjects-edit/subjects-edit.component */ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.ts");
/* harmony import */ var _subject_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subject.service */ "./src/app/admin/subjects/subject.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SubjectsListComponent = /** @class */ (function () {
    function SubjectsListComponent(subjectService, auth, toastr, dialog) {
        this.subjectService = subjectService;
        this.auth = auth;
        this.toastr = toastr;
        this.dialog = dialog;
        this.subjects = [];
        this.paginationConfig = {
            id: 'users_pagination',
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: 0
        };
        this.searchBar = false;
        this.searchBarInput = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.isLoading = true;
        this.displayedColumns = ['codigo', 'nombre', 'duracion', 'curso', 'updated', 'actions'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](this.subjects);
        //
        // Dialogs
        //
        this.editSubjectDialog = null;
    }
    SubjectsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.sort = this.sort;
        this.getAll();
        this
            .searchBarInput
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])())
            .subscribe(function (filterValue) {
            _this.getAll();
        });
    };
    SubjectsListComponent.prototype.getAll = function (filterValue) {
        var _this = this;
        this.isLoading = true;
        this
            .subjectService
            .getAll({
            page: this.paginationConfig.currentPage,
            pageSize: this.paginationConfig.itemsPerPage,
            sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
            sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
            filter: this.searchValue ? this.searchValue : ''
        }, 'no-loading-bar')
            .subscribe(function (subjects) {
            _this.paginationConfig.currentPage = subjects.page;
            _this.paginationConfig.totalItems = subjects.totalDocs;
            _this.paginationConfig.itemsPerPage = subjects.limit;
            _this.dataSource.data = subjects.docs;
            setTimeout(function () {
                _this.isLoading = false;
            }, 1000);
        }, function (error) {
            console.error(error);
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    SubjectsListComponent.prototype.didPageChange = function (page) {
        this.paginationConfig.currentPage = page;
        this.getAll();
    };
    /**
     * toggleSearchBar
     * Show or hide the search bar
     *
     */
    SubjectsListComponent.prototype.toggleSearchBar = function () {
        this.searchBar = !this.searchBar;
    };
    /**
     * didFilterSubjects
     * Triggered when user is trying to filter
     * results by writing in the searching bar.
     *
     */
    SubjectsListComponent.prototype.didFilterSubjects = function (event) {
        this.searchBarInput.next(event);
    };
    SubjectsListComponent.prototype.didSortSubjects = function (event) {
        this.sortValue = event;
        this.getAll();
    };
    /**
     * openEditSubjecyDialog
     * Open the subject edition dialog
     *
     */
    SubjectsListComponent.prototype.openEditSubjectDialog = function (subject) {
        var _this = this;
        if (!subject) {
            return;
        }
        this.editSubjectDialog = this.dialog.open(_subjects_edit_subjects_edit_component__WEBPACK_IMPORTED_MODULE_6__["SubjectsEditComponent"], {
            width: '700px',
            data: {
                subject: subject,
                dialog: this.editSubjectDialog
            }
        });
        this.editSubjectDialog.afterClosed().subscribe(function (subject) {
            if (subject) {
                _this.getAll();
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], SubjectsListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", String)
    ], SubjectsListComponent.prototype, "searchValue", void 0);
    SubjectsListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subjects-list',
            template: __webpack_require__(/*! ./subjects-list.component.html */ "./src/app/admin/subjects/subjects-list/subjects-list.component.html"),
            styles: [__webpack_require__(/*! ./subjects-list.component.scss */ "./src/app/admin/subjects/subjects-list/subjects-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_subject_service__WEBPACK_IMPORTED_MODULE_7__["SubjectService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], SubjectsListComponent);
    return SubjectsListComponent;
}());



/***/ }),

/***/ "./src/app/admin/subjects/subjects-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/subjects/subjects-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: SubjectsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsRoutingModule", function() { return SubjectsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
/* harmony import */ var _subjects_list_subjects_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subjects-list/subjects-list.component */ "./src/app/admin/subjects/subjects-list/subjects-list.component.ts");
/* harmony import */ var _subjects_files_edit_subjects_files_edit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subjects-files-edit/subjects-files-edit.component */ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.ts");
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
            { path: '', component: _subjects_list_subjects_list_component__WEBPACK_IMPORTED_MODULE_3__["SubjectsListComponent"], pathMatch: 'full' },
            { path: 'files', component: _subjects_files_edit_subjects_files_edit_component__WEBPACK_IMPORTED_MODULE_4__["SubjectsFilesEditComponent"] }
        ]
    }];
var SubjectsRoutingModule = /** @class */ (function () {
    function SubjectsRoutingModule() {
    }
    SubjectsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SubjectsRoutingModule);
    return SubjectsRoutingModule;
}());



/***/ }),

/***/ "./src/app/admin/subjects/subjects.module.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/subjects/subjects.module.ts ***!
  \***************************************************/
/*! exports provided: SubjectsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectsModule", function() { return SubjectsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sweetalert2/ngx-sweetalert2 */ "./node_modules/@sweetalert2/ngx-sweetalert2/fesm5/sweetalert2-ngx-sweetalert2.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _subjects_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subjects-routing.module */ "./src/app/admin/subjects/subjects-routing.module.ts");
/* harmony import */ var _subjects_list_subjects_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subjects-list/subjects-list.component */ "./src/app/admin/subjects/subjects-list/subjects-list.component.ts");
/* harmony import */ var _subjects_edit_subjects_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./subjects-edit/subjects-edit.component */ "./src/app/admin/subjects/subjects-edit/subjects-edit.component.ts");
/* harmony import */ var _subject_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./subject.service */ "./src/app/admin/subjects/subject.service.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _subjects_files_edit_subjects_files_edit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./subjects-files-edit/subjects-files-edit.component */ "./src/app/admin/subjects/subjects-files-edit/subjects-files-edit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var SubjectsModule = /** @class */ (function () {
    function SubjectsModule() {
    }
    SubjectsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _subjects_routing_module__WEBPACK_IMPORTED_MODULE_4__["SubjectsRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_2__["SweetAlert2Module"].forRoot({
                    buttonsStyling: false,
                    confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
                    cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
            ],
            declarations: [_subjects_list_subjects_list_component__WEBPACK_IMPORTED_MODULE_5__["SubjectsListComponent"], _subjects_edit_subjects_edit_component__WEBPACK_IMPORTED_MODULE_6__["SubjectsEditComponent"], _subjects_files_edit_subjects_files_edit_component__WEBPACK_IMPORTED_MODULE_9__["SubjectsFilesEditComponent"]],
            providers: [_subject_service__WEBPACK_IMPORTED_MODULE_7__["SubjectService"]],
            entryComponents: [
                _subjects_edit_subjects_edit_component__WEBPACK_IMPORTED_MODULE_6__["SubjectsEditComponent"]
            ]
        })
    ], SubjectsModule);
    return SubjectsModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-admin-subjects-subjects-module.js.map