$(function(){

  $('section').each(function(i,el) {
    // console.log(el);
    el.style.height = $(window).height() + 'px';
  });

  $('.large-image-1').css({backgroundImage: 'url(http://media.giphy.com/media/QnWWQ1tVagHra/giphy.gif)'});

});