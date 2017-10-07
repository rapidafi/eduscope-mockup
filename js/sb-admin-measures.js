// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

$.getJSON("https://sa.rapida.fi/eduscope_v201711.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi=02609", function( data ) {
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
    if (val.vuosi==2016) {
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

  // -- Degrees Line Chart
  new Chart(document.getElementById("degreesLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "Degrees",
          data: eduscope.degrees,
          lineTension: 0.3,
          //backgroundColor: "rgba(0,0,0,0)",//invisible
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
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
            min: Math.floor((eduscope.min_degree-(eduscope.min_degree/100*5))/100)*100,
            max: Math.ceil((eduscope.max_degree+(eduscope.max_degree/100*5))/100)*100,
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
  // -- Students Line Chart
  new Chart(document.getElementById("studentsLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "Students",
          data: eduscope.students,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
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
            min: Math.floor((eduscope.min_student-(eduscope.min_student/100*5))/100)*100,
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

  new Chart(document.getElementById("newLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "New",
          data: eduscope.new,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: { unit: 'year' },
          gridLines: { display: false },
          ticks: { maxTicksLimit: 10 }
        }],
        yAxes: [{
          ticks: {
            min: Math.floor((eduscope.min_new-(eduscope.min_new/100*5))/100)*100,
            max: Math.ceil((eduscope.max_new+(eduscope.max_new/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: { color: "rgba(0, 0, 0, .125)" }
        }],
      },
      legend: { display: false }
    }
  });

  new Chart(document.getElementById("presentLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "Present",
          data: eduscope.present,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: { unit: 'year' },
          gridLines: { display: false },
          ticks: { maxTicksLimit: 10 }
        }],
        yAxes: [{
          ticks: {
            min: Math.floor((eduscope.min_present-(eduscope.min_present/100*5))/100)*100,
            max: Math.ceil((eduscope.max_present+(eduscope.max_present/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: { color: "rgba(0, 0, 0, .125)" }
        }],
      },
      legend: { display: false }
    }
  });

  new Chart(document.getElementById("fteLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "FTE",
          data: eduscope.fte,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: { unit: 'year' },
          gridLines: { display: false },
          ticks: { maxTicksLimit: 10 }
        }],
        yAxes: [{
          ticks: {
            min: Math.floor((eduscope.min_fte-(eduscope.min_fte/100*5))/100)*100,
            max: Math.ceil((eduscope.max_fte+(eduscope.max_fte/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: { color: "rgba(0, 0, 0, .125)" }
        }],
      },
      legend: { display: false }
    }
  });

  new Chart(document.getElementById("fivefiveLineChart"), {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: "55sp",
          data: eduscope.fivefive,
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 20,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [{
          time: { unit: 'year' },
          gridLines: { display: false },
          ticks: { maxTicksLimit: 10 }
        }],
        yAxes: [{
          ticks: {
            min: Math.floor((eduscope.min_fivefive-(eduscope.min_fivefive/100*5))/100)*100,
            max: Math.ceil((eduscope.max_fivefive+(eduscope.max_fivefive/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: { color: "rgba(0, 0, 0, .125)" }
        }],
      },
      legend: { display: false }
    }
  });
});
