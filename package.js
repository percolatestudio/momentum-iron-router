Package.describe({
  summary: "A momentum plugin for transitioning Iron Router pages",
  version: "0.0.1",
  name: "percolate:momentum-iron-router",
  git: "https://github.com/percolatestudio/momentum-iron-router.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom('METEOR@0.9.0.1');
  
  api.use(['deps', 
    'iron-router', 
    'percolate:momentum@0.0.1'], 
  'client');
  
  api.add_files('momentum-transitioner.js', ['client']);
});

