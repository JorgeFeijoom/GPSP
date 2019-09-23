(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-users-users-module"],{

/***/ "./src/app/admin/users/user.service.ts":
/*!*********************************************!*\
  !*** ./src/app/admin/users/user.service.ts ***!
  \*********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
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


var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    /**
     * getAll
     * Retrieves users from backend. Different kind of
     * params are allowed.
     *
     * @param params - Query
     * @param loading - Must show main loading bar?
     */
    UserService.prototype.getAll = function (params, loading) {
        var url = '/api/user';
        return this.http
            .get(url, {
            params: params,
            headers: loading === 'no-loading-bar' ? new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ ignoreLoadingBar: '' }) : {}
        });
    };
    /**
     * remove
     * Removes the user given.
     *
     * @param user - Query
     * @param loading - Must show main loading bar?
     */
    UserService.prototype.remove = function (id) {
        var url = '/api/user/' + id;
        return this.http
            .delete(url, { responseType: 'text' });
    };
    /**
     * create
     * Creates a new user.
     *
     * @param user - New user data
     */
    UserService.prototype.create = function (user) {
        var url = '/api/user/new';
        return this.http
            .post(url, user);
    };
    /**
     * update
     * Updates the given user.
     *
     * @param user - The given user to update
     */
    UserService.prototype.update = function (user) {
        var url = '/api/user/' + user._id;
        return this.http
            .put(url, user, { responseType: 'text' });
    };
    /**
     * updatePassword
     * Updates the given user.
     *
     * @param id - The id from the  given user to update
     * @param passwordForm - Password and check for sending a notification
     *                       to the given user.
     */
    UserService.prototype.updatePassword = function (id, passwordForm) {
        var url = '/api/user/' + id + '/password';
        return this.http
            .put(url, passwordForm, { responseType: 'text' });
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/admin/users/users-create/users-create.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/admin/users/users-create/users-create.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"userForm\" (ngSubmit)=\"saveUser()\">\n  <h1 mat-dialog-title>Crear usuario</h1>\n  <div mat-dialog-content class=\"user-create-dialog\">\n    <h3>Información básica</h3>\n    <div class=\"basic-info-container\" fxLayout=\"row\" fxLayout=\"center center\">\n      <div fxFlex=\"100\" class=\"basic-info\">\n        \n        <!-- NAME -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Nombre</mat-label>\n          <input matInput #name name=\"fullname\" formControlName=\"fullname\" maxlength=\"120\" placeholder=\"Nombre completo\">\n          <mat-error *ngIf=\"userForm.get('fullname').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /NAME -->\n        \n        <!-- EMAIL -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Email</mat-label>\n          <input matInput #email name=\"email\" formControlName=\"email\" maxlength=\"120\" placeholder=\"Correo electrónico\">\n          <mat-error *ngIf=\"userForm.get('email').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n          <mat-error *ngIf=\"!userForm.get('email').hasError('required') && userForm.get('email').hasError('email')\">\n            El email no es una dirección válida\n          </mat-error>\n        </mat-form-field>\n        <!-- /EMAIL -->\n\n        <!-- PASSWORD -->\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n          <div fxFlex=\"70\">\n            <mat-form-field appearance=\"outline\">\n              <mat-label> Contraseña</mat-label>\n              <input type=\"{{ isPasswordHidden ? 'password' : 'text' }}\" matInput #password name=\"password\" formControlName=\"password\" maxlength=\"30\" placeholder=\"Contraseña\">\n              <button type=\"button\" mat-button  matSuffix mat-icon-button aria-label=\"Ver contraseña\" (click)=\"togglePassword();\">\n                <mat-icon>{{ isPasswordHidden ? 'visibility_off' : 'visibility' }}</mat-icon>\n              </button>\n              <mat-error *ngIf=\"userForm.get('password').hasError('required')\">\n                Este campo es obligatorio\n              </mat-error>\n            </mat-form-field>\n          </div>\n          <div class=\"create-password-container\" fxFlx=\"30\">\n            <button type=\"button\" mat-raised-button color=\"info\" (click)=\"generatePassword()\">Generar contraseña</button>\n          </div>\n        </div>\n        <!-- /PASSWORD -->\n\n        <div class=\"send-email-container\" style=\"width: 100%;\">\n          <mat-checkbox formControlName=\"send_email\">Enviar acceso y contraseña por correo</mat-checkbox>\n        </div>\n\n        <mat-form-field class=\"permits-container\">\n          <mat-label>Permisos</mat-label>\n          <mat-select formControlName=\"roles\">\n            <mat-option *ngFor=\"let permit of permits\" [value]=\"permit\">\n              {{ permit }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n      </div>\n    </div>\n  </div>\n  <div mat-dialog-actions align=\"end\">\n    <button type=\"button\" mat-button mat-dialog-close color=\"warn\">Cancelar</button>\n    <button type=\"submit\" mat-button cdkFocusInitial color=\"success\">Guardar</button>\n  </div>\n</form>"

/***/ }),

/***/ "./src/app/admin/users/users-create/users-create.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/admin/users/users-create/users-create.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-create-dialog {\n  font-family: 'Exo'; }\n  .user-create-dialog h3 {\n    color: rgba(48, 48, 48, 0.690196);\n    margin-top: 0; }\n  .user-create-dialog h3.social {\n    margin-bottom: 0; }\n  .user-create-dialog .basic-info-container {\n    width: 100%;\n    margin-bottom: 20px; }\n  .user-create-dialog .basic-info {\n    padding-left: 20px; }\n  .user-create-dialog .basic-info .create-password-container {\n      margin-top: -18px; }\n  .user-create-dialog .basic-info .send-email-container {\n      width: 100%; }\n  .user-create-dialog .basic-info .permits-container {\n      width: 50%;\n      margin-top: 25px; }\n"

/***/ }),

/***/ "./src/app/admin/users/users-create/users-create.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/users/users-create/users-create.component.ts ***!
  \********************************************************************/
/*! exports provided: UsersCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersCreateComponent", function() { return UsersCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user.service */ "./src/app/admin/users/user.service.ts");
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





var UsersCreateComponent = /** @class */ (function () {
    function UsersCreateComponent(fb, toastr, user, dialog, data) {
        this.fb = fb;
        this.toastr = toastr;
        this.user = user;
        this.dialog = dialog;
        this.data = data;
        //
        // Mode: create || edit
        //
        this.mode = 'create';
        //
        // Permits
        //
        this.permits = ['', 'admin'];
        //
        // Main user object
        //
        this.userForm = this.fb.group({
            fullname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            send_email: [false],
            roles: ['']
        });
        //
        // Must show password?
        //
        this.isPasswordHidden = true;
    }
    UsersCreateComponent.prototype.ngOnInit = function () {
        //
        // Loading proper mode: 'create' || 'edit'
        //
        if (this.data && this.data.user) {
            this.userForm.addControl('_id', this.fb.control(''));
            this.userForm.reset(this.data.user);
            this.userForm.get('roles').setValue(this.data.user.roles[0]);
            this.mode = 'edit';
        }
        else
            this.mode = 'create';
    };
    /**
     * togglePassword
     * Show or hide the password within the input
     *
     */
    UsersCreateComponent.prototype.togglePassword = function () {
        this.isPasswordHidden = !this.isPasswordHidden;
    };
    /**
     * generatePassword
     * Creates a new random password and fill the
     * password input automatically
     *
     */
    UsersCreateComponent.prototype.generatePassword = function () {
        var password = this._randomString(12);
        this.userForm.get('password').setValue(password);
    };
    /**
     * saveUser
     * Saves the new author to database.
     *
     */
    UsersCreateComponent.prototype.saveUser = function () {
        var _this = this;
        // Validation
        if (this.userForm.invalid)
            return;
        // Validation OK
        if (this.mode === 'create') {
            //
            // Creating
            //
            var user = this.userForm.value;
            user.roles = [this.userForm.value.roles];
            this
                .user
                .create(user)
                .subscribe(function (user) {
                _this.toastr.success('Autor creado correctamente', 'Autor');
                _this.dialog.close(user);
            }, function (error) {
                _this.toastr.error('Ha habido un error inesperado. Consulta con un administrador.', 'Error!');
            });
        }
        else {
            //
            // Editing
            //
            this
                .user
                .update(this.userForm.value)
                .subscribe(function (user) {
                _this.toastr.success('Autor actualizado correctamente', 'Autor');
                _this.dialog.close(user);
            }, function (error) {
                _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
            });
        }
    };
    /**************************************
     *                                    *
     *           PRIVATE METHODS          *
     *                                    *
     * ************************************/
    /**
     * _randomString
     * Generates a new random string according
     * to the length passed by param
     *
     * @param length {number} - Random string length
     */
    UsersCreateComponent.prototype._randomString = function (length) {
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    };
    UsersCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users-create',
            template: __webpack_require__(/*! ./users-create.component.html */ "./src/app/admin/users/users-create/users-create.component.html"),
            styles: [__webpack_require__(/*! ./users-create.component.scss */ "./src/app/admin/users/users-create/users-create.component.scss")]
        }),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UsersCreateComponent);
    return UsersCreateComponent;
}());



/***/ }),

/***/ "./src/app/admin/users/users-edit/users-edit.component.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/users/users-edit/users-edit.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Modificar usuario</h1>\n<div mat-dialog-content class=\"user-edit-dialog\">\n\n  <mat-card>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"saveUser()\">\n      <mat-card-header>\n        <mat-card-title>Información básica</mat-card-title>\n        <mat-card-subtitle>Modifica los datos básicos del usuario</mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n\n        <!-- NAME -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Nombre</mat-label>\n          <input matInput #name name=\"fullname\" formControlName=\"fullname\" maxlength=\"120\" placeholder=\"Nombre completo\">\n          <mat-error *ngIf=\"userForm.get('fullname').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n        </mat-form-field>\n        <!-- /NAME -->\n          \n        <!-- EMAIL -->\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Email</mat-label>\n          <input matInput #email name=\"email\" formControlName=\"email\" maxlength=\"120\" placeholder=\"Correo electrónico\">\n          <mat-error *ngIf=\"userForm.get('email').hasError('required')\">\n            Este campo es obligatorio\n          </mat-error>\n          <mat-error *ngIf=\"!userForm.get('email').hasError('required') && userForm.get('email').hasError('email')\">\n            El email no es una dirección válida\n          </mat-error>\n        </mat-form-field>\n        <!-- /EMAIL -->\n\n        <mat-form-field class=\"permits-container\">\n          <mat-label>Permisos</mat-label>\n          <mat-select formControlName=\"roles\">\n            <mat-option *ngFor=\"let permit of permits\" [value]=\"permit\">\n              {{ permit }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n      </mat-card-content>\n      <mat-card-actions mat-dialog-actions align=\"end\">\n        <button type=\"submit\" mat-button cdkFocusInitial color=\"success\">GUARDAR</button>\n      </mat-card-actions>\n    </form>\n  </mat-card>\n\n  <mat-card>\n    <form [formGroup]=\"passwordForm\" (ngSubmit)=\"savePassword()\">\n      <mat-card-header>\n        <mat-card-title>Contraseña</mat-card-title>\n        <mat-card-subtitle>Sustituye la contraseña actual</mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <!-- PASSWORD -->\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n          <div fxFlex=\"70\">\n            <mat-form-field appearance=\"outline\">\n              <mat-label> Contraseña</mat-label>\n              <input type=\"{{ isPasswordHidden ? 'password' : 'text' }}\" matInput #password name=\"password\" formControlName=\"password\" maxlength=\"30\" placeholder=\"Contraseña\">\n              <button type=\"button\" mat-button  matSuffix mat-icon-button aria-label=\"Ver contraseña\" (click)=\"togglePassword();\">\n                <mat-icon>{{ isPasswordHidden ? 'visibility_off' : 'visibility' }}</mat-icon>\n              </button>\n              <mat-error *ngIf=\"passwordForm.get('password').hasError('required')\">\n                Este campo es obligatorio\n              </mat-error>\n            </mat-form-field>\n          </div>\n          <div class=\"create-password-container\" fxFlx=\"30\">\n            <button type=\"button\" mat-raised-button color=\"info\" (click)=\"generatePassword()\">Generar contraseña</button>\n          </div>\n        </div>\n        <!-- /PASSWORD -->\n\n        <div class=\"send-email-container\" style=\"width: 100%;\">\n          <mat-checkbox formControlName=\"send_email\">Enviar acceso y contraseña por correo</mat-checkbox>\n        </div>\n      </mat-card-content>\n      <mat-card-actions mat-dialog-actions align=\"end\">\n        <button type=\"submit\" mat-button cdkFocusInitial color=\"success\">GUARDAR</button>\n      </mat-card-actions>\n    </form>\n  </mat-card>\n\n</div>\n<div mat-dialog-actions align=\"end\">\n  <button type=\"button\" mat-button mat-dialog-close color=\"warn\">CANCELAR</button>\n</div>"

/***/ }),

/***/ "./src/app/admin/users/users-edit/users-edit.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/admin/users/users-edit/users-edit.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-edit-dialog {\n  font-family: 'Exo'; }\n  .user-edit-dialog h3 {\n    color: rgba(48, 48, 48, 0.690196);\n    margin-top: 0; }\n  .user-edit-dialog mat-card {\n    margin-bottom: 25px; }\n  .user-edit-dialog mat-card mat-card-title {\n      font-size: 20px;\n      font-weight: 500;\n      color: rgba(0, 0, 0, 0.72); }\n  .user-edit-dialog mat-card .mat-card-actions {\n      margin-bottom: 0;\n      padding-bottom: 0; }\n  .user-edit-dialog .create-password-container {\n    margin-top: -18px; }\n  .user-edit-dialog .send-email-container {\n    width: 100%; }\n  .user-edit-dialog .permits-container {\n    width: 50%;\n    margin-top: 25px; }\n"

/***/ }),

/***/ "./src/app/admin/users/users-edit/users-edit.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/users/users-edit/users-edit.component.ts ***!
  \****************************************************************/
/*! exports provided: UsersEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersEditComponent", function() { return UsersEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user.service */ "./src/app/admin/users/user.service.ts");
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





var UsersEditComponent = /** @class */ (function () {
    function UsersEditComponent(fb, toastr, user, dialog, data) {
        this.fb = fb;
        this.toastr = toastr;
        this.user = user;
        this.dialog = dialog;
        this.data = data;
        //
        // Permits
        //
        this.permits = ['', 'admin'];
        //
        // Main user object
        //
        this.userForm = this.fb.group({
            _id: [''],
            fullname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            roles: ['']
        });
        //
        // Main password object
        //
        this.passwordForm = this.fb.group({
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            send_email: [false]
        });
        //
        // Must show password?
        //
        this.isPasswordHidden = true;
    }
    UsersEditComponent.prototype.ngOnInit = function () {
        if (this.data && this.data.user) {
            this.userForm.addControl('_id', this.fb.control(''));
            this.userForm.reset(this.data.user);
            this.userForm.get('roles').setValue(this.data.user.roles[0]);
        }
        else
            this.dialog.close();
    };
    /**
     * togglePassword
     * Show or hide the password within the input
     *
     */
    UsersEditComponent.prototype.togglePassword = function () {
        this.isPasswordHidden = !this.isPasswordHidden;
    };
    /**
     * generatePassword
     * Creates a new random password and fill the
     * password input automatically
     *
     */
    UsersEditComponent.prototype.generatePassword = function () {
        var password = this._randomString(12);
        this.passwordForm.get('password').setValue(password);
    };
    /**
     * saveUser
     * Saves the new author to database.
     *
     */
    UsersEditComponent.prototype.saveUser = function () {
        var _this = this;
        // Validation
        if (this.userForm.invalid)
            return;
        //
        // Validation OK
        //
        var user = this.userForm.value;
        user.roles = [this.userForm.value.roles];
        this
            .user
            .update(user)
            .subscribe(function (user) {
            _this.toastr.success('Autor actualizado correctamente', 'Autor');
            _this.dialog.close(user);
        }, function (error) {
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    /**
     * saveUser
     * Saves the new author to database.
     *
     */
    UsersEditComponent.prototype.savePassword = function () {
        var _this = this;
        // Validation Error
        if (this.passwordForm.invalid)
            return;
        //
        // Validation OK
        //
        this
            .user
            .updatePassword(this.userForm.value._id, this.passwordForm.value)
            .subscribe(function () {
            _this.toastr.success('Contraseña actualizada correctamente', 'Usuario');
            _this.dialog.close();
        }, function (error) {
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    /**************************************
     *                                    *
     *           PRIVATE METHODS          *
     *                                    *
     * ************************************/
    /**
     * _randomString
     * Generates a new random string according
     * to the length passed by param
     *
     * @param length {number} - Random string length
     */
    UsersEditComponent.prototype._randomString = function (length) {
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    };
    UsersEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users-edit',
            template: __webpack_require__(/*! ./users-edit.component.html */ "./src/app/admin/users/users-edit/users-edit.component.html"),
            styles: [__webpack_require__(/*! ./users-edit.component.scss */ "./src/app/admin/users/users-edit/users-edit.component.scss")]
        }),
        __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UsersEditComponent);
    return UsersEditComponent;
}());



/***/ }),

/***/ "./src/app/admin/users/users-list/users-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/users/users-list/users-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n\n  <div fxFlex=\"90\">\n    <mat-toolbar color=\"accent\">\n      <mat-toolbar-row>\n        <div class=\"main-icon\"><mat-icon>personal</mat-icon></div>\n        <div><span>Usuarios</span></div>\n        <span class=\"spacer\"></span>\n        <button (click)=\"toggleSearchBar();\" mat-icon-button matTooltip=\"Buscar\">\n          <mat-icon>search</mat-icon>\n        </button>\n        <button (click)=\"openCreateUserDialog()\" mat-icon-button matTooltip=\"Crear usuario\">\n          <mat-icon>add</mat-icon>\n        </button>\n        <button routerLink=\"/admin\" mat-icon-button matTooltip=\"Volver al Dashboard\">\n          <mat-icon>chevron_left</mat-icon>\n        </button>\n      </mat-toolbar-row>\n    </mat-toolbar>\n  </div>\n\n</div>\n<div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n\n  <div fxFlex=\"95\">\n    <mat-tab-group mat-align-tabs=\"center\" color=\"accent\">\n      <mat-tab>\n        <ng-template mat-tab-label>Todos</ng-template>\n\n        <!-- TABLE -- All articles -->\n        <div class=\"table mat-elevation-z8\">\n\n          <!-- PROGRESS BAR  -->\n          <div class=\"progress-bar-container\" class=\"progress-bar-container\">\n            <mat-progress-bar *ngIf=\"isLoading\" mode=\"indeterminate\" color=\"primary\"></mat-progress-bar>\n          </div>\n\n          <!-- SEARCH BAR -->\n          <div *ngIf=\"searchBar\" class=\"search-container\">\n            <mat-form-field>\n              <input matInput placeholder=\"Buscar\" [(ngModel)]=\"searchValue\" (ngModelChange)=\"didFilterUsers($event);\">\n              <button mat-button *ngIf=\"searchValue\" matSuffix mat-icon-button aria-label=\"Borrar\" (click)=\"searchValue='';didFilterUsers($event)\">\n                <mat-icon>close</mat-icon>\n              </button>\n            </mat-form-field>\n          </div>\n\n          <!-- NO ITEMS FOR SHOWING -->\n          <div *ngIf=\"paginationConfig.totalItems === 0 && !isLoading\" class=\"no-results-container\">\n            <h3>No hay usuarios para mostrar</h3>\n          </div>\n\n          <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"didSortUsers($event)\" *ngIf=\"paginationConfig.totalItems > 0\">\n    \n            <!-- Fullname Column -->\n            <ng-container matColumnDef=\"fullname\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>\n              <td mat-cell *matCellDef=\"let user\"> <strong>{{ user.fullname }}</strong> </td>\n            </ng-container>\n    \n            <!-- Email Column -->\n            <ng-container matColumnDef=\"email\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>\n              <td mat-cell *matCellDef=\"let user\"> {{ user.email }} </td>\n            </ng-container>\n\n            <!-- Permits At Column -->\n            <ng-container matColumnDef=\"permits\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Permisos </th>\n              <td mat-cell *matCellDef=\"let user\"> {{ user.roles[0] ? user.roles[0] : '-' }} </td>\n            </ng-container>\n    \n            <!-- Created At Column -->\n            <ng-container matColumnDef=\"createdAt\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Creado </th>\n              <td mat-cell *matCellDef=\"let user\"> {{ user.createdAt | date:'longDate' }} </td>\n            </ng-container>\n\n            <!-- Actions At Column -->\n            <ng-container matColumnDef=\"actions\">\n              <th mat-header-cell *matHeaderCellDef> </th>\n              <td mat-cell *matCellDef=\"let user\" class=\"text-right\">\n                <button mat-icon-button matTooltip=\"Editar usuario\" color=\"info\" (click)=\"openEditUserDialog(user)\">\n                  <mat-icon aria-label=\"Editar usuario\">create</mat-icon>\n                </button>\n                <button *ngIf=\"user._id !== myUser._id\" [swal]=\"userDeletionAlert\" mat-icon-button matTooltip=\"Borrar usuario\" color=\"info\" (confirm)=\"deleteUser(user)\">\n                  <mat-icon aria-label=\"Editar usuario\">delete</mat-icon>\n                </button>\n              </td>\n            </ng-container>\n\n            <!-- Footer -->\n            <ng-container matColumnDef=\"pagination\">\n              <td mat-footer-cell *matFooterCellDef colspan=\"5\">\n                <div class=\"pagination-container\">\n                  <ul>\n                    <li *ngFor=\"let user of users | paginate: paginationConfig\">pene</li>\n                  </ul>\n                  <pagination-controls [id]=\"paginationConfig.id\"\n                  (pageChange)=\"didPageChange($event)\"\n                  maxSize=\"7\"\n                  directionLinks=\"true\"\n                  autoHide=\"false\"\n                  responsive=\"true\"\n                  previousLabel=\"Anterior\"\n                  nextLabel=\"Siguiente\"\n                  screenReaderPaginationLabel=\"Paginación\"\n                  screenReaderPageLabel=\"página\"\n                  screenReaderCurrentLabel=\"Estás en la página\">\n                  </pagination-controls>\n                </div>\n              </td>\n            </ng-container>\n    \n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n            <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n            <tr mat-footer-row *matFooterRowDef=\"['pagination']\"></tr>\n          </table>\n    \n        </div>\n        <!-- /TABLE - All articles -->\n\n      </mat-tab>\n\n    </mat-tab-group>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/admin/users/users-list/users-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/admin/users/users-list/users-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table {\n  background-color: #fff;\n  margin-top: 20px;\n  width: 98%;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 30px; }\n  .table table {\n    width: 100%; }\n  .table table .pagination-container {\n      text-align: right; }\n  .table .no-results-container {\n    text-align: center;\n    padding-top: 50px;\n    padding-bottom: 50px; }\n  .table .progress-bar-container {\n    height: 3px; }\n  .table .progress-bar-container mat-progress-bar {\n      height: 3px; }\n  .table .search-container {\n    padding: 15px 22px; }\n  .table .search-container mat-form-field {\n      width: 100%; }\n"

/***/ }),

/***/ "./src/app/admin/users/users-list/users-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/users/users-list/users-list.component.ts ***!
  \****************************************************************/
/*! exports provided: UsersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersListComponent", function() { return UsersListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _users_create_users_create_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../users-create/users-create.component */ "./src/app/admin/users/users-create/users-create.component.ts");
/* harmony import */ var _users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../users-edit/users-edit.component */ "./src/app/admin/users/users-edit/users-edit.component.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../user.service */ "./src/app/admin/users/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(user, auth, toastr, dialog) {
        this.user = user;
        this.auth = auth;
        this.toastr = toastr;
        this.dialog = dialog;
        this.users = [];
        this.paginationConfig = {
            id: 'users_pagination',
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: 0
        };
        this.searchBar = false;
        this.searchBarInput = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.isLoading = true;
        this.displayedColumns = ['fullname', 'email', 'permits', 'createdAt', 'actions'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](this.users);
        //
        // Alerts
        //
        this.userDeletionAlert = {
            title: '¿Estás seguro?',
            text: 'El usuario será borrado y no estará disponible',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        };
        //
        // Dialogs
        //
        this.createUserDialog = null;
        this.editUserDialog = null;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.sort = this.sort;
        //
        // Loading users first time
        //
        this.loadUsers();
        //
        // Getting user info
        //
        this.auth.me().subscribe(function (data) {
            _this.myUser = data.user;
        });
        //
        // Debounce for searching bar
        //
        this
            .searchBarInput
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])())
            .subscribe(function (filterValue) {
            _this.loadUsers();
        });
    };
    /**
     * loadUsers
     * Calls to backend in order to retrieve all the users
     * according to the query.
     *
     */
    UsersListComponent.prototype.loadUsers = function (filterValue) {
        var _this = this;
        this.isLoading = true;
        this
            .user
            .getAll({
            page: this.paginationConfig.currentPage,
            pageSize: this.paginationConfig.itemsPerPage,
            sort: this.sortValue && this.sortValue.direction ? this.sortValue.direction : '',
            sortField: this.sortValue && this.sortValue.active ? this.sortValue.active : '',
            filter: this.searchValue ? this.searchValue : ''
        }, 'no-loading-bar')
            .subscribe(function (users) {
            _this.paginationConfig.currentPage = users.page;
            _this.paginationConfig.totalItems = users.totalDocs;
            _this.paginationConfig.itemsPerPage = users.limit;
            _this.dataSource.data = users.docs;
            setTimeout(function () {
                _this.isLoading = false;
            }, 1000);
        }, function (error) {
            console.error(error);
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    /**
     * didPageChange
     * Triggered when user changes the current
     * page via pagination.
     *
     */
    UsersListComponent.prototype.didPageChange = function (page) {
        this.paginationConfig.currentPage = page;
        this.loadUsers();
    };
    /**
     * toggleSearchBar
     * Show or hide the search bar
     *
     */
    UsersListComponent.prototype.toggleSearchBar = function () {
        this.searchBar = !this.searchBar;
    };
    /**
     * didFilterUsers
     * Triggered when user is trying to filter
     * results by writing in the searching bar.
     *
     */
    UsersListComponent.prototype.didFilterUsers = function (event) {
        this.searchBarInput.next(event);
    };
    /**
     * didSortUsers
     * Triggered when user is trying to sort
     * a column in the users table.
     *
     */
    UsersListComponent.prototype.didSortUsers = function (event) {
        this.sortValue = event;
        this.loadUsers();
    };
    /**
     * deleteUser
     * Set up as deleted the given user
     *
     * @param user - User that is going to be deleted
     */
    UsersListComponent.prototype.deleteUser = function (user) {
        var _this = this;
        if (!user)
            return;
        this
            .user
            .remove(user._id)
            .subscribe(function () {
            _this.loadUsers();
            _this.toastr.success('El usuario ha sido borrado correctamente', 'Usuario');
        }, function (error) {
            console.error(error);
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    /**
     * openCreateUserDialog
     * Open the user creation dialog
     *
     */
    UsersListComponent.prototype.openCreateUserDialog = function () {
        var _this = this;
        this.createUserDialog = this.dialog.open(_users_create_users_create_component__WEBPACK_IMPORTED_MODULE_6__["UsersCreateComponent"], {
            width: '700px',
            data: { dialog: this.createUserDialog }
        });
        this.createUserDialog.afterClosed().subscribe(function (user) {
            if (user)
                _this.loadUsers();
        });
    };
    /**
     * openEditUserDialog
     * Open the user edition dialog
     *
     */
    UsersListComponent.prototype.openEditUserDialog = function (user) {
        var _this = this;
        if (!user)
            return;
        this.editUserDialog = this.dialog.open(_users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_7__["UsersEditComponent"], {
            width: '700px',
            data: {
                user: user,
                dialog: this.editUserDialog
            }
        });
        this.editUserDialog.afterClosed().subscribe(function (user) {
            if (user)
                _this.loadUsers();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], UsersListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", String)
    ], UsersListComponent.prototype, "searchValue", void 0);
    UsersListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users-list',
            template: __webpack_require__(/*! ./users-list.component.html */ "./src/app/admin/users/users-list/users-list.component.html"),
            styles: [__webpack_require__(/*! ./users-list.component.scss */ "./src/app/admin/users/users-list/users-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], UsersListComponent);
    return UsersListComponent;
}());



/***/ }),

/***/ "./src/app/admin/users/users-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/users/users-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: UsersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRoutingModule", function() { return UsersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
/* harmony import */ var _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users-list/users-list.component */ "./src/app/admin/users/users-list/users-list.component.ts");
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
            { path: '', component: _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_3__["UsersListComponent"], pathMatch: 'full' }
        ]
    }];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());



/***/ }),

/***/ "./src/app/admin/users/users.module.ts":
/*!*********************************************!*\
  !*** ./src/app/admin/users/users.module.ts ***!
  \*********************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sweetalert2/ngx-sweetalert2 */ "./node_modules/@sweetalert2/ngx-sweetalert2/fesm5/sweetalert2-ngx-sweetalert2.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users-list/users-list.component */ "./src/app/admin/users/users-list/users-list.component.ts");
/* harmony import */ var _users_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users-routing.module */ "./src/app/admin/users/users-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user.service */ "./src/app/admin/users/user.service.ts");
/* harmony import */ var _users_create_users_create_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users-create/users-create.component */ "./src/app/admin/users/users-create/users-create.component.ts");
/* harmony import */ var _users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./users-edit/users-edit.component */ "./src/app/admin/users/users-edit/users-edit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_2__["SweetAlert2Module"].forRoot({
                    buttonsStyling: false,
                    confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
                    cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
                }),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_3__["NgxPaginationModule"],
                _users_routing_module__WEBPACK_IMPORTED_MODULE_5__["UsersRoutingModule"]
            ],
            declarations: [
                _users_list_users_list_component__WEBPACK_IMPORTED_MODULE_4__["UsersListComponent"],
                _users_create_users_create_component__WEBPACK_IMPORTED_MODULE_8__["UsersCreateComponent"],
                _users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_9__["UsersEditComponent"]
            ],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"]],
            entryComponents: [
                _users_create_users_create_component__WEBPACK_IMPORTED_MODULE_8__["UsersCreateComponent"],
                _users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_9__["UsersEditComponent"]
            ]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-admin-users-users-module.js.map