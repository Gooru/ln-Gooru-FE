import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import { KEY_CODES } from 'gooru-web/config/config';

moduleForAcceptance('Acceptance | teacher/class/class-management', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'teacher-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-settings'
    );
    assert.ok($container.length, 'Missing class management tab container');

    assert.ok(
      $container.find('.class-layout').length,
      'Missing class information'
    );
    assert.ok(
      $container.find('.course-settings-layout').length,
      'Missing course information'
    );

    const $classInformation = $container.find('.class-layout');

    assert.ok(
      $classInformation.find(
        '.class-sec-cont .class-settings-sec .class-head-row-wrap .sec-head-class-name .class-title'
      ).length,
      'Missing class information title'
    );
    assert.ok(
      $classInformation.find(
        '.class-sec-cont .class-settings-sec .class-head-row-wrap .sec-head-class-name .edit-icon i'
      ).length,
      'Missing class title edit icon'
    );

    const $courseInformation = $container.find('.course-settings-layout');

    assert.ok(
      $courseInformation.find('.course-sec-cont .course-settings-label').length,
      'Missing course information title'
    );

    assert.ok(
      $courseInformation.find(
        '.course-sec-cont .course-settings-sec .sub-sec-row.subject'
      ).length,
      'Missing subject title'
    );
    assert.ok(
      $courseInformation.find(
        '.course-sec-cont .course-settings-sec .sub-sec-row.framework'
      ).length,
      'Missing framework title'
    );
  });
});
test('Remove class', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-settings'
    );
    const $deleteLayout = $container.find(
      '.sec-col-layout .sec-rows-layout.left-panel'
    );
    const $removeButton = $deleteLayout.find(
      '.class-layout-btn .btn-panel .class-btn.delete-btn'
    );
    click($removeButton);
    andThen(function() {
      var $deleteContentModal = find('.gru-modal .gru-delete-class');
      var $check1 = $deleteContentModal.find('ul li:eq(0) input');
      click($check1);
      andThen(function() {
        var $check2 = $deleteContentModal.find('ul li:eq(1) input');
        click($check2);
        andThen(function() {
          var $check3 = $deleteContentModal.find('ul li:eq(2) input');
          click($check3);
          andThen(function() {
            var $input = $deleteContentModal.find('.delete-input');
            $input.val('delete');
            $input.blur();
            keyEvent($input, 'keyup', KEY_CODES.ENTER);
            andThen(function() {
              var $deleteButton = $deleteContentModal.find('button.delete');
              click($deleteButton);
              andThen(function() {
                assert.equal(currentURL(), '/teacher-home');
              });
            });
          });
        });
      });
    });
  });
});

test('Archive Class', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/teacher/class/class-for-pochita-as-teacher/class-management'
    );

    const $container = find(
      '.teacher.class .controller.teacher.class.class-settings'
    );
    const $archiveLayout = $container.find(
      '.sec-col-layout .sec-rows-layout.left-panel'
    );
    const $archiveButton = $archiveLayout.find(
      '.class-layout-btn .btn-panel .class-btn.archive-btn'
    );
    click($archiveButton);
    andThen(function() {
      const $archiveModal = find('.gru-modal .gru-archive-class');
      let $check1 = $archiveModal.find('ul li:eq(0) input');
      click($check1);
      andThen(function() {
        let $check2 = $archiveModal.find('ul li:eq(1) input');
        click($check2);
        andThen(function() {
          let $check3 = $archiveModal.find('ul li:eq(2) input');
          click($check3);
          andThen(function() {
            let $archiveButton = $archiveModal.find('button.archive');
            click($archiveButton);
            andThen(function() {
              assert.equal(currentURL(), '/teacher-home');
            });
          });
        });
      });
    });
  });
});
