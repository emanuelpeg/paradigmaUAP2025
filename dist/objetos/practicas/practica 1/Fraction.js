"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraction = void 0;
class Fraction {
    numerator;
    denominator;
    constructor(numerator, denominator = 1) {
        this.numerator = numerator;
        this.denominator = denominator;
        if (denominator === 0) {
            throw new Error("Denominator can't be 0");
        }
    }
    get values() {
        return [this.numerator, this.denominator];
    }
    mcd() {
        return 0;
    }
    simplify() {
        return this;
    }
    sum(other) {
        return this.simplify();
    }
    subtract(other) {
        return this.simplify();
    }
    multiply(other) {
        return this.simplify();
    }
    divide(other) {
        return this.simplify();
    }
    negative() {
        return this;
    }
    inverse() {
        [this.denominator, this.numerator] = [this.numerator, this.denominator];
        return this;
    }
    isEqual(other) {
        return true;
        // 1/2 === 2/4
    }
    toString() {
        return `${this.numerator}/${this.denominator}`;
    }
    toJSON() {
        return this.toString();
    }
}
exports.Fraction = Fraction;
