var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + " | color: " + this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(aBici) {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function (aBiciId) {
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici;
    else
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
}

Bicicleta.removeById = function (aBiciId) {
    for(var i = 0; i < Bicicleta.allBicis.length; i++){
        if (Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

Bicicleta.updateById = function(aBiciId, aBiciColor, aBiciModelo, aBiciUbiS) {
    if (aBiciId < 1){
        throw new Error(`No existen identificadores menores o iguales a cero ${aBiciId}`);
    } else if (!Bicicleta.allBicis.find(x => x.id == aBiciId)){
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
    } else{
        Bicicleta.allBicis[aBiciId-1].color = aBiciColor;
        Bicicleta.allBicis[aBiciId-1].modelo = aBiciModelo;
        Bicicleta.allBicis[aBiciId-1].ubicacion = aBiciUbiS;
    }
}

/* var a = new Bicicleta(1, 'rojo', 'urbana', [19.432608, -99.133209]);
var b = new Bicicleta(2, 'blanca', 'urbana', [19.432278, -99.133789]);

Bicicleta.add(a);
Bicicleta.add(b); */

module.exports = Bicicleta;