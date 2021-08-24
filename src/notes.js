
const fs = require('fs');
const chalk = require("chalk");

function write_in_file(dict){
    content = JSON.stringify(dict, null, 4);
    fs.writeFileSync("./notes.json", content);
    return chalk.green("Requisição processada com sucesso!");
}

function message_people_not_find(person_name){
    return chalk.red.bgWhite(`Error message: A pessoa de nome ${person_name} não consta no banco de dados!`);
}

function index_for_people(dict, person_name){
    for (var i = 0; i < dict.length; i++){
        if (dict[i].nome == person_name) return i;
    }
    return null;
}

function add(dados){
    dict = list();
    index = index_for_people(dict, dados.nome);
    if (index != null){
        return chalk.red(`Error: A pessoa de nome ${dados.nome} já está cadastrada em nosso banco de dados!`) +chalk.white("\nPara alteração de dados use o comando edit. Para remoção use o comando remove_person.");
    }
    dict.push(dados);
    return write_in_file(dict);
}

function edit(dados){
    dict = list();
    index = index_for_people(dict, dados.nome);
    if (index != null){
        dict[index] = Object.assign(dict[index], dados);
        return write_in_file(dict);
    }
    return message_people_not_find(dados.nome);   
}

function remove_person(person_name){
    dict = list();
    index = index_for_people(dict, person_name);
    if (index != null){
        dict.splice(index, 1);
        return write_in_file(dict);
    }
    return message_people_not_find(person_name)     
}

function remove_attr(person_name, attr_person){
    dict = list();
    index = index_for_people(dict, person_name);
    if (index != null){
        if (dict[index][attr_person]){
            delete dict[index][attr_person]
            return write_in_file(dict);
        }else {
            return chalk.red(`Atributo "${attr_person}" não identificado para a pessoa "${person_name}"`);
        }
    }
    return message_people_not_find(person_name);  
}

function list(){
    content = fs.readFileSync("./notes.json");
    dict = JSON.parse(content);
    return dict;
}



module.exports = {add, edit, remove_person, remove_attr, list}
