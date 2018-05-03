import Utils from "./Utils";

class OrcaSlide extends Utils {
    /**
     * Genera la transicion de los sliders.
     *
     * @param  {Boolean} isNext Optional indica el tipo de accion.
     *
     * @return void.
     */
    static animateSlide(isNext = true) {
        const {
            active,
            itemWidth,
            items,
            moveTo,
            time,
            position,
            isInfinite,
        } = this.configSlide;

        const MOVE_TO = (isNext) ? moveTo : -moveTo;
        const ACTUAL_POSITION = (isNext) ? (position + 1) : (position - 1);
        const INFINITE = (items < ACTUAL_POSITION || ACTUAL_POSITION < 0);

        if (active) {
            if (isInfinite && INFINITE) {
                this.isInfinite = ACTUAL_POSITION;
            } else {
                this.configSlide.position += (isNext) ? 1 : -1;
                this.configSlide.active = false;
                this.isInfinite = ACTUAL_POSITION;
                let counter = 0;
                const TIMER = setInterval(() => {
                    this.moveToScroll(MOVE_TO);
                    counter += moveTo;
                    if (counter >= itemWidth) {
                        clearInterval(TIMER);
                        const FULL_MOVE_TO = itemWidth * this.configSlide.position;
                        this.moveToScroll(FULL_MOVE_TO, false);
                        this.configSlide.active = true;
                    }
                }, time);
            }
        }
    }

    /**
     * Oculta las flechas.
     *
     * @param {number} element posicion del elemento.
     *
     * @return {void}
     */
    static displayArrow(index) {
        const { arrowNext, arrowPrevious, items } = this.configSlide;
        const DISPLAY_PREVIUS = (index > 0) ? "" : "none";
        const DISPLAY_NEXT = (items === index) ? "none" : "";
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
    static set config(config) {
        this.configSlide = {
            arrowNext: "",
            arrowPrevious: "",
            contentItem: "",
            time: 1,
            isInfinite: false,
            position: 0,
            active: false,
        };

        Object.assign(this.configSlide, config);

        this
            .validateConfig
            .setActionButton
            .resizeSlide
            .startTouch();
    }

    /**
     * Se innicializa el evento touch.
     *
     * @return {void} [description]
     */
    static startTouch() {
        const DEVICE = this.isMobile;
        const { contentItem, items } = this.configSlide;
        if (DEVICE !== "desktop") {
            let startX = 0;
            contentItem.addEventListener("touchstart", (action) => {
                const SWIPE = action.changedTouches[0];
                startX = parseInt(SWIPE.clientX, 10);
            });
            contentItem.addEventListener("touchmove", (action) => {
                const SWIPE = action.changedTouches[0];
                let direction = "";
                const swipeX = parseInt(SWIPE.clientX, 10);

                if ((swipeX - startX) > 0) {
                    direction = "right";
                } else {
                    direction = "left";
                }

                if (direction === "left" && this.configSlide.position < items) {
                    this.animateSlide(true);
                } else if (direction === "right" && this.configSlide.position > 0) {
                    this.animateSlide(false);
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
    static set isInfinite(index) {
        const {
            isInfinite,
            items,
            itemWidth,
        } = this.configSlide;
        const RELOAD = (index < 0 || index > items) && index;
        if (isInfinite) {
            const INFINITE = (index < 0 || index > items);
            if (INFINITE) {
                const SCROLL = (RELOAD < 0) ? (items * itemWidth) : 0;
                this.moveToScroll(SCROLL, false);
                this.configSlide.position = (RELOAD < 0) ? items : 0;
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
    static get resizeSlide() {
        const CONFIG = this.configSlide;
        const ITEM = this.existFields(CONFIG, "item", null);
        const ELEMENT = this.existFields(CONFIG, "content", null);

        if (ITEM !== null && ELEMENT !== null) {
            window.addEventListener("resize", () => {
                this.configSlide.scrollWidth = ELEMENT.scrollWidth;
                this.configSlide.moveTo = Math.ceil(ITEM.offsetWidth / 256);
                this.configSlide.itemWidth = ITEM.offsetWidth;
                const POST = ITEM.offsetWidth * this.configSlide.position;
                this.moveToScroll(POST, false);
            });
        }
        return this;
    }

    /**
     * Asigna los eventos a las flechas.
     *
     * @return void.
     */
    static get setActionButton() {
        const KEYS = [
            "arrowNext",
            "arrowPrevious",
        ];
        KEYS.forEach((button) => {
            const IS_NEXT = (button === "arrowNext");
            const BUTTON = this.configSlide[button];
            BUTTON.addEventListener("click", () => {
                this.animateSlide(IS_NEXT);
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
    static get validateConfig() {
        const KEYS = [
            "arrowNext",
            "arrowPrevious",
            "contentItem",
        ];

        KEYS.forEach((item) => {
            const SELECTOR = this.configSlide[item];
            const ELEMENT = document.querySelector(SELECTOR);

            if (ELEMENT) {
                this.configSlide[item] = ELEMENT;
                if (item === "contentItem") {
                    const ITEM = ELEMENT.children[0] || {};
                    const ITEM_WIDTH = ITEM.offsetWidth || 0;
                    const NEW_CONFIG = {
                        items: ELEMENT.children.length - 1,
                        itemWidth: ITEM_WIDTH,
                        moveTo: Math.ceil(ITEM_WIDTH / 256),
                        scrollWidth: ELEMENT.scrollWidth || 0,
                        time: (this.configSlide.time * 1000) / 512,
                        item: ITEM,
                        content: ELEMENT,
                    };
                    this.configSlide.active = (NEW_CONFIG.items > 0 && NEW_CONFIG.moveTo > 0);
                    Object.assign(this.configSlide, NEW_CONFIG);
                    if (!this.configSlide.isInfinite) {
                        this.displayToggle(this.configSlide.arrowPrevious, "none");
                    }
                }
            }
        });
        return this;
    }
}

export default OrcaSlide;
