"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fraction_1 = require("./Fraction");
describe('Fraction', () => {
    it('determines equality between 2 fractions', () => {
        expect(new Fraction_1.Fraction(4, 5).isEqual(new Fraction_1.Fraction(4, 5))).toBe(true);
        expect(new Fraction_1.Fraction(4, 5).isEqual(new Fraction_1.Fraction(8, 10))).toBe(true);
        expect(new Fraction_1.Fraction(4, 5).isEqual(new Fraction_1.Fraction(4, 10))).toBe(false);
    });
});
