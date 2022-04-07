<?php
    $htmlCode = $_REQUEST["html"];
    $cssCode = $_REQUEST["css"];
    $jsCode = $_REQUEST["js"];
    $name = $_REQUEST["name"];
    $privacy_stat = $_REQUEST["sec"];

    if($privacy_stat == null || $privacy_stat == ''){
        $privacy_stat = "public";
    }
    else{
        $privacy_stat = $privacy_stat;
    }

    /*
    mkdir($name);
    $htmlFile = fopen($name."/index.html", "w");
    fwrite($htmlFile, $htmlCode);
    $cssFile = fopen($name."/style.css", "w");
    fwrite($cssFile, $cssCode);
    $jsFile = fopen($name."/script.js", "w");
    fwrite($jsFile, $jsCode);
    */

    //echo "complete";

    $reply = null;

    if(is_dir("database/".$name)){
        $reply = "Exists";
    }
    else{
        mkdir("database/".$name);
        mkdir("database/".$name."/css");
        mkdir("database/".$name."/js");

        $htmlFile = fopen("database/".$name."/index.html", "w");
        fwrite($htmlFile, $htmlCode);

        $cssFile = fopen("database/".$name."/css"."/style.css", "w");
        fwrite($cssFile, $cssCode);

        $jsFile = fopen("database/".$name."/js"."/script.js", "w");
        fwrite($jsFile, $jsCode);

        //======    Handling Privacy of the document    ======//

        mkdir("database/".$name."/privacy");
        $privacy = fopen("database/".$name."/privacy"."/scribblex_db.con", "w");
        fwrite($privacy, $privacy_stat);

        $reply = "Complete";
    }

    echo $reply;
?>