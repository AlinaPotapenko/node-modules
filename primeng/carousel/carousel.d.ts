import { ElementRef, AfterContentInit, TemplateRef, QueryList, NgZone, EventEmitter } from '@angular/core';
export declare class Carousel implements AfterContentInit {
    el: ElementRef;
    zone: NgZone;
    page: number;
    numVisible: number;
    numScroll: number;
    responsiveOptions: any[];
    orientation: string;
    verticalViewPortHeight: string;
    contentClass: String;
    dotsContainerClass: String;
    value: any[];
    circular: boolean;
    autoplayInterval: number;
    style: any;
    styleClass: string;
    onPage: EventEmitter<any>;
    itemsContainer: ElementRef;
    headerFacet: any;
    footerFacet: any;
    templates: QueryList<any>;
    _numVisible: number;
    _numScroll: number;
    _oldNumScroll: number;
    prevState: any;
    defaultNumScroll: number;
    defaultNumVisible: number;
    _page: number;
    _value: any[];
    carouselStyle: any;
    id: string;
    totalShiftedItems: any;
    isRemainingItemsAdded: boolean;
    animationTimeout: any;
    translateTimeout: any;
    remainingItems: number;
    _items: any[];
    startPos: any;
    documentResizeListener: any;
    clonedItemsForStarting: any[];
    clonedItemsForFinishing: any[];
    allowAutoplay: boolean;
    interval: any;
    isCreated: boolean;
    itemTemplate: TemplateRef<any>;
    constructor(el: ElementRef, zone: NgZone);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    createStyle(): void;
    calculatePosition(): void;
    setCloneItems(): void;
    firstIndex(): number;
    lastIndex(): number;
    totalDots(): number;
    totalDotsArray(): any[];
    containerClass(): {
        'ui-carousel ui-widget': boolean;
        'ui-carousel-vertical': boolean;
        'ui-carousel-horizontal': boolean;
    };
    contentClasses(): string;
    dotsContentClasses(): string;
    isVertical(): boolean;
    isCircular(): boolean;
    isAutoplay(): boolean;
    isForwardNavDisabled(): boolean;
    isBackwardNavDisabled(): boolean;
    isEmpty(): boolean;
    navForward(e: any, index?: any): void;
    navBackward(e: any, index?: any): void;
    onDotClick(e: any, index: any): void;
    step(dir: any, page: any): void;
    startAutoplay(): void;
    stopAutoplay(): void;
    onTransitionEnd(): void;
    onTouchStart(e: any): void;
    onTouchMove(e: any): void;
    onTouchEnd(e: any): void;
    changePageOnTouch(e: any, diff: any): void;
    bindDocumentListeners(): void;
    unbindDocumentListeners(): void;
    ngOnDestroy(): void;
}
export declare class CarouselModule {
}
