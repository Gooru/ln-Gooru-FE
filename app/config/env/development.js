/*
 Development Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "http://nile-dev.gooru.org",
    "secureUrl": "https://nile-dev.gooru.org",
    "tenantUrl": "http://s3-us-west-1.amazonaws.com/nile-tenants/dev"
  },

  "realTime": {
    "webServiceUrl": "http://nile-dev.gooru.org",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://rt.nile-dev.gooru.org",
    "webSocketUri": "/ws/realtime"
  },

  "teams": {
    "url": "http://teams-qa.gooru.org"
  },

  "player": {
    "resources":{
      "pdf": {
        "googleDriveEnable": false,
        "googleDriveUrl":"https://docs.google.com/gview?url="
      }
    }
  },

  "themes": {
    "bergen": {
      "player": {
        "narration": {
          "highlightColor": "#C1E7D9"
        }
      }
    }
  },

  "quizzes-addon": {
    "endpoint" : {
      "url": "http://nile-dev.gooru.org",
      "secureUrl": "https://nile-dev.gooru.org",
      "providerUrl": "http://nile-dev.gooru.org"
    },

    "realTime": {
      "webServiceUrl": "https://nile-dev.gooru.org",
      "webServiceUri": "/",
      "webSocketUrl": "https://nile-dev.gooru.org",
      "webSocketUri": "/ws/quizzes-realtime"
    }
  },

  "exploreFeaturedCourses": {
    "firstCourseId": "1d91657f-694b-43dc-9306-bca17b107c7d",
    "secondCourseId": "3def51be-bd91-48fd-b747-9c86339b571a"
  }
};
