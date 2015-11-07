module.exports = function(app,passport,validator){
  //signup
  var signUpRoutes = app.route('/signup');
  signUpRoutes
  .post(function(req, res){
    passport.authenticate('users-signup',function(err,user,info){
      //TODO add catch error
      if(!user) return res.redirect(req.get('referer'));
      req.logIn(user, function(err){
        if(!err) return res.redirect('/');
      });
    })(req,res)})
    .get(function(req, res){
      var query = req.query.q;
      var email = req.query.email;
      //TODO check if the query exist and is not used
      res.render('signup', {
        message:req.flash('signupMessage'),
        email:email,
        query:query
      });
    });

    //login
    var loginRoutes = app.route('/login');
    loginRoutes
    .post(passport.authenticate('users-login',{
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }))
    .get(function(req,res){
      res.render('login', {message:req.flash('loginMessage')});
    });

    //logout
    app.get('/logout',function(req,res){
      req.logout();
      res.redirect('/login');
    });
}
