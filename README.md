# The one where MsSQL and JSON meet

In this repo, I will try and understand the fundamentals of integrating JSON in MsSQL. For starter, JSON(Javascript Object Notation) is a popular textual data format that was invented by [Douglas Crockford](add-reference) and has been popularised for exchanging data in modern web and mobile application. It has subtly replaced earlier standards, such as XML, e.t.c ..

Apart from communication, it used for storing unstructured data in log files or NoSQL databases. Many REST web services will return data formatted as JSON.

In MsSQL, JSON functions were first introduced in SQL Server 2016, and allowed on to combine NoSQL and SQL concepts in the same database, i.e you are able to combine classic relational columns with columns containing documents formatted as JSON text in the same table.

A sample JSON text:
```json
[
    {
        "name":"Guts",
        "stats":{
            "physical strength":"",
            "emotional strength":"",
            "intelligence":"",
            "sociability":"",
            "stamina":"",
            "legerity":"",
        }
    },
    {
        "name":"Puck",
        "parameters":{
            "physical strength":"",
            "emotional strength":"",
            "intelligence":"",
            "sociability":"",
            "stamina":"",
            "legerity":"",

        }
    }
]
```

Using SQL-Server built-in functions and operators, one is capable of:
- parsing JSON text to read or modify values
- transform arrays of JSON objects into table format
- run any Transct-SQL query on converted JSON objects
- format results of Transcat-SQL queries to JSON format

For a practical guide to JSON in MsSQL, I intend to use a simple nodeJs application that lets me perform basic CRUD operations on a database. So lets get started!

## Building the application

The application is built using Node.Js and Express with typescript. The code can be found [here](https://github/mbvgua). 

MsSQL has 4 main functions for handling JSON data:
- ISJSON()
- JSON_VALUE()
- JSON_QUERY()
- JSON_MODIFY()

### CREATE
```sql
    CREATE OR ALTER PROCEDURE swellaCreate (
        @id VARCHAR(255),
        @username VARCHAR(255) NOT NULL,
        @detailsJson NVARCHAR(MAX)
    )
    AS
    BEGIN
    INSERT INTO sqlJsonPrimer(id,username,detailsJson)
    VALUES (@id,@username,@detailsJson)
    END;
    GO
```


### READ
```sql
    SELECT
        id,
        username,
        JSON_VALUE(detailsJson, '$.') AS 
```
### UPDATE
### DELETE