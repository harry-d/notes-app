console.log("starting app.js...");

const fs = require("fs");
const _ = require("lodash");

const titleProperties = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};
const bodyProperties = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
};
const yargs = require("yargs")
.command("add", "Add a new note", {
    title: titleProperties,
    body: bodyProperties
})
.command("list", "List all notes")
.command("read", "Read a note", {
    title: titleProperties
})
.command("rm", "Remove a note", {
    title: titleProperties
})
.command("remove", "Remove a note", {
    title: titleProperties
});

const notes = require("./notes.js")
const argv = yargs.argv;
var command = argv._[0];// gets user argument


if (command === "add"){

    var note = notes.addNote(argv.title, argv.body);
    if (!note){
        console.log("Note already exists. No note added.");
    }
    else{
        console.log(`Note created. Title: ${note.title}`);
        notes.logNote(note);
    }

}
else if (command === "list"){
    var notesList = notes.getAll();
    notesList.forEach((note) => notes.logNote(note));
}
else if (command === "read"){

    var note = notes.getNote(argv.title);
    if (note){
        notes.logNote(note);
    }
    else{
        console.log("Note does not exist.");
    }

}
else if (command === "remove" || command === "rm"){

    if (notes.remove(argv.title)){
        console.log("Note removed.");
    }
    else{
        console.log("Note does not exist.");
    }

}
else {
    console.log("command not recognized!");
}
