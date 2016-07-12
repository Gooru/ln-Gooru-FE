import Ember from 'ember';
/**
 * User Network card
 *
 * Component responsible of showing the user network information in cards, so that most useful information is summarized there.
 * @module
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-user-network-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    unFollow:function(){
      var component = this;
      var user = component.get('user');
      component.set('isFollowing', false);
      component.sendAction("onUnFollowUser", user);
    },

    setFollow:function(){
      var component = this;
      var user = component.get('user');
      component.set('isFollowing', true);
      component.sendAction("onFollowUser", user);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {User} user
   */
  user: null,

  /**
   * @property {Number} counter of user followers
   */
  countFollowers: Ember.computed.alias("user.followers"),

  isFollowing: Ember.computed('user',function(){
    let user = this.get('user');
    return this.get('myFollowings').findBy('id',user.id);
  })

});
