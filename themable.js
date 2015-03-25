$(function(){
    
    /** document loaded **/
    
    var editable = 'h1,h2,p,figcaption';
    var classes = {h1:['title','default'],h2:['special'],figure:['aside','inline','jumbo'],p:['special','default']};
    
    $(editable).attr('contentEditable', 'true');
    $(Object.keys(classes).join(',')).addClass('classEditable');
    
    // chase mouse with toolbar
    var moveTimer;
    var activeElement;
    $('body').on('mouseover', '.classEditable', function(){
        clearTimeout(moveTimer);
        $that = $(this);
        moveTimer = setTimeout(function(){
            var tag = $that[0].tagName.toLowerCase();
            activeElement = $that;
            $('#Themable').html(
                '<a>'+classes[tag].join('</a> <a>')+'</a>'
            );
            $('#Themable').css({top: $that.offset().top-20, left: $that.offset().left, opacity: 1});
        }, 200);
    });
    $('#Themable').on('mouseover', function(){
        clearTimeout(moveTimer);
    });
    $('body').on('keyup', function(){
        $('#Themable').css({opacity: 0});
    });
    
    // interact with toolbar
    $('#Themable').on('click', 'a', function(){
        var tag = $that[0].tagName.toLowerCase();
        console.log(classes[tag].join(' '));
        activeElement.removeClass(classes[tag].join(' ')).addClass($(this).text());
    });
    
    // download function
    $('body').append('<a id="ThemableDownload" style="display:none"></a>');
    
    $('body').on('keypress', function(e){
        // Ctrl+S
        if ((event.which == 115 && event.ctrlKey) || (event.which == 19)) {
            console.log(e.keyCode);
            console.log('save');
            e.preventDefault();
            $('[download]')[0].click();
            return false;
        }
    });
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            if (String.fromCharCode(event.which).toLowerCase() == 's') {
                event.preventDefault();
                var title = $($('h1')[0]).text();
                var body = toMarkdown($('body').html());
                $('#ThemableDownload').attr('href','data:text/plain;base64,'+btoa(body));
                $('#ThemableDownload').attr('download',title+'.md');
                $('#ThemableDownload')[0].click();
                return false;
            }
        }
    });
});


