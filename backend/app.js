const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mapProducts = new Map()
products = [];
ids = new Set()

const numProducts = 1000000;

function hasProducts(data) {
    return products.some(prod => prod.naziv === data.naziv && prod.opis === data.opis);
}


app.post('/admin/unos-novog-proizvoda', (req, res) => {
    
    if(hasProducts(req.body)) return;
    
    let id = Math.floor(Math.random() * numProducts);
    
    while (ids.has(id)) id = Math.floor(Math.random() * numProducts);
    
    mapProducts.set(id, req.body);
    products.push(req.body);
    console.log(mapProducts);
})

/*
mapProducts.set(0, {naziv: 'Mleko', opis: 'Slatko'})
mapProducts.set(1, {naziv: 'Voda', opis: 'Slatko'})
mapProducts.set(2, {naziv: 'Sok', opis: 'Slatko'})
mapProducts.set(3, {naziv: 'Jogurt', opis: 'Slatko'})
*/
  
function createJSONData() {
    let data = {}
    for (const [key, value] of mapProducts)
        data[key] = value
    return data;
}

app.get('/admin/proizvodi', (req, res) => {
    let data = createJSONData()   
    res.send(data)
})

function deleteProducts(id) {
    ids.delete(id);
    
    const prod = mapProducts.get(id);
    products = products.filter(p => p.naziv !== prod.naziv && p.opis !== prod.opis);
    
    mapProducts.delete(id)
}

app.delete('/admin/proizvodi', (req, res) => {
    const id = req.body.id;
    deleteProducts(id)
    data = createJSONData();
    res.send(data)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

