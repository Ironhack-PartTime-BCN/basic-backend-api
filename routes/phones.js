const express = require('express')

const router = express.Router()
const Phone = require('../models/phone')

router.get('/phones', (req, res, next) => {
  Phone.find({})
    .then(phoneList => {
      res.status(200)
      res.json(phoneList)
    })
    .catch(next)
})

router.post('/phones', (req, res, next) => {
  const {brand, model, specs, image} = req.body

  const newPhone = new Phone({
    brand,
    model,
    specs: specs || [],
    image,
  })

  newPhone
    .save()
    .then(phone => {
      res.status(200)
      res.json({phone: newPhone})
    })
    .catch(next)
})

router.get('/phones/:id', (req, res, next) => {
  const {id} = req.params

  Phone.findById(id)
    .then(phone => {
      res.status(200)
      res.json(phone)
    })
    .catch(next)
})

router.put('/phones/:id', (req, res, next) => {
  const {id} = req.params
  const {brand, model, specs, image} = req.body
  const phoneToUpdate = {
    brand,
    model,
    specs,
    image,
  }

  Phone.findByIdAndUpdate(id, phoneToUpdate)
    .then(phone => {
      res.status(200)
      res.json({
        message: 'updated',
        phone,
      })
    })
    .catch(next)
})

router.delete('/phones/:id', (req, res, next) => {
  const {id} = req.params

  Phone.findByIdAndDelete(id)
    .then(phone => {
      res.status(200)
      res.json({
        message: 'deleted',
        phone,
      })
    })
    .catch(next)
})

module.exports = router
