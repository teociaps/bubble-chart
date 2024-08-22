# @teociaps/bubble-chart

**@teociaps/bubble-chart** is a library for creating custom animated bubble charts using **D3.js**. This package provides a flexible and customizable way to visualize data in a *bubble chart* format, with support for *animations* and *dynamic* styling.

## Installation

NPM:
```bash
npm install @teociaps/bubble-chart
```
Yarn:
```bash
yarn add @teociaps/bubble-chart
```

## Usage
### Importing the Library
To use the bubble chart functionality, import it into your project as follows:

```typescript
import { createBubbleChart, BubbleData, BubbleChartOptions } from '@teociaps/bubble-chart';
```

### Creating a Bubble Chart
Here's a basic example of how to create a bubble chart:

```typescript
import { createBubbleChart, BubbleData, BubbleChartOptions } from '@teociaps/bubble-chart';

// Sample data
const data: BubbleData[] = [
  { name: 'Bubble 1', value: 10, color: 'red' },
  { name: 'Bubble 2', value: 20, color: 'blue' },
  { name: 'Bubble 3', value: 30, color: 'green' }
];

// Chart options
const options: BubbleChartOptions = {
  titleOptions: {
    text: 'My Bubble Chart',
    fontSize: '18px',
    fill: 'black'
  },
  showPercentages: true
};

// Create bubble chart
createBubbleChart(data, options, '#chart-container');
```

### Parameters
- data (BubbleData[]): An array of objects representing each bubble. Each object should have the following properties:

  - name (string): The name or label of the bubble.
  - value (number): The value that determines the size of the bubble.
  - color (string): The color of the bubble.
  - icon (optional string): URL of an icon to be displayed inside the bubble.
- chartOptions (BubbleChartOptions): Options for customizing the chart. This includes:

- titleOptions (TitleOptions): Options for the chart title.
  - text (optional string): Title text.
  - fontSize (optional string): Font size of the title.
  - fontWeight (optional string): Font weight of the title.
  - fill (optional string): Font color of the title.
  - padding (optional object): Padding around the title. Format { top?: number, right?: number, bottom?: number, left?: number }.
  - showPercentages (optional boolean): Whether to display percentages inside bubbles.

- selector (string): CSS selector for the element to which the SVG will be appended. Defaults to 'body'.

- width (number): Width of the SVG container. Defaults to 800.

- height (number): Height of the SVG container. Defaults to 600.

### Customization
You can customize the chart appearance by adjusting the chartOptions and titleOptions. The library also includes a createSVGDefs function that you can use to define SVG gradients and masks.

## Development
### Running Tests
To run tests, use:
```bash
npm test
```

### Building the Project
To build the project for production, use:

```bash
npm run build
```

To build and watch for changes during development, use:
```bash
npm start
```

## Contributing
If you'd like to contribute to the project, please submit a pull request or open an issue on the GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.