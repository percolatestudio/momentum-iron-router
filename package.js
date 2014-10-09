Package.describe({
  name: "percolate:momentum-iron-router",
  summary: "A momentum plugin for transitioning Iron Router pages",
  version: "0.5.1",
  git: "https://github.com/percolatestudio/momentum-iron-router.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom('METEOR@0.9.2');
  
  api.use(['deps', 
    'iron:router@0.9.3', 
    'percolate:momentum@0.5.0'], 
  'client');
  
  api.add_files('momentum-iron-router.js', ['client']);
});

