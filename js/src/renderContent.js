function run(){

    var previewFrame = document.getElementById("previewFrame");
    var previewFrame_contentManager = previewFrame.contentDocument || previewFrame.contentWindow.document;

    var html_content = htmlEditor.getValue();
    var css_content = cssEditor.getValue();
    var js_content = jsEditor.getValue();

    var html_content_rendered = html_content;

    html_content_rendered = html_content_rendered.replaceAll("\n", "");
    html_content_rendered = html_content_rendered.replaceAll("\t", "");
    html_content_rendered = html_content_rendered.replace('<link rel="stylesheet" href="css/style.css">', '<style>'+css_content+'</style>');
    html_content_rendered = html_content_rendered.replace('<script src="js/script.js"></script>', '<script type="text/javascript">'+js_content+'</script>');


    document.getElementById("previewFrame").style.display = "block";
    document.getElementById("previewContainer_text").style.display = "none";

    previewFrame_contentManager.open();
    previewFrame_contentManager.write(html_content_rendered);
    previewFrame_contentManager
}

