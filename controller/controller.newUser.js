module.exports = (req, res, next) => {
  let { firstname, lastname, email, password } = '';
  const data = req.flash('data')[0];
  if (typeof data != 'undefined') {
    firstname = data.firstname;
    lastname = data.lastname;
    email = data.email;
    password = data.password;
  }
  res.render('register', {
    // errors: req.session.validationErrors,
    errors: req.flash('validationErrors'),
    firstname,
    lastname,
    email,
    password,
  });
};
