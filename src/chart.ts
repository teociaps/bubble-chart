import * as d3 from 'd3';
import { BubbleData, getColor, getName } from './utils';
import { createSVGDefs } from './defs';

// TODO: add settings for bubbles style (3d, flat, shadow, etc..)

export const createBubbleChart = (data: BubbleData[], title: string): string => {
  const width = 800;
  const height = 500;
  const svg = d3.select('body') // TODO: customizable selector + h & w
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  createSVGDefs(svg);

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
    .attr('fill', d => getColor(d.data))
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
    .text(d => getName(d.data))
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
        .ease(d3.easeLinear)
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

// Example:
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

// Generate the SVG content
const svgContent = createBubbleChart(data, 'Custom Bubble Chart');

console.log(svgContent);