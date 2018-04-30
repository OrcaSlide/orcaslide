"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils2 = require("./Utils");

var _Utils3 = _interopRequireDefault(_Utils2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrcaSlide = function (_Utils) {
    _inherits(OrcaSlide, _Utils);

    function OrcaSlide() {
        _classCallCheck(this, OrcaSlide);

        return _possibleConstructorReturn(this, (OrcaSlide.__proto__ || Object.getPrototypeOf(OrcaSlide)).apply(this, arguments));
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
            var _this2 = this;

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
                    _this2.moveToScroll(MOVE_TO);
                    counter += moveTo;
                    if (counter >= itemWidth) {
                        clearInterval(TIMER);
                        var FULL_MOVE_TO = itemWidth * _this2.configSlide.position;
                        _this2.moveToScroll(FULL_MOVE_TO, false);
                        _this2.configSlide.active = true;
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
            this.displayToggle(arrowNext, DISPLAY_NEXT);
            this.displayToggle(arrowPrevious, DISPLAY_PREVIUS);
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
            var _this3 = this;

            var DEVICE = this.isMobile;
            var _configSlide3 = this.configSlide,
                contentItem = _configSlide3.contentItem,
                items = _configSlide3.items,
                itemWidth = _configSlide3.itemWidth;

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
                    _this3.moveToScroll(clientX, false);
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

            this.validateConfig.setActionButton.resizeSlide.startTouch();
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
         * Evita que al redimensionar el navegador se tengan problemas con los slides.
         *
         * @return self Fluent interface.
         */

    }, {
        key: "resizeSlide",
        get: function get() {
            var _this4 = this;

            var CONFIG = this.configSlide;
            var ITEM = this.existFields(CONFIG, "item", null);
            var ELEMENT = this.existFields(CONFIG, "content", null);

            if (ITEM !== null && ELEMENT !== null) {
                window.addEventListener("resize", function () {
                    _this4.configSlide.scrollWidth = ELEMENT.scrollWidth;
                    _this4.configSlide.moveTo = Math.ceil(ITEM.offsetWidth / 256);
                    _this4.configSlide.itemWidth = ITEM.offsetWidth;
                    var POST = ITEM.offsetWidth * _this4.configSlide.position;
                    _this4.moveToScroll(POST, false);
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

            var KEYS = ["arrowNext", "arrowPrevious"];
            KEYS.forEach(function (button) {
                var IS_NEXT = button === "arrowNext";
                var BUTTON = _this5.configSlide[button];
                BUTTON.addEventListener("click", function () {
                    var items = _this5.configSlide.items;
                    var position = _this5.configSlide.position;

                    position += IS_NEXT ? 1 : -1;
                    if (position >= 0 && position <= items) {
                        _this5.animateSlide(IS_NEXT);
                        _this5.isInfinite = position;
                    } else if (items < position || position < 0) {
                        _this5.isInfinite = position;
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
            var _this6 = this;

            var KEYS = ["arrowNext", "arrowPrevious", "contentItem"];

            KEYS.forEach(function (item) {
                var SELECTOR = _this6.configSlide[item];
                var ELEMENT = document.querySelector(SELECTOR);

                if (ELEMENT) {
                    _this6.configSlide[item] = ELEMENT;
                    if (item === "contentItem") {
                        var ITEM = ELEMENT.children[0] || {};
                        var ITEM_WIDTH = ITEM.offsetWidth || 0;
                        var NEW_CONFIG = {
                            items: ELEMENT.children.length - 1,
                            itemWidth: ITEM_WIDTH,
                            moveTo: Math.ceil(ITEM_WIDTH / 256),
                            scrollWidth: ELEMENT.scrollWidth || 0,
                            time: _this6.configSlide.time * 1000 / 512,
                            item: ITEM,
                            content: ELEMENT
                        };
                        _this6.configSlide.active = NEW_CONFIG.items > 0 && NEW_CONFIG.moveTo > 0;
                        Object.assign(_this6.configSlide, NEW_CONFIG);
                        if (!_this6.configSlide.isInfinite) {
                            _this6.displayToggle(_this6.configSlide.arrowPrevious, "none");
                        }
                    }
                }
            });
            return this;
        }
    }]);

    return OrcaSlide;
}(_Utils3.default);

exports.default = OrcaSlide;