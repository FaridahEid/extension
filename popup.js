/*
* Google functions getEmail, getName, login, validateurl, getID
* OnTask functions
* */


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
            sendDocumentID(finalurl);
            document.getElementById("ID").innerHTML = substrings[5];
        }
        //document.write("The document ID is: "+substrings[5]);
        // use `url` here inside the callback because it's asynchronous!
    });


}
//......................................................................................................................
//This functions gets the google oauth access token and fetches the get title
let AuthURL="";
async function sendDocumentID(documentID) {
    //alert("sendocu");
    console.log("making get auth url");

    await fetch ('http://localhost:3000/getAuthURL',{
        method: 'GET'

    })
        .then(res => {return res.text();})
        .then(getAuthURL =>{AuthURL=getAuthURL});
    console.log("variable saved as: "+ AuthURL);
    document.getElementById("auth link").innerHTML = AuthURL;
    //code = "4/0AX4XfWh7Y_obLKUNiimsyad9XzaCLGzUtjax-n6IY7JQYCFUy1-qZfWfh_XnvyRq1q-dhw";
    //console.log(AuthURL.status);
    //redirect the user to this url


}

function getAccountDetails(){
    getID();
    getEmail();
    getName();

    showHide();
}
function openLink(){
    chrome.tabs.create({url: AuthURL, active: false});

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

document.getElementById('auth link').addEventListener('click', openLink);
//alternate method to addeventlisteners
//document.addEventListener('DOMContentLoaded', function () {
//document.getElementById('button2').addEventListener('click', getID);
//});

function showHide() {
    var div = document.getElementById("listinfo");
    div.classList.toggle('hidden');
}

