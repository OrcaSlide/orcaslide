const expect = require("chai").expect;
const OrcaSlide = require("..").default;

describe("OrcaSlide", function(){
    it("Funcion iniciada", function() {
        const orca = OrcaSlide;
        expect(orca).to.be.an("function")
    })
    
    it("Probando utilidades", function() {
        const data = {node1: [{},{item:5},{}]};
        const request = OrcaSlide.existFields(data, "node1.1.item", "null");
        expect(request).to.be.equals(5);
    });
});
