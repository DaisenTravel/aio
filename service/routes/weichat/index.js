module.exports = app => {
  const router = require('express').Router()

  router.get('/token', async (req, res) => {
    res.json('tokeniii')
  })

  app.use('/api/weichat', router)
}
