/*
 Development Environment configuration properties
 */
export default {
  appRootPath: '/', //default is root
  endpoint: {
    url: 'http://staging.gooru.org',
    secureUrl: 'https://staging.gooru.org',
    tenantUrl: 'http://s3-us-west-1.amazonaws.com/nile-tenants/dev'
  },

  realTime: {
    webServiceUrl: 'https://staging.gooru.org',
    webServiceUri: 'https://staging.gooru.org/',
    webSocketUrl: 'https://rt-stag.gooru.org',
    webSocketUri: '/ws/quizzes-realtime'
  },

  teams: {
    url: 'http://teams-qa.gooru.org'
  },

  player: {
    resources: {
      pdf: {
        googleDriveEnable: false,
        googleDriveUrl: 'https://docs.google.com/gview?url='
      }
    }
  },

  themes: {
    bergen: {
      player: {
        narration: {
          highlightColor: '#C1E7D9'
        }
      }
    }
  },

  'quizzes-addon': {
    endpoint: {
      url: 'http://staging.gooru.org',
      secureUrl: 'https://staging.gooru.org',
      providerUrl: 'http://staging.gooru.org'
    },

    realTime: {
      webServiceUrl: 'https://staging.gooru.org',
      webServiceUri: '/',
      webSocketUrl: 'https://rt-stag.gooru.org',
      webSocketUri: '/ws/quizzes-realtime'
    }
  },

  exploreFeaturedCourses: {
    firstCourseId: '1d91657f-694b-43dc-9306-bca17b107c7d',
    secondCourseId: '3def51be-bd91-48fd-b747-9c86339b571a',
    thirdCourseId: 'd9b7c359-adff-486d-a2cf-bbbbc66c2ba5',
    fourthCourseId: '781c3e76-a382-4652-86ae-079b92f57a9d'
  },

  languageSetting: {
    defaultLang: 'en',
    showDropMenu: true
  },

  researcher: {
    redirectURL: 'http://research-dev.gooru.org',
    userIds: [
      '95a744e1-631e-4642-875d-8b07a5e3b421',
      'df956d5f-b7b2-43ae-98a1-c90a12eacaf9'
    ]
  },

  userAlert: {
    message: null
  },

  demoClass: {
    code: 'FZRC834',
    id: '002b0b27-1b51-4343-a51f-76fae80534f8'
  },

  GRU_FEATURE_FLAG: {
    searchFilter: true,
    enableCollectionLiveLearning: true
  }
};
