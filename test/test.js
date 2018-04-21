const jsdom = require("mocha-jsdom");
const expect = require("chai").expect;
const OrcaSlide = require("..").default;

describe("OrcaSlide", function(){
    it("Funcion iniciada", function() {
        const orca = OrcaSlide;
        expect(orca).to.be.an("function")
    })
});
