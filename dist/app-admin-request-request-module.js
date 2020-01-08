(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-admin-request-request-module"],{

/***/ "./src/app/admin/request/request-list/request-list.component.html":
/*!************************************************************************!*\
  !*** ./src/app/admin/request/request-list/request-list.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"main-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <div fxFlex=\"100\">\n        <mat-toolbar color=\"accent\">\n            <mat-toolbar-row>\n              <div class=\"main-icon\"><mat-icon>notification_important</mat-icon></div>\n              <div><span class=\"title\">Peticiones</span></div>\n              <span class=\"spacer\"></span>\n              <button routerLink=\"/admin/\" mat-icon-button matTooltip=\"Volver al Inicio\">\n                <mat-icon>chevron_left</mat-icon>\n              </button>\n            </mat-toolbar-row>\n        </mat-toolbar>\n\n        <!-- PROGRESS BAR  -->\n        <div class=\"progress-bar-container\" class=\"main-container progress-bar-container\">\n          <mat-progress-bar *ngIf=\"isLoading\" mode=\"indeterminate\" color=\"primary\"></mat-progress-bar>\n        </div>\n\n        <!-- NO ITEMS FOR SHOWING -->\n        <div *ngIf=\"!isLoading && requests === null\" class=\"no-results-container\">\n          <h3> No existen peticiones </h3>\n        </div>\n\n        <!-- RESULTS -->\n        <div class=\"requests\" fxLayout=\"row wrap\" fxLayoutAlign=\"space-between start\">\n          <mat-card class=\"element\" *ngFor=\"let request of requests\" fxFlex=\"100\" fxLayout=\"row wrap\" fxLayoutAlign=\"space-between start\">\n            <div fxFlex=\"35\" fxFlex.sm=\"49\">\n              <h3> {{ request.nameSubject }} </h3>\n              <p>  {{ request.codeSubject }} </p>\n              \n              <p class=\"who\"> de {{ request.nameUser }} </p>\n            </div>\n            <div fxFlex=\"40\" fxFlex.sm=\"49\">\n              <h4> Software </h4>\n              <!-- <p>\n                {{request.software}}\n              </p> -->\n              <p> Visual Studio Code - Versión: 1.12</p>\n              <p> Oracle Server - Versión: 11g </p>\n              <p> Pycharm - Versión: 2.14 </p>\n              <p> R Studio - Versión: 1.1 </p>\n            </div>\n            <div class=\"check-wrap\" fxFlex=\"15\" fxFlex.sm=\"10\" fxLayout=\"column\">\n              <mat-checkbox\n                class=\"checkbox\"\n                [swal]=\"acceptRequestAlert\"  (confirm)=\"acceptRequest(request)\"\n                [(ngModel)]=\"request.accepted\">\n                Aceptada\n              </mat-checkbox>\n              <mat-checkbox\n                class=\"checkbox\"\n                [(ngModel)]=\"request.installed\">\n                Instalada\n              </mat-checkbox>\n            </div>\n          </mat-card>\n        </div>\n    </div>\n  </div>\n</div>"

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
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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
    function RequestListComponent(requestService, toastr) {
        this.requestService = requestService;
        this.toastr = toastr;
        this.requests = null;
        this.isLoading = true;
        //
        // Alerts
        //
        this.acceptRequestAlert = {
            title: '¿Estás seguro?',
            text: 'Se aceptará la petición y se mostrará su estado al equipo docente',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        };
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
    RequestListComponent.prototype.acceptRequest = function (request) {
        var _this = this;
        this
            .requestService
            .acceptRequest(request._id)
            .subscribe(function (request) {
            _this.toastr.success('Se ha aceptado la petición.', 'Hecho!');
            _this.ngOnInit();
        }, function (error) {
            _this.toastr.error('Ha ocurrido un error inesperado. Consulta con un administrador.', 'Error!');
        });
    };
    RequestListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-request-list',
            template: __webpack_require__(/*! ./request-list.component.html */ "./src/app/admin/request/request-list/request-list.component.html"),
            styles: [__webpack_require__(/*! ./request-list.component.scss */ "./src/app/admin/request/request-list/request-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_request_service__WEBPACK_IMPORTED_MODULE_1__["RequestService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]])
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
/* harmony import */ var _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sweetalert2/ngx-sweetalert2 */ "./node_modules/@sweetalert2/ngx-sweetalert2/fesm5/sweetalert2-ngx-sweetalert2.js");
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
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_5__["SweetAlert2Module"].forRoot({
                    buttonsStyling: false,
                    confirmButtonClass: 'mat-flat-button mat-info swal2-button-margin',
                    cancelButtonClass: 'mat-flat-button mat-warn swal2-button-margin'
                })
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
    RequestService.prototype.acceptRequest = function (requestId) {
        console.log('Desde service: ' + requestId);
        var data = { 'requestId': requestId };
        var url = '/api/request/accept';
        return this.http
            .post(url, data, { headers: {}, responseType: 'text' });
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