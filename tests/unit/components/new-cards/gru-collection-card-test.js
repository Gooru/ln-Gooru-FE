import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';
import Course from 'gooru-web/models/content/course';

moduleForComponent('new-cards/gru-collection-card', 'Unit | Component | new-cards/gru collection card', {
  integration: false
});

test('disabledBookmark', function(assert) {
  let component = this.subject({
    session: {
      isAnonymous: false
    },
    isTeacher: false
  });
  assert.notOk(component.get('disabledBookmark'), 'Wrong value of disabled bookmark');

  component.set('isTeacher', true);
  assert.ok(component.get('disabledBookmark'), 'Wrong value of disabled bookmark');

  component.set('isTeacher', false);
  component.set('session.isAnonymous', true);
  assert.ok(component.get('disabledBookmark'), 'Wrong value of disabled bookmark');
});

test('previewContent', function(assert) {
  let component = this.subject({
      courseService: {
        fetchById: (courseId) => {
          assert.equal(courseId, '123', 'Course id should match');
          return Ember.RSVP.resolve(Course.create(Ember.getOwner(this).ownerInjection(), {
            id:'123',
            children:[
              Ember.Object.create({
                id: 'unit-123',
                sequence: 1,
                title: 'Unit Title A'
              }),
              Ember.Object.create({
                id: 'unit-456',
                sequence: 2,
                title: 'Unit Title B'
              })
            ]
          })
          );
        }
      },
    remixCourse:function(){
      return true;
    }}
  );

  let course = Course.create(Ember.getOwner(this).ownerInjection(),{
    id:'123',
    title: "Course Title",
    subject: 'CCSS.K12.Math',
    category: 'k_12',
    owner: Ember.Object.create({
      id: 'owner-id',
      username: 'dara.weiner',
      avatarUrl: 'avatar-url'
    }),
    useCase: "Use Case",
    taxonomy:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    children: [
      Ember.Object.create({
        id: 'unit-123',
        sequence: 1,
        title: 'Unit Title A'
      }),
      Ember.Object.create({
        id: 'unit-456',
        sequence: 2,
        title: 'Unit Title B'
      })
    ]
  });
  var expectedModel = Ember.Object.create({
    content: course,
    remixCourse: () => component.remixCourse()
  });

  component.set('isCourse', true);

  component.set('isTeacher', true);

  let done = assert.async();
  component.set('actions.showModal', function(componentName, model) {
    assert.deepEqual(model.remixCourse(), expectedModel.remixCourse(), 'Model function should match');
    assert.deepEqual(model.content, expectedModel.content, 'Model content  should match');
    assert.equal(componentName, 'gru-preview-course', 'Component name should match');
    done();
  });
  component.send('previewContent', course);
});
