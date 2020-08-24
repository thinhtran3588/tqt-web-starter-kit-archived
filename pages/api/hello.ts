// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (_req, res): void => {
  res.statusCode = 200;
  res.json({name: 'John Doe'});
};
