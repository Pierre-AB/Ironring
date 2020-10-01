module.exports = (req, res, next) => {
  if(req.session.currentUser) ext();
  else res.redirect('/login');
};