// Call the dataTables jQuery plugin
$(document).ready(function() {
  if (!qMeasure) {
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
  } else {
    let measure = "";
    switch (qMeasure) {
      case "degrees": measure="tutkinnot"; break;
      case "students": measure="opiskelijat"; break;
      case "new": measure="aloittaneet"; break;
      case "fte": measure="opiskelijat_fte"; break;
      case "present": measure="opiskelijat_lasna"; break;
      case "fivefive": measure="opiskelijat_viisviis"; break;
      case "passrate": measure="lapaisy4v"; break;
    }
    $('#dataTable').DataTable({
      "ajax": {
        "url": "https://sa.rapida.fi/eduscope_v201712.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi="+qOrganization,
        "dataSrc": "", //there's no data-named object
      },
      "columns": [
        { "data": "vuosi" },
        { "data": measure },
      ],
      "order": [[0,"desc"]]
    });
  }
});
