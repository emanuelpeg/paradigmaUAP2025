/*
El ejercicio pide crear un sistema de combate para un juego RPG donde se puedan crear personajes con vida, ataque y nombre,
que tengan un inventario de objetos para mejorar habilidades o curarse, y que puedan pelear entre sí hasta que quede un solo ganador.
Cada tipo de personaje (Guerrero, Mago, Arquero) tiene un estilo de ataque distinto, y los objetos pueden cambiar la vida o el ataque.
El sistema debe usar POO mostrando: encapsulamiento (atributos privados y controlados), composición (personajes “tienen” objetos),
herencia (subclases de personajes) y polimorfismo (diferentes personajes o items reaccionan distinto a los mismos métodos).
Además, hay que probar combates simples y grupales, y que los personajes puedan usar sus items correctamente.
*/
// ======================
// PILAR 1: ENCAPSULAMIENTO
// ======================

// Declaro la clase Personaje: es el "molde" para crear personajes del juego
class Personaje {
    // nombre del personaje (privado: sólo se accede desde la clase)
    private nombre: string;
    // vida actual del personaje (privado)
    private vida: number;
    // valor de ataque base (privado)
    private ataque: number;
    // inventario: arreglo de Items, empieza vacío (privado). Esto es composición: el personaje "tiene" items.
    private inventario: Item[] = []; // COMPOSICIÓN

    // Constructor: se ejecuta al crear un nuevo personaje con new Personaje(...)
    constructor(nombre: string, vida: number, ataque: number) {
        // inicializo los atributos con lo que me pasan
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
    }

    // Getters y setters: métodos públicos para leer/modificar sin exponer directamente los atributos

    // Devuelve el nombre del personaje
    public getNombre(): string {
        return this.nombre;
    }

    // Devuelve la vida actual del personaje
    public getVida(): number {
        return this.vida;
    }

    // Modifica la vida del personaje; se asegura que nunca sea negativa
    public setVida(valor: number): void {
        this.vida = Math.max(0, valor); // nunca negativo
    }

    // Devuelve el ataque actual
    public getAtaque(): number {
        return this.ataque;
    }

    // Aumenta el ataque (por ejemplo cuando usa un item)
    public aumentarAtaque(valor: number): void {
        this.ataque += valor;
    }

    // -------------------
    // Inventario: controlado desde dentro de la clase (encapsulado)
    // -------------------

    // Agrega un item al inventario si hay menos de 3 items
    public agregarItem(item: Item): void {
        if (this.inventario.length < 3) {
            this.inventario.push(item);
        }
    }

    // Usa (consume) el primer item del inventario si existe
    public usarItem(): void {
        if (this.inventario.length > 0) {
            // shift() saca y devuelve el primer elemento del array
            const item = this.inventario.shift()!;
            // Llamo al método usar del item. Aquí aplica polimorfismo: cada Item hace algo distinto.
            item.usar(this);
        }
    }

    // -------------------
    // Método de ataque "general" (puede sobreescribirse en subclases)
    // -------------------

    // Ataca a otro personaje y le reduce la vida usando sus getters y setters (respeta encapsulamiento)
    public atacar(objetivo: Personaje): void {
        objetivo.setVida(objetivo.getVida() - this.ataque);
        console.log(`${this.nombre} atacó a ${objetivo.getNombre()}`);
    }

    // Indica si el personaje sigue vivo (vida > 0)
    public estaVivo(): boolean {
        return this.vida > 0;
    }
}

// ======================
// PILAR 2: HERENCIA
// ======================

// Guerrero hereda de Personaje y redefine el comportamiento de atacar
class Guerrero extends Personaje {
    atacar(objetivo: Personaje): void {
        // Golpe directo con daño igual al ataque base
        objetivo.setVida(objetivo.getVida() - this.getAtaque());
        console.log(`${this.getNombre()} golpea fuerte a ${objetivo.getNombre()}`);
    }
}

// Mago hereda de Personaje y su ataque es variable (puede pegar más o menos)
class Mago extends Personaje {
    atacar(objetivo: Personaje): void {
        // Daño aleatorio entre 0 y (ataque * 2 - 1)
        const daño = Math.floor(Math.random() * (this.getAtaque() * 2));
        objetivo.setVida(objetivo.getVida() - daño);
        console.log(`${this.getNombre()} lanza un hechizo a ${objetivo.getNombre()} por ${daño}`);
    }
}

// Arquero hereda de Personaje y puede fallar: a veces pega doble, a veces falla
class Arquero extends Personaje {
    atacar(objetivo: Personaje): void {
        // 70% de probabilidad de acertar (random > 0.3)
        if (Math.random() > 0.3) {
            // daño potente (doble ataque)
            objetivo.setVida(objetivo.getVida() - this.getAtaque() * 2);
            console.log(`${this.getNombre()} acierta una flecha a ${objetivo.getNombre()}`);
        } else {
            // falla
            console.log(`${this.getNombre()} falló el disparo`);
        }
    }
}

// ======================
// PILAR 3: POLIMORFISMO con Items
// ======================

// Interfaz Item: define que todo item debe tener un método usar(personaje)
interface Item {
    usar(personaje: Personaje): void;
}

// Pocion implementa Item: al usarla cura vida al personaje
class Pocion implements Item {
    usar(personaje: Personaje): void {
        // suma vida (usa el setter para respetar la regla de no usar vida negativa)
        personaje.setVida(personaje.getVida() + 30);
        console.log(`${personaje.getNombre()} usó poción y recuperó vida`);
    }
}

// Espada implementa Item: al usarla aumenta el ataque del personaje
class Espada implements Item {
    usar(personaje: Personaje): void {
        personaje.aumentarAtaque(10);
        console.log(`${personaje.getNombre()} equipó una espada y aumentó ataque`);
    }
}

// ======================
// PILAR 4: COMPOSICIÓN (Combate contiene personajes)
// ======================

// Clase Combate: se encarga de manejar un enfrentamiento entre varios personajes
class Combate {
    // arreglo privado de personajes que participan
    private personajes: Personaje[];

    // constructor recibe los personajes que van a pelear
    constructor(personajes: Personaje[]) {
        this.personajes = personajes;
    }

    // iniciar: ejecuta la lógica de rondas hasta que quede 1 vivo
    iniciar(): void {
        // mientras haya más de 1 vivo, se siguen turnos
        while (this.personajes.filter(p => p.estaVivo()).length > 1) {
            // recorro cada personaje por turno
            for (let atacante of this.personajes) {
                // si el atacante está muerto, saltealo
                if (!atacante.estaVivo()) continue;
                // busco un objetivo vivo que no sea el atacante
                let objetivo = this.personajes.find(p => p !== atacante && p.estaVivo());
                // si encontré objetivo, el atacante lo ataca
                if (objetivo) {
                    atacante.atacar(objetivo);
                }
            }
        }

        // cuando termina, busco al ganador (el que sigue vivo)
        const ganador = this.personajes.find(p => p.estaVivo());
        console.log(`El ganador es ${ganador?.getNombre()}`);
    }
}

// ======================
// PRUEBA DEL SISTEMA (ejemplo práctico)
// ======================

const guerrero = new Guerrero("Conan", 100, 15);
const mago = new Mago("Merlín", 90, 12);
const arquero = new Arquero("Legolas", 80, 18);

guerrero.agregarItem(new Pocion());
mago.agregarItem(new Espada());

guerrero.usarItem();
mago.usarItem();

const combate = new Combate([guerrero, mago, arquero]);
combate.iniciar();
