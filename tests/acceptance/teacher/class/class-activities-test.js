import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | teacher/class/class-activities', {
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

test('Layout', function (assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');
  andThen(function() {

    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-activities');

    const $container = find('.teacher.class .controller.teacher.class.class-activities');
    assert.ok($container.length, 'Missing class activities tab container');
    assert.ok($container.find('.links').length, 'Missing links');
    assert.ok($container.find('.links a.course-map').length, 'Missing course-map link');
    assert.ok($container.find('.links a.my-content').length, 'Missing my-content link');
    assert.ok($container.find('.class-activity-accordion').length, 'Missing class activity accordion');

    T.exists(assert, $container.find('.collections'), 'Missing activities collections');
  });
});

test('Go to course-map from links panel', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');

  andThen(function() {
    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-activities');
    const $courseMapLink = find('.links a.course-map');

    click($courseMapLink);
    andThen(function() {
      assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/course-map', 'Wrong route');
    });
  });
});

test('Go to my content from links panel', function(assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-activities');

  andThen(function() {
    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-activities');
    const $myContentLink = find('.links a.my-content');

    click($myContentLink);
    andThen(function() {
      assert.equal(currentURL(), '/id-for-pochita/content/courses', 'Wrong route');
    });
  });
});
