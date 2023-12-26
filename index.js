import express from 'express'
import { v4 } from 'uuid'
import cors from 'cors'


const app = express()
const port = 3001

app.use(express.json())
app.use(cors())


const orders = []

const checkOrdersId = (request, response, next) => {
    const { id } = request.params
    
    const index = orders.findIndex(clientOrder => clientOrder.id === id)

    if(index < 0) {
        return response.status(404).json({error: "Order not found"})
    }

    request.orderId = id
    request.orderIndex = index
    next()
}

const checkRouteMethod = (request, response, next) => {
    const routeType = request.method

    console.log(`${routeType} - /order`)
    next()
}

app.use(checkRouteMethod)

app.post('/order', (request, response) => {
    const {order, clientName, price} = request.body

    const newOrder = {id:v4(), order, clientName, price, status:"Em preparação"}

    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.put('/order/:id', checkOrdersId, (request, response) => {
    const index = request.orderIndex
    const {order, clientName, price, status} = request.body
    
    const  id  = request.orderId
    const updatedOrder = {id, order, clientName, price, status}
    

    orders[index] = updatedOrder

    return response.json(updatedOrder)
})

app.delete('/order/:id', checkOrdersId, (request, response) => {
    
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', checkOrdersId, (request, response) => {
    const  index = request.orderIndex

    return response.json(orders[index])
})

app.patch('/order/:id', checkOrdersId, (request, response) => {

    const index = request.orderIndex

    orders[index].status = "Pronto"
    return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`🍔 Server started on port ${port}`)
})