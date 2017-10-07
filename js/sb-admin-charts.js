// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

$.getJSON("https://sa.rapida.fi/eduscope_v201711.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi="+qOrganization, function( data ) {
  var eduscope = {};
  eduscope.labels = [];
  eduscope.degrees = [];
  eduscope.students = [];
  eduscope.new = [];
  eduscope.present = [];
  eduscope.fte = [];
  eduscope.fivefive = [];
  $.each( data, function( key, val ) {
    eduscope.labels.push(val.vuosi);
    eduscope.degrees.push(val.tutkinnot);
    eduscope.students.push(val.opiskelijat);
    eduscope.new.push(val.aloittaneet);
    eduscope.present.push(val.opiskelijat_lasna);
    eduscope.fte.push(val.opiskelijat_fte);
    eduscope.fivefive.push(val.opiskelijat_viisviis);
    if (val.vuosi==qYear) {
      eduscope.sel_year = val.vuosi;
      eduscope.sel_degree = val.tutkinnot;
      eduscope.sel_student = val.opiskelijat;
      eduscope.sel_new = val.aloittaneet;
      eduscope.sel_present = val.opiskelijat_lasna;
      eduscope.sel_fte = val.opiskelijat_fte;
      eduscope.sel_fivefive = val.opiskelijat_viisviis;
    }
  });
  eduscope.min_degree = eduscope.degrees.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_degree = eduscope.degrees.reduce(function(a, b) { return Math.max(a, b); });
  eduscope.min_student = eduscope.students.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_student = eduscope.students.reduce(function(a, b) { return Math.max(a, b); });
  eduscope.min_new = eduscope.new.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_new = eduscope.new.reduce(function(a, b) { return Math.max(a, b); });
  eduscope.min_present = eduscope.present.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_present = eduscope.present.reduce(function(a, b) { return Math.max(a, b); });
  eduscope.min_fte = eduscope.fte.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_fte = eduscope.fte.reduce(function(a, b) { return Math.max(a, b); });
  eduscope.min_fivefive = eduscope.fivefive.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_fivefive = eduscope.fivefive.reduce(function(a, b) { return Math.max(a, b); });
  console.debug("eduscope",eduscope)
  $("#bar_year").append(eduscope.sel_year + " ");
  $("#bar_degrees").append(eduscope.sel_degree + " ");
  $("#bar_students").append(eduscope.sel_student + " ");
  $("#bar_new").append(eduscope.sel_new + " ");
  $("#bar_present").append(eduscope.sel_present + " ");
  $("#bar_fte").append(eduscope.sel_fte + " ");
  $("#bar_fivefive").append(eduscope.sel_fivefive + " ");

  new Chart(document.getElementById("myLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "Degrees",
          data: eduscope.degrees,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
        {
          label: "Students",
          data: eduscope.students,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(216,117,2,0.2)",
          borderColor: "rgba(216,117,2,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,117,2,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,117,2,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
        {
          label: "New",
          data: eduscope.new,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(117,216,2,0.2)",
          borderColor: "rgba(117,216,2,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(117,216,2,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(117,216,2,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
        {
          label: "Present",
          data: eduscope.present,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(2,216,117,0.2)",
          borderColor: "rgba(2,216,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,216,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,216,117,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
        {
          label: "FTE",
          data: eduscope.fte,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(117,2,216,0.2)",
          borderColor: "rgba(117,2,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(117,2,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(117,2,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
        {
          label: "55sp",
          data: eduscope.fivefive,
          lineTension: 0.3,
          backgroundColor: "rgba(0,0,0,0)",//invisible
          //backgroundColor: "rgba(216,2,117,0.2)",
          borderColor: "rgba(216,2,117,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(216,2,117,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(216,2,117,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'year'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          ticks: {
            min: 0, //Math.min(eduscope.min_degree,eduscope.min_student)-50,
            //max: Math.max(eduscope.max_degree,eduscope.max_student)+50,
            max: Math.ceil((eduscope.max_student+(eduscope.max_student/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });

  new Chart(document.getElementById("myBarChart"), {
    type: 'bar',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "Degrees",
          data: eduscope.degrees,
          backgroundColor: "rgba(2,117,216,0.5)",
          borderColor: "rgba(2,117,216,1)",
        },
        {
          label: "Students",
          data: eduscope.students,
          backgroundColor: "rgba(216,117,2,0.5)",
          borderColor: "rgba(216,117,2,1)",
        },
        {
          label: "New",
          data: eduscope.new,
          backgroundColor: "rgba(117,216,2,0.5)",
          borderColor: "rgba(117,216,2,1)",
        },
        {
          label: "Present",
          data: eduscope.present,
          backgroundColor: "rgba(2,216,117,0.5)",
          borderColor: "rgba(2,216,117,1)",
        },
        {
          label: "FTE",
          data: eduscope.fte,
          backgroundColor: "rgba(117,2,216,0.5)",
          borderColor: "rgba(117,2,216,1)",
        },
        {
          label: "55sp",
          data: eduscope.fivefive,
          backgroundColor: "rgba(216,2,117,0.5)",
          borderColor: "rgba(216,2,117,1)",
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'year'//'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          ticks: {
            min: 0, //Math.min(eduscope.min_degree,eduscope.min_student)-50,
            //max: Math.max(eduscope.max_degree,eduscope.max_student)+50,
            max: Math.ceil((eduscope.max_student+(eduscope.max_student/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: true
      }
    }
  });


  // -- Pie Chart Example
  var ctx3 = document.getElementById("myPieChart");
  if (ctx3) {
    var myPieChart = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ["Blue", "Red", "Yellow", "Green"],
        datasets: [{
          data: [12.21, 15.58, 11.25, 8.32],
          backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
        }],
      },
    });
  }
});
