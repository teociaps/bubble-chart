const data = [
  { language: 'JavaScript', bytes: 123456 },
  { language: 'Python', bytes: 98765 },
  { language: 'Java', bytes: 54321 },
  { language: 'C++', bytes: 34567 },
  { language: 'Ruby', bytes: 23456 },
  { language: 'PHP', bytes: 12345 }
];

const width = 800;
const height = 600;
const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

const bubble = d3.pack()
  .size([width, height])
  .padding(1.5);

const root = d3.hierarchy({ children: data })
  .sum(d => d.bytes);

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
  .text(d => d.data.language)
  .style('fill', 'white')
  .style('font-size', d => d.r / 3);
