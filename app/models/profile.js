import DS from "ember-data";

/**
 * Model to represent the Profiles objects with the User information
 */
export default DS.Model.extend({

  /**
   * @property {string} profileId
   */
  profileId: DS.attr("string"),
  /**
   * @property {string} aboutMe
   */
  aboutMe: DS.attr("string"),
  /**
   * @property {User} user
   */
  user: DS.belongsTo("user", { async: true })

});
