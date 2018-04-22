class Utils {
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
     * @param  {Boolean} isAdd (Optiona) indica si los piexeles se agregan a la
     *                                   cuenta actual.
     *
     * @return void.
     */
    static moveToScroll(pixels, isAdd = true) {
        const { contentItem } = this.configSlide;
        if (isAdd) {
            contentItem.scrollLeft += pixels;
        } else {
            contentItem.scrollLeft = pixels;
        }
    }
}

export default Utils;