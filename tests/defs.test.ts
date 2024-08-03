import * as d3 from 'd3';
import { createSVGDefs } from '../src/defs';

describe('SVG Definitions', () => {
  let svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;

  beforeEach(() => {
    document.body.innerHTML = '';
    svg = d3.select('body').append('svg');
    createSVGDefs(svg);
  });

  test('should create radial gradients', () => {
    expect(document.querySelector('radialGradient#grad--bw')).not.toBeNull();
    expect(document.querySelector('radialGradient#grad--spot')).not.toBeNull();
    expect(document.querySelector('radialGradient#grad--bw-light')).not.toBeNull();
  });

  test('should create masks', () => {
    expect(document.querySelector('mask#mask')).not.toBeNull();
    expect(document.querySelector('mask#mask--light-top')).not.toBeNull();
    expect(document.querySelector('mask#mask--light-bottom')).not.toBeNull();
  });

  test('should create linear gradient', () => {
    expect(document.querySelector('linearGradient#grad')).not.toBeNull();
  });
});
