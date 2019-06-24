import Ember from 'ember';
import SessionMixin from '../mixins/session';
import ModalMixin from '../mixins/modal';
import EndPointsConfig from 'gooru-web/utils/endpoint-config';
import Env from 'gooru-web/config/environment';
import { appLocales } from 'gooru-web/utils/utils';

/**
 * Application header component
 * @see application.hbs
 *
 *
 * @module
 * @typedef {object} AppHeader
 */
export default Ember.Component.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),
  //themeChanger: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-header', 'navbar-fixed-top'],

  device_language_key: 'deviceLanguage',

  /**
   * Controls display of notification list, typical use from header is to hide it as required.
   */
  displayNotificationList: null,

  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    let configLocales = appLocales(); //this.get('i18n.locales');
    var arr = Ember.A();
    configLocales.map(function(loc) {
      arr.addObject({
        id: Object.keys(loc)[0],
        text: Object.values(loc)[0]
      });
    });

    return arr;
  }),

  tagName: 'header',
  showDropMenu: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    logout: function() {
      this.sendAction('onLogout');
    },

    showLocales() {
      Ember.$('.lang-dropdown').toggle();
    },

    setLocale(selVal) {
      this.setLocale(selVal);
      this.getLocalStorage().setItem(this.device_language_key, selVal);
    },

    navigateToSupport() {
      let component = this;
      let supportUrl = component.get('supportSiteUrl');
      window.open(supportUrl, '_blank');
    },

    navigateToMarketSite() {
      let component = this;
      let marketUrl = component.get('marketingSiteUrl');
      window.open(marketUrl, '_self');
    },

    navigateToResearchApp: function() {
      let researcher = EndPointsConfig.getResearcher();
      if (researcher && researcher.redirectURL) {
        let url = `${researcher.redirectURL}/?access_token=${this.get(
          'session.token-api3'
        )}`;
        window.open(url, '_self');
      }
    },

    closeNotificationList() {
      this.set('displayNotificationList', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    if (EndPointsConfig.getLanguageSettingdropMenu() !== undefined) {
      this.set('showDropMenu', EndPointsConfig.getLanguageSettingdropMenu());
    }
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function() {
    this.set('searchErrorMessage', null);
  },

  /**
   * setLocale function
   */
  setLocale(selVal) {
    this.set('i18n.locale', selVal);
    if (selVal === 'ar') {
      const rootElement = Ember.$(Env.rootElement);
      rootElement.addClass('changeDir');
      rootElement.removeClass('changeDirDefault');
      //this.get('themeChanger').set('theme', 'goorurtl');
      Env.APP.isRTL = true;
    } else {
      const rootElement = Ember.$(Env.rootElement);
      rootElement.removeClass('changeDir');
      rootElement.addClass('changeDirDefault');
      //this.get('themeChanger').set('theme', 'goorultr');
      Env.APP.isRTL = false;
    }
  },

  getLocalStorage: function() {
    return window.localStorage;
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {?string} action to send up when a user logs out
   */
  onLogout: null,

  /**
   * @property {?string} action to send up when searching for a term
   */
  onSearch: null,

  /**
   * @property {Array} list of classes related to current user
   */
  classes: null,

  /**
   * @property {Array} list of active classes related to current user
   */
  activeClasses: Ember.computed('classes', function() {
    var classes = this.get('classes');
    return classes
      ? classes.filter(function(theClass) {
        return !theClass.get('isArchived');
      })
      : null;
  }),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Marketing site url
   * @property {string}
   */
  marketingSiteUrl: Ember.computed(function() {
    return Env.marketingSiteUrl;
  }),

  /**
   * Support site url
   * @property {string}
   */
  supportSiteUrl: Ember.computed(function() {
    return Env.supportSiteUrl;
  })

  // -------------------------------------------------------------------------
});
