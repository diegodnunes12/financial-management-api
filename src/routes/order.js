const express = require('express')
const order = require('../models/order')

const router = new express.Router()

router.get('/orders', async (req, res) => {
    try {
        const orders = await order.find({})
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router