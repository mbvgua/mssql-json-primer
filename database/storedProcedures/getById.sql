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