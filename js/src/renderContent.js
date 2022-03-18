var cssFile_Editor = "*:hover{outline-style: solid; outline-color: lightseagreen; outline-width: 2px;}";
var jsFile_Editor = '<script src="https://code.jquery.com/jquery-3.6.0.js"integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="crossorigin="anonymous"></script><script src="http://projects.test:8081/editor/Web-glitcherSDA/js/src/guiEditor_glitcher.js"></script>';

function run(){

    if(editor_tongle%2 == 0 || editor_tongle == 0){
        cssFile_Editor = '';
        jsFile_Editor = '';
    }
    else{
        cssFile_Editor = "*:hover{outline-style: dotted; outline-color: lightseagreen; outline-width: 2px;}";
        jsFile_Editor = '<script src="https://code.jquery.com/jquery-3.6.0.js"integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="crossorigin="anonymous"></script><script src="http://projects.test:8081/editor/Web-glitcherSDA/js/src/guiEditor_glitcher.js"></script>';
    }

    var previewFrame = document.getElementById("previewFrame");
    var previewFrame_contentManager = previewFrame.contentDocument || previewFrame.contentWindow.document;

    var html_content = htmlEditor.getValue();
    var css_content = cssEditor.getValue();
    var js_content = jsEditor.getValue();

    var html_content_rendered = html_content;

    html_content_rendered = html_content_rendered.replaceAll("\n", "");
    html_content_rendered = html_content_rendered.replaceAll("\t", "");
    html_content_rendered = html_content_rendered.replace('<link rel="stylesheet" href="css/style.css">', '<style>'+css_content+cssFile_Editor+'</style>');
    html_content_rendered = html_content_rendered.replace('<script src="js/script.js"></script>', '<script type="text/javascript">'+js_content+'</script>'+jsFile_Editor);


    document.getElementById("previewFrame").style.display = "block";
    document.getElementById("previewContainer_text").style.display = "none";

    previewFrame_contentManager.open();
    previewFrame_contentManager.write(html_content_rendered);
    previewFrame_contentManager
}

var editor_tongle = 0;

function activateGUIEditor(){
    editor_tongle = editor_tongle+1;
    if(editor_tongle%2 == 0){
        console.log("Editor OFF");
        document.getElementById("GUIEditor_stat").textContent = "OFF";
        run();
    }
    else{
        console.log("Editor ON");
        document.getElementById("GUIEditor_stat").textContent = "ON";
        run();
    }
}
