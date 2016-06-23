import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

moduleForAcceptance('Acceptance | Edit Resource', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function (assert) {
  visit('/content/resources/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/resources/edit/123');

    var $container = find(".controller.content.resources.edit");
    assert.ok($container.length, "Container");
    assert.ok($container.find('> article').length, "Article");
    assert.ok($container.find('> aside').length, "Aside");
  });
});

test('Click share button and check clipboard functionality', function (assert) {
  visit('/content/resources/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/resources/edit/123');
    var $shareButton = find(".gru-share-pop-over");

    click($shareButton);
    andThen(function () {
      var $popOverContent = find(".gru-share-pop-over-content");

      T.exists(assert, $popOverContent.find('p'), "Missing share description");
      T.exists(assert, $popOverContent.find('.share-actions #resource-popover-input'), "Missing readonly input");
      var $copyBtn = $popOverContent.find('.share-actions .copy-btn');
      T.exists(assert, $copyBtn, "Missing copy button");
    });
  });
});

test('Delete Resource', function (assert) {
  visit('/content/resources/edit/1');
  andThen(function () {
    assert.equal(currentURL(), '/content/resources/edit/1');
    var $deleteButton = find("header .actions .delete");
    click($deleteButton);
    andThen(function () {
      var $deleteContentModal = find(".gru-modal .gru-delete-content");
      var $check1 = $deleteContentModal.find("ul li:eq(0) input");
      click($check1);
      andThen(function () {
        var $check2 = $deleteContentModal.find("ul li:eq(1) input");
        click($check2);
        andThen(function () {
          var $input = $deleteContentModal.find(".delete-input");
          $input.val('delete');
          $input.blur();
          keyEvent($input, 'keyup', KEY_CODES.ENTER);
          andThen(function () {
            var $deleteButton = $deleteContentModal.find("button.delete");
            click($deleteButton);
            andThen(function () {
              assert.equal(currentURL(), '/pochita/content/courses');
            });
            });
        });
      });
    });
  });
});
