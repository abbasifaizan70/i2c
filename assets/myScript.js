// Call Remaning days function to set days on page load
Remaining_Days_Calculation();

// set initila Budget to 300 
var initialBudget = 300;

// print value of Amount store in local store in Browser Consile
console.log("Local Storage Values of Amount", localStorage.getItem("Local Save Values of Amount"));


// Gettting Values of Budget addes and No of Donor from the session vairable
var checkAddedBudget = parseInt(sessionStorage.getItem("budgetadded"));
var NoOfDonors = parseInt(sessionStorage.getItem("donors"));

console.log(checkAddedBudget);


// Function to calculate No of Remaining Days
function Remaining_Days_Calculation() {
    // Define two vairable of date
    var date1 = new Date("11/30/2021");
    var date2 = new Date();

    // Calculate time difference
    var time_difference = date1.getTime() - date2.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);

    //  Adding one to Round off days instea of Point
    days_remaining = parseInt((days_difference) + 1);

    // Setting the Days Element in the Html
    document.getElementById("days").innerHTML = days_remaining;
}

// Saving the Amount in the Local Storage
function save_Amount_In_local_hitory() {
    //Just Getting the input amount 
    var inputAmount = document.getElementById("amount").value;

    // Saving it in local storage array, so it will be saved on already initialized array and will be there when it re-opens,
    var getValue = localStorage.getItem("Local Save Values of Amount");

    //  Adding Element with Sepeated Comma
    localStorage.setItem("Local Save Values of Amount", getValue + "," + inputAmount);

    // Giving alert when value added successfully in Local Storage
    window.alert("Value of amount Added successfully in local Storage");
}



//  check wether checkAddedBudget is initlized or not on page load
if (checkAddedBudget) {
    // Calculate remaiing Budget by calling funciton
    calculateRemainingBudget();

    //Calling Function to calculate Progressbar and No of Donors;
    calculateProgressBar(checkAddedBudget);
    updateNoOfDonors();
}
// Else Condition Run First time
else {
    // inilizing the value of checkAddedBudget to zero on opening project by calling funciton
    createAddedBudget();
    //Calling Function to calculate Progressbar and No of Donors;
    calculateProgressBar(0);
    FindNoOfDonors();
}

// funciton is initilizing No oF Donor to zero in session variable first Time
function FindNoOfDonors() {
    sessionStorage.setItem("donors", 0);
    document.getElementById("donors").innerHTML = 0;
}

// funciton is updating No oF Donor to zero in html tag
function updateNoOfDonors() {
    document.getElementById('donors').innerHTML = NoOfDonors;
}

// funciton is initilizing budget addes to zero in session variable first Time
function createAddedBudget() {
    sessionStorage.setItem("budgetadded", 0);
    document.getElementById("RemainingBudget").innerHTML = 300;
}

// calculating Remaining budget by substrating budget added from Total Budget
function calculateRemainingBudget() {
    var checkRemainingBudget = parseInt(initialBudget) - parseInt(checkAddedBudget);
    document.getElementById("RemainingBudget").innerHTML = parseInt(checkRemainingBudget);
}


// adding Amount to our remaing budget
function addAmount() {
    var amount = parseInt(document.getElementById("amount").value);

    // Check Wether Value is entered or not
    if (isNaN(amount)) {
        document.getElementById("errorMessage").innerHTML = "Your cannot Enter Empty Values";
    }
    // Check Wether Value is Zero or Negative
    else if (amount < 1) {
        document.getElementById("errorMessage").innerHTML = "Your cannot Enter Negative or Zero";
    }
    // If above false then calculate
    else {
        // finding total amoint added by adding previous added amiunt and new entered amount
        var totalAmountAdding = parseInt(parseInt(checkAddedBudget) + parseInt(amount));

        // checking wether the total added budget should be less then total budget
        if (totalAmountAdding > initialBudget) {
            // printing error message when added budget exceed the total budget
            document.getElementById("errorMessage").innerHTML = "Your Amount is exceeding";
        }
        // checking else
        else {
            document.getElementById("errorMessage").innerHTML = "";

            // updating session varibale the maitinging the amount of budget already added.
            sessionStorage.setItem("budgetadded", totalAmountAdding);

            // Adding no of donot when amount added
            sessionStorage.setItem("donors", NoOfDonors + 1);

            //Updating check Added Budget
            checkAddedBudget = parseInt(totalAmountAdding);

            // calling function to find remaing budget
            calculateRemainingBudget();

            // updating progess bar by sending argument of value of budget already added
            calculateProgressBar(checkAddedBudget);

            //  updating local variblae of no of Donors
            NoOfDonors = NoOfDonors + 1;

            // updating no of donors in html
            document.getElementById('donors').innerHTML = NoOfDonors;
        }
    }

    // console.log(parseInt(amount));
}


// updating progess bar
function calculateProgressBar(progressBudget) {
    document.getElementById("progress-bar").value = progressBudget;
}


// Reload page once after opening first time to set session value to zero automatically
window.onload = function() {
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        location.reload();
        sessionStorage.setItem("hasCodeRunBefore", true);
    }
}