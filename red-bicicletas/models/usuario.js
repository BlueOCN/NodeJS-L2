var mongoose = require('mongoose');
const Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String
});

// usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
//     var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
//     console.log(reserva);
//     reserva.save(cb);
// }

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    // console.log(reserva);
    // reserva.save(cb);

    reserva.save()
        .then(function(result){
            console.log('Reserva saved: ', result);
            cb()
        })
        .catch(function (err) {
            console.log(err);
        });
}


module.exports = mongoose.model('Usuario', usuarioSchema);