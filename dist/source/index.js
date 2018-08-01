"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OrcaSlide = require("./OrcaSlide");

var _OrcaSlide2 = _interopRequireDefault(_OrcaSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = {
    arrowNext: "",
    arrowPrevious: "",
    autoPlay: false,
    callbacks: [],
    contentItem: "",
    ctrlStop: "",
    ctrlPlay: "",
    jump: 64,
    time: 1,
    timeAutoPlay: 2,
    isInfinite: false,
    position: 0,
    active: false,
    swipeConfig: {
        direction: "",
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        min_x: 20,
        max_x: 40,
        min_y: 40,
        max_y: 50
    }
};

/**
 * Permite inicializar orcaslide con un nuevo
 * scope.
 */

var initOrcaSlide = function () {
    function initOrcaSlide() {
        _classCallCheck(this, initOrcaSlide);
    }

    _createClass(initOrcaSlide, null, [{
        key: "config",
        set: function set(config) {
            var CONFIG = JSON.stringify(Config);
            var NEW_CONFIG = JSON.parse(CONFIG);
            Object.assign(NEW_CONFIG, config);
            return new _OrcaSlide2.default(NEW_CONFIG);
        }
    }]);

    return initOrcaSlide;
}();

exports.default = initOrcaSlide;