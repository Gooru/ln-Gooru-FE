import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['chrono-timeline'],

  timeData: null,

  activeResource: null,

  activeIndex: null,

  init() {
    let component = this;
    component._super(...arguments);
    let midLen = Math.round(component.get('timeData').length - 1);
    let activeResource = component.get('timeData')[midLen];
    component.set('activeResource', activeResource);
    component.set('activeIndex', midLen);
  },

  moveToSelected(element) {
    var selected;
    if (element === 'next') {
      selected = $('.selected').next();
    } else if (element === 'prev') {
      selected = $('.selected').prev();
    } else {
      selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
    var prevLeftThird = $(prevSecond).prev();
    var nextRightThird = $(nextSecond).next();
    var prevLeftFourth = $(prevLeftThird).prev();
    var nextRightFourth = $(nextRightThird).next();

    $(selected)
      .removeClass()
      .addClass('selected');

    $(prev)
      .removeClass()
      .addClass('prev');
    $(next)
      .removeClass()
      .addClass('next');

    $(nextSecond)
      .removeClass()
      .addClass('nextRightSecond');
    $(prevSecond)
      .removeClass()
      .addClass('prevLeftSecond');

    $(prevLeftThird)
      .removeClass()
      .addClass('prevLeftThird');
    $(nextRightThird)
      .removeClass()
      .addClass('nextRightThird');

    $(prevLeftFourth)
      .removeClass()
      .addClass('prevLeftFourth');
    $(nextRightFourth)
      .removeClass()
      .addClass('nextRightFourth');

    $(nextRightFourth)
      .nextAll()
      .removeClass()
      .addClass('hideRight');
    $(prevLeftFourth)
      .prevAll()
      .removeClass()
      .addClass('hideLeft');
  },

  setDefaultClasses() {
    let activeCard = this.get('activeIndex');
    let component = this;
    let activeCartContainer = component.$(`.card-${activeCard}`);
    component.$(activeCartContainer).addClass('selected');
    component
      .$(`.card-${activeCard}`)
      .prev()
      .addClass('prev');
    component.$(`.card-${activeCard + 1}`).addClass('next');
    // component.$(`.card-${activeCard - 1}`).prev().addClass('prevLeftSecond');
    // component.$(`.card-${activeCard + 1}`).next().addClass('nextRightSecond');
    // component.$(`.card-${activeCard - 1}`).prev().prev().addClass('prevLeftThird');
    // component.$(`.card-${activeCard + 1}`).next().next().addClass('nextRightThird');
    // component.$(`.card-${activeCard - 1}`).prev().prev().prev().addClass('prevLeftFourth');
    // component.$(`.card-${activeCard + 1}`).next().next().next().addClass('nextRightFourth');
    component
      .$(`.card-${activeCard + 1}`)
      .nextAll()
      .addClass('hideRight');
    component
      .$(`.card-${activeCard - 1}`)
      .prevAll()
      .addClass('hideLeft');
  },

  didRender() {
    let component = this;
    component.setDefaultClasses();
    component.$('#carousel').keydown(function(e) {
      switch (e.which) {
      case 37: // left
        component.moveToSelected('prev');
        break;

      case 39: // right
        component.moveToSelected('next');
        break;

      default:
        return;
      }
      e.preventDefault();
    });

    // let activeCartContainer = component.$(`.card-4`);
    // component.moveToSelected(activeCartContainer);

    // $('#carousel div').click(function() {
    //   component.moveToSelected($(this));
    // });
  }

  //
  // selectedIndex: 0,
  // animateDirection: 'left',

  // timeLineRightDate: function() {
  //   let todaysDate = new Date();
  //   return this.uiDateFormat(todaysDate);
  // }.property(),
  //
  // timeLineLeftDate: function() {
  //   return this.uiDateFormat(this.timeData.startDate);
  // }.property(),
  //
  // uiDateFormat: function(givenDate) {
  //   givenDate = givenDate || new Date();
  //   if (typeof givenDate ==== 'string') {
  //     givenDate = new Date(givenDate);
  //   }
  //   let dateLocale = 'en-us',
  //     dateMonth = givenDate.toLocaleString(dateLocale, {
  //       month: 'short'
  //     }),
  //     dateYear = givenDate.toLocaleString(dateLocale, {
  //       year: '2-digit'
  //     }),
  //     dateDisplay = {
  //       mon: dateMonth,
  //       year: dateYear
  //     };
  //   return dateDisplay;
  // },
  //
  // cardDisplayConfig: {
  //   totalCardToDisplay: 9,
  //   activeDisplay: 3,
  //   activeSideWays: 3,
  //   dummyleft: [{
  //       collectionType: 'collection',
  //       title: null
  //     },
  //     {
  //       collectionType: 'collection',
  //       title: null
  //     },
  //     {
  //       collectionType: 'collection',
  //       title: null
  //     }
  //   ],
  //   dummyRight: {},
  //   assessment: {
  //     imgUrl: '',
  //     iconClass: 'grucount'
  //   },
  //   collection: {
  //     imgUrl: '',
  //     iconClass: 'view_comfy'
  //   },
  //   'assessment-external': {
  //     imgUrl: '',
  //     iconClass: 'grucount'
  //   }
  // },
  //
  // /**
  //  * @description Property for getting itype icon
  //  */
  // cardTypeClass: function(timeSession) {
  //   const component = this;
  //   let icnclass =
  //     component.cardDisplayConfig[timeSession.collectionType].iconClass;
  //   return icnclass;
  // },
  //
  // timeDataChanged: Ember.observer('timeData', function() {
  //   const route = this;
  //   Ember.run.later(function() {
  //     route.didInsertElement();
  //   });
  // }),
  // currentCard: null,
  // displayCards: null,
  //
  // init() {
  //   this._super(...arguments);
  //   const component = this;
  //   component.timeData.forEach(timeSession => {
  //     timeSession.iconClass = component.cardTypeClass(timeSession);
  //   });
  // },
  //
  // didInsertElement() {
  //   if (this.timeData && this.timeData.length > 0) {
  //     this.showSelCard(this.timeData[this.timeData.length - 1]);
  //   }
  // },
  //
  // actions: {
  //   showCard(currentCard) {
  //     const comp = this;
  //     let cardpos = comp.getCardDisplayPos(currentCard);
  //     cardpos = !cardpos && currentCard ? 0 : cardpos;
  //     let resv = comp.animateCard(cardpos);
  //     resv.then(function() {
  //       comp.showSelCard(currentCard);
  //     });
  //   },
  //   scrollLeft() {
  //     this.attrs.scrollLeft();
  //   },
  //   scrollRight() {
  //     this.attrs.scrollRight();
  //   },
  //   onClickRight() {
  //     const comp = this;
  //     let resv = comp.animateCard(1);
  //     resv.then(function() {
  //       let curcard = comp.get('currentCard');
  //       comp.setDisplayPack(curcard, 1);
  //       curcard = comp.get('currentCard');
  //       comp.selectTimeSession(curcard);
  //     });
  //     //this.$('.cards-display').carousel('next');
  //   },
  //   onClickLeft() {
  //     //this.$('.cards-display').carousel('next');
  //     const comp = this;
  //     let resv = this.animateCard(-1);
  //     resv.then(function() {
  //       let curcard = comp.get('currentCard');
  //       comp.setDisplayPack(curcard, -1);
  //       curcard = comp.get('currentCard');
  //       comp.selectTimeSession(curcard);
  //     });
  //   }
  // },
  //
  // showSelCard(currentCard) {
  //   this.selectTimeSession(currentCard);
  //   this.set('currentCard', currentCard);
  //   this.setDisplayPack(currentCard, 0);
  // },
  // getCardDisplayPos(card) {
  //   let retval;
  //   if (card) {
  //     let disCards = this.get('displayCards');
  //     if (disCards) {
  //       if (disCards.center && disCards.center.sessionId ==== card.sessionId) {
  //         retval = 0;
  //       }
  //       if (disCards.left && retval ==== undefined) {
  //         retval = disCards.left.findIndex(
  //           timemom => timemom.sessionId ==== card.sessionId
  //         );
  //       }
  //       if (disCards.right && retval ==== undefined) {
  //         retval = disCards.rigth.findIndex(
  //           timemom => timemom.sessionId ==== card.sessionId
  //         );
  //       }
  //     }
  //   }
  //   return retval;
  // },
  // animateCard(offset) {
  //   const component = this;
  //   let curCard = this.get('currentCard');
  //   if (curCard) {
  //     let animateCompleted = new Ember.RSVP.Promise(function(resolve) {
  //       let tIndx = component.getOffsetCardIdx(curCard, offset),
  //         tSelector = `.c-${component.timeData[tIndx].sessionId}`,
  //         tCard = d3.selectAll(tSelector),
  //         tCardEl = tCard[0][0],
  //         tOffX = tCardEl.offsetLeft;
  //
  //       let cIndx = component.getOffsetCardIdx(curCard, 0),
  //         cSelector = `.c-${component.timeData[cIndx].sessionId}`,
  //         cCard = d3.selectAll(cSelector),
  //         cCardEl = cCard[0][0],
  //         cOffX = cCardEl.offsetLeft;
  //
  //       let movemnt = tOffX - cOffX;
  //       let cbfunc = function() {
  //         resolve('done');
  //       };
  //
  //       component.animated3(tCard, movemnt, cbfunc);
  //     });
  //     return animateCompleted;
  //   }
  // },
  // animated3All(tgt, movemnt, cbcomplete) {
  //   var t = d3
  //     .transition()
  //     .delay(9000)
  //     .duration(9000);
  //   var tgt1 = tgt.transition(t);
  //   tgt1.style('transform', `translateX(${movemnt}px)`).each('end', cbcomplete);
  //
  //   let displayCards = this.set('displayCards');
  //   if (displayCards) {
  //     // Animate all the cards in the carddeck
  //   }
  // },
  // animated3(tgt, movemnt, cbcomplete) {
  //   var t = d3
  //     .transition()
  //     .delay(9000)
  //     .duration(9000);
  //   var tgt1 = tgt.transition(t);
  //   tgt1.style('transform', `translateX(${movemnt}px)`).each('end', cbcomplete);
  // },
  // animateJQ(cSelector, movemnt, cbcomplete) {
  //   let cCard = $(cSelector);
  //   //console.log('cSelector', cSelector);
  //   cCard.animate({
  //     transform: `translateX(${movemnt}px)`
  //   }, {
  //     duration: 9000,
  //     complete: cbcomplete
  //   });
  // },
  // animated3b(tgt, movemnt) {
  //   //cbcomplete
  //   var t = d3.transition().duration(500);
  //
  //   tgt.attr('transform', 'translate(20,20)');
  //   tgt.transition(t).attr('translate', '200px)');
  //   tgt.style('transform', `translateX(${movemnt}px)`);
  //   //tgt.transform('translate', `${movemnt}px`);
  // },
  //
  // selectTimeSession(currentCard) {
  //   $('ul.timeline >li > span.selectedTime').removeClass('selectedTime');
  //
  //   $(`ul.timeline >li.line-${currentCard.sessionId} > span`).addClass(
  //     'selectedTime'
  //   );
  // },
  //
  // getOffsetCardIdx(offsetCurrentCard, offset) {
  //   let timeIndx;
  //
  //   if (offsetCurrentCard && this.timeData) {
  //     /* Set display Wrt a given card- card selection case Find card from timdData*/
  //     timeIndx = this.timeData.findIndex(
  //       timemom => timemom.sessionId ==== offsetCurrentCard.sessionId
  //     );
  //     if (offset) {
  //       timeIndx = timeIndx + offset;
  //     }
  //   } else if (this.timeData && !offsetCurrentCard) {
  //     /* if there is timesData but no card selected - init case show cards to left */
  //     timeIndx = this.timeData.length;
  //   } else if (!this.timeData) {
  //     timeIndx = -1; // All empty cards
  //   }
  //
  //   timeIndx = timeIndx < 0 ? 0 : timeIndx;
  //   timeIndx =
  //     timeIndx >= this.timeData.length ? this.timeData.length - 1 : timeIndx;
  //
  //   return timeIndx;
  // },
  //
  // /**
  //  * Get a pack of n cards where n = 'cardDisplayConfig.activeDisplay'
  //  * if 'offsetcurrentCard' card is null, then starts a new display if has has 'timeData'
  //  * else 'scroll' to side ways + or - of 'offsetCurrentCard'
  //  * @param {timeDataItem} offsetCurrentCard
  //  * @param {int} scroll ( center = 0 , left = -1, right=1)
  //  */
  // setDisplayPack: function(offsetCurrentCard, scroll) {
  //   let displayCards = {},
  //     cards,
  //     timeIndx;
  //   timeIndx = this.getOffsetCardIdx(offsetCurrentCard, scroll);
  //   displayCards = this.getCenterCard(timeIndx);
  //   cards = this.getAdjcentCards(
  //     timeIndx,
  //     this.cardDisplayConfig.activeSideWays
  //   );
  //   displayCards = Object.assign(displayCards, cards);
  //   this.set('displayCards', displayCards);
  // },
  //
  // getCenterCard: function(cardidx) {
  //   let currentCard = this.timeData[cardidx],
  //     card = {
  //       center: [currentCard]
  //     };
  //   this.set('selectedIndex', cardidx);
  //   this.set('currentCard', currentCard);
  //   return card;
  // },
  //
  // getAdjcentCards: function(cardidx, len) {
  //   let cards = {
  //       left: [],
  //       right: [],
  //       dummyleft: [],
  //       dummyright: []
  //     },
  //     isFull = 1,
  //     dummyCard = {
  //       collectionType: 'dummy',
  //       title: '',
  //       scale: 0.8
  //     },
  //     zIndex = 1,
  //     scaleprop = 4;
  //
  //   let curIndx = cardidx,
  //     lenbound = len;
  //   lenbound--;
  //   for (let index = 0; index < lenbound; index++) {
  //     curIndx--;
  //     if (this.timeData[curIndx]) {
  //       let curCard = Object.assign({}, this.timeData[curIndx]);
  //       cards.left.push(curCard);
  //     } else {
  //       isFull = 0;
  //     }
  //   }
  //   cards.left.reverse();
  //   if (isFull ==== 1) {
  //     cards.dummyleft.push({
  //       collectionType: 'dummy',
  //       title: '',
  //       scale: 0.1 * scaleprop++,
  //       zIndex: zIndex++
  //     });
  //     cards.dummyleft.push({
  //       collectionType: 'dummy',
  //       title: '',
  //       scale: 0.1 * scaleprop++,
  //       zIndex: zIndex++
  //     });
  //   }
  //
  //   cards.left.forEach(card => {
  //     card.zIndex = zIndex++;
  //     card.scale = 0.1 * scaleprop++;
  //   });
  //
  //   isFull = 1;
  //   scaleprop = 7;
  //   // leftcards cardidx =12, len=3
  //   for (let index = cardidx + 1; index < cardidx + len; ++index) {
  //     if (this.timeData[index]) {
  //       let curCard = Object.assign({}, this.timeData[index]);
  //       curCard.zIndex = zIndex--;
  //       curCard.scale = 0.1 * scaleprop--;
  //       cards.right.push(curCard);
  //     } else {
  //       isFull = 0;
  //     }
  //   }
  //   if (isFull ==== 1) {
  //     dummyCard.scale = 0.8;
  //     cards.dummyright.push({
  //       collectionType: 'dummy',
  //       title: '',
  //       scale: 0.1 * scaleprop--,
  //       zIndex: zIndex--
  //     });
  //     dummyCard.scale = 0.9;
  //     cards.dummyright.push({
  //       collectionType: 'dummy',
  //       title: '',
  //       scale: 0.1 * scaleprop--,
  //       zIndex: zIndex--
  //     });
  //   }
  //   return cards;
  // }
});
