import { EventEmitter } from '@angular/core';
export declare class InplaceDisplay {
}
export declare class InplaceContent {
}
export declare class Inplace {
    active: boolean;
    closable: boolean;
    disabled: boolean;
    style: any;
    styleClass: string;
    onActivate: EventEmitter<any>;
    onDeactivate: EventEmitter<any>;
    hover: boolean;
    activate(event?: Event): void;
    deactivate(event?: Event): void;
}
export declare class InplaceModule {
}
