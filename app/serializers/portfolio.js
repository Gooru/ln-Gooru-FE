import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import { DEFAULT_IMAGES, CONTENT_TYPES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Object.extend(ConfigurationMixin, {
  taxonomySerializer: null,

  session: Ember.inject.service('session'),

  init: function() {
    this._super(...arguments);
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  serializePortfolioItems(portfolioItems = {}, contentType) {
    const serializer = this;
    let serializedPortfolioItems = Ember.A([]);
    if (Ember.isArray(portfolioItems.usageData) || portfolioItems.usageData) {
      let learningActivities = portfolioItems.usageData;
      if (contentType === CONTENT_TYPES.OFFLINE_ACTIVITY) {
        const availableSubTypes = Object.keys(learningActivities);
        availableSubTypes.map(subType => {
          learningActivities[`${subType}`].map(learningActivity => {
            serializedPortfolioItems[`${subType}`] =
              serializedPortfolioItems[`${subType}`] || Ember.A([]);
            serializedPortfolioItems[`${subType}`].pushObject(
              serializer.serializePortfolioItem(learningActivity)
            );
          });
        });
      } else {
        learningActivities.map(learningActivity => {
          serializedPortfolioItems.pushObject(
            serializer.serializePortfolioItem(learningActivity)
          );
        });
      }
    }
    return serializedPortfolioItems;
  },

  serializePortfolioItem(content) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const contentType = content.type;
    let serializedPortfolioItem = Ember.Object.create({});
    if (content) {
      let thumbnailUrl = content.thumbnail ? basePath : appRootPath;
      let imageLoc = content.thumbnail || '';
      if (!content.thumbnail) {
        imageLoc = contentType.includes(CONTENT_TYPES.ASSESSMENT)
          ? DEFAULT_IMAGES.ASSESSMENT
          : contentType === CONTENT_TYPES.OFFLINE_ACTIVITY
            ? DEFAULT_IMAGES.OFFLINE_ACTIVITY
            : DEFAULT_IMAGES.COLLECTION;
      }
      serializedPortfolioItem = Ember.Object.create({
        activityTimestamp: content.activityTimestamp,
        contentSource: content.contentSource,
        efficacy: content.efficacy,
        engagement: content.engagement,
        gradingStatus: content.gradingStatus,
        gutCodes: content.gutCodes,
        id: content.id,
        learningObjective: content.learningObjective,
        lastSessionId: content.sessionId,
        masterySummary: content.masterySummary,
        maxScore: content.maxScore,
        questionCount: content.questionCount,
        resourceCount: content.resourceCount,
        relevance: content.relevance,
        score: content.score,
        status: content.status,
        subType: content.subType,
        taskCount: content.taskCount,
        taxonomy: serializer
          .get('taxonomySerializer')
          .normalizeTaxonomyObject(content.taxonomy),
        thumbnailUrl: thumbnailUrl + imageLoc,
        timespent: content.timespent,
        title: content.title,
        type: content.type
      });
    }
    return serializedPortfolioItem;
  }
});
