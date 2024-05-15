
var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');


describe('Testing Usuarios', function(){
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
    })

    afterEach(function(done){
        
        Reserva.deleteMany({})
            .then(function(success){
                console.log('Dropped Reserva:\t', success);

                Usuario.deleteMany({})
                    .then(function(success){
                        console.log('Dropped Usuario:\t', success);

                        Bicicleta.deleteMany({})
                            .then(function(success){
                                console.log('Dropped Bicicleta:\t', success);
                                done();
                            })
                            .catch(function(err) {
                                console.log(err);
                                done();
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                        done();
                    });
            })
            .catch(function(err) {
                console.log(err);
                done();
            });
    });


    describe('Cuando un Usuario reserva una bici', () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        it('debe existir la reserva', (done) =>{
            const usuario = new Usuario({nombre: 'Ezequiel'});
            // console.log('User: \n',usuario);
            usuario.save()
                .then(function(result){
                    console.log('User saved: \n', result);
                })
                .catch(function (err) {
                    console.log(err);
                });

            const bicicleta = new Bicicleta({code: 1, color: "verde", modelo: "montaña"});
            // console.log('Bicicle: \n', bicicleta);
            bicicleta.save()
                .then(function(result){
                    console.log('Bicicle saved: \n', result);
                })
                .catch(function (err) {
                    console.log(err);
                });

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            
            usuario.reservar(bicicleta.id, hoy, mañana, function(){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec()
                    .then(function(result){
                        // console.log('Query: ', result);
                        console.log('Reserva[0]: ', result[0]);
                        expect(result.length).toBe(1);
                        expect(result[0].diasDeReserva()).toBe(2);
                        expect(result[0].bicicleta.code).toBe(1);
                        expect(result[0].usuario.nombre).toBe(usuario.nombre);
                        done();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            });
        });
    });
});