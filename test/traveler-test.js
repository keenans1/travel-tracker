import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';

describe('Traveler', function () {
    const travelers = {
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
    const trips = {
        trips: [
            {
                id: 1,
                userID: 44,
                destinationID: 49,
                travelers: 1,
                date: "2022/09/16",
                duration: 8,
                status: "pending",
                suggestedActivities: []
            },
            {
                id: 2,
                userID: 44,
                destinationID: 1,
                travelers: 5,
                date: "2021/10/04",
                duration: 18,
                status: "approved",
                suggestedActivities: []
            },
            {
                id: 3,
                userID: 44,
                destinationID: 3,
                travelers: 4,
                date: "2022/05/22",
                duration: 17,
                status: "approved",
                suggestedActivities: []
            }
        ]
    }
    const destinations = {
        destinations: [
            {
                id: 1,
                destination: "Lima, Peru",
                estimatedLodgingCostPerDay: 70,
                estimatedFlightCostPerPerson: 400,
                image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
                alt: "overview of city buildings with a clear sky"
            },
            {
                id: 2,
                destination: "Stockholm, Sweden",
                estimatedLodgingCostPerDay: 100,
                estimatedFlightCostPerPerson: 780,
                image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                alt: "city with boats on the water during the day time"
            },
            {
                id: 3,
                destination: "Sydney, Austrailia",
                estimatedLodgingCostPerDay: 130,
                estimatedFlightCostPerPerson: 950,
                image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                alt: "opera house and city buildings on the water with boats"
            },
            {
                id: 49,
                destination: "Castries, St Lucia",
                estimatedLodgingCostPerDay: 650,
                estimatedFlightCostPerPerson: 90,
                image: "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
                alt: "aerial photography of rocky mountain under cloudy sky"
            }
        ]
    }

    it('should be a function', () => {
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

    it('should show all of a specific users trips, where and when', () => {
        const traveler = new Traveler(44, 'John Doe', 'skier');
        const travelerTrips = traveler.getTravelerTrips(traveler, trips, destinations, 'approved');
        expect(travelerTrips).to.deep.equal([
            { "Lima, Peru": "2021/10/04" },
            { "Sydney, Austrailia": "2022/05/22" }
        ]);
    })

    it('should calculate a travelers total amount spent for a specific year', () => {
        const traveler = new Traveler(44, 'John Doe', 'skier');
        const totalSpent = traveler.getTotalSpentForYear(traveler, trips, destinations, '2022');
        expect(totalSpent).to.equal(12430);
    })
});