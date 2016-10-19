import Ember from 'ember';

/**
 * @typedef {Object} PerformanceService
 */
export default Ember.Service.extend({

  store: Ember.inject.service(),

  /**
   * @property {Ember.Service} Service to retrieve analytics data
   */
  analyticsService: Ember.inject.service("api-sdk/analytics"),

  /**
   * @property {Ember.Service} Service to search for resources
   */
  searchService: Ember.inject.service("api-sdk/search"),

  /**
   * @property {Ember.Service} Service to get the Taxonomy data
   */
  taxonomyService: Ember.inject.service("api-sdk/taxonomy"),


  /**
   * Gets a student's assessment result for a specific collection.
   * @param context
   * @param loadStandards
   * @returns {Promise.<AssessmentResult>}
   */
  findAssessmentResultByCollectionAndStudent: function (context, loadStandards) {
    const service = this;

    const params = {
      collectionType: context.collectionType,
      contentId: context.collectionId,
      userId: context.userId,
      sessionId: context.sessionId
    };
    if (context.classId) {
      params.classId = context.classId;
      params.courseId = context.courseId;
      params.unitId = context.unitId;
      params.lessonId = context.lessonId;
    }
    return new Ember.RSVP.Promise(function(resolve) {
      service.get('studentCollectionAdapter').queryRecord(params).then(function (payload) {
        const assessmentResult = service.get('studentCollectionPerformanceSerializer').normalizeStudentCollection(payload);
        if (loadStandards){
          service.loadStandardsSummary(assessmentResult, context).then(function(){
            resolve(assessmentResult);
          });
        }
        else {
          resolve(assessmentResult);
        }
      });
    });
  },

  loadStandardsSummary: function(assessmentResult, context){
    const service = this;
    const analyticsService = service.get('analyticsService');
    const taxonomyService = service.get('taxonomyService');
    const searchService = service.get('searchService');
    const courseId = context.courseId;
    return new Ember.RSVP.Promise(function(resolve) {
      analyticsService.getStandardsSummary(context.get('sessionId'), context.get("userId"))
        .then(function (standardsSummary) {
          assessmentResult.set('mastery', standardsSummary);
          let standardsIds = standardsSummary.map(function (standardSummary) {
            return standardSummary.get('id');
          });
          if (standardsIds.length){ //if it has standards
            taxonomyService.fetchCodesByIds(standardsIds)
              .then(function (taxonomyStandards) {
                const promises = [];
                standardsSummary.forEach(function (standardSummary) {
                  const taxonomyStandard = taxonomyStandards.findBy('id', standardSummary.get('id'));
                  if (taxonomyStandard) {
                    standardSummary.set('description', taxonomyStandard.title);
                  }
                  const filters = {
                    courseId: courseId,
                    taxonomies: [standardSummary.get('id')],
                    publishStatus: 'unpublished'  // TODO this parameter needs to be removed once we go to Production
                  };
                  const searchResourcePromise = searchService.searchResources('*', filters)
                    .then(function (resources) {
                      const suggestedResources = resources.map(function (resource) {
                        return {
                          resource: resource.toPlayerResource()
                        };
                      });
                      standardSummary.set('suggestedResources', suggestedResources);
                    });
                  promises.push(searchResourcePromise);
                });
                Ember.RSVP.all(promises).then(function(){
                  resolve(assessmentResult);
                });
              });
          }
          else {
            resolve(assessmentResult);
          }
        });
    });
  },

  /**
   * Gets the unit performance data for a specific user, class and course.
   * @param userId
   * @param classId
   * @param courseId
   * @param units
   * @param options
   * @returns {Promise.<UnitPerformance[]>}
   */
  findStudentPerformanceByCourse: function(userId, classId, courseId, units, options = {collectionType: 'assessment'}) {
    const service = this;
    service.get('store').unloadAll('performance/unit-performance');
    return service.get('store').queryRecord('performance/unit-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId
    }).then(function (unitPerformances) {
      return service.matchCourseMapWithPerformances(units, unitPerformances, 'unit');
    });
  },

  /**
   * Gets the lesson performance data for a specific user, class, course and unit.
   * @param userId
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessons
   * @param options
   * @returns {Promise.<LessonPerformance[]>}
   */
  findStudentPerformanceByUnit: function (userId, classId, courseId, unitId, lessons, options = {collectionType: 'assessment'}) {
    const service = this;
    service.get('store').unloadAll('performance/lesson-performance');
    return service.get('store').queryRecord('performance/lesson-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    }).then(function (lessonPerformances) {
      return service.matchCourseMapWithPerformances(lessons, lessonPerformances, 'lesson');
    });
  },

  /**
   * Gets the collection performance data for a specific user, class, course, unit and lesson.
   * @param userId
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @param collections
   * @param options
   * @returns {Promise.<CollectionPerformance[]>}
   */
  findStudentPerformanceByLesson: function (userId, classId, courseId, unitId, lessonId, collections,
                                            options = { collectionType: 'assessment' }) {
    const service = this;
    service.get('store').unloadAll('performance/collection-performance');
    return service.get('store').queryRecord('performance/collection-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function (collectionPerformances) {
      return service.matchCourseMapWithPerformances(collections, collectionPerformances, 'collection');
    });
  },

  /**
   * Gets the data for al the performances in class.
   * @param objectsWithTitle
   * @param performances
   * @returns {Promise.<CollectionPerformance[]>}
   */
  matchTitlesWithPerformances: function (objectsWithTitle, performances) {
    return performances.map(function (performance) {
      const objectWithTitle = objectsWithTitle.findBy('id', performance.get('id'));
      if (objectWithTitle) {
        performance.set('title', objectWithTitle.get('title'));
      }
      return performance;
    });
  },

  /**
   * Gets the data for al the performances in class.
   * @param objectsWithTitle
   * @param performances
   * @returns {Promise.<CollectionPerformance[]>}
   */
  matchCourseMapWithPerformances: function(objectsWithTitle, performances, type) {
    const service = this;
    return objectsWithTitle.map(function (object) {
      let objectWithTitle = performances.findBy('id', object.get('id'));
      if(objectWithTitle) {
        objectWithTitle.set('title', object.get('title'));
      }else{
        objectWithTitle = service.getPerformanceRecordByType(type, object);
      }
      return objectWithTitle;
    });
  },

  /**
   * Gets the perfomrmance object by type.
   * @param type
   * @param object
   * @returns {Promise.<performance[]>}
   */
  getPerformanceRecordByType: function(type, object){
    const id = object.get("id");
    const store = this.get('store');
    let modelName = null;
    let record = this.getPerformanceRecord(type, object);

    if(type === 'unit') {
      modelName = "performance/unit-performance";
    }
    else if(type === 'lesson'){
      modelName = "performance/lesson-performance";
    }
    else {
      modelName = "performance/collection-performance";
    }

    const found = store.recordIsLoaded(modelName, id);
    if (found) {
      const foundRecord = store.recordForId(modelName, id);
      store.unloadRecord(foundRecord);
    }
    let newRecord = store.createRecord(modelName, record);
    if (type === 'collection') {
      newRecord.set("collectionType", object.get("collectionType"));
    }

    return newRecord;
  },

  /**
   * Gets the perfomrmance object by type.
   * @param type
   * @param object
   * @returns {object}
   */
  getPerformanceRecord: function(type, object) {
    return {
      id: object.get('id'),
      title: object.get('title'),
      type: type,
      completionTotal: 0,
      completionDone: 0,
      url: object.get("url"),
      attempts: 0
    };
  },



  /**
   * Gets the unit teacher performance data for a specific class and course.
   * @param classId
   * @param courseId
   * @param students
   * @param options
   * @returns {Promise.<UnitPerformance[]>}
   */
  findClassPerformance: function (classId, courseId, students, options = {collectionType: 'assessment'}) {
    const service = this;
    service.get('store').unloadAll('performance/student-performance');
    service.get('store').unloadAll('performance/class-unit-performance');
    return service.get('store').queryRecord('performance/class-unit-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId
    }).then(function (unitPerformance) {
      return service.matchStudentsWithPerformances(students, unitPerformance);
    });
  },

  /**
   * Gets the lesson teacher performance data for a specific class, course and unit.
   * @param classId
   * @param courseId
   * @param unitId
   * @param students
   * @param options
   * @returns {Promise.<LessonPerformance[]>}
   */
  findClassPerformanceByUnit: function (classId, courseId, unitId, students, options = {collectionType: 'assessment'}) {
    const service = this;
    service.get('store').unloadAll('performance/student-performance');
    service.get('store').unloadAll('performance/class-lesson-performance');
    return service.get('store').queryRecord('performance/class-lesson-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    }).then(function (lessonPerformances) {
      return service.matchStudentsWithPerformances(students, lessonPerformances);
    });
  },

  /**
   * Gets the lesson teacher performance data for a specific class, course and unit.
   * @param classId
   * @param courseId
   * @param unitId
   * @param students
   * @param options
   * @returns {Promise.<ClassLessonPerformance[]>}
   */
  findCourseMapPerformanceByUnit: function(classId, courseId, unitId, options = { collectionType: 'assessment' }) {
    const service = this;
    service.get('store').unloadAll('performance/student-performance');
    service.get('store').unloadAll('performance/class-lesson-performance');
    return service.get('store').queryRecord('performance/class-lesson-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    }).then(function(lessonPerformances) {
      return lessonPerformances;
    });
  },

  /**
   * Gets the collection teacher performance data for a specific class, course, unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @param students
   * @param options
   * @returns {Promise.<CollectionPerformance[]>}
   */
  findClassPerformanceByUnitAndLesson: function (classId, courseId, unitId, lessonId, students, options = {collectionType: 'assessment'}) {
    const service = this;
    service.get('store').unloadAll('performance/student-performance');
    service.get('store').unloadAll('performance/class-collection-performance');
    return service.get('store').queryRecord('performance/class-collection-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function (collectionPerformances) {
      return service.matchStudentsWithPerformances(students, collectionPerformances);
    });
  },

  /**
   **  Gets the collection teacher performance data for a specific class, course, unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @param options
   * @returns {Promise.<ClassCollectionPerformance[]>}
   */
  findCourseMapPerformanceByUnitAndLesson: function(classId, courseId, unitId, lessonId, options = { collectionType: 'assessment' }) {
    const service = this;
    service.get('store').unloadAll('performance/student-performance');
    service.get('store').unloadAll('performance/class-collection-performance');
    return service.get('store').queryRecord('performance/class-collection-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function(collectionPerformances) {
      return collectionPerformances;
    });
  },

  matchStudentsWithPerformances: function(students, classPerformance) {
    const service = this;
    const studentPerformanceData = classPerformance.get('studentPerformanceData');
    let matchedStudentPerformanceData = students.map(function(student) {
      let studentPerformance = studentPerformanceData.findBy('user.id', student.get('id'));
      if (studentPerformance) {
        studentPerformance.set('user', service.getUserRecord(student));
      } else {
        studentPerformance = service.getStudentPerformanceRecord(student);
      }
      return studentPerformance;
    });
    classPerformance.set('studentPerformanceData', matchedStudentPerformanceData);
    return classPerformance;
  },

  getStudentPerformanceRecord: function(student) {
    const service = this;
    let studentPerformance = service.getRecord('performance/student-performance', student.get('id'));
    studentPerformance.set('user', service.getUserRecord(student));
    return studentPerformance;
  },

  getUserRecord: function(user) {
    const service = this;
    let userRecord = service.getRecord('user/user', user.get('id'));
    userRecord.set('username', user.get('username'));
    userRecord.set('firstName', user.get('firstName'));
    userRecord.set('lastName', user.get('lastName'));
    return userRecord;
  },

  getRecord: function(modelName, id) {
    const store = this.get('store');
    const found = store.recordIsLoaded(modelName, id);
    return (found) ? store.recordForId(modelName, id) : store.createRecord(modelName, { id: id });
  }

});
