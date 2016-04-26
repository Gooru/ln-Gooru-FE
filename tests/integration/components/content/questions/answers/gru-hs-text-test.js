import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/questions/answers/gru-hs-text', 'Integration | Component | content/questions/answers/gru hs text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{content/questions/answers/gru-hs-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#content/questions/answers/gru-hs-text}}
      template block text
    {{/content/questions/answers/gru-hs-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
