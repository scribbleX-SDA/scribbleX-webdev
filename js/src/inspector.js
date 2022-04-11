var event_target = null;
var doc_element = '';
var idoc_element = '';
var bg_opacity = null;


var array_of_ids;
var elem_oc_doc = '';


// idoc_element properties //

var idocEl_color = '';
var idocEl_bgcolor = '';
var idocEl_outline = '';


var eloc = '';
var eloc_id = '';
var eloc_tagName = '';
var eloc_content = '';
var eloc_style = '';
var eloc_class;

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
        //console.log("DOC_ELEMENT: " + doc_element);
    });

    idocument.addEventListener("mouseover", (event)=>{
        idocEl_outline = event.target.style.outline;
        event.target.style.outline = "thin solid blue";
        idoc_element = event.target;
        idocEl_color = window.getComputedStyle(idoc_element).getPropertyValue("color");
        idocEl_bgcolor = window.getComputedStyle(idoc_element).getPropertyValue("background-color");
    });

    idocument.addEventListener("mouseout", (event)=>{
        event.target.style.outline = idocEl_outline;
    });

    document.addEventListener("mouseout", (ev)=>{
        doc_element = '';
    });
}


document.addEventListener("keydown", (x)=>{
    if(x.altKey && x.shiftKey){
        //console.log(idocEl_bgcolor);
        //console.log(idocEl_color);
        //console.log("Shift + Alt - Pressed");
        if(doc_element == "IFRAME" || doc_element == "iframe"){
            eloc = idoc_element;
            eloc_id = eloc.id;
            
            //alert("Color: " + window.getComputedStyle(idoc_element).getPropertyValue("color"));
            //alert("Background Color: " + window.getComputedStyle(idoc_element).getPropertyValue("background-color"));

            //idocEl_color = window.getComputedStyle(idoc_element).getPropertyValue("color");
            idocEl_color = idocEl_color.replace("rgb(", "");
            idocEl_color = idocEl_color.replace(")", "");
            var temp = idocEl_color.split(", ");
            idocEl_color = rgbToHex(parseInt(temp[0]), parseInt(temp[1]), parseInt(temp[2]));
            document.getElementById("elemFC").value = idocEl_color;

            //idocEl_bgcolor = window.getComputedStyle(idoc_element).getPropertyValue("background-color");
            if(idocEl_bgcolor.includes("rgba")){
                idocEl_bgcolor = idocEl_bgcolor.replace("rgba(", "");
                idocEl_bgcolor = idocEl_bgcolor.replace(")", "");
                temp = idocEl_bgcolor.split(", ");
                bg_opacity = temp[3];
                idocEl_bgcolor = rgbToHex(parseInt(temp[0]), parseInt(temp[1]), parseInt(temp[2]));
                document.getElementById("elemBGC").disabled = true;
                document.getElementById("elemBGC").classList.add("disabled");
            }
            else{
                idocEl_bgcolor = idocEl_bgcolor.replace("rgb(", "");
                idocEl_bgcolor = idocEl_bgcolor.replace(")", "");
                temp = idocEl_bgcolor.split(", ");
                idocEl_bgcolor = rgbToHex(parseInt(temp[0]), parseInt(temp[1]), parseInt(temp[2]));
                document.getElementById("elemBGC").classList.remove("disabled");
                document.getElementById("elemBGC").disabled = false;
            }

            document.getElementById("elemBGC").value = idocEl_bgcolor;
            console.warn("Color: " + idocEl_color);
            console.warn("BG Color: " + idocEl_bgcolor);
        }
    }
});


function fontColor(eVal){
    if(eloc != null){
        eloc.style.color = eVal;
        //console.log(eloc);
        //alert(eloc_id);
        reconstructColor(eVal);
    }
}

function bgcolor(eVal){
    if(eloc != null){
        eloc.style.backgroundColor = eVal;
        reconstructBgColor(eVal);
    }
}

function reconstructColor(scribble_val){
    var elem_idoc = eloc;

    var q = null;

    var tagName = elem_idoc.tagName;
    tagName = tagName.toLowerCase();
    var id = elem_idoc.id;
    var class_grab = elem_idoc.classList;
    var classArray = 0;

    //--------------------------------------------

    /*
    if(id == ''){
        alert("ID: null");
    }
    else{
        alert("ID: " + id);
    }
    if(class_grab == ''){
        alert("Classes: null");
    }
    else{
        alert("Classes: " + class_grab);
    }
    alert("TagName: " + tagName);
    */

    var number_of_classes_used = null;


    var css = cssEditor.getValue();

    if(id == null || id == ''){
        //alert("ID NOT DECLARED");
    }
    else{
        //alert("ID DECLARED -> "+id);
        if(css.includes(id)){
            if(q == null){
                content = css.substring(css.indexOf('#'+id));
                content = content.substring(0, content.indexOf('}')+1);
                //console.log(content);
                content = String(content);

                var x123 = null;

                //console.log(content);
                var temp23 = content;
                temp23 = temp23.replace("#"+id+"{", '');
                temp23 = temp23.replace("}", "");
                for(var k=0; k<temp23.length; k++){
                    if(temp23[k] == 'c' && temp23[k+1] == 'o' && temp23[k+2] == 'l' && temp23[k-1] != '-'){
                        //alert("FOUND IT");
                        //console.log(temp23[k-1]);
                        x123 = k;
                        temp23 = temp23.substring(x123);
                        var spl_temp = temp23.split(";");
                        temp23 = spl_temp[0];
                        //alert(temp23);
                        var x44 = content.replace(temp23, "color: "+scribble_val);

                        css = css.replace(content, x44);
                        cssEditor.setValue(css);
                        q = 1;
                        break;
                    }else{
                        inspector();
                    }
                }
            }else{
                q = 1;
            }
            /*
            temp23 = temp23.substring(x123);
            var spl_temp = temp23.split(";");
            temp23 = spl_temp[0];
            //alert(temp23);
            var x44 = content.replace(temp23, "color: "+scribble_val);

            css = css.replace(content, x44);
            cssEditor.setValue(css);
            */
        }
    }

    if(class_grab == null || class_grab == ''){
        //alert("CLASS(ES) NOT DECLARED");
    }
    else{
        if(q == null){
            //alert("CLASSES DECLARED -> "+class_grab);
            class_grab = String(class_grab);
            classArray = class_grab.split(" ");
            for(var i=0; i<classArray.length; i++){
                if(css.includes(classArray[i])){
                    //number_of_classes_used += 1;
                    //alert("CSS GOT CLASS: "+classArray[i]);

                    var content = css.substring(css.indexOf('.'+classArray[i]));
                    content = content.substring(0, content.indexOf('}')+1);
                    //console.log(content);
                    content = String(content);

                    var x123 = null;

                    //console.log(content);
                    var temp23 = content;
                    temp23 = temp23.replace("."+classArray[i]+"{", '');
                    temp23 = temp23.replace("}", "");
                    for(var k=0; k<temp23.length; k++){
                        if(temp23[k] == 'c' && temp23[k+1] == 'o' && temp23[k+2] == 'l' && temp23[k-1] != '-'){
                            //alert("FOUND IT");
                            //console.log(temp23[k-1]);
                            console.assert("CLASS WORKING");
                            x123 = k;
                            temp23 = temp23.substring(x123);
                            var spl_temp = temp23.split(";");
                            temp23 = spl_temp[0];
                            //alert(temp23);
                            var x44 = content.replace(temp23, "color: "+scribble_val);

                            css = css.replace(content, x44);
                            cssEditor.setValue(css);
                            break;
                        }else{
                            //swal("Oops", "'color' attribute is not declared in ."+classArray[i]+".", "error");
                            //inspector();
                        }
                    }
                }else{
                    swal("Oops", "'color' attribute is not declared in ."+classArray[i]+".", "error");
                    inspector();
                }
            }
        }else{
            q = 1;
        }
    }

    if(css.includes(tagName)){
        if(q == null){
            //alert("CSS GOT TAGNAME: "+tagName);
            content = css.substring(css.indexOf(tagName));
            content = content.substring(0, content.indexOf('}')+1);
            //console.log(content);
            content = String(content);

            var temp23 = content;
            temp23 = temp23.replace(tagName+"{", "");
            temp23 = temp23.replace("}", "");
            //console.log(temp23);

            var x123 = null;

            for(var k=0; k<temp23.length; k++){
                if(temp23[k] == 'c' && temp23[k+1] == 'o' && temp23[k+2] == 'l' && temp23[k-1] != '-'){
                    //alert("FOUND IT");
                    x123 = k;
                    temp23 = temp23.substring(x123);
                    var spl_temp = temp23.split(";");
                    temp23 = spl_temp[0];
                    //alert(temp23);
                    var x44 = content.replace(temp23, "color: "+scribble_val);

                    css = css.replace(content, x44);
                    cssEditor.setValue(css);
                    break;
                }
            }
        }else{
            q = 1;
        }
    }
    else{
        //alert("CSS DOESN'T USE TAGNAME");
    }
}






function reconstructBgColor(scribble_val){
    var elem_idoc = eloc;

    var q = null;

    var tagName = elem_idoc.tagName;
    tagName = tagName.toLowerCase();
    var id = elem_idoc.id;
    var class_grab = elem_idoc.classList;
    var classArray = 0;

    //--------------------------------------------

    var number_of_classes_used = null;


    var css = cssEditor.getValue();

    if(id == null || id == ''){
        //alert("ID NOT DECLARED");
    }
    else{
        //alert("ID DECLARED -> "+id);
        if(css.includes(id)){

            content = css.substring(css.indexOf('#'+id));
            content = content.substring(0, content.indexOf('}')+1);
            //console.log(content);
            content = String(content);

            var x123 = null;

            //console.log(content);
            var temp23 = content;
            temp23 = temp23.replace("#"+id+"{", '');
            temp23 = temp23.replace("}", "");
            for(var k=0; k<temp23.length; k++){
                if(temp23[k] == 'b' && temp23[k+3] == 'k' && temp23[k+9] == 'd' && temp23[k+15] == 'r'){
                    //alert("FOUND IT");
                    x123 = k;
                    temp23 = temp23.substring(x123);
                    var spl_temp = temp23.split(";");
                    temp23 = spl_temp[0];
                    //alert(temp23);
                    var x44 = content.replace(temp23, "background-color: "+scribble_val);

                    css = css.replace(content, x44);
                    cssEditor.setValue(css);
                    q = 1;
                    break;
                }else{
                    //swal("Oops", "'background-color' attribute is not declared in #"+id+".", "error");
                    inspector();
                }
            }
            /*
            temp23 = temp23.substring(x123);
            var spl_temp = temp23.split(";");
            temp23 = spl_temp[0];
            //alert(temp23);
            var x44 = content.replace(temp23, "background-color: "+scribble_val);

            css = css.replace(content, x44);
            cssEditor.setValue(css);
            */
        }
    }

    if(class_grab == null || class_grab == ''){
        //alert("CLASS(ES) NOT DECLARED");
    }
    else{
        if(q == null){
            //alert("CLASSES DECLARED -> "+class_grab);
            class_grab = String(class_grab);
            classArray = class_grab.split(" ");
            for(var i=0; i<classArray.length; i++){
                if(css.includes(classArray[i])){
                    //number_of_classes_used += 1;
                    //alert("CSS GOT CLASS: "+classArray[i]);
                
                    var content = css.substring(css.indexOf('.'+classArray[i]));
                    content = content.substring(0, content.indexOf('}')+1);
                    //console.log(content);
                    content = String(content);

                    var x123 = null;

                    //console.log(content);
                    var temp23 = content;
                    temp23 = temp23.replace("."+classArray[i]+"{", '');
                    temp23 = temp23.replace("}", "");
                    for(var k=0; k<temp23.length; k++){
                        if(temp23[k] == 'b' && temp23[k+3] == 'k' && temp23[k+9] == 'd' && temp23[k+15] == 'r'){
                            //alert("FOUND IT");
                            //console.log(temp23[k-1]);
                            console.assert("CLASS WORKING");
                            x123 = k;
                            temp23 = temp23.substring(x123);
                            var spl_temp = temp23.split(";");
                            temp23 = spl_temp[0];
                            //alert(temp23);
                            var x44 = content.replace(temp23, "background-color: "+scribble_val);

                            css = css.replace(content, x44);
                            cssEditor.setValue(css);
                            q = 1;
                            break;
                        }else{
                            //swal("Oops", "'color' attribute is not declared in ."+classArray[i]+".", "error");
                            //inspector();
                        }
                    }
                }else{
                    //swal("Oops", "'background-color' attribute is not declared in ."+classArray[i]+".", "error");
                    inspector();
                }
            }
        }else{
            q = 1;
        }
    }

    if(css.includes(tagName)){
        if(q == null){
            //alert("CSS GOT TAGNAME: "+tagName);
            content = css.substring(css.indexOf(tagName));
            content = content.substring(0, content.indexOf('}')+1);
            //console.log(content);
            content = String(content);

            var temp23 = content;
            temp23 = temp23.replace(tagName+"{", "");
            temp23 = temp23.replace("}", "");
            //console.log(temp23);

            var x123 = null;

            for(var k=0; k<temp23.length; k++){
                if(temp23[k] == 'b' && temp23[k+3] == 'k' && temp23[k+9] == 'd' && temp23[k+15] == 'r'){
                    //alert("FOUND IT");
                    x123 = k;
                    temp23 = temp23.substring(x123);
                    var spl_temp = temp23.split(";");
                    temp23 = spl_temp[0];
                    //alert(temp23);
                    var x44 = content.replace(temp23, "background-color: "+scribble_val);

                    css = css.replace(content, x44);
                    cssEditor.setValue(css);
                    q = 1;
                    break;
                }
            }
        }else{
            q = 1;
        }
    }
    else{
        //alert("CSS DOESN'T USE TAGNAME");
    }
}