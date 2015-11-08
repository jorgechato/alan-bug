var util = require('../util');

module.exports = function(app,passport,validator){
  //signup
  var signUpRoutes = app.route('/signup');
  signUpRoutes
  .post(function(req, res){
    util.checkInvitation(req.query.q,req.query.email,function(uerToken,valid){
      if(!valid) return res.redirect('/error/invitation');

      passport.authenticate('users-signup',function(err,user,info){
        if(err) throw err;
        if(!user) return res.redirect('/signup?q='+req.query.q+'&email='+req.query.email);
        req.logIn(user, function(err){
          if(!err) return res.redirect('/');
        });
      })(req,res)
    });
  })
  .get(function(req, res){
    util.checkInvitation(req.query.q,req.query.email,function(uerToken,valid){
      if(!valid) return res.redirect('/error/signup');

      res.render('signup', {
        message:req.flash('signupMessage'),
        email:req.query.email,
        query:req.query.query
      });
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
  app.get('/logout',util.isLoggedIn,function(req,res){
    req.logout();
    res.redirect('/login');
  });
}
