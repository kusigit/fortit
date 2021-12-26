"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FwcCard = void 0;
var lit_1 = require("lit");
var custom_element_js_1 = require("lit/decorators/custom-element.js");
var FwcCard = /** @class */ (function (_super) {
    __extends(FwcCard, _super);
    function FwcCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FwcCard.prototype.render = function () {
        return lit_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <slot name=\"header\"></slot>\n      <slot name=\"content\"></slot>\n    "], ["\n      <slot name=\"header\"></slot>\n      <slot name=\"content\"></slot>\n    "])));
    };
    FwcCard.styles = lit_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    :host {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      box-sizing: border-box;\n      background-color: white;\n      border-radius: var(--fwc-border-radius, 4px);\n      box-shadow: var(--box-shadow);\n      overflow: visible;\n      --padding-small: var(--fwc-padding-small, 16px);\n      --padding-medium: var(--fwc-padding-medium, 24px);\n    }\n\n    slot[name='header'] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 12px var(--padding-medium);\n    }\n\n    slot[name='content'] {\n      display: block;\n      padding: 0 var(--padding-medium) 0 var(--padding-medium);\n    }\n\n    .card-action {\n      display: flex;\n      align-items: center;\n      padding: 0px var(--padding-small);\n      height: 56px;\n    }\n  "], ["\n    :host {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      box-sizing: border-box;\n      background-color: white;\n      border-radius: var(--fwc-border-radius, 4px);\n      box-shadow: var(--box-shadow);\n      overflow: visible;\n      --padding-small: var(--fwc-padding-small, 16px);\n      --padding-medium: var(--fwc-padding-medium, 24px);\n    }\n\n    slot[name='header'] {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 12px var(--padding-medium);\n    }\n\n    slot[name='content'] {\n      display: block;\n      padding: 0 var(--padding-medium) 0 var(--padding-medium);\n    }\n\n    .card-action {\n      display: flex;\n      align-items: center;\n      padding: 0px var(--padding-small);\n      height: 56px;\n    }\n  "])));
    FwcCard = __decorate([
        custom_element_js_1.customElement('fwc-card')
    ], FwcCard);
    return FwcCard;
}(lit_1.LitElement));
exports.FwcCard = FwcCard;
var templateObject_1, templateObject_2;
//# sourceMappingURL=fwc-card.js.map