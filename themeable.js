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
            $('#Themeable').css({top: $that.offset().top-20, left: $that.offset().left, opacity: 1});
        }, 200);
    });
    $('#Themeable').on('mouseover', function(){
        clearTimeout(moveTimer);
    });
    $('body').on('keyup', function(){
        $('#Themeable').css({opacity: 0});
    });
    
    // interact with toolbar
    $('#Themeable').on('click', 'a', function(){
        var tag = $that[0].tagName.toLowerCase();
        console.log(classes[tag].join(' '));
        activeElement.removeClass(classes[tag].join(' ')).addClass($(this).text());
    });
    
    // download function
    $('body').append('<a id="ThemeableDownload" style="display:none"></a>');
    
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            if (String.fromCharCode(event.which).toLowerCase() == 's') {
                event.preventDefault();
                var title = $($('h1')[0]).text();
                var body = toMarkdown($('body').html());
                $('#ThemeableDownload').attr('href','data:text/plain;base64,'+btoa(body));
                $('#ThemeableDownload').attr('download',title+'.md');
                $('#ThemeableDownload')[0].click();
                return false;
            }
        }
    });
});


