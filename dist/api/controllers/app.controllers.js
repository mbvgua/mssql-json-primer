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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.searchUser = exports.addUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_config_1 = require("../../config/index.config");
const search_helpers_1 = require("../helpers/search.helpers");
dotenv_1.default.config();
function addUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // function add a new user to db
        const id = (0, uuid_1.v4)();
        const { username, profile, parameters } = request.body;
        const profileJson = JSON.stringify(profile);
        const parametersJson = JSON.stringify(parameters);
        try {
            const pool = yield mssql_1.default.connect(index_config_1.sqlConfig); //connect to the db
            yield pool.request() //make a request
                .input("id", id)
                .input("username", username)
                .input("profileJson", profileJson)
                .input("parametersJson", parametersJson)
                .execute("sqlJsonCreate");
            return response.status(200).json({ message: 'User successfully added!' });
        }
        catch (error) {
            console.error('Error adding user', error);
            return response.status(500).json({ error: `Internal server error:${error}` });
        }
    });
}
exports.addUser = addUser;
function searchUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filters, values } = (0, search_helpers_1.buildFilterQuery)(request.body);
            // Base query
            let query = "SELECT * FROM sqlJson";
            if (filters) {
                query += ` WHERE ${filters} AND isDeleted=0`;
            }
            // Establish database connection
            const pool = yield mssql_1.default.connect(index_config_1.sqlConfig);
            const sqlRequest = pool.request();
            // Inject parameters into request
            Object.keys(values).forEach(key => {
                sqlRequest.input(key, values[key]);
            });
            // Execute query
            const users = (yield sqlRequest.query(query)).recordset;
            if (users.length !== 0) {
                console.log(users);
                return response.status(200).json(users);
            }
            else {
                return response.status(400).json({ error: 'User with specified parameetrs does not exist' });
            }
        }
        catch (error) {
            return response.status(500).json({ error: "Server error during search" });
        }
    });
}
exports.searchUser = searchUser;
;
function getUsers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // function gets all users from db
        try {
            const pool = yield mssql_1.default.connect(index_config_1.sqlConfig);
            const users = (yield pool.request()
                .execute("getSqlJsonUsers ")).recordset;
            return response.status(200).send(users);
        }
        catch (error) {
            console.error('Error retrieving user in the system', error);
            return response.status(500).json({ error: `Internal server errror: ${error}` });
        }
    });
}
exports.getUsers = getUsers;
function updateUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // function will update a user info in regards to id passed
        const id = request.params.id;
        const { username, profile, parameters } = request.body;
        const profileJson = JSON.stringify(profile);
        const parametersJson = JSON.stringify(parameters);
        const pool = yield mssql_1.default.connect(index_config_1.sqlConfig);
        try {
            const user = (yield pool.request()
                .input("id", id)
                .execute("getSqlJsonById")).recordset;
            console.log(user);
            if (user.length !== 0) {
                yield pool.request()
                    .input("id", id)
                    .input("username", username)
                    .input("profileJson", profileJson)
                    .input("parametersJson", parametersJson)
                    .execute("sqlJsonUpdate");
                return response.status(200).send(`User updated succes`);
            }
            else {
                return response.status(400).json({ error: 'User does not exist.' });
            }
        }
        catch (error) {
            console.error('Failed to update user', error);
            return response.status(500).json({ error: `Internal server error ${error}` });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // delete a user with the passed id
        const id = request.params.id;
        try {
            const pool = yield mssql_1.default.connect(index_config_1.sqlConfig);
            const user = (yield pool.request()
                .input('id', id)
                .execute('getSqlJsonById')).recordset;
            if (user.length !== 0) {
                yield pool.request()
                    .input('id', id)
                    .execute('sqlJsonDelete');
                return response.status(200).json({ message: `${user[0].username} has succesfully been deleted` });
            }
            else {
                return response.status(400).json({ error: 'That user does not exist' });
            }
        }
        catch (error) {
            console.error('Internal server error', error);
            return response.status(500).json({ error: `Internal seerver error: ${error}` });
        }
    });
}
exports.deleteUser = deleteUser;
