import React, { useEffect, useState, Fragment } from 'react';
import InputCategory from './inputCategory';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Project {
    project_id: number;
    project_name: string;
    date_debut: string;
    date_fin: string;
    category_id: string;
    category_name: string; // Ajout du nom de la catégorie
    description: string;
}

interface Category {
    category_id: number;
    category_name: string;
}

const InputProject = () => {
    const [projectName, setProjectName] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [error, setError] = useState('');

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/project');
            const data: Project[] = await response.json();
            const projectsWithCategoryNames = data.map(project => {
                const category = categories.find(cat => cat.category_id.toString() === project.category_id);
                return {
                    ...project,
                    category_name: category ? category.category_name : 'Inconnu',
                };
            });

            setProjects(projectsWithCategoryNames);
            setFilteredProjects(projectsWithCategoryNames); // Initialisation du tableau filtré
        } catch (error) {
            console.error('Erreur lors de la récupération des projets:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérification des dates
        if (new Date(dateDebut) >= new Date(dateFin)) {
            setError('La date de fin doit être inférieure à la date de début.');
            return;
        } else {
            setError('');
        }

        const body = { project_name: projectName, date_debut: dateDebut, date_fin: dateFin, category_id: categoryId, description: description };
        
        try {
            const response = await fetch('http://localhost:5000/project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchProjects();
                toast.success("Le projet a été ajoutée avec succès !", {
                    position: "top-right",
                    autoClose: 3000, // Ferme automatiquement après 3 secondes
                });
                const newProject = await response.json();
                const category = categories.find(cat => cat.category_id.toString() === categoryId);
                setProjects([...projects, { ...newProject, category_name: category ? category.category_name : 'Inconnu' }]);
                resetForm();
            } else {
                console.error('Erreur lors de l\'ajout du projet');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du projet:', error);
        }
    };

    const resetForm = () => {
        setProjectName('');
        setDateDebut('');
        setDateFin('');
        setCategoryId('');
        setDescription('');
        setSelectedProject(null);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/project/${id}`, { method: 'DELETE' });

            if (response.ok) {
                toast.success("Le projet a été supprimer avec succès !", {
                    position: "top-right",
                    autoClose: 3000, // Ferme automatiquement après 3 secondes
                });
                setProjects(projects.filter(project => project.project_id !== id));
                setFilteredProjects(filteredProjects.filter(project => project.project_id !== id)); // Mettre à jour le tableau filtré
            } else {
                console.error('Erreur lors de la suppression du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du projet:', error);
        }
    };

    const handleUpdate = async (id: number) => {
        const body = { project_name: projectName, date_debut: dateDebut, date_fin: dateFin, category_id: categoryId, description: description };
        
        try {
            const response = await fetch(`http://localhost:5000/project/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                toast.success("Le projet a été modifier avec succès !", {
                    position: "top-right",
                    autoClose: 3000, // Ferme automatiquement après 3 secondes
                });
                const updatedProject = await response.json();
                const category = categories.find(cat => cat.category_id.toString() === updatedProject.category_id);
                setProjects(projects.map(project => (project.project_id === updatedProject.project_id ? { ...updatedProject, category_name: category ? category.category_name : 'Inconnu' } : project)));
                resetForm();
            } else {
                console.error('Erreur lors de la mise à jour du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet:', error);
        }
    };

    const handleCategoryAdded = (newCategory: Category) => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedCategoryId(selectedId);

        if (selectedId) {
            // Filtrer les projets par la catégorie sélectionnée
            const filtered = projects.filter(project => project.category_id === selectedId);
            setFilteredProjects(filtered);
        } else {
            // Si aucune catégorie n'est sélectionnée, afficher tous les projets
            setFilteredProjects(projects);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchCategories();
    }, []);

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Liste des Projets</h1>
            <InputCategory onCategoryAdded={handleCategoryAdded} />
            <div className='d-flex justify-content-between mt-4'>
                <select
                    className='form-control me-2'
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                >
                    <option value="" className='form-control-sm'>Toutes les catégories</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <form className='d-flex mt-5 ms-5 me-5' onSubmit={selectedProject ? (e) => { e.preventDefault(); handleUpdate(selectedProject.project_id); } : onSubmitForm}>
                <input
                    type="text"
                    className='form-control me-2'
                    placeholder='Nom du projet'
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className='form-control me-2'
                    value={dateDebut}
                    onChange={e => setDateDebut(e.target.value)}
                    required
                />
                <input
                    type="date"
                    className='form-control me-2'
                    value={dateFin}
                    onChange={e => setDateFin(e.target.value)}
                    required
                />
                <select
                    className='form-control me-2'
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    required
                >
                    <option value="" disabled>Sélectionnez une catégorie</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className='form-control me-2'
                    placeholder='Description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <button className='btn btn-success'>{selectedProject ? 'Mettre à jour' : 'Ajouter'}</button>
            </form>
            {error && <div className="text-danger mt-2">{error}</div>} 

            <table className='table mt-5'>
                <thead>
                    <tr>
                        <th>Nom du Projet</th>
                        <th>Date de Début</th>
                        <th>Date de Fin</th>
                        <th>Catégorie</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <tr key={project.project_id}>
                                <td>{project.project_name}</td>
                                <td>{new Date(project.date_debut).toLocaleDateString()}</td>
                                <td>{new Date(project.date_fin).toLocaleDateString()}</td>
                                <td>{project.category_name}</td>
                                <td>{project.description}</td>
                                <td>
                                    <button className='btn btn-warning me-2' onClick={() => { 
                                        setSelectedProject(project);
                                        setProjectName(project.project_name);
                                        setDateDebut(project.date_debut);
                                        setDateFin(project.date_fin);
                                        setCategoryId(project.category_id);
                                        setDescription(project.description);
                                    }}>Modifier</button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(project.project_id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className='text-center'>Aucun projet trouvé pour cette catégorie.</td>
                        </tr>
                    )}
                </tbody>
            </table>
              {/* Conteneur pour les notifications Toastify */}
              <ToastContainer />
        </Fragment>
    );
};

export default InputProject;
