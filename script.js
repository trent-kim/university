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
  if (timeOfDay == "Night") {
    isPaused = true;
  } else {
    isPaused = false;
  }

  if(!isPaused) {
    createRandomEmail();
  };
}
, 30000);

//for every -- seconds create a new assignment email
setInterval(function() {
  //if the interval count is not paused, then create the email
  if (timeOfDay == "Night") {
    isPaused = true;
  } else {
    isPaused = false;
  }
  
  if(!isPaused) {
    createAssignmentEmail();
  };
}
, 70000);


function createRandomEmail() {
  $("#inboxContainer").prepend(
    `<div class="emailCombo closed">
      <div id="${randomEmailCounter}" class="email">
          <input class="emailCheckbox" type="checkbox">
          <div class="from">${randomEmail[randomEmailCounter].from}</div>
          <div class="unreadTitle">${randomEmail[randomEmailCounter].unreadTitle}</div>
          <div class="date">${randomEmail[randomEmailCounter].date}</div>
      </div>
      <div class="openedEmail">
        <i class="fas fa-arrow-left back"></i>
        <div class="openedTitle">${randomEmail[randomEmailCounter].title}</div>
        <div class="openedHead">
          <div class="openedFrom">${randomEmail[randomEmailCounter].from}</div>
          <div class="openedDate">${randomEmail[randomEmailCounter].date}</div>
        </div>
        <div class="openedContent">${randomEmail[randomEmailCounter].content}</div>
      </div>
    </div>`
  );

  randomClicker();
  closeEmail();

  //when a email is receive from the Campus Landlord, the pay button appears
  if (randomEmail[randomEmailCounter].from == "Campus Landlord") {
    $(`<div class="button" id="payButton" onclick="pay()">
        <div>
          Pay
        </div>
      </div>`).hide().appendTo("#interactions").fadeIn(800);
  }

  //hide the opened email container
  $(".openedEmail").hide();

  //iterate by 1 through the array of emails
  randomEmailCounter++;

  //add one to the inbox count
  emailCount++
  $("#inboxNum").html(emailCount);

  
}

function createAssignmentEmail() {
  $("#inboxContainer").prepend(
    `<div class="emailCombo closed">
      <div id="${assignmentEmailCounter}" class="email">
          <input class="emailCheckbox" type="checkbox">
          <div class="from">${assignmentEmail[assignmentEmailCounter].from}</div>
          <div class="unreadTitle">${assignmentEmail[assignmentEmailCounter].unreadTitle}</div>
          <div class="date">${assignmentEmail[assignmentEmailCounter].date}</div>
      </div>
      <div class="openedEmail">
        <i class="fas fa-arrow-left back"></i>
        <div class="openedTitle">${assignmentEmail[assignmentEmailCounter].title}</div>
        <div class="openedHead">
          <div class="openedFrom">${assignmentEmail[assignmentEmailCounter].from}</div>
          <div class="openedDate">${assignmentEmail[assignmentEmailCounter].date}</div>
        </div>
        <div class="openedContent">${assignmentEmail[assignmentEmailCounter].content}</div>
      </div>
    </div>`
  );
  
  assignmentClicker();
  closeEmail();

  //hide the opened email container
  $(".openedEmail").hide();

  //iterate by 1 through the array of emails
  assignmentEmailCounter++;

  //add one to the inbox count
  emailCount++;
  $("#inboxNum").html(emailCount);

  //when the first assignment is assigned, the work button appears
  if (assignmentEmailCounter == 1) {
    $(`<div class="button" id="workButton" onclick="work()">
        <div>
          Work
        </div>
      </div>`).hide().appendTo("#interactions").fadeIn(800);
  }
}


function randomClicker(){
  $(".emailCombo").click(function(){
    if($(".emailCombo").hasClass("closed")){
      //pause interval count and create email functions
      isPaused = true;
      console.log("opening");
      
  
      //show the opened email and hide the inbox emails including “.emailCombo” divs
      $(".openedEmail", this).show();
      $(".email").hide();
      $(".emailCombo").not(this).hide();
      $(this).removeClass("closed").addClass("opened");
      $(this).removeClass("emailCombo").addClass("notEmailCombo");    
    };
    //if the email is being opened for the first time, subtract one from the inbox count
    let emailNum = $(".email", this).attr("id");
    if (randomEmail[emailNum].clickNum == 0) {
      randomEmail[emailNum].clickNum = 1;
      // $(".unreadtitle", this).html(randomEmail[emailNum].readTitle);
      // $(".unreadtitle", this).html(randomEmail[emailNum].readTitle);
      emailCount--;
      $("#inboxNum").html(emailCount);
    };
  });
}


//open an inbox email when clicked
function assignmentClicker(){
$(".emailCombo").click(function(){
  if($(".emailCombo").hasClass("closed")){
    //pause interval count and create email functions
    isPaused = true;
    console.log("opening");
    

    //show the opened email and hide the inbox emails including “.emailCombo” divs
    $(".openedEmail", this).show();
    $(".email").hide();
    $(".emailCombo").not(this).hide();
    $(this).removeClass("closed").addClass("opened");
    $(this).removeClass("emailCombo").addClass("notEmailCombo");    
  };
  //if the email is being opened for the first time, subtract one from the inbox count
  let emailNum = $(".email", this).attr("id");
  
  if (assignmentEmail[emailNum].clickNum == 0) {
    assignmentEmail[emailNum].clickNum = 1;
    // $(".unreadtitle", this).html(assignmentEmail[emailNum].readTitle);
    // $(".unreadtitle", this).html(assignmentEmail[emailNum].readTitle);
    emailCount--;
    $("#inboxNum").html(emailCount);
  };
});
};


//close an opened email and send back to the inbox emails when the back arrow is clicked
function closeEmail() {
  $(".back").click(function(){
      

    if ($(".notEmailCombo").hasClass("opened")) {

      isPaused = false;
      console.log("closing");
      $(".emailCombo").show();
      $(".email").show();
      $(".openedEmail").hide();
    
      $(this).parent().parent().removeClass("opened").addClass("closed");
      
    };
    //$(".emailCombo").on("click", function() {
      // console.log("turned back on");
    // })
    $(this).removeClass("notEmailCombo").addClass("emailCombo");
  });
}
  //start interval count and create email functions
  

$('.emailCheckBox').click(function() {
    $(`<div class="button" id="payButton" onclick="pay()">
    <div>
      Pay
    </div>
  </div>`).toggle(this.checked).appendTo("#deleteButton").fadeIn(800);
});

/***********
STATUS BARS
***********/

let bodyHealth = 10;

let mindHealth = 30;
let money = 50;


function eat() {
  let bodyBar = $("#bodyBar");
  
  if (money < 40) {
    bodyHealth += 15;
    mindHealth -= 5;
    
    message = '<i>"Looks like its Cup-O-Noodles for now."<i>'
    $('#message').fadeOut(800, function() {
      $("#message").html(message).fadeIn(800)});
    setTimeout(function() {
      message = "<br>";
      $('#message').fadeOut(800, function() {
        $("#message").html(message).fadeIn(800)});
    }, 
    10000);

  } else {
    bodyHealth += 25;
    mindHealth += 10;

    message = '<i>"Ahhhhh, sustenance."<i>'
    $('#message').fadeOut(800, function() {
      $("#message").html(message).fadeIn(800)});
    setTimeout(function() {
      message = "<br>";
      $('#message').fadeOut(800, function() {
        $("#message").html(message).fadeIn(800)});
    }, 
    10000);
  }

  if (bodyHealth > 100) {
    bodyHealth = 100;
    console.log("nothing");
  };
  if (mindHealth > 100) {
    mindHealth = 100;
    console.log("nothing");
  };

  $('.button').removeClass("button").addClass("buttonDisabled");
  setTimeout(function() {
    $('.buttonDisabled').removeClass("buttonDisabled").addClass("button");
  },
  10000);

	if (bodyBar) {
    $(bodyBar).css({ "width": bodyHealth + '%', "transition": "width 10s ease-in"});
    };
  if (mindBar) {
    $(mindBar).css({ "width": mindHealth + '%', "transition": "width 10s ease-in"});
    };
}

let sleepClickCounter = 0;
let lastClick = 0;

// function amountOfClicks() {
//   let d = new Date();
//   let t = d.getTime();
//   lastClick = t;
//   let timeDiff = t - lastClick;
//   console.log(timeDiff);
//   console.log("working");
//   return timeDiff;
// }

function sleep() {
  let d = new Date();
  let t = d.getTime();
  let timeDiff = t - lastClick;
  lastClick = t;
  console.log(timeDiff);
  console.log("working");
  sleepClickCounter++;
  if (timeDiff >= 1000) {
   goingToSleep();
  
  };
  
  console.log(sleepClickCounter);
}

function goingToSleep() {
  let lengthOfSleep = sleepClickCounter * 10000;
  console.log(lengthOfSleep);
  let mindBar = $("#mindBar");
  
  

  mindHealth += 5 * sleepClickCounter;
  bodyHealth += 5 * sleepClickCounter;
  if (sleepClickCounter < 3) {
    message = '<i>(light breathing)<i>';
  } else if (sleepClickCounter < 4) {
    message = '<i>(shuffling sheets)<i>';
  } else {
    message = '<i>(heavy snoring)<i>';
  };
  
  $('#message').fadeOut(800, function() {
    $("#message").html(message).fadeIn(800)});
  setTimeout(function() {
    message = "<br>";
    $('#message').fadeOut(800, function() {
      $("#message").html(message).fadeIn(800)});
  }, 
  lengthOfSleep);
  
  if (mindHealth > 100) {
    mindHealth = 100;
    console.log("nothing");
  };
  if (bodyHealth > 100) {
    bodyHealth = 100;
    console.log("nothing");
  };

  $('.button').removeClass("button").addClass("buttonDisabled");
  setTimeout(function() {
    $('.buttonDisabled').removeClass("buttonDisabled").addClass("button");
  },
  lengthOfSleep);

  console.log(mindHealth);
	if (mindBar) {
		$(mindBar).css({ "width": mindHealth + '%', "transition": "width " + lengthOfSleep / 1000 + "s ease-in"});
    };
  if (bodyBar) {
    $(bodyBar).css({ "width": bodyHealth + '%', "transition": "width " + lengthOfSleep / 1000 + "s ease-in"});
    };
  //sleepClickCounter = 0;
}


/******
COUNTS
******/

let dayCount = 1;
$("#dayNum").html(dayCount);

setInterval(function() {
  dayCount++;
  $("#dayNum").html(dayCount);
}, 
240000);

let timeOfDay = "Morning";
$("#timeOfDayTitle").html(timeOfDay);

setInterval(function() {
  if (timeOfDay == "Morning") {
    timeOfDay = "Afternoon";
    $('#timeOfDayTitle').fadeOut(500, function() {
      $("#timeOfDayTitle").html(timeOfDay).fadeIn(500)});
  } else if (timeOfDay == "Afternoon") {
    timeOfDay = "Evening";
    $('#timeOfDayTitle').fadeOut(500, function() {
      $("#timeOfDayTitle").html(timeOfDay).fadeIn(500)});
  } else if (timeOfDay == "Evening") {
    timeOfDay = "Night";
    $('#timeOfDayTitle').fadeOut(500, function() {
      $("#timeOfDayTitle").html(timeOfDay).fadeIn(500)});
  } else if (timeOfDay == "Night") {
    timeOfDay = "Morning";
    $('#timeOfDayTitle').fadeOut(500, function() {
      $("#timeOfDayTitle").html(timeOfDay).fadeIn(500)});
  }
},
60000)


/*******
MESSAGE
*******/

let message = "<br>";
$("#message").html(message).fadeIn(500);






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
