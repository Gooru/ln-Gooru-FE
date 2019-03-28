import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | library', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Library Controller Layout', function(assert) {
  assert.expect(9);
  visit('/library');

  andThen(function() {
    assert.equal(currentURL(), '/library');

    const $libraries = find('.libraries');
    assert.ok($libraries.length, 'Missing libraries controller');
    assert.ok($libraries.find('.content.gru-header'), 'Missing library header');

    let $options = $libraries.find('.tab');
    assert.ok(
      $options.filter('.featured-courses').length,
      'Featured Courses tab is missing'
    );
    assert.ok(
      $options.filter('.partner-libraries').length,
      'Partner Libraries tab should appear'
    );
    assert.ok(
      $libraries.find('#featured-courses'),
      'Missing Featured Courses Section'
    );
    assert.equal(
      $libraries.find('#featured-courses .gru-standard-card').length,
      2,
      'It should show 2 cards'
    );

    $libraries.find('a.partner-libraries').click();
    andThen(function() {
      assert.ok(
        $libraries.find('#partner-libraries'),
        'Missing Partner Libraries Section'
      );
      assert.equal(
        $libraries.find('#partner-libraries .gru-partner-library-card').length,
        4,
        'It should show 4 cards'
      );
    });
  });
});

test('Clicking card title should open the player', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/library');
  andThen(function() {
    assert.equal(currentURL(), '/library');
    const $libraries = find('.libraries ');
    const $firstResult = $libraries.find(
      '#featured-courses .gru-standard-card:eq(0)'
    );
    const $cardHeader = $firstResult.find('.panel .panel-heading');
    const $cardTitle = $cardHeader.find('.info .title-section ');
    click($cardTitle);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/content/courses/play/b8336353-08c1-42ce-add9-3454227902c8'
      );
    });
  });
});

test('Clicking card image should open the player', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/library');
  andThen(function() {
    assert.equal(currentURL(), '/library');
    const $libraries = find('.libraries ');
    const $firstResult = $libraries.find(
      '#featured-courses .gru-standard-card:eq(0)'
    );
    const $cardHeader = $firstResult.find('.panel .panel-heading');
    click($cardHeader);
    andThen(function() {
      assert.equal(
        currentURL(),
        '/content/courses/play/b8336353-08c1-42ce-add9-3454227902c8'
      );
    });
  });
});
