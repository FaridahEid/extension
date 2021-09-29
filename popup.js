
let url_global;
//when page is loaded insert email

//chrome.extension.getBackgroundPage().console.log('foo');


function getEmail(){

}

//when page is loaded enter name
function getName(){

}

//goes to a different html page

function login(){

}

//splitting funcs slice(0,3), split, str2= str.
function validateUrl(param){

    let fixedURL = param.slice(0,35);
    return fixedURL == "https://docs.google.com/document/d/";
}
function getID() {

    let url_;
    let substrings;

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
           url_ = tabs[0].url;
           if( !validateUrl(url_) )
               alert("pls open a google doc");
           else {

               substrings = url_.split('/', 7);
               //suggest validation that link is a google docs link

               //insert api call here
               // axios.get()

               document.getElementById("ID").innerHTML = substrings[5];
           }
        //document.write("The document ID is: "+substrings[5]);
        // use `url` here inside the callback because it's asynchronous!
    });


}





document.getElementById('login').addEventListener('click', login);
document.getElementById('getid').addEventListener('click', getID);


function getTodos(){
    alert("func works");
}

//alternate method to addeventlisteners
//document.addEventListener('DOMContentLoaded', function () {
//document.getElementById('button2').addEventListener('click', getID);
//});