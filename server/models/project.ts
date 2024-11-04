import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs'; 
import {pool} from '../db';

interface Category {
    id: number;
    project_name: string, 
    date_debut: string , 
    date_fin: string , 
    category_id: string ,
    description: string 
}

//création d'une catégorie
const createProject = async (project_name: string, date_debut: string , date_fin: string , category_id: string ,description: string ) => {
    const result = await pool.query(
      'INSERT INTO projects (project_name, date_debut,date_fin,category_id,description) VALUES ($1,$2, $3,$4,$5) RETURNING *',
      [project_name, date_debut , date_fin, category_id,description]
    );
    return result.rows[0];
};

//Afficher les categories
const datasProject = async () => {
    const result = await pool.query('SELECT p.project_id, p.project_name, p.date_debut, p.date_fin, p.category_id, c.category_name, p.description FROM projects p LEFT JOIN categories c ON p.category_id = c.category_id');
    return result.rows;
};
//Afficher les projets par rapport à une catégorie
const projectRelateCategory = async (id: number) => {
    const result = await pool.query(`SELECT *
             FROM projects
             WHERE category_id = $1`, [id]);
    return result.rows;
};

//modifier une catégorie
const updateProject = async (id:number,project_name: string, date_debut: string , date_fin: string , category_id: string ,description: string) => {
    const result = await pool.query('UPDATE projects SET project_name = $1, date_debut  = $2, date_fin = $3, category_id = $4, description = $5 WHERE  project_id = $6', 
        [project_name, date_debut , date_fin, category_id,description,id]);
    return result.rows[0];
};

//supprimer une categgorie
const deleteProject = async (id:number) => {
    const result = await pool.query('DELETE FROM projects  WHERE  project_id = $1', [id]);
    return result.rows[0];
};

export {Category,createProject, datasProject,updateProject,deleteProject,projectRelateCategory}