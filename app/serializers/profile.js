import DS from "ember-data";

export default DS.JSONAPISerializer.extend({


  normalizeSingleResponse: function(store, primaryModelClass, payload) {

    // TODO: Remove static values from followers and followings
    var profileModel = {
      data: {
        type: "profile",
        id: payload.profileId,
        attributes: {
          profileId: payload.profileId,
          aboutMe: payload.aboutMe,
          followers: 736,
          followings: 566
        },
        relationships: {
          user: {
            data: {
              type: "user/user",
              id: payload.user.gooruUId
            }
          }
        }
      },
      included: [{
        type: "user/user",
        id: payload.user.gooruUId,
        attributes: {
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          avatarUrl: payload.user.profileImageUrl
        },
        relationships: {
          metadata: {
            data: {
              type: "meta",
              id: "meta_" + payload.user.gooruUId
            }
          }
        }
      }, {
        type: "meta",
        id: "meta_" + payload.user.gooruUId,
        attributes: {
          isFeaturedUser: payload.user.meta.isFeaturedUser
        },
        relationships: {
          taxonomyPreference: {
            data: {
              type: "taxonomy-preference",
              id: "taxonomy_" + payload.user.gooruUId
            }
          }
        }
      }, {
        type: "taxonomy-preference",
        id: "taxonomy_" + payload.user.gooruUId,
        attributes: {
          codeId: payload.user.meta.taxonomyPreference.codeId,
          code:payload.user.meta.taxonomyPreference.code
        }
      }]
    };
    store.pushPayload(profileModel);

    return profileModel;
  }

});
