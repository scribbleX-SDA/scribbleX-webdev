var event_target = null;
var doc_element = '';
var idoc_element = '';


// idoc_element properties //

var idocEl_color = '';
var idocEl_bgcolor = '';
var idocEl_outline = '';

//===========================


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function inspector(){

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

    const iframe = document.getElementById("previewFrame");
    const idocument = iframe.contentWindow.document;

    document.addEventListener("mouseover", (ev)=>{
        doc_element = ev.target.tagName;
        console.log("DOC_ELEMENT: " + doc_element);
    });

    idocument.addEventListener("mouseover", (event)=>{
        idocEl_outline = event.target.style.outline;
        event.target.style.outline = "thin solid blue";
        idoc_element = event.target;
    });

    idocument.addEventListener("mouseout", (event)=>{
        event.target.style.outline = idocEl_outline;
    });

    document.addEventListener("mouseout", (ev)=>{
        doc_element = '';
    });
}

/*
function customizeTools(elem){
    //var color = window.getComputedStyle(elem).getPropertyValue("color");
    //var background_color = window.getComputedStyle(elem).getPropertyValue("backhround-color");
    var font_size = window.getComputedStyle(elem).getPropertyValue("font-size");

    //color = color.replace("rgb(", "");
    //color = color.replace(")", "");
    //var elemClr = color.split(", ");

    //color = rgbToHex(parseInt(elemClr[0]), parseInt(elemClr[1]), parseInt(elemClr[2]));

    //background_color = background_color.replace("rgb(", "");
    //background_color = background_color.replace(")", "");
    //var elembgClr = background_color.split(", ");

    //background_color = rgbToHex(parseInt(elembgClr[0]), parseInt(elembgClr[1]), parseInt(elembgClr[2]));

    setInterval(function() { event_target.style.color = document.getElementById("elemFC").value; }, 100);

}
*/


document.addEventListener("keydown", (x)=>{
    if(x.shiftKey && x.altKey){
        if(doc_element == "IFRAME" || doc_element == "iframe"){
            alert("Color: " + window.getComputedStyle(idoc_element).getPropertyValue("color"));
            //alert("Background Color: " + window.getComputedStyle(idoc_element).getPropertyValue("background-color"));

            idocEl_color = window.getComputedStyle(idoc_element).getPropertyValue("color");
            document.getElementById("elemFC").value = idocEl_color;
            idocEl_bgcolor = window.getComputedStyle(idoc_element).getPropertyValue("background-color");
            document.getElementById("elemBGC").value = idocEl_bgcolor;
        }
    }
});