document.addEventListener('DOMContentLoaded', function () {
  var svg;
  var filteredData = [];
  // Tooltip for displaying details on hover
  var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  function handleMouseOver(event, d) {
    // Show details when hovering over a point
    console.log("Hovered Data:", d);
    if (!filteredData.length) return;
  
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
  
      const hoveredData = d3.select(this).data()[0];
    tooltip.html(`
    <strong>Town:</strong> ${hoveredData.Town}<br>
    <strong>Population:</strong> ${hoveredData.Population}<br>
    <strong>County:</strong> ${hoveredData.County}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
}

function handleMouseOut(event, d) {
  tooltip.transition()
  .duration(500)
  .style("opacity", 0);
}
function LoadData(numPlots) {
// Define the URL of the server feed
    const jsonFeed = 'http://34.38.72.236/Circles/Towns/50';

    


// Fetch data from the server
d3.json(jsonFeed, function(error, data) {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data); // Display the data in the browser console
        console.log("Complete Data:", data);
    // main.js

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
      // Your code for rendering the map goes here
// Get the new number of plots based on the slider value
    
filteredData = data.slice(0, numPlots);
      
console.log('Filtered data:', filteredData);
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
      .data(filteredData)
      .enter().append("circle")
      .attr("class", "point")
      .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
      })
      .attr("cy", function(d) {
          return projection([d.lng, d.lat])[1];
      })
      .attr("r", 0) // Start with a radius of 0
  .transition() // Apply a transition
  .attr("r", 3) // Final radius
  .duration(500) // Set the duration of the transition in milliseconds
  .each("end", function () {
    // Transition end callback
    d3.select(this).on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
  });
        // Show details when hovering over a point
        
      onDataLoaded();
    }
  
  // You can style the points as desired
        });
        
        console.log("Circles:", svg.selectAll(".point"));
        
      }
      sliderValue.textContent = this.value;

    
    
    // Remove previous plots
    svg.selectAll(".point").remove();
    });
    var isLoading = false; // Flag to track whether data is currently being loaded

    document.getElementById('refreshButton').addEventListener('click', refreshButton);
    function refreshButton(){
      if (!isLoading) {
        var sliderValue = document.getElementById('plotSlider').value;
        isLoading = true; // Set the flag to indicate that data is being loaded
        // Remove previous data points before loading new data
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
  