import Ember from 'ember';
import { DEFAULT_IMAGES, CONTENT_TYPES } from 'gooru-web/config/config';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

export default Ember.Object.extend(ConfigurationMixin, {
  session: Ember.inject.service('session'),

  fetchInClass: function(data) {
    data.pathType = 'route0';
    data.pathId = null;
    return data;
  },

  normalizeFetch: function(data) {
    data.pathType = 'route0';
    let result = Ember.Object.create({
      status: data.status,
      pathType: 'route0'
    });
    let route0Content = Ember.Object.create({
      units: Ember.A([])
    });
    const basePath = this.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath

    if (data && data.route0Content && data.route0Content.units) {
      let units = Ember.A([]);
      data.route0Content.units.forEach(function(unit) {
        unit.pathType = 'route0';
        unit.id = unit.unitId;
        let unitData = Ember.Object.create(unit);
        units.pushObject(unitData);
        let lessons = Ember.A([]);
        unit.lessons.forEach(function(lesson) {
          lesson.id = lesson.lessonId;
          lesson.pathType = 'route0';
          let lessonData = Ember.Object.create(lesson);
          lessons.pushObject(lessonData);
          let collections = Ember.A([]);
          lesson.collections.forEach(function(col) {
            const defaultImage = col.collectionType.includes(
              CONTENT_TYPES.COLLECTION
            )
              ? DEFAULT_IMAGES.COLLECTION
              : DEFAULT_IMAGES.ASSESSMENT;
            const thumbnailUrl = col.thumbnail
              ? basePath + col.thumbnail
              : appRootPath + defaultImage;
            col.pathType = 'route0';
            col.pathId = col.pathId;
            col.thumbnailUrl = thumbnailUrl;
            let colData = Ember.Object.create(col);
            collections.pushObject(colData);
          });
          lessonData.set('collections', collections);
        });
        unitData.set('lessons', lessons);
      });
      route0Content.set('units', units);
    }
    result.set('route0Content', route0Content);
    return result;
  },
  updateRouteAction: function(data) {
    return data;
  }
});
