import OrcaSlide from "./OrcaSlide";
import Config from "./orcaConfig.json";

/**
 * Permite inicializar orcaslide con un nuevo
 * scope.
 */
class initOrcaSlide {
    static set config(config) {
        const CONFIG = JSON.stringify(Config);
        const NEW_CONFIG = JSON.parse(CONFIG);
        Object.assign(NEW_CONFIG, config);
        return new OrcaSlide(NEW_CONFIG);
    }
}

export default initOrcaSlide;
