import express = require('express');
import cors = require('cors');
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
import {pool} from './db';
import { createProject, datasProject,updateProject,deleteProject, projectRelateCategory} from './models/project';
import {createUser, getUserById, authenticateUser, updateUser} from './models/user';
import { createCategory, datascategory,updateCategory,deletetegory} from './models/category';
const router = express.Router();

app.use(cors());
app.use(express.json());
// connexion à la base de donnée

// Route pour obtenir ajouter une catégorie
app.post('/categories', async (req: Request, res: Response) => {
    const {category_name} = req.body;
    try {
        const categories = await createCategory(category_name);
        res.json(categories);
    } catch (error) {
        console.error('Erreur lors de l\'insertion d\'une category :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

// Route pour obtenir toutes les catégories
app.get('/categories', async (req, res) => {
    try {
        const categories = await datascategory();
        res.json(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

// Route pour modifier une categorie
app.put('/categories/:id', async (request, response) =>{
    const {id} = request.params;
    const {category_name} = request.body;
    try {   
        const updatedCategory = await updateCategory(Number(id),category_name);
        response.json("La categorie à étét modifier avec succès!!!");
        response.json(updatedCategory);
    } catch (error) {
        // console.error(error.message);   

    }
})

// Route pour supprimer une categorie
app.delete('/categories/:id', async (request, response) =>{
    try {
        const { id } = request.params;
        const result = await deletetegory(Number(id));;
        response.json("La categorie à étét supprimer avec succès!!!");
    } catch (error) {
        // console.error(error.message);   

    }
})

// Partie du projet
//Route pour ajouter un projet
app.post('/project', async (request, response) => {
    const  {project_name, date_debut , date_fin, category_id,description} = request.body;
    try { 
       const addPorduct = await createProject(project_name, date_debut , date_fin, category_id,description);
       response.status(201).send(`User added with ID: ${addPorduct .rows[0].id}`)
    } catch (error) {
        // console.error(error.message);   
    }
})
//Route pour affichers tous les projets
app.get('/project', async(request, response) => {
    try {
        const Allprojects = await datasProject();
        response.json(Allprojects);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        response.status(500).send('Erreur interne du serveur');    
    } 
    
})
//Route pour l'affichage des projets par rapport à un catégorie
app.get('/project/:id/projects', async(request, response) => {
    try {
        const id = parseInt(request.params.id);
        const projectsByCategorie = await projectRelateCategory(id);
        response.json(projectsByCategorie.rows);
    } catch (error) {
        // console.error(error.message);    
    } 
    
})
//Route pour  modifier un projet
app.put('/project/:id', async (request, response) =>{
    try {
        const {id} = request.params;
        const {project_name, date_debut , date_fin, category_id,description } = request.body;
        const updateprojet = await updateProject(Number(id),project_name, date_debut , date_fin, category_id,description);
        response.json("La categorie à étét modifier avec succès!!!");
        response.status(200).send(`User modified with ID: id`)
        console.log(request.body);
        console.log(request.params);
        
    } catch (error) {
        // console.error(error.message);   

    }
})
//Route pour  supprimer un projet
app.delete('/project/:id', async (request, response) =>{
    try {
        const {id}= request.params;
        const  deleteproject = await deleteProject(Number(id))
        response.json("La projet à étét supprimer avec succès!!!");
        response.status(200).send(`User deleted with ID: ${id}`)
    } catch (error) {
        // console.error(error.message);   

    }
})
// Route pour l'inscription d'un utilisateur
app.post('/api/register', async (req: Request, res: Response) => {
    const { user_name, firstname, email, mdp } = req.body;
    try {
        const newUser = await createUser(user_name, firstname, email, mdp);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
// Route pour la connexion d'un utilisateur
app.post('/api/login', async (req: Request, res: Response) => {
    const { user_name, mdp } = req.body;
    try {
        const user = await authenticateUser(user_name, mdp);
        if (user) {
            res.json({ message: 'Connexion réussie', user });
        } else {
            res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
// Route pour modifier les données d'un utilisateur
app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_name, firstname } = req.body;

    try {
        const updatedUser = await updateUser(Number(id), user_name, firstname);
        if (updatedUser) {
            res.json({ message: 'Les données ont été modifiées avec succès!', user: updatedUser });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.get('/api/message', (request, response) => {
    response.json({ message: 'Bonjour du serveur !' });
});

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});