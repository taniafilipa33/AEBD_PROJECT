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

var pier = [];

let pgr = (value) => {
  value.forEach((element) => {
    pier.push(element["STORAGE_DATA"]);
    pier.push(element["STORAGE_TEMP"]);
    pier.push(5714 - element["STORAGE_DATA"]);
  });
  console.log(pier);
};

/// line grapg
window.onload = function () {
  //console.log(ina);
  var sess = [];
  var ianess = [];
  // console.log(ati);
  //sess.push({ x: 0, y: ati[0] });
  //ianess.push({ x: 0, y: ina[0] });
  var i = 0;
  ati.forEach((element) => {
    //console.log();
    sess.push({ x: i, y: element });
    i++;
  });
  i = 0;
  ina.forEach((element) => {
    ianess.push({ x: i, y: element });
    i++;
  });
  console.log(sess);
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Sessions",
    },
    axisX: {
      valueFormatString: "",
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
        name: "Active Sessions",
        markerType: "square",
        xValueFormatString: "",
        color: "#F08080",
        dataPoints: sess,
      },
      {
        type: "line",
        showInLegend: true,
        name: "Inactive Sessions",
        lineDashType: "dash",
        dataPoints: ianess,
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

// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Storage", "MBytes"],
    ["Free_Storage", pier[2]],
    ["Temporary_Storage", pier[1]],
    ["Data_Storage", pier[0]],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { title: "Storage", width: 1050, height: 400 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
