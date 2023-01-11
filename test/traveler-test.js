import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler'

describe('Traveler', function () {

    const travelers = {
        travelers: {
            travelers: [
                {
                    id: 1,
                    name: "Ham Leadbeater",
                    travelerType: "relaxer"
                },
                {
                    id: 2,
                    name: "Rachael Vaughten",
                    travelerType: "thrill-seeker"
                },
                {
                    id: 3,
                    name: "Sibby Dawidowitsch",
                    travelerType: "shopper"
                },
                {
                    id: 4,
                    name: "Leila Thebeaud",
                    travelerType: "photographer"
                },
                {
                    id: 5,
                    name: "Tiffy Grout",
                    travelerType: "thrill-seeker"
                }
            ]
        }
    }

    it('should be a function', function () {
        expect(Traveler).to.be.a('function');
    });

    it('should have an id', function () {
        const traveler = new Traveler(5);
        expect(traveler.id).to.equal(5);
    });

    it('should have a name', function () {
        const traveler = new Traveler(5, 'John Doe');
        expect(traveler.name).to.equal('John Doe');
    });

    it('should have a travelerType', function () {
        const traveler = new Traveler(5, 'John Doe', 'skier');
        expect(traveler.travelerType).to.equal('skier');
    });
});