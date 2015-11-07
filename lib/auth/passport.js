module.exports = function(passport,User,PassportLocal,validator){
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

  passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
      done(err,user);
    });
  });

  passport.use('users-signup', new PassportLocal({
    usernameField : 'username',
    passwordField : 'password',
    session : true,
    passReqToCallback : true
  },function(req,username,password,done){
    //fire asynchronously
    process.nextTick(function(){
      if(!validator.isEmail(req.query.email)) return done(null, false, req.flash('signupMessage','Correo no válido.'));
      if(password != req.body.checkPassword) return done(null, false, req.flash('signupMessage','Las contraseñas no coinciden.'));
      User.findOne({'username':username}, function(err,user){
        if(err) return done(err);
        if(user) return done(null, false, req.flash('signupMessage','Ese usuario ya esta en uso.'));
        User.findOne({'email':req.query.email}, function(err,user){
          if(err) return done(err);
          if(user) return done(null, false, req.flash('signupMessage','Ese correo ya esta en uso.'));

          var newUser = new User();

          newUser.email = req.query.email;
          newUser.password = newUser.generateHash(password);
          newUser.date = new Date();
          newUser.username = username;
          newUser.web = null;
          newUser.github = null;
          newUser.avatar = null;
          newUser.role = "user";

          //save allow us to check if is valid the new user before save it, create doesn't allow us to do that.
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
        })
      });
    });
  }));

  passport.use('users-login', new PassportLocal({
    usernameField : 'username',
    passwordField : 'password',
    session : true,
    passReqToCallback : true
  },function(req,username,password,done){
    User.findOne({'username':username},function(err,user){
      if(err) return done(err);

      if(!user){
        User.findOne({'email':username},function(err,user){
          if(err) return done(err);
          if(!user) return done(null, false, req.flash('loginMessage','Usuario no encontrado.'));
          if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage','Oops! Contraseña incorrecta.'));

          return done(null,user);
        });
      }else{

        if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage','Oops! contraseña incorrecta.'));

        return done(null,user);
      }
    });
  }));
}
