/*
* Google functions getEmail, getName, login, validateurl, getID
* OnTask functions
* */

const axios = require('axios');

function getEmail(){

    document.getElementById("email").innerHTML = "This is an email placeholder";
}

//when page is loaded enter name
function getName(){
    document.getElementById("username").innerHTML = "This is a username placeholder";
}


//VALIDATES THAT THE URL IS OF A GOOGLE DOC (FUTURE EDIT: OR SHEETS OR SLIDES)
//splitting funcs slice(0,3), split, str2= str.
function validateUrl(param){

    let docFixedURL = param.slice(0,35);
    return docFixedURL == "https://docs.google.com/document/d/";
}

async function login() {
    await axios.get("http://localhost:3000/getAuthURL")
                .then(res => {
                    chrome.tabs.create({url: res.data});
                });
}
async function sendForSignature() {
    let url_;
    let substrings;

    await chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        url_ = tabs[0].url;
        if( !validateUrl(url_) ){
            document.getElementById("ID").innerHTML = "Please open a google doc to get doc ID";
        }
        else {
            substrings = url_.split('/', 7);

            let finalURL = substrings[5];

            document.getElementById("ID").innerHTML = substrings[5];

            chrome.storage.local.get("token", (data) => {
                const user_token = data.token;
                alert("Successfully sent the document for signature.");

                axios.post(`http://localhost:3000/sendToOnTask/${finalURL}`, {
                    token: user_token
                })
                    .then(res => {
                        alert(res);
                    });
            });
        }
    });
}

chrome.storage.local.get("token", (data) => {
    let loginButton = document.getElementById('login');

    if (data.token == undefined) {
        loginButton.value = "Log in...";

    } else {
        loginButton.value = "Signed in";
    }
});

function getAccountDetails(){
    getID();
    getEmail();
    getName();

    showHide();
}
function openLink(){
    let authcodeURL;
    chrome.tabs.create({url: urlReceived, active: false});

    window.open(chrome.extension.getURL("../src/index.js"));

}
function takeInput(){
    document.location.href = '../dist/page2.html';
}

document.getElementById('login').addEventListener('click', login);
document.getElementById('getAccount').addEventListener('click', getAccountDetails);
document.getElementById('sendForSignature').addEventListener('click', sendForSignature);
document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.clear();
});

document.getElementById('OnTaskConfig').addEventListener('click',function(){
    //alert("redirecting..");

    document.location.href = 'page2.html';
});

document.getElementById('SignUp').addEventListener('click',function(){
    //alert("redirecting..");

    document.location.href = 'signup.html';
});



document.getElementById('auth link').addEventListener('click', openLink);



function showHide() {
    var div = document.getElementById("listinfo");
    div.classList.toggle('hidden');
}

