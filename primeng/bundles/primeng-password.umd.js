(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/password', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.password = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Password = /** @class */ (function () {
        function Password(el, zone) {
            this.el = el;
            this.zone = zone;
            this.promptLabel = 'Enter a password';
            this.weakLabel = 'Weak';
            this.mediumLabel = 'Medium';
            this.strongLabel = 'Strong';
            this.feedback = true;
        }
        Object.defineProperty(Password.prototype, "showPassword", {
            set: function (show) {
                this.el.nativeElement.type = show ? 'text' : 'password';
            },
            enumerable: true,
            configurable: true
        });
        Password.prototype.ngDoCheck = function () {
            this.updateFilledState();
        };
        //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
        Password.prototype.onInput = function (e) {
            this.updateFilledState();
        };
        Password.prototype.updateFilledState = function () {
            this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
        };
        Password.prototype.createPanel = function () {
            this.panel = document.createElement('div');
            this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all';
            this.meter = document.createElement('div');
            this.meter.className = 'ui-password-meter';
            this.info = document.createElement('div');
            this.info.className = 'ui-password-info';
            this.info.textContent = this.promptLabel;
            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            this.panel.style.minWidth = dom.DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
            document.body.appendChild(this.panel);
        };
        Password.prototype.onFocus = function (e) {
            var _this = this;
            if (this.feedback) {
                if (!this.panel) {
                    this.createPanel();
                }
                this.panel.style.zIndex = String(++dom.DomHandler.zindex);
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        dom.DomHandler.addClass(_this.panel, 'ui-password-panel-visible');
                        dom.DomHandler.removeClass(_this.panel, 'ui-password-panel-hidden');
                    }, 1);
                    dom.DomHandler.absolutePosition(_this.panel, _this.el.nativeElement);
                });
            }
        };
        Password.prototype.onBlur = function (e) {
            var _this = this;
            if (this.feedback) {
                dom.DomHandler.addClass(this.panel, 'ui-password-panel-hidden');
                dom.DomHandler.removeClass(this.panel, 'ui-password-panel-visible');
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.ngOnDestroy();
                    }, 150);
                });
            }
        };
        Password.prototype.onKeyup = function (e) {
            if (this.feedback) {
                var value = e.target.value, label = null, meterPos = null;
                if (value.length === 0) {
                    label = this.promptLabel;
                    meterPos = '0px 0px';
                }
                else {
                    var score = this.testStrength(value);
                    if (score < 30) {
                        label = this.weakLabel;
                        meterPos = '0px -10px';
                    }
                    else if (score >= 30 && score < 80) {
                        label = this.mediumLabel;
                        meterPos = '0px -20px';
                    }
                    else if (score >= 80) {
                        label = this.strongLabel;
                        meterPos = '0px -30px';
                    }
                }
                this.meter.style.backgroundPosition = meterPos;
                this.info.textContent = label;
            }
        };
        Password.prototype.testStrength = function (str) {
            var grade = 0;
            var val;
            val = str.match('[0-9]');
            grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
            val = str.match('[a-zA-Z]');
            grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
            val = str.match('[!@#$%^&*?_~.,;=]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
            val = str.match('[A-Z]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
            grade *= str.length / 8;
            return grade > 100 ? 100 : grade;
        };
        Password.prototype.normalize = function (x, y) {
            var diff = x - y;
            if (diff <= 0)
                return x / y;
            else
                return 1 + 0.5 * (x / (x + y / 4));
        };
        Object.defineProperty(Password.prototype, "disabled", {
            get: function () {
                return this.el.nativeElement.disabled;
            },
            enumerable: true,
            configurable: true
        });
        Password.prototype.ngOnDestroy = function () {
            if (this.panel) {
                document.body.removeChild(this.panel);
                this.panel = null;
                this.meter = null;
                this.info = null;
            }
        };
        Password.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], Password.prototype, "promptLabel", void 0);
        __decorate([
            core.Input()
        ], Password.prototype, "weakLabel", void 0);
        __decorate([
            core.Input()
        ], Password.prototype, "mediumLabel", void 0);
        __decorate([
            core.Input()
        ], Password.prototype, "strongLabel", void 0);
        __decorate([
            core.Input()
        ], Password.prototype, "feedback", void 0);
        __decorate([
            core.Input()
        ], Password.prototype, "showPassword", null);
        __decorate([
            core.HostListener('input', ['$event'])
        ], Password.prototype, "onInput", null);
        __decorate([
            core.HostListener('focus', ['$event'])
        ], Password.prototype, "onFocus", null);
        __decorate([
            core.HostListener('blur', ['$event'])
        ], Password.prototype, "onBlur", null);
        __decorate([
            core.HostListener('keyup', ['$event'])
        ], Password.prototype, "onKeyup", null);
        Password = __decorate([
            core.Directive({
                selector: '[pPassword]',
                host: {
                    '[class.ui-inputtext]': 'true',
                    '[class.ui-corner-all]': 'true',
                    '[class.ui-state-default]': 'true',
                    '[class.ui-widget]': 'true',
                    '[class.ui-state-filled]': 'filled'
                }
            })
        ], Password);
        return Password;
    }());
    var PasswordModule = /** @class */ (function () {
        function PasswordModule() {
        }
        PasswordModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Password],
                declarations: [Password]
            })
        ], PasswordModule);
        return PasswordModule;
    }());

    exports.Password = Password;
    exports.PasswordModule = PasswordModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-password.umd.js.map
