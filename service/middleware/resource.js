module.exports = options => {
  const assert = require('http-assert')
  return async (req, res, next) => {
    try {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../models/${modelName}`)
      // console.log(modelName)
    } catch (err) {
      // console.log('err:', err)
      // res.status(404).json({ err })
      assert(!err, 404, '非法资源')
    }
    next()
  }
}