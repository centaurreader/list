import {dataService} from "./services/dataService";
import {noteService} from "./services/noteService";
import {listService} from "./services/listService";

import {input} from "./modules/input";
import {list} from "./modules/list";

// dataService.init();

input.subscribe(function (newNote) {
  noteService.newNote({ note: newNote });
});

noteService.subscribe(function (notes) {
  listService.updateLists(notes);
});

listService.subscribe(function (lists) {
  list.updateUi(lists);
});

document.addEventListener("unload", function () {
  dataService.save();
});