import Ember from 'ember';

/**
 * Serializer for Competency endpoints
 *
 * @typedef {Object} CompetencySerializer
 */
export default Ember.Object.extend({
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
    let normalizedCompletionReportData = Ember.Object.create({
      membersCount: 0,
      domainsData: Ember.A([])
    });
    if (payload) {
      let normalizedDomainsCompletionData = Ember.A([]);
      let domainsCompletionData = payload.domains || payload.dmns;
      domainsCompletionData.map( domainCompletionData => {
        let domainCompletionDomainInfo = domainCompletionData.domain || domainCompletionData.d;
        let domainData = Ember.Object.create({
          completionPercentage: domainCompletionData.average_completions || domainCompletionData.avg || 0,
          domainCode: domainCompletionDomainInfo.tx_domain_code || domainCompletionDomainInfo.dc,
          domainName: domainCompletionDomainInfo.tx_domain_name || domainCompletionDomainInfo.dn,
          domainSeq: domainCompletionDomainInfo.tx_domain_seq || domainCompletionDomainInfo.seq
        });
        normalizedDomainsCompletionData.pushObject(domainData);
      });
      normalizedCompletionReportData.set('membersCount', payload.member_count || payload.cmc);
      normalizedCompletionReportData.set('domainsData', normalizedDomainsCompletionData);
    }
    return normalizedCompletionReportData;
  },

  /**
   * @function normalizeCompetencyCompletionReport
   */
  normalizeCompetencyCompletionReport(payload) {
    // payload = {
    //           	'competencies': [{
    //           		'fw_comp_code': 'SBMH.K12IN.MA-MA5-FD-F.01',
    //           		'tx_comp_code': 'K12IN.MA-MA5-FD-F.01',
    //           		'tx_comp_name': 'performs the four operations on fractions',
    //           		'completions': 35
    //           	}, {
    //           		'fw_comp_code': 'SBMH.K12IN.MA-MA4-FD-D.01',
    //           		'tx_comp_code': 'K12IN.MA-MA4-FD-D.01',
    //           		'tx_comp_name': 'compares and orders unit fractions',
    //           		'completions': 70
    //           	}]
    // };
    let normalizedCompetencyCompletionReport = Ember.A([]);
    if (payload) {
      let completenciesCompletionData = payload.competencies || payload.tx;
      completenciesCompletionData.map( competencyCompletionData => {
        let competencyData = Ember.Object.create({
          frameworkCompetencyCode: competencyCompletionData.fw_comp_code || competencyCompletionData.fc,
          competencyCode: competencyCompletionData.tx_comp_code || competencyCompletionData.gc,
          competencyName: competencyCompletionData.tx_comp_name || competencyCompletionData.nm,
          completionPercentage: competencyCompletionData.completions || competencyCompletionData.avg  || 0
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
    let normalizedUsersCompetencyPerformanceSummary = Ember.A([]);
    // payload = [{
    //            	'user': {
    //            		'id': 'aa4532d6-fd7c-4efd-89be-c99c8b6ebbc0',
    //            		'first_name': 'Lena',
    //            		'last_name': 'Peterson',
    //            		'thumbnail': '//usercdn.gooru.org/952a2654-f016-468e-b3c3-619e338ebf6a.png'
    //            	},
    //            	'score': 67,
    //            	'status': 4
    // }, {
    //            	'user': {
    //            		'id': 'e7895bfe-88e8-4e20-a254-727153688203',
    //            		'first_name': 'Julian',
    //            		'last_name': 'Todd',
    //            		'thumbnail': '//usercdn.gooru.org/952a2654-f016-468e-b3c3-619e338ebf6a.png'
    //            	},
    //            	'status': 1
    // }];
    if (payload) {
      payload.map( userPerformanceSummary => {
        let userData = userPerformanceSummary.user || userPerformanceSummary.u;
        let userPerformanceData = Ember.Object.create({
          id: userData.id,
          firstName: userData.first_name || userData.fn,
          lastName: userData.last_name || userData.ln,
          thumbnail: userData.thumbnail || userData.th,
          score: userPerformanceSummary.score || userPerformanceSummary.sc || 0,
          status: userPerformanceSummary.status || userPerformanceSummary.st
        });
        normalizedUsersCompetencyPerformanceSummary.pushObject(userPerformanceData);
      });
    }
    return normalizedUsersCompetencyPerformanceSummary;
  }
});
