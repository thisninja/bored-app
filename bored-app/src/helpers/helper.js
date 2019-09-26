const isExpensive = value => (value > 50
  ? 'expensive'
  : 'cheap');

const uid = () => `${Math.round(Math.random() * 100)}_${Date.now()}`;

const convertFromFloatToNatural = value => Math.round(value * 100);

const convertFromNaturalToFloat = value => value / 100;

export default {
  uid,
  isExpensive,
  convertFromFloatToNatural,
  convertFromNaturalToFloat,
};
