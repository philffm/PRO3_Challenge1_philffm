// Set all the VARS and assign initial value if needed
var startDate = new Date("Oct 12, 2018 15:37:25");
var impactDate = new Date("Mar 10, 2019 15:37:25");
var durationTime = 149;
var foodie,drinks;
var drinkTokens=3,foodTokens=3;

// Set all the ARRAYS
foodie = ["Space Döner Kebab", "Flying Schnitzel", "3D printed Pizza Hawaii", "Magic Bitterballen"]
drinks = ["Ayran Mango", "Club Mate", "Tomato juice"]
spaceships = ["Apollo 100", "Marshond 1100", "Spacecat 101"]
dayaction = ["breakfast", "lunch", "dinner"]


// Set randomized initial values for the array vars using custom randomarray function (math function)
var currentDrink=randomarray(drinks), currentFood=randomarray(foodie), spaceshipName=randomarray(spaceships), currentDayaction=randomarray(dayaction);

// Update initial information in interface

function updatespaceshipvalues() {


    if (drinkTokens >=1){

        document.querySelector(".value_drinks").innerText = currentDrink;
        document.querySelector(".value_drinktokens").innerText = drinkTokens;
        buttonlistener(".cta.drinks",deliverypopup,currentDrink);

    }
    
    if (foodTokens >=1){
        document.querySelector(".value_foodie").innerText = currentFood;
        document.querySelector(".value_foodtokens").innerText = foodTokens;
        buttonlistener(".cta.foodie",deliverypopup,currentFood);
    }
    
    document.querySelector(".value_spaceship").innerText = spaceshipName;
    document.querySelector(".value_dayaction").innerText = currentDayaction;



}
// Initial update information in interface

updatespaceshipvalues();




// Intervals for updating values
var fuelInterval = setInterval(updatefuel, 100);
var thrInterval = setInterval(updatethrottle, 1000);
var speedInterval = setInterval(updatespeed, 1000);
var gforceInterval = setInterval(updategforce, 1000);
var countownInterval = setInterval(updatecountdown, 1000);


//Update catering information (drinks, food: new array item, substr. token - YES, I could have done it in 1 functions :D thats my learning process)
function updatedrinks() { 
    currentDrink=randomarray(drinks);
    drinkTokens-=1;
    if(drinkTokens==0){

        currentDayaction="some sleep"
        document.querySelector(".value_dayaction").innerText = currentDayaction;

    }

    updatespaceshipvalues();
    checktokens();

}
function updatefood() { 
    currentFood=randomarray(foodie);
    foodTokens-=1;
    if(foodTokens==0){

        currentDayaction="some sleep"
        document.querySelector(".value_dayaction").innerText = currentDayaction;

    }

    updatespaceshipvalues();
    checktokens();


}


function updatecountdown() {

  // Get todays date and time
  var now = new Date().getTime();

  // calculate distance between given date and now
  var distance = impactDate - now;

  // calculate time for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in UI
  document.querySelector(".value_days").innerText = days
  document.querySelector(".value_hours").innerText = hours
  document.querySelector(".value_minutes").innerText = minutes
  document.querySelector(".value_secs").innerText = seconds
}

// Display the spacecraft information in UI

// outputs random number between 2 values
function randomnumber(min,max) 
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

function updatefuel() {
    var now = new Date().getTime();
    var tripProgress = (now/(impactDate-startDate));
    var fuelTank = ((durationTime/tripProgress)-1)*100;
    document.querySelector(".value_fuel").innerText = fuelTank + "%";
}

function updatethrottle() {
    document.querySelector(".value_thr").innerText = randomnumber(15,35) + "%";
}

function updatespeed() {
    document.querySelector(".value_speed").innerText = randomnumber(99000,107000) + " kph";
}

function updategforce() {
    document.querySelector(".value_gforce").innerText = (randomnumber(1,30))/100 + " g";
}


//randomarray function outputs values according to given arguments
function randomarray(arrayName) {
    var randomItem = arrayName[Math.floor(Math.random()*arrayName.length)];
    return randomItem;
}



// Check for sufficient token amount
function checktokens(){
    if(drinkTokens==0) {
        document.querySelector(".cta.drinks").remove();
        document.querySelector(".infopane.drinks").innerHTML = '<span style="color:#ff0000;font-size: 1.2em;">Je hebt niets meer te drinken.</span>';
        document.querySelector(".value_drinktokens").innerText = drinkTokens;



    } 

    if(foodTokens==0) {
        document.querySelector(".cta.foodie").remove();
        document.querySelector(".infopane.food").innerHTML = '<span  style="color:#ff0000;font-size: 1.2em;">Je hebt niets meer te eten.</span>';
        document.querySelector(".value_foodtokens").innerText = foodTokens;


    }
    
}

// Universal buttonlistener functions (had too many buttons to be checked, so I created one with 3 arguments)
function buttonlistener(cssSelector,callFunction,functionArgument) {
    document.querySelector(cssSelector).addEventListener("click", function(){
    
        callFunction(functionArgument);
    
    });
}


function closeinfobubble(functionFollowup) {

   document.querySelector(".infobubble").remove()
   functionFollowup();

}


// Delivery popup function for both food and drinks (inject via. property)
function deliverypopup(foodName,foodCategoryName){
    
    // Output specific message for food type (food/drinks - don't know why I made it in Dutch - but why not!)
    if(foodName==currentDrink){
        foodCategoryName = "frisdrankje";
    }else foodCategoryName = "etentje";

    // Define const for the infobox to address it easier
    const INFOBOX = document.querySelector("div.infobox.user");
    // Create the infobox with injected content
    INFOBOX.innerHTML += '<div class="infobubble"><p><p>Jouw '+ foodCategoryName + " "  + '<b>"' +foodName+ '</b>"' +' is onderweg</p></p><div class="cta dismiss"><a href="#">ok cool</a></div></div>';


    document.querySelector(".cta.dismiss").addEventListener("click", function(){

        //call followup-function depending on the kind of infobubble (food/drink)
        if (foodName==currentDrink ) {
            closeinfobubble(updatedrinks);
        }else if (foodName==currentFood ) {
            closeinfobubble(updatefood);
        }


    });

     

}
//delivering the both sad and uninspired information that there is nothing to see on Mars 
document.querySelector(".cta.exploremars").addEventListener("click", function(){
    alert("Mars has nothing to offer yet");
});
