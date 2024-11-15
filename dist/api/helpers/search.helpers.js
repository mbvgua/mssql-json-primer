"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilterQuery = void 0;
function buildFilterQuery(queryObj) {
    const filters = [];
    const values = {};
    if (queryObj.username) {
        filters.push("username = @username");
        values.username = queryObj.username;
    }
    if (queryObj.profile) {
        if (queryObj.profile.age) {
            filters.push("JSON_VALUE(profileJson, '$.age') LIKE @age");
            values.age = queryObj.profile.age;
        }
        if (queryObj.profile.gender) {
            filters.push("JSON_VALUE(profileJson,'$.gender') LIKE @gender");
            values.gender = queryObj.profile.gender;
        }
        if (queryObj.profile.bodyMass) {
            if (queryObj.profile.bodyMass.height) {
                filters.push("JSON_VALUE(profileJson,'$.bodyMass.height') LIKE @height");
                values.height = queryObj.profile.bodyMass.height;
            }
            if (queryObj.profile.bodyMass.weight) {
                filters.push("JSON_VALUE(profileJson,'$.bodyMass.weight') LIKE @weight");
                values.weight = queryObj.profile.bodyMass.weight;
            }
        }
    }
    if (queryObj.parameters) {
        Object.keys(queryObj.parameters).forEach((key) => {
            filters.push(`JSON_VALUE(parametersJson,'$.${key}') LIKE @${key}`);
            values[key] = queryObj.parameters[key];
        });
    }
    return { filters: filters.join(" AND "), values };
}
exports.buildFilterQuery = buildFilterQuery;
;
