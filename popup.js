/*
* Google functions getEmail, getName, login, validateurl, getID
* OnTask functions
* */
//when page is loaded insert email
//const axios = require('axios');

//import axios from 'axios'

function getEmail(){

    document.getElementById("email").innerHTML = "This is an email placeholder";
}

//when page is loaded enter name
function getName(){
    document.getElementById("username").innerHTML = "This is a username placeholder";
}

//goes to a different html page
function login(){

}


//VALIDATES THAT THE URL IS OF A GOOGLE DOC (FUTURE EDIT: OR SHEETS OR SLIDES)
//splitting funcs slice(0,3), split, str2= str.
function validateUrl(param){

    let docFixedURL = param.slice(0,35);
    return docFixedURL == "https://docs.google.com/document/d/";
}
function getID() {

    let url_;
    let substrings;

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url_ = tabs[0].url;
        if( !validateUrl(url_) ){
            document.getElementById("ID").innerHTML = "Please open a google doc to get doc ID";
        }
        else {

            substrings = url_.split('/', 7);
            //suggest validation that link is a google docs link

            //insert api call here
            // axios.get()
            let finalurl = substrings[5];

            document.getElementById("ID").innerHTML = substrings[5];
        }
        //document.write("The document ID is: "+substrings[5]);
        // use `url` here inside the callback because it's asynchronous!
    });


}
async function sendDocumentID(documentID) {
    const token = "";

    await fetch(`http://localhost:3000/getTitle/${documentID}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("error");
            } else {
                res.json().then(data => {
                    console.log(data);
                })
            }
        });
}

function getAccountDetails(){
    getID();
    getEmail();
    getName();
    showhide();
}
document.getElementById('login').addEventListener('click', login);
document.getElementById('getAccount').addEventListener('click', getAccountDetails);

document.getElementById('get').addEventListener('click',function(){
    alert("redirecting..");

    document.location.href = 'page2.html';
});


function getTodos(){
    alert("func works");
}

//alternate method to addeventlisteners
//document.addEventListener('DOMContentLoaded', function () {
//document.getElementById('button2').addEventListener('click', getID);
//});

function showhide() {
    var div = document.getElementById("listinfo");
    div.classList.toggle('hidden');
}

