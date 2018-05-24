class Utils {
    /**
     * Permite agregar eventos a elementos de la interfaz.
     *
     * @param  {object} button Referencia a elemento del dom.
     * @param  {function} callbacks Funciones a ejecutar.
     * @param  {String} (Optional) Tipo de accion.
     *
     * @return {void}
     */
    static actionButton(button, callbacks = null, evento = "click") {
        if (button) {
            button.addEventListener(evento, () => {
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
    static displayToggle(element, display = "") {
        const ELEMENT = element;
        let auxDisplay = display;

        if (display !== "") {
            const DISPLAY = ELEMENT.style.display || "block";
            auxDisplay = (DISPLAY === "block") ? "none" : "";
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
    static existFields(data, keys, requestDefault = "") {
        const KEYS = keys.split(".");
        let objectTest = data;
        // funcion especial
        const VALIDATE = () => (
            KEYS.every((key) => {
                const REQUEST = (typeof objectTest[key] !== "undefined");
                objectTest = objectTest[key];
                return REQUEST;
            })
        );
        return VALIDATE() ? objectTest : requestDefault;
    }

    /**
     * Permite conseguir un elemento del dom identificando si esta vacio o existe.
     * @param  {String} (Optional) Selector referente al elemento del dom.
     *
     * @return {object}.
     */
    static getElementDom(selector = "") {
        let domElement = null;
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
    static get isMobile() {
        const DEVICE = (typeof navigator !== "undefined")
            ? navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)
            : "desktop";
        const WIDTH_SCREEN = (typeof window !== "undefined")
            ? window.innerWidth
            : "1024";
        let request = "desktop";

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
     * Permite realizar el movimiento del scroll.
     *
     * @param  {number} pixels Numero de pixeles a desplazar.
     * @param  {Boolean} isAdd (Optional) indica si los piexeles se agregan a la cuenta actual.
     *
     * @return void.
     */
    static moveToScroll(pixels, contentItem, isAdd = true) {
        const CONTENT = contentItem;
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
    static getCallbacksConfig(config) {
        const CONFIG = {
            callback: () => {},
            next: false,
            previus: false,
        };

        const CALLBACKS = config.reduce((action, item) => {
            const KEY = `Slide${item.slide - 1}`;
            const DATA = {};
            const DEFAULT = Object.assign({}, CONFIG);
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
    static getDirecctionSlide(swipe) {
        const HZR_X1 = ((swipe.endX - swipe.min_x) > swipe.startX);
        const HZR_X2 = ((swipe.endX + swipe.min_x) < swipe.startX);
        const HZR_Y1 = (swipe.endY < (swipe.startY + swipe.max_y));
        const HZR_Y2 = (swipe.startY > (swipe.endY - swipe.max_y));

        const VERT_Y1 = ((swipe.endY - swipe.min_y) > swipe.startY);
        const VERT_Y2 = ((swipe.endY + swipe.min_y) < swipe.startY);
        const VERT_X1 = (swipe.endX < (swipe.startX + swipe.max_x));
        const VERT_X2 = (swipe.startX > (swipe.endX - swipe.max_x));

        const IS_HORIZONTAL = ((HZR_X1 || HZR_X2) && (HZR_Y1 && HZR_Y2));
        const IS_VERTICAL = ((VERT_Y1 || VERT_Y2) && (VERT_X1 && VERT_X2));

        let direction = "";

        if (IS_HORIZONTAL) {
            direction = (swipe.endX > swipe.startX) ? "right" : "left";
        } else if (IS_VERTICAL) {
            direction = (swipe.endY > swipe.startY) ? "bottom" : "top";
        }

        return direction;
    }
}

export default Utils;
