import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('player/questions/gru-hot-text', 'Unit | Component | player/questions/gru hot text', {
  integration: false
});

test('getWordItems', function(assert) {
  assert.expect(5);

  var component = this.subject();

  //with no words
  var wordItems = component.getWordItems("").toArray();
  assert.equal(wordItems.length, 0, "Wrong number of items");

  //with one word
  wordItems = component.getWordItems("text").toArray();
  assert.equal(wordItems.length, 1, "Wrong number of items");
  assert.equal(wordItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(wordItems[0].get("text"), "text", "Wrong text for first object");

  //with many words
  wordItems = component.getWordItems("  A  phrase with  many words and extra spaces   ").toArray();
  assert.equal(wordItems.length, 8, "Wrong number of items");
});

test('getSentenceItems', function(assert) {
  assert.expect(16);

  var component = this.subject();

  //with no text
  var sentenceItems = component.getSentenceItems("").toArray();
  assert.equal(sentenceItems.length, 0, "Wrong number of items");

  //with no correct
  sentenceItems = component.getSentenceItems("Sentence 1").toArray();
  assert.equal(sentenceItems.length, 1, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");

  //with many sentences, 1 correct
  sentenceItems = component.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3").toArray();
  assert.equal(sentenceItems.length, 3, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");

  //with many sentences, many correct
  sentenceItems = component.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5");
  assert.equal(sentenceItems.length, 5, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");
  assert.equal(sentenceItems[3].get("text"), "Sentence 4.", "Wrong text for fourth object");
  assert.equal(sentenceItems[4].get("text"), "Sentence 5", "Wrong text for fifth object");

});

test('getCorrectItems', function(assert) {
  assert.expect(6);

  var component = this.subject();

  //with no correct items
  var correctItems = component.getCorrectItems("No correct answer in text").toArray();
  assert.equal(correctItems.length, 0, "Wrong number of items");

  //with 1 correct item
  correctItems = component.getCorrectItems("One correct answer in text [this]").toArray();
  assert.equal(correctItems.length, 1, "Wrong number of items");
  assert.equal(correctItems[0].get("text"), "this", "Wrong correct item");

  //with many correct items
  correctItems = component.getCorrectItems("Many [correct] items in this sentence [another .]").toArray();
  assert.equal(correctItems.length, 2, "Wrong number of items");
  assert.equal(correctItems[0].get("text"), "correct", "Wrong correct item");
  assert.equal(correctItems[1].get("text"), "another .", "Wrong correct item");
});

test('toItems', function(assert) {
  assert.expect(6);

  var component = this.subject();
  var items = Ember.A(["  ", "", "Item 1", " Item 2 ", "[Item 3]"]);

  //with no correct items
  var convertedItems = component.toItems(items).toArray();
  assert.equal(convertedItems.length, 3, "Should have 3 items, empty items are excluded");
  assert.equal(convertedItems[0].get("id"), 2, "Invalid id, it should have the original index id");
  assert.equal(convertedItems[0].get("text"), "Item 1", "Wrong item text");
  assert.equal(convertedItems[0].get("selected"), false, "Wrong item selected value");
  assert.equal(convertedItems[1].get("text"), "Item 2", "Wrong item text, text should be trimmed");
  assert.equal(convertedItems[2].get("text"), "Item 3", "Wrong item text, [] should be suppressed");
});
