const fs = require('fs');

//functions
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
       } catch (notSuchFile) {
          return [];
       } 
}; 

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json' , JSON.stringify(notes));
};

var addNotes  = (title , body) => {
    var notes = fetchNotes();

    var note = {
     title,
     body  
   };

   var duplicatesNotes = notes.filter((note)=>note.title===title);
    if(duplicatesNotes.length !=0) { return; }
    notes.push(note);
    saveNote(notes);
    return note;
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
   return notes.filter((note)=> note.title === title)[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var len =notes.length;
    notes = notes.filter((note)=> note.title !== title);
    saveNote(notes);
    return len !==notes.length;
};

var editNote = (title,body)=>{
    var notes = fetchNotes();
    var editNotes = notes.filter((note)=> note.title !== title);
    var note = {
        title,
        body  
      };
    if(notes.length ===editNotes.length) 
    {
        return;  
    }
    editNotes.push(note);
    saveNote(editNotes);
    return note;
};

var logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
//exports module
module.exports = {
    addNotes,
    getAll,
    getNote,
    removeNote,
    logNote,
    editNote
};