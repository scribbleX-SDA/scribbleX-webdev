/*
function run(){

    var previewFrame = document.getElementById("previewFrame");
    var previewFrame_contentManager = previewFrame.contentDocument || previewFrame.contentWindow.document;

    var html_content = htmlEditor.getValue();
    var css_content = cssEditor.getValue();
    var js_content = jsEditor.getValue();

    var html_content_rendered = html_content;

    //html_content_rendered = html_content_rendered.replaceAll("\n", "");
    //html_content_rendered = html_content_rendered.replaceAll("\t", "");
    html_content_rendered = html_content_rendered.replace('<link rel="stylesheet" href="css/style.css">', '<style>'+css_content+'</style>');
    html_content_rendered = html_content_rendered.replace('<script src="js/script.js"></script>', '<script type="text/javascript">'+js_content+'</script>');


    document.getElementById("previewFrame").style.display = "block";
    document.getElementById("previewContainer_text").style.display = "none";

    previewFrame_contentManager.open();
    previewFrame_contentManager.write(html_content_rendered);
    previewFrame_contentManager;
}
*/



function format(element, property, value){
    var element_tag = null;// tag of the element
    var element_id = null;// ID of the element
    var element_class = null;// Class of the element

    if(element_id = null){
        if(element_class = null){
            // Inform the user that the element doesn't have a dedicated ID
            // nor does it have a dedicated Class
            // if they want to change the attibute value only for the particular
            // element then...
            // Ask them to provide a class or an id to the element
            // else continue changing the value using the tag.


            /*
                DO THE MAGIC NOW...
            */
        }
        // Check if the class contains multiple elements under it...
        // "HOW TO CHECK THE NUMBER OF ELEMENTS UNDER THE DEDICATED CLASS?"
        // count the number of occurances in the htmlSnippet of the class_name
        // if more than one.... repeat the procedure if there were no class and id
        // else... continue making the changes within the css code.


        /*
            DO THE MAGIC NOW...
        */
    }
    // Check if the ID contains multiple elements under it...
    // if more than one occurances of the same ID... repeat the
    // procedure if there were no class and id
    // else... continue making the changes within the css code.


    /*
        DO THE MAGIC NOW...
    */
}