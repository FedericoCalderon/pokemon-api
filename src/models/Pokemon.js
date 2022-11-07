export class Pokemon {
    name = "";
    image = "";
    attack = 0;
    defense = 0;
    description = "";

    constructor(name,
        image,
        attack,
        defense,
        description = "") {

        this.name = name;
        this.image = image;
        this.attack = attack;
        this.defense = defense;
        this.description = description;
    }
}