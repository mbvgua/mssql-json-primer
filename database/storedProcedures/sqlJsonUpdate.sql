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