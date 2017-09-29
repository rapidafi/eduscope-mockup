// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var eduscope = {};
eduscope.labels = [];
eduscope.degrees = [];
eduscope.students = [];

$.getJSON( "https://sa.rapida.fi/eduscope.php/eduscope_education/korkeakoulu=Saimaan%20ammattikorkeakoulu", function( data ) {
  eduscope.labels = [];
  eduscope.degrees = [];
  $.each( data, function( key, val ) {
    eduscope.labels.push(val.vuosi);
    eduscope.degrees.push(val.tutkinnot);
  });
  console.log("eduscope",eduscope)

  // -- Area Chart Example
  var ctx1 = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx1, {
    type: 'line',
    data: {
      //labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
      labels: eduscope.labels,
      datasets: [{
        //label: "Sessions",
        label: "Degrees",
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
        //data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
        data: eduscope.degrees,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 450,
            max: 700,
            maxTicksLimit: 5
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
  // -- Bar Chart Example
  var ctx2 = document.getElementById("myBarChart");
  var myLineChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      /*
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [{
        label: "Revenue",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: [4215, 5312, 6251, 7841, 9821, 14984],
      }],
      */
      labels: eduscope.labels,
      datasets: [
        {
          label: "Degrees",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: eduscope.degrees,
        }
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
            maxTicksLimit: 6
          }
        }],
        yAxes: [{
          ticks: {
            min: 400,
            max: 700,
            maxTicksLimit: 50
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
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