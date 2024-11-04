// App.tsx
import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import InputProject from './components/InputPorject'; // Corrigez le nom du fichier si besoin
import Auth from './components/InputUser'; // Importer le composant Auth

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour gérer l'authentification

    useEffect(() => {
        // Logique pour vérifier si l'utilisateur est authentifié (par exemple, vérifier un token dans localStorage)
        const token = localStorage.getItem('token'); // Supposons que vous stockiez le token dans localStorage
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAuthenticate = () => {
        setIsAuthenticated(true); // Met à jour l'état d'authentification
    };

    return (
        <div className="App">
            <Fragment>
                {isAuthenticated ? (
                    <InputProject /> // Afficher le tableau de projets si l'utilisateur est authentifié
                ) : (
                    <Auth onAuthenticate={handleAuthenticate} /> // Passer la fonction onAuthenticate
                )}
            </Fragment>
        </div>
    );
}

export default App;
