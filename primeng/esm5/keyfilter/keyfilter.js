var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALIDATORS } from '@angular/forms';
export var KEYFILTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return KeyFilter; }),
    multi: true
};
var DEFAULT_MASKS = {
    pint: /[\d]/,
    'int': /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};
var KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};
var SAFARI_KEYS = {
    63234: 37,
    63235: 39,
    63232: 38,
    63233: 40,
    63276: 33,
    63277: 34,
    63272: 46,
    63273: 36,
    63275: 35 // end
};
var KeyFilter = /** @class */ (function () {
    function KeyFilter(el) {
        this.el = el;
        this.ngModelChange = new EventEmitter();
        this.isAndroid = DomHandler.isAndroid();
    }
    Object.defineProperty(KeyFilter.prototype, "pattern", {
        get: function () {
            return this._pattern;
        },
        set: function (_pattern) {
            this._pattern = _pattern;
            this.regex = DEFAULT_MASKS[this._pattern] || this._pattern;
        },
        enumerable: true,
        configurable: true
    });
    KeyFilter.prototype.isNavKeyPress = function (e) {
        var k = e.keyCode;
        k = DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    };
    ;
    KeyFilter.prototype.isSpecialKey = function (e) {
        var k = e.keyCode;
        var c = e.charCode;
        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 || (k >= 18 && k <= 20) ||
            (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    };
    KeyFilter.prototype.getKey = function (e) {
        var k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
    };
    KeyFilter.prototype.getCharCode = function (e) {
        return e.charCode || e.keyCode || e.which;
    };
    KeyFilter.prototype.findDelta = function (value, prevValue) {
        var delta = '';
        for (var i = 0; i < value.length; i++) {
            var str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);
            if (str === prevValue)
                delta = value.substr(i, value.length - prevValue.length);
        }
        return delta;
    };
    KeyFilter.prototype.isValidChar = function (c) {
        return this.regex.test(c);
    };
    KeyFilter.prototype.isValidString = function (str) {
        for (var i = 0; i < str.length; i++) {
            if (!this.isValidChar(str.substr(i, 1))) {
                return false;
            }
        }
        return true;
    };
    KeyFilter.prototype.onInput = function (e) {
        if (this.isAndroid && !this.pValidateOnly) {
            var val = this.el.nativeElement.value;
            var lastVal = this.lastValue || '';
            var inserted = this.findDelta(val, lastVal);
            var removed = this.findDelta(lastVal, val);
            var pasted = inserted.length > 1 || (!inserted && !removed);
            if (pasted) {
                if (!this.isValidString(val)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            else if (!removed) {
                if (!this.isValidChar(inserted)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            val = this.el.nativeElement.value;
            if (this.isValidString(val)) {
                this.lastValue = val;
            }
        }
    };
    KeyFilter.prototype.onKeyPress = function (e) {
        if (this.isAndroid || this.pValidateOnly) {
            return;
        }
        var browser = DomHandler.getBrowser();
        if (e.ctrlKey || e.altKey) {
            return;
        }
        var k = this.getKey(e);
        if (k == 13) {
            return;
        }
        if (browser.mozilla && (this.isNavKeyPress(e) || k == KEYS.BACKSPACE || (k == KEYS.DELETE && e.charCode == 0))) {
            return;
        }
        var c = this.getCharCode(e);
        var cc = String.fromCharCode(c);
        var ok = true;
        if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }
        ok = this.regex.test(cc);
        if (!ok) {
            e.preventDefault();
        }
    };
    KeyFilter.prototype.onPaste = function (e) {
        var clipboardData = e.clipboardData || window.clipboardData.getData('text');
        if (clipboardData) {
            var pastedText = clipboardData.getData('text');
            if (!this.regex.test(pastedText)) {
                e.preventDefault();
            }
        }
    };
    KeyFilter.prototype.validate = function (c) {
        if (this.pValidateOnly) {
            var value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    };
    KeyFilter.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], KeyFilter.prototype, "pValidateOnly", void 0);
    __decorate([
        Output()
    ], KeyFilter.prototype, "ngModelChange", void 0);
    __decorate([
        Input('pKeyFilter')
    ], KeyFilter.prototype, "pattern", null);
    __decorate([
        HostListener('input', ['$event'])
    ], KeyFilter.prototype, "onInput", null);
    __decorate([
        HostListener('keypress', ['$event'])
    ], KeyFilter.prototype, "onKeyPress", null);
    __decorate([
        HostListener('paste', ['$event'])
    ], KeyFilter.prototype, "onPaste", null);
    KeyFilter = __decorate([
        Directive({
            selector: '[pKeyFilter]',
            providers: [KEYFILTER_VALIDATOR]
        })
    ], KeyFilter);
    return KeyFilter;
}());
export { KeyFilter };
var KeyFilterModule = /** @class */ (function () {
    function KeyFilterModule() {
    }
    KeyFilterModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [KeyFilter],
            declarations: [KeyFilter]
        })
    ], KeyFilterModule);
    return KeyFilterModule;
}());
export { KeyFilterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9rZXlmaWx0ZXIvIiwic291cmNlcyI6WyJrZXlmaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBUTtJQUNwQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO0lBQ3hDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLFFBQVE7SUFDZixJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEdBQUcsRUFBRSxVQUFVO0lBQ2YsR0FBRyxFQUFFLFdBQVc7SUFDaEIsS0FBSyxFQUFFLGlCQUFpQjtJQUN4QixLQUFLLEVBQUUsU0FBUztJQUNoQixRQUFRLEVBQUUsWUFBWTtDQUN6QixDQUFDO0FBRUYsSUFBTSxJQUFJLEdBQUc7SUFDVCxHQUFHLEVBQUUsQ0FBQztJQUNOLE1BQU0sRUFBRSxFQUFFO0lBQ1YsR0FBRyxFQUFFLEVBQUU7SUFDUCxTQUFTLEVBQUUsQ0FBQztJQUNaLE1BQU0sRUFBRSxFQUFFO0NBQ2IsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHO0lBQ2hCLEtBQUssRUFBRSxFQUFFO0lB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QjtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQUwzQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUM1QixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBLRVlGSUxURVJfVkFMSURBVE9SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBLZXlGaWx0ZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5jb25zdCBERUZBVUxUX01BU0tTID0ge1xuICAgIHBpbnQ6IC9bXFxkXS8sXG4gICAgJ2ludCc6IC9bXFxkXFwtXS8sXG4gICAgcG51bTogL1tcXGRcXC5dLyxcbiAgICBtb25leTogL1tcXGRcXC5cXHMsXS8sXG4gICAgbnVtOiAvW1xcZFxcLVxcLl0vLFxuICAgIGhleDogL1swLTlhLWZdL2ksXG4gICAgZW1haWw6IC9bYS16MC05X1xcLlxcLUBdL2ksXG4gICAgYWxwaGE6IC9bYS16X10vaSxcbiAgICBhbHBoYW51bTogL1thLXowLTlfXS9pXG59O1xuXG5jb25zdCBLRVlTID0ge1xuICAgIFRBQjogOSxcbiAgICBSRVRVUk46IDEzLFxuICAgIEVTQzogMjcsXG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIERFTEVURTogNDZcbn07XG5cbmNvbnN0IFNBRkFSSV9LRVlTID0ge1xuICAgIDYzMjM0OiAzNywgLy8gbGVmdFxuICAgIDYzMjM1OiAzOSwgLy8gcmlnaHRcbiAgICA2MzIzMjogMzgsIC8vIHVwXG4gICAgNjMyMzM6IDQwLCAvLyBkb3duXG4gICAgNjMyNzY6IDMzLCAvLyBwYWdlIHVwXG4gICAgNjMyNzc6IDM0LCAvLyBwYWdlIGRvd25cbiAgICA2MzI3MjogNDYsIC8vIGRlbGV0ZVxuICAgIDYzMjczOiAzNiwgLy8gaG9tZVxuICAgIDYzMjc1OiAzNSAgLy8gZW5kXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twS2V5RmlsdGVyXScsXG4gICAgcHJvdmlkZXJzOiBbS0VZRklMVEVSX1ZBTElEQVRPUl1cbn0pXG5leHBvcnQgY2xhc3MgS2V5RmlsdGVyIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcblxuICAgIEBJbnB1dCgpIHBWYWxpZGF0ZU9ubHk6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICByZWdleDogUmVnRXhwO1xuXG4gICAgX3BhdHRlcm46IGFueTtcblxuICAgIGlzQW5kcm9pZDogYm9vbGVhbjtcblxuICAgIGxhc3RWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7IFxuICAgICAgICB0aGlzLmlzQW5kcm9pZCA9IERvbUhhbmRsZXIuaXNBbmRyb2lkKCk7XG4gICAgfVxuXG4gICAgZ2V0IHBhdHRlcm4oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XG4gICAgfVxuXG4gICAgQElucHV0KCdwS2V5RmlsdGVyJykgc2V0IHBhdHRlcm4oX3BhdHRlcm46IGFueSkge1xuICAgICAgICB0aGlzLl9wYXR0ZXJuID0gX3BhdHRlcm47XG4gICAgICAgIHRoaXMucmVnZXggPSBERUZBVUxUX01BU0tTW3RoaXMuX3BhdHRlcm5dIHx8IHRoaXMuX3BhdHRlcm47XG4gICAgfVxuXG4gICAgaXNOYXZLZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlO1xuICAgICAgICBrID0gRG9tSGFuZGxlci5nZXRCcm93c2VyKCkuc2FmYXJpID8gKFNBRkFSSV9LRVlTW2tdIHx8IGspIDogaztcblxuICAgICAgICByZXR1cm4gKGsgPj0gMzMgJiYgayA8PSA0MCkgfHwgayA9PSBLRVlTLlJFVFVSTiB8fCBrID09IEtFWVMuVEFCIHx8IGsgPT0gS0VZUy5FU0M7XG4gICAgfTtcblxuICAgIGlzU3BlY2lhbEtleShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlO1xuICAgICAgICBsZXQgYyA9IGUuY2hhckNvZGU7XG5cbiAgICAgICAgcmV0dXJuIGsgPT0gOSB8fCBrID09IDEzIHx8IGsgPT0gMjcgfHwgayA9PSAxNiB8fCBrID09IDE3IHx8KGsgPj0gMTggJiYgayA8PSAyMCkgfHxcbiAgICAgICAgICAgIChEb21IYW5kbGVyLmdldEJyb3dzZXIoKS5vcGVyYSAmJiAhZS5zaGlmdEtleSAmJiAoayA9PSA4IHx8IChrID49IDMzICYmIGsgPD0gMzUpIHx8IChrID49IDM2ICYmIGsgPD0gMzkpIHx8IChrID49IDQ0ICYmIGsgPD0gNDUpKSk7XG4gICAgfVxuXG5cbiAgICBnZXRLZXkoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgayA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRCcm93c2VyKCkuc2FmYXJpID8gKFNBRkFSSV9LRVlTW2tdIHx8IGspIDogaztcbiAgICB9XG5cbiAgICBnZXRDaGFyQ29kZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHJldHVybiBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgIH1cblxuICAgIGZpbmREZWx0YSh2YWx1ZTogc3RyaW5nLCBwcmV2VmFsdWU6IHN0cmluZykgeyBcbiAgICAgICAgbGV0IGRlbHRhID0gJyc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0ciA9IHZhbHVlLnN1YnN0cigwLCBpKSArIHZhbHVlLnN1YnN0cihpICsgdmFsdWUubGVuZ3RoIC0gcHJldlZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdHIgPT09IHByZXZWYWx1ZSkgXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB2YWx1ZS5zdWJzdHIoaSwgdmFsdWUubGVuZ3RoIC0gcHJldlZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgfVxuXG4gICAgaXNWYWxpZENoYXIoYzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2V4LnRlc3QoYyk7XG4gICAgfVxuXG4gICAgaXNWYWxpZFN0cmluZyhzdHI6IHN0cmluZykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRDaGFyKHN0ci5zdWJzdHIoaSwgMSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICAgIG9uSW5wdXQoZTogS2V5Ym9hcmRFdmVudCkgeyBcbiAgICAgICAgaWYgKHRoaXMuaXNBbmRyb2lkICYmICF0aGlzLnBWYWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBsZXQgbGFzdFZhbCA9IHRoaXMubGFzdFZhbHVlIHx8ICcnO1xuXG4gICAgICAgICAgICBsZXQgaW5zZXJ0ZWQgPSB0aGlzLmZpbmREZWx0YSh2YWwsIGxhc3RWYWwpO1xuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSB0aGlzLmZpbmREZWx0YShsYXN0VmFsLCB2YWwpO1xuICAgICAgICAgICAgbGV0IHBhc3RlZCA9IGluc2VydGVkLmxlbmd0aCA+IDEgfHwgKCFpbnNlcnRlZCAmJiAhcmVtb3ZlZCk7XG5cbiAgICAgICAgICAgIGlmIChwYXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFN0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGxhc3RWYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGxhc3RWYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIGlmICghcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkQ2hhcihpbnNlcnRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gbGFzdFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQobGFzdFZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSlcbiAgICBvbktleVByZXNzKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMucFZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYnJvd3NlciA9IERvbUhhbmRsZXIuZ2V0QnJvd3NlcigpO1xuXG4gICAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrID0gdGhpcy5nZXRLZXkoZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoayA9PSAxMykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJyb3dzZXIubW96aWxsYSAmJiAodGhpcy5pc05hdktleVByZXNzKGUpIHx8IGsgPT0gS0VZUy5CQUNLU1BBQ0UgfHwgKGsgPT0gS0VZUy5ERUxFVEUgJiYgZS5jaGFyQ29kZSA9PSAwKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gdGhpcy5nZXRDaGFyQ29kZShlKTtcbiAgICAgICAgbGV0IGNjID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYnJvd3Nlci5tb3ppbGxhICYmICh0aGlzLmlzU3BlY2lhbEtleShlKSB8fCAhY2MpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvayA9IHRoaXMucmVnZXgudGVzdChjYyk7XG5cbiAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigncGFzdGUnLCBbJyRldmVudCddKVxuICAgIG9uUGFzdGUoZSkge1xuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5jbGlwYm9hcmREYXRhIHx8ICg8YW55PndpbmRvdykuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBwYXN0ZWRUZXh0ID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVnZXgudGVzdChwYXN0ZWRUZXh0KSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICBpZih0aGlzLnBWYWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5yZWdleC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUGF0dGVybjogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0tleUZpbHRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbS2V5RmlsdGVyXVxufSlcbmV4cG9ydCBjbGFzcyBLZXlGaWx0ZXJNb2R1bGUgeyB9Il19