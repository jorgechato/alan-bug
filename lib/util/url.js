var urls = {
    home : '/',
    login : '/login',
    logout : '/logout',
    signup : '/signup',
    forgot : '/forgot',
    reset : '/reset',
    admin:  '/admin',
    "admin.users" : '/admin/users',
    "admin.user" : '/admin/user/',
    "admin.user.delete" : '/admin/user/delete/',
    "admin.invitations" : '/admin/invitations',
    "admin.invitation" : '/admin/invitation/',
    "admin.events" : '/admin/events',
    "admin.event" : '/admin/event/',
    error : '/error/',
};

module.exports = {
  urls : urls,
  getUrl : function(url){
    return urls[url];
  }
}
