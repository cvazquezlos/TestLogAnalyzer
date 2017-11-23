webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
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
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<td-layout-nav>\r\n  <div td-toolbar-content layout=\"row\" layout-align=\"center center\" flex>\r\n    <span>LOGANALYZER</span>\r\n    <span flex></span>\r\n    <a mat-icon-button matTooltip=\"Docs\" href=\"https://teradata.github.io/covalent/\" target=\"_blank\"><mat-icon>chrome_reader_mode</mat-icon></a>\r\n    <a mat-icon-button matTooltip=\"Github\" href=\"https://github.com/cvazquezlos/LOGANALYZER\" target=\"_blank\"><mat-icon svgIcon=\"assets:github\"></mat-icon></a>\r\n  </div>\r\n  <router-outlet></router-outlet>\r\n</td-layout-nav>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
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



var AppComponent = (function () {
    function AppComponent(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'github', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'listener', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatIconRegistry */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_codemirror__ = __webpack_require__("../../../../ng2-codemirror/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_diff_match_patch__ = __webpack_require__("../../../../ng-diff-match-patch/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__covalent_highlight__ = __webpack_require__("../../../../@covalent/highlight/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__covalent_http__ = __webpack_require__("../../../../@covalent/http/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__covalent_markdown__ = __webpack_require__("../../../../@covalent/markdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_comparison_comparison_component__ = __webpack_require__("../../../../../src/app/component/comparison/comparison.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_home_component__ = __webpack_require__("../../../../../src/app/component/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__config_interceptor_request_interceptor__ = __webpack_require__("../../../../../src/config/interceptor/request.interceptor.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var httpInterceptorProviders = [
    __WEBPACK_IMPORTED_MODULE_15__config_interceptor_request_interceptor__["a" /* RequestInterceptor */],
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__component_comparison_comparison_component__["a" /* ComparisonComponent */],
            __WEBPACK_IMPORTED_MODULE_11__component_home_component__["a" /* HomeComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_codemirror__["CodemirrorModule"],
            __WEBPACK_IMPORTED_MODULE_7__covalent_http__["a" /* CovalentHttpModule */].forRoot({
                interceptors: [{
                        interceptor: __WEBPACK_IMPORTED_MODULE_15__config_interceptor_request_interceptor__["a" /* RequestInterceptor */], paths: ['**'],
                    }],
            }),
            __WEBPACK_IMPORTED_MODULE_6__covalent_highlight__["a" /* CovalentHighlightModule */],
            __WEBPACK_IMPORTED_MODULE_8__covalent_markdown__["a" /* CovalentMarkdownModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng_diff_match_patch__["DiffMatchPatchModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_13__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_12__shared_shared_module__["a" /* SharedModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__service_elasticsearch_service__["a" /* ElasticsearchService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]],
        entryComponents: []
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_home_component__ = __webpack_require__("../../../../../src/app/component/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_comparison_comparison_component__ = __webpack_require__("../../../../../src/app/component/comparison/comparison.component.ts");



var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_home_component__["a" /* HomeComponent */] },
    { path: 'comparison', component: __WEBPACK_IMPORTED_MODULE_2__component_comparison_comparison_component__["a" /* ComparisonComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/component/comparison/comparison.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".execs {\r\n  background-color: rgb(195, 195, 195);\r\n  border: none;\r\n  color: #0e0e0e;\r\n  padding: 3px 8px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 1.3em;\r\n}\r\n\r\n.active {\r\n  background-color: rgb(25, 118, 210);\r\n  border: none;\r\n  color: white;\r\n  padding: 3px 8px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 1.3em;\r\n}\r\n\r\n.find {\r\n  background-color: rgb(251, 140, 0); /* Green */\r\n  font-size: 21px;\r\n  border: none;\r\n  color: white;\r\n  padding: 0.5em 0.8em;\r\n  border-radius: 0.2em;\r\n  width: auto;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.title {\r\n  color: white;\r\n}\r\n\r\n.left {\r\n  float: left;\r\n}\r\n\r\n.clickable {\r\n  font-size: 0.9em;\r\n}\r\n\r\n.classname {\r\n  font-size: 0.75em;\r\n}\r\n\r\n.icon {\r\n  position: absolute;\r\n  right: 0px;\r\n}\r\n\r\n.no-margin {\r\n  margin: 0 0px;\r\n}\r\n\r\n.full-width {\r\n  width: 100%\r\n}\r\n\r\n.meth-active {\r\n  border: none;\r\n  margin: 0;\r\n  background: rgba(0,0,0,.32);\r\n  color: hsla(0,0%,100%,.87);\r\n}\r\n\r\n.meth-active mat-icon {\r\n  color: hsla(0,0%,100%,.87);\r\n}\r\n\r\n.not-displayed {\r\n  display: none;\r\n}\r\n\r\n.display {\r\n  display: block;\r\n}\r\n\r\n.delC {\r\n  background: rgb(252, 216, 217);\r\n  border: 1px solid rgb(154, 35, 40);\r\n}\r\n\r\n.insC {\r\n  background: rgb(224, 252, 208);\r\n  border: 1px solid rgb(26, 152, 31);\r\n}\r\n\r\n.diff-table {\r\n  font-family: \"Inconsolata\", \"Consolas\", \"Monaco\";\r\n  font-size: 0.9em;\r\n  background: white;\r\n  width: 100%;\r\n}\r\n\r\n.index {\r\n  color: rgb(102, 102, 102);\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/comparison/comparison.component.html":
/***/ (function(module, exports) {

module.exports = "<td-layout>\r\n  <td-layout-manage-list #manageList\r\n                         opened=\"true\"\r\n                         mode=\"side\">\r\n    <mat-toolbar td-sidenav-content color=\"accent\">\r\n      <span class=\"cursor-pointer title left\">Comparisons</span>\r\n      <a mat-icon-button matTooltip=\"Return home\" class=\"no-margin icon\" [routerLink]=\"['/']\">\r\n        <mat-icon class=\"title\">home</mat-icon>\r\n      </a>\r\n    </mat-toolbar>\r\n    <mat-nav-list td-sidenav-content [tdLayoutManageListClose]=\"!media.query('gt-sm')\">\r\n      <ng-template let-item let-last=\"last\" ngFor [ngForOf]=\"methods\">\r\n        <a mat-list-item [class]=\"item.class\" (click)=\"methodSelected(item)\">\r\n          <mat-icon matListIcon>{{item.icon}}</mat-icon>\r\n          {{item.title}}\r\n        </a>\r\n      </ng-template>\r\n    </mat-nav-list>\r\n    <mat-toolbar color=\"accent\">\r\n      <div layout=\"row\" layout-align=\"start center\" flex>\r\n        <button mat-icon-button tdLayoutManageListOpen [hideWhenOpened]=\"true\">\r\n          <mat-icon>arrow_back</mat-icon>\r\n        </button>\r\n        <span class=\"title\">Content Title</span>\r\n        <span flex></span>\r\n      </div>\r\n    </mat-toolbar>\r\n    <div *ngIf=\"showResults\">\r\n      <div layout-gt-sm=\"row\" tdMediaToggle=\"gt-xs\" [mediaClasses]=\"['push-sm']\">\r\n        <mat-card>\r\n          <mat-card-title>Comparison results</mat-card-title>\r\n          <mat-divider></mat-divider>\r\n          <mat-card-content>\r\n            <table class=\"diff-table\">\r\n              <tbody>\r\n                <tr *ngFor=\"let result of results\">\r\n                  <td [innerHTML]=\"result.index\" class=\"index\"></td>\r\n                  <td [innerHTML]=\"result.com_p.content\" [class]=\"result.com_p.class\"></td>\r\n                  <td [innerHTML]=\"result.index\" class=\"index\"></td>\r\n                  <td [innerHTML]=\"result.comp.content\" [class]=\"result.comp.class\"></td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </mat-card-content>\r\n        </mat-card>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"active; else default\">\r\n      <div layout-gt-sm=\"row\" tdMediaToggle=\"gt-xs\" [mediaClasses]=\"['push-sm']\">\r\n        <div flex-gt-sm=\"50\">\r\n          <mat-card>\r\n            <mat-card-title>\r\n              Comparator execution\r\n            </mat-card-title>\r\n            <mat-card-subtitle>\r\n              <ng-template let-execC ngFor [ngForOf]=\"execsComparator\">\r\n                <button (click)=\"comparator(execC)\" [class]=\"execC.class\">{{execC.id}}</button>\r\n              </ng-template>\r\n            </mat-card-subtitle>\r\n            <mat-divider></mat-divider>\r\n            <mat-card-content>\r\n              <codemirror [(ngModel)]=\"comparatorText\" [config]=\"config\"></codemirror>\r\n            </mat-card-content>\r\n          </mat-card>\r\n        </div>\r\n        <div flex-gt-sm=\"50\">\r\n          <mat-card>\r\n            <mat-card-title>Comparated execution</mat-card-title>\r\n            <mat-card-subtitle>\r\n              <ng-template let-execc ngFor [ngForOf]=\"execsCompared\">\r\n                <button (click)=\"compared(execc)\" [class]=\"execc.class\">{{execc.id}}</button>\r\n              </ng-template>\r\n            </mat-card-subtitle>\r\n            <mat-divider></mat-divider>\r\n            <mat-card-content>\r\n              <codemirror [(ngModel)]=\"comparedText\" [config]=\"config\"></codemirror>\r\n            </mat-card-content>\r\n          </mat-card>\r\n        </div>\r\n      </div>\r\n      <div class=\"full-width\">\r\n        <button class=\"find\" (click)=\"generateComparison()\">Find difference</button>\r\n      </div>\r\n      <pre class=\"not-displayed\" #process processingDiff [left]=\"comparatorText\" [right]=\"comparedText\"></pre>\r\n    </div>\r\n    <ng-template #default>\r\n      <div tdMediaToggle=\"gt-xs\" [mediaClasses]=\"['push-sm']\">\r\n        <mat-card>\r\n          <mat-card-content>\r\n            <p>Select a test to start comparing executions.</p>\r\n          </mat-card-content>\r\n        </mat-card>\r\n      </div>\r\n    </ng-template>\r\n  </td-layout-manage-list>\r\n</td-layout>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/comparison/comparison.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparisonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__covalent_core__ = __webpack_require__("../../../../@covalent/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ComparisonComponent = (function () {
    function ComparisonComponent(elasticsearchService, media) {
        this.elasticsearchService = elasticsearchService;
        this.media = media;
        this.active = false;
        this.config = {
            lineNumbers: true,
            theme: 'twilight',
            readOnly: 'nocursor',
            lineWrapping: true,
            mode: 'xml'
        };
        this.execsComparator = [];
        this.execsCompared = [];
        this.execsNumber = 0;
        this.methods = [];
        this.results = [];
        this.showResults = false;
        this.initInfo('1');
        this.comparatorText = '';
        this.comparedText = '';
    }
    ComparisonComponent.prototype.comparator = function (exec) {
        if (!this.isSelectedAnyElement(this.execsCompared)) {
            this.addExecs(1, exec.id, exec.method);
            this.addExecs(2, exec.id, exec.method);
            exec.class = 'active';
            console.log(exec.id);
            this.loadInfo(exec.id, 0, exec.method);
            this.deleteExec(this.execsCompared, exec);
        }
        else {
            this.loadInfo(exec.id, 0, exec.method);
            exec.class = 'active';
            this.deleteExec(this.execsCompared, exec);
        }
    };
    ComparisonComponent.prototype.compared = function (exec) {
        if (!this.isSelectedAnyElement(this.execsComparator)) {
            this.addExecs(1, exec.id, exec.method);
            this.addExecs(2, exec.id, exec.method);
            exec.class = 'active';
            console.log(exec.id);
            this.loadInfo(exec.id, 1, exec.method);
            this.deleteExec(this.execsComparator, exec);
        }
        else {
            this.loadInfo(exec.id, 1, exec.method);
            exec.class = 'active';
            this.deleteExec(this.execsComparator, exec);
        }
    };
    ComparisonComponent.prototype.generateComparison = function () {
        var comparisonResult = this.process.nativeElement.innerHTML.toString();
        var lines = comparisonResult.split('<br>');
        var resultComparator = [];
        var comparatorData;
        var comparatorAct = false;
        var resultCompared = [];
        var comparedData;
        var comparedAct = false;
        for (var i = 0; i < lines.length; i++) {
            comparatorAct = false;
            comparatorData = lines[i];
            var uselessData = void 0;
            while (comparatorData.indexOf('<ins>') > -1) {
                uselessData = this.cleanString(comparatorData, '<ins>', '</ins>');
                comparatorData = comparatorData.replace('<ins>' + uselessData + '</ins>', '');
                comparatorAct = true;
            }
            var classC = 'normal';
            if (comparatorAct) {
                classC = 'delC';
            }
            resultComparator = resultComparator.concat({
                'content': comparatorData.replace('<div>', '').replace('</div>', ''),
                'class': classC
            });
            comparedAct = false;
            comparedData = lines[i];
            while (comparedData.indexOf('<del>') > -1) {
                uselessData = this.cleanString(comparedData, '<del>', '</del>');
                comparedData = comparedData.replace('<del>' + uselessData + '</del>', '');
                comparedAct = true;
            }
            var classc = 'normal';
            if (comparedAct) {
                classc = 'insC';
            }
            resultCompared = resultCompared.concat({
                'content': comparedData.replace('<div>', '').replace('</div>', ''),
                'class': classc
            });
        }
        this.results = [];
        for (var i = 0; i < resultComparator.length; i++) {
            this.results = this.results.concat({
                'index': (i + 1).toString() + '.',
                'com_p': resultComparator[i],
                'comp': resultCompared[i]
            });
        }
        this.showResults = true;
    };
    ComparisonComponent.prototype.methodSelected = function (method) {
        this.deselect();
        console.log('Method selected: ' + method.title);
        console.log('Loading executions...');
        this.showResults = false;
        this.comparatorText = '';
        this.comparedText = '';
        this.execsComparator = [];
        this.execsCompared = [];
        this.countExecs(0, method.title.replace('(', '').replace(')', ''));
        method.class = 'meth-active';
        this.active = true;
    };
    ComparisonComponent.prototype.addExecs = function (type, exec, method) {
        var classN = 'execs';
        switch (type) {
            case 1:
                this.execsComparator = [];
                for (var i = 0; i < this.execsNumber; i++) {
                    if (i + 1 === exec) {
                        classN = 'active';
                    }
                    this.execsComparator = this.execsComparator.concat({
                        'id': i + 1,
                        'class': classN,
                        'method': method
                    });
                    classN = 'execs';
                }
                break;
            case 2:
                this.execsCompared = [];
                for (var i = 0; i < this.execsNumber; i++) {
                    if (i + 1 === exec) {
                        classN = 'active';
                    }
                    this.execsCompared = this.execsCompared.concat({
                        'id': i + 1,
                        'class': classN,
                        'method': method
                    });
                    classN = 'execs';
                }
                break;
        }
    };
    ComparisonComponent.prototype.countExecs = function (index, method) {
        var _this = this;
        this.elasticsearchService.count(2, (index + 1).toString()).subscribe(function (count) {
            if (count !== 0) {
                _this.execsComparator = _this.execsComparator.concat({
                    'id': index + 1,
                    'class': 'execs',
                    'method': method,
                });
                _this.execsCompared = _this.execsCompared.concat({
                    'id': index + 1,
                    'class': 'execs',
                    'method': method,
                });
                _this.countExecs(index + 1, method);
            }
            else {
                _this.execsNumber = index;
                console.log('Success. Avaible executions: ' + _this.execsNumber);
                console.log(_this.execsComparator);
            }
        }, function (error) { return console.log(error); });
    };
    ComparisonComponent.prototype.deleteExec = function (execs, exec) {
        var index = 0;
        for (var _i = 0, execs_1 = execs; _i < execs_1.length; _i++) {
            var execution = execs_1[_i];
            if (execution.id === exec.id) {
                execs.splice(index, 1);
                break;
            }
            index += 1;
        }
    };
    ComparisonComponent.prototype.cleanString = function (line, init, end) {
        if (line.indexOf(init) !== -1 && line.indexOf(end) !== -1) {
            var SP = line.indexOf(init) + init.length;
            var string1 = line.substr(0, SP);
            var string2 = line.substr(SP);
            var TP = string1.length + string2.indexOf(end);
            console.log(line.substring(SP, TP));
            return line.substring(SP, TP);
        }
    };
    ComparisonComponent.prototype.initInfo = function (value) {
        var _this = this;
        this.elasticsearchService.get(1, 1000, '1', false).subscribe(function (data1) {
            console.log('Loading test names...');
            _this.methods = [];
            var logs = [];
            logs = logs.concat(data1);
            for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                var log = logs_1[_i];
                var args = log.formatted_message.split(' ');
                if ((_this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
                    _this.methods = _this.methods.concat({
                        'icon': 'event_note',
                        'title': args[1],
                        'class': 'no-active'
                    });
                }
            }
            console.log('Test names added.');
        }, function (error) { return console.log(error); });
    };
    ComparisonComponent.prototype.isSelectedAnyElement = function (execs) {
        for (var _i = 0, execs_2 = execs; _i < execs_2.length; _i++) {
            var exec = execs_2[_i];
            if (exec.class === 'active') {
                return true;
            }
        }
        return false;
    };
    ComparisonComponent.prototype.loadInfo = function (exec, type, method) {
        var _this = this;
        this.elasticsearchService.get(2, 1000, exec, false, method).subscribe(function (data) {
            var aux = [];
            aux = aux.concat(data);
            switch (type) {
                case 0:
                    _this.comparatorText = '';
                    for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
                        var dat = aux_1[_i];
                        _this.comparatorText += dat.entire_log + '\n';
                    }
                    break;
                case 1:
                    _this.comparedText = '';
                    for (var _a = 0, aux_2 = aux; _a < aux_2.length; _a++) {
                        var dat = aux_2[_a];
                        _this.comparedText += dat.entire_log + '\n';
                    }
                    break;
            }
        }, function (error) { return console.log(error); });
    };
    ComparisonComponent.prototype.deselect = function () {
        for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
            var method = _a[_i];
            method.class = 'no-active';
        }
    };
    return ComparisonComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('process'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], ComparisonComponent.prototype, "process", void 0);
ComparisonComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-comparison',
        template: __webpack_require__("../../../../../src/app/component/comparison/comparison.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/comparison/comparison.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__["a" /* ElasticsearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__["a" /* ElasticsearchService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__covalent_core__["p" /* TdMediaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__covalent_core__["p" /* TdMediaService */]) === "function" && _c || Object])
], ComparisonComponent);

var _a, _b, _c;
//# sourceMappingURL=comparison.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".exec-name {\r\n  border: none;\r\n  font-size: 0.7em;\r\n  letter-spacing: 1px;\r\n  line-height: 24px;\r\n  text-transform: uppercase;\r\n  font-weight: 400;\r\n  margin: 0;\r\n  background: rgba(0,0,0,.32);\r\n  color: hsla(0,0%,100%,.87);\r\n  font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;\r\n}\r\n\r\n.title {\r\n  color: white;\r\n}\r\n\r\n.active {\r\n  color: #BF360C;\r\n}\r\n\r\n.left {\r\n  float: left;\r\n}\r\n\r\n.clickable {\r\n  font-size: 0.9em;\r\n}\r\n\r\n.classname {\r\n  font-size: 0.75em;\r\n}\r\n\r\n.icon {\r\n  position: absolute;\r\n  right: 0px;\r\n}\r\n\r\n.no-margin {\r\n  margin: 0 0px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/home.component.html":
/***/ (function(module, exports) {

module.exports = "<td-layout>\r\n  <td-layout-manage-list #manageList\r\n                         opened=\"true\"\r\n                         mode=\"side\">\r\n    <mat-toolbar td-sidenav-content color=\"accent\">\r\n      <span class=\"cursor-pointer title left\">Logs</span>\r\n      <a mat-icon-button matTooltip=\"Go to comparisons\" class=\"no-margin icon\" [routerLink]=\"['/comparison']\">\r\n        <mat-icon class=\"title\">web</mat-icon>\r\n      </a>\r\n    </mat-toolbar>\r\n    <mat-nav-list td-sidenav-content [tdLayoutManageListClose]=\"!media.query('gt-sm')\">\r\n      <ng-template tdLoading [tdLoadingUntil]=\"loadingNavbar\" tdLoadingStrategy=\"overlay\" tdLoadingType=\"linear\">\r\n        <ng-template let-item let-last=\"last\" ngFor [ngForOf]=\"navmenu\">\r\n          <h3 matSubheader class=\"exec-name\">{{item.title}}</h3>\r\n          <a matTooltip={{item.tip}} mat-list-item (click)=\"loadInfo(0, item.id)\">\r\n            <mat-icon>{{item.icon}}</mat-icon>\r\n            <h3 matLine class=\"clickable\">&nbsp;&nbsp;&nbsp;&nbsp;All</h3>\r\n          </a>\r\n          <ng-template let-elem ngFor [ngForOf]=\"item.classes\">\r\n            <h3 matSubheader class=\"classname\">{{elem.shortname}}</h3>\r\n            <ng-template let-method ngFor [ngForOf]=\"elem.methods\">\r\n              <a matTooltip=\"Show concrete test {{method.name}}\" mat-list-item (click)=\"loadInfo(2, item.id, method.name)\">\r\n                <mat-icon>{{method.icon}}</mat-icon>\r\n                <h3 matLine class=\"clickable\">&nbsp;&nbsp;&nbsp;&nbsp;{{method.name}}</h3>\r\n              </a>\r\n            </ng-template>\r\n          </ng-template>\r\n          <mat-divider matInset *ngIf=\"!last\"></mat-divider>\r\n        </ng-template>\r\n      </ng-template>\r\n    </mat-nav-list>\r\n    <mat-toolbar color=\"accent\">\r\n      <div layout=\"row\" layout-align=\"start center\" flex>\r\n        <button mat-icon-button tdLayoutManageListOpen [hideWhenOpened]=\"true\">\r\n          <mat-icon>arrow_back</mat-icon>\r\n        </button>\r\n        <span class=\"title\">Log</span>\r\n        <span flex></span>\r\n        <a *ngIf=\"mavenMessages; else defMaven\" mat-icon-button matTooltip=\"Show Maven?\" (click)=\"maven()\">\r\n          <mat-icon class=\"icon-maven active\"></mat-icon>\r\n        </a>\r\n        <ng-template #defMaven>\r\n          <a mat-icon-button matTooltip=\"Show Maven?\" (click)=\"maven()\">\r\n            <mat-icon class=\"icon-maven title\"></mat-icon>\r\n          </a>\r\n        </ng-template>\r\n      </div>\r\n    </mat-toolbar>\r\n    <div *ngIf=\"active; else default\">\r\n      <ng-template tdLoading [tdLoadingUntil]=\"loadingData\" tdLoadingStrategy=\"overlay\" tdLoadingType=\"linear\">\r\n        <div tdMediaToggle=\"gt-xs\" [mediaClasses]=\"['push-sm']\">\r\n          <mat-card *ngIf=\"active; else default\">\r\n            <td-data-table\r\n              #dataTable\r\n              [data]=\"dataRowData\"\r\n              [columns]=\"dataColumnDefs\"\r\n              [selectable]=\"false\"\r\n              [multiple]=\"false\"\r\n              [clickable]=\"false\"\r\n              [sortable]=\"true\"\r\n              [sortBy]=\"dataSortBy\"\r\n              [sortOrder]=\"dataSortOrder\"\r\n              (sortChange)=\"sort($event)\"\r\n              [style.width.%]=\"100\">\r\n            </td-data-table>\r\n          </mat-card>\r\n        </div>\r\n      </ng-template>\r\n    </div>\r\n    <ng-template #default>\r\n      <mat-card>\r\n        <mat-card-content>\r\n          <p>Select any execution or test displayed on the left list to see its logs.</p>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </ng-template>\r\n  </td-layout-manage-list>\r\n</td-layout>\r\n"

/***/ }),

/***/ "../../../../../src/app/component/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__covalent_core__ = __webpack_require__("../../../../@covalent/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__ = __webpack_require__("../../../../../src/app/service/elasticsearch.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(elasticsearchService, _dataTableService, ref, media) {
        this.elasticsearchService = elasticsearchService;
        this._dataTableService = _dataTableService;
        this.ref = ref;
        this.media = media;
        this.active = false;
        this.aux = [];
        this.classes = [];
        this.dataColumnDefs = [
            { name: 'id', label: 'id', sortable: true, width: 100 },
            { name: 'timestamp', label: 'timestamp', width: 230 },
            { name: 'thread', label: 'thread', width: 100 },
            { name: 'level', label: 'level', width: 100 },
            { name: 'class', label: 'class', width: 220 },
            { name: 'method', label: 'method', width: 150 },
            { name: 'message', label: 'message', width: 600 }
        ];
        this.dataRowData = [];
        this.dataSortBy = 'id';
        this.dataSortOrder = __WEBPACK_IMPORTED_MODULE_1__covalent_core__["o" /* TdDataTableSortingOrder */].Descending;
        this.filteredTotal = 0;
        this.loadingData = false;
        this.loadingNavbar = false;
        this.logs = [];
        this.mavenMessages = false;
        this.methods = [];
        this.navmenu = [];
        this.searchTerm = '';
        this.countExecs(0);
    }
    HomeComponent.prototype.maven = function () {
        this.mavenMessages = !this.mavenMessages;
        console.log('Show Maven messages: ' + this.mavenMessages);
        console.log('Updating data...');
        if (this.isSelected()) {
            this.loadInfo(0, undefined);
        }
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // broadcast to all listener observables when loading the page
        setTimeout(function () {
            _this.media.broadcast();
            _this.ref.detectChanges();
        });
    };
    HomeComponent.prototype.sort = function (sortEvent) {
        this.dataSortBy = sortEvent.name;
        this.dataSortOrder = sortEvent.order;
        this.filter();
    };
    HomeComponent.prototype.cleanWholeNav = function () {
        for (var _i = 0, _a = this.navmenu; _i < _a.length; _i++) {
            var options = _a[_i];
            options.icon = 'check_box_outline_blank';
            for (var _b = 0, _c = options.classes; _b < _c.length; _b++) {
                var classI = _c[_b];
                for (var _d = 0, _e = classI.methods; _d < _e.length; _d++) {
                    var method = _e[_d];
                    method.icon = 'check_box_outline_blank';
                }
            }
        }
    };
    HomeComponent.prototype.countExecs = function (index) {
        var _this = this;
        this.elasticsearchService.count(2, (index + 1).toString()).subscribe(function (count) {
            if (count !== 0) {
                _this.countExecs(index + 1);
            }
            else {
                _this.createNav(index);
            }
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.createNav = function (index) {
        var id;
        for (var i = 0; i < index; i++) {
            id = i + 1;
            this.navmenu = this.navmenu.concat({
                'id': id,
                'icon': 'check_box_outline_blank',
                'title': 'Exec ' + id.toString(),
                'tip': 'Display exec no ' + id.toString(),
                'classes': []
            });
            this.loadNavbarInfo(id, i);
        }
    };
    HomeComponent.prototype.filter = function () {
        var newData = this.dataRowData;
        this.dataRowData = [];
        newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.dataSortBy, this.dataSortOrder);
        for (var _i = 0, newData_1 = newData; _i < newData_1.length; _i++) {
            var log = newData_1[_i];
            this.dataRowData = this.dataRowData.concat(log);
        }
        this.ref.detectChanges();
    };
    HomeComponent.prototype.isSelected = function () {
        for (var _i = 0, _a = this.navmenu; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.icon === 'check_box') {
                return true;
            }
        }
        return false;
    };
    HomeComponent.prototype.loadNavbarInfo = function (value, index) {
        var _this = this;
        this.elasticsearchService.get(3, 73, value, false).subscribe(function (data) {
            console.log('Loading execution number ' + value + ' classes...');
            _this.aux = [];
            _this.aux = _this.aux.concat(data);
            var id = 0;
            for (var _i = 0, _a = _this.aux; _i < _a.length; _i++) {
                var classInd = _a[_i];
                if (classInd.formatted_message.split(' ').length !== 2) {
                    continue;
                }
                var msg = classInd.formatted_message;
                _this.navmenu[index].classes = _this.navmenu[index].classes.concat({
                    'name': msg.split(' ')[1],
                    'shortname': msg.split(' ')[1].split('.')[msg.split(' ')[1].split('.').length - 1],
                    'methods': []
                });
                id += 1;
            }
            console.log('Classes of execution ' + value + ' displayed.');
            _this.elasticsearchService.get(1, 1000, value, false).subscribe(function (data1) {
                console.log('Loading test names of each execution ' + value + ' class...');
                _this.methods = [];
                var logs = [];
                logs = logs.concat(data1);
                for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                    var log = logs_1[_i];
                    var args = log.formatted_message.split(' ');
                    if ((_this.methods.indexOf(args[1]) === -1) && (args[2] === 'method')) {
                        _this.methods = _this.methods.concat(args[1]);
                    }
                }
                console.log('Names loaded. Adding each method to its class...');
                var _loop_1 = function (logger) {
                    var _loop_2 = function (method) {
                        _this.elasticsearchService.count(3, value, method.replace('(', '').replace(')', ''), logger.name).subscribe(function (data2) {
                            if (data2 !== 0) {
                                logger.methods = logger.methods.concat({
                                    'name': method,
                                    'icon': 'check_box_outline_blank'
                                });
                            }
                        });
                    };
                    for (var _i = 0, _a = _this.methods; _i < _a.length; _i++) {
                        var method = _a[_i];
                        _loop_2(method);
                    }
                };
                for (var _a = 0, _b = _this.navmenu[index].classes; _a < _b.length; _a++) {
                    var logger = _b[_a];
                    _loop_1(logger);
                }
                console.log('Test names added.');
                _this.loadingNavbar = true;
            }, function (error) { return console.log(error); });
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.loadInfo = function (code, value, method) {
        var _this = this;
        console.log('Sending request to your Elasticsearch instance...');
        var meth = method;
        if (value) {
            this.idSelected = +value;
            if (method) {
                this.updateIcon(value, method);
                meth = method.replace('(', '').replace(')', '');
            }
            else {
                this.updateIcon(value);
            }
            this.active = true;
        }
        this.elasticsearchService.get(code, 1000, this.idSelected.toString(), this.mavenMessages, meth).subscribe(function (data) {
            console.log('Response received. Parsing data...');
            _this.logs = [];
            _this.logs = _this.logs.concat(data);
            _this.dataRowData = [];
            for (var _i = 0, _a = _this.logs; _i < _a.length; _i++) {
                var log = _a[_i];
                _this.dataRowData = _this.dataRowData.concat({
                    'id': (+log.id),
                    'timestamp': log.timestamp,
                    'thread': log.thread_name,
                    'level': log.level,
                    'class': (log.logger_name.split('.')[log.logger_name.split('.').length - 1]),
                    'method': log.method,
                    'message': log.formatted_message
                });
            }
            console.log('Data parsed and displayed.');
            _this.loadingData = true;
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.updateIcon = function (id, method) {
        this.cleanWholeNav();
        for (var _i = 0, _a = this.navmenu; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.id === id) {
                if (method !== undefined) {
                    for (var _b = 0, _c = option.classes; _b < _c.length; _b++) {
                        var classI = _c[_b];
                        for (var _d = 0, _e = classI.methods; _d < _e.length; _d++) {
                            var meth = _e[_d];
                            if (meth.name === method) {
                                meth.icon = 'check_box';
                            }
                        }
                    }
                }
                else {
                    option.icon = 'check_box';
                }
            }
        }
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/component/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__["a" /* ElasticsearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_elasticsearch_service__["a" /* ElasticsearchService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__covalent_core__["n" /* TdDataTableService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__covalent_core__["n" /* TdDataTableService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__covalent_core__["p" /* TdMediaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__covalent_core__["p" /* TdMediaService */]) === "function" && _d || Object])
], HomeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/service/elasticsearch.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElasticsearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ElasticsearchService = (function () {
    function ElasticsearchService(http) {
        this.http = http;
        this.baseURL = 'http://localhost:9200/loganalyzer/';
        this.searchURL = this.baseURL + '_search';
        this.countURL = this.baseURL + '_count';
    }
    ElasticsearchService.prototype.count = function (type, value, method, logger) {
        var getURL = this.countURL;
        switch (type) {
            case 0:
                break;
            case 1:
                getURL += '?q=thread_name:main';
                break;
            case 2:
                if (+value < 10) {
                    value = '0' + value;
                }
                getURL += '?q=test_no:' + value;
                break;
            case 3:
                if (+value < 10) {
                    value = '0' + value;
                }
                var body = {
                    query: {
                        query_string: {
                            query: '(method:' + method + '*) AND (test_no:' + value + ') AND (logger_name:' + logger + ')'
                        }
                    }
                };
                var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                return this.http.post(getURL, JSON.stringify(body), { headers: headers })
                    .map(function (response) { return response.json().count; })
                    .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Fail trying to count all Elasticsearch logs.'); });
        }
        return this.http.get(getURL)
            .map(function (response) { return response.json().count; })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Fail trying to count all Elasticsearch logs.'); });
    };
    ElasticsearchService.prototype.get = function (type, size, value, maven, method) {
        var values1 = '&size=' + size;
        var values2 = '&from=0';
        var getURL = this.searchURL + '?pretty&sort=id' + values1 + values2;
        if (+value < 10) {
            value = '0' + value;
        }
        var body;
        if (maven && !method) {
            body = {
                query: {
                    query_string: {
                        query: '(test_no:' + value + ')'
                    }
                }
            };
        }
        else {
            switch (type) {
                case 0:
                    body = {
                        query: {
                            query_string: {
                                query: '(thread_name:main) AND (test_no:' + value + ')'
                            }
                        }
                    };
                    break;
                case 1:
                    body = {
                        query: {
                            query_string: {
                                query: '(formatted_message:Starting) AND (test_no:' + value + ')'
                            }
                        }
                    };
                    break;
                case 2:
                    body = {
                        query: {
                            query_string: {
                                query: '(method:' + method + '*) AND (test_no:' + value + ')'
                            }
                        }
                    };
                    break;
                case 3:
                    body = {
                        query: {
                            query_string: {
                                query: '(formatted_message:Running) AND (test_no:' + value + ')'
                            }
                        }
                    };
                    break;
            }
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(getURL, JSON.stringify(body), { headers: headers })
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (answer) {
            var result;
            result = [];
            if (answer) {
                answer.hits.hits.forEach(function (log) {
                    result.push(log._source);
                });
            }
            return result;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Fail trying to get some logs from your Elasticsearch instance.'); });
    };
    return ElasticsearchService;
}());
ElasticsearchService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ElasticsearchService);

var _a;
//# sourceMappingURL=elasticsearch.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
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
    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
];
var MATERIAL_MODULES = [
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatAutocompleteModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatButtonToggleModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCardModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatChipsModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatDatepickerModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatDialogModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatExpansionModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatFormFieldModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatGridListModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatIconModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatInputModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatListModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatMenuModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["y" /* MatPaginatorModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatProgressBarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["A" /* MatProgressSpinnerModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatPseudoCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatRadioModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatSelectModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["G" /* MatSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["I" /* MatSliderModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["H" /* MatSlideToggleModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["J" /* MatSnackBarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["K" /* MatSortModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["M" /* MatTableModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["N" /* MatTabsModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["O" /* MatToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["P" /* MatTooltipModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["L" /* MatStepperModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatNativeDateModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["D" /* MatRippleModule */],
    __WEBPACK_IMPORTED_MODULE_5__angular_material__["Q" /* NoConflictStyleCompatibilityMode */]
];
var COVALENT_MODULES = [
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["a" /* CovalentCommonModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["b" /* CovalentDataTableModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["c" /* CovalentDialogsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["e" /* CovalentLayoutModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["f" /* CovalentLoadingModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["g" /* CovalentMediaModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["h" /* CovalentMenuModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["i" /* CovalentNotificationsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["j" /* CovalentPagingModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["k" /* CovalentSearchModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["l" /* CovalentStepsModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["m" /* CovalentVirtualScrollModule */],
    __WEBPACK_IMPORTED_MODULE_4__covalent_core__["d" /* CovalentExpansionPanelModule */]
];
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
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

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/config/interceptor/request.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RequestInterceptor = (function () {
    function RequestInterceptor() {
    }
    RequestInterceptor.prototype.onRequest = function (requestOptions) {
        // you add headers or do something before a request here.
        return requestOptions;
    };
    return RequestInterceptor;
}());
RequestInterceptor = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], RequestInterceptor);

//# sourceMappingURL=request.interceptor.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map