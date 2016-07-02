$('a[href^="#Skills"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().Skills}, 800);
    return false;
});
$('a[href^="#Portfolio"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().Portfolio}, 800);
    return false;
});
$('a[href^="#AboutMe"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().AboutMe}, 800);
    return false;
});