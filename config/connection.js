const shell = require('shelljs');
const mysql = require('mysql');
class Connection{
    constructor(){
        this.sql = mysql.connection = mysql.createConnection({
            host : 'localhost',
            user: 'root',
            password : '',
            database : 'midias'
        });

        this.sql.connect((err) => {
            if(err){
                if(err.code == 'ECONNREFUSED')console.log('Erro: Inicie o MySql');
                if(err.code == 'ER_BAD_DB_ERROR'){
                    shell.exec('start mysql --user=root --password="" -e "source ./config/database.sql"');
                    console.log('reinicie a aplicação');
                }
                process.exit();
            }
        });
    }    
}
module.exports = Connection;