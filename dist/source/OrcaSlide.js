"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrcaSlide = function () {
    function OrcaSlide() {
        _classCallCheck(this, OrcaSlide);
    }

    _createClass(OrcaSlide, null, [{
        key: "animateSlide",

        /**
         * Genera la transicion de los sliders.
         *
         * @param  {Boolean} isNext Optional indica el tipo de accion.
         *
         * @return void.
         */
        value: function animateSlide() {
            var _this = this;

            var isNext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var _configSlide = this.configSlide,
                active = _configSlide.active,
                itemWidth = _configSlide.itemWidth,
                moveTo = _configSlide.moveTo,
                time = _configSlide.time;


            var MOVE_TO = isNext ? moveTo : -moveTo;

            if (active) {
                this.configSlide.position += isNext ? 1 : -1;
                this.configSlide.active = false;
                var counter = 0;
                var TIMER = setInterval(function () {
                    _this.moveToScroll(MOVE_TO);
                    counter += moveTo;
                    if (counter >= itemWidth) {
                        clearInterval(TIMER);
                        var FULL_MOVE_TO = itemWidth * _this.configSlide.position;
                        _this.moveToScroll(FULL_MOVE_TO, false);
                        _this.configSlide.active = true;
                    }
                }, time);
            }
        }

        /**
         * Oculta las flechas.
         *
         * @param {number} element posicion del elemento.
         *
         * @return {void}
         */

    }, {
        key: "displayArrow",
        value: function displayArrow(index) {
            var _configSlide2 = this.configSlide,
                arrowNext = _configSlide2.arrowNext,
                arrowPrevious = _configSlide2.arrowPrevious,
                items = _configSlide2.items;

            var DISPLAY_PREVIUS = index > 0 ? "" : "none";
            var DISPLAY_NEXT = items === index ? "none" : "";
            arrowNext.style.display = DISPLAY_NEXT;
            arrowPrevious.style.display = DISPLAY_PREVIUS;
        }

        /**
         * Permite ocultar y mostar un elemento.
         *
         * @param  {Object} element Referencia a elemento del dom.
         *
         * @return {void}
         */

    }, {
        key: "displayToggle",
        value: function displayToggle(element) {
            var ELEMENT = element;
            var DISPLAY = ELEMENT.style.display || "block";
            ELEMENT.style.display = DISPLAY === "block" ? "none" : "";
        }

        /**
         * Permite realizar el movimiento del scroll.
         *
         * @param  {number} pixels Numero de pixeles a desplazar.
         * @param  {Boolean} isAdd (Optiona) indica si los piexeles se agregan a la
         *                                   cuenta actual.
         *
         * @return void.
         */

    }, {
        key: "moveToScroll",
        value: function moveToScroll(pixels) {
            var isAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var contentItem = this.configSlide.contentItem;

            if (isAdd) {
                contentItem.scrollLeft += pixels;
            } else {
                contentItem.scrollLeft = pixels;
            }
        }

        // ================================================================= //
        //                         Setter and Getter                         //
        // ================================================================= //

        /**
         * Se carga la configuracion inicial.
         *
         * @param {Object} config  configuracion inicial.
         *
         * @return void.
         */

    }, {
        key: "startTouch",
        value: function startTouch() {
            var _this2 = this;

            var DEVICE = this.isMobile;
            var _configSlide3 = this.configSlide,
                contentItem = _configSlide3.contentItem,
                items = _configSlide3.items,
                itemWidth = _configSlide3.itemWidth;
            var position = this.configSlide.position;

            if (DEVICE !== "desktop") {
                var clientX = 0;
                var clientXAuxiliar = 0;
                var endX = 0;
                var startX = 0;
                var X_MAX_AXE = items * itemWidth;
                contentItem.addEventListener("touchstart", function (action) {
                    var SWIPE = action.changedTouches[0];
                    if (startX !== 0) {
                        endX = clientX * -1;
                    }
                    startX = parseInt(SWIPE.clientX, 10);
                });

                contentItem.addEventListener("touchmove", function (action) {
                    var SWIPE = action.changedTouches[0];
                    var swipeX = parseInt(SWIPE.clientX, 10);
                    clientXAuxiliar = (swipeX - startX + endX) * -1;
                    if (clientXAuxiliar < 0) {
                        clientX = 0;
                    } else if (clientXAuxiliar > X_MAX_AXE) {
                        clientX = X_MAX_AXE;
                    } else {
                        clientX = clientXAuxiliar;
                    }
                    _this2.moveToScroll(clientX, false);
                });

                contentItem.addEventListener("touchend", function (action) {
                    var SWIPE = action.changedTouches[0];
                    var swipeX = parseInt(SWIPE.clientX, 10);
                    console.log("position", position);
                    console.log("swipeX", swipeX);
                    console.log("startX", startX);
                    console.log("clientXAuxiliar", clientXAuxiliar);
                    console.log("clientX", clientX);
                    console.log("startX - swipeX", startX - swipeX);
                    var percentage = itemWidth * 20 / 100;
                    console.log("percentage", percentage);
                    var realSwiped = startX - swipeX;
                    var swiped = realSwiped > 0 ? startX - swipeX : (startX - swipeX) * -1;
                    var direction = realSwiped > 0 ? "right" : "left";
                    console.log("direction", direction);
                    if (swiped > percentage) {
                        if (direction === "right" && position < items - 1) {
                            position += 1;
                            _this2.animateSlide(true);
                        } else if (position > 0) {
                            position += -1;
                            _this2.animateSlide(false);
                        }
                    }
                });
            }
        }

        /**
         * Permite manejar la logica de cuando el carousel es infinito.
         *
         * @param {number} index  Posicion actual del slider.
         *
         * @return {void}
         */

    }, {
        key: "config",
        set: function set(config) {
            this.configSlide = {
                arrowNext: "",
                arrowPrevious: "",
                contentItem: "",
                time: 1,
                isInfinite: false,
                position: 0,
                active: false
            };
            Object.assign(this.configSlide, config);
            this.validateConfig.setActionButton.startTouch();
        }
    }, {
        key: "isInfinite",
        set: function set(index) {
            var _configSlide4 = this.configSlide,
                isInfinite = _configSlide4.isInfinite,
                items = _configSlide4.items,
                itemWidth = _configSlide4.itemWidth;

            var RELOAD = (index < 0 || index > items) && index;
            if (isInfinite) {
                var INFINITE = index < 0 || index > items;
                if (INFINITE) {
                    var SCROLL = RELOAD < 0 ? items * itemWidth : 0;
                    this.moveToScroll(SCROLL, false);
                    this.configSlide.position = RELOAD < 0 ? items : 0;
                    this.configSlide.active = true;
                }
            } else {
                this.displayArrow(index);
            }
        }

        /**
         * Permite identificar el tipo de dispositivo.
         *
         * @type {string}
         */

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

        /**
         * Asigna los eventos a las flechas.
         *
         * @return void.
         */

    }, {
        key: "setActionButton",
        get: function get() {
            var _this3 = this;

            var KEYS = ["arrowNext", "arrowPrevious"];
            KEYS.forEach(function (button) {
                var IS_NEXT = button === "arrowNext";
                var BUTTON = _this3.configSlide[button];
                BUTTON.addEventListener("click", function () {
                    var items = _this3.configSlide.items;
                    var position = _this3.configSlide.position;

                    position += IS_NEXT ? 1 : -1;
                    if (position >= 0 && position <= items) {
                        _this3.animateSlide(IS_NEXT);
                        _this3.isInfinite = position;
                    } else if (items < position || position < 0) {
                        _this3.isInfinite = position;
                    }
                });
            });
            return this;
        }

        /**
         * Validacion de la configuracion base.
         *
         * @type {Object} Resive la configuracion base.
         *
         * @return self Fluent interface.
         */

    }, {
        key: "validateConfig",
        get: function get() {
            var _this4 = this;

            var KEYS = ["arrowNext", "arrowPrevious", "contentItem"];

            KEYS.forEach(function (item) {
                var SELECTOR = _this4.configSlide[item];
                var ELEMENT = document.querySelector(SELECTOR);

                if (ELEMENT) {
                    _this4.configSlide[item] = ELEMENT;
                    if (item === "contentItem") {
                        var ITEM = ELEMENT.children[0] || {};
                        var ITEM_WIDTH = ITEM.offsetWidth || 0;
                        var NEW_CONFIG = {
                            items: ELEMENT.children.length - 1,
                            itemWidth: ITEM_WIDTH,
                            moveTo: Math.ceil(ITEM_WIDTH / 256),
                            scrollWidth: ELEMENT.scrollWidth || 0,
                            time: _this4.configSlide.time * 1000 / 512
                        };
                        _this4.configSlide.active = NEW_CONFIG.items > 0 && NEW_CONFIG.moveTo > 0;
                        Object.assign(_this4.configSlide, NEW_CONFIG);
                        if (!_this4.configSlide.isInfinite) {
                            _this4.displayToggle(_this4.configSlide.arrowPrevious);
                        }
                    }
                }
            });
            return this;
        }
    }]);

    return OrcaSlide;
}();

exports.default = OrcaSlide;