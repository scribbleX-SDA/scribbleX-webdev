var editorValset_Count = 1;

function init(){
    var mainContainer_height = $("#main_container").height();
    var appContainer_height = mainContainer_height - ($("#top_header").height() + $("#bottom_footer").height());
    $("#appContainer").height(appContainer_height);

    $("#rightContainer").height("100%");
    $("#rightContainer").width($("#appContainer").width() - $("#leftContainer").width() - $("#centerContainer").width() - $("#center_right_appContainer_gutter").width());

    $("#bottom_appContainer").height($("#rightContainer").height() - $("#top_appContainer").height() - $("#appContainer_innerMargin").height());
    $("#htmlEditorContainer").height($("#htmlContainer").height() - $("#htmlHeader").height());
    $("#cssEditorContainer").height($("#cssContainer").height() - $("#cssHeader").height());
    $("#jsEditorContainer").height($("#jsContainer").height() - $("#jsHeader").height());
    $("#toolsPanel_container").height($("#toolsPanel").height() - $("#toolsPanel_header").height() - $("#toolsPanel_footer").height());

    
    jsEditor.resize();
    cssEditor.resize();
    htmlEditor.resize();

    if(editorValset_Count == 1){
        setEditorVals();
    }

    $("#previewFrame").height($("#previewContainer").height() - $("#searchBarBrowser").height() - 3);
    $("#previewFrame").width($("#previewContainer").width() - 5);

}


function setEditorVals(){
    jsEditor.setValue("// Create JavaScript here... [script.js]");
    cssEditor.setValue("/*\n\tDesign CSS here... [style.css]\n*/\n\nhtml{\n\theight: 100%;\n\twidth: 100%;\n}\n\nbody{\n\tbackground-color: white;\n}");
    htmlEditor.setValue('<!--\n\tBuild HTML here... [index.html]\n-->\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta http-equiv="X-UA-Compatible" content="text/html; charset=utf-8" />\n\t\t<!-- META -->\n\n\t\t<title>\n\t\t\t\n\t\t</title>\n\n\t\t<link rel="stylesheet" href="css/style.css">\n\t</head>\n\t<body>\n\t\t\n\t\t<script src="js/script.js"></script>\n\t</body>\n</html>');
    editorValset_Count += 1;
}