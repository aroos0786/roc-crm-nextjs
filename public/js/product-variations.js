jQuery(document).ready(function() {
    jQuery('.js-example-basic-multiple').select2();
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
