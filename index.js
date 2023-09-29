const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
app.use(express.json())

const clientOrders = []

app.get('/order', (request, response) => {
    return response.json(clientOrders)
})

app.post('/order', (request,response) => {
    const {order, clientName, price} = request.body
    
    const newOrder = {id: uuid.v4(), order, clientName, price, status: "Em preparação"}

    clientOrders.push(newOrder)

    //return response.status(201).json({message: "New order added successfuly", newOrder}) --> Mostra a mensagem e os dados do novo pedido
    return response.status(201).json({message: "New order added successfuly"}).json(newOrder) // --> Mostra apenas a mensagem ao adicionar o pedido
})

app.put('/order/id:', (request, response) => {
    const {id} = request.params
    const {order, clientName, price} = request.body
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})
