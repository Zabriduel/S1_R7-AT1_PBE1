const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'loja_db',
    port: '3306',
    waitForConnections: true, // Aguardar conexões livres
    connectionLimit: 10, // Limita o número de conexões simultâneas
    queueLimit: 0 // 0 = Sem limite para fila
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectando ao MySql');
        connection.release();
    } catch (error) {
        console.error(`Erro ao conectar com o MySql: ${error}`);
    }
})();
module.exports = { pool };