import { convertHourToMinutes } from '../../src/utils/convertHourToMinutes';

describe('convertHourToMinutes', () => {
  it('should be able to convert hour to minutes', () => {
    const hourInMinutes = convertHourToMinutes('9:20');

    expect(hourInMinutes).toBe(9 * 60 + 20);
  });

  it('should throw an error if called without an arg', () => {
    expect(() => {
      // eslint-disable-next-line
      // @ts-ignore
      convertHourToMinutes();
    }).toThrowError();
  });

  it('should throw an error if called without a string', () => {
    expect(() => {
      // eslint-disable-next-line
      // @ts-ignore
      convertHourToMinutes(10);
    }).toThrowError();
  });

  it('should throw an error if called without time in format 00:00', () => {
    expect(() => {
      // eslint-disable-next-line
      // @ts-ignore
      convertHourToMinutes('10');
    }).toThrowError();
  });
});
