const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())


const orders = []

app.post('/order', (request, response) => {
    const {order, clientName, price} = request.body

    const newOrder = {id:uuid.v4(), order, clientName, price, status:"Em preparação"}

    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.put('/order/:id', (request, response) => {
    const { id } = request.params
    const {order, clientName, price, status} = request.body
    const updatedOrder = {id, order, clientName, price, status}
    const index = orders.findIndex(clientOrder => clientOrder.id === id)

    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }

    orders[index] = updatedOrder

    return response.json(updatedOrder)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params
    
    const index = orders.findIndex(clientOrder => clientOrder.id === id)

    if(index < 0) {
        response.status(404).json({error: "Order not found"})
    }

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex(clientOrder => clientOrder.id === id)

    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }

    return response.json(orders[index])
})

app.patch('/order/:id', (request, response) => {
    const { id } = request.params
    
    const index = orders.findIndex(clientOrder => clientOrder.id === id)
    
    
    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }

    orders[index].status = "Pronto"
    return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`🍔 Server started on port ${port}`)
})