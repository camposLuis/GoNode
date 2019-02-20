const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const processadorIdade = (req, res, next) => {
  const { idade } = req.query
  if (idade === null || idade === '') {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('formulario')
})

app.get('/menor', processadorIdade, (req, res) => {
  const { idade } = req.query
  return res.render('menor', { idade })
})

app.get('/maior', processadorIdade, (req, res) => {
  const { idade } = req.query
  return res.render('maior', { idade })
})

app.post('/checagem', processadorIdade, (req, res) => {
  const { idade } = req.body
  if (idade < 18) {
    return res.redirect(`/menor?idade=${idade}`)
  }
  return res.redirect(`/maior?idade=${idade}`)
})

app.listen(3000)
