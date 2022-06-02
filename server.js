const express = require('express')
const productsRouter = require('./routes/productsRouter')
//const { Router } = express;

const app = express()
/* const Container = require('./container')
const products = new Container('productos.json')
const router = Router(); */

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`);
});
server.on('error', error => console.log("Error on server", error));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('public'))


app.use('/api/productos', productsRouter)

app.get('/', (req, res) => {
    res.send(
        "<h1 style='color: black'>Hola! Aquí no hay nada! Para acceder a los datos hace lo siguiente:</h1> \n <h2>1) Agregá en la url /api/productos para acceder al listado completo de Productos</h2> \n <h2>2) Agregá /api/productos/(id de producto) para consultar un producto en particular</h2> \n <h2>3) Agregá /static/index.html para acceder al formulario donde podrás incorporar más productos</h2> "
    )
})

/* router.get("/", async (req, res) => {
    try {
        const data = await products.getAll();
      res.send(data)
    } catch (error) {
      res.status(500);
      res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const idNumber = Number(id)
    
    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parametro debe ser un numero'})
    }
    
    if (idNumber <= 0) {
        return res.status(400).send({ error: 'El parametro debe ser mayor a cero'})
    }
    
    if (idNumber > products.data.length) {
        return res.status(400).send({ error: 'El parametro esta fuera de rango'})
    }
    
    const prod = await products.getById(idNumber)

    if (!prod) {
        return res.status(400).send({ error: `El producto con el id: ${id} no existe`})
    }
    return res.send(prod)
})

router.post("/", (request, resolve) => {
    const newData = request.body
    products.save(newData);
    resolve.send("Product saved")
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { field, value } = req.body
    
        await products.editById(Number(id), field, value)
        
        return res.send({ message: `El producto con id: ${id} se modifico exitosamente`})
    } catch (error) {
        throw error
    }

}) */
