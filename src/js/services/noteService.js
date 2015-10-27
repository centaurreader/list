import {NoteModel} from "../classes/note";

let notes = [];
let subscribers = [];

function updateSubscribers() {
  subscribers.forEach(function (subscriber) {
    subscriber(notes);
  });
}
function subscribe(callback) {
  subscribers.push(callback);
}


function newNote(note) {
  let mappedNote = new NoteModel(note);
  addNote(mappedNote)
  return mappedNote;
}

function addNote(note) {
  notes.push(note);
  updateSubscribers();
}


const noteService = {
  newNote: newNote,
  subscribe: subscribe
};
export {noteService};