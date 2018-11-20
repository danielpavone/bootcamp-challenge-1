const express = require('express')
const nunjucks = require('nunjucks')
const checkAge = require('../middleware/age').checkAge

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  let { age } = req.body

  if (isNaN(age)) return res.redirect('/')

  return age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkAge, (req, res) => {
  let { age } = req.query

  return res.render('message', {
    age
  })
})

app.get('/minor', checkAge, (req, res) => {
  let { age } = req.query

  return res.render('message', {
    age
  })
})

app.listen(3000, () => {
  console.log('Server running at localhost:3000')
})
