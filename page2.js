let token;
let code;

function showToken(){
    console.log(document.getElementById("token").value);
    token=document.getElementById("token").value;
}

function showAuthCode(){
    console.log(document.getElementById("authCode").value);
    code=document.getElementById("authCode").value;

}

document.getElementById('credentials').addEventListener('click', ()=>
{showToken(),showAuthCode()});

//document.getElementById('authCode').addEventListener('click', showAuthCode());


