Package.describe({
  name: "percolate:momentum-iron-router",
  summary: "A momentum plugin for transitioning Iron Router pages",
  version: "0.7.0",
  github: "https://github.com/percolatestudio/momentum-iron-router.git"
});

Package.on_use(function (api, where) {
  api.versionsFrom('METEOR@0.9.2');
  
  api.use(['tracker', 
    'iron:router@1.0.0', 
    'percolate:momentum@0.6.0'], 
  'client');
  
  api.add_files('momentum-iron-router.js', ['client']);
});

