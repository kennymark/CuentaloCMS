$('.nav-item').click(function (e) {
    var that = $(this);
    var pagetext = that.text();
    $('.nav-item').removeClass('is-active');
    that.addClass('is-active');
    $('.page').text(pagetext)

});
/*$('.search').on('keydown', function(e) {
    var inputText = $(this).val();
   $.ajax('/search?q='+inputText).then(function(data){
       console.log(data)
   })
    
    console.log()
})*/
pagesText();
function pagesText(){
    if(location.pathname === "/recents"){
        $('.page').text('Recent Posts')
    
    }
}
$('.notification').fadeOut(4000)

