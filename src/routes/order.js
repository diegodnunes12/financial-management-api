const express = require('express')
const order = require('../models/order')

const router = new express.Router()

router.post('/orders', async (req, res) => {
    const addOrder = new order(req.body)
    try {
        await addOrder.save()
        res.status(201).send(addOrder)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/orders', async (req, res) => {
    try {
        const getOrders = await order.find({})
        res.status(200).send(getOrders)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/orders/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const getOrder = await order.findById(_id)
        if(!getOrder){
            res.status(404).send('Lançamento não encontrado')
        }
        else{
            res.status(200).send(getOrder)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} )

router.patch('/orders/:id', async (req, res) => {    
    const dataUpdate = Object.keys(req.body)
    const allowedUpdate = ['date', 'name', 'description', 'value', 'revenue', 'settled']
    const isValidationOperation = dataUpdate.every( (dataUpdate) => allowedUpdate.includes(dataUpdate))

    if(!isValidationOperation){
        return res.status(400).send({error: 'Não foi possivel alterar algum campo especifico'})
    }
    else{
        try {
            const updateOrder = await order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

            if(!updateOrder){
                return res.status(404).send('Lançamento não encontrado')
            }
            else{
                res.send(updateOrder)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
} )

router.delete('/orders/:id', async (req, res) => {    
    try {
        const deleteOrder = await order.findByIdAndDelete(req.params.id)

        if(!deleteOrder){
            return res.send(404).send('Lançamento não encontrado')
        }
        else{
            res.send(deleteOrder)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} )

module.exports = router