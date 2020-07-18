module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')

  return async (req, res, next) => {
    try {
      // console.log(req.headers)
      // console.log(req.headers.authorization)
      const token = String(req.headers.authorization || '').split(' ').pop()
      assert(token, 401, '非法令牌')
      // console.log(token)
      const { id } = jwt.verify(token, req.app.get('secret'))
      assert(id, 401, '非法标识')
      // console.log(id)
      const user = await User.findById(id)
      assert(user, 401, '非法帐号')
      req.user = user
    } catch (err) {
      // console.log('err:', err)
      // res.status(401).json({ err })
      assert(!err, 401, '非法令牌')
      // assert(!err, 401, '非法令牌', { code: 401, tip: '建议使用中控器', description: '默认 7200 秒' })
    }
    await next()
  }
}