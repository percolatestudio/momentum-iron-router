Package.describe({
  name: "percolate:momentum-iron-router",
  summary: "A momentum plugin for transitioning Iron Router pages",
  version: "0.0.2-rc0",
  git: "https://github.com/percolatestudio/momentum-iron-router.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom('METEOR@0.9.2-rc0');
  
  api.use(['deps', 
    'iron:router@0.9.3-rc0', 
    'percolate:momentum@0.0.3-rc0'], 
  'client');
  
  api.add_files('momentum-transitioner.js', ['client']);
});

