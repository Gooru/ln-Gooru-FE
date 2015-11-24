import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/resources/gru-image', 'Integration | Component | player/resources/gru image', {
  integration: true
});


test('True or false question layout', function (assert) {

  assert.expect(2);

  const resource = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "resourceType": "image/png",
      "resourceFormat": "image",
      "assetUri": "test",
      "folder": "/images/",
      "url": "icon.png"
    });

  this.set('resource', resource);
  this.render(hbs`{{player/resources/gru-image resource=resource}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("img"), "Missing image element");
  assert.equal($component.find("img").attr("src"), "test/images/icon.png", "Wrong url");
});
