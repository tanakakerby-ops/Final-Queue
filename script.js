// ===== script.js =====
// This file is shared by ALL the pages. It has 3 parts:
//   PART 1: the shared lists + saving and loading
//   PART 2: queue rules (who goes next?)
//   PART 3: the slider (Home and Services pages)
//
// NO PARAMETERS: none of our own functions has anything inside its brackets.
// Instead, two "shared lists" (variables) are used by every function:
//   queue = everybody who booked
//   line  = only the people who are waiting, in the right order
//
// Each person is a record like this:
//   { number: 3, label: "A003", name: "Ana", service: "Payment", priority: false, status: "waiting" }
// "status" is one of: "waiting" -> "serving" -> "done"


// ================= PART 1: SHARED LISTS, SAVING AND LOADING =================

var queue = [];   // everybody who booked (starts empty)
var line = [];    // the waiting line in the right order (starts empty)

// We save the queue in the browser using localStorage (a small notebook inside the browser).
// There is NO database, so the queue stays on this one computer/browser only.

// Load the saved queue into the shared list "queue".
function loadQueue() {
  var saved = localStorage.getItem("queue");

  if (saved === null) {
    queue = [];
  } else {
    try {
      queue = JSON.parse(saved);

      if (!Array.isArray(queue)) {
        queue = [];
      }
    } catch (error) {
      console.log("Could not read saved queue:", error);
      queue = [];
    }
  }
}

// Save the shared list "queue".
function saveQueue() {
  // localStorage can only keep text, so JSON.stringify turns the list into text first
  localStorage.setItem("queue", JSON.stringify(queue));
}

// Give the next queue number: 1, then 2, then 3 ...
function nextNumber() {
  var last = localStorage.getItem("lastNumber"); // the last number we gave out
  if (last === null) {                           // nobody has booked yet
    last = 0;                                    // so start from 0
  }
  var newNumber = Number(last) + 1;              // add 1 (Number() turns the text into a number)
  localStorage.setItem("lastNumber", newNumber); // remember it for next time
  return newNumber;                              // give the new number back
}


// ================= PART 2: QUEUE RULES =================
// (These use the shared list "queue". Call loadQueue() first so it is up to date.)

// Find the person who is being served right now. Gives back null if nobody.
function findServing() {
  for (var i = 0; i < queue.length; i++) {   // look at every person, one by one
    if (queue[i].status === "serving") {     // is this person being served?
      return queue[i];                       // yes! give this person back
    }
  }
  return null;                               // checked everyone, nobody is being served
}

// Fill the shared list "line" with the waiting people in the right order:
// priority people first (senior, PWD, pregnant), then regular people.
// Inside each group, the smaller number goes first (first come, first served).
function makeLine() {
  line = [];                                       // start with an empty line
  var i;                                           // a counter used by both loops

  for (i = 0; i < queue.length; i++) {             // LOOP 1: look at everyone
    if (queue[i].status === "waiting" && queue[i].priority === true) {
      line.push(queue[i]);                         // waiting AND priority: add to the line
    }
  }
  for (i = 0; i < queue.length; i++) {             // LOOP 2: look at everyone again
    if (queue[i].status === "waiting" && queue[i].priority === false) {
      line.push(queue[i]);                         // waiting AND regular: add after priority people
    }
  }
}

// Who should be called next? The first person in the line. Gives back null if the line is empty.
function findNextWaiting() {
  makeLine();                                      // build the line first
  if (line.length === 0) {                         // nobody is waiting
    return null;
  }
  return line[0];                                  // line[0] = the first person
}


// ================= PART 3: THE SLIDER =================

var currentSlide = 0;                              // which slide is showing now (0 = the first one)

// Show the slide number saved in "currentSlide" and hide all the others.
function showSlide() {
  var slides = document.getElementsByClassName("slide"); // all the slides on the page
  var dots = document.getElementsByClassName("dot");     // all the small dots

  if (currentSlide >= slides.length) {             // went past the last slide?
    currentSlide = 0;                              // go back to the first one
  }
  if (currentSlide < 0) {                          // went before the first slide?
    currentSlide = slides.length - 1;              // go to the last one
  }

  for (var i = 0; i < slides.length; i++) {        // look at every slide
    if (i === currentSlide) {
      slides[i].style.display = "block";           // this is the one we want: show it
      dots[i].className = "dot active";            // and color its dot
    } else {
      slides[i].style.display = "none";            // all others: hide them
      dots[i].className = "dot";
    }
  }
}

function nextSlide() {
  currentSlide = currentSlide + 1;                 // move to the next slide
  showSlide();
}

function previousSlide() {
  currentSlide = currentSlide - 1;                 // move to the slide before
  showSlide();
}

// Start the slider only if this page has slides (Home and Services).
if (document.getElementsByClassName("slide").length > 0) {
  showSlide();                                     // show the first slide
  setInterval(nextSlide, 4000);                    // then go to the next slide every 4000 ms (4 seconds)
}


// Login Html Functions//


