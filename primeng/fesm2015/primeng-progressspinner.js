import { Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProgressSpinner = class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
};
__decorate([
    Input()
], ProgressSpinner.prototype, "style", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "strokeWidth", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "fill", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "animationDuration", void 0);
ProgressSpinner = __decorate([
    Component({
        selector: 'p-progressSpinner',
        template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass">
            <svg class="ui-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="ui-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `
    })
], ProgressSpinner);
let ProgressSpinnerModule = class ProgressSpinnerModule {
};
ProgressSpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressSpinner],
        declarations: [ProgressSpinner]
    })
], ProgressSpinnerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressSpinner, ProgressSpinnerModule };
//# sourceMappingURL=primeng-progressspinner.js.map
