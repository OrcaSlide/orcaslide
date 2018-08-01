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
        key: "actionButton",

        /**
         * Permite agregar eventos a elementos de la interfaz.
         *
         * @param  {object} button Referencia a elemento del dom.
         * @param  {function} callbacks Funciones a ejecutar.
         * @param  {String} (Optional) Tipo de accion.
         *
         * @return {void}
         */
        value: function actionButton(button) {
            var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var evento = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "click";

            if (button) {
                button.addEventListener(evento, function () {
                    if (typeof callbacks === "function") {
                        callbacks();
                    }
                });
            }
        }

        /**
         * Permite ocultar y mostar un elemento.
         *
         * @param  {Object} element Referencia a elemento del dom.
         * @param  {string} display Permite setear la propiedad display.
         *
         * @return {void}
         */

    }, {
        key: "displayToggle",
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
         * Permite conseguir un elemento del dom identificando si esta vacio o existe.
         * @param  {String} (Optional) Selector referente al elemento del dom.
         *
         * @return {object}.
         */

    }, {
        key: "getElementDom",
        value: function getElementDom() {
            var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            var domElement = null;
            if (selector) {
                domElement = document.querySelector(selector) || domElement;
            }
            return domElement;
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
         * @param  {Boolean} isAdd (Optional) indica si los piexeles se agregan a la cuenta actual.
         *
         * @return void.
         */
        value: function moveToScroll(pixels, contentItem) {
            var isAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var CONTENT = contentItem;
            if (isAdd) {
                CONTENT.scrollLeft += pixels;
            } else {
                CONTENT.scrollLeft = pixels;
            }
        }

        /**
         * Crea la configuracion base para el llamado de callbacks.
         *
         * @param  {array} config Listado de funciones.
         *
         * @return {object}
         */

    }, {
        key: "getCallbacksConfig",
        value: function getCallbacksConfig(config) {
            var CONFIG = {
                callback: function callback() {},
                next: false,
                previus: false
            };

            var CALLBACKS = config.reduce(function (action, item) {
                var KEY = "Slide" + (item.slide - 1);
                var DATA = {};
                var DEFAULT = Object.assign({}, CONFIG);
                Object.assign(DEFAULT, item);
                DATA[KEY] = DEFAULT;
                return Object.assign(action, DATA);
            }, {});

            return CALLBACKS;
        }

        /**
         * Permite conseguir la direccion en la que se reliza el swipe.
         *
         * @param  {object} swipe configuracion base para el swipe.
         * @return {string}
         */

    }, {
        key: "getDirecctionSlide",
        value: function getDirecctionSlide(swipe) {
            var HZR_X1 = swipe.endX - swipe.min_x > swipe.startX;
            var HZR_X2 = swipe.endX + swipe.min_x < swipe.startX;
            var HZR_Y1 = swipe.endY < swipe.startY + swipe.max_y;
            var HZR_Y2 = swipe.startY > swipe.endY - swipe.max_y;

            var VERT_Y1 = swipe.endY - swipe.min_y > swipe.startY;
            var VERT_Y2 = swipe.endY + swipe.min_y < swipe.startY;
            var VERT_X1 = swipe.endX < swipe.startX + swipe.max_x;
            var VERT_X2 = swipe.startX > swipe.endX - swipe.max_x;

            var IS_HORIZONTAL = (HZR_X1 || HZR_X2) && HZR_Y1 && HZR_Y2;
            var IS_VERTICAL = (VERT_Y1 || VERT_Y2) && VERT_X1 && VERT_X2;

            var direction = "";

            if (IS_HORIZONTAL) {
                direction = swipe.endX > swipe.startX ? "right" : "left";
            } else if (IS_VERTICAL) {
                direction = swipe.endY > swipe.startY ? "bottom" : "top";
            }

            return direction;
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