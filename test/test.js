/* eslint-disable */
const expect = require("chai").expect;
const OrcaSlide = require("..").default;
const Utils = require("../dist/source/Utils").default;

describe("OrcaSlide", function(){
    it("Funcion iniciada", function() {
        const orca = OrcaSlide;
        expect(orca).to.be.an("function")
    })
    
    it("Probando utilidades [existFields]", function() {
        const data = {node1: [{},{item:5},{}]};
        const request = Utils.existFields(data, "node1.1.item", "null");
        expect(request).to.be.equals(5);
    });

});
