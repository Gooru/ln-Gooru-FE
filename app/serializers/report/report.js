import Ember from 'ember';
import DS from 'ember-data';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default DS.JSONAPISerializer.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * @function normalizeStudentsSummaryReport
   * Method to normalize students summary report data
   */
  normalizeStudentsSummaryReport(payload) {
    const serializer = this;
    let studentsSummaryData = payload.students;
    let serializedStudentsSumaryReportData = Ember.A([]);
    studentsSummaryData.map(studentSummaryData => {
      let normalizedStudentData = serializer.serializeStudentData(
        studentSummaryData.student
      );
      let normalizedSummaryData = serializer.serializeSummaryData(
        studentSummaryData.summaryData.allTime
      );
      serializedStudentsSumaryReportData.pushObject(
        Ember.Object.create({
          student: normalizedStudentData,
          summaryData: normalizedSummaryData
        })
      );
    });
    return Ember.Object.create({
      class: payload.class,
      course: payload.course,
      studentsSummaryData: serializedStudentsSumaryReportData,
      teacher: payload.teacher
    });
  },

  /**
   * @function normalizeStudentsWeeklySummaryReport
   * Method to normalize students weekly summary report
   */
  normalizeStudentsWeeklySummaryReport(payload) {
    const serializer = this;
    let studentsSummaryData = payload.students;
    let serializedStudentsSumaryReportData = Ember.A([]);
    studentsSummaryData.map(studentSummaryData => {
      let normalizedStudentData = serializer.serializeStudentData(
        studentSummaryData.student
      );
      let normalizedSummaryData = serializer.serializeSummaryData(
        studentSummaryData.summaryData.weekOf
      );
      serializedStudentsSumaryReportData.pushObject(
        Ember.Object.create({
          student: normalizedStudentData,
          summaryData: normalizedSummaryData
        })
      );
    });
    return Ember.Object.create({
      class: payload.class,
      course: payload.course,
      studentsSummaryData: serializedStudentsSumaryReportData,
      teacher: payload.teacher
    });
  },

  /**
   * @function serializeStudentData
   * Method to serialize student's profile data
   */
  serializeStudentData(studentData) {
    const serializer = this;
    const appRootPath = serializer.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl =
      studentData.profileImage || appRootPath + DEFAULT_IMAGES.USER_PROFILE;
    return Ember.Object.create({
      email: studentData.email,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      fullName: `${studentData.lastName} ${studentData.firstName}`,
      id: studentData.id,
      thumbnailUrl
    });
  },

  /**
   * @function serializeSummaryData
   * Method to serialize student's summary data
   */
  serializeSummaryData(summaryData) {
    const serializer = this;
    let serializedSummaryData = {};
    if (summaryData) {
      serializedSummaryData = Ember.Object.create({
        masteredCompetencies: serializer.serializeCompetencies(
          summaryData.mastered,
          5
        ),
        completedCompetencies: serializer.serializeCompetencies(
          summaryData.completed,
          4
        ),
        inferredCompetencies: serializer.serializeCompetencies(
          summaryData.inferred,
          3
        ),
        inprogressCompetencies: serializer.serializeCompetencies(
          summaryData.inprogress,
          1
        ),
        interactionData: Ember.Object.create({
          assessmentData: serializer.serializeInteraction(
            summaryData.interactions
              ? summaryData.interactions.assessment
              : null
          ),
          collectionData: serializer.serializeInteraction(
            summaryData.interactions
              ? summaryData.interactions.collection
              : null
          )
        }),
        suggestionData: Ember.Object.create({
          assessmentData: serializer.serializeInteraction(
            summaryData.suggestions ? summaryData.suggestions.assessment : null
          ),
          collectionData: serializer.serializeInteraction(
            summaryData.suggestions ? summaryData.suggestions.collection : null
          )
        }),
        startDate: summaryData.startDate,
        endDate: summaryData.endDate
      });
    }
    return serializedSummaryData;
  },

  /**
   * @function serializeInteraction
   * Method to serialize interaction contents
   */
  serializeInteraction(interactionData) {
    let serializedInteracitonData = Ember.Object.create({
      averageScore: 0,
      count: 0,
      sessionsCount: 0,
      totalMaxScore: 0,
      totalTimespent: 0,
      isNotStarted: true
    });
    if (interactionData) {
      serializedInteracitonData.set(
        'averageScore',
        interactionData.averageScore
      );
      serializedInteracitonData.set('count', interactionData.count);
      serializedInteracitonData.set(
        'sessionsCount',
        interactionData.sessionsCount
      );
      serializedInteracitonData.set(
        'totalMaxScore',
        interactionData.totalMaxScore
      );
      serializedInteracitonData.set(
        'totalTimespent',
        interactionData.totalTimespent
      );
      serializedInteracitonData.set('isNotStarted', false);
    }
    return serializedInteracitonData;
  },

  serializeCompetencies(competencies, status) {
    return competencies.map(competency => {
      return Ember.Object.create({
        id: competency.id,
        code: competency.code,
        status
      });
    });
  }
});
