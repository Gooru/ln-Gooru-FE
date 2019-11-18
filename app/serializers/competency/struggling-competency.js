import Ember from 'ember';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  normalizeStrugglingCompetency(payload) {
    let serialize = this;
    let strugglingCompetency = payload.struggling_competencies
      ? payload.struggling_competencies
      : [];
    let strugglingCompetencyPayload = [];
    if (strugglingCompetency && strugglingCompetency.length) {
      strugglingCompetency.forEach(grade => {
        strugglingCompetencyPayload.pushObject(
          Ember.Object.create({
            gradeId: grade.grade_id,
            grade: grade.grade,
            gradeSeq: grade.grade_Seq,
            description: grade.description,
            fwCode: grade.fw_code,
            domains: serialize.normalizeDomain(grade.domains)
          })
        );
      });
    }
    return strugglingCompetencyPayload;
  },

  normalizeDomain(payload) {
    let domains = payload ? payload : null;
    let domainList = [];
    if (domains && domains.length) {
      domains.map(domain => {
        domainList.pushObject(
          Ember.Object.create({
            competencies: this.normalizeCompetency(domain.competencies),
            domainCode: domain.domain_code,
            domainId: domain.domain_id,
            domainName: domain.domain_name,
            domainSeq: domain.domain_seq
          })
        );
      });
    }
    return domainList;
  },

  normalizeCompetency(payload) {
    let competencies = payload ? payload : null;
    let competencyList = [];
    if (competencies && competencies.length) {
      competencies.map(competency => {
        competencyList.pushObject(
          Ember.Object.create({
            code: competency.comp_code,
            displayCode: competency.comp_display_code,
            name: competency.comp_name,
            sequence: competency.comp_seq,
            studentsDescription: competency.comp_student_desc,
            studentsCount: competency.student_count
          })
        );
      });
    }
    return competencyList.length
      ? competencyList.sortBy('studentsCount').reverse()
      : competencyList;
  },

  normalizeStudentsPerfomance(payload) {
    const basePath = this.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    let students = payload.students ? payload.students : [];
    let studentsList = [];
    if (students && students.length) {
      students.forEach(student => {
        const thumbnailUrl = student.thumbnail
          ? basePath + student.thumbnail
          : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
        studentsList.pushObject(
          Ember.Object.create({
            id: student.id,
            firstName: student.first_name,
            lastName: student.last_name,
            displayName: student.display_name,
            thumbnail: thumbnailUrl,
            username: student.username,
            performanceScore: student.performance
          })
        );
      });
    }
    return studentsList;
  }
});
