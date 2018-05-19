# Orca Slide

[![OrcaSlide badge](https://img.shields.io/badge/OrcaSlide-Develop-yellow.svg)](https://github.com/konami12/orcaslide)

[![GitHub version](https://badge.fury.io/gh/konami12%2Forcaslide.svg)](https://badge.fury.io/gh/konami12%2Forcaslide)

*OrcaSlide* Un Slider básico creado con **JS** **nativo**. El propósito de este desarrollo es evitar el uso de
librerías qua a futuro causan problemas de compatibilidad al tener que convivir con otros paquetes o funcionalidades y evitar la imposición de una estrucura HTML que difiera de tu proyecto.

##  💾 Instalación

Se puede instalar desde NPM o Yarn:

[![NPM Install](https://img.shields.io/badge/Install-NPM-brightgreen.svg)](https://www.npmjs.com/)

```
npm i orcaslide
```
o

[![Yarn Install](https://img.shields.io/badge/Install-Yarn-blue.svg)](https://yarnpkg.com/en/)

```
yarn add orcaslide
```

## ⚙️ Uso

Para utilizar *OrcaSlide* es necesario conocer las posibles configuraciones básicas de las que dispone
el paquete, a futuro se tiene contemplado permitir el manejo de más configuraciones y opciones.


| Campo             | Tipo de dato | Valor por defecto | Descripción |
|-------------------|:------------:|:-----------------:|-------------|
| **arrowPrevious** | *String*     | `N/A`             | Selector referente al botón para la acción **Previus**.|
| **arrowNext**     | *String*     | `N/A`             | Selector referente al botón para la acción **Next**.|
| **autoPlay**      | *Boolean*    | `false`           | Permite indicar si el slider cuenta con **autoplay**|
|**callbacks**      | *Array*      | `[]`              | Permite realizar carga de eventos cada vez que se pase un **slide**, para visualisar el uso de esta funcionalidad podemos ver lo en el apartado [💡 Ejemplo](#-ejemplo).
| **contentItem**   | *String*     | `N/A`             | Selector referente al **Contenedor** de los items del Slide.|
| **ctrlStop**      | *String*     | `N/A`             | Selector referente al botón para la acción detener el **autoPlay**|
| **ctrlPlay**      | *String*     | `N/A`             | Selector referente al botón para la acción reiniciar el **autPlay**|
| **isInfinite**    | *Boolean*    | `false`           | Indica si el Slide es **Finito** o **Infinito**.|
| **time**          | *Number*     | `1 = segundo`     | **Tiempo** en el que se realiza transición del Slide.|
| **timeAutoPlay**  | *Number*     | `1 = segundo`     |  **Tiempo** en el que se pasa automática al siguiente Slide.|

> **Nota:** Los selectores que se necesitan utilizar dentro del Slide tienen que ser selectores como los que se utilizan en `CSS`, ya que para `JS` son compatibles al usar `querySelector`.

## 💡 Ejemplo

```javascript
    // Carga del paquete
    import OrcaSlide from "orcaslide";

    // configuración de ejemplo para el uso de los callbacks.
    const CONFIG_CALLBACKS = [
        {
            /**
             * Se indica la función que se desea ejecutar.
             */
            callback: () => { console.log("PASE o REGRESE => Slide 2"); },
            /**
             * Indica en que posición del slide se ejecuta el callback
             */
            slide: 2,
            /*
             * esto indica si el evento se realiza al pasar el slider.
             * por defecto el valor es false,
            **/ 
            next: true,
            /*
             * esto indica si el evento se realiza al retroceder un slider.
             * por defecto el valor es false,
            **/ 
            previus: true,
        },
        {
            callback: () => { console.log("PASE o REGRESE => Slide 3"); },
            slide: 3,
            next: true,

        },
    ];

    // Seteo de la configuración e inicialización
    OrcaSlide.config = {
        arrowPrevious: "#arrow_previus",
        arrowNext: "#arrow_next",
        callbacks: CONFIG_CALLBACKS,
        ctrlStop: "#stop",
        ctrlPlay: "#play",
        contentItem: "#swipe",
        time: 1,
        timeAutoPlay: 2.5,
        isInfinite: true,
    };
```
## 🚧 Estructura HTML

Nuestra estructura básica de HTML para correr el OrcaSlider consta de las siguientes partes:

| Elementos | Descripción |
|----------:|-------------|
|**Slider:**| Es el componente que contendrá la lógica y los elementos básicos necesarios para la funcionalidad del Slider.|
|**Flechas/Botones:**| Son los elementos que reciben los eventos para recorrer los Items/Cards en el Track.|
|**Contenedor:**| Este elemento es el que mantiene al Track y sus Items en posición.|
|**Track/Riel:**| Este bloque al ser contenedor directo de los items, siempre deberá contar con una propiedad de ```overflow: hidden;```.|
|**Items:**| También conocidos como Cards o Unicades Mínimas, son los contenedores de otros elementos de interacción; botones, enlances, texto, imágenes.|
|**Icons:**| Se tienen contemplados los espacios para poder pasar mediante estilos cualquier icono que recida en una tipografía.|
|**Card:**| Es el área destinada a contener título, texto y/o algún elemento extra de identidad.|
|**Controls/Indicadores:**| Son la referencia visual y funcional que le permiten saber al usuario cuantos slides tiene el slider y/o saltar de uno a otro dependiendo sus necesidades.|

```html

<!-- Slider -->
<section class="Slider">

    <!-- Previous Arrow -->

    <div class="Slider__ArrowPrevious">

        <!-- Button | Arrow -->

        <button class="Icon" id="arrow_previus">
            <span class="Display">Previous Arrow</span>
        </button><!-- /Button | Arrow -->

    </div><!-- /Previous Arrow -->

    <!-- Content -->

    <div class="Slider__Content">

        <!-- Track -->

        <div class="Slider__Track" id="swipe">

            <!-- Item | Card | Unidad Mínima -->

            <div class="Card">

                <!-- Card Content -->

                <img class="Card__Image" src="./img/1.png" alt="My Wonderful Image">

                <!-- /Card Content -->

            </div><!-- /Item | Card | Unidad Mínima -->

        </div><!-- /Track -->

    </div><!-- /Content -->

    <!-- Next Arrow -->

    <div class="Slider__ArrowNext">

        <!-- Button | Arrow -->

        <button class="Icon" id="arrow_next">
            <span class="Display">Next Arrow</span>
        </button><!-- Button | Arrow -->

    </div><!-- /Next Arrow -->

</section><!-- /Slider -->

```

## 🌎 Team

<center>

| | | |
|:------------:|:------------:|:------------:|
|[<img src="https://avatars1.githubusercontent.com/u/3249830?s=460&v=4" width="100px;"/><br /><sub><b>Jorge (Konami12)</b></sub>](https://github.com/konami12)<br />             |[<img src="https://avatars3.githubusercontent.com/u/1319384?s=460&v=4" width="100px;"/><br /><sub><b>Shannonbit (Shannonbit)</b></sub>](https://github.com/shannonbit)<br />               |[<img src="https://avatars3.githubusercontent.com/u/946126?s=460&v=4" width="100px;"/><br /><sub><b>Alan Mena (Kolibri)</b></sub>](https://github.com/the-kolibri)<br />             |
| | | | |

</center>


[![Readme Version](https://img.shields.io/badge/Readme-v0.0.1-red.svg)](https://github.com/the-kolibri)