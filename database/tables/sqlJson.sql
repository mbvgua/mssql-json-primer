USE dwella;
GO

CREATE TABLE sqlJson (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    profileJson NVARCHAR(MAX) NOT NULL,
    parametersJson NVARCHAR(MAX) NOT NULL,
    isDeleted INT DEFAULT 1
)
GO