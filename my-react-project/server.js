const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./db');

app.use(cors());
app.use(express.json());
// connexion à la base de donnée

//créer catégory
app.post('/project', async(req, res) => {
    try {
        const {name_categorie} = req.body;
        const category = await pool.query('INSERT INTO categorie (nom_categori) VALUES($1)', [name_categorie]);
        res.json(category);
    } catch (error) {
        console.error(error.message);    
    } 
    
})
//Affichers tous les catégory

//Affichers les catégory par rapport à une id 

// supprimer 

// modifier


app.get('/api/message', (req, res) => {
    res.json({ message: 'Bonjour du serveur !' });
});

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});