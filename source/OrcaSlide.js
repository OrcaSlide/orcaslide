import Utils from "./Utils";
/**
 * [OrcaSlide description]
 * @extends Utils
 */
class OrcaSlide extends Utils {
    /**
     * Genera la transicion de los sliders.
     *
     * @param  {Boolean} isNext (Optional) indica el tipo de accion.
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
                if (!INFINITE) {
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
    }

    /**
     * Permite el manejo de la accion autoPlay.
     *
     * @param  {Boolean} (Optional) Indica si el carousel esten autoPlay.
     * @return {void}.
     */
    static autoPlay(play = true) {
        this.configSlide.autoPlay = play;
        const { autoPlay, timeAutoPlay } = this.configSlide;
        if (!play && !autoPlay) {
            clearInterval(this.autoPlayTimer);
        } else if (play && autoPlay) {
            this.autoPlayTimer = setInterval(() => {
                this.animateSlide();
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
    static displayArrow(index) {
        const {
            autoPlay,
            arrowNext,
            arrowPrevious,
            items,
            isInfinite,
        } = this.configSlide;
        const DISPLAY_PREVIUS = (index > 0) ? "" : "none";
        const DISPLAY_NEXT = (items === index) ? "none" : "";
        this.displayToggle(arrowNext, DISPLAY_NEXT);
        this.displayToggle(arrowPrevious, DISPLAY_PREVIUS);
        if (autoPlay && !isInfinite && DISPLAY_NEXT === "none") {
            this.autoPlay(false);
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
    static set config(config) {
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
            active: false,
        };
        this.autoPlayTimer = null;
        Object.assign(this.configSlide, config);

        this
            .validateConfig
            .setActionButton
            .resizeSlide
            .startTouch();

        if (this.configSlide.autoPlay) this.autoPlay();
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
                    this.autoPlay(false);
                    this.animateSlide(true);
                } else if (direction === "right" && this.configSlide.position > 0) {
                    this.autoPlay(false);
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
            "ctrlStop",
            "ctrlPlay",
        ];
        KEYS.forEach((button) => {
            const BUTTON = this.configSlide[button];
            const IS_PLAY = (button === "ctrlPlay");
            const IS_NEXT = (button === "arrowNext");
            let callbacks = () => {};

            if (button.includes("ctrl")) {
                callbacks = () => {
                    this.autoPlay(IS_PLAY);
                };
                this.actionButton(BUTTON, callbacks);
            } else {
                callbacks = () => {
                    this.animateSlide(IS_NEXT);
                    this.autoPlay(false);
                };
                this.actionButton(BUTTON, callbacks);
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
    static get validateConfig() {
        const KEYS = [
            "arrowNext",
            "arrowPrevious",
            "contentItem",
        ];
        KEYS.forEach((item) => {
            const SELECTOR = this.configSlide[item];
            const ELEMENT = this.getElementDom(SELECTOR);

            if (ELEMENT) {
                this.configSlide[item] = ELEMENT;
                if (item === "contentItem") {
                    const ITEM = ELEMENT.children[0] || {};
                    const ITEM_WIDTH = ITEM.offsetWidth || 0;
                    const NEW_CONFIG = {
                        items: ELEMENT.children.length - 1,
                        itemWidth: ITEM_WIDTH,
                        moveTo: Math.ceil(ITEM_WIDTH / 128),
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
        return this.validateConfigAutoPlay;
    }

    static get validateConfigAutoPlay() {
        const {
            active,
            ctrlPlay,
            ctrlStop,
            timeAutoPlay,
        } = this.configSlide;

        if (active) {
            const CONFIG = {
                timeAutoPlay: (timeAutoPlay * 1000),
                ctrlPlay: this.getElementDom(ctrlPlay),
                ctrlStop: this.getElementDom(ctrlStop),
            };
            Object.assign(this.configSlide, CONFIG);
        }
        return this;
    }
}

export default OrcaSlide;
