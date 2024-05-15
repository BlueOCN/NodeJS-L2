var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
//var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/bicicletas";


describe('Bicicletas API', () => {

    beforeEach(function(done){
        mongoose.connection.on('connected', console.error.bind(console, 'connected'));
        // mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));

        var mongoDB = 'mongodb://localhost:27017/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error: '));

        db.once('open', function(){
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({})
            .then(function(success){
                console.log(success);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done();
            });
        mongoose.disconnect();
    });


    describe('GET BICICLETAS /', () => {
        it('status 200', (done) => {
            request.get(base_url, function (error, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('status 200', (done) => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var headers = {'content-type' : 'application/json'};
            var bici = '{ "id": 10, "color": "caca", "modelo": "asteroide", "lat": 19.431278, "lng": -99.135789 }';

            request.post({
                headers: headers,
                url: base_url + '/create',
                body: bici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);

                expect(bici.color).toBe("caca");
                expect(bici.modelo).toBe("asteroide");
                expect(bici.ubicacion[0]).toBe(19.431278);
                expect(bici.ubicacion[1]).toBe(-99.135789);
                done();
            });
        });
    });
});















// beforeEach(function() {
//     Bicicleta.allBicis = [];
// });

// describe('Bicicletas API', () => {
//     // describe('GET BICICLETAS /', () => {
//     //     it('status 200', () => {
//     //         expect(Bicicleta.allBicis.length).toBe(0);

//     //         var bici = new Bicicleta(5, 'blanca', 'urbana', [19.432278, -99.133789]);
//     //         Bicicleta.add(bici);

//     //         expect(Bicicleta.allBicis.length).toBe(1);

//     //         request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
//     //             expect(response.statusCode).toBe(200);
//     //         });
//     //     });
//     // });

//     // describe('GET BICICLETAS /', () => {
//     //     it('status 200', () => {
//     //         expect(Bicicleta.allBicis.length).toBe(0);
    
//     //         var a = new Bicicleta(5, 'blanca', 'urbana', [19.432278, -99.133789]);
//     //         Bicicleta.add(a);
    
//     //         expect(Bicicleta.allBicis.length).toBe(1);
    
//     //         request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
//     //             expect(response.statusCode).toBe(200);
//     //         });
//     //     });
//     // });

//     // describe('POST BICICLETAS /create', () => {
//     //     it('status 200', (done) => {
//     //         expect(Bicicleta.allBicis.length).toBe(0);
//     //         var headers = {'content-type' : 'application/json'};
//     //         var bici = '{ "id": 10, "color": "caca", "modelo": "asteroide", "lat": 19.431278, "lng": -99.135789 }';

//     //         request.post({
//     //             headers: headers,
//     //             url: 'http://localhost:3000/api/bicicletas/create',
//     //             body: bici
//     //         }, function(error, response, body) {
//     //             expect(response.statusCode).toBe(200);
//     //             expect(Bicicleta.findById(10).color).toBe("caca");
//     //             expect(Bicicleta.findById(10).modelo).toBe("asteroide");
//     //             expect(Bicicleta.findById(10).ubicacion[0]).toBe(19.431278);
//     //             expect(Bicicleta.findById(10).ubicacion[1]).toBe(-99.135789);
//     //             expect(Bicicleta.allBicis.length).toBe(1);
//     //             done();
//     //         });
//     //     });
//     // });
// });