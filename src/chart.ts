import * as d3 from 'd3';
import { BubbleData, getColor, getName, TitleOptions, toKebabCase } from './utils';
import { createSVGDefs } from './defs';

// TODO: add settings for bubbles style (3d, flat, shadow, etc..)

export const createBubbleChart = (data: BubbleData[], titleOptions: TitleOptions): string => {
  const defaultTitleOptions: TitleOptions = {
    text: 'Bubble Chart',
    fontSize: '24px',
    fontWeight: 'bold',
    fill: 'black',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    textAnchor: 'middle'
  };
  
  const mergedTitleOptions = { ...defaultTitleOptions, ...titleOptions };

  const padding = mergedTitleOptions.padding || {};

  const width = 800;
  const baseHeight = 600;
  const titleHeight = 40; // Height reserved for the title text
  const maxAnimationOffset = 20; // Maximum offset introduced by the animation

  const svg = d3.select('body') // TODO: customizable selector + h & w
    .append('svg')
    .attr('width', '100%')
    .attr('viewBox', `0 0 ${width} ${baseHeight + titleHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  createSVGDefs(svg);

  // SVG title with customizable styles
  const titleElement = svg.append('text')
    .attr('x', (width / 2) + (padding.left || 0) - (padding.right || 0))
    .attr('y', titleHeight + (padding.top || 0) - (padding.bottom || 0))
    .text(mergedTitleOptions.text as string);

  // Apply the merged styles to the title element
  Object.keys(mergedTitleOptions).forEach(style => {
    if (style !== 'padding') {
      titleElement.style(toKebabCase(style), mergedTitleOptions[style]);
    }
  });

  const bubbleContainer = d3.pack<BubbleData>()
    .size([width, baseHeight])
    .padding(1.5);

  const root = d3.hierarchy({ children: data } as any)
    .sum(d => d.value);

  const bubbles = bubbleContainer(root).leaves();

  // Find the maximum y-coordinate of the bubbles considering their radii
  const maxY = d3.max(bubbles, d => d.y + d.r + maxAnimationOffset) || baseHeight;
  const adjustedHeight = maxY + titleHeight + (padding.top || 0) + (padding.bottom || 0);

  // Update the SVG height and viewBox
  svg.attr('height', adjustedHeight)
    .attr('viewBox', `0 0 ${width} ${adjustedHeight}`);

  const bubbleGroup = svg.append('g')
    .attr('transform', `translate(0, ${titleHeight + (padding.top || 0)})`);

  const bubble = bubbleGroup.selectAll()
    .data(bubbles)
    .enter().append('g')
    .attr('class', 'bubble')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  bubble.append('ellipse')
    .attr('rx', d => d.r * 0.6)
    .attr('ry', d => d.r * 0.3)
    .attr('cx', 0)
    .attr('cy', d => d.r * -0.6)
    .attr('fill', 'url(#grad--spot)')
    .attr('transform', 'rotate(-45)')
    .attr('class', 'shape');

  bubble.append('circle')
    .attr('r', d => d.r)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', d => getColor(d.data))
    .attr('mask', 'url(#mask--light-bottom)')
    .attr('class', 'shape');

  bubble.append('circle')
    .attr('r', d => d.r)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'lightblue')
    .attr('mask', 'url(#mask--light-top)')
    .attr('class', 'shape');

  bubble.append('ellipse')
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

  bubble.append('text')
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
    bubble.each(function (d: any) {
      d.xOffset = Math.random() * 2 - 1;
      d.yOffset = Math.random() * 2 - 1;
      d.angle = Math.random() * 2 * Math.PI;
    });

    function update() {
      bubble.transition()
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

const customTitleOptions: TitleOptions = {
  text: 'Custom Bubble Chart',
  fontSize: '24px',
  fontWeight: 'bold',
  fill: 'white',
  fontFamily: 'Arial'
};

// Generate the SVG content
const svgContent = createBubbleChart(data, customTitleOptions);

console.log(svgContent);