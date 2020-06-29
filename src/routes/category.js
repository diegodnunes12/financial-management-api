const express = require('express')
const category = require('../models/category')

const router = new express.Router()

router.post('/categories', async (req, res) => {
    const addCategory = new category(req.body)
    try {
        await addCategory.save()
        res.status(201).send(addCategory)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/categories', async (req, res) => {
    try {
        const getCategories = await category.find({})
        res.status(200).send(getCategories)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/categories/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const getCategory = await category.findById(_id)
        if(!getCategory){
            res.status(404).send('Categoria não encontrada')
        }
        else{
            res.status(200).send(getCategory)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} )

router.patch('/categories/:id', async (req, res) => {    
    const dataUpdate = Object.keys(req.body)
    const allowedUpdate = ['name']
    const isValidationOperation = dataUpdate.every( (dataUpdate) => allowedUpdate.includes(dataUpdate))

    if(!isValidationOperation){
        return res.status(400).send({error: 'Não foi possivel alterar algum campo especifico'})
    }
    else{
        try {
            const updateCategory = await category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

            if(!updateCategory){
                return res.status(404).send('Categoria não encontrada')
            }
            else{
                res.send(updateCategory)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
} )

router.delete('/categories/:id', async (req, res) => {    
    try {
        const deleteCategory = await category.findByIdAndDelete(req.params.id)

        if(!deleteCategory){
            return res.send(404).send('Categoria não encontrada')
        }
        else{
            res.send(deleteCategory)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} )

module.exports = router