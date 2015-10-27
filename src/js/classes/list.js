class ListModel {
  constructor(data) {
    this.id = 0;
    this.name = data.name;
    this.notes = [];
  }
  removeAllNotes() {
    this.notes([]);
  }
  removeNote(id) {
    if (!id) {
      return;
    }
    this.notes = this.notes.splice(this.notes[this.notes.indexOf(id)]);
  }
  addNote (id) {
    this.notes.push(id);
  }
  addNotes (ids) {
    ids.forEach(function (id) {
      this.addNote(id);
    });
  }
}

export {ListModel};