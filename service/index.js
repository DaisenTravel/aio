const express = require("express")
const app = express()

app.set('secret', 'yzje@live.cn&xsye@live.cn&yl.e@live.cn')
// console.log(app.get('secret'))
// app.set('expiresIn', 20)    //默认20秒，用于测试
// app.set('expiresIn', 60)    //默认60秒，用于测试
app.set('expiresIn', 7200)   //默认3600秒，即2小时，用于生产
// console.log(app.get('expiresIn'))

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.get('/', async (req, res, next) => {
    // await res.json({ code: 1, msg: 'OK' })
    await res.send(`
    <center>
        <h1>中华人民共和国</h1>
        <h2>中国人民解放军</h2>
    </center>
    `)
})

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

const port = 3001
app.listen(port, () => { console.log(`http://localhost:${port}`) })
