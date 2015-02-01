momentum-iron-router
====================

Meteor [Momentum](https://github.com/percolatestudio/meteor-momentum) plugin for animating between routes when using [Iron Router](https://github.com/EventedMind/iron-router).

## Usage:

```
<template name="X">
    {{#momentum plugin='iron-router' options=transition}}
      {{> yield}}
    {{/momentum}}
</template>
```

Where transition is the name of the helper function returned:

```
Template.X.helpers({
    transition : function() { 
        return function(from, to, element) {
            return 'name-of-momentum-plugin';

        
            // or
         
            return {
                with: 'name-of-plugin',
                extra: 'options-for-plugin'
            }
        }
    }
});


## Hints 

When performing route specific transitions while having a yield in a layout template:

````
<template name="layout">
    {{#momentum plugin='iron-router' options=transition}}
        {{> yield}}
    {{/momentum}}
</template>
````

Since the `transition` helper is scoped only within the layout template you could detect route in order to determine which transition to apply:

````
Template.layout.helpers({
    transition: function() {
        return function(from, to, element) {
            var route;
            route = Router.current().route.getName();
            if (route === 'firstroute') {
                return 'right-to-left';
            } else if (route === 'secondroute') {
                return 'left-to-right';
            }
        };
    }
});
````

