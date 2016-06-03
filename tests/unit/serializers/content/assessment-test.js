import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleFor('serializer:content/assessment', 'Unit | Serializer | content/assessment');

test('serializeCreateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any',
    isVisibleOnProfile: true,
    thumbnailUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    standards: []
  });
  const response = serializer.serializeCreateAssessment(assessmentObject);
  assert.equal(response.title, 'assessment-title', "Wrong title");
  assert.equal(response.learning_objective, 'any', "Wrong learning objective");
  assert.equal(response.visible_on_profile, true, "Wrong visible on profile");
  assert.equal(response.thumbnail, 'image-id.png', "Wrong thumbnail");
});

test('serializeUpdateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any',
    isVisibleOnProfile: false,
    thumbnailUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    standards: []
  });
  const response = serializer.serializeUpdateAssessment(assessmentObject);
  assert.equal(response.title, 'assessment-title', "Wrong title");
  assert.equal(response.learning_objective, 'any', "Wrong learning objective");
  assert.equal(response.visible_on_profile, false, "Wrong visible on profile");
  assert.equal(response.thumbnail, 'image-id.png', "Wrong thumbnail");
  assert.equal(response.taxonomy, null, "Wrong taxonomy object");
});

test('normalizeReadAssessment', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: 'http://test-bucket01.s3.amazonaws.com/'
    }
  }));
  const assessmentData = {
    id: 'assessment-id',
    title: 'assessment-title',
    'learning_objective': 'learning-objectives',
    'visible_on_profile': true,
    thumbnail: 'image-id.png',
    taxonomy: {}
  };
  const assessment = serializer.normalizeReadAssessment(assessmentData);
  assert.equal(assessment.get('id'), 'assessment-id', 'Wrong id');
  assert.equal(assessment.get('title'), 'assessment-title', 'Wrong title');
  assert.equal(assessment.get('thumbnailUrl'), 'http://test-bucket01.s3.amazonaws.com/image-id.png', 'Wrong image');
  assert.equal(assessment.get('learningObjectives'), 'learning-objectives', 'Wrong learningObjectives');
  assert.equal(assessment.get('isVisibleOnProfile'), true, 'Wrong isVisibleOnProfile');
  assert.equal(assessment.get('standards.length'), 0, 'Wrong standards number of elements');
});
