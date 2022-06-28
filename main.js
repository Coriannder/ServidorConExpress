const fs = require('fs')

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
        this.id = 0;
        this.arrayProductos = []
        this.crearArchivoProductosSync()
        this.arrayProductos = []
    }


    crearArchivoProductosSync(){
        try {
            if(!fs.existsSync(this.fileName)){
                fs.writeFileSync(this.fileName, '')
                //console.log('Archivo creado')
            }//else{ console.log('EL archivo ya existe')}
        } catch(error) {
            console.log(error)
        }
    }

    leerArchivoProductos(){
        let archivoLeido = fs.readFileSync(this.fileName, 'utf8')
        if(archivoLeido == undefined) archivoLeido = "{}";
        return archivoLeido;
    }

    getAll(){
        return JSON.parse(this.leerArchivoProductos())
    }

    guardarProducto(objetoProducto){
        this.id++
        this.arrayProductos.push({id: this.id, ... objetoProducto })
        fs.writeFileSync(this.fileName, JSON.stringify(this.arrayProductos, null, 2))
    }
    getById(id){
        let producto = this.getAll().find(prod => prod.id === id)
        if(producto == undefined) producto = 'Producto no encontrado'
        return producto;
    }

    getRandom(){
        let idRandom = Math.floor(Math.random()*(this.getAll().length))+1
        return (this.getById(idRandom))
    }

}


let items = [
    {
        category: "torta",
        title: "Torta de mandarinas",
        precio: 1800,
        pictureUrl: "https://picsum.photos/id/1080/500/500",
        descripcion: "Bizcocho de mandarinas relleno de curd de naranja y mandarina, cubierto con frosting de queso, decorado con merenguitos caseros, mandarinas confitadas y almendras."
    },
    {
        category: "torta",
        title: "Chocotorta bomba",
        precio: 2200,
        pictureUrl:"https://picsum.photos/id/1081/500/500",
        descripcion: "Bizcocho de chocolate super húmedo, relleno de frutos rojos con chantilly y crema de dulce de leche con pasta de maní y crocante de maní, cubierto con ganache de chocolate, decorado con crema, frutos rojos frescos y trufas de chocolate rellenas de frutos rojos."
    },
    {
        category: "torta",
        title: "Carrot cake",
        precio: 1800,
        pictureUrl:"https://picsum.photos/id/900/500/500",
        descripcion: "Pastel de zanahorias y almendras aromatizado con canela, vainilla, jengibre y nuez moscada, relleno y cubierto con frosting de queso, decorado con zanahoria cruda rallada y crocante de almendras."
    },
    {
        category: "torta",
        title: "Torta de frutilla y chocolate",
        precio: 900,
        pictureUrl:"https://picsum.photos/id/25/500/500",
        descripcion: "Masa sablée de chocolate, rellena de curd de naranja, cubierta con frutillas frescas, gajos de naranja a vivo y coco."
    },
    {
        category: "tarta",
        title: "CheeseCake de arandanos",
        precio: 1300,
        pictureUrl:"https://picsum.photos/id/2/500/500",
        descripcion: "Base de galletas de chocolate, con cheese cream de arándanos cubierta con compota de arándanos, almendras, gajos de naranja secos y quinotos.",
    },
    {
        category:"tarta",
        title: "Tarta de frutos rojos",
        precio: 1300,
        pictureUrl:"https://picsum.photos/id/500/500/",
        descripcion: "Base de galletas de chocolate, con cheese cream de limón y cheese cream de frambuesa, cubierta de compota de frutos rojos y chocolate blanco."
    },
];


const contenedor1 =  new Contenedor('productos.txt')
items.forEach(producto => contenedor1.guardarProducto(producto));


const productHTML = (producto) =>{
    return(`<div>
                <span>${producto.id})<span>
                <span> ${producto.title}<span>
                <span> $${producto.precio}<span>
            </div>`
    )
}
let cadena = ''
contenedor1.getAll().forEach(elem => {
    cadena += productHTML(elem)
})



const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('<h1>Bienvenidos y bienvenidas</h1>')})

app.get('/productos', (req, res)=>{
    res.send(cadena)})

app.get('/productoRandom',(req, res)=>{
    res.send(productHTML(contenedor1.getRandom()))
} )


const PORT = 8080

const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
