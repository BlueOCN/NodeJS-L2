var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

beforeEach(function() {
    Bicicleta.allBicis = [];
});

describe('Bicicletas API', () => {
    describe('GET BICICLETAS /', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var bici = new Bicicleta(5, 'blanca', 'urbana', [19.432278, -99.133789]);
            Bicicleta.add(bici);

            expect(Bicicleta.allBicis.length).toBe(1);

            request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
                expect(response.statusCode).toBe(200);
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
                url: 'http://localhost:3000/api/bicicletas/create',
                body: bici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("caca");
                expect(Bicicleta.findById(10).modelo).toBe("asteroide");
                expect(Bicicleta.findById(10).ubicacion[0]).toBe(19.431278);
                expect(Bicicleta.findById(10).ubicacion[1]).toBe(-99.135789);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();
            });
        });
    });
});