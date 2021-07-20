
 

//SLICK 


(function(jQuery){
    var tabCarousel = jQuery('.addproduct-js');
        if (tabCarousel.length) {
            
            tabCarousel.each(function(){
                var thisCarousel = jQuery(this),
                    item =  jQuery(this).data('item'),
                    itemmobile =  jQuery(this).data('itemmobile');
                    
                        
                
                thisCarousel.slick({
                    
                    dots: false,
                    arrows: true,
                    infinite: true,
                    //rtl:true,
                    speed: 300,
                    slidesToShow: item || 4,
                    slidesToScroll: item || 4,
                    adaptiveHeight: true,
                    autoplay: false,
                        responsive: [{
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll:3
                            }
                        },
                        {
                            breakpoint: 791,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                    {
                        breakpoint: 650,
                        settings: {
                            slidesToShow: itemmobile || 1,
                            slidesToScroll: itemmobile || 1,
                        }
                    }]
                });
            });
        };
        
  })(jQuery);  
(function(jQuery){
  var tabCarousel = jQuery('.slick-multiple-arrow-js');
      if (tabCarousel.length) {
          
          tabCarousel.each(function(){
              var thisCarousel = jQuery(this),
                  item =  jQuery(this).data('item'),
                  itemmobile =  jQuery(this).data('itemmobile');
                  
                      
              
              thisCarousel.slick({
                  dots: false,
                  arrows: true,
                  infinite: true,
                  //rtl:true,
                  speed: 300,
                  slidesToShow: item || 2,
                  slidesToScroll: item || 2,
                  adaptiveHeight: true,
                  autoplay: true,
                  autoplaySpeed: 2000,
                      responsive: [{
                          breakpoint: 1025,
                          settings: {
                              slidesToShow: 3,
                              slidesToScroll:3
                          }
                      },
                      {
                          breakpoint: 791,
                          settings: {
                              slidesToShow: 2,
                              slidesToScroll: 2
                          }
                      },
                  {
                      breakpoint: 650,
                      settings: {
                          slidesToShow: itemmobile || 1,
                          slidesToScroll: itemmobile || 1,
                      }
                  }]
              });
          });
      };
      
})(jQuery);  

(function(jQuery){
  var tabCarousel = jQuery('.slick-multiple-Dots-js');
      if (tabCarousel.length) {
          
          tabCarousel.each(function(){
              var thisCarousel = jQuery(this),
                  item =  jQuery(this).data('item'),
                  itemmobile =  jQuery(this).data('itemmobile');
                  
                      
              
              thisCarousel.slick({
                  dots: true,
                  arrows: false,
                  infinite: true,
                  //rtl:true,
                  speed: 300,
                  slidesToShow: item || 2,
                  slidesToScroll: item || 2,
                  adaptiveHeight: true,
                  autoplay: true,
                  autoplaySpeed: 2000,
                      responsive: [{
                          breakpoint: 1025,
                          settings: {
                              slidesToShow: 3,
                              slidesToScroll:3
                          }
                      },
                      {
                          breakpoint: 791,
                          settings: {
                              slidesToShow: 2,
                              slidesToScroll: 2
                          }
                      },
                  {
                      breakpoint: 650,
                      settings: {
                          slidesToShow: itemmobile || 1,
                          slidesToScroll: itemmobile || 1,
                      }
                  }]
              });
          });
      };
      
})(jQuery);  
jQuery('.slick-basic-arrow-js').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1
});
jQuery('.slick-basic-dot-js').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1
});
 

