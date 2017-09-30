// Call the dataTables jQuery plugin
$(document).ready(function() {
  /*
  $.getJSON( "https://sa.rapida.fi/eduscope.php/eduscope_education/korkeakoulu=Saimaan%20ammattikorkeakoulu", function( data ) {
    $("#dataTable").append("<tbody>");
    $.each( data, function( key, val ) {
      $("#dataTable").append("<tr><td>"+val.vuosi+"</td><td>"+val.tutkinnot+"</td><td>"+val.tutkinnot_pros+"</td></tr>");
    });
    $("#dataTable").append("</tbody>");
  });
  //*/
  $('#dataTable').DataTable({
    "ajax": {
      "url": "https://sa.rapida.fi/eduscope.php/eduscope_education/korkeakoulu=Saimaan%20ammattikorkeakoulu",
      "dataSrc": "", //there's no data-named object
    },
    "columns": [
      { "data": "vuosi" },
      { "data": "tutkinnot" },
      { "data": "tutkinnot_pros" }
    ],
    "order": [[0,"desc"]]
  });
  //*/
});
