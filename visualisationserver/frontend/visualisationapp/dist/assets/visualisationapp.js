"use strict";



define('visualisationapp/app', ['exports', 'ember', 'visualisationapp/resolver', 'ember-load-initializers', 'visualisationapp/config/environment'], function (exports, _ember, _visualisationappResolver, _emberLoadInitializers, _visualisationappConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _visualisationappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _visualisationappConfigEnvironment['default'].podModulePrefix,
    Resolver: _visualisationappResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _visualisationappConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('visualisationapp/components/dygraph-fileview', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        self: this,
        listener: function listener(me) {
            return function (e) {
                // URL location
                var location = document.location;

                // state
                me.set('fileview', e.state);

                var g = draw(me.get('topic'), e.state);
            };
        },
        draw: function draw(topic, state) {
            return new Dygraph(document.getElementById("graph"), 'http://localhost:8080/data/' + topic + '/' + state);
        },
        didRender: function didRender() {
            window.addEventListener("popstate", this.listener(this));
            this.draw(this.get('topic'), history.state);
        },
        willDestroyElement: function willDestroyElement() {
            window.removeEventListener("popstate", this.listener);
        }
    });
});
define('visualisationapp/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('visualisationapp/helpers/app-version', ['exports', 'ember', 'visualisationapp/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _visualisationappConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _visualisationappConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('visualisationapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('visualisationapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('visualisationapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'visualisationapp/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _visualisationappConfigEnvironment) {
  var _config$APP = _visualisationappConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('visualisationapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('visualisationapp/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('visualisationapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('visualisationapp/initializers/export-application-global', ['exports', 'ember', 'visualisationapp/config/environment'], function (exports, _ember, _visualisationappConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_visualisationappConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _visualisationappConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_visualisationappConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('visualisationapp/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('visualisationapp/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('visualisationapp/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("visualisationapp/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('visualisationapp/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('visualisationapp/router', ['exports', 'ember', 'visualisationapp/config/environment'], function (exports, _ember, _visualisationappConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _visualisationappConfigEnvironment['default'].locationType,
    rootURL: _visualisationappConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('topics');
    this.route('topic', { path: '/topic/:topic_id' });
  });

  exports['default'] = Router;
});
define('visualisationapp/routes/topic', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        ajax: _ember['default'].inject.service(),
        model: function model(param) {
            var self = this;
            var promise = new Promise(function (resolve, reject) {
                self.get('ajax').request('http://localhost:8080/toc/' + param.topic_id + '/files').then(function (data) {

                    var last = data.splice(data.lenggth - 2, 1)[0];
                    history.replaceState(last, last, null);

                    data.forEach(function (d) {
                        return history.pushState(d, last, null);
                    });

                    resolve({ latest: last, topic: param.topic_id });
                });
            });

            return promise;
        }
    });
});
define('visualisationapp/routes/topic/file', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('visualisationapp/routes/topics', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		ajax: _ember['default'].inject.service(),
		model: function model() {
			return this.get('ajax').request('http://localhost:8080/toc/topics');
		}
	});
});
define('visualisationapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("visualisationapp/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "w2ctlF5r", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,1],[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"links\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"topics\"],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"body\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        Topics\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"em\",[]],[\"flush-element\"],[\"text\",\"Visualisations\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "visualisationapp/templates/application.hbs" } });
});
define("visualisationapp/templates/components/dygraph-fileview", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "L2RQwkD5", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"latest\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"graph\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "visualisationapp/templates/components/dygraph-fileview.hbs" } });
});
define("visualisationapp/templates/topic", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OMDJdqTP", "block": "{\"statements\":[[\"append\",[\"helper\",[\"dygraph-fileview\"],null,[[\"latest\",\"topic\"],[[\"get\",[\"model\",\"latest\"]],[\"get\",[\"model\",\"topic\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "visualisationapp/templates/topic.hbs" } });
});
define("visualisationapp/templates/topic/file", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2uwYmz7G", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"Hallo\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "visualisationapp/templates/topic/file.hbs" } });
});
define("visualisationapp/templates/topics", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eOikHo2Z", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Topics\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\"],[\"append\",[\"get\",[\"topic\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"topic\",[\"get\",[\"topic\"]]],null,0]],\"locals\":[\"topic\"]}],\"hasPartials\":false}", "meta": { "moduleName": "visualisationapp/templates/topics.hbs" } });
});


define('visualisationapp/config/environment', ['ember'], function(Ember) {
  var prefix = 'visualisationapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("visualisationapp/app")["default"].create({"name":"visualisationapp","version":"0.0.0+"});
}
//# sourceMappingURL=visualisationapp.map
