CREATE OR ALTER PROCEDURE sqlJsonCreate (
    @jsonData NVARCHAR(MAX)
)
AS
BEGIN
INSERT INTO sqlJson(id,username,profileJson,parametersJson)
SELECT id, username, profileJson, parametersJson
FROM OPENJSON(@jsonData)
WITH (
    id VARCHAR(255),
    username VARCHAR(255),
    profileJson NVARCHAR(MAX),
    parametersJson NVARCHAR(MAX)
)
END;