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

/*
 * Play with this code and it'll update in the panel opposite.
 *
 * Why not try some of the options above?
 */
Morris.Line({
  element: "line-example",
  data: [
    { y: "2006", a: 100, b: 90 },
    { y: "2007", a: 75, b: 65 },
    { y: "2008", a: 50, b: 40 },
    { y: "2009", a: 75, b: 65 },
    { y: "2010", a: 50, b: 40 },
    { y: "2011", a: 75, b: 65 },
    { y: "2012", a: 100, b: 90 },
  ],
  xkey: "y",
  ykeys: ["a", "b"],
  labels: ["Series A", "Series B"],
});
