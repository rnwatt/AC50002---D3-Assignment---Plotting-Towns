document.addEventListener('DOMContentLoaded', function () {
  var svg;
  // Slider value variable
  var sliderData = [];
  // Tooltip for displaying details on hover
  var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  function handleMouseOver(event, d) {
  //If there is no data on mouseover then ignore
    if (!sliderData.length) return;
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
  
      const hoverData = d3.select(this).data()[0];
    tooltip.html(`
    <strong>Town:</strong> ${hoverData.Town}<br>
    <strong>Population:</strong> ${hoverData.Population}<br>
    <strong>County:</strong> ${hoverData.County}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
}
//Tooltip disappears
function handleMouseOut(event, d) {
  tooltip.transition()
  .duration(500)
  .style("opacity", 0);
}
function LoadData(numPlots) {
  
    const jsonFeed = 'http://34.38.72.236/Circles/Towns/50';

// Fetch data from the server
d3.json(jsonFeed, function(error, data) {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
var width = 800;
var height = 600;

svg = d3.select("#map");

// Create a projection to convert geographic coordinates to SVG coordinates
var projection = d3.geo.mercator()
.center([0, 54])
.scale(1300)
.translate([width / 2, height / 2]);

// Create a path generator for the UK GeoJSON
var path = d3.geo.path().projection(projection);

// Load the UK GeoJSON data
d3.json("https://yamu.pro/gb.json", function (error, ukData) {
    // Append a path for the UK boundary
    //uk map
    if (error) {
      console.error('Error loading GeoJSON:', error);
    } else {
      //Slices the data so that a certain number of data points are drawn depending on the slider position
sliderData = data.slice(0, numPlots);
    svg
        .selectAll("path")
        .data(ukData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "lightgreen")
        .style("stroke", "gray");

      
        //data point
        var point = svg.append("g");
      point.selectAll("circle")
      .data(sliderData)
      .enter().append("circle")
      .attr("class", "point")
      .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
      })
      .attr("cy", function(d) {
          return projection([d.lng, d.lat])[1];
      })
        //Animate by changing the radius of the plots
      .attr("r", 0)
  .transition()
  .attr("r", 3) 
  .duration(500) 
  .each("end", function () {
    d3.select(this).on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
  });
        // Show details when hovering over a point
        
      onDataLoaded();
    }
        }); 
      }
      sliderValue.textContent = this.value;  
    // Remove previous plots
    svg.selectAll(".point").remove();
    });
    var isLoading = false; // Flag to track whether data is currently being loaded, to avoid data being called multiple times
  
    document.getElementById('refreshButton').addEventListener('click', refreshButton);
    function refreshButton(){
      if (!isLoading) {
        var sliderValue = document.getElementById('plotSlider').value;
        isLoading = true;
        // Removes any plots on the map before adding new ones
        svg.selectAll(".point").remove();

        // Call the LoadData function to load and render data
        LoadData(sliderValue);
      }
    }
    function onDataLoaded() {
      isLoading = false;
      
  }
  }
  LoadData();
});
  
