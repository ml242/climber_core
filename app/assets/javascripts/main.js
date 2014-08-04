$(function(){

// section styles

  $('section').each(function(i, el) {
    // console.log(el);
    el.style.height = $(window).height() + 'px';
  });

  var firstSectionHeight = $(window).height() - 101 + 'px';

  $('.main-intro').css({height: firstSectionHeight}); 

  $('.large-image-1').css({backgroundImage: 'url(http://media.giphy.com/media/QnWWQ1tVagHra/giphy.gif)'});


  $('.carousel').carousel();


// slider functionality

  // var slider = $('.testimonials-1');

  // $('.right-button').click(function(){
  //   if ( slider.hasClass('testimonials-4') ) { 
  //     slider = $('.testimonials-1');
  //     slider.show().siblings().hide();
  //   } else {
  //     slider = slider.next();
  //     slider.show().siblings().hide();
  //     }
  //   });

  // $('.left-button').click(function(){
  //   if ( slider.hasClass('testimonials-1') ) { 
  //     slider = $('.testimonials-4');
  //     slider.show().siblings().hide();
  //   } else {
  //     slider = slider.prev();
  //     slider.show().siblings().hide();
  //     }
  //   });

});