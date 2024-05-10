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

describe('Bicicleta.updateById', () => {
    it('debe modificar la bici con id 1', () => {
        // Lista vacia
        expect(Bicicleta.allBicis.length).toBe(0);

        // Añadir elemento 1 y 2
        var a = new Bicicleta(1, 'rojo', 'urbana', [19.432608, -99.133209]);
        var b = new Bicicleta(2, 'blanca', 'urbana', [19.432278, -99.133789]);
        Bicicleta.add(a);
        Bicicleta.add(b);
        expect(Bicicleta.allBicis.length).toBe(2);

        // Modificar elemento 1
        var new_color = 'magenta';
        var new_model = 'fukimo';
        var new_location = [19.432108, -99.133809];
        Bicicleta.updateById(a.id, new_color, new_model, new_location);
        expect(Bicicleta.allBicis.length).toBe(2);

        // Corroborar atributos del elemento 1
        expect(a.id).toBe(1);
        expect(a.color).toBe(new_color);
        expect(a.modelo).toBe(new_model);
        expect(a.ubicacion).toBe(new_location);
        
    });
});
