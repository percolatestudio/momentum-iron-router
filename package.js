Package.describe({
  summary: "A momentum plugin for transitioning Iron Router pages"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'iron-router', 'momentum'], 'client');
  
  api.add_files('momentum-transitioner.js', ['client']);
});

