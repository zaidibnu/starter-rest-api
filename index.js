const express = require('express')
const cors = require('cors')
const app = express()
const db = require('cyclic-dynamodb')
const APIMANG = require('./repo/api')
const APIWILAYAH = require('./repo/wilayah')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################


// Create or Update an item
app.use(cors())
app.post('/:col/:key', async (req, res) => {
  console.log(req.body)

  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).set(key, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})
//
app.get('/status/',cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}),async (req,res)=>{
  res.json(APIMANGROVE())
})
// Delete an item
app.delete('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).delete(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  //console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  //const item = await db.collection(col).get(key)
  //console.log(JSON.stringify(item, null, 2))
  //res.json(item).end()
  const result = {
    request: col,
    key: key,
    data: null
  }
  switch(col){
    case 'existing':
      result.data = APIMANG.HITUNGLUAS(col)
      res.json(result)
    break;
    case 'wilayah':
      result.data = APIWILAYAH.get(key)
      res.download(result)
    break;
  }
})

// Get a full listing
app.get('/:col', async (req, res) => {
  const col = req.params.col
  //console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
  //const items = await db.collection(col).list()
  //console.log(JSON.stringify(items, null, 2))
  //res.json(items).end()
  switch(col){
    case 'existing':
      const manges = require('./repo/existing')
      res.json({status:200, data:null}).end()
    break;
  }
})
//

// Catch all handler for all other request.
app.use('*',cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}), (req, res) => {
  console.log(req)
  res.json(APIMANG.APIMANGROVE())
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
