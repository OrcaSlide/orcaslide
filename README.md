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

