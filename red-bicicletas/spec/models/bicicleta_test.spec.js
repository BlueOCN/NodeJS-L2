var Bicicleta = require('../../models/bicicleta');

beforeEach(function() {
    Bicicleta.allBicis = [];
});

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici = new Bicicleta(99, 'blanca', 'urbana', [19.432278, -99.133789]);
        Bicicleta.add(bici);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devovler la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [19.432608, -99.133209]);
        var b = new Bicicleta(2, 'blanca', 'urbana', [19.432278, -99.133789]);
        Bicicleta.add(a);
        Bicicleta.add(b);

        var target = Bicicleta.findById(1);
        expect(target.id).toBe(1);
        expect(target.color).toBe(a.color);
        expect(target.modelo).toBe(a.modelo);

    });
});

describe('Bicicleta.removeById', () => {
    it('debe remover la bici con id 1', () => {
        // Lista vacia
        expect(Bicicleta.allBicis.length).toBe(0);

        // Añadir 1 elemento
        var a = new Bicicleta(1, 'rojo', 'urbana', [19.432608, -99.133209]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);

        // Remover elemnto
        Bicicleta.removeById(a.id)
        expect(Bicicleta.allBicis.length).toBe(0);

    });
});
