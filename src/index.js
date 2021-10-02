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

//goes to a different html page
function login(){
    getCredentials();
}


//VALIDATES THAT THE URL IS OF A GOOGLE DOC (FUTURE EDIT: OR SHEETS OR SLIDES)
//splitting funcs slice(0,3), split, str2= str.
function validateUrl(param){

    let docFixedURL = param.slice(0,35);
    return docFixedURL == "https://docs.google.com/document/d/";
}
//......................................................................................................................
async function getID() {

    let url_;
    let substrings;

    await chrome.tabs.query({active: true, currentWindow: true}, tabs => {
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
            getCredentials();
            document.getElementById("ID").innerHTML = substrings[5];
            //sendDocumentID(finalurl);
        }
        //document.write("The document ID is: "+substrings[5]);
        // use `url` here inside the callback because it's asynchronous!
    });


}
//......................................................................................................................
//This functions gets the google oauth access token and fetches the get title
let AuthURL="no url";
//let code="4/0AX4XfWh5crIkp-wYTVc1tquyvTL5YgAMGxOrkOqz4471phqu9lxUv2LzOFape-_obz5Ocg";
/*let token={
    "access_token": "ya29.a0ARrdaM-R6PSxv1yNVLZGmcYHgiokCIQ6kKB7JkprM2Zu_ISN51zihYsop7GvNp9E6E_2KzO-rXk5a0qq18HPb2M3E9B_1YDKuOxqOy7fIYmXZJSiQQlnoKGoxslBzCvz0I20jC_QHbnqxpnGm5k2Cs6p-xlH1A",
    "scope": "https://www.googleapis.com/auth/drive",
    "token_type": "Bearer",
    "expiry_date": 1633090978412
};*/
let urlReceived;
let token;
async function getCredentials() {
    await axios.get("http://localhost:3000/getAuthURL")
                .then(res => {
                    chrome.tabs.create({url: res.data});
                });
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
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

document.getElementById('get').addEventListener('click',function(){
    alert("redirecting..");

    document.location.href = '../dist/page2.html';
});


function getTodos(){
    alert("func works");
}

document.getElementById('auth link').addEventListener('click', openLink);


function showHide() {
    var div = document.getElementById("listinfo");
    div.classList.toggle('hidden');
}

