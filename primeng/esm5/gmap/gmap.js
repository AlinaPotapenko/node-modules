var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, AfterViewChecked, DoCheck, Input, Output, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
var GMap = /** @class */ (function () {
    function GMap(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDblClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.onMapDragEnd = new EventEmitter();
        this.onZoomChanged = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    GMap.prototype.ngAfterViewChecked = function () {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    GMap.prototype.initialize = function () {
        var e_1, _a;
        var _this = this;
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            try {
                for (var _b = __values(this.overlays), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var overlay = _c.value;
                    overlay.setMap(this.map);
                    this.bindOverlayEvents(overlay);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.map.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', function (event) {
            _this.zone.run(function () {
                _this.onZoomChanged.emit(event);
            });
        });
    };
    GMap.prototype.bindOverlayEvents = function (overlay) {
        var _this = this;
        overlay.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dblclick', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    };
    GMap.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem(function (record) {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });
            changes.forEachAddedItem(function (record) {
                record.item.setMap(_this.map);
                record.item.addListener('click', function (event) {
                    _this.zone.run(function () {
                        _this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: _this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    _this.bindDragEvents(record.item);
                }
            });
        }
    };
    GMap.prototype.bindDragEvents = function (overlay) {
        var _this = this;
        overlay.addListener('dragstart', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('drag', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
    };
    GMap.prototype.getMap = function () {
        return this.map;
    };
    GMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], GMap.prototype, "style", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "options", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "overlays", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDblClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragStart", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDrag", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapReady", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onZoomChanged", void 0);
    GMap = __decorate([
        Component({
            selector: 'p-gmap',
            template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"></div>"
        })
    ], GMap);
    return GMap;
}());
export { GMap };
var GMapModule = /** @class */ (function () {
    function GMapModule() {
    }
    GMapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [GMap],
            declarations: [GMap]
        })
    ], GMapModule);
    return GMapModule;
}());
export { GMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZ21hcC8iLCJzb3VyY2VzIjpbImdtYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBUTdDO0lBZ0NJLGNBQW1CLEVBQWMsRUFBQyxPQUF3QixFQUFTLEVBQXFCLEVBQVMsSUFBVztRQUF6RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQWtDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTztRQXRCbEcsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsdUJBQWtCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0Qsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzVELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGlDQUFrQixH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LEVBQUU7NENBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO3lDQUFjO0lBRWI7UUFBUixLQUFLLEVBQUU7MENBQWlCO0lBRWY7UUFBVCxNQUFNLEVBQUU7NENBQW9EO0lBRW5EO1FBQVQsTUFBTSxFQUFFO2dEQUF3RDtJQUV2RDtRQUFULE1BQU0sRUFBRTttREFBMkQ7SUFFMUQ7UUFBVCxNQUFNLEVBQUU7b0RBQTREO0lBRTNEO1FBQVQsTUFBTSxFQUFFOytDQUF1RDtJQUV0RDtRQUFULE1BQU0sRUFBRTtrREFBMEQ7SUFFekQ7UUFBVCxNQUFNLEVBQUU7NENBQW9EO0lBRW5EO1FBQVQsTUFBTSxFQUFFOzhDQUFzRDtJQUVyRDtRQUFULE1BQU0sRUFBRTsrQ0FBdUQ7SUExQnZELElBQUk7UUFKaEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLHdEQUFvRDtTQUNqRSxDQUFDO09BQ1csSUFBSSxDQW1LaEI7SUFBRCxXQUFDO0NBQUEsQUFuS0QsSUFtS0M7U0FuS1ksSUFBSTtBQTBLakI7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQUx0QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2YsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ3ZCLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxEb0NoZWNrLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsSXRlcmFibGVEaWZmZXJzLENoYW5nZURldGVjdG9yUmVmLE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nbWFwJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgR01hcCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsRG9DaGVjayB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIG92ZXJsYXlzOiBhbnlbXTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25NYXBDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk92ZXJsYXlEYmxDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheURyYWdTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheURyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbk92ZXJsYXlEcmFnRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25NYXBSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25NYXBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgIFxuICAgIEBPdXRwdXQoKSBvblpvb21DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGRpZmZlcjogYW55O1xuICAgIFxuICAgIG1hcDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIHpvbmU6Tmdab25lKSB7XG4gICAgICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYoIXRoaXMubWFwICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMub25NYXBSZWFkeS5lbWl0KHtcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm92ZXJsYXlzKSB7XG4gICAgICAgICAgICBmb3IobGV0IG92ZXJsYXkgb2YgdGhpcy5vdmVybGF5cykge1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRPdmVybGF5RXZlbnRzKG92ZXJsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25NYXBDbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignZHJhZ2VuZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1hcERyYWdFbmQuZW1pdChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ3pvb21fY2hhbmdlZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblpvb21DaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBiaW5kT3ZlcmxheUV2ZW50cyhvdmVybGF5OiBhbnkpIHtcbiAgICAgICAgb3ZlcmxheS5hZGRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmxheSc6IG92ZXJsYXksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGF5LmFkZExpc3RlbmVyKCdkYmxjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlEYmxDbGljay5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdvdmVybGF5Jzogb3ZlcmxheSxcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYob3ZlcmxheS5nZXREcmFnZ2FibGUoKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ0V2ZW50cyhvdmVybGF5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLm92ZXJsYXlzKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoYW5nZXMgJiYgdGhpcy5tYXApIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5jbGVhckluc3RhbmNlTGlzdGVuZXJzKHJlY29yZC5pdGVtKTtcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS5zZXRNYXAodGhpcy5tYXApO1xuICAgICAgICAgICAgICAgIHJlY29yZC5pdGVtLmFkZExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogcmVjb3JkLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHJlY29yZC5pdGVtLmdldERyYWdnYWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERyYWdFdmVudHMocmVjb3JkLml0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGJpbmREcmFnRXZlbnRzKG92ZXJsYXkpIHtcbiAgICAgICAgb3ZlcmxheS5hZGRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheURyYWdTdGFydC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIG92ZXJsYXkuYWRkTGlzdGVuZXIoJ2RyYWcnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5RHJhZy5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIG92ZXJsYXkuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5RHJhZ0VuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXA7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtHTWFwXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtHTWFwXVxufSlcbmV4cG9ydCBjbGFzcyBHTWFwTW9kdWxlIHsgfSJdfQ==