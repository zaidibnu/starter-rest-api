const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const CyclicDb = require("@cyclic.sh/dynamodb")
const dynamodb = CyclicDb("ill-gray-squirrel-gearCyclicDB")
app.use(bodyParser.json());
app.get('/api/users', (req, res) => {
  const params = {
    TableName: 'Users' // Ganti dengan nama tabel DynamoDB Anda
  };

  dynamodb.scan(params, (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data.Items);
    }
  });
});

app.post('/api/users', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    res.status(400).send('Bad Request');
    return;
  }

  const params = {
    TableName: 'Users', // Ganti dengan nama tabel DynamoDB Anda
    Item: {
      id: { S: id },
      name: { S: name }
    }
  };

  dynamodb.putItem(params, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
