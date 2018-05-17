import Utils from "./Utils";

class OrcaSlide {
    /**
     * Metodo inicial encargado de validar la configuracion.
     *
     * @param {object} configuracion inicial.
     *
     * @return {void}
     */
    constructor(config) {
        this.configSlide = config;
        this.autoPlayTimer = null;
        this.initSlider();
    }

    /**
     * Genera la transicion de los sliders.
     *
     * @param  {Boolean} isNext (Optional) indica el tipo de accion.
     *
     * @return void.
     */
    animateSlide(isNext = true) {
        const {
            active,
            contentItem,
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
            this.callbacks(isNext, ACTUAL_POSITION);
            if (isInfinite && INFINITE) {
                this.isInfinite = ACTUAL_POSITION;
            } else if (!INFINITE) {
                this.configSlide.position += (isNext) ? 1 : -1;
                this.configSlide.active = false;
                this.isInfinite = ACTUAL_POSITION;
                let counter = 0;
                const TIMER = setInterval(() => {
                    Utils.moveToScroll(MOVE_TO, contentItem);
                    counter += moveTo;
                    if (counter >= itemWidth) {
                        clearInterval(TIMER);
                        const FULL_MOVE_TO = itemWidth * this.configSlide.position;
                        Utils.moveToScroll(FULL_MOVE_TO, contentItem, false);
                        this.configSlide.active = true;
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
    autoPlay(play = true) {
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

    callbacks(isNext, position) {
        const { callbacks } = this.configSlide;
        const INDEX = (isNext) ? (position - 1) : (position + 1);
        const ACTION = callbacks[`Slide${INDEX}`] || null;
        if (ACTION) {
            const LAUNCH = ((ACTION.next === isNext) || (ACTION.previus && !isNext));
            try {
                if (LAUNCH) ACTION.callback();
            } catch (error) {
                console.groupCollapsed("%c 🚫 [OrcaSlide => Error]", "color:#FFF;");
                console.error(error);
                console.groupEnd("[OrcaSlide => Error]");
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
    displayArrow(index) {
        const {
            autoPlay,
            arrowNext,
            arrowPrevious,
            items,
            isInfinite,
        } = this.configSlide;
        const DISPLAY_PREVIUS = (index > 0) ? "" : "none";
        const DISPLAY_NEXT = (items === index) ? "none" : "";
        Utils.displayToggle(arrowNext, DISPLAY_NEXT);
        Utils.displayToggle(arrowPrevious, DISPLAY_PREVIUS);
        if (autoPlay && !isInfinite && DISPLAY_NEXT === "none") {
            this.autoPlay(false);
        }
    }

    /**
     * Se encarga de lanzar los eventos que dan vida al slider..
     *
     * @return void.
     */
    initSlider() {
        this
            .validateConfig
            .setActionButton
            .resizeSlide
            .startTouch();

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
    startTouch() {
        const DEVICE = Utils.isMobile;
        const { contentItem, items, swipeConfig } = this.configSlide;
        if (DEVICE !== "desktop") {
            const SWIPE = swipeConfig;
            contentItem.addEventListener("touchstart", (action) => {
                action.preventDefault();
                const TOUCH = Utils.existFields(action, "touches.0", null);
                if (TOUCH) {
                    SWIPE.startX = TOUCH.screenX;
                    SWIPE.startY = TOUCH.screenY;
                }
            }, false);

            contentItem.addEventListener("touchmove", (action) => {
                action.preventDefault();
                const TOUCH = Utils.existFields(action, "touches.0", null);
                if (TOUCH) {
                    SWIPE.endX = TOUCH.screenX;
                    SWIPE.endY = TOUCH.screenY;
                }
            }, false);

            contentItem.addEventListener("touchend", () => {
                let direction = "";
                const HZR_X1 = ((SWIPE.endX - SWIPE.min_x) > SWIPE.startX);
                const HZR_X2 = ((SWIPE.endX + SWIPE.min_x) < SWIPE.startX);
                const HZR_Y1 = (SWIPE.endY < (SWIPE.startY + SWIPE.max_y));
                const HZR_Y2 = (SWIPE.startY > (SWIPE.endY - SWIPE.max_y));

                const VERT_Y1 = ((SWIPE.endY - SWIPE.min_y) > SWIPE.startY);
                const VERT_Y2 = ((SWIPE.endY + SWIPE.min_y) < SWIPE.startY);
                const VERT_X1 = (SWIPE.endX < (SWIPE.startX + SWIPE.max_x));
                const VERT_X2 = (SWIPE.startX > (SWIPE.endX - SWIPE.max_x));

                if ((HZR_X1 || HZR_X2) && (HZR_Y1 && HZR_Y2)) {
                    direction = (SWIPE.endX > SWIPE.startX) ? "right" : "left";
                } else if ((VERT_Y1 || VERT_Y2) && (VERT_X1 && VERT_X2)) {
                    direction = (SWIPE.endY > SWIPE.startY) ? "bottom" : "top";
                }

                if (direction === "left" && this.configSlide.position < items) {
                    this.autoPlay(false);
                    this.animateSlide(true);
                } else if (direction === "right" && this.configSlide.position > 0) {
                    this.autoPlay(false);
                    this.animateSlide(false);
                }
            }, false);
        }
    }

    /**
     * Permite manejar la logica de cuando el carousel es infinito.
     *
     * @param {number} index  Posicion actual del slider.
     *
     * @return {void}
     */
    set isInfinite(index) {
        const {
            contentItem,
            isInfinite,
            items,
            itemWidth,
        } = this.configSlide;
        const RELOAD = (index < 0 || index > items) && index;
        if (isInfinite) {
            const INFINITE = (index < 0 || index > items);
            if (INFINITE) {
                contentItem.style.scrollBehavior = "smooth";
                const SCROLL = (RELOAD < 0) ? (items * itemWidth) : 0;
                Utils.moveToScroll(SCROLL, contentItem, false);
                this.configSlide.position = (RELOAD < 0) ? items : 0;
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
    get resizeSlide() {
        const CONFIG = this.configSlide;
        const ITEM = Utils.existFields(CONFIG, "item", null);
        const ELEMENT = Utils.existFields(CONFIG, "content", null);

        if (ITEM !== null && ELEMENT !== null) {
            window.addEventListener("resize", () => {
                this.configSlide.scrollWidth = ELEMENT.scrollWidth;
                this.configSlide.moveTo = Math.ceil(ITEM.offsetWidth / 256);
                this.configSlide.itemWidth = ITEM.offsetWidth;
                const POST = ITEM.offsetWidth * this.configSlide.position;
                Utils.moveToScroll(POST, CONFIG.contentItem, false);
            });
        }
        return this;
    }

    /**
     * Asigna los eventos a las flechas.
     *
     * @return void.
     */
    get setActionButton() {
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
                Utils.actionButton(BUTTON, callbacks);
            } else {
                callbacks = () => {
                    this.animateSlide(IS_NEXT);
                    this.autoPlay(false);
                };
                Utils.actionButton(BUTTON, callbacks);
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
    get validateConfig() {
        const KEYS = [
            "arrowNext",
            "arrowPrevious",
            "contentItem",
        ];
        const { callbacks, jump } = this.configSlide;
        KEYS.forEach((item) => {
            const SELECTOR = this.configSlide[item];
            const ELEMENT = Utils.getElementDom(SELECTOR);
            const JUMP = (Utils.isMobile === "desktop") ? 128 : jump;
            if (ELEMENT) {
                this.configSlide[item] = ELEMENT;
                if (item === "contentItem") {
                    const ITEM = ELEMENT.children[0] || {};
                    const ITEM_WIDTH = ITEM.offsetWidth || 0;
                    const NEW_CONFIG = {
                        items: ELEMENT.children.length - 1,
                        itemWidth: ITEM_WIDTH,
                        moveTo: Math.ceil(ITEM_WIDTH / JUMP),
                        scrollWidth: ELEMENT.scrollWidth || 0,
                        time: (this.configSlide.time * 1000) / 512,
                        item: ITEM,
                        content: ELEMENT,
                    };
                    this.configSlide.active = (NEW_CONFIG.items > 0 && NEW_CONFIG.moveTo > 0);
                    Object.assign(this.configSlide, NEW_CONFIG);
                    if (!this.configSlide.isInfinite) {
                        Utils.displayToggle(this.configSlide.arrowPrevious, "none");
                    }
                }
            }
        });
        this.configSlide.callbacks = Utils.getCallbacksConfig(callbacks);
        return this.validateConfigAutoPlay;
    }

    get validateConfigAutoPlay() {
        const {
            active,
            ctrlPlay,
            ctrlStop,
            timeAutoPlay,
        } = this.configSlide;

        if (active) {
            const CONFIG = {
                timeAutoPlay: (timeAutoPlay * 1000),
                ctrlPlay: Utils.getElementDom(ctrlPlay),
                ctrlStop: Utils.getElementDom(ctrlStop),
            };
            Object.assign(this.configSlide, CONFIG);
        }
        return this;
    }
}

export default OrcaSlide;
