const express = require('express')
const productsRouter = require('./routes/productsRouter')

const app = express()


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


