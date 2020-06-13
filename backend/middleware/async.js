/* Avoid using try-catch blocks in every async
   middleware function. Based in  https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncHandler;
