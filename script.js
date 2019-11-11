// Nano site
// It needs to store a wordcount
// It needs to update the wordcount easily
// It needs to have milestones
// it needs to tell users if they hit the goal

let wordCount = 0;
let target = 0;
let targeted = window.localStorage.getItem('savedTarget');
let saved = window.localStorage.getItem('savedCount');
// savedInputs will save wordcount history into an array.
// The function showSaved will then display that array.
// I'm not sure if I want to add funcitonality beyond that.
let savedInputs = [];
// functions regarding word count go here
function updateCount(){
  wordCount = document.getElementById("wordCount").value;
  window.localStorage.setItem("savedCount", wordCount.toString());
  savedInputs.push(wordCount);
  window.localStorage.setItem("savedTotal", savedInputs.toString());
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
};

function showSaved(){
  let newSaved = window.localStorage.getItem("savedTotal");
  let testArr = newSaved.split(",");
  let counter = 1;
  let finalArr = [];
  for (let h = 0; h < testArr.length; h++){
    finalArr.push(" Entry " + counter + ": " + testArr[h]); 
    counter++;
  };
  
if (finalArr != null){
  document.getElementById('inputHistory').innerHTML = finalArr; 
}
};

function clearHistory(){
  window.localStorage.removeItem("savedTotal");
  document.getElementById('inputHistory').innerHTML = "";
};
function clearAll(){
  window.localStorage.clear();
};

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
  document.getElementById('finalTarget').innerHTML = finalTarget + " word target";
};

// stuff related to words per day go here
// This section needs to be pull from the target section
// It needs to divide the target by 30 (possibly a variable between 28, 31)
// it needs to calculate the amount of words per day needed to meet those goals
// it needs to push that info into the DOM and show a calendar type thing
// It the needs to check for milestones.
// It possibly needs to be able to check dates and see if you're on track
let wordsPerDay = 0;
function wordsPerDayF(x, z){
wordsPerDay = x / z;
wordsPerDay = Math.round(wordsPerDay)
document.getElementById('wordsNeeded').innerHTML = wordsPerDay.toString();
};

let totalDays = parseInt(window.localStorage.getItem('challenge'));

function changeDays(){
  totalDays = document.getElementById('challenge').value;
  window.localStorage.setItem('challenge', totalDays.toString());
};
function showChallenge(){
  let updatedDays = window.localStorage.getItem('challenge');
  updatedDays = parseInt(updatedDays);
  document.getElementById('challenger').innerHTML = updatedDays + " Day Challenge";
};
// wordsPerDay(parseInt(window.localStorage.getItem('savedTarget')), totalDays);
// This function above is how we're going to pull the data from the target. It'll show up in the HTML

//Next up is milestones
// It needs to see if you hit a milestone or not...
// The ul tags calendar need to create list elements containing an approximate day count
let milestones = []
let finalMilestones = [];
//daysNum MUST equal totalDays. totalDays will be updated via a new fuction.
//Words per day nees two parameters now, with one being totalDays as well.
//Create milestones is called via the final() function. It MUST have totalDays as the parameter to work.
function createMilestones(daysNum){
  let newWordCount = wordsPerDay;
for (let w = 1; w <= daysNum; w++){
  milestones.push(newWordCount * w)
};
let count = 1;
for (let z = 0; z < daysNum; z++){
  finalMilestones.push("Day " + count + ": " + milestones[z]);
  count++;
};
};
function final(){
document.getElementById("wordsNeeded").innerHTML = "";
milestones = [];
finalMilestones = [];
wordsPerDayF(parseInt(window.localStorage.getItem('savedTarget')), totalDays);
createMilestones(totalDays);
let str = '<ul>'
finalMilestones.forEach(function(item) {
  str += '<li>'+ item + '</li>';
}); 
str += '</ul>';
document.getElementById("wordsNeeded").innerHTML = str;
};

// These functions show the days in and save it
let todaysDate = window.localStorage.getItem("date");

function saveDate(){
 let originalDate = document.getElementById("currentDay").value;
  window.localStorage.setItem("date", originalDate.toString());
};

function showDate(){
  todaysDate = window.localStorage.getItem("date");
  let showingDate = window.localStorage.getItem("date");
  parseInt(showingDate);
  document.getElementById('daysIn').innerHTML = "Days In: " + showingDate;
};
//Toggle will return true or false if you hit your wordcount
// If the wordcount has been hit at least, then you'll get the pup.

// Checking the dates for winners is up next
function winner(){
  document.getElementById('goodJob').innerHTML = "";
  let checkWinner = wordsPerDay * parseInt(todaysDate);
  let checkRemainder = checkWinner - parseInt(saved);
  document.getElementById('remainder').innerHTML = "";
  if (parseInt(saved)  >= checkWinner){
    document.getElementById('goodJob').innerHTML = "Good Job hitting your word count! You're the best!";
    document.getElementById('remainder').innerHTML = "Words over: " + Math.abs(checkRemainder);
  } else if (isNaN(checkRemainder) == false) {
    document.getElementById('remainder').innerHTML = "Words left to go: " + checkRemainder;
    document.getElementById('goodJob').innerHTML = "Still got more to go! Keep on going!"
  } else {
    document.getElementById('remainder').innerHTML = "";
  }
};
// This next section will reward with milestones
// Each milestone be every 5k. I.E. you get a "prize" for hitting 10k, 15k, 20k, etc.
// I'll probably put an upper limit of some sort. Not sure what kind, but it'll happen. 
// The reward will consist probably of styling OR pictures of cute dogs
// Toggle will only activate

function fiveK(){
  document.getElementById('milestones').innerHTML = "";
  let checkinterval = Math.floor(wordCount / 5000);
  let five = checkinterval * 5000;
  if (parseInt(wordCount) >= parseInt(targeted)) {
    document.getElementById('milestones').innerHTML = "Congratulations on finishing! you hit your target word count! Buy yourself a drink! You deserve it!";
    pushPup();
    
  } else if (wordCount >= five && wordCount >= 5000){
  document.getElementById('milestones').innerHTML = "You hit " + five + " words! Congratulations! Keep it up! Here's a puppy!";
    pushPup();
  } else {
    document.getElementById('cute').src = "";
    document.getElementById('cute').ClassList = "hidden";
  };

};

// Rewards next?
// I'll probably have to modify the current functions to do that
// I'll also probably want to clean up some of this code too.
// This could be a good opportunity to working styling it a bit too.
// The rewards will probably be images. I'll need to host them or possibly pull a random one from imgur or something.
// I actually like the idea of pulling from imgur, but that's a bit harder.
// As per sensei's idea, I'll be using an XMLHTTP request.
// I'll also be using the imgur and reddit api to bring this to life
// this is probably the most technically challenging thing I've done
//This variable "randomPup" will store the puppy image puppyFinder
// Then the function pushPup will be called if a milestone is hit.
let randomPup;
let puppyFinder = new XMLHttpRequest();
//Begins the function once the xmlhttp request state changes...
puppyFinder.onreadystatechange = function(){
// once it's considered done, it converts the JSON string to an object
// The object is then passed into the global variable randomPup
  if (puppyFinder.readyState === XMLHttpRequest.DONE){
  let json = JSON.parse(puppyFinder.response);
  randomPup = json;
  };
};
// This is where the html request is pulling from.
// I don't totally understand the syntax yet
// I need to do more research on xmlhttp requiests
// .open seems to decide where to pull from
puppyFinder.open("GET", "https://api.imgur.com/3/gallery/r/puppies/hot/day/1", true);
// .setRequestHEader Seems to set up authorization, but how? Where does the client ID come from?
puppyFinder.setRequestHeader ("Authorization", "Client-ID 2c2895992633e8c");
// .send() initializes the request
puppyFinder.send();

function pushPup(){
// This removes the "hidden" class from the img element.
  document.getElementById('cute').classList = "";
  // The randomPup object should only be 100 items, so this pulls a random item from 1-100.
document.getElementById('cute').src = randomPup.data[Math.floor(Math.random() * 100 ) + 1].link;
};

//Validation functions below: They check if a positive number is input.
//For wordcount and days in, it'll first check if there's local storage and revert the invalid input to the local item.
// This way, if someone accidentally puts in a decimal, it'll still hold your previous value.
// This doesn't prevent accidentally going too high or too low. I'm not sure what to do with that one...

function validate(){
  validator1 = document.getElementById('wordCount').value;
  if (validator1 > 0 && validator1 % 1 === 0){
    return true;
  } else {
    alert("Pick something greater than 0 dude! Also no decimals! I'm putting in your last saved value or if you don't have one, setting it to 1 word (lol). Feel free to change it.");
    if (window.localStorage.getItem("savedCount") === null){
      document.getElementById('wordCount').value = 1;
    } else {
    document.getElementById('wordCount').value = window.localStorage.getItem("savedCount");
  };
}
};
function validate2(){
  validator2 = document.getElementById('target').value;
  if (validator2 > 0 && validator2 % 1 === 0){
    return true;
  } else {
    alert("Pick something greater than 0 dude! Also no decimals! I'm putting in 50k, feel free to change it.");
    document.getElementById('target').value = 50000;
  }
};

function validate3(){
  validator3 = document.getElementById('challenge').value;
  if (validator3 > 0 && validator3 % 1 === 0){
    return true;
  } else {
    alert("Pick something greater than 0 dude! Also no decimals! I'm starting you at 30 days, feel free to change it.");
    document.getElementById('challenge').value = 30;
  }
};

function validate4(){
  validator4 = document.getElementById('currentDay').value;
  if (validator4 > 0 && validator4 % 1 === 0){
    return true;
  } else {
    alert("Pick something greater than 0 dude! Also no decimals! I'm putting in your last saved date or if you don't have one, I'm setting it to one. Feel free to change it.");
    if (window.localStorage.getItem("date") === null){
      document.getElementById('currentDay').value = 1;
    } else {
    document.getElementById('currentDay').value = window.localStorage.getItem("date");
    }
  };
};


// I'd love to find a way to get the image to load before it appears.
// Or to have it queued up before the next change. Maybe have a second one ready? I.E. two variables....hrmmmm
// Might require some playing around with regarding the order of operations.


// Possible things to clean up:
// Setting it up so cases like -100 aren't allowed. Done!
// Maybe the default value can = 50000. Sorta done! I don't wanna be too restrctive.
// Then if someone puts something stupid, they get an alert Done!
// I can also change it so that the challenge can be more or less days. Done!
// Right now I only reward at milestones, but rewards at wordcounts would be nice...
// And that's that!

//
