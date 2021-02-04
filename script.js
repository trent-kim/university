/*********
VARIABLES
*********/

let numOfEmails = document.querySelectorAll('.email').length;


/*************
INBOX COUNTER
*************/

document.getElementById("inboxNum").innerHTML = numOfEmails;

$.getJSON("something.json", function(data){
  randomEmail = data.randomEmails;
  assignmentEmail = data.assignmentEmails;
})

let counter = 0;
setInterval(createRandomEmail, 3000);
setInterval(createAssignmentEmail, 5000);

function createRandomEmail() {
  $("#myEmails").append(
    <div class="email">
      <div class="title">${randomEmail[counter].title}</div>
      <div class="content">${randomEmail[counter].content}</div>
    </div>
  )
}




/***********
EMAIL CLASS
***********/
class Email {
  constructor(head, body) {
    this.head= head;
    this.body= body;
  }
}

/*Email variables as new objects*/
let email1 = new
Email("Welcome to Wecair University", 
"Dear Students, Congrats on surviving this far and welcome to Wecair. Our community of exceptional students are changing the world, and at Wecair, you can too. Sincerely, President ");

let email2 = new
Email("dog", "cat")

let emailList = [email1, email2]


/*Create and add a new email*/
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

    /*Inbox count is always the same as i*/
    document.getElementById("inboxNum").innerHTML = i;
  }
}

function combineEmailParts() {
  addEmail();
  addEmailHead();
  addEmailBody();
}

/*Add new email <div> container*/
function addEmail(emailDiv) {
  let inboxElem = document.getElementById('inbox');
  inboxElem.appendChild(newDiv);
  emailDiv.classList.add("email");
}

/*Add new email head <div>*/
function addEmailHead(emailDiv, emailHeadDiv) {
  emailDiv.append(emailHeadDiv);
  emailHeadDiv.classList.add("emailHead");
  emailHeadDiv.append(document.createElement("div"));
}

/*Add new email body <div>*/
function addEmailBody(emailDiv, emailBodyDiv) {
  emailDiv.append(emailBodyDiv);
  emailBodyDiv.classList.add("emailBody");
  emailBodyDiv.append(document.createElement("div"));
}

/*Add a input checkbox to the new email*/
function appendCheckbox() {
  let inputElem = document.createElement("INPUT");
  inputElem.setAttribute("type", "checkbox");
  let newCheckbox = document.getElementById("welcomeEmail");
  welCheckbox.insertBefore(inputElem, newCheckbox.childNodes[0]);
}







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
