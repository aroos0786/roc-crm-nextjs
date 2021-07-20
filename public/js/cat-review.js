
  jQuery(document).ready( function () {
      jQuery('#myTable2').dataTable( {
      
    
      "pagingType": "simple_numbers",
      "order": [],
      "columnDefs": [ {
        "targets"  : 'no-sort',
        "orderable": false,
      }]
  });
  });
  
  jQuery(document).ready(function() {
      jQuery('#orderTable').DataTable({
          "pagingType": "simple_numbers",
    
      "columnDefs": [ {
        "targets"  : 'no-sort',
        "orderable": false,
      }]
      });
  } );