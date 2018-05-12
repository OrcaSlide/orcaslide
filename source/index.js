import OrcaSlide from "./OrcaSlide";
import Config from "./orcaConfig.json";

/**
 * Permite inicializar orcaslide con un nuevo
 * scope.
 */
class initOrcaSlide {
    static set config(config) {
        Object.assign(Config, config);
        return new OrcaSlide(Config);
    }
}

export default initOrcaSlide;
