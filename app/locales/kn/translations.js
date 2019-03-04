import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
  errors: {
    description: 'ಈ ಕ್ಷೇತ್ರ',
    inclusion: '{{description}} ಪಟ್ಟಿಯಲ್ಲಿ ಸೇರಿಸಲಾಗಿಲ್ಲ',
    exclusion: '{{description}} ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
    invalid: '{{description}} ಅಮಾನ್ಯವಾಗಿದೆ',
    confirmation: '{{description}} - {{on}} ನೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ',
    accepted: '{{description}} ಅನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕು',
    empty: '{{description}} ಖಾಲಿಯಾಗಿರಬಾರದು',
    blank: '{{description}} ಖಾಲಿಯಾಗಿರಬಾರದು',
    present: '{{description}} ಖಾಲಿಯಾಗಿರಬೇಕು',
    collection: '{{description}} ಸಂಗ್ರಹವಾಗಿರಬೇಕು',
    singular: '{{description}} ಸಂಗ್ರಹವಾಗಿರಬಾರದು',
    tooLong: '{{description}} ತುಂಬಾ ಉದ್ದವಾಗಿದೆ (ಗರಿಷ್ಠ {{max}} ಅಕ್ಷರಗಳು)',
    tooShort: '{{description}} ತುಂಬಾ ಚಿಕ್ಕದು (ಕನಿಷ್ಠ {{min}} ಅಕ್ಷರಗಳು)',
    before: '{{description}} {{ಮೊದಲು}} ಮೊದಲು ಇರಬೇಕು',
    after: '{{description}} {{after}} ನಂತರ ಇರಬೇಕು',
    wrongDateFormat: '{{description}} {{format}} ನ ಸ್ವರೂಪದಲ್ಲಿರಬೇಕು',
    wrongLength:
      '{{description}} ತಪ್ಪು ಉದ್ದವಾಗಿದೆ (ಅಕ್ಷರಗಳನ್ನು {{is}} ಆಗಿರಬೇಕು)',
    notANumber: '{{description}} ಒಂದು ಸಂಖ್ಯೆಯಾಗಿರಬೇಕು',
    notAnInteger: '{{description}} ಒಂದು ಪೂರ್ಣಾಂಕವಾಗಿರಬೇಕು',
    greaterThan: '{{description}} {{gt}} ಗಿಂತ ದೊಡ್ಡದಾಗಿರಬೇಕು',
    greaterThanOrEqualTo:
      '{{description}} {{gte}} ಗಿಂತ ಹೆಚ್ಚು ಅಥವಾ ಸಮನಾಗಿರಬೇಕು',
    equalTo: '{{description}} {{is}} ಗೆ ಸಮಾನವಾಗಿರಬೇಕು',
    lessThan: '{{description}} {{lt}} ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು',
    lessThanOrEqualTo: '{{description}} {{lte}} ಗಿಂತ ಕಡಿಮೆ ಅಥವಾ ಸಮನಾಗಿರಬೇಕು',
    otherThan: '{{description}} {{value}} ಗಿಂತ ಬೇರೆಯಾಗಿರಬೇಕು',
    odd: '{{description}} ಬೆಸವಾಗಿರಬೇಕು',
    even: '{{description}} ಸಹ ಇರಬೇಕು',
    positive: '{{description}} ಧನಾತ್ಮಕವಾಗಿರಬೇಕು',
    date: '{{description}} ಮಾನ್ಯವಾದ ದಿನಾಂಕವಾಗಿರಬೇಕು',
    email: '{{description}} ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವಾಗಿರಬೇಕು',
    phone: '{{description}} ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆಯಾಗಿರಬೇಕು',
    url: '{{description}} ಒಂದು ಮಾನ್ಯವಾದ url ಆಗಿರಬೇಕು'
  },
  common: {
    relevance: 'ಪ್ರಸ್ತುತತೆ',
    engagement: 'ನಿಶ್ಚಿತಾರ್ಥ',
    efficacy: 'ಪರಿಣಾಮಕಾರಿತ್ವ',
    grid: 'Grid',
    list: 'List',
    first: 'First',
    last: 'Last',
    name: 'Name',
    user: 'user',
    'content-name': 'Content Name',
    lastName: 'Lastname',
    firstName: 'Firstname',
    'filter-by': 'Filter By',
    more: 'more',
    'avg-score': 'Avg Score',
    frq: 'FRQ',
    schedule: 'Schedule',
    responses: 'Responses',
    'no-lesson-info-message': 'This unit does have any lessons.',
    'no-collection-info-message': 'This lesson does have any collections.',
    'gooru-suggestions': 'Gooru Suggestions',
    'gooru-catalog': 'Gooru Catalog',
    'suggestion-made-to': 'Suggestion made to',
    'student-selected': 'Student Selected',
    'no-suggest-result-message': ' No matching content found',
    'no-suggest-results-message':
      'You can search and  find the related content.',
    'no-suggest-search-results-message':
      'Check your spelling. We all make mistakes! Or try searching for a similar word instead.',
    'a-collection': 'ಸಂಗ್ರಹ',
    'a-course': 'ಒಂದು ಕೋರ್ಸ್',
    'a-question': 'ಒಂದು ಪ್ರಶ್ನೆ',
    'a-resource': 'ಒಂದು ಸಂಪನ್ಮೂಲ',
    'a-rubric': 'ಒಂದು ರಬ್ರಿಕ್',
    'all-completed': 'ಎಲ್ಲಾ ಪೂರ್ಣಗೊಂಡಿದೆ',
    'an-assessment': 'ಒಂದು ಮೌಲ್ಯಮಾಪನ',
    about: 'ಸುಮಾರು',
    'about-you': 'ನಿನ್ನ ಬಗ್ಗೆ',
    'about-me': 'ನನ್ನ ಬಗ್ಗೆ',
    accept: 'Accept',
    ignore: 'Ignore',
    add: 'ಸೇರಿಸಿ',
    'plan-an-activities': 'Plan your activities',
    'plan-an-activities-msg':
      'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
    Reschedule: 'Reschedule',
    'no-unschedule-items':
      'You don\'t have any activities that need scheduling for ',
    'repeat-activity': 'Repeat Activity',
    'add-assessment': 'ಹೊಸ ಮೌಲ್ಯಮಾಪನವನ್ನು ರಚಿಸಿ',
    'add-century-skills': '21 ನೇ ಶತಮಾನದ ಕೌಶಲ್ಯಗಳನ್ನು ಸೇರಿಸಿ',
    'add-collaborator': 'ಸಹಯೋಗಿ ಸೇರಿಸಿ',
    'add-collection': 'ಹೊಸ ಸಂಗ್ರಹಣೆಯನ್ನು ರಚಿಸಿ',
    'add-collection-item': 'ಸಂಪನ್ಮೂಲ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ರಚಿಸಿ',
    'add-competency': 'ಸಾಮರ್ಥ್ಯ ಸೇರಿಸಿ',
    'add-content-prompt':
      'ನೀವು ಇನ್ನೂ <span> {{type}} </span> ಅನ್ನು ರಚಿಸಲಿಲ್ಲ. ಮುಂದುವರಿಯಿರಿ, ದಪ್ಪವಾಗಿರಿ.',
    'add-course': 'ಹೊಸ ಕೋರ್ಸ್ ರಚಿಸಿ',
    'add-coruse-to-class': 'Add Course',
    'add-domains-to-unit': 'ಘಟಕಕ್ಕೆ ಡೊಮೇನ್ಗಳನ್ನು ಸೇರಿಸಿ',
    'add-url': 'url ಸೇರಿಸಿ',
    'add-from-url': 'url ನಿಂದ ಸೇರಿಸಿ',
    'add-lessons': 'ಪಾಠಗಳನ್ನು ಸೇರಿಸಿ',
    'add-new-lesson': 'ಹೊಸ ಪಾಠವನ್ನು ರಚಿಸಿ',
    'add-new-unit': 'ಹೊಸ ಘಟಕವನ್ನು ರಚಿಸಿ',
    'add-new-resource': 'ಹೊಸ ಸಂಪನ್ಮೂಲವನ್ನು ರಚಿಸಿ',
    'add-new-question': 'ಹೊಸ ಪ್ರಶ್ನೆಯನ್ನು ರಚಿಸಿ',
    'add-question': 'ಪ್ರಶ್ನೆ ರಚಿಸಿ',
    'add-question-image': 'ಪ್ರಶ್ನೆ ಚಿತ್ರ ಸೇರಿಸಿ',
    'add-rubric': 'ಹೊಸ ರಬ್ರಿಕ್ ಸೇರಿಸಿ',
    'add-standard': 'ಪ್ರಮಾಣಿತ ಸೇರಿಸಿ',
    'add-standards': 'ಗುಣಮಟ್ಟವನ್ನು ಸೇರಿಸಿ',
    'add-standards-to-collection': 'ಸಂಗ್ರಹಣೆಗೆ ಮಾನದಂಡಗಳನ್ನು ಸೇರಿಸಿ',
    'add-to': 'ಸೇರಿಸು',
    'add-to-classroom': 'ತರಗತಿಗೆ ಸೇರಿಸಿ',
    'add-to-daily-class': 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸೇರಿಸಿ',
    'add-to-collection-success':
      'ನೀವು {{contenttitle}} ಗೆ {{collectiontitle}} ಗೆ ಸೇರಿಸಿದ್ದೀರಿ. ನೀವು {{ಸಂಗ್ರಹತೆ}} ಅನ್ನು ಸಂಪಾದಿಸಲು ಬಯಸುತ್ತೀರಾ?',
    'add-to-lesson-success':
      'ನೀವು {{collectiontitle}} ಅನ್ನು {{lessantitle}} ಗೆ ಸೇರಿಸಿದ್ದೀರಿ. ನೀವು {{ಸಂಗ್ರಹತೆ}} ಅನ್ನು ಸಂಪಾದಿಸಲು ಬಯಸುತ್ತೀರಾ?',
    'add-type-question': 'ಯಾವ ರೀತಿಯ ಪ್ರಶ್ನೆಯನ್ನು ನೀವು ಸೇರಿಸಲು ಬಯಸುತ್ತೀರಿ?',
    'add-type-resource': 'ಇದು ಯಾವ ರೀತಿಯ ಸಂಪನ್ಮೂಲವಾಗಿದೆ?',
    'add-units': 'ಘಟಕಗಳನ್ನು ಸೇರಿಸಿ',
    added: 'ಸೇರಿಸಲಾಗಿದೆ',
    'advanced-editing': 'ಸುಧಾರಿತ ಸಂಪಾದನೆ',
    announcements: 'ಪ್ರಕಟಣೆಗಳು',
    anonymous_mode: 'ಅನಾಮಧೇಯ ಮೋಡ್',
    answer: 'ನಿಮ್ಮ ಉತ್ತರ',
    'answer-correct': 'ನೀನು ಸರಿ!',
    'answer-incorrect': 'ನೀವು ತಪ್ಪಾಗಿರುವಿರಿ ...',
    'answer-key-was-hidden':
      'ಗಮನಿಸಿ: ನಿಮ್ಮ ಶಿಕ್ಷಕ ಉತ್ತರ ಕೀಲಿಯನ್ನು ಮರೆಮಾಡಿದ್ದಾರೆ.',
    approved: 'ಅನುಮೋದಿಸಲಾಗಿದೆ',
    archive: 'ಆರ್ಕೈವ್',
    assessment: 'ಮೌಲ್ಯಮಾಪನ',
    'assessment-disabled': 'ನೀವು ಈ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರಯತ್ನಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ',
    'assessment-external': 'ಮೌಲ್ಯಮಾಪನ-ಬಾಹ್ಯ',
    'assessment-pl': {
      zero: 'ಮೌಲ್ಯಮಾಪನಗಳು',
      one: 'ಮೌಲ್ಯಮಾಪನ',
      other: 'ಮೌಲ್ಯಮಾಪನಗಳು'
    },
    'assessment-title': 'ಮೌಲ್ಯಮಾಪನ ಶೀರ್ಷಿಕೆ',
    assessmentInitial: 'a',
    assessments: 'ಮೌಲ್ಯಮಾಪನಗಳು',
    assign: 'ನಿಯೋಜಿಸಿ',
    'assign-to-class': 'ತರಗತಿಗೆ ನಿಯೋಜಿಸಿ',
    'assign-to-course': 'ಕೋರ್ಸ್ಗೆ ನಿಯೋಜಿಸಿ',
    attempt: 'ಪ್ರಯತ್ನ ಸಂಖ್ಯೆ',
    audience: 'ಪ್ರೇಕ್ಷಕರು',
    avatarFor: 'ಫಾರ್ ಅವತಾರ',
    averageScore: 'ಸರಾಸರಿ ಸ್ಕೋರ್',
    back: 'ಹಿಂದೆ',
    'back-to-assessment': 'ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    'back-to-collection': 'ಸಂಗ್ರಹಣೆಗೆ ಹಿಂತಿರುಗಿ',
    'back-to-course-map': 'ಕೋರ್ಸ್ ನಕ್ಷೆಗೆ ಮರಳಿ',
    'back-to-data': 'ಡೇಟಾಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    'back-to-report': 'ಮತ್ತೆ ವರದಿ ಮಾಡಲು',
    'best-practices': 'ಒಳ್ಳೆಯ ಅಭ್ಯಾಸಗಳು',
    beta: 'ಬೀಟಾ',
    'big-ideas': 'ದೊಡ್ಡ ವಿಚಾರಗಳು',
    biography: 'ಜೀವನಚರಿತ್ರೆ',
    bookmark: 'ಬುಕ್ಮಾರ್ಕ್',
    bookmarks: 'ಬುಕ್ಮಾರ್ಕ್ಗಳು',
    'bookmarked-content-success':
      'ಈ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲಾದ {{contenttype}} ಅನ್ನು ನಿಮ್ಮ ಸ್ವತಂತ್ರ ಕಲಿಕೆ ಪುಟಕ್ಕೆ ಸೇರಿಸಲಾಗುತ್ತದೆ.',
    'bookmarked-success':
      'ಎಲ್ಲಾ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲಾದ ವಿಷಯವನ್ನು ಸ್ವತಂತ್ರ ಕಲಿಕೆ ಪುಟಕ್ಕೆ ಸೇರಿಸಲಾಗುತ್ತದೆ.',
    builder: 'ಸಂಪಾದಕ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    categories: 'ವಿಭಾಗಗಳು',
    category: 'ವರ್ಗದಲ್ಲಿ',
    categoryOptions: {
      k12: 'ಕೆ -12',
      k12IN: 'K12IN',
      'higher-ed': 'ಉನ್ನತ ಶಿಕ್ಷಣ',
      'professional-dev': 'ವೃತ್ತಿಪರ ಅಭಿವೃದ್ಧಿ'
    },
    'century-skills': '21 ನೇ ಶತಮಾನದ ಕೌಶಲ್ಯಗಳು',
    choose: 'ಆಯ್ಕೆ',
    'choose-file': 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    class: 'ತರಗತಿಯ',
    classScores: 'ವರ್ಗ ಸ್ಕೋರ್ಗಳು',
    'click-unBookmark': 'ಅನ್ಬುಕ್ಮಾರ್ಕ್ಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    close: 'ಮುಚ್ಚಿ',
    collection: 'ಸಂಗ್ರಹ',
    'collection-pl': {
      zero: 'ಸಂಗ್ರಹಣೆಗಳು',
      one: 'ಸಂಗ್ರಹ',
      other: 'ಸಂಗ್ರಹಣೆಗಳು'
    },
    'collection-title': 'ಸಂಗ್ರಹ ಶೀರ್ಷಿಕೆ',
    collections: 'ಸಂಗ್ರಹಣೆಗಳು',
    collectionInitial: 'ಸಿ',
    competency: 'ಸಾಮರ್ಥ್ಯ',
    competencies: 'ಸಾಮರ್ಥ್ಯಗಳು',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    community: 'ಸಮುದಾಯ',
    confirm: 'ದೃಢೀಕರಿಸಿ',
    'confirm-copy': 'ದೃಢೀಕರಿಸಿ & ನಕಲಿಸಿ',
    content: 'ವಿಷಯ',
    'content-manager': 'ವಿಷಯ ನಿರ್ವಾಹಕ',
    contentUnavailable: 'ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ',
    contentUnavailabletoday:
      'ಪ್ರಸ್ತುತ ಚಟುವಟಿಕೆಗಳಿಲ್ಲ. ಪಠ್ಯ ಮ್ಯಾಪ್ ಅಥವಾ ನನ್ನ ವಿಷಯದಿಂದ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳನ್ನು ಸೇರಿಸಿ.',
    contentUnavailableyesterday: 'ಯಾವುದೇ ಚಟುವಟಿಕೆಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.',
    'contributed-by': 'ಕೊಡುಗೆ',
    copy: 'ನಕಲಿಸಿ',
    'copy-to': 'ನಕಲಿಸಿ',
    correct: 'ಸರಿಯಾಗಿ',
    'correct-answer': 'ಸರಿಯಾದ ಉತ್ತರ',
    'correct-answers': 'Correct Answer(s)',
    'incorrect-answers': 'InCorrect Answer(s)',
    'rubric-graded': 'Rubric Graded',
    'self-graded': 'Self-Graded',
    'rubric-grade': 'Rubric Grade',
    brief: 'Brief',
    'update-grade-score': 'Update grade score to complete your FRQ.',
    'answer-this-rubric': 'Answer this rubric to complete your FRQ.',
    'all-caught-up': 'You are all caught up!',
    'no-users-to-grade': 'There are no users to grade for this FRQ.',
    'rubric-needs-grading': 'Rubric Needs Grading',
    'not-answered': 'Not Answered',
    'rubric-not-answered': 'Rubric Not Answered',
    country: 'ದೇಶ',
    'course-map': 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
    course: 'ಕೋರ್ಸ್',
    'course-title': 'ಪಠ್ಯ ಶೀರ್ಷಿಕೆ',
    courses: 'ಶಿಕ್ಷಣ',
    'competency-status-0': 'Not Started',
    'competency-status-1': 'In Progress',
    'competency-status-2': 'Mastered (Inferred)',
    'competency-status-3': 'Mastered (Asserted)',
    'competency-status-4': 'Mastered (Earned)',
    'competency-status-5': 'Mastered (Demonstrated)',
    create: 'ರಚಿಸಿ',
    createClass: 'ವರ್ಗ ರಚಿಸಿ',
    'created-by': 'ರಚಿಸಿದವರು',
    'create-rubric': 'ಹೊಸ ರಬ್ರಿಕ್ ಅನ್ನು ರಚಿಸಿ',
    'current-attempt': 'ಪ್ರಸ್ತುತ ಪ್ರಯತ್ನ',
    'currently-studying': 'ಪ್ರಸ್ತುತ ಅಧ್ಯಯನ',
    delete: 'ಅಳಿಸು',
    'delete-instructions': {
      'links-inaccessible': 'ಎಲ್ಲಾ ಪಾಲು ಲಿಂಕ್ಗಳು ​​ಪ್ರವೇಶಿಸಲಾಗುವುದಿಲ್ಲ',
      'content-inaccessible':
        'ಎಲ್ಲಾ ವಿಷಯವು ಅದಕ್ಕೆ ಒಳಪಟ್ಟ ಪಾಠದ ಕೊಠಡಿಗಳಿಗೆ ಪ್ರವೇಶಿಸಲಾಗುವುದಿಲ್ಲ'
    },
    'depth-of-knowledge': 'ಜ್ಞಾನದ ಆಳ',
    description: 'ವಿವರಣೆ',
    destination: 'Destination',
    'disappear-after-login': '{{loginnumber}} ಲಾಗಿನ್ನ ನಂತರ ಅದು ನಾಶವಾಗುತ್ತವೆ',
    'disappear-next-login': 'ಇದು ಮುಂದಿನ ಲಾಗಿನ್ನಲ್ಲಿ ಗೋಚರಿಸುವುದಿಲ್ಲ',
    district: 'ಜಿಲ್ಲೆ',
    domain: 'ಡೊಮೇನ್',
    domains: 'ಡೊಮೇನ್ಗಳು',
    download: 'ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
    'download-print': 'ಡೌನ್ಲೋಡ್ / ಮುದ್ರಣ',
    'drag-drop-suggestions': 'ಅಥವಾ ಸಲಹೆಗಳನ್ನು ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ ...',
    'download-report': 'ಡೌನ್ಲೋಡ್ ವರದಿ',
    done: 'Done',
    edit: 'ಸಂಪಾದಿಸು',
    showassessments: 'ಪ್ರದರ್ಶನ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು',
    showcollections: 'ಸಂಗ್ರಹಣೆಗಳನ್ನು ತೋರಿಸಿ',
    showlessons: 'ಪಾಠಗಳನ್ನು ತೋರಿಸು',
    collapse: 'ಕುಸಿತ',
    expand: 'ವಿಸ್ತರಿಸಲು',
    'edit-assessment': 'ಸಂಪಾದನೆ ಮೌಲ್ಯಮಾಪನ',
    'edit-collection': 'ಸಂಗ್ರಹ ಸಂಪಾದಿಸಿ',
    'edit-course': 'ಪಠ್ಯವನ್ನು ಸಂಪಾದಿಸಿ',
    'edit-question': 'ಪ್ರಶ್ನೆ ಸಂಪಾದಿಸಿ',
    'edit-resource': 'ಸಂಪನ್ಮೂಲ ಸಂಪಾದಿಸಿ',
    'edit-rubric': 'ರಬ್ರಿಕ್ ಸಂಪಾದಿಸಿ',
    email_support: 'support@gooru.org',
    emotions: {
      'emotion-1': 'ನನಗೆ ಸಹಾಯ ಬೇಕು',
      'emotion-2': 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ',
      'emotion-3': 'ಮೆಹ್ ...',
      'emotion-4': 'ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ',
      'emotion-5': 'ನಾನು ವಿವರಿಸಬಲ್ಲೆ'
    },
    'enter-url': 'url ನಮೂದಿಸಿ',
    'enrolled-students': 'ಸೇರಿಕೊಂಡ ವಿದ್ಯಾರ್ಥಿಗಳು',
    errors: {
      'join-class-code': 'ದಯವಿಟ್ಟು ತರಗತಿ ಸಂಕೇತವನ್ನು ನಮೂದಿಸಿ.',
      'answer-has-no-image': 'ದಯವಿಟ್ಟು ಉತ್ತರ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
      'add-username': 'ದಯವಿಟ್ಟು ಬಳಕೆದಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.',
      'add-course-title': 'ದಯವಿಟ್ಟು ಕೋರ್ಸ್ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'add-question-answer-text': 'ದಯವಿಟ್ಟು ಉತ್ತರ ಆಯ್ಕೆಯ ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿ.',
      'add-question-description': 'ದಯವಿಟ್ಟು ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ.',
      'add-question-title': 'ದಯವಿಟ್ಟು ಪ್ರಶ್ನೆಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'assessment-title-presence': 'ದಯವಿಟ್ಟು ಮೌಲ್ಯಮಾಪನ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'can-not-join-class':
        'ಓಹ್! ತರಗತಿಯಲ್ಲಿ ಸೇರಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'assessment-not-added-to':
        'ಓಹ್! ಇದೀಗ ಪಾಠಕ್ಕೆ ಮೌಲ್ಯಮಾಪನವನ್ನು ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'assessment-not-copied':
        'ಓಹ್! ಇದೀಗ ಮೌಲ್ಯಮಾಪನವನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'assessment-not-created':
        'ಓಹ್! ಇದೀಗ ಮೌಲ್ಯಮಾಪನವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'assessment-not-updated':
        'ಓಹ್! ಇದೀಗ ಮೌಲ್ಯಮಾಪನವನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'category-title-presence': 'ದಯವಿಟ್ಟು ವರ್ಗದಲ್ಲಿ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'class-min-score': 'ಕನಿಷ್ಠ ಸ್ಕೋರ್ 1 ರಿಂದ 100 ರ ನಡುವಿನ ಸಂಖ್ಯೆಯಾಗಿರಬೇಕು',
      'class-not-created':
        'ಓಹ್! ಇದೀಗ ತರಗತಿಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'class-title-presence': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ತರಗತಿಯಲ್ಲಿ ಹೆಸರನ್ನು ನೀಡಿ.',
      'collection-not-added-to':
        'ಓಹ್! ಇದೀಗ ಪಾಠಕ್ಕೆ ಸಂಗ್ರಹಣೆಯನ್ನು ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'collection-not-copied':
        'ಓಹ್! ಇದೀಗ ಸಂಗ್ರಹಣೆಯನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'collection-not-created':
        'ಓಹ್! ಇದೀಗ ಸಂಗ್ರಹಣೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'collection-not-updated':
        'ಓಹ್! ಇದೀಗ ಸಂಗ್ರಹಣೆಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'collection-title-presence': 'ದಯವಿಟ್ಟು ಸಂಗ್ರಹದ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'correct-answer-presence': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಸೂಚಿಸಿ.',
      'course-not-copied':
        'ಓಹ್! ಇದೀಗ ಪಠ್ಯವನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'course-not-created':
        'ಓಹ್! ಇದೀಗ ಪಠ್ಯವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'course-not-updated':
        'ಓಹ್! ಇದೀಗ ಪಠ್ಯ ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'highlight-text-not-selected': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಸೂಚಿಸಿ.',
      'highlight-text-wrong-format': 'ತಪ್ಪಾದ ಪ್ರಶ್ನೆ ಸ್ವರೂಪ.',
      'hotspot-text-max-choices': 'ನೀವು ಉತ್ತರ ಆಯ್ಕೆಗಳ ಮಿತಿಯನ್ನು ತಲುಪಿದ್ದೀರಿ.',
      'file-max-size':
        '5mb ಕ್ಕಿಂತ ಕಡಿಮೆ ಗಾತ್ರದ ಫೈಲ್ಗಳನ್ನು ಮಾತ್ರ ಬೆಂಬಲಿಸಲಾಗುತ್ತದೆ',
      'file-upload-missing':
        'ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಯಾವುದೇ ವಿಸ್ತರಣೆಗಳೊಂದಿಗೆ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ: {{ವಿಸ್ತರಣೆಗಳು}}',
      'getting-next-resource':
        'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷ ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
      'lesson-not-copied':
        'ಓಹ್! ಇದೀಗ ಪಾಠವನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'lesson-not-created':
        'ಓಹ್! ಇದೀಗ ಪಾಠವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'lesson-not-loaded':
        'ಓಹ್! ಇದೀಗ ಪಾಠ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'lesson-title-required': 'ದಯವಿಟ್ಟು ಪಾಠ ಶೀರ್ಷಿಕೆ ನಮೂದಿಸಿ.',
      'password-confirm': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ದೃಢೀಕರಿಸಿ.',
      'password-length': 'ಪಾಸ್ವರ್ಡ್ 5 ಮತ್ತು 14 ಅಕ್ಷರಗಳ ನಡುವೆ ಇರಬೇಕು.',
      'password-not-match': 'ಗುಪ್ತಪದಗಳುತಾಳೆಯಾಗುತ್ತಿಲ್ಲ.',
      'password-required': 'ದಯವಿಟ್ಟು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.',
      'password-special-characters': 'ದಯವಿಟ್ಟು ವಿಶೇಷ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಬೇಡಿ.',
      'profile-not-updated':
        'ಓಹ್! ಇದೀಗ ಪ್ರೊಫೈಲ್ ಅನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'question-not-added-to':
        'ಓಹ್! ಇದೀಗ {{collectiontype}} ಗೆ ಪ್ರಶ್ನೆಯನ್ನು ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'question-not-copied':
        'ಓಹ್! ಇದೀಗ ಪ್ರಶ್ನೆಯನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'question-not-created':
        'ಓಹ್! ಇದೀಗ ಪ್ರಶ್ನೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'question-not-updated':
        'ಓಹ್! ಇದೀಗ ಪ್ರಶ್ನೆಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'reset-password-error':
        'ಓಹ್! ಏನೋ ಸರಿಯಾಗಿಲ್ಲ. ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'reset-google-account-exists':
        'ನಿಮ್ಮ ಇಮೇಲ್ ಲಾಗಿನ್ ಅನ್ನು Google ಖಾತೆಯೊಂದಿಗೆ ರಚಿಸಲಾಗಿದೆ ಮತ್ತು ನಾವು google ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ಮರುಹೊಂದಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ನಿಮ್ಮ google ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ನೀವು ಮರೆತಿದ್ದರೆ, ನಿಮ್ಮ google ಅಪ್ಲಿಕೇಶನ್ಗಳ ಮೂಲಕ ಅದನ್ನು ಮರುಹೊಂದಿಸಬೇಕಾಗುತ್ತದೆ.',
      'resource-description-length': 'ವಿವರಣೆ 500 ಅಕ್ಷರಗಳಿಗಿಂತ ಉದ್ದವಾಗಿರಬಾರದು.',
      'resource-invalid-url': 'ಅಮಾನ್ಯವಾದ url.',
      'resource-missing-title': 'ದಯವಿಟ್ಟು ಸಂಪನ್ಮೂಲ ಶೀರ್ಷಿಕೆ ನಮೂದಿಸಿ.',
      'resource-missing-type': 'ದಯವಿಟ್ಟು ಸಂಪನ್ಮೂಲ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      'resource-missing-url': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ url ಅನ್ನು ನಮೂದಿಸಿ.',
      'resource-not-added-to-collection':
        'ಓಹ್! ಇದೀಗ ಸಂಗ್ರಹಕ್ಕೆ ಸಂಪನ್ಮೂಲವನ್ನು ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'resource-not-copied':
        'ಓಹ್! ಇದೀಗ ಸಂಪನ್ಮೂಲ ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'resource-not-created':
        'ಓಹ್! ಇದೀಗ ಸಂಪನ್ಮೂಲವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'resource-not-updated':
        'ಓಹ್! ಇದೀಗ ಸಂಪನ್ಮೂಲ ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'resource-same-host-url': 'ಸಂಪನ್ಮೂಲಗಳು gooru url ಆಗಿರಬಾರದು.',
      'resource-title-length': 'ಶೀರ್ಷಿಕೆಯು 50 ಅಕ್ಷರಗಳಿಗಿಂತ ಉದ್ದವಾಗಿರಬಾರದು.',
      'rubric-title-presence': 'ದಯವಿಟ್ಟು ರಬ್ರಿಕ್ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'rubric-url-presence': 'ದಯವಿಟ್ಟು ರಬ್ರಿಕ್ url ಅನ್ನು ನಮೂದಿಸಿ.',
      'select-correct-answer': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
      'search-collections-length': 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳನ್ನು ನಮೂದಿಸಿ.',
      'sign-in-credentials-not-valid':
        'ಓಹ್! ಏನೋ ಸರಿಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ಎರಡು ಬಾರಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'sign-in-google-account-exists':
        'ದಯವಿಟ್ಟು Google ಸೈನ್ಇನ್ ಅನ್ನು ಬಳಸಿ. ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ನಮಗೆ ಸಾಧ್ಯವಿಲ್ಲ.',
      'sign-up-error':
        'ಓಹ್! ಇದೀಗ ಸೈನ್ ಅಪ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'sign-up-first-name': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮೊದಲ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.',
      'sign-up-last-name': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕೊನೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.',
      'sign-up-name-length': 'ಕೊನೆಯ ಹೆಸರಿನಲ್ಲಿ ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು ಇರಬೇಕು.',
      'sign-up-name-only-letters': 'ದಯವಿಟ್ಟು ಅಕ್ಷರಗಳನ್ನು ಮಾತ್ರ ನಮೂದಿಸಿ.',
      'sign-up-valid-email': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
      'special-characters':
        'ನೀವು ವಿಶೇಷ ಅಕ್ಷರಗಳು ಅಥವಾ ಸ್ಥಳಗಳನ್ನು ಬಳಸಲಾಗುವುದಿಲ್ಲ.',
      'unit-not-copied':
        'ಓಹ್! ಇದೀಗ ಘಟಕವನ್ನು ನಕಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'unit-not-created':
        'ಓಹ್! ಇದೀಗ ಘಟಕವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'unit-not-loaded':
        'ಓಹ್! ಇದೀಗ ಘಟಕವನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'unit-title-required': 'ದಯವಿಟ್ಟು ಯುನಿಟ್ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
      'user-email-presence': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ಅನ್ನು ನಮೂದಿಸಿ.',
      'username-length': 'ಬಳಕೆದಾರಹೆಸರು 4 ಮತ್ತು 254 ಅಕ್ಷರಗಳ ನಡುವೆ ಇರಬೇಕು.',
      'forgot-password-gmail':
        'ದಯವಿಟ್ಟು Google ಸೈನ್ಇನ್ ಅನ್ನು ಬಳಸಿ. ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ನಮಗೆ ಸಾಧ್ಯವಿಲ್ಲ.',
      'no-studymaterial':
        'The course assigned to this class does not have any study material in it. Please contact your teacher to fix this'
    },
    'essential-questions': 'ಅಗತ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು',
    example: 'ಉದಾಹರಣೆ:',
    exit: 'ನಿರ್ಗಮನ',
    'external-collection': 'External Collection',
    explanation: 'ವಿವರಣೆ',
    explore: 'ಅನ್ವೇಷಿಸಿ',
    false: 'ಸುಳ್ಳು',
    'featured-courses': 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಮತ್ತು ಕಡ್ಡಾಯ; ಶಿಕ್ಷಣ',
    'file-name': 'ಕಡತದ ಹೆಸರು',
    finish: 'ಮುಗಿಸಿ',
    'first-name': 'ಮೊದಲ ಹೆಸರು',
    follow: 'ಅನುಸರಿಸಿ',
    followers: 'ಅನುಯಾಯಿಗಳು',
    following: 'ಅನುಸರಿಸುತ್ತದೆ',
    forgotPassword: 'ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ',
    from: 'ನಿಂದ',
    'from-my-assessments': 'ನನ್ನ ಮೌಲ್ಯಮಾಪನಗಳಿಂದ',
    'from-my-collections': 'ನನ್ನ ಸಂಗ್ರಹಣೆಯಿಂದ',
    'from-my-questions': 'ನನ್ನ ಪ್ರಶ್ನೆಗಳಿಂದ',
    'from-my-resources': 'ನನ್ನ ಸಂಪನ್ಮೂಲಗಳಿಂದ',
    'hide-results': 'ಫಲಿತಾಂಶಗಳನ್ನು ಮರೆಮಾಡಿ',
    hints: 'ಸುಳಿವುಗಳು',
    home: 'ಮನೆ',
    if_questions: 'ನಿಮಗೇನಾದರೂ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ,',
    information: 'ಮಾಹಿತಿ',
    'in-progress': 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    instructor: 'ಬೋಧಕ',
    'last-name': 'ಕೊನೆಯ ಹೆಸರು',
    'last-updated': 'ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ',
    'latest-attempt': 'ಇತ್ತೀಚಿನ ಪ್ರಯತ್ನ',
    'launch-anonymous': 'ಅನಾಮಿಕ ಪ್ರಾರಂಭಿಸಿ',
    'launch-on-air': 'ಲೈವ್ ಆಗಿ',
    'learning-objectives': 'ಕಲಿಕೆ ಉದ್ದೇಶಗಳು',
    'learning-target': 'ಸೂಕ್ಷ್ಮ ಗುಣಮಟ್ಟದ',
    'learning-target-mobile': 'ಮಾನದಂಡದಲ್ಲಿ ಸೂಕ್ಷ್ಮ-ಗುಣಮಟ್ಟದ',
    lesson: 'ಪಾಠ',
    lessonInitial: 'ಎಲ್',
    'lesson-title': 'ಪಾಠ ಶೀರ್ಷಿಕೆ',
    lessonObj: {
      zero: 'ಪಾಠಗಳನ್ನು',
      one: 'ಪಾಠ',
      other: 'ಪಾಠಗಳನ್ನು'
    },
    libraries: 'ಗ್ರಂಥಾಲಯಗಳು',
    license: 'ಪರವಾನಗಿ',
    link: 'ಲಿಂಕ್',
    'link-out': 'ಲಿಂಕ್ ಔಟ್',
    'link-out-message':
      '* ನಿಮ್ಮ ಸಂಪನ್ಮೂಲವು ಮೇಲಿನ ಪೂರ್ವವೀಕ್ಷಣೆಯಲ್ಲಿ ಖಾಲಿಯಾಗಿದ್ದರೆ, ವಿಷಯವನ್ನು ವೀಕ್ಷಿಸಲು ಇನ್ನೊಂದು ಪುಟಕ್ಕೆ \\\\\\\'ಲಿಂಕ್-ಔಟ್\\\\\\\' ಮಾಡಬೇಕಾಗಬಹುದು.',
    'live-assessments': 'ಲೈವ್ ಮೌಲ್ಯಮಾಪನಗಳು',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ ...',
    login: 'ಲಾಗ್ ಇನ್ ಮಾಡಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    mastery: 'ಪಾಂಡಿತ್ಯ',
    menu: 'ಮೆನು',
    'more-details': 'ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ',
    move: 'ಸರಿಸಲು',
    myContent: 'ನನ್ನ ವಿಷಯ',
    myProfile: 'My Location',
    library: 'ಗ್ರಂಥಾಲಯ',
    myPerformance: 'ನನ್ನ ಅಭಿನಯ',
    'edit-narration': 'ಸಂಪಾದನೆ ನಿರೂಪಣೆ',
    narration: 'ನಿರೂಪಣೆ',
    'new-assessment': 'ಹೊಸ ಮೌಲ್ಯಮಾಪನ',
    'new-collection': 'ಹೊಸ ಸಂಗ್ರಹ',
    'new-question': 'ಹೊಸ ಪ್ರಶ್ನೆ',
    'new-question-text': 'ಪ್ರಶ್ನೆ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ',
    'new-fib-question-text': '[ಉತ್ತರ] ಜೊತೆ ಪ್ರಶ್ನೆ ನಮೂದಿಸಿ',
    'new-resource': 'ಹೊಸ ಸಂಪನ್ಮೂಲ',
    next: 'ಮುಂದಿನ',
    no: 'ಇಲ್ಲ',
    'no-archived': 'ನೀವು ಯಾವುದೇ ಆರ್ಕೈವ್ ಮಾಡಲಾದ ಕ್ಲಾಸ್ ರೂಮ್ಗಳನ್ನು ಹೊಂದಿಲ್ಲ.',
    'no-content': 'ಯಾವುದೇ ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ',
    'no-content-my-report':
      'ಯಾವುದೇ ವರದಿಗಳು ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ. ಒಮ್ಮೆ ನೀವು ಅಧ್ಯಯನ ಪ್ರಾರಂಭಿಸಿದಾಗ, ನಿಮ್ಮ ವರದಿಗಳು ಲಭ್ಯವಾಗುತ್ತವೆ.',
    'no-assessments-to-display':
      'ಯಾವುದೇ <span> ಮೌಲ್ಯಮಾಪನಗಳನ್ನು </span> ಪ್ರದರ್ಶಿಸಲು.',
    'no-collections-to-display':
      'ಯಾವುದೇ <span> ಸಂಗ್ರಹಣೆಗಳು </span> ಪ್ರದರ್ಶಿಸಲು.',
    'no-courses-to-display': 'ಪ್ರದರ್ಶಿಸಲು ಯಾವುದೇ <span> ಶಿಕ್ಷಣ </span> ಇಲ್ಲ.',
    'no-questions-to-display':
      'ಯಾವುದೇ <span> ಪ್ರಶ್ನೆಗಳನ್ನು </span> ಪ್ರದರ್ಶಿಸಲು ಇಲ್ಲ.',
    'no-resources-to-display':
      'ಯಾವುದೇ <span> ಸಂಪನ್ಮೂಲಗಳನ್ನು </span> ಪ್ರದರ್ಶಿಸಲು.',
    'no-rubrics-to-display':
      'ಪ್ರದರ್ಶಿಸಲು ಯಾವುದೇ <span> ರಬ್ರಿಕ್ಸ್ </span> ಇಲ್ಲ.',
    'no-followers': 'ನಿಮಗೆ ಇನ್ನೂ ಅನುಯಾಯಿಗಳು ಇಲ್ಲ.',
    'no-independent-results':
      'ನಿಮ್ಮ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲಾದ {{ವಿಷಯ}} ಶೋಧವನ್ನು ನೀವು ಪ್ರಾರಂಭಿಸಿದಾಗ, ಅವರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
    'no-results': 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬರಲಿಲ್ಲ',
    'no-available-results': 'ಲಭ್ಯವಿಲ್ಲ ಫಲಿತಾಂಶಗಳು',
    'no-results-message':
      'ನಿಮ್ಮ ಕಾಗುಣಿತವನ್ನು ಪರಿಶೀಲಿಸಿ. ನಾವೆಲ್ಲರೂ ತಪ್ಪುಗಳನ್ನು ಮಾಡಿದ್ದೇವೆ! <br/> ವಿಶಾಲವಾಗಿ ಹೋಗಿ ಕೆಲವು ಶೋಧಕಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. <br/> ಅಥವಾ ಬದಲಿಗೆ ಇದೇ ಪದವನ್ನು ಹುಡುಕಲು ಪ್ರಯತ್ನಿಸಿ.',
    'no-more-attempts': 'ಯಾವುದೇ ಪ್ರಯತ್ನಗಳಿಲ್ಲ',
    'no-dca-student':
      'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳಿಗೆ ನಿಮ್ಮ ಶಿಕ್ಷಕ ಯಾವುದೇ ಸಂಗ್ರಹಣೆಗಳು ಅಥವಾ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಇನ್ನೂ ನಿಯೋಜಿಸಲಾಗಿಲ್ಲ.',
    'no-dca-teacher':
      'ಪ್ರಸ್ತುತ ಚಟುವಟಿಕೆಗಳಿಲ್ಲ. ಪಠ್ಯ ಮ್ಯಾಪ್ ಅಥವಾ ನನ್ನ ವಿಷಯದಿಂದ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳನ್ನು ಸೇರಿಸಿ.',
    notScored: 'ಅಸಮಂಜಸವಾಗಿದೆ',
    notStarted: 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ',
    'not-added': 'ಸೇರಿಸಲಾಗಿಲ್ಲ',
    'not-applicable': 'ಎನ್ / ಎ',
    'not-following': 'ನೀವು ಯಾರನ್ನಾದರೂ ಅನುಸರಿಸುತ್ತಿಲ್ಲ.',
    'not-provided': 'ಒದಗಿಸಿಲ್ಲ',
    'not-specified': 'ನಿರ್ದಿಷ್ಟಪಡಿಸಲಾಗಿಲ್ಲ',
    not_started: 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ',
    'nothing-to-display': 'ಪ್ರದರ್ಶಿಸಲು ಏನೂ ಇಲ್ಲ.',
    number: 'ಇಲ್ಲ.',
    numberStudents: {
      zero: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು',
      one: '{{count}} ವಿದ್ಯಾರ್ಥಿ',
      other: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು'
    },
    of: 'ಆಫ್',
    off: 'ಆಫ್',
    on: 'ಆನ್',
    other: 'ಇತರ',
    'overall-performance': 'ಒಟ್ಟಾರೆ ಪ್ರದರ್ಶನ',
    password: 'ಪಾಸ್ವರ್ಡ್',
    pending: 'ಬಾಕಿ ಉಳಿದಿದೆ',
    performance: 'ಪ್ರದರ್ಶನ ಪ್ರದರ್ಶನ',
    'performance-dashboard': 'ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    'personal-information': 'ವಯಕ್ತಿಕ ಮಾಹಿತಿ',
    play: 'ಆಡಲು',
    please_contact: 'ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ',
    'post-message': 'ಪೋಸ್ಟ್ ಸಂದೇಶ',
    preview: 'ಮುನ್ನೋಟ',
    profile: 'ಪ್ರೊಫೈಲ್',
    'profile-publishing': 'ಪ್ರೊಫೈಲ್ ಗೋಚರತೆ',
    'publish-to': ' ನನ್ನ ಪ್ರೊಫೈಲ್ ಲೈಬ್ರರಿಯಲ್ಲಿ ಇತರರಿಗೆ ಇದನ್ನು ಗೋಚರಿಸುತ್ತದೆ',
    'published-by': 'ಪ್ರಕಟಿಸಿದ',
    'published-tooltip': 'ಕೆಟ್ಟ ವಿಷಯ',
    publisher: 'ಪ್ರಕಾಶಕ',
    prev: 'Prev',
    progress: 'Progress',
    question: 'ಪ್ರಶ್ನೆ',
    questions: 'ಪ್ರಶ್ನೆಗಳು',
    'questions-OE': 'ಉಚಿತ ಪ್ರತಿಕ್ರಿಯೆ ಪ್ರಶ್ನೆಗಳು',
    'question-pl': {
      zero: 'ಪ್ರಶ್ನೆಗಳು',
      one: 'ಪ್ರಶ್ನೆ',
      other: 'ಪ್ರಶ್ನೆಗಳು'
    },
    'question-title': 'ಪ್ರಶ್ನೆ ಶೀರ್ಷಿಕೆ',
    'question-type': {
      SA: 'ಒಂದೇ ಉತ್ತರ',
      MC: 'ಬಹು ಆಯ್ಕೆ',
      FIB: 'ಬಿಟ್ಟ ಸ್ಥಳದಲ್ಲಿ ಭರ್ತಿ ಮಾಡಿ',
      'T/F': 'ಸರಿ ಅಥವಾ ತಪ್ಪು',
      T_F: 'ಸರಿ ಅಥವಾ ತಪ್ಪು',
      MA: 'ಬಹು ಉತ್ತರ',
      OE: 'ಉಚಿತ ಪ್ರತಿಕ್ರಿಯೆ',
      HS_TXT: 'ಬಹು ಆಯ್ಕೆ - ಪಠ್ಯ',
      HS_IMG: 'ಬಹು ಆಯ್ಕೆ - ಚಿತ್ರ',
      HT_TO: 'ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಆರ್ಡರ್',
      HT_RO: 'ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಆರ್ಡರ್',
      HT_HL: 'ಹೈಲೈಟ್ ಪಠ್ಯ'
    },
    reaction: 'ಪ್ರತಿಕ್ರಿಯೆ',
    'read-first': '<b> ಇದನ್ನು ಮೊದಲು ಓದಿ! </b>',
    remaining: '{{ಸಂಖ್ಯೆ}} ಉಳಿದಿದೆ',
    remix: 'ರೀಮಿಕ್ಸ್',
    'remix-assessment': 'ರೀಮಿಕ್ಸ್ ಮೌಲ್ಯಮಾಪನ',
    'remix-assessment-lead': 'ನೀವು ಮೌಲ್ಯಮಾಪನವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲಿದ್ದೀರಿ.',
    'remix-assessment-success':
      'ನೀವು ಮೌಲ್ಯಮಾಪನವನ್ನು {{assessmenttitle}} ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ. ಆ ಮೌಲ್ಯಮಾಪನವನ್ನು ಸಂಪಾದಿಸಲು ನೀವು ಬಯಸುವಿರಾ?',
    'remix-collection': 'ರೀಮಿಕ್ಸ್ ಸಂಗ್ರಹ',
    'remix-collection-lead':
      'ನೀವು ಸಂಗ್ರಹವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೀರಿ.',
    'remix-collection-success':
      'ನೀವು {{collectiontitle}} ಸಂಗ್ರಹವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ. ನೀವು ಆ ಸಂಗ್ರಹವನ್ನು ಸಂಪಾದಿಸಲು ಬಯಸುವಿರಾ?',
    'remix-course': 'ರೀಮಿಕ್ಸ್ ಕೋರ್ಸ್',
    'remix-course-lead': 'ನೀವು ಕೋರ್ಸ್ ರೀಮಿಕ್ಸ್ ಮಾಡಲಿದ್ದೀರಿ.',
    'remix-course-success':
      'ನೀವು ಕೋರ್ಸ್ ಅನ್ನು {{coursetitle}} ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ. ಆ ಕೋರ್ಸ್ ಸಂಪಾದಿಸಲು ನೀವು ಬಯಸುವಿರಾ?',
    'remix-lesson': 'ರೀಮಿಕ್ಸ್ ಪಾಠ',
    'remix-lesson-lead': 'ನೀವು ಪಾಠವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲಿದ್ದೀರಿ.',
    'remix-lesson-success':
      'ನೀವು ಪಾಠವನ್ನು {{lessontitle}} ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ.',
    'remix-question': 'ರೀಮಿಕ್ಸ್ ಪ್ರಶ್ನೆ',
    'remix-question-lead':
      'ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೀರಿ.',
    'remix-question-success':
      'ನೀವು ಪ್ರಶ್ನೆಯನ್ನು {{questiontitle}} ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ. ನೀವು ಆ ಪ್ರಶ್ನೆಯನ್ನು ಸಂಪಾದಿಸಲು ಬಯಸುವಿರಾ?',
    'remix-resource': 'ರೀಮಿಕ್ಸ್ ಸಂಪನ್ಮೂಲ',
    'remix-resource-lead':
      'ನೀವು ಸಂಪನ್ಮೂಲವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೀರಿ.',
    'remix-resource-success':
      'ನೀವು ಸಂಪನ್ಮೂಲ {{resourcetitle}} ಅನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ. ನೀವು ಆ ಸಂಪನ್ಮೂಲವನ್ನು ಸಂಪಾದಿಸಲು ಬಯಸುವಿರಾ?',
    'remix-unit': 'ರೀಮಿಕ್ಸ್ ಘಟಕ',
    'remix-unit-lead':
      'ನೀವು ಒಂದು ಘಟಕವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೀರಿ.',
    'remix-unit-success':
      'ನೀವು {{unittitle}} ಒಂದು ಘಟಕವನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಿದ್ದೀರಿ.',
    'remixed-by': 'ಅದಕ್ಕೆ ರೀಮಿಕ್ಸ್ ಮಾಡಲಾಗಿದೆ',
    'remix-warning':
      'ಮುಖ್ಯಸ್ಥರು! ಈ ಕೋರ್ಸ್ನಲ್ಲಿ ಸಾಕಷ್ಟು ಆಕರ್ಷಕ ವಿಷಯವಿದೆ ಮತ್ತು ನಕಲು ಮಾಡುವ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ನೀವು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ಬಯಸುವಿರಾ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ ಮತ್ತು 15 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ <b> ಪ್ರೊಫೈಲ್ನಲ್ಲಿ ಈ ಕೋರ್ಸ್ನ ನಿಮ್ಮ ನಕಲನ್ನು ನೀವು ಕಾಣಬಹುದು. </b>',
    remove: 'ತೆಗೆದುಹಾಕಿ',
    report: 'ವರದಿ',
    'report-in-progress': 'ವರದಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    'request-to': 'ಬ್ಯಾಡ್ಜ್ಗಾಗಿ ಪರಿಶೀಲಿಸಬೇಕಾದ ವಿನಂತಿಯನ್ನು',
    'request-report': 'ವಿನಂತಿಯನ್ನು ವರದಿ',
    resource: 'ಸಂಪನ್ಮೂಲ',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    'resource-format': {
      image: 'ಚಿತ್ರ',
      text: 'ಪಠ್ಯ',
      video: 'ವೀಡಿಯೊ',
      interactive: 'ಸಂವಾದಾತ್ಮಕ',
      webpage: 'ಅಂತರ್ಜಾಲ ಪುಟ',
      audio: 'ಆಡಿಯೋ',
      question: 'ಪ್ರಶ್ನೆ'
    },
    'resource-pl': {
      zero: 'ಸಂಪನ್ಮೂಲಗಳು',
      one: 'ಸಂಪನ್ಮೂಲ',
      other: 'ಸಂಪನ್ಮೂಲಗಳು'
    },
    'resource-title': 'ಸಂಪನ್ಮೂಲ ಶೀರ್ಷಿಕೆ',
    'resource-url': 'ಸಂಪನ್ಮೂಲ url',
    role: 'ಪಾತ್ರ',
    rubric: 'ರಬ್ರಿಕ್',
    'rubric-creation': 'ರಬ್ರಿಕ್ ಸೃಷ್ಟಿ',
    rubrics: 'ರಬ್ರಿಕ್ಸ್',
    'rubric-title': 'ರಬ್ರಿಕ್ ಶೀರ್ಷಿಕೆ',
    save: 'ಉಳಿಸು',
    'de-select': 'De Select',
    'select-all': 'Select All',
    none: 'None',
    'add-data': 'Add Data',
    'update-data': 'Update Data',
    all: 'All',
    'please-wait': 'Please Wait',
    'unscheduled-items': 'Unscheduled Items',
    'add-to-unschedule': 'Add to unscheduled list for',
    'save-next': 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದಿನದು',
    'save-submit': 'ಉಳಿಸಿ ಮತ್ತು ಎಲ್ಲವನ್ನೂ ಸಲ್ಲಿಸಿ',
    'save-finish': 'ಉಳಿಸಿ ಮತ್ತು ಮುಗಿಸಿ',
    school: 'ಶಾಲೆ',
    'school-info': 'ಶಾಲಾ ಮಾಹಿತಿ',
    score: 'ಸ್ಕೋರ್',
    select: 'ಆಯ್ಕೆಮಾಡಿ',
    'select-a-framework':
      'ಮೊದಲು ಕೋರ್ಸ್ ಮಾಹಿತಿ ವಿಭಾಗದಲ್ಲಿ ಮಾನದಂಡಗಳ ಚೌಕಟ್ಟನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    sentence: 'ವಾಕ್ಯ',
    settings: 'ಸೆಟ್ಟಿಂಗ್ಗಳು',
    search: 'ಹುಡುಕು',
    'search-placeholder': 'ಹುಡುಕು',
    'search-placeholder-text': 'ಹುಡುಕಿ ...',
    'search-error-message': 'ಹುಡುಕಾಟ ಪದಗಳು ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳು ಇರಬೇಕು.',
    'search-400-error-message': 'ದಯವಿಟ್ಟು ಮಾನ್ಯ ಹುಡುಕಾಟ ಪದವನ್ನು ನಮೂದಿಸಿ',
    'search-competency': 'ಹುಡುಕಾಟ ಸಾಮರ್ಥ್ಯ',
    'search-standards': 'ಹುಡುಕಾಟ ಮಾನದಂಡಗಳು',
    'select-question-type': 'ಪ್ರಶ್ನೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    'select-resource-type': 'ಸಂಪನ್ಮೂಲ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'send-request': 'ಕೊರಿಕೆ ಕಳಿಸು',
    share: 'ಹಂಚು',
    'show-correct-answer': 'ಸರಿಯಾದ ಉತ್ತರವನ್ನು ತೋರಿಸು',
    'show-more-results': 'ಹೆಚ್ಚಿನ ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸಿ',
    'show-results': 'ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸು',
    signUp: 'ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    sortAlphabetical: 'ವರ್ಣಮಾಲೆಯ ಪ್ರಕಾರ',
    sortAverage: 'ಸರಾಸರಿ ಪ್ರಕಾರ',
    'sort-most-recently': 'ಇತ್ತೀಚೆಗೆ ನವೀಕರಿಸಿದ ಪ್ರಕಾರ',
    state: 'ರಾಜ್ಯ ಅಥವಾ ಪ್ರದೇಶ',
    'state-territory': 'ರಾಜ್ಯ / ಪ್ರದೇಶ',
    standard: 'ಪ್ರಮಾಣಿತ',
    standards: 'ಮಾನದಂಡಗಳು',
    study: 'ಅಧ್ಯಯನ',
    'study-now': 'ಈಗ ಅಧ್ಯಯನ',
    student: 'ವಿದ್ಯಾರ್ಥಿ',
    students: 'Students',
    'student-id': 'ವಿದ್ಯಾರ್ಥಿ ಐಡಿ (ಪ್ರೊಫೈಲ್ನಲ್ಲಿ ಪ್ರದರ್ಶಿಸುವುದಿಲ್ಲ)',
    'studen-id-display':
      'ವಿದ್ಯಾರ್ಥಿ ಐಡಿ (ಪ್ರೊಫೈಲ್ನಲ್ಲಿ ತೋರಿಸುವುದಿಲ್ಲ, ಅನಾಮಧೇಯ ಕ್ರಮದಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ)',
    'subject-and-framework': 'ವಿಷಯ ಮತ್ತು ಚೌಕಟ್ಟು',
    subject: 'ವಿಷಯ',
    submit: 'ಸಲ್ಲಿಸಲು',
    'submit-all': 'ಎಲ್ಲವನ್ನೂ ಸಲ್ಲಿಸಿ',
    submitAll: 'ಎಲ್ಲವನ್ನೂ ಸಲ್ಲಿಸಿ',
    'submit-finish': 'ಸಲ್ಲಿಸಲು ಮತ್ತು ಮುಗಿಸಲು',
    swap: 'ಮರು-ಆದೇಶ',
    suggestion: 'ಸಲಹೆ',
    suggestions: 'ಸಲಹೆಗಳನ್ನು',
    'suggested-resources': 'ಸೂಚಿಸಿದ ಸಂಪನ್ಮೂಲಗಳು',
    support: 'ಬೆಂಬಲ',
    'start-tour': 'ಪ್ರವಾಸ ಕೈಗೊಳ್ಳಿ',
    'take-me-there': 'ನನ್ನನು ಅಲ್ಲಿಗೆ ಕರೆದುಕೊಂಡು ಹೋಗು',
    teach: 'ಕಲಿಸು',
    teacher: 'ಶಿಕ್ಷಕ',
    timeSpent: 'ಸಮಯ ಕಳೆದರು',
    'toggle-dropdown': 'ಟಾಗಲ್ ಡ್ರಾಪ್ಡೌನ್',
    tools: 'ಉಪಕರಣಗಳು',
    true: 'ನಿಜ',
    type: 'ಮಾದರಿ',
    title: 'Title',
    unBookmark: 'unbookmark',
    unexpectedError:
      'ಅನಿರೀಕ್ಷಿತ ದೋಷ ಸಂಭವಿಸಿದೆ ಮತ್ತು ವರದಿಯಾಗಿದೆ. ಅನಾನುಕೂಲತೆಗಾಗಿ ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ!',
    unfollow: 'ಅನುಸರಿಸಬೇಡಿ',
    unit: 'ಘಟಕ',
    'unit-title': 'ಘಟಕ ಶೀರ್ಷಿಕೆ',
    unitInitial: 'u',
    unitObj: {
      zero: 'ಘಟಕಗಳು',
      one: 'ಘಟಕ',
      other: 'ಘಟಕಗಳು'
    },
    'untitled-course': 'ಕೋರ್ಸ್ 1',
    'untitled-lesson': 'ಹೆಸರಿಸದ ಪಾಠ',
    'untitled-unit': 'ಹೆಸರಿಸದ ಘಟಕ',
    'update-thumbnail': 'ಥಂಬ್ನೇಲ್ ನವೀಕರಿಸಿ',
    'update-photo': 'ಫೋಟೋ ನವೀಕರಿಸಿ',
    upload: 'ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    'upload-file': 'ಫೈಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    'upload-thumbnail': 'ಥಂಬ್ನೇಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    'upload-photo': 'ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    until: 'Until',
    'remove-photo': 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ',
    'use-case': 'ಬಳಕೆ ಪ್ರಕರಣ',
    'valid-extensions': 'ಮಾನ್ಯವಾದ ಫೈಲ್ ವಿಸ್ತರಣೆಗಳು: {{ವಿಸ್ತರಣೆಗಳು}}',
    verified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    'visibility-tooltip': 'ಇತರರಿಗೆ ಗೋಚರಿಸುವುದಿಲ್ಲ',
    'visibility-available': 'ಇತರರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ',
    warnings: {
      'on-air-connection-lost':
        'ಹೋಗಿ ಲೈವ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸಂಪರ್ಕವನ್ನು ಕಳೆದುಕೊಂಡಿದೆ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುಪ್ರಯತ್ನಿಸುತ್ತಿದೆ. ಇದು ಪ್ರಲೋಭನಗೊಳಿಸುವ, ಆದರೆ ನಿಮ್ಮ ಪರದೆಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಬೇಡಿ!',
      'character-limit': 'ನೀವು ಅಕ್ಷರ ಮಿತಿಯನ್ನು ತಲುಪಿದ್ದೀರಿ.'
    },
    word: 'ಪದ',
    yes: 'ಹೌದು',
    'change-score': 'ಬದಲಾವಣೆ ಸ್ಕೋರ್'
  },
  'not-found': {
    tenant: {
      'login-not-found-msg-1':
        'Gooru tenant login not found, page will be automatically redirect to ',
      'login-not-found-msg-2': 'login page in',
      'login-not-found-msg-3': 'sec or click below button to login as'
    }
  },
  index: {
    joinUs: '<br/> ಶಿಕ್ಷಣಕ್ಕೆ ಮಾನವ ಹಕ್ಕು ಗೌರವಿಸಲು ನಮಗೆ ಸೇರಲು',
    browseContent: {
      title: 'ಹಾಯ್ ಇಲ್ಲ! ನೀವು ಏನು ಹುಡುಕುತ್ತಿದ್ದೀರಾ?',
      description_1: 'ನಾನು ಹುಡುಕುತ್ತೇನೆ',
      description_2: 'ಕಲಿಕೆಯ ಸಾಮಗ್ರಿಗಳು',
      description_3: 'ಅಥವಾ',
      button: 'ವಿಷಯವನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
      footer: {
        description_1: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರ?',
        description_2: ' ಇಲ್ಲಿ.',
        login: 'ಲಾಗಿನ್ ಮಾಡಿ'
      },
      grades_missing_message: 'ದಯವಿಟ್ಟು ಗ್ರೇಡ್ ಮತ್ತು ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ.',
      subjects_missing_message: 'ದಯವಿಟ್ಟು ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ.'
    },
    gettingStarted: {
      title: 'ಗೂರು ಜೊತೆ ಪ್ರಾರಂಭಿಸುವುದು',
      toolkit: {
        title: 'ಪ್ರಾರಂಭಿಕ ಟೂಲ್ಕಿಟ್',
        description:
          'ಗೋರು ಗೆ ಸ್ವಾಗತ! ಗೂರು ಜೊತೆ ನೀವು ಏನು ಮಾಡಬಹುದು ಎಂಬುದನ್ನು ತಿಳಿಯಲು ಈ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ತ್ವರಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ.'
      },
      classroom: {
        title: 'ತರಗತಿಯಿಂದ ಕಥೆಗಳು',
        description:
          'ಗೊರೂರು ತಮ್ಮ ತರಗತಿಯಲ್ಲಿ ವ್ಯತ್ಯಾಸವನ್ನು ವ್ಯಕ್ತಪಡಿಸಿದ್ದಾರೆಂದು ಹೇಳುವ ಶಿಕ್ಷಕರ ಕಥೆಗಳ ಮೂಲಕ ಉದಾಹರಣೆಯಾಗಿ ಕಲಿಯಿರಿ.'
      },
      events: {
        title: 'ನಮ್ಮ ಘಟನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ!',
        description:
          'ನಾವು gooru ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಲು ಸಹಾಯ ಮಾಡಲು ಉಚಿತ ವೆಬ್ಯಾನರ್ಗಳು ಮತ್ತು ತರಬೇತಿಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.'
      }
    },
    empowerStudents: {
      title: 'ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ದಾರಿಯನ್ನು ಕಲಿಯಲು ಅಧಿಕಾರವನ್ನು ನೀಡುತ್ತಾರೆ',
      find: 'ಹುಡುಕಿ',
      remix: 'ರೀಮಿಕ್ಸ್',
      share: 'ಹಂಚು',
      monitor: 'ಮಾನಿಟರ್'
    },
    findDescription:
      'ಶಿಕ್ಷಕರು ಮಾಡಿದ ಸಾವಿರಾರು k-12 ಸಂಗ್ರಹಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ, ಅಥವಾ 16m ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹುಡುಕಿ',
    remixDescription:
      'ರೀಮಿಕ್ಸ್ ಸಂಗ್ರಹಣೆಗಳು ಮತ್ತು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳ ಅಗತ್ಯಗಳನ್ನು ಪೂರೈಸಲು ವಿಷಯವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ.',
    shareDescription:
      'ಗೊರೂ ತರಗತಿ ಕೊಠಡಿಗಳ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಷೇರು ಸಂಗ್ರಹಣೆ. ಪ್ರವೇಶವನ್ನು ಪ್ರವೇಶಿಸಲು ಅಗತ್ಯವಿಲ್ಲ.',
    monitorDescription:
      'ನೈಜ ಸಮಯದಲ್ಲಿ ಮಧ್ಯಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳ ನಿಶ್ಚಿತಾರ್ಥ ಮತ್ತು ಪ್ರಗತಿಯನ್ನು ಅಳತೆ ಮಾಡಿ.',
    freeAndOpen: {
      title: 'ಉಚಿತ ಮತ್ತು ಮುಕ್ತ. <br/> ಯಾವಾಗಲೂ.',
      description:
        'ಶಿಕ್ಷಣ ಮಾನವ ಹಕ್ಕು ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಗೂರುವು ಯಾವಾಗಲೂ ಶಿಕ್ಷಣ ಮತ್ತು ವಿಶ್ವದಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ವೆಚ್ಚ ಮತ್ತು ಜಾಹೀರಾತುಗಳನ್ನು ನೀಡುತ್ತದೆ.',
      button: 'ನಮ್ಮ ಮಾರ್ಗವನ್ನು ಕುರಿತು ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ'
    }
  },
  class: {
    info: {
      'class-info': 'ತರಗತಿಯ ಮಾಹಿತಿ',
      teachers: 'ಶಿಕ್ಷಕರು',
      students: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
      subject: 'ವಿಷಯ',
      grade: 'ಗ್ರೇಡ್',
      description: 'ವಿವರಣೆ',
      'edit-info': 'ಮಾಹಿತಿಯನ್ನು ಸಂಪಾದಿಸಿ',
      'share-class': 'ಪಾಲು ತರಗತಿಯ',
      'invite-co-teachers': 'ಸಹ-ಶಿಕ್ಷಕರನ್ನು ಆಹ್ವಾನಿಸಿ',
      'add-students': 'ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಸೇರಿಸಿ',
      'class-code': 'ತರಗತಿಯ ಕೋಡ್',
      delete: 'ತರಗತಿಯನ್ನು ಅಳಿಸಿ'
    },
    edit: {
      'assigned-course': 'ನಿಯೋಜಿಸಲಾದ ಕೋರ್ಸ್',
      'basic-info': 'ಮೂಲ ಮಾಹಿತಿ',
      'class-name': 'ತರಗತಿಯ ಹೆಸರು',
      'class-greetings': 'ತರಗತಿಯ ಪ್ರಕಟಣೆಗಳು',
      'class-greetings-placeholder':
        'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶುಭಾಶಯ ನೀಡಿ, ಅವರನ್ನು ಪ್ರೇರೇಪಿಸಿ ಅಥವಾ ಪ್ರಕಟಣೆ ಮಾಡಿ.',
      'class-minscore': 'ಟ್ರೋಫಿಗಳಿಗೆ ಅಂದಾಜು ಕನಿಷ್ಠ ಸ್ಕೋರ್ (1-100%)',
      'course-map': 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
      'edit-class': 'ತರಗತಿ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಸಂಪಾದಿಸಿ'
    },
    overview: {
      title: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
      locate: 'ನನ್ನನ್ನು ಪತ್ತೆ ಮಾಡಿ',
      'edit-content': 'ವಿಷಯ ಸಂಪಾದಿಸಿ',
      'add-to-daily-class-activities': 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸೇರಿಸಿ',
      'assigned-course': 'Your assigned course',
      'pre-study-title': 'Pre-study for your course',
      'course-map': {
        'rescope-toggle': 'ಸಂಪೂರ್ಣ ಪಠ್ಯ ನಕ್ಷೆ ತೋರಿಸಿ',
        'rescope-info':
          'ಈ ಕೋರ್ಸ್ ಗಣಿತ ಅಡಿಪಾಯ ಕೋರ್ಸ್ನಿಂದ ನಿಮಗಾಗಿ ವೈಯಕ್ತಿಕವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲ್ಪಟ್ಟಿದೆ. ಮೂಲ ಕೋರ್ಸ್ ಅನ್ನು ನೋಡಲು, ಈ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.',
        'custom-msg':
          'ನಿಮ್ಮ ಕೌಶಲ್ಯದ ಆಧಾರದ ಮೇಲೆ ನಾವು ವಿಶೇಷವಾಗಿ ಈ ಕೋರ್ಸ್ ಅನ್ನು ವೈಯಕ್ತೀಕರಿಸುತ್ತೇವೆ. ದಯವಿಟ್ಟು ವೈಯಕ್ತೀಕರಿಸಿದ ಕೋರ್ಸ್ ನಕ್ಷೆಯನ್ನು ನೋಡಲು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪರಿಶೀಲಿಸಿ.',
        'route0-bannerdesc':
          'As per your competency profile, there are some competencies that you need to master so that you can do well in this course. We have a route that we recommend you take to master these competencies. Click here to see the details.'
      }
    },
    analytics: {
      performance: {
        title: 'ಪ್ರದರ್ಶನ ಕಾರ್ಯಕ್ಷಮತೆ',
        'better-experience-message':
          'ಉತ್ತಮ ಗೊರು ಅನುಭವಕ್ಕಾಗಿ, ಟ್ಯಾಬ್ಲೆಟ್ ಅಥವಾ ಡೆಸ್ಕ್ಟಾಪ್ನಲ್ಲಿ ಪೂರ್ಣ ತರಗತಿಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು ವೀಕ್ಷಿಸಿ.',
        'no-content':
          'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಇನ್ನೂ ಕೋರ್ಸ್ ಅಧ್ಯಯನ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿಲ್ಲ.',
        actions: {
          share: 'ಹಂಚು',
          edit: 'ವಿಷಯ ಸಂಪಾದಿಸಿ',
          download: 'ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
          fullScreen: 'ಪೂರ್ಣ ಪರದೆಯನ್ನು ವೀಕ್ಷಿಸಿ',
          exitFullScreen: 'ಪೂರ್ಣ ಪರದೆಯಿಂದ ನಿರ್ಗಮಿಸಿ',
          assessment: 'ವೀಕ್ಷಣೆ ಮೌಲ್ಯಮಾಪನ',
          collection: 'ಸಂಗ್ರಹಣೆ ವೀಕ್ಷಿಸಿ',
          both: 'ಎರಡೂ ವೀಕ್ಷಿಸಿ'
        },
        teacher: {
          metricsTable: {
            average: 'ಸರಾಸರಿ',
            'class-average': 'ವರ್ಗ ಸರಾಸರಿ'
          }
        },
        'grade-items': 'ಗ್ರೇಡ್ ಗೆ ಐಟಂಗಳನ್ನು',
        'no-grade-items': 'Looks like you’re all caught up!',
        'gru-grade-items': {
          students: {
            zero: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು',
            one: '{{count}} ವಿದ್ಯಾರ್ಥಿ',
            other: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು',
            'not-started': 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ'
          }
        }
      },
      mastery: {
        title: 'ಪಾಂಡಿತ್ಯವನ್ನು ವೀಕ್ಷಿಸಿ'
      }
    },
    'quick-start': {
      title: 'ಈ ತರಗತಿಯಲ್ಲಿ ವಿಷಯವನ್ನು ನಿಯೋಜಿಸಿ.',
      'new-course': 'ಹೊಸ ಕೋರ್ಸ್ ಅನ್ನು ತ್ವರಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
      'new-course-desc':
        'ಹೊಸ ಕೋರ್ಸ್, ಸಂಗ್ರಹ ಅಥವಾ ಮೌಲ್ಯಮಾಪನವನ್ನು ರಚಿಸುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ',
      course: 'ಹೊಸ ಕೋರ್ಸ್',
      'new-collection': 'ಹೊಸ ಸಂಗ್ರಹ',
      'new-assessment': 'ಹೊಸ ಮೌಲ್ಯಮಾಪನ',
      'remix-a-sample': 'ಮಾದರಿಯನ್ನು ರೀಮಿಕ್ಸ್ ಮಾಡಿ',
      'add-existing-course': 'ನಿಮ್ಮ ಲೈಬ್ರರಿಯಿಂದ ಕೋರ್ಸ್ ಸೇರಿಸಿ',
      'existing-course-desc': 'ತರಗತಿಯ ಪ್ರಾರಂಭಿಸಲು ತ್ವರಿತ ಮಾರ್ಗ',
      'choose-course': 'ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ',
      'remix-from-course': 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಕೋರ್ಸ್ ರೀಮಿಕ್ಸ್',
      'featured-course': 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಠ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      'remix-desc':
        'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಕೋರ್ಸ್ ನಕಲಿಸಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ',
      'browse-content': 'or browse our content catalogs.'
    }
  },
  classes: {
    classesJoined: 'ನಾನು ಸೇರಿಕೊಂಡ ತರಗತಿ ಕೊಠಡಿಗಳು',
    classesTaught: 'ನಾನು ಕಲಿಸಲು ತರಗತಿಗಳು',
    noClassesJoined: 'ನೀವು ಯಾವುದೇ ತರಗತಿ ಕೊಠಡಿಗಳನ್ನು ಸೇರಿಲ್ಲ',
    noClassesTaught: 'ನೀವು ಯಾವುದೇ ತರಗತಿ ಕೊಠಡಿಗಳನ್ನು ಹೊಂದಿಲ್ಲ'
  },
  content: {
    assessments: {
      edit: {
        'best-practices':
          '<p> ಒಂದು ಮೌಲ್ಯಮಾಪನವು ನೀವು ಮತ್ತು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ತಿಳುವಳಿಕೆ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಬಳಸಬಹುದಾದಂತಹ ಗಳಿಸಿದ ಪ್ರಶ್ನೆಗಳ ಒಂದು ಗುಂಪಾಗಿದೆ. </p> <p> ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ವಿವಿಧ ಪ್ರಶ್ನ ಪ್ರಕಾರಗಳನ್ನು (ಹಲವಾರು sbac ಆಧರಿಸಿ) ಬಳಸಿಕೊಳ್ಳಿ, ಆದ್ದರಿಂದ ವಿದ್ಯಾರ್ಥಿಗಳು ವಿವಿಧ ರೀತಿಗಳಲ್ಲಿ ತಿಳುವಳಿಕೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿ. ಮಾನದಂಡಗಳು, ಸೂಕ್ಷ್ಮ-ಮಾನದಂಡಗಳು, ಮತ್ತು ವೆಬ್ಬ್ಯಾಂನ ಜ್ಞಾನದ ಆಳಕ್ಕೆ ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ನಾವು ಟ್ಯಾಗ್ ಮಾಡುವಂತೆ ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ. </p>'
      }
    },
    classes: {
      create: {
        title: 'ಒಂದು ತರಗತಿಯ ರಚಿಸಿ',
        content: 'ಅಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ವಿಷಯದೊಂದಿಗೆ ತೊಡಗುತ್ತಾರೆ.',
        'class-name-input': 'ನಿಮ್ಮ ತರಗತಿಯ ಹೆಸರು',
        'condition-prompt': 'ವಿದ್ಯಾರ್ಥಿಗಳು ನಿಮ್ಮ ತರಗತಿಯಲ್ಲಿ ಹೇಗೆ ಸೇರುತ್ತಾರೆ?',
        'condition-prompt-code': 'ತರಗತಿಯ ಕೋಡ್ ಹೊಂದಿರುವ ಯಾರಾದರೂ',
        'condition-prompt-invite': 'ಆಮಂತ್ರಿಸಿ ಮಾತ್ರ',
        'get-started': 'ಪ್ರಾರಂಭಿಸಿ'
      },
      join: {
        title: 'ಒಂದು ಹೊಸ ತರಗತಿಯ ಸೇರಲು',
        'join-a-classroom': 'ಒಂದು ತರಗತಿಯ ಸೇರಲು',
        content: 'ಅಲ್ಲಿ ಪ್ರಯಾಣ ಆರಂಭವಾಗುತ್ತದೆ.',
        'not-now': 'ಈಗ ಸಾಧ್ಯವಿಲ್ಲ',
        'class-code-input': 'ತರಗತಿಯ ಕೋಣೆಯನ್ನು ನಮೂದಿಸಿ',
        'class-not-found':
          'ತರಗತಿ ಕಂಡುಬಂದಿಲ್ಲ. ನೀವು ಸರಿಯಾದ ತರಗತಿಯ ಕೋಡ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿದ್ದೀರಿ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ',
        'invalid-code': 'ಅಮಾನ್ಯವಾದ ತರಗತಿಯ ಕೋಡ್.',
        'join-not-allowed':
          'The class you are trying to join is no longer active. Please contact your teacher for the correct class code.',
        'already-member': 'ನೀವು ಈಗಾಗಲೇ ಈ ತರಗತಿಯ ಒಂದು ಸದಸ್ಯರಾಗಿದ್ದೀರಿ.',
        'join-class': 'ತರಗತಿಯ ಸೇರಲು',
        'terms-and-conditions':
          'ಸೇರಲು ತರಗತಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದರ ಮೂಲಕ, ಈ ತರಗತಿಯ ತರಗತಿಯ ಶಿಕ್ಷಕ (ರು) ಜೊತೆಯಲ್ಲಿ ಈ ಗೊರೂ ತರಗತಿಯನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದರಿಂದ ರಚಿಸಲಾದ ನನ್ನ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಸಂಗ್ರಹ ಪ್ರಗತಿಯ ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.'
      }
    },
    collections: {
      edit: {
        'assign-to-course': 'ಕೋರ್ಸ್ಗೆ ನಿಯೋಜಿಸಿ',
        'best-practices':
          '<p> ವಿದ್ಯಾರ್ಥಿಗಳು ಸಂಗ್ರಹ ಮಟ್ಟದಲ್ಲಿ ನಿಮ್ಮ ವಿಷಯವನ್ನು ಸಂವಹಿಸುತ್ತಾರೆ. ಕಲಿಕೆ ಸಂಗ್ರಹವನ್ನು ರಚಿಸುವಾಗ, ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳನ್ನು ಸೇರಿಸುವುದು ಮತ್ತು ವಿವಿಧ ವಿಧಾನಗಳ ಪರಿಕಲ್ಪನೆಯನ್ನು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಒಡ್ಡಲು ವಿವಿಧ ಸಂಪನ್ಮೂಲ ಪ್ರಕಾರಗಳನ್ನು ಬಳಸುವುದನ್ನು ಪರಿಗಣಿಸಿ. </p> <p> ಪರಿಕಲ್ಪನೆಗಳ ಮೇಲೆ ನಿರ್ಮಿಸಲು ಸಂಪನ್ಮೂಲಗಳ ಅನುಕ್ರಮವನ್ನು ಬಳಸಿ. ಸಂಗ್ರಹಣೆಯ ಮೂಲಕ ಪ್ರಗತಿಯು ಒಂದು ತಾರ್ಕಿಕ ರೀತಿಯಲ್ಲಿ ಹರಿಯಬೇಕು ಮತ್ತು ಉದ್ದೇಶಿತ ಪ್ರೇಕ್ಷಕರನ್ನು ಸಾಮಾನ್ಯದಿಂದ ತೆಗೆದುಕೊಳ್ಳುವುದು ಸೂಕ್ತವಾದರೆ, ಅಥವಾ ವಿದ್ಯಾರ್ಥಿ ಅನ್ವೇಷಣೆಗೆ ಸಮರ್ಪಕವಾಗಿ ಅನುಮತಿಸುವ ಉದ್ದೇಶದಿಂದ ಪ್ರೇಕ್ಷಕರನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು. </p> <p> ನಮ್ಮ ಗೊರರು ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಇತರ ಸಂವಹನ. ಸಂಗ್ರಹಣೆಯಲ್ಲಿನ ಉದ್ದೇಶಗಳನ್ನು ಸಾಧಿಸಲು ಸಾಕಷ್ಟು ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು / ಅಥವಾ ಸಾಕಷ್ಟು ಸಂಪನ್ಮೂಲಗಳನ್ನು ನಾವು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ ಮತ್ತು ಪ್ರತಿ ಸಂಪನ್ಮೂಲವು ಒಂದು ಪಾತ್ರ ಮತ್ತು ಉದ್ದೇಶವನ್ನು ಹೊಂದಿದೆ ಎಂದು ಖಾತರಿಪಡಿಸುತ್ತೇವೆ. </p>'
      }
    },
    courses: {
      edit: {
        'assign-to-class': 'ತರಗತಿಗೆ ನಿಯೋಜಿಸಿ',
        'best-practices':
          '<p> ಪಠ್ಯವು ನಿಮ್ಮ ಕಲಿಕೆಯ ವಿಷಯವನ್ನು ಘಟಕಗಳಾಗಿ ಮತ್ತು ಪಾಠಗಳಾಗಿ ಸಂಘಟಿಸಲು ಅನುಮತಿಸುವ ಫೋಲ್ಡರ್ ಆಗಿದೆ. ಒಂದು ಕೋರ್ಸ್ ರಚಿಸುವಾಗ ನೀವು ತಿಳಿಸುವ ಅಗತ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು, ಕಲಿಕೆಯ ಉದ್ದೇಶಗಳು ಮತ್ತು ನಿಮ್ಮ ವಿಷಯದ ಸಂಘಟನೆಯನ್ನು ಪರಿಗಣಿಸಿ. </p> <p> ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಜನರಿಗೆ ವೈವಿಧ್ಯಮಯ ಅನುಭವವನ್ನು ರಚಿಸಲು ನೀವು ಪಾಠಗಳನ್ನು ತುಂಡು ಮಾಡಬಹುದು (ಉದಾಹರಣೆಗೆ, ನೀವು ಅನುಕ್ರಮವಾಗಿ ನಿಮ್ಮ ಘಟಕಗಳು ಕಾಲಾನುಕ್ರಮದಲ್ಲಿ, ವಿಷಯದ ಮೂಲಕ, ಅಥವಾ ಪ್ರಮಾಣಿತವಾಗಿ). </p>',
        information: {
          'course-title': 'ಪಠ್ಯ ಶೀರ್ಷಿಕೆ',
          description: 'ವಿವರಣೆ'
        }
      }
    },
    questions: {
      edit: {
        'add-to': 'ಸೇರಿಸು',
        'best-practices':
          '<p> ಪ್ರಶ್ನೆಯು ವಿದ್ಯಾರ್ಥಿಯ ಉತ್ತರಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಒಂದು ಸಂಪನ್ಮೂಲವಾಗಿದೆ, ಮತ್ತು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು sbac, parcc ಮತ್ತು ಇತರ ಮೌಲ್ಯಮಾಪನಗಳಲ್ಲಿ ನೋಡಿದ ರೀತಿಯ ಪ್ರಶ್ನೆಗಳನ್ನು ಬೆಂಬಲಿಸಲು ನಾವು ಹಲವಾರು ಪ್ರಶ್ನೆ ಪ್ರಕಾರಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. </p> <p> ಈ ಪ್ರಶ್ನೆ ಪ್ರಕಾರಗಳಿಗೆ ಒಡ್ಡಿಕೊಳ್ಳುವ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ನೀಡಲು ಮತ್ತು ಜ್ಞಾನವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಬಹು ಸ್ವರೂಪಗಳನ್ನು ಒದಗಿಸಲು ನೀವು ಬಳಸುವ ಪ್ರಶ್ನೆಗಳ ಪ್ರಕಾರಗಳು. </p> <p> ಮಾನದಂಡಗಳು, ಸೂಕ್ಷ್ಮ ಗುಣಮಟ್ಟ ಮತ್ತು ಜ್ಞಾನದ ಆಳದ ಮಟ್ಟಕ್ಕೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಟ್ಯಾಗ್ ಮಾಡಿ. ಶಿಕ್ಷಕ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಕ ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ರಶ್ನೆಗಳನ್ನು ಹೇಗೆ ಸಂವಹಿಸುತ್ತಿದ್ದಾರೆ ಎಂಬುದನ್ನು ನೀವು ನೋಡಬಹುದು. </p>',
        information: {
          'question-title': 'ಪ್ರಶ್ನೆ ಶೀರ್ಷಿಕೆ',
          'question-type': 'ಪ್ರಶ್ನೆ ಪ್ರಕಾರ'
        },
        builder: {
          'add-answer-choice': '+ ಉತ್ತರ ಆಯ್ಕೆ ಸೇರಿಸಿ',
          'add-hint': 'ಸುಳಿವುಗಳನ್ನು ಸೇರಿಸಿ',
          'add-explanation': 'ವಿವರಣೆಯನ್ನು ಸೇರಿಸಿ',
          answer: 'ಉತ್ತರ',
          'answer-instructions': {
            FIB: 'ಉತ್ತರ ಮತ್ತು ವಿವರಣೆಯ 5 ಸುಳಿವುಗಳನ್ನು ಸೇರಿಸಿ.',
            HS_IMG:
              'ನೀವು ಹತ್ತು ಉತ್ತರ ಚಿತ್ರಗಳಿಗೆ ಸೇರಿಸಬಹುದು ಮತ್ತು ಒಂದು ಅಥವಾ ಹೆಚ್ಚು ಸರಿಯಾದ ಉತ್ತರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
            HS_TXT:
              'ನೀವು ಹತ್ತು ಉತ್ತರ ಆಯ್ಕೆಗಳನ್ನು ಸೇರಿಸಬಹುದು ಮತ್ತು ಒಂದು ಅಥವಾ ಹೆಚ್ಚು ಸರಿಯಾದ ಉತ್ತರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
            HT_HL_ST:
              'ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯುತ್ತಿದ್ದಂತೆ, ಹೈಲೈಟ್ ಮಾಡಿದ ವಾಕ್ಯಗಳನ್ನು ಸೂಚಿಸಲು ಬ್ರಾಕೆಟ್ಗಳನ್ನು ಬಳಸಿ. ಒಂದು ಬ್ರಾಕೆಟ್ ಒಂದು ಸಮಯದಲ್ಲಿ ಒಂದು ವಾಕ್ಯವನ್ನು ಮಾತ್ರ ಹೊಂದಿರುತ್ತದೆ, ಬ್ರಾಕೆಟ್ ಒಳಗೆ ಒಂದು ಅವಧಿಯನ್ನು ಬಳಸಿ. ಉದಾಹರಣೆಗೆ, ಮೊದಲ ಪುಟ್ಟ ಹಂದಿ ಅವನ ಹುಲ್ಲಿನ ಮನೆ ನಿರ್ಮಿಸಿದ. [ದೊಡ್ಡದಾದ ಕೆಟ್ಟ ತೋಳವು ಮನೆಯ ಮೇಲೆ ಬೀಸಿತು.] ಎರಡನೇ ಹಂದಿ ತನ್ನ ಮರದ ಮರದ ಕಟ್ಟಡವನ್ನು ನಿರ್ಮಿಸಿತು. ಅಕ್ಷರ ಮಿತಿ: 5000.',
            HT_HL_WD:
              'ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯುತ್ತಿದ್ದಂತೆ, ಹೈಲೈಟ್ ಮಾಡಿದ ಪದಗಳಿಗಾಗಿ ಬ್ರಾಕೆಟ್ಗಳನ್ನು ಬಳಸಿ. ಒಂದು ಬ್ರಾಕೆಟ್ ಒಂದು ಸಮಯದಲ್ಲಿ ಒಂದೇ ಪದವನ್ನು ಮಾತ್ರ ಹೊಂದಿರುತ್ತದೆ. ಉದಾಹರಣೆಗೆ, [ದೊಡ್ಡ] ಕೆಟ್ಟ ತೋಳವು ಮನೆ ಕೆಳಗೆ ಬೀಳಿಸಿತು. ಅಕ್ಷರ ಮಿತಿ: 5000.',
            HT_RO:
              'ನೀವು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಹತ್ತು ಉತ್ತರ ಆಯ್ಕೆಗಳನ್ನು ಸೇರಿಸಬಹುದು. ಈ ಆದೇಶವನ್ನು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ scrambled ಮಾಡಲಾಗುತ್ತದೆ.',
            MA:
              'ನೀವು ಹತ್ತು ಉತ್ತರಗಳು, ಚಿತ್ರ, ವಿವರಣೆಯನ್ನು ಮತ್ತು ಐದು ಸುಳಿವುಗಳನ್ನು ಸೇರಿಸಬಹುದು.',
            MC:
              'ನೀವು ಹತ್ತು ಉತ್ತರ ಆಯ್ಕೆಗಳನ್ನು ಸೇರಿಸಬಹುದು ಮತ್ತು ಒಂದು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಸೂಚಿಸಬಹುದು. ಅಕ್ಷರ ಮಿತಿ: 200.',
            OE: 'ಸರಿಯಾದ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಬರೆಯಿರಿ. ಅಕ್ಷರ ಮಿತಿ: 5000.',
            'T/F': 'ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.'
          },
          'question-instructions': {
            FIB:
              'ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯುತ್ತಿದ್ದಂತೆ, ನಿಮ್ಮ ಫಿಲ್-ಇನ್ ದಿ-ಖಾಲಿ ಉತ್ತರಗಳಿಗಾಗಿ ಆವರಣಗಳನ್ನು ಬಳಸಿ. ಉದಾಹರಣೆಗೆ: \\\\\\\'ದೊಡ್ಡ ಕೆಟ್ಟ [ತೋಳ] [ಮನೆ] ಬೀಸಿದ.\\\\\\\' ನೀವು ಚಿತ್ರವನ್ನು ಸೇರಿಸಬಹುದು.',
            HS_TXT: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            HS_IMG: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            HT_RO: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            HT_HL: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಪ್ರಾಂಪ್ಟ್ ಬರೆಯಿರಿ.',
            MC: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            MA: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            OE: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.',
            'T/F': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ.'
          },
          'submission-format': {
            title: 'ವಿದ್ಯಾರ್ಥಿ ಸಲ್ಲಿಕೆ ರೂಪ',
            'answer-type': {
              'text-box': 'ಪಠ್ಯ ಪೆಟ್ಟಿಗೆ'
            }
          },
          'feedback-grading': {
            title: 'ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ವರ್ಗೀಕರಣ',
            'from-existing-rubric': 'ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ರಬ್ರಿಕ್ನಿಂದ',
            scoring: 'ಸ್ಕೋರಿಂಗ್',
            'maximum-points': 'ಗರಿಷ್ಠ ಅಂಕಗಳನ್ನು',
            increment: 'ಹೆಚ್ಚಳ',
            'rubric-error': 'ದಯವಿಟ್ಟು ರಬ್ರಿಕ್ ಅನ್ನು ಸೇರಿಸಿ'
          }
        }
      }
    },
    modals: {
      'delete-bookmark': {
        confirmation: 'ಈ {{type}} ಅನ್ನು ಅನ್ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲು ಬಯಸುತ್ತೀರಾ?',
        'delete-error':
          'ಓಹ್! ಈ {{type}} ಇದೀಗ ಅನ್ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
      },
      'remove-class-activity': {
        confirmation:
          'ನಿಮ್ಮ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳಿಂದ ಈ {{type}} ಅನ್ನು ತೆಗೆದುಹಾಕಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?',
        'delete-error':
          'ಓಹ್! ಈ {{type}} ಅನ್ನು ಇದೀಗ ತೆಗೆದುಹಾಕಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
      },
      'delete-class': {
        legend: 'ನೀವು ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಅಳಿಸುತ್ತಿದ್ದೀರಿ',
        'student-access': 'ವಿದ್ಯಾರ್ಥಿಗಳು ತರಗತಿಯ ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ',
        'student-data-deleted': 'ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿ ಡೇಟಾವನ್ನು ಅಳಿಸಲಾಗುತ್ತದೆ'
      },
      'archive-class': {
        title: 'ಆರ್ಕೈವ್ ತರಗತಿಯ',
        legend: 'ನೀವು ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಆರ್ಕೈವ್ ಮಾಡಲಿರುವಿರಿ',
        'links-not-accessible': 'ಎಲ್ಲಾ ಹಂಚಿದ ಲಿಂಕ್ಗಳು ​​ಪ್ರವೇಶಿಸಲಾಗುವುದಿಲ್ಲ',
        'students-no-access':
          'ವಿದ್ಯಾರ್ಥಿಗಳು ತರಗತಿಯ ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ',
        'not-add-students':
          'ನೀವು ಹೆಚ್ಚಿನ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ವರ್ಗಕ್ಕೆ ಸೇರಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ',
        confirmation: 'ನೀವು ಆರ್ಕೈವ್ ಮಾಡಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?'
      },
      'delete-content': {
        legend: 'ನೀವು ಅಳಿಸಲಿದ್ದೀರಿ',
        'content-legend':
          '{1} {{type}} </span> {{index}} - {{parentname}} ನಿಂದ {{title}}',
        'content-legend-header': '{{titlename}} ನಿಂದ {{title}}',
        'delete-warning':
          'ಈ {{ಕೌಟುಂಬಿಕತೆ}} ನಲ್ಲಿರುವ ಎಲ್ಲಾ ವಿಷಯಗಳು ಅಳಿಸಲ್ಪಡುತ್ತವೆ',
        'delete-error':
          'ಓಹ್! ಇದೀಗ {{type}} ಅಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        confirmation:
          'ನೀವು ಮುಂದುವರೆಯಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ದಯವಿಟ್ಟು ಕೆಳಗೆ \\\\\\\'ಅಳಿಸು\\\\\\\' ಎಂದು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು \\\\\\\'ಅಳಿಸಿ\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      'delete-resource': {
        legend:
          'ನೀವು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ದೃಢೀಕರಿಸಿ <b> {{title}} </b>',
        'delete-warning':
          'ಈ {{ಕೌಟುಂಬಿಕತೆ}} ನಲ್ಲಿರುವ ಎಲ್ಲಾ ವಿಷಯಗಳು ಅಳಿಸಲ್ಪಡುತ್ತವೆ',
        'delete-error':
          'ಓಹ್! ಇದೀಗ {{type}} ಅಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        confirmation:
          'ನೀವು ಮುಂದುವರೆಯಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ದಯವಿಟ್ಟು \\\\\\\'ಶಾಶ್ವತವಾಗಿ ಅಳಿಸು\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.',
        'first-check':
          'ಇದು ಶಾಶ್ವತ ಅಳಿಸುವಿಕೆಯಾಗಿದೆ ಮತ್ತು ಅದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ',
        'second-check':
          'ಈ ಸಂಗ್ರಹದ ಪ್ರತಿಗಳು, ನಿಮ್ಮ ಸಂಗ್ರಹಗಳಲ್ಲಿ ಮತ್ತು ಸಮುದಾಯದಲ್ಲಿರುವ ಇತರ ಬಳಕೆದಾರರಿಂದ ಯಾವುದೇ ಸಂಗ್ರಹಣೆಯನ್ನು ಅಳಿಸಲಾಗುತ್ತದೆ'
      },
      'delete-rubric': {
        legend:
          'ನೀವು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ದೃಢೀಕರಿಸಿ <b> {{title}} </b>',
        'delete-warning': 'ಈ ರಬ್ರಿಕ್ನಲ್ಲಿನ ಎಲ್ಲಾ ವಿಷಯಗಳು ಅಳಿಸಲ್ಪಡುತ್ತವೆ',
        'delete-error':
          'ಓಹ್! ಇದೀಗ ರಬ್ರಿಕ್ ಅನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        confirmation:
          'ನೀವು ಮುಂದುವರೆಯಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ದಯವಿಟ್ಟು \\\\\\\'ಶಾಶ್ವತವಾಗಿ ಅಳಿಸು\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.',
        'first-check':
          'ಇದು ಶಾಶ್ವತ ಅಳಿಸುವಿಕೆಯಾಗಿದೆ ಮತ್ತು ಅದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ'
      },
      'remove-content': {
        legend:
          'ನೀವು <b> {{parentname}} </b> ನಿಂದ {{title}} </b> ಅನ್ನು ತೆಗೆದು ಹಾಕಲಿದ್ದೀರಿ.',
        'remove-error':
          'ಓಹ್! ಇದೀಗ {{type}} ಅನ್ನು ತೆಗೆದುಹಾಕಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        confirmation:
          'ನೀವು ಮುಂದುವರೆಯಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ದಯವಿಟ್ಟು ಕೆಳಗೆ \\\\\\\'ತೆಗೆದುಹಾಕಿ\\\\\\\' ಎಂದು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು \\\\\\\'ತೆಗೆದುಹಾಕಿ\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      'remove-student': {
        title: 'ವಿದ್ಯಾರ್ಥಿಯನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಅವರ ಡೇಟಾವನ್ನು ಅಳಿಸಿ',
        legend:
          'ನೀವು ಈ ತರಗತಿಯಿಂದ {{studentname}} ಅನ್ನು ತೆಗೆದುಹಾಕಲು ಮತ್ತು ಅವರ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಅಳಿಸಲಿದ್ದೀರಿ.',
        'data-inaccessible':
          'ಅವರ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಅಳಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ನೀವು ಅಥವಾ ಅವುಗಳಿಂದ ಪ್ರವೇಶಿಸಲಾಗುವುದಿಲ್ಲ',
        'classroom-access':
          'ಅವರು ತರಗತಿಯ ಅಥವಾ ವಿಷಯಕ್ಕೆ ಪ್ರವೇಶವನ್ನು ಹೊಂದಿರುವುದಿಲ್ಲ',
        'data-lost':
          'ಅವರು ವರ್ಗವನ್ನು ಮರು ಸೇರ್ಪಡೆಗೊಳಿಸಿದಲ್ಲಿ, ಹಿಂದಿನ ಎಲ್ಲಾ ಡೇಟಾ ಕಳೆದು ಹೋಗುತ್ತದೆ',
        'remove-error':
          'ಓಹ್! ಇದೀಗ ಈ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ತೆಗೆದುಹಾಕಲು ಸಾಧ್ಯವಾಗುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        confirmation:
          'ನೀವು ಮುಂದುವರೆಯಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ದಯವಿಟ್ಟು ಕೆಳಗೆ \\\\\\\'ಅಳಿಸು\\\\\\\' ಎಂದು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು \\\\\\\'ಅಳಿಸಿ\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      'quick-remove-content': {
        legend:
          '<b> {{title}} </b> ನಿಂದ {{parentname}} </b> ದಿಂದ ತೆಗೆದುಹಾಕಲು ನೀವು ಬಯಸುತ್ತೀರಿ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
      },
      'quick-delete-content': {
        legend:
          '<b> {{title}} </b> ನಿಂದ {{parentname}} </b> ದಿಂದ ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲು ನೀವು ಬಯಸುತ್ತೀರಿ.',
        delete: 'ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿ'
      }
    },
    resources: {
      edit: {
        'best-practices':
          '<p> ಸಂಪನ್ಮೂಲಗಳು ವೀಡಿಯೊಗಳು, ಸಂವಹನ, ವೆಬ್ಸೈಟ್ಗಳು, ಚಿತ್ರಗಳು, Google ಡಾಕ್ಸ್ ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳಂತಹ ವಿವಿಧ ಸ್ವರೂಪಗಳಲ್ಲಿ ಮಲ್ಟಿಮೀಡಿಯಾ ವಿಷಯವಾಗಿದೆ. ಸೃಜನಶೀಲತೆ ಪಡೆದುಕೊಳ್ಳಿ ಮತ್ತು ನಿಮ್ಮ ಸ್ವಂತ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಬಳಸಿ ಅಥವಾ \\\\\\\'ತಾರಕ್\\\\\\\' ಅನ್ನು ಪಡೆದುಕೊಳ್ಳಿ ಮತ್ತು ಗೊರೂನಲ್ಲಿ ನಮ್ಮ ಸಾಕಷ್ಟು ಪೂರೈಕೆಯನ್ನು ಹುಡುಕಿ. </p> <p> ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ತೊಡಗಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಸಂಪನ್ಮೂಲವನ್ನು ಸೇರಿಸಿಕೊಳ್ಳುವುದಕ್ಕಾಗಿ ವಿವಿಧ ಸಂಪನ್ಮೂಲ ಪ್ರಕಾರಗಳನ್ನು ಬಳಸಿ, ಆದ್ದರಿಂದ ನೀವು ಸಂಪನ್ಮೂಲಗಳ ಮೂಲಕ ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಹುದು. </p> <p> ಗುಣಮಟ್ಟ, ಸೂಕ್ಷ್ಮ ಗುಣಮಟ್ಟ ಮತ್ತು 21 ನೇ ಶತಮಾನದ ಕೌಶಲಗಳಿಗೆ ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ನಾವು ಟ್ಯಾಗ್ ಮಾಡುವಂತೆ ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ. ಶಿಕ್ಷಕ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಕ ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಂಪನ್ಮೂಲಗಳೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸುತ್ತಿದ್ದಾರೆ ಎಂಬುದನ್ನು ನೀವು ನೋಡಬಹುದು. </p>',
        'placeholder-message':
          'ಇಲ್ಲಿ ಅದನ್ನು ಪೂರ್ವವೀಕ್ಷಣೆ ಮಾಡಲು <span> ಒಂದು ಸಂಪನ್ಮೂಲವನ್ನು ಸೇರಿಸಿ. </span>',
        'not-implemented':
          'ಸಂಪನ್ಮೂಲ ಸ್ವರೂಪ ಪೂರ್ವವೀಕ್ಷಣೆ <span> ಇನ್ನೂ ಕಾರ್ಯರೂಪಕ್ಕೆ ಬಂದಿಲ್ಲ. </span>',
        information: {
          'im-publisher': 'ನಾನು ಪ್ರಕಾಶಕ',
          'select-a-license': 'ದಯವಿಟ್ಟು ಪರವಾನಗಿ ಆಯ್ಕೆಮಾಡಿ'
        }
      }
    }
  },
  user: {
    'active-classrooms': 'ಸಕ್ರಿಯ ತರಗತಿ ಕೊಠಡಿಗಳು',
    'archived-classrooms': 'ಸಂಗ್ರಹಿಸಿದ ವರ್ಗಗಳು',
    classrooms: 'ತರಗತಿ ಕೊಠಡಿಗಳು',
    rgo: 'rgo',
    'create-class': 'ತರಗತಿಯ ರಚಿಸಿ',
    hello: 'ಹಲೋ, {{name}}!',
    'independent-learning': 'ಸ್ವತಂತ್ರ ಕಲಿಕೆ',
    'join-class': 'ತರಗತಿಯ ಸೇರಲು',
    'joined-classes': {
      zero: 'ನೀವು ಪ್ರಸ್ತುತ {{count}} ಪಾಠದ ಕೊಠಡಿಗಳಲ್ಲಿ ಸೇರಿಕೊಂಡಿದ್ದೀರಿ',
      one: 'ನೀವು ಪ್ರಸ್ತುತ 1 ತರಗತಿಯಲ್ಲಿ ಸೇರಿಕೊಂಡಿದ್ದೀರಿ',
      other: 'ನೀವು ಪ್ರಸ್ತುತ {{count}} ಪಾಠದ ಕೊಠಡಿಗಳಲ್ಲಿ ಸೇರಿಕೊಂಡಿದ್ದೀರಿ'
    },
    'my-current-classes': 'ನನ್ನ ಪ್ರಸ್ತುತ ತರಗತಿಗಳು',
    'manage-goals': 'ಗುರಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    'my-classes': 'ನನ್ನ ತರಗತಿಗಳು',
    'teaching-classes': {
      zero: 'ನೀವು ಪ್ರಸ್ತುತ {{count}} ಪಾಠದ ಕೊಠಡಿಗಳನ್ನು ಬೋಧಿಸುತ್ತಿದ್ದೀರಿ',
      one: 'ನೀವು ಪ್ರಸ್ತುತ 1 ತರಗತಿಗೆ ಬೋಧಿಸುತ್ತಿದ್ದೀರಿ',
      other: 'ನೀವು ಪ್ರಸ್ತುತ {{count}} ಪಾಠದ ಕೊಠಡಿಗಳನ್ನು ಬೋಧಿಸುತ್ತಿದ್ದೀರಿ'
    }
  },
  'student-landing': {
    announcement: 'ಘೋಷಣೆ',
    'browse-featured-courses': 'ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಶಿಕ್ಷಣವನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    'browse-our': 'ನಮ್ಮ ಬ್ರೌಸ್ ಮಾಡಿ',
    'class-code': 'ವರ್ಗ ಕೋಡ್',
    'featured-courses': 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
    class: {
      'assigned-course': 'ನಿಯೋಜಿಸಲಾದ ಕೋರ್ಸ್',
      'back-to': 'ಮತ್ತೆ ತರಗತಿ ಕೊಠಡಿಗಳಿಗೆ',
      'no-course': 'ಈ ತರಗತಿಗೆ ಸಂಬಂಧಿಸಿದ ಕೋರ್ಸ್ ಹೊಂದಿಲ್ಲ.',
      'no-course-assigned': 'ಯಾವುದೇ ಕೋರ್ಸ್ ನಿಯೋಜಿಸಲಾಗಿಲ್ಲ',
      'back-to-independent': 'ಸ್ವತಂತ್ರ ಕಲಿಕೆಗೆ ಹಿಂದಿರುಗಿ',
      report: 'ವರದಿ',
      performance: 'ಪ್ರದರ್ಶನ',
      'course-map': 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
      unit: 'ಘಟಕ',
      lesson: 'ಪಾಠ',
      'class-activities': 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳು',
      'class-activities-tab': {
        today: 'ಇಂದು',
        'past-activities': 'Past Activities'
      },
      'my-report': 'ನನ್ನ ವರದಿ',
      'my-location': 'ನನ್ನ ಸ್ಥಳ',
      'my-proficiency': 'My Proficiency',
      'establish-skyline': 'Let\'s Establish your Skyline',
      'waiting-establish-skyline':
        'Waiting for your teacher to complete setting up the class.',
      'setup-in-complete-desc1': 'It looks like your teacher has not',
      'setup-in-complete-desc2': 'updated class settings',
      'setup-in-complete-desc3':
        'Please get in touch with her to resolve the matter. Once everything is correctly set up, refresh this page.'
    },
    course: {
      'to-report': 'ಬಳಕೆಯ ಸಾರಾಂಶ',
      'total-time-spent': 'ಒಟ್ಟು ಸಮಯ ಕಳೆದರು'
    },
    'current-activity': 'ಪ್ರಸ್ತುತ ಚಟುವಟಿಕೆ',
    'resume-current-activity': 'ಪ್ರಸ್ತುತ ಚಟುವಟಿಕೆ ಪುನರಾರಂಭಿಸಿ',
    'last-activity': 'Last Activity',
    'start-studying': 'Start Studying',
    'not-available': '-ಎ-',
    'join-classroom':
      'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಶಿಕ್ಷಕನ ತರಗತಿಯಲ್ಲಿ ಸೇರ್ಪಡೆಗೊಳ್ಳಿ',
    learn: 'ಗೊರೂ ತರಗತಿಯೊಂದಿಗೆ ಕಲಿಯಿರಿ',
    'my-performance': {
      activity: 'ಚಟುವಟಿಕೆ',
      activities: {
        study: 'ಅಧ್ಯಯನ'
      },
      assessments: 'ಮೌಲ್ಯಮಾಪನಗಳು',
      collections: 'ಸಂಗ್ರಹಣೆಗಳು',
      filter: 'ಫಿಲ್ಟರ್',
      'primary-text':
        'ನೀವು ವಿಶ್ಲೇಷಿಸಲು ಬಯಸುವ ವಿಷಯಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಪ್ರದರ್ಶನ ವರದಿಯನ್ನು ನಾವು ರಚಿಸುತ್ತೇವೆ.',
      subject: 'ವಿಷಯ',
      title: 'ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
      'time-period': 'ಸಮಯದ ಅವಧಿ',
      'update-report': 'ಅಪ್ಡೇಟ್ ವರದಿ'
    },
    'study-player': 'Study Player',
    'my-study': 'ನನ್ನ ಅಧ್ಯಯನ',
    'no-classrooms':
      'ನೀವು ಯಾವುದೇ ತರಗತಿ ಕೊಠಡಿಗಳನ್ನು ಇನ್ನೂ ಸೇರಿಲ್ಲ. ನಿಮ್ಮ ಶಿಕ್ಷಕರ ವರ್ಗವನ್ನು ಸೇರಿಸಲು \\\\\\\'</br> ತರಗತಿಗೆ ಸೇರಲು\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ. ಲೈಬ್ರರಿ ಟ್ಯಾಬ್ನ ಅಡಿಯಲ್ಲಿ ನೀವು ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಠ್ಯವನ್ನು ಸಹ ಹುಡುಕಬಹುದು.',
    'no-content-classrooms': 'ಈ ತರಗತಿಯಲ್ಲಿ ಪ್ರಸ್ತುತ ಯಾವುದೇ ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ',
    welcome: 'ಗೊರೂರಿಗೆ ಸ್ವಾಗತ.',
    'no-course-assigned':
      'No course has been assigned to this class yet. Please contact your teacher.'
  },
  'student-independent-learning': {
    'show-more': 'ಇನ್ನು ಹೆಚ್ಚು ತೋರಿಸು',
    'show-less': 'ಕಡಿಮೆ ತೋರಿಸು',
    'no-courses':
      'ನಿಮ್ಮ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲಾದ ಕೋರ್ಸುಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿದಾಗ, ಅವರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
    'no-collections':
      'ನಿಮ್ಮ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಲಾದ ಸಂಗ್ರಹಣೆಯನ್ನು ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿದಾಗ, ಅವರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
    'no-assessments':
      'ನಿಮ್ಮ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಿದ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ನೀವು ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿದಾಗ, ಅವರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
    'no-independent-results': 'ಹೊಸದನ್ನು ಕಲಿಯಲು ಗ್ರಂಥಾಲಯವನ್ನು ಅನ್ವೇಷಿಸಿ.',
    'no-bookmarks':
      'ನೀವು ಬುಕ್ಮಾರ್ಕಿಂಗ್ ಶಿಕ್ಷಣ, ಸಂಗ್ರಹಣೆಗಳು ಮತ್ತು ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿದಾಗ, ಅವರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
    'add-bookmark': 'ಬುಕ್ಮಾರ್ಕ್ ಸೇರಿಸಿ'
  },
  'teacher-landing': {
    'latest-announcement': 'ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆ',
    'latest-assessment': 'ಇತ್ತೀಚಿನ ಮೌಲ್ಯಮಾಪನ',
    'create-classroom':
      'ತರಗತಿಯೊಂದನ್ನು ರಚಿಸಿ, ವಿಷಯಗಳನ್ನು ನಿಯೋಜಿಸಿ, ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಆಹ್ವಾನಿಸಿ',
    'dca-create-info':
      'Click on the icons below and search for content from the Gooru Library to create a  class activity. You can also add content to  class activity from your course map by clicking on Course Map.',
    'schedule-for-later': 'Schedule For Later',
    'teach-this-activity-later': 'teach this activity later at DCA',
    'schedule-dca-instruction-1':
      'Pick a later date on which to teach this activity.',
    'schedule-dca-instruction-2':
      'This activity will appear at DCA for the chosen date.',
    'navigator-banner': {
      title: 'Navigator for Math',
      description:
        'Utilizing this GPS for Learning technology, we have designed Navigator for Math to ensure that every student can gain confidence and accelerate their learning in math.<br/>Navigator for Math is a course of study covering all math concepts from grades 2-12. Students are routed and rerouted through an individualized pathway designed to build on their current knowledge, as well as fill gaps in their understanding. Through this comprehensive and personalized learning experience, every student can become fully prepared for more advanced math.',
      join: 'Join Demo Class',
      'success-message':
        'You have successfully joined as a co-teacher of the Navigator class',
      'error-message': 'Problem with joining class'
    },
    class: {
      manage: 'Manage',
      reports: 'Reports',
      'daily-activites': 'Daily Activites',
      courses: 'Course',
      'back-to': 'ಮತ್ತೆ ತರಗತಿ ಕೊಠಡಿಗಳಿಗೆ',
      'back-to-archived': 'ಆರ್ಕೈವ್ ಮಾಡಲಾದ ಪಾಠದ ಕೊಠಡಿಗಳಿಗೆ ಮರಳಿ',
      'class-management': 'ವರ್ಗ ನಿರ್ವಹಣೆ',
      atc: 'ATC',
      'performance-overview': 'Performance Overview',
      'student-proficiency': 'Student Proficiency',
      'class-management-tab': {
        actions: 'ಕ್ರಮಗಳು',
        'assessment-min-score': 'ಟ್ರೋಫಿಗಳಿಗಾಗಿ ಅಂದಾಜು ಕನಿಷ್ಠ ಸ್ಕೋರ್',
        'assigned-course': 'ನಿಯೋಜಿಸಲಾದ ಕೋರ್ಸ್',
        archive: 'ಆರ್ಕೈವ್',
        'archive-class': 'ಆರ್ಕೈವ್ ವರ್ಗ',
        'archive-classroom': 'ಆರ್ಕೈವ್ ತರಗತಿಯ',
        'attend-class-with-code': 'ಕೋಡ್ನೊಂದಿಗೆ ವರ್ಗಕ್ಕೆ ಹಾಜರಾಗಲು',
        'class-information': 'ವರ್ಗ ಮಾಹಿತಿ',
        'class-name': 'ತರಗತಿಯ ಹೆಸರು',
        'class-code': 'ವರ್ಗ ಕೋಡ್',
        'click-to-copy-class-code': 'ವರ್ಗ ಕೋಡ್ ನಕಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
        'course-information': 'ಕೋರ್ಸ್ ಮಾಹಿತಿ',
        delete: 'ಅಳಿಸು',
        'delete-class': 'ವರ್ಗ ಅಳಿಸಿ',
        'download-roster': 'ರೋಸ್ಟರ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
        edit: 'ಸಂಪಾದಿಸು',
        'email-address': 'ಇಮೇಲ್ ವಿಳಾಸ',
        'first-name': 'ಮೊದಲ ಹೆಸರು',
        'import-roster': 'ಆಮದು ರೋಸ್ಟರ್',
        'last-name': 'ಕೊನೆಯ ಹೆಸರು',
        message: 'ಸಂದೇಶ',
        performance: 'ಪ್ರದರ್ಶನ',
        students: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
        'student-name': 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು',
        'student-id': 'ವಿದ್ಯಾರ್ಥಿಯ ಐಡಿ',
        teachers: 'ಶಿಕ್ಷಕರು',
        'view-report': 'ವೀಕ್ಷಣೆ ವರದಿ',
        'course-null': 'The classroom has no course assigned yet.',
        'course-subject-null':
          'The course assigned to classroom has not been tagged to a valid subject.',
        'students-null':
          'ನಿಮ್ಮ ತರಗತಿಗೆ ಸೇರಲು ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ವರ್ಗ ಕೋಡ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.'
      },
      'students-tab': {
        'last-name': 'ಕೊನೆಯ ಹೆಸರು',
        'first-name': 'ಮೊದಲ ಹೆಸರು',
        performance: 'ಪ್ರದರ್ಶನ',
        proficiency: 'ಪ್ರಾವೀಣ್ಯತೆ',
        location: 'ಸ್ಥಳ',
        'currently-studying': 'ಪ್ರಸ್ತುತ ಅಧ್ಯಯನ',
        'student-id': 'ವಿದ್ಯಾರ್ಥಿಯ ಐಡಿ',
        remove: 'ತೆಗೆದುಹಾಕಿ',
        mastered: 'Mastered',
        'in-progress': 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
        'not-started': 'Not Started',
        'course-coverage': 'Course Coverage',
        'class-statistics': 'Class Statistics',
        'proficiency-in': 'Proficiency in',
        'data-not-available': 'Data Not Available',
        'course-coverage-label':
          'Cumulative count of competencies for all students in class',
        'error-message':
          'The class does not have a course assigned or does not have students rostered into the class yet. Once the course has been assigned to the class and the students are rostered, the class competency report will be shown here'
      },
      'atc-view': {
        'domains-reviewed': 'Domains to be reviewed',
        'class-activities-completed': 'Class Activities Completed',
        'class-activities-pending': 'Class Activities Pending',
        'show-all': 'Show All',
        collapse: 'Collapse',
        'total-competencies-gained': 'Total Competencies Gained'
      },
      'class-activities': 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳು',
      'offline-class-report': {
        'class-report': 'Class Report',
        'activity-report': 'Activity Report',
        'conducted-on': 'Conducted On',
        'not-started': 'Not Started'
      },
      'back-to-class-activities': 'ದೈನಂದಿನ ದರ್ಜೆಯ ಚಟುವಟಿಕೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
      'class-activities-tab': {
        today: 'ಇಂದು:',
        yesterday: 'ನಿನ್ನೆ:',
        month: 'ತಿಂಗಳು:',
        'add-from-course-map': 'ಕೋರ್ಸ್ ನಕ್ಷೆಯಿಂದ ಸೇರಿಸಿ',
        'add-from-my-content': 'ನನ್ನ ವಿಷಯದಿಂದ ಸೇರಿಸಿ',
        'welcome-dca':
          'ಇಂದು ಪೂರ್ಣಗೊಳಿಸಲು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ನೀವು ನಿಯೋಜಿಸಬಹುದಾದ ನಿಮ್ಮ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಗಮನಿಸಿ: ಇತ್ತೀಚಿನ ಪ್ರಯತ್ನಗಳಿಗಾಗಿ ರಚಿಸಲಾದ ಯಾವುದೇ ವರದಿಗಳು ಇಂದು ಮಾತ್ರ ಲಭ್ಯವಿರುತ್ತವೆ.',
        'enter-max-timespent': 'Enter the Maximum Timespent for the Assessment',
        'enter-max-assessment-time-spent':
          'Enter the time spent in completing the assessment',
        'enter-max-score': 'Enter the Maximum Score for the Assessment',
        hour: 'h',
        min: 'm',
        'question-score': 'Question Score',
        'max-score': 'Max Score',
        'assessment-score': 'Assessment Score',
        'assessment-max-score': 'Assessment Max. Score',
        'enter-valid-timespent': 'Enter the valid time spent',
        'create-activity': 'Create Activity',
        'schedule-activity': 'Schedule Activity',
        'add-subject-framework':
          'Please Select a Subject and Framework at Class Settings',
        'create-external-collection': 'Create an External Collection'
      },
      'click-to-copy': 'ವರ್ಗ ಕೋಡ್ ನಕಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      'course-map': 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
      management: 'ರೋಸ್ಟರ್ ನಿರ್ವಹಣೆ',
      report: 'ವರದಿ',
      performance: 'ಪ್ರದರ್ಶನ',
      'performance-tab': {
        assessments: 'ಮೌಲ್ಯಮಾಪನಗಳು',
        collections: 'ಸಂಗ್ರಹಣೆಗಳು'
      },
      'view-more': 'ಹೆಚ್ಚು ವೀಕ್ಷಿಸಿ',
      'class-settings': {
        'class-settings-sec': {
          'generate-pathway': 'Personalize Learning Path',
          'class-settings-sec-head': 'Class Settings',
          'class-settings-sec-desc': 'Minimum performance to earn a trophy',
          'class-code': 'Class Code',
          subject: 'Subject',
          framework: 'Framework',
          'grade-level': 'Grade Level',
          'option-choose-one': 'Choose One',
          'co-teachers': 'Co-Teachers',
          'add-coteacher': 'Add another teacher',
          'offline-class-label': 'This is an offline classroom',
          'offline-msg':
            'Once marked offline, the classroom cannot be made online again.',
          'offline-toggle-tooltip':
            'Select Yes if you want to make this an offline classroom',
          'offline-tooltip':
            'Classrooms, where students do not study online on Navigator, are marked as Offline. The teacher tracks students learning offline and enters data on behalf of the students',
          language: 'Language of instruction'
        },
        'student-settings-sec': {
          'student-settings-sec-head': 'Student Settings',
          'col-head-active': 'Active'
        },
        'course-settings-sec': {
          'course-settings-sec-head': 'Course Settings',
          'is-route0-applicable':
            'Personalize Learning Path should cover gaps at profile?',
          'apply-settings': 'Apply Settings',
          'origin-info':
            'What is the lowest grade level content that your students should study?',
          'current-grade-info': 'What is the grade level of your class?'
        },
        origin: 'Origin',
        destination: 'Destination',
        students: 'Students',
        'student-id': 'Student-Id',
        'joined-on': 'Joined On',
        'action-lable-add-student': 'Add onother student'
      }
    },
    'no-classrooms':
      'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ತರಗತಿ ಕೊಠಡಿಗಳನ್ನು ರಚಿಸಿಲ್ಲ. ಲೈಬ್ರರಿ ಟ್ಯಾಬ್ನ ಅಡಿಯಲ್ಲಿ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಠ್ಯಕ್ಕಾಗಿ \\\\\\\'ತರಗತಿಯನ್ನು ರಚಿಸು\\\\\\\' ಅಥವಾ ಹುಡುಕಾಟವನ್ನು </br> ಕ್ಲಿಕ್ ಮಾಡಿ.',
    'no-course': 'ನೀವು ಇನ್ನೂ ಈ </br> ತರಗತಿಗೆ ಕೋರ್ಸ್ ಅನ್ನು ನಿಯೋಜಿಸಿಲ್ಲ.',
    teach: 'ಗೊರೂ ತರಗತಿಯೊಂದಿಗೆ ಕಲಿಸು',
    'welcome-course-map':
      'ಕೋರ್ಸ್ ವಿಷಯವನ್ನು ನೀವು ವೀಕ್ಷಿಸಬಹುದು, ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಆನ್ ಅಥವಾ ಆಫ್ ಮಾಡಿ ಮತ್ತು ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ಪ್ರಾರಂಭಿಸಲು ಇದು ನಿಮ್ಮ ಕೋರ್ಸ್ ಮ್ಯಾಪ್ ಆಗಿದೆ. ನೀವು ಒಟ್ಟಾರೆ ವರ್ಗ ಕಾರ್ಯಕ್ಷಮತೆ ಮತ್ತು ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯನ್ನು ಸಹ ವೀಕ್ಷಿಸಬಹುದು. ವರ್ಗ ಪ್ರದರ್ಶನದ ವಿವರವಾದ ನೋಟಕ್ಕಾಗಿ, ನಿಮ್ಮ ತರಗತಿಯ ವರದಿ ಟ್ಯಾಬ್ ಅನ್ನು ಭೇಟಿ ಮಾಡಿ.',
    'welcome-rescoped-course-map':
      'ಈ ಕೋರ್ಸ್ ಅನ್ನು ಪ್ರತಿ ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವೈಯಕ್ತೀಕರಿಸಲಾಗಿದೆ. ನೀವು ವಿದ್ಯಾರ್ಥಿಯ ಕಲಿಕೆಯ ಹಾದಿ (ಪಾತ್ರಗಳು - ಮತ್ತು>) ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ವರ್ಗ ನಿರ್ವಹಣಾ ಪುಟದಲ್ಲಿ ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯ ಕೋರ್ಸ್ ನಕ್ಷೆಯನ್ನು ವೀಕ್ಷಿಸಬಹುದು.',
    'welcome-premium-course-map':
      'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.'
  },
  goals: {
    manage: {
      title: 'ನನ್ನ ಗುರಿಗಳು!',
      'add-goal': 'ಗೋಲು ಸೇರಿಸಿ',
      'goal-label': 'ಗುರಿ',
      'start-date-label': 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
      'end-date-label': 'ಅಂತಿಮ ದಿನಾಂಕ',
      'type-label': 'ಗೋಲು ಪ್ರಕಾರ',
      'status-label': 'ಸ್ಥಿತಿ',
      not_started: 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ',
      activated: 'ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ',
      completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      dropped: 'ಕೈಬಿಡಲಾಯಿತು',
      'reflection-label': 'ಪ್ರತಿಫಲನ',
      save: 'ಉಳಿಸು',
      update: 'ಅಪ್ಡೇಟ್',
      'goals-not-found':
        'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಗುರಿಗಳನ್ನು ಹೊಂದಿಸಿಲ್ಲ. ಮೇಲಿನ ಗುಂಡಿಯನ್ನು \\\\\\\'ಗುಂಡಿಯನ್ನು ಸೇರಿಸು\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನೀವು ಒಂದು ಗುರಿಯನ್ನು ಸೇರಿಸಬಹುದು.'
    },
    create: {
      'error-add-title': 'ದಯವಿಟ್ಟು ಗುರಿ ನಮೂದಿಸಿ',
      'error-length-title': 'ಗೋಲು ಗರಿಷ್ಠ 200 ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು',
      'error-add-start-date': 'ದಯವಿಟ್ಟು ಪ್ರಾರಂಭ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ',
      'error-add-end-date': 'ದಯವಿಟ್ಟು ಅಂತಿಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ',
      'error-greater-end-date':
        'ಅಂತಿಮ ದಿನಾಂಕ ಪ್ರಾರಂಭ ದಿನಾಂಕಕ್ಕಿಂತ ಹೆಚ್ಚಿನದಾಗಿರಬೇಕು',
      'error-add-status': 'ದಯವಿಟ್ಟು ಗುರಿ ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      'error-length-reflection':
        'ಪ್ರತಿಬಿಂಬವು ಗರಿಷ್ಟ 2000 ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು',
      'created-success-msg': 'ನೀವು {{goaltitle}} ಗುರಿಯನ್ನು ರಚಿಸಿದ್ದೀರಿ'
    },
    delete: {
      'deleted-success-msg': 'ನೀವು ಗುರಿಯನ್ನು ಅಳಿಸಿ ಹಾಕಿದ್ದೀರಿ'
    },
    update: {
      'updated-success-msg': 'ನೀವು ಗುರಿಯನ್ನು ನವೀಕರಿಸಿದ್ದೀರಿ'
    }
  },
  'gru-add-to': {
    'add-assessment-to-lesson': 'ನನ್ನ ಮೌಲ್ಯಮಾಪನಗಳಿಂದ ಸೇರಿಸಿ',
    'add-assessment-to-lesson-lead':
      'ಈ ಪಾಠಕ್ಕೆ ಸೇರಿಸಲು ಮೌಲ್ಯಮಾಪನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    'add-collection-to-lesson': 'ನನ್ನ ಸಂಗ್ರಹಣೆಯಿಂದ ಸೇರಿಸಿ',
    'add-collection-to-lesson-lead': 'ಈ ಪಾಠಕ್ಕೆ ಸೇರಿಸಲು ಸಂಗ್ರಹವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    'add-to-collection': 'ಸಂಗ್ರಹಕ್ಕೆ ಸೇರಿಸಿ',
    'add-to-collection-lead':
      'ನೀವು {{contenttitle}} ಅನ್ನು ಸೇರಿಸಲು ಬಯಸುವ ಸಂಗ್ರಹವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    'add-to-existing-classroom': 'ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ತರಗತಿಯಲ್ಲಿ ಸೇರಿಸಿ',
    'add-to-existing-classroom-lead':
      'ನೀವು ಸೇರಿಸಲು ಬಯಸುವ ಒಂದು ತರಗತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    'add-to-assessment': 'ಮೌಲ್ಯಮಾಪನ ಅಥವಾ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರಿಸಿ',
    'add-to-assessment-lead':
      'ನೀವು {{contenttitle}} ಅನ್ನು ಸೇರಿಸಲು ಬಯಸುವ ಮೌಲ್ಯಮಾಪನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    'assessments-info':
      'ಇಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾದ ಮೌಲ್ಯಮಾಪನಗಳು <b> ಮತ್ತೊಂದು ಪಾಠ ಅಥವಾ ಕೋರ್ಸ್ಗೆ ಸೇರಿಲ್ಲ </b>',
    'collections-info':
      'ಇಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾದ ಸಂಗ್ರಹಣೆಗಳು <b> ಮತ್ತೊಂದು ಪಾಠ ಅಥವಾ ಕೋರ್ಸ್ಗೆ ಸೇರಿಲ್ಲ </b>'
  },
  'gru-add-rubric-to-question': {
    title: 'ನನ್ನ ರಬ್ರಿಕ್ಸ್ನಿಂದ ಸೇರಿಸಿ',
    lead: 'ಈ ಪ್ರಶ್ನೆಗೆ ಸೇರಿಸಲು ಒಂದು ರಬ್ರಿಕ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
    'no-rubrics':
      'ಈ ಉಚಿತ ಪ್ರತಿಕ್ರಿಯೆಯ ಪ್ರಶ್ನೆಗೆ ಲಗತ್ತಿಸಬಹುದಾದ ಯಾವುದೇ ರಬ್ರಿಕ್ಸ್ ಅನ್ನು ನೀವು ಇನ್ನೂ ರಚಿಸಿಲ್ಲ. ನನ್ನ ವಿಷಯದ ಅಡಿಯಲ್ಲಿ ನೀವು ರಬ್ರಿಕ್ಸ್ ಅನ್ನು ರಚಿಸಬಹುದು, ಅದನ್ನು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ನಿಂದ ಪ್ರವೇಶಿಸಬಹುದು.',
    'go-to-content': 'ನನ್ನ ವಿಷಯಕ್ಕೆ ಹೋಗು'
  },
  'gru-assessment-confirmation': {
    title: 'ನೀವು ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರಾರಂಭಿಸಲಿದ್ದೀರಿ ...',
    description: 'ಈ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ, {{model.title}}',
    'setting-forward': 'ನೀವು ಮುಂದೆ ಮಾತ್ರ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಬಹುದು',
    'setting-forward-backward':
      'ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ನೀವು ಮುಂದೆ ಮತ್ತು ಹಿಂದಕ್ಕೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಬಹುದು',
    'unlimited-attempts-left': 'ನಿಮಗೆ ಅಪರಿಮಿತ ಪ್ರಯತ್ನಗಳಿವೆ',
    'setting-forward-teacher': 'Student can navigate forward only',
    'setting-forward-backward-teacher':
      'Student can navigate forward and backwards to answer questions',
    'unlimited-attempts-left-teacher': 'Student have unlimited attempts',
    'attempts-left': {
      zero: 'ನಿಮ್ಮಲ್ಲಿ {{count}} ಪ್ರಯತ್ನಗಳಿವೆ',
      one: 'ನಿಮ್ಮಲ್ಲಿ 1 ಪ್ರಯತ್ನ ಉಳಿದಿದೆ',
      other: 'ನಿಮ್ಮಲ್ಲಿ {{count}} ಪ್ರಯತ್ನಗಳಿವೆ',
      'other-teacher': 'Student have {{count}} attempts'
    },
    'unlimited-attempts': 'ನಿಮಗೆ ಅಪರಿಮಿತ ಪ್ರಯತ್ನಗಳಿವೆ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    continue: 'ಮುಂದುವರೆಯಿರಿ',
    start: 'ಪ್ರಾರಂಭಿಸು!',
    submit: 'Submit'
  },
  'gru-submit-confirmation': {
    title: 'ಈ ರಸಪ್ರಶ್ನೆಯನ್ನು ಮುಗಿಸಿ ಮತ್ತು ಎಲ್ಲವನ್ನೂ ಸಲ್ಲಿಸಿ',
    description:
      'ನೀವು ಈ ಪ್ರಯತ್ನವನ್ನು ಅಂತ್ಯಗೊಳಿಸಲು ಮತ್ತು ಎಲ್ಲಾ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸಲ್ಲಿಸುವಿರಿ. ಯಾವುದೇ ಸ್ಕಿಪ್ಡ್ ಪ್ರಶ್ನೆಗಳನ್ನು ತಪ್ಪಾಗಿ ಪರಿಗಣಿಸಲಾಗುವುದು.',
    cancel: 'ರದ್ದುಮಾಡಿ',
    ok: 'ok',
    confirm: 'ಮುಕ್ತಾಯ ರಸಪ್ರಶ್ನೆ',
    'finish-description':
      'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸಲ್ಲಿಸಲು \\\\\\\'ರಸಪ್ರಶ್ನೆ ಮುಗಿಸಿ\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-quick-course-search': {
    'add-from-course': 'ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಪಠ್ಯದಿಂದ ಸೇರಿಸಿ',
    'view-featured-courses': 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಠ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    assign: 'ನಿಯೋಜಿಸಿ'
  },
  'gru-share-pop-over': {
    copy: 'ನಕಲಿಸಿ',
    'ios-tooltip': 'ನಕಲಿಸಲು ಸ್ಪರ್ಶಿಸಿ!',
    'multiarch-tooltip': 'ನಕಲಿಸಲು ctrl + c ಅನ್ನು ಒತ್ತಿರಿ!',
    'safari-osx-tooltip': 'ನಕಲಿಸಲು cmd + c ಅನ್ನು ಒತ್ತಿರಿ!',
    'share-course': 'ಲಿಂಕ್ನೊಂದಿಗೆ ನಿಮ್ಮ ಕೋರ್ಸ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    'share-question': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಲಿಂಕ್ನೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ',
    'share-resource': 'ಲಿಂಕ್ನೊಂದಿಗೆ ನಿಮ್ಮ ಸಂಪನ್ಮೂಲವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    'share-assessment': 'ಲಿಂಕ್ನೊಂದಿಗೆ ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    'share-rubric': 'ಲಿಂಕ್ನೊಂದಿಗೆ ನಿಮ್ಮ ರಬ್ರಿಕ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    'share-collection': 'ನಿಮ್ಮ ಸಂಗ್ರಹವನ್ನು ಲಿಂಕ್ನೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ'
  },
  'gru-category-panel': {
    teacher: {
      title: 'ಶಿಕ್ಷಕರು',
      body:
        'ಗುಣಮಟ್ಟವನ್ನು ಜೋಡಿಸಿದ ವಿಷಯವನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ, ವಿಷಯವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ ಮತ್ತು ಡೇಟಾ ಅನಾಲಿಟಿಕ್ಸ್ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      cta: 'ಕಥೆಗಳನ್ನು ನೋಡಿ'
    },
    student: {
      title: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ',
      body:
        'ಕಲಿಕೆಯ ಸಾಮಗ್ರಿಗಳ ಮೂಲಕ ಆಸಕ್ತಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ನಿರ್ಮಿಸಿ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ ನಡೆಸುತ್ತದೆ.',
      cta: 'ನಮೂದಿಸಿ',
      'text-placeholder': 'ತರಗತಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ'
    },
    district: {
      title: 'ಜಿಲ್ಲೆಗಳಿಗೆ',
      body:
        'ವೈಯಕ್ತೀಕರಿಸಿದ ಕಲಿಕೆ ಸಡಿಲಿಸಲು ಮತ್ತು ಜಿಲ್ಲೆಯ ಪರಿಶೀಲನಾ ಪಠ್ಯಕ್ರಮವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಗೂರು ಜೊತೆ ಸಹಯೋಗ.',
      cta: 'ನಮ್ಮ ಪ್ರಭಾವವನ್ನು ನೋಡಿ'
    },
    partner: {
      title: 'ಪಾಲುದಾರರಿಗೆ',
      body:
        'ಶಿಕ್ಷಣ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ನಮ್ಮ ಸಾಮೂಹಿಕ ಪ್ರಭಾವವನ್ನು ಹೆಚ್ಚಿಸಲು ಮಿಷನ್-ಸಂಯೋಜಿತ ಪಾಲುದಾರರೊಂದಿಗೆ ಸಹಯೋಗ.',
      cta: 'ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಿ'
    }
  },
  'class.gru-class-navigation': {
    active: 'ಸಕ್ರಿಯ:',
    members: 'ಸದಸ್ಯರು',
    greetings: 'ಪ್ರಕಟಣೆಗಳು',
    overview: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
    analytics: 'ಡೇಟಾ',
    teams: 'ತಂಡಗಳು',
    information: 'ತರಗತಿಯ ಮಾಹಿತಿ'
  },
  'class.gru-class-statistics': {
    title: 'ವರ್ಗ ಅಂಕಿಅಂಶಗಳು',
    'on-average': 'ಸರಾಸರಿ',
    performance: 'ಪ್ರದರ್ಶನ',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    'time-spent': 'ಸಮಯ ಕಳೆದರು',
    'no-performance': '-'
  },
  'gru-user-registration': {
    joinTitle: 'ಗೂರು ಸಮುದಾಯಕ್ಕೆ ಸೇರ್ಪಡೆಗೊಳ್ಳಿ!',
    joinDescription:
      'ಅತ್ಯುತ್ತಮ ಉಚಿತ K-12 ಕಲಿಕಾ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹುಡುಕಿ, ರೀಮಿಕ್ಸ್ ಮಾಡಿ ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಿ.',
    googleButton: 'google ನೊಂದಿಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    whyGoogle: 'ಏಕೆ Google ನೊಂದಿಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    descriptionWhyGoogle:
      'ಇದು ವೇಗವಾಗಿ ಮತ್ತು ಸುಲಭವಾಗಿರುತ್ತದೆ. ಪಾಸ್ವರ್ಡ್ ಇಲ್ಲದೆ ಸೈನ್ ಇನ್ ಮಾಡಲು ನಿಮ್ಮ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ Google ಖಾತೆಯನ್ನು ಬಳಸಿ.',
    or: 'ಅಥವಾ',
    noGoogleAccount: 'google ಖಾತೆಯನ್ನು ಹೊಂದಿಲ್ಲವೇ?',
    signUpEmail: 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸದೊಂದಿಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    haveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರ?',
    clickLogIn: 'ಲಾಗ್ ಇನ್ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-welcome-message': {
    title: 'ಗೂರು ಕಲಿಕೆಯ ನ್ಯಾವಿಗೇಟರ್ಗೆ ಸ್ವಾಗತ!',
    'text-temporary-one':
      'ಕಲಿಕೆಯ ನ್ಯಾವಿಗೇಟರ್ನ ಉದ್ದಕ್ಕೂ ನೀವು ಚಲಿಸುತ್ತಿರುವಾಗ, ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೆ ನಾವು ಬೆಂಬಲ ಕೊಡುತ್ತೇವೆ. ಪ್ರವಾಸ ಐಕಾನ್ ತೆಗೆದುಕೊಳ್ಳಲು ನೋಡಿ',
    'text-temporary-two':
      ' ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು ಎಂಬುದರ ಮಾರ್ಗದರ್ಶಿ ಪ್ರವಾಸಗಳಿಗಾಗಿ.',
    'text-one':
      'ಕಲಿಕೆಯ ನ್ಯಾವಿಗೇಟರ್ನ ಉದ್ದಕ್ಕೂ ನೀವು ಚಲಿಸುತ್ತಿರುವಾಗ, ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಈ ಕೆಳಗಿನ ವಿಧಾನಗಳಲ್ಲಿ ಬೆಂಬಲಿಸಲು ನಾವು ಸಂತೋಷಿಸುತ್ತೇವೆ:',
    'text-two': {
      subtitle: 'ಪ್ರವಾಸ ಕೈಗೊಳ್ಳಿ',
      text:
        ': ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು ಎಂಬುದರ ಮಾರ್ಗದರ್ಶಿ ಪ್ರವಾಸಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.'
    },
    'text-three': {
      subtitle: 'ಸಹಾಯ',
      text: ': ಹೆಚ್ಚುವರಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಿಮ್ಮ ಬೆರಳ ತುದಿಗಳಲ್ಲಿ ಬೆಂಬಲ.'
    },
    'text-four': {
      subtitle: 'ಹೊಸದು',
      text: ': ನೀವು ಪ್ರಯತ್ನಿಸಲು ಹೊಸ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.'
    },
    'text-five':
      'ನಿಮ್ಮ ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಲು ನೀವು ಬಯಸಿದರೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ',
    'dont-show-again': 'ಮತ್ತೆ ತೋರಿಸಬೇಡ'
  },
  'sign-up': {
    'step-1-title': 'ಹಲೋ!',
    'step-1-description':
      'ನೀವು ನಮ್ಮೊಂದಿಗೆ ಸೇರಲು ನಿರ್ಧರಿಸಿದ್ದೇವೆ ಎಂದು ನಾವು ಖುಷಿಯಾಗಿದ್ದೇವೆ.',
    'step-child-title': 'ಅಷ್ಟು ವೇಗವಾಗಿಲ್ಲ!',
    'step-child-subtitle': 'ನಿಮ್ಮ ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಲು ನಮಗೆ ಸಾಧ್ಯವಿಲ್ಲ.',
    'step-child-description-1':
      'ನಮ್ಮ ಕಾರಣದಿಂದಾಗಿ ಗೋರು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಲಾಗಲಿಲ್ಲ',
    'step-child-age-requirements': 'ನಿಯಮ ಮತ್ತು ಶರತ್ತುಗಳು',
    'step-child-description-2':
      '. ಕಲಿಯಲು ಮತ್ತು ಕೆಲವು ವರ್ಷಗಳಲ್ಲಿ ನಿಮ್ಮನ್ನು ನೋಡಿ!',
    'step-2-title': 'ಮೂಲ ಮಾಹಿತಿ',
    'step-2-description': 'ನೀವು ಮೂಲ ಅಲ್ಲ, ಆದರೆ ಈ ಮಾಹಿತಿ.',
    'log-in': 'ಲಾಗ್ ಇನ್ ಮಾಡಿ',
    'log-in-description': 'ನೀವು ಈಗಾಗಲೇ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದರೆ.',
    'google-button': 'google ನೊಂದಿಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    username: 'ಬಳಕೆದಾರ ಹೆಸರು',
    dateOfBirth: {
      title: 'ಹುಟ್ಟುಹಬ್ಬ',
      day: 'ದಿನ',
      month: 'ತಿಂಗಳು',
      months: {
        january: 'ಜನವರಿ',
        february: 'ಫೆಬ್ರುವರಿ',
        march: 'ಮಾರ್ಚ್',
        april: 'ಏಪ್ರಿಲ್',
        may: 'ಮೇ',
        june: 'ಜೂನ್',
        july: 'ಜುಲೈ',
        august: 'ಆಗಸ್ಟ್',
        september: 'ಸೆಪ್ಟೆಂಬರ್',
        october: 'ಅಕ್ಟೋಬರ್',
        november: 'ನವೆಂಬರ್',
        december: 'ಡಿಸೆಂಬರ್'
      },
      year: 'ವರ್ಷ',
      'error-message': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.'
    },
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್ವರ್ಡ್',
    rePassword: 'ಪಾಸ್ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    state: 'ರಾಜ್ಯ ಅಥವಾ ಪ್ರದೇಶ',
    district: 'ಜಿಲ್ಲೆಯ ಅಥವಾ ಚಾರ್ಟರ್ ಸಂಘಟನೆ',
    'error-username-taken':
      'ಎಲ್ಲಾ, ಈ ಬಳಕೆದಾರಹೆಸರು ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. ಇನ್ನೊಂದನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
    'error-email-taken': 'ಈ ಇಮೇಲ್ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. ಇನ್ನೊಂದನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
    'error-role-message': 'ದಯವಿಟ್ಟು ಒಂದು ಪಾತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
    'error-country-message': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಾಷ್ಟ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
    'error-state-message': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಾಜ್ಯ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
    'error-district-message':
      'ದಯವಿಟ್ಟು ಪಟ್ಟಿಯಿಂದ ನಿಮ್ಮ ಜಿಲ್ಲೆಯ / ಚಾರ್ಟರ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ \\\\\\\'ಇತರ\\\\\\\' ನಲ್ಲಿ ಅದನ್ನು ಒದಗಿಸಿ.'
  },
  'gru-user-sign-up-cancel': {
    title: 'ನೋಂದಣಿ ಬಿಟ್ಟುಬಿಡಿ?',
    'exit?': 'ನೀನು ನಿಜವಾಗಲೂ ಹೊರಗೆ ಹೂಗಬಯಸುತ್ತೀಯಾ?',
    registration_incomplete: 'ನಿಮ್ಮ ನೋಂದಣಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ.',
    leave: 'ನೋಂದಣಿ ಬಿಟ್ಟು',
    continue: 'ನೋಂದಣಿ ಮುಂದುವರಿಸಿ'
  },
  login: {
    title: 'ಮರಳಿ ಸ್ವಾಗತ!',
    description: 'ಕಲಿಕೆಯು ಕೇವಲ ಮೂಲೆಯಲ್ಲಿದೆ.',
    'title-session-ends': 'ನಿಮ್ಮ ಸೆಷನ್ ಅವಧಿ ಮುಗಿದಿದೆ.',
    'description-session-ends': 'ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    gooruAccountTitle: 'ನಿಮ್ಮ ಗೂರು ಖಾತೆಗೆ ಲಾಗ್ ಇನ್ ಮಾಡಿ',
    googleButton: 'google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    or: 'ಅಥವಾ',
    haveAccount: 'ನೀವು ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ?',
    signUpHere: 'ಇಲ್ಲಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ!',
    forgotPassword: 'ನಿಮ್ಮ ಗುಪ್ತಪದವನ್ನು ಮರೆತಿದ್ದೀರಾ?',
    password: 'ಪಾಸ್ವರ್ಡ್',
    usernameOrEmail: 'ಬಳಕೆದಾರಹೆಸರು ಅಥವಾ ಇಮೇಲ್',
    'log-in': 'ಲಾಗ್ ಇನ್ ಮಾಡಿ'
  },
  'forgot-password': {
    description: 'ಅದು ನಮಗೆ ಎಲ್ಲರಿಗೂ ಸಂಭವಿಸುತ್ತದೆ.',
    usernameOrEmail: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು ನಮೂದಿಸಿ',
    'footer-google-description-1':
      '<a href=\'/sign-in\'> \\\\\\"google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ\\\\\\" ಅನ್ನು ಒತ್ತುವುದರ ಮೂಲಕ ಮತ್ತೊಮ್ಮೆ ಲಾಗಿಂಗ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ. </a>',
    'footer-description-1':
      'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ಲಿಂಕ್ ಹೊಂದಿರುವ ಇಮೇಲ್ ಅನ್ನು ನೀವು ಸ್ವೀಕರಿಸುತ್ತೀರಿ.',
    'footer-description-2':
      'ನೀವು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಹೊಂದಿದ್ದರೆ, ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ',
    mail: 'support@gooru.org',
    'error-email-not-exists': 'ಕ್ಷಮಿಸಿ, ಈ ಇಮೇಲ್ ಅನ್ನು ನಾವು ಗುರುತಿಸುವುದಿಲ್ಲ.',
    secondStepTitle: 'ನಿಮ್ಮ ಇಮೇಲ್ ಪರಿಶೀಲಿಸಿ',
    'secondStepDescription-1':
      'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ಮರುಹೊಂದಿಸಲು ಲಿಂಕ್ ಹೊಂದಿರುವ ಇಮೇಲ್ ಅನ್ನು ನಾವು ನಿಮಗೆ ಕಳುಹಿಸಿದ್ದೇವೆ.',
    'secondStepDescription-2':
      'ನೀವು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಹೊಂದಿದ್ದರೆ, ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ'
  },
  'reset-password': {
    'new-password': 'ನಿಮ್ಮ ಹೊಸ ಗುಪ್ತಪದವನ್ನು ನಮೂದಿಸಿ',
    'new-password-confirm': 'ನಿಮ್ಮ ಗುಪ್ತಪದವನ್ನು ಖಚಿತಪಡಿಸಿ',
    title: 'ಪಾಸ್ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ'
  },
  'change-password': {
    'change-password': 'Change password link',
    title: 'Change Password',
    'current-password-label': 'Enter your current password',
    'change-success': 'Password Changed Successfully !!',
    'new-password-required': 'Please enter your new password.',
    'change-password-error':
      'Uh oh! Something’s not right. Unable to change password. Please try again.'
  },
  footer: {
    footerDescription:
      'ಗೋರು ಅದರ ಪ್ಲಾಟ್ಫಾರ್ಮ್ ತೆರೆದ ಮೂಲವನ್ನು ಮತ್ತು ಸಮುದಾಯವನ್ನು ವಿಷಯವನ್ನು cc0 ಅನ್ನು ಸೃಷ್ಟಿಸಲು ಬದ್ಧವಾಗಿದೆ.',
    company: 'ಕಂಪನಿ',
    community: 'ಸಮುದಾಯ',
    legal: 'ಕಾನೂನುಬದ್ಧ',
    connect: 'ಸಂಪರ್ಕ',
    aboutGooru: 'ಗೂರು ಬಗ್ಗೆ',
    careers: 'ವೃತ್ತಿಗಳು',
    supportCenter: 'ಬೆಂಬಲ ಕೇಂದ್ರ',
    contactUs: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    districts: 'ಜಿಲ್ಲೆಗಳು',
    partners: 'ಪಾಲುದಾರರು',
    coaches: 'ತರಬೇತುದಾರರು',
    events: 'ಕಾರ್ಯಕ್ರಮಗಳು',
    terms: 'ಪದಗಳು',
    privacy: 'ಗೌಪ್ಯತೆ',
    Copyright: 'ಕೃತಿಸ್ವಾಮ್ಯ'
  },
  'grade-dropdown': {
    placeholder: 'ದರ್ಜೆಯ (ರು)',
    prompt: 'ಗ್ರೇಡ್ ಆಯ್ಕೆಮಾಡಿ',
    'pre-k': 'ಪ್ರೀ-ಕೆ',
    elementary: 'ಪ್ರಾಥಮಿಕ',
    'middle-school': 'ಮಧ್ಯಮ ಶಾಲೆ',
    'high-school': 'ಪ್ರೌಢಶಾಲೆ',
    'higher-ed': 'ಉನ್ನತ ಆವೃತ್ತಿ',
    k: 'ಕೆ',
    first: '1',
    second: '2',
    third: '3',
    fourth: '4',
    fifth: '5',
    sixth: '6',
    seventh: '7',
    eighth: '8',
    ninth: '9',
    tenth: '10',
    eleventh: '11',
    twelfth: '12'
  },
  'grade-selector': {
    placeholder: 'Choose Grade Lines to Display'
  },
  'standard-dropdown': {
    placeholder: 'ಪ್ರಮಾಣಿತ ಮೂಲಕ ಬ್ರೌಸ್ ಮಾಡಿ'
  },
  'subject-dropdown': {
    placeholder: 'ವಿಷಯಗಳ)',
    prompt: 'ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ'
  },
  'search-filter': {
    courses: 'ಶಿಕ್ಷಣ',
    collections: 'ಸಂಗ್ರಹಣೆಗಳು',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    assessments: 'ಮೌಲ್ಯಮಾಪನಗಳು',
    questions: 'ಪ್ರಶ್ನೆಗಳು',
    rubrics: 'ರಬ್ರಿಕ್ಸ್',
    'question-types': {
      MC: 'ಬಹು ಆಯ್ಕೆ',
      FIB: 'ಬಿಟ್ಟ ಸ್ಥಳದಲ್ಲಿ ಭರ್ತಿ ಮಾಡಿ',
      'T/F': 'ನಿಜ / ಸುಳ್ಳು',
      TOF: 'ಸರಿ ಅಥವಾ ತಪ್ಪು',
      MA: 'ಬಹು ಉತ್ತರ',
      HS_TXT: 'ಬಹು ಆಯ್ಕೆ - ಪಠ್ಯ',
      HSTXT: 'ಬಹು ಆಯ್ಕೆ ಪಠ್ಯ',
      HS_IMG: 'ಬಹು ಆಯ್ಕೆ - ಚಿತ್ರ',
      HSIMG: 'ಬಹು ಆಯ್ಕೆ ಚಿತ್ರ',
      HT_RO: 'ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಆರ್ಡರ್',
      'HT&RO': 'ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ ಆರ್ಡರ್',
      HT_HL: 'ಬಿಸಿ ಪಠ್ಯ- ಹೈಲೈಟ್',
      'H-THL': 'ಬಿಸಿ ಪಠ್ಯ ಹೈಲೈಟ್',
      OE: 'ಉಚಿತ ಪ್ರತಿಕ್ರಿಯೆ'
    },
    author: {
      placeholder: 'ಲೇಖಕ'
    }
  },
  resource: {
    video: 'ವೀಡಿಯೊ',
    webpage: 'ಅಂತರ್ಜಾಲ ಪುಟ',
    interactive: 'ಸಂವಾದಾತ್ಮಕ',
    question: 'ಪ್ರಶ್ನೆ',
    image: 'ಚಿತ್ರ',
    text: 'ಪಠ್ಯ',
    audio: 'ಆಡಿಯೋ',
    oer: 'ಮೇಲೆ'
  },
  'search-result': {
    resource: 'ಸಂಪನ್ಮೂಲ',
    resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    and: 'ಮತ್ತು',
    question: 'ಪ್ರಶ್ನೆ',
    questions: 'ಪ್ರಶ್ನೆಗಳು',
    'in-this-collection': 'ಈ ಸಂಗ್ರಹಣೆಯಲ್ಲಿ',
    'search-results-for': 'ಇದಕ್ಕಾಗಿ ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು'
  },
  'gru-image-picker': {
    chooseFile: 'ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಿ ...',
    instruction: 'ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್ನಲ್ಲಿ ಫೈಲ್ನಿಂದ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
    restriction: 'ಚಿತ್ರವು JPG, gif ಅಥವಾ png ಫೈಲ್ 5 mb ಗಿಂತ ಚಿಕ್ಕದಾಗಿರಬೇಕು.',
    submit: 'ಚಿತ್ರವನ್ನು ಬಳಸಿ'
  },
  'gru-fib': {
    instructions:
      'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಉತ್ತರವನ್ನು (ಗಳು) ಖಾಲಿ (ಗಳು) ನಲ್ಲಿ ನಮೂದಿಸಿ ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-hs-image': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಚಿತ್ರ (ಗಳು) ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-hs-text': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-hot-text': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-login-prompt': {
    title: 'ಗೋರು ಗೆ ಸ್ವಾಗತ!',
    instructions: 'ಆ ಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ನೀವು ಸೈನ್ ಇನ್ ಮಾಡಬೇಕಾಗುತ್ತದೆ.',
    'existing-user': 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರ?',
    'new-user': 'ಇಲ್ಲಿ ಹೊಸ?',
    'not-now': 'ಈಗ ಸಾಧ್ಯವಿಲ್ಲ',
    'sign-in': 'ಸೈನ್ ಇನ್ ಮಾಡಿ'
  },
  'gru-multiple-answer': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-multiple-choice': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'gru-open-ended': {
    instructions:
      'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಕೆಳಗಿನ ಕ್ಷೇತ್ರದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಮತ್ತು ನೀವು ಮುಗಿಸಿದಾಗ ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಉಳಿಸಲು \\\\\\\'{{action}}\\\\\\\' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    characterLimit: 'ಅಕ್ಷರ ಮಿತಿ'
  },
  'gru-question-viewer': {
    answer: 'ಉತ್ತರ',
    question: 'ಪ್ರಶ್ನೆ'
  },
  'gru-true-false': {
    instructions:
      'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.',
    true: 'ನಿಜ',
    false: 'ಸುಳ್ಳು'
  },
  'gru-reorder': {
    instructions:
      'ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಉತ್ತರಗಳನ್ನು ಮರುಕ್ರಮಗೊಳಿಸಿ, ಮತ್ತು \\\\\\\'{{action}}\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ.'
  },
  'student-first-experience': {
    preStudyTitle: 'Pre-Study for {{title}}',
    'lp-compute-inprogress':
      'We are computing your initial proficiency profile in {{title}}',
    'route0-action': {
      accept: 'Accept',
      ignore: 'Ignore'
    },
    competency: {
      popover: {
        title: '{{title}} HIGHLINE',
        content:
          'You need to study all the standards between your skyline and this grade line to reach your destination.'
      }
    },
    'assigned-course-title': 'Assigned Course for {{title}}',
    'start-studying': 'Start Studying',
    'show-route': 'Show Route',
    'review-destination': 'Review Destination',
    'competency-level': {
      title: 'Your Proficiency Profile',
      mastery: '{{count}} Standards Mastered',
      'in-progress': '{{count}} Standards In Progress',
      'not-started': '{{count}} Standards Not Started',
      'your-skyline': 'Your Skyline'
    },
    explanatory: {
      master: {
        title: 'MASTERED',
        desc:
          'Indicates that there is evidence that you have successfully mastered the standards '
      },
      'in-progress': {
        title: 'IN PROGRESS',
        desc:
          'Indicates that there is evidence that you have started studying the standards and are in progress towards achieving mastered '
      },
      'not-started': {
        title: 'NOT STARTED',
        desc:
          'Indicates that there is no evidence and you are yet to begin studying the standards'
      }
    },
    'competency-level-partial': {
      desc1: 'You are currently in ',
      desc2:
        'This is your {{title}} proficiency profile. It shows your mastery in standards (aka competencies) in the different focus areas in {{title}} (aka domains). The columns show domains and the boxes show the standards within each {{title}} domain.',
      desc3:
        'As you master each of the competencies, the corresponding box is updated to dark blue.',
      desc4:
        'The skyline is the thick white line that shows the highest competencies that you have mastered in each math domain.',
      desc5:
        'If the skyline is at the bottom of a domain, it means the system needs more information to be able to locate you in that topic. As soon as you start on the lessons and check for understandings, your skyline will bump up and update your proficiency in each domain.'
    },
    units: {
      other: '{{count}} Units'
    }
  },
  player: {
    'gru-navigation': {
      'view-report': 'ವೀಕ್ಷಣೆ ವರದಿ'
    },
    'gru-navigator': {
      'see-usage-report': 'ಬಳಕೆಯ ವರದಿ ನೋಡಿ'
    },
    'gru-viewer': {
      'not-iframe-url': {
        header_1: 'ಗೂರು ಒಳಗೆ ಈ ಸಂಪನ್ಮೂಲವನ್ನು ವೀಕ್ಷಿಸಲಾಗುವುದಿಲ್ಲ.',
        header_external_assessment_1:
          'ಈ ಮೌಲ್ಯಮಾಪನವನ್ನು ಗೋರೂನಲ್ಲಿ ನೋಡಲಾಗುವುದಿಲ್ಲ.',
        header_2:
          'ಹೊಸ ಟ್ಯಾಬ್ನಲ್ಲಿ ಸಂಪನ್ಮೂಲವನ್ನು ತೆರೆಯಲು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.',
        'view-resource': 'ಸಂಪನ್ಮೂಲವನ್ನು ವೀಕ್ಷಿಸಿ',
        https_external: 'ಈ ಲಿಂಕ್ ಅನ್ನು ಗೂರು ಒಳಗೆ ನೋಡಲಾಗುವುದಿಲ್ಲ.',
        https_new_tab:
          'ಹೊಸ ಟ್ಯಾಬ್ನಲ್ಲಿ ತೆರೆಯಲು ಕೆಳಗಿನ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.',
        footer_1: 'ನಾನು ಈ ಖಾಲಿ ಪುಟವನ್ನು ಯಾಕೆ ನೋಡುತ್ತಿದ್ದೇನೆ?',
        footer_2:
          'ಗೊರೂನಲ್ಲಿ ಸೇರಿಸಲಾದ ಸಂಪನ್ಮೂಲಗಳು ಸಾವಿರಾರು ವಿವಿಧ ಪ್ರಕಾಶಕರಿಂದ ಬಂದವು',
        footer_3:
          'ತಮ್ಮ ವಿಷಯವನ್ನು ರಚಿಸಿ ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಿ. ಸಂಪನ್ಮೂಲಗಳು ಸೇರಿದಂತೆ ವಿವಿಧ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಹೊಂದಿವೆ',
        footer_4: 'ವಿಷಯವನ್ನು ವೀಕ್ಷಿಸಲು ಮತ್ತೊಂದು ಪುಟಕ್ಕೆ ಕರೆದೊಯ್ಯುವ ಅವಶ್ಯಕತೆಗಳು.'
      }
    }
  },
  'grading-player': {
    answer: 'ಸಲ್ಲಿಸಿದ ಕೆಲಸ',
    'back-to': 'ಹಿಂದೆ',
    'current-response': 'ಪ್ರಸ್ತುತ ಪ್ರತಿಕ್ರಿಯೆ',
    'full-rubric': 'ಪೂರ್ಣ ರಬ್ರಿಕ್',
    grading: 'ವರ್ಗೀಕರಣ',
    level: 'ಮಟ್ಟ',
    roster: 'ರೋಸ್ಟರ್',
    rubric: 'ರಬ್ರಿಕ್',
    'submitted-time': 'ಸಲ್ಲಿಸಿದ ಸಮಯ',
    points: 'ಅಂಕಗಳು',
    prompt: 'ಕಾರ್ಯ ಪ್ರಾಂಪ್ಟ್',
    'overall-comment': 'ಒಟ್ಟಾರೆ ಕಾಮೆಂಟ್',
    'overall-lead': 'ಇಡೀ ಪ್ರಬಂಧದಲ್ಲಿ ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಾರಾಂಶಿಸಿ.',
    'time-spent': 'ಸಮಯ ಕಳೆದರು',
    'total-score': 'ಒಟ್ಟು ಅಂಕ',
    'student-roster': {
      title: 'ವಿದ್ಯಾರ್ಥಿಗಳು ಪಟ್ಟಿ',
      lead: 'ಈ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ನೀಡಿದ್ದಾರೆ'
    },
    'rubric-panel': {
      previous: 'ಹಿಂದಿನ ವಿದ್ಯಾರ್ಥಿ',
      next: 'ಮುಂದಿನ ವಿದ್ಯಾರ್ಥಿ',
      'total-score': 'ಒಟ್ಟು ಅಂಕ',
      points: '({{total}} ಅಂಕಗಳು)'
    }
  },
  profile: {
    'gru-navigation': {
      about: 'ಸುಮಾರು',
      'about-me': 'ನನ್ನ ಬಗ್ಗೆ',
      content: 'ವಿಷಯ',
      followers: 'ಅನುಯಾಯಿಗಳು',
      library: 'ಗ್ರಂಥಾಲಯ',
      'my-content': 'ನನ್ನ ವಿಷಯ',
      following: 'ಅನುಸರಿಸುತ್ತದೆ',
      proficiency: 'ಕುಶಲತೆ',
      preference: {
        preference: 'Preference'
      }
    },
    edit: {
      'select-district': 'ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ...'
    },
    proficiency: {
      'is-empty':
        'ಇನ್ನೂ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ. ಒಮ್ಮೆ ನೀವು ಅಧ್ಯಯನ ಪ್ರಾರಂಭಿಸಿದಾಗ, ನಿಮ್ಮ ಡೇಟಾ ಲಭ್ಯವಾಗುತ್ತದೆ.',
      'expand-chart': 'ಚಾರ್ಟ್ ವಿಸ್ತರಿಸಿ',
      mastered: 'ಮಾಸ್ಟರಿಂಗ್',
      'in-progress': 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
      'not-started': 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ',
      skyline: 'ಸ್ಕೈಲೈನ್',
      baseline: 'ಬೇಸ್ಲೈನ್',
      'grade-line': 'Grade Line',
      'not-tagged':
        'ವರ್ಗವು ಯಾವುದೇ ಕೋರ್ಸ್ ಅನ್ನು ಹೊಂದಿಲ್ಲ ಅಥವಾ ಕೋರ್ಸ್ ಅನ್ನು ಮಾನ್ಯವಾದ ವಿಷಯ ಅಥವಾ ಮಾನದಂಡಗಳಿಗೆ ಟ್ಯಾಗ್ ಮಾಡಲಾಗಿಲ್ಲ.',
      'show-compressed-chart': 'ಸಂಕುಚಿತ ಚಾರ್ಟ್ ತೋರಿಸಿ',
      'show-expanded-chart': 'ವಿವರವಾದ ಚಾರ್ಟ್ ತೋರಿಸಿ'
    },
    preference: {
      'language-preference': 'Language Preference',
      'choose-language': 'Choose language',
      'choose-sec-language': 'Choose',
      'choose-preferred-language': 'Select primary profile language',
      'choose-preferred-other-languages': 'Select other preferred languages',
      language: 'Language',
      'select-category-label': 'Add a new category',
      'choose-category': 'Choose Category',
      'no-data': 'No data',
      'category-preference': 'Category Preference',
      'choose-subject': 'Choose Subject',
      'choose-fwk': 'Choose Framework',
      'add-subject': 'Add Subject',
      'add-sec-language': 'Add other preferred language',
      'other-preferred-languages': 'Other preferred languages'
    }
  },
  'gru-data-picker': {
    score: 'ಸ್ಕೋರ್',
    report: 'ವರದಿ',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    timeSpent: 'ಸಮಯ',
    'time-spent': 'ಸಮಯ ಕಳೆದರು',
    'study-time': 'ಓದುವ ಸಮಯ',
    reaction: 'ಪ್ರತಿಕ್ರಿಯೆ',
    attempts: 'ಪ್ರಯತ್ನ'
  },
  'gru-performance-summary': {
    title: 'ಶೀರ್ಷಿಕೆ',
    scores: 'ಅಂಕಗಳು',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    'time-spent': 'ಒಟ್ಟು ಸಮಯ',
    reaction: 'ಪ್ರತಿಕ್ರಿಯೆ',
    attempts: 'ಪ್ರಯತ್ನಗಳು',
    redo: 'ಸಿದ್ಧ',
    resume: 'ಪುನರಾರಂಭಿಸು',
    study: 'ಈಗ ಅಧ್ಯಯನ',
    'view-report': 'ವೀಕ್ಷಣೆ ವರದಿ',
    'not-applicable': 'ಎನ್ / ಎ',
    'not-started': 'ಇನ್ನೂ ಪ್ರಾರಂಭಿಸಲಾಗಿಲ್ಲ'
  },
  'gru-performance': {
    'no-content': 'ಯಾವುದೇ ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ'
  },
  'gru-performance-metrics': {
    assessment: 'ಮೌಲ್ಯಮಾಪನ',
    collection: 'ಸಂಗ್ರಹ',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    report: 'ವರದಿ',
    student: 'ವಿದ್ಯಾರ್ಥಿ',
    score: 'ಸ್ಕೋರ್',
    'study-time': 'ಸಮಯ ಕಳೆದರು'
  },
  'gru-metrics-sub-header': {
    assessment: 'ಮೌಲ್ಯಮಾಪನ',
    student: 'ವಿದ್ಯಾರ್ಥಿ',
    score: 'ಸ್ಕೋರ್',
    report: 'ವರದಿ',
    completion: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    'time-spent': 'ಸಮಯ'
  },
  'gru-resource-new': {
    'resource-already-exist': 'ಈ ಸಂಪನ್ಮೂಲವು ಈಗಾಗಲೇ ಗೊರೂರಿನಲ್ಲಿ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ!'
  },
  'gru-assessment-report': {
    'gru-summary': {
      'total-time-spent': 'ಒಟ್ಟು ಸಮಯ ಕಳೆದರು'
    },
    'hidden-report':
      'ಈ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ನಿಮ್ಮ ಸಾರಾಂಶ ವರದಿಯನ್ನು ಮರೆಮಾಡಲು ನಿಮ್ಮ ಶಿಕ್ಷಕ ಆಯ್ಕೆ ಮಾಡಿದ್ದಾನೆ.'
  },
  cards: {
    'gru-class-card': {
      student: {
        zero: '{{count}} ವಿದ್ಯಾರ್ಥಿ',
        one: '{{count}} ವಿದ್ಯಾರ್ಥಿ',
        other: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು',
        'not-started': 'ಪ್ರಾರಂಭಿಸಲಿಲ್ಲ'
      },
      unit: {
        zero: 'ಯಾವುದೇ ಕೋರ್ಸ್ ಇಲ್ಲ',
        one: '{{count}} ಯುನಿಟ್',
        other: '{{count}} ಘಟಕಗಳು'
      },
      archived: {
        'request-report':
          'ಈ ವರ್ಗವನ್ನು ಆರ್ಕೈವ್ ಮಾಡಲಾಗಿದೆ ಮತ್ತು ಮಾರ್ಪಡಿಸಲಾಗುವುದಿಲ್ಲ. ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ವರ್ಗ ಡೇಟಾವನ್ನು ವರದಿ ಮೂಲಕ ಪ್ರವೇಶಿಸಬಹುದು.',
        'report-in-progress':
          'ವರದಿ ಉತ್ಪಾದನೆ 20 ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳಬಹುದು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.',
        'download-report': 'ಈ ವರ್ಗಕ್ಕೆ ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ.',
        'no-report-available': 'ಈ ವರ್ಗವು ಯಾವುದೇ ಕೋರ್ಸ್ ವಿಷಯವನ್ನು ಹೊಂದಿಲ್ಲ.'
      }
    },
    'gru-course-card': {
      in: 'ಸೈನ್',
      units: {
        zero: '{{count}} ಘಟಕಗಳು',
        one: '{{count}} ಯುನಿಟ್',
        other: '{{count}} ಘಟಕಗಳು'
      },
      resource: {
        zero: '{{count}} ಸಂಪನ್ಮೂಲಗಳು',
        one: '{{count}} ಸಂಪನ್ಮೂಲ',
        other: '{{count}} ಸಂಪನ್ಮೂಲಗಳು'
      },
      and: 'ಮತ್ತು',
      question: {
        zero: '{{count}} ಪ್ರಶ್ನೆಗಳು',
        one: '{{count}} ಪ್ರಶ್ನೆ',
        other: '{{count}} ಪ್ರಶ್ನೆಗಳು'
      },
      'start-studying': 'ಅಧ್ಯಯನ ಪ್ರಾರಂಭಿಸಿ'
    },
    'gru-collection-card': {
      courses: {
        zero: '{{count}} ಶಿಕ್ಷಣ',
        one: '{{count}} ಕೋರ್ಸ್',
        other: '{{count}} ಶಿಕ್ಷಣ'
      },
      students: {
        zero: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು',
        one: '{{count}} ವಿದ್ಯಾರ್ಥಿ',
        other: '{{count}} ವಿದ್ಯಾರ್ಥಿಗಳು'
      },
      collections: {
        one: '{{count}} ಸಂಗ್ರಹ',
        other: '{{count}} ಸಂಗ್ರಹಣೆಗಳು'
      },
      assessments: {
        one: '{{count}} ಮೌಲ್ಯಮಾಪನ',
        other: '{{count}} ಮೌಲ್ಯಮಾಪನಗಳು'
      },
      classrooms: {
        zero: '{{count}} ಪಾಠದ ಕೊಠಡಿಗಳು',
        one: '{{count}} ತರಗತಿಯ',
        other: '{{count}} ಪಾಠದ ಕೊಠಡಿಗಳು'
      }
    },
    'gru-resource-card': {
      add: 'ಸೇರಿಸು'
    },
    'gru-resource-result-card': {
      skipped: 'ಬಿಟ್ಟುಬಿಡಲಾಗಿದೆ'
    },
    'gru-profile-card': {
      followers: 'ಅನುಯಾಯಿಗಳು',
      following: 'ಅನುಸರಿಸುತ್ತದೆ'
    },
    'gru-user-network-card': {
      follow: 'ಅನುಸರಿಸಿ'
    }
  },
  'reports.gru-table-view': {
    'first-tier-header-prefix': 'q',
    student: 'ವಿದ್ಯಾರ್ಥಿ',
    reaction: 'ಪ್ರತಿಕ್ರಿಯೆ',
    reactions: 'ಪ್ರತಿಕ್ರಿಯೆಗಳು',
    score: 'ಸ್ಕೋರ್',
    scores: 'ಅಂಕಗಳು',
    'study-time': 'ಓದುವ ಸಮಯ',
    time: 'ಸಮಯ',
    'time-spent': 'ಸಮಯ ಕಳೆದರು',
    totals: 'ಒಟ್ಟು'
  },
  'gru-emotion-picker': {
    'react-to-resource': 'ಈ ಸಂಪನ್ಮೂಲಕ್ಕೆ ಪ್ರತಿಕ್ರಿಯಿಸಿ'
  },
  home: {
    'no-classes-found': {
      'create-class': {
        title: 'ಗೊರೂ ತರಗತಿಯೊಂದಿಗೆ ಕಲಿಸು',
        description:
          'ಒಂದು ತರಗತಿಯನ್ನು ರಚಿಸಿ, ವಿಷಯವನ್ನು ನಿಯೋಜಿಸಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಆಹ್ವಾನಿಸಿ.',
        'button-text': 'ತರಗತಿಯ ರಚಿಸಿ'
      },
      'join-class': {
        title: 'ಗೊರೂ ತರಗತಿಯೊಂದಿಗೆ ಕಲಿಯಿರಿ',
        description:
          'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಶಿಕ್ಷಕನ ತರಗತಿಯಲ್ಲಿ ಸೇರ್ಪಡೆಗೊಳ್ಳಿ.',
        'button-text': 'ತರಗತಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ'
      },
      'featured-courses': {
        title: 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
        description:
          'ಗಣಿತ, ವಿಜ್ಞಾನ, ಸಾಮಾಜಿಕ ಅಧ್ಯಯನಗಳು ಮತ್ತು ಎಲಾ ಶಿಕ್ಷಣವನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.',
        'button-text': 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ'
      },
      'teacher-toolkit': {
        title: 'ಶಿಕ್ಷಕ ಟೂಲ್ಕಿಟ್',
        description:
          'ಪ್ರಾರಂಭಿಸಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಈ ಟೂಲ್ಕಿಟ್ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹೊಂದಿದೆ.',
        'button-text': 'ಶಿಕ್ಷಕ ಟೂಲ್ಕಿಟ್'
      }
    }
  },
  taxonomy: {
    grades: 'Grades',
    'gru-taxonomy-selector': {
      'add-secondary': 'ಎರಡನೆಯದನ್ನು ಸೇರಿಸಿ',
      'choose-subject': 'ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ',
      'competency-subject-and-course': 'ಸಾಮರ್ಥ್ಯದ ಚೌಕಟ್ಟನ್ನು ಮತ್ತು ಕೋರ್ಸ್',
      'primary-subject-and-course': 'ಗುಣಮಟ್ಟ ಚೌಕಟ್ಟು ಮತ್ತು ಕೋರ್ಸ್'
    }
  },
  validations: {
    unsavedChanges:
      'ನಿಮ್ಮ ಬದಲಾವಣೆಗಳನ್ನು ಇನ್ನೂ ಉಳಿಸಲಾಗಿಲ್ಲ. ನೀವು ಈ ಪುಟವನ್ನು ಬಿಡಲು ಬಯಸುತ್ತೀರಾ?'
  },
  featured: {
    'featured-title': 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
    'featured-description':
      'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಶಿಕ್ಷಣವನ್ನು ನವೀನ ಶಿಕ್ಷಕರು, ಪರಿಣತರು ಮತ್ತು ವಿಷಯ ತಜ್ಞರು ಪರಿಶೀಲಿಸಿದ್ದಾರೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ತರಗತಿ ಕೊಠಡಿಗಳಲ್ಲಿ ಜಾರಿಗೊಳಿಸಲಾಗಿದೆ. ಕಲಿಕೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ನಿಶ್ಚಿತಾರ್ಥವನ್ನು ಹೆಚ್ಚಿಸಲು ವೈಯಕ್ತೀಕರಿಸಲು ಕೋರ್ಸ್ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ರೀಮಿಕ್ಸ್ ಮಾಡಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ! <a href=\'http://about.gooru.org/courses\' target=\'_blank\'> ಈ ಕೋರ್ಸ್ಗಳ ಅಭಿವೃದ್ಧಿ ಬಗ್ಗೆ </a> ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಿ.'
  },
  locateme: {
    score: 'ಸ್ಕೋರ್',
    timespent: 'ಸಮಯ ಕಳೆದರು',
    view: 'ವೀಕ್ಷಿಸಿ',
    attempt: 'ಪ್ರಯತ್ನಗಳು',
    lastAcessesed: 'ಕೊನೆಯದಾಗಿ ಪ್ರವೇಶಿಸಲಾಗಿದೆ'
  },
  'taxonomy.modals': {
    'gru-domain-picker': {
      browseSelectorText: 'ಯಾವ ಘಟಕವು ಈ ಘಟಕವನ್ನು ಒಳಗೊಂಡಿದೆ?',
      selectedText: {
        zero: '{{count}} ಡೊಮೇನ್ಗಳು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
        one: '{{count}} ಡೊಮೇನ್ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
        other: '{{count}} ಡೊಮೇನ್ಗಳು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ'
      },
      shortcutText: 'ಕೋರ್ಸ್ ಇದೆ'
    },
    'gru-standard-picker': {
      browseSelectorText: 'ಯಾವ ಮಾನದಂಡಗಳನ್ನು ಒಳಗೊಂಡಿದೆ?',
      browseCompetencySelectorText: 'ಯಾವ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಒಳಗೊಂಡಿದೆ?',
      selectedText: {
        zero: '{{count}} ಗುಣಮಟ್ಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ',
        one: '{{count}} ಮಾನದಂಡವನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
        other: '{{count}} ಗುಣಮಟ್ಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ'
      },
      selectedCompetencyText: {
        zero: '{{count}} ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
        one: '{{count}} ಸಾಮರ್ಥ್ಯವು ಆಯ್ಕೆಯಾಗಿದೆ',
        other: '{{count}} ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ'
      },
      shortcutText: 'ಘಟಕವನ್ನು ಟ್ಯಾಗ್ ಮಾಡಲಾಗಿದೆ'
    }
  },
  'account-settings': {
    title: 'ಖಾತೆ ಸೆಟ್ಟಿಂಗ್ಗಳು',
    'account-info': 'ಖಾತೆ ಮಾಹಿತಿ',
    'private-info': 'ಖಾಸಗಿ ಮಾಹಿತಿ',
    'email-address': 'ಇಮೇಲ್ ವಿಳಾಸ',
    gender: 'ಲಿಂಗ',
    birthday: 'ಹುಟ್ಟುಹಬ್ಬ'
  },
  'gru-rich-text-editor': {
    bold: 'ದಪ್ಪ',
    expression: 'ಅಭಿವ್ಯಕ್ತಿ',
    italic: 'ಇಟಾಲಿಕ್',
    subscript: 'ಸಬ್ಸ್ಕ್ರಿಪ್ಟ್',
    superscript: 'ಸೂಪರ್ಸ್ಕ್ರಿಪ್ಟ್',
    underline: 'ಅಂಡರ್ಲೈನ್',
    bullets: 'Bullets',
    'expressions-panel': {
      tabs: {
        calculus: 'ಕಲನಶಾಸ್ತ್ರ',
        'greek-letters': 'ಗ್ರೀಕ್ ಅಕ್ಷರಗಳು',
        layout: 'ಲೇಔಟ್',
        relation: 'ಸಂಬಂಧ',
        'set-theory': 'ಸೆಟ್ ಸಿದ್ಧಾಂತ',
        symbols: 'ಚಿಹ್ನೆಗಳು',
        trigonometry: 'ತ್ರಿಕೋನಮಿತಿ'
      },
      'insert-expression': 'ಸೇರಿಸಿ',
      'update-expression': 'ಅಪ್ಡೇಟ್',
      'create-expression': 'ಅಭಿವ್ಯಕ್ತಿ ರಚಿಸಿ'
    }
  },
  'gru-settings-edit': {
    'answerkey-attempts': 'ಉತ್ತರ ಕೀ ಮತ್ತು ಪ್ರಯತ್ನಗಳು',
    'answer-key': 'ಕೊನೆಯಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಉತ್ತರ ಕೀಲಿಯನ್ನು ನೋಡಬಹುದು',
    attempts: 'ಪ್ರಯತ್ನಗಳು',
    'attempts-unlimited': 'ಅನಿಯಮಿತ',
    backwards:
      'ವಿದ್ಯಾರ್ಥಿಗಳು ಹಿಂದಕ್ಕೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಬಹುದು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಬದಲಾಯಿಸಬಹುದು',
    feedback: 'ವಿದ್ಯಾರ್ಥಿಗಳು ಸರಿಯಾಗಿ / ತಪ್ಪಾಗಿವೆಯೇ ಎಂದು ನೋಡುತ್ತಾರೆ',
    'feedback-immediate': 'ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ಮತ್ತು ಕೊನೆಯಲ್ಲಿ',
    'feedback-never': 'ಎಂದಿಗೂ',
    'feedback-summary': 'ಕೊನೆಯಲ್ಲಿ',
    'navigation-scoring': 'ಸಂಚರಣೆ ಮತ್ತು ಸ್ಕೋರಿಂಗ್',
    'disable-heading': 'ಪಠ್ಯ ನಕ್ಷೆಯಲ್ಲಿ ಮೌಲ್ಯಮಾಪನವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    'disable-legend':
      'ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಕೋರ್ಸ್ ಮ್ಯಾಪ್ನಿಂದ ಮೌಲ್ಯಮಾಪನವನ್ನು ವಹಿಸಬಹುದು'
  },
  'gru-icon-popover': {
    'settings-visibility-title': 'ನಿಮ್ಮ ವಿಷಯವನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡಿ',
    'settings-visibility-content':
      'ಈ ಸೆಟ್ಟಿಂಗ್ ನಿಮ್ಮ ಬಳಕೆದಾರ ಪ್ರೊಫೈಲ್ ಮೂಲಕ ನಿಮ್ಮ ವಿಷಯವನ್ನು ಗೋಚರಿಸುತ್ತದೆ. ನೀವು ಸಹೋದ್ಯೋಗಿಗಳೊಂದಿಗೆ ರಚಿಸುವ ಶಿಕ್ಷಣ, ಸಂಗ್ರಹಣೆಗಳು, ಮೌಲ್ಯಮಾಪನಗಳು, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು / ಅಥವಾ ಪ್ರಶ್ನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಬಯಸಿದರೆ, ನಾವು ಈ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಆನ್ ಮಾಡಲು ಸೂಚಿಸುತ್ತೇವೆ.'
  },
  'gru-take-tour': {
    text: 'ಪ್ರವಾಸ',
    'teacher-home': {
      stepOne: {
        title: 'ಪ್ರವಾಸ ಕೈಗೊಳ್ಳಿ',
        description:
          'ಪ್ರವಾಸ ಮತ್ತು ನಿಮ್ಮ ಮುಖಪುಟವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸ್ವಾಗತ! ಈಗ ಪ್ರಾರಂಭಿಸೋಣ!'
      },
      stepTwo: {
        title: 'ಲೋಗೋ',
        description:
          'ಲಾಂಛನವನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದರಿಂದ ನಿಮ್ಮ ಮುಖಪುಟಕ್ಕೆ ಹಿಂದಿರುಗುತ್ತದೆ.'
      },
      stepThree: {
        title: 'ಹುಡುಕು ಬಾರ್',
        description:
          'ನಿಮಗೆ ಆಸಕ್ತಿ ಹೊಂದಿರುವ ವಿಷಯಗಳಿಗಾಗಿ ನಮ್ಮ ವಿಷಯ ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು ಹುಡುಕಿ.'
      },
      stepFour: {
        title: 'ತರಗತಿ ಕೊಠಡಿಗಳು',
        description: 'ನಿಮ್ಮ ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ.'
      },
      stepFive: {
        title: 'ವಿಷಯ ನಿರ್ವಾಹಕ',
        description: 'ನಿಮ್ಮ ವಿಷಯವನ್ನು ರಚಿಸಲು ಮತ್ತು ಪ್ರವೇಶಿಸಲು ತ್ವರಿತ ಲಿಂಕ್.'
      },
      stepSix: {
        title: 'ಗ್ರಂಥಾಲಯ',
        description: 'ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಶಿಕ್ಷಣವನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.'
      },
      stepSeven: {
        title: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
        description:
          'ನಿಮ್ಮ ವಿಷಯ, ಬಳಕೆದಾರರ ಪ್ರೊಫೈಲ್, ಮತ್ತು ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ನವೀಕರಿಸಿ.'
      },
      stepEight: {
        title: 'ಬೆಂಬಲ',
        description: 'ಬೆಂಬಲ ಕೇಂದ್ರ ಅಥವಾ ಲಾಗ್ಔಟ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿ.'
      },
      stepNine: {
        title: 'ತರಗತಿ ಕೊಠಡಿಗಳು',
        description: 'ನೀವು ಪ್ರಸ್ತುತ ಬೋಧಿಸುತ್ತಿರುವ ವರ್ಗಗಳ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ.'
      },
      stepTen: {
        title: 'ಆರ್ಕೈವ್ಡ್ ತರಗತಿಗಳು',
        description: 'ನೀವು ಹಿಂದೆ ಕಲಿಸಿದ ವರ್ಗಗಳ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ.'
      },
      stepEleven: {
        title: 'ತರಗತಿಯ ರಚಿಸಿ',
        description:
          'ನಿಮ್ಮ ತರಗತಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಹೊಸ ತರಗತಿಯನ್ನು ರಚಿಸಲು ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      }
    },
    'student-home': {
      stepOne: {
        title: 'ಪ್ರವಾಸ ಕೈಗೊಳ್ಳಿ',
        description:
          'ಪ್ರವಾಸ ಮತ್ತು ನಿಮ್ಮ ಮುಖಪುಟವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸ್ವಾಗತ! ನಿಮ್ಮ ಮುಖಪುಟದಲ್ಲಿ ನಿಮಗೆ ಲಭ್ಯವಿರುವ ವೈಶಿಷ್ಟ್ಯಗಳ ಮೂಲಕ ಹೊರಡೋಣ.'
      },
      stepFeaturedCourses: {
        title: 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
        description:
          'ನಿಮಗೆ ಆಸಕ್ತಿಯ ವಿಷಯಗಳ ಕಲಿಕೆ ನ್ಯಾವಿಗೇಟರ್ನ ವಿಷಯ ಕ್ಯಾಟಲಾಗ್ನಲ್ಲಿ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಠ್ಯಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.'
      },
      stepTwo: {
        title: 'ಲೋಗೋ',
        description:
          'ಲಾಂಛನವನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದರಿಂದ ನಿಮ್ಮ ಮುಖಪುಟಕ್ಕೆ ಹಿಂದಿರುಗುತ್ತದೆ.'
      },
      stepThree: {
        title: 'ಹುಡುಕು ಬಾರ್',
        description:
          'ನಿಮಗೆ ಆಸಕ್ತಿಯಿರುವ ವಿಷಯಗಳಿಗಾಗಿ ನಮ್ಮ ವಿಷಯ ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು ಹುಡುಕಿ.'
      },
      stepFour: {
        title: 'ನನ್ನ ಅಧ್ಯಯನ',
        description: 'ನಿಮ್ಮ ಮುಖಪುಟಕ್ಕೆ ಹಿಂದಿರುಗಿಸುತ್ತದೆ.'
      },
      stepFive: {
        title: 'ಗ್ರಂಥಾಲಯ',
        description:
          'ನಿಮಗೆ ಆಸಕ್ತಿಯಿರುವ ವಿಷಯಗಳಿಗಾಗಿ ಕಲಿಕೆಯ ನಾವಿಕನ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಶಿಕ್ಷಣ ಮತ್ತು ಪಾಲುದಾರ ಗ್ರಂಥಾಲಯಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.'
      },
      stepSix: {
        title: 'ಪ್ರದರ್ಶನ',
        description:
          'ನೀವು ಸೇರಿಕೊಂಡ ಕೋರ್ಸುಗಳಲ್ಲಿನ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯ ಸಾರಾಂಶವನ್ನು ನೋಡಿ.'
      },
      stepSeven: {
        title: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
        description:
          'ನಿಮ್ಮ ವಿಷಯ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ನವೀಕರಿಸಿ.'
      },
      stepEight: {
        title: 'ಬೆಂಬಲ',
        description: 'ಬೆಂಬಲ ಕೇಂದ್ರ ಅಥವಾ ಲಾಗ್ಔಟ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿ.'
      },
      stepNine: {
        title: 'ಪ್ರಕಟಣೆಗಳು',
        description:
          'ಇಲ್ಲಿ ನಿಮ್ಮ ಶಿಕ್ಷಕ ಅಥವಾ ಶಾಲೆಯು ನಿಮಗೆ ತಿಳಿಯಬೇಕೆಂದು ಪ್ರಕಟಣೆಗಳನ್ನು ನೀವು ನೋಡುತ್ತೀರಿ.'
      },
      stepTen: {
        title: 'ತರಗತಿ ಕೊಠಡಿಗಳು',
        description: 'ನೀವು ಸೇರಿಕೊಂಡ ಎಲ್ಲಾ ಪಾಠದ ಕೊಠಡಿಗಳನ್ನು ನೋಡಿ.'
      },
      stepEleven: {
        title: 'ಸ್ವತಂತ್ರ ಕಲಿಕೆ',
        description:
          'ನೀವು ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಿದ ವಿಷಯಗಳನ್ನು ಮತ್ತು ನೀವು ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುವ ವಿಷಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.'
      },
      stepTwelve: {
        title: 'ತರಗತಿಯ ಸೇರಲು',
        description: 'ತರಗತಿಗೆ ಸೇರಿಕೊಳ್ಳಲು ತರಗತಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ.'
      },
      stepThirteen: {
        title: 'ಮುಗಿದಿದೆ!',
        description:
          'ಇದೀಗ ಮುಂದುವರಿಯಿರಿ ಮತ್ತು ನೀವು ಸೇರಿಕೊಂಡ ಕೋರ್ಸ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ, ತರಗತಿಯೊಂದರಲ್ಲಿ ಸೇರ್ಪಡೆಗೊಳ್ಳಿ, ಅಥವಾ ನಿಮಗೆ ಆಸಕ್ತಿಯಿರುವ ವಿಷಯಕ್ಕಾಗಿ ಹುಡುಕಿ.'
      }
    },
    'student-performance': {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description:
          'ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗೆ ಸ್ವಾಗತ. ನೀವು ಎಲ್ಲಾ ತರಗತಿಗಳು ಮತ್ತು ಕೋರ್ಸ್ಗಳಲ್ಲಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ನೀವು ವೀಕ್ಷಿಸಬಹುದು.'
      },
      stepTwo: {
        title: 'ಫಿಲ್ಟರ್ ಟ್ಯಾಬ್',
        description:
          'ಚಟುವಟಿಕೆ, ಸಮಯ, ವಿಷಯ, ಮತ್ತು ಕೋರ್ಸ್ ಮೂಲಕ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಲು ಬಾಣದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepThree: {
        title: 'ಅಪ್ಡೇಟ್ ವರದಿ',
        description:
          'ಒಮ್ಮೆ ನೀವು ನಿಮ್ಮ ಫಿಲ್ಟರ್ಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿದರೆ, ಫಲಿತಾಂಶಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ನವೀಕರಣ ವರದಿಯಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepFour: {
        title: 'ಡೌನ್ಲೋಡ್ / ಮುದ್ರಣ',
        description: 'ನಿಮ್ಮ ವರದಿಯನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ.'
      },
      stepFive: {
        title: 'ಮುಗಿದಿದೆ!',
        description: 'ಮುಂದುವರಿಯಿರಿ ಮತ್ತು ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ!'
      }
    },
    'student-class': {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description:
          'ನಿಮ್ಮ ತರಗತಿಯ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳು, ಕೋರ್ಸ್ ಮ್ಯಾಪ್, ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯ ಡೇಟಾವನ್ನು ಕಾಣಬಹುದು. ನಾವೀಗ ಆರಂಭಿಸೋಣ!'
      },
      stepTopBar: {
        title: 'ಕೋರ್ಸ್, ಪ್ರದರ್ಶನ, ಪೂರ್ಣಗೊಂಡಿದೆ',
        description: 'ನಿಮ್ಮ ಕೋರ್ಸ್ ಮತ್ತು ಒಟ್ಟಾರೆ ಪ್ರದರ್ಶನದ ಸಾರಾಂಶವನ್ನು ನೋಡಿ.'
      },
      stepTwo: {
        title: 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳು',
        description:
          'ನಿಮ್ಮ ಶಿಕ್ಷಕರಿಂದ ನೇಮಿಸಲ್ಪಟ್ಟ ಇಂದಿನ ಚಟುವಟಿಕೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ಅಧ್ಯಯನ ಮಾಡಿ.'
      },
      stepThree: {
        title: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
        description:
          'ಕೋರ್ಸ್ನಲ್ಲಿ ಸಂಗ್ರಹಣೆಗಳು ಮತ್ತು ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಘಟಕಗಳು ಮತ್ತು ಪಾಠಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepFour: {
        title: 'ನನ್ನ ವರದಿ',
        description: 'ನಿಮ್ಮ ಒಟ್ಟಾರೆ ವರ್ಗದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ವಿಮರ್ಶಿಸಿ.'
      },
      stepFive: {
        title: 'ಮುಗಿದಿದೆ!',
        description:
          'ಕೋರ್ಸ್ ಮ್ಯಾಪ್ ಅಥವಾ ದೈನಂದಿನ ಚಟುವಟಿಕೆಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದರ ಮೂಲಕ ಕೋರ್ಸ್ ಅನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದನ್ನು ಪ್ರಾರಂಭಿಸಿ.'
      }
    },
    'teacher-class': {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description:
          'ನಿಮ್ಮ ತರಗತಿಯ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳನ್ನು, ಕೋರ್ಸ್ ನಕ್ಷೆ, ಅಪ್ಡೇಟ್ ವರ್ಗ ಮಾಹಿತಿಯನ್ನು ವೀಕ್ಷಿಸಲು ಮತ್ತು ನಿಯೋಜಿಸಲು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಪ್ರದರ್ಶನ ಡೇಟಾವನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತದೆ. ನಾವೀಗ ಆರಂಭಿಸೋಣ!'
      },
      stepTopBar: {
        title: 'ಕೋರ್ಸ್, ಪ್ರದರ್ಶನ, ಪೂರ್ಣಗೊಂಡಿದೆ',
        description:
          'ನಿಮ್ಮ ಕೋರ್ಸ್ ಮತ್ತು ಒಟ್ಟಾರೆ ವಿದ್ಯಾರ್ಥಿ ಪ್ರದರ್ಶನದ ಸಾರಾಂಶವನ್ನು ಇಲ್ಲಿಯವರೆಗೆ ನೋಡಿ.'
      },
      stepTwo: {
        title: 'ದೈನಂದಿನ ವರ್ಗ ಚಟುವಟಿಕೆಗಳು',
        description:
          'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಇಂದಿನ ಚಟುವಟಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ನಿಯೋಜಿಸಿ.'
      },
      stepThree: {
        title: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
        description:
          'ಕೋರ್ಸ್ನಲ್ಲಿ ನಿಯೋಜಿಸಲಾದ ಘಟಕಗಳು, ಪಾಠಗಳು, ಸಂಗ್ರಹಣೆಗಳು ಅಥವಾ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಅಥವಾ ಸಂಪಾದಿಸಿ.'
      },
      stepFour: {
        title: 'ನನ್ನ ವರದಿ',
        description:
          'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಕೋರ್ಸ್ನಲ್ಲಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದಾರೆ ಮತ್ತು ಅವುಗಳ ವರದಿಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಹೇಗೆ ಸಾರಾಂಶವನ್ನು ವೀಕ್ಷಿಸಿ.'
      },
      stepClassManagement: {
        title: 'ವರ್ಗ ನಿರ್ವಹಣೆ',
        description:
          'ನಿಮ್ಮ ವರ್ಗ ಮಾಹಿತಿಯನ್ನು ನಿಯೋಜಿಸಿ ಅಥವಾ ನವೀಕರಿಸಿ ಮತ್ತು ತರಗತಿಯಲ್ಲಿ ಸೇರಿಕೊಂಡ ವಿದ್ಯಾರ್ಥಿಗಳು.'
      },
      stepFive: {
        title: 'ಮುಗಿದಿದೆ!',
        description:
          'ಈಗ ಮುಂದುವರಿಯಿರಿ ಮತ್ತು ತರಗತಿಯಲ್ಲಿ ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ.'
      }
    },
    'study-player': {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description:
          'ಇದು ನಿಮ್ಮ ಅಧ್ಯಯನ ಆಟಗಾರ. ನಿಮಗೆ ಲಭ್ಯವಿರುವ ವೈಶಿಷ್ಟ್ಯಗಳ ಮೂಲಕ ಹೊರಡೋಣ.'
      },
      stepTwo: {
        title: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
        description:
          'ನಿಮ್ಮ ಕೋರ್ಸ್ ಮ್ಯಾಪ್ಗೆ ಹಿಂತಿರುಗಲು ಯಾವ ಸಮಯದಲ್ಲಾದರೂ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepThree: {
        title: 'ಕೋರ್ಸ್ ಹೆಸರು',
        description: 'ನೀವು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಪಠ್ಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ.'
      },
      stepFour: {
        title: 'ಸಲಹೆಗಳನ್ನು',
        description:
          'ನೀವು ಪ್ರಸ್ತುತ ಅಧ್ಯಯನ ಮಾಡುತ್ತಿದ್ದೀರಿ ಎಂಬುದನ್ನು ಆಧರಿಸಿ ನೀವು ಅನ್ವೇಷಿಸಲು ಬಯಸುವ ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು.'
      },
      stepFive: {
        title: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
        nuTitle: 'ಸಾಮರ್ಥ್ಯಗಳು',
        description: 'ನೀವು ಪೂರ್ಣಗೊಂಡ ಕೋರ್ಸ್ ಎಷ್ಟು ಎಂಬುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.'
      },
      stepSix: {
        title: 'ಪ್ರದರ್ಶನ',
        description:
          'ನೀವು ಕೋರ್ಸ್ನಲ್ಲಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.'
      },
      stepSeven: {
        title: 'ಸಂಪನ್ಮೂಲಕ್ಕೆ ಪ್ರತಿಕ್ರಿಯಿಸಿ',
        description:
          'ಈ ಸಂಪನ್ಮೂಲದ ಕುರಿತು ನೀವು ಏನು ಯೋಚಿಸುತ್ತೀರಿ ಎಂದು ನಿಮ್ಮ ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ.'
      },
      stepEight: {
        title: 'ಮುಗಿದಿದೆ!',
        description: 'ಅಧ್ಯಯನ ಪ್ರಾರಂಭಿಸಿ!'
      },
      stepNine: {
        title: 'ಸಂಗ್ರಹಣೆಗೆ ಹಿಂತಿರುಗಿ',
        description:
          'ನಿಮ್ಮ ಸಂಗ್ರಹ ಅಥವಾ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಹಿಂತಿರುಗಲು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      }
    },
    library: {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description: 'ಕಲಿಕೆಯ ನ್ಯಾವಿಗೇಟರ್ನಲ್ಲಿ ಗ್ರಂಥಾಲಯಗಳಿಗೆ ಸ್ವಾಗತ.'
      },
      stepTwo: {
        title: 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
        description:
          'ಶಿಕ್ಷಕರಿಂದ ತರಗತಿ ಕೊಠಡಿಗಳಲ್ಲಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಮತ್ತು ಅಳವಡಿಸಿದ ಶಿಕ್ಷಣವನ್ನು ಅನ್ವೇಷಿಸಿ.'
      },
      stepThree: {
        title: 'ಇತರ ಗ್ರಂಥಾಲಯಗಳು',
        description: 'ಗೂರು ಪಾಲುದಾರರು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ವಿಷಯವನ್ನು ಅನ್ವೇಷಿಸಿ.'
      },
      stepFour: {
        title: 'ಮುನ್ನೋಟ',
        description: 'ನಿಮಗೆ ಆಸಕ್ತಿಯಿದೆಯೇ ಎಂದು ನೋಡಲು ಕೋರ್ಸ್ ಅನ್ನು ಪೂರ್ವವೀಕ್ಷಿಸಿ.'
      },
      stepFive: {
        title: 'ಹಂಚು',
        description: 'ಇತರರೊಂದಿಗೆ ಈ ಕೋರ್ಸ್ ಹಂಚಿಕೊಳ್ಳಿ.'
      },
      stepSix: {
        title: 'ಬುಕ್ಮಾರ್ಕ್',
        description: 'ನಂತರ ಅದನ್ನು ಪರಿಶೀಲಿಸಲು ಈ ಕೋರ್ಸ್ ಬುಕ್ಮಾರ್ಕ್ ಮಾಡಿ.'
      }
    },
    profile: {
      stepOne: {
        title: 'ಸ್ವಾಗತ!',
        description:
          'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ಗೆ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ವಿಷಯ, ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಮತ್ತು ಅನುಯಾಯಿಗಳನ್ನು ಪ್ರವೇಶಿಸಬಹುದು.'
      },
      stepTwo: {
        title: 'ನನ್ನ ವಿಷಯ',
        description:
          'ಹೊಸ ವಿಷಯವನ್ನು ರಚಿಸಿ ಮತ್ತು ನೀವು ಮರುಮಿಶ್ರಿತ ವಿಷಯವನ್ನು ವೀಕ್ಷಿಸಿ.'
      },
      stepThree: {
        title: 'ನನ್ನ ಬಗ್ಗೆ',
        description:
          'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು, ಶಾಲಾ ಮಾಹಿತಿಯನ್ನು ಮತ್ತು ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ನವೀಕರಿಸಿ.'
      },
      stepFour: {
        title: 'ಗುರಿಗಳು',
        description:
          'ನಿಮ್ಮ ಕಲಿಕೆಯ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಸಾಧಿಸಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಗುರಿಗಳನ್ನು ಸ್ಥಾಪಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.'
      },
      stepFive: {
        title: 'ಅನುಯಾಯಿಗಳು',
        description:
          'ನೀವು ಯಾರೊಬ್ಬರ ವಿಷಯವನ್ನು ಇಷ್ಟಪಟ್ಟರೆ, ನೀವು ಅವರನ್ನು ಅನುಸರಿಸಬಹುದು. ಯಾರು ನಿಮ್ಮನ್ನು ಅನುಸರಿಸುತ್ತಿದ್ದಾರೆ ಎಂಬುದನ್ನು ಕೂಡ ನೀವು ವೀಕ್ಷಿಸಬಹುದು.'
      },
      stepSix: {
        title: 'ಬ್ಯಾಡ್ಜ್ಗಳು',
        description:
          'ನೀವು ಸ್ವೀಕರಿಸಿದ ಬ್ಯಾಡ್ಜ್ಗಳನ್ನು ವಿಮರ್ಶಿಸಿ. ನಿಮ್ಮ ಶಿಕ್ಷಕನು ನಿಗದಿಪಡಿಸಿದ ಮಾನದಂಡದ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದಲ್ಲಿ ನೀವು ಬ್ಯಾಡ್ಜ್ ಅನ್ನು ಸ್ವೀಕರಿಸುತ್ತೀರಿ.'
      }
    }
  },
  'gru-tour': {
    'assessments-settings': {
      stepOne: {
        title: 'ಸಂಚರಣೆ ಮತ್ತು ಸ್ಕೋರಿಂಗ್',
        description:
          'ಈ ಸೆಟ್ಟಿಂಗ್ ವಿದ್ಯಾರ್ಥಿಗಳು ಮೌಲ್ಯಮಾಪನ ಮೂಲಕ ಹೇಗೆ ಚಲಿಸಬಹುದು ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ ಮತ್ತು ಅವರ ಉತ್ತರಗಳು ಸರಿ ಅಥವಾ ತಪ್ಪಾಗಿವೆಯೇ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ. ಅದು ಅವರಿಗೆ ಉತ್ತರ ಕೀಲಿಯನ್ನು ತೋರಿಸುವುದಿಲ್ಲ.'
      },
      stepTwo: {
        title: 'ಉತ್ತರ ಕೀ ಮತ್ತು ಪ್ರಯತ್ನಗಳ ಸಂಖ್ಯೆ',
        description:
          'ಈ ಸೆಟ್ಟಿಂಗ್ ಉತ್ತರ ಕೀಲಿಯನ್ನು ಬಹಿರಂಗಪಡಿಸಲು ಅನುಮತಿಸುತ್ತದೆ ಮತ್ತು ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಹೊಂದಿರುವ ಪ್ರಯತ್ನಗಳ ಸಂಖ್ಯೆಯನ್ನು ಹೊಂದಿಸುತ್ತದೆ.'
      }
    },
    overview: {
      stepOne: {
        title: 'ಕೋರ್ಸ್ ಮ್ಯಾಪ್',
        description:
          'ಕೋರ್ಸ್ ಮ್ಯಾಪ್ ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನೀವು ನಿಗದಿಪಡಿಸಿದ ಎಲ್ಲಾ ಮೌಲ್ಯಮಾಪನಗಳು ಮತ್ತು ಸಂಗ್ರಹಣೆಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತದೆ.'
      },
      stepTwo: {
        title: 'ವರ್ಗ ಕೋಡ್',
        description:
          'ನೀವು ರಚಿಸುವ ಪ್ರತಿ ತರಗತಿಯಲ್ಲೂ ಅನನ್ಯವಾದ ವರ್ಗ ಕೋಡ್ ಇದೆ. ನಿಮ್ಮ ತರಗತಿಯಲ್ಲಿ ಸೇರಲು ಮತ್ತು ನಿಮ್ಮ ವಿಷಯವನ್ನು ಪ್ರವೇಶಿಸಲು ನೀವು ಸಿದ್ಧರಾಗಿರುವಾಗ ನೀವು ಈ ಕೋಡ್ ಅನ್ನು ನೀಡುತ್ತೀರಿ.'
      },
      stepThree: {
        title: 'ಮಾನಿಟರ್ ವಿದ್ಯಾರ್ಥಿ ಮತ್ತು ವರ್ಗ ಡೇಟಾ',
        description:
          'ಕೋರ್ಸ್ ಭಾಗವಾಗಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು ಪೂರ್ಣ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಮಾಡಿದಾಗ ವರ್ಗ ಮತ್ತು ಮಾಲಿಕ ವಿದ್ಯಾರ್ಥಿ ಮೌಲ್ಯಮಾಪನ ಡೇಟಾವನ್ನು ವೀಕ್ಷಿಸಲು ಇದು ನಿಮ್ಮನ್ನು ಅನುಮತಿಸುತ್ತದೆ.'
      },
      stepFour: {
        title: 'ತರಗತಿಯ ಮಾಹಿತಿ',
        description:
          'ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ತರಗತಿಯ ಹೆಸರನ್ನು ಸಂಪಾದಿಸಬಹುದು, ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪೋಸ್ಟ್ ಪ್ರಕಟಣೆಗಳು, ನಿಮ್ಮ ತರಗತಿಯಲ್ಲಿ ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳ ಹೆಸರುಗಳನ್ನು ನೋಡಿ, ಮತ್ತು ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಅಳಿಸಬಹುದು.'
      },
      stepFive: {
        title: 'ನಿಮ್ಮ ಕೋರ್ಸ್ ವಿಷಯವನ್ನು ಸಂಪಾದಿಸಿ',
        description:
          'ನೀವು ತರಗತಿಯಲ್ಲಿರುವಾಗ, ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನಿಗದಿಪಡಿಸಲಾದ ಕೋರ್ಸ್ ವಿಷಯವನ್ನು ಸಂಪಾದಿಸಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepSix: {
        title: 'ನೈಜ ಸಮಯದಲ್ಲಿ ಪ್ರಗತಿ ಮೇಲ್ವಿಚಾರಣೆ!',
        description:
          'ನೈಜ ಸಮಯದಲ್ಲಿ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ವರ್ಗ ಪ್ರಗತಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ನೈಜ ಸಮಯದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅನ್ನು ಬಳಸಿ. <br> <br> ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನೈಜ ಸಮಯದ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಪ್ರತಿ ಮೌಲ್ಯಮಾಪನದ ಎಡಭಾಗದಲ್ಲಿ ಕಂಡುಬರುವ \\\\\\\'ಗೋ ಲೈವ್\\\\\\\' ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ. <br> <br> <i class = \\\\\\\'real-time-icon\\\\\\\'>'
      }
    },
    'quick-start': {
      stepOne: {
        title: 'ನಿಮ್ಮ ತರಗತಿ ಕೊಠಡಿಗಳನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ',
        description:
          'ಇದು ಹೊಸದಾಗಿ ರಚಿಸಲಾದ ತರಗತಿಯ ಒಂದು ನೋಟ. ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ತರಗತಿಯನ್ನು ಮರಳಿ ಪಡೆಯಲು, \\\\\\\'ವರ್ಗ ಕೊಠಡಿ\\\\\\\' ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ನೀವು ಪ್ರವೇಶಿಸಲು ಬಯಸುವ ತರಗತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಡ್ರಾಪ್ ಡೌನ್ ಮೆನು ಬಳಸಿ.'
      },
      stepTwo: {
        title: 'ಶುರುವಾಗುತ್ತಿದೆ? ಮೌಲ್ಯಮಾಪನವನ್ನು ರಚಿಸಿ!',
        description:
          'ಗೋರು ಜೊತೆ ಪ್ರಾರಂಭಿಸಲು ಮತ್ತು ನಿಮ್ಮ ತರಗತಿಯಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ತಿಳುವಳಿಕೆಯ ಪ್ರಸ್ತುತ ಮಟ್ಟವನ್ನು ನಿರ್ಣಯಿಸಲು ಒಂದು ಮೌಲ್ಯಮಾಪನವನ್ನು ರಚಿಸಲು ನಾವು ಸಲಹೆ ನೀಡುತ್ತೇವೆ.'
      }
    },
    'real-time': {
      stepOne: {
        title: 'ಪ್ರತಿಕ್ರಿಯೆಗಳ ಸ್ಥಗಿತ',
        description:
          'ವಿದ್ಯಾರ್ಥಿಗಳು ಹೇಗೆ ಉತ್ತರಿಸುತ್ತಾರೆ ಎಂಬ ಕುಸಿತವನ್ನು ನೋಡಲು ಪ್ರತಿ ಪ್ರಶ್ನೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.'
      },
      stepTwo: {
        title: 'ಪ್ರತ್ಯೇಕ ವಿದ್ಯಾರ್ಥಿ ಡೇಟಾ',
        description:
          'ಪ್ರತ್ಯೇಕ ವಿದ್ಯಾರ್ಥಿ ಡೇಟಾ ವರದಿಗಳನ್ನು ನೋಡಲು ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿ ಟೈಲ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.'
      },
      stepThree: {
        title: 'ಒಂದು ನೋಟವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
        description:
          'ಡೇಟಾವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಆಯ್ಕೆಗಳನ್ನು ನೋಡಲು \\\\\\\'ಶೀರ್ಷಿಕೆ ವೀಕ್ಷಣೆ\\\\\\\' ಅಥವಾ \\\\\\\'ಪಟ್ಟಿ ವೀಕ್ಷಣೆ\\\\\\\' ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.'
      },
      stepFour: {
        title: 'ಸರಾಸರಿ ಸ್ಕೋರ್',
        description:
          'ಎಲ್ಲಾ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ನೈಜ ಸಮಯದಲ್ಲಿ ಲೆಕ್ಕ ಹಾಕಿದ ವರ್ಗ ಸರಾಸರಿ ನೋಡಿ.'
      },
      stepFive: {
        title: 'ಅನಾಮಧೇಯ ಡೇಟಾವನ್ನು ಯೋಜಿಸಿ',
        description:
          'ವಿದ್ಯಾರ್ಥಿ ಡೇಟಾದ ಅನಾಮಿಕ ನೋಟವನ್ನು ತೋರಿಸಲು ಈ ಆಯ್ಕೆಯನ್ನು ಬಳಸಿ.'
      }
    }
  },
  'gru-course-play': {
    'hide-unit-details': 'ಘಟಕ ಮೆಟಾಡೇಟಾ ಮರೆಮಾಡಿ',
    'view-unit-details': 'ವೀಕ್ಷಣೆ ಘಟಕ ಮೆಟಾಡೇಟಾ',
    performance: 'ಪ್ರದರ್ಶನ'
  },
  'gru-century-skills': {
    legends: {
      hewlett: 'ಹೆವ್ಲೆಟ್ ಆಳವಾದ ಕಲಿಕೆಯ ಮಾದರಿ',
      conley: 'conley ನಾಲ್ಕು ಕೀಲಿಗಳು',
      framework: 'p21 ಫ್ರೇಮ್ವರ್ಕ್',
      national: 'ಜೀವನ ಮತ್ತು ಕೆಲಸಕ್ಕಾಗಿ ರಾಷ್ಟ್ರೀಯ ಸಂಶೋಧನಾ ಕೇಂದ್ರ'
    },
    content: {
      groups: {
        cognitive: 'ಪ್ರಮುಖ ಅರಿವಿನ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ತಂತ್ರಗಳು',
        content: 'ಪ್ರಮುಖ ವಿಷಯ ಜ್ಞಾನ',
        learning: 'ಪ್ರಮುಖ ಕಲಿಕೆ ಕೌಶಲಗಳು ಮತ್ತು ತಂತ್ರಗಳು'
      }
    }
  },
  'gru-rubric-edit': {
    'upload-rubric': 'ರಬ್ರಿಕ್ ಅನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    copy: {
      'success-message':
        'ನೀವು ಉಭಯಚರವನ್ನು {{title}} ನಕಲಿಸಿದ್ದೀರಿ. ಆ ರಬ್ರಿಕ್ ಅನ್ನು ನೀವು ಸಂಪಾದಿಸಲು ಬಯಸುವಿರಾ?'
    }
  },
  'gru-rubric-creation': {
    url: 'url',
    'upload-file': 'ಫೈಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    'add-category': 'ಹೊಸ ವರ್ಗವನ್ನು ಸೇರಿಸಿ',
    'gru-preview-url': {
      preview: 'ಮೇಲಿನ ರಬ್ರಿಕ್ ಸೇರಿಸಿ ಮತ್ತು ಇಲ್ಲಿ ಪೂರ್ವವೀಕ್ಷಣೆ ಮಾಡಿ'
    },
    'overall-narrative': 'ಒಟ್ಟಾರೆ ನಿರೂಪಣೆಯ ಪ್ರತಿಕ್ರಿಯೆ',
    'feedback-guidance': 'ಪ್ರತಿಕ್ರಿಯೆ ಮಾರ್ಗದರ್ಶನ',
    'required-feedback': 'ಪ್ರತಿಕ್ರಿಯೆ ಅಗತ್ಯವಿರುತ್ತದೆ',
    'feedback-guidance-placeholder':
      'ಇಡೀ ಪ್ರಬಂಧದಲ್ಲಿ ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಾರಾಂಶಿಸಿ.',
    'gru-category': {
      'category-title': 'ವರ್ಗದಲ್ಲಿ ಶೀರ್ಷಿಕೆ',
      'category-feedback':
        'ಮಾಜಿ. ನೀವು ಈ ವರ್ಗವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿರುವ ಕಾರಣ, ಲೇಖಕರ ಉದ್ದೇಶಕ್ಕೆ ಜಾಗರೂಕರಾಗಿರಿ.',
      'gru-scoring-levels': {
        '0': 'ಉದಾಹರಣೆಗೆ: ಕುಶಲತೆ ಮೀರಿದೆ',
        '1': 'ಉದಾಹರಣೆ: ಸಭೆಯ ಪ್ರಾವೀಣ್ಯತೆ',
        '2': 'ಉದಾಹರಣೆಗೆ: ಕುಶಲತೆಯನ್ನು ಸಮೀಪಿಸುತ್ತಿದೆ',
        '3': 'ಉದಾಹರಣೆ: ಪ್ರಾವೀಣ್ಯತೆಯನ್ನು ಪ್ರಾರಂಭಿಸುವುದು',
        '4': 'ಉದಾಹರಣೆ: ಕುಶಲತೆಗೆ ಯಾವುದೇ ಪುರಾವೆಗಳಿಲ್ಲ',
        best: 'ಅತ್ಯುತ್ತಮ',
        levels: 'ಮಟ್ಟ',
        'new-level': 'ಹೊಸ ಮಟ್ಟವನ್ನು ಸೇರಿಸಿ',
        scoring: 'ಸ್ಕೋರಿಂಗ್',
        worst: 'ಕೆಟ್ಟದಾಗಿದೆ',
        'name-error': 'ದಯವಿಟ್ಟು ಮಟ್ಟದ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.',
        'score-error': 'ದಯವಿಟ್ಟು ಸ್ಕೋರ್ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.',
        'no-levels-error': 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ಹಂತಕ್ಕೆ ಮೌಲ್ಯವನ್ನು ಹೊಂದಿಸಿ.'
      }
    }
  },
  library: {
    'browse-library': 'ಗ್ರಂಥಾಲಯ ಬ್ರೌಸ್ ಮಾಡಿ',
    'featured-courses': 'ಒಳಗೊಂಡಿತ್ತು ಶಿಕ್ಷಣ',
    'gru-library-card': {
      'featured-course': 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಕೋರ್ಸ್'
    },
    'gru-partner-library-card': {
      course: {
        zero: '{{count}} ಕೋರ್ಸ್',
        one: '{{count}} ಕೋರ್ಸ್',
        other: '{{count}} ಶಿಕ್ಷಣ'
      },
      collection: {
        zero: '{{count}} ಸಂಗ್ರಹ',
        one: '{{count}} ಸಂಗ್ರಹ',
        other: '{{count}} ಸಂಗ್ರಹಣೆಗಳು'
      },
      assessment: {
        zero: '{{count}} ಮೌಲ್ಯಮಾಪನ',
        one: '{{count}} ಮೌಲ್ಯಮಾಪನ',
        other: '{{count}} ಮೌಲ್ಯಮಾಪನಗಳು'
      },
      resource: {
        zero: '{{count}} ಸಂಪನ್ಮೂಲ',
        one: '{{count}} ಸಂಪನ್ಮೂಲ',
        other: '{{count}} ಸಂಪನ್ಮೂಲಗಳು'
      },
      question: {
        zero: '{{count}} ಪ್ರಶ್ನೆ',
        one: '{{count}} ಪ್ರಶ್ನೆ',
        other: '{{count}} ಪ್ರಶ್ನೆಗಳು'
      },
      rubric: {
        zero: '{{count}} ರಬ್ರಿಕ್',
        one: '{{count}} ರಬ್ರಿಕ್',
        other: '{{count}} ರಬ್ರಿಕ್ಸ್'
      }
    },
    'partner-libraries': 'ಪಾಲುದಾರ ಗ್ರಂಥಾಲಯಗಳು'
  },
  'gru-study-header': {
    'lesson-legend': 'ನೀವು ಪ್ರಸ್ತುತ ಪಾಠದಲ್ಲಿದ್ದೀರಿ',
    'resource-legend': 'ನೀವು ಈ ಸಂಪನ್ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೀರಿ.',
    'resources-collection-report': 'ಸಂಗ್ರಹ ಬಳಕೆಯ ವರದಿ',
    'resources-assessment-report': 'ಮೌಲ್ಯಮಾಪನ ಸಾರಾಂಶ ವರದಿ',
    'check-summary': 'ನಿಮ್ಮ ಸಾರಾಂಶ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    'check-usage': 'ನಿಮ್ಮ ಬಳಕೆಯ ವರದಿ ಪರಿಶೀಲಿಸಿ',
    'no-suggestions':
      'ನಿಮ್ಮ ಕಲಿಕೆಗೆ ಬೆಂಬಲ ನೀಡುವ ಅತ್ಯುತ್ತಮ ಸಲಹೆಗಳನ್ನು ನಾವು ಮಾಡುತ್ತಿದ್ದೇವೆ',
    resource: {
      zero: 'ಸಂಪನ್ಮೂಲ',
      one: 'ಸಂಪನ್ಮೂಲ',
      other: 'ಸಂಪನ್ಮೂಲಗಳು'
    },
    question: {
      zero: 'ಪ್ರಶ್ನೆ',
      one: 'ಪ್ರಶ್ನೆ',
      other: 'ಪ್ರಶ್ನೆಗಳು'
    },
    'suggestions-legend': 'ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು, ಈ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
  },
  'gru-suggest-test': {
    'pre-test-header': 'ಪೂರ್ವ ಪರೀಕ್ಷೆ (ಐಚ್ಛಿಕ)',
    'post-test-header': 'ನಂತರದ ಪರೀಕ್ಷೆ (ಐಚ್ಛಿಕ)',
    'backfill-header': 'ಸೂಚಿಸಿದ ಸಂಗ್ರಹಣೆ (ಐಚ್ಛಿಕ)',
    'benchmark-header': 'ಬೆಂಚ್ಮಾರ್ಕ್-ಟೆಸ್ಟ್ (ಐಚ್ಛಿಕ)',
    'resource-header': 'ಸೂಚಿಸಿದ ಸಂಪನ್ಮೂಲ (ಐಚ್ಛಿಕ)',
    'signature_collection-header': 'ಸೂಚಿಸಿದ ಸಂಗ್ರಹಣೆ (ಐಚ್ಛಿಕ)',
    'signature_collection-lead':
      'ಈ ಕೋರ್ಸ್ನಲ್ಲಿನ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಆಧರಿಸಿ, ಕೆಳಗಿನ ಸಂಗ್ರಹಣೆಯು ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.',
    'signature_assessment-header': 'ಸೂಚಿಸಿದ ಮೌಲ್ಯಮಾಪನ (ಐಚ್ಛಿಕ)',
    'signature_assessment-lead':
      'ಈ ಕೋರ್ಸ್ನಲ್ಲಿನ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಆಧರಿಸಿ, ಕೆಳಗಿನ ಮೌಲ್ಯಮಾಪನವು ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.',
    'pre-test-lead':
      'ಈ ಪಾಠದಲ್ಲಿನ ಪರಿಕಲ್ಪನೆಗಳ ಕುರಿತು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ತಿಳುವಳಿಕೆಯನ್ನು ಅಳೆಯಲು ಪೂರ್ವ ಪರೀಕ್ಷೆಯು ಸೂಚಿಸಲಾಗಿದೆ. ಪೂರ್ವ ಪರೀಕ್ಷೆಯು ಪಾಠದಲ್ಲಿರುವ ವಿಷಯಕ್ಕಾಗಿ ನಿಮ್ಮನ್ನು ಸಿದ್ಧಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಪೂರ್ವ ಪರೀಕ್ಷೆಯು ನಿಮ್ಮ ಕೋರ್ಸ್ ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.',
    'post-test-lead':
      'ಕೆಳಗಿನ ಪೋಸ್ಟ್-ಪರೀಕ್ಷೆಯು ಪ್ರಸ್ತುತಪಡಿಸಿದ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಅಳೆಯಲು ಸೂಚಿಸಲಾಗಿದೆ. ಪೋಸ್ಟ್-ಟೆಸ್ಟ್ ನಿಮ್ಮ ಕೋರ್ಸ್ ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.',
    'backfill-lead':
      'ನಿಮ್ಮ ಪೂರ್ವ-ಪರೀಕ್ಷೆಯ ಪ್ರತಿಕ್ರಿಯೆಗಳ ಆಧಾರದ ಮೇಲೆ, ಪಾಠವನ್ನು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಹೆಚ್ಚುವರಿ ವಸ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಹಾಯಕವಾಗಬಹುದು. ಪೋಷಕ ವಸ್ತುವನ್ನು ಪರಿಶೀಲಿಸುವ ಮೂಲಕ ಹೊಸ ವಸ್ತುಗಳನ್ನು ಕಲಿಯಲು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಬಹುದು.',
    'benchmark-lead':
      'ನೀವು ಬೆಂಚ್ಮಾರ್ಕ್ ಮೌಲ್ಯಮಾಪನವನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಮೂಲಕ ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಪ್ರದರ್ಶಿಸಲು ಸಿದ್ಧರಾಗಿರುವಿರಿ. ಬೆಂಚ್ಮಾರ್ಕ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸುವುದಕ್ಕಾಗಿ ನೀವು ಬ್ಯಾಡ್ಜ್ ಗಳಿಸುವಿರಿ. ಬೆಂಚ್ಮಾರ್ಕ್ ನಿಮ್ಮ ಕೋರ್ಸ್ ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ.',
    'resource-lead':
      'ಈ ಕೋರ್ಸ್ನಲ್ಲಿನ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಆಧರಿಸಿ, ಕೆಳಗಿನ ಸಂಪನ್ಮೂಲವು ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.',
    no: 'ಬೇಡ ಧನ್ಯವಾದಗಳು',
    'no-suggestions': 'ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯ ಸಾರಾಂಶ ಇಲ್ಲಿದೆ.',
    take: '{{type}} ತೆಗೆದುಕೊಳ್ಳಿ',
    'take-signature-collection': 'ಅಧ್ಯಯನ ಸಲಹೆ ಸಂಗ್ರಹಣೆ',
    'take-signature-assessment': 'ಅಧ್ಯಯನದ ಸಲಹೆ ಮೌಲ್ಯಮಾಪನ',
    'take-backfill-pretest': 'ಅಧ್ಯಯನ ಸಲಹೆ ಸಂಗ್ರಹಣೆ',
    'take-resource': 'ಅಧ್ಯಯನ ಸಂಪನ್ಮೂಲ',
    'end-of-course': 'ನೀವು ಪಠ್ಯದ ಅಂತ್ಯವನ್ನು ತಲುಪಿದ್ದೀರಿ.'
  },
  'gru-content-suggestion': {
    header: 'We have a suggestion for you!',
    'suggestion-text': {
      collection:
        'Based on your performance on this topic, we recommend that you go through our suggested collection to help you gain mastery.',
      assessment:
        'Based on your performance on this topic, we recommend that you go through our suggested assessment to help you gain mastery.'
    }
  },
  'student-open-ended-summary': {
    'overall-comment': 'ಒಟ್ಟಾರೆ ಕಾಮೆಂಟ್',
    'overall-score': 'ಒಟ್ಟಾರೆ ಸ್ಕೋರ್',
    prompt: 'ಪ್ರಶ್ನೆ ಪ್ರಾಂಪ್ಟ್'
  },
  'gru-performance-chart': {
    'teacher-tooltip':
      'ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ಈ ಪಾಠದಲ್ಲಿ ಎಲ್ಲಾ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ'
  },
  report: {
    'external-assessment-report': {
      note:
        'ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ವಿದ್ಯಾರ್ಥಿ ವರದಿ ಮಾಡಿದ ಅಂಕಗಳೊಂದಿಗೆ ಇದು ಬಾಹ್ಯ ಮೌಲ್ಯಮಾಪನವಾಗಿದೆ. ವೈಯಕ್ತಿಕ ಪ್ರಶ್ನೆ ಮಟ್ಟದ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ.',
      wish: 'ಅಭಿನಂದನೆಗಳು! ನೀವು ಗಳಿಸಿದ್ದೀರಿ',
      reference: 'ಈ ಬಾಹ್ಯ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರವೇಶಿಸಬಹುದು '
    },
    'external-collection-report': {
      note:
        'This is an external collection with student reported scores for the collection. Individual question level data is not available.',
      wish: 'Congratulations! You scored',
      reference: 'This external collection can be accessed '
    },
    'competency-report': {
      title: 'ಸ್ಪರ್ಧಾತ್ಮಕ ವರದಿ',
      'no-subject': 'ವಿಷಯ ನಿಗದಿಪಡಿಸಲಾಗಿಲ್ಲ',
      prerequisites: 'ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು',
      'signature-assessments': 'Signature ಮೌಲ್ಯಮಾಪನಗಳು',
      'signature-collections': 'Signature ಸಂಗ್ರಹಣೆಗಳು',
      'show-global-data': 'ಜಾಗತಿಕ ಡೇಟಾವನ್ನು ತೋರಿಸಿ',
      'show-student-data': 'ವಿದ್ಯಾರ್ಥಿ ಡೇಟಾವನ್ನು ತೋರಿಸಿ',
      'show-learning-map': 'Show Learning Map',
      note:
        'Score 80% or more in our signature assessment and show your mastery'
    },
    'domain-report': 'ಡೊಮೇನ್ ವರದಿ'
  },
  'competency-info-content': {
    journey: 'JOURNEY',
    metadata: 'METADATA',
    'learning-map': 'LEARNING MAP'
  },
  'competency-meta-data': {
    title: 'ALT-CONCEPTS',
    heading: {
      micro: 'MICRO COMPETENCIES',
      prequisite: 'PREQUISITE COMPETENCIES'
    },
    nodata: {
      micro: 'There are no micro-competencies defined for this competency',
      prequisite:
        'There are no prerequisite-competencies defined for this competency',
      competency: 'There are no alt-concepts defined for this competency'
    }
  },
  'student-journey': {
    heading: 'YOUR JOURNEY',
    'teacher-heading': 'STUDENT JOURNEY',
    nodata: 'You are yet to start your journey for this competency',
    'no-data-teacher': 'Student are yet to start journey for this competency',
    'student-status-3':
      'You have asserted that you know this competency and you have not studied any learning activity on the Navigator for this competency.',
    'student-status-2':
      'You have not studied any learning activity on the Navigator for this competency. The status for this competency is inferred mastery based on evidence of mastery in another competency',
    'teacher-status-2':
      'The student has not studied any learning activity on the Navigator for this competency. The status for this competency is inferred mastery based on evidence of mastery in another competency',
    'teacher-status-3':
      'The student has asserted mastery in the competency and has not studied any learning activity on the Navigator for this competency.'
  },
  'learning-map': {
    'practice-question': 'practice questions',
    'no-practice-questions':
      'There are no practice questions for this competency',
    'solved-examples': 'solved examples',
    'no-solved-examples': 'There are no solved examples for this competency',
    'challenging-questions': 'challenging questions',
    'no-challenging-questions':
      'There are no challenging questions for this competency'
  },
  'student-card': {
    message: 'This {{type}} has been deleted'
  },
  'self-report': {
    'your-score': 'ನಿಮ್ಮ ಅಂಕ',
    time_spent: 'Time Spent',
    'update-error': 'ಸ್ಕೋರ್ ಅನ್ನು ಅಪ್ಡೇಟ್ ಮಾಡುವಲ್ಲಿ ಸಮಸ್ಯೆ',
    'validation-error': 'ಮಾನ್ಯವಾದ ಸ್ಕೋರ್ ನಮೂದಿಸಿ',
    'enter-score': 'ನಿಮ್ಮ ಸ್ಕೋರ್ ಅನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ',
    'enter-timeSpent': 'Enter your time spent here',
    'validation-error-time': 'Enter valid time'
  },
  notifications: {
    'notificationlist-header-title': 'ಸೂಚನೆ',
    'show-more': 'ಇನ್ನು ಹೆಚ್ಚು ತೋರಿಸು',
    type: {
      'teacher-suggestion-title':
        'ನೀವು ತರಗತಿಯಲ್ಲಿ ಹೊಸ ಶಿಕ್ಷಕ ಸಲಹೆಯನ್ನು ಹೊಂದಿದ್ದೀರಿ : {{ classTitle }}',
      'student-gradable-submission-title':
        'You have {{occurrence}} item(s) to grade in class : {{ classTitle }}',
      'student-self-report-title':
        '{{occurrence}} ವಿದ್ಯಾರ್ಥಿ ವರ್ಗದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ವರದಿ ಮಾಡಿದ್ದಾರೆ : {{ classTitle }}',
      'teacher-override-title':
        'ಶಿಕ್ಷಕ ನಿಮ್ಮ ಸಲ್ಲಿಕೆಗಳನ್ನು ವರ್ಗದಲ್ಲಿ ಸರಿಪಡಿಸಿದ್ದಾರೆ : {{ classTitle }}  ',
      'teacher-grading-complete-title':
        'ಶಿಕ್ಷಕನು ನಿಮ್ಮ ಸಲ್ಲಿಕೆಗಳನ್ನು ತರಗತಿಯಲ್ಲಿ ವರ್ಗೀಕರಿಸಿದ್ದಾನೆ : {{ classTitle }}'
    },
    typeinclass: {
      'teacher-suggestion-title': 'ನಿಮಗೆ ಹೊಸ ಶಿಕ್ಷಕ ಸಲಹೆ ಇದೆ',
      'student-gradable-submission-title':
        'You have {{occurrence}} student item(s) to grade',
      'student-self-report-title':
        '{{occurrence}} Student(s) reported performance',
      'teacher-override-title': 'ಶಿಕ್ಷಕರು ನಿಮ್ಮ ಸಲ್ಲಿಕೆಯನ್ನು ಸರಿಪಡಿಸಿದ್ದಾರೆ',
      'teacher-grading-complete-title':
        'ಶಿಕ್ಷಕನು ನಿಮ್ಮ ಸಲ್ಲಿಕೆಗಳನ್ನು ತರಗತಿಯಲ್ಲಿ ವರ್ಗೀಕರಿಸಿದ್ದಾನೆ'
    }
  }
});
