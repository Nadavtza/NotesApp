
//modules 
const fs = require('fs'); //fetch all fs modules
const _ = require('lodash'); // use lodash module
const yargs = require('yargs'); //parser

//my files 
const notes = require('./notes.js');
var title = {
    describe:'Title of note',
    demand: true, 
    alias: 't'
}
var body = {
    describe:'Body of the note',
    demand: true, 
    alias: 'b'
}
//get command from user
var argv = yargs.command('add','Add a new note',{
    title,
    body
})
.command('list', 'List all notes')
.command('read', 'Read a note',{
    title
})
.command('remove', 'Remove a note',{
    title
})
.command('edit', 'Edit a note',{
    title,
    body
})
.help()
.argv;

var command = argv._[0];


if(command === 'add')
{
    var note = notes.addNotes(argv.title , argv.body);
    if(note === undefined){
        console.log('Note title taken');
    } 
    else{   
        console.log('Note created');
        notes.logNote(note);
    }
    
}
else if (command === 'list')
{
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
}
else if (command === 'read')
{
    var note = notes.getNote(argv.title);
    if (note === undefined)
    {
        console.log('Note title not found');
    }
    else
    {
        console.log('Note read');
        notes.logNote(note);
    }
}
else if (command === 'remove')
{
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found' ;
    console.log(message);
}
else if (command === 'edit')
{
    var note = notes.editNote(argv.title, argv.body);
    if (note === undefined)
    {
        console.log('Note title not found');
    }
    else
    {
        console.log('Note edit');
        notes.logNote(note);
    }
}
else
{
    console.log(`Command "${command}" not recognized`);
}

