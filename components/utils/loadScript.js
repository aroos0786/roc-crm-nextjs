
export  const Css = url => {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = function() {
      resolve();
     
    };

    let headScript = document.querySelector('script');
    headScript.parentNode.insertBefore(link, headScript);
  });
};

// for load scripts
export  const Script = src => {
  return new Promise(function(resolve, reject) {
    //document.body.removeChild(script);

    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function() {
      resolve();
     
    });
    script.addEventListener('error', function(e) {
      reject(e);
    });
    document.body.appendChild(script);
    //document.body.removeChild(script);
    let headLink = document.querySelector('link');
    // headLink.parentNode.insertAfter(script, headLink);
    // headLink.parentNode.removeChild(headLink);
  });
};


// for load scripts
export  const RemoveScript = src => {
  return new Promise(function(resolve, reject) {
    //document.body.removeChild(script);

    var script = document.createElement('script');
    script.src = src;
    // script.addEventListener('load', function() {
    //   resolve();
    //   console.log('script has loaded');
    // });
    // script.addEventListener('error', function(e) {
    //   reject(e);
    // });
    // document.body.appendChild(script);
    document.body.removeChild(script);
    // let headLink = document.querySelector('link');
    // headLink.parentNode.insertAfter(script, headLink);
    // headLink.parentNode.removeChild(headLink);
  });
};



const removejscssfile = (filename, filetype) =>{
  var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
  var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
  var allsuspects=document.getElementsByTagName(targetelement)
  for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
      allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
  }
}
export const loadProductUnit = () => {
  Script(`/js/product-unit.js`);
  Css(`http://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css`)
  Script(`http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js`)
};




export const mainScript = () =>{
   Script('/js/script.bundle.js')  
}


export const newScript = () =>{
  Script('/js/new.js')  
}



export const allScript = () =>{
  Script('/js/plugin.bundle.min.js')  
  Script('/js/bootstrap.bundle.min.js')  
  Script('/js/slick.min.js')  
  Script('/api/jqueryvalidate/jquery.validate.min.js')  
  Script('/api/apexcharts/apexcharts.js')  
  Script('/api/apexcharts/scriptcharts.js')  
  Script('/api/pace/pace.js')  
  Script('/api/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js')  
  Script('https://cdn.quilljs.com/1.3.6/quill.min.js')  
  Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js')  
  Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/inline/ckeditor.js')  
  Script('http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js')  
  Script('https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js')  
  Script('https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js')  
  Script('/js/script-slick.js')  
  Script('/js/script.bundle.js')  
   
}


export const removeAllScript = () =>{
  removejscssfile('/js/plugin.bundle.min.js', 'js')  
  removejscssfile('/js/bootstrap.bundle.min.js', 'js')  
  removejscssfile('/js/slick.min.js', 'js')  
  removejscssfile('/api/jqueryvalidate/jquery.validate.min.js', 'js')  
  removejscssfile('/api/apexcharts/apexcharts.js', 'js')  
  removejscssfile('/api/apexcharts/scriptcharts.js', 'js')  
  removejscssfile('/api/pace/pace.js', 'js')  
  removejscssfile('/api/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js', 'js')  
  removejscssfile('https://cdn.quilljs.com/1.3.6/quill.min.js', 'js')  
  removejscssfile('https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js', 'js')  
  removejscssfile('https://cdn.ckeditor.com/ckeditor5/22.0.0/inline/ckeditor.js', 'js')  
  removejscssfile('http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js', 'js')  
  removejscssfile('https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js', 'js')  
  removejscssfile('https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js', 'js')  
  removejscssfile('/js/script-slick.js', 'js')  
  removejscssfile('/js/script.bundle.js', 'js')  
   
}




export const businessScript = () =>{
  
  Script('../../js/script.bundle.js') 
  Script('../../api/pace/pace.js') 
 
   Script('../js/plugin.bundle.min.js')  
//    Script('../js/bootstrap.bundle.min.js')  
//   Script('../js/slick.min.js')  
//   Script('../api/jqueryvalidate/jquery.validate.min.js')  
//    Script('../api/apexcharts/apexcharts.js')  
//    Script('../api/apexcharts/scriptcharts.js')  
  
   Script('../api/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js')  
// // Script('https://cdn.quilljs.com/1.3.6/quill.min.js')  
//   // Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js')  
//   // Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/inline/ckeditor.js')  
//   // Script('http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js')  
//    Script('https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js')  
//    Script('https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js')  
 

   
}


export const hoomeScript = () =>{
  Script('/js/script.bundle.js')  

  Script('/js/plugin.bundle.min.js')  
  Script('/js/bootstrap.bundle.min.js')  
  Script('/js/slick.min.js')  
  Script('/api/jqueryvalidate/jquery.validate.min.js')  
  Script('/api/apexcharts/apexcharts.js')  
  Script('/api/apexcharts/scriptcharts.js')  
   Script('/api/pace/pace.js')  
  Script('/api/mcustomscrollbar/jquery.mCustomScrollbar.concat.min.js')  
  Script('https://cdn.quilljs.com/1.3.6/quill.min.js')  
   Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js')  
  Script('https://cdn.ckeditor.com/ckeditor5/22.0.0/inline/ckeditor.js')  
  Script('http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js')  
  Script('https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js')  
  Script('https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js')  
  // Script('/js/script-slick.js')  
  Script('/js/script.bundle.js')  
 
   
}

