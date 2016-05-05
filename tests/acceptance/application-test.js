import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | application', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
  }
});

test('searchTerm: Search box navigation', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(2); //making sure all asserts are called

    assert.equal(currentURL(), '/');


    const $appHeader = find('.gru-header');
    const $searchInput = $appHeader.find(".search-input");


    fillIn($searchInput, 'europe');

    $searchInput.val('europe');
    $searchInput.change();

    $appHeader.find('form').submit();

    andThen(function(){
      assert.equal(currentURL(), '/search/collections?term=europe');
    });
  });
});

test('Theme support - no theme', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(3); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    assert.ok(!Ember.$("html").attr("id"), "Html element should have no id");

    const $styleLink = Ember.$("#theme-style-link");
    T.notExists(assert, $styleLink, "Link element should not be added");

  });
});

test('Theme support - Having translations and styles url', function(assert) {
  visit('/?themeId=edify');

  andThen(function() {
    assert.expect(4); //making sure all asserts are called

    assert.equal(currentURL(), '/?themeId=edify');

    T.exists(assert, Ember.$("#edify"), "Missing html element having theme id");

    const $styleLink = Ember.$("#theme-style-link");
    T.exists(assert, $styleLink, "Missing link element having theme style");
    assert.equal($styleLink.attr("href"), "themes/edify/styles.css", "Wrong style url");

  });
});
