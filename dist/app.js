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

	_servicesDataService.dataService.init();

	var form = document.getElementById("noteForm");
	form.addEventListener("submit", function (event) {
	  event.preventDefault();
	  var note = _servicesNoteService.noteService.addNote();
	  _servicesListService.listService.addNote("list id goes here", note);
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

	var _servicesDataService = __webpack_require__(1);

	var _classesNote = __webpack_require__(3);

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

	var _servicesDataService = __webpack_require__(1);

	var _classesList = __webpack_require__(5);

	// move listmodel functions here?

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

/***/ }
/******/ ]);