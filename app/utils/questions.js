import Ember from 'ember';

/**
 * Base question util class
 * This utility class defines the basic behavior for all question types
 * it contains convenience methods to grade and retrieve useful information
 * from question types
 *
 * @typedef {Object} QuestionUtil
 */
export const QuestionUtil = Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource}
   */
  question: null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   * Default implementation, it check if all answer choices are correct
   *
   * @param {Array} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    let utility = this;
    let correctAnswer = this.getCorrectAnswer();
    let correct = answer.get("length") === correctAnswer.get("length");
    answer.forEach(function(answerChoice, index){
      correct = correct && utility.isAnswerChoiceCorrect(answerChoice, index);
    });

    return correct;
  },

  /**
   * Indicates if the answer choice is correct
   * @param { * } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    Ember.Logger.warning("The method getCorrectAnswer is not implemented", answerChoice);
  },

  /**
   * This method should be implemented at different question types
   *
   * @return {*} the correct answer choice id
   */
  getCorrectAnswer: function(){
    Ember.Logger.warning("The method getCorrectAnswer is not implemented");
  }

}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleChoiceUtil
 */
MultipleChoiceUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   * It overrides the default implementation
   *
   * @param {string} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    return this.isAnswerChoiceCorrect(answer);
  },

  /**
   * Indicates if the answer choice is correct
   * @param { * } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    return this.getCorrectAnswer() === answerChoice;
  },

  /**
   * Gets the correct answer
   *
   * @return {string} the correct answer choice id
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    const correctAnswer = answers.filterBy("isCorrect", true);
    return correctAnswer.get("length") ? correctAnswer.get("firstObject.id") : undefined;
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleAnswerUtil
 */
MultipleAnswerUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { { id: number, selection: boolean } } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    let found = correctAnswer.filterBy("id", answerChoice.id);
    return found.get("length") && found.get("firstObject.selection") === answerChoice.selection;
  },

  /**
   * Gets the correct answer
   * It returns which is the correct selection (yes=true | no=false) for each answer choice
   * @return {Array} the correct answer for this question type [ { id: string, selection: boolean }, ... ]
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    return answers.map(function(answer){
      return { id: answer.get("id"), selection: answer.get("isCorrect") };
    });
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} TrueFalseUtil
 */
TrueFalseUtil = MultipleChoiceUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} FillInTheBlankUtil
 */
FillInTheBlankUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   * @param { number } index position of the answer
   */
  isAnswerChoiceCorrect: function(answerChoice, index){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice) &&
      correctAnswer.indexOf(answerChoice) === index;
  },

  /**
   * Gets the correct answer
   * @return {string[]} the correct answer for this question type
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    return answers.map(function(answer){
      return answer.get("text");
    });
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} ReorderUtil
 */
ReorderUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   * @param { number } index position of the answer
   */
  isAnswerChoiceCorrect: function(answerChoice, index){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice) &&
      correctAnswer.indexOf(answerChoice) === index;
  },

  /**
   * Gets the correct answer
   * @return {string[]} returns the correct order for answer choice ids
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers").sortBy("order");
    return answers.map(function(answer){
      return answer.get("id");
    });
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotTextHighlightUtil
 */
HotTextHighlightUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice);
  },

  /**
   * Gets the correct answer
   * The question text contains the information for the correct answer, correct items are wrapped by []
   * i.e La casa es de [colo] pero el [teco] es azul
   * @return {string[]} returns the correct answer choice ids
   */
  getCorrectAnswer: function(){
    const text = this.get("question.text");
    const regex = /(\[.*?])/gm;

    let items = Ember.A();
    let match = regex.exec(text);
    while (match != null) {
      let correctValue = match[0].replace("[", "").replace("]", ""); //replacing [ ]
      items.pushObject(correctValue);
      match = regex.exec(text);
    }

    return items;
  }

}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotSpotImageUtil
 */
HotSpotImageUtil = MultipleAnswerUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice);
  },

  /**
   * Gets the correct answer
   * @return {string[]} returns the correct answer choice ids
   */
  getCorrectAnswer: function(){
    let answers = this.get("question.answers");
    let correctAnswers = answers.filterBy("isCorrect", true);
    return correctAnswers.map(function(answer){
      return answer.get("id");
    });
  }

}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotSpotTextUtil
 */
HotSpotTextUtil = HotSpotImageUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
