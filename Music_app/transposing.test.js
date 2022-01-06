import { expect } from 'chai';
import { findDifference, transpose } from './transposing.js';

describe('testing find the difference basic functionality', () => {
    it('returns the numerical difference between two chords when the second one is higher', () => {
        const expected = 3;
        const actual = findDifference('A', 'C');

        expect(actual).to.equal(expected);
    });

    it('returns a correct negative numerical difference between two chords when the second one is lower', () => {
        const expected = -3;
        const actual = findDifference('C', 'A');

        expect(actual).to.equal(expected);
    });
});

describe('testing basic functionality of transposing function', () => {
    it('returns a correctly transposed list of chords when the difference is positive and none of the transposition is out of range of the array', () => {
        const chords = ['A', 'B', 'C#', 'E'];
        const difference = 2;
        const expected = ['B', 'C#', 'Eb', 'F#'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

    it('returns a correctly transposed list of chords when the difference is negative and none of the transposition is out of range of the array', () => {
        const chords = ['C#', 'Eb', 'F#', 'G'];
        const difference = -2;
        const expected = ['B', 'C#', 'E', 'F'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

    it('returns a correctly transposed list of chords when the difference is positive and some of the transposition is out of range of the array', () => {
        const chords = ['A', 'F', 'C', 'G'];
        const difference = 7;
        const expected = ['E', 'C', 'G', 'D'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

    it('returns a correctly transposed list of chords when the difference is negative and some of the transposition is out of range of the array', () => {
        const chords = ['E', 'C', 'G', 'D'];
        const difference = -7;
        const expected = ['A', 'F', 'C', 'G'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

    it('returns a correctly transposed list of chords when the list includes minor chords', () => {
        const chords = ['Em', 'C', 'G', 'D'];
        const difference = -7;
        const expected = ['Am', 'F', 'C', 'G'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

    it('returns a correctly tranposed list of chords when the list includes aug, dim, sus, 7, or 9 chords', () => {
        const chords = ['Esus', 'Cdim', 'Gaug', 'D7', 'B9'];
        const difference = -7;
        const expected = ['Asus', 'Fdim', 'Caug', 'G7', 'E9'];
        const actual = transpose(chords, difference);

        expect(actual).to.deep.equal(expected);
    });

});