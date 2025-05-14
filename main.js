/*
amount -> String
Checks if checkboxes are checked, if they are it says the salary.
If there is a salary and ONE box is checked, hide the display
*/
function buttonEvent(salInp, hoursInp, hoursPayInp) {
  let indicator = false;
  if (y.checked && x.checked) {
    alert('You can only check one box, try again');
  }
  else if (x.checked) {
    indicator = true;
    document.querySelector('.checkboxes').style.display = "none";
    document.getElementById("sal-inp").style.display = "block";
    document.querySelector(".main-box").style.height = "250px";
  }
  else if (y.checked) {
    indicator = true;
    document.querySelector('.checkboxes').style.display = "none";
    document.querySelector(".hour-input").style.display = "block";
    document.querySelector(".main-box").style.height = "275px";
  }

  if (indicator && (salInp != "" || (hoursInp != "" && hoursPayInp != ""))) {
    //Main Changes
    if (salInp) {
      document.getElementById("amount").innerHTML += salInp;
    } else {
      document.getElementById("amount").innerHTML += Math.round(Number(hoursInp) * Number(hoursPayInp) * 100) / 100;
    }
    //Hides Main Box, Shows 2nd Main
    document.getElementById("main").style.display = "none";
    document.getElementById("bod").style.backgroundColor = "white";
    document.getElementById("main2").style.display = "block"
  }
}

//Converts Dictionary To Graph
function dictToGraph() {
  let valueList = [];
  let labelList = [];
  for (const key in dataPlot) {
    labelList.push(key)
    valueList.push(Number(dataPlot[key]))
  }
  pieGraph(valueList, labelList);
}
/* Plotting Pie Graph
  labelList - List of category names, usually strings
  valueList - List of amount of each name in labelList
*/
function pieGraph(valueList, labelList) {
  const data = [{
    values: valueList, //percentages
    labels: labelList, //categories
    type: 'pie'
  }];

  const layout = {
    title: {
      text: 'Weekly Spending',
      x: .36,
      y: .9,
      xanchor: 'center'
    },
    margin: {
      r: 200
    },
    height: 500,
    width: 500
  };

  Plotly.newPlot('myDiv', data, layout);
}

function addPayments(type, amount, date) {
  let paymentsHTML = "";
  paymentsList.push({
    type,
    amount,
    date
  });
  for (let i = 0; i < paymentsList.length; i++) {
    paymentObject = paymentsList[i];
    const {type, amount, date} = paymentObject;
    const dateArray = date.split("-");
    dateArray[1] = Number(dateArray[1]);
    const html = `<p class="p1">Payment #${i+1} ${type} ${amount} ${dates[dateArray[1]]}, ${dateArray[2]} ${dateArray[0]}</p><br>`;
    paymentsHTML += html;
  }
  document.querySelector(".payments").innerHTML = paymentsHTML;
}
const x = document.getElementById('salary');
const y = document.getElementById('hour');
const payments = document.getElementById('payments');
document.getElementById('sal-inp').value = "";
document.getElementById('hour-inp').value = "";
document.getElementById('hours-inp').value = "";
let amount = "";
let dataPlot = {};
let paymentsList = [];
const dates = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May", 
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};
document.getElementById('sal-button').onclick = () => {
  const salaryInput = document.getElementById('sal-inp').value;
  const hoursInput = document.getElementById('hour-inp').value;
  const hourlyPayInput = document.getElementById('hours-inp').value;
  buttonEvent(salaryInput, hoursInput, hourlyPayInput);
}
document.getElementById('submit').onclick = () => {
  const dateTimeInput = document.getElementById('date').value;
  const paymentInput = document.getElementById('pay').value;
  const typeInput = document.getElementById('type').value;
  document.getElementById("amount").innerHTML -= Math.abs(Number(paymentInput));

  if (dateTimeInput && paymentInput && typeInput) { 
    if (typeInput in dataPlot) {
      dataPlot[typeInput] += Number(paymentInput);
    } else {
      dataPlot[typeInput] = Number(paymentInput);
    }
    //To get Pie Graph
    dictToGraph();
    //To Show Payments
    addPayments(typeInput, paymentInput, dateTimeInput);
  }
}