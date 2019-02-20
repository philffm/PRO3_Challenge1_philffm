// Set all the VARS, bitches
var startDate = new Date("Oct 12, 2018 15:37:25");
var impactDate = new Date("Mar 10, 2019 15:37:25");
var durationTime = 149;
var foodie,drinks;
var drinkTokens=3,foodTokens=3;


foodie = ["Space Döner Kebab", "Flying Schnitzel", "3D printed Pizza Hawa", "Magic Bitterballen"]
drinks = ["Ayran Mango", "Club Mate", "Tomato juice"]
var infobox = document.getElementsByClassName("infobox user");

var currentDrink=randomarray(drinks), currentFood=randomarray(foodie)

function updatespacecraftvalues() {


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
    
    

}

updatespacecraftvalues();




// Intervals for updating values
var fuelInterval = setInterval(updatefuel, 100);
var thrInterval = setInterval(updatethrottle, 1000);
var speedInterval = setInterval(updatespeed, 1000);
var gforceInterval = setInterval(updategforce, 1000);
var countownInterval = setInterval(updatecountdown, 1000);

// Constants



function updatedrinks() { 
    currentDrink=randomarray(drinks);
    drinkTokens-=1;
    checktokens();
    updatespacecraftvalues();
}
function updatefood() { 
    currentFood=randomarray(foodie);
    foodTokens-=1;
    checktokens();
    updatespacecraftvalues();

}




function updatecountdown() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = impactDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result 

  document.querySelector(".value_days").innerText = days
  document.querySelector(".value_hours").innerText = hours
  document.querySelector(".value_minutes").innerText = minutes
  document.querySelector(".value_secs").innerText = seconds
}

function randomnumber(min,max) // min and max included
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

function randomarray(arrayName) {
    var randomItem = arrayName[Math.floor(Math.random()*arrayName.length)];
    return randomItem;
}




function checktokens(){
    if(drinkTokens==0) {
        document.querySelector(".cta.drinks").remove();
        document.querySelector(".infopane.drinks").innerHTML = '<span style="color:#ff0000;font-size: 1.2em;">Je hebt niets meer te drinken.</span>';

    } 

    if(foodTokens==0) {
        document.querySelector(".cta.foodie").remove();
        document.querySelector(".infopane.food").innerHTML = '<span  style="color:#ff0000;font-size: 1.2em;">Je hebt niets meer te eten.</span>';

    }

}


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
    
    if(foodName==currentDrink){
        foodCategoryName = "frisdrankje";
    }else foodCategoryName = "etentje";

    const INFOBOX = document.querySelector("div.infobox.user");
    INFOBOX.innerHTML += '<div class="infobubble"><p><p>Jouw '+ foodCategoryName + " "  + '<b>"' +foodName+ '</b>"' +' is onderweg</p></p><div class="cta dismiss"><a href="#">ok cool</a></div></div>';


    document.querySelector(".cta.dismiss").addEventListener("click", function(){

        if (foodName==currentDrink ) {
            closeinfobubble(updatedrinks);
        }else if (foodName==currentFood ) {
            closeinfobubble(updatefood);
        }


    });

     

}

document.querySelector(".cta.exploremars").addEventListener("click", function(){
    alert("Mars has nothing to offer yet");


});
