const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const age = '0'

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('formulario', { age })
})

app.get('/maior', (req, res) => {
  return res.render('maior', { age })
})

app.post('/checagem', (req, res) => {
  age.set(req.body.idade)
  return res.redirect('maior', { age })
})

app.listen(3000)
