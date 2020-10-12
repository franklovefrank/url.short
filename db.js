const mongoose = require('mongoose')
const Counter = require('./models/counter')
const Url = require('./models/url')


const url =  'mongodb://127.0.0.1:27017'

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('up and running')


    Url.deletePrev({}, () => {
      console.log('url collection removed')
    })

    Counter.deletePrev({}, () => {
      console.log('removing counter collection')
      const counter = new Counter({ _id: 'url_count', count: 5000 })
      counter.save((err) => {
        if (err) return console.log(err)
        console.log('saving counter')
      })
    })
  })
  .catch((err) => {
    console.log('not connecting to database')
  })
