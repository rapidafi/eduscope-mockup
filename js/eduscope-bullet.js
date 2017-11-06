// eduscope-bullet.js scripts

function makeBulletGraph(partialId,title,val) {
    var eduscope = {};
    eduscope.year = +val.vuosi;
    eduscope.title = title;
    eduscope.description = val.yksikko;
    eduscope.measure_label = eduscope.title+' '+eduscope.year;
    eduscope.target_label = 'Target '+eduscope.year;
    eduscope.measure = val.arvo;
    eduscope.target = +val.tavoite;
    eduscope.min = val.minimi;
    eduscope.range1 = val.raja1;
    eduscope.range2 = val.raja2;
    eduscope.max = Math.max(val.maksimi,+val.tavoite); // sometimes target is more than evaluated max)
    eduscope.interval = Math.floor(eduscope.max/4/100)*100;
    if (eduscope.interval==0) {
      eduscope.interval = Math.round(eduscope.max/4);
    }
    // resize responsively:
    function resize() {
      var bulletplace = $("#jqxBulletChart_"+partialId)
      var width = '100%',
          height = 80;
      bulletplace.jqxBulletChart({
        width: width,
        height: height,
        barSize: "40%",
        title: eduscope.title,
        description: eduscope.description,
        ranges: [
          { startValue: eduscope.min, endValue: eduscope.range1, color: "steelblue", opacity: 0.5 },
          { startValue: eduscope.range1, endValue: eduscope.range2, color: "steelblue", opacity: 0.3 },
          { startValue: eduscope.range2, endValue: eduscope.max, color: "steelblue", opacity: 0.1 }
        ],
        pointer: { value: eduscope.measure, label: eduscope.measure_label, size: "25%", color: "black" },
        target: { value: eduscope.target, label: eduscope.target_label, size: 4, color: "black" },
        ticks: { position: "far", interval: eduscope.interval, size: 10 },
        labelsFormat: "",
        showTooltip: true
      });
    }
    $(window)
      .on("resize", function() {
        resize();
    });
    resize();
}

$(document).ready(function () {
  $.getJSON("https://sa.rapida.fi/eduscope_v201712.php/hei_bullet/mittariryhma=koulutus/oppilaitos="+qOrganization+"/vuosi="+qYear+"", function( data ) {
    $.each( data, function( key, val ) {
      val.yksikko = 'count';
      if (val.mittari=="tutkinnot") {
        makeBulletGraph("degrees","Degrees",val);
      }
      if (val.mittari=="opiskelijat") {
        makeBulletGraph("students","Students",val);
      }
      if (val.mittari=="aloittaneet") {
        makeBulletGraph("new","New",val);
      }
      if (val.mittari=="opiskelijat_lasna") {
        makeBulletGraph("present","Present",val);
      }
      if (val.mittari=="opiskelijat_fte") {
        makeBulletGraph("fte","FTE",val);
      }
      if (val.mittari=="opiskelijat_viisviis") {
        makeBulletGraph("fivefive","55sp",val);
      }
      if (val.mittari=="lapaisy4v") {
        val.yksikko='%';
        makeBulletGraph("passrate","Pass rate",val);
      }
    });
  });
});
