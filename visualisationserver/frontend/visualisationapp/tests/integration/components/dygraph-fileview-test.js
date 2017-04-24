import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dygraph-fileview', 'Integration | Component | dygraph fileview', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dygraph-fileview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dygraph-fileview}}
      template block text
    {{/dygraph-fileview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
