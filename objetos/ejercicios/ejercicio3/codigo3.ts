type Nullable<T> = T | null;

interface Objeto {
    nombre: string
    usar(objetivo: Personaje): string
}

class Pocion implements Objeto {
    nombre = "Poción"
    constructor(private cantidad: number) { }
    usar(objetivo: Personaje) {
        let curado = objetivo.curar(this.cantidad)
        return `${objetivo.nombre} se curó ${curado} puntos`
    }
}

class Tónico implements Objeto {
    nombre = "Tónico"
    constructor(private extra: number) { }
    usar(objetivo: Personaje) {
        objetivo.subirAtaque(this.extra)
        return `${objetivo.nombre} aumentó su ataque en ${this.extra}`
    }
}

abstract class Personaje {
    private vida: number
    private ataqueBase: number
    private inventario: Objeto[] = []
    private extraAtaque: number = 0
    static maxObjetos = 3

    constructor(public nombre: string, vida: number, ataque: number) {
        this.vida = vida
        this.ataqueBase = ataque
    }

    estaVivo() { return this.vida > 0 }
    obtenerVida() { return this.vida }
    poderAtaque() { return this.ataqueBase + this.extraAtaque }

    recibirDaño(cant: number) {
        let daño = Math.max(0, cant)
        this.vida = Math.max(0, this.vida - daño)
        return daño
    }

    curar(cant: number) {
        let antes = this.vida
        this.vida += cant
        return this.vida - antes
    }

    subirAtaque(cant: number) {
        this.extraAtaque += cant
    }

    agregarObjeto(o: Objeto) {
        if (this.inventario.length < Personaje.maxObjetos) {
            this.inventario.push(o)
            return true
        }
        return false
    }

    usarObjeto(i: number) {
        if (i < 0 || i >= this.inventario.length) return "No existe ese objeto"
        let obj = this.inventario.splice(i, 1)[0]
        return obj.usar(this)
    }

    verObjetos() {
        return this.inventario.map(o => o.nombre)
    }

    abstract atacar(objetivos: Personaje[]): void
}

class Guerrero extends Personaje {
    constructor(nombre: string) {
        super(nombre, 110, 16)
    }
    atacar(objetivos: Personaje[]) {
        if (!objetivos.length) return
        let obj = objetivos[0]
        let dmg = this.poderAtaque()
        obj.recibirDaño(dmg)
        console.log(`${this.nombre} golpea a ${obj.nombre} por ${dmg}`)
    }
}

class Mago extends Personaje {
    constructor(nombre: string) {
        super(nombre, 90, 12)
    }
    atacar(objetivos: Personaje[]) {
        let cant = Math.min(2, objetivos.length)
        for (let i = 0; i < cant; i++) {
            let obj = objetivos[i]
            let mult = 0.6 + Math.random()
            let dmg = Math.round(this.poderAtaque() * mult)
            obj.recibirDaño(dmg)
            console.log(`${this.nombre} lanza hechizo a ${obj.nombre} por ${dmg}`)
        }
    }
}

class Arquero extends Personaje {
    constructor(nombre: string) {
        super(nombre, 100, 14)
    }
    atacar(objetivos: Personaje[]) {
        if (!objetivos.length) return
        let obj = objetivos[0]
        if (Math.random() < 0.25) {
            console.log(`${this.nombre} falló el tiro`)
            return
        }
        let dmg = Math.round(this.poderAtaque() * 1.5)
        obj.recibirDaño(dmg)
        console.log(`${this.nombre} dispara a ${obj.nombre} por ${dmg}`)
    }
}

class Combate {
    static pelear(jugadores: Personaje[]) {
        let vivos = () => jugadores.filter(p => p.estaVivo())
        let ronda = 1
        while (vivos().length > 1) {
            console.log(`\nRonda ${ronda}`)
            for (let p of vivos()) {
                let enemigos = vivos().filter(x => x != p)
                if (!enemigos.length) break
                if (p instanceof Mago && enemigos.length > 1) {
                    p.atacar([enemigos[0], enemigos[1]])
                } else {
                    p.atacar([enemigos[Math.floor(Math.random() * enemigos.length)]])
                }
            }
            ronda++
        }
        let ganador = vivos()[0]
        if (ganador) console.log(`\nGanador: ${ganador.nombre} con ${ganador.obtenerVida()} de vida`)
    }
}

let a = new Guerrero("Sofi")
let b = new Mago("Luna")
let c = new Arquero("Nico")

b.agregarObjeto(new Pocion(30))
b.agregarObjeto(new Tónico(5))
console.log(b.verObjetos())
console.log(b.usarObjeto(0))
console.log(b.usarObjeto(0))

Combate.pelear([a, b, c])
