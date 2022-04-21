Split(['#htmlContainer', '#cssContainer', '#jsContainer'],{
    gutterSize: 3,
});

Split(['#toolsPanel', '#previewContainer'],{
    sizes: [45, 55],
    gutterSize: 3,
    minSize: 50,
});

Split(['#top_appContainer', '#bottom_appContainer'], {
    direction: 'vertical',
    gutterSize: 3,
    minSize: 30,
})


//======================================//


var jsEditor = ace.edit("jsEditorChild");
jsEditor.setTheme("ace/theme/tomorrow_night_horizon");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setFontSize(15);
jsEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    placeholder: "Create JavaScript here...",
});


var cssEditor = ace.edit("cssEditorChild");
cssEditor.setTheme("ace/theme/tomorrow_night_horizon");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setFontSize(15);
cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    placeholder: "Design CSS here...",
});


var htmlEditor = ace.edit("htmlEditorChild");
htmlEditor.setTheme("ace/theme/tomorrow_night_horizon");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setFontSize(15);
htmlEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});

var commandInp = ace.edit("commandInput");
commandInp.session.setMode("ace/mode/javascript");
commandInp.setTheme("ace/theme/tomorrow_night_horizon");
commandInp.setFontSize(15);
commandInp.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});
commandInp.renderer.setShowGutter(true);
commandInp.session.gutterRenderer =  {
    getWidth: function(session, lastLineNumber, config) {
        return "30px";
    },
    getText: function(session, row) {
        return ">_ ";
    }
};


document.getElementById("top_appContainer").addEventListener('resize', function(){
    $("#htmlEditorContainer").height($("#htmlContainer").height() - $("#htmlHeader").height());
    $("#cssEditorContainer").height($("#cssContainer").height() - $("#cssHeader").height());
    $("#jsEditorContainer").height($("#jsContainer").height() - $("#jsHeader").height());
    
    jsEditor.resize();
    htmlEditor.resize();
    cssEditor.resize();
});


var elem = $("#bottom_appContainer")[0];

let resizeObserver = new ResizeObserver(() => {
    init();
    $("#commandInput").height($("#devConsole").height() - $("#consoleHeader").height());
    commandInp.resize();
});
  
resizeObserver.observe(elem);
resizeObserver.observe($("#previewContainer")[0]);


let toolsPanelObserver = new ResizeObserver(()=>{
    var panelWidth = $("#toolsPanel").width();
    if(panelWidth <= 70){
        document.getElementById("toolsPanel_container").style.display = "none";
    }else{
        document.getElementById("toolsPanel_container").style.display = "inline-block";
    }
});
toolsPanelObserver.observe(document.getElementById("toolsPanel"));



function savecode(){
    var htmlSnippet = htmlEditor.getValue();
    htmlSnippet = encodeURIComponent(htmlSnippet);
    var cssSnippet = cssEditor.getValue();
    cssSnippet = encodeURIComponent(cssSnippet);
    var jsSnippet = jsEditor.getValue();
    jsSnippet = encodeURIComponent(jsSnippet);

    var name = document.getElementById("name").value;

    var response = null;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            response = this.responseText;
            if(response == "Exists"){
                swal("Oops! Problem", "A project already exists.", "error");
                //alert("Please choose a different name of your current project.");
            }
            else if(response == "Complete"){
                swal("Great!", "Project is Saved Successfully.", "success");
            }
        }
    };
    xmlhttp.open("GET", "source_code_management.php?html="+htmlSnippet+"&css="+cssSnippet+"&js="+jsSnippet+"&name="+name);
    xmlhttp.send();
    //console.log("source_code_management.php?html="+htmlSnippet+"&css="+cssSnippet+"&js="+jsSnippet+"&name="+name+"&sec=public");
}


var tempCount = false;


document.getElementById("console").addEventListener("click", ()=>{
    //document.getElementById("previewContainer").style.width = "1252px";
    document.getElementById("toolsPanel").style.width = "30px";
    document.getElementById("devConsole").style.display = "inline-block";
    document.getElementsByClassName("ace_gutter")[0].setAttribute("id", "console_gutter");
    if(tempCount == false){
        commandInp.setValue('');
        tempCount = true;
    }
    $("#commandInput").height($("#devConsole").height() - $("#consoleHeader").height());
    commandInp.resize();
});

document.getElementById("consoleClose").addEventListener("click", ()=>{
    document.getElementById("devConsole").style.display = "none";
    var req = $("#toolsPanel").width();
    $("#toolsPanel").width(req + 547);
});


function bt_launch(){
    document.getElementById("builderTools").style.display = "block";
    document.getElementById("colorPalette").style.display = "none";
}

function clrP_launch(){
    document.getElementById("builderTools").style.display = "none";
    document.getElementById("colorPalette").style.display = "block";
}