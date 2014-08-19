momentum-iron-router
====================

Meteor [Momentum](https://github.com/percolatestudio/meteor-momentum) plugin for animating between routes when using [Iron Router](https://github.com/EventedMind/iron-router).

## Usage:

```
{{#momentum with='iron-router' options=transitionOptions}}
  {{> yield}}
{{/momentum}}
```

```
Template.X.transitionOptions = function(from, to, element) {
  return 'name-of-momentum-plugin';
  
  // or
  
  return {
    with: 'name-of-plugin',
    extra: 'options-for-plugin'
  }
}
