(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-request-request-module"],{

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

/***/ "./src/app/admin/request/request-list/request-list.component.html":
/*!************************************************************************!*\
  !*** ./src/app/admin/request/request-list/request-list.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"100\">\n        <mat-toolbar color=\"accent\">\n            <mat-toolbar-row>\n              <div class=\"main-icon\"><mat-icon>notification_important</mat-icon></div>\n              <div><span class=\"title\">Peticiones</span></div>\n              <span class=\"spacer\"></span>\n              <button routerLink=\"/admin/\" mat-icon-button matTooltip=\"Volver al Inicio\">\n                <mat-icon>chevron_left</mat-icon>\n              </button>\n            </mat-toolbar-row>\n        </mat-toolbar>\n\n        <!-- PROGRESS BAR  -->\n        <div class=\"progress-bar-container\" class=\"main-container progress-bar-container\">\n          <mat-progress-bar *ngIf=\"isLoading\" mode=\"indeterminate\" color=\"primary\"></mat-progress-bar>\n        </div>\n\n        <!-- NO ITEMS FOR SHOWING -->\n        <div *ngIf=\"!isLoading && requests === null\" class=\"no-results-container\">\n          <h3> No existen peticiones </h3>\n        </div>\n\n        <!-- RESULTS -->\n        <div class=\"requests\" fxLayout=\"row wrap\" fxLayoutAlign=\"space-between start\">\n          <mat-card class=\"element\" *ngFor=\"let request of requests\" fxFlex=\"100\" fxLayout=\"row wrap\" fxLayoutAlign=\"space-between start\">\n            <div fxFlex=\"35\" fxFlex.sm=\"49\">\n              <h3> {{ request.nameSubject }} </h3>\n              <p>  {{ request.codeSubject }} </p>\n              <p class=\"who\"> de {{ request.nameUser }} </p>\n            </div>\n            <div fxFlex=\"40\" fxFlex.sm=\"49\">\n              <h4> Software </h4>\n              <!-- <p>\n                {{request.software}}\n              </p> -->\n              <p> Visual Studio Code - Versión: 1.12</p>\n              <p> Oracle Server - Versión: 11g </p>\n              <p> Pycharm - Versión: 2.14 </p>\n              <p> R Studio - Versión: 1.1 </p>\n            </div>\n            <div class=\"check-wrap\" fxFlex=\"15\" fxFlex.sm=\"10\" fxLayout=\"column\">\n              <mat-checkbox\n                class=\"checkbox\"\n                [(ngModel)]=\"request.available\">\n                Disponibles\n              </mat-checkbox>\n              <mat-checkbox\n                class=\"checkbox\"\n                [(ngModel)]=\"request.installed\">\n                Instaladas\n              </mat-checkbox>\n            </div>\n          </mat-card>\n        </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/request/request-list/request-list.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/admin/request/request-list/request-list.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  max-width: 1200px;\n  width: 90%;\n  margin: 0px auto;\n  min-height: calc(100vh - 85px); }\n\n.title {\n  font-weight: 900;\n  padding-left: 5px; }\n\n.main-container {\n  max-width: 1024px;\n  width: 100%;\n  margin: 0px auto;\n  padding: 20px 0px; }\n\nh3 {\n  font-size: 18px; }\n\n.no-results-container {\n  margin-top: 40px; }\n\n.requests .element {\n  margin-bottom: 40px;\n  position: relative; }\n\n.requests .element .who {\n    color: #a9a9a9;\n    position: absolute;\n    bottom: 10px; }\n\n.sidenav-main-content {\n  display: flex;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  background-color: #f4f3f3;\n  width: 100%; }\n\n.check-wrap {\n  padding-top: 20px; }\n\n.check-wrap .checkbox {\n    margin: 0 10px 10px; }\n"

/***/ }),

/***/ "./src/app/admin/request/request-list/request-list.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/request/request-list/request-list.component.ts ***!
  \**********************************************************************/
/*! exports provided: RequestListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestListComponent", function() { return RequestListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _request_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../request.service */ "./src/app/admin/request/request.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RequestListComponent = /** @class */ (function () {
    function RequestListComponent(requestService) {
        this.requestService = requestService;
        this.requests = null;
        this.isLoading = true;
    }
    RequestListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this
            .requestService
            .getAllRequests()
            .subscribe(function (request) {
            console.log(request);
            _this.requests = request;
            console.log('Request: ' + request);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
        });
    };
    RequestListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-request-list',
            template: __webpack_require__(/*! ./request-list.component.html */ "./src/app/admin/request/request-list/request-list.component.html"),
            styles: [__webpack_require__(/*! ./request-list.component.scss */ "./src/app/admin/request/request-list/request-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_request_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"]])
    ], RequestListComponent);
    return RequestListComponent;
}());



/***/ }),

/***/ "./src/app/admin/request/request-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/request/request-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: RequestRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestRoutingModule", function() { return RequestRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_user_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../admin-user-guard */ "./src/app/admin/admin-user-guard.ts");
/* harmony import */ var _request_list_request_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-list/request-list.component */ "./src/app/admin/request/request-list/request-list.component.ts");
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
            { path: '', component: _request_list_request_list_component__WEBPACK_IMPORTED_MODULE_3__["RequestListComponent"], pathMatch: 'full' }
        ]
    }];
var RequestRoutingModule = /** @class */ (function () {
    function RequestRoutingModule() {
    }
    RequestRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], RequestRoutingModule);
    return RequestRoutingModule;
}());



/***/ }),

/***/ "./src/app/admin/request/request.module.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/request/request.module.ts ***!
  \*************************************************/
/*! exports provided: RequestModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestModule", function() { return RequestModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _request_list_request_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-list/request-list.component */ "./src/app/admin/request/request-list/request-list.component.ts");
/* harmony import */ var _request_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-routing.module */ "./src/app/admin/request/request-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var RequestModule = /** @class */ (function () {
    function RequestModule() {
    }
    RequestModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _request_routing_module__WEBPACK_IMPORTED_MODULE_3__["RequestRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ],
            declarations: [_request_list_request_list_component__WEBPACK_IMPORTED_MODULE_2__["RequestListComponent"]]
        })
    ], RequestModule);
    return RequestModule;
}());



/***/ }),

/***/ "./src/app/admin/request/request.service.ts":
/*!**************************************************!*\
  !*** ./src/app/admin/request/request.service.ts ***!
  \**************************************************/
/*! exports provided: RequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestService", function() { return RequestService; });
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


var RequestService = /** @class */ (function () {
    function RequestService(http) {
        this.http = http;
    }
    /* Get All requests of user */
    RequestService.prototype.getAllRequests = function () {
        var url = '/api/request/getall';
        return this.http.get(url, {});
    };
    RequestService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], RequestService);
    return RequestService;
}());



/***/ })

}]);
//# sourceMappingURL=app-admin-request-request-module.js.map