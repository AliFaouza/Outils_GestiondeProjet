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
exports.projectRelateCategory = exports.deleteProject = exports.updateProject = exports.datasProject = exports.createProject = void 0;
var db_1 = require("../db");
//création d'une catégorie
var createProject = function (project_name, date_debut, date_fin, category_id, description) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.pool.query('INSERT INTO projects (project_name, date_debut,date_fin,category_id,description) VALUES ($1,$2, $3,$4,$5) RETURNING *', [project_name, date_debut, date_fin, category_id, description])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.createProject = createProject;
//Afficher les categories
var datasProject = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.pool.query('SELECT p.project_id, p.project_name, p.date_debut, p.date_fin, p.category_id, c.category_name, p.description FROM projects p LEFT JOIN categories c ON p.category_id = c.category_id')];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows];
        }
    });
}); };
exports.datasProject = datasProject;
//Afficher les projets par rapport à une catégorie
var projectRelateCategory = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.pool.query("SELECT *\n             FROM projects\n             WHERE category_id = $1", [id])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows];
        }
    });
}); };
exports.projectRelateCategory = projectRelateCategory;
//modifier une catégorie
var updateProject = function (id, project_name, date_debut, date_fin, category_id, description) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.pool.query('UPDATE projects SET project_name = $1, date_debut  = $2, date_fin = $3, category_id = $4, description = $5 WHERE  project_id = $6', [project_name, date_debut, date_fin, category_id, description, id])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.updateProject = updateProject;
//supprimer une categgorie
var deleteProject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.pool.query('DELETE FROM projects  WHERE  project_id = $1', [id])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.deleteProject = deleteProject;
