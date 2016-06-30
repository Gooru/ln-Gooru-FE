import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

moduleForAcceptance('Acceptance | Edit Assessment', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

// TODO: Fix test per changes in 1149
/*test('Edit assessment information', function (assert) {
  visit('/content/assessments/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/123');

    var newTitle = 'New Assessment Name';
    var newLearningObjectives = 'Learning objectives ...';

    var $container = find(".controller.content.assessments.edit");
    var $headerActions = $container.find("#information .header .actions");
    var $content = $container.find('#information .content');

    assert.equal($content.find('.panel-body .title b').text(), 'Assessment Title', 'Title');
    assert.equal($content.find('.panel-body .learning-objectives b').text(), '', 'Learning objectives');

    click($headerActions.find('button.edit'));
    andThen(function () {
      var $contentPanel = $content.find('.panel-body');
      var $title = $contentPanel.find('.title input');
      var $objectives = $contentPanel.find('.learning-objectives .ember-text-area');

      fillIn($title, '');
      triggerEvent($title, 'blur');

      click($headerActions.find('button.save'));
      andThen(function () {

        var $errorMessage = $contentPanel.find('.validation.title .error');

        assert.equal($errorMessage.text().trim(), 'Please enter the assessment title.', 'Validation message missing');

        fillIn($title, newTitle);
        fillIn($objectives, newLearningObjectives);
        // validations update on focus-out
        triggerEvent($title, 'blur');
        triggerEvent($objectives, 'blur');

        click($headerActions.find('button.save'));
        andThen(function () {
          assert.equal($contentPanel.find('.title b').text(), newTitle, 'Title updated');
          assert.equal($contentPanel.find('.learning-objectives b').text(), newLearningObjectives, 'Learning objectives updated');
        });
      });
    });
  });
});*/

test('Click share button and check clipboard functionality', function (assert) {
  visit('/content/assessments/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/123');
    var $shareButton = find(".gru-share-pop-over");

    click($shareButton);
    andThen(function () {
      var $popOverContent = find(".gru-share-pop-over-content");

      T.exists(assert, $popOverContent.find('p'), "Missing share description");
      T.exists(assert, $popOverContent.find('.share-actions #assessment-popover-input'), "Missing readonly input");
      var $copyBtn = $popOverContent.find('.share-actions .copy-btn');
      T.exists(assert, $copyBtn, "Missing copy button");
    });
  });
});
test('Delete Assessment', function (assert) {
  visit('/content/assessments/edit/50484e74-ad95-44d5-981a-c18411260233');
  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/50484e74-ad95-44d5-981a-c18411260233');
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
          var $check3 = $deleteContentModal.find("ul li:eq(2) input");
          click($check3);
          andThen(function () {
            var $input = $deleteContentModal.find(".delete-input");
            $input.val('delete');
            $input.blur();
            keyEvent($input, 'keyup', KEY_CODES.ENTER);
            andThen(function () {
              var $deleteButton = $deleteContentModal.find("button.delete");
              click($deleteButton);
              andThen(function () {
                assert.equal(currentURL(), '/id-for-pochita/content/courses');
              });
            });
          });
        });
      });
    });
  });
});
