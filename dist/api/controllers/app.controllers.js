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
exports.updateUser = exports.getUsers = exports.addUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_config_1 = require("../../config/index.config");
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
// export async function getUser(request:Request, response:Response){
//     // function gets a specific user
//     // using specific search params, either {id, username,profile, parameters}
// }
function getUsers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // function gets all users from db
        try {
            const pool = yield mssql_1.default.connect(index_config_1.sqlConfig);
            const users = (yield pool.request()
                .execute("getSqlJsonUsers ")).recordset;
            console.log(users);
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
// export async function deleteUser(request:Request, response:Response){
//     // delete a user with the passed id
// }
