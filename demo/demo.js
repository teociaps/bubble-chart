import { createBubbleChart } from '../dist/bundle.esm.js';

// Example:
const data = [
  { name: 'JavaScript', value: 100, color: 'yellow', icon: 'https://icon.icepanel.io/Technology/svg/JavaScript.svg' },
  { name: 'Python', value: 90, color: 'blue', icon: 'https://icon.icepanel.io/Technology/svg/Python.svg'},
  { name: 'Java', value: 86, color: 'green', icon: 'https://icon.icepanel.io/Technology/svg/Java.svg' },
  { name: 'C++', value: 75, color: 'red', icon: 'https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg' },
  { name: 'Ruby', value: 25, color: 'purple', icon: 'https://icon.icepanel.io/Technology/svg/Ruby.svg' },
  { name: 'PHP', value: 10, color: 'orange', icon: 'https://icon.icepanel.io/Technology/svg/PHP.svg' },
  { name: 'VisualBasic', value: 45, color: 'fuchsia' },
  { name: 'C#', value: 37, color: 'cyan', icon: 'https://icon.icepanel.io/Technology/svg/C%23-%28CSharp%29.svg' }
];

const customBubbleChartOptions = {
  titleOptions: {
    text: 'Custom Bubble Chart',
    fontSize: '24px',
    fontWeight: 'bold',
    fill: 'white',
    fontFamily: 'Arial'
  },
  showPercentages: true
};

// Generate the SVG content and append it to the body
const svgContent = createBubbleChart(data, customBubbleChartOptions, 1000, 700, 'body');

console.log(svgContent);