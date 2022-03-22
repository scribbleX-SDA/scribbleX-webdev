const iframe = document.getElementById("previewFrame");
const iWindow = iframe.contentWindow;
const iDocument = iWindow.document;

/*
document.getElementById("previewFrame").contentWindow.addEventListener("click", (event)=>{
    console.log(event.target);
});


$(iDocument).click(function(event){
    var x = event.target;
    console.log("Element Height: " + $(x).height());
    console.log("Element Width: " + $(x).width());
    console.log("Element Background Color: " + $(x).css('background-color'));
    console.log("Element Font Color: " + $(x).css('color'));
    console.log("Element Font Size: " + $(x).css('font-size'));
});

iDocument.addEventListener("click", (event)=>{
    var x = event.target;
    console.log("Element Height: " + $(x).height());
    console.log("Element Width: " + $(x).width());
    console.log("Element Background Color: " + $(x).css('background-color'));
    console.log("Element Font Color: " + $(x).css('color'));
    console.log("Element Font Size: " + $(x).css('font-size'));
});
*/


document.getElementById("previewFrame").contentWindow.document.addEventListener("click", (event)=>{
    var x = event.target;
    alert(x);
    var elemH = $(x).height();
    /*console.log("Element Height: " + $(x).height());
    console.log("Element Width: " + $(x).width());
    console.log("Element Background Color: " + $(x).css('background-color'));
    console.log("Element Font Color: " + $(x).css('color'));
    console.log("Element Font Size: " + $(x).css('font-size'));
    var elm = event.target;
    console.log("Element Tag: " + elm.tagName);
    document.getElementById("elemHeight").value = elemH;*/
});