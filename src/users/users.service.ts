import {Component} from '@nestjs/common';

const people = require('./users');

@Component()
export class UsersService {

    getAllUsers() {
        return people.map((person, index) => ({
            name: person.name,
            position: person.position,
        }));
    }

    intializePusher() {
        const Pusher = require('pusher');
        const pusher = new Pusher({
            app_id: "1493926",
            key: "c1db973c8d270c54f43f",
            secret: "2be83b2eae2f4dcf3f10",
            cluster: "us2",
            encrypted: true
        });

        return pusher;
    }

    postLocation(user) {
        const Pusher = require('pusher');
        const {lat, lng} = user.position

        people.forEach((person, index) => {
            if (person.position.lat === user.position.lat) {
                people[index] = {...person, position: {lat, lng}};
                return this.intializePusher().trigger('map-geofencing', 'location', {person: people[index], people})
            }
        })
    }
}