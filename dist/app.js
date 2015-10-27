/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _servicesDataService = __webpack_require__(1);

	var _servicesNoteService = __webpack_require__(2);

	var _servicesListService = __webpack_require__(4);

	var _modulesInput = __webpack_require__(6);

	var _modulesList = __webpack_require__(7);

	// dataService.init();

	_modulesInput.input.subscribe(function (newNote) {
	  _servicesNoteService.noteService.newNote({ note: newNote });
	});

	_servicesNoteService.noteService.subscribe(function (notes) {
	  _servicesListService.listService.updateLists(notes);
	});

	_servicesListService.listService.subscribe(function (lists) {
	  _modulesList.list.updateUi(lists);
	});

	document.addEventListener("unload", function () {
	  _servicesDataService.dataService.save();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classesNote = __webpack_require__(3);

	var notes = [];
	var subscribers = [];

	function updateSubscribers() {
	  subscribers.forEach(function (subscriber) {
	    subscriber(notes);
	  });
	}
	function subscribe(callback) {
	  subscribers.push(callback);
	}

	function newNote(note) {
	  var mappedNote = new _classesNote.NoteModel(note);
	  addNote(mappedNote);
	  return mappedNote;
	}

	function addNote(note) {
	  notes.push(note);
	  updateSubscribers();
	}

	var noteService = {
	  newNote: newNote,
	  subscribe: subscribe
	};
	exports.noteService = noteService;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NoteModel = function NoteModel(data) {
	  _classCallCheck(this, NoteModel);

	  this.id = 0;
	  this.note = data.note;
	};

	exports.NoteModel = NoteModel;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _servicesDataService = __webpack_require__(1);

	var _classesList = __webpack_require__(5);

	var lists = [];
	var subscribers = [];
	function subscribe(callback) {
	  subscribers.push(callback);
	}
	function updateSubscribers() {
	  subscribers.forEach(function (subscriber) {
	    subscriber(lists);
	  });
	}

	function resolveNotes(list, newNotes) {
	  newNotes.forEach(function (newNote) {
	    var existingNote = list.notes.find(function (note) {
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
	    lists.push(new _classesList.ListModel({ name: "New list" }));
	  }
	  lists.forEach(function (list) {
	    resolveNotes(list, notes);
	  });
	  updateSubscribers();
	}

	var listService = {
	  updateLists: updateLists,
	  subscribe: subscribe
	};
	exports.listService = listService;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ListModel = (function () {
	  function ListModel(data) {
	    _classCallCheck(this, ListModel);

	    this.id = 0;
	    this.name = data.name;
	    this.notes = [];
	  }

	  _createClass(ListModel, [{
	    key: "removeAllNotes",
	    value: function removeAllNotes() {
	      this.notes([]);
	    }
	  }, {
	    key: "removeNote",
	    value: function removeNote(id) {
	      if (!id) {
	        return;
	      }
	      this.notes = this.notes.splice(this.notes[this.notes.indexOf(id)]);
	    }
	  }, {
	    key: "addNote",
	    value: function addNote(id) {
	      this.notes.push(id);
	    }
	  }, {
	    key: "addNotes",
	    value: function addNotes(ids) {
	      ids.forEach(function (id) {
	        this.addNote(id);
	      });
	    }
	  }]);

	  return ListModel;
	})();

	exports.ListModel = ListModel;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var form = document.getElementById("noteForm");

	var newNote = null;

	var observers = [];

	function updateObservers() {
	  observers.forEach(function (observer) {
	    observer(newNote);
	  });
	  newNote = null;
	}

	function subscribe(callback) {
	  observers.push(callback);
	}

	form.addEventListener("submit", function (event) {
	  event.preventDefault();
	  newNote = event.target[0].value;
	  updateObservers();
	  event.target[0].value = "";
	});

	var input = {
	  subscribe: subscribe
	};
	exports.input = input;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var listContainer = document.getElementById("lists");
	var subscribers = [];
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
	    var listName = document.createElement("div");
	    listName.innerHTML = list.name;
	    listContainer.appendChild(listName);
	    list.notes.forEach(function (note) {
	      var newNote = document.createElement("div");
	      newNote.innerHTML = note.note;
	      listContainer.appendChild(newNote);
	    });
	  });
	}

	var list = {
	  subscribe: subscribe,
	  updateUi: updateUi
	};
	exports.list = list;

/***/ }
/******/ ]);