"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "displayToggle",

        /**
         * Permite ocultar y mostar un elemento.
         *
         * @param  {Object} element Referencia a elemento del dom.
         * @param  {string} display Permite setear la propiedad display.
         *
         * @return {void}
         */
        value: function displayToggle(element) {
            var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            var ELEMENT = element;
            var auxDisplay = display;

            if (display !== "") {
                var DISPLAY = ELEMENT.style.display || "block";
                auxDisplay = DISPLAY === "block" ? "none" : "";
            }
            ELEMENT.style.display = auxDisplay;
        }

        /**
         * Valida si un key existe dentro de un object.
         *
         * @param  {object} data Objeto en el que se realizara el test.
         * @param  {string} keys Llaves a buscar.
         * @param {any} requestDefault respuesta por defecto.
         *
         * @return {any}.
         */

    }, {
        key: "existFields",
        value: function existFields(data, keys) {
            var requestDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

            var KEYS = keys.split(".");
            var objectTest = data;
            // funcion especial
            var VALIDATE = function VALIDATE() {
                return KEYS.every(function (key) {
                    var REQUEST = typeof objectTest[key] !== "undefined";
                    objectTest = objectTest[key];
                    return REQUEST;
                });
            };
            return VALIDATE() ? objectTest : requestDefault;
        }

        /**
         * Permite identificar el tipo de dispositivo.
         *
         * @type {string}
         */

    }, {
        key: "moveToScroll",


        /**
         * Permite realizar el movimiento del scroll.
         *
         * @param  {number} pixels Numero de pixeles a desplazar.
         * @param  {Boolean} isAdd (Optiona) indica si los piexeles se agregan a la
         *                                   cuenta actual.
         *
         * @return void.
         */
        value: function moveToScroll(pixels) {
            var isAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var contentItem = this.configSlide.contentItem;

            if (isAdd) {
                contentItem.scrollLeft += pixels;
            } else {
                contentItem.scrollLeft = pixels;
            }
        }
    }, {
        key: "isMobile",
        get: function get() {
            var DEVICE = typeof navigator !== "undefined" ? navigator.userAgent.match(/iPhone|iPad|iPod|Android/i) : "desktop";
            var WIDTH_SCREEN = typeof window !== "undefined" ? window.innerWidth : "1024";
            var request = "desktop";

            if (DEVICE != null) {
                if (WIDTH_SCREEN <= 768) {
                    request = "phone";
                } else if (WIDTH_SCREEN > 768 && WIDTH_SCREEN <= 1024) {
                    request = "tablet";
                }
            }
            return request;
        }
    }]);

    return Utils;
}();

exports.default = Utils;