Split(['#htmlContainer', '#cssContainer', '#jsContainer'],{
    gutterSize: 3
});

Split(['#toolsPanel', '#previewContainer'],{
    sizes: [45, 55],
    gutterSize: 3
});

Split(['#top_appContainer', '#bottom_appContainer'], {
    direction: 'vertical',
    gutterSize: 3,
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


document.getElementById("top_appContainer").addEventListener('resize', function(){
    $("#htmlEditorContainer").height($("#htmlContainer").height() - $("#htmlHeader").height());
    $("#cssEditorContainer").height($("#cssContainer").height() - $("#cssHeader").height());
    $("#jsEditorContainer").height($("#jsContainer").height() - $("#jsHeader").height());
    
    jsEditor.resize();
    htmlEditor.resize();
    cssEditor.resize();
});

/*

document.getElementById("bottom_appContainer").addEventListener('resize', function(){
    $("#htmlEditorContainer").height($("#htmlContainer").height() - $("#htmlHeader").height());
    $("#cssEditorContainer").height($("#cssContainer").height() - $("#cssHeader").height());
    $("#jsEditorContainer").height($("#jsContainer").height() - $("#jsHeader").height());

    jsEditor.resize();
    htmlEditor.resize();
    cssEditor.resize();
});



function resizeAppFrames(){
    $("#htmlEditorContainer").height($("#htmlContainer").height() - $("#htmlHeader").height());
    $("#cssEditorContainer").height($("#cssContainer").height() - $("#cssHeader").height());
    $("#jsEditorContainer").height($("#jsContainer").height() - $("#jsHeader").height());

    jsEditor.resize();
    htmlEditor.resize();
    cssEditor.resize();

    console.log("Hello World");
}
*/

var elem = $("#bottom_appContainer")[0];

let resizeObserver = new ResizeObserver(() => {
    init();
});
  
resizeObserver.observe(elem);
resizeObserver.observe($("#previewContainer")[0]);