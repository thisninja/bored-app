const isExpensive = value => (value > 50
  ? 'expensive'
  : 'cheap');

const uid = () => `${Math.round(Math.random() * 100)}_${Date.now()}`;

export default {
  uid,
  isExpensive,
};
