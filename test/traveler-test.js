import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler'

describe('Traveler', function () {
    it('should be a function', function () {
        expect(Traveler).to.be.a('function');
    });
});