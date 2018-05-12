"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require("./Utils");

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrcaSlide = function () {
    /**
     * Metodo inicial encargado de validar la configuracion.
     *
     * @param {object} configuracion inicial.
     *
     * @return {void}
     */
    function OrcaSlide(config) {
        _classCallCheck(this, OrcaSlide);

        this.configSlide = {
            arrowNext: "",
            arrowPrevious: "",
            autoPlay: false,
            contentItem: "",
            ctrlStop: "",
            ctrlPlay: "",
            time: 1,
            timeAutoPlay: 2,
            isInfinite: false,
            position: 0,
            active: false
        };
        this.autoPlayTimer = null;
        Object.assign(this.configSlide, config);
        this.initSlider();
    }

    /**
     * Genera la transicion de los sliders.
     *
     * @param  {Boolean} isNext (Optional) indica el tipo de accion.
     *
     * @return void.
     */


    _createClass(OrcaSlide, [{
        key: "animateSlide",
        value: function animateSlide() {
            var _this = this;

            var isNext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var _configSlide = this.configSlide,
                active = _configSlide.active,
                contentItem = _configSlide.contentItem,
                itemWidth = _configSlide.itemWidth,
                items = _configSlide.items,
                moveTo = _configSlide.moveTo,
                time = _configSlide.time,
                position = _configSlide.position,
                isInfinite = _configSlide.isInfinite;


            var MOVE_TO = isNext ? moveTo : -moveTo;
            var ACTUAL_POSITION = isNext ? position + 1 : position - 1;
            var INFINITE = items < ACTUAL_POSITION || ACTUAL_POSITION < 0;
            if (active) {
                if (isInfinite && INFINITE) {
                    this.isInfinite = ACTUAL_POSITION;
                } else if (!INFINITE) {
                    this.configSlide.position += isNext ? 1 : -1;
                    this.configSlide.active = false;
                    this.isInfinite = ACTUAL_POSITION;
                    var counter = 0;
                    var TIMER = setInterval(function () {
                        _Utils2.default.moveToScroll(MOVE_TO, contentItem);
                        counter += moveTo;
                        if (counter >= itemWidth) {
                            clearInterval(TIMER);
                            var FULL_MOVE_TO = itemWidth * _this.configSlide.position;
                            _Utils2.default.moveToScroll(FULL_MOVE_TO, contentItem, false);
                            _this.configSlide.active = true;
                        }
                    }, time);
                }
            }
        }

        /**
         * Permite el manejo de la accion autoPlay.
         *
         * @param  {Boolean} (Optional) Indica si el carousel esten autoPlay.
         * @return {void}.
         */

    }, {
        key: "autoPlay",
        value: function autoPlay() {
            var _this2 = this;

            var play = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.configSlide.autoPlay = play;
            var _configSlide2 = this.configSlide,
                autoPlay = _configSlide2.autoPlay,
                timeAutoPlay = _configSlide2.timeAutoPlay;

            if (!play && !autoPlay) {
                clearInterval(this.autoPlayTimer);
            } else if (play && autoPlay) {
                this.autoPlayTimer = setInterval(function () {
                    _this2.animateSlide();
                }, timeAutoPlay);
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
            var _configSlide3 = this.configSlide,
                autoPlay = _configSlide3.autoPlay,
                arrowNext = _configSlide3.arrowNext,
                arrowPrevious = _configSlide3.arrowPrevious,
                items = _configSlide3.items,
                isInfinite = _configSlide3.isInfinite;

            var DISPLAY_PREVIUS = index > 0 ? "" : "none";
            var DISPLAY_NEXT = items === index ? "none" : "";
            _Utils2.default.displayToggle(arrowNext, DISPLAY_NEXT);
            _Utils2.default.displayToggle(arrowPrevious, DISPLAY_PREVIUS);
            if (autoPlay && !isInfinite && DISPLAY_NEXT === "none") {
                this.autoPlay(false);
            }
        }

        /**
         * Se encarga de lanzar los eventos que dan vida al slider..
         *
         * @return void.
         */

    }, {
        key: "initSlider",
        value: function initSlider() {
            this.validateConfig.setActionButton.resizeSlide.startTouch();

            if (this.configSlide.autoPlay) this.autoPlay();
            return 0;
        }

        // ================================================================= //
        //                         Setter and Getter                         //
        // ================================================================= //

        /**
         * Se innicializa el evento touch.
         *
         * @return {void} [description]
         */

    }, {
        key: "startTouch",
        value: function startTouch() {
            var _this3 = this;

            var DEVICE = _Utils2.default.isMobile;
            var _configSlide4 = this.configSlide,
                contentItem = _configSlide4.contentItem,
                items = _configSlide4.items;

            if (DEVICE !== "desktop") {
                var startX = 0;
                contentItem.addEventListener("touchstart", function (action) {
                    var SWIPE = action.changedTouches[0];
                    startX = parseInt(SWIPE.clientX, 10);
                });
                contentItem.addEventListener("touchmove", function (action) {
                    var SWIPE = action.changedTouches[0];
                    var direction = "";
                    var swipeX = parseInt(SWIPE.clientX, 10);

                    if (swipeX - startX > 0) {
                        direction = "right";
                    } else {
                        direction = "left";
                    }

                    if (direction === "left" && _this3.configSlide.position < items) {
                        _this3.autoPlay(false);
                        _this3.animateSlide(true);
                    } else if (direction === "right" && _this3.configSlide.position > 0) {
                        _this3.autoPlay(false);
                        _this3.animateSlide(false);
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
        key: "isInfinite",
        set: function set(index) {
            var _configSlide5 = this.configSlide,
                contentItem = _configSlide5.contentItem,
                isInfinite = _configSlide5.isInfinite,
                items = _configSlide5.items,
                itemWidth = _configSlide5.itemWidth;

            var RELOAD = (index < 0 || index > items) && index;
            if (isInfinite) {
                var INFINITE = index < 0 || index > items;
                if (INFINITE) {
                    contentItem.style.scrollBehavior = "smooth";
                    var SCROLL = RELOAD < 0 ? items * itemWidth : 0;
                    _Utils2.default.moveToScroll(SCROLL, contentItem, false);
                    this.configSlide.position = RELOAD < 0 ? items : 0;
                    this.configSlide.active = true;
                    contentItem.removeAttribute("style");
                }
            } else {
                this.displayArrow(index);
            }
        }

        /**
         * Evita que al redimensionar el navegador se tengan problemas con los slides.
         *
         * @return self Fluent interface.
         */

    }, {
        key: "resizeSlide",
        get: function get() {
            var _this4 = this;

            var CONFIG = this.configSlide;
            var ITEM = _Utils2.default.existFields(CONFIG, "item", null);
            var ELEMENT = _Utils2.default.existFields(CONFIG, "content", null);

            if (ITEM !== null && ELEMENT !== null) {
                window.addEventListener("resize", function () {
                    _this4.configSlide.scrollWidth = ELEMENT.scrollWidth;
                    _this4.configSlide.moveTo = Math.ceil(ITEM.offsetWidth / 256);
                    _this4.configSlide.itemWidth = ITEM.offsetWidth;
                    var POST = ITEM.offsetWidth * _this4.configSlide.position;
                    _Utils2.default.moveToScroll(POST, CONFIG.contentItem, false);
                });
            }
            return this;
        }

        /**
         * Asigna los eventos a las flechas.
         *
         * @return void.
         */

    }, {
        key: "setActionButton",
        get: function get() {
            var _this5 = this;

            var KEYS = ["arrowNext", "arrowPrevious", "ctrlStop", "ctrlPlay"];
            KEYS.forEach(function (button) {
                var BUTTON = _this5.configSlide[button];
                var IS_PLAY = button === "ctrlPlay";
                var IS_NEXT = button === "arrowNext";
                var callbacks = function callbacks() {};

                if (button.includes("ctrl")) {
                    callbacks = function callbacks() {
                        _this5.autoPlay(IS_PLAY);
                    };
                    _Utils2.default.actionButton(BUTTON, callbacks);
                } else {
                    callbacks = function callbacks() {
                        _this5.animateSlide(IS_NEXT);
                        _this5.autoPlay(false);
                    };
                    _Utils2.default.actionButton(BUTTON, callbacks);
                }
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
            var _this6 = this;

            var KEYS = ["arrowNext", "arrowPrevious", "contentItem"];
            KEYS.forEach(function (item) {
                var SELECTOR = _this6.configSlide[item];
                var ELEMENT = _Utils2.default.getElementDom(SELECTOR);

                if (ELEMENT) {
                    _this6.configSlide[item] = ELEMENT;
                    if (item === "contentItem") {
                        var ITEM = ELEMENT.children[0] || {};
                        var ITEM_WIDTH = ITEM.offsetWidth || 0;
                        var NEW_CONFIG = {
                            items: ELEMENT.children.length - 1,
                            itemWidth: ITEM_WIDTH,
                            moveTo: Math.ceil(ITEM_WIDTH / 128),
                            scrollWidth: ELEMENT.scrollWidth || 0,
                            time: _this6.configSlide.time * 1000 / 512,
                            item: ITEM,
                            content: ELEMENT
                        };
                        _this6.configSlide.active = NEW_CONFIG.items > 0 && NEW_CONFIG.moveTo > 0;
                        Object.assign(_this6.configSlide, NEW_CONFIG);
                        if (!_this6.configSlide.isInfinite) {
                            _Utils2.default.displayToggle(_this6.configSlide.arrowPrevious, "none");
                        }
                    }
                }
            });
            return this.validateConfigAutoPlay;
        }
    }, {
        key: "validateConfigAutoPlay",
        get: function get() {
            var _configSlide6 = this.configSlide,
                active = _configSlide6.active,
                ctrlPlay = _configSlide6.ctrlPlay,
                ctrlStop = _configSlide6.ctrlStop,
                timeAutoPlay = _configSlide6.timeAutoPlay;


            if (active) {
                var CONFIG = {
                    timeAutoPlay: timeAutoPlay * 1000,
                    ctrlPlay: _Utils2.default.getElementDom(ctrlPlay),
                    ctrlStop: _Utils2.default.getElementDom(ctrlStop)
                };
                Object.assign(this.configSlide, CONFIG);
            }
            return this;
        }
    }]);

    return OrcaSlide;
}();

exports.default = OrcaSlide;