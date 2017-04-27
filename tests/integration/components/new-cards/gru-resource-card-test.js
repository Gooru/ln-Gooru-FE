import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ResourceModel from 'gooru-web/models/content/resource';
import QuestionModel from 'gooru-web/models/content/question';
import RubricModel from 'gooru-web/models/rubric/rubric';
import Ember from 'ember';

moduleForComponent('new-cards/gru-resource-card', 'Integration | Component | new cards/gru resource card', {
  integration: true
});

test('Resource Card Layout', function(assert) {
  var resource = ResourceModel.create({
    title: 'Resource Title',
    format:'video',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner:Ember.Object.create({
      firstName:'Publisher'
    }),
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    isVisibleOnProfile: false
  });

  this.set('resource', resource);
  this.render(hbs`{{new-cards/gru-resource-card resource=resource allowProfileNavigation=true}}`);
  var $component = this.$();
  const $resourceCard = $component.find('.gru-resource-card');
  assert.ok($resourceCard.find('.panel-heading h3.title').length, 'Missing Title');
  assert.ok($resourceCard.find('.panel-heading i.' + resource.format + '-icon').length, 'Missing Resource Icon');
  assert.equal($resourceCard.find('.panel-heading .resource-type span').text(), 'Video', 'Incorrect  resource type');
  assert.ok($resourceCard.find('.panel-body .gru-taxonomy-tag-list').length, 'Missing standards');
  assert.ok($resourceCard.find('.panel-body .publisher img').length, 'Missing Publisher Image');
  assert.ok($resourceCard.find('.panel-body .publisher .owner a').length, 'Missing Owner Name');
  assert.ok($resourceCard.find('.panel-body .description p').length, 'Missing Description');
  assert.ok($resourceCard.find('.panel-footer button.study-btn').length, 'Missing Study Button');
  assert.ok($resourceCard.find('.panel-footer .actions .share-btn').length, 'Missing share button');
});

test('Question Card Layout', function(assert) {
  var question = QuestionModel.create({
    title: 'Question Title',
    format:'question',
    type:'MC',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner:Ember.Object.create({
      firstName:'Publisher'
    }),
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    isVisibleOnProfile: true
  });

  this.set('question', question);
  this.render(hbs`{{new-cards/gru-resource-card resource=question allowProfileNavigation=true}}`);
  var $component = this.$();
  const $resourceCard = $component.find('.gru-resource-card');
  assert.ok($resourceCard.find('.panel-heading h3.title').length, 'Missing Title');
  assert.ok($resourceCard.find('.panel-heading i.question-icon').length, 'Missing Question Icon');
  assert.equal($resourceCard.find('.panel-heading .question-type span').text(), 'Multiple Choice', 'Incorrect question type');
  assert.ok($resourceCard.find('.panel-body .gru-taxonomy-tag-list').length, 'Missing standards');
  assert.ok($resourceCard.find('.panel-body .publisher img').length, 'Missing Publisher Image');
  assert.ok($resourceCard.find('.panel-body .publisher .owner a').length, 'Missing Owner Name');
  assert.ok($resourceCard.find('.panel-body .description p').length, 'Missing Description');
  assert.ok($resourceCard.find('.panel-footer button.study-btn').length, 'Missing Study Button');
  assert.ok($resourceCard.find('.panel-footer .actions .share-btn').length, 'Missing share button');
});

test('Resource Card with publisher', function(assert) {
  var resource = ResourceModel.create({
    title: 'Resource Title',
    format:'video',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner:Ember.Object.create({
      firstName:'Publisher'
    }),
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    isPublished:true,
    publisher:'Publisher name'
  });

  this.set('resource', resource);
  this.render(hbs`{{new-cards/gru-resource-card resource=resource allowProfileNavigation=true}}`);
  var $component = this.$();
  const $resourceCard = $component.find('.gru-resource-card');
  assert.notOk($resourceCard.find('.panel-body .publisher img').length, 'Publisher should not have image');
  assert.notOk($resourceCard.find('.panel-body .publisher .owner a').length, 'The publisher name should not be a link');
  assert.ok($resourceCard.find('.panel-body .publisher .publisher-name').length, 'Missing publisher Name');
});

test('Not allow profile navigation', function(assert) {
  var resource = ResourceModel.create({
    title: 'Resource Title',
    format:'video',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner:Ember.Object.create({
      fullName:'Owner'
    }),
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    isPublished:false,
    publisher:'Publisher name'
  });

  this.set('resource', resource);
  this.render(hbs`{{new-cards/gru-resource-card resource=resource allowProfileNavigation=false}}`);
  var $component = this.$();
  const $resourceCard = $component.find('.gru-resource-card');
  assert.notOk($resourceCard.find('.panel-body .publisher .publisher-name').length, 'Publisher Name should not be visible');
  assert.ok($resourceCard.find('.panel-body .publisher img').length, 'Publisher should not have image');
  assert.notOk($resourceCard.find('.panel-body .publisher .owner a.enable').length, 'The publisher name should not be a link');
  assert.ok($resourceCard.find('.panel-body .publisher .owner a.disabled').length, 'Missing owner Name');
});

test('Rubric Layout', function(assert) {
  var rubric = RubricModel.create({
    title: 'rubric-title',
    description: 'rubric-description',
    type: 'rubric-type',
    thumbnail: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    taxonomy: Ember.A([Ember.Object.create({
    description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
    code:'CCSS.Math.Content.7.RP.A.3'
  }),Ember.Object.create({
    description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
    code:'CCSS.Math.Content.5.NBT.A.2'
  })]),
    audience: [1]
  });


  this.set('rubric', rubric);
  this.render(hbs`{{new-cards/gru-resource-card resource=rubric allowProfileNavigation=true isRubric=true}}`);
  var $component = this.$();
  const $resourceCard = $component.find('.gru-resource-card');
  assert.ok($resourceCard.find('.panel-heading h3.title').length, 'Missing Title');
  assert.ok($resourceCard.find('.panel-heading i.rubric-icon').length, 'Missing Rubric Icon');
  assert.notOk($resourceCard.find('.panel-heading .question-type span').length,'Should not have question type');
  assert.notOk($resourceCard.find('.panel-heading .resource-type span').length,'Should not have resource type');
  assert.ok($resourceCard.find('.panel-body .gru-taxonomy-tag-list').length, 'Missing standards');
  assert.ok($resourceCard.find('.panel-body .description p').length, 'Missing Description');
  assert.ok($resourceCard.find('.panel-footer button.study-btn').length, 'Missing Study Button');
  assert.ok($resourceCard.find('.panel-footer .actions .share-btn').length, 'Missing share button');
});