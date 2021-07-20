
 
	jQuery(document).ready(function() {
        jQuery('.js-example-basic-single').select2();
	});
	jQuery(function() {
        jQuery('.english-select').multipleSelect({
      filter: true,
      filterAcceptOnEnter: true
    })
  });
  jQuery(function() {
        jQuery('.arabic-select').multipleSelect({
      filter: true,
      filterAcceptOnEnter: true
    })
  });

jQuery(document).ready( function () {
	jQuery('#productUnitTable').dataTable( {
    "pagingType": "simple_numbers",
  
    "columnDefs": [ {
      "targets"  : 'no-sort',
      "orderable": false,
    }]
});
});
	jQuery(document).ready(function() {
    jQuery('#orderTable').DataTable({
	  
		"info":     false,
		"paging":   false,
		"searching": false,
  
    "columnDefs": [ {
      "targets"  : 'no-sort',
      "orderable": false,
    }]
	});
} );