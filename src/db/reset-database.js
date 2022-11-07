import { config } from "dotenv";
config();

import { query } from "./connection.js";


(async function (){

    await query("DROP DATABASE pokemonsDB");
    
    console.log("DB Deleted");
    
    await query("CREATE DATABASE pokemonsDB");
    await query("USE pokemonsDB");
    console.log("DB Created");

    await query("CREATE TABLE pokemons(id INT(16) NOT NULL,name VARCHAR(50) NOT NULL,image VARCHAR(100) NOT NULL,attack VARCHAR(4) NOT NULL,defense VARCHAR(4) NOT NULL,description VARCHAR(150),PRIMARY KEY (id));");
    await query("ALTER TABLE pokemons MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;");
    console.log("Table Pokemons Created");

    console.log("DB reset succsesfully!");
    process.exit();
})();


