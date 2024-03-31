// import mysql from 'mysql2/DB_PROJECT';
import mysql from 'mysql2';
import 'dotenv/config'


async function executeQuery(query, params){
    let results;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });

    try {
        console.log("hhhhhhhhhhhhhhhhhh");
        results = await connection.execute(query,params);
    } catch (err) {
        console.log(err);
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}