let form = document.getElementById("noteForm");

let newNote = null;

let observers = [];

function updateObservers() {
  observers.forEach(function(observer) {
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
export {input};