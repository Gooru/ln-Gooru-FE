import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

moduleForAcceptance('Acceptance | sign-in', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'sign-in-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');

    const $signInContainer = find(".sign-in");
    T.exists(assert, $signInContainer, "Missing sign-in container");
    T.exists(assert, $signInContainer.find(".sign-in-wrapper"), "Missing sign-in-wrapper");
    const $signInHeader = $signInContainer.find(".sign-in-header");
    T.exists(assert, $signInHeader, "Missing sign-in-header");
    T.exists(assert, $signInHeader.find("h3"), "Missing sign-in title");
    assert.equal(T.text($signInHeader.find("h3")), "Welcome Back!", "Incorrect sign-in title text");
    T.exists(assert, $signInHeader.find(".description"), "Missing sign-in description");
    assert.equal(T.text($signInHeader.find(".description")), "Learning is just around the corner.", "Incorrect sign-in description text");
    T.exists(assert, $signInHeader.find(".google-button"), "Missing sign-in google button");

    var $signInForm = $signInContainer.find(".sign-in-form form");
    T.exists(assert, $signInForm, "Missing sign in form");
    T.exists(assert, $signInForm.find(".gru-input.username"), "Missing username field");
    T.exists(assert, $signInForm.find(".gru-input.password"), "Missing password field");
    T.exists(assert, $signInForm.find("div.forgot-password a"), "Missing forgot password link");
    T.exists(assert, $signInForm.find("div.log-in-button button"), "Missing sign in button");

  });
});


test('it shows an error message if the username field is left blank', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');


    const $signInContainer = find(".sign-in");
    const $usernameField = $signInContainer.find(".gru-input.username");

    assert.ok(!$usernameField.find(".error-messages .error").length, 'Username error message not visible');

    // Try submitting without filling in data
    $signInContainer.find("button.submit-sign-in").click();

    return wait().then(function () {

      assert.ok($usernameField.find(".error-messages .error").length, 'Username error message visible');
      // Fill in the input field
      $usernameField.find("input").val('Username');
      $usernameField.find("input").blur();

      return wait().then(function () {
        assert.ok(!$usernameField.find(".error-messages .error").length, 'Username error message was hidden');
      });
    });
  });
});

test('it shows an error message if the password field is left blank', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');


    const $signInContainer = find(".sign-in");
    const $passwordField = $signInContainer.find(".gru-input.password");

    assert.ok(!$passwordField.find(".error-messages .error").length, 'Password error message not visible');

    // Try submitting without filling in data
    $signInContainer.find("button.submit-sign-in").click();

    return wait().then(function () {

      assert.ok($passwordField.find(".error-messages .error").length, 'Password error message visible');
      // Fill in the input field
      $passwordField.find("input").val('Password');
      $passwordField.find("input").blur();

      return wait().then(function () {
        assert.ok(!$passwordField.find(".error-messages .error").length, 'Password error message was hidden');
      });
    });
  });
});
test('it shows an error message if the password and username field has only blank spaces', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');


    const $signInContainer = find(".sign-in");
    const $usernameField = $signInContainer.find(".gru-input.username");

    assert.ok(!$usernameField.find(".error-messages .error").length, 'Username error message not visible');

    $usernameField.find("input").val('    ');
    $usernameField.find("input").blur();

    return wait().then(function () {

      assert.ok($usernameField.find(".error-messages .error").length, 'Username error message should be visible');
      // Fill in the input field
      const $passwordField = $signInContainer.find(".gru-input.password");
      $passwordField.find("input").val('    ');
      $passwordField.find("input").blur();

      return wait().then(function () {
        assert.ok($passwordField.find(".error-messages .error").length, 'Password error message should be visible');
      });
    });
  });
});

test('Sign in after try with wrong credentials when press key Enter', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");

    assert.ok(!$usernameField.find(".error-messages .error").length, 'Username error message not visible');

    $usernameField.find("input").val('');
    $usernameField.find("input").blur();
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('pochita');
    // Try submitting without filling in data
    keyEvent($signInContainer, 'keyup', KEY_CODES.ENTER);
    andThen(function() {
      assert.ok($usernameField.find(".error-messages .error").length, 'Username error message should be visible');
    });
  });
});

test('Sign in with correct credentials as a teacher', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('pochita');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('pochita');
    // Try submitting without filling in data
    click($signInContainer.find("button.submit-sign-in"));
    andThen(function() {
      assert.equal(currentURL(), '/teacher');
    });
  });
});

test('Sign in with correct credentials as a student', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('param');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('param');
    // Try submitting without filling in data
    click($signInContainer.find("button.submit-sign-in"));
    andThen(function() {
      assert.equal(currentURL(), '/student');
    });
  });
});

test('Sign in with correct credentials as another', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('other');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('other');
    // Try submitting without filling in data
    click($signInContainer.find("button.submit-sign-in"));
    andThen(function() {
      assert.equal(currentURL(), '/other-123/content/courses');
    });
  });
});

test('Navigate from student-profile-student as a student', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('param');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('param');
    click($signInContainer.find("button.submit-sign-in"));

    andThen(function() {
      assert.equal(currentURL(), '/student');
      const $navMenu = find(".gru-header .menu-navbar");
      click($navMenu.find(".profile-link a.profile"));

      andThen(function() {
        assert.equal(currentURL(), '/param-123/content/courses');
        const $navHeader = find(".gru-header .navbar-header");
        click($navHeader.find(".home-link"));

        andThen(function() {
          assert.equal(currentURL(), '/student');
        });
      });
    });
  });
});

test('Navigate from teacher-profile-teacher as a teacher', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('pochita');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('pochita');
    click($signInContainer.find("button.submit-sign-in"));

    andThen(function() {
      assert.equal(currentURL(), '/teacher');
      const $navMenu = find(".gru-header .menu-navbar");
      click($navMenu.find(".profile-link a.profile"));

      andThen(function() {
        assert.equal(currentURL(), '/id-for-pochita/content/courses');
        const $navHeader = find(".gru-header .navbar-header");
        click($navHeader.find(".home-link"));

        andThen(function() {
          assert.equal(currentURL(), '/teacher');
        });
      });
    });
  });
});

test('Navigate from courses-collection-courses as provider', function (assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
    const $signInContainer = find(".controller.sign-in .sign-in-form");
    const $usernameField = $signInContainer.find(".gru-input.username");
    $usernameField.find("input").val('other');
    const $passwordField = $signInContainer.find(".gru-input.password");
    $passwordField.find("input").val('other');
    click($signInContainer.find("button.submit-sign-in"));

    andThen(function() {
      assert.equal(currentURL(), '/other-123/content/courses');
      const $contentNav = find(".content-navigation");
      click($contentNav.find(".collections a"));

      andThen(function() {
        assert.equal(currentURL(), '/other-123/content/collections');
        const $navHeader = find(".gru-header .navbar-header");
        click($navHeader.find(".home-link"));

        andThen(function() {
          assert.equal(currentURL(), '/other-123/content/courses');
        });
      });
    });
  });
});
