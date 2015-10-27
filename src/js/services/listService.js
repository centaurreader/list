import {dataService} from "../services/dataService";
import {ListModel} from "../classes/list";

let lists = [];
let subscribers = [];
function subscribe(callback) {
  subscribers.push(callback);
}
function updateSubscribers() {
  subscribers.forEach(function (subscriber) {
    subscriber(lists);
  });
}

function resolveNotes(list, newNotes) {
  newNotes.forEach(function(newNote) {
    let existingNote = list.notes.find(function (note) {
      return newNote.id === note.id;
    });
    if (existingNote) {
      existingNote.note = newNote.note;
    } else {
      list.notes.push(newNote);
    }
  });
};

function updateLists(notes) {
  if (!lists.length) {
    lists.push(new ListModel({ name: "New list" }));
  }
  lists.forEach(function (list) {
    resolveNotes(list, notes);
  });
  updateSubscribers();
}

let listService = {
  updateLists: updateLists,
  subscribe: subscribe
};
export {listService};