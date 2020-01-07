(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-admin-module"],{

/***/ "./src/app/admin/admin-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/admin-routing.module.ts ***!
  \***********************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layouts/admin-layout/admin-layout.component */ "./src/app/layouts/admin-layout/admin-layout.component.ts");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [{
        path: '',
        canActivate: [_admin_user_guard__WEBPACK_IMPORTED_MODULE_4__["OnlyAdminUsersGuard"]],
        component: _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_3__["AdminLayoutComponent"],
        children: [
            { path: '', component: _admin_component__WEBPACK_IMPORTED_MODULE_2__["AdminComponent"], pathMatch: 'full' },
            { path: 'users', loadChildren: 'app/admin/users/users.module#UsersModule' },
            { path: 'subjects', loadChildren: 'app/admin/subjects/subjects.module#SubjectsModule' },
            { path: 'request', loadChildren: 'app/admin/request/request.module#RequestModule' },
            { path: 'import', loadChildren: 'app/admin/import/import.module#ImportModule' }
        ]
    }, {
        path: '**', redirectTo: 'admin'
    }];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());



/***/ }),

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

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <!-- <h2> Asignaturas </h2>-->\n  <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"100\">\n      <mat-toolbar color=\"accent\">\n          <mat-toolbar-row>\n            <div class=\"main-icon\"><mat-icon>class</mat-icon></div>\n            <div><span class=\"title\">Panel de administración </span></div>\n            <span class=\"spacer\"></span>\n            <button mat-icon-button>\n              <mat-icon>assessment</mat-icon>\n            </button>\n            <button routerLink=\"/\" mat-icon-button matTooltip=\"Volver al Inicio\">\n              <mat-icon>chevron_left</mat-icon>\n            </button>\n          </mat-toolbar-row>\n      </mat-toolbar>\n    </div>\n  </div>\n  <div class=\"subjects\" fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" fxLayoutGap=\"2%\">\n    <div fxFlex=\"32\" fxFlex.sm=\"32\">\n      <mat-card class=\"subject-card\">\n        <mat-card-header>\n          <mat-card-title class=\"title\"> Alumnos </mat-card-title>\n          <mat-card-subtitle class=\"subtitle\">Ver usuarios matriculados en las asignaturas.</mat-card-subtitle>\n        </mat-card-header>\n        <mat-card-content class=\"teacher\">\n          <p> Listar <span>usuarios</span> matriculados. </p>\n          <p> Editar <span>usuarios</span> matriculados. </p>\n          <p> Añadir <span>usuarios</span> matriculados. </p>\n          <p> Eliminar <span>usuarios</span> matriculados. </p>\n        </mat-card-content>\n        <mat-card-actions class=\"buttons\" fxLayoutAlign=\"end\">\n          <button routerLink=\"/admin/users\" mat-button matTooltip=\"Ver detalles\" mat-mini-fab color=\"info\"><mat-icon aria-label=\"Ver detalles\">  person_pin </mat-icon></button> </mat-card-actions>\n      </mat-card>\n    </div>\n    <div fxFlex=\"32\" fxFlex.sm=\"32\">\n      <mat-card class=\"subject-card\">\n        <mat-card-header>\n          <mat-card-title class=\"title\"> Asignaturas </mat-card-title>\n          <mat-card-subtitle class=\"subtitle\">Información de las asignaturas de la plataforma.</mat-card-subtitle>\n        </mat-card-header>\n        <mat-card-content class=\"teacher\">\n          <p> Listar <span>asignaturas</span> disponibles </p>\n          <p> Editar <span>asignaturas</span> disponibles. </p>\n        </mat-card-content>\n        <mat-card-actions class=\"buttons\" fxLayoutAlign=\"end\">\n          <button routerLink=\"/admin/subjects\" mat-button matTooltip=\"Ver detalles\" mat-mini-fab color=\"info\"><mat-icon aria-label=\"Ver detalles\">  bookmarks </mat-icon></button> </mat-card-actions>\n      </mat-card>\n    </div>\n    <div fxFlex=\"32\" fxFlex.sm=\"32\">\n      <mat-card class=\"subject-card\">\n        <mat-card-header>\n          <mat-card-title class=\"title\"> Peticiones </mat-card-title>\n          <mat-card-subtitle class=\"subtitle\">Peticiones realizadas por el equipo docente.</mat-card-subtitle>\n        </mat-card-header>\n        <mat-card-content class=\"teacher\">\n          <p> Listar <span>peticiones</span> disponibles </p>\n          <p> Gestionar <span>peticiones</span> disponibles. </p>\n        </mat-card-content>\n        <mat-card-actions class=\"buttons\" fxLayoutAlign=\"end\">\n          <button routerLink=\"/admin/request\" mat-button matTooltip=\"Ver detalles\" mat-mini-fab color=\"info\"><mat-icon aria-label=\"Ver detalles\"> notification_important </mat-icon></button> </mat-card-actions>\n      </mat-card>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/admin.component.scss":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*-----------------------------------------------\n                   Variables\n-----------------------------------------------*/\n::ng-deep body .dashboard .container {\n  max-width: 1200px;\n  width: 90%;\n  margin: 0px auto;\n  min-height: calc(100vh - 85px); }\n::ng-deep .dashboard.sidenav-main-content {\n  padding-top: 0px !important; }\n.main-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto;\n  padding: 20px 0px; }\n.title {\n  font-weight: 900;\n  font-size: 20px; }\n.subjects, .no-results-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto; }\n.no-results-container h3 {\n  font-size: 24px; }\n.subject-card {\n  margin-bottom: 20px; }\n.subject-card .teacher {\n    line-height: 0.8;\n    margin-top: 40px; }\n.subject-card .teacher span {\n      color: #002E67;\n      font-weight: 600px; }\n.subject-card .buttons {\n    margin-top: 20px;\n    margin-bottom: 0px;\n    margin-right: 0px; }\n.subject-card .buttons button {\n      margin-left: 10px;\n      border-radius: 50% !important; }\n"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
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

var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
        console.log('DASHBOARD');
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.scss */ "./src/app/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin.module.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.module.ts ***!
  \***************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/admin/admin-routing.module.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
/* harmony import */ var _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../layouts/admin-layout/admin-layout.component */ "./src/app/layouts/admin-layout/admin-layout.component.ts");
/* harmony import */ var _headers_header_admin_header_admin_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../headers/header-admin/header-admin.component */ "./src/app/headers/header-admin/header-admin.component.ts");
/* harmony import */ var _authenticated_user_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./authenticated-user-guard */ "./src/app/admin/authenticated-user-guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_6__["AdminLayoutComponent"],
                _headers_header_admin_header_admin_component__WEBPACK_IMPORTED_MODULE_7__["HeaderAdminComponent"],
                _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__["AdminRoutingModule"]
            ],
            providers: [
                _admin_user_guard__WEBPACK_IMPORTED_MODULE_5__["OnlyAdminUsersGuard"],
                _authenticated_user_guard__WEBPACK_IMPORTED_MODULE_8__["OnlyAuthenticatedUsersGuard"]
            ]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/admin/authenticated-user-guard.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/authenticated-user-guard.ts ***!
  \***************************************************/
/*! exports provided: OnlyAuthenticatedUsersGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnlyAuthenticatedUsersGuard", function() { return OnlyAuthenticatedUsersGuard; });
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




var OnlyAuthenticatedUsersGuard = /** @class */ (function () {
    function OnlyAuthenticatedUsersGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /*
     * Only authenticated users are allowed to pass.
     * We don't check roles, only state.
     *
     * If user is not allowed, is redirected to home
     *
     */
    OnlyAuthenticatedUsersGuard.prototype.canActivate = function () {
        var _this = this;
        return this.authService.isLoggedIn().map(function (logged) {
            var user = window.user;
            if (logged)
                return logged;
            else
                _this.router.navigate(['/404']);
        });
    };
    OnlyAuthenticatedUsersGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], OnlyAuthenticatedUsersGuard);
    return OnlyAuthenticatedUsersGuard;
}());



/***/ }),

/***/ "./src/app/headers/header-admin/header-admin.component.html":
/*!******************************************************************!*\
  !*** ./src/app/headers/header-admin/header-admin.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"admin\">\n  <mat-toolbar>\n    <a [routerLink]=\"['/']\" id=\"logo\">\n      <!-- <img class=\"logo\" src=\"../../assets/img/logo-text.gif\" alt=\"GPSP\" /> -->\n    </a>\n    <span class=\"spacer\"></span>\n    <span class=\"spacer\"></span>\n\n    <div *ngIf=\"user\" class=\"menu\">\n      <a [matMenuTriggerFor]=\"menu\">\n        <mat-icon>account_circle</mat-icon>{{ user.fullname }}\n      </a>\n      <mat-menu #menu=\"matMenu\" yPosition=\"below\" [overlapTrigger]=\"false\">\n        <button mat-menu-item [routerLink]=\"['/admin']\" [routerLinkActive]=\"'header-button-active'\" [routerLinkActiveOptions]=\"{ exact: true }\"><mat-icon class=\"header-menu-icon-margin\">home</mat-icon>Dashboard</button>\n        <button mat-menu-item *ngFor=\"let section of dropdown.top\" [routerLink]=\"[section.url]\" [routerLinkActive]=\"'header-button-active'\"><mat-icon class=\"header-menu-icon-margin\">{{ section.icon }}</mat-icon>{{ section.name }}</button>\n        <mat-divider></mat-divider>\n        <button mat-menu-item *ngFor=\"let section of dropdown.middle\" [routerLink]=\"[section.url]\" [routerLinkActive]=\"'header-button-active'\"><mat-icon class=\"header-menu-icon-margin\">{{ section.icon }}</mat-icon>{{ section.name }}</button>\n        <mat-divider></mat-divider>\n        <button mat-menu-item *ngFor=\"let section of dropdown.bottom\" [routerLink]=\"[section.url]\" [routerLinkActive]=\"'header-button-active'\"><mat-icon class=\"header-menu-icon-margin\">{{ section.icon }}</mat-icon>{{ section.name }}</button>\n        <button mat-menu-item (click)=\"logout()\"><mat-icon class=\"header-menu-icon-margin\">power_settings_news</mat-icon>Salir</button>\n      </mat-menu>\n    </div>\n\n  </mat-toolbar>\n</header>\n"

/***/ }),

/***/ "./src/app/headers/header-admin/header-admin.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/headers/header-admin/header-admin.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "header {\n  width: 100%;\n  height: 83px; }\n  header #logo {\n    background: url('ulpgc_graficos_v14.svg') -641px -2128px no-repeat;\n    background-size: 1900px;\n    width: 370px;\n    height: 70px; }\n  header .mat-toolbar {\n    background-color: #313030;\n    color: #fff;\n    padding-top: 10px;\n    height: 83px;\n    position: fixed;\n    z-index: 10; }\n  header .mat-icon {\n    vertical-align: middle;\n    width: 40px;\n    height: 40px;\n    font-size: 40px;\n    line-height: 40px; }\n  header .social-icon {\n    margin-right: 15px; }\n  header .menu {\n    margin-top: -5px; }\n  header .menu mat-icon {\n      margin-left: 15px;\n      margin-right: 5px; }\n  header button {\n    margin-top: -5px; }\n  header a {\n    cursor: pointer; }\n  .header-menu-icon-margin {\n  margin-top: -4px; }\n  .header-button-active {\n  color: #4e94a8;\n  font-weight: 600; }\n  .header-button-active mat-icon {\n    color: #4e94a8; }\n"

/***/ }),

/***/ "./src/app/headers/header-admin/header-admin.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/headers/header-admin/header-admin.component.ts ***!
  \****************************************************************/
/*! exports provided: HeaderAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderAdminComponent", function() { return HeaderAdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _layouts_admin_layout_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layouts/admin-layout/menu */ "./src/app/layouts/admin-layout/menu.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderAdminComponent = /** @class */ (function () {
    function HeaderAdminComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.user = {};
    }
    HeaderAdminComponent.prototype.ngOnInit = function () {
        //
        // Loading dropdown menu
        //
        this.dropdown = new _layouts_admin_layout_menu__WEBPACK_IMPORTED_MODULE_3__["Menu"]();
    };
    HeaderAdminComponent.prototype.logout = function () {
        this.authService.signOut();
        this.navigate('');
    };
    HeaderAdminComponent.prototype.navigate = function (link) {
        this.router.navigate([link]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], HeaderAdminComponent.prototype, "user", void 0);
    HeaderAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'header-admin',
            template: __webpack_require__(/*! ./header-admin.component.html */ "./src/app/headers/header-admin/header-admin.component.html"),
            styles: [__webpack_require__(/*! ./header-admin.component.scss */ "./src/app/headers/header-admin/header-admin.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], HeaderAdminComponent);
    return HeaderAdminComponent;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header-admin [user]=\"user\"></header-admin>\n<div class=\"wrapper-app\">\n\n  <mat-sidenav-container class=\"dashboard\" autosize>\n    <mat-sidenav #sidenav class=\"sidenav\" mode=\"side\" opened=\"true\" [fixedInViewport]=\"'true'\" [fixedTopGap]=\"'83'\">\n  \n      <mat-nav-list>\n        <mat-list-item>\n          <button mat-icon-button matTooltip=\"{{ !isExpanded ? 'Expandir menú' : 'Ocultar menú' }}\" [matTooltipPosition]=\"'right'\"  (click)=\"isExpanded = !isExpanded\">\n            <mat-icon *ngIf=\"!isExpanded\">chevron_right</mat-icon>\n            <mat-icon *ngIf=\"isExpanded\">chevron_left</mat-icon>\n          </button>\n        </mat-list-item>\n\n        <mat-divider class=\"margin-top\"></mat-divider>\n\n        <mat-list-item routerLink=\"/admin\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\">\n          <mat-icon mat-list-icon matTooltip=\"{{ !isExpanded ? 'Dashboard' : '' }}\" [matTooltipPosition]=\"'right'\">home</mat-icon>\n          <p matLine *ngIf=\"isExpanded\">Dashboard</p>\n        </mat-list-item>\n        <mat-list-item *ngFor=\"let section of menu.top\" routerLink=\"{{ section.url }}\" matTooltip=\"{{ !isExpanded ? section.name : '' }}\"  [matTooltipPosition]=\"'right'\"  routerLinkActive=\"active\">\n          <mat-icon mat-list-icon>{{ section.icon }}</mat-icon>\n          <p matLine *ngIf=\"isExpanded\">{{ section.name }}</p>\n        </mat-list-item>\n\n        <mat-divider class=\"margin-bottom\"></mat-divider>\n\n        <mat-list-item *ngFor=\"let section of menu.middle\" routerLink=\"{{ section.url }}\" routerLinkActive=\"active\" matTooltip=\"{{ !isExpanded ? section.name : '' }}\"  [matTooltipPosition]=\"'right'\">\n          <mat-icon mat-list-icon>{{ section.icon }}</mat-icon>\n          <p matLine *ngIf=\"isExpanded\">{{ section.name }}</p>\n        </mat-list-item>\n\n        <mat-divider class=\"margin-top\"></mat-divider>\n\n        <mat-list-item *ngFor=\"let section of menu.bottom\" routerLink=\"{{ section.url }}\" routerLinkActive=\"active\">\n          <mat-icon mat-list-icon>{{ section.icon }}</mat-icon>\n          <p matLine *ngIf=\"isExpanded\">{{ section.name }}</p>\n        </mat-list-item>\n\n        <mat-list-item (click)=\"logout()\">\n          <mat-icon mat-list-icon matTooltip=\"{{ !isExpanded ? 'Salir' : '' }}\" [matTooltipPosition]=\"'right'\">power_settings_new</mat-icon>\n          <p matLine *ngIf=\"isExpanded\">Salir</p>\n        </mat-list-item>\n\n      </mat-nav-list>\n\n    </mat-sidenav>\n  \n    <div class=\"sidenav-main-content\">\n      <router-outlet></router-outlet>\n    </div>\n    \n  </mat-sidenav-container>\n</div>"

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dashboard {\n  overflow: visible !important; }\n  .dashboard .sidenav {\n    background-color: #414141;\n    color: #fff;\n    overflow-y: scroll;\n    overflow-x: hidden; }\n  .dashboard .sidenav mat-list-item {\n      color: #fff; }\n  .dashboard .sidenav mat-divider {\n      border-color: rgba(255, 255, 255, 0.17); }\n  .dashboard .sidenav mat-divider.margin-top {\n      margin-top: 20px; }\n  .dashboard .sidenav mat-divider.margin-bottom {\n      margin-bottom: 20px; }\n  .dashboard .sidenav mat-list-item.active {\n      color: #ffd740; }\n  .dashboard .sidenav mat-list-item.active p {\n        font-weight: 800; }\n  .dashboard .sidenav-main-content {\n    display: flex;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n    background-color: #f4f3f3;\n    width: 100%; }\n  :host ::ng-deep router-outlet + *:not(nav) {\n  width: 100%; }\n  :host ::ng-deep router-outlet + *:not(nav) mat-toolbar {\n    max-width: 1024px;\n    margin: 20px auto; }\n  :host ::ng-deep router-outlet + *:not(nav) mat-toolbar .main-icon {\n      margin-top: 5px;\n      margin-right: 5px; }\n  :host ::ng-deep router-outlet + *:not(nav) mat-toolbar a {\n      text-decoration: none;\n      color: #118fe8; }\n  :host ::ng-deep router-outlet + *:not(nav) .mat-progress-bar-fill::after {\n    background-color: #118fe8; }\n  :host ::ng-deep router-outlet + *:not(nav) .mat-progress-bar-buffer {\n    background-color: #8ed5f1; }\n  :host ::ng-deep router-outlet + *:not(nav) .mat-progress-bar {\n    height: 3px; }\n"

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.component.ts ***!
  \****************************************************************/
/*! exports provided: AdminLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutComponent", function() { return AdminLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu */ "./src/app/layouts/admin-layout/menu.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(authService, router, elementRef) {
        this.authService = authService;
        this.router = router;
        this.elementRef = elementRef;
        this.isExpanded = false;
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        //
        // Loading menu
        //
        var _this = this;
        this.menu = new _menu__WEBPACK_IMPORTED_MODULE_3__["Menu"]();
        // init this.user on startup
        this.authService.me().subscribe(function (data) {
            if (!data)
                _this.user = null;
            else
                _this.user = data.user;
        });
        // update this.user after login/register/logout
        this.userSubscription = this.authService.$userSource.subscribe(function (user) {
            _this.user = user;
        });
    };
    AdminLayoutComponent.prototype.ngAfterViewInit = function () {
        //
        // Changing body background color
        //
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f3f3';
    };
    AdminLayoutComponent.prototype.logout = function () {
        this.authService.signOut();
        this.navigate('');
    };
    AdminLayoutComponent.prototype.navigate = function (link) {
        this.router.navigate([link]);
    };
    AdminLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'admin-layout',
            template: __webpack_require__(/*! ./admin-layout.component.html */ "./src/app/layouts/admin-layout/admin-layout.component.html"),
            styles: [__webpack_require__(/*! ./admin-layout.component.scss */ "./src/app/layouts/admin-layout/admin-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-admin-admin-module.js.map