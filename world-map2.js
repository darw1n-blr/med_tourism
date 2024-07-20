const width = 900,
  height = 500;
const projection = d3
  .geoMercator()
  .scale(130)
  .translate([width / 2 - 75, height / 1.5]);
const path = d3.geoPath().projection(projection);

const svg = d3
  .select("#world-map_map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const tooltip = d3.select("#world-map_tooltip");

d3.json("world-110m.v1.json").then(function (world) {
  const countries = topojson.feature(world, world.objects.countries).features;
  const highlightedCountries = new Map([
    ["031", "Azerbaijan"],
    ["051", "Armenia"],
    ["398", "Kazakhstan"],
    ["417", "Kyrgyzstan"],
    ["498", "Moldova"],
    ["643", "Russia"],
    ["762", "Tajikistan"],
    ["795", "Turkmenistan"],
    ["860", "Uzbekistan"],
    ["804", "Ukraine"],
    ["036", "Australia"],
    ["040", "Austria"],
    ["012", "Algeria"],
    ["024", "Angola"],
    ["004", "Afghanistan"],
    ["048", "Bahrain"],
    ["056", "Belgium"],
    ["100", "Bulgaria"],
    ["070", "Bosnia and Hertz"],
    ["086", "British territorial in India."],
    ["348", "Hungary"],
    ["862", "Venezuela"],
    ["704", "Vietnam"],
    ["288", "Ghana"],
    ["324", "Guinea"],
    ["276", "Germany"],
    ["300", "Greece"],
    ["268", "Georgia"],
    ["208", "Denmark"],
    ["818", "Egypt"],
    ["894", "Zimbabwe"],
    ["376", "Israel"],
    ["360", "Indonesia"],
    ["356", "India"],
    ["400", "Jordan"],
    ["368", "Iraq"],
    ["364", "Iran"],
    ["372", "Iceland"],
    ["724", "Spain"],
    ["380", "Italy"],
    ["887", "Yemen"],
    ["120", "Cameroon"],
    ["124", "Canada"],
    ["634", "Qatar"],
    ["196", "Cyprus"],
    ["156", "China"],
    ["170", "Columbia"],
    ["408", "DPRK"],
    ["384", "Cote Divoire"],
    ["192", "Cuba"],
    ["428", "Latvia"],
    ["422", "Lebanon"],
    ["434", "Libya"],
    ["440", "Lithuania"],
    ["504", "Morocco"],
    ["496", "Mongolia"],
    ["566", "Nigeria"],
    ["528", "Netherlands"],
    ["784", "UAE"],
    ["586", "Pakistan"],
    ["275", "Palestine"],
    ["604", "Peru"],
    ["616", "Poland"],
    ["642", "Romania"],
    ["682", "Saudi Arabia"],
    ["702", "Singapore"],
    ["688", "Serbia"],
    ["760", "Syria"],
    ["826", "Great Britain"],
    ["703", "Slovakia"],
    ["705", "Slovenia"],
    ["729", "Sudan"],
    ["840", "USA"],
    ["764", "Thailand"],
    ["792", "Türkiye"],
    ["608", "Philippines"],
    ["246", "Finland"],
    ["250", "France"],
    ["191", "Croatia"],
    ["499", "Montenegro"],
    ["203", "Czech Republic"],
    ["756", "Switzerland"],
    ["752", "Sweden"],
    ["218", "Ecuador"],
    ["233", "Estonia"],
    ["710", "South Africa"],
    ["392", "Japan"],
    ["512", "Oman"],
    ["706", "Somalia"],
    ["112", "Belarus"],
  ]);
  const belarus = new Map([["112", "Belarus"]]);
  svg
    .selectAll(".world-map_country")
    .data(countries)
    .enter()
    .append("path")
    .attr("class", "world-map_country")
    .attr("d", path)
    .each(function (d) {
      if (belarus.has(String(d.id))) {
        d3.select(this).classed("world-map_belarus", true);
      } else if (highlightedCountries.has(String(d.id))) {
        d3.select(this).classed("world-map_highlighted", true);
      }
    })
    .on("mouseover", function (event, d) {
      if (highlightedCountries.has(String(d.id))) {
        d3.select(this).classed("world-map_selected", true);
        tooltip
          .style("opacity", 1)
          .html(highlightedCountries.get(String(d.id)))
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      }
    })
    .on("mouseout", function (event, d) {
      if (highlightedCountries.has(String(d.id))) {
        d3.select(this).classed("world-map_selected", false);
      }
      // Hide tooltip
      tooltip.style("opacity", 0);
    });
});
