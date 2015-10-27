import {dataService} from "./services/dataService";
import {noteService} from "./services/noteService";
import {listService} from "./services/listService";

dataService.init();

let form = document.getElementById("noteForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let note = noteService.addNote();
  listService.addNote("list id goes here", note);
});

document.addEventListener("unload", function () {
  dataService.save();
});