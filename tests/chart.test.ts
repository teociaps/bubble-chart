import { createBubbleChart } from '../src/chart';
import { BubbleData, BubbleChartOptions } from '../src/utils';

jest.useFakeTimers();

describe('Bubble Chart', () => {
  const data: BubbleData[] = [
    { name: 'JavaScript', value: 100, color: 'yellow', icon: '' },
    { name: 'Python', value: 90, color: 'blue', icon: 'path/python.svg' },
    { name: 'Java', value: 86, color: 'green' }
  ];

  const customBubbleChartOptions: BubbleChartOptions = {
    titleOptions: {
      text: 'Test Bubble Chart' 
    },
    showPercentages: true
  };

  test('should create a bubble chart with title', () => {
    const svgContent = createBubbleChart(data, customBubbleChartOptions);
    document.body.innerHTML = svgContent!;

    expect(document.querySelector('.bc-title')?.textContent).toBe('Test Bubble Chart');
    expect(document.querySelectorAll('.bubble').length).toBe(data.length);
  });

  test('should show percentage for each bubble', () => {
    const svgContent = createBubbleChart(data, customBubbleChartOptions);
    document.body.innerHTML = svgContent!;

    expect(document.querySelectorAll('.b-percentage').length).toBe(data.length);
  });

  test('should create bubbles with correct properties', () => {
    const svgContent = createBubbleChart(data, customBubbleChartOptions);
    document.body.innerHTML = svgContent!;

    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, i) => {
      if (!data[i].icon) {
        const name = bubble.querySelector('text')?.textContent;
        expect(name).toBe(data[i].name);
      }
    });
  });

  test('should animate bubbles', () => {
    const svgContent = createBubbleChart(data, customBubbleChartOptions);
    document.body.innerHTML = svgContent!;

    const bubbles = document.querySelectorAll('.bubble');
    expect(bubbles.length).toBe(data.length);

    // Fast-forward time to trigger the animation
    jest.advanceTimersByTime(3000);

    bubbles.forEach((bubble) => {
      const transform = bubble.getAttribute('transform');
      expect(transform).toMatch(/translate\(\d+(\.\d+)?,\d+(\.\d+)?\)/);
    });
  });

  test('should not create bubbles if no data provided', () => {
    const svgContent = createBubbleChart([], customBubbleChartOptions);

    expect(svgContent).toBe(null);
  });

  test('should append the SVG only if a valid selector is provided', () => {
    document.body.innerHTML = '<div id="valid-container"></div>';

    createBubbleChart(data, customBubbleChartOptions, undefined, undefined, '#valid-container');
    expect(document.querySelector('#valid-container svg')).not.toBeNull();

    // Ensure SVG is not appended when an invalid selector is provided
    createBubbleChart(data, customBubbleChartOptions, undefined, undefined, '#invalid-container');
    expect(document.querySelector('#invalid-container svg')).toBeNull();
  });

});
