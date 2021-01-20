function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
//document.getElementById("myBtn").click();

// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 8],
    ["Eat", 2],
    ["TV", 4],
    ["Gym", 2],
    ["Sleep", 8],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { title: "My Average Day", width: 550, height: 400 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("#piechart")
  );
  chart.draw(data, options);
}

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

var ati;
var ina;

let caller = (ativo, inativo) => {
  ati = ativo;
  ina = inativo;
};
/*
window.onload = function (multi) {
  alert("cal");
  console.log("oiiii");
  ati = multi[1];
  ina = multi[2];
};
*/
/// line grapg
window.onload = function () {
  console.log(ina);
  var sess = [];
  sess.push("{ x: " + new Date(2017, 0, 3) + ", y:" + ati[0] + "}");
  var i = 1;
  ati.forEach((element) => {
    sess.push(",{ x:" + new Date(2017, 0, 3) + ", y:" + element + "}");
  });
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Sessions",
    },
    axisX: {
      valueFormatString: "Timestamp",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Number of Sessions",
      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "Session Number",
        markerType: "square",
        xValueFormatString: "Timestamp",
        color: "#F08080",
        dataPoints: [{ x: new Date(2017, 0, 3), y: 650 }],
      },
      {
        type: "line",
        showInLegend: true,
        name: "Unique Visit",
        lineDashType: "dash",
        dataPoints: sess,
      },
    ],
  });
  chart.render();

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
};
