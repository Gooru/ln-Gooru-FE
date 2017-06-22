import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Student Independent Learning', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'param-123'
      }
    });
  }
});


test('Layout', function(assert) {
  visit('/student-independent-learning');

  andThen(function() {
    assert.equal(currentURL(), '/student-independent-learning');

    T.exists(assert, find('header.gru-header'), 'Header component not found');

    const $userContainer = find('.controller.student-independent');
    T.exists(assert, $userContainer, 'Missing student independent container');

    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(assert, $leftUserContainer.find('.greetings'), 'Missing student greetings');
    T.exists(assert, $leftUserContainer.find('.greetings .title'), 'Missing student name');
    assert.equal( $leftUserContainer.find('.greetings .title span').text(),'Hello, Student!','Incorrect student name text');
    T.exists(assert, $leftUserContainer.find('.greetings p'), 'Missing count classrooms');
    assert.equal( $leftUserContainer.find('.greetings p').text(), "You're currently enrolled in 7 classrooms",'Incorrect count classrooms text');

    const $panelsContainer = $leftUserContainer.find('.panels');
    T.exists(assert, $panelsContainer, 'Missing panels container');

    const $featuredCourses = $panelsContainer.find('.featured-courses');
    T.exists(assert, $featuredCourses, 'Missing featured courses component');

    const $joinClass = $panelsContainer.find('.join-class');
    T.exists(assert, $joinClass, 'Missing join class panel');

    T.exists(assert, $joinClass.find('.panel-heading'), 'Missing join class panel-heading');
    T.exists(assert, $joinClass.find('.panel-body'), 'Missing join class panel-body');

    T.exists(assert, $joinClass.find('.panel-body .legend'), 'Missing panel body legend');
    T.exists(assert, $joinClass.find('.panel-body .actions .join'), 'Missing join class button');
    T.exists(assert, $joinClass.find('.panel-body .will-disappear'), 'Missing will-disappear legend');


    const $navigatorContainer = $leftUserContainer.find('.student-navigator');
    T.exists(assert, $navigatorContainer, 'Missing student navigator');
    T.exists(assert, $navigatorContainer.find('.active-classes'), 'Missing active-classes tab');
    T.exists(assert, $navigatorContainer.find('.independent-learning'), 'Missing independent-learning tab');

    assert.ok($('.independent-learning').hasClass('active'), 'Active independent-learning tab should be visible');

    const $bookmarksPanel = $leftUserContainer.find('.content .panel.bookmarks');
    T.exists(assert, $bookmarksPanel, 'Missing bookmarks panel');
    T.exists(assert, $bookmarksPanel.find('.panel-heading'), 'Missing bookmarks panel-heading');
    T.exists(assert, $bookmarksPanel.find('.panel-body'), 'Missing bookmarks panel-body');
    T.exists(assert, $bookmarksPanel.find('.panel-body .add-bookmark'), 'Missing add-bookmark link');
  });
});

test('Go to library from featured-courses panel', function(assert) {
  visit('/student-independent-learning');

  andThen(function() {
    assert.equal(currentURL(), '/student-independent-learning');
    const $featuredCourses = find('.panel.featured-courses');
    const $featuredCoursesButton = $featuredCourses.find('.actions button.library');

    click($featuredCoursesButton);
    andThen(function() {
      assert.equal(currentURL(), '/library', 'Wrong route');
    });
  });
});

test('Go to join from join class panel', function(assert) {
  visit('/student-independent-learning');

  andThen(function() {
    assert.equal(currentURL(), '/student-independent-learning');

    const $joinClass = find('.panel.join-class');

    const $joinClassButton = $joinClass.find('.actions button.join');

    click($joinClassButton);
    andThen(function() {
      assert.equal(currentURL(), '/content/classes/join', 'Wrong route');
    });
  });
});

test('Go to search/collections from bookmarks panel', function(assert) {
  visit('/student-independent-learning');

  andThen(function() {
    assert.equal(currentURL(), '/student-independent-learning');

    const $bookmarksPanel = find('.content .panel.bookmarks');
    T.exists(assert, $bookmarksPanel.find('.panel-body .add-bookmark'), 'Missing add-bookmark link');

    const $addBookmarkButton = $bookmarksPanel.find('.panel-body .add-bookmark');

    click($addBookmarkButton);
    andThen(function() {
      assert.equal(currentURL(), '/search/collections', 'Wrong route');
    });
  });
});
