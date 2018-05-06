module.exports = (fn, ...args) => {
  return new Promise((res, rej) => {
    fn(...args, (err, ...output) => {
      if (err) rej(err);
      else res(...output);
    });
  });
}
