const data = [
  { name: 'JavaScript', value: 100 },
  { name: 'Python', value: 90 },
  { name: 'Java', value: 86 },
  { name: 'C++', value: 75 },
  { name: 'Ruby', value: 25 },
  { name: 'PHP', value: 10 },
  { name: 'VisualBasic', value: 45 },
  { name: 'C#', value: 37 }
];

// Create svg definitions
const svgDefs = d3.select('body')
  .append('svg')
  .attr('class', 'svg svg--defs');

// Bubble transparency
var transpRadialGradient = svgDefs.append('radialGradient')
  .attr('id', 'grad--bw')
  .attr('fx', '25%')
  .attr('fy', '25%');
transpRadialGradient.append('stop')
  .attr('offset', '0%')
  .attr('stop-color', 'black');
transpRadialGradient.append('stop')
  .attr('offset', '30%')
  .attr('stop-color', 'black')
  .attr('stop-opacity', '.2');
transpRadialGradient.append('stop')
  .attr('offset', '97%')
  .attr('stop-color', 'white')
  .attr('stop-opacity', '.4');
transpRadialGradient.append('stop')
  .attr('offset', '100%')
  .attr('stop-color', 'black');
  
var transparentMask = svgDefs.append('mask')
  .attr('id', 'mask')
  .attr('maskContentUnits', 'objectBoundingBox');
transparentMask.append('rect')
  .attr('fill', 'url(#grad--bw)')
  .attr('width', '1')
  .attr('height', '1');

// Light spot
var lightSpotRadialGradient = svgDefs.append('radialGradient')
  .attr('id', 'grad--spot')
  .attr('fx', '50%')
  .attr('fy', '20%');
lightSpotRadialGradient.append('stop')
  .attr('offset', '10%')
  .attr('stop-color', 'white')
  .attr('stop-opacity', '.7');
lightSpotRadialGradient.append('stop')
  .attr('offset', '70%')
  .attr('stop-color', 'white')
  .attr('stop-opacity', '0');

// Top & bottom light
var topAndBottomLightRadialGradient = svgDefs.append('radialGradient')
  .attr('id', 'grad--bw-light')
  .attr('_fx', '25%')
  .attr('fy', '10%');
topAndBottomLightRadialGradient.append('stop')
  .attr('offset', '60%')
  .attr('stop-color', 'black')
  .attr('stop-opacity', '0');
topAndBottomLightRadialGradient.append('stop')
  .attr('offset', '90%')
  .attr('stop-color', 'white')
  .attr('stop-opacity', '.25');
topAndBottomLightRadialGradient.append('stop')
  .attr('offset', '100%')
  .attr('stop-color', 'black');

var lightTopMask = svgDefs.append('mask')
  .attr('id', 'mask--light-top')
  .attr('maskContentUnits', 'objectBoundingBox');
lightTopMask.append('rect')
  .attr('fill', 'url(#grad--bw-light)')
  .attr('width', '1')
  .attr('height', '1')
  .attr('transform', 'rotate(180, .5, .5)');

var lightBottomMask = svgDefs.append('mask')
  .attr('id', 'mask--light-bottom')
  .attr('maskContentUnits', 'objectBoundingBox');
lightBottomMask.append('rect')
  .attr('fill', 'url(#grad--bw-light)')
  .attr('width', '1')
  .attr('height', '1')

// Colors of bubble
var colorRadialGradient = svgDefs.append('radialGradient')
  .attr('id', 'grad')
  .attr('x1', '0')
  .attr('y1', '100%')
  .attr('x2', '100%')
  .attr('y2', '0');
colorRadialGradient.append('stop')
  .attr('offset', '0')
  .attr('stop-color', 'dodgerblue')
  .attr('class', 'stop-1');
colorRadialGradient.append('stop')
  .attr('offset', '50%')
  .attr('stop-color', 'fuchsia')
  .attr('class', 'stop-2');
colorRadialGradient.append('stop')
  .attr('offset', '100%')
  .attr('stop-color', 'yellow')
  .attr('class', 'stop-3');



// TODO: add title to svg

// Create bubble chart
const width = 800;
const height = 500;
const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const bubble = d3.pack()
  .size([width, height])
  .padding(1.5);

const root = d3.hierarchy({ children: data })
  .sum(d => d.value);

const nodes = bubble(root).leaves();

const node = svg.selectAll('.node')
  .data(nodes)
  .enter().append('g')
  .attr('class', 'node')
  .attr('transform', d => `translate(${d.x},${d.y})`);

node.append('ellipse')
  .attr('rx', d => d.r * 0.6)
  .attr('ry', d => d.r * 0.3)
  .attr('cx', 0)
  .attr('cy', d => d.r * 0.6)
  .attr('fill', 'url(#grad--spot)')
  .attr('transform', 'rotate(-225)') // TODO: fix rotation -> to flip
  .attr('class', 'shape');
node.append('circle')
  .attr('r', d => d.r)
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('fill', 'aqua')
  .attr('mask', 'url(#mask--light-bottom)')
  .attr('class', 'shape');
node.append('circle')
  .attr('r', d => d.r)
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('fill', 'yellow')
  .attr('mask', 'url(#mask--light-top)')
  .attr('class', 'shape');
node.append('ellipse')
  .attr('rx', d => d.r * 0.4)
  .attr('ry', d => d.r * 0.2)
  .attr('cx', 0)
  .attr('cy', d => d.r * 0.6)
  .attr('fill', 'url(#grad--spot)')
  .attr('transform', 'rotate(-45)') // TODO: fix rotation -> to flip
  .attr('class', 'shape');
node.append('circle')
  .attr('r', d => d.r)
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('fill', 'url(#grad)')
  .attr('mask', 'url(#mask)')
  .attr('class', 'shape');

node.append('text')
  .attr('dy', '.3em')
  .attr('text-anchor', 'middle')
  .text(d => d.data.name)
  .style('fill', 'white')
  .style('font-size', d => d.r / 3);