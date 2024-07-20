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
    ["031", "Азербайджан"],
    ["051", "Армения"],
    ["398", "Казахстан"],
    ["417", "Кыргызстан"],
    ["498", "Молдова"],
    ["643", "Россия"],
    ["762", "Таджикистан"],
    ["795", "Туркменистан"],
    ["860", "Узбекистан"],
    ["804", "Украина"],
    ["036", "Австралия"],
    ["040", "Австрия"],
    ["012", "Алжир"],
    ["024", "Ангола"],
    ["004", "Афганистан"],
    ["048", "Бахрейн"],
    ["056", "Бельгия"],
    ["100", "Болгария"],
    ["070", "Босния и Герц-на"],
    ["086", "Брит.тер-я в Инд."],
    ["348", "Венгрия"],
    ["862", "Венесуэла"],
    ["704", "Вьетнам"],
    ["288", "Гана"],
    ["324", "Гвинея"],
    ["276", "Германия"],
    ["300", "Греция"],
    ["268", "Грузия"],
    ["208", "Дания"],
    ["818", "Египет"],
    ["894", "Зимбабве"],
    ["376", "Израиль"],
    ["360", "Индонезия"],
    ["356", "Индия"],
    ["400", "Иордания"],
    ["368", "Ирак"],
    ["364", "Иран"],
    ["372", "Исландия"],
    ["724", "Испания"],
    ["380", "Италия"],
    ["887", "Йемен"],
    ["120", "Камерун"],
    ["124", "Канада"],
    ["634", "Катар"],
    ["196", "Кипр"],
    ["156", "Китай"],
    ["170", "Колумбия"],
    ["408", "КНДР"],
    ["384", "Кот-Дивуар"],
    ["192", "Куба"],
    ["428", "Латвия"],
    ["422", "Ливан"],
    ["434", "Ливия"],
    ["440", "Литва"],
    ["504", "Марокко"],
    ["496", "Монголия"],
    ["566", "Нигерия"],
    ["528", "Нидерланды"],
    ["784", "ОАЭ"],
    ["586", "Пакистан"],
    ["275", "Палестина"],
    ["604", "Перу"],
    ["616", "Польша"],
    ["642", "Румыния"],
    ["682", "Саудовская Аравия"],
    ["702", "Сингапур"],
    ["688", "Сербия"],
    ["760", "Сирия"],
    ["826", "Великобритания"],
    ["703", "Словакия"],
    ["705", "Словения"],
    ["729", "Судан"],
    ["840", "США"],
    ["764", "Тайланд"],
    ["792", "Турция"],
    ["608", "Филиппины"],
    ["246", "Финляндия"],
    ["250", "Франция"],
    ["191", "Хорватия"],
    ["499", "Черногория"],
    ["203", "Чешская респ-ка"],
    ["756", "Швейцария"],
    ["752", "Швеция"],
    ["218", "Эквадор"],
    ["233", "Эстония"],
    ["710", "Южная Африка"],
    ["392", "Япония"],
    ["512", "Оман"],
    ["706", "Сомали"],
    ["112", "Беларусь"],
  ]);
  const belarus = new Map([["112", "Беларусь"]]);
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
