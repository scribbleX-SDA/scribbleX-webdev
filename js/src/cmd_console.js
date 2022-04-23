var pre_cmd = '';

function cmd_consoleMGR(){
    var current = commandInp.getValue();
    current = current.replace(pre_cmd, "");

    var temp = String(current);
    alert(temp);
    temp = temp.replace("document.", 'document.getElementById("previewFrame").contentWindow.document.');
    alert(temp);

    if(temp.includes("document.")){
        temp = temp.replace("document.", "document.getElementById('previewFrame').contentWindow.document.");
        console.log(temp);
    }else{
        alert("document.    NOT FOUND");
    }

    eval(temp);
    //current.replace("document.getElementById('previewFrame').contentWindow.document.", "document.");
    var newCode = pre_cmd+current+"\nExecuted\n";
    commandInp.setValue(newCode);
    pre_cmd = newCode;

    window.onerror = ()=>{
        alert("ERROR");
    }
}

document.getElementById("clearConsole").addEventListener("click", ()=>{
    pre_cmd = '';
    commandInp.setValue("");
});