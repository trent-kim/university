/*********************
EMAILS AND EMAIL COUNT
*********************/

$.getJSON("emailData.json", function(data){
  randomEmail = data.randomEmails;
  assignmentEmail = data.assignmentEmails;
  console.log(data.randomEmails[0].title);
})

//number of unopened emails in the inbox
let emailCount = 0;
$("#inboxNum").html(emailCount)

//counter in order to iterate through each array of emails
let randomEmailCounter = 0;
let assignmentEmailCounter = 0;

//for pausing and playing the setInterval
let isPaused = false;


//for every -- seconds create a new random email
setInterval(function() {
  //if the interval count is not paused, then create the email
  if(!isPaused) {
    createRandomEmail();
  };
}
, 3000);


//for every -- seconds create a new assignment email
setInterval(function() {
  //if the interval count is not paused, then create the email
  if(!isPaused) {
    createAssignmentEmail();
  };
}
, 5000);


function createRandomEmail() {
  $("#inboxContainer").append(
    `<div class="emailCombo">
      <div id="${randomEmailCounter}" class="email">
          <input type="checkbox">
          <div class="from">${randomEmail[randomEmailCounter].from}</div>
          <div class="unreadTitle">${randomEmail[randomEmailCounter].unreadTitle}</div>
          <div class="date">${randomEmail[randomEmailCounter].date}</div>
      </div>
      <div class="openedEmail">
        <i class="fas fa-arrow-left" onclick="closeEmail()"></i>
        <div class="openedFrom">${randomEmail[randomEmailCounter].from}</div>
        <div class="openedDate">${randomEmail[randomEmailCounter].date}</div>
        <div class="openedTitle">${randomEmail[randomEmailCounter].title}</div>
        <div class="openedContent">${randomEmail[randomEmailCounter].content}</div>
      </div>
    </div>`
  );

  //hide the opened email container
  $(".openedEmail").hide();

  //iterate by 1 through the array of emails
  randomEmailCounter++;

  //add one to the inbox count
  emailCount++
  $("#inboxNum").html(emailCount);
};


function createAssignmentEmail() {
  $("#inboxContainer").append(
    `<div class="emailCombo">
      <div id="${assignmentEmailCounter}" class="email">
          <input type="checkbox">
          <div class="from">${assignmentEmail[assignmentEmailCounter].from}</div>
          <div class="unreadTitle">${assignmentEmail[assignmentEmailCounter].unreadTitle}</div>
          <div class="date">${assignmentEmail[assignmentEmailCounter].date}</div>
      </div>
      <div class="openedEmail">
        <i class="fas fa-arrow-left" onclick="closeEmail()"></i>
        <div class="openedFrom">${assignmentEmail[assignmentEmailCounter].from}</div>
        <div class="openedDate">${assignmentEmail[assignmentEmailCounter].date}</div>
        <div class="openedTitle">${assignmentEmail[assignmentEmailCounter].title}</div>
        <div class="openedContent">${assignmentEmail[assignmentEmailCounter].content}</div>
      </div>
    </div>`
  );

  //hide the opened email container
  $(".openedEmail").hide();

  //iterate by 1 through the array of emails
  assignmentEmailCounter++;

  //add one to the inbox count
  emailCount++;
  $("#inboxNum").html(emailCount);

};


let emailNum = $(".email", this).attr('id');

//open an inbox email when clicked
$(".emailCombo").click(function() {  
  //pause interval count and create email functions
  isPaused = true;
  console.log("opened")
  
  //show the opened email and hide the inbox emails including ".emailCombo" divs
  $(".openedEmail", this).show();
  $(".email").hide();
  $(".emailCombo").not(this).hide();
  
  //if the email is being opened for the first time, subtract one from the inbox count
  if (randomEmail[emailNum].clickNum == 0) {
    randomEmail[emailNum].clickNum = 1;
    emailCount--;
    $("#inboxNum").html(emailCount);
  };
});


//close an opened email and send back to the inbox emails when the back arrow is clicked
function closeEmail() {
  //start interval count and create email functions
  isPaused = false;
  $(".email").show();
  $(".openedEmail").hide();
  
};







  //$("#inboxContainer").html(
    // `<i class="fas fa-arrow-left"></i>`);
/*
  if ($(this).attr('class') == "random openedEmail") {
    $(".openedEmail").html(
      `<div class="openedFrom">${randomEmail[emailNum].from}</div>
      <div class="openedTitle">${randomEmail[emailNum].title}</div>
      <div class="openedContent">${randomEmail[emailNum].content}</div>
      <div class="openedDate">${randomEmail[emailNum].date}</div>`);
    if (randomEmail[emailNum].clickNum == 0) {
      randomEmail[emailNum].clickNum = 1;
      emailCount--;
      $("#inboxNum").html(emailCount);
    };
  } else if ($(this).attr('class') == "assignment openedEmail") {
    $(".openedEmail").html(
      `<div class="openedFrom">${assignmentEmail[emailNum].from}</div>
      <div class="openedTitle">${assignmentEmail[emailNum].title}</div>
      <div class="openedContent">${assignmentEmail[emailNum].content}</div>
      <div class="openedDate">${assignmentEmail[emailNum].date}</div>`)
    if (assignmentEmail[emailNum].clickNum == 0) {
      assignmentEmail[emailNum].clickNum = 1;
      emailCount--;
      $("#inboxNum").html(emailCount);
    };
  };*/

/***********
EMAIL CLASS
***********
class Email {
  constructor(head, body) {
    this.head= head;
    this.body= body;
  }
}

*Email variables as new objects*
let email1 = new
Email("Welcome to Wecair University", 
"Dear Students, Congrats on surviving this far and welcome to Wecair. Our community of exceptional students are changing the world, and at Wecair, you can too. Sincerely, President ");

let email2 = new
Email("dog", "cat")

let emailList = [email1, email2]


*Create and add a new email*
function addEmail() {
  for (i=0; i<emailList.length; i++) {
    let emailDiv = document.createElement("div");
    let emailHeadDiv = document.createElement("div");
    let emailBodyDiv = document.createElement("div");

    setTimeout(combineEmailParts, 3000);

    let allEmailHeads = document.getElementsByClassName("emailHead");
    let activeEmailHead = allEmailHeads[i];
    activeEmailHead.innerHTML = this.head;
  
    let allEmailBodies = document.getElementsByClassName("emailBody");
    let activeEmailBody = allEmailBodies[i];
    activeEmailBody.innerHTML = this.body;

    appendCheckbox();

    *Inbox count is always the same as i*
    document.getElementById("inboxNum").innerHTML = i;
  }
}

function combineEmailParts() {
  addEmail();
  addEmailHead();
  addEmailBody();
}

*Add new email <div> container*
function addEmail(emailDiv) {
  let inboxElem = document.getElementById('inbox');
  inboxElem.appendChild(newDiv);
  emailDiv.classList.add("email");
}

*Add new email head <div>*
function addEmailHead(emailDiv, emailHeadDiv) {
  emailDiv.append(emailHeadDiv);
  emailHeadDiv.classList.add("emailHead");
  emailHeadDiv.append(document.createElement("div"));
}

*Add new email body <div>*
function addEmailBody(emailDiv, emailBodyDiv) {
  emailDiv.append(emailBodyDiv);
  emailBodyDiv.classList.add("emailBody");
  emailBodyDiv.append(document.createElement("div"));
}

*Add a input checkbox to the new email*
function appendCheckbox() {
  let inputElem = document.createElement("INPUT");
  inputElem.setAttribute("type", "checkbox");
  let newCheckbox = document.getElementById("welcomeEmail");
  welCheckbox.insertBefore(inputElem, newCheckbox.childNodes[0]);
}
*/






/*function assignmentEmails() {
  let i;
  for (i = "0"; i < 3; i++) {
    setTimeout(function() {
      if (i == 0) {
        // create a new div element
        const newDiv = document.createElement("div");

        // and give it some content
        const newContent = document.createTextNode("Hi there and greetings!");

        // add the text node to the newly created div
        newDiv.appendChild(newContent);

        // add the newly created element and its content into the DOM
        const currentDiv = document.getElementById("div1");
        document.body.insertBefore(newDiv, currentDiv);
      }
    }, 3000);
  }
}*/




/*let i = 0;
function move() {
  if (i == 0) {
    i = 1;
    let elem = document.getElementsByClassName("timeBar");
    elem.classList.add("timeBar");

    let width = 1;
    let id = setInterval(frame, 1000);
    function frame() {
      if (width >= 55) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        this.classList.style.width = width + "%";
      }
    }
  }
}*/

/*************
WELCOME EMAIL
*************/
/*
function loadWelcome() {
  setTimeout(showWelcome, 3000);
}

function showWelcome() {
  let element = document.getElementById("welcomeEmail");
  element.classList.add("email");
  
  appendCheckbox();

  document.getElementById("welcomeHead").innerHTML =
    "Welcome to university";

  document.getElementById("welcomeBody").innerHTML =
    "At university, we will make you exceptional and condition you to mindlessly work.";

  document.getElementById("welcomeEmail").style.borderStyle = "none none solid none";

}*/
