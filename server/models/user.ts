import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import { pool } from '../db';

interface User {
    id: number;
    user_name: string;
    firstname: string;
    email: string;
    mdp: string;
}

// Ajout/création d'un utilisateur
const createUser = async (user_name: string, firstname: string, email: string, mdp: string): Promise<User> => {
    const hashedPassword = await bcrypt.hash(mdp, 10);
    const result = await pool.query(
        'INSERT INTO Users (user_name, firstname, email, mdp) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_name, firstname, email, hashedPassword]
    );
    return result.rows[0];
};

// Récupérer les données d'un utilisateur par ID
const getUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0] || null;
};

// Vérification des informations d'identification d'un utilisateur
const authenticateUser = async (user_name: string, mdp: string): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM Users WHERE user_name = $1', [user_name]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(mdp, user.mdp)) {
        return user; // L'utilisateur est authentifié
    }
    return null; // Authentification échouée
};

// Modifier les données des utilisateurs
const updateUser = async (id: number, user_name: string, firstname: string): Promise<User | null> => {
    const result = await pool.query(
        'UPDATE Users SET user_name = $1, firstname = $2 WHERE id = $3 RETURNING *',
        [user_name, firstname, id]
    );
    return result.rows[0] || null;
};

export { User, createUser, getUserById, authenticateUser, updateUser };
