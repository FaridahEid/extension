let wfID;
let apiKey;
let groupname;

const axios = require('axios');

window.addEventListener('load',showOnTaskInfo);
//if there is information in the database show it
async function showOnTaskInfo(){
    document.getElementById("end-editing").style.visibility = "hidden";
    document.getElementById("edit-button").style.visibility = "visible";
    //if there is already information
    if(wfID!=null)
        document.getElementById("WorkflowID_info").innerHTML = wfID;
    if(apiKey!=null)
        document.getElementById("APIKey_info").innerHTML = apiKey;
    if(groupname!=null)
        document.getElementById("Group_info").innerHTML = groupname;

    const workflowID_id = document.getElementById("WorkflowID_info");
    const Group_id = document.getElementById("Group_info");
    const APIKey_id = document.getElementById("APIKey_info");
    const edit_button = document.getElementById("edit-button");
    const end_button = document.getElementById("end-editing");

    edit_button.addEventListener("click", function() {
        document.getElementById("edit-button").style.visibility = "hidden";
        workflowID_id.contentEditable = true;
        workflowID_id.style.backgroundColor = "#dddbdb";
        Group_id.contentEditable = true;
        Group_id.style.backgroundColor = "#dddbdb";
        APIKey_id.contentEditable = true;
        APIKey_id.style.backgroundColor = "#dddbdb";
        document.getElementById("end-editing").style.visibility = "visible";
    } );

    end_button.addEventListener("click", function() {
        //checking values
        console.log(Group_id.innerHTML);
        console.log(workflowID_id.innerHTML);
        console.log(APIKey_id.innerHTML);
        //saving values for variables
        groupname=Group_id.innerHTML;
        wfID=workflowID_id.innerHTML;
        apiKey=APIKey_id.innerHTML;
        //not editable
        workflowID_id.contentEditable = false;
        Group_id.contentEditable = false;
        APIKey_id.contentEditable = false;

        document.getElementById("end-editing").style.visibility = "hidden";
        document.getElementById("edit-button").style.visibility = "visible";
        sendOnTaskInfo();
    } );
}

//function that updates the wfID, ApiKey, groupname
async function sendOnTaskInfo(){

    console.log("from editOnTaskInfo func");
    console.log(groupname);
    console.log(wfID);
    console.log(apiKey);
    //send to server
    //call api()
    await axios.post(`http://localhost:3000/getWorkflowInfos/${apiKey}`,{
        workflow: wfID,
        groupName: groupname
    })
        .then(res => {
            console.log(res);
        });
}

