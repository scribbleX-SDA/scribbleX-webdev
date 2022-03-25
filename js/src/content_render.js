function compile(){
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();

    /*
        Alright... what I need to do here is...
        I need to create an algorithm that will save
        all the tags of the element in a particular format with
        their respective attributes and content.
    */

    var htmlCode_temp = htmlCode;

    var tags_1 = ['area', 'base', 'br', 'col', 'command', 'embed',
                  'hr', 'img', 'input', 'keygen', 'link', 'meta',
                  'param', 'source', 'track', 'wbr'];

    var random_declaration = "!doctype a abbr acronym address applet article aside audio b basefont bdi bdo big blockquote body button canvas caption center cite code colgroup data datalist dd del details dfn dialog dir div dl dt em fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header html i iframe ins kbd label legend li main map mark meter nav noframes noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script section select small span strike strong style sub summary sup svg table tbody td template textarea tfoot th thead time tr tt u ul var video";
    var tags_2 = random_declaration.split(' ');

    
}