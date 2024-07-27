const data = [
  { name: 'JavaScript', value: 100 },
  { name: 'Python', value: 90 },
  { name: 'Java', value: 90 },
  { name: 'C++', value: 75 },
  { name: 'Ruby', value: 25 },
  { name: 'PHP', value: 10 }
];

const width = 500;
const height = 600;
const svg = d3.select('svg')
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

node.append('circle')
  .attr('class', 'bubble')
  .attr('r', d => d.r)
  .attr('cx', 0)
  .attr('cy', 0);

node.append('text')
  .attr('dy', '.3em')
  .attr('text-anchor', 'middle')
  .text(d => d.data.name)
  .style('fill', 'white')
  .style('font-size', d => d.r / 3);