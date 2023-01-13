class Traveler {
    constructor(id, name, travelerType) {
        this.id = id;
        this.name = name;
        this.travelerType = travelerType;
    }

    getTravelerTrips(traveler, trips, destinations, status) {
        return trips.trips
            .reduce((acc, trip) => {
                if (traveler.id === trip.userID && trip.status === status) {
                    acc.push(trip)
                }
                return acc;
            }, [])
            .reduce((acc, trip) => {
                destinations.destinations.forEach(destination => {
                    if (trip.destinationID === destination.id) {
                        acc.push({ [destination.destination]: trip.date })
                    }
                });
                return acc
            }, [])
    }

    // getTravelerTrips(traveler, trips, destinations) {
    //     return trips.trips
    //         .reduce((acc, trip) => {
    //             if (traveler.id === trip.userID) {
    //                 acc.push(trip)
    //             }
    //             return acc;
    //         }, [])
    //         .reduce((acc, trip) => {
    //             destinations.destinations.forEach(destination => {
    //                 if (trip.destinationID === destination.id) {
    //                     acc.push({ [destination.destination]: trip.date })
    //                 }
    //             });
    //             return acc
    //         }, [])
    // }

    getTotalSpentForYear(traveler, trips, destinations, year) {
        return trips.trips
            .reduce((acc, trip) => {
                if (traveler.id === trip.userID) {
                    acc.push(trip)
                }
                return acc;
            }, [])
            .filter(trip => {
                const dateSplit = trip.date.split('/')
                if (dateSplit[0] === year) {
                    return trip
                }
            })
            .reduce((acc, trip) => {
                const specificDestination = destinations.destinations.find(destination => trip.destinationID === destination.id)
                if (specificDestination) {
                    const flightCost = trip.travelers * specificDestination.estimatedFlightCostPerPerson;
                    const hotelCost = trip.duration * specificDestination.estimatedLodgingCostPerDay;
                    const beforeFee = flightCost + hotelCost;
                    const afterFee = Number((beforeFee * 1.1).toFixed(0));
                    acc += afterFee
                }
                return acc
            }, 0)
    }
}

export default Traveler;