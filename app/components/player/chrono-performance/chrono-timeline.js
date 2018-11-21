import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-timeline'],

  timeData: null,
  selectedIndex: 0,
  animateDirection: 'left',

  timeLineRightDate: function() {
    let todaysDate = new Date();
    return this.uiDateFormat(todaysDate);
  }.property(),

  timeLineLeftDate: function() {
    return this.uiDateFormat(this.timeData.startDate);
  }.property(),

  uiDateFormat: function(givenDate) {
    givenDate = givenDate || new Date();
    if (typeof givenDate === 'string') {
      givenDate = new Date(givenDate);
    }
    let dateLocale = 'en-us',
      dateMonth = givenDate.toLocaleString(dateLocale, { month: 'short' }),
      dateYear = givenDate.toLocaleString(dateLocale, { year: '2-digit' }),
      dateDisplay = { mon: dateMonth, year: dateYear };
    return dateDisplay;
  },

  cardDisplayConfig: {
    totalCardToDisplay: 9,
    activeDisplay: 3,
    activeSideWays: 3,
    dummyleft: [
      { collectionType: 'collection', title: null },
      { collectionType: 'collection', title: null },
      { collectionType: 'collection', title: null }
    ],
    dummyRight: {},
    assessment: { imgUrl: '', iconClass: 'grucount' },
    collection: { imgUrl: '', iconClass: 'view_comfy' }
  },

  /**
   * @description Property for getting itype icon
   */
  cardTypeClass: function(timeSession) {
    const component = this;
    return component.cardDisplayConfig[timeSession.collectionType].iconClass;
  },

  timeDataChanged: Ember.observer('timeData', function() {
    const route = this;
    Ember.run.later(function() {
      route.didInsertElement();
    });
  }),
  currentCard: null,
  displayCards: null,

  init() {
    this._super(...arguments);
    const component = this;
    component.timeData.forEach(timeSession => {
      timeSession.iconClass = component.cardTypeClass(timeSession);
    });
  },

  didInsertElement() {
    if (this.timeData && this.timeData.length > 0) {
      this.send('showCard', this.timeData[this.timeData.length - 1]);
    }
  },

  actions: {
    showCard(currentCard) {
      this.selectTimeSession(currentCard);
      this.set('currentCard', currentCard);
      this.setDisplayPack(currentCard, 0);
    },
    scrollLeft() {
      this.attrs.scrollLeft();
    },
    scrollRight() {
      this.attrs.scrollRight();
    },
    onClickRight() {
      const comp = this;
      let resv = comp.animateCard(1);
      resv.then(function() {
        let curcard = comp.get('currentCard');
        comp.selectTimeSession(curcard);
        comp.setDisplayPack(curcard, 1);
      });
      //this.$('.cards-display').carousel('next');
    },
    onClickLeft() {
      //this.$('.cards-display').carousel('next');
      const comp = this;
      let resv = this.animateCard(-1);
      resv.then(function() {
        let curcard = comp.get('currentCard');
        comp.selectTimeSession(curcard);
        comp.setDisplayPack(curcard, -1);
      });
    }
  },
  animateCard(offset) {
    const component = this;
    let curCard = this.get('currentCard');
    if (curCard) {
      let animateCompleted = new Ember.RSVP.Promise(function(resolve) {
        let tIndx = component.getOffsetCardIdx(curCard, offset),
          tSelector = `.c-${component.timeData[tIndx].sessionId}`,
          tCard = d3.selectAll(tSelector),
          tCardEl = tCard[0][0],
          tOffX = tCardEl.offsetLeft;

        let cIndx = component.getOffsetCardIdx(curCard, 0),
          cSelector = `.c-${component.timeData[cIndx].sessionId}`,
          cCard = d3.selectAll(cSelector),
          cCardEl = cCard[0][0],
          cOffX = cCardEl.offsetLeft;

        let movemnt = tOffX - cOffX;

        //console.log('cSelector', cSelector);
        let cbfunc = function() {
          resolve('done');
        };

        //console.log('movemnt', movemnt);
        //component.animateJQ(cSelector,movemnt, cbfunc);
        component.animated3(tCard, movemnt, cbfunc);
      });
      return animateCompleted;
    }
  },
  animateJQ(cSelector, movemnt, cbcomplete) {
    let cCard = $(cSelector);
    //console.log('cSelector', cSelector);
    cCard.animate(
      {
        transform: `translateX(${movemnt}px)`
      },
      {
        duration: 9000,
        complete: cbcomplete
      }
    );
  },
  animated3(tgt, movemnt, cbcomplete) {
    var t = d3
      .transition()
      .delay(9000)
      .duration(9000);
    var tgt1 = tgt.transition(t);

    tgt1.style('transform', `translateX(${movemnt}px)`).each('end', cbcomplete);
    //tgt.transform('translate', `${movemnt}px`);
  },
  animated3b(tgt, movemnt) {
    //cbcomplete
    var t = d3.transition().duration(500);

    tgt.attr('transform', 'translate(20,20)');
    tgt.transition(t).attr('translate', '200px)');
    tgt.style('transform', `translateX(${movemnt}px)`);
    //tgt.transform('translate', `${movemnt}px`);
  },

  selectTimeSession(currentCard) {
    $('ul.timeline >li > span.selectedTime').removeClass('selectedTime');

    $(`ul.timeline >li.line-${currentCard.sessionId} > span`).addClass(
      'selectedTime'
    );
  },

  getOffsetCardIdx(offsetCurrentCard, offset) {
    let timeIndx;

    if (offsetCurrentCard && this.timeData) {
      /* Set display Wrt a given card- card selection case Find card from timdData*/
      timeIndx = this.timeData.findIndex(
        timemom => timemom.sessionId === offsetCurrentCard.sessionId
      );
      if (offset) {
        timeIndx = timeIndx + offset;
      }
    } else if (this.timeData && !offsetCurrentCard) {
      /* if there is timesData but no card selected - init case show cards to left */
      timeIndx = this.timeData.length;
    } else if (!this.timeData) {
      timeIndx = -1; // All empty cards
    }
    return timeIndx;
  },

  /**
   * Get a pack of n cards where n = 'cardDisplayConfig.activeDisplay'
   * if 'offsetcurrentCard' card is null, then starts a new display if has has 'timeData'
   * else 'scroll' to side ways + or - of 'offsetCurrentCard'
   * @param {timeDataItem} offsetCurrentCard
   * @param {int} scroll ( center = 0 , left = -1, right=1)
   */
  setDisplayPack: function(offsetCurrentCard, scroll) {
    let displayCards = {},
      cards,
      timeIndx;
    timeIndx = this.getOffsetCardIdx(offsetCurrentCard, scroll);
    displayCards = this.getCenterCard(timeIndx);
    cards = this.getAdjcentCards(
      timeIndx,
      this.cardDisplayConfig.activeSideWays
    );
    displayCards = Object.assign(displayCards, cards);
    this.set('displayCards', displayCards);
  },

  getCenterCard: function(cardidx) {
    let currentCard = this.timeData[cardidx],
      card = { center: [currentCard] };
    this.set('selectedIndex', cardidx);
    this.set('currentCard', currentCard);
    return card;
  },

  getAdjcentCards: function(cardidx, len) {
    let cards = { left: [], right: [], dummyleft: [], dummyright: [] },
      isFull = 1,
      dummyCard = {
        collectionType: 'dummy',
        title: '',
        scale: 0.8
      },
      zIndex = 1,
      scaleprop = 7;

    // leftcards cardidx =12, len=3, Added checks for null, will have another version for adding dummy cards, now null cards are not treated ad empty or dummy card.
    for (let index = cardidx - 1; cardidx - len < index; --index) {
      if (this.timeData[index]) {
        let curCard = Object.assign({}, this.timeData[index]);
        cards.left.push(curCard);
      } else {
        isFull = 0;
      }
    }
    if (isFull === 1) {
      cards.dummyleft.push({
        collectionType: 'dummy',
        title: '',
        scale: 0.1 * scaleprop++,
        zIndex: zIndex++
      });
      cards.dummyleft.push({
        collectionType: 'dummy',
        title: '',
        scale: 0.1 * scaleprop++,
        zIndex: zIndex++
      });
    }

    cards.left.forEach(card => {
      card.zIndex = zIndex++;
      card.scale = 0.1 * scaleprop++;
    });

    isFull = 1;
    scaleprop = 10;
    // leftcards cardidx =12, len=3
    for (let index = cardidx + 1; index < cardidx + len; ++index) {
      if (this.timeData[index]) {
        let curCard = Object.assign({}, this.timeData[index]);
        curCard.zIndex = zIndex--;
        curCard.scale = 0.1 * scaleprop--;
        cards.right.push(curCard);
      } else {
        isFull = 0;
      }
    }
    if (isFull === 1) {
      dummyCard.scale = 0.8;
      cards.dummyright.push({
        collectionType: 'dummy',
        title: '',
        scale: 0.1 * scaleprop--,
        zIndex: zIndex--
      });
      dummyCard.scale = 0.9;
      cards.dummyright.push({
        collectionType: 'dummy',
        title: '',
        scale: 0.1 * scaleprop--,
        zIndex: zIndex--
      });
    }
    return cards;
  }
});
