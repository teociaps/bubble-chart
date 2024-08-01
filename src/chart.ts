import * as d3 from 'd3';
import { easeLinear } from 'd3-ease';
import { getColor, getName } from './utils';

export interface BubbleData {
  name: string;
  value: number;
  color: string;
}

const data: BubbleData[] = [
  { name: 'JavaScript', value: 100, color: 'yellow' },
  { name: 'Python', value: 90, color: 'blue' },
  { name: 'Java', value: 86, color: 'green' },
  { name: 'C++', value: 75, color: 'red' },
  { name: 'Ruby', value: 25, color: 'purple' },
  { name: 'PHP', value: 10, color: 'orange' },
  { name: 'VisualBasic', value: 45, color: 'fuchsia' },
  { name: 'C#', value: 37, color: 'cyan' }
];

// TODO: add settings for bubbles style (3d, flat, shadow, etc..)

const createBubbleChart = (data: BubbleData[], title: string) => {
  const svgDefs = d3.select('body')
    .append('svg')
    .attr('class', 'svg svg--defs');

  const transpRadialGradient = svgDefs.append('radialGradient')
    .attr('id', 'grad--bw')
    .attr('fx', '25%')
    .attr('fy', '25%');
  transpRadialGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', 'black');
  transpRadialGradient.append('stop')
    .attr('offset', '30%')
    .attr('stop-color', 'black')
    .attr('stop-opacity', .2);
  transpRadialGradient.append('stop')
    .attr('offset', '97%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', .4);
  transpRadialGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', 'black');
    
  const transparentMask = svgDefs.append('mask')
    .attr('id', 'mask')
    .attr('maskContentUnits', 'objectBoundingBox');
  transparentMask.append('rect')
    .attr('fill', 'url(#grad--bw)')
    .attr('width', 1)
    .attr('height', 1);

  const lightSpotRadialGradient = svgDefs.append('radialGradient')
    .attr('id', 'grad--spot')
    .attr('fx', '50%')
    .attr('fy', '20%');
  lightSpotRadialGradient.append('stop')
    .attr('offset', '10%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', .7);
  lightSpotRadialGradient.append('stop')
    .attr('offset', '70%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 0);

  const topAndBottomLightRadialGradient = svgDefs.append('radialGradient')
    .attr('id', 'grad--bw-light')
    .attr('fx', '25%')
    .attr('fy', '10%');
  topAndBottomLightRadialGradient.append('stop')
    .attr('offset', '60%')
    .attr('stop-color', 'black')
    .attr('stop-opacity', 0);
  topAndBottomLightRadialGradient.append('stop')
    .attr('offset', '90%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', .25);
  topAndBottomLightRadialGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', 'black');

  const lightTopMask = svgDefs.append('mask')
    .attr('id', 'mask--light-top')
    .attr('maskContentUnits', 'objectBoundingBox');
  lightTopMask.append('rect')
    .attr('fill', 'url(#grad--bw-light)')
    .attr('width', 1)
    .attr('height', 1)
    .attr('transform', 'rotate(180, .5, .5)');

  const lightBottomMask = svgDefs.append('mask')
    .attr('id', 'mask--light-bottom')
    .attr('maskContentUnits', 'objectBoundingBox');
  lightBottomMask.append('rect')
    .attr('fill', 'url(#grad--bw-light)')
    .attr('width', 1)
    .attr('height', 1);

  const colorLinearGradient = svgDefs.append('linearGradient')
    .attr('id', 'grad')
    .attr('x1', 0)
    .attr('y1', '100%')
    .attr('x2', '100%')
    .attr('y2', 0);
  colorLinearGradient.append('stop')
    .attr('offset', '0')
    .attr('stop-color', 'dodgerblue')
    .attr('class', 'stop-1');
  colorLinearGradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', 'fuchsia')
    .attr('class', 'stop-2');
  colorLinearGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', 'yellow')
    .attr('class', 'stop-3');

  const width = 800;
  const height = 500;
  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // SVG title // TODO: make customizable (color, size etc.)
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .style('font-size', '24px')
    .style('font-weight', 'bold')
    .style('fill', 'black')
    .text(title);

  const bubble = d3.pack<BubbleData>()
    .size([width, height])
    .padding(1.5);

  const root = d3.hierarchy({ children: data } as any)
    .sum(d => d.value);

  const nodes = bubble(root).leaves();

  const node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('g')
    .attr('class', 'bubble')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  node.append('ellipse')
    .attr('rx', d => d.r * 0.6)
    .attr('ry', d => d.r * 0.3)
    .attr('cx', 0)
    .attr('cy', d => d.r * -0.6)
    .attr('fill', 'url(#grad--spot)')
    .attr('transform', 'rotate(-45)')
    .attr('class', 'shape');
  node.append('circle')
    .attr('r', d => d.r)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', getColor)
    .attr('mask', 'url(#mask--light-bottom)')
    .attr('class', 'shape');
  node.append('circle')
    .attr('r', d => d.r)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'lightblue')
    .attr('mask', 'url(#mask--light-top)')
    .attr('class', 'shape');
  node.append('ellipse')
    .attr('rx', d => d.r * 0.4)
    .attr('ry', d => d.r * 0.2)
    .attr('cx', 0)
    .attr('cy', d => d.r * -0.7)
    .attr('fill', 'url(#grad--spot)')
    .attr('transform', 'rotate(-225)')
    .attr('class', 'shape');
  // node.append('circle')
  //   .attr('r', d => d.r)
  //   .attr('cx', 0)
  //   .attr('cy', 0)
  //   .attr('fill', 'url(#grad)')
  //   .attr('mask', 'url(#mask)')
  //   .attr('class', 'shape');

  node.append('text')
    .attr('dy', '.3em')
    .attr('text-anchor', 'middle')
    .text(getName)
    .style('fill', 'white')
    .style('font-size', d => d.r / 3);

  // TODO: choose animation or make it customizable(?)

  // 1st version:
  // // Add floating animation
  // function animateBubbles() {
  //   node.transition()
  //     .duration(() => Math.random() * 2000 + 3000) // Random duration between 2000 and 5000ms
  //     .ease(d3.easeLinear) // Linear easing for fluid motion
  //     .attr('transform', d => {
  //       const offsetX = Math.random() * 20 - 10; // Random x offset between -10 and 10
  //       const offsetY = Math.random() * 20 - 10; // Random y offset between -10 and 10
  //       return `translate(${d.x + offsetX},${d.y + offsetY})`;
  //     })
  //     .on('end', function() {
  //       d3.select(this).call(animateBubbles); // Repeat the animation
  //     });
  // }

  // animateBubbles();

  // 2nd version:
  function animateBubbles() {
    node.each(function (d: any) {
      d.xOffset = Math.random() * 2 - 1;
      d.yOffset = Math.random() * 2 - 1;
      d.angle = Math.random() * 2 * Math.PI;
    });

    function update() {
      node.transition()
        .duration(3000)
        .ease(easeLinear)
        .attr('transform', (d: any) => {
          d.angle += (Math.random() * 0.1 - 0.2);
          const offsetX = 10 * Math.sin(d.angle) + d.xOffset;
          const offsetY = 10 * Math.cos(d.angle) + d.yOffset;
          return `translate(${d.x + offsetX},${d.y + offsetY})`;
        })
        .on('end', function() {
          d3.select(this).call(animateBubbles); // Repeat the animation
        });
    }

    update();
  }

  animateBubbles();

  return svg.node()?.outerHTML || '';
};

// Generate the SVG content
const svgContent = createBubbleChart(data, 'Custom Bubble Chart');

console.log(svgContent);