USE dwella;
GO

CREATE TABLE sqlJson (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    profileJson NVARCHAR(MAX) NOT NULL,
    parametersJson NVARCHAR(MAX) NOT NULL,
    isDeleted INT DEFAULT 0
)
GO


-- insert
CREATE OR ALTER PROCEDURE sqlJsonCreate (
    @id VARCHAR(255),
    @username VARCHAR(255),
    @profileJson NVARCHAR(MAX),
    @parametersJson NVARCHAR(MAX)
)
AS
BEGIN TRY
    INSERT INTO sqlJson(id,username,profileJson,parametersJson)
    VALUES (@id,@username,@profileJson,@parametersJson)
    PRINT ('User added successfuly!')
END TRY
BEGIN CATCH
    PRINT 'Error occurred:' + ERROR_MESSAGE()
END CATCH;
GO

-- update
CREATE OR ALTER PROCEDURE sqlJsonUpdate (
    @id VARCHAR(255),
    @username VARCHAR(255),
    @profileJson NVARCHAR(MAX),
    @parametersJson NVARCHAR(MAX)
)
AS
BEGIN TRY
    UPDATE sqlJson
    SET username=@username,profileJson=@profileJson,parametersJson=@parametersJson
    WHERE id=@id
    PRINT ('User added successfuly!')
END TRY
BEGIN CATCH
    PRINT 'Error occurred:' + ERROR_MESSAGE()
END CATCH;
GO

-- getById
CREATE OR ALTER PROCEDURE getSqlJsonById (
    @id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM sqlJson
    WHERE isDeleted=0
    AND id=@id
END;
GO

-- get all users
CREATE OR ALTER PROCEDURE getSqlJsonUsers 
AS
BEGIN
    SELECT * FROM sqlJson
    WHERE isDeleted=0
END;
GO

-- getByParams

-- deleteUser
CREATE OR ALTER PROCEDURE sqlJsonDelete (
    @id VARCHAR(255)
)
AS
BEGIN
    UPDATE sqlJson
    SET isDeleted=1
    WHERE @id=id
END;
GO



-- get all
SELECT * FROM sqlJson WHERE isDeleted=0;
GO

-- get from db plainly
SELECT * FROM sqlJson
WHERE JSON_VALUE(profileJson,'$.gender') LIKE 'male'
GO
