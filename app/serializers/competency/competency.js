import Ember from 'ember';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer for Competency endpoints
 *
 * @typedef {Object} CompetencySerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  /**
   * Normalized data of user competencies
   * @return {Object}
   */
  normalizeUserCompetencies: function(response) {
    let resultSet = Ember.A();
    response = Ember.A(response.competencyList);
    response.forEach(data => {
      let result = Ember.Object.create(data);
      resultSet.pushObject(result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user performance competency collections
   * @return {Object}
   */
  normalizeUserPerformanceCompetencyCollections: function(response) {
    let resultSet = Ember.A();
    if (response) {
      response = Ember.A(response.collections);
      response.forEach(data => {
        let result = Ember.Object.create(data);
        resultSet.pushObject(result);
      });
    }
    return resultSet;
  },

  /**
   * Normalized data of  competency matrix coordinates
   * @return {Object}
   */
  normalizeCompetencyMatrixCoordinates: function(response) {
    let resultSet = Ember.Object.create(response);
    Object.keys(response).forEach(key => {
      let result = Ember.A();
      resultSet.get(key).forEach(data => {
        result.pushObject(Ember.Object.create(data));
      });
      resultSet.set(key, result);
    });
    return resultSet;
  },

  /**
   * Normalized data of user course competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrixCourse: function(response) {
    let resultSet = Ember.A();
    let courses = Ember.A();
    if (response.userCompetencyMatrix) {
      let userCourseCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
      userCourseCompetencyMatrix.forEach(courseData => {
        let course = Ember.Object.create(courseData);
        let competencies = course.get('competencies');
        let competencySet = Ember.A();
        competencies.forEach(data => {
          let competency = Ember.Object.create(data);
          competencySet.pushObject(competency);
        });
        course.set('competencies', competencySet);
        courses.pushObject(course);
      });
    }
    resultSet = {
      courses: courses,
      lastUpdated: response.lastUpdated || null
    };
    return resultSet;
  },
  /**
   * Normalized data of signature content competencies
   * @return {Object}
   */
  normalizeSignatureCompetencies: function(response) {
    return response;
  },

  /**
   * Normalized data of user  domain competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrixDomain: function(response) {
    let resultSet = Ember.A();
    let domains = Ember.A();
    let lastUpdated = null;
    if (response && response.userCompetencyMatrix) {
      let userCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
      lastUpdated = response.lastUpdated || response.createdAt;
      userCompetencyMatrix.forEach(domainData => {
        let domain = Ember.Object.create(domainData);
        let competencies = domain.get('competencies');
        let competencySet = Ember.A();
        competencies.forEach(data => {
          competencySet.pushObject(Ember.Object.create(data));
        });
        domain.set('competencies', competencySet);
        domains.pushObject(domain);
      });
    }
    resultSet = {
      domains,
      lastUpdated
    };
    return resultSet;
  },

  /**
   * Normalized data of competency matrix
   * @return {Object}
   */
  normalizeCompetencyMatrix: function(response) {
    let resultSet = Ember.A();
    if (response.userCompetencyMatrix) {
      let userCompetencyMatrix = Ember.A(response.userCompetencyMatrix);
      userCompetencyMatrix.forEach(courseData => {
        let course = Ember.Object.create(courseData);
        let domains = course.get('domains');
        let domainSet = Ember.A();
        domains.forEach(domainData => {
          let domain = Ember.Object.create(domainData);
          let competencies = domain.get('competencies');
          let competencySet = Ember.A();
          competencies.forEach(competencyData => {
            let competency = Ember.Object.create(competencyData);
            competencySet.pushObject(competency);
          });
          domain.set('competencies', competencySet);
          domainSet.pushObject(domain);
        });
        course.set('domains', domainSet);
        resultSet.pushObject(course);
      });
    }
    return resultSet;
  },

  /**
   * @function normalizeDomainsCompletionReport
   */
  normalizeDomainsCompletionReport(payload) {
    const serializer = this;
    let normalizedCompletionReportData = Ember.Object.create({
      membersCount: 0,
      domainsData: Ember.A([])
    });
    if (payload) {
      let normalizedDomainsCompletionData = Ember.A([]);
      let domainsCompletionData = payload.domains || payload.dmns;
      domainsCompletionData.map(domainCompletionData => {
        let domainCompletionDomainInfo =
          domainCompletionData.domain || domainCompletionData.d;
        let domainData = Ember.Object.create({
          completionPercentage:
            domainCompletionData.average_completions ||
            domainCompletionData.avg ||
            0,
          domainCode:
            domainCompletionDomainInfo.tx_domain_code ||
            domainCompletionDomainInfo.dc,
          domainName:
            domainCompletionDomainInfo.tx_domain_name ||
            domainCompletionDomainInfo.dn,
          domainSeq:
            domainCompletionDomainInfo.tx_domain_seq ||
            domainCompletionDomainInfo.seq,
          competenciesData: serializer.serializeCompetencyCompletionData(
            domainCompletionData.competencies || domainCompletionData.tx
          )
        });
        normalizedDomainsCompletionData.pushObject(domainData);
      });
      normalizedCompletionReportData.set(
        'membersCount',
        payload.member_count || payload.cmc
      );
      normalizedCompletionReportData.set(
        'domainsData',
        normalizedDomainsCompletionData
      );
    }
    return normalizedCompletionReportData;
  },

  /**
   * @function normalizeCompetencyCompletionReport
   */
  serializeCompetencyCompletionData(competenciesData) {
    let normalizedCompetencyCompletionReport = Ember.A([]);
    if (competenciesData) {
      competenciesData.map(competencyCompletionData => {
        let competencyData = Ember.Object.create({
          competencyCode:
            competencyCompletionData.tx_comp_code ||
            competencyCompletionData.gc,
          competencyName:
            competencyCompletionData.tx_comp_name ||
            competencyCompletionData.nm,
          competencyDesc:
            competencyCompletionData.tx_comp_desc ||
            competencyCompletionData.ds,
          completionPercentage:
            competencyCompletionData.completions ||
            competencyCompletionData.pc ||
            0
        });
        normalizedCompetencyCompletionReport.pushObject(competencyData);
      });
    }
    return normalizedCompetencyCompletionReport;
  },

  /**
   * @function normalizeUsersCompetencyPerformanceSummary
   */
  normalizeUsersCompetencyPerformanceSummary(payload) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.user');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    let normalizedUsersCompetencyPerformanceSummary = Ember.A([]);
    let usersPerformanceSummaryList = (payload && (payload.users || payload.us)) || Ember.A([]);
    if (usersPerformanceSummaryList) {
      usersPerformanceSummaryList.map(userPerformanceSummary => {
        let userData = userPerformanceSummary.user || userPerformanceSummary.u;
        let userThumbnail = userData.thumbnail || userData.th;
        let thumbnail = userThumbnail
          ? basePath + userThumbnail
          : appRootPath + DEFAULT_IMAGES.USER_PROFILE;
        let userPerformanceData = Ember.Object.create({
          id: userData.id,
          firstName: userData.first_name || userData.fn,
          lastName: userData.last_name || userData.ln,
          thumbnail,
          score: userPerformanceSummary.score || userPerformanceSummary.sc || 0,
          status: userPerformanceSummary.status || userPerformanceSummary.st
        });
        normalizedUsersCompetencyPerformanceSummary.pushObject(
          userPerformanceData
        );
      });
    }
    return normalizedUsersCompetencyPerformanceSummary;
  }
});
