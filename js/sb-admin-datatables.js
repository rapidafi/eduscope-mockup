// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    "ajax": {
      "url": "https://sa.rapida.fi/eduscope_v201712.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi="+qOrganization,
      "dataSrc": "", //there's no data-named object
    },
    "columns": [
      { "data": "vuosi" },
      { "data": "tutkinnot" },
      { "data": "opiskelijat" },
      { "data": "aloittaneet" },
      { "data": "opiskelijat_lasna" },
      { "data": "opiskelijat_fte" },
    ],
    "order": [[0,"desc"]]
  });
});
