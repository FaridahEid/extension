let url_global;

function getID() {

    let url_;
    let substrings;
    let name;

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url_ = tabs[0].url;

        substrings = url_.split('/',7);
    //suggest validation that link is a google docs link
        //alert("Document id"+ substrings[5]);
        //insert api call here

        document.getElementById("ID").innerHTML = substrings[5];

        //document.write("The document ID is: "+substrings[5]);
        // use `url` here inside the callback because it's asynchronous!
    });


}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener('click', test);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button2').addEventListener('click', getID);
});


