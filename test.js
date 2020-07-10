
/*-------------------------------- PERSONAL EXPENSE WEB APP ---------------------------------*/
       
/* ---INTIALIZE REFERENCES--- */
//Get the button reference element
const btnElement = document.querySelector("#btnAddExpense");

//Get the input reference element for description
const descElement = document.querySelector("#inputDesc");

//Get the input reference element for amount
const inputElement = document.querySelector("#inputAmount");

//Get the heading reference element
const headElement = document.querySelector("#headingTotal");

//Get the table reference element
const tableElement = document.querySelector("#table");



/* ---INITIALIZE GLOBAL VARIABLES--- */
//Declare a variable totalExpense and initialize its value to 0
let totalExpense = 0;

//Declare an array to store all expenses at one place 
let allExpenses = [];



/* ---LISTEN TO BUTTON CLICK--- */
//Listen to click events
btnElement.addEventListener("click", addExpenseToTotal, false); //at "click" event, execute "addExpenseToTotal()"
btnElement.addEventListener("click", reset, false); //at "click" event, also execute "reset()"



/* ---READ & STORE INPUTS; CALCULATE TOTAL_EXPENSE; DISPLAY OUTPUT--- */
//onButtonClick: add inputAmount to totalExpense
function addExpenseToTotal()
{          
        /* ---Read Input--- */
        //read value from inputAmount
        const textAmount = inputElement.value;

        //convert it to number
        const expense = parseInt(textAmount, 10);
            
        //read the description from inputDesc
        const textDesc = descElement.value;

        /* ---Store Input--- */
        //Declare an object to store input description & amount
        let expenseItem = {};

        //put it in object
        expenseItem.desc = textDesc;
        expenseItem.amount = expense;
        expenseItem.moment = new Date(); // to store the date of transaction

        //push the item into the array
        allExpenses.push(expenseItem);

        /* ---Calculate TOTAL_EXPENSE--- */
        //add that value to totalExpense
        totalExpense = totalExpense + expense;

        /* ---Display Output--- */
        displayExpense();
}

/* ---RESET INPUT FIELDS--- */
//onButtonClick: reset the input-fields values
function reset()
{
        const resetAmount = document.getElementById("inputAmount"); //give the input-field id as parameter
        const resetDesc = document.getElementById("inputDesc");
        if(resetAmount && resetDesc)
                resetAmount.value = resetDesc.value = "";
}

//Controller Function: to get date string in the format we want (view controller function, that is)
function getDateString(now)
{
        return now.toLocaleDateString('en-US', 
                {year:'numeric', 
                month:'long', 
                day:'numeric'});
}

//Controller Function: to delete items
function deleteItem(dateValue)
{
        //Update totalExpense after removal
        const removedItem = allExpenses.filter(expense => expense.moment.valueOf() == dateValue);
        totalExpense = totalExpense - removedItem[0].amount;

        //Update allExpenses array after removal
        const updatedExpenses = allExpenses.filter(expense => expense.moment.valueOf() != dateValue);   //creating a new array with undeleted items
        allExpenses = updatedExpenses;

        //Display updated values
        displayExpense();
}

//View Layer: Function to display total expenditure & transaction-table
function displayExpense()
{
        //Set the heading element to calculated value of totalExpense
        headElement.textContent = `Total Expense: ₹ ${totalExpense}`;	//templating in javascript; ${ } means the place holder

        //Display table of transactions
        const allExpenseHTML = allExpenses.map(expense => createListItem(expense));
        tableElement.innerHTML = allExpenseHTML.join("");
}

//View Layer: Function to display transaction-table list-item
function createListItem({desc, amount, moment}) //passing an object as a function-arguement which takes "desc", "amount" and "moment" as parameters
{

        return `<li class="list-group-item">
                    <h5 class="mb-1">${desc}</h5>       <!-- we use mb-1 to remove the extra bottom-padding that h5 adds. -->
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">₹ ${amount}.00</p>
                        <button class="btn btn-outline-danger" onclick="deleteItem(${moment.valueOf()})">    <!-- date.valueOf() returns a numerical value depending on that exact moment -->
                                <i class="fas fa-trash-alt"></i>      <!-- button icon reference from fontawesome.com -->
                        </button>
                    </div>
                    <small>${getDateString(moment)}</small>
                </li>`;
}
