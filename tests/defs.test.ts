import * as d3 from 'd3';
import { createSVGDefs } from '../src/defs';

describe('SVG Definitions', () => {
  let svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;

  beforeEach(() => {
    svg = d3.create('svg');
    createSVGDefs(svg);
  });

  test('should create radial gradients with correct attributes', () => {
    const gradBW = svg.select('radialGradient#grad--bw').node() as SVGGradientElement | null;
    const gradSpot = svg.select('radialGradient#grad--spot').node() as SVGGradientElement | null;
    const gradBWLight = svg.select('radialGradient#grad--bw-light').node() as SVGGradientElement | null;

    expect(gradBW).not.toBeNull();
    expect(gradBW?.getAttribute('fx')).toBe('25%');
    expect(gradBW?.getAttribute('fy')).toBe('25%');

    expect(gradSpot).not.toBeNull();
    expect(gradSpot?.getAttribute('fx')).toBe('50%');
    expect(gradSpot?.getAttribute('fy')).toBe('20%');

    expect(gradBWLight).not.toBeNull();
    expect(gradBWLight?.getAttribute('fx')).toBe('25%');
    expect(gradBWLight?.getAttribute('fy')).toBe('10%');
  });

  test('should create radial gradient stops with correct attributes', () => {
    const gradBWStops = svg.selectAll<SVGStopElement, unknown>('radialGradient#grad--bw stop').nodes();
    const gradSpotStops = svg.selectAll<SVGStopElement, unknown>('radialGradient#grad--spot stop').nodes();
    const gradBWLightStops = svg.selectAll<SVGStopElement, unknown>('radialGradient#grad--bw-light stop').nodes();

    expect(gradBWStops.length).toBe(4);
    expect(gradSpotStops.length).toBe(2);
    expect(gradBWLightStops.length).toBe(3);

    // Check specific stop attributes
    expect(gradBWStops[1]?.getAttribute('offset')).toBe('30%');
    expect(gradBWStops[1]?.getAttribute('stop-color')).toBe('black');
    expect(gradBWStops[1]?.getAttribute('stop-opacity')).toBe('0.2');

    expect(gradSpotStops[0]?.getAttribute('offset')).toBe('10%');
    expect(gradSpotStops[0]?.getAttribute('stop-color')).toBe('white');
    expect(gradSpotStops[0]?.getAttribute('stop-opacity')).toBe('0.7');
  });

  test('should create masks with correct attributes', () => {
    const mask = svg.select('mask#mask').node() as SVGMaskElement | null;
    const maskLightTop = svg.select('mask#mask--light-top').node() as SVGMaskElement | null;
    const maskLightBottom = svg.select('mask#mask--light-bottom').node() as SVGMaskElement | null;

    expect(mask).not.toBeNull();
    expect(maskLightTop).not.toBeNull();
    expect(maskLightBottom).not.toBeNull();

    const maskRect = mask?.querySelector('rect');
    expect(maskRect?.getAttribute('fill')).toBe('url(#grad--bw)');
    expect(maskRect?.getAttribute('width')).toBe('1');
    expect(maskRect?.getAttribute('height')).toBe('1');
    expect(maskRect?.getAttribute('transform')).toBe('');

    const maskLightTopRect = maskLightTop?.querySelector('rect');
    expect(maskLightTopRect?.getAttribute('transform')).toBe('rotate(180, .5, .5)');
  });

  test('should create a linear gradient with correct stops', () => {
    const linearGradient = svg.select('linearGradient#grad').node() as SVGLinearGradientElement | null;
    expect(linearGradient).not.toBeNull();

    const stops = linearGradient?.querySelectorAll('stop') as NodeListOf<SVGStopElement>;
    expect(stops?.length).toBe(3);

    expect(stops[0]?.getAttribute('offset')).toBe('0');
    expect(stops[0]?.getAttribute('stop-color')).toBe('dodgerblue');

    expect(stops[1]?.getAttribute('offset')).toBe('50%');
    expect(stops[1]?.getAttribute('stop-color')).toBe('fuchsia');

    expect(stops[2]?.getAttribute('offset')).toBe('100%');
    expect(stops[2]?.getAttribute('stop-color')).toBe('yellow');
  });
});
