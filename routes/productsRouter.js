const { Router } = require('express')
const Container = require('../container')
const products = new Container('productos.json')

//products.init();

const router = Router()

router.get("/", async (req, res) => {
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


router.post('/', async (req, res) => {
    const { title, price} = req.body

    await products.save({title, price})
    //await products.init()

    res.send({ message: "Producto agregado correctamente"})
}) 
/* router.post("/", (request, resolve) => {
    const newData = request.body
    products.save(newData);
    resolve.send("Product saved")
  }) */

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { field, value } = req.body
    
        await products.editById(Number(id), field, value)
    
        return res.send({ message: `El producto con id: ${id} se modifico exitosamente`})
    } catch (error) {
        throw error
    }

})

module.exports = router;