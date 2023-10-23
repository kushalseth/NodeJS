let count = 0;

const incr = () => ++count;
const decr = () => --count;

const getCount = () => count;

module.exports = {
  anything: true,
  who: "kushal",
  count,
  incr,
  decr,
  getCount,
};
