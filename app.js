// test for local storage support
var hasStorage = false;
function lsTest() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  };
};
if (lsTest() === true){
  hasStorage = true;
}else{
  alert('Your browser does not support local storage. No data will be saved on exit. Sorry.')
};

// build guid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

// data models
var NoteModel = function(note, noteFromStorage) {
  var self = this;

  self.id = noteFromStorage ? noteFromStorage.id : guid();
  self.value = ko.observable(noteFromStorage ? noteFromStorage.value : note);

  return self;
};
var ListModel = function (notes, list) {
  var self = this;

  self.id = list ? list.id : guid();
  self.name = ko.observable(list ? list.name : 'New List');
  self.nameFix = ko.computed(function () { if(self.name().length === 0) { self.name('...'); }});
  self.notes = ko.observableArray();
  if (list) {
    var notes = [];
    for (var i = 0, length = list.notes.length; i < length; i++) {
      var note = list.notes[i];
      notes.push(new NoteModel(null, note));
    };
    self.notes(notes);
  };

  self.newNote = ko.observable();
  self.addNote = function (element) {
    if (self.newNote()) {
      if (self.newNote().length > 0) {
        self.notes.push(new NoteModel(self.newNote()));
        self.newNote(null);
      };
    };
  };

  self.keypressInput = function (element, event) {
      var code = (event.keyCode ? event.keyCode : event.which);
      if (code == 13) { //Enter keycode
        self.addNote();
      }else { 
        return true; 
      };
  };

  return self;
};

var vm = function () {
  var self = this;

  self.lists = ko.observableArray();

  self.newNote = ko.observable();


  self.addList = function () { self.lists.push(new ListModel(self.notes)); };
  self.clearList = function (element) { element.notes.removeAll(); };
  self.deleteList = function (element) { self.lists.remove(element); };
  self.serializeList = function (element) { 
    var notes = '';
    for (var i = 0, length = element.notes().length; i < length; i++) {
      notes += element.notes()[i].value();
      notes += '\r\n'
    }; 
    window.prompt("Copy to clipboard: Ctrl+C, Enter", notes);
  };

  self.deleteNote = function (element) { 
    ko.utils.arrayForEach(self.lists(), function(list) {
      list.notes.remove(element);
    });
  };
  self.addNote = function () {
    if (self.newNote()) {
      if (self.lists()) {
        if (self.lists().length === 0) {
          self.addList();
        };
      };
      if (self.newNote().length > 0) {
        var note = new NoteModel(self.newNote());
        for (var i = 0, length = self.lists().length; i < length; i++) {
          self.lists()[i].notes.push(note);
        };
        self.newNote(null);
      };
    };
  };
  document.getElementById('newNote').addEventListener('keypress', keypressInput)
  function keypressInput(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) { //Enter keycode
          e.preventDefault();
          self.addNote();
      };
  };
  

  // init from local storage
  var loadFromStorage = function () {
    var listsFromStorage = JSON.parse(localStorage.getItem('lists'));
    if (listsFromStorage != null) {
      var lists = [];
      for(var i = 0, length = listsFromStorage.length; i < length; i++) {
        var list = listsFromStorage[i];
        lists.push(new ListModel(null, list));
      };
      self.lists(lists);
  	};
  };
  // save to local storage on exit
  self.updateStorage = function () { localStorage.setItem('lists', ko.toJSON(self.lists())); };
  if(hasStorage) {
    loadFromStorage(); // call load
    window.onunload = self.updateStorage;
  };


  return self;
};
ko.applyBindings(new vm());