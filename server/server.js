"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var PORT = process.env.PORT || 5000;
var project_1 = require("./models/project");
var user_1 = require("./models/user");
var category_1 = require("./models/category");
var router = express.Router();
app.use(cors());
app.use(express.json());
// connexion à la base de donnée
// Route pour obtenir ajouter une catégorie
app.post('/categories', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category_name, categories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category_name = req.body.category_name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, category_1.createCategory)(category_name)];
            case 2:
                categories = _a.sent();
                res.json(categories);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Erreur lors de l\'insertion d\'une category :', error_1);
                res.status(500).send('Erreur interne du serveur');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Route pour obtenir toutes les catégories
app.get('/categories', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, category_1.datascategory)()];
            case 1:
                categories = _a.sent();
                res.json(categories);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Erreur lors de la récupération des catégories :', error_2);
                res.status(500).send('Erreur interne du serveur');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route pour modifier une categorie
app.put('/categories/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category_name, updatedCategory, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                category_name = request.body.category_name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, category_1.updateCategory)(Number(id), category_name)];
            case 2:
                updatedCategory = _a.sent();
                response.json("La categorie à étét modifier avec succès!!!");
                response.json(updatedCategory);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Route pour supprimer une categorie
app.delete('/categories/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, (0, category_1.deletetegory)(Number(id))];
            case 1:
                result = _a.sent();
                ;
                response.json("La categorie à étét supprimer avec succès!!!");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Partie du projet
//Route pour ajouter un projet
app.post('/project', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, project_name, date_debut, date_fin, category_id, description, addPorduct, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, project_name = _a.project_name, date_debut = _a.date_debut, date_fin = _a.date_fin, category_id = _a.category_id, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, project_1.createProject)(project_name, date_debut, date_fin, category_id, description)];
            case 2:
                addPorduct = _b.sent();
                response.status(201).send("User added with ID: ".concat(addPorduct.rows[0].id));
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//Route pour affichers tous les projets
app.get('/project', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var Allprojects, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, project_1.datasProject)()];
            case 1:
                Allprojects = _a.sent();
                response.json(Allprojects);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Erreur lors de la récupération des projets :', error_6);
                response.status(500).send('Erreur interne du serveur');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route pour l'affichage des projets par rapport à un catégorie
app.get('/project/:id/projects', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, projectsByCategorie, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(request.params.id);
                return [4 /*yield*/, (0, project_1.projectRelateCategory)(id)];
            case 1:
                projectsByCategorie = _a.sent();
                response.json(projectsByCategorie.rows);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route pour  modifier un projet
app.put('/project/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, project_name, date_debut, date_fin, category_id, description, updateprojet, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = request.params.id;
                _a = request.body, project_name = _a.project_name, date_debut = _a.date_debut, date_fin = _a.date_fin, category_id = _a.category_id, description = _a.description;
                return [4 /*yield*/, (0, project_1.updateProject)(Number(id), project_name, date_debut, date_fin, category_id, description)];
            case 1:
                updateprojet = _b.sent();
                response.json("La categorie à étét modifier avec succès!!!");
                response.status(200).send("User modified with ID: id");
                console.log(request.body);
                console.log(request.params);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _b.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Route pour  supprimer un projet
app.delete('/project/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleteproject, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, (0, project_1.deleteProject)(Number(id))];
            case 1:
                deleteproject = _a.sent();
                response.json("La projet à étét supprimer avec succès!!!");
                response.status(200).send("User deleted with ID: ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Route pour l'inscription d'un utilisateur
// Route pour l'inscription d'un utilisateur
app.post('/api/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, firstname, email, mdp, newUser, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_name = _a.user_name, firstname = _a.firstname, email = _a.email, mdp = _a.mdp;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.createUser)(user_name, firstname, email, mdp)];
            case 2:
                newUser = _b.sent();
                res.status(201).json(newUser);
                return [3 /*break*/, 4];
            case 3:
                error_10 = _b.sent();
                console.error('Erreur lors de l\'inscription de l\'utilisateur:', error_10);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Route pour la connexion d'un utilisateur
app.post('/api/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, mdp, user, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_name = _a.user_name, mdp = _a.mdp;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.authenticateUser)(user_name, mdp)];
            case 2:
                user = _b.sent();
                if (user) {
                    res.json({ message: 'Connexion réussie', user: user });
                }
                else {
                    res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                console.error('Erreur lors de la connexion:', error_11);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Route pour modifier les données d'un utilisateur
app.put('/api/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, user_name, firstname, updatedUser, error_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, user_name = _a.user_name, firstname = _a.firstname;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.updateUser)(Number(id), user_name, firstname)];
            case 2:
                updatedUser = _b.sent();
                if (updatedUser) {
                    res.json({ message: 'Les données ont été modifiées avec succès!', user: updatedUser });
                }
                else {
                    res.status(404).json({ error: 'Utilisateur non trouvé' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_12 = _b.sent();
                console.error('Erreur lors de la modification de l\'utilisateur:', error_12);
                res.status(500).json({ error: 'Erreur interne du serveur' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/message', function (request, response) {
    response.json({ message: 'Bonjour du serveur !' });
});
app.listen(PORT, function () {
    console.log("Le serveur fonctionne sur http://localhost:".concat(PORT));
});
