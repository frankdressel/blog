'use strict';

define('visualisationapp/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/components/dygraph-fileview.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/dygraph-fileview.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/dygraph-fileview.js should pass ESLint.\n8:17  - \'location\' is assigned a value but never used. (no-unused-vars)\n13:17  - \'g\' is assigned a value but never used. (no-unused-vars)\n13:21  - \'draw\' is not defined. (no-undef)\n17:20  - \'Dygraph\' is not defined. (no-undef)');
  });
});
define('visualisationapp/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('visualisationapp/tests/helpers/destroy-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/destroy-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'visualisationapp/tests/helpers/start-app', 'visualisationapp/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _visualisationappTestsHelpersStartApp, _visualisationappTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _visualisationappTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _visualisationappTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('visualisationapp/tests/helpers/module-for-acceptance.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/module-for-acceptance.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/helpers/resolver', ['exports', 'visualisationapp/resolver', 'visualisationapp/config/environment'], function (exports, _visualisationappResolver, _visualisationappConfigEnvironment) {

  var resolver = _visualisationappResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _visualisationappConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _visualisationappConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('visualisationapp/tests/helpers/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/helpers/start-app', ['exports', 'ember', 'visualisationapp/app', 'visualisationapp/config/environment'], function (exports, _ember, _visualisationappApp, _visualisationappConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _visualisationappConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _visualisationappApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('visualisationapp/tests/helpers/start-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/start-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/integration/components/dygraph-fileview-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('dygraph-fileview', 'Integration | Component | dygraph fileview', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'TOdaND+y',
      'block': '{"statements":[["append",["unknown",["dygraph-fileview"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'BcvrO/lu',
      'block': '{"statements":[["text","\\n"],["block",["dygraph-fileview"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('visualisationapp/tests/integration/components/dygraph-fileview-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/dygraph-fileview-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/dygraph-fileview-test.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/router.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - router.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/routes/topic.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/topic.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/topic.js should pass ESLint.\n7:27  - \'Promise\' is not defined. (no-undef)\n7:53  - \'reject\' is defined but never used. (no-unused-vars)');
  });
});
define('visualisationapp/tests/routes/topic/file.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/topic/file.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/topic/file.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/routes/topics.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/topics.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/topics.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/test-helper', ['exports', 'visualisationapp/tests/helpers/resolver', 'ember-qunit'], function (exports, _visualisationappTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_visualisationappTestsHelpersResolver['default']);
});
define('visualisationapp/tests/test-helper.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - test-helper.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/unit/routes/topic-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:topic', 'Unit | Route | topic', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('visualisationapp/tests/unit/routes/topic-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/topic-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/topic-test.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/unit/routes/topic/file-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:topic/file', 'Unit | Route | topic/file', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('visualisationapp/tests/unit/routes/topic/file-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/topic/file-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/topic/file-test.js should pass ESLint.\n');
  });
});
define('visualisationapp/tests/unit/routes/topics-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:topics', 'Unit | Route | topics', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('visualisationapp/tests/unit/routes/topics-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/topics-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/topics-test.js should pass ESLint.\n');
  });
});
require('visualisationapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
