import OrcaSlide from "./OrcaSlide";
import Config from "./orcaConfig.json";

/**
 * Permite inicializar orcaslide con un nuevo
 * scope.
 */
class initOrcaSlide {
    static set config(config) {
        console.log("Estas corriendo con orcaSlide 1.0.5");
        this.buildOrcaStorage(config);
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                const ORCAS = JSON.parse(localStorage.orcaslide);
                ORCAS.map((orca) => {
                    const CONFIG = JSON.stringify(Config);
                    const NEW_CONFIG = JSON.parse(CONFIG);
                    Object.assign(NEW_CONFIG, orca);
                    return new OrcaSlide(NEW_CONFIG);
                });
                delete localStorage.orcaslide;
            }
        };
    }

    /**
     * Permite crear un storage con las invocaciones de orca.
     *
     * @param  {object} config Configuracion base.
     * @return {void}
     */
    static buildOrcaStorage(config) {
        if (!localStorage.orcaslide) {
            localStorage.orcaslide = "[]";
        }
        const STORAGE = JSON.parse(localStorage.orcaslide);
        STORAGE.push(config);
        localStorage.orcaslide = JSON.stringify(STORAGE);
    }
}

export default initOrcaSlide;
