// InputUser.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AuthProps {
    onAuthenticate: () => void; // Définir le type de la fonction onAuthenticate
}

const Auth: React.FC<AuthProps> = ({ onAuthenticate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
        
        const body = {
            user_name: userName,
            firstname: firstname,
            email: email,
            mdp: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(`Bienvenue, ${data.firstname}!`);
                onAuthenticate(); // Appeler la fonction pour changer l'état d'authentification
            } else {
                setMessage(data.error || 'Erreur lors de la connexion/inscription.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setMessage('Erreur de réseau.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg" style={{ width: '400px' }}>
                <div className="card-body">
                    <h2 className="text-center">{isLogin ? 'Connexion' : 'Inscription'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prénom"
                                    value={firstname}
                                    onChange={e => setFirstname(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control mt-4"
                                placeholder="Nom d'utilisateur"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mt-4"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mt-4"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-4">{isLogin ? 'Connexion' : 'Inscription'}</button>
                    </form>
                    <button className="btn btn-link mt-4" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Pas encore inscrit ?' : 'Déjà inscrit ?'}
                    </button>
                    {message && <p className="text-danger text-center ">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Auth;
