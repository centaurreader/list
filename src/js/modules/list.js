let listContainer = document.getElementById("lists");
let subscribers = [];
function subscribe(callback) {
  subscribers.push(callback);
}
function updateSubscribers() {
  subscribers.forEach(function (subscriber) {
    subscriber();
  });
}

function updateUi(lists) {
  // foreach list get to element by id
  // redraw the note templates
  lists.forEach(function (list) {
    let listName = document.createElement("div");
    listName.innerHTML = list.name;
    listContainer.appendChild(listName);
    list.notes.forEach(function (note) {
      let newNote = document.createElement("div");
      newNote.innerHTML = note.note;
      listContainer.appendChild(newNote);
    });
  });
}

let list = {
  subscribe: subscribe,
  updateUi: updateUi
};
export {list};