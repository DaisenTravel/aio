module.exports = app => {
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    const User = require('../../models/User')
    const fs = require('fs')
    const path = require('path')
    const expire = app.get('expiresIn')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const mongoose = require("mongoose")
    const express = require('express')
    const router = express.Router({ mergeParams: true })

    // 帐号注册
    app.post('/api/auth/register', async (req, res) => {
        const { email, password } = req.body
        // 1.根据邮箱找用户
        const user = await User.findOne({ email })
        // console.log(user)
        // const user = await User.findOne({ email, enabled: true }).select('+password')
        // assert(user.enabled, 422, '帐号已禁用')
        assert(!user, 422, '帐号已存在')
        const data = await User.create(req.body)
        res.json(data)
    })

    // 帐号登录
    app.post('/api/auth/login', async (req, res) => {
        const { email, password } = req.body
        // 1.根据邮箱找用户
        const user = await User.findOne({ email }).select('+password')
        // console.log(user)
        // const user = await User.findOne({ email, enabled: true }).select('+password')
        assert(user, 422, '帐号不存在')
        // console.log(user.enabled)
        assert(user.enabled, 422, '帐号已被禁用')
        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token
        // const token = jwt.sign({ id: user._id }, app.get('secret'))  //无过期时间，客户端不用中控器
        const token = jwt.sign({ id: user._id }, app.get('secret'), { expiresIn: expire })    //有过期时间，客户端必用中控器
        res.json({ expire, token })
        // res.json({ data: { expire, token } })
    })

    // 创建资源
    router.post('/', async (req, res) => {
        // console.log(req.Model.modelName)
        if (req.Model.modelName === 'User') {
            const { email } = req.body
            const user = await User.findOne({ email })
            // console.log(user)
            assert(!user, 409, '帐号重复')
        }
        // console.log(req.body)
        const data = await req.Model.create(req.body)
        assert(data, 400, '创建失败')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 更新资源
    router.put('/:id', async (req, res) => {
        const data = await req.Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        assert(data, 400, '更新失败')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 删除资源
    router.delete('/:id', async (req, res) => {
        // 物理删除
        // const data = await req.Model.findByIdAndDelete(req.params.id)

        // 逻辑删除
        const data = await req.Model.findByIdAndUpdate(req.params.id, { enabled: false })
        assert(data, 400, '删除失败')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const data = await req.Model.find({ enabled: true }).setOptions(queryOptions)//.limit(100)
        // const data = await req.Model.find({ enabled: true }).setOptions(queryOptions)//.limit(100)
        // assert(data, 404, '资源为空')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
        // res.json({ code: 200, data, user: req.user })
    })

    // 资源详情
    router.get('/:id', async (req, res) => {
        // console.log(req.params.id)
        const data = await req.Model.findById(req.params.id)
        assert(data, 404, '非法资源')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 资源详情子集合
    router.get('/:id/patient', async (req, res) => {
        // console.log(req.params.id)
        // const data = await req.Model.find({ patient: mongoose.Types.ObjectId(req.params.id), enabled: true })
        // console.log(req.params.id)
        assert(data, 404, '非法资源')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 具体资源详情
    router.get('/patient/:patientid', async (req, res) => {
        // console.log(req.params.patientid)
        const data = await req.Model.findOne({ pid: req.params.patientid })
        // console.log(req.params.id)
        assert(data, 404, '非法资源')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 具体资源详情
    router.get('/treatment/:patientid', async (req, res) => {
        // console.log(req.params.patientid)
        const data = await req.Model.find({ patient: req.params.patientid }).populate('plan')
        // console.log(req.params.id)
        assert(data, 404, '非法资源')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 具体资源详情
    router.get('/:id/patient/:planid', async (req, res) => {
        // console.log('patientid:', req.params.id, 'planid:', req.params.planid)
        // console.log('planid:', req.params.planid)
        const data = await req.Model.find({ patient: mongoose.Types.ObjectId(req.params.id), plan: mongoose.Types.ObjectId(req.params.planid), enabled: true })
        // console.log(data)
        assert(data, 404, '非法资源')
        res.json(data)
        // res.json({ data })
        // res.json({ code: 200, data })
    })

    // 文件上传
    let dirname = ''
    let pathname = ''
    const multer = require('multer')
    // const storage = multer.memoryStorage({
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const dt = new Date()
            dirname = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
            pathname = `${__dirname}/../../uploads/${dirname}`
            mkdirs(pathname, () => { cb(null, pathname) })
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    })
    const upload = multer({ storage })
    app.post('/api/file/upload', upload.single('file'), async (req, res) => {
        // app.post('/api/file/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3001/uploads/${dirname}/${file.filename}`
        // console.log(file)
        res.send(file)
    })

    // 校验中间件
    // app.use('/api/rest/:resource', resourceMiddleware(), router) //不用token验证
    app.use('/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)  //使用token验证

    // 全局错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err)
        // console.log(err.statusCode, err.message)

        // return res.send({ err })
        // return res.json({ err })

        return res.status(err.statusCode || 500).send(err)
        // return res.status(err.statusCode || 500).send("jjjjjjjjjjjjjjj")

        // return res.status(err.statusCode || 500).json({
        //     message: err.message
        // })

        // return res.status(err.statusCode || 500).json({
        //     code: err.statusCode,
        //     data: {
        //         message: err.message
        //     }
        // })

        // return res.status(err.statusCode || 500).json({
        //     code: err.statusCode,
        //     data: {
        //         message: err.message
        //     }
        // })

        // return res.status(err.statusCode || 500).json({
        //     code: err.statusCode,
        //     data: {
        //         message: err.message,
        //         tip: err.tip,
        //         description: err.description
        //     }
        // })
    })

    function mkdirs(dirname, callback) {
        fs.exists(dirname, (exists) => {
            if (exists) {
                // 是个目录则执行callback方法
                callback()
            } else {
                // 递归调用mkdirs
                /*console.log(dirname);
                console.log(path.dirname(dirname)); */
                mkdirs(path.dirname(dirname), () => {
                    fs.mkdir(dirname, callback)
                    // console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录')
                })
            }
        })
    }

    function makeFiles(filename, content) {
        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(`创建${filename}成功`)
        })
    }

    Date.prototype.format = (fmt) => {
        const o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        }

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
                )
            }
        }

        return fmt
    }
}
