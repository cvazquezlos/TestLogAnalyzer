webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<td-layout-nav>\r\n  <div td-toolbar-content layout=\"row\" layout-align=\"center center\" flex>\r\n    <img src=\"../assets/icons/elastest-logo-dark.png\">\r\n    <span></span>\r\n    <span flex></span>\r\n    <button mat-icon-button matTooltip=\"Fullscreen\" (click)=\"toggleFullscreen()\">\r\n      <mat-icon *ngIf=\"isFull; else notFull\" mat-list-icon>fullscreen_exit</mat-icon>\r\n      <ng-template #notFull>\r\n        <mat-icon mat-list-icon>fullscreen</mat-icon>\r\n      </ng-template>\r\n    </button>\r\n    <button mat-icon-button matTooltip=\"Docs\" href=\"https://teradata.github.io/covalent/\" target=\"_blank\">\r\n      <mat-icon>chrome_reader_mode</mat-icon>\r\n    </button>\r\n    <button mat-icon-button matTooltip=\"Github\" href=\"https://github.com/cvazquezlos/TestLogAnalyzer\" target=\"_blank\">\r\n      <mat-icon svgIcon=\"assets:github\"></mat-icon>\r\n    </button>\r\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\"\r\n          integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  </div>\r\n  <breadcrumb id=\"bread\" [allowBootstrap]=\"true\"></breadcrumb>\r\n  <router-outlet></router-outlet>\r\n</td-layout-nav>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        this._iconRegistry.addSvgIconInNamespace('assets', 'github', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
        this.isFull = false;
    }
    AppComponent.prototype.toggleFullscreen = function () {
        this.isFull = !this.isFull;
        var documentVar = document;
        var documentElement = document.documentElement;
        var documentBody = document.body;
        if (documentVar.fullscreenElement || // alternative standard method
            documentVar.mozFullScreenElement || // currently working methods
            documentVar.webkitFullscreenElement ||
            documentVar.msFullscreenElement) {
            if (documentVar.exitFullscreen) {
                documentVar.exitFullscreen();
            }
            else if (documentVar.mozCancelFullScreen) {
                documentVar.mozCancelFullScreen();
            }
            else if (documentVar.webkitExitFullscreen) {
                documentVar.webkitExitFullscreen();
            }
            else if (documentVar.msExitFullscreen) {
                documentVar.msExitFullscreen();
            }
        }
        else {
            var element = Element;
            if (documentElement.requestFullscreen) {
                documentElement.requestFullscreen();
            }
            else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen();
            }
            else if (documentElement.webkitRequestFullscreen) {
                documentElement.webkitRequestFullscreen(element.ALLOW_KEYBOARD_INPUT);
            }
            else if (documentBody.msRequestFullscreen) {
                documentBody.msRequestFullscreen();
            }
        }
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatIconRegistry */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__covalent_highlight__ = __webpack_require__("../../../../@covalent/highlight/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__covalent_http__ = __webpack_require__("../../../../@covalent/http/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__covalent_markdown__ = __webpack_require__("../../../../@covalent/markdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_add_project_add_project_component__ = __webpack_require__("../../../../../src/app/component/add-project/add-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_project_add_exec_add_exec_component__ = __webpack_require__("../../../../../src/app/component/project/add-exec/add-exec.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_project_exec_exec_component__ = __webpack_require__("../../../../../src/app/component/project/exec/exec.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__component_project_exec_report_comparison_report_comparison_component__ = __webpack_require__("../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__component_project_project_component__ = __webpack_require__("../../../../../src/app/component/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__component_project_view_execs_view_execs_component__ = __webpack_require__("../../../../../src/app/component/project/view-execs/view-execs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__component_public_component__ = __webpack_require__("../../../../../src/app/component/public.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__component_view_projects_view_projects_component__ = __webpack_require__("../../../../../src/app/component/view-projects/view-projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__config_interceptor_request_interceptor__ = __webpack_require__("../../../../../src/config/interceptor/request.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__service_table_service__ = __webpack_require__("../../../../../src/app/service/table.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var httpInterceptorProviders = [
    __WEBPACK_IMPORTED_MODULE_19__config_interceptor_request_interceptor__["a" /* RequestInterceptor */],
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__component_project_add_exec_add_exec_component__["a" /* AddExecComponent */],
                __WEBPACK_IMPORTED_MODULE_11__component_add_project_add_project_component__["a" /* AddProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13__component_project_exec_exec_component__["a" /* ExecComponent */],
                __WEBPACK_IMPORTED_MODULE_15__component_project_project_component__["a" /* ProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_17__component_public_component__["a" /* PublicComponent */],
                __WEBPACK_IMPORTED_MODULE_14__component_project_exec_report_comparison_report_comparison_component__["a" /* ReportComparisonComponent */],
                __WEBPACK_IMPORTED_MODULE_16__component_project_view_execs_view_execs_component__["a" /* ViewExecsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__component_view_projects_view_projects_component__["a" /* ViewProjectsComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8_ng2_breadcrumbs__["BreadcrumbsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_4__covalent_highlight__["a" /* CovalentHighlightModule */],
                __WEBPACK_IMPORTED_MODULE_5__covalent_http__["a" /* CovalentHttpModule */].forRoot({
                    interceptors: [{
                            interceptor: __WEBPACK_IMPORTED_MODULE_19__config_interceptor_request_interceptor__["a" /* RequestInterceptor */], paths: ['**'],
                        }],
                }),
                __WEBPACK_IMPORTED_MODULE_6__covalent_markdown__["a" /* CovalentMarkdownModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_22__shared_shared_module__["a" /* SharedModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_20__service_elasticsearch_service__["a" /* ElasticsearchService */],
                __WEBPACK_IMPORTED_MODULE_21__service_table_service__["a" /* TableService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]],
            entryComponents: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export appRoutes */
/* unused harmony export appRoutingProviders */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_add_project_add_project_component__ = __webpack_require__("../../../../../src/app/component/add-project/add-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_project_add_exec_add_exec_component__ = __webpack_require__("../../../../../src/app/component/project/add-exec/add-exec.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_project_exec_exec_component__ = __webpack_require__("../../../../../src/app/component/project/exec/exec.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_project_exec_report_comparison_report_comparison_component__ = __webpack_require__("../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_project_view_execs_view_execs_component__ = __webpack_require__("../../../../../src/app/component/project/view-execs/view-execs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_project_project_component__ = __webpack_require__("../../../../../src/app/component/project/project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_public_component__ = __webpack_require__("../../../../../src/app/component/public.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_view_projects_view_projects_component__ = __webpack_require__("../../../../../src/app/component/view-projects/view-projects.component.ts");









var appRoutes = [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    {
        path: 'projects', component: __WEBPACK_IMPORTED_MODULE_7__component_public_component__["a" /* PublicComponent */],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_8__component_view_projects_view_projects_component__["a" /* ViewProjectsComponent */] },
            { path: 'add', component: __WEBPACK_IMPORTED_MODULE_1__component_add_project_add_project_component__["a" /* AddProjectComponent */] },
            {
                path: ':project', component: __WEBPACK_IMPORTED_MODULE_6__component_project_project_component__["a" /* ProjectComponent */],
                children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__component_project_view_execs_view_execs_component__["a" /* ViewExecsComponent */] },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_2__component_project_add_exec_add_exec_component__["a" /* AddExecComponent */] },
                    {
                        path: ':exec', component: __WEBPACK_IMPORTED_MODULE_3__component_project_exec_exec_component__["a" /* ExecComponent */],
                        children: [
                            { path: '', component: __WEBPACK_IMPORTED_MODULE_4__component_project_exec_report_comparison_report_comparison_component__["a" /* ReportComparisonComponent */] }
                        ]
                    }
                ]
            }
        ]
    }
];
var appRoutingProviders = [];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "../../../../../src/app/component/add-project/add-project.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".iconBtn-lg {\r\n  min-width: initial !important;\r\n  padding: 0 15px !important;\r\n}\r\n\r\n.divider-vertical {\r\n  border-top-width: 0;\r\n  border-right-width: 1px;\r\n  border-right-color: #E0E0E0;\r\n  border-right-style: solid;\r\n  height: 100px;\r\n}\r\n\r\n.pad-left {\r\n  padding-left: 10px;\r\n}\r\n\r\n.pad-top {\r\n  padding-top: 10px;\r\n}\r\n\r\n.tab-input {\r\n  background: transparent;\r\n  border: none;\r\n  border-bottom: 1px dashed #ffac2f;\r\n  width: 100px;\r\n  outline: none;\r\n  padding: 0px 0px 0px 0px;\r\n  font-style: italic;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/add-project/add-project.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-title>\r\n    <div layout=\"row\">\r\n      <span>New project</span>\r\n      <span flex></span>\r\n      <button mat-raised-button class=\"iconBtn-lg\" color=\"accent\" [routerLink]=\"['/']\">\r\n        <mat-icon>home</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-card-title>\r\n  <mat-divider></mat-divider>\r\n  <mat-card-content>\r\n    <p>Give to the project a name and then, the first execution by updating it or posting an url.</p>\r\n    <mat-vertical-stepper [linear]=\"true\">\r\n      <mat-step>\r\n        <form>\r\n          <ng-template matStepLabel>Fill out the name of the project</ng-template>\r\n          <mat-form-field>\r\n            <input id=\"project-name\"\r\n                   matInput\r\n                   maxlength=\"20\"\r\n                   name=\"Name of the project\"\r\n                   onclick=\"this.select()\"\r\n                   placeholder=\"Name of the project\"\r\n                   required\r\n                   type=\"text\"\r\n                   [(ngModel)]=\"project.name\">\r\n          </mat-form-field>\r\n        </form>\r\n      </mat-step>\r\n      <mat-step>\r\n        <ng-template matStepLabel>Select a way to import the first execution of this project.</ng-template>\r\n        <mat-tab-group (selectedIndexChange)=\"currentTab = $event\">\r\n          <mat-tab label=\"Choose files\">\r\n            <div layout=\"row\">\r\n              <div flex=\"50\">\r\n                <p>Choose the file which contains the logs of the execution...</p>\r\n                <td-file-upload #txtFileUpload\r\n                                accept=\".txt\"\r\n                                id=\"txt-file-uploader\"\r\n                                multiple\r\n                                required\r\n                                (cancel)=\"cancel()\"\r\n                                (select)=\"update($event)\"\r\n                                (update)=\"update($event)\">\r\n                  <mat-icon>file_upload</mat-icon>\r\n                  <span>{{txtFileUpload.value?.name}}</span>\r\n                  <ng-template td-file-input-label>\r\n                    <mat-icon>attach_file</mat-icon>\r\n                    Choose multiple .txt files...\r\n                    <span [hidden]=\"!txtFileUpload?.required\">*</span>\r\n                  </ng-template>\r\n                </td-file-upload>\r\n              </div>\r\n              <div class=\"pad-top\">\r\n                <mat-divider class=\"divider-vertical\"></mat-divider>\r\n              </div>\r\n              <div class=\"pad-left\">\r\n                <p>Choose the file which contains the Surfire data...</p>\r\n                <td-file-upload #xmlFileUpload\r\n                                accept=\".xml\"\r\n                                id=\"xml-file-uploader\"\r\n                                multiple\r\n                                required\r\n                                (cancel)=\"cancel()\"\r\n                                (select)=\"update($event)\"\r\n                                (update)=\"update($event)\">\r\n                  <mat-icon>file_upload</mat-icon>\r\n                  <span>{{xmlFileUpload.value?.name}}</span>\r\n                  <ng-template td-file-input-label>\r\n                    <mat-icon>attach_file</mat-icon>\r\n                    Choose multiple .xml files...\r\n                    <span [hidden]=\"!txtFileUpload?.required\">*</span>\r\n                  </ng-template>\r\n                </td-file-upload>\r\n              </div>\r\n            </div>\r\n          </mat-tab>\r\n          <mat-tab label=\"Paste URLs\">\r\n            <form>\r\n              <div layout=\"row\">\r\n                <div flex=\"50\">\r\n                  <p>Paste the URL of the file which contains the logs of the execution...</p>\r\n                  <mat-form-field>\r\n                    <input matInput\r\n                           name=\"URL of .txt file\"\r\n                           onclick=\"this.select()\"\r\n                           placeholder=\"URL of .txt file\"\r\n                           required\r\n                           type=\"text\"\r\n                           [(ngModel)]=\"urlTxt\">\r\n                  </mat-form-field>\r\n                </div>\r\n                <div class=\"pad-top\">\r\n                  <mat-divider class=\"divider-vertical\"></mat-divider>\r\n                </div>\r\n                <div class=\"pad-left\">\r\n                  <p>Paste the URL of the file which contains the Surfire data...</p>\r\n                  <mat-form-field>\r\n                    <input matInput\r\n                           name=\"URL of .xml file\"\r\n                           onclick=\"this.select()\"\r\n                           placeholder=\"URL of .xml file\"\r\n                           required\r\n                           type=\"text\"\r\n                           [(ngModel)]=\"urlXml\">\r\n                  </mat-form-field>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </mat-tab>\r\n        </mat-tab-group>\r\n      </mat-step>\r\n      <mat-step>\r\n        <ng-template matStepLabel>Review and save</ng-template>\r\n        <div *ngIf=\"(project.name !== '') && (urlTxt !== ''); else notCompleted\">\r\n          The new project which name is <span class=\"md-title\">{{project.name}}</span> will be created once you click on\r\n          save button.\r\n          The first execution of this project is provided by\r\n          <span *ngIf=\"fileSelected; else notSelected\" class=\"md-title\">choosing files</span>\r\n          <ng-template #notSelected>\r\n            <span class=\"md-title\">URL</span>\r\n          </ng-template>\r\n          .\r\n          <br><br>\r\n          <div *ngIf=\"(code == 1) || (code == 2); else hideSave\">\r\n            <ng-template tdLoading [tdLoadingUntil]=\"code != 1\" tdLoadingStrategy=\"overlay\" tdLoadingType=\"linear\">\r\n            </ng-template>\r\n            <div *ngIf=\"code == 1; else secondCode\">\r\n              <td-message label=\"Success!\" sublabel=\"Uploading file content into Elasticsearch...\" color=\"green\"\r\n                          icon=\"check_circle\"></td-message>\r\n            </div>\r\n            <ng-template #secondCode>\r\n              <td-message label=\"Done!\"\r\n                          sublabel=\"The project has been created and its content have been updated to Elasticsearch.\"\r\n                          color=\"green\" icon=\"check_circle\"></td-message>\r\n              <div layout=\"row\" layout-align=\"center center\">\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n          <ng-template #hideSave>\r\n            <div layout=\"row\" layout-align=\"center center\">\r\n              <button id=\"submit\" color=\"accent\" mat-raised-button (click)=\"save()\">Save\r\n              </button>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n        <ng-template #notCompleted>\r\n          <td-message label=\"Error!\" sublabel=\"You have to fill out the required camps.\" color=\"warn\"\r\n                      icon=\"error\"></td-message>\r\n        </ng-template>\r\n      </mat-step>\r\n    </mat-vertical-stepper>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/add-project/add-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_project_model__ = __webpack_require__("../../../../../src/app/model/project.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var AddProjectComponent = /** @class */ (function () {
    function AddProjectComponent(elasticsearchService, router, breadcrumbs) {
        var _this = this;
        this.elasticsearchService = elasticsearchService;
        this.router = router;
        this.breadcrumbs = breadcrumbs;
        this.currentTab = 0;
        this.code = 0;
        this.fileSelected = true;
        this.filesTxt = null;
        this.filesXml = null;
        this.isFile = true;
        this.urlTxt = '';
        this.urlXml = '';
        this.project = new __WEBPACK_IMPORTED_MODULE_3__model_project_model__["a" /* Project */]();
        this.project.assigned_ids = [];
        this.project.name = '';
        this.elasticsearchService.getCountOfProjects().subscribe(function (response) { return _this.project.id = response; });
        this.project.num_execs = 0;
    }
    AddProjectComponent.prototype.cancel = function () {
        this.urlTxt = '';
        this.urlXml = '';
    };
    AddProjectComponent.prototype.ngOnInit = function () {
        this.breadcrumbs.store([{ label: 'Home', url: '/', params: [] },
            { label: 'Add project', url: '/projects/add', params: [] }]);
    };
    AddProjectComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, files, i, i, logs, l, surefire, s, filesByUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.code = 1;
                        _a = this.currentTab;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 1: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        this.code = 2;
                        files = [];
                        for (i = 0; i < this.filesTxt.length; i++) {
                            files.push(this.filesTxt[i]);
                        }
                        for (i = 0; i < this.filesXml.length; i++) {
                            files.push(this.filesXml[i]);
                        }
                        return [4 /*yield*/, this.elasticsearchService.postFile(files, this.project.name)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        this.code = 2;
                        return [4 /*yield*/, this.elasticsearchService.downloadResource(this.urlTxt)];
                    case 4:
                        logs = _b.sent();
                        l = new File([logs], "logs.txt", {
                            type: 'text/plain'
                        });
                        return [4 /*yield*/, this.elasticsearchService.downloadResource(this.urlXml)];
                    case 5:
                        surefire = _b.sent();
                        s = new File([surefire], "surefire.xml", {
                            type: 'text/plain'
                        });
                        filesByUrl = [l, s];
                        return [4 /*yield*/, this.elasticsearchService.postFile(files, this.project.name)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AddProjectComponent.prototype.update = function (files) {
        (files[0].name.includes('.txt')) ? (this.filesTxt = files) : (this.filesXml = files);
        this.urlTxt = 'Empty';
        this.urlXml = 'Empty';
    };
    AddProjectComponent.prototype.returnHome = function () {
        this.router.navigateByUrl('/');
    };
    AddProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-project',
            template: __webpack_require__("../../../../../src/app/component/add-project/add-project.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/add-project/add-project.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__["a" /* ElasticsearchService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__["BreadcrumbsService"]])
    ], AddProjectComponent);
    return AddProjectComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/project/add-exec/add-exec.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".iconBtn-lg {\r\n  min-width: initial !important;\r\n  padding: 0 15px !important;\r\n}\r\n\r\n.divider-vertical {\r\n  border-top-width: 0;\r\n  border-right-width: 1px;\r\n  border-right-color: #E0E0E0;\r\n  border-right-style: solid;\r\n  height: 100px;\r\n}\r\n\r\n.pad-left {\r\n  padding-left: 10px;\r\n}\r\n\r\n.pad-top {\r\n  padding-top: 10px;\r\n}\r\n\r\n.tab-input {\r\n  background: transparent;\r\n  border: none;\r\n  border-bottom: 1px dashed #ffac2f;\r\n  width: 100px;\r\n  outline: none;\r\n  padding: 0px 0px 0px 0px;\r\n  font-style: italic;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/project/add-exec/add-exec.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-title>\r\n    <div layout=\"row\">\r\n      <span>New execution</span>\r\n      <span flex></span>\r\n      <button *ngIf=\"project.name != undefined\" mat-raised-button class=\"iconBtn-lg\" color=\"accent\"\r\n              [routerLink]=\"['/projects/', project.name]\">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-card-title>\r\n  <mat-divider></mat-divider>\r\n  <mat-card-content>\r\n    <mat-tab-group (selectedIndexChange)=\"currentTab = $event\">\r\n      <mat-tab label=\"Choose files\">\r\n        <div layout=\"row\">\r\n          <div flex=\"50\">\r\n            <p>Choose the file which contains the logs of the execution...</p>\r\n            <td-file-upload #txtFileUpload\r\n                            accept=\".txt\"\r\n                            id=\"txt-file-uploader\"\r\n                            multiple\r\n                            required\r\n                            (cancel)=\"cancel()\"\r\n                            (select)=\"update($event)\"\r\n                            (update)=\"update($event)\">\r\n              <mat-icon>file_upload</mat-icon>\r\n              <span>{{txtFileUpload.value?.name}}</span>\r\n              <ng-template td-file-input-label>\r\n                <mat-icon>attach_file</mat-icon>\r\n                Choose a .txt file...\r\n                <span [hidden]=\"!txtFileUpload?.required\">*</span>\r\n              </ng-template>\r\n            </td-file-upload>\r\n          </div>\r\n          <div class=\"pad-top\">\r\n            <mat-divider class=\"divider-vertical\"></mat-divider>\r\n          </div>\r\n          <div class=\"pad-left\">\r\n            <p>Choose the file which contains the Surfire data...</p>\r\n            <td-file-upload #xmlFileUpload\r\n                            accept=\".xml\"\r\n                            id=\"xml-file-uploader\"\r\n                            multiple\r\n                            required\r\n                            (cancel)=\"cancel()\"\r\n                            (select)=\"update($event)\"\r\n                            (update)=\"update($event)\">\r\n              <mat-icon>file_upload</mat-icon>\r\n              <span>{{xmlFileUpload.value?.name}}</span>\r\n              <ng-template td-file-input-label>\r\n                <mat-icon>attach_file</mat-icon>\r\n                Choose a .xml file...\r\n              </ng-template>\r\n            </td-file-upload>\r\n          </div>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Paste URLs\">\r\n        <form>\r\n          <div layout=\"row\">\r\n            <div flex=\"50\">\r\n              <p>Paste the URL of the file which contains the logs of the execution...</p>\r\n              <mat-form-field>\r\n                <input matInput\r\n                       name=\"URL of .txt file\"\r\n                       onclick=\"this.select()\"\r\n                       placeholder=\"URL of .txt file\"\r\n                       required\r\n                       type=\"text\"\r\n                       [(ngModel)]=\"urlTxt\">\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"pad-top\">\r\n              <mat-divider class=\"divider-vertical\"></mat-divider>\r\n            </div>\r\n            <div class=\"pad-left\">\r\n              <p>Paste the URL of the file which contains the Surfire data...</p>\r\n              <mat-form-field>\r\n                <input matInput\r\n                       name=\"URL of .xml file\"\r\n                       onclick=\"this.select()\"\r\n                       placeholder=\"URL of .xml file\"\r\n                       type=\"text\"\r\n                       [(ngModel)]=\"urlXml\">\r\n              </mat-form-field>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n    <div *ngIf=\"(urlTxt !== ''); else notCompleted\">\r\n      The new project which name is <span class=\"md-title\">{{project.name}}</span> will be created once you click on\r\n      save button.\r\n      The first execution of this project is provided by\r\n      <span *ngIf=\"fileSelected; else notSelected\" class=\"md-title\">choosing files</span>\r\n      <ng-template #notSelected>\r\n        <span class=\"md-title\">URL</span>\r\n      </ng-template>\r\n      .\r\n      <br><br>\r\n      <div *ngIf=\"(code == 1) || (code == 2); else hideSave\">\r\n        <ng-template tdLoading [tdLoadingUntil]=\"code != 1\" tdLoadingStrategy=\"overlay\" tdLoadingType=\"linear\">\r\n        </ng-template>\r\n        <div *ngIf=\"code == 1; else secondCode\">\r\n          <td-message label=\"Success!\" sublabel=\"Uploading file content into Elasticsearch...\" color=\"green\"\r\n                      icon=\"check_circle\"></td-message>\r\n        </div>\r\n        <ng-template #secondCode>\r\n          <td-message label=\"Done!\"\r\n                      sublabel=\"The project has been created and its content have been updated to Elasticsearch.\"\r\n                      color=\"green\" icon=\"check_circle\"></td-message>\r\n          <div layout=\"row\" layout-align=\"center center\">\r\n          </div>\r\n        </ng-template>\r\n      </div>\r\n      <ng-template #hideSave>\r\n        <div layout=\"row\" layout-align=\"\">\r\n        </div>\r\n        <div layout=\"row\" layout-align=\"center center\">\r\n          <button id=\"submit\" color=\"accent\" mat-raised-button (click)=\"save()\">Save\r\n          </button>\r\n        </div>\r\n      </ng-template>\r\n    </div>\r\n    <ng-template #notCompleted>\r\n      <td-message label=\"Error!\" sublabel=\"You have to fill out the required camps.\" color=\"warn\"\r\n                  icon=\"error\"></td-message>\r\n    </ng-template>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/project/add-exec/add-exec.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddExecComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_project_model__ = __webpack_require__("../../../../../src/app/model/project.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var AddExecComponent = /** @class */ (function () {
    function AddExecComponent(router, elasticsearchService, activatedRoute, breadcrumbs) {
        this.router = router;
        this.elasticsearchService = elasticsearchService;
        this.activatedRoute = activatedRoute;
        this.breadcrumbs = breadcrumbs;
        this.currentTab = 0;
        this.project = new __WEBPACK_IMPORTED_MODULE_3__model_project_model__["a" /* Project */]();
        this.code = 0;
        this.fileSelected = true;
        this.filesTxt = null;
        this.filesXml = null;
        this.isFile = true;
        this.urlTxt = '';
        this.urlXml = '';
    }
    AddExecComponent.prototype.cancel = function () {
        this.urlTxt = '';
        this.urlXml = '';
    };
    AddExecComponent.prototype.ngOnInit = function () {
        var _this = this;
        var name = this.activatedRoute.snapshot.parent.params['project'];
        this.elasticsearchService.getProjectByName(name).subscribe(function (response) {
            _this.project = response;
        }, function (error) { return console.log(error); });
        this.breadcrumbs.store([{ label: 'Home', url: '/', params: [] },
            { label: name, url: '/projects/' + name, params: [] },
            { label: 'Add exec', url: '/projects/' + name + '/add', params: [] }]);
    };
    AddExecComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, files, i, i, logs, l, surefire, s, filesByUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.code = 1;
                        _a = this.currentTab;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 1: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        this.code = 2;
                        files = [];
                        for (i = 0; i < this.filesTxt.length; i++) {
                            files.push(this.filesTxt[i]);
                        }
                        for (i = 0; i < this.filesXml.length; i++) {
                            files.push(this.filesXml[i]);
                        }
                        return [4 /*yield*/, this.elasticsearchService.postFile(files, this.project.name)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        this.code = 2;
                        return [4 /*yield*/, this.elasticsearchService.downloadResource(this.urlTxt)];
                    case 4:
                        logs = _b.sent();
                        l = new File([logs], "logs.txt", {
                            type: 'text/plain'
                        });
                        return [4 /*yield*/, this.elasticsearchService.downloadResource(this.urlXml)];
                    case 5:
                        surefire = _b.sent();
                        s = new File([surefire], "surefire.xml", {
                            type: 'text/plain'
                        });
                        filesByUrl = [l, s];
                        return [4 /*yield*/, this.elasticsearchService.postFile(files, this.project.name)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AddExecComponent.prototype.update = function (files) {
        (files[0].name.includes('.txt')) ? (this.filesTxt = files) : (this.filesXml = files);
        this.urlTxt = 'Empty';
        this.urlXml = 'Empty';
    };
    AddExecComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-exec',
            template: __webpack_require__("../../../../../src/app/component/project/add-exec/add-exec.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/project/add-exec/add-exec.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__["a" /* ElasticsearchService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__["BreadcrumbsService"]])
    ], AddExecComponent);
    return AddExecComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/project/exec/exec.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExecComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ExecComponent = /** @class */ (function () {
    function ExecComponent() {
    }
    ExecComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-exec',
            template: "\n    <router-outlet></router-outlet>"
        }),
        __metadata("design:paramtypes", [])
    ], ExecComponent);
    return ExecComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".iconBtn-lg {\r\n  min-width: initial !important;\r\n  padding: 0 15px !important;\r\n}\r\n\r\n.toolbar-text {\r\n  vertical-align: middle;\r\n  margin-bottom: 0px;\r\n}\r\n\r\n.toolbar-text-container {\r\n  line-height: 40px;\r\n}\r\n\r\nh3, h5 {\r\n  font-family: \"Inconsolata\", \"Consolas\", \"Monaco\";\r\n}\r\n\r\n.diff-table {\r\n  font-family: \"Inconsolata\", \"Consolas\", \"Monaco\";\r\n  font-size: 0.9em;\r\n  background: white;\r\n  width: 100%;\r\n}\r\n\r\n.index {\r\n  color: rgb(102, 102, 102);\r\n}\r\n\r\n.execs {\r\n  background-color: rgb(195, 195, 195);\r\n  border: none;\r\n  color: #0e0e0e;\r\n  padding: 3px 8px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 1.3em;\r\n}\r\n\r\n.title-icon {\r\n  color: white;\r\n}\r\n\r\n.active-icon {\r\n  color: #BF360C;\r\n}\r\n\r\n.active {\r\n  background-color: rgb(25, 118, 210);\r\n  border: none;\r\n  color: white;\r\n  padding: 3px 8px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 1.3em;\r\n}\r\n\r\n.find {\r\n  background-color: rgb(251, 140, 0); /* Green */\r\n  font-size: 21px;\r\n  border: none;\r\n  color: white;\r\n  padding: 0.5em 0.8em;\r\n  border-radius: 0.2em;\r\n  width: auto;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.title {\r\n  color: white;\r\n}\r\n\r\n.left {\r\n  float: left;\r\n}\r\n\r\n.clickable {\r\n  font-size: 0.75em;\r\n}\r\n\r\n.classname {\r\n  font-size: 0.75em;\r\n}\r\n\r\n.icon {\r\n  position: absolute;\r\n  right: 0px;\r\n}\r\n\r\n.no-margin {\r\n  margin: 0 0px;\r\n}\r\n\r\n.full-width {\r\n  width: 100%\r\n}\r\n\r\n.not-displayed {\r\n  /*display: none;*/\r\n}\r\n\r\n.display {\r\n  display: block;\r\n}\r\n\r\n.delC {\r\n  background: rgb(252, 216, 217);\r\n  border: 1px solid rgb(154, 35, 40);\r\n}\r\n\r\n.insC {\r\n  background: rgb(224, 252, 208);\r\n  border: 1px solid rgb(26, 152, 31);\r\n}\r\n\r\n.added {\r\n  background: rgb(231, 231, 231);\r\n  border: 1px solid rgb(187, 187, 187);\r\n}\r\n\r\n.diff-table {\r\n  font-family: \"Inconsolata\", \"Consolas\", \"Monaco\";\r\n  font-size: 0.9em;\r\n  background: white;\r\n  width: 100%;\r\n}\r\n\r\n.index {\r\n  color: rgb(102, 102, 102);\r\n}\r\n\r\n.method-selected {\r\n  background: rgba(0, 0, 0, .32);\r\n  color: hsla(0, 0%, 100%, .87);\r\n}\r\n\r\n.method-selected mat-icon {\r\n  color: hsla(0, 0%, 100%, .87);\r\n}\r\n\r\n.hide {\r\n  display: none;\r\n}\r\n\r\n.comparator-section {\r\n  float: left;\r\n  width: 50%;\r\n}\r\n\r\n.clear {\r\n  clear: both;\r\n  overflow: hidden;\r\n}\r\n\r\n.comp-title {\r\n  font-size: x-large;\r\n}\r\n\r\n.toolbar-view-comp {\r\n  margin-top: 8px;\r\n  margin-left: 8px;\r\n  margin-right: 8px;\r\n  background-color: white;\r\n  position: fixed;\r\n  width: calc(100% - 2.063em);\r\n  padding-top: 16px;\r\n  z-index: 1;\r\n}\r\n\r\n.iconBtn {\r\n  min-width: initial !important;\r\n  padding: 0 !important;\r\n}\r\n\r\n.table-selection {\r\n}\r\n\r\n.pad-top {\r\n  padding-top: 10px;\r\n}\r\n\r\n.divider-vertical {\r\n  border-top-width: 0;\r\n  border-right-width: 1px;\r\n  border-right-color: #E0E0E0;\r\n  border-right-style: solid;\r\n  height: 40px;\r\n}\r\n\r\n.status-feedback {\r\n  background: #FFF;\r\n  bottom: 0;\r\n  height: 60px;\r\n  margin-left: 8px;\r\n  margin-right: 8px;\r\n  position: fixed;\r\n  width: calc(100% - 2.063em);\r\n}\r\n\r\n.half-part {\r\n  width: 50%;\r\n}\r\n\r\n.span-title {\r\n  font-weight: bold;\r\n}\r\n\r\n.red-back {\r\n  background-color: red;\r\n}\r\n\r\n.green-black {\r\n  background-color: green;\r\n}\r\n\r\n.float-left {\r\n  float: left;\r\n}\r\n\r\n.float-right {\r\n  float: right;\r\n}\r\n\r\n#main-content {\r\n  margin-top: 145px;\r\n}\r\n\r\n.cover-data {\r\n  margin-top: 10px;\r\n  padding-top: 5px;\r\n}\r\n\r\n.padding-sides {\r\n  padding-left: 5px;\r\n  padding-right: 5px;\r\n}\r\n\r\n.padding-xl-sides {\r\n  padding-left: 16px;\r\n  padding-right: 16px;\r\n}\r\n\r\n.over-custom-button {\r\n  font-weight: bold;\r\n  color: #FFF;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"toolbar-view-comp\">\r\n  <div layout=\"row\" class=\"padding-xl-sides\">\r\n    <div class=\"half-part\">\r\n      <div class=\"toolbar-text-container float-left\">\r\n        <p class=\"text-18 text-center height-auto toolbar-text\">View&nbsp;&nbsp;</p>\r\n      </div>\r\n      <div class=\"float-left\">\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{viewButtonsClasses[0]}}\" (click)=\"updateViewMode(0, 0)\">\r\n          <b>Complete logs</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{viewButtonsClasses[3]}}\" (click)=\"updateViewMode(0, 3)\">\r\n          <b>Only tests logs</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{viewButtonsClasses[1]}}\" (click)=\"updateViewMode(0, 1)\">\r\n          <b>All tests</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{viewButtonsClasses[2]}}\" (click)=\"updateViewMode(0, 2)\">\r\n          <b>Failed tests</b>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"selected[0] !== undefined; else notSelected\" class=\"\">\r\n      <mat-divider class=\"divider-vertical float-left\"></mat-divider>\r\n      <div class=\"toolbar-text-container float-left\">\r\n        <p class=\"text-18 text-center height-auto toolbar-text\">&nbsp;&nbsp;&nbsp;Comparison&nbsp;&nbsp;</p>\r\n      </div>\r\n      <div class=\"float-left\">\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{comparisonButtonsClasses[0]}}\"\r\n                (click)=\"updateComparisonMode(0)\">\r\n          <b>Complete</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{comparisonButtonsClasses[1]}}\"\r\n                (click)=\"updateComparisonMode(1)\">\r\n          <b>No timestamp</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg\" color=\"{{comparisonButtonsClasses[2]}}\"\r\n                (click)=\"updateComparisonMode(2)\">\r\n          <b>Time diff</b>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button class=\"iconBtn-lg bgc-red-500\" (click)=\"disableComparison()\">\r\n          <span class=\"over-custom-button\">Cancel comparison</span>\r\n        </button>&nbsp;&nbsp;\r\n        <button mat-raised-button\r\n                class=\"iconBtn-lg bgc-green-500\"\r\n                placement=\"left\"\r\n                popoverTitle=\"Select an execution to compare with\"\r\n                [ngbPopover]=\"selection\">\r\n          <span class=\"over-custom-button\">Change execution</span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <ng-template #notSelected>\r\n      <mat-divider class=\"divider-vertical\"></mat-divider>&nbsp;&nbsp;&nbsp;\r\n      <button mat-raised-button\r\n              class=\"iconBtn-lg bgc-green-500\"\r\n              placement=\"bottom\"\r\n              popoverTitle=\"Select an execution to compare with\"\r\n              [ngbPopover]=\"selection\">\r\n        <span class=\"over-custom-button\">Select execution</span>\r\n      </button>\r\n    </ng-template>\r\n    <span flex></span>\r\n    <button *ngIf=\"test != undefined\" mat-raised-button class=\"iconBtn-lg\" color=\"accent\"\r\n            (click)=\"goBack()\">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"showExecSelection\" class=\"table-selection\">\r\n    <br>\r\n    <mat-divider></mat-divider>\r\n    <div *ngIf=\"showSelectionMessage\">\r\n      <td-message label=\"Error!\" sublabel=\"You must select an execution to compare with.\" color=\"warn\"\r\n                  icon=\"error\"></td-message>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"execution !== undefined\" class=\"cover-data\">\r\n    <div *ngIf=\"selected[0] !== undefined; else showBasicMessage\">\r\n      <div class=\"half-part float-left\">\r\n        <div class=\"cover-data padding-sides\"\r\n             [ngClass]=\"(execution.status.indexOf('SUCCESS') !== -1) ? ('bgc-green-50') : ('bgc-red-50')\"\r\n             [ngStyle]=\"{'border': (execution.status.indexOf('SUCCESS') !== -1) ? ('2px solid #A5D6A7') : ('2px solid #EF9A9A')}\">\r\n          Execution <span class=\"md-title\">{{execution.id}}</span> has been completed in <span class=\"md-title\">{{execution.time_elapsed}} seconds</span>,\r\n          starting at <span class=\"md-title\">{{execution.start_date}}</span> and its result is <span class=\"md-title\">{{execution.status}}</span>.\r\n        </div>\r\n      </div>\r\n      <div class=\"half-part float-right\">\r\n        <div class=\"cover-data padding-sides\"\r\n             [ngClass]=\"(selected[0].status.status.indexOf('SUCCESS') !== -1) ? ('bgc-green-50') : ('bgc-red-50')\"\r\n             [ngStyle]=\"{'border': (selected[0].status.status.indexOf('SUCCESS') !== -1) ? ('2px solid #A5D6A7') : ('2px solid #EF9A9A'), 'border-right': '0px'}\">\r\n          Execution <span class=\"md-title\">{{selected[0].id}}</span> has been completed in <span class=\"md-title\">{{selected[0].time_elapsed}} seconds</span>,\r\n          starting at <span class=\"md-title\">{{selected[0].start_date}}</span> and its result is <span class=\"md-title\">{{selected[0].status.status}}</span>.\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <ng-template #showBasicMessage>\r\n      <div class=\"cover-data padding-sides\"\r\n           [ngClass]=\"(execution.status.indexOf('SUCCESS') !== -1) ? ('bgc-green-50') : ('bgc-red-50')\"\r\n           [ngStyle]=\"{'border': (execution.status.indexOf('SUCCESS') !== -1) ? ('2px solid #A5D6A7') : ('2px solid #EF9A9A')}\">\r\n        Execution <span class=\"md-title\">{{execution.id}}</span> has been completed in <span class=\"md-title\">{{execution.time_elapsed}} seconds</span>,\r\n        starting at <span class=\"md-title\">{{execution.start_date}}</span> and its result is <span class=\"md-title\">{{execution.status}}</span>.\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n</mat-card>\r\n<mat-card id=\"main-content\">\r\n  <mat-card-content>\r\n    <div *ngIf=\"loadingData; else notLoading\"\r\n         style=\"width: 100%; display: flex; align-content: center; justify-content: center;\">\r\n      <div style=\"display: inline-block; align-content: center; justify-content: center;\">\r\n        <mat-progress-spinner color=\"accent\" mode=\"indeterminate\" style=\"margin: auto;\"></mat-progress-spinner>\r\n        <br>\r\n        <p>Fetching data. Please wait...</p>\r\n      </div>\r\n    </div>\r\n    <ng-template #notLoading>\r\n      <div *ngIf=\"comparisonInProgress\">\r\n        <table *ngIf=\"viewMode == 0 || viewMode == 3\" class=\"diff-table\">\r\n          <tbody>\r\n          <tr *ngFor=\"let result of resultData[0].logs\">\r\n            <td [innerHTML]=\"result.index_p\" class=\"index\" style=\"width: 1% !important\"></td>\r\n            <td [innerHTML]=\"result.com_p.content\" [class]=\"result.com_p.class\" style=\"width: 49% !important\"></td>\r\n            <td [innerHTML]=\"result.indexp\" class=\"index\" style=\"width: 1% !important;\"></td>\r\n            <td [innerHTML]=\"result.comp.content\" [class]=\"result.comp.class\" style=\"width: 49% !important;\"></td>\r\n          </tr>\r\n          </tbody>\r\n        </table>\r\n        <div *ngIf=\"viewMode == 1 || viewMode == 2\">\r\n          <ng-template ngFor let-class [ngForOf]=\"resultData\">\r\n            <h3>{{class.name}}</h3>\r\n            <ng-template ngFor let-method [ngForOf]=\"class.methods\">\r\n              <h5>{{method.name}}</h5>\r\n              <table class=\"diff-table\">\r\n                <tbody>\r\n                <tr *ngFor=\"let result of method.logs\">\r\n                  <td [innerHTML]=\"result.index_p\" class=\"index\" style=\"width: 1% !important;\"></td>\r\n                  <td [innerHTML]=\"result.com_p.content\" [class]=\"result.com_p.class\" style=\"width: 49% !important;\"></td>\r\n                  <td [innerHTML]=\"result.indexp\" class=\"index\" style=\"width: 1% !important\"></td>\r\n                  <td [innerHTML]=\"result.comp.content\" [class]=\"result.comp.class\" style=\"width: 49% !important;\"></td>\r\n                </tr>\r\n                </tbody>\r\n              </table>\r\n            </ng-template>\r\n          </ng-template>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"!comparisonInProgress\">\r\n        <div *ngIf=\"viewMode == 0 || viewMode == 3\">\r\n          <table class=\"diff-table\">\r\n            <tbody>\r\n            <tr *ngFor=\"let log of classesL; index as i\">\r\n              <td class=\"index\">{{i}}.</td>\r\n              <td>{{log.log}}</td>\r\n            </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <div *ngIf=\"viewMode == 1 || viewMode == 2\">\r\n          <ng-template ngFor let-item [ngForOf]=\"classesL\">\r\n            <h3>{{item.name}}</h3>\r\n            <ng-template ngFor let-itemm [ngForOf]=\"item.methods\">\r\n              <h5>{{itemm.name}}</h5>\r\n              <table class=\"diff-table\">\r\n                <tbody>\r\n                <tr *ngFor=\"let log of itemm.logs; index as i\">\r\n                  <td class=\"index\">{{i}}.</td>\r\n                  <td>{{log.timestamp}} [{{log.thread}}] {{log.level}} {{log.logger}} - {{log.message}}</td>\r\n                </tr>\r\n                </tbody>\r\n              </table>\r\n              <br>\r\n            </ng-template>\r\n          </ng-template>\r\n          <div *ngIf=\"classesL.length == 0\">\r\n            <td-message label=\"Info\" sublabel=\"The execution has not unsuccessful methods.\" color=\"blue\"\r\n                        icon=\"info\"></td-message>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-template>\r\n  </mat-card-content>\r\n</mat-card>\r\n<ng-template #selection>\r\n  <td-data-table [clickable]=\"true\"\r\n                 [columns]=\"execsData\"\r\n                 [data]=\"execsRow\"\r\n                 [multiple]=\"false\"\r\n                 [selectable]=\"true\"\r\n                 [sortable]=\"false\"\r\n                 (rowSelect)=\"selectEvent($event)\"\r\n                 [(ngModel)]=\"selected\">\r\n    <ng-template *ngFor=\"let column of execsData\" tdDataTableTemplate=\"{{column.name}}\" let-value=\"value\"\r\n                 let-row=\"row\">\r\n      <div *ngIf=\"column.name !== 'options'\" (click)=\"viewExec(row)\">{{value}}</div>\r\n    </ng-template>\r\n    <ng-template tdDataTableTemplate=\"status\" let-value=\"value\">\r\n      <mat-icon [ngClass]=\"value.class\">{{value.icon}}</mat-icon>&nbsp;&nbsp;{{value.status}}\r\n    </ng-template>\r\n    <ng-template tdDataTableTemplate=\"options\" let-value=\"value\" let-row=\"row\" let-column=\"column\">\r\n      <div *ngIf=\"(deleteInProgress && (row.id === execDeleting)); else notDeleting\">\r\n        <div class=\"iconBtn-lg\">\r\n          <mat-spinner [diameter]=\"25\"></mat-spinner>\r\n        </div>\r\n      </div>\r\n      <ng-template #notDeleting>\r\n        <div layout=\"row\">\r\n          <button class=\"iconBtn-lg\"\r\n                  mat-button\r\n                  stopRowClick\r\n                  title=\"Delete execution\"\r\n                  (click)=\"delete(row)\"\r\n                  [disabled]=\"(row.id !== execDeleting) && deleteInProgress\">\r\n            <mat-icon [ngClass]=\"{'tc-grey-300': (row.id !== execDeleting) && deleteInProgress}\">delete</mat-icon>\r\n          </button>\r\n          <button class=\"iconBtn-lg\"\r\n                  mat-button\r\n                  stopRowClick\r\n                  title=\"View execution\"\r\n                  (click)=\"goTo(row)\">\r\n            <mat-icon>remove_red_eye</mat-icon>\r\n          </button>\r\n        </div>\r\n      </ng-template>\r\n    </ng-template>\r\n  </td-data-table>\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportComparisonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_table_service__ = __webpack_require__("../../../../../src/app/service/table.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var ReportComparisonComponent = /** @class */ (function () {
    function ReportComparisonComponent(activatedRoute, breadcrumbs, dialog, tableService, elasticsearchService, router) {
        this.activatedRoute = activatedRoute;
        this.breadcrumbs = breadcrumbs;
        this.dialog = dialog;
        this.tableService = tableService;
        this.elasticsearchService = elasticsearchService;
        this.router = router;
        this.breadcrumb = document.getElementById('bread');
        this.comparatorText = '';
        this.comparedText = '';
        this.comparisonInProgress = false;
        this.comparisonButtonsClasses = ['primary', 'primary', 'primary'];
        this.execsData = [
            { name: 'id', label: 'Id', width: 60 },
            { name: 'start_date', label: 'Start date', width: 240 },
            { name: 'status', label: 'Status', width: 200 }
        ];
        this.execsRow = [];
        this.showSelectionMessage = false;
        this.selected = [];
        this.status = 'BUILD FAILURE';
        this.resultData = [];
        this.viewButtonsClasses = ['accent', 'primary', 'primary', 'primary'];
        this.breadcrumb.style.setProperty("display", "none");
        this.comparisonInProgress = false;
        this.loadingData = true;
        this.showExecSelection = false;
    }
    ReportComparisonComponent.prototype.generateOutput = function (logs) {
        var result = '';
        var comparatorDate = new Date();
        if (logs[0] === undefined) {
            return result;
        }
        for (var i = 0; i < logs.length; i++) {
            (logs[i].timestamp.length > 2) ? (logs[i].timestamp = logs[i].timestamp.substring(0, 23)) : (logs[i].timestamp = '');
            (logs[i].thread.length > 2) ? ((logs[i].thread.indexOf('[') === -1) && (logs[i].thread = ' ['
                + logs[i].thread + '] ')) : (logs[i].thread = '');
            (logs[i].level.length > 2) ? (logs[i].level = logs[i].level) : (logs[i].level = '');
            (logs[i].logger.length > 2) ? (logs[i].logger = logs[i].logger) : (logs[i].logger = '');
        }
        if ((this.comparisonMode + '') === '2') {
            comparatorDate = new Date(this.findValidTimestamp(logs));
        }
        for (var i = 0; i < logs.length; i++) {
            ((this.comparisonMode + '') === '1') && (logs[i].timestamp = '');
            if (((this.comparisonMode + '') === '2') && (logs[i].timestamp.length > 2)) {
                logs[i].timestamp = ((new Date(logs[i].timestamp)).valueOf()
                    - (comparatorDate).valueOf()).toString();
            }
            result += (logs[i].timestamp + logs[i].thread + logs[i].level + ' ' + logs[i].logger + '' +
                ' ' + logs[i].message) + '\r\n';
        }
        return result;
    };
    ReportComparisonComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.test = this.activatedRoute.snapshot.parent.params['exec'];
                        _a = this;
                        return [4 /*yield*/, this.elasticsearchService.getExecutionByIdAsync(this.test)];
                    case 1:
                        _a.execution = _b.sent();
                        this.project = this.activatedRoute.snapshot.parent.parent.params['project'];
                        this.breadcrumbs.store([{ label: 'Home', url: '/', params: [] },
                            { label: this.project, url: '/projects/' + this.project, params: [] },
                            { label: this.test, url: '/projects/' + this.project + '/' + this.test, params: [] }]);
                        this.classesL = [];
                        this.classesLc = [];
                        this.updateViewMode(0, 0);
                        this.reloadTabContent();
                        return [4 /*yield*/, this.elasticsearchService.getExecutionByIdAsync(this.test)];
                    case 2:
                        result = _b.sent();
                        this.status = result.status;
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.reloadTabContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, i, icon, classi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchService.getExecutionsByProjectAsync(this.project)];
                    case 1:
                        response = _a.sent();
                        this.execsRow = [];
                        for (i = 0; i < response.length; i++) {
                            icon = void 0, classi = void 0;
                            if (response[i].status.indexOf('SUCCESS') !== -1) {
                                icon = 'check_circle';
                                classi = 'tc-green-700';
                            }
                            else {
                                icon = 'error';
                                classi = 'tc-red-700';
                            }
                            if (this.test !== (response[i].id + '')) {
                                this.execsRow.push({
                                    'id': response[i].id,
                                    'start_date': response[i].start_date,
                                    'status': {
                                        'icon': icon,
                                        'class': classi,
                                        'status': response[i].status
                                    },
                                    'time_elapsed': response[i].time_elapsed
                                });
                            }
                            else {
                                this.selected[0] = this.execsRow[this.execsRow.length - 1];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.updateComparisonMode = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.comparisonMode = mode;
                        this.loadingData = true;
                        if (!(this.selected[0] === undefined)) return [3 /*break*/, 1];
                        this.showSelectionMessage = true;
                        this.showExecSelection = true;
                        this.loadingData = false;
                        return [3 /*break*/, 11];
                    case 1:
                        _a = this.viewMode;
                        switch (_a) {
                            case 0: return [3 /*break*/, 2];
                            case 1: return [3 /*break*/, 4];
                            case 2: return [3 /*break*/, 6];
                            case 3: return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 10];
                    case 2: return [4 /*yield*/, this.generateRawComparison()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 4: return [4 /*yield*/, this.generateMethodsComparison()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 6: return [4 /*yield*/, this.generateMethodsComparison()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.generateRawComparison()];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        this.resetComparisonButtonsClasses();
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.updateViewMode = function (comp, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.viewMode = mode;
                        this.loadingData = true;
                        this.resetViewButtonsClasses();
                        _a = this.viewMode;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, this.viewRaw(comp, true)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, this.viewByMethods(comp)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, this.viewByMethods(comp)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.viewRaw(comp, false)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        if (this.comparisonInProgress) {
                            this.updateComparisonMode(this.comparisonMode);
                        }
                        else {
                            this.loadingData = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.disableComparison = function () {
        this.comparisonInProgress = false;
        this.comparisonMode = 0;
        this.selected[0] = undefined;
        this.resetComparisonButtonsClasses();
    };
    ReportComparisonComponent.prototype.goBack = function () {
        this.breadcrumb.style.removeProperty("display");
        this.router.navigate(['/projects', this.project]);
    };
    ReportComparisonComponent.prototype.selectEvent = function (event) {
        this.selected[0] = event.row;
        if (this.comparisonInProgress) {
            this.updateComparisonMode(this.comparisonMode);
        }
        if (this.showSelectionMessage) {
            this.showSelectionMessage = false;
            this.updateComparisonMode(this.comparisonMode);
            this.showExecSelection = false;
        }
    };
    ReportComparisonComponent.prototype.generateMethodsComparison = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comparisonDictionary, i, methods, j, i, targetClass, j, position, methodsC, j, map, _a, _b, _i, classC, value, methodsData, i, _c, _d, _e, _f, _g, _h, _j, classC, value, methodsData, i, _k, _l, _m, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        this.comparisonInProgress = false;
                        comparisonDictionary = {};
                        return [4 /*yield*/, this.updateViewMode(0, this.viewMode)];
                    case 1:
                        _p.sent();
                        return [4 /*yield*/, this.updateViewMode(1, this.viewMode)];
                    case 2:
                        _p.sent();
                        for (i = 0; i < this.classesL.length; i++) {
                            if (comparisonDictionary[this.classesL[i].name] === undefined) {
                                methods = [];
                                for (j = 0; j < this.classesL[i].methods.length; j++) {
                                    methods.push({
                                        'name': this.classesL[i].methods[j].name,
                                        'comparator': this.generateOutput(this.classesL[i].methods[j].logs),
                                        'compared': ''
                                    });
                                }
                                comparisonDictionary[this.classesL[i].name] = {
                                    'name': this.classesL[i].name,
                                    'tests': methods
                                };
                            }
                        }
                        for (i = 0; i < this.classesLc.length; i++) {
                            if (comparisonDictionary[this.classesLc[i].name] !== undefined) {
                                targetClass = comparisonDictionary[this.classesLc[i].name];
                                for (j = 0; j < this.classesLc[i].methods.length; j++) {
                                    position = this.containsTest(targetClass.tests, this.classesLc[i].methods[j]);
                                    if (position !== -1) {
                                        targetClass.tests[position].compared = this.generateOutput(this.classesLc[i].methods[j].logs);
                                    }
                                    else {
                                        targetClass.tests.push({
                                            'name': this.classesLc[i].methods[j].name,
                                            'comparator': '',
                                            'compared': this.generateOutput(this.classesLc[i].methods[j].logs)
                                        });
                                    }
                                }
                                comparisonDictionary[this.classesLc[i].name] = targetClass;
                            }
                            else {
                                methodsC = [];
                                for (j = 0; j < this.classesLc[i].methods.length; j++) {
                                    methodsC.push({
                                        'methodsC': this.classesLc[i].methods[j].name,
                                        'comparator': '',
                                        'compared': this.generateOutput(this.classesLc[i].methods[j].logs)
                                    });
                                }
                                comparisonDictionary[this.classesLc[i].name] = {
                                    'name': this.classesLc[i].name,
                                    'tests': methodsC
                                };
                            }
                        }
                        if (!(this.viewMode === 2)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.cleanDictionary(comparisonDictionary)];
                    case 3:
                        map = _p.sent();
                        this.resultData = [];
                        _a = [];
                        for (_b in map)
                            _a.push(_b);
                        _i = 0;
                        _p.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        classC = _a[_i];
                        if (!map.hasOwnProperty(classC)) return [3 /*break*/, 9];
                        value = map[classC];
                        methodsData = [];
                        this.comparatorText = '';
                        this.comparedText = '';
                        i = 0;
                        _p.label = 5;
                    case 5:
                        if (!(i < value.tests.length)) return [3 /*break*/, 8];
                        this.comparatorText = value.tests[i].comparator;
                        this.comparedText = value.tests[i].compared;
                        _d = (_c = methodsData).push;
                        _e = {
                            'name': value.tests[i].name
                        };
                        _f = 'logs';
                        return [4 /*yield*/, this.readDiffer()];
                    case 6:
                        _d.apply(_c, [(_e[_f] = _p.sent(),
                                _e)]);
                        _p.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        this.resultData.push({
                            'name': value.name,
                            'methods': methodsData
                        });
                        _p.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 4];
                    case 10: return [3 /*break*/, 18];
                    case 11:
                        this.resultData = [];
                        _g = [];
                        for (_h in comparisonDictionary)
                            _g.push(_h);
                        _j = 0;
                        _p.label = 12;
                    case 12:
                        if (!(_j < _g.length)) return [3 /*break*/, 18];
                        classC = _g[_j];
                        if (!comparisonDictionary.hasOwnProperty(classC)) return [3 /*break*/, 17];
                        value = comparisonDictionary[classC];
                        methodsData = [];
                        this.comparatorText = '';
                        this.comparedText = '';
                        i = 0;
                        _p.label = 13;
                    case 13:
                        if (!(i < value.tests.length)) return [3 /*break*/, 16];
                        this.comparatorText = value.tests[i].comparator;
                        this.comparedText = value.tests[i].compared;
                        _l = (_k = methodsData).push;
                        _m = {
                            'name': value.tests[i].name
                        };
                        _o = 'logs';
                        return [4 /*yield*/, this.readDiffer()];
                    case 14:
                        _l.apply(_k, [(_m[_o] = _p.sent(),
                                _m)]);
                        _p.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 13];
                    case 16:
                        this.resultData.push({
                            'name': value.name,
                            'methods': methodsData
                        });
                        _p.label = 17;
                    case 17:
                        _j++;
                        return [3 /*break*/, 12];
                    case 18:
                        this.comparisonInProgress = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.cleanDictionary = function (dictionary) {
        return __awaiter(this, void 0, void 0, function () {
            var execution, map, classC, value, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchService.getExecutionByIdAsync(this.test)];
                    case 1:
                        execution = _a.sent();
                        map = {};
                        for (classC in dictionary) {
                            if (dictionary.hasOwnProperty(classC)) {
                                value = dictionary[classC];
                                for (i = 0; i < value.tests.length; i++) {
                                    if (this.containsError(value.tests[i].name, execution.testcases)) {
                                        if (!map.hasOwnProperty(classC)) {
                                            map[classC] = {
                                                'name': classC,
                                                'tests': []
                                            };
                                        }
                                        map[classC].tests.push({
                                            'name': value.tests[i].name,
                                            'comparator': value.tests[i].comparator,
                                            'compared': value.tests[i].compared
                                        });
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, map];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.containsError = function (value, testcases) {
        for (var i = 0; i < testcases.length; i++) {
            if ((testcases[i].failureDetail !== null) && (testcases[i].name.indexOf(value) !== -1)) {
                return true;
            }
        }
        return false;
    };
    ReportComparisonComponent.prototype.generateRawComparison = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.comparisonInProgress = false;
                        return [4 /*yield*/, this.updateViewMode(0, this.viewMode)];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.updateViewMode(1, this.viewMode)];
                    case 2:
                        _e.sent();
                        this.resultData = [];
                        this.comparatorText = '';
                        this.comparatorText = this.generateOutput(this.classesL);
                        this.comparedText = '';
                        this.comparedText = this.generateOutput(this.classesLc);
                        _a = this.resultData;
                        _b = 0;
                        _c = {};
                        _d = 'logs';
                        return [4 /*yield*/, this.readDiffer()];
                    case 3:
                        _a[_b] = (_c[_d] = _e.sent(),
                            _c);
                        this.comparisonInProgress = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.readDiffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchService.postDiff(this.comparatorText, this.comparedText)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.tableService.generateTable(response)];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.viewByMethods = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var loggers, i, logger, partialLogger, methods, methodsData, j, cleanMethod, _a, _b, _c, _d, execution, classAux, i, failMethods, j;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.ready = false;
                        (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
                        return [4 /*yield*/, this.elasticsearchService.getLogsByTestAsync((mode === 0) ? (this.test)
                                : (this.selected[0].id), this.project, true, false)];
                    case 1:
                        loggers = _e.sent();
                        i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(i < loggers.length)) return [3 /*break*/, 9];
                        if (!(loggers[i].split(' ').length === 2)) return [3 /*break*/, 8];
                        logger = loggers[i].split(' ')[1];
                        partialLogger = logger.split('.')[logger.split('.').length - 1];
                        return [4 /*yield*/, this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, (mode === 0)
                                ? (this.test) : (this.selected[0].id), undefined)];
                    case 3:
                        methods = _e.sent();
                        methodsData = [];
                        j = 0;
                        _e.label = 4;
                    case 4:
                        if (!(j < methods.length)) return [3 /*break*/, 7];
                        if (!(methods[j] !== '')) return [3 /*break*/, 6];
                        cleanMethod = methods[j].replace('(', '').replace(')', '');
                        _b = (_a = methodsData).push;
                        _c = {
                            'name': methods[j]
                        };
                        _d = 'logs';
                        return [4 /*yield*/, this.elasticsearchService.getLogsByLoggerAsync(partialLogger, this.project, (mode === 0)
                                ? (this.test) : (this.selected[0].id), cleanMethod)];
                    case 5:
                        _b.apply(_a, [(_c[_d] = _e.sent(),
                                _c)]);
                        _e.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 4];
                    case 7:
                        (mode === 0) ? (this.classesL.push({ 'name': loggers[i].split(' ')[1], 'methods': methodsData }))
                            : (this.classesLc.push({ 'name': loggers[i].split(' ')[1], 'methods': methodsData }));
                        _e.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        if (!((this.viewMode === 2) && !this.comparisonInProgress)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.elasticsearchService.getExecutionByIdAsync(this.test)];
                    case 10:
                        execution = _e.sent();
                        classAux = [];
                        for (i = 0; i < this.classesL.length; i++) {
                            failMethods = [];
                            for (j = 0; j < this.classesL[i].methods.length; j++) {
                                if (this.containsError(this.classesL[i].methods[j].name, execution.testcases)) {
                                    failMethods.push(this.classesL[i].methods[j]);
                                }
                            }
                            if (failMethods.length > 0) {
                                classAux.push({
                                    'name': this.classesL[i].name,
                                    'methods': failMethods
                                });
                            }
                        }
                        this.classesL = classAux;
                        _e.label = 11;
                    case 11:
                        this.ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.viewRaw = function (mode, maven) {
        return __awaiter(this, void 0, void 0, function () {
            var logs, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ready = false;
                        (mode === 0) ? (this.classesL = []) : (this.classesLc = []);
                        return [4 /*yield*/, this.elasticsearchService.getLogsByTestAsync((mode === 0) ? (this.test)
                                : (this.selected[0].id), this.project, false, maven)];
                    case 1:
                        logs = _a.sent();
                        for (i = 0; i < logs.length; i++) {
                            (mode === 0) ? (this.classesL.push(logs[i])) : (this.classesLc.push(logs[i]));
                        }
                        this.ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportComparisonComponent.prototype.containsTest = function (tests, test) {
        for (var i = 0; i < tests.length; i++) {
            if (tests[i].name === test.name) {
                return i;
            }
        }
        return -1;
    };
    ReportComparisonComponent.prototype.findValidTimestamp = function (logs) {
        for (var i = 0; i < logs.length; i++) {
            if (logs[i].timestamp.length > 2) {
                return logs[i].timestamp;
            }
        }
        return '';
    };
    ReportComparisonComponent.prototype.index = function (testcases, method) {
        for (var i = 0; i < testcases.length; i++) {
            var elements = testcases[i].split(',');
            if ((elements[0] === method) && (elements[1]) === 'true') {
                return true;
            }
        }
        return false;
    };
    ReportComparisonComponent.prototype.resetComparisonButtonsClasses = function () {
        for (var i = 0; i < this.comparisonButtonsClasses.length; i++) {
            this.comparisonButtonsClasses[i] = 'primary';
        }
        if (this.comparisonInProgress) {
            this.comparisonButtonsClasses[this.comparisonMode] = 'accent';
        }
        this.loadingData = false;
    };
    ReportComparisonComponent.prototype.resetViewButtonsClasses = function () {
        for (var i = 0; i < this.viewButtonsClasses.length; i++) {
            this.viewButtonsClasses[i] = 'primary';
        }
        this.viewButtonsClasses[this.viewMode] = 'accent';
    };
    ReportComparisonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-report-comparison',
            template: __webpack_require__("../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/project/exec/report-comparison/report-comparison.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_3_ng2_breadcrumbs__["BreadcrumbsService"], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_5__service_table_service__["a" /* TableService */], __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__["a" /* ElasticsearchService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], ReportComparisonComponent);
    return ReportComparisonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/project/project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectComponent = /** @class */ (function () {
    function ProjectComponent() {
    }
    ProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project',
            template: "\n    <router-outlet></router-outlet>"
        }),
        __metadata("design:paramtypes", [])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/project/view-execs/view-execs.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".iconBtn-lg {\r\n  min-width: initial !important;\r\n  padding: 0 15px !important;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/project/view-execs/view-execs.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-title>\r\n    <div layout=\"row\">\r\n      <span *ngIf=\"project.name != undefined\">{{project.name}}</span>\r\n      <span flex></span>\r\n      <button class=\"iconBtn-lg  bgc-light-blue-100\"\r\n              mat-raised-button\r\n              (click)=\"reloadTabContent()\">\r\n        <mat-icon class=\"tc-light-blue-700\">refresh</mat-icon>\r\n      </button>&nbsp;\r\n      <button mat-raised-button class=\"iconBtn-lg\" color=\"accent\" [routerLink]=\"['/']\">\r\n        <mat-icon>home</mat-icon>\r\n      </button>&nbsp;\r\n      <button mat-raised-button color=\"accent\" (click)=\"addExec()\">New exec</button>\r\n    </div>\r\n  </mat-card-title>\r\n  <mat-divider></mat-divider>\r\n  <mat-card-content>\r\n    <td-data-table [clickable]=\"true\"\r\n                   [data]=\"execsRow\"\r\n                   [columns]=\"execsData\"\r\n                   [sortable]=\"false\">\r\n      <ng-template *ngFor=\"let column of execsData\" tdDataTableTemplate=\"{{column.name}}\" let-value=\"value\"\r\n                   let-row=\"row\">\r\n        <div *ngIf=\"column.name !== 'options'\" (click)=\"viewExec(row)\">{{value}}</div>\r\n      </ng-template>\r\n      <ng-template tdDataTableTemplate=\"status\" let-value=\"value\">\r\n        <mat-icon [ngClass]=\"value.class\">{{value.icon}}</mat-icon>&nbsp;&nbsp;{{value.status}}\r\n      </ng-template>\r\n      <ng-template tdDataTableTemplate=\"options\" let-value=\"value\" let-row=\"row\" let-column=\"column\">\r\n        <div *ngIf=\"(deleteInProgress && (row.id === execDeleting)); else notDeleting\">\r\n          <div class=\"iconBtn-lg\">\r\n            <mat-spinner [diameter]=\"25\"></mat-spinner>\r\n          </div>\r\n        </div>\r\n        <ng-template #notDeleting>\r\n          <div layout=\"row\">\r\n            <button class=\"iconBtn-lg\"\r\n                    mat-button\r\n                    stopRowClick\r\n                    title=\"Delete execution\"\r\n                    (click)=\"delete(row)\"\r\n                    [disabled]=\"(row.id !== execDeleting) && deleteInProgress\">\r\n              <mat-icon [ngClass]=\"{'tc-grey-300': (row.id !== execDeleting) && deleteInProgress}\">delete</mat-icon>\r\n            </button>\r\n            <button class=\"iconBtn-lg\"\r\n                    mat-button\r\n                    stopRowClick\r\n                    title=\"View execution\"\r\n                    (click)=\"goTo(row)\">\r\n              <mat-icon>remove_red_eye</mat-icon>\r\n            </button>\r\n          </div>\r\n        </ng-template>\r\n      </ng-template>\r\n    </td-data-table>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/project/view-execs/view-execs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewExecsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_project_model__ = __webpack_require__("../../../../../src/app/model/project.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ViewExecsComponent = /** @class */ (function () {
    function ViewExecsComponent(activatedRoute, elasticsearchService, router, breadcrumbs) {
        this.activatedRoute = activatedRoute;
        this.elasticsearchService = elasticsearchService;
        this.router = router;
        this.breadcrumbs = breadcrumbs;
        this.execsData = [
            { name: 'id', label: 'Id', width: 60 },
            { name: 'start_date', label: 'Start date', width: 240 },
            { name: 'entries', label: 'Entries', width: 100 },
            { name: 'status', label: 'Status' },
            { name: 'errors', label: 'ERRORS', width: 100 },
            { name: 'failures', label: 'FAILURES', width: 100 },
            { name: 'flakes', label: 'FLAKES', width: 100 },
            { name: 'skipped', label: 'SKIPPED', width: 100 },
            { name: 'tests', label: 'tests', width: 70 },
            { name: 'time_elapsed', label: 'Time elapsed' },
            { name: 'options', label: 'Options', width: 150 }
        ];
        this.execsRow = [];
        this.project = new __WEBPACK_IMPORTED_MODULE_3__model_project_model__["a" /* Project */]();
    }
    ViewExecsComponent.prototype.addExec = function () {
        this.router.navigate(['./', 'add'], { relativeTo: this.activatedRoute });
    };
    ViewExecsComponent.prototype.delete = function (row) {
        var _this = this;
        this.deleteInProgress = true;
        this.execDeleting = row.id;
        this.elasticsearchService.deleteExecutionById(row.id).subscribe(function (response) {
            _this.reloadTabContent();
            _this.deleteInProgress = false;
            _this.execDeleting = '';
        }, function (error) { return console.log(error); });
    };
    ViewExecsComponent.prototype.goTo = function (row) {
        this.router.navigate(['./', row.id], { relativeTo: this.activatedRoute });
    };
    ViewExecsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var name = this.activatedRoute.snapshot.params['project'];
        this.elasticsearchService.getProjectByName(name).subscribe(function (response) {
            _this.project = response;
            _this.reloadTabContent();
        });
        this.breadcrumbs.store([{ label: 'Home', url: '/', params: [] }, {
                label: name,
                url: '/projects/' + name,
                params: []
            }]);
    };
    ViewExecsComponent.prototype.reloadTabContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, i, icon, classi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.elasticsearchService.getExecutionsByProjectAsync(this.project.name)];
                    case 1:
                        response = _a.sent();
                        this.execsRow = [];
                        for (i = 0; i < response.length; i++) {
                            icon = void 0, classi = void 0;
                            if (response[i].status.indexOf('SUCCESS') !== -1) {
                                icon = 'check_circle';
                                classi = 'tc-green-700';
                            }
                            else {
                                icon = 'error';
                                classi = 'tc-red-700';
                            }
                            this.execsRow.push({
                                'id': response[i].id,
                                'start_date': response[i].start_date,
                                'entries': response[i].entries,
                                'status': {
                                    'icon': icon,
                                    'class': classi,
                                    'status': response[i].status
                                },
                                'errors': response[i].errors,
                                'failures': response[i].failures,
                                'flakes': response[i].flakes,
                                'skipped': response[i].skipped,
                                'tests': response[i].tests,
                                'time_elapsed': response[i].time_elapsed + ' seconds'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewExecsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-execs',
            template: __webpack_require__("../../../../../src/app/component/project/view-execs/view-execs.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/project/view-execs/view-execs.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__["a" /* ElasticsearchService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_2_ng2_breadcrumbs__["BreadcrumbsService"]])
    ], ViewExecsComponent);
    return ViewExecsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/public.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PublicComponent = /** @class */ (function () {
    function PublicComponent() {
    }
    PublicComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-public',
            template: "\n    <router-outlet></router-outlet>"
        }),
        __metadata("design:paramtypes", [])
    ], PublicComponent);
    return PublicComponent;
}());



/***/ }),

/***/ "../../../../../src/app/component/view-projects/view-projects.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".exec-name {\r\n  border: none;\r\n  font-size: 0.7em;\r\n  letter-spacing: 1px;\r\n  line-height: 24px;\r\n  text-transform: uppercase;\r\n  font-weight: 400;\r\n  margin: 0;\r\n  background: rgba(0, 0, 0, .32);\r\n  color: hsla(0, 0%, 100%, .87);\r\n  font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;\r\n}\r\n\r\n.title {\r\n  color: white;\r\n}\r\n\r\n.active {\r\n  color: #BF360C;\r\n}\r\n\r\n.left {\r\n  float: left;\r\n}\r\n\r\n.clickable {\r\n  font-size: 0.9em;\r\n}\r\n\r\n.classname {\r\n  font-size: 0.75em;\r\n}\r\n\r\n.icon {\r\n  position: absolute;\r\n  right: 0px;\r\n}\r\n\r\n.no-margin {\r\n  margin: 0 0px;\r\n}\r\n\r\n.iconBtn-lg {\r\n  min-width: initial !important;\r\n  padding: 0 15px !important;\r\n}\r\n\r\n.icon-disabled {\r\n\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/view-projects/view-projects.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-title>\r\n    <div layout=\"row\">\r\n      <span>Projects</span>\r\n      <span flex></span>\r\n      <button class=\"iconBtn-lg  bgc-light-blue-100\"\r\n              mat-raised-button\r\n              (click)=\"reloadTable()\">\r\n        <mat-icon class=\"tc-light-blue-700\">refresh</mat-icon>\r\n      </button>&nbsp;\r\n      <button mat-raised-button color=\"accent\" routerLink=\"add\">New project</button>\r\n    </div>\r\n  </mat-card-title>\r\n  <mat-divider></mat-divider>\r\n  <mat-card-content>\r\n    <div *ngIf=\"(projectsRowData.length > 0) && (!exec); else emptyTable\">\r\n      <td-data-table [clickable]=\"true\"\r\n                     [data]=\"projectsRowData\"\r\n                     [columns]=\"projectsData\"\r\n                     [sortable]=\"false\">\r\n        <ng-template *ngFor=\"let column of projectsData\" tdDataTableTemplate=\"{{column.name}}\" let-value=\"value\"\r\n                     let-row=\"row\">\r\n          <div *ngIf=\"column.name !== 'options'\" (click)=\"viewProject(row)\">{{value}}</div>\r\n        </ng-template>\r\n        <ng-template tdDataTableTemplate=\"options\" let-value=\"value\" let-row=\"row\" let-column=\"column\">\r\n          <div *ngIf=\"(deleteInProgress && (row.name === projectDeleting)); else notDeleting\">\r\n            <div class=\"iconBtn-lg\">\r\n              <mat-spinner [diameter]=\"25\"></mat-spinner>\r\n            </div>\r\n          </div>\r\n          <ng-template #notDeleting>\r\n            <div layout=\"row\">\r\n              <button class=\"iconBtn-lg\"\r\n                      mat-button\r\n                      stopRowClick\r\n                      title=\"Delete project\"\r\n                      (click)=\"delete(row)\"\r\n                      [disabled]=\"(row.name !== projectDeleting) && deleteInProgress\">\r\n                <mat-icon [ngClass]=\"{'tc-grey-300': (row.name !== projectDeleting) && deleteInProgress}\">delete\r\n                </mat-icon>\r\n              </button>\r\n              <button class=\"iconBtn-lg\"\r\n                      mat-button\r\n                      stopRowClick\r\n                      title=\"View project\"\r\n                      (click)=\"goTo(row.name)\">\r\n                <mat-icon>remove_red_eye</mat-icon>\r\n              </button>\r\n            </div>\r\n          </ng-template>\r\n        </ng-template>\r\n      </td-data-table>\r\n    </div>\r\n    <ng-template #emptyTable>\r\n      <td-message label=\"Info\" sublabel=\"You don't have avaible projects. Please, create a new one.\" color=\"light-blue\"\r\n                  icon=\"info\"></td-message>\r\n    </ng-template>\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/view-projects/view-projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__covalent_core__ = __webpack_require__("../../../../@covalent/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_breadcrumbs__ = __webpack_require__("../../../../ng2-breadcrumbs/ng2-breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewProjectsComponent = /** @class */ (function () {
    function ViewProjectsComponent(elasticsearchService, media, router, activatedRoute, breadcrumbs) {
        this.elasticsearchService = elasticsearchService;
        this.media = media;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.breadcrumbs = breadcrumbs;
        this.projectsData = [
            { name: 'id', label: 'Id', width: 100 },
            { name: 'name', label: 'Name' },
            { name: 'options', label: 'Options', width: 150 }
        ];
        this.projectsRowData = [];
        this.deleteInProgress = false;
        this.exec = false;
        this.projectDeleting = '';
        this.reloadTable();
    }
    ViewProjectsComponent.prototype.delete = function (project) {
        var _this = this;
        this.deleteInProgress = true;
        this.projectDeleting = project.name;
        this.elasticsearchService.deleteProjectById(project.id).subscribe(function (response) {
            _this.reloadTable();
            _this.deleteInProgress = false;
            _this.projectDeleting = '';
        });
    };
    ViewProjectsComponent.prototype.goTo = function (project) {
        this.router.navigate(['./', project], { relativeTo: this.activatedRoute });
    };
    ViewProjectsComponent.prototype.ngOnInit = function () {
        this.breadcrumbs.store([{ label: 'Home', url: '/', params: [] }]);
    };
    ViewProjectsComponent.prototype.reloadTable = function () {
        var _this = this;
        this.exec = true;
        this.elasticsearchService.getProjectsAll().subscribe(function (response) {
            _this.projectsRowData = [];
            for (var i = 0; i < response.length; i++) {
                _this.projectsRowData[i] = {
                    'id': response[i].id,
                    'name': response[i].name
                };
            }
        }, function (error) { return _this.projectsRowData = []; });
        this.exec = false;
    };
    ViewProjectsComponent.prototype.viewProject = function (event) {
        this.router.navigateByUrl('/' + event.row.name);
    };
    ViewProjectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-projects',
            template: __webpack_require__("../../../../../src/app/component/view-projects/view-projects.component.html"),
            styles: [__webpack_require__("../../../../../src/app/component/view-projects/view-projects.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__service_elasticsearch_service__["a" /* ElasticsearchService */], __WEBPACK_IMPORTED_MODULE_2__covalent_core__["p" /* TdMediaService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_3_ng2_breadcrumbs__["BreadcrumbsService"]])
    ], ViewProjectsComponent);
    return ViewProjectsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/model/project.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
var Project = /** @class */ (function () {
    function Project() {
        this.assigned_ids = [];
        this.name = '';
        this.num_execs = 0;
    }
    Project.prototype.body = function () {
        var object = {
            id: this.id,
            name: this.name,
            'num_execs': this.num_execs
        };
        return JSON.stringify(object);
    };
    return Project;
}());



/***/ }),

/***/ "../../../../../src/app/service/elasticsearch.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElasticsearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ElasticsearchService = /** @class */ (function () {
    function ElasticsearchService(http) {
        this.http = http;
        this.baseAPIUrl = 'http://localhost:8443/';
        this.baseAPIExecutionsUrl = this.baseAPIUrl + 'api/executions';
        this.baseAPILogsUrl = this.baseAPIUrl + 'api/logs';
        this.baseAPIDiffMatchPatchUrl = this.baseAPIUrl + 'api/diff';
        this.baseAPIProjectsUrl = this.baseAPIUrl + 'api/projects';
        this.baseELASTICSEARCHUrl = 'http://localhost:9200/';
    }
    ElasticsearchService.prototype.getCountOfProjects = function () {
        return this.http.get(this.baseELASTICSEARCHUrl + 'projects/_count').map(function (response) { return response.count; }, function (error) { return error; });
    };
    ElasticsearchService.prototype.getExecutionByIdAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAPIExecutionsUrl + '?id=' + id).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService.prototype.getExecutionsByProjectAsync = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(this.baseAPIExecutionsUrl + '?project=' + project).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService.prototype.deleteExecutionById = function (id) {
        return this.http.delete(this.baseAPIExecutionsUrl + '/' + id).map(function (response) { return response; }, function (error) { return error; });
    };
    ElasticsearchService.prototype.getLogsByLoggerAsync = function (logger, project, test, method) {
        return __awaiter(this, void 0, void 0, function () {
            var composedUrl, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        composedUrl = this.baseAPILogsUrl + '?logger=' + logger + '&project=' + project + '&test=' + test;
                        if (method !== undefined) {
                            composedUrl += '&method=' + method;
                        }
                        return [4 /*yield*/, this.http.get(composedUrl).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService.prototype.getLogsByTestAsync = function (test, project, classes, maven) {
        return __awaiter(this, void 0, void 0, function () {
            var composedUrl, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        composedUrl = this.baseAPILogsUrl + '/' + test + '?project=' + project + '&classes=' + classes;
                        (composedUrl += '&maven=' + maven) && (maven);
                        return [4 /*yield*/, this.http.get(composedUrl).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService.prototype.getProjectsAll = function () {
        return this.http.get(this.baseAPIProjectsUrl)
            .map(function (response) { return response; })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].throw('No projects available. You must create the first project to see it.'); });
    };
    ElasticsearchService.prototype.getProjectByName = function (name) {
        return this.http.get(this.baseAPIProjectsUrl + '/' + name).map(function (response) { return response; }, function (error) { return 'No project found with the given name.'; });
    };
    ElasticsearchService.prototype.deleteProjectById = function (id) {
        return this.http.delete(this.baseAPIProjectsUrl + '/' + id).map(function (response) { return response; }, function (error) { return error; });
    };
    ElasticsearchService.prototype.postFile = function (files, project) {
        return __awaiter(this, void 0, void 0, function () {
            var body, i, headers, composedUrl, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = new FormData();
                        for (i = 0; i < files.length; i++) {
                            body.append('files', files[i]);
                        }
                        headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
                        headers.append('Content-Type', 'application/pdf');
                        composedUrl = this.baseAPIProjectsUrl + '/' + project;
                        return [4 /*yield*/, this.http.post(composedUrl, body, { headers: headers }).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService.prototype.downloadResource = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(url, { responseType: 'blob' }).toPromise()];
                    case 1:
                        file = _a.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    ElasticsearchService.prototype.postDiff = function (text1, text2) {
        return __awaiter(this, void 0, void 0, function () {
            var body, headers, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = { text1: text1, text2: text2 };
                        headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
                        headers.append('Content-Type', 'text/plain');
                        return [4 /*yield*/, this.http.post(this.baseAPIDiffMatchPatchUrl, JSON.stringify(body), {
                                headers: headers,
                                responseType: 'text'
                            }).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ElasticsearchService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ElasticsearchService);
    return ElasticsearchService;
}());



/***/ }),

/***/ "../../../../../src/app/service/table.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TableService = /** @class */ (function () {
    function TableService() {
    }
    TableService.prototype.generateTable = function (diff) {
        var _this = this;
        this.results = [];
        this.comparatorClass = 'normal';
        this.comparedClass = 'normal';
        var lines = diff.split('<br>');
        lines.pop();
        var comparedLine = '', comparatorLine = '';
        var i = 1;
        lines.forEach(function (line) {
            line = _this.closeOpenedTags(line.replace('&para;', ''));
            line = _this.openClosedTags(line);
            comparatorLine = _this.cleanBetweenTags('<ins>', '</ins>', line, 0);
            comparedLine = _this.cleanBetweenTags('<del>', '</del>', line, 1);
            _this.concatResults(i, comparatorLine, comparedLine);
            i++;
        });
        this.solveUselessDiffs();
        this.solveBasicTableColors();
        // this.solveResultErrors();
        return this.results;
    };
    TableService.prototype.cleanBetweenTags = function (open, close, line, code) {
        var uselessData;
        while (line.indexOf(open) !== -1) {
            uselessData = line.substring(line.indexOf(open) + 5, line.indexOf(close));
            line = line.replace(open + uselessData + close, '');
        }
        if (line.length < 2) {
            (code === 0) ? (this.comparatorClass = 'added') : (this.comparedClass = 'added');
        }
        return line;
    };
    TableService.prototype.closeOpenedTags = function (line) {
        var targetPos = line.lastIndexOf('<');
        var tagStarting = line.substring(targetPos, targetPos + 2);
        switch (tagStarting) {
            case '<s':
                line = line + '</span>';
                this.lastCloseTag = '</span>';
                this.lastOpenTag = '<span>';
                break;
            case '<d':
                line = line + '</del>';
                this.lastCloseTag = '</del>';
                this.lastOpenTag = '<del>';
                break;
            case '<i':
                line = line + '</ins>';
                this.lastCloseTag = '</ins>';
                this.lastOpenTag = '<ins>';
                break;
            default:
                line = this.lastOpenTag + line + this.lastCloseTag;
        }
        return line;
    };
    TableService.prototype.concatResults = function (i, comparator, compared) {
        this.results = this.results.concat({
            'index_p': i,
            'com_p': {
                'content': comparator,
                'class': this.comparatorClass
            },
            'indexp': i,
            'comp': {
                'content': compared,
                'class': this.comparedClass
            }
        });
        this.comparatorClass = 'normal';
        this.comparedClass = 'normal';
    };
    TableService.prototype.openClosedTags = function (line) {
        var targetPos = line.indexOf('<');
        var tagStarting = line.substring(targetPos, targetPos + 3);
        switch (tagStarting) {
            case '</s':
                line = '<span>' + line;
                break;
            case '</d':
                line = '<del>' + line;
                break;
            case '</i':
                line = '<ins>' + line;
                break;
        }
        return line;
    };
    TableService.prototype.solveBasicTableColors = function () {
        for (var i = 0; i < this.results.length; i++) {
            var result = this.results[i];
            if ((result.com_p.content.indexOf('<del>') !== -1) && (result.com_p !== undefined)) {
                result.com_p.class = 'delC';
                result.comp.class = 'added';
            }
            if ((result.comp.content.indexOf('<ins>') !== -1) && (result.comp !== undefined)) {
                result.comp.class = 'insC';
                if (result.com_p.class !== 'delC') {
                    result.com_p.class = 'added';
                }
            }
            this.results[i] = result;
        }
    };
    TableService.prototype.solveUselessDiffs = function () {
        for (var i = 0; i < this.results.length; i++) {
            var result = this.results[i];
            var comparator = result.com_p.content;
            if (comparator.indexOf('<del>') === comparator.lastIndexOf('<del>') && (comparator.indexOf('<del>') === 0)) {
                var content = comparator.substring(comparator.indexOf('<del>') + 5, comparator.indexOf('</del>'));
                if (/^[^A-Za-z0-9]*$/g.test(content)) {
                    comparator = '';
                    result.comp.class = 'normal';
                }
            }
            result.com_p.content = comparator;
            var compared = result.comp.content;
            if (comparator.indexOf('<ins>') === comparator.lastIndexOf('<ins>') && (compared.indexOf('<ins>') === 0)) {
                var content = compared.substring(compared.indexOf('<ins>') + 5, compared.indexOf('</ins>'));
                if (/^[^A-Za-z0-9]*$/g.test(content)) {
                    compared = '';
                    result.com_p.class = 'normal';
                }
            }
            result.comp.content = compared;
            this.results[i] = result;
        }
    };
    TableService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TableService);
    return TableService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__covalent_core__ = __webpack_require__("../../../../@covalent/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var FLEX_LAYOUT_MODULES = [
    __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
];
var ANGULAR_MODULES = [
    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* ReactiveFormsModule */],
];
var MATERIAL_MODULES = [
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatAutocompleteModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonToggleModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCardModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatChipsModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDatepickerModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatDialogModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatExpansionModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatFormFieldModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatGridListModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatIconModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatInputModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatListModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatMenuModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["s" /* MatPaginatorModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatProgressBarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatProgressSpinnerModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatPseudoCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatRadioModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["y" /* MatSelectModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSliderModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["A" /* MatSlideToggleModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatSnackBarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["D" /* MatSortModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["F" /* MatTableModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["G" /* MatTabsModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["H" /* MatToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["I" /* MatTooltipModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatStepperModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatNativeDateModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["x" /* MatRippleModule */]
];
var COVALENT_MODULES = [
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["a" /* CovalentCommonModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["b" /* CovalentDataTableModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["c" /* CovalentDialogsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["e" /* CovalentFileModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["f" /* CovalentLayoutModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["g" /* CovalentLoadingModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["h" /* CovalentMediaModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["i" /* CovalentMenuModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["j" /* CovalentMessageModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["k" /* CovalentNotificationsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["l" /* CovalentPagingModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["m" /* CovalentSearchModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["n" /* CovalentStepsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["o" /* CovalentVirtualScrollModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["d" /* CovalentExpansionPanelModule */]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                ANGULAR_MODULES,
                MATERIAL_MODULES,
                COVALENT_MODULES,
                FLEX_LAYOUT_MODULES,
            ],
            declarations: [],
            exports: [
                ANGULAR_MODULES,
                MATERIAL_MODULES,
                COVALENT_MODULES,
                FLEX_LAYOUT_MODULES,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/config/interceptor/request.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RequestInterceptor = /** @class */ (function () {
    function RequestInterceptor() {
    }
    RequestInterceptor.prototype.onRequest = function (requestOptions) {
        // you add headers or do something before a request here.
        return requestOptions;
    };
    RequestInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], RequestInterceptor);
    return RequestInterceptor;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map