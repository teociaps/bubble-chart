import { getColor, getName, BubbleData } from '../src/utils';

describe('Utils Functions', () => {
  const sampleData: BubbleData = { name: 'JavaScript', value: 100, color: 'yellow' };

  test('getColor should return the correct color', () => {
    expect(getColor(sampleData)).toBe('yellow');
  });

  test('getName should return the correct name', () => {
    expect(getName(sampleData)).toBe('JavaScript');
  });
});
