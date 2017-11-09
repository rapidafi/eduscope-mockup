// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

function makeGraphConfig(eduscope,partialId,dataKey,title) {
  let min = eduscope["min_"+partialId];
  let max = eduscope["max_"+partialId];
  let data = eduscope[dataKey];

  // make prediction with regression
  // nb! in all of these arrays the order is significant, even indexes must match!
  let regress_data = [];
  for (var i=0; i<data.length; i++) {
    if (data[i]) {
      regress_data.push([eduscope.labels[i],1*data[i]]);
    }
  }
  //let regress_linear = regression.linear(regress_data,{order:2,precision:2,period:null});
  let regress_polynomial = regression.polynomial(regress_data,{order:4,precision:20}); //period not used(?); large enough precision (>10) so roundings don't destroy calculation
  let regress_graph = [];
  for (var i=0,j=0; i<data.length; i++) {
    if (data[i]) {
      regress_graph.push(regress_polynomial.points[j++][1]);
    } else {
      regress_graph.push(data[i]);//put nulls as placeholders
    }
  }
  // actual max year in data
  let y_max = eduscope.labels.reduce(function(a,b){return Math.max(a,b);});
  for (let y=0; y<(qPredictYears||0); y++) {
    regress_graph.push(regress_polynomial.predict(y_max+y+1)[1]);
  }
  /*
  console.debug("makeGraphConfig",dataKey
    ,"labels",eduscope.labels
    ,"data",data
    ,"regress_data",regress_data
    ,"regress_polynomial",regress_polynomial
    ,"regress_graph",regress_graph
  );//*/
  //-prediction


  return {
    type: 'line',
    data: {
      labels: eduscope.labels,
      datasets: [
        {
          label: title,
          data: data,
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
        {
          label: title+" trend",
          data: regress_graph,
          backgroundColor: "rgba(0,0,0,0)",//invisible
        }
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
            // dynamic minimum or always 0?
            //min: 0,//Math.floor((min-(min/100*5))/100)*100,
            beginAtZero: qGraphMin?false:true,
            //go dynamic: max: Math.ceil((max+(max/100*5))/100)*100,
            maxTicksLimit: 10
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      },
    }
  }
}

$.getJSON("https://sa.rapida.fi/eduscope_v201712.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi="+qOrganization, function( data ) {
  var eduscope = {};
  eduscope.labels = [];
  eduscope.degrees = [];
  eduscope.students = [];
  eduscope.new = [];
  eduscope.present = [];
  eduscope.fte = [];
  eduscope.fivefive = [];
  eduscope.passrate = [];
  $.each( data, function( key, val ) {
    eduscope.labels.push(val.vuosi);
    eduscope.degrees.push(val.tutkinnot);
    eduscope.students.push(val.opiskelijat);
    eduscope.new.push(val.aloittaneet);
    eduscope.present.push(val.opiskelijat_lasna);
    eduscope.fte.push(val.opiskelijat_fte);
    eduscope.fivefive.push(val.opiskelijat_viisviis);
    eduscope.passrate.push(val.lapaisy4v);
    if (val.vuosi==qYear) {
      eduscope.sel_year = val.vuosi;
      eduscope.sel_degree = val.tutkinnot;
      eduscope.sel_student = val.opiskelijat;
      eduscope.sel_new = val.aloittaneet;
      eduscope.sel_present = val.opiskelijat_lasna;
      eduscope.sel_fte = val.opiskelijat_fte;
      eduscope.sel_fivefive = val.opiskelijat_viisviis;
      eduscope.sel_passrate = val.lapaisy4v;
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
  eduscope.min_passrate = eduscope.passrate.reduce(function(a, b) { return Math.min(a, b); });
  eduscope.max_passrate = eduscope.passrate.reduce(function(a, b) { return Math.max(a, b); });
  // for precicting
  for (let y=0; y<(qPredictYears||0); y++) {
    eduscope.labels.push(Math.max(eduscope.labels.reduce(function(a,b){return Math.max(a,b);}))+1)
  }
  console.debug("eduscope",eduscope)

  new Chart(document.getElementById("degreesLineChart"), makeGraphConfig(eduscope,"degree","degrees","Degrees"));
  new Chart(document.getElementById("studentsLineChart"), makeGraphConfig(eduscope,"student","students","Students"));
  new Chart(document.getElementById("newLineChart"), makeGraphConfig(eduscope,"new","new","New"));
  new Chart(document.getElementById("presentLineChart"), makeGraphConfig(eduscope,"present","present","Present"));
  new Chart(document.getElementById("fteLineChart"), makeGraphConfig(eduscope,"fte","fte","FTE"));
  new Chart(document.getElementById("fivefiveLineChart"), makeGraphConfig(eduscope,"fivefive","fivefive","55sp"));
  //new Chart(document.getElementById("passrateLineChart"), makeGraphConfig(eduscope,"passrate","passrate","Pass rate"));
  
});
