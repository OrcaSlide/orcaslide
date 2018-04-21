# Orca Slide

*OrcaSlide* es un slider básico creado con JS nativo, el propósito de este paquete es evitar el uso de 
librerias qua a futuro generan problemas de compatibilidad entre otras librarías, también evitar el uso
de una estructura html definida por la librería que se utiliza.

## Instalacion

```
npm i orcaslide
```
o 

```
yarn add orcaslide
```

## Uso

Para utilizar *OrcaSlide* es necesario conocer las posibles configuraciones básicas de las que dispone
el paquete, a futuro se tiene contemplado permitir el manejo de más configuraciones y opciones.


| Campo             | tipo de dato | Valor por defecto | Descripción |
|-------------------|:------------:|:-----------------:|-------------|
| **arrowPrevious** | *String*     | `N/A`             | Selector referente al boton para la accion Previus.
| **arrowNext**     | *String*     | `N/A`             | Selector referente al boton para la accion next. 
| **contentItem**   | *String*     | `N/A`             | Selector referente al contenedor de los items del slide.
| **isInfinite**    | *Boolean*    | `false`           | Indica si el slide es finito o infinito.
| **time**          | *Number*     | `1 = segundo`     | Tiempo en el que se realiza transición del slide. 

> **Nota : ** los selectores que se necesitan utilizar dentro del slide tienen que ser selectores como los que se utilizan en `CSS`, ya que para `JS` son compatibles al usar `querySelector`.

## Ejemplo

```javascript
    // carga del paquete
    import OrcaSlide from "orcalide";
    
    // seteo de la configuracion e inicialización
    OrcaSlide.config = {
        arrowPrevious: "#arrow_previus",
        arrowNext: "#arrow_next",
        contentItem: "#swipe",
        isInfinite: true,
        time: 2,
    };
```
## Estructura HTML

```html
<!-- Begin :  Wrapper -->
<section class="Wrapper">

    <!-- Begin :  Wrapper__ArrowContent -->
    <div class="Wrapper__ArrowContent">
        <div class="Wrapper__Arrow-previus" id="arrow_previus"></div>
    </div>
    <!-- End   :  Wrapper__ArrowContent -->

    <!-- Begin :  Wrapper__ConentItem -->
    <div class="Wrapper__Conent">
        <!-- El conenedor de los items tiene que contar con la propiedad overflow -->
        <div class="Wrapper__Conent-items" id="swipe">
            <!-- item -->
            <div class="Wrapper__Conent-item">
                <img src="./img/1.png" alt="">
            </div>
            <!-- item -->
        </div>
    </div>
    <!-- End   :  Wrapper__ConentItem -->

    <!-- Begin :  Wrapper__ArrowContent -->
    <div class="Wrapper__ArrowContent">
        <div class="Wrapper__Arrow-next" id="arrow_next"></div>
    </div>
    <!-- End   :  Wrapper__ArrowContent -->

</section>
<!-- End   :  Wrapper -->
``` 


