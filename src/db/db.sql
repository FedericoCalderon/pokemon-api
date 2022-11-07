CREATE DATABASE pokemonsDB;

USE pokemonsDB;

CREATE TABLE pokemons(
    id INT(16) NOT NULL,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) NOT NULL,
    attack VARCHAR(4) NOT NULL,
    defense VARCHAR(4) NOT NULL,
    description VARCHAR(150),
    PRIMARY KEY (id)
);

ALTER TABLE pokemons
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO pokemons (name, image, attack, defense, description)
VALUES ('name', 'image', 'attack', 'defense', 'description');

