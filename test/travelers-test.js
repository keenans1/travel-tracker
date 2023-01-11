import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
import Travelers from '../src/travelers';
import Destinations from '../src/destinations';
import Trips from '../src/trips';

describe('Travelers', function () {
    it('should be a function', function () {
        expect(Travelers).to.be.a('function');
    });
});