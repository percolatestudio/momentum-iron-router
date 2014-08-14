var Transitioner = {
  // the number of elements that are currently mid-transition
  transitioning: 0,
  
  // should we be queuing transitions right now?
  queueing: false,
  queuedTransitions: [],
  
  renders: [],
  start: function() {
    var self = this;
    
    // a single autorun that keeps a list of rendered pages
    Deps.autorun(function() {
      if (! Router.current())
        return;
  
      var render = {
        path: Router.current().path,
        template: Router._layout.region('main').template(),
        initiator: Router.current().options.initiator
      };
  
      self.renders.unshift(render);
    });
  },
  
  // either 
  //  a) run the fn, and queue any further transitions until it's done
  //  b) queue the fn
  runTransition: function(fn) {
    var self = this;
    
    if (self.queueing)
      return self.queue(fn);
    
    // if we finish the last active transition, we can run the queue
    var done = function() {
      self.transitioning -= 1;
      if (self.transitioning === 0)
        self.runQueue();
    }
    
    self.transitioning += 1;
    fn(done);
    
    // when we run the first transition, wait until the end of the flush cycle
    //    (so for example if this is the removeElement, the corresponding 
    //      insertElement runs too)
    //  after which, we queue all incoming transitions
    if (self.transitioning === 1) {
      Deps.afterFlush(function() {
        self.queueing = (self.transitioning > 0);
      });
    }
  },
  
  queue: function(transition) {
    this.queuedTransitions.push(transition);
  },
  
  runQueue: function() {
    var self = this;
    self.queueing = false;
    _.each(self.queuedTransitions, function(transition) {
      self.runTransition(transition);
    });
    self.queuedTransitions = [];
  }
}
Transitioner.start();

Momentum.registerPlugin('route-transitioner', function(options) {
  check(options.options, Match.Optional(Function));
  
  var getPluginOptions = function(node) {
    var type = options.options &&
      options.options(Transitioner.renders[1], Transitioner.renders[0], node);

    if (_.isUndefined(type))
      type = 'none'; // XXX: what should this be?

    return type;
  }
  
  var getPlugin = function(node) {
    var pluginOptions = getPluginOptions(node)
    
    if (_.isString(pluginOptions))
      pluginOptions = {with: pluginOptions};
    
    var plugin = Momentum.plugins[pluginOptions.with];
    if (! plugin)
      return console.error("Can't find momentum plugin '" + pluginOptions.with + "'");
    
    var pluginOptions = _.extend(_.omit(options, 'options'), pluginOptions);
    return plugin(_.omit(pluginOptions, 'with'));
  }
  
  // XXX: strictly speaking, these functions should *also* take a done
  //   and merge that with the done that the transitioner's waiting for.
  return {
    insertElement: function(node, next) {
      Transitioner.runTransition(function(done) {
        getPlugin(node).insertElement(node, next, done);
      });
    },
    moveElement: function(node, next) {
      Transitioner.runTransition(function(done) {
        getPlugin(node).moveElement(node, next, done);
      });
    },
    removeElement: function(node) {
      Transitioner.runTransition(function(done) {
        getPlugin(node).removeElement(node, done);
      });
    },
    // force: true
  }
});