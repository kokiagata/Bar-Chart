const req = new XMLHttpRequest();
req.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
req.send();
req.onload = function(){
dataset = JSON.parse(req.responseText).data

console.log(dataset)
const h = 500;
const w = 1000;
const padding = 60;
  
const svg = d3.select("body")
.append("svg")
.attr("height", h)
.attr("width", w);
  
const months = dataset.map(function(item){
  return new Date(item[0]);
});
const xMax = new Date(d3.max(months));
  xMax.setMonth(xMax.getMonth() + 3);
  
const xScale = d3.scaleTime()
                 .domain([d3.min(months), xMax])
                 .range([padding, w - padding]);
  
const yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, (d) => d[1])])
.range([h - padding, padding]);
  
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
  
  svg.append("g")
  .attr("transform", "translate(0, "+ (h - padding) +")")
  .call(xAxis)
  .attr("id", "x-axis")
  
  svg.append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis)
  .attr("id", "y-axis")
 
 svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d,i) => i*((w-padding*2)/(dataset.length)).toFixed(12)+padding)
   .attr("y", (d,i) => (yScale(d[1]))) 
   .attr("width", ((w-padding*2)/dataset.length).toFixed(12))
   .attr("height", (d) => yScale(0)-yScale(d[1]))
   .attr("data-date", (d,i)=>dataset[i][0])
   .attr("data-gdp", (d,i)=> dataset[i][1])
   .attr("fill", "orangered")
   .attr("class", "bar")
   .on("mouseover", function(d,i){
   d3.select(this).transition().duration("0")
   .attr("opacity","0.8");
   
  div.transition().duration("0")
  .style("opacity", "0.85");
   div.html(quarters(d)+ "<br>" + "$" + d[1] + " " + "Billion")
   .style("left", (d3.event.pageX + 10) + "px")
   .style("top", (d3.event.pageY + 10) + "px")
   .attr("data-date", dataset[i][0]);
})
  .on("mouseout", function(d,i){
   d3.select(this).transition().duration("0")
   .attr("opacity", "1");
   
   div.transition().duration("0")
   .style("opacity", "0");
 });
  
svg.append("text")
  .attr("x", (w-padding-padding)/2)
  .attr("y", padding)
  .text("US GDP")
  .attr("fill", "white")
  .attr("class", "title")
  .attr("id", "title")
  .style("font-size", "30px")

  svg.append("text")
  .attr("x", padding)
  .attr("y", (h-padding-padding)/2)
  .text("Gross Domestic product")
  .attr("fill", "white")
  .attr("transform", "translate(-115, 370) rotate(-90)")
  
  svg.append("text")
  .attr("x", w/2)
  .attr("y", h-20)
  .text("For more information: http://www.bea.gov/national/pdf/nipaguid.pdf")
  .attr("fill", "white")
  
  const div = d3.selectAll("body").append("div")
  .attr("id", "tooltip")
  .style("opacity", "0")

  
  
function quarters(d){
  if(d[0].substring(5,7)==="01"){
    return d[0].substring(0,4) + " " + "Q1";
  } else if(d[0].substring(5,7)==="04"){
    return d[0].substring(0,4) + " " + "Q2";
  } else if(d[0].substring(5,7)==="07"){
    return d[0].substring(0,4) + " " + "Q3";
  } else if(d[0].substring(5,7)==="10"){
    return d[0].substring(0,4) + " " + "Q4";
  }
}
 
};