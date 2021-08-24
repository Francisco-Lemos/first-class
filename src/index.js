
const yargs = require("yargs");
const notes = require("./notes.js");

function copyng_data(data){
    copy_data = Object.assign({},data);
    delete copy_data._;
    delete copy_data.$0;
    return copy_data;
}

yargs.command({
    command: "add", 
    describe: "Add a new person",
    builder: {
        nome:{
            describe : "person name",
            demandOption: true,
            typeof: "string",
        },
    },
    handler: function (argv){
        data = copyng_data(argv);
        console.log(notes.add(data));
    }
});

yargs.command({
    command: "edit", 
    describe: "edit a person atrribute",
    builder: {
        nome:{
            describe : "person name",
            demandOption: true,
            typeof: "string",
        },
    },
    handler: function (argv){
        data = copyng_data(argv);
        console.log(notes.edit(data));
    }
});

yargs.command({
    command: "remove_person", 
    describe: "remove a person",
    builder: {
        nome:{
            describe : "person name",
            demandOption: true,
            typeof: "string",
        },
    },
    handler: function (argv){
        person_name = argv.nome
        console.log(notes.remove_person(person_name))
    }
});

yargs.command({
    command: "remove_attr", 
    describe: "remove a atribute person",
    builder: {
        nome:{
            describe : "person name",
            demandOption: true,
            typeof: "string",
        },
        attr:{
            describe : "person atribute",
            demandOption: true,
            typeof: "string",
        },
    },
    handler: function (argv){
        person_name = argv.nome;
        attr_person = argv.attr;
        console.log(notes.remove_attr(person_name, attr_person));
        
    }
});

yargs.command({
    command: "list", 
    describe: "list the persons",
    handler: function (){
        console.table(notes.list())
    }
});

yargs.parse();

