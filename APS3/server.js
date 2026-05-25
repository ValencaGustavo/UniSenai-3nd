const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let pokemons = [
    { id: 1, nome: 'bulbasaur', tipo: 'grass'},
    { id: 2, nome: 'chamander', tipo: 'fogo'},
    { id: 3, nome: 'squirtle', tipo: 'agua' },
]

app.get('/pokemons', (req, res) => { 
    res.json(pokemons);
})

app.get('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);

    if (!pokemons) {
        return res.status(404).json({ erro: 'Pokemon não encontrado' });
    }

    res.json(pokemon);
})

app.post('/pokemons', (req, res) => {
    const { nome, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({ erro: 'Nome e tipo são obrigatórios'});
    }

    const novo = {
        id: pokemons.length + 1,
        nome,
        tipo,
    };

    pokemons.push(novo);
    res.status(201).json(novo);
})

app.put('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemons.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Pokemon não encontradp'});
    }

    pokemons[index] = { id, ...req.body};
    res.json(pokemons[index]);
})

app.delete('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemons.findIndex(p => p.id === id);

    if (index === - 1) {
        return res.status(404).json({ erro: 'Pokemon não encontrado'});
    }

    pokemons.splice(index, 1);
    res.status(204).send();
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})