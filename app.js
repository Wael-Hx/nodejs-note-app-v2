const fs = require("fs");
const yargs = require("yargs")
.help(false)
let note = yargs.argv.note;
let command = yargs.argv._[0];
command ? command= command.toString() : command ;
let list = [];
 

switch (command) {
  case "add":
    if (
      !yargs.argv.note ||
       Object.keys(yargs.argv.note)[0] !== "title" ||
      Object.keys(yargs.argv.note)[1] !== "body"
    ) {
      console.log("some of the commands are wrong type: 'node app.js help ' ");
    } else
     {if (typeof note.title === "boolean" || !note.title ) {
      console.log('note cannot be empty , type "node app.js help"');
    } else {
        note.body ===true ? note.body='': note.body;
      list = [...list, note];
      list = [...list, ...JSON.parse(fs.readFileSync("notes.json"))];
      fs.writeFileSync("notes.json", JSON.stringify(list));
      console.log("note added");
    }}
    break;
  case "list":
    let noteList = JSON.parse(fs.readFileSync("notes.json"));
    if (noteList.length === 0) {
      console.log("your note list is empty ");
    } else {
      noteList.forEach((e, i) => {
        console.log(i + 1 + " " + e.title + ":" + " " + e.body, "\n");
      });
    }
    break;
  case "reset":
    list = [];
    fs.writeFileSync("notes.json", JSON.stringify(list));
    console.log("note list cleared");
    break;
  case "remove":
    const index = yargs.argv._[1];
    if (!yargs.argv._[1] || typeof index !== "number") {
      console.log("you must provide the note index after the command");
    } else {
      let noteList = JSON.parse(fs.readFileSync("notes.json"));
      noteList = noteList.filter((note, i) => {
        return i !== index - 1;
      });
      console.log("note number: " + index + " was removed");
      fs.writeFileSync("notes.json", JSON.stringify(noteList));
    }
    break;
  case "help":
     
    console.log(
        "\n",
      'to add a note type: node app.js add --note.title "TITLE" --note.body "BODY" ',
      "\n",
      "---------------------------------------------",
      "\n",
      'to show your notes type:  node app.js list ',
      "\n",
      "---------------------------------------------",
      "\n",
      'to remove a note type:  node app.js remove [IndexOfNote] ',
      "\n",
      "---------------------------------------------",
      "\n",
      'to clear all notes type:  node app.js reset ',
      "\n"
    ) 
    break;
    case undefined :
        console.log('to get the command list type: node app.js help ');
        break;
  default:
    console.log('unkonwn command please type "node app.js help "');
    break;
}
