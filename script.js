// Nano site
// It needs to store a wordcount
// It needs to update the wordcount easily
// It needs to have milestones
// it needs to know if you made it

let wordCount = 0;
let target = 0;
let targeted = window.localStorage.getItem('savedTarget');
let saved = window.localStorage.getItem('savedCount');

// functions regarding word count go here
function updateCount(){
  wordCount = document.getElementById("wordCount").value;
  window.localStorage.setItem("savedCount", wordCount.toString());
};
function displayCount(){
  let total = saved.toString();
  document.getElementById('total').innerHTML = total;
};
function checkSaved(){
  saved = window.localStorage.getItem('savedCount');
  let savedCount = parseInt(saved);
  if (savedCount !== 0){
    displayCount();
  };
}
/*
function dayTargets(){
  let arrayofStrings = [];
  for (let i = 1; i <= 30; i++){
    arrayofStrings.push("Day " i " - " + i * 1667);
  }
  for (let b = 0; b <= arrayofStrings.length; b++){
   document.getElementById('targets').innerHTML
  }
};
*/

// Functions regarding targets go here

function askTarget (){
  target = document.getElementById("target").value;
  window.localStorage.setItem("savedTarget", target.toString());
};

function checkTarget(){
targeted = window.localStorage.getItem('savedTarget');
let savedTarget = parseInt(targeted);
if (savedTarget !== 0){
  displayTarget();
};
};

function displayTarget (){
  let finalTarget = targeted.toString();
  document.getElementById('finalTarget').innerHTML = finalTarget;
};

// stuff related to words per day go here
// This section needs to be pull from the target section
// It needs to divide the target by 30 (possibly a variable between 28, 31)
// it needs to calculate the amount of words per day needed to meet those goals
// it needs to push that info into the DOM and show a calendar type thing
// It the needs to check for milestones.
// It possibly needs to be able to check dates and see if you're on track
let wordsPerDay = 0;
function wordsPerDayF(x){
wordsPerDay = x / 30;
wordsPerDay = Math.round(wordsPerDay)
document.getElementById('wordsNeeded').innerHTML = wordsPerDay.toString();
};

// wordsPerDay(parseInt(window.localStorage.getItem('savedTarget')));
// This function above is how we're going to pull the data from the target
// I think I can also add 

//Next up is milestones
// It needs to see if you hit a milestone or not...
// The ul tags calendar need to create list elements containing an approximate day count
let milestones = []
let finalMilestones = [];
function createMilestones(){
  let newWordCount = wordsPerDay;
for (let w = 1; w <= 30; w++){
  milestones.push(newWordCount * w)
};
let count = 1;
for (let z = 0; z < milestones.length; z++){
  finalMilestones.push("Day " + count + ": " + milestones[z]);
  count++;
};
};
function final(){
document.getElementById("wordsNeeded").innerHTML = "";
milestones = [];
finalMilestones = [];
wordsPerDayF(parseInt(window.localStorage.getItem('savedTarget')));
createMilestones();
let str = '<ul>'
finalMilestones.forEach(function(item) {
  str += '<li>'+ item + '</li>';
}); 
str += '</ul>';
document.getElementById("wordsNeeded").innerHTML = str;
};
// These functions show the days in and save it
let todaysDate = window.localStorage.getItem("date")
function saveTheDate(){
  let findDate = document.getElementById("currentDay").value;
  window.localStorage.setItem("date", findDate.toString());
};
function showTheDate(){
  saveTheDate();
  document.getElementById("daysIn").innerHTML = todaysDate.toString();
};

// Checking the dates is up next
function winner(){
  let checkWinner = parseInt(todaysDate) * parseInt(wordsPerDay);
  if (parseInt(saved)  == checkWinner){
    document.getElementById("goodJob").innerHTML = "Good Job hitting your wordcount! You're the best!";
  };
};

// 

//
