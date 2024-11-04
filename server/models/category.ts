import {pool} from '../db';
import * as bcrypt from 'bcryptjs'; 

interface Category {
    id: number;
    category_name: string;
}

//création d'une catégorie
const createCategory = async (category_name: string) => {
    const result = await pool.query(
      'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
      [category_name]
    );
    return result.rows[0];
};

//Afficher les categories
const datascategory = async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
};
//modifier une catégorie
const updateCategory = async (id:number,category_name: string) => {
    const result = await pool.query('UPDATE categories SET category_name = $1 WHERE category_id = $2', [category_name,id]);
    return result.rows[0];
};

//supprimer une categgorie
const deletetegory = async (id:number) => {
    const result = await pool.query('DELETE FROM categories  WHERE category_id = $1', [id]);
    return result.rows[0];
};

export {Category,createCategory, datascategory,updateCategory,deletetegory}