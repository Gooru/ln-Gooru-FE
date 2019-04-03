import gruTwoTierHeaderTable from 'gooru-web/components/gru-two-tier-header-table';
import Ember from 'ember';

export default gruTwoTierHeaderTable.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['-1'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.classNames[1] = 'gru-two-tier-header-table-1';
  },
  resourceCount: 1,
  /**
   * Shifted first column to end, in the sort
   */
  sortedData: Ember.computed('data.length', 'sortCriteria', function() {
    let sortedDataSrc = this._super('sortedData');
    let sortedData = Ember.copy(sortedDataSrc, true);
    let avgScore = 0;

    sortedData.map(ctx => ctx.content.push(ctx.content.shift()));
    let averages = new Array(sortedData[0].content.length);
    sortedData.map(
      ctx => (avgScore += ctx.content[ctx.content.length - 1].value)
    );

    sortedData.map(ctx => {
      ctx.content.map(
        (content, idx) =>
          (averages[idx] = averages[idx]
            ? averages[idx] + content.value
            : content.value)
      );
      avgScore += ctx.content[ctx.content.length - 1].value;
    });
    avgScore = avgScore / sortedData.length;

    this.set('avgScore', `${Math.round(avgScore)}%`);
    Ember.set(this, 'averages', averages);
    return sortedData;
  }),

  avgScore: null,
  averages: [],
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
      var selectors = [];
      let offsetStr = '-2'; // -2 show only score , -1 score  and time, 0 score and reaction
      if (this.isCollectionType) {
        offsetStr = '-1';
      } else {
        offsetStr = '-2';
      }

      selectors.push('table tr.second-tier th.correct');
      selectors.push(`table tr.data td:nth-child(3n${offsetStr})`);
      var cssSelector = selectors.join(',');
      this.$(cssSelector).removeClass('hidden');
      let innerSpan = this.$(cssSelector).find('span > span.score');
      var that = this;

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

      let scoreCol = $('table tr.second-tier th.correct:last >span');
      let icn = scoreCol.find('i'),
        lbl = scoreCol.find('div');
      icn.css('display', 'none');
      lbl.removeClass('hidden');
    }
  )
});
