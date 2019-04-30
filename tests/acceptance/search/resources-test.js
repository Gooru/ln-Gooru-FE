import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/resources', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'resources-token',
      user: {
        gooruUId: 'resources-token-user-id'
      }
    });
  }
});


test('Apply taxonomy filter', function(assert) {
  visit(
    '/search/resources?taxonomies=["TEKS.K12.SC-K-SIR-01","TEKS.K12.SC-K-SIR-02"]&term=any'
  );

  andThen(function() {
    assert.equal(
      currentURL(),
      '/search/resources?taxonomies=["TEKS.K12.SC-K-SIR-01","TEKS.K12.SC-K-SIR-02"]&term=any'
    );

    assert.equal(
      find('.gru-taxonomy-tag-list .gru-taxonomy-tag').length,
      2,
      'Number of tags rendered'
    );
  });
});

test('Apply taxonomy filter - Removing taxonomy tag', function(assert) {
  visit(
    '/search/resources?taxonomies=["TEKS.K12.SC-K-SIR-01","TEKS.K12.SC-K-SIR-02"]&term=any'
  );

  andThen(function() {
    assert.equal(
      currentURL(),
      '/search/resources?taxonomies=["TEKS.K12.SC-K-SIR-01","TEKS.K12.SC-K-SIR-02"]&term=any'
    );

    const $taxonomyTags = find('.gru-taxonomy-tag-list .gru-taxonomy-tag');

    assert.equal($taxonomyTags.length, 2, 'Number of tags rendered');

    $taxonomyTags.eq(0).find('button.remove').click();

    andThen(function() {
      const $taxonomyTags = find('.gru-taxonomy-tag-list .gru-taxonomy-tag');

      assert.equal($taxonomyTags.length, 1, 'One tag should be removed');
    });
  });
});
