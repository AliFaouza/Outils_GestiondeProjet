import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

interface InputCategoryProps {
    onCategoryAdded: (newCategory: { category_id: number; category_name: string }) => void;
}

const InputCategory: React.FC<InputCategoryProps> = ({ onCategoryAdded }) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const body = { category_name: newCategoryName };

        try {
            const response = await fetch('http://localhost:5000/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const newCategory = await response.json();
                onCategoryAdded(newCategory);
                setNewCategoryName('');
                toast.success("La catégorie a été ajoutée avec succès !", {
                    position: "top-right",
                    autoClose: 3000, // Ferme automatiquement après 3 secondes
                });
            } else {
                console.error("Erreur lors de l'ajout de la catégorie");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-4 flex-column">
            <form className="d-flex" onSubmit={onSubmitForm} style={{ gap: '10px' }}>
                <input
                    type="text"
                    className="form-control small-option"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="Nom de la catégorie"
                    required
                    style={{ width: '150px' }}
                />
                <button type="submit" className="btn btn-success">
                    Ajouter Catégorie
                </button>
            </form>

            {/* Conteneur pour les notifications Toastify */}
            <ToastContainer />
        </div>
    );
};

export default InputCategory;
