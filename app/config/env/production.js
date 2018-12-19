/*
 Production Environment configuration properties
 */
export default {
  appRootPath: '/', //default is root
  endpoint: {
    url: 'https://gooru.org',
    secureUrl: 'https://gooru.org',
    tenantUrl: 'https://s3-us-west-1.amazonaws.com/nile-tenants/prod'
  },

  realTime: {
    webServiceUrl: 'https://gooru.org',
    webServiceUri: '/nucleus/realtime',
    webSocketUrl: 'https://rt.gooru.org',
    webSocketUri: '/ws/realtime'
  },

  teams: {
    url: 'http://teams.gooru.org'
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
      url: 'http://gooru.org',
      secureUrl: 'https://gooru.org',
      providerUrl: 'http://gooru.org'
    },

    realTime: {
      webServiceUrl: 'https://gooru.org',
      webServiceUri: '/',
      webSocketUrl: 'https://gooru.org',
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
    url: 'http://research.gooru.org/'
  },

  userAlert: {
    message:
      'Server maintenance planned on 20 Dec 2019 from 10:00AM to 1:00PM IST. Please plan your work accordingly.'
  },

  demoClass: {
    code: 'DGNTIKN',
    id: '71bfbc07-1b87-4e8e-a98a-1839e834cd20'
  }
};
