$(document).click(function(event) {
    //var elem = $(event.target);
    //$(event.target).attr("id", "g_io");
    var x = event.target;
    console.log("Element Height: " + $(x).height());
    console.log("Element Width: " + $(x).width());
    console.log("Element Background Color: " + $(x).css('background-color'));
    console.log("Element Font Color: " + $(x).css('color'));
    console.log("Element Font Size: " + $(x).css('font-size'));
});