import gruTwoTierHeaderTable from 'gooru-web/components/gru-two-tier-header-table';
import Ember from 'ember';

export default gruTwoTierHeaderTable.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['-1'],
  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    this.classNames[1] = 'gru-two-tier-header-table-1';
  },
  resourceCount: 1,

  caAverage: Ember.computed('data.length', 'sortCriteria', function() {
    let cavg = this.get('sortedData')[0].content.length - 1;
    return cavg - 1;
  }),

  /**
   * Set default visibility to
   */
  updateColumnVisibility: Ember.observer(
    'secondTierHeaders.@each.visible',
    function() {
      //this._super(...arguments);

      var selectors = [];
      let offsetStr = '-2'; // -2 show only score , -1 score  and time, 0 score and reaction
      if (this.isCollectionType) {
        offsetStr = '-0';
      } else {
        offsetStr = '-1';
      }

      selectors.push('table tr.second-tier th.correct');
      selectors.push(`table tr.data td:nth-child(3n${offsetStr})`);
      var cssSelector = selectors.join(',');
      this.$(cssSelector).removeClass('hidden');
      var that = this;

      if (this.isCollectionType) {
        let scoreCol = $('table tr.second-tier th.correct:first >span');
        let icn = scoreCol.find('i'),
          lbl = scoreCol.find('div');
        icn.css('display', 'none');
        lbl.removeClass('hidden');
        let tsColTitle = this.get('i18n').t('gru-data-picker.timeSpent').string;
        lbl.text(tsColTitle);
      } else {
        //Applicable to score i.e. questions
        let innerSpan = this.$(cssSelector).find('span > span.score');

        innerSpan.map((idx, spn) => {
          that.resourceCount += 1;

          if (
            spn &&
            ($(spn).text() === '' ||
              $(spn).text() === null ||
              $(spn).text() === 'ic_done_all' ||
              $(spn).text() === 'clear')
          ) {
            $(spn).text(that.resourceCount);
            if (that.resourceCount % 5 === 0) {
              $(spn).addClass('fifth-col');
            }
          } else {
            that.resourceCount = 0;
          }
        });

        if (innerSpan.text() === '' || innerSpan.text() === null) {
          innerSpan.text(this.resourceCount);
        } else {
          this.resourceCount = 0;
        }

        let scoreCol = $('table tr.second-tier th.correct:first >span');
        let icn = scoreCol.find('i'),
          lbl = scoreCol.find('div');
        icn.css('display', 'none');
        lbl.removeClass('hidden');
      }
    }
  )
});
