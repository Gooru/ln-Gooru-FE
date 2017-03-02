/*
 Development Environment configuration properties
 */
export default {
  "appRootPath": "/", //default is root
  "endpoint" : {
    "url": "http://nile-qa.gooru.org",
    "secureUrl": "https://nile-qa.gooru.org",
    "tenantUrl": "http://s3-us-west-1.amazonaws.com/nile-tenants/dev"
  },

  "realTime": {
    "webServiceUrl": "http://nile-qa.gooru.org",
    "webServiceUri": "/nucleus/realtime",
    "webSocketUrl": "https://rt.nile-qa.gooru.org",
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
  }
};
