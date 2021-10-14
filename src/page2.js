let wfID;
let apiKey;
let groupname;
//list of all the info that is returned from getWorkflowInfos API call
let workflowInfo;
let workflowInfoNames =[];

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
    const workflowNamesList = document.getElementById("selectWorkflow");

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
        /*console.log(Group_id.innerHTML);
        console.log(workflowID_id.innerHTML);
        console.log(APIKey_id.innerHTML);*/
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
        //list has been created now listen for changes
        workflowNamesList.addEventListener("change", function() {
            var index =workflowNamesList.selectedIndex;
            console.log("values chosen is:"+workflowNamesList.value);
            console.log("index is:"+index);
            console.log(workflowInfo[index].workflowId);
            document.getElementById("WorkflowID_info").innerHTML = workflowInfo[index].workflowId;
        } );

    } );
}
function dropDownLists() {
    var select = document.getElementById("selectWorkflow");
    var options = workflowInfoNames;
    console.log("workflowname are:"+workflowInfoNames);
    console.log("option list has"+options);
    // Optional: Clear all existing options first:
    select.innerHTML = "";
    console.log("length of options is"+options.length);
    // Populate list with options:
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
}
//function that updates the wfID, ApiKey, groupname
function sendOnTaskInfo(){
    console.log("from sendOnTaskInfo func");
    console.log(groupname);
    console.log(wfID);
    console.log(apiKey);
    //send to server
    //call api()
    chrome.storage.local.get("token", (data) => {
        const user_token = data.token;

        axios.post(`http://localhost:3000/getWorkflowInfos/${apiKey}`, {
            token: user_token,
            groupName: groupname
        })
            .then(res => {
                workflowInfo=res.data;
                //console.log(workflowInfo);

                workflowInfo.map(el=>workflowInfoNames.push(el.name));
                console.log(workflowInfoNames);
                console.log("intitializing drop downlist");
                dropDownLists();

            });
    });

}

