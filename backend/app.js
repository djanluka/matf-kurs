const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

products = new Map()

app.post('/admin/unos-novog-proizvoda', (req, res) => {
  users.push(req.body)
  console.log('Lista proizvoda:')
  users.forEach(u => console.log(u))
  console.log()
})


products.set(0, {naziv: 'Mleko', opis: 'Slatko'})
products.set(1, {naziv: 'Voda', opis: 'Slatko'})
products.set(2, {naziv: 'Sok', opis: 'Slatko'})
products.set(3, {naziv: 'Jogurt', opis: 'Slatko'})

  
function createJSONData() {
    let data = {}
    for (const [key, value] of products)
        data[key] = value
    return data;
}

app.get('/admin/proizvodi', (req, res) => {
    let data = createJSONData()   
    res.send(data)
})

app.delete('/admin/proizvodi', (req, res) => {
    const id = req.body.id;
    products.delete(id)
    data = createJSONData();
    res.send(data)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

