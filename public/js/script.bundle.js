
$.noConflict();
 // Animate loader off screen
jQuery(window).on('load', function(){ 
  jQuery('.se-pre-con').fadeOut("slow");
});


// tabs open with click on another page
window.onload = function(){  

  var url = document.location.toString();
  if (url.match('#')) {
    jQuery('.nav-item a[href="#' + url.split('#')[1] + '"]').tab('show');
  }
  //Change hash for page-reload
  jQuery('.nav-item a[href="#' + url.split('#')[1] + '"]').on('shown', function (e) {
      window.location.hash = e.target.hash;
  }); 
}

jQuery(function() {
  let url = location.href.replace(/\/$/, "");
 
    const hash = url.split("#");
    
    jQuery('#pills-tab a[href="#'+hash[1]+'"]').tab("show");
    url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      jQuery(window).scrollTop(0);
    }, 400);
   
  jQuery('a[data-toggle="pill"]').on("click", function() {
    let newUrl;
    const hash = jQuery(this).attr("href");
    console.log('check2' ,hash);
    if(hash == "#info-tab") {
      newUrl = url.split("#")[0];
    } else {
      newUrl = url.split("#")[0] + hash;
    }
    newUrl;
    history.replaceState(null, null, newUrl);
  });
});


// 2 tabs click show one tab content  

jQuery('.nav-pills li a').on('click',function (e) {     
  //get selected href
  var href = jQuery(this).attr('href');
  
  // show tab for all tabs that match href
  jQuery('.nav-pills li a[href="' + href + '"]').tab('show');
})


function checkedme() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  var text = document.getElementById("aftercheck");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    jQuery(text).css("display", "block");
  } else {
    jQuery(text).css("display", "none");
  }
}
function checkedme2() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck2");
  // Get the output text
  var text = document.getElementById("aftercheck2");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    jQuery(text).css("display", "block");
  } else {
    jQuery(text).css("display", "none");
  }
}

function checkedPoint() {
  // Get the checkbox
  var checkBox = document.getElementById("PhysicalRadios1");
  var checkBox2 = document.getElementById("DigitalRadio2");
  var checkBox3 = document.getElementById("InventoryRadios1");
  var checkBox4 = document.getElementById("extendRadios2");
  var checkBox5 = document.getElementById("InventoryRadio2");
  // Get the output text
  var text = document.getElementById("inventryEnter");
  var text2 = document.getElementById("DigitalEnter");
  var text3 = document.getElementById("afterinventory");
  var text4 = document.getElementById("afterinventorynext");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    jQuery(text).css("display", "block");
    jQuery(text2).css("display", "none");
    if (checkBox3.checked === true){
      console.log("xvc")
      jQuery(text3).css("display", "block");
     
      if (checkBox4.checked === true){
        console.log("xvc")
        jQuery(text4).css("display", "block");
        
      }
      else if(checkBox4.checked === false){
        jQuery(text4).css("display", "none");
     
      }
    }
    else if(checkBox5.checked === true){
      console.log("ttt")
      jQuery(text4).css("display", "none");
      jQuery(text3).css("display", "none");
    }
    
    else if(checkBox3.checked === false){
      jQuery(text3).css("display", "none");
    }
   
    
  }
  
  
  else if (checkBox2.checked == true){
    jQuery(text2).css("display", "block");
    jQuery(text).css("display", "none");
    jQuery(text3).css("display", "none");
    jQuery(text4).css("display", "none");
  }
   else  {
    jQuery(text).css("display", "none");
  }

}




jQuery('.cta').on('click', function(){	
    
  jQuery(this).removeClass( "active");

  jQuery(this).removeClass( "show");

  //jQuery(this).parents('.nav li a').eq(5).addClass( "active");
//jQuery(this).parents('.nav li a').addClass( "show");
});

jQuery('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
 
  var hashValue = jQuery(e.target).attr('href');

  
  jQuery("#info-tab").removeClass("active");
  jQuery("#ad-info-tab").removeClass("active");
  jQuery("#pricing-tab").removeClass("active");
  jQuery("#seo-tab").removeClass("active");
  jQuery(hashValue+"-tab").addClass("active");
  
 
  
})



///////////////// selected module
function myselect() {
  var sel = document.getElementById('slc');
  console.log('value', sel.value)
   /// show and hide div on the click by value basis
  //  var cliked = document.getElementById(sel.value);
   jQuery(`#${sel.value}`).css("display", "block");

}


function mysizeSelect(){
  var selectedSize = [];
  var selectedColor = [];
  jQuery('#table-show').empty()
  for (var option of document.getElementById('sizeSelect').options) {
    if (option.selected) {
      selectedSize.push(option.value);
    }
  }
 
  for (var option of document.getElementById('selectColor').options) {
    if (option.selected) {
      selectedColor.push(option.value);
    }
  }

   var combos = [] //or combos = new Array(2);
 if(selectedColor.length>=1 && selectedSize.length==0) {
  for(var j = 0; j < selectedColor.length; j++)
  {
    let obj = {
      color : selectedColor[j],
      size: ''
    }
    combos.push(obj)
 }
}
 else
  if(selectedSize.length>=1 && selectedColor.length==0){
    for(var i = 0; i < selectedSize.length ; i++)
    {
    let obj = {
      color : '',
      size: selectedSize[i],
    }
    combos.push(obj)
  }
}
 else{

  combos=[]
  for(var i = 0; i < selectedSize.length ; i++)
  {
       for(var j = 0; j < selectedColor.length; j++)
       {
          //you would access the element of the array as array1[i] and array2[j]
          //create and array with as many elements as the number of arrays you are to combine
          //add them in
          //you could have as many dimensions as you need
         
          let obj = {
            color : selectedColor[j],
            size: selectedSize[i]
          }
          combos.push(obj)
       }
  }
}
  // var sel = document.getElementById('sizeSelect');
   console.log('sizeSelect value', selectedSize)
   console.log('sizeSelect selectedColor', selectedColor)
   console.log('combos', combos)

   combos.forEach(function(elem){
    jQuery('#table-show').css('display', 'block')
    
    jQuery('#table-show').append('<tr class="row m-0 text-center"><td  class="col-2"> '+ elem.color+'</td><td class="col-2">'+ elem.size+'</td><td class="col-3 d-flex justify-content-center"><input type="text" class="form-control w-150px text-center" id="disabledInput" placeholder="'+ elem.color+ "-" +elem.size +'" disabled=""></td><td class="col-2"><img src="./assets/images/carousel/slide1.jpg" class="h-45px w-45px img-fluid" alt="img"></td><td class="col-3 d-flex justify-content-center"><input type="text" class="form-control w-150px text-center" id="disabledInput" placeholder="Credit Card" disabled=""></td></tr>')
});
}

jQuery('#remove-s').on("click", function(e){
  jQuery('#Size').css("display", "none");
});
jQuery('#remove-c').on("click", function(e){
  jQuery('#Color').css("display", "none");
});
/////////////////////////////////////////////////

jQuery('.thumbnail .thumbnail-imges a').on('click', function(){	
  console.log("aa")
  // jQuery('.thumbnail .thumbnail-imges').removeClass( "active");
  // jQuery(this).parent().addClass( "active");
  jQuery(this).parent().toggleClass( "active");
}); 
jQuery('.selectall').on('click', function(){	
  console.log("aa")
  // jQuery('.thumbnail .thumbnail-imges').removeClass( "active");
  // jQuery(this).parent().addClass( "active");
  jQuery('.thumbnail .thumbnail-imges a').parent().addClass( "active");
}); 
jQuery('.unselectall').on('click', function(){	
  console.log("aa")
  // jQuery('.thumbnail .thumbnail-imges').removeClass( "active");
  // jQuery(this).parent().addClass( "active");
  jQuery('.thumbnail .thumbnail-imges a').parent().removeClass( "active");
}); 

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        jQuery('#imagePreview').css('background-image', 'url('+e.target.result +')');
        jQuery('#imagePreview').hide();
        jQuery('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
jQuery("#imageUpload").change(function() {
  readURL(this);
});

var $levelOneCheck = jQuery('.userPermissionCheckBox-level-one');
var $levelTwoCheck = jQuery('.userPermissionCheckBox-level-two');
var $levelThreeCheck = jQuery('.userPermissionCheckBox-level-three');

$levelOneCheck.on('click',function() {
var $isChecked = jQuery(this).attr('isChecked');
if ($isChecked === 'true') {
    jQuery(this).attr('isChecked', 'false');
    $levelTwoCheck.prop('checked', false).attr('isChecked', 'false');
    $levelThreeCheck.prop('checked', false).attr('isChecked', 'false');
} else {
    jQuery(this).attr('isChecked', 'true');
    $levelTwoCheck.prop('checked', true).attr('isChecked', 'true');
    $levelThreeCheck.prop('checked', true).attr('isChecked', 'true');
}
});

$levelTwoCheck.on('click',function() {
var $isCheckedLevelTwo = jQuery(this).attr('isChecked');
if ($isCheckedLevelTwo === 'true') {
    jQuery(this).attr('isChecked', 'false');
    jQuery(this).closest('.level-one-closed').find('.level-one-folder .userPermissionCheckBox-level-one').prop('checked', false).attr('isChecked', 'false');
    jQuery(this).closest('.level-two-closed').find('.level-three-folder .userPermissionCheckBox-level-three').prop('checked', false).attr('isChecked', 'false');
    
} else {
    jQuery(this).attr('isChecked', 'true');
    jQuery(this).closest('.level-one-closed').find('.level-one-folder .userPermissionCheckBox-level-one').prop('checked', true).attr('isChecked', 'true');
    jQuery(this).closest('.level-two-closed').find('.level-three-folder .userPermissionCheckBox-level-three').prop('checked', true).attr('isChecked', 'true');
}
});

$levelThreeCheck.on('click',function() {
var $isCheckedLevelTwo = jQuery(this).attr('isChecked');
if ($isCheckedLevelTwo === 'true') {
 
    jQuery(this).attr('isChecked', 'false');
    jQuery(this).closest('.level-one-closed').find('.level-one-folder .userPermissionCheckBox-level-one').prop('checked', false).attr('isChecked', 'false');
    jQuery(this).closest('.level-two-closed').find('.level-two-folder .userPermissionCheckBox-level-two').prop('checked', false).attr('isChecked', 'false');
    
} else {
    jQuery(this).attr('isChecked', 'true');
    jQuery(this).closest('.level-one-closed').find('.level-one-folder .userPermissionCheckBox-level-one').prop('checked', true).attr('isChecked', 'true');
    jQuery(this).closest('.level-two-closed').find('.level-two-folder .userPermissionCheckBox-level-two').prop('checked', true).attr('isChecked', 'true');
}
});


jQuery(document).ready(function() {
  
// jQuery('#tc_aside_toggle').on("click", function(e){
//   jQuery('body').toggleClass('aside-minimize');
// });

  // jQuery('#tc_aside').on("hover", function(e){
  //     jQuery('body').toggleClass('aside-minimize-hover');
  // })
  jQuery("#tc_aside").hover(function () {
      jQuery('body').toggleClass("aside-minimize-hover");
  });

  //sidebar menu active
  jQuery('#basic-input .nav-link').on("click", function(e){
    console.log('ac');
    
    jQuery('.nav-collapse').addClass('show');
  });

  //Mobile Menu
  // jQuery('#tc_aside_mobile_toggle').on('click', function () {
      
  //     jQuery('#tc_aside').toggleClass('aside-on');
  //     jQuery('.aside-overlay').addClass('active');

  //     //put this when popup opens, to stop body scrolling
  //     // bodyScrollLock.disableBodyScroll(targetElement);
  //     // jQuery('html').css('overflow', 'hidden');
  //     // jQuery('body').css('overflow', 'hidden');
  // });

  jQuery('.aside-overlay').on('click', function () {
      jQuery('#tc_aside').removeClass('aside-on');
      jQuery('.aside-overlay').removeClass('active');

      //put this when close popup and show scrollbar in body
      // bodyScrollLock.enableBodyScroll(targetElement);

      // jQuery('html').css('overflow', 'auto');
      // jQuery('body').css('overflow', 'auto');
  });

  // Account offCanvas
  jQuery('#tc_quick_user_toggle').on("click", function(e){
      jQuery('#kt_quick_user').addClass('offcanvas-on');
  });
  jQuery('#kt_quick_user_close').on("click", function(e){
      jQuery('#kt_quick_user').removeClass('offcanvas-on');
  });


  // jQuery('#tc_header_mobile_topbar_toggle').on("click", function(e){
  //     jQuery('body').toggleClass('topbar-mobile-on');
  // });


  // jQuery('#kt_demo_panel_toggle').on("click", function(e){
  //     jQuery('#kt_color_panel').addClass('offcanvas-on');
  // });
  // jQuery('#kt_color_panel_close').on("click", function(e){
  //     jQuery('#kt_color_panel').removeClass('offcanvas-on');
  // });

//   jQuery('#kt_notes_panel_toggle').on("click", function(e){
//     jQuery('#kt_notes_panel').addClass('offcanvas-on');
// });
// jQuery('#kt_notes_panel_close').on("click", function(e){
//     jQuery('#kt_notes_panel').removeClass('offcanvas-on');
// });

// jQuery('.kt_notes_panel_toggle').on("click", function(e){
//   jQuery('.kt_notes_panel').addClass('offcanvas-on');
// });
// jQuery('.kt_notes_panel_close').on("click", function(e){
//   jQuery('.kt_notes_panel').removeClass('offcanvas-on');
// });

  // // theme dark
  // jQuery('#radio-light').on('click', function(e){
  //     jQuery('#radio-dark').parent('label').removeClass('active');
  //     jQuery('body').removeClass('dark');
  //     jQuery('#radio-light').attr("checked", "checked");
  //     jQuery('#radio-dark').removeAttr("checked", "");
  //     jQuery('#radio-light').parent('label').addClass('active');

  // })

  // jQuery('#radio-dark').on('click', function(e){
  //     jQuery('#radio-light').parent('label').removeClass('active');
  //     jQuery('body').addClass('dark');
  //     jQuery('#radio-dark').attr("checked", "checked");
  //     jQuery('#radio-light').removeAttr("checked", "");
  //     jQuery('#radio-dark').parent('label').addClass('active');
  // })

  
  // jQuery('.btn-rtl').on('click', function(e){
  //   jQuery('.btn-rtl').toggleClass('active');
  //   jQuery('body').toggleClass('rtl');
  //   jQuery('#kt_color_panel').removeClass('offcanvas-on');
    
  // })

  // //theme color
  // jQuery('#color-theme-blue').on('click', function(e){
  //   jQuery('body').removeClass('color-theme-red');
  //   jQuery('body').addClass('color-theme-blue');
    
  // })

  // jQuery('#color-theme-red').on('click', function(e){
  //   jQuery('body').removeClass('color-theme-blue');
  //   jQuery('body').addClass('color-theme-red');
  // })
  


  // validation for form fields

  jQuery( "#myform" ).validate({
    rules: {
      email: {
        required: true
      },
      password : {
        required: true
      }
    }
  });
  
});


jQuery(document).ready(function() {
  var table = jQuery('#myTable').DataTable();

  jQuery('#myTable tbody').on( 'click', 'tr', function () {
      jQuery(this).toggleClass('selected');
      console.log("fsdf")
  } );

  jQuery('#button').click( function () {
      alert( table.rows('.selected').data().length +' row(s) selected' );
  } );
} );

jQuery(document).ready(function() {
  jQuery(".pin-click").click(function(e) {
    var id = jQuery(this).attr('id');
    console.log(id)
     var pin_not =    jQuery(`#${id} .pin-fixnot.dis-block`)
     var pin =    jQuery(`#${id} .pin.dis-block`)
     console.log("hdjhsj", pin_not.length)
     console.log("pin", pin.length)
    if(pin_not.length == 1){
      jQuery(`#${id} .pin-fixnot`).removeClass('dis-block');
      jQuery(`#${id} .pin-fixnot`).addClass('dis-none');
      jQuery(`#${id} .pin`).addClass("dis-block border-bottoms");
      jQuery(`#${id} .pin`).removeClass("dis-none");
     
    }

    if(pin.length == 1){
      jQuery(`#${id} .pin-fixnot`).addClass('dis-block');
      jQuery(`#${id} .pin-fixnot`).removeClass('dis-none');
      jQuery(`#${id} .pin`).removeClass("dis-block border-bottoms");
      jQuery(`#${id} .pin`).addClass("dis-none ");
    }



  });
  });

// jQuery(document).ready(function(){
//   var pin=0;
//   jQuery('.pin-click').click(function(e){
      
//       // Stop acting like a button
//       e.preventDefault();
//       // Get the field name
      
//       p_id = jQuery(this).val();
//       // var quantity = parseInt(jQuery("#"+p_id).val());
//       // if (quantity != 0)
//       //     jQuery("#"+p_id).val(quantity - 1);

//       // Decrement
//       console.log('p_id',p_id);
//   });
//   jQuery('.quantity-plus').click(function(e){
      
//       // Stop acting like a button
//       e.preventDefault();
//       // Get the field name
      
//       p_id = jQuery(this).val();
//       var quantity = parseInt(jQuery("#"+p_id).val());
//       jQuery("#"+p_id).val(quantity + 1);

//       // Increment
      
//   });
// });

// jQuery('.pin-click').on('click', function(e){
//   e.preventDefault();
//   p_id = jQuery(this).val();
//   console.log('p_id',p_id);
//   // var quantity = parseInt(jQuery("#"+p_id).val());
//   // jQuery("#"+p_id).val(quantity + 1);

//   // jQuery('.pin-fixnot').hide();
//   // jQuery('.pin-fix').show();
//   // jQuery('.pincard .card-body').addClass("border-bottoms");
//   jQuery("#"+p_id).removeClass('.pin-fixnot');
//   jQuery("#"+p_id).addClass('.pin-fix');
// });
jQuery('.pin-fix').on('click', function(){
  jQuery('.pin-fix').hide();
  jQuery('.pin-fixnot').show();
  jQuery('.pincard .card-body').removeClass("border-bottoms");
});

const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;

		// Lower inc to slow and higher to slow
		const inc = target / speed;

		// console.log(inc);
		// console.log(count);

		// Check if target is reached
		if (count < target) {
			// Add inc to count and output in counter
			counter.innerText = count + inc;
			// Call function every ms
			setTimeout(updateCount, 1);
		} else {
			counter.innerText = target;
		}
	};

	updateCount();
});



/* Get the documentElement (<html>) to display the page in fullscreen */
// var elem = document.documentElement;

/* View in fullscreen */
// function openFullscreen() {
//     jQuery('#kt_open_fullscreen').hide();
//     jQuery('#kt_close_fullscreen').show();
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) { /* Firefox */
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) { /* IE/Edge */
//       elem.msRequestFullscreen();
//     }
    
  
    
// }


/* Close fullscreen */
// function closeFullscreen() {
//     jQuery('#kt_close_fullscreen').hide();
//     jQuery('#kt_open_fullscreen').show();
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) { /* Firefox */
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE/Edge */
//       document.msExitFullscreen();
//     }
//   }

// Custom for pacejs
var paceOptions = {
  elements: true
};

// for classic Editor
ClassicEditor
.create( document.querySelector( '#editor' ),{
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ],
    alignment: {
      options: [ 'left', 'right' ]
    }
})

.catch( error => {
    console.error( error );
});

ClassicEditor
.create( document.querySelector( '#editor3' ),{
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ],
    alignment: {
      options: [ 'left', 'right' ]
    }
})

.catch( error => {
    console.error( error );
});

InlineEditor
.create( document.querySelector( '#editor2' ) )
.catch( error => {
    console.error( error );
} );

// for data tables
jQuery(document).ready( function () {
	jQuery('#myTable').DataTable();
});


(function($){
  jQuery(window).on("load",function(){
    jQuery(".my-custom-scrollbar").mCustomScrollbar(
      {
        setHeight:true
      }
    );
  });
})(jQuery);




jQuery(".nav-pills .nav-link").each(function(i){ 
  jQuery(this).click(function(e){
    jQuery(this).attr("href", jQuery('.tab-pane')[i].id);
    window.location.hash  = jQuery('.tab-pane')[i].id;
    console.log( "abc", window.location.hash);
  });
});

jQuery(".nav-pills .nav-link").click(function(e) {
  var active = this.href.slice(-5)
  , link = active.slice(1);
  console.log(active, link)
  jQuery(".tab-content [id^=tab]").hide();
  jQuery(active).show();
  history.replaceState(null, link
    , location.href.slice(-1) === "/" 
    ? location.href + "/" + link 
    : link
  )
});

