import OrcaSlide from "./OrcaSlide";

/**
 * Permite inicializar orcaslide con un nuevo
 * scope.
 */
class initOrcaSlide {
    static set config(config) {
        return new OrcaSlide(config);
    }
}

export default initOrcaSlide;
