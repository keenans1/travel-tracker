class Traveler {
    constructor(id, name, travelerType) {
        this.id = id;
        this.name = name;
        this.travelerType = travelerType;
    }

    getUserTrips(traveler, trips, destinations) {
        const allTrips = trips.trips.reduce((acc, trip) => {
            if (traveler.id === trip.userID) {
                acc.push(trip)
            }
            return acc;
        }, [])

        // const allDestinations = allTrips.reduce((acc, trip) => {
        //     destinations.destinations.forEach(destination => {
        //         if (trip.destinationID === destination.id) {
        //             acc.push(destination)
        //         }
        //     });
        //     return acc
        // }, [])

        return allTrips.reduce((acc, trip) => {
            destinations.destinations.forEach(destination => {
                if (trip.destinationID === destination.id) {
                    acc.push({ [destination.destination]: trip.date })
                }
            });
            return acc
        }, [])
    }
}

export default Traveler;