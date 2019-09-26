import helper from '../../../src/helpers/helper';
import {
  EXPENSIVE,
  CHEAP,
} from '../../../src/constants'

describe(('helper'), () => {
  it('isExpensive', () => {
    let value = 50;

    expect(helper.isExpensive).toEqual(CHEAP);
    value = 20;
    expect(helper.isExpensive).toEqual(EXPENSIVE);
  });

  it('uid', () => {
    const uidRegExp = /\d{2}_\d{13}/;
    expect(helper.uid()).toEqual(
      expect.stringMatching(uidRegExp),
    );
  });

  it('convertFromFloatToNatural', () => {
    const value = 0.5;
    expect(helper.convertFromFloatToNatural()).toEqual(
      50
    );
  });

  it('convertFromNaturalToFloat', () => {
    const value = 50;
    expect(helper.convertFromFloatToNatural()).toEqual(
      0.5
    );
  });
});
