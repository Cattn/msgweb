/* 

Want to add some onboarded info questions?

Place all onboard prompts you'd like to load at the start below inside the window.onload function.

Then, add the functions where you'd like to call them when a option is selected.

They will be shown in the order frop botttom to top, in terms of where you place them in the window.onload function.

*/

window.onload = function() {
    onboardInitalize('Do you have music downloaded on your device already?', 'theme-fs', 'No', 'Yes', 'onboardClose(this)', 'onboardClose(this)');
    onboardInitalize('What theme would you like to try out?', 'theme-fs', 'Light', 'Dark', 'themeValue(1); onboardClose(this)', 'themeValue(2); onboardClose(this)');
    onboardInitalize('Welcome to MSGv3, Please answer a few quesitons to customize your expirenece.', 'theme-fs', 'Skip', 'Begin', 'skip();', 'onboardClose(this);');
}
































function onboardInitalize(prompt, onboardType, a1, a2, oc1, oc2) {
    // Generate a unique ID for the div
    let onboardID = "onboard-" + Date.now().toString();
    
    console.log("Onboarding initialized with prompt: " + prompt + " and onboardType: " + onboardType + " and a1: " + a1 + " and a2: " + a2)
    
    let question = prompt;
    let color;
    let size;
    if (onboardType == "theme-fs") {
        color = "black";
        size = "fs";
    }
    if (onboardType == "theme-hs") {
        color = "black";
        size = "hs";
    }

    // Create element with prompt, and then using theme background color as the background, set Z index to 1000
    let onboard = document.createElement("div");
    onboard.setAttribute("id", onboardID);
    onboard.classList.add("onboard-Start");
    let questionContent = document.createElement("h1")
    questionContent.classList.add("onboard-question");
    let answerContainer = document.createElement("div");
    answerContainer.classList.add("onboard-answer-container");
    let answer1 = document.createElement("button");
    answer1.classList.add("onboard-answer");
    answer1.setAttribute("id", "ans1")
    let answer2 = document.createElement("button");
    answer2.classList.add("onboard-answer");
    answer2.setAttribute("id", "ans2")
    answer1.innerHTML = a1;
    answer2.innerHTML = a2;
    answer1.setAttribute("onclick", oc1);
    answer2.setAttribute("onclick", oc2);
    questionContent.innerHTML = question;
    // Add element to body
    onboard.appendChild(questionContent);
    answerContainer.appendChild(answer1);
    answerContainer.appendChild(answer2);
    onboard.appendChild(answerContainer);
    document.body.appendChild(onboard);
    onboard.classList.remove("onboard-Start");
    onboard.classList.add("onboard-" + size);
    window.scrollTo(0, 0);
}




function onboardClose(_this) {
    _this.parentNode.parentNode.remove();
}

function fart() {
    alert("Farted");
}


function skip() {
    alert("Skipping is not available at this time.");
}