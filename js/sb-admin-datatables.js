// Call the dataTables jQuery plugin
$(document).ready(function() {
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
});
