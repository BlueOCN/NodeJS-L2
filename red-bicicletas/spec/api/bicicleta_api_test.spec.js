var Bicicleta = require('../../models/bicicleta');
var request = require('request');


describe('Bicicletas API', () => {
    describe('GET BICICLETAS /', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var bici = new Bicicleta(5, 'blanca', 'urbana', [19.432278, -99.133789]);
            Bicicleta.add(bici);

            expect(Bicicleta.allBicis.length).toBe(1);

            request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
                console.log(response);
                expect(response.statusCode).toBe(200);
            });
        });
    });
});