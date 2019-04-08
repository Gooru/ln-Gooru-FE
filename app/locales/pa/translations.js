import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
  as: 'অসমীয়া',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  ml: 'മല്യാലം',
  or: ' ଓଡ଼ିଆ',
  pa: 'ਪੰਜਾਬੀ',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  'errors.description': 'ਇਹ ਫੀਲਡ',
  'errors.inclusion': '{{description}} ਨੂੰ ਸੂਚੀ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ',
  'errors.exclusion': '{{description}} ਰਿਜ਼ਰਵਡ ਹੈ',
  'errors.invalid': '{{description}} ਅਯੋਗ ਹੈ',
  'errors.confirmation': '{{description}} ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ {{on}}',
  'errors.accepted': '{{description}} ਨੂੰ ਸਵੀਕਾਰ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ',
  'errors.empty': '{{description}} ਖਾਲੀ ਨਹੀਂ ਹੋ ਸਕਦਾ',
  'errors.blank': '{{description}} ਖਾਲੀ ਨਹੀਂ ਹੋ ਸਕਦੀ',
  'errors.present': '{{description}} ਖਾਲੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ',
  'errors.collection': '{{description}} ਇੱਕ ਭੰਡਾਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.singular': '{{description}} ਇੱਕ ਭੰਡਾਰ ਨਹੀਂ ਹੋ ਸਕਦਾ',
  'errors.tooLong': '{{description}} ਬਹੁਤ ਲੰਬਾ ਹੈ (ਅਧਿਕਤਮ {{ਅਧਿਕਤਮ}} ਅੱਖਰ ਹਨ)',
  'errors.tooShort': '{{description}} ਬਹੁਤ ਛੋਟਾ ਹੈ (ਘੱਟੋ ਘੱਟ {{min}} ਅੱਖਰ ਹਨ)',
  'errors.before': '{{description}} {{ਪਹਿਲਾਂ}} ਦੇ ਅੱਗੇ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.after': '{{description}} {{ਬਾਅਦ}} ਦੇ ਬਾਅਦ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.wrongDateFormat':
    '{{description}} {{format}} ਦੇ ਫਾਰਮੈਟ ਵਿੱਚ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ',
  'errors.wrongLength':
    '{{description}} ਗਲਤ ਲੰਬਾਈ ਹੈ ({{ਹੈ}} ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ)',
  'errors.notANumber': '{{description}} ਇੱਕ ਨੰਬਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.notAnInteger': '{{description}} ਇੱਕ ਪੂਰਨ ਅੰਕ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.greaterThan': '{{description}} {{gt}} ਤੋਂ ਵੱਡਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ.',
  'errors.greaterThanOrEqualTo':
    '{{description}} {{gte}} ਤੋਂ ਵੱਡਾ ਜਾਂ ਬਰਾਬਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.equalTo': '{{description}} {{ਹੈ}} ਦੇ ਬਰਾਬਰ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ',
  'errors.lessThan': '{{description}} {{lt}} ਤੋਂ ਘੱਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ.',
  'errors.lessThanOrEqualTo':
    '{{description}} {{lte}} ਦੇ ਬਰਾਬਰ ਜਾਂ ਇਸ ਤੋਂ ਘੱਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.otherThan': '{{description}} {{value}} ਤੋਂ ਇਲਾਵਾ ਹੋਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.odd': '{{description}} ਅਜੀਬ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.even': '{{description}} ਵੀ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.positive': '{{description}} ਸਕਾਰਾਤਮਕ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.date': '{{description}} ਇੱਕ ਯੋਗ ਤਾਰੀਖ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ',
  'errors.email': '{{description}} ਇੱਕ ਵੈਧ ਈਮੇਲ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.phone': '{{description}} ਇੱਕ ਵੈਧ ਫੋਨ ਨੰਬਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'errors.url': '{{description}} ਇੱਕ ਵੈਧ url ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'common.relevance': 'ਸਾਰਥਕ',
  'common.engagement': 'ਸ਼ਮੂਲੀਅਤ',
  'common.efficacy': 'ਕਾਰਗੁਜ਼ਾਰੀ',
  'common.grid': 'ਗਰਿੱਡ',
  'common.list': 'ਸੂਚੀ',
  'common.first': 'ਪਹਿਲਾ',
  'common.last': 'ਆਖਰੀ',
  'common.name': 'ਨਾਮ',
  'common.user': 'ਯੂਜ਼ਰ',
  'common.content-name': 'ਸਮੱਗਰੀ ਦਾ ਨਾਂ',
  'common.lastName': 'ਆਖੀਰਲਾ ਨਾਂਮ',
  'common.firstName': 'ਪਹਿਲਾ ਨਾਂ',
  'common.filter-by': 'ਦੁਆਰਾ ਫਿਲਟਰ',
  'common.more': 'ਹੋਰ',
  'common.apply-filter': 'apply filter',
  'search-help-message': 'Choose filters to apply',
  'common.avg-score': 'ਔਸਤ ਸਕੋਰ',
  'common.frq': 'frq',
  'common.schedule': 'ਸਮਾਸੂਚੀ, ਕਾਰਜ - ਕ੍ਰਮ',
  'common.responses': 'ਜਵਾਬ',
  'common.no-lesson-info-message': 'ਇਸ ਯੂਨਿਟ ਵਿੱਚ ਕੋਈ ਸਬਕ ਹੈ',
  'common.no-collection-info-message': 'ਇਸ ਪਾਠ ਵਿੱਚ ਕੋਈ ਸੰਗ੍ਰਹਿ ਹੈ',
  'common.gooru-suggestions': 'ਗੋਰੂ ਸੁਝਾਅ',
  'common.gooru-catalog': 'ਗੋੂਰੂ ਕੈਟਾਲਾਗ',
  'common.suggestion-made-to': 'ਸੁਝਾਅ',
  'common.student-selected': 'ਵਿਦਿਆਰਥੀ ਨੇ ਚੁਣਿਆ',
  'common.no-suggest-result-message': ' ਕੋਈ ਮੇਲ ਖਾਂਦੀ ਸਮਗਰੀ ਨਹੀਂ ਮਿਲੀ',
  'common.no-suggest-results-message':
    'ਤੁਸੀਂ ਖੋਜੀ ਸਮੱਗਰੀ ਲੱਭ ਸਕਦੇ ਹੋ ਅਤੇ ਲੱਭ ਸਕਦੇ ਹੋ',
  'common.no-suggest-search-results-message':
    'ਆਪਣੇ ਸਪੈਲਿੰਗਾਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਸੀਂ ਸਾਰੇ ਗ਼ਲਤੀਆਂ ਕਰਦੇ ਹਾਂ! ਜਾਂ ਇਸਦੀ ਬਜਾਏ ਇਸੇ ਸ਼ਬਦ ਦੀ ਖੋਜ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.a-collection': 'ਇੱਕ ਸੰਗ੍ਰਹਿ',
  'common.a-course': 'ਇੱਕ ਕੋਰਸ',
  'common.a-question': 'ਇੱਕ ਸਵਾਲ',
  'common.a-resource': 'ਇੱਕ ਸਰੋਤ',
  'common.a-rubric': 'ਇੱਕ ਚਰਬੀਕਾਰ',
  'common.all-completed': 'ਸਭ ਨੂੰ ਪੂਰਾ ਕੀਤਾ',
  'common.an-assessment': 'ਇੱਕ ਮੁਲਾਂਕਣ',
  'common.about': 'ਬਾਰੇ',
  'common.about-you': 'ਤੁਹਾਡੇ ਬਾਰੇ',
  'common.about-me': 'ਮੇਰੇ ਬਾਰੇ ਵਿੱਚ',
  'common.accept': 'ਸਵੀਕਾਰ ਕਰੋ',
  'common.ignore': 'ਅਣਡਿੱਠ ਕਰੋ',
  'common.add': 'ਜੋੜਨਾ',
  'common.plan-an-activities': 'Plan your activities',
  'common.plan-an-activities-msg':
    'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
  'common.Reschedule': 'ਮੁੜ ਸਮਾਂ-ਤਹਿ',
  'common.no-unschedule-items':
    'ਤੁਹਾਡੇ ਕੋਲ ਕਿਸੇ ਵੀ ਗਤੀਵਿਧੀ ਨਹੀਂ ਹੈ ਜਿਸ ਲਈ ਸਮਾਂ ਸਾਰਣੀ ਦੀ ਲੋੜ ਹੈ',
  'common.repeat-activity': 'ਦੁਹਰਾਓ ਗਤੀਵਿਧੀ',
  'common.add-assessment': 'ਨਵਾਂ ਮੁਲਾਂਕਣ ਬਣਾਓ',
  'common.add-century-skills': '21 ਵੀਂ ਸਦੀ ਦੇ ਹੁਨਰ ਸ਼ਾਮਿਲ ਕਰੋ',
  'common.add-collaborator': 'ਸਹਿਭਾਗੀ ਜੋੜੋ',
  'common.add-collection': 'ਨਵਾਂ ਸੰਗ੍ਰਹਿ ਬਣਾਓ',
  'common.add-collection-item': 'ਸਰੋਤ ਜਾਂ ਸਵਾਲ ਬਣਾਉ',
  'common.add-competency': 'ਸਮਰੱਥਾ ਜੋੜੋ',
  'common.add-content-prompt':
    'ਤੁਸੀ ਬਣਾਇਆ ਹੈ [1] {{ਟਾਈਪ}} [2] ਹਾਲੇ ਤੱਕ. ਜਾਓ, ਬੋਲਡ ਹੋਵੋ',
  'common.add-course': 'ਨਵਾਂ ਕੋਰਸ ਬਣਾਓ',
  'common.add-coruse-to-class': 'ਕੋਰਸ ਜੋੜੋ',
  'common.add-domains-to-unit': 'ਇਕਾਈ ਨੂੰ ਡੋਮੇਨ ਸ਼ਾਮਿਲ ਕਰੋ',
  'common.add-url': 'url ਜੋੜੋ',
  'common.add-from-url': 'url ਤੋਂ ਜੋੜੋ',
  'common.add-lessons': 'ਸਬਕ ਜੋੜੋ',
  'common.add-new-lesson': 'ਨਵਾਂ ਸਬਕ ਬਣਾਓ',
  'common.add-new-unit': 'ਨਵਾਂ ਯੂਨਿਟ ਬਣਾਓ',
  'common.add-new-resource': 'ਨਵਾਂ ਸਰੋਤ ਬਣਾਓ',
  'common.add-new-question': 'ਇੱਕ ਨਵਾਂ ਸਵਾਲ ਬਣਾਉ',
  'common.add-question': 'ਸਵਾਲ ਬਣਾਉ',
  'common.add-question-image': 'ਸਵਾਲ ਦਾ ਚਿੱਤਰ ਜੋੜੋ',
  'common.add-rubric': 'ਨਵਾਂ ਚਿੰਨ੍ਹ ਜੋੜੋ',
  'common.add-standard': 'ਮਿਆਰੀ ਸ਼ਾਮਿਲ ਕਰੋ',
  'common.add-standards': 'ਮਿਆਰ ਪਾਓ',
  'common.add-standards-to-collection': 'ਸੰਗ੍ਰਹਿ ਦੇ ਮਿਆਰਾਂ ਨੂੰ ਜੋੜਨਾ',
  'common.add-to': 'ਨਾਲ ਜੋੜ ਦਿਓ',
  'common.add-to-classroom': 'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰੋ',
  'common.add-to-daily-class': 'ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
  'common.add-to-collection-success':
    'ਤੁਸੀਂ {{contenttitle}} ਨੂੰ {{collectiontitle}} ਨਾਲ ਜੋੜਿਆ ਹੈ. ਕੀ ਤੁਸੀਂ {{collectiontype}} ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.add-to-lesson-success':
    'ਤੁਸੀਂ {{collectiontitle}} ਨੂੰ ਜੋੜਿਆ ਹੈ {{ਘੱਟ ਅਸਾਨੀ ਨਾਲ}}. ਕੀ ਤੁਸੀਂ {{collectiontype}} ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.add-type-question': 'ਤੁਸੀਂ ਕਿਹੋ ਜਿਹੀ ਪ੍ਰਸ਼ਨ ਪੁੱਛਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.add-type-resource': 'ਇਹ ਕਿਸ ਕਿਸਮ ਦਾ ਵਸੀਲਾ ਹੈ?',
  'common.add-units': 'ਯੂਨਿਟਸ ਜੋੜੋ',
  'common.added': 'ਜੋੜਿਆ ਗਿਆ',
  'common.advanced-editing': 'ਤਕਨੀਕੀ ਸੰਪਾਦਨ',
  'common.announcements': 'ਘੋਸ਼ਣਾਵਾਂ',
  'common.anonymous_mode': 'ਅਗਿਆਤ ਮੋਡ',
  'common.answer': 'ਤੁਹਾਡਾ ਜਵਾਬ',
  'common.answer-correct': 'ਤੁਸੀਂ ਠੀਕ ਹੋ!',
  'common.answer-incorrect': 'ਤੁਸੀਂ ਗਲਤ ਹੋ ...',
  'common.answer-key-was-hidden':
    'ਨੋਟ: ਤੁਹਾਡੇ ਅਧਿਆਪਕ ਨੇ ਉੱਤਰ ਦੀ ਕੁੰਜੀ ਨੂੰ ਲੁਕਾਇਆ ਹੈ.',
  'common.approved': 'ਮਨਜ਼ੂਰ',
  'common.archive': 'ਅਕਾਇਵ',
  'common.assessment': 'ਮੁਲਾਂਕਣ',
  'common.assessment-disabled': 'ਤੁਸੀਂ ਇਸ ਮੁਲਾਂਕਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਨਹੀਂ ਕਰ ਸਕਦੇ',
  'common.assessment-external': 'ਮੁਲਾਂਕਣ-ਬਾਹਰੀ',
  'common.assessment-pl.zero': 'ਮੁਲਾਂਕਣ',
  'common.assessment-pl.one': 'ਮੁਲਾਂਕਣ',
  'common.assessment-pl.other': 'ਮੁਲਾਂਕਣ',
  'common.assessment-title': 'ਮੁਲਾਂਕਣ ਦਾ ਸਿਰਲੇਖ',
  'common.assessmentInitial': 'a',
  'common.assessments': 'ਮੁਲਾਂਕਣ',
  'common.assign': 'ਨਿਰਧਾਰਤ ਕਰੋ',
  'common.assign-to-class': 'ਕਲਾਸਰੂਮ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰੋ',
  'common.assign-to-course': 'ਕੋਰਸ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰੋ',
  'common.attempt': 'ਕੋਸ਼ਿਸ਼ ਨੰਬਰ',
  'common.audience': 'ਹਾਜ਼ਰੀਨ',
  'common.avatarFor': 'ਅਵਤਾਰ ਲਈ',
  'common.averageScore': 'ਔਸਤ ਸਕੋਰ',
  'common.back': 'ਵਾਪਸ',
  'common.back-to-assessment': 'ਮੁਲਾਂਕਣ ਲਈ ਵਾਪਸ',
  'common.back-to-collection': 'ਭੰਡਾਰ ਤੇ ਵਾਪਸ',
  'common.back-to-course-map': 'ਵਾਪਸ ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'common.back-to-data': 'ਵਾਪਸ ਡਾਟਾ ਤੇ',
  'common.back-to-report': 'ਵਾਪਸ ਰਿਪੋਰਟ ਕਰਨ ਲਈ',
  'common.best-practices': 'ਵਧੀਆ ਅਮਲ',
  'common.beta': 'ਬੀਟਾ',
  'common.big-ideas': 'ਵੱਡੇ ਵਿਚਾਰ',
  'common.biography': 'ਜੀਵਨੀ',
  'common.bookmark': 'ਬੁੱਕਮਾਰਕ',
  'common.bookmarks': 'ਬੁੱਕਮਾਰਕ',
  'common.bookmarked-content-success':
    'ਇਸ ਬੁੱਕਮਾਰਕ {{contenttype}} ਨੂੰ ਤੁਹਾਡੇ ਸੁਤੰਤਰ ਸਿੱਖਿਆ ਪੰਨੇ ਵਿੱਚ ਜੋੜਿਆ ਜਾਵੇਗਾ.',
  'common.bookmarked-success':
    'ਸਾਰੇ ਬੁਕਮਾਰਕ ਸਮੱਗਰੀ ਨੂੰ ਸੁਤੰਤਰ ਸਿੱਖਿਆ ਪੇਜ ਤੇ ਜੋੜਿਆ ਜਾਵੇਗਾ.',
  'common.builder': 'ਸੰਪਾਦਕ',
  'common.cancel': 'ਰੱਦ ਕਰੋ',
  'common.categories': 'ਵਰਗ',
  'common.category': 'ਸ਼੍ਰੇਣੀ',
  'common.categoryOptions.k12': 'k-12',
  'common.categoryOptions.k12IN': 'k12in',
  'common.categoryOptions.higher-ed': 'ਉੱਚ ਸਿੱਖਿਆ',
  'common.categoryOptions.professional-dev': 'ਪੇਸ਼ੇਵਰ ਵਿਕਾਸ',
  'common.century-skills': '21 ਵੀਂ ਸਦੀ ਦੇ ਹੁਨਰ',
  'common.choose': 'ਚੁਣੋ',
  'common.choose-file': 'ਇੱਕ ਫਾਈਲ ਚੁਣੋ',
  'common.class': 'ਕਲਾਸਰੂਮ',
  'common.classScores': 'ਕਲਾਸ ਦੇ ਸਕੋਰਾਂ',
  'common.click-unBookmark': 'ਨਾ-ਬੁੱਕਮਾਰਕ ਤੇ ਕਲਿੱਕ ਕਰੋ',
  'common.close': 'ਬੰਦ',
  'common.collection': 'ਸੰਗ੍ਰਹਿ',
  'common.collection-external': 'External Collection',
  'common.collection-pl.zero': 'ਸੰਗ੍ਰਹਿ',
  'common.collection-pl.one': 'ਸੰਗ੍ਰਹਿ',
  'common.collection-pl.other': 'ਸੰਗ੍ਰਹਿ',
  'common.collection-title': 'ਭੰਡਾਰ ਦਾ ਸਿਰਲੇਖ',
  'common.collections': 'ਸੰਗ੍ਰਹਿ',
  'common.collectionInitial': 'ਸੀ',
  'common.competency': 'ਯੋਗਤਾ',
  'common.competencies': 'ਸਮਰੱਥਾ',
  'common.completed': 'ਮੁਕੰਮਲ',
  'common.completion': 'ਮੁਕੰਮਲ',
  'common.community': 'ਭਾਈਚਾਰੇ',
  'common.confirm': 'ਪੁਸ਼ਟੀ ਕਰੋ',
  'common.confirm-copy': 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਕਾਪੀ ਕਰੋ',
  'common.content': 'ਸਮੱਗਰੀ',
  'common.content-manager': 'ਸਮੱਗਰੀ ਮੈਨੇਜਰ',
  'common.contentUnavailable': 'ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ',
  'common.contentUnavailabletoday':
    'ਕੋਈ ਮੌਜੂਦਾ ਕੰਮ ਨਹੀਂ ਕੋਰਸ ਮੈਪ ਜਾਂ ਮੇਰੀ ਸਮਗਰੀ ਤੋਂ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰੋ',
  'common.contentUnavailableyesterday': 'ਕੋਈ ਵੀ ਗਤੀਵਿਧੀ ਸ਼ਾਮਿਲ ਨਹੀਂ ਕੀਤੀ ਗਈ.',
  'common.contributed-by': 'ਦੁਆਰਾ ਯੋਗਦਾਨ ਪਾਇਆ',
  'common.copy': 'ਕਾਪੀ ਕਰੋ',
  'common.copy-to': 'ਕਾਪੀ ਕਰੋ',
  'common.correct': 'ਸਹੀ',
  'common.correct-answer': 'ਸਹੀ ਜਵਾਬ',
  'common.correct-answers': 'ਸਹੀ ਉੱਤਰ',
  'common.incorrect-answers': 'ਗਲਤ ਜਵਾਬ (s)',
  'common.rubric-graded': 'ਚਰਚਿਤ ਗਰੇਡਡ',
  'common.self-graded': 'ਸਵੈ-ਸ਼੍ਰੇਣੀ',
  'common.rubric-grade': 'ਰੂਬਿਕ ਗ੍ਰੇਡ',
  'common.brief': 'ਸੰਖੇਪ',
  'common.update-grade-score':
    'ਤੁਹਾਡੇ frq ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਗ੍ਰੇਡ ਸਕੋਰ ਨੂੰ ਅਪਡੇਟ ਕਰੋ',
  'common.answer-this-rubric':
    'ਆਪਣੇ ਫਰੰਟ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਇਸ ਚਰਣਾਂ ਦੇ ਜਵਾਬ ਦਿਓ.',
  'common.all-caught-up': 'ਤੁਸੀਂ ਸਾਰੇ ਫੜ ਗਏ ਹੋ!',
  'common.no-users-to-grade': 'ਇਸ ਫਰੇਕ ਲਈ ਗ੍ਰੇਡ ਦੇ ਕੋਈ ਯੂਜਰ ਨਹੀਂ ਹਨ.',
  'common.rubric-needs-grading': 'ਸਧਾਰਣ ਲੋੜਾਂ ਦੀ ਗਰੇਡਿੰਗ',
  'common.not-answered': 'ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ',
  'common.rubric-not-answered': 'ਚਿੰਨ੍ਹ ਦਾ ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ',
  'common.country': 'ਦੇਸ਼',
  'common.course-map': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'common.course': 'ਕੋਰਸ',
  'common.course-title': 'ਕੋਰਸ ਦਾ ਸਿਰਲੇਖ',
  'common.courses': 'ਕੋਰਸ',
  'common.competency-status-0': 'Not Started',
  'common.competency-status-1': 'In Progress',
  'common.competency-status-2': 'Mastered (Inferred)',
  'common.competency-status-3': 'Mastered (Asserted)',
  'common.competency-status-4': 'Mastered (Earned)',
  'common.competency-status-5': 'Mastered (Demonstrated)',
  'common.create': 'ਬਣਾਉ',
  'common.createClass': 'ਕਲਾਸ ਬਣਾਓ',
  'common.created-by': 'ਦੁਆਰਾ ਬਣਾਇਆ',
  'common.create-rubric': 'ਨਵਾਂ ਰੂਬਰੂ ਬਣਾਓ',
  'common.current-attempt': 'ਮੌਜੂਦਾ ਕੋਸ਼ਿਸ਼',
  'common.currently-studying': 'ਵਰਤਮਾਨ ਵਿੱਚ ਪੜ੍ਹ ਰਿਹਾ ਹੈ',
  'common.delete': 'ਮਿਟਾਓ',
  'common.delete-instructions.links-inaccessible':
    'ਸਾਰੇ ਸ਼ੇਅਰ ਲਿੰਕ ਪਹੁੰਚਯੋਗ ਨਹੀਂ ਹੋਣਗੇ',
  'common.delete-instructions.content-inaccessible':
    'ਸਾਰੀ ਸਮੱਗਰੀ ਇਸ ਨਾਲ ਜੁੜੇ ਕਲਾਸਰੂਮਾਂ ਲਈ ਪਹੁੰਚਯੋਗ ਨਹੀਂ ਹੋਵੇਗੀ',
  'common.depth-of-knowledge': 'ਗਿਆਨ ਦੀ ਗਹਿਰਾਈ',
  'common.description': 'ਵਰਣਨ',
  'common.destination': 'Destination',
  'common.disappear-after-login':
    'ਇਹ {{loginnumber}} ਦੇ ਲਾਗਿੰਨ ਬਾਅਦ ਅਲੋਪ ਹੋ ਜਾਵੇਗਾ',
  'common.disappear-next-login': 'ਇਹ ਅਗਲੇ ਲਾਗਇਨ ਤੇ ਦਿਖਾਈ ਨਹੀਂ ਦੇਵੇਗਾ',
  'common.district': 'ਜ਼ਿਲ੍ਹਾ',
  'common.domain': 'ਡੋਮੇਨ',
  'common.domains': 'ਡੋਮੇਨ',
  'common.download': 'ਡਾਉਨਲੋਡ ਕਰੋ',
  'common.download-print': 'ਡਾਊਨਲੋਡ / ਪ੍ਰਿੰਟ',
  'common.drag-drop-suggestions': 'ਜਾਂ ਸੁਝਾਅ ਡ੍ਰੈਗ ਅਤੇ ਡ੍ਰੌਪ ਕਰੋ ...',
  'common.download-report': 'ਰਿਪੋਰਟ ਡਾਉਨਲੋਡ ਕਰੋ',
  'common.done': 'ਕੀਤਾ',
  'common.edit': 'ਸੰਪਾਦਨ ਕਰੋ',
  'common.showassessments': 'ਸ਼ੋਅ ਅਸੈਸਮੈਂਟਸ',
  'common.showcollections': 'ਸੰਗ੍ਰਹਿ ਦਿਖਾਓ',
  'common.showlessons': 'ਸਬਕ ਦਿਖਾਓ',
  'common.collapse': 'ਢਹਿ',
  'common.expand': 'ਫੈਲਾਓ',
  'common.edit-assessment': 'ਮੁਲਾਂਕਣ ਸੰਪਾਦਨ ਕਰੋ',
  'common.edit-collection': 'ਸੋਧ ਸੰਗ੍ਰਿਹ',
  'common.edit-course': 'ਕੋਰਸ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰੋ',
  'common.edit-question': 'ਸਵਾਲ ਦਾ ਸੰਪਾਦਨ ਕਰੋ',
  'common.edit-resource': 'ਸਰੋਤ ਸੰਪਾਦਿਤ ਕਰੋ',
  'common.edit-rubric': 'ਸੋਧ',
  'common.email_support': 'support@gooru.org',
  'common.emotions.emotion-1': 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ',
  'common.emotions.emotion-2': 'ਮੈਂ ਸਮਝ ਨਹੀਂ ਪਾ ਰਿਹਾ',
  'common.emotions.emotion-3': 'ਮੇਹ ...',
  'common.emotions.emotion-4': 'ਮੈਂ ਸੱਮਝਦਾ ਹਾਂ',
  'common.emotions.emotion-5': 'ਮੈਂ ਸਮਝਾ ਸਕਦਾ ਹਾਂ',
  'common.enter-url': 'url ਦਰਜ ਕਰੋ',
  'common.enrolled-students': 'ਵਿਦਿਆਰਥੀ ਦਾਖਲ',
  'common.errors.join-class-code': 'ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕਰੋ.',
  'common.errors.answer-has-no-image': 'ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਜਵਾਬ ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ.',
  'common.errors.add-username': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਉਪਯੋਗਕਰਤਾ ਨਾਂ ਦਰਜ ਕਰੋ',
  'common.errors.add-course-title': 'ਕਿਰਪਾ ਕਰਕੇ ਕੋਰਸ ਦਾ ਸਿਰਲੇਖ ਦਿਓ.',
  'common.errors.add-question-answer-text':
    'ਕਿਰਪਾ ਕਰਕੇ ਉੱਤਰ ਚੋਣ ਟੈਕਸਟ ਦਰਜ ਕਰੋ.',
  'common.errors.add-question-description': 'ਕਿਰਪਾ ਕਰਕੇ ਪ੍ਰਸ਼ਨ ਦਾਖਲ ਕਰੋ.',
  'common.errors.add-question-title': 'ਕਿਰਪਾ ਕਰਕੇ ਸਵਾਲ ਦਾ ਸਿਰਲੇਖ ਭਰੋ.',
  'common.errors.assessment-title-presence':
    'ਕਿਰਪਾ ਕਰਕੇ ਮੁਲਾਂਕਣ ਟਾਈਟਲ ਦਾਖਲ ਕਰੋ',
  'common.errors.can-not-join-class':
    'ਓਹ! ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਵਿੱਚ ਅਸਮਰੱਥ ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.assessment-not-added-to':
    'ਓਹ! ਇਸ ਵੇਲੇ ਪਾਠ ਕਰਨ ਲਈ ਅਸੈਸਮੈਂਟ ਨੂੰ ਜੋੜਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.assessment-not-copied':
    'ਓਹ! ਇਸ ਵੇਲੇ ਮੁਲਾਂਕਣ ਦੀ ਨਕਲ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.assessment-not-created':
    'ਓਹ! ਇਸ ਵੇਲੇ ਮੁਲਾਂਕਣ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.assessment-not-updated':
    'ਓਹ! ਇਸ ਵੇਲੇ ਮੁਲਾਂਕਣ ਨੂੰ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.category-title-presence':
    'ਕਿਰਪਾ ਕਰਕੇ ਵਰਗ ਦੇ ਸਿਰਲੇਖ ਨੂੰ ਦਾਖ਼ਲ ਕਰੋ.',
  'common.errors.class-min-score':
    'ਘੱਟੋ ਘੱਟ ਸਕੋਰ 1 ਅਤੇ 100 ਦੇ ਵਿੱਚ ਇੱਕ ਨੰਬਰ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ',
  'common.errors.class-not-created':
    'ਓਹ! ਹੁਣ ਕਲਾਸਰੂਮ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.class-title-presence':
    'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਕਲਾਸਰੂਮ ਨੂੰ ਇੱਕ ਨਾਮ ਦਿਉ.',
  'common.errors.collection-not-added-to':
    'ਓਹ! ਇਸ ਵੇਲੇ ਸਬਕ ਲਈ ਕੁਲੈਕਸ਼ਨ ਜੋੜਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.collection-not-copied':
    'ਓਹ! ਇਸ ਵੇਲੇ ਕਲੈਕਸ਼ਨ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.collection-not-created':
    'ਓਹ! ਇਸ ਵੇਲੇ ਇਕੱਠਾ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.collection-not-updated':
    'ਓਹ! ਇਸ ਵੇਲੇ ਕਲੈਕਸ਼ਨ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.collection-title-presence':
    'ਕਿਰਪਾ ਕਰਕੇ ਸੰਗ੍ਰਹਿ ਦਾ ਟਾਈਟਲ ਦਾਖਲ ਕਰੋ.',
  'common.errors.correct-answer-presence': 'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਦਰਸਾਓ.',
  'common.errors.course-not-copied':
    'ਓਹ! ਇਸ ਵੇਲੇ ਕੋਰਸ ਦੀ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ ਹਾਂ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.course-not-created':
    'ਓਹ! ਇਸ ਵੇਲੇ ਕੋਰਸ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.course-not-updated':
    'ਓਹ! ਇਸ ਵੇਲੇ ਕੋਰਸ ਨੂੰ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ ਹਾਂ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.highlight-text-not-selected': 'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਦਰਸਾਓ.',
  'common.errors.highlight-text-wrong-format': 'ਗਲਤ ਸਵਾਲ ਫਾਰਮੈਟ',
  'common.errors.hotspot-text-max-choices':
    'ਤੁਸੀਂ ਉੱਤਰ ਦੀਆਂ ਚੋਣਾਂ ਦੀ ਸੀਮਾ ਤੱਕ ਪਹੁੰਚ ਗਏ ਹੋ',
  'common.errors.file-max-size': 'ਸਿਰਫ 5MB ਤੋਂ ਛੋਟੇ ਆਕਾਰ ਦੀ ਫਾਈਲਾਂ ਸਮਰਥਿਤ ਹਨ',
  'common.errors.file-upload-missing':
    'ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੇ ਕਿਸੇ ਵੀ ਐਕਸਟੈਂਸ਼ਨ ਨਾਲ ਇੱਕ ਫਾਈਲ ਚੁਣੋ: {{extensions}}',
  'common.errors.getting-next-resource':
    'ਤੁਹਾਡਾ ਜਵਾਬ ਪੇਸ਼ ਕਰਨ ਵਿੱਚ ਕੋਈ ਗਲਤੀ ਹੋਈ ਸੀ ਮੁੜ ਕੋਸ਼ਿਸ ਕਰੋ ਜੀ.',
  'common.errors.lesson-not-copied':
    'ਓਹ! ਹੁਣੇ ਸਬਕ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.lesson-not-created':
    'ਓਹ! ਹੁਣੇ ਸਬਕ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.lesson-not-loaded':
    'ਓਹ! ਇਸ ਵੇਲੇ ਪਾਠ ਨੂੰ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.lesson-title-required': 'ਕਿਰਪਾ ਕਰਕੇ ਸਬਕ ਦਾ ਸਿਰਲੇਖ ਦਿਓ.',
  'common.errors.password-confirm': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ.',
  'common.errors.password-length':
    'ਪਾਸਵਰਡ 5 ਅਤੇ 14 ਅੱਖਰਾਂ ਦੇ ਵਿੱਚ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ.',
  'common.errors.password-not-match': 'ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ.',
  'common.errors.password-required': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ.',
  'common.errors.password-special-characters': 'ਕਿਰਪਾ ਕਰਕੇ ਖਾਸ ਅੱਖਰ ਨਾ ਵਰਤੋ.',
  'common.errors.profile-not-updated':
    'ਓਹ! ਇਸ ਵੇਲੇ ਪ੍ਰੋਫਾਈਲ ਨੂੰ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.question-not-added-to':
    'ਓਹ! ਇਸ ਵੇਲੇ {{collectiontype}} ਨੂੰ ਪ੍ਰਸ਼ਨ ਜੋੜਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.question-not-copied':
    'ਓਹ! ਇਸ ਵੇਲੇ ਪ੍ਰਸ਼ਨ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.question-not-created':
    'ਓਹ! ਇਸ ਵੇਲੇ ਸਵਾਲ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.question-not-updated':
    'ਓਹ! ਇਸ ਵੇਲੇ ਸਵਾਲ ਨੂੰ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.reset-password-error':
    'ਓਹ ਹੋ! ਕੁਝ ਸਹੀ ਨਹੀਂ. ਪਾਸਵਰਡ ਰੀਸੈਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.reset-google-account-exists':
    'ਤੁਹਾਡਾ ਈਮੇਲ ਲੌਗਿਨ ਇੱਕ Google ਖਾਤੇ ਨਾਲ ਬਣਾਇਆ ਗਿਆ ਸੀ ਅਤੇ ਅਸੀਂ ਇੱਕ ਗੂਗਲ ਪਾਸਵਰਡ ਰੀਸੈਟ ਨਹੀਂ ਕਰ ਸਕਦੇ. ਜੇ ਤੁਸੀਂ ਆਪਣਾ ਗੂਗਲ ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ ਹੋ, ਤਾਂ ਤੁਹਾਨੂੰ ਇਸ ਨੂੰ ਆਪਣੇ ਗੂਗਲ ਐਪਸ ਦੁਆਰਾ ਰੀਸੈਟ ਕਰਨ ਦੀ ਲੋੜ ਪਵੇਗੀ.',
  'common.errors.resource-description-length':
    'ਵੇਰਵਾ 500 ਅੱਖਰਾਂ ਤੋਂ ਵੱਧ ਨਹੀਂ ਹੋ ਸਕਦਾ ਹੈ',
  'common.errors.resource-invalid-url': 'ਅਵੈਧ url',
  'common.errors.resource-missing-title': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਰੋਤ ਦਾ ਸਿਰਲੇਖ ਭਰੋ.',
  'common.errors.resource-missing-type': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਰੋਤ ਕਿਸਮ ਦੀ ਚੋਣ ਕਰੋ.',
  'common.errors.resource-missing-url': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਯੋਗ url ਦਾਖ਼ਲ ਕਰੋ.',
  'common.errors.resource-not-added-to-collection':
    'ਓਹ! ਹੁਣੇ ਭੰਡਾਰ ਕਰਨ ਲਈ ਸਰੋਤ ਜੋੜਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.resource-not-copied':
    'ਓਹ! ਸਰੋਤ ਦੀ ਹੁਣੇ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.resource-not-created':
    'ਓਹ! ਹੁਣੇ ਹੀ ਸਰੋਤ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.resource-not-updated':
    'ਓਹ! ਹੁਣ ਸੰਖੇਪ ਨੂੰ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ ਹੈ ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.resource-same-host-url': 'ਸਰੋਤ ਗੋੂਰੂ urls ਨਹੀਂ ਹੋ ਸਕਦੇ.',
  'common.errors.resource-title-length':
    'ਸਿਰਲੇਖ 50 ਅੱਖਰਾਂ ਤੋਂ ਲੰਬਾ ਨਹੀਂ ਹੋ ਸਕਦਾ.',
  'common.errors.rubric-title-presence': 'ਕਿਰਪਾ ਕਰਕੇ ਰੂਬਰਾਕ ਟਾਈਟਲ ਦਰਜ ਕਰੋ',
  'common.errors.rubric-url-presence': 'ਕਿਰਪਾ ਕਰਕੇ rubric url ਦਰਜ ਕਰੋ.',
  'common.errors.select-correct-answer': 'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਚੁਣੋ.',
  'common.errors.search-collections-length': 'ਕਿਰਪਾ ਕਰਕੇ ਘੱਟੋ ਘੱਟ 3 ਅੱਖਰ ਦਿਓ',
  'common.errors.sign-in-credentials-not-valid':
    'ਓਹ ਹੋ! ਕੁਝ ਸਹੀ ਨਹੀਂ. ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਉਪਯੋਗਕਰਤਾ ਨਾਂ ਅਤੇ ਪਾਸਵਰਡ ਚੈੱਕ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.sign-in-google-account-exists':
    'ਕਿਰਪਾ ਕਰਕੇ Google ਸਾਈਨਇਨ ਵਰਤੋ. ਅਸੀਂ ਤੁਹਾਡਾ ਪਾਸਵਰਡ ਰੀ - ਸੈੱਟ ਨਹੀਂ ਕਰ ਸਕਦੇ.',
  'common.errors.sign-up-error':
    'ਓਹ! ਹੁਣੇ ਸਾਈਨ ਅਪ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.sign-up-first-name': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪਹਿਲਾ ਨਾਮ ਦਾਖਲ ਕਰੋ.',
  'common.errors.sign-up-last-name': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਅਖੀਰਲਾ ਨਾਮ ਦਾਖ਼ਲ ਕਰੋ.',
  'common.errors.sign-up-name-length':
    'ਆਖਰੀ ਨਾਮ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 2 ਅੱਖਰ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ.',
  'common.errors.sign-up-name-only-letters': 'ਕਿਰਪਾ ਕਰਕੇ ਸਿਰਫ਼ ਅੱਖਰ ਹੀ ਦਿਓ.',
  'common.errors.sign-up-valid-email': 'ਇੱਕ ਜਾਇਜ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ.',
  'common.errors.special-characters':
    'ਤੁਸੀਂ ਖਾਸ ਅੱਖਰ ਜਾਂ ਥਾਂਵਾਂ ਦੀ ਵਰਤੋਂ ਨਹੀਂ ਕਰ ਸਕਦੇ.',
  'common.errors.unit-not-copied':
    'ਓਹ! ਹੁਣੇ ਯੂਨਿਟ ਦੀ ਕਾਪੀ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.unit-not-created':
    'ਓਹ! ਇਸ ਵੇਲੇ ਯੂਨਿਟ ਬਣਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.unit-not-loaded':
    'ਓਹ! ਇਸ ਵੇਲੇ ਯੂਨਿਟ ਨੂੰ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.errors.unit-title-required': 'ਕਿਰਪਾ ਕਰਕੇ ਯੂਨਿਟ ਦਾ ਸਿਰਲੇਖ ਭਰੋ.',
  'common.errors.user-email-presence': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਈਮੇਲ ਦਾਖ਼ਲ ਕਰੋ.',
  'common.errors.username-length':
    'ਉਪਯੋਗਕਰਤਾ ਨਾਂ 4 ਅਤੇ 254 ਦੇ ਅੱਖਰਾਂ ਦੇ ਵਿੱਚ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ.',
  'common.errors.forgot-password-gmail':
    'ਕਿਰਪਾ ਕਰਕੇ Google ਸਾਈਨਇਨ ਵਰਤੋ. ਅਸੀਂ ਤੁਹਾਡਾ ਪਾਸਵਰਡ ਰੀ - ਸੈੱਟ ਨਹੀਂ ਕਰ ਸਕਦੇ.',
  'common.errors.no-studymaterial':
    'ਇਸ ਕਲਾਸ ਨੂੰ ਜਾਰੀ ਕੀਤੀ ਗਈ ਕੋਰਸ ਵਿੱਚ ਇਸ ਵਿੱਚ ਕੋਈ ਅਧਿਐਨ ਸਮੱਗਰੀ ਨਹੀਂ ਹੈ ਕਿਰਪਾ ਕਰਕੇ ਇਸ ਨੂੰ ਠੀਕ ਕਰਨ ਲਈ ਆਪਣੇ ਅਧਿਆਪਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
  'common.essential-questions': 'ਜ਼ਰੂਰੀ ਸਵਾਲ',
  'common.example': 'ਉਦਾਹਰਨ:',
  'common.exit': 'ਨਿਕਾਸ',
  'common.external-collection': 'ਬਾਹਰੀ ਸੰਗ੍ਰਹਿ',
  'common.explanation': 'ਵਿਆਖਿਆ',
  'common.explore': 'ਪੜਚੋਲ ਕਰੋ',
  'common.false': 'ਗਲਤ',
  'common.featured-courses': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਅਤੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ;',
  'common.file-name': 'ਫਾਈਲ ਦਾ ਨਾਮ',
  'common.finish': 'ਮੁਕੰਮਲ',
  'common.first-name': 'ਪਹਿਲਾ ਨਾਂ',
  'common.follow': 'ਫਾਲੋ',
  'common.followers': 'ਚੇਲੇ',
  'common.following': 'ਹੇਠ ਦਿੱਤੇ',
  'common.forgotPassword': 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ',
  'common.from': 'ਤੋਂ',
  'common.from-my-assessments': 'ਮੇਰੇ ਅਨੁਮਾਨਾਂ ਤੋਂ',
  'common.from-my-collections': 'ਮੇਰੇ ਸੰਗ੍ਰਹਿ ਤੋਂ',
  'common.from-my-questions': 'ਮੇਰੇ ਸਵਾਲਾਂ ਤੋਂ',
  'common.from-my-resources': 'ਮੇਰੇ ਸਰੋਤਾਂ ਤੋਂ',
  'common.hide-results': 'ਨਤੀਜੇ ਛੁਪਾਓ',
  'common.hide-correct-answer': 'Hide Correct Answer',
  'common.hints': 'ਸੰਕੇਤ',
  'common.home': 'ਘਰ',
  'common.if_questions': 'ਜੇ ਤੁਹਾਡੇ ਕੋਈ ਸਵਾਲ ਹਨ,',
  'common.information': 'ਜਾਣਕਾਰੀ',
  'common.in-progress': 'ਤਰੱਕੀ ਹੋ ਰਹੀ ਹੈ',
  'common.instructor': 'ਇੰਸਟ੍ਰਕਟਰ',
  'common.last-name': 'ਆਖੀਰਲਾ ਨਾਂਮ',
  'common.last-updated': 'ਆਖਰੀ ਅਪਡੇਟ ਕੀਤਾ',
  'common.latest-attempt': 'ਨਵੀਨਤਮ ਕੋਸ਼ਿਸ਼',
  'common.launch-anonymous': 'ਅਗਿਆਤ ਚਲਾਓ',
  'common.launch-on-air': 'ਲਾਈਵ ਜਾਓ',
  'common.learning-objectives': 'ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼',
  'common.learning-target': 'ਮਾਈਕਰੋ-ਸਟੈਂਡਰਡ',
  'common.learning-target-mobile': 'ਮਿਆਰੀ ਵਿੱਚ ਮਾਈਕ੍ਰੋ ਸਟੈਂਡਰਡ',
  'common.lesson': 'ਪਾਠ',
  'common.lessonInitial': 'l',
  'common.lesson-title': 'ਪਾਠ ਦਾ ਸਿਰਲੇਖ',
  'common.lessonObj.zero': 'ਪਾਠ',
  'common.lessonObj.one': 'ਪਾਠ',
  'common.lessonObj.other': 'ਪਾਠ',
  'common.libraries': 'ਲਾਇਬ੍ਰੇਰੀਆਂ',
  'common.license': 'ਲਾਇਸੈਂਸ',
  'common.link': 'ਲਿੰਕ',
  'common.link-out': 'ਲਿੰਕ-ਆਉਟ',
  'common.link-out-message':
    '* ਜੇ ਤੁਹਾਡਾ ਸ੍ਰੋਤ ਉਪਰੋਕਤ ਪੂਰਵ-ਦਰਸ਼ਨ ਵਿੱਚ ਖਾਲੀ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ, ਤਾਂ ਸਮੱਗਰੀ ਨੂੰ ਵੇਖਣ ਲਈ ਇਸ ਨੂੰ ਕਿਸੇ ਦੂਜੇ ਪੇਜ ਤੇ "ਲਿੰਕ-ਆਉਟ" ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ',
  'common.live-assessments': 'ਜੀਵ ਮੁਲਾਂਕਣ',
  'common.loading': 'ਲੋਡ ਕਰ ਰਿਹਾ ਹੈ ...',
  'common.login': 'ਲਾਗਿਨ',
  'common.logout': 'ਲਾੱਗ ਆਊਟ, ਬਾਹਰ ਆਉਣਾ',
  'common.logout.head_1': 'Learning Navigator: ',
  'common.logout.head_2': 'Every Student',
  'common.logout.head_3': 'Achieves Mastery',
  'common.logout.description':
    'Learning Navigator is designed as “GPS for Learning” — a way for each student to follow their own path to mastery. Schools ask every student to achieve the same level of proficiency, but each student begins with a different set of knowledge and skills. The Learning Navigator meets each student exactly where they are and navigates them to their learning goals. ',
  'common.logout.logout-btn-msg1': 'You have been logout.',
  'common.logout.logout-btn-msg2': 'Click here to login.',
  'common.mastery': 'ਮਹਾਰਤ',
  'common.menu': 'ਮੇਨੂ',
  'common.more-details': 'ਹੋਰ ਜਾਣਕਾਰੀ',
  'common.move': 'ਮੂਵ ਕਰੋ',
  'common.myContent': 'ਮੇਰੀ ਸਮੱਗਰੀ',
  'common.myProfile': 'ਮੇਰੇ ਸਥਾਨ',
  'common.library': 'ਲਾਇਬਰੇਰੀ',
  'common.myPerformance': 'ਮੇਰੇ ਪ੍ਰਦਰਸ਼ਨ',
  'common.edit-narration': 'ਨ੍ਰਿਵੇਸ਼ਨ ਸੰਪਾਦਨ ਕਰੋ',
  'common.narration': 'ਬਿਆਨ',
  'common.new-assessment': 'ਨਵੇਂ ਮੁਲਾਂਕਣ',
  'common.new-collection': 'ਨਵਾਂ ਭੰਡਾਰ',
  'common.new-question': 'ਨਵਾਂ ਸਵਾਲ',
  'common.new-question-text': 'ਪ੍ਰਸ਼ਨ ਟੈਕਸਟ ਨੂੰ ਇੱਥੇ ਦਾਖਲ ਕਰੋ',
  'common.new-fib-question-text': '[answer] ਦੇ ਨਾਲ ਪ੍ਰਸ਼ਨ ਦਿਓ',
  'common.new-resource': 'ਨਵਾਂ ਸਰੋਤ',
  'common.next': 'ਅਗਲਾ',
  'common.no': 'ਨਹੀਂ',
  'common.no-archived': 'ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ ਆਰਕਾਈਵਡ ਕਲਾਸਰੂਮ ਨਹੀਂ ਹਨ',
  'common.no-content': 'ਕੋਈ ਵੀ ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
  'common.no-content-my-report':
    'ਹਾਲੇ ਤੱਕ ਕੋਈ ਰਿਪੋਰਟਾਂ ਉਪਲਬਧ ਨਹੀਂ ਹਨ ਇੱਕ ਵਾਰ ਅਧਿਐਨ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਤੁਹਾਡੀਆਂ ਰਿਪੋਰਟਾਂ ਉਪਲਬਧ ਹੋ ਜਾਣਗੀਆਂ',
  'common.no-assessments-to-display':
    'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਮੁਲਾਂਕਣ [2] ਨਹੀਂ.',
  'common.no-collections-to-display':
    'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਸੰਗ੍ਰਹਿ [2] ਨਹੀਂ.',
  'common.no-courses-to-display': 'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਕੋਰਸ ਨਹੀਂ [2]',
  'common.no-questions-to-display': 'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਪ੍ਰਸ਼ਨ ਨਹੀਂ [2].',
  'common.no-resources-to-display':
    'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਸੰਸਾਧਨਾਂ [2] ਨਹੀਂ.',
  'common.no-rubrics-to-display': 'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੋਈ [1] ਸ਼ਬਦ ਨਹੀਂ [2]',
  'common.no-followers': 'ਤੁਸੀਂ ਹਾਲੇ ਤੱਕ ਚੇਲੇ ਨਹੀਂ ਹਨ.',
  'common.no-independent-results':
    'ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਬੁੱਕਮਾਰਕ {{contenttype}} ਦੀ ਖੋਜ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਉਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ.',
  'common.no-results': 'ਕੋਈ ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ',
  'common.no-available-results': 'ਉਪਲਬਧ ਨਤੀਜੇ ਨਹੀਂ',
  'common.no-results-message':
    'ਆਪਣੇ ਸਪੈਲਿੰਗਾਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਸੀਂ ਸਭ ਗ਼ਲਤੀਆਂ ਕਰਦੇ ਹਾਂ! [1] ਵਧੋ ਅਤੇ ਕੁਝ ਫਿਲਟਰ ਹਟਾਓ. [2] ਜਾਂ ਇਸਦੀ ਬਜਾਏ ਇਸੇ ਸ਼ਬਦ ਦੀ ਖੋਜ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'common.no-more-attempts': 'ਕੋਈ ਹੋਰ ਕੋਸ਼ਿਸ਼ਾਂ ਨਹੀਂ',
  'common.no-dca-student':
    'ਤੁਹਾਡੇ ਅਧਿਆਪਕ ਨੇ ਅਜੇ ਤੱਕ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਕੋਈ ਸੰਗ੍ਰਹਿ ਜਾਂ ਮੁਲਾਂਕਣ ਨਹੀਂ ਦਿੱਤੇ ਹਨ.',
  'common.no-dca-teacher':
    'ਕੋਈ ਮੌਜੂਦਾ ਕੰਮ ਨਹੀਂ ਕੋਰਸ ਮੈਪ ਜਾਂ ਸਮਗਰੀ ਸੂਚੀ ਤੋਂ ਕਲਾਸ ਦੀਆਂ ਸਰਗਰਮੀਆਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰੋ.',
  'common.notScored': 'ਅਸੁਰੱਖਿਅਤ',
  'common.notStarted': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'common.not-added': 'ਜੋੜਿਆ ਨਹੀਂ ਗਿਆ',
  'common.not-applicable': 'n / a',
  'common.not-following': 'ਤੁਸੀਂ ਕਿਸੇ ਦਾ ਪਿੱਛਾ ਨਹੀਂ ਕਰ ਰਹੇ ਹੋ.',
  'common.not-provided': 'ਨਹੀਂ ਦਿੱਤਾ',
  'common.not-specified': 'ਨਹੀ ਦੱਸਇਆ',
  'common.not_started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'common.nothing-to-display': 'ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਕੁਝ ਨਹੀਂ',
  'common.number': 'ਨਹੀਂ',
  'common.numberStudents.zero': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'common.numberStudents.one': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'common.numberStudents.other': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'common.of': 'ਦੇ',
  'common.off': 'ਬੰਦ',
  'common.on': 'ਤੇ',
  'common.other': 'ਹੋਰ',
  'common.overall-performance': 'ਕੁੱਲ ਪ੍ਰਦਰਸ਼ਨ',
  'common.educational-use': 'Educational use',
  'common.resource-types': 'Resource types',
  'common.publishers': 'publishers',
  'common.password': 'ਪਾਸਵਰਡ',
  'common.pending': 'ਬਕਾਇਆ',
  'common.performance': 'ਪ੍ਰਦਰਸ਼ਨ ਦਿਖਾਓ',
  'common.performance-dashboard': 'ਪ੍ਰਦਰਸ਼ਨ ਡੈਸ਼ਬੋਰਡ',
  'common.personal-information': 'ਵਿਅਕਤੀਗਤ ਜਾਣਕਾਰੀ',
  'common.play': 'ਖੇਡਣਾ',
  'common.please_contact': 'ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਕਰੋ',
  'common.post-message': 'ਪੋਸਟ ਸੁਨੇਹਾ',
  'common.preview': 'ਪੂਰਵਦਰਸ਼ਨ',
  'common.profile': 'ਪ੍ਰੋਫਾਈਲ',
  'common.profile-publishing': 'ਪ੍ਰੋਫਾਈਲ ਦੀ ਦ੍ਰਿਸ਼ਟਤਾ',
  'common.publish-to':
    ' ਇਸਨੂੰ ਮੇਰੀ ਪ੍ਰੋਫਾਇਲ ਲਾਇਬ੍ਰੇਰੀ ਵਿੱਚ ਦੂਜਿਆਂ ਲਈ ਦ੍ਰਿਸ਼ਮਾਨ ਬਣਾਉ',
  'common.published-by': 'ਦੁਆਰਾ ਪ੍ਰਕਾਸ਼ਿਤ',
  'common.published-tooltip': 'ਬੈਡ ਸਮਗਰੀ',
  'common.publisher': 'ਪ੍ਰਕਾਸ਼ਕ',
  'common.prev': 'ਪਿਛਲਾ',
  'common.progress': 'Progress',
  'common.question': 'ਸਵਾਲ',
  'common.questions': 'ਸਵਾਲ',
  'common.questions-OE': 'ਮੁਫ਼ਤ ਜਵਾਬ ਪ੍ਰਸ਼ਨ',
  'common.question-pl.zero': 'ਸਵਾਲ',
  'common.question-pl.one': 'ਸਵਾਲ',
  'common.question-pl.other': 'ਸਵਾਲ',
  'common.question-title': 'ਸਵਾਲ ਦਾ ਸਿਰਲੇਖ',
  'common.question-type.SA': 'ਇਕ ਜਵਾਬ',
  'common.question-type.MC': 'ਬਹੁ - ਚੋਣ',
  'common.question-type.FIB': 'ਖਾਲੀ ਥਾਂ ਭਰੋ',
  'common.question-type.T/F': 'ਸਹੀ ਜਾਂ ਝੂਠ',
  'common.question-type.T_F': 'ਸਹੀ ਜਾਂ ਝੂਠ',
  'common.question-type.MA': 'ਬਹੁਤੇ ਜਵਾਬ',
  'common.question-type.OE': 'ਮੁਫ਼ਤ ਜਵਾਬ',
  'common.question-type.HS_TXT': 'ਮਲਟੀਪਲ ਚੋਣ - ਪਾਠ',
  'common.question-type.HS_IMG': 'ਮਲਟੀਪਲ ਚੋਣ - ਚਿੱਤਰ',
  'common.question-type.HT_TO': 'ਡ੍ਰੈਗ ਅਤੇ ਡਰਾਪ ਕ੍ਰਮ',
  'common.question-type.HT_RO': 'ਡ੍ਰੈਗ ਅਤੇ ਡਰਾਪ ਕ੍ਰਮ',
  'common.question-type.HT_HL': 'ਹਾਈਲਾਈਟ ਟੈਕਸਟ',
  'common.reaction': 'ਪ੍ਰਤੀਕਰਮ',
  'common.read-first': '[1] ਇਸ ਨੂੰ ਪਹਿਲੀ ਵਾਰ ਪੜ੍ਹੋ! [2]',
  'common.remaining': '{{number}} ਖੱਬੇ',
  'common.remix': 'ਰਿਮਿਕਸ',
  'common.remix-assessment': 'ਰਿਮਿਕਸ ਨਿਰਧਾਰਨ',
  'common.remix-assessment-lead': 'ਤੁਸੀਂ ਇੱਕ ਮੁਲਾਂਕਣ ਰੀਮਿਕਸ ਕਰਨ ਜਾ ਰਹੇ ਹੋ',
  'common.remix-assessment-success':
    'ਤੁਸੀਂ ਇੱਕ ਮੁਲਾਂਕਣ {{assessmenttitle}} ਵਿੱਚ ਰੀਮਿਕਸ ਕਰ ਚੁੱਕੇ ਹੋ. ਕੀ ਤੁਸੀਂ ਉਸ ਮੁਲਾਂਕਣ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.remix-collection': 'ਰਿਮਿਕਸ ਭੰਡਾਰ',
  'common.remix-collection-lead': 'ਤੁਸੀਂ ਇੱਕ ਕੁਲੈਕਸ਼ਨ ਰੀਮਿਕਸ ਕਰ ਰਹੇ ਹੋ',
  'common.remix-collection-success':
    'ਤੁਸੀਂ ਇੱਕ ਕਲੈਕਸ਼ਨ {{collectiontitle}} ਨੂੰ ਰੀਮਿਕਸ ਕਰ ਚੁੱਕੇ ਹੋ. ਕੀ ਤੁਸੀਂ ਉਸ ਭੰਡਾਰ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.remix-course': 'ਰਿਮਿਕਸ ਕੋਰਸ',
  'common.remix-course-lead': 'ਤੁਸੀਂ ਇੱਕ ਕੋਰਸ ਰੀਮਿਕ ਕਰ ਰਹੇ ਹੋ.',
  'common.remix-course-success':
    'ਤੁਸੀਂ ਇੱਕ ਕੋਰਸ ਨੂੰ ਮੁੜ ਤਿਆਰ ਕੀਤਾ ਹੈ {{coursetitle}} ਕੀ ਤੁਸੀਂ ਉਸ ਕੋਰਸ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.remix-lesson': 'ਰੀਮਿਕਸ ਸਬਕ',
  'common.remix-lesson-lead': 'ਤੁਸੀਂ ਸਬਕ ਰੀਮਿਕਸ ਕਰ ਰਹੇ ਹੋ',
  'common.remix-lesson-success':
    'ਤੁਸੀਂ ਇੱਕ ਸਬਕ ਰੀਮਿਕਸ ਕਰ ਚੁੱਕੇ ਹੋ. {{ਘੱਟ ਅਸਾਨੀ ਨਾਲ}}',
  'common.remix-question': 'ਰਿਮਿਕਸ ਪ੍ਰਸ਼ਨ',
  'common.remix-question-lead': 'ਤੁਸੀਂ ਇੱਕ ਸਵਾਲ ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰਨ ਜਾ ਰਹੇ ਹੋ',
  'common.remix-question-success':
    'ਤੁਸੀਂ ਇੱਕ ਸਵਾਲ ਪੁਆਇੰਟ ਕੀਤਾ ਹੈ {{ਸਵਾਲਨਾਮਾ}}. ਕੀ ਤੁਸੀਂ ਉਸ ਪ੍ਰਸ਼ਨ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.remix-resource': 'ਰਿਮਿਕਸ ਸਰੋਤ',
  'common.remix-resource-lead': 'ਤੁਸੀਂ ਇੱਕ ਸਰੋਤ ਰੀਮਿਕਸ ਕਰਨ ਜਾ ਰਹੇ ਹੋ',
  'common.remix-resource-success':
    'ਤੁਸੀਂ ਇੱਕ ਸ੍ਰੋਤ ਨੂੰ ਮੁੜ ਤਿਆਰ ਕੀਤਾ ਹੈ {{resourcetitle}} ਕੀ ਤੁਸੀਂ ਉਸ ਸਰੋਤ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'common.remix-unit': 'ਰਿਮਿਕਸ ਯੂਨਿਟ',
  'common.remix-unit-lead': 'ਤੁਸੀਂ ਇੱਕ ਯੂਨਿਟ ਰੀਮਿਕਸ ਕਰਨ ਜਾ ਰਹੇ ਹੋ',
  'common.remix-unit-success':
    'ਤੁਸੀਂ ਇੱਕ ਯੂਨਿਟ ਨੂੰ ਮੁੜ ਤਿਆਰ ਕੀਤਾ ਹੈ {{unittitle}}.',
  'common.remixed-by': 'ਕੇ ਰੀਮਿਕਸ',
  'common.remix-warning':
    'ਸਿਰ! ਇਸ ਕੋਰਸ ਵਿਚ ਬਹੁਤ ਸਾਰੀਆਂ ਵਧੀਆ ਸਮੱਗਰੀ ਅਤੇ ਇਕ ਕਾਪੀ ਬਣਾਉਣ ਨਾਲ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ. ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ ਪ੍ਰਕਿਰਿਆ ਸ਼ੁਰੂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਅਤੇ 15 ਮਿੰਟਾਂ ਵਿੱਚ ਤੁਸੀਂ ਆਪਣੇ [1] ਪ੍ਰੋਫਾਈਲ ਤੇ ਇਸ ਕੋਰਸ ਦੀ ਕਾਪੀ ਦੇਖੋਗੇ. [2]',
  'common.remove': 'ਹਟਾਓ',
  'common.report': 'ਰਿਪੋਰਟ',
  'common.report-in-progress': 'ਰਿਪੋਰਟ ਪ੍ਰਗਤੀ ਵਿੱਚ ਹੈ',
  'common.request-to': 'ਬੈਜ ਲਈ ਸਮੀਖਿਆ ਕਰਨ ਦੀ ਬੇਨਤੀ',
  'common.request-report': 'ਬੇਨਤੀ ਦੀ ਰਿਪੋਰਟ',
  'common.resource': 'ਸਰੋਤ',
  'common.resources': 'ਸਰੋਤ',
  'common.resource-format.image': 'ਚਿੱਤਰ',
  'common.resource-format.text': 'ਪਾਠ',
  'common.resource-format.video': 'ਵੀਡੀਓ',
  'common.resource-format.interactive': 'ਪਰਸਪਰ',
  'common.resource-format.webpage': 'ਵੇਬ ਪੇਜ',
  'common.resource-format.audio': 'ਔਡੀਓ',
  'common.resource-format.question': 'ਸਵਾਲ',
  'common.resource-pl.zero': 'ਸਰੋਤ',
  'common.resource-pl.one': 'ਸਰੋਤ',
  'common.resource-pl.other': 'ਸਰੋਤ',
  'common.resource-title': 'ਸਰੋਤ ਸਿਰਲੇਖ',
  'common.resource-url': 'ਸਰੋਤ url',
  'common.role': 'ਭੂਮਿਕਾ',
  'common.rubric': 'ਚਿੰਨ੍ਹ',
  'common.rubric-creation': 'ਰਬ੍ਰਿਕ ਨਿਰਮਾਣ',
  'common.rubrics': 'ਕਤਲੇਆਮ',
  'common.rubric-title': 'ਚਿੰਨ੍ਹ ਦਾ ਸਿਰਲੇਖ',
  'common.save': 'ਬਚਾਓ',
  'common.de-select': 'ਚੋਣ ਕਰਨ ਲਈ',
  'common.select-all': 'ਸਾਰਿਆ ਨੂੰ ਚੁਣੋ',
  'common.none': 'ਕੋਈ ਨਹੀਂ',
  'common.add-data': 'ਡਾਟਾ ਜੋੜੋ',
  'common.update-data': 'ਡਾਟਾ ਅਪਡੇਟ ਕਰੋ',
  'common.all': 'ਸਭ',
  'common.please-wait': 'Please Wait',
  'common.unscheduled-items': 'ਅਣਡਿੱਠੀਆਂ ਚੀਜ਼ਾਂ',
  'common.scheduled-items': 'Scheduled Items',
  'common.add-to-unschedule': 'ਲਈ ਸੂਚੀਬੱਧ ਸੂਚੀ ਵਿੱਚ ਸ਼ਾਮਿਲ',
  'common.save-next': 'ਬਚਾਓ ਅਤੇ ਅਗਲਾ',
  'common.save-submit': 'ਬਚਾਓ ਅਤੇ ਸਭ ਨੂੰ ਜਮ੍ਹਾਂ ਕਰੋ',
  'common.save-finish': 'ਬਚਾਓ ਅਤੇ ਮੁਕੰਮਲ',
  'common.school': 'ਸਕੂਲ',
  'common.school-info': 'ਸਕੂਲ ਦੀ ਜਾਣਕਾਰੀ',
  'common.score': 'ਸਕੋਰ',
  'common.select': 'ਚੁਣੋ',
  'common.select-a-framework':
    'ਕਿਰਪਾ ਕਰਕੇ ਉੱਪਰ ਦਿੱਤੇ ਕੋਰਸ ਜਾਣਕਾਰੀ ਭਾਗ ਵਿੱਚ ਇੱਕ ਮਿਆਰ ਦੇ ਫਰੇਮਵਰਕ ਦੀ ਚੋਣ ਕਰੋ.',
  'common.sentence': 'ਸਜ਼ਾ',
  'common.settings': 'ਸੈਟਿੰਗਾਂ',
  'common.search': 'ਖੋਜ',
  'common.search-placeholder': 'ਖੋਜ',
  'common.search-placeholder-text': 'ਖੋਜ ...',
  'common.search-error-message': 'ਖੋਜ ਸ਼ਬਦਾਂ ਲਈ ਘੱਟੋ ਘੱਟ 3 ਅੱਖਰ ਹੋਣ ਦੀ ਲੋੜ ਹੈ',
  'common.search-400-error-message': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਖੋਜ ਸ਼ਬਦ ਦਾਖਲ ਕਰੋ',
  'common.search-competency': 'ਖੋਜ ਦੀ ਸਮਰੱਥਾ',
  'common.search-standards': 'ਖੋਜ ਮਿਆਰਾਂ',
  'common.select-question-type': 'ਸਵਾਲ ਕਿਸਮ ਚੁਣੋ',
  'common.select-resource-type': 'ਸਰੋਤ ਕਿਸਮ ਚੁਣੋ',
  'common.send-request': 'ਬੇਨਤੀ ਭੇਜੀ',
  'common.share': 'ਸ਼ੇਅਰ ਕਰੋ',
  'common.show-correct-answer': 'ਸਹੀ ਉੱਤਰ ਦਿਖਾਓ',
  'common.show-more-results': 'ਹੋਰ ਨਤੀਜੇ ਦਿਖਾਓ',
  'common.show-results': 'ਨਤੀਜੇ ਦਿਖਾਓ',
  'common.signUp': 'ਸਾਇਨ ਅਪ',
  'common.sortAlphabetical': 'ਕ੍ਰਮਬੱਧ',
  'common.sortAverage': 'ਔਸਤ ਦੁਆਰਾ ਕ੍ਰਮਬੱਧ',
  'common.sort-most-recently': 'ਸਭ ਤੋਂ ਹਾਲ ਹੀ ਅਪਡੇਟ ਕੀਤੇ ਅਨੁਸਾਰ ਕ੍ਰਮਬੱਧ',
  'common.state': 'ਰਾਜ ਜਾਂ ਖੇਤਰ',
  'common.state-territory': 'ਰਾਜ / ਖੇਤਰ',
  'common.standard': 'ਮਿਆਰੀ',
  'common.standards': 'ਮਿਆਰ',
  'common.study': 'ਅਧਿਐਨ',
  'common.study-now': 'ਹੁਣ ਪੜ੍ਹਾਈ',
  'common.student': 'ਵਿਦਿਆਰਥੀ',
  'common.students': 'ਵਿਦਿਆਰਥੀ',
  'common.student-id': 'ਵਿਦਿਆਰਥੀ ਆਈਡੀ (ਪਰੋਫਾਇਲ ਤੇ ਨਹੀਂ ਦਿਖਾਇਆ ਗਿਆ)',
  'common.studen-id-display':
    'ਵਿਦਿਆਰਥੀ ਆਈਡੀ (ਪਰੋਫਾਈਲ ਤੇ ਨਹੀਂ ਦਿਖਾਇਆ ਗਿਆ, ਅਗਿਆਤ ਮੋਡ ਵਿੱਚ ਦਿਖਾਇਆ ਗਿਆ)',
  'common.subject-and-framework': 'ਵਿਸ਼ੇ ਅਤੇ ਫਰੇਮਵਰਕ',
  'common.subject': 'ਵਿਸ਼ਾ',
  'common.submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
  'common.submit-all': 'ਸਭ ਨੂੰ ਸਬਮਿਟ ਕਰੋ',
  'common.submitAll': 'ਸਭ ਨੂੰ ਸਬਮਿਟ ਕਰੋ',
  'common.submit-finish': 'ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਖਤਮ ਕਰੋ',
  'common.swap': 'ਦੁਬਾਰਾ ਕ੍ਰਮ',
  'common.suggestion': 'ਸੁਝਾਅ',
  'common.suggestions': 'ਸੁਝਾਅ',
  'common.suggested-resources': 'ਸੁਝਾਏ ਸਰੋਤ',
  'common.support': 'ਸਹਿਯੋਗ',
  'common.start-tour': 'ਇੱਕ ਟੂਰ ਲਓ',
  'common.take-me-there': 'ਮੈਨੂੰ ਉੱਥੇ ਲੈ ਜਾਓ',
  'common.teach': 'ਸਿਖਾਓ',
  'common.teacher': 'ਅਧਿਆਪਕ',
  'common.timeSpent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'common.toggle-dropdown': 'ਟੌਪਲ ਡ੍ਰੌਪਡਾਉਨ',
  'common.tools': 'ਟੂਲਸ',
  'common.true': 'ਸਹੀ',
  'common.type': 'ਟਾਈਪ ਕਰੋ',
  'common.title': 'ਟਾਈਟਲ',
  'common.unBookmark': 'ਬੁੱਕ ਬੁੱਕ',
  'common.unexpectedError':
    'ਇੱਕ ਅਚਾਨਕ ਤਰੁੱਟੀ ਉਤਪੰਨ ਹੋਈ ਹੈ ਅਤੇ ਰਿਪੋਰਟ ਕੀਤੀ ਗਈ ਹੈ. ਅਸੁਵਿਧਾ ਲਈ ਅਸੀਂ ਮੁਆਫੀ ਮੰਗਦੇ ਹਾਂ!',
  'common.networkError':
    'Network disconnected. This may be a temporary issue. Retry later or check your internet connection.',
  'common.unfollow': 'ਅਨਲੌਕ ਕਰੋ',
  'common.unit': 'ਇਕਾਈ',
  'common.unit-title': 'ਇਕਾਈ ਦਾ ਸਿਰਲੇਖ',
  'common.unitInitial': 'u',
  'common.unitObj.zero': 'ਇਕਾਈਆਂ',
  'common.unitObj.one': 'ਇਕਾਈ',
  'common.unitObj.other': 'ਇਕਾਈਆਂ',
  'common.untitled-course': 'ਕੋਰਸ 1',
  'common.untitled-lesson': 'ਬਿਨਾਂ ਸਿਰਲੇਖ ਪਾਠ',
  'common.untitled-unit': 'ਨਿਰਦੋਸ਼ ਇਕਾਈ',
  'common.update-thumbnail': 'ਥੰਮਨੇਲ ਨੂੰ ਅਪਡੇਟ ਕਰੋ',
  'common.update-photo': 'ਫੋਟੋ ਅਪਡੇਟ ਕਰੋ',
  'common.upload': 'ਅਪਲੋਡ ਕਰੋ',
  'common.upload-file': 'ਅਪਲੋਡ ਫਾਇਲ',
  'common.upload-thumbnail': 'ਥੰਮਨੇਲ ਅਪਲੋਡ ਕਰੋ',
  'common.upload-photo': 'ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
  'common.until': 'Until',
  'common.remove-photo': 'ਫੋਟੋ ਹਟਾਓ',
  'common.use-case': 'ਕੇਸ ਵਰਤੋ',
  'common.valid-extensions': 'ਵੈਧ ਫਾਇਲ ਐਕਸਟੈਨਸ਼ਨ ਇਹ ਹਨ: {{extensions}}',
  'common.verified': 'ਤਸਦੀਕ',
  'common.visibility-tooltip': 'ਦੂਜਿਆਂ ਲਈ ਦ੍ਰਿਸ਼ਮਾਨ ਨਹੀਂ',
  'common.visibility-available': 'ਦੂਜਿਆਂ ਲਈ ਦ੍ਰਿਸ਼ਮਾਨ',
  'common.warnings.on-air-connection-lost':
    'ਜਾਓ ਲਾਈਵ ਡੈਸ਼ਬੋਰਡ ਨਾਲ ਕੁਨੈਕਸ਼ਨ ਖਤਮ ਹੋ ਗਿਆ ਹੈ ਅਤੇ ਆਟੋਮੈਟਿਕਲੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰ ਰਿਹਾ ਹੈ. ਇਹ ਪ੍ਰੇਸ਼ਾਨ ਕਰਨ ਵਾਲਾ ਹੈ, ਪਰ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਸਕਰੀਨ ਨੂੰ ਤਾਜ਼ਾ ਨਾ ਕਰੋ!',
  'common.warnings.character-limit': 'ਤੁਸੀਂ ਅੱਖਰ ਦੀ ਸੀਮਾ ਤੇ ਪਹੁੰਚ ਗਏ ਹੋ',
  'common.word': 'ਸ਼ਬਦ',
  'common.yes': 'ਹਾਂ',
  'common.change-score': 'ਸਕੋਰ ਬਦਲੋ',
  'not-found.tenant.login-not-found-msg-1':
    'ਗੋਰੁਰ ਕਿਰਾਏਦਾਰ ਲੌਗਇਨ ਨਹੀਂ ਮਿਲਿਆ, ਤਾਂ ਪੰਨੇ ਨੂੰ ਆਟੋਮੈਟਿਕ ਹੀ ਰੀਡਾਇਰੈਕਟ ਕੀਤਾ ਜਾਵੇਗਾ',
  'not-found.tenant.login-not-found-msg-2': 'ਲਾਗਇਨ ਸਫ਼ਾ',
  'not-found.tenant.login-not-found-msg-3':
    'ਸਕਿੰਟ ਜਾਂ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ ਦੇ ਤੌਰ ਤੇ ਲਾਗਇਨ ਕਰਨ ਲਈ',
  'index.joinUs':
    'ਸਾਡੇ ਨਾਲ [1] ਨਾਲ ਜੁੜੋ [2] ਸਿੱਖਿਆ ਦੇ ਮਨੁੱਖੀ ਅਧਿਕਾਰ ਦੀ ਕਦਰ ਕਰੋ',
  'index.browseContent.title': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕੀ ਲੱਭ ਰਹੇ ਹੋ?',
  'index.browseContent.description_1': 'ਮੈਂ ਲੱਭ ਰਿਹਾ ਹਾਂ',
  'index.browseContent.description_2': 'ਵਿੱਚ ਸਿੱਖਣ ਦੀ ਸਮੱਗਰੀ',
  'index.browseContent.description_3': 'ਜਾਂ',
  'index.browseContent.button': 'ਸਮੱਗਰੀ ਦੀ ਝਲਕ',
  'index.browseContent.footer.description_1': 'ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?',
  'index.browseContent.footer.description_2': ' ਇਥੇ.',
  'index.browseContent.footer.login': 'ਲਾਗਿਨ',
  'index.browseContent.grades_missing_message':
    'ਕਿਰਪਾ ਕਰਕੇ ਗ੍ਰੇਡ ਅਤੇ ਵਿਸ਼ਾ ਚੁਣੋ',
  'index.browseContent.subjects_missing_message': 'ਕਿਰਪਾ ਕਰਕੇ ਵਿਸ਼ਾ ਚੁਣੋ.',
  'index.gettingStarted.title': 'ਗੋਰੂ ਨਾਲ ਸ਼ੁਰੂਆਤ',
  'index.gettingStarted.toolkit.title': 'ਟੂਲਕਿੱਟ ਸ਼ੁਰੂ ਕਰਨਾ',
  'index.gettingStarted.toolkit.description':
    'ਗੋਰੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਇਹ ਜਾਣਨ ਲਈ ਇਹ ਸੰਸਾਧਨਾਂ ਦੀ ਜਾਂਚ ਕਰੋ ਕਿ ਤੁਸੀਂ ਗੂਰੂ ਨਾਲ ਕੀ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਛੇਤੀ ਤੋਂ ਛੇਤੀ ਅਰੰਭ ਕਰੋ.',
  'index.gettingStarted.classroom.title': 'ਕਲਾਸਰੂਮ ਤੋਂ ਕਹਾਣੀਆਂ',
  'index.gettingStarted.classroom.description':
    'ਉਹਨਾਂ ਅਧਿਆਪਕਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ ਦੇ ਮਾਧਿਅਮ ਤੋਂ ਉਦਾਹਰਨ ਦੇ ਰੂਪ ਵਿੱਚ ਸਿੱਖੋ ਜੋ ਕਹਿੰਦੇ ਹਨ ਕਿ ਗੋੂਰੂ ਨੇ ਉਨ੍ਹਾਂ ਦੀ ਕਲਾਸਰੂਮ ਵਿੱਚ ਫਰਕ ਲਿਆ ਹੈ',
  'index.gettingStarted.events.title': 'ਸਾਡੇ ਇਵੈਂਟਸ ਵੇਖੋ!',
  'index.gettingStarted.events.description':
    'ਅਸੀਂ ਗੋਰੂ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰਨ ਲਈ ਮੁਫ਼ਤ ਵੈਬਿਨਾਰ ਅਤੇ ਸਿਖਲਾਈ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦੇ ਹਾਂ',
  'index.empowerStudents.title':
    'ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਉਹਨਾਂ ਦੇ ਤਰੀਕੇ ਜਾਣਨ ਲਈ ਸ਼ਕਤੀ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ',
  'index.empowerStudents.find': 'ਲੱਭੋ',
  'index.empowerStudents.remix': 'ਰਿਮਿਕਸ',
  'index.empowerStudents.share': 'ਸ਼ੇਅਰ ਕਰੋ',
  'index.empowerStudents.monitor': 'ਮਾਨੀਟਰ',
  'index.findDescription':
    'ਅਧਿਆਪਕਾਂ ਦੁਆਰਾ ਬਣਾਏ ਗਏ ਹਜ਼ਾਰਾਂ K-12 ਸੰਗ੍ਰਿਹਾਂ ਨੂੰ ਬ੍ਰਾਉਜ਼ ਕਰੋ ਜਾਂ 16 ਮਿਲੀਅਨ ਤੋਂ ਵੱਧ ਸਰੋਤਾਂ ਦੀ ਭਾਲ ਕਰੋ',
  'index.remixDescription':
    'ਰੀਮਿਕਸ ਸੰਗ੍ਰਿਹ ਅਤੇ ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਦੀਆਂ ਲੋੜਾਂ ਪੂਰੀਆਂ ਕਰਨ ਲਈ ਸਮੱਗਰੀ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ.',
  'index.shareDescription':
    'ਗੌਰੂ ਕਲਾਸਰੂਮ ਵਿਚ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਾਲ ਸੰਗ੍ਰਹਿ ਸਾਂਝੇ ਕਰੋ ਐਕਸੈਸ ਕਰਨ ਲਈ ਲੌਗਿਨ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ.',
  'index.monitorDescription':
    'ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਰਾਇ-ਸਮੇਂ ਵਿਚ ਦਖ਼ਲਅੰਦਾਜ਼ੀ ਕਰਨ ਦੀ ਸੰਭਾਵਨਾ ਨੂੰ ਮਾਪੋ.',
  'index.freeAndOpen.title': 'ਮੁਫ਼ਤ ਅਤੇ ਖੁੱਲ੍ਹਾ. [1] ਹਮੇਸ਼ਾ',
  'index.freeAndOpen.description':
    'ਸਾਡਾ ਵਿਸ਼ਵਾਸ ਹੈ ਕਿ ਸਿੱਖਿਆ ਮਨੁੱਖੀ ਹੱਕ ਹੈ. ਦੁਨੀਆ ਭਰ ਦੇ ਸਿੱਖਿਅਕਾਂ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਗੋੂਰੂ ਹਮੇਸ਼ਾ ਮੁਫ਼ਤ ਅਤੇ ਵਿਗਿਆਪਨ ਦੇ ਮੁਫਤ ਹੋਣਗੇ',
  'index.freeAndOpen.button': 'ਸਾਡੇ ਪਹੁੰਚ ਬਾਰੇ ਹੋਰ ਜਾਣੋ',
  'class.info.class-info': 'ਕਲਾਸਰੂਮ ਜਾਣਕਾਰੀ',
  'class.info.teachers': 'ਅਧਿਆਪਕ',
  'class.info.students': 'ਵਿਦਿਆਰਥੀ',
  'class.info.subject': 'ਵਿਸ਼ਾ',
  'class.info.grade': 'ਗ੍ਰੇਡ',
  'class.info.description': 'ਵਰਣਨ',
  'class.info.edit-info': 'ਜਾਣਕਾਰੀ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰੋ',
  'class.info.share-class': 'ਸ਼ੇਅਰ ਕਲਾਸਰੂਮ',
  'class.info.invite-co-teachers': 'ਸਹਿ-ਅਧਿਆਪਕਾਂ ਨੂੰ ਸੱਦਾ ਦਿਓ',
  'class.info.add-students': 'ਵਿਦਿਆਰਥੀ ਸ਼ਾਮਿਲ',
  'class.info.class-code': 'ਕਲਾਸਰੂਮ ਕੋਡ',
  'class.info.delete': 'ਕਲਾਸਰੂਮ ਮਿਟਾਓ',
  'class.edit.assigned-course': 'ਨਿਰਧਾਰਤ ਕੋਰਸ',
  'class.edit.basic-info': 'ਬੁਨਿਆਦੀ ਜਾਣਕਾਰੀ',
  'class.edit.class-name': 'ਕਲਾਸਰੂਮ ਦਾ ਨਾਂ',
  'class.edit.class-greetings': 'ਕਲਾਸਰੂਮ ਦੀਆਂ ਘੋਸ਼ਣਾਵਾਂ',
  'class.edit.class-greetings-placeholder':
    'ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਨਮਸਤੇ ਕਰੋ, ਉਹਨਾਂ ਨੂੰ ਪ੍ਰੇਰਿਤ ਕਰੋ, ਜਾਂ ਘੋਸ਼ਣਾ ਕਰੋ, ਆਦਿ.',
  'class.edit.class-minscore': 'ਟ੍ਰਾਫੀਆਂ ਲਈ ਮੁਲਾਂਕਣ ਘੱਟੋ ਘੱਟ ਸਕੋਰ (1-100%)',
  'class.edit.course-map': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'class.edit.edit-class': 'ਕਲਾਸਰੂਮ ਸੈਟਿੰਗਾਂ ਸੰਪਾਦਿਤ ਕਰੋ',
  'class.overview.title': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'class.overview.locate': 'ਮੈਨੂੰ ਲੱਭੋ',
  'class.overview.edit-content': 'ਸਮੱਗਰੀ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰੋ',
  'class.overview.add-to-daily-class-activities':
    'ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
  'class.overview.assigned-course': 'ਤੁਹਾਡੇ ਨਿਰਧਾਰਤ ਕੋਰਸ',
  'class.overview.pre-study-title': 'ਤੁਹਾਡੇ ਕੋਰਸ ਲਈ ਪ੍ਰੀ-ਸਟੱਡੀ',
  'class.overview.course-map.rescope-toggle': 'ਪੂਰਾ ਕੋਰਸ ਦਿਖਾਓ',
  'class.overview.course-map.rescope-info':
    'ਇਹ ਨੇਵੀਗੇਟਰ ਕੋਰਸ ਇੱਕ ਬਹੁਗਿਣਤੀ ਗ੍ਰੇਡਾਂ ਵਿੱਚ ਇੱਕ ਵਿਅਕਤੀਗਤ ਕੋਰਸ ਨੂੰ ਕਵਰ ਕਰਨ ਵਾਲੇ ਮਿਆਰ ਹਨ. ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਨੂੰ ਭਰਵਾਂ ਭਰਨ, ਧਾਰਨਾਵਾਂ ਅਤੇ ਪ੍ਰਥਾਵਾਂ ਨੂੰ ਮਜ਼ਬੂਤੀ ਦੇਣ, ਅਤੇ ਆਪਣੇ ਸਿੱਖਣ ਵਿੱਚ ਵਾਧਾ ਕਰਨ ਲਈ ਇੱਕ ਵਿਲੱਖਣ ਕੋਰਸ ਦਿੱਤਾ ਗਿਆ ਹੈ. ਵਿਅਕਤੀਗਤ ਰੂਟਾਂ ਤਿਆਰ ਕੀਤੀਆਂ ਗਈਆਂ ਹਨ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਰੀਅਲ-ਰੂਟ ਵਿੱਚ ਹਰ ਵਿਦਿਆਰਥੀ ਦੀ ਸਿੱਖਣ ਦੀ ਸਮਰੱਥਾ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਕਰਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਿਰਧਾਰਤ ਮੰਜ਼ਿਲ ਤੇ ਨੈਵੀਗੇਟ ਕਰਨ ਲਈ ਰੀ-ਰੂਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ.',
  'class.overview.course-map.custom-msg':
    'ਅਸੀਂ ਤੁਹਾਡੀ ਮੁਹਾਰਤ ਦੇ ਅਧਾਰ ਤੇ ਤੁਹਾਡੇ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ ਤੇ ਇਸ ਕੋਰਸ ਨੂੰ ਨਿਜੀ ਬਣਾ ਰਹੇ ਹਾਂ ਕਿਰਪਾ ਕਰਕੇ ਵਿਅਕਤੀਗਤ ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ ਦੇਖਣ ਲਈ ਥੋੜ੍ਹੀ ਦੇਰ ਬਾਅਦ ਵਾਪਸ ਜਾਂਚ ਕਰੋ.',
  'class.overview.course-map.route0-bannerdesc':
    'ਤੁਹਾਡੀ ਸਮਰੱਥਾ ਪ੍ਰੋਫਾਈਲ ਦੇ ਅਨੁਸਾਰ, ਕੁਝ ਕੁ ਕਾਬਿਲਿਟੀ ਹਨ ਜਿਨ੍ਹਾਂ ਦੀ ਤੁਹਾਨੂੰ ਮਾਸਟਰ ਬਣਾਉਣ ਦੀ ਲੋੜ ਹੈ ਤਾਂ ਜੋ ਤੁਸੀਂ ਇਸ ਕੋਰਸ ਵਿੱਚ ਵਧੀਆ ਕਰ ਸਕੋ. ਸਾਡੇ ਕੋਲ ਇਕ ਅਜਿਹਾ ਰੂਟ ਹੈ ਜਿਸ ਦੀ ਅਸੀਂ ਸਿਫਾਰਿਸ਼ ਕਰਦੇ ਹਾਂ ਕਿ ਤੁਸੀਂ ਇਹਨਾਂ ਯੋਗਤਾਵਾਂ ਦਾ ਮੁਖੀ ਲਾਓ. ਵੇਰਵੇ ਦੇਖਣ ਲਈ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ.',
  'class.analytics.performance.title': 'ਪ੍ਰਦਰਸ਼ਨ ਵੇਖੋ',
  'class.analytics.performance.better-experience-message':
    'ਬਿਹਤਰ ਗੋਰੂ ਤਜਰਬਾ ਲਈ, ਗੋਲੀ ਜਾਂ ਡੈਸਕਟੌਪ ਵਿਚ ਪੂਰੀ ਕਲਾਸਰੂਮ ਐਨੀਮੇਟ ਦੇਖੋ.',
  'class.analytics.performance.no-content':
    'ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀਆਂ ਨੇ ਇੱਕ ਕੋਰਸ ਦਾ ਅਧਿਐਨ ਕਰਨਾ ਅਜੇ ਸ਼ੁਰੂ ਨਹੀਂ ਕੀਤਾ ਹੈ.',
  'class.analytics.performance.actions.share': 'ਸ਼ੇਅਰ ਕਰੋ',
  'class.analytics.performance.actions.edit': 'ਸਮੱਗਰੀ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰੋ',
  'class.analytics.performance.actions.download': 'ਡਾਉਨਲੋਡ ਕਰੋ',
  'class.analytics.performance.actions.fullScreen': 'ਪੂਰੀ ਸਕ੍ਰੀਨ ਦੇਖੋ',
  'class.analytics.performance.actions.exitFullScreen':
    'ਪੂਰੀ ਸਕ੍ਰੀਨ ਤੋਂ ਬਾਹਰ ਆਓ',
  'class.analytics.performance.actions.assessment': 'ਦਰਿਸ਼ ਮੁਲਾਂਕਣ',
  'class.analytics.performance.actions.collection': 'ਕਲੈਕਸ਼ਨ ਵੇਖੋ',
  'class.analytics.performance.actions.both': 'ਦੋਵੇਂ ਹੀ ਦੇਖੋ',
  'class.analytics.performance.teacher.metricsTable.average': 'ਔਸਤ',
  'class.analytics.performance.teacher.metricsTable.class-average': 'ਕਲਾਸ ਔਸਤ',
  'class.analytics.performance.grade-items': 'ਗਰੇਡ ਲਈ ਇਕਾਈ',
  'class.analytics.performance.no-grade-items':
    'ਤੁਹਾਡੇ ਵਰਗੇ ਲਗਦਾ ਹੈ ਸਾਰੇ ਫੜ ਗਏ ਹੋ!',
  'class.analytics.performance.gru-grade-items.students.zero':
    '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'class.analytics.performance.gru-grade-items.students.one':
    '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'class.analytics.performance.gru-grade-items.students.other':
    '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'class.analytics.performance.gru-grade-items.students.not-started':
    'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'class.analytics.mastery.title': 'ਦੇਖੋ ਮਹਾਰਤ',
  'class.quick-start.title': 'ਇਸ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸਮੱਗਰੀ ਨਿਰਧਾਰਤ ਕਰੋ',
  'class.quick-start.new-course': 'ਇੱਕ ਨਵਾਂ ਕੋਰਸ ਸ਼ੁਰੂ ਕਰੋ',
  'class.quick-start.new-course-desc':
    'ਇੱਕ ਨਵਾਂ ਕੋਰਸ, ਇੱਕ ਸੰਗ੍ਰਿਹ ਜਾਂ ਇੱਕ ਮੁਲਾਂਕਣ ਬਣਾ ਕੇ ਸ਼ੁਰੂ ਕਰੋ',
  'class.quick-start.course': 'ਨਵਾਂ ਕੋਰਸ',
  'class.quick-start.new-collection': 'ਨਵਾਂ ਭੰਡਾਰ',
  'class.quick-start.new-assessment': 'ਨਵੇਂ ਮੁਲਾਂਕਣ',
  'class.quick-start.remix-a-sample': 'ਇੱਕ ਸੈਂਪਲ ਰੀਮਿਕਸ ਕਰੋ',
  'class.quick-start.add-existing-course': 'ਆਪਣੀ ਲਾਇਬਰੇਰੀ ਤੋਂ ਇਕ ਕੋਰਸ ਜੋੜੋ',
  'class.quick-start.existing-course-desc': 'ਕਲਾਸਰੂਮ ਸ਼ੁਰੂ ਕਰਨ ਦਾ ਤੇਜ਼ ਤਰੀਕਾ',
  'class.quick-start.choose-course': 'ਕੋਰਸ ਚੁਣੋ',
  'class.quick-start.remix-from-course': 'ਇੱਕ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਰੀਮਿਕਸ ਕਰੋ',
  'class.quick-start.featured-course': 'ਵੇਖੋ ਵਿਸ਼ੇਸ਼ਤਾ ਕੋਰਸ',
  'class.quick-start.remix-desc':
    'ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਇੱਕ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਨੂੰ ਕਾਪੀ ਅਤੇ ਅਨੁਕੂਲ ਬਣਾਓ',
  'class.quick-start.browse-content': 'ਜਾਂ ਸਾਡੀ ਸਮੱਗਰੀ ਕੈਟਾਲਾਗ ਦੇਖੋ.',
  'classes.classesJoined': 'ਕਲਾਸਰੂਮ ਜੋ ਮੈਂ ਜੁੜ ਗਏ ਹਾਂ',
  'classes.classesTaught': 'ਕਲਾਸ ਰੂਮ ਸਿਖਾਉਂਦੀ ਹਾਂ',
  'classes.noClassesJoined': 'ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋਏ ਹੋ',
  'classes.noClassesTaught': 'ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ ਵੀ ਬਣਾਇਆ ਕਲਾਸਰੂਮ ਨਹੀਂ ਹੈ',
  'content.assessments.edit.best-practices':
    '[1] ਇੱਕ ਮੁਲਾਂਕਣ ਉਨ੍ਹਾਂ ਸਕੂਲਾਂ ਦਾ ਸੈਟ ਹੈ ਜੋ ਤੁਸੀਂ ਅਤੇ ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀ ਸਮਝ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ ਦੀ ਨਿਗਰਾਨੀ ਕਰਨ ਲਈ ਵਰਤ ਸਕਦੇ ਹਨ. [2] [3] ਤੁਹਾਡੇ ਮੁਲਾਂਕਣ ਵਿੱਚ ਕਈ ਪ੍ਰਕਾਰ ਦੇ ਪ੍ਰਸ਼ਨ ਕਿਸਮਾਂ (ਐਸਬੀਏਕ ਤੇ ਅਧਾਰਤ) ਵੱਖ ਵੱਖ ਢੰਗਾਂ ਵਿੱਚ ਸਮਝ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ. ਅਸੀਂ ਹਰੇਕ ਪ੍ਰਸ਼ਨ ਨੂੰ ਮਿਆਰਾਂ, ਮਾਈਕ੍ਰੋ-ਸਟੈਂਡਰਡ ਅਤੇ ਵੈਬਬ ਗਿਆਨ ਦੀ ਡੂੰਘਾਈ ਲਈ ਟੈਗਿੰਗ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ. [4]',
  'content.classes.create.title': 'ਕਲਾਸਰੂਮ ਬਣਾਉ',
  'content.classes.create.content': 'ਜਿੱਥੇ ਵਿਦਿਆਰਥੀ ਸਮੱਗਰੀ ਨਾਲ ਜੁੜਦੇ ਹਨ',
  'content.classes.create.class-name-input': 'ਆਪਣੇ ਕਲਾਸਰੂਮ ਦਾ ਨਾਂ ਦਿਓ',
  'content.classes.create.condition-prompt':
    'ਤੁਹਾਡੇ ਕਲਾਸਰੂਮ ਵਿਚ ਵਿਦਿਆਰਥੀ ਕਿਵੇਂ ਸ਼ਾਮਲ ਹੋਣਗੇ?',
  'content.classes.create.condition-prompt-code': 'ਕੋਈ ਵੀ ਕਲਾਸਰੂਮ ਕੋਡ ਨਾਲ',
  'content.classes.create.condition-prompt-invite': 'ਸਿਰਫ ਸੱਦਾ',
  'content.classes.create.get-started': 'ਸ਼ੁਰੂ ਕਰੋ',
  'content.classes.join.title': 'ਇੱਕ ਨਵੇਂ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'content.classes.join.join-a-classroom': 'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'content.classes.join.content': 'ਜਿੱਥੇ ਯਾਤਰਾ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ.',
  'content.classes.join.not-now': 'ਹਾਲੇ ਨਹੀਂ',
  'content.classes.join.class-code-input': 'ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕਰੋ',
  'content.classes.join.class-not-found':
    'ਕਲਾਸਰੂਮ ਨਹੀਂ ਮਿਲਿਆ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਸੀਂ ਸਹੀ ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕੀਤਾ ਹੈ',
  'content.classes.join.invalid-code': 'ਅਪ੍ਰਮਾਣਿਕ ਕਲਾਸਰੂਮ ਕੋਡ.',
  'content.classes.join.join-not-allowed':
    'ਜਿਸ ਕਲਾਸ ਵਿੱਚ ਤੁਸੀਂ ਸ਼ਾਮਲ ਹੋਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰ ਰਹੇ ਹੋ ਉਹ ਹੁਣ ਕਿਰਿਆਸ਼ੀਲ ਨਹੀਂ ਹੈ. ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਕਲਾਸ ਨੂੰ ਸਹੀ ਕਲਾਸ ਕੋਡ ਨਾਲ ਸੰਪਰਕ ਕਰੋ.',
  'content.classes.join.already-member':
    'ਤੁਸੀਂ ਪਹਿਲਾਂ ਹੀ ਇਸ ਕਲਾਸਰੂਮ ਦਾ ਇੱਕ ਮੈਂਬਰ ਹੋ.',
  'content.classes.join.join-class': 'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'content.classes.join.terms-and-conditions':
    'ਕਲਾਸਰੂਮ ਵਿਚ ਦਾਖਲ ਹੋਣ ਤੇ, ਮੈਂ ਇਸ ਕਲਾਸਰੂਮ ਦੇ ਅਧਿਆਪਕ (ਅਧਿਆਪਕਾਂ) ਨਾਲ ਇਸ ਗੋਰੂ ਕਲਾਸਰੂਮ ਦਾ ਅਧਿਐਨ ਕਰਨ ਤੋਂ ਤਿਆਰ ਮੇਰਾ ਅਨੁਮਾਨ ਅਤੇ ਸੰਗ੍ਰਹਿ ਪ੍ਰਗਤੀ ਡੇਟਾ ਨੂੰ ਸ਼ੇਅਰ ਕਰਨ ਲਈ ਸਹਿਮਤ ਹਾਂ.',
  'content.collections.edit.assign-to-course': 'ਕੋਰਸ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰੋ',
  'content.collections.edit.best-practices':
    '[1] ਵਿਦਿਆਰਥੀ ਇਕੱਤਰਤਾ ਪੱਧਰ ਤੇ ਤੁਹਾਡੀ ਸਮੱਗਰੀ ਨਾਲ ਇੰਟਰੈਕਟ ਕਰਦੇ ਹਨ. ਸਿੱਖਣ ਦੇ ਸੰਗ੍ਰਹਿ ਬਣਾਉਣ ਸਮੇਂ, ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼ਾਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰਨਾ ਯਕੀਨੀ ਬਣਾਉ ਅਤੇ ਵੱਖੋ-ਵੱਖਰੇ ਸਰੋਤ ਕਿਸਮਾਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਬਾਰੇ ਸੋਚੋ ਜੋ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਕਈ ਤਰੀਕਿਆਂ ਨਾਲ ਸੰਕਲਪਾਂ ਨੂੰ ਪ੍ਰਦਰਸ਼ਤ ਕਰਨ ਲਈ ਵਰਤਦੇ ਹਨ. [2] [3] ਸੰਕਲਪਾਂ ਨੂੰ ਬਣਾਉਣ ਲਈ ਸੰਸਾਧਨਾਂ ਦੀ ਗਿਣਤੀ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ. ਕਿਸੇ ਸੰਗ੍ਰਿਹ ਦੇ ਰਾਹੀਂ ਤਰੱਕੀ ਨੂੰ ਤਰਕਪੂਰਨ ਤਰੀਕੇ ਨਾਲ ਪ੍ਰਵਾਹ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਲੋੜੀਂਦੇ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਇੱਕ ਜਰਨਲ ਤੋਂ ਲੈ ਕੇ ਹੋਰ ਗੁੰਝਲਦਾਰ ਪੱਧਰ ਤੱਕ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ, ਜਾਂ ਵਿਦਿਆਰਥੀ ਖੋਜ ਲਈ ਢੁਕਵੀਂ ਮਨਜ਼ੂਰੀ ਦੇਣੀ ਚਾਹੀਦੀ ਹੈ. [4] [5] ਸਾਡੇ ਗੂਰੂ ਸਵਾਲ ਜ ਹੋਰ interactives ਅਸੀਂ ਇਕੱਤਰਤਾ ਦੇ ਉਦੇਸ਼ਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਅਤੇ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਕਿ ਹਰੇਕ ਸਰੋਤ ਦੀ ਭੂਮਿਕਾ ਅਤੇ ਉਦੇਸ਼ ਹੈ, ਲਈ ਲੋੜੀਂਦੇ ਸਰੋਤ ਅਤੇ / ਜਾਂ ਬਹੁਤ ਸਾਰੇ ਵੱਖ-ਵੱਖ ਸਰੋਤ ਦੀ ਸਿਫ਼ਾਰਿਸ਼ ਕਰਦੇ ਹਾਂ. [6]',
  'content.courses.edit.assign-to-class': 'ਕਲਾਸਰੂਮ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰੋ',
  'content.courses.edit.best-practices':
    '[1] ਇੱਕ ਕੋਰਸ ਇੱਕ ਫ਼ੋਲਡਰ ਹੁੰਦਾ ਹੈ ਜਿਸ ਨਾਲ ਤੁਸੀਂ ਆਪਣੀਆਂ ਸਿਖਲਾਈ ਸਮਗਰੀ ਨੂੰ ਇਕਾਈਆਂ ਅਤੇ ਪਾਠਾਂ ਵਿੱਚ ਸੰਗਠਿਤ ਕਰ ਸਕਦੇ ਹੋ. ਕੋਰਸ ਬਣਾਉਂਦੇ ਸਮੇਂ ਜ਼ਰੂਰੀ ਵਿਸ਼ਿਆਂ ਤੇ ਵਿਚਾਰ ਕਰੋ ਕਿ ਤੁਸੀਂ ਕਿਵੇਂ ਸੰਬੋਧਿਤ ਕਰ ਰਹੇ ਹੋ, ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼ਾਂ, ਅਤੇ ਤੁਹਾਡੀ ਸਮੱਗਰੀ ਦਾ ਸੰਗਠਨ. [2] [3] ਤੁਸੀਂ ਆਪਣੇ ਵਿਦਿਆਰਥੀ ਆਬਾਦੀ ਲਈ ਇੱਕ ਵੱਖਰੇ ਤਜ਼ਰਬੇ ਨੂੰ ਤਿਆਰ ਕਰਨ ਲਈ ਇਕੱਠੇ ਸਿਖਿਆ ਦੇ ਸਕਦੇ ਹੋ (ਉਦਾਹਰਣ ਲਈ, ਤੁਸੀਂ ਕ੍ਰਮਬੱਧ ਹੋ ਸਕਦੇ ਹੋ ਤੁਹਾਡੇ ਯੂਨਿਟਾਂ ਦੀ ਰੂਪਕ ਵਿਗਿਆਨ ਨਾਲ, ਵਿਸ਼ੇ ਦੁਆਰਾ, ਜਾਂ ਮਿਆਰੀ ਦੁਆਰਾ). [4]',
  'content.courses.edit.information.course-title': 'ਕੋਰਸ ਦਾ ਸਿਰਲੇਖ',
  'content.courses.edit.information.description': 'ਵਰਣਨ',
  'content.questions.edit.add-to': 'ਨਾਲ ਜੋੜ ਦਿਓ',
  'content.questions.edit.best-practices':
    '[1] ਇੱਕ ਸਵਾਲ ਇੱਕ ਅਜਿਹਾ ਸਰੋਤ ਹੈ ਜਿਸਦੇ ਲਈ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਜਵਾਬ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਅਸੀਂ ਤੁਹਾਡੇ ਕਿਸਮ ਦੇ ਸਵਾਲਾਂ ਨੂੰ ਸਮਰਥਨ ਦੇਣ ਲਈ ਵੱਖ-ਵੱਖ ਪ੍ਰਸ਼ਨ ਕਿਸਮਾਂ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦੇ ਹਾਂ ਜੋ ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀ sbac, parcc ਅਤੇ ਹੋਰ ਮੁਲਾਂਕਣਾਂ ਤੇ ਦੇਖਣਗੇ. [2] [3] ਤੁਸੀਂ ਕਿਸ ਤਰ੍ਹਾਂ ਦੇ ਪ੍ਰਸ਼ਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋ ਜੋ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਇਨ੍ਹਾਂ ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਪ੍ਰਭਾਵਾਂ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਨ ਲਈ ਅਤੇ ਗਿਆਨ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਲਈ ਬਹੁਤ ਸਾਰੇ ਰੂਪਾਂਤਰ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਵਰਤਦੇ ਹਨ. [4] [5] ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਨੂੰ ਮਿਆਰਾਂ, ਮਾਈਕ੍ਰੋ-ਸਟੈਂਡਰਡ ਅਤੇ ਵੈਬਬੈਗ ਦੀ ਗਿਆਨ ਦੀ ਗਹਿਰਾਈ ਲਈ ਟੈਗ ਕਰੋ. ਤੁਸੀਂ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਤੁਹਾਡਾ ਵਿਦਿਆਰਥੀ ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ ਦੁਆਰਾ ਸਵਾਲਾਂ ਨਾਲ ਕਿਵੇਂ ਪਰਸਪਰ ਹੈ. [6]',
  'content.questions.edit.information.question-title': 'ਸਵਾਲ ਦਾ ਸਿਰਲੇਖ',
  'content.questions.edit.information.question-type': 'ਸਵਾਲ ਦੀ ਕਿਸਮ',
  'content.questions.edit.builder.add-answer-choice': '+ ਉੱਤਰ ਵਿਕਲਪ ਜੋੜੋ',
  'content.questions.edit.builder.add-hint': 'ਸੰਕੇਤ ਸ਼ਾਮਲ ਕਰੋ',
  'content.questions.edit.builder.add-explanation': 'ਵਿਆਖਿਆ ਜੋੜਨਾ',
  'content.questions.edit.builder.answer': 'ਜਵਾਬ',
  'content.questions.edit.builder.answer-instructions.FIB':
    'ਜਵਾਬ ਅਤੇ ਇਕ ਵਿਆਖਿਆ ਲਈ 5 ਸੰਕੇਤਾਂ ਤਕ ਸ਼ਾਮਿਲ ਕਰੋ.',
  'content.questions.edit.builder.answer-instructions.HS_IMG':
    'ਤੁਸੀਂ ਦਸ ਜਵਾਬ ਚਿੱਤਰਾਂ ਨੂੰ ਜੋੜ ਸਕਦੇ ਹੋ ਅਤੇ ਇੱਕ ਜਾਂ ਵੱਧ ਸਹੀ ਉੱਤਰ ਚੁਣੋ',
  'content.questions.edit.builder.answer-instructions.HS_TXT':
    'ਤੁਸੀਂ ਦਸ ਜਵਾਬਾਂ ਦੇ ਵਿਕਲਪ ਜੋੜ ਸਕਦੇ ਹੋ ਅਤੇ ਇੱਕ ਜਾਂ ਵੱਧ ਸਹੀ ਉੱਤਰ ਚੁਣ ਸਕਦੇ ਹੋ',
  'content.questions.edit.builder.answer-instructions.HT_HL_ST':
    'ਜਿਵੇਂ ਤੁਸੀਂ ਸਵਾਲ ਲਿਖਦੇ ਹੋ, ਹਾਈਲਾਈਟ ਕੀਤੀ ਵਾਕਾਂ ਨੂੰ ਦਰਸਾਉਣ ਲਈ ਬ੍ਰੈਕੇਟ ਦੀ ਵਰਤੋਂ ਕਰੋ. ਬ੍ਰੈਕ ਦੇ ਅੰਦਰ ਇੱਕ ਮਿਆਦ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ, ਇੱਕ ਬਰੈਕਟ ਸਿਰਫ ਇੱਕ ਸਮੇਂ ਇੱਕ ਵਾਰ ਹੀ ਹੋ ਸਕਦੀ ਹੈ. ਉਦਾਹਰਨ ਲਈ, ਪਹਿਲੀ ਸੂਰਲੀ ਸੂਰ ਨੂੰ ਤੂੜੀ ਦਾ ਆਪਣਾ ਘਰ ਬਣਾਇਆ [ਵੱਡੀ ਬੁਰੀ ਬਘਿਆੜ ਨੇ ਘਰ ਨੂੰ ਉਡਾ ਦਿੱਤਾ.] ਦੂਜੀ ਸੂਰ ਨੂੰ ਲੱਕੜ ਦਾ ਆਪਣਾ ਘਰ ਬਣਾਇਆ. ਅੱਖਰ ਸੀਮਾ: 5000',
  'content.questions.edit.builder.answer-instructions.HT_HL_WD':
    'ਜਿਵੇਂ ਤੁਸੀਂ ਸਵਾਲ ਲਿਖਦੇ ਹੋ, ਉਜਾਗਰ ਕੀਤੇ ਸ਼ਬਦਾਂ ਲਈ ਬਰੈਕਟਸ ਦੀ ਵਰਤੋਂ ਕਰੋ. ਇੱਕ ਬਰੈਕਟ ਕੇਵਲ ਇੱਕ ਵਾਰ ਵਿੱਚ ਇੱਕ ਸ਼ਬਦ ਹੀ ਰੱਖ ਸਕਦਾ ਹੈ ਉਦਾਹਰਨ ਲਈ, [ਬੜੀ] ਮਾੜੀ ਬਘਿਆੜ ਨੇ [ਹੇਠਾਂ] ਘਰ ਨੂੰ ਉਡਾ ਦਿੱਤਾ. ਅੱਖਰ ਸੀਮਾ: 5000',
  'content.questions.edit.builder.answer-instructions.HT_RO':
    'ਤੁਸੀਂ ਸਹੀ ਕ੍ਰਮ ਵਿੱਚ ਦਸ ਜਵਾਬ ਦੀਆਂ ਚੋਣਾਂ ਜੋੜ ਸਕਦੇ ਹੋ. ਆਦੇਸ਼ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਰਾਇਆ ਜਾਏਗਾ.',
  'content.questions.edit.builder.answer-instructions.MA':
    'ਤੁਸੀਂ ਦਸ ਦੇ ਉੱਤਰ, ਇੱਕ ਚਿੱਤਰ, ਇੱਕ ਸਪਸ਼ਟੀਕਰਨ, ਅਤੇ ਪੰਜ ਸੰਕੇਤਾਂ ਤਕ ਦੇ ਸਕਦੇ ਹੋ.',
  'content.questions.edit.builder.answer-instructions.MC':
    'ਤੁਸੀਂ ਦਸ ਜਵਾਬਾਂ ਦੀਆਂ ਚੋਣਾਂ ਜੋੜ ਸਕਦੇ ਹੋ ਅਤੇ ਇੱਕ ਸਹੀ ਉੱਤਰ ਦਰਸਾ ਸਕਦੇ ਹੋ. ਅੱਖਰ ਸੀਮਾ: 200',
  'content.questions.edit.builder.answer-instructions.OE':
    'ਸਹੀ ਜਵਾਬ ਲਿਖੋ. ਅੱਖਰ ਸੀਮਾ: 5000',
  'content.questions.edit.builder.answer-instructions.T/F': 'ਸਹੀ ਉੱਤਰ ਚੁਣੋ.',
  'content.questions.edit.builder.question-instructions.FIB':
    'ਜਿਵੇਂ ਤੁਸੀਂ ਸਵਾਲ ਲਿਖਦੇ ਹੋ, ਖਾਲੀ ਥਾਂ ਤੇ ਭਰਨ ਲਈ ਬਰੈਕਟ ਵਰਤੋ. ਉਦਾਹਰਨ ਲਈ: "ਵੱਡਾ ਬੁਰਾਈ [ਵੁਲਫ਼] ਨੇ [ਘਰ] ਨੂੰ ਉਡਾ ਦਿੱਤਾ." ਤੁਸੀਂ ਇੱਕ ਚਿੱਤਰ ਵੀ ਜੋੜ ਸਕਦੇ ਹੋ',
  'content.questions.edit.builder.question-instructions.HS_TXT':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.HS_IMG':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.HT_RO':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.HT_HL':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਪੁੱਛੋ',
  'content.questions.edit.builder.question-instructions.MC':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.MA':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.OE':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.question-instructions.T/F':
    'ਆਪਣਾ ਪ੍ਰਸ਼ਨ ਲਿਖੋ.',
  'content.questions.edit.builder.submission-format.title':
    'ਵਿਦਿਆਰਥੀ ਨੂੰ ਬੇਨਤੀ ਫਾਰਮੈਟ',
  'content.questions.edit.builder.submission-format.answer-type.text-box':
    'ਪਾਠ ਬਕਸਾ',
  'content.questions.edit.builder.feedback-grading.title': 'ਫੀਡਬੈਕ ਅਤੇ ਗਰੇਡਿੰਗ',
  'content.questions.edit.builder.feedback-grading.from-existing-rubric':
    'ਮੌਜੂਦਾ ਰੂਬੀਕਰ ਤੋਂ',
  'content.questions.edit.builder.feedback-grading.scoring': 'ਸਕੋਰਿੰਗ',
  'content.questions.edit.builder.feedback-grading.maximum-points':
    'ਵੱਧ ਤੋਂ ਵੱਧ ਅੰਕ',
  'content.questions.edit.builder.feedback-grading.increment': 'ਵਾਧਾ',
  'content.questions.edit.builder.feedback-grading.rubric-error':
    'ਕਿਰਪਾ ਕਰਕੇ ਇਕ ਚਿੰਨ੍ਹ ਜੋੜੋ',
  'content.modals.delete-bookmark.confirmation':
    'ਕੀ ਤੁਸੀਂ ਇਸ {{type}} ਨੂੰ ਅਨ-ਮਾਰਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'content.modals.delete-bookmark.delete-error':
    'ਓਹ! ਹੁਣ ਇਸ {{type}} ਨੂੰ ਅਣ-ਚਿੰਨ੍ਹਿਤ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.remove-class-activity.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਆਪਣੀ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਤੋਂ ਇਸ {{type}} ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'content.modals.remove-class-activity.delete-error':
    'ਓਹ! ਹੁਣ ਇਸ {{type}} ਨੂੰ ਹਟਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.delete-class.legend':
    'ਤੁਸੀਂ ਆਪਣੇ ਕਲਾਸਰੂਮ ਨੂੰ ਮਿਟਾਉਣ ਦੇ ਬਾਰੇ ਵਿੱਚ ਹੋ',
  'content.modals.delete-class.student-access':
    'ਵਿਦਿਆਰਥੀ ਕਲਾਸਰੂਮ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਦੇ ਯੋਗ ਨਹੀਂ ਹਨ',
  'content.modals.delete-class.student-data-deleted':
    'ਸਾਰੇ ਵਿਦਿਆਰਥੀ ਡੇਟਾ ਮਿਟਾ ਦਿੱਤੇ ਜਾਣਗੇ',
  'content.modals.archive-class.title': 'ਆਰਕਾਈਵ ਕਲਾਸਰੂਮ',
  'content.modals.archive-class.legend':
    'ਤੁਸੀਂ ਆਪਣੀ ਕਲਾਸਰੂਮ ਨੂੰ ਅਕਾਇਵ ਕਰ ਰਹੇ ਹੋ',
  'content.modals.archive-class.links-not-accessible':
    'ਸਾਰੇ ਸਾਂਝੇ ਲਿੰਕ ਅਸੁਰੱਖਿਅਤ ਹੋ ਜਾਣਗੇ',
  'content.modals.archive-class.students-no-access':
    'ਵਿਦਿਆਰਥੀ ਕਲਾਸਰੂਮ ਤੱਕ ਪਹੁੰਚਣ ਦੇ ਯੋਗ ਨਹੀਂ ਹੋਣਗੇ',
  'content.modals.archive-class.not-add-students':
    'ਤੁਸੀਂ ਕਲਾਸ ਵਿਚ ਹੋਰ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਜੋੜਨ ਦੇ ਯੋਗ ਨਹੀਂ ਹੋਵੋਗੇ',
  'content.modals.archive-class.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਆਰਕਾਈਵ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'content.modals.delete-content.legend': 'ਤੁਸੀਂ ਮਿਟਾਉਣ ਵਾਲੇ ਹੋ',
  'content.modals.delete-content.content-legend':
    '[1] {{type}} [2] {{ਇੰਡੈਕਸ}} - {{title}} {{ਮੂਲ ਨਾਮ}} ਤੋਂ',
  'content.modals.delete-content.content-legend-header':
    '{{parentname}} ਤੋਂ {{title}}',
  'content.modals.delete-content.delete-warning':
    'ਇਸ {{type}} ਵਿਚਲੀ ਸਾਰੀ ਸਮਗਰੀ ਮਿਟਾਈ ਜਾਵੇਗੀ',
  'content.modals.delete-content.delete-error':
    'ਓਹ! ਹੁਣ {{type}} ਨੂੰ ਮਿਟਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.delete-content.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ "ਮਿਟਾਓ" ਟਾਈਪ ਕਰੋ ਅਤੇ "ਮਿਟਾਓ" ਤੇ ਕਲਿਕ ਕਰੋ.',
  'content.modals.delete-resource.legend':
    'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ ਸਥਾਈ ਤੌਰ ਤੇ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ [1] {{title}} [2]',
  'content.modals.delete-resource.delete-warning':
    'ਇਸ {{type}} ਵਿਚਲੀ ਸਾਰੀ ਸਮਗਰੀ ਮਿਟਾਈ ਜਾਵੇਗੀ',
  'content.modals.delete-resource.delete-error':
    'ਓਹ! ਹੁਣ {{type}} ਨੂੰ ਮਿਟਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.delete-resource.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ "ਸਥਾਈ ਤੌਰ ਤੇ ਮਿਟਾਓ" ਤੇ ਕਲਿਕ ਕਰੋ.',
  'content.modals.delete-resource.first-check':
    'ਇਹ ਸਥਾਈ ਮਿਟਾਉਣਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਵਾਪਸ ਨਹੀਂ ਲਿਆ ਜਾ ਸਕਦਾ',
  'content.modals.delete-resource.second-check':
    'ਇਸ ਸ੍ਰੋਤਾਂ ਦੀਆਂ ਕਾਪੀਆਂ, ਤੁਹਾਡੇ ਸੰਗ੍ਰਿਹਾਂ ਅਤੇ ਕਮਿਊਨਿਟੀ ਦੇ ਦੂਜੇ ਉਪਭੋਗਤਾਵਾਂ ਦੁਆਰਾ ਕਿਸੇ ਵੀ ਸੰਗ੍ਰਿਹ ਵਿੱਚ, ਮਿਟਾ ਦਿੱਤੇ ਜਾਣਗੇ',
  'content.modals.delete-rubric.legend':
    'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ ਸਥਾਈ ਤੌਰ ਤੇ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ [1] {{title}} [2]',
  'content.modals.delete-rubric.delete-warning':
    'ਇਸ ਚਰਚਾ ਵਿੱਚ ਸਾਰੀ ਸਮਗਰੀ ਮਿਟਾਈ ਜਾਵੇਗੀ',
  'content.modals.delete-rubric.delete-error':
    'ਓਹ! ਇਸ ਵੇਲੇ ਰੂਬੀਕੇਰ ਨੂੰ ਮਿਟਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.delete-rubric.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ "ਸਥਾਈ ਤੌਰ ਤੇ ਮਿਟਾਓ" ਤੇ ਕਲਿਕ ਕਰੋ.',
  'content.modals.delete-rubric.first-check':
    'ਇਹ ਸਥਾਈ ਮਿਟਾਉਣਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਵਾਪਸ ਨਹੀਂ ਲਿਆ ਜਾ ਸਕਦਾ',
  'content.modals.remove-content.legend':
    'ਤੁਸੀਂ [3] {{parentname}} [4] ਤੋਂ [1] {{title}} [2] ਨੂੰ ਹਟਾ ਰਹੇ ਹੋ [4]',
  'content.modals.remove-content.remove-error':
    'ਓਹ! ਹੁਣ {{type}} ਨੂੰ ਹਟਾਉਣ ਵਿੱਚ ਅਸਮਰੱਥ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.remove-content.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ "ਹਟਾਉਣ" ਟਾਈਪ ਕਰੋ ਅਤੇ "ਹਟਾਓ" ਤੇ ਕਲਿਕ ਕਰੋ.',
  'content.modals.remove-student.title':
    'ਵਿਦਿਆਰਥੀ ਨੂੰ ਹਟਾ ਦਿਓ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਡਾਟਾ ਮਿਟਾਓ',
  'content.modals.remove-student.legend':
    'ਤੁਸੀਂ ਇਸ ਕਲਾਸਰੂਮ ਤੋਂ {{studentname}} ਨੂੰ ਹਟਾਉਣ ਜਾ ਰਹੇ ਹੋ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਾਰੇ ਡਾਟੇ ਨੂੰ ਮਿਟਾਓ',
  'content.modals.remove-student.data-inaccessible':
    'ਉਹਨਾਂ ਦੇ ਸਾਰੇ ਡੇਟਾ ਮਿਟ ਜਾਣਗੇ ਅਤੇ ਤੁਹਾਡੇ ਦੁਆਰਾ ਜਾਂ ਉਹਨਾਂ ਤੋਂ ਪਹੁੰਚਯੋਗ ਨਹੀਂ ਹਨ',
  'content.modals.remove-student.classroom-access':
    'ਉਹ ਕਲਾਸਰੂਮ ਜਾਂ ਸਮੱਗਰੀ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰਨਗੇ',
  'content.modals.remove-student.data-lost':
    'ਜੇ ਉਹ ਕਲਾਸ ਵਿਚ ਦੁਬਾਰਾ ਜੁੜ ਜਾਂਦੇ ਹਨ, ਤਾਂ ਸਾਰੇ ਪਿਛੋਕੜ ਖਤਮ ਹੋ ਜਾਣਗੇ',
  'content.modals.remove-student.remove-error':
    'ਓਹ! ਇਸ ਵਿਦਿਆਰਥੀ ਨੂੰ ਹੁਣੇ ਤੱਕ ਹਟਾਉਣਾ ਅਸਮਰੱਥ ਹੈ. ਕਿਰਪਾ ਕਰਕੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'content.modals.remove-student.confirmation':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ "ਮਿਟਾਓ" ਟਾਈਪ ਕਰੋ ਅਤੇ "ਮਿਟਾਓ" ਤੇ ਕਲਿਕ ਕਰੋ.',
  'content.modals.quick-remove-content.legend':
    'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ [1] {{title}} [2] [3] ਤੋਂ {{parentname}} [4] ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ.',
  'content.modals.quick-delete-content.legend':
    'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ [1] {{title}} [2] ਨੂੰ ਸਥਾਈ ਤੌਰ ਤੇ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ [3] {{parentname}} [4]',
  'content.modals.quick-delete-content.delete': 'ਪੱਕੇ ਤੌਰ ਤੇ ਮਿਟਾਓ',
  'content.resources.edit.best-practices':
    '[1] ਵਸੀਲੇ ਕਈ ਤਰ੍ਹਾਂ ਦੇ ਫਾਰਮੈਟਾਂ ਵਿਚ ਮਲਟੀਮੀਡੀਆ ਸਮੱਗਰੀ ਹਨ ਜਿਵੇਂ ਵੀਡੀਓਜ਼, ਇੰਟਰੈਕਟਿਵਜ਼, ਵੈੱਬਸਾਈਟਾਂ, ਤਸਵੀਰਾਂ, ਗੂਗਲ ਡੌਕਸ ਅਤੇ ਹੋਰ. ਰਚਨਾਤਮਕ ਬਣੋ ਅਤੇ ਆਪਣੇ ਸਾਧਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ ਜਾਂ "ਸੰਜੋਗ" ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਗੋੂਰੂ ਵਿੱਚ ਸਾਡੀ ਵੱਡੀ ਸਪਲਾਈ ਦੀ ਖੋਜ ਕਰੋ. [2] [3] ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰਨ ਲਈ ਵੱਖ-ਵੱਖ ਸਰੋਤ ਕਿਸਮਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ ਅਤੇ ਨਸ਼ਰਨਾ ਸ਼ਾਮਲ ਕਰੋ ਤਾਂ ਜੋ ਤੁਸੀਂ ਸਰੋਤ ਦੁਆਰਾ ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਅਗਵਾਈ ਕਰਨ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰ ਸਕੋ. [4] [5] ਅਸੀਂ ਹਰੇਕ ਪ੍ਰਸ਼ਨ ਨੂੰ ਮਿਆਰਾਂ, ਮਾਈਕ੍ਰੋ-ਸਟੈਂਡਰਡ ਅਤੇ 21 ਵੀਂ ਸਦੀ ਦੇ ਹੁਨਰਾਂ ਨੂੰ ਟੈਗ ਕਰਨ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ. ਤੁਸੀਂ ਦੇਖ ਸਕਦੇ ਹੋ ਕਿ ਕਿਵੇਂ ਤੁਹਾਡਾ ਵਿਦਿਆਰਥੀ ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਸੰਸਾਧਨਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਰਹੇ ਹਨ. [6]',
  'content.resources.edit.placeholder-message':
    'ਇਸ ਨੂੰ ਇੱਥੇ ਪੂਰਵਦਰਸ਼ਨ ਕਰਨ ਲਈ ਇੱਕ ਸਰੋਤ ਜੋੜੋ. [2]',
  'content.resources.edit.not-implemented':
    'ਸਰੋਤ ਫਾਰਮੈਟ ਝਲਕ [1] ਹਾਲੇ ਲਾਗੂ ਨਹੀਂ ਕੀਤਾ ਗਿਆ. [2]',
  'content.resources.edit.information.im-publisher': 'ਮੈਂ ਪ੍ਰਕਾਸ਼ਕ ਹਾਂ',
  'content.resources.edit.information.select-a-license':
    'ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਲਾਇਸੈਂਸ ਚੁਣੋ',
  'user.active-classrooms': 'ਸਰਗਰਮ ਕਲਾਸਰੂਮ',
  'user.archived-classrooms': 'ਸੰਗਠਿਤ ਕਲਾਸਰੂਮ',
  'user.classrooms': 'ਕਲਾਸਰੂਮ',
  'user.rgo': 'RGO',
  'user.create-class': 'ਕਲਾਸਰੂਮ ਬਣਾਓ',
  'user.hello': 'ਹੈਲੋ, {{name}}!',
  'user.independent-learning': 'ਸੁਤੰਤਰ ਸਿੱਖਿਆ',
  'user.join-class': 'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'user.joined-classes.zero':
    'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ {{count}} ਕਲਾਸਰੂਮ ਵਿੱਚ ਦਾਖਲ ਹੋ ਗਏ ਹੋ',
  'user.joined-classes.one': 'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ 1 ਕਲਾਸਰੂਮ ਵਿੱਚ ਦਾਖਲ ਹੋ ਗਏ ਹੋ',
  'user.joined-classes.other':
    'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ {{count}} ਕਲਾਸਰੂਮ ਵਿੱਚ ਦਾਖਲ ਹੋ ਗਏ ਹੋ',
  'user.my-current-classes': 'ਮੇਰੇ ਮੌਜੂਦਾ ਕਲਾਸਾਂ',
  'user.manage-goals': 'ਗੋਲੀਆਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ',
  'user.my-classes': 'ਮੇਰੇ ਕਲਾਸਾਂ',
  'user.teaching-classes.zero':
    'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ {{count}} ਕਲਾਸਰੂਮ ਸਿਖਾ ਰਹੇ ਹੋ',
  'user.teaching-classes.one': 'ਤੁਸੀਂ ਮੌਜੂਦਾ ਸਮੇਂ 1 ਕਲਾਸਰੂਮ ਸਿਖਾ ਰਹੇ ਹੋ',
  'user.teaching-classes.other':
    'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ {{count}} ਕਲਾਸਰੂਮ ਸਿਖਾ ਰਹੇ ਹੋ',
  'student-landing.announcement': 'ਐਲਾਨ',
  'student-landing.browse-featured-courses': 'ਸਾਡੇ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਵੇਖੋ',
  'student-landing.browse-our': 'ਸਾਡੀ ਝਲਕ ਵੇਖੋ',
  'student-landing.class-code': 'ਕਲਾਸ ਕੋਡ',
  'student-landing.featured-courses': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'student-landing.class.assigned-course': 'ਨਿਰਧਾਰਤ ਕੋਰਸ',
  'student-landing.class.back-to': 'ਵਾਪਸ ਕਲਾਸਰੂਮ ਵਿੱਚ',
  'student-landing.class.no-course':
    'ਇਸ ਕਲਾਸਰੂਮ ਵਿੱਚ ਕੋਈ ਅਨੁਸਾਰੀ ਕੋਰਸ ਨਹੀਂ ਹੁੰਦਾ.',
  'student-landing.class.no-course-assigned': 'ਕੋਈ ਕੋਰਸ ਨਹੀਂ ਦਿੱਤਾ',
  'student-landing.class.back-to-independent': 'ਵਾਪਸ ਸੁਤੰਤਰ ਸਿੱਖਿਆ ਲਈ',
  'student-landing.class.report': 'ਰਿਪੋਰਟ',
  'student-landing.class.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'student-landing.class.course-map': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'student-landing.class.unit': 'ਇਕਾਈ',
  'student-landing.class.lesson': 'ਪਾਠ',
  'student-landing.class.class-activities': 'ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ',
  'student-landing.class.class-activities-tab.today': 'ਅੱਜ',
  'student-landing.class.class-activities-tab.past-activities':
    'ਪਿਛਲੇ ਗਤੀਵਿਧੀਆਂ',
  'student-landing.class.my-report': 'ਮੇਰੀ ਰਿਪੋਰਟ',
  'student-landing.class.my-location': 'ਮੇਰੇ ਸਥਾਨ',
  'student-landing.class.my-proficiency': 'My Proficiency',
  'student-landing.class.establish-skyline': 'Let\'s Establish your Skyline',
  'student-landing.class.waiting-establish-skyline':
    'Waiting for your teacher to complete setting up the class.',
  'student-landing.class.setup-in-complete-desc1':
    'It looks like your teacher has not',
  'student-landing.class.setup-in-complete-desc2': 'updated class settings',
  'student-landing.class.setup-in-complete-desc3':
    'Please get in touch with her to resolve the matter. Once everything is correctly set up, refresh this page.',
  'student-landing.course.to-report': 'ਵਰਤੋਂ ਸੰਖੇਪ',
  'student-landing.course.total-time-spent': 'ਕੁੱਲ ਸਮਾਂ ਬਿਤਾਇਆ',
  'student-landing.current-activity': 'ਮੌਜੂਦਾ ਸਰਗਰਮੀ',
  'student-landing.resume-current-activity': 'ਮੌਜੂਦਾ ਸਰਗਰਮੀ ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ',
  'student-landing.last-activity': 'ਆਖਰੀ ਸਰਗਰਮੀ',
  'student-landing.start-studying': 'ਪੜ੍ਹਾਈ ਸ਼ੁਰੂ ਕਰੋ',
  'student-landing.not-available': '-ਨਾ-',
  'student-landing.join-classroom':
    'ਸਿੱਖਣ ਨੂੰ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣੇ ਅਧਿਆਪਕ ਦੀ ਕਲਾਸ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋਵੋ',
  'student-landing.learn': 'ਗੋਰੂ ਕਲਾਸਰੂਮ ਨਾਲ ਸਿੱਖੋ',
  'student-landing.my-performance.activity': 'ਸਰਗਰਮੀ',
  'student-landing.my-performance.activities.study': 'ਅਧਿਐਨ',
  'student-landing.my-performance.assessments': 'ਮੁਲਾਂਕਣ',
  'student-landing.my-performance.collections': 'ਸੰਗ੍ਰਹਿ',
  'student-landing.my-performance.filter': 'ਫਿਲਟਰ',
  'student-landing.my-performance.primary-text':
    'ਉਹ ਚੀਜ਼ਾਂ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਅਤੇ ਅਸੀਂ ਇੱਕ ਅਨੁਕੂਲਿਤ ਕਾਰਜਕੁਸ਼ਲਤਾ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰਾਂਗੇ.',
  'student-landing.my-performance.subject': 'ਵਿਸ਼ਾ',
  'student-landing.my-performance.title': 'ਆਪਣੇ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
  'student-landing.my-performance.time-period': 'ਸਮਾਂ ਮਿਆਦ',
  'student-landing.my-performance.update-report': 'ਅਪਡੇਟ ਰਿਪੋਰਟ',
  'student-landing.study-player': 'ਸਟੱਡੀ ਪਲੇਅਰ',
  'student-landing.my-study': 'ਮੇਰੇ ਅਧਿਐਨ',
  'student-landing.no-classrooms':
    'ਤੁਸੀਂ ਹਾਲੇ ਤੱਕ ਕਿਸੇ ਵੀ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਿਲ ਨਹੀਂ ਹੋਏ ਹੋ. ਆਪਣੇ ਅਧਿਆਪਕ ਦੀ ਕਲਾਸ ਨੂੰ ਜੋੜਨ ਲਈ "[1] ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ" ਤੇ ਕਲਿੱਕ ਕਰੋ. ਤੁਸੀਂ ਲਾਇਬਰੇਰੀ ਟੈਬ ਦੇ ਅਧੀਨ [2] ਇੱਕ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਦੀ ਖੋਜ ਵੀ ਕਰ ਸਕਦੇ ਹੋ.',
  'student-landing.no-content-classrooms':
    'ਇਸ ਕਲਾਸਰੂਮ ਵਿੱਚ ਵਰਤਮਾਨ ਵਿੱਚ ਕੋਈ ਵੀ ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
  'student-landing.welcome': 'ਗੋਰੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
  'student-landing.no-course-assigned':
    'ਅਜੇ ਤੱਕ ਇਸ ਕਲਾਸ ਨੂੰ ਕੋਈ ਕੋਰਸ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ ਹੈ. ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਅਧਿਆਪਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ.',
  'student-independent-learning.show-more': 'ਹੋਰ ਦਿਖਾਓ',
  'student-independent-learning.show-less': 'ਘੱਟ ਦਿਖਾਓ',
  'student-independent-learning.no-courses':
    'ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਬੁੱਕਮਾਰਕ ਕੋਰਸ ਦੀ ਪੜਚੋਲ ਕਰਨੀ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਉਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ.',
  'student-independent-learning.no-collections':
    'ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਬੁੱਕਮਾਰਕ ਕੀਤੇ ਗਏ ਸੰਗ੍ਰਹਿ ਦੀ ਖੋਜ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਉਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ.',
  'student-independent-learning.no-assessments':
    'ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਬੁੱਕਮਾਰਕ ਕੀਤੇ ਮੁਲਾਂਕਣਾਂ ਦੀ ਜਾਂਚ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਉਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ.',
  'student-independent-learning.no-independent-results':
    'ਕੁਝ ਨਵਾਂ ਸਿੱਖਣ ਲਈ ਲਾਇਬ੍ਰੇਰੀ ਦੀ ਖੋਜ ਕਰੋ',
  'student-independent-learning.no-bookmarks':
    'ਜਦੋਂ ਤੁਸੀਂ ਬੁੱਕਮਾਰਕ ਕੋਰਸ, ਸੰਗ੍ਰਹਿ, ਅਤੇ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਉਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ.',
  'student-independent-learning.add-bookmark': 'ਬੁੱਕਮਾਰਕ ਜੋੜੋ',
  'teacher-landing.latest-announcement': 'ਨਵੀਨਤਮ ਘੋਸ਼ਣਾ',
  'teacher-landing.latest-assessment': 'ਨਵੀਨਤਮ ਮੁਲਾਂਕਣ',
  'teacher-landing.create-classroom':
    'ਕਲਾਸਰੂਮ ਬਣਾਉ, ਵਿਸ਼ੇ ਭੇਟ ਕਰੋ, ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਸੱਦਾ ਦਿਓ',
  'teacher-landing.dca-create-info':
    'ਹੇਠਾਂ ਆਈਕਾਨ ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਗੋਰੂ ਲਾਇਬ੍ਰੇਰੀ ਤੋਂ ਸਮਗਰੀ ਦੀ ਕਲਾਸ ਬਣਾਉਣ ਲਈ ਸਮੱਗਰੀ ਦੀ ਖੋਜ ਕਰੋ. ਤੁਸੀਂ ਕੋਰਸ ਮੈਪ ਤੇ ਕਲਿਕ ਕਰਕੇ ਆਪਣੇ ਕੋਰਸ ਦੇ ਨਕਸ਼ੇ ਤੋਂ ਕਲਾਸ ਦੀ ਗਤੀਵਿਧੀ ਵਿੱਚ ਵੀ ਸਮੱਗਰੀ ਜੋੜ ਸਕਦੇ ਹੋ.',
  'teacher-landing.schedule-for-later': 'ਬਾਅਦ ਵਿੱਚ ਲਈ ਸ਼ੈਡਿਊਲ',
  'teacher-landing.teach-this-activity-later':
    'ਡੀਸੀਏ ਵਿਚ ਬਾਅਦ ਵਿਚ ਇਹ ਕੰਮ ਸਿਖਾਓ',
  'teacher-landing.schedule-dca-instruction-1':
    'ਇਸ ਗਤੀਵਿਧੀ ਨੂੰ ਸਿਖਾਉਣ ਲਈ ਬਾਅਦ ਦੀ ਮਿਤੀ ਚੁਣੋ.',
  'teacher-landing.schedule-dca-instruction-2':
    'ਇਹ ਗਤੀਵਿਧੀ ਚੁਣੀ ਗਈ ਤਾਰੀਖ਼ ਲਈ ਡੀ.ਸੀ.ਓ ਵਿਚ ਦਰਸਾਏਗੀ.',
  'teacher-landing.navigator-banner.title': 'ਗਣਿਤ ਲਈ ਨੈਵੀਗੇਟਰ',
  'teacher-landing.navigator-banner.description':
    'ਸਿਖਲਾਈ ਤਕਨਾਲੋਜੀ ਲਈ ਇਸ ਜੀਪੀ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ, ਅਸੀਂ ਗਣਿਤ ਲਈ ਨੈਵੀਗੇਟਰ ਦੀ ਡਿਜਾਈਨ ਕੀਤੀ ਹੈ ਤਾਂ ਕਿ ਇਹ ਯਕੀਨੀ ਬਣਾਇਆ ਜਾ ਸਕੇ ਕਿ ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਵਿਸ਼ਵਾਸ ਪ੍ਰਾਪਤ ਕਰ ਸਕੇ ਅਤੇ ਗਣਿਤ ਲਈ ਆਪਣੀ ਸਿੱਖਿਆ ਨੂੰ ਤੇਜੀ ਲਿਆ ਸਕੇ. [1] ਗਣਿਤ ਲਈ ਨੈਵੀਗੇਟਰ ਇੱਕ ਗਰੇਡ 2-12 ਤੋਂ ਸਾਰੇ ਗਣਿਤ ਸੰਕਲਪਾਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰਨ ਦਾ ਇੱਕ ਅਧਿਐਨ ਹੈ. ਵਿਵਦਆਰਥੀਆਂ ਨੂੰ ਆਪਣੇ ਮੌਜੂਦਾ ਗਿਆਨ ਤੇ ਨਿਰਮਾਣ ਕਰਨ ਦੇ ਨਾਲ ਨਾਲ ਉਨ੍ਹਾਂ ਦੀ ਸਮਝ ਵਿੱਚ ਪਾੜੇ ਨੂੰ ਭਰਨ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤੇ ਇੱਕ ਵਿਅਕਤੀਗਤ ਪਾਥਵੇਅ ਦੁਆਰਾ ਰਾਖਵਾਂ ਕੀਤਾ ਗਿਆ ਹੈ ਇਸ ਵਿਆਪਕ ਅਤੇ ਵਿਅਕਤੀਗਤ ਸਿੱਖਣ ਦੇ ਤਜਰਬੇ ਦੁਆਰਾ, ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਵਧੇਰੇ ਉੱਨਤ ਗਣਿਤ ਲਈ ਪੂਰੀ ਤਰ੍ਹਾਂ ਤਿਆਰ ਹੋ ਸਕਦਾ ਹੈ.',
  'teacher-landing.navigator-banner.join': 'ਡੈਮੋ ਕਲਾਸ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'teacher-landing.navigator-banner.success-message':
    'ਤੁਸੀਂ ਨੇਵੀਗੇਟਰ ਕਲਾਸ ਦੇ ਸਹਿ-ਅਧਿਆਪਕ ਵਜੋਂ ਸਫਲਤਾਪੂਰਵਕ ਸ਼ਾਮਲ ਹੋ ਗਏ ਹੋ',
  'teacher-landing.navigator-banner.error-message':
    'ਕਲਾਸ ਵਿਚ ਸ਼ਾਮਲ ਹੋਣ ਵਿਚ ਸਮੱਸਿਆ',
  'teacher-landing.class.atc-view.progress-to-destination':
    'progress to destination',
  'teacher-landing.class.manage': 'ਪ੍ਰਬੰਧ ਕਰਨਾ, ਕਾਬੂ ਕਰਨਾ',
  'teacher-landing.class.reports': 'ਰਿਪੋਰਟ',
  'teacher-landing.class.daily-activites': 'ਰੋਜ਼ਾਨਾ ਕਿਰਿਆਸ਼ੀਲ',
  'teacher-landing.class.courses': 'ਕੋਰਸ',
  'teacher-landing.class.back-to': 'ਵਾਪਸ ਕਲਾਸਰੂਮ ਵਿੱਚ',
  'teacher-landing.class.back-to-archived': 'ਵਾਪਸ ਆਰਕਾਈਵ ਕਲਾਸਰੂਮ ਵਿੱਚ',
  'teacher-landing.class.class-management': 'ਕਲਾਸ ਪ੍ਰਬੰਧਨ',
  'teacher-landing.class.atc': 'ATC',
  'teacher-landing.class.performance-overview': 'Performance Overview',
  'teacher-landing.class.student-proficiency': 'Student Proficiency',
  'teacher-landing.class.class-management-tab.actions': 'ਕਾਰਵਾਈਆਂ',
  'teacher-landing.class.class-management-tab.assessment-min-score':
    'ਟ੍ਰਾਫੀਆਂ ਲਈ ਨਿਊਨਤਮ ਸਕੋਰ',
  'teacher-landing.class.class-management-tab.assigned-course': 'ਨਿਰਧਾਰਤ ਕੋਰਸ',
  'teacher-landing.class.class-management-tab.archive': 'ਅਕਾਇਵ',
  'teacher-landing.class.class-management-tab.archive-class': 'ਅਕਾਇਵ ਕਲਾਸ',
  'teacher-landing.class.class-management-tab.archive-classroom':
    'ਆਰਕਾਈਵ ਕਲਾਸਰੂਮ',
  'teacher-landing.class.class-management-tab.attend-class-with-code':
    'ਕੋਡ ਦੇ ਨਾਲ ਕਲਾਸ ਵਿਚ ਹਾਜ਼ਰ ਹੋਣਾ',
  'teacher-landing.class.class-management-tab.class-information':
    'ਕਲਾਸ ਦੀ ਜਾਣਕਾਰੀ',
  'teacher-landing.class.class-management-tab.class-name': 'ਕਲਾਸਰੂਮ ਦਾ ਨਾਂ',
  'teacher-landing.class.class-management-tab.class-code': 'ਕਲਾਸ ਕੋਡ',
  'teacher-landing.class.class-management-tab.click-to-copy-class-code':
    'ਕਲਾਸ ਕੋਡ ਨੂੰ ਕਾਪੀ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
  'teacher-landing.class.class-management-tab.course-information':
    'ਕੋਰਸ ਜਾਣਕਾਰੀ',
  'teacher-landing.class.class-management-tab.delete': 'ਮਿਟਾਓ',
  'teacher-landing.class.class-management-tab.delete-class': 'ਕਲਾਸ ਮਿਟਾਓ',
  'teacher-landing.class.class-management-tab.download-roster': 'ਡਾਉਨਲੋਡ ਰੋਸਟਰ',
  'teacher-landing.class.class-management-tab.edit': 'ਸੰਪਾਦਨ ਕਰੋ',
  'teacher-landing.class.class-management-tab.email-address': 'ਈਮੇਲ ਖਾਤਾ',
  'teacher-landing.class.class-management-tab.first-name': 'ਪਹਿਲਾ ਨਾਂ',
  'teacher-landing.class.class-management-tab.import-roster': 'ਆਯਾਤ ਰੋਸਟਰ',
  'teacher-landing.class.class-management-tab.last-name': 'ਆਖੀਰਲਾ ਨਾਂਮ',
  'teacher-landing.class.class-management-tab.message': 'ਸੁਨੇਹਾ',
  'teacher-landing.class.class-management-tab.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'teacher-landing.class.class-management-tab.students': 'ਵਿਦਿਆਰਥੀ',
  'teacher-landing.class.class-management-tab.student-name': 'ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ',
  'teacher-landing.class.class-management-tab.student-id': 'ਵਿਦਿਆਰਥੀ ਆਈਡੀ',
  'teacher-landing.class.class-management-tab.teachers': 'ਅਧਿਆਪਕ',
  'teacher-landing.class.class-management-tab.view-report': 'ਰਿਪੋਰਟ ਵੇਖੋ',
  'teacher-landing.class.class-management-tab.course-null':
    'ਕਲਾਸਰੂਮ ਵਿੱਚ ਅਜੇ ਤੱਕ ਕੋਈ ਕੋਰਸ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ ਹੈ',
  'teacher-landing.class.class-management-tab.course-subject-null':
    'ਕਲਾਸ ਵਿਚ ਨਿਰਧਾਰਤ ਕੀਤੇ ਗਏ ਕੋਰਸ ਨੂੰ ਕਿਸੇ ਯੋਗ ਵਿਸ਼ਾ ਤੇ ਨਹੀਂ ਲਿਖਿਆ ਗਿਆ ਹੈ.',
  'teacher-landing.class.class-management-tab.students-null':
    'ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਾਲ ਕਲਾਸ ਕੋਡ ਸ਼ੇਅਰ ਕਰੋ ਤਾਂ ਕਿ ਉਹ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਸਕਣ.',
  'teacher-landing.class.students-tab.last-name': 'ਆਖੀਰਲਾ ਨਾਂਮ',
  'teacher-landing.class.students-tab.first-name': 'ਪਹਿਲਾ ਨਾਂ',
  'teacher-landing.class.students-tab.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'teacher-landing.class.students-tab.proficiency': 'ਮੁਹਾਰਤ',
  'teacher-landing.class.students-tab.location': 'ਸਥਾਨ',
  'teacher-landing.class.students-tab.currently-studying':
    'ਵਰਤਮਾਨ ਵਿੱਚ ਪੜ੍ਹ ਰਿਹਾ ਹੈ',
  'teacher-landing.class.students-tab.student-id': 'ਵਿਦਿਆਰਥੀਦ',
  'teacher-landing.class.students-tab.remove': 'ਹਟਾਓ',
  'teacher-landing.class.students-tab.mastered': 'ਮਾਹਰ',
  'teacher-landing.class.students-tab.in-progress': 'ਤਰੱਕੀ ਹੋ ਰਹੀ ਹੈ',
  'teacher-landing.class.students-tab.not-started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'teacher-landing.class.students-tab.course-coverage': 'ਕੋਰਸ ਕਵਰੇਜ',
  'teacher-landing.class.students-tab.class-statistics': 'ਕਲਾਸ ਦੇ ਅੰਕੜੇ',
  'teacher-landing.class.students-tab.proficiency-in': 'ਵਿੱਚ ਪ੍ਰਵੀਨਤਾ',
  'teacher-landing.class.students-tab.data-not-available': 'ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
  'teacher-landing.class.students-tab.course-coverage-label':
    'ਕਲਾਸ ਵਿੱਚ ਸਾਰੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਕੁਸ਼ਲਤਾ ਦੀ ਸੰਚਵ ਗਿਣਤੀ',
  'teacher-landing.class.students-tab.error-message':
    'ਕਲਾਸ ਦੇ ਕਿਸੇ ਕੋਰਸ ਨੂੰ ਨਿਰਧਾਰਤ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ ਜਾਂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਕਲਾਸ ਵਿਚ ਰੁੱਕਿਆ ਨਹੀਂ ਹੈ. ਇੱਕ ਵਾਰ ਕੋਰਸ ਨੂੰ ਕਲਾਸ ਵਿੱਚ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕੀਤਾ ਗਿਆ ਹੈ, ਕਲਾਸ ਦੀ ਯੋਗਤਾ ਰਿਪੋਰਟ ਇੱਥੇ ਦਿਖਾਈ ਜਾਵੇਗੀ',
  'teacher-landing.class.atc-view.domains-reviewed': 'Domains to be reviewed',
  'teacher-landing.class.atc-view.class-activities-completed':
    'Class Activities Completed',
  'teacher-landing.class.atc-view.class-activities-pending':
    'Class Activities Pending',
  'teacher-landing.class.atc-view.show-all': 'Show All',
  'teacher-landing.class.atc-view.collapse': 'Collapse',
  'teacher-landing.class.atc-view.total-competencies-gained':
    'Total Competencies Gained',
  'teacher-landing.class.atc-view.progress-label':
    'Progress (# of competencies)',
  'teacher-landing.class.class-activities': 'ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ',
  'teacher-landing.class.offline-class-report.class-report': 'ਕਲਾਸ ਦੀ ਰਿਪੋਰਟ',
  'teacher-landing.class.offline-class-report.activity-report': 'ਸਰਗਰਮੀ ਰਿਪੋਰਟ',
  'teacher-landing.class.offline-class-report.conducted-on': 'ਤੇ ਆਯੋਜਿਤ',
  'teacher-landing.class.offline-class-report.not-started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'teacher-landing.class.back-to-class-activities':
    'ਵਾਪਸ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਲਈ',
  'teacher-landing.class.class-activities-tab.today': 'ਅੱਜ:',
  'teacher-landing.class.class-activities-tab.yesterday': 'ਕੱਲ੍ਹ:',
  'teacher-landing.class.class-activities-tab.month': 'ਮਹੀਨੇ:',
  'teacher-landing.class.class-activities-tab.add-from-course-map':
    'ਕੋਰਸ ਮੈਪ ਤੋਂ ਜੋੜ ਦਿਓ',
  'teacher-landing.class.class-activities-tab.add-from-my-content':
    'ਮੇਰੀ ਸਮੱਗਰੀ ਤੋਂ ਜੋੜੋ',
  'teacher-landing.class.class-activities-tab.welcome-dca':
    'ਤੁਹਾਡੀ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸਵਾਗਤ ਕਰੋ ਜਿੱਥੇ ਤੁਸੀਂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਅੱਜਕੱਲ ਪੂਰਾ ਕਰਨ ਲਈ ਸੰਗ੍ਰਹਿ ਅਤੇ ਮੁਲਾਂਕਣ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦੇ ਹੋ. ਕਿਰਪਾ ਕਰਕੇ ਨੋਟ ਕਰੋ: ਤਿਆਰ ਕੀਤੇ ਕੋਈ ਵੀ ਰਿਪੋਰਟ ਸਭ ਤੋਂ ਹਾਲੀਆ ਕੋਸ਼ਿਸ਼ ਲਈ ਸਿਰਫ ਅੱਜ ਹੀ ਉਪਲਬਧ ਹੋਣਗੀਆਂ',
  'teacher-landing.class.class-activities-tab.enter-max-timespent':
    'ਮੁਲਾਂਕਣ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਵਾਰ ਦਾਖਲ ਕਰੋ',
  'teacher-landing.class.class-activities-tab.enter-max-assessment-time-spent':
    'ਮੁਲਾਂਕਣ ਨੂੰ ਪੂਰਾ ਕਰਨ ਵਿੱਚ ਲਗਾਏ ਗਏ ਸਮੇਂ ਨੂੰ ਦਾਖ਼ਲ ਕਰੋ',
  'teacher-landing.class.class-activities-tab.enter-max-score':
    'ਮੁਲਾਂਕਣ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਸਕੋਰ ਦਾਖਲ ਕਰੋ',
  'teacher-landing.class.class-activities-tab.hour': 'h',
  'teacher-landing.class.class-activities-tab.min': 'ਮੀ',
  'teacher-landing.class.class-activities-tab.question-score': 'ਸਵਾਲ ਦਾ ਸਕੋਰ',
  'teacher-landing.class.class-activities-tab.max-score': 'ਅਧਿਕਤਮ ਸਕੋਰ',
  'teacher-landing.class.class-activities-tab.assessment-score': 'ਮੁਲਾਂਕਣ ਸਕੋਰ',
  'teacher-landing.class.class-activities-tab.assessment-max-score':
    'ਮੁਲਾਂਕਣ ਅਧਿਕਤਮ ਸਕੋਰ',
  'teacher-landing.class.class-activities-tab.enter-valid-timespent':
    'ਖਰਚ ਹੋਏ ਵੈਧ ਸਮਾਂ ਦਰਜ ਕਰੋ',
  'teacher-landing.class.class-activities-tab.create-activity': 'ਗਤੀਵਿਧੀ ਬਣਾਉ',
  'teacher-landing.class.class-activities-tab.schedule-activity':
    'ਅਨੁਸੂਚੀ ਦੀ ਗਤੀਵਿਧੀ',
  'teacher-landing.class.class-activities-tab.add-subject-framework':
    'ਕਿਰਪਾ ਕਰਕੇ ਕਲਾਸ ਸੈਟਿੰਗਜ਼ ਤੇ ਇੱਕ ਵਿਸ਼ੇ ਅਤੇ ਫਰੇਮਵਰਕ ਦੀ ਚੋਣ ਕਰੋ',
  'teacher-landing.class.class-activities-tab.create-external-collection':
    'ਇੱਕ ਬਾਹਰੀ ਸੰਗ੍ਰਹਿ ਬਣਾਓ',
  'teacher-landing.class.click-to-copy': 'ਕਲਾਸ ਕੋਡ ਨੂੰ ਕਾਪੀ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
  'teacher-landing.class.course-map': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'teacher-landing.class.management': 'ਰੋਸਟਰ ਪ੍ਰਬੰਧਨ',
  'teacher-landing.class.report': 'ਰਿਪੋਰਟ',
  'teacher-landing.class.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'teacher-landing.class.performance-tab.assessments': 'ਮੁਲਾਂਕਣ',
  'teacher-landing.class.performance-tab.collections': 'ਸੰਗ੍ਰਹਿ',
  'teacher-landing.class.view-more': 'ਹੋਰ ਵੇਖੋ',
  'teacher-landing.class.class-settings.class-settings-sec.generate-pathway':
    'ਸਿੱਖਣ ਦਾ ਰਸਤਾ ਬਣਾਉਣਾ',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-head':
    'ਕਲਾਸ ਸੈਟਿੰਗਜ਼',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-desc':
    'ਇਕ ਟਰਾਫੀ ਕਮਾਉਣ ਲਈ ਘੱਟੋ ਘੱਟ ਪ੍ਰਦਰਸ਼ਨ',
  'teacher-landing.class.class-settings.class-settings-sec.class-code':
    'ਕਲਾਸ ਕੋਡ',
  'teacher-landing.class.class-settings.class-settings-sec.subject': 'ਵਿਸ਼ਾ',
  'teacher-landing.class.class-settings.class-settings-sec.framework':
    'ਫਰੇਮਵਰਕ',
  'teacher-landing.class.class-settings.class-settings-sec.grade-level':
    'ਗ੍ਰੇਡ ਲੈਵਲ',
  'teacher-landing.class.class-settings.class-settings-sec.option-choose-one':
    'ਇਕ ਚੁਣੋ',
  'teacher-landing.class.class-settings.class-settings-sec.co-teachers':
    'ਸਹਿ-ਅਧਿਆਪਕ',
  'teacher-landing.class.class-settings.class-settings-sec.add-coteacher':
    'ਇਕ ਹੋਰ ਅਧਿਆਪਕ ਨੂੰ ਸ਼ਾਮਿਲ ਕਰੋ',
  'teacher-landing.class.class-settings.class-settings-sec.language':
    'ਪੜ੍ਹਾਈ ਦੀ ਭਾਸ਼ਾ',
  'teacher-landing.class.class-settings.student-settings-sec.student-settings-sec-head':
    'ਵਿਦਿਆਰਥੀ ਸੈਟਿੰਗਜ਼',
  'teacher-landing.class.class-settings.student-settings-sec.col-head-active':
    'ਕਿਰਿਆਸ਼ੀਲ',
  'teacher-landing.class.class-settings.course-settings-sec.course-settings-sec-head':
    'ਕੋਰਸ ਸੈਟਿੰਗਜ਼',
  'teacher-landing.class.class-settings.course-settings-sec.is-route0-applicable':
    'ਕੀ ਸਿੱਖਣ ਦੇ ਢੰਗ ਨੂੰ ਨਿੱਜੀ ਤੌਰ ਤੇ ਪ੍ਰੋਫਾਇਲ ਤੇ ਅੰਤਰਾਲਾਂ ਨੂੰ ਕਵਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?',
  'teacher-landing.class.class-settings.course-settings-sec.apply-settings':
    'ਸੈਟਿੰਗਾਂ ਲਾਗੂ ਕਰੋ',
  'teacher-landing.class.class-settings.course-settings-sec.origin-info':
    'ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਅਧਿਐਨ ਕਰਨ ਵਾਲੀ ਸਭ ਤੋਂ ਘੱਟ ਗ੍ਰੇਡ ਪੱਧਰ ਦੀ ਸਮੱਗਰੀ ਕੀ ਹੈ?',
  'teacher-landing.class.class-settings.course-settings-sec.current-grade-info':
    'ਤੁਹਾਡੀ ਕਲਾਸ ਦੀ ਗ੍ਰੇਡ ਲੈਵਲ ਕੀ ਹੈ?',
  'teacher-landing.class.class-settings.origin': 'ਮੂਲ',
  'teacher-landing.class.class-settings.destination': 'ਮੰਜ਼ਲ',
  'teacher-landing.class.class-settings.students': 'ਵਿਦਿਆਰਥੀ',
  'teacher-landing.class.class-settings.student-id': 'student-id',
  'teacher-landing.class.class-settings.joined-on': 'ਸ਼ਾਮਲ ਹੋਏ',
  'teacher-landing.class.class-settings.action-lable-add-student':
    'ਹੋਰ ਵਿਦਿਆਰਥੀ ਸ਼ਾਮਿਲ ਕਰੋ',
  'teacher-landing.no-classrooms':
    'ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਕੋਈ ਕਲਾਸਰੂਮ ਬਣਾਏ ਨਹੀਂ ਹਨ ਲਾਇਬਰੇਰੀ ਟੈਬ ਦੇ ਹੇਠਾਂ ਇੱਕ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਲਈ "ਕਲਾਸਰੂਮ ਬਣਾਓ" ਜਾਂ ਖੋਜ [1] ਤੇ ਕਲਿਕ ਕਰੋ',
  'teacher-landing.no-course':
    'ਤੁਸੀਂ ਇਸ [1] ਕਲਾਸ ਵਿਚ ਅਜੇ ਤਕ ਕੋਈ ਕੋਰਸ ਨਹੀਂ ਦਿੱਤਾ ਹੈ.',
  'teacher-landing.teach': 'ਗੋਰੂ ਕਲਾਸਰੂਮ ਦੇ ਨਾਲ ਸਿਖਾਓ',
  'teacher-landing.welcome-course-map':
    'ਇਹ ਤੁਹਾਡਾ ਕੋਰਸ ਮੈਪ ਹੈ ਜਿੱਥੇ ਤੁਸੀਂ ਕੋਰਸ ਦੀ ਸਮਗਰੀ ਦੇਖ ਸਕਦੇ ਹੋ, ਮੁਲਾਂਕਣ ਨੂੰ ਚਾਲੂ ਜਾਂ ਬੰਦ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰ ਸਕਦੇ ਹਾਂ. ਤੁਸੀਂ ਸਮੁੱਚੇ ਕਲਾਸ ਦੇ ਪ੍ਰਦਰਸ਼ਨ ਅਤੇ ਸੰਪੂਰਨਤਾ ਨੂੰ ਦੇਖ ਸਕਦੇ ਹੋ. ਕਲਾਸ ਦੇ ਪ੍ਰਦਰਸ਼ਨ ਦੇ ਵੇਰਵੇ ਲਈ, ਆਪਣੇ ਕਲਾਸਰੂਮ ਦੀ ਰਿਪੋਰਟ ਟੈਬ ਤੇ ਜਾਉ.',
  'teacher-landing.welcome-rescoped-course-map':
    'ਕਲਾਸ ਵਿਚ ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਲਈ ਇਹ ਕੋਰਸ ਨਿੱਜੀ ਕੀਤਾ ਗਿਆ ਹੈ. ਤੁਸੀਂ ਵਿਦਿਆਰਥੀ ਦੇ ਲਰਨਿੰਗ ਪਾਥਵੇਅ ( "-> ") ਤੇ ਕਲਿਕ ਕਰਕੇ ਕਲਾਸ ਮੈਨੇਜਮੈਂਟ ਸਫੇ ਵਿੱਚ ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਦੇ ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ ਦੇਖ ਸਕਦੇ ਹੋ.',
  'teacher-landing.welcome-premium-course-map':
    'ਇਹ ਨੇਵੀਗੇਟਰ ਕੋਰਸ ਇੱਕ ਬਹੁਗਿਣਤੀ ਗ੍ਰੇਡਾਂ ਵਿੱਚ ਇੱਕ ਵਿਅਕਤੀਗਤ ਕੋਰਸ ਨੂੰ ਕਵਰ ਕਰਨ ਵਾਲੇ ਮਿਆਰ ਹਨ. ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਨੂੰ ਭਰਵਾਂ ਭਰਨ, ਧਾਰਨਾਵਾਂ ਅਤੇ ਪ੍ਰਥਾਵਾਂ ਨੂੰ ਮਜ਼ਬੂਤੀ ਦੇਣ, ਅਤੇ ਆਪਣੇ ਸਿੱਖਣ ਵਿੱਚ ਵਾਧਾ ਕਰਨ ਲਈ ਇੱਕ ਵਿਲੱਖਣ ਕੋਰਸ ਦਿੱਤਾ ਗਿਆ ਹੈ. ਵਿਅਕਤੀਗਤ ਰੂਟਾਂ ਤਿਆਰ ਕੀਤੀਆਂ ਗਈਆਂ ਹਨ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਰੀਅਲ-ਰੂਟ ਵਿੱਚ ਹਰ ਵਿਦਿਆਰਥੀ ਦੀ ਸਿੱਖਣ ਦੀ ਸਮਰੱਥਾ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਕਰਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਿਰਧਾਰਤ ਮੰਜ਼ਿਲ ਤੇ ਨੈਵੀਗੇਟ ਕਰਨ ਲਈ ਰੀ-ਰੂਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ.',
  'goals.manage.title': 'ਮੇਰੇ ਟੀਚੇ!',
  'goals.manage.add-goal': 'ਟੀਚਾ ਜੋੜੋ',
  'goals.manage.goal-label': 'ਟੀਚਾ',
  'goals.manage.start-date-label': 'ਤਾਰੀਖ ਸ਼ੁਰੂ',
  'goals.manage.end-date-label': 'ਸਮਾਪਤੀ ਮਿਤੀ',
  'goals.manage.type-label': 'ਟੀਚਾ ਪ੍ਰਕਾਰ',
  'goals.manage.status-label': 'ਸਥਿਤੀ',
  'goals.manage.not_started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'goals.manage.activated': 'ਸਰਗਰਮ ਕੀਤਾ',
  'goals.manage.completed': 'ਮੁਕੰਮਲ',
  'goals.manage.dropped': 'ਘਟਿਆ',
  'goals.manage.reflection-label': 'ਪ੍ਰਤੀਬਿੰਬ',
  'goals.manage.save': 'ਬਚਾਓ',
  'goals.manage.update': 'ਅਪਡੇਟ ਕਰੋ',
  'goals.manage.goals-not-found':
    'ਤੁਸੀਂ ਹਾਲੇ ਤੱਕ ਕੋਈ ਟੀਚਾ ਨਹੀਂ ਰੱਖਿਆ ਹੈ ਤੁਸੀਂ ਉੱਤੇ  "ਟਾਰਗੇਟ ਜੋੜੋ " ਬਟਨ ਨੂੰ ਦਬਾ ਕੇ ਇੱਕ ਟੀਚਾ ਜੋੜ ਸਕਦੇ ਹੋ.',
  'goals.create.error-add-title': 'ਕਿਰਪਾ ਕਰਕੇ ਟੀਚਾ ਦਾਖ਼ਲ ਕਰੋ',
  'goals.create.error-length-title': 'ਟੀਚਾ ਵਿੱਚ ਅਧਿਕਤਮ 200 ਵਰਣ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ',
  'goals.create.error-add-start-date': 'ਕਿਰਪਾ ਕਰਕੇ ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ ਦਰਜ ਕਰੋ',
  'goals.create.error-add-end-date': 'ਕਿਰਪਾ ਕਰਕੇ ਸਮਾਪਤੀ ਮਿਤੀ ਦਾਖਲ ਕਰੋ',
  'goals.create.error-greater-end-date':
    'ਅੰਤ ਦੀ ਮਿਤੀ ਸ਼ੁਰੂਆਤੀ ਮਿਤੀ ਤੋਂ ਵੱਧ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ',
  'goals.create.error-add-status': 'ਕਿਰਪਾ ਕਰਕੇ ਟੀਚਾ ਸਥਿਤੀ ਚੁਣੋ',
  'goals.create.error-length-reflection':
    'ਰਿਫਲਿਕਸ਼ਨ ਵਿਚ ਵੱਧ ਤੋਂ ਵੱਧ 200 ਅੱਖਰ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ',
  'goals.create.created-success-msg': 'ਤੁਸੀਂ \'ਗੋਲਾਟਲੇ ਬਣਾਇਆ ਹੈ.',
  'goals.delete.deleted-success-msg': 'ਤੁਸੀਂ ਟੀਚਾ ਹਟਾ ਦਿੱਤਾ ਹੈ',
  'goals.update.updated-success-msg': 'ਤੁਸੀਂ ਟੀਚਾ ਨੂੰ ਅਪਡੇਟ ਕੀਤਾ ਹੈ',
  'gru-add-to.add-assessment-to-lesson': 'ਮੇਰੇ ਮੁਲਾਂਕਣਾਂ ਤੋਂ ਜੋੜ ਦਿਉ',
  'gru-add-to.add-assessment-to-lesson-lead':
    'ਇਸ ਪਾਠ ਵਿੱਚ ਜੋੜਨ ਲਈ ਇੱਕ ਮੁਲਾਂਕਣ ਚੁਣੋ',
  'gru-add-to.add-collection-to-lesson': 'ਮੇਰੇ ਸੰਗ੍ਰਹਿ ਤੋਂ ਸ਼ਾਮਲ ਕਰੋ',
  'gru-add-to.add-collection-to-lesson-lead':
    'ਇਸ ਪਾਠ ਵਿੱਚ ਜੋੜਨ ਲਈ ਇੱਕ ਸੰਗ੍ਰਹਿ ਨੂੰ ਚੁਣੋ.',
  'gru-add-to.add-to-collection': 'ਭੰਡਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
  'gru-add-to.add-to-collection-lead':
    'ਇੱਕ ਭੰਡਾਰਨ ਚੁਣੋ ਜਿਸਨੂੰ ਤੁਸੀਂ {{ਸਮੱਗਰੀ ਸਿਰਲੇਖ}} ਸ਼ਾਮਿਲ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ',
  'gru-add-to.add-to-existing-classroom': 'ਮੌਜੂਦਾ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ',
  'gru-add-to.add-to-existing-classroom-lead':
    'ਇੱਕ ਕਲਾਸਰੂਮ ਚੁਣੋ ਜਿਸਨੂੰ ਤੁਸੀਂ ਸ਼ਾਮਿਲ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ',
  'gru-add-to.add-to-assessment': 'ਮੁਲਾਂਕਣ ਜਾਂ ਭੰਡਾਰ ਵਿੱਚ ਸ਼ਾਮਲ',
  'gru-add-to.add-to-assessment-lead':
    'ਇੱਕ ਮੁਲਾਂਕਣ ਚੁਣੋ ਜੋ ਤੁਸੀਂ {{ਸਮੱਗਰੀ ਸਿਰਲੇਖ}} ਨੂੰ ਜੋੜਨਾ ਚਾਹੁੰਦੇ ਹੋ',
  'gru-add-to.assessments-info':
    'ਇੱਥੇ ਦਿੱਤੇ ਗਏ ਮੁਲਾਂਕਣ [1] ਨਹੀਂ ਹਨ [2] ਕਿਸੇ ਹੋਰ ਸਬਕ ਜਾਂ ਕੋਰਸ ਨਾਲ ਸੰਬੰਧਿਤ ਨਹੀਂ ਹਨ',
  'gru-add-to.collections-info':
    'ਇੱਥੇ ਸੂਚੀਬੱਧ ਸੰਗ੍ਰਹਿ [1] ਨਹੀਂ ਹਨ [2] ਕਿਸੇ ਹੋਰ ਸਬਕ ਜਾਂ ਕੋਰਸ ਨਾਲ ਸੰਬੰਧਿਤ ਨਹੀਂ ਹਨ',
  'gru-add-rubric-to-question.title': 'ਮੇਰੇ ਰੂਬਰੂਕ ਤੋਂ ਜੋੜ ਦਿਓ',
  'gru-add-rubric-to-question.lead': 'ਇਸ ਪ੍ਰਸ਼ਨ ਵਿੱਚ ਜੋੜਨ ਲਈ ਇੱਕ ਚਰਬੀਕਾਰ ਚੁਣੋ.',
  'gru-add-rubric-to-question.no-rubrics':
    'ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਕੋਈ ਵੀ ਰਬੜ ਨਹੀਂ ਬਣਾਇਆ ਹੈ ਜੋ ਇਸ ਮੁਫ਼ਤ ਜਵਾਬ ਪ੍ਰਸ਼ਨ ਨਾਲ ਜੁੜਿਆ ਜਾ ਸਕਦਾ ਹੈ. ਤੁਸੀਂ ਮੇਰੀ ਸਮੱਗਰੀ ਦੇ ਤਹਿਤ ਕਤਲੇਆਮ ਬਣਾ ਸਕਦੇ ਹੋ ਜੋ ਤੁਹਾਡੇ ਪ੍ਰੋਫਾਈਲ ਤੋਂ ਐਕਸੈਸ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ',
  'gru-add-rubric-to-question.go-to-content': 'ਮੇਰੀ ਸਮੱਗਰੀ ਤੇ ਜਾਓ',
  'gru-assessment-confirmation.title': 'ਤੁਸੀਂ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰਨ ਜਾ ਰਹੇ ਹੋ ...',
  'gru-assessment-confirmation.description': 'ਇਸ ਮੁਲਾਂਕਣ ਵਿੱਚ, {{model.title}}',
  'gru-assessment-confirmation.setting-forward':
    'ਤੁਸੀਂ ਕੇਵਲ ਅੱਗੇ ਜਾਣ ਲਈ ਅੱਗੇ ਜਾ ਸਕਦੇ ਹੋ',
  'gru-assessment-confirmation.setting-forward-backward':
    'ਤੁਸੀਂ ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਉੱਤਰ ਦੇਣ ਲਈ ਅੱਗੇ ਅਤੇ ਪਿੱਛੇ ਵੱਲ ਪਿੱਛੇ ਜਾ ਸਕਦੇ ਹੋ',
  'gru-assessment-confirmation.unlimited-attempts-left':
    'ਤੁਹਾਡੇ ਕੋਲ ਬੇਅੰਤ ਕੋਸ਼ਿਸ਼ਾਂ ਹਨ',
  'gru-assessment-confirmation.setting-forward-teacher':
    'Student can navigate forward only',
  'gru-assessment-confirmation.setting-forward-backward-teacher':
    'Student can navigate forward and backwards to answer questions',
  'gru-assessment-confirmation.unlimited-attempts-left-teacher':
    'Student have unlimited attempts',
  'gru-assessment-confirmation.attempts-left.zero':
    'ਤੁਹਾਡੇ ਕੋਲ {{count}} ਕੋਸ਼ਿਸ਼ਾਂ ਹਨ',
  'gru-assessment-confirmation.attempts-left.one':
    'ਤੁਹਾਡੇ ਕੋਲ 1 ਕੋਸ਼ਿਸ਼ ਬਾਕੀ ਹੈ',
  'gru-assessment-confirmation.attempts-left.other':
    'ਤੁਹਾਡੇ ਕੋਲ {{count}} ਕੋਸ਼ਿਸ਼ਾਂ ਹਨ',
  'gru-assessment-confirmation.attempts-left.other-teacher':
    'Student have {{count}} attempts',
  'gru-assessment-confirmation.unlimited-attempts':
    'ਤੁਹਾਡੇ ਕੋਲ ਬੇਅੰਤ ਕੋਸ਼ਿਸ਼ਾਂ ਹਨ',
  'gru-assessment-confirmation.cancel': 'ਰੱਦ ਕਰੋ',
  'gru-assessment-confirmation.continue': 'ਜਾਰੀ ਰੱਖੋ',
  'gru-assessment-confirmation.start': 'ਸ਼ੁਰੂ ਕਰੋ',
  'gru-assessment-confirmation.submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
  'gru-submit-confirmation.title': 'ਇਸ ਕਵਿਜ਼ ਨੂੰ ਪੂਰਾ ਕਰੋ ਅਤੇ ਸਭ ਨੂੰ ਪੇਸ਼ ਕਰੋ',
  'gru-submit-confirmation.description':
    'ਤੁਸੀਂ ਇਸ ਕੋਸ਼ਿਸ਼ ਨੂੰ ਖਤਮ ਕਰਨ ਅਤੇ ਸਾਰੇ ਜਵਾਬ ਜਮ੍ਹਾਂ ਕਰਨ ਜਾ ਰਹੇ ਹੋ. ਕਿਸੇ ਵੀ ਛੱਡਿਆ ਗਿਆ ਸਵਾਲਾਂ ਨੂੰ ਸਹੀ ਵਜੋਂ ਗਿਣਿਆ ਜਾਵੇਗਾ.',
  'gru-submit-confirmation.cancel': 'ਰੱਦ ਕਰੋ',
  'gru-submit-confirmation.ok': 'ਠੀਕ ਹੈ',
  'gru-submit-confirmation.confirm': 'ਮੁਕੰਮਲ ਕਵਿਜ਼',
  'gru-submit-confirmation.finish-description':
    'ਆਪਣੇ ਜਵਾਬ ਜਮ੍ਹਾਂ ਕਰਨ ਲਈ "ਮੁਕੰਮਲ ਕਵਿਜ਼" ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-quick-course-search.add-from-course': 'ਮੌਜੂਦਾ ਕੋਰਸ ਤੋਂ ਜੋੜੋ',
  'gru-quick-course-search.view-featured-courses': 'ਵੇਖੋ ਵਿਸ਼ੇਸ਼ਤਾ ਕੋਰਸ',
  'gru-quick-course-search.assign': 'ਨਿਰਧਾਰਤ ਕਰੋ',
  'gru-share-pop-over.copy': 'ਕਾਪੀ ਕਰੋ',
  'gru-share-pop-over.ios-tooltip': 'ਕਾਪੀ ਕਰਨ ਲਈ ਟੈਪ ਨੂੰ ਰੱਖੋ!',
  'gru-share-pop-over.multiarch-tooltip': 'ਕਾਪੀ ਕਰਨ ਲਈ ctrl + c ਦਬਾਉ!',
  'gru-share-pop-over.safari-osx-tooltip': 'ਕਾਪੀ ਕਰਨ ਲਈ cmd + c ਦਬਾਓ!',
  'gru-share-pop-over.share-course': 'ਆਪਣੇ ਕੋਰਸ ਨਾਲ ਲਿੰਕ ਸਾਂਝਾ ਕਰੋ',
  'gru-share-pop-over.share-question': 'ਆਪਣੇ ਸਵਾਲ ਨੂੰ ਲਿੰਕ ਨਾਲ ਸਾਂਝਾ ਕਰੋ',
  'gru-share-pop-over.share-resource': 'ਲਿੰਕ ਨਾਲ ਆਪਣਾ ਸਰੋਤ ਸਾਂਝਾ ਕਰੋ',
  'gru-share-pop-over.share-assessment': 'ਲਿੰਕ ਨਾਲ ਆਪਣੇ ਮੁਲਾਂਕਣ ਨੂੰ ਸਾਂਝਾ ਕਰੋ',
  'gru-share-pop-over.share-rubric': 'ਲਿੰਕ ਦੇ ਨਾਲ ਆਪਣੇ ਚਰਚਾ ਨੂੰ ਸਾਂਝਾ ਕਰੋ',
  'gru-share-pop-over.share-collection':
    'ਲਿੰਕ ਦੇ ਨਾਲ ਆਪਣੇ ਸੰਗ੍ਰਹਿ ਨੂੰ ਸਾਂਝਾ ਕਰੋ',
  'gru-category-panel.teacher.title': 'ਅਧਿਆਪਕਾਂ ਲਈ',
  'gru-category-panel.teacher.body':
    'ਡਾਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਦੁਆਰਾ ਮਿਆਰੀ-ਅਲਾਈਨ ਕੀਤੀ ਸਮੱਗਰੀ ਦੀ ਖੋਜ, ਸਮੱਗਰੀ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ, ਅਤੇ ਵਿਦਿਆਰਥੀ ਦੀ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ',
  'gru-category-panel.teacher.cta': 'ਕਹਾਣੀਆਂ ਵੇਖੋ',
  'gru-category-panel.student.title': 'ਵਿਦਿਆਰਥੀ ਲਈ',
  'gru-category-panel.student.body':
    'ਸਿੱਖਣ ਦੀਆਂ ਸਮੱਗਰੀ ਦੁਆਰਾ ਰੁੱਚੀਆਂ ਦੀ ਖੋਜ, ਨਿਰਮਾਣ ਅਤੇ ਪ੍ਰਗਤੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
  'gru-category-panel.student.cta': 'ਦਿਓ',
  'gru-category-panel.student.text-placeholder': 'ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕਰੋ',
  'gru-category-panel.district.title': 'ਜ਼ਿਲਿਆਂ ਲਈ',
  'gru-category-panel.district.body':
    'ਵਿਅਕਤੀਗਤ ਸਿੱਖਣ ਨੂੰ ਘਟਾਉਣ ਲਈ ਗੋਰੂ ਨਾਲ ਸਹਿਯੋਗ ਕਰੋ ਅਤੇ ਜ਼ਿਲਾ-ਤਸਦੀਕ ਪਾਠਕ੍ਰਮ ਨੂੰ ਸਾਂਝਾ ਕਰੋ.',
  'gru-category-panel.district.cta': 'ਸਾਡਾ ਪ੍ਰਭਾਵ ਵੇਖੋ',
  'gru-category-panel.partner.title': 'ਭਾਈਵਾਲਾਂ ਲਈ',
  'gru-category-panel.partner.body':
    'ਸਿਖਿਆ ਈਕੋਸਿਸਟਮ ਤੇ ਸਾਡੇ ਸਮੂਹਿਕ ਪ੍ਰਭਾਵ ਨੂੰ ਵਧਾਉਣ ਲਈ ਮਿਸ਼ਨ-ਅਯਾਲੀ ਸਹਿਯੋਗੀਆਂ ਨਾਲ ਸਹਿਯੋਗ ਕਰੋ.',
  'gru-category-panel.partner.cta': 'ਜਿਆਦਾ ਜਾਣੋ',
  'class.gru-class-navigation.active': 'ਕਿਰਿਆਸ਼ੀਲ:',
  'class.gru-class-navigation.members': 'ਮੈਂਬਰ',
  'class.gru-class-navigation.greetings': 'ਘੋਸ਼ਣਾਵਾਂ',
  'class.gru-class-navigation.overview': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'class.gru-class-navigation.analytics': 'ਡੇਟਾ',
  'class.gru-class-navigation.teams': 'ਟੀਮਾਂ',
  'class.gru-class-navigation.information': 'ਕਲਾਸਰੂਮ ਜਾਣਕਾਰੀ',
  'class.gru-class-statistics.title': 'ਕਲਾਸ ਦੇ ਅੰਕੜੇ',
  'class.gru-class-statistics.on-average': 'ਔਸਤ ਤੇ',
  'class.gru-class-statistics.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'class.gru-class-statistics.completion': 'ਮੁਕੰਮਲ',
  'class.gru-class-statistics.time-spent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'class.gru-class-statistics.no-performance': '-',
  'gru-user-registration.joinTitle': 'ਗੋਰੂ ਭਾਈਚਾਰੇ ਨਾਲ ਜੁੜੋ!',
  'gru-user-registration.joinDescription':
    'ਲੱਭੋ, ਰੀਮੀਕਸ ਕਰੋ, ਅਤੇ ਵਧੀਆ ਮੁਫ਼ਤ K-12 ਲਰਨਿੰਗ ਸਰੋਤਾਂ ਨੂੰ ਸਾਂਝਾ ਕਰੋ.',
  'gru-user-registration.googleButton': 'google ਨਾਲ ਸਾਈਨ ਅੱਪ ਕਰੋ',
  'gru-user-registration.whyGoogle': 'ਕਿਉਂ google ਦੇ ਨਾਲ ਸਾਈਨ ਅਪ ਕਰੋ',
  'gru-user-registration.descriptionWhyGoogle':
    'ਇਹ ਤੇਜ਼ ਅਤੇ ਆਸਾਨ ਹੈ. ਕਿਸੇ ਪਾਸਵਰਡ ਦੇ ਬਿਨਾਂ ਸਾਈਨ ਇਨ ਕਰਨ ਲਈ ਆਪਣੇ ਮੌਜੂਦਾ ਗੂਗਲ ਖਾਤੇ ਦੀ ਵਰਤੋਂ ਕਰੋ',
  'gru-user-registration.or': 'ਜਾਂ',
  'gru-user-registration.noGoogleAccount': 'ਗੂਗਲ ਖਾਤਾ ਨਹੀਂ ਹੈ?',
  'gru-user-registration.signUpEmail': 'ਆਪਣੇ ਈਮੇਲ ਪਤਾ ਨਾਲ ਸਾਈਨ ਅੱਪ ਕਰੋ',
  'gru-user-registration.haveAccount': 'ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?',
  'gru-user-registration.clickLogIn': 'ਲਾਗਇਨ ਕਰਨ ਲਈ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-welcome-message.title': 'ਗੋਰੂ ਦੀ ਸਿਖਲਾਈ ਨੈਵੀਗੇਟਰ ਵਿਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!',
  'gru-welcome-message.text-temporary-one':
    'ਜਿਵੇਂ ਤੁਸੀਂ ਸਿੱਖਣ ਦੇ ਸਮੁੰਦਰੀ ਜਹਾਜ਼ ਦੇ ਦੌਰਾਨ ਜਾਂਦੇ ਹੋ, ਅਸੀਂ ਤੁਹਾਡੇ ਸਫ਼ਰ ਦੀ ਸਹਾਇਤਾ ਲਈ ਖੁਸ਼ ਹਾਂ. ਇੱਕ ਟੂਰ ਆਈਕਨ ਲੈਣ ਲਈ ਦੇਖੋ',
  'gru-welcome-message.text-temporary-two':
    ' ਸਾਡੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦਾ ਉਪਯੋਗ ਕਿਵੇਂ ਕਰਨਾ ਹੈ ਇਸ ਤੇ ਨਿਰਦੇਸ਼ਿਤ ਟੂਰਾਂ ਲਈ',
  'gru-welcome-message.text-one':
    'ਜਿਵੇਂ ਤੁਸੀਂ ਪੂਰੇ ਸਿੱਖਣ ਵਾਲੇ ਨੇਵੀਗੇਟਰ ਵਿੱਚ ਜਾਂਦੇ ਹੋ, ਅਸੀਂ ਹੇਠ ਲਿਖੇ ਤਰੀਕਿਆਂ ਨਾਲ ਤੁਹਾਡੀ ਯਾਤਰਾ ਦਾ ਸਮਰਥਨ ਕਰਨ ਵਿੱਚ ਖੁਸ਼ ਹਾਂ:',
  'gru-welcome-message.text-two.subtitle': 'ਇੱਕ ਟੂਰ ਲਓ',
  'gru-welcome-message.text-two.text':
    ': ਸਾਡੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਹੈ ਇਸ ਤੇ ਸਪਸ਼ਟ ਟੂਰ ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ.',
  'gru-welcome-message.text-three.subtitle': 'ਮਦਦ ਕਰੋ',
  'gru-welcome-message.text-three.text':
    ': ਅਤਿਰਿਕਤ ਪ੍ਰਸ਼ਨਾਂ ਲਈ ਤੁਹਾਡੇ ਉਂਗਲਾਂ ਦੇ ਸਮਰਥਨ ਤੇ',
  'gru-welcome-message.text-four.subtitle': 'ਨਵਾਂ',
  'gru-welcome-message.text-four.text':
    ': ਤੁਹਾਡੇ ਲਈ ਨਵੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੀ ਪਛਾਣ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'gru-welcome-message.text-five':
    'ਕਿਸੇ ਵੀ ਸਮੇਂ ਜੇਕਰ ਤੁਸੀਂ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਤੁਸੀਂ ਆਪਣੇ ਘਰ ਦੇ ਪੇਜ ਤੇ ਵਾਪਸ ਆਉ, ਤਾਂ ਬਸ ਤੇ ਕਲਿੱਕ ਕਰੋ',
  'gru-welcome-message.dont-show-again': 'ਤੇ ਦੁਬਾਰਾ ਨਾ ਦਿਖਾਓ',
  'sign-up.step-1-title': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ!',
  'sign-up.step-1-description':
    'ਅਸੀਂ ਤੁਹਾਨੂੰ ਖੁਸ਼ ਹਾਂ ਕਿ ਤੁਸੀਂ ਸਾਡੇ ਨਾਲ ਸ਼ਾਮਿਲ ਹੋਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ ਹੈ.',
  'sign-up.step-child-title': 'ਇੰਨੀ ਜਲਦੀ ਨਹੀਂ!',
  'sign-up.step-child-subtitle':
    'ਅਸੀਂ ਤੁਹਾਡੀ ਰਜਿਸਟਰੇਸ਼ਨ ਨੂੰ ਪੂਰਾ ਨਹੀਂ ਕਰ ਸਕਦੇ.',
  'sign-up.step-child-description-1': 'ਸਾਡੇ ਲਈ ਗੂੜੂ ਤੁਹਾਡੇ ਖਾਤੇ ਨਹੀਂ ਬਣਾ ਸਕਿਆ',
  'sign-up.step-child-age-requirements': 'ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ',
  'sign-up.step-child-description-2':
    '. ਸਿੱਖਦੇ ਰਹੋ ਅਤੇ ਕੁਝ ਸਾਲਾਂ ਵਿੱਚ ਤੁਹਾਨੂੰ ਮਿਲਦਾ ਹੈ!',
  'sign-up.step-2-title': 'ਬੁਨਿਆਦੀ ਜਾਣਕਾਰੀ',
  'sign-up.step-2-description': 'ਤੁਸੀਂ ਮੂਲ ਨਹੀਂ ਹੋ, ਪਰ ਇਹ ਜਾਣਕਾਰੀ ਹੈ.',
  'sign-up.log-in': 'ਲਾਗਿਨ',
  'sign-up.log-in-description': 'ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾ ਖਾਤਾ ਹੈ',
  'sign-up.google-button': 'google ਨਾਲ ਸਾਈਨ ਅੱਪ ਕਰੋ',
  'sign-up.username': 'ਯੂਜ਼ਰਨਾਮ ਨਾਂ',
  'sign-up.dateOfBirth.title': 'ਜਨਮਦਿਨ',
  'sign-up.dateOfBirth.day': 'ਦਿਨ',
  'sign-up.dateOfBirth.month': 'ਮਹੀਨੇ',
  'sign-up.dateOfBirth.months.january': 'ਜਨਵਰੀ',
  'sign-up.dateOfBirth.months.february': 'ਫਰਵਰੀ',
  'sign-up.dateOfBirth.months.march': 'ਮਾਰਚ',
  'sign-up.dateOfBirth.months.april': 'ਅਪ੍ਰੈਲ',
  'sign-up.dateOfBirth.months.may': 'ਹੋ ਸਕਦਾ ਹੈ',
  'sign-up.dateOfBirth.months.june': 'ਜੂਨ',
  'sign-up.dateOfBirth.months.july': 'ਜੁਲਾਈ',
  'sign-up.dateOfBirth.months.august': 'ਅਗਸਤ',
  'sign-up.dateOfBirth.months.september': 'ਸਤੰਬਰ',
  'sign-up.dateOfBirth.months.october': 'ਅਕਤੂਬਰ',
  'sign-up.dateOfBirth.months.november': 'ਨਵੰਬਰ',
  'sign-up.dateOfBirth.months.december': 'ਦਸੰਬਰ',
  'sign-up.dateOfBirth.year': 'ਸਾਲ',
  'sign-up.dateOfBirth.error-message': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਨਮ ਤਾਰੀਖ ਦਰਜ ਕਰੋ.',
  'sign-up.email': 'ਈ - ਮੇਲ',
  'sign-up.password': 'ਪਾਸਵਰਡ',
  'sign-up.rePassword': 'ਪਾਸਵਰਡ ਪੱਕਾ ਕਰੋ',
  'sign-up.state': 'ਰਾਜ ਜਾਂ ਖੇਤਰ',
  'sign-up.district': 'ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਚਾਰਟਰ ਸੰਸਥਾ',
  'sign-up.error-username-taken':
    'ਓ, ਇਹ ਯੂਜ਼ਰਨਾਮ ਲਿਆ ਗਿਆ ਹੈ. ਇਕ ਹੋਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'sign-up.error-email-taken': 'ਇਹ ਈਮੇਲ ਕੀਤੀ ਜਾਂਦੀ ਹੈ. ਇਕ ਹੋਰ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
  'sign-up.error-role-message': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਰੋਲ ਚੁਣੋ.',
  'sign-up.error-country-message': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਦੇਸ਼ ਚੁਣੋ.',
  'sign-up.error-state-message': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਰਾਜ ਜਾਂ ਖੇਤਰ ਚੁਣੋ.',
  'sign-up.error-district-message':
    'ਕਿਰਪਾ ਕਰਕੇ ਸੂਚੀ ਵਿੱਚੋਂ ਆਪਣਾ ਡਿਸਟ੍ਰਿਕਟ / ਚਾਰਟਰ ਚੁਣੋ ਜਾਂ ਇਸ ਨੂੰ  "ਹੋਰ " ਵਿੱਚ ਦਿਓ.',
  'gru-user-sign-up-cancel.title': 'ਰਜਿਸਟਰੇਸ਼ਨ ਛੱਡਣੀ ਹੈ?',
  'gru-user-sign-up-cancel.exit?':
    'ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਰੂਪ ਤੋਂ ਬਾਹਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'gru-user-sign-up-cancel.registration_incomplete':
    'ਤੁਹਾਡੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਪੂਰੀ ਨਹੀਂ ਹੈ.',
  'gru-user-sign-up-cancel.leave': 'ਛੁੱਟੀ ਰਜਿਸਟਰੇਸ਼ਨ',
  'gru-user-sign-up-cancel.continue': 'ਰਜਿਸਟਰੇਸ਼ਨ ਜਾਰੀ ਰੱਖੋ',
  'login.title': 'ਵਾਪਸ ਸਵਾਗਤ!',
  'login.description': 'ਸਿਖਲਾਈ ਕੋਨੇ ਦੇ ਦੁਆਲੇ ਹੈ',
  'login.title-session-ends': 'ਤੁਹਾਡੇ ਸੈਸ਼ਨ ਦੀ ਮਿਆਦ ਪੁੱਗ ਗਈ ਹੈ.',
  'login.description-session-ends': 'ਕਿਰਪਾ ਕਰਕੇ ਸਾਈਨ ਇਨ ਕਰੋ.',
  'login.gooruAccountTitle': 'ਆਪਣੇ ਗੋੂਰੂ ਖਾਤੇ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
  'login.googleButton': 'google ਦੇ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ',
  'login.or': 'ਜਾਂ',
  'login.haveAccount': 'ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਖਾਤਾ ਹੈ?',
  'login.signUpHere': 'ਇੱਥੇ ਸਾਈਨ ਅਪ ਕਰੋ!',
  'login.forgotPassword': 'ਆਪਣਾ ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
  'login.password': 'ਪਾਸਵਰਡ',
  'login.usernameOrEmail': 'ਉਪਯੋਗਕਰਤਾ ਨਾਂ ਜਾਂ ਈਮੇਲ',
  'login.log-in': 'ਲਾਗਿਨ',
  'forgot-password.description': 'ਇਹ ਸਾਡੇ ਸਾਰਿਆਂ ਨਾਲ ਵਾਪਰਦਾ ਹੈ.',
  'forgot-password.usernameOrEmail': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਈਮੇਲ ਦਰਜ ਕਰੋ',
  'forgot-password.footer-google-description-1':
    '[1] \'ਸਾਈਨ ਇਨ ਗੂਗਲ \' ਦਬਾ ਕੇ ਦੁਬਾਰਾ ਲਾਗਇਨ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ. [2]',
  'forgot-password.footer-description-1':
    'ਤੁਹਾਨੂੰ ਆਪਣਾ ਪਾਸਵਰਡ ਰੀਸੈਟ ਕਰਨ ਲਈ ਇੱਕ ਲਿੰਕ ਦੇ ਨਾਲ ਇੱਕ ਈਮੇਲ ਪ੍ਰਾਪਤ ਹੋਵੇਗੀ.',
  'forgot-password.footer-description-2':
    'ਜੇ ਤੁਹਾਡੇ ਕੋਈ ਸਵਾਲ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਕਰੋ',
  'forgot-password.mail': 'support@gooru.org',
  'forgot-password.error-email-not-exists':
    'ਅਫ਼ਸੋਸ ਹੈ, ਅਸੀਂ ਇਸ ਈਮੇਲ ਨੂੰ ਨਹੀਂ ਪਛਾਣਦੇ ਹਾਂ',
  'forgot-password.secondStepTitle': 'ਆਪਣੇ ਈਮੇਲ ਦੀ ਜਾਂਚ ਕਰੋ',
  'forgot-password.secondStepDescription-1':
    'ਅਸੀਂ ਤੁਹਾਡੇ ਪਾਸਵਰਡ ਨੂੰ ਰੀਸੈੱਟ ਕਰਨ ਲਈ ਇੱਕ ਲਿੰਕ ਨਾਲ ਇੱਕ ਈਮੇਲ ਭੇਜੀ ਹੈ',
  'forgot-password.secondStepDescription-2':
    'ਜੇ ਤੁਹਾਡੇ ਕੋਈ ਸਵਾਲ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਸੰਪਰਕ ਕਰੋ',
  'reset-password.new-password': 'ਆਪਣਾ ਨਵਾਂ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ',
  'reset-password.new-password-confirm': 'ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
  'reset-password.title': 'ਪਾਸਵਰਡ ਰੀਸੈਟ ਕਰੋ',
  'change-password.change-password': 'ਪਾਸਵਰਡ ਲਿੰਕ ਬਦਲੋ',
  'change-password.title': 'ਪਾਸਵਰਡ ਬਦਲੋ',
  'change-password.current-password-label': 'ਆਪਣਾ ਮੌਜੂਦਾ ਪਾਸਵਰਡ ਦਿਓ',
  'change-password.change-success': 'ਪਾਸਵਰਡ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲਿਆ ਗਿਆ !!',
  'change-password.new-password-required':
    'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਵਾਂ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ',
  'change-password.change-password-error':
    'ਓਹ ਹੋ! ਕੁਝ ਸਹੀ ਨਹੀਂ. ਪਾਸਵਰਡ ਬਦਲਣ ਵਿੱਚ ਅਸਮਰੱਥ ਮੁੜ ਕੋਸ਼ਿਸ ਕਰੋ ਜੀ.',
  'footer.footerDescription':
    'ਗੋਰੂ ਆਪਣੇ ਪਲੇਟਫਾਰਮ ਓਪਨ-ਸੋਰਸ ਅਤੇ ਕਮਿਊਨਿਟੀ ਦੁਆਰਾ ਬਣਾਈ ਗਈ ਸਮੱਗਰੀ ਸੀਸੀ0 ਰੱਖਣ ਲਈ ਵਚਨਬੱਧ ਹੈ.',
  'footer.company': 'ਕੰਪਨੀ',
  'footer.community': 'ਭਾਈਚਾਰੇ',
  'footer.legal': 'ਕਾਨੂੰਨੀ',
  'footer.connect': 'ਜੁੜੋ',
  'footer.aboutGooru': 'ਗੋੂਰੂ ਬਾਰੇ',
  'footer.careers': 'ਕਰੀਅਰ',
  'footer.supportCenter': 'ਸਹਾਇਤਾ ਕੇਂਦਰ',
  'footer.contactUs': 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
  'footer.districts': 'ਜਿਲ੍ਹਿਆਂ',
  'footer.partners': 'ਹਿੱਸੇਦਾਰ',
  'footer.coaches': 'ਕੋਚ',
  'footer.events': 'ਸਮਾਗਮ',
  'footer.terms': 'ਸ਼ਬਦ',
  'footer.privacy': 'ਗੋਪਨੀਯਤਾ',
  'footer.Copyright': 'ਕਾਪੀਰਾਈਟ',
  'grade-dropdown.placeholder': 'ਗ੍ਰੇਡ',
  'grade-dropdown.prompt': 'ਇੱਕ ਗ੍ਰੇਡ ਚੁਣੋ',
  'grade-dropdown.pre-k': 'ਪ੍ਰੀ-ਕਸ਼ਮੀਰ',
  'grade-dropdown.elementary': 'ਸ਼ੁਰੂਆਤੀ',
  'grade-dropdown.middle-school': 'ਮਿਡਲ ਸਕੂਲ',
  'grade-dropdown.high-school': 'ਹਾਈ ਸਕੂਲ',
  'grade-dropdown.higher-ed': 'ਉੱਚ ਐਡੀ',
  'grade-dropdown.k': 'k',
  'grade-dropdown.first': '1',
  'grade-dropdown.second': '2',
  'grade-dropdown.third': '3',
  'grade-dropdown.fourth': '4',
  'grade-dropdown.fifth': '5',
  'grade-dropdown.sixth': '6',
  'grade-dropdown.seventh': '7',
  'grade-dropdown.eighth': '8',
  'grade-dropdown.ninth': '9',
  'grade-dropdown.tenth': '10',
  'grade-dropdown.eleventh': '11',
  'grade-dropdown.twelfth': '12',
  'grade-selector.placeholder': 'Grade Lines',
  'standard-dropdown.placeholder': 'ਮਿਆਰੀ ਦੁਆਰਾ ਝਲਕ',
  'subject-dropdown.placeholder': 'ਵਿਸ਼ਾ',
  'subject-dropdown.prompt': 'ਇੱਕ ਵਿਸ਼ਾ ਚੁਣੋ',
  'search-filter.input-placeholder': 'Type {{type}} name here...',
  'search-filter.courses': 'ਕੋਰਸ',
  'search-filter.collections': 'ਸੰਗ੍ਰਹਿ',
  'search-filter.resources': 'ਸਰੋਤ',
  'search-filter.assessments': 'ਮੁਲਾਂਕਣ',
  'search-filter.questions': 'ਸਵਾਲ',
  'search-filter.rubrics': 'ਕਤਲੇਆਮ',
  'search-filter.authors': 'Authors',
  'search-filter.question-types.MC': 'ਬਹੁ - ਚੋਣ',
  'search-filter.question-types.FIB': 'ਖਾਲੀ ਥਾਂ ਭਰੋ',
  'search-filter.question-types.T/F': 'ਸਹੀ / ਗਲਤ',
  'search-filter.question-types.TOF': 'ਸਹੀ ਜਾਂ ਝੂਠ',
  'search-filter.question-types.MA': 'ਬਹੁਤੇ ਜਵਾਬ',
  'search-filter.question-types.HS_TXT': 'ਮਲਟੀਪਲ ਚੋਣ - ਪਾਠ',
  'search-filter.question-types.HSTXT': 'ਮਲਟੀਪਲ ਚੋਣ ਪਾਠ',
  'search-filter.question-types.HS_IMG': 'ਮਲਟੀਪਲ ਚੋਣ - ਚਿੱਤਰ',
  'search-filter.question-types.HSIMG': 'ਮਲਟੀਪਲ ਚੋਣ ਈਮੇਜ਼',
  'search-filter.question-types.HT_RO': 'ਡ੍ਰੈਗ ਅਤੇ ਡਰਾਪ ਕ੍ਰਮ',
  'search-filter.question-types.HT&RO': 'ਖਿੱਚੋ ਅਤੇ ਕ੍ਰਮ ਨੂੰ ਡ੍ਰੌਪ ਕਰੋ',
  'search-filter.question-types.HT_HL': 'ਗਰਮ ਪਾਠ- ਉਚਾਈ',
  'search-filter.question-types.H-THL': 'ਗਰਮ-ਪਾਠ ਦੀ ਉਘਾੜ',
  'search-filter.question-types.OE': 'ਮੁਫ਼ਤ ਜਵਾਬ',
  'search-filter.author.placeholder': 'ਲੇਖਕ',
  'resource.video': 'ਵੀਡੀਓ',
  'resource.webpage': 'ਵੇਬ ਪੇਜ',
  'resource.interactive': 'ਪਰਸਪਰ',
  'resource.question': 'ਸਵਾਲ',
  'resource.image': 'ਚਿੱਤਰ',
  'resource.text': 'ਪਾਠ',
  'resource.audio': 'ਔਡੀਓ',
  'resource.oer': 'ਓਵਰ',
  'search-result.resource': 'ਸਰੋਤ',
  'search-result.resources': 'ਸਰੋਤ',
  'search-result.and': 'ਅਤੇ',
  'search-result.question': 'ਸਵਾਲ',
  'search-result.questions': 'ਸਵਾਲ',
  'search-result.in-this-collection': 'ਇਸ ਸੰਗ੍ਰਹਿ ਵਿਚ',
  'search-result.search-results-for': 'ਲਈ ਖੋਜ ਨਤੀਜੇ',
  'gru-image-picker.chooseFile': 'ਇੱਕ ਫਾਈਲ ਚੁਣੋ ...',
  'gru-image-picker.instruction':
    'ਆਪਣੇ ਕੰਪਿਊਟਰ ਤੇ ਇੱਕ ਫਾਈਲ ਤੋਂ ਇੱਕ ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ',
  'gru-image-picker.restriction':
    'ਚਿੱਤਰ ਨੂੰ ਇੱਕ jpg, gif ਜਾਂ png ਫਾਇਲ 5 mb ਤੋਂ ਘੱਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ.',
  'gru-image-picker.submit': 'ਤਸਵੀਰ ਵਰਤੋ',
  'gru-fib.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਦਿੱਤੇ ਗਏ ਖਾਲੀ (ਖਾਤਿਆਂ) ਵਿੱਚ ਆਪਣਾ ਜਵਾਬ (ਨਾਮਾਂ) ਟਾਈਪ ਕਰੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿਕ ਕਰੋ.',
  'gru-hs-image.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਚਿੱਤਰ ਚੁਣੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-hs-text.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ (ਚੋਣ) ਚੁਣੋ ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-hot-text.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਚੁਣੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-login-prompt.title': 'ਗੋਰੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!',
  'gru-login-prompt.instructions':
    'ਤੁਹਾਨੂੰ ਉਸ ਕਾਰਵਾਈ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰਨ ਦੀ ਲੋੜ ਹੈ',
  'gru-login-prompt.existing-user': 'ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?',
  'gru-login-prompt.new-user': 'ਇੱਥੇ ਨਵਾਂ?',
  'gru-login-prompt.not-now': 'ਹਾਲੇ ਨਹੀਂ',
  'gru-login-prompt.sign-in': 'ਸਾਈਨ - ਇਨ',
  'gru-multiple-answer.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਚੁਣੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-multiple-choice.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਚੁਣੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-open-ended.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੇ ਖੇਤਰ ਵਿੱਚ ਆਪਣਾ ਜਵਾਬ ਟਾਈਪ ਕਰੋ, ਅਤੇ ਜਦੋਂ ਤੁਸੀਂ \'ਮੁੜ ਕੀਤਾ ਜਾਵੇ ਤਾਂ ਆਪਣੇ ਜਵਾਬ ਨੂੰ ਬਚਾਉਣ ਲਈ  "{{action}} " ਬਟਨ ਤੇ ਕਲਿਕ ਕਰੋ.',
  'gru-open-ended.characterLimit': 'ਅੱਖਰ ਸੀਮਾ',
  'gru-question-viewer.answer': 'ਜਵਾਬ',
  'gru-question-viewer.question': 'ਸਵਾਲ',
  'gru-true-false.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਉੱਤਰ ਚੁਣੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-true-false.true': 'ਸਹੀ',
  'gru-true-false.false': 'ਗਲਤ',
  'gru-reorder.instructions':
    'ਕਿਰਪਾ ਕਰਕੇ ਜਵਾਬਾਂ ਨੂੰ ਠੀਕ ਕ੍ਰਮ ਵਿੱਚ ਦੁਬਾਰਾ ਕ੍ਰਮਬੱਧ ਕਰੋ, ਅਤੇ  "{{action}} " ਤੇ ਕਲਿਕ ਕਰੋ.',
  'student-first-experience.preStudyTitle': '{{title}} ਲਈ ਪੂਰਵ-ਅਧਿਐਨ',
  'student-first-experience.lp-compute-inprogress':
    'We are computing your initial proficiency profile in {{title}}',
  'student-first-experience.route0-action.accept': 'ਸਵੀਕਾਰ ਕਰੋ',
  'student-first-experience.route0-action.ignore': 'ਅਣਡਿੱਠ ਕਰੋ',
  'student-first-experience.competency.popover.title': '{{title}} ਸੀਮਾ',
  'student-first-experience.competency.popover.content':
    'ਤੁਹਾਨੂੰ ਆਪਣੇ ਮੰਜ਼ਿਲ ਤੇ ਪਹੁੰਚਣ ਲਈ ਆਪਣੀ ਸਕਾਈਲੀਨ ਅਤੇ ਇਸ ਗ੍ਰੇਡ ਲਾਈਨ ਦੇ ਸਾਰੇ ਮਾਪਦੰਡਾਂ ਦਾ ਅਧਿਐਨ ਕਰਨ ਦੀ ਲੋੜ ਹੈ.',
  'student-first-experience.assigned-course-title': '{{title}} ਲਈ ਨਿਰਧਾਰਤ ਕੋਰਸ',
  'student-first-experience.start-studying': 'Start Studying',
  'student-first-experience.show-route': 'Show Route',
  'student-first-experience.review-destination': 'Review Destination',
  'student-first-experience.competency-level.title':
    'ਤੁਹਾਡੀ ਪ੍ਰੋਵੀਜਨ ਦੀ ਪ੍ਰੋਫਾਇਲ',
  'student-first-experience.competency-level.mastery':
    '{{count}} ਮਿਆਰਾਂ ਤੇ ਕਾਬਜ਼ ਹੋਏ',
  'student-first-experience.competency-level.in-progress':
    '{{count}} ਮਿਆਰਾਂ ਦੀ ਪ੍ਰਗਤੀ ਵਿੱਚ ਹੈ',
  'student-first-experience.competency-level.not-started':
    '{{count}} ਮਾਨਕਾਂ ਦੀ ਸ਼ੁਰੂਆਤ ਨਹੀਂ ਹੋਈ',
  'student-first-experience.competency-level.your-skyline': 'ਤੁਹਾਡੇ ਸਕਾਈਂਲਾਈਨ',
  'student-first-experience.explanatory.master.title': 'ਮਾਹਰ',
  'student-first-experience.explanatory.master.desc':
    'ਇਹ ਸੰਕੇਤ ਦਿੰਦਾ ਹੈ ਕਿ ਇਸ ਗੱਲ ਦਾ ਕੋਈ ਸਬੂਤ ਹੈ ਕਿ ਤੁਸੀਂ ਮਿਆਰਾਂ ਨੂੰ ਸਫਲਤਾਪੂਰਵਕ ਹਾਸਿਲ ਕੀਤਾ ਹੈ',
  'student-first-experience.explanatory.in-progress.title': 'ਤਰੱਕੀ ਹੋ ਰਹੀ ਹੈ',
  'student-first-experience.explanatory.in-progress.desc':
    'ਇਹ ਸੰਕੇਤ ਦਿੰਦਾ ਹੈ ਕਿ ਇਸ ਗੱਲ ਦਾ ਕੋਈ ਸਬੂਤ ਹੈ ਕਿ ਤੁਸੀਂ ਮਿਆਰਾਂ ਦਾ ਅਧਿਐਨ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਹੈ ਅਤੇ ਮਾਹਰ ਸਿੱਖਿਅਤ ਬਣਨ ਵੱਲ ਵਧ ਰਹੇ ਹੋ',
  'student-first-experience.explanatory.not-started.title': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'student-first-experience.explanatory.not-started.desc':
    'ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਕੋਈ ਸਬੂਤ ਨਹੀਂ ਹੈ ਅਤੇ ਤੁਸੀਂ ਅਜੇ ਵੀ ਮਿਆਰਾਂ ਦਾ ਅਧਿਐਨ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰਨਾ ਹੈ',
  'student-first-experience.competency-level-partial.desc1':
    'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ ਹੋ',
  'student-first-experience.competency-level-partial.desc2':
    'ਮੈਥ ਲਈ ਤੁਹਾਡੀ ਸਕਾਈਲਾਈਨ ਨਕਸ਼ੇ ਤੇ ਸਵਾਗਤ ਕਰੋ. ਸਕਾਈਲਾਈਨ (ਮੋਟਾ ਚਿੱਟਾ ਲਾਈਨ) ਉਸ ਉੱਚਤਮ ਪੱਧਰ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ ਜਿਸ ਨੂੰ ਤੁਸੀਂ ਹਰ ਡੋਮੇਨ ਵਿੱਚ ਹਾਸਿਲ ਕੀਤਾ ਹੈ. ਇੱਕ ਡੋਮੇਨ ਗਣਿਤ ਦਾ ਖੇਤਰ ਹੈ ਜੋ ਤੁਸੀਂ ਪੜਦੇ ਹੋ, ਜਿਵੇਂ ਕਿ ਨੰਬਰ ਸਿਸਟਮ ਅਤੇ ਸਮੀਕਰਨ ਅਤੇ ਸਮੀਕਰਨਾਂ. ਹਰੇਕ ਕਾਲਮ ਇੱਕ ਗਣਿਤ ਡੋਮੇਨ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ. ਅਤੇ ਕਾਲਮ ਵਿਚ ਹਰੇਕ ਬਕਸੇ ਡੋਮੇਨ ਵਿਚ ਮਿਆਰੀ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ. ਇਕ ਵਾਰ ਜਦੋਂ ਤੁਸੀਂ ਮਿਆਰਾਂ ਨੂੰ ਸਿਖਣਾ ਅਤੇ ਮੁਹਾਰਤ ਸ਼ੁਰੂ ਕਰਦੇ ਹੋ, ਤਾਂ ਤੁਹਾਡੀ ਸਕਾਈਲੀਨ ਲਗਾਤਾਰ ਵਧਦੀ ਰਹੇਗੀ.',
  'student-first-experience.competency-level-partial.desc3':
    'As you master each of the competencies, the corresponding box is updated to dark blue.',
  'student-first-experience.competency-level-partial.desc4':
    'The skyline is the thick white line that shows the highest competencies that you have mastered in each math domain.',
  'student-first-experience.competency-level-partial.desc5':
    'If the skyline is at the bottom of a domain, it means the system needs more information to be able to locate you in that topic. As soon as you start on the lessons and check for understandings, your skyline will bump up and update your proficiency in each domain.',
  'student-first-experience.units.other': '{{ਗਿਣਤੀ}} ਇਕਾਈਆਂ',
  'player.gru-navigation.view-report': 'ਰਿਪੋਰਟ ਵੇਖੋ',
  'player.gru-navigator.see-usage-report': 'ਉਪਯੋਗ ਦੀ ਰਿਪੋਰਟ ਵੇਖੋ',
  'player.gru-viewer.not-iframe-url.header_1':
    'ਇਸ ਸਰੋਤ ਨੂੰ ਗੂਰੂ ਅੰਦਰ ਨਹੀਂ ਵੇਖਿਆ ਜਾ ਸਕਦਾ',
  'player.gru-viewer.not-iframe-url.header_external_assessment_1':
    'ਇਹ ਮੁਲਾਂਕਣ ਗੋੂਰੂ ਦੇ ਅੰਦਰ ਨਹੀਂ ਦੇਖਿਆ ਜਾ ਸਕਦਾ.',
  'player.gru-viewer.not-iframe-url.header_2':
    'ਇੱਕ ਨਵੇਂ ਟੈਬ ਵਿੱਚ ਸਰੋਤ ਨੂੰ ਖੋਲਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ ਤੇ ਕਲਿਕ ਕਰੋ.',
  'player.gru-viewer.not-iframe-url.view-resource': 'ਸਰੋਤ ਵੇਖੋ',
  'player.gru-viewer.not-iframe-url.https_external':
    'ਇਸ ਲਿੰਕ ਨੂੰ ਗੂਰੂ ਵਿਚ ਨਹੀਂ ਦੇਖਿਆ ਜਾ ਸਕਦਾ.',
  'player.gru-viewer.not-iframe-url.https_new_tab':
    'ਇੱਕ ਨਵੀਂ ਟੈਬ ਵਿੱਚ ਇਸਨੂੰ ਖੋਲਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਲਿੰਕ ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'player.gru-viewer.not-iframe-url.footer_1':
    'ਮੈਂ ਇਹ ਖਾਲੀ ਪੇਜ ਕਿਉਂ ਦੇਖ ਰਿਹਾ ਹਾਂ?',
  'player.gru-viewer.not-iframe-url.footer_2':
    'ਗੌੜੂ ਵਿਚ ਸ਼ਾਮਿਲ ਕੀਤੇ ਗਏ ਸਰੋਤ ਹਜ਼ਾਰਾਂ ਵੱਖੋ ਵੱਖਰੇ ਪ੍ਰਕਾਸ਼ਕਾਂ ਤੋਂ ਆਉਂਦੇ ਹਨ ਜੋ',
  'player.gru-viewer.not-iframe-url.footer_3':
    'ਉਨ੍ਹਾਂ ਦੀ ਸਮੱਗਰੀ ਬਣਾਉ ਅਤੇ ਸਾਂਝਾ ਕਰੋ. ਵਸੀਲਿਆਂ ਦੇ ਕਈ ਤਰ੍ਹਾਂ ਦੀਆਂ ਵਿਵਸਥਾਵਾਂ ਹਨ, ਸਮੇਤ',
  'player.gru-viewer.not-iframe-url.footer_4':
    'ਲੋੜਾਂ ਜੋ ਤੁਹਾਨੂੰ ਸਮੱਗਰੀ ਨੂੰ ਵੇਖਣ ਲਈ ਦੂਜੇ ਪੰਨੇ ਤੇ ਲੈ ਜਾਂਦੇ ਹਨ.',
  'grading-player.answer': 'ਜਮ੍ਹਾਂ ਕਰਵਾਏ ਕਾਰਜ',
  'grading-player.back-to': 'ਵਾਪਸ',
  'grading-player.current-response': 'ਮੌਜੂਦਾ ਜਵਾਬ',
  'grading-player.full-rubric': 'ਪੂਰੇ ਖਰੜੇ',
  'grading-player.grading': 'ਗਰੇਡਿੰਗ',
  'grading-player.level': 'ਪੱਧਰ',
  'grading-player.roster': 'ਰੋਸਟਰ',
  'grading-player.rubric': 'ਚਿੰਨ੍ਹ',
  'grading-player.submitted-time': 'ਜਮ੍ਹਾਂ ਕਰਨ ਦਾ ਸਮਾਂ',
  'grading-player.points': 'ਅੰਕ',
  'grading-player.prompt': 'ਕੰਮ ਪ੍ਰੋਂਪਟ',
  'grading-player.overall-comment': 'ਸਮੁੱਚੀ ਟਿੱਪਣੀ',
  'grading-player.overall-lead':
    'ਸੰਪੂਰਨ ਤੌਰ ਤੇ ਲੇਖ ਤੇ ਤੁਹਾਡਾ ਪ੍ਰਤੀਕਰਮ ਦਾ ਸਾਰ ਕੱਢੋ.',
  'grading-player.time-spent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'grading-player.total-score': 'ਕੁੱਲ ਸਕੋਰ',
  'grading-player.student-roster.title': 'ਵਿਦਿਆਰਥੀ ਸੂਚੀ',
  'grading-player.student-roster.lead': 'ਨੇ ਇਸ ਸਵਾਲ ਦਾ ਜਵਾਬ ਦਿੱਤਾ ਹੈ',
  'grading-player.rubric-panel.previous': 'ਪਿਛਲੇ ਵਿਦਿਆਰਥੀ',
  'grading-player.rubric-panel.next': 'ਅਗਲੇ ਵਿਦਿਆਰਥੀ',
  'grading-player.rubric-panel.total-score': 'ਕੁੱਲ ਸਕੋਰ',
  'grading-player.rubric-panel.points': '({{total}} pts)',
  'profile.gru-navigation.about': 'ਬਾਰੇ',
  'profile.gru-navigation.about-me': 'ਮੇਰੇ ਬਾਰੇ ਵਿੱਚ',
  'profile.gru-navigation.content': 'ਸਮੱਗਰੀ',
  'profile.gru-navigation.followers': 'ਚੇਲੇ',
  'profile.gru-navigation.library': 'ਲਾਇਬਰੇਰੀ',
  'profile.gru-navigation.my-content': 'ਮੇਰੀ ਸਮੱਗਰੀ',
  'profile.gru-navigation.following': 'ਹੇਠ ਦਿੱਤੇ',
  'profile.gru-navigation.proficiency': 'ਮੁਹਾਰਤ',
  'profile.gru-navigation.preference.preference': 'ਤਰਜੀਹ',
  'profile.edit.select-district': 'ਇੱਕ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ ...',
  'profile.proficiency.is-empty':
    'ਕੋਈ ਡਾਟਾ ਅਜੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ ਇਕ ਵਾਰ ਅਧਿਐਨ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਹਾਡਾ ਡਾਟਾ ਉਪਲਬਧ ਹੋ ਜਾਵੇਗਾ',
  'profile.proficiency.expand-chart': 'ਚਾਰਟ ਦਾ ਵਿਸਤਾਰ ਕਰੋ',
  'profile.proficiency.mastered': 'ਮਾਹਰ',
  'profile.proficiency.in-progress': 'ਤਰੱਕੀ ਹੋ ਰਹੀ ਹੈ',
  'profile.proficiency.not-started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'profile.proficiency.skyline': 'ਸਕਾਈਲਾਈਨ',
  'profile.proficiency.baseline': 'ਬੇਸਲਾਈਨ',
  'profile.proficiency.grade-line': 'ਗ੍ਰੇਡ ਲਾਈਨ',
  'profile.proficiency.not-tagged':
    'ਕਲਾਸ ਦੇ ਕਿਸੇ ਵੀ ਕੋਰਸ ਨੂੰ ਨਿਰਧਾਰਤ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ ਜਾਂ ਕੋਰਸ ਕਿਸੇ ਯੋਗ ਵਿਸ਼ਾ ਜਾਂ ਮਿਆਰਾਂ ਲਈ ਨਹੀਂ ਟੈਗ ਕੀਤਾ ਗਿਆ ਹੈ.',
  'profile.proficiency.show-compressed-chart': 'ਕੰਪਰੈੱਸਡ ਚਾਰਟ ਦਿਖਾਓ',
  'profile.proficiency.show-expanded-chart': 'ਫੈਲਾਇਆ ਚਾਰਟ ਦਿਖਾਓ',
  'profile.preference.language-preference': 'ਭਾਸ਼ਾ ਪਸੰਦ',
  'profile.preference.choose-language': 'ਭਾਸ਼ਾ ਚੁਣੋ',
  'profile.preference.choose-sec-language': 'ਚੁਣੋ',
  'profile.preference.choose-preferred-language':
    'ਪ੍ਰਾਇਮਰੀ ਪ੍ਰੋਫਾਈਲ ਭਾਸ਼ਾ ਚੁਣੋ',
  'profile.preference.choose-preferred-other-languages':
    'ਹੋਰ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾਵਾਂ ਚੁਣੋ',
  'profile.preference.language': 'ਭਾਸ਼ਾ',
  'profile.preference.select-category-label': 'ਇੱਕ ਨਵੀਂ ਸ਼੍ਰੇਣੀ ਜੋੜੋ',
  'profile.preference.choose-category': 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
  'profile.preference.no-data': 'ਕੋਈ ਡਾਟਾ ਨਹੀਂ',
  'profile.preference.category-preference': 'ਸ਼੍ਰੇਣੀ ਪਸੰਦ',
  'profile.preference.choose-subject': 'ਵਿਸ਼ਾ ਚੁਣੋ',
  'profile.preference.choose-fwk': 'ਫਰੇਮਵਰਕ ਚੁਣੋ',
  'profile.preference.add-subject': 'ਵਿਸ਼ਾ ਜੋੜੋ',
  'profile.preference.add-sec-language': 'ਹੋਰ ਤਰਜੀਹੀ ਭਾਸ਼ਾ ਸ਼ਾਮਲ ਕਰੋ',
  'profile.preference.other-preferred-languages': 'ਹੋਰ ਤਰਜੀਹੀ ਭਾਸ਼ਾਵਾਂ',
  'gru-data-picker.score': 'ਸਕੋਰ',
  'gru-data-picker.report': 'ਰਿਪੋਰਟ',
  'gru-data-picker.completion': 'ਮੁਕੰਮਲ',
  'gru-data-picker.timeSpent': 'ਸਮਾਂ',
  'gru-data-picker.time-spent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'gru-data-picker.study-time': 'ਸਟੱਡੀ ਟਾਈਮ',
  'gru-data-picker.reaction': 'ਪ੍ਰਤੀਕਰਮ',
  'gru-data-picker.attempts': 'ਕੋਸ਼ਿਸ਼',
  'gru-performance-summary.title': 'ਟਾਈਟਲ',
  'gru-performance-summary.scores': 'ਸਕੋਰ',
  'gru-performance-summary.completion': 'ਮੁਕੰਮਲ',
  'gru-performance-summary.time-spent': 'ਕੁੱਲ ਸਮਾਂ',
  'gru-performance-summary.reaction': 'ਪ੍ਰਤੀਕਰਮ',
  'gru-performance-summary.attempts': 'ਕੋਸ਼ਿਸ਼ਾਂ',
  'gru-performance-summary.redo': 'ਤਿਆਰ',
  'gru-performance-summary.resume': 'ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ',
  'gru-performance-summary.study': 'ਹੁਣ ਪੜ੍ਹਾਈ',
  'gru-performance-summary.view-report': 'ਰਿਪੋਰਟ ਵੇਖੋ',
  'gru-performance-summary.not-applicable': 'n / a',
  'gru-performance-summary.not-started': 'ਅਜੇ ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'gru-performance.no-content': 'ਕੋਈ ਵੀ ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
  'gru-performance-metrics.assessment': 'ਮੁਲਾਂਕਣ',
  'gru-performance-metrics.collection': 'ਸੰਗ੍ਰਹਿ',
  'gru-performance-metrics.completion': 'ਮੁਕੰਮਲ',
  'gru-performance-metrics.report': 'ਰਿਪੋਰਟ',
  'gru-performance-metrics.student': 'ਵਿਦਿਆਰਥੀ',
  'gru-performance-metrics.score': 'ਸਕੋਰ',
  'gru-performance-metrics.study-time': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'gru-metrics-sub-header.assessment': 'ਮੁਲਾਂਕਣ',
  'gru-metrics-sub-header.student': 'ਵਿਦਿਆਰਥੀ',
  'gru-metrics-sub-header.score': 'ਸਕੋਰ',
  'gru-metrics-sub-header.report': 'ਰਿਪੋਰਟ',
  'gru-metrics-sub-header.completion': 'ਮੁਕੰਮਲ',
  'gru-metrics-sub-header.time-spent': 'ਸਮਾਂ',
  'gru-resource-new.resource-already-exist':
    'ਇਹ ਸਰੋਤ ਪਹਿਲਾਂ ਹੀ ਗੂਰੂ ਵਿੱਚ ਮੌਜੂਦ ਹੈ!',
  'gru-assessment-report.gru-summary.total-time-spent': 'ਕੁੱਲ ਸਮਾਂ ਬਿਤਾਇਆ',
  'gru-assessment-report.hidden-report':
    'ਤੁਹਾਡੇ ਅਧਿਆਪਕ ਨੇ ਇਸ ਮੁਲਾਂਕਣ ਲਈ ਤੁਹਾਡੀ ਸੰਖੇਪ ਰਿਪੋਰਟ ਨੂੰ ਲੁਕਾਉਣ ਲਈ ਚੁਣਿਆ ਹੈ.',
  'cards.gru-class-card.student.zero': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-class-card.student.one': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-class-card.student.other': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-class-card.student.not-started': 'ਸ਼ੁਰੂ ਨਹੀਂ ਹੋਇਆ',
  'cards.gru-class-card.unit.zero': 'ਕੋਈ ਕੋਰਸ ਨਹੀਂ',
  'cards.gru-class-card.unit.one': '{{ਗਿਣਤੀ}} ਇਕਾਈ',
  'cards.gru-class-card.unit.other': '{{ਗਿਣਤੀ}} ਇਕਾਈਆਂ',
  'cards.gru-class-card.archived.request-report':
    'ਇਸ ਕਲਾਸ ਨੂੰ ਪੁਰਾਲੇਖ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਇਸ ਨੂੰ ਸੋਧਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ. ਮੌਜੂਦਾ ਕਲਾਸ ਡੇਟਾ ਨੂੰ ਰਿਪੋਰਟ ਰਾਹੀਂ ਪਹੁੰਚਿਆ ਜਾ ਸਕਦਾ ਹੈ',
  'cards.gru-class-card.archived.report-in-progress':
    'ਰਿਪੋਰਟ ਤਿਆਰ ਕਰਨ ਵਿੱਚ 20 ਮਿੰਟ ਲੱਗ ਸਕਦੇ ਹਨ ਵਾਪਸ ਚੈੱਕ ਕਰੋ.',
  'cards.gru-class-card.archived.download-report':
    'ਇਸ ਕਲਾਸ ਲਈ ਆਪਣਾ ਡੇਟਾ ਡਾਊਨਲੋਡ ਕਰੋ',
  'cards.gru-class-card.archived.no-report-available':
    'ਇਸ ਕਲਾਸ ਵਿੱਚ ਕੋਈ ਨਿਰਧਾਰਤ ਕੋਰਸ ਸਮੱਗਰੀ ਨਹੀਂ ਹੈ',
  'cards.gru-course-card.in': 'ਵਿੱਚ',
  'cards.gru-course-card.units.zero': '{{ਗਿਣਤੀ}} ਇਕਾਈਆਂ',
  'cards.gru-course-card.units.one': '{{ਗਿਣਤੀ}} ਇਕਾਈ',
  'cards.gru-course-card.units.other': '{{ਗਿਣਤੀ}} ਇਕਾਈਆਂ',
  'cards.gru-course-card.resource.zero': '{{count}} ਸਰੋਤ',
  'cards.gru-course-card.resource.one': '{{count}} ਸਰੋਤ',
  'cards.gru-course-card.resource.other': '{{count}} ਸਰੋਤ',
  'cards.gru-course-card.and': 'ਅਤੇ',
  'cards.gru-course-card.question.zero': '{{count}} ਪ੍ਰਸ਼ਨ',
  'cards.gru-course-card.question.one': '{{count}} ਪ੍ਰਸ਼ਨ',
  'cards.gru-course-card.question.other': '{{count}} ਪ੍ਰਸ਼ਨ',
  'cards.gru-course-card.start-studying': 'ਪੜ੍ਹਾਈ ਸ਼ੁਰੂ ਕਰੋ',
  'cards.gru-collection-card.courses.zero': '{{count}} ਕੋਰਸ',
  'cards.gru-collection-card.courses.one': '{{ਗਿਣਤੀ}} ਕੋਰਸ',
  'cards.gru-collection-card.courses.other': '{{count}} ਕੋਰਸ',
  'cards.gru-collection-card.students.zero': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-collection-card.students.one': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-collection-card.students.other': '{{ਗਿਣਤੀ}} ਵਿਦਿਆਰਥੀ',
  'cards.gru-collection-card.collections.one': '{{count}} ਸੰਗ੍ਰਹਿ',
  'cards.gru-collection-card.collections.other': '{{count}} ਸੰਗ੍ਰਹਿ',
  'cards.gru-collection-card.assessments.one': '{{count}} ਮੁਲਾਂਕਣ',
  'cards.gru-collection-card.assessments.other': '{{count}} ਮੁਲਾਂਕਣ',
  'cards.gru-collection-card.classrooms.zero': '{{count}} ਕਲਾਸਰੂਮ',
  'cards.gru-collection-card.classrooms.one': '{{count}} ਕਲਾਸਰੂਮ ਵਿੱਚ',
  'cards.gru-collection-card.classrooms.other': '{{count}} ਕਲਾਸਰੂਮ',
  'cards.gru-resource-card.add': 'ਨਾਲ ਜੋੜ ਦਿਓ',
  'cards.gru-resource-result-card.skipped': 'ਛੱਡਿਆ',
  'cards.gru-profile-card.followers': 'ਚੇਲੇ',
  'cards.gru-profile-card.following': 'ਹੇਠ ਦਿੱਤੇ',
  'cards.gru-user-network-card.follow': 'ਫਾਲੋ',
  'reports.gru-table-view.first-tier-header-prefix': 'q',
  'reports.gru-table-view.student': 'ਵਿਦਿਆਰਥੀ',
  'reports.gru-table-view.reaction': 'ਪ੍ਰਤੀਕਰਮ',
  'reports.gru-table-view.reactions': 'ਪ੍ਰਤੀਕਰਮ',
  'reports.gru-table-view.score': 'ਸਕੋਰ',
  'reports.gru-table-view.scores': 'ਸਕੋਰ',
  'reports.gru-table-view.study-time': 'ਸਟੱਡੀ ਟਾਈਮ',
  'reports.gru-table-view.time': 'ਸਮਾਂ',
  'reports.gru-table-view.time-spent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'reports.gru-table-view.totals': 'ਕੁੱਲ',
  'gru-emotion-picker.react-to-resource': 'ਇਸ ਸਰੋਤ ਤੇ ਪ੍ਰਤੀਕਿਰਿਆ ਕਰੋ',
  'home.no-classes-found.create-class.title': 'ਗੋਰੂ ਕਲਾਸਰੂਮ ਦੇ ਨਾਲ ਸਿਖਾਓ',
  'home.no-classes-found.create-class.description':
    'ਕਲਾਸਰੂਮ ਤਿਆਰ ਕੀਤੀ, ਸਮਗਰੀ ਨੂੰ ਨਿਯਤ ਕਰੋ, ਅਤੇ ਵਿਦਿਆਰਥੀ ਨੂੰ ਸੱਦਾ ਦਿਓ',
  'home.no-classes-found.create-class.button-text': 'ਕਲਾਸਰੂਮ ਬਣਾਓ',
  'home.no-classes-found.join-class.title': 'ਗੋਰੂ ਕਲਾਸਰੂਮ ਨਾਲ ਸਿੱਖੋ',
  'home.no-classes-found.join-class.description':
    'ਸਿੱਖਣ ਨੂੰ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣੇ ਅਧਿਆਪਕ ਦੀ ਕਲਾਸ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋਵੋ',
  'home.no-classes-found.join-class.button-text': 'ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕਰੋ',
  'home.no-classes-found.featured-courses.title': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'home.no-classes-found.featured-courses.description':
    'ਗਣਿਤ, ਵਿਗਿਆਨ, ਸਮਾਜਿਕ ਅਧਿਐਨ ਅਤੇ ਏਲਾ ਕੋਰਸਾਂ ਨੂੰ ਬ੍ਰਾਉਜ਼ ਕਰੋ.',
  'home.no-classes-found.featured-courses.button-text':
    'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'home.no-classes-found.teacher-toolkit.title': 'ਅਧਿਆਪਕ ਟੂਲਕਿਟ',
  'home.no-classes-found.teacher-toolkit.description':
    'ਇਸ ਟੂਲਕਿੱਟ ਵਿੱਚ ਸ਼ੁਰੂਆਤ ਕਰਨ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਸਰੋਤ ਹਨ.',
  'home.no-classes-found.teacher-toolkit.button-text': 'ਅਧਿਆਪਕ ਟੂਲਕਿਟ',
  'taxonomy.grades': 'Grades',
  'taxonomy.gru-taxonomy-selector.add-secondary': 'ਸੈਕੰਡਰੀ ਜੋੜੋ',
  'taxonomy.gru-taxonomy-selector.choose-subject': 'ਵਿਸ਼ਾ ਚੁਣੋ',
  'taxonomy.gru-taxonomy-selector.competency-subject-and-course':
    'ਕੁਸ਼ਲਤਾ ਢਾਂਚਾ ਅਤੇ ਕੋਰਸ',
  'taxonomy.gru-taxonomy-selector.primary-subject-and-course':
    'ਮਾਪਦੰਡ ਫਰੇਮਵਰਕ ਅਤੇ ਕੋਰਸ',
  'validations.unsavedChanges':
    'ਤੁਹਾਡੇ ਬਦਲਾਵ ਅਜੇ ਵੀ ਸੁਰੱਖਿਅਤ ਨਹੀਂ ਕੀਤੇ ਗਏ. ਕੀ ਤੁਸੀਂ ਇਸ ਪੰਨੇ ਨੂੰ ਛੱਡਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'featured.featured-title': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'featured.featured-description':
    'ਵਿਸ਼ੇਸ਼ ਸਿਖਲਾਈ ਕੋਰਸ ਨਵੀਨਤਾਕਾਰੀ ਅਧਿਆਪਕਾਂ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਹੈ, ਸਮੱਗਰੀ ਵਿਸ਼ਾ ਮਾਹਿਰਾਂ ਦੁਆਰਾ ਸਮੀਖਿਆ ਕੀਤੀ ਅਤੇ ਸਮੀਖਿਆ ਕੀਤੀ ਗਈ ਹੈ, ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਾਲ ਕਲਾਸਾਂ ਵਿੱਚ ਲਾਗੂ ਕੀਤਾ ਗਿਆ ਹੈ. ਸਿੱਖਣ ਨੂੰ ਨਿਜੀ ਬਣਾਉਣ ਅਤੇ ਵਿਦਿਆਰਥੀ ਦੀ ਸ਼ਮੂਲੀਅਤ ਨੂੰ ਵਧਾਉਣ ਲਈ ਕੋਰਸ ਦੀ ਖੋਜ, ਰੀਮਿਕਸ ਅਤੇ ਅਨੁਕੂਲਿਤ ਕਰੋ! [1] ਇਹਨਾਂ ਕੋਰਸਾਂ ਦੇ ਵਿਕਾਸ ਬਾਰੇ ਹੋਰ [2] ਸਿੱਖੋ.',
  'locateme.score': 'ਸਕੋਰ',
  'locateme.timespent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'locateme.view': 'ਝਲਕ',
  'locateme.attempt': 'ਕੋਸ਼ਿਸ਼',
  'locateme.lastAcessesed': 'ਆਖਰੀ ਪਹੁੰਚ ਕੀਤੀ',
  'taxonomy.modals.gru-domain-picker.browseSelectorText':
    'ਇਸ ਇਕਾਈ ਨੂੰ ਕਿਹੜਾ ਡੋਮੈਨਸ ਕਵਰ ਕਰੇਗਾ?',
  'taxonomy.modals.gru-domain-picker.selectedText.zero':
    '{{count}} ਡੋਮੇਨ ਚੁਣੇ ਗਏ',
  'taxonomy.modals.gru-domain-picker.selectedText.one':
    '{{count}} ਡੋਮੇਨ ਚੁਣੇ ਗਏ',
  'taxonomy.modals.gru-domain-picker.selectedText.other':
    '{{count}} ਡੋਮੇਨ ਚੁਣੇ ਗਏ',
  'taxonomy.modals.gru-domain-picker.shortcutText': 'ਕੋਰਸ ਇਸ ਵਿੱਚ ਹੈ',
  'taxonomy.modals.gru-standard-picker.browseSelectorText':
    'ਕਿਹੜੇ ਮਿਆਰ ਵਰਤੇ ਜਾਣਗੇ?',
  'taxonomy.modals.gru-standard-picker.browseCompetencySelectorText':
    'ਕੀ ਕੁਸ਼ਲਤਾ ਨੂੰ ਕਵਰ ਕੀਤਾ ਜਾਵੇਗਾ?',
  'taxonomy.modals.gru-standard-picker.selectedText.zero':
    '{{count}} ਮਾਨਕ ਚੁਣੇ ਗਏ ਹਨ',
  'taxonomy.modals.gru-standard-picker.selectedText.one':
    '{{count}} ਚੁਣਿਆ ਗਿਆ ਸਟੈਂਡਰਡ',
  'taxonomy.modals.gru-standard-picker.selectedText.other':
    '{{count}} ਮਾਨਕ ਚੁਣੇ ਗਏ ਹਨ',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.zero':
    '{{count}} ਚੁਣੀਆਂ ਗਈਆਂ ਚੁਣੌਤੀਆਂ',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.one':
    '{{count}} ਯੋਗਤਾ ਚੁਣੀ ਗਈ',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.other':
    '{{count}} ਚੁਣੀਆਂ ਗਈਆਂ ਚੁਣੌਤੀਆਂ',
  'taxonomy.modals.gru-standard-picker.shortcutText':
    'ਇਕਾਈ ਨੂੰ ਟੈਗ ਕੀਤਾ ਗਿਆ ਹੈ',
  'account-settings.title': 'ਖਾਤਾ ਯੋਜਨਾ',
  'account-settings.account-info': 'ਖਾਤਾ ਜਾਣਕਾਰੀ',
  'account-settings.private-info': 'ਪ੍ਰਾਈਵੇਟ ਜਾਣਕਾਰੀ',
  'account-settings.email-address': 'ਈਮੇਲ ਖਾਤਾ',
  'account-settings.gender': 'ਲਿੰਗ',
  'account-settings.birthday': 'ਜਨਮਦਿਨ',
  'gru-rich-text-editor.bold': 'ਬੋਲਡ',
  'gru-rich-text-editor.expression': 'ਸਮੀਕਰਨ',
  'gru-rich-text-editor.italic': 'ਤਿਰਛੀ',
  'gru-rich-text-editor.subscript': 'ਸਬਸਕਰਿਪਟ',
  'gru-rich-text-editor.superscript': 'ਉਪਸਿਰਲੇਖ',
  'gru-rich-text-editor.underline': 'ਹੇਠਾਂ ਰੇਖਾ ਖਿੱਚੋ',
  'gru-rich-text-editor.bullets': 'ਗੋਲੀਆਂ',
  'gru-rich-text-editor.expressions-panel.tabs.calculus': 'ਕਲਕੂਲਸ',
  'gru-rich-text-editor.expressions-panel.tabs.greek-letters': 'ਯੂਨਾਨੀ ਅੱਖਰ',
  'gru-rich-text-editor.expressions-panel.tabs.layout': 'ਖਾਕਾ',
  'gru-rich-text-editor.expressions-panel.tabs.relation': 'ਸਬੰਧ',
  'gru-rich-text-editor.expressions-panel.tabs.set-theory': 'ਸੈਟ ਥਿਊਰੀ',
  'gru-rich-text-editor.expressions-panel.tabs.symbols': 'ਚਿੰਨ੍ਹ',
  'gru-rich-text-editor.expressions-panel.tabs.trigonometry': 'ਤਿਕੋਨੋਮੈਟਰੀ',
  'gru-rich-text-editor.expressions-panel.insert-expression': 'ਸੰਮਿਲਿਤ ਕਰੋ',
  'gru-rich-text-editor.expressions-panel.update-expression': 'ਅਪਡੇਟ ਕਰੋ',
  'gru-rich-text-editor.expressions-panel.create-expression': 'ਸਮੀਕਰਨ ਬਣਾਓ',
  'gru-settings-edit.answerkey-attempts': 'ਜਵਾਬ ਅਤੇ ਕੋਸ਼ਿਸ਼ਾਂ ਦਾ ਜਵਾਬ',
  'gru-settings-edit.answer-key':
    'ਵਿਦਿਆਰਥੀ ਅੰਤ ਵਿੱਚ ਜਵਾਬ ਕੁੰਜੀ ਨੂੰ ਵੇਖ ਸਕਦੇ ਹਨ',
  'gru-settings-edit.attempts': 'ਕੋਸ਼ਿਸ਼ਾਂ',
  'gru-settings-edit.attempts-unlimited': 'ਬੇਅੰਤ',
  'gru-settings-edit.backwards': 'ਵਿਦਿਆਰਥੀ ਪਿੱਛੇ ਪਿੱਛੇ ਜਾ ਕੇ ਜਵਾਬ ਬਦਲ ਸਕਦੇ ਹਨ',
  'gru-settings-edit.feedback': 'ਵਿਦਿਆਰਥੀ ਦੇਖਦੇ ਹਨ ਕਿ ਉਹ ਸਹੀ / ਗਲਤ ਹਨ',
  'gru-settings-edit.feedback-immediate': 'ਪ੍ਰਤੀ ਸਵਾਲ ਅਤੇ ਅੰਤ ਵਿੱਚ',
  'gru-settings-edit.feedback-never': 'ਕਦੇ ਨਹੀਂ',
  'gru-settings-edit.feedback-summary': 'ਅੰਤ ਵਿੱਚ',
  'gru-settings-edit.navigation-scoring': 'ਨੇਵੀਗੇਸ਼ਨ ਅਤੇ ਸਕੋਰਿੰਗ',
  'gru-settings-edit.disable-heading': 'ਕੋਰਸ ਮੈਪ ਵਿਚ ਮੁਲਾਂਕਣ ਨੂੰ ਐਕਟੀਵੇਟ ਕਰੋ',
  'gru-settings-edit.disable-legend':
    'ਵਿਦਿਆਰਥੀ ਆਪਣੇ ਕੋਰਸ ਮੈਪ ਤੋਂ ਮੁਲਾਂਕਣ ਕਰ ਸਕਦੇ ਹਨ',
  'gru-icon-popover.settings-visibility-title': 'ਆਪਣੀ ਸਮਗਰੀ ਨੂੰ ਦ੍ਰਿਸ਼ਮਾਨ ਬਣਾਓ',
  'gru-icon-popover.settings-visibility-content':
    'ਇਹ ਸੈਟਿੰਗ ਤੁਹਾਡੇ ਉਪਭੋਗਤਾ ਪ੍ਰੋਫਾਈਲ ਰਾਹੀਂ ਤੁਹਾਡੀ ਸਮਗਰੀ ਨੂੰ ਦ੍ਰਿਸ਼ਮਾਨ ਬਣਾਉਂਦੀ ਹੈ. ਜੇ ਤੁਸੀਂ ਕੋਰਸਾਂ, ਸੰਗ੍ਰਹਿ, ਮੁਲਾਂਕਣ, ਵਸੀਲੇ, ਅਤੇ / ਜਾਂ ਤੁਹਾਡੇ ਸਹਿਕਰਮੀਆਂ ਨਾਲ ਜੁੜੇ ਸਵਾਲਾਂ ਨੂੰ ਸਾਂਝਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ, ਤਾਂ ਅਸੀਂ ਸੁਝਾਉਂਦੇ ਹਾਂ ਕਿ ਤੁਸੀਂ ਇਸ ਵਿਸ਼ੇਸ਼ਤਾ ਨੂੰ ਚਾਲੂ ਕਰਦੇ ਹੋ.',
  'gru-take-tour.text': 'ਟੂਰ',
  'gru-take-tour.teacher-home.stepOne.title': 'ਇੱਕ ਟੂਰ ਲਓ',
  'gru-take-tour.teacher-home.stepOne.description':
    'ਟੂਰ ਅਤੇ ਆਪਣੇ ਹੋਮਪੇਜ ਲੈਣ ਲਈ ਸਵਾਗਤ ਕਰੋ! ਹੁਣ ਸ਼ੁਰੂ ਕਰੀਏ!',
  'gru-take-tour.teacher-home.stepTwo.title': 'ਲੋਗੋ',
  'gru-take-tour.teacher-home.stepTwo.description':
    'ਲੋਗੋ ਤੇ ਕਲਿੱਕ ਕਰਨ ਤੋਂ ਬਾਅਦ ਤੁਸੀਂ ਆਪਣੇ ਹੋਮਪੇਜ ਤੇ ਵਾਪਸ ਆਉਂਦੇ ਹੋ.',
  'gru-take-tour.teacher-home.stepThree.title': 'ਖੋਜ ਬਾਰ',
  'gru-take-tour.teacher-home.stepThree.description':
    'ਉਹਨਾਂ ਵਿਸ਼ਿਆਂ ਲਈ ਸਾਡੀ ਸਮੱਗਰੀ ਸੂਚੀ ਨੂੰ ਲੱਭੋ ਜੋ ਤੁਹਾਡੇ ਲਈ ਦਿਲਚਸਪ ਹਨ.',
  'gru-take-tour.teacher-home.stepFour.title': 'ਕਲਾਸਰੂਮ',
  'gru-take-tour.teacher-home.stepFour.description': 'ਆਪਣੇ ਹੋਮਪੇਜ ਤੇ ਵਾਪਸ ਜਾਉ.',
  'gru-take-tour.teacher-home.stepFive.title': 'ਸਮੱਗਰੀ ਮੈਨੇਜਰ',
  'gru-take-tour.teacher-home.stepFive.description':
    'ਤੁਹਾਡੀ ਸਮੱਗਰੀ ਨੂੰ ਬਣਾਉਣ ਅਤੇ ਐਕਸੈਸ ਕਰਨ ਲਈ ਤੁਰੰਤ ਲਿੰਕ.',
  'gru-take-tour.teacher-home.stepSix.title': 'ਲਾਇਬਰੇਰੀ',
  'gru-take-tour.teacher-home.stepSix.description': 'ਸਾਡੇ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਵੇਖੋ',
  'gru-take-tour.teacher-home.stepSeven.title': 'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ',
  'gru-take-tour.teacher-home.stepSeven.description':
    'ਆਪਣੀ ਸਮਗਰੀ, ਉਪਭੋਗਤਾ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਸੈਟਿੰਗਜ਼ ਨੂੰ ਐਕਸੈਸ ਅਤੇ ਅਪਡੇਟ ਕਰੋ.',
  'gru-take-tour.teacher-home.stepEight.title': 'ਸਹਿਯੋਗ',
  'gru-take-tour.teacher-home.stepEight.description':
    'ਸਹਾਇਤਾ ਕੇਂਦਰ ਜਾਂ ਲਾਗਆਉਟ ਤਕ ਪਹੁੰਚ',
  'gru-take-tour.teacher-home.stepNine.title': 'ਕਲਾਸਰੂਮ',
  'gru-take-tour.teacher-home.stepNine.description':
    'ਉਹਨਾਂ ਕਲਾਸਾਂ ਦੀ ਇੱਕ ਸੂਚੀ ਵੇਖੋ ਜੋ ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਸਿਖਾ ਰਹੇ ਹੋ',
  'gru-take-tour.teacher-home.stepTen.title': 'ਆਰਕਾਈਵਡ ਕਲਾਸਾਂ',
  'gru-take-tour.teacher-home.stepTen.description':
    'ਉਹਨਾਂ ਕਲਾਸਾਂ ਦੀ ਇੱਕ ਸੂਚੀ ਵੇਖੋ ਜੋ ਤੁਸੀਂ ਪਿਛਲੇ ਸਮੇਂ ਵਿੱਚ ਸਿਖਾਈ ਸੀ.',
  'gru-take-tour.teacher-home.stepEleven.title': 'ਕਲਾਸਰੂਮ ਬਣਾਓ',
  'gru-take-tour.teacher-home.stepEleven.description':
    'ਆਪਣੇ ਕਲਾਸਰੂਮ ਨੂੰ ਨਾਮ ਦਿਓ ਅਤੇ ਨਵਾਂ ਕਲਾਸਰੂਮ ਬਣਾਉਣ ਲਈ ਬਟਨ ਤੇ ਕਲਿਕ ਕਰੋ',
  'gru-take-tour.student-home.stepOne.title': 'ਇੱਕ ਟੂਰ ਲਓ',
  'gru-take-tour.student-home.stepOne.description':
    'ਟੂਰ ਅਤੇ ਆਪਣੇ ਹੋਮਪੇਜ ਲੈਣ ਲਈ ਸਵਾਗਤ ਕਰੋ! ਤੁਹਾਡੇ ਹੋਮਪੇਜ ਤੇ ਤੁਹਾਡੇ ਲਈ ਉਪਲਬਧ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੇ ਚਲਦੇ ਆਓ.',
  'gru-take-tour.student-home.stepFeaturedCourses.title':
    'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'gru-take-tour.student-home.stepFeaturedCourses.description':
    'ਉਹਨਾਂ ਵਿਸ਼ਿਆਂ ਲਈ ਸਿੱਖਣ ਨੈਵੀਗੇਟਰ ਦੇ ਵਿਸ਼ਾ ਸਮੱਗਰੀ ਸੂਚੀ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਦੇਖੋ ਜੋ ਤੁਹਾਨੂੰ ਦਿਲਚਸਪੀ ਦਿੰਦੇ ਹਨ',
  'gru-take-tour.student-home.stepTwo.title': 'ਲੋਗੋ',
  'gru-take-tour.student-home.stepTwo.description':
    'ਲੋਗੋ ਤੇ ਕਲਿੱਕ ਕਰਨ ਤੋਂ ਬਾਅਦ ਤੁਸੀਂ ਆਪਣੇ ਹੋਮਪੇਜ ਤੇ ਵਾਪਸ ਆਉਂਦੇ ਹੋ.',
  'gru-take-tour.student-home.stepThree.title': 'ਖੋਜ ਬਾਰ',
  'gru-take-tour.student-home.stepThree.description':
    'ਉਹਨਾਂ ਵਿਸ਼ਿਆਂ ਲਈ ਸਾਡੀ ਸਮੱਗਰੀ ਸੂਚੀ ਨੂੰ ਲੱਭੋ ਜਿਹਨਾਂ ਵਿੱਚ ਤੁਹਾਨੂੰ ਦਿਲਚਸਪੀ ਹੈ.',
  'gru-take-tour.student-home.stepFour.title': 'ਮੇਰੇ ਅਧਿਐਨ',
  'gru-take-tour.student-home.stepFour.description':
    'ਤੁਹਾਡੇ ਹੋਮਪੇਜ ਤੇ ਵਾਪਸ ਆਉਂਦੀ ਹੈ',
  'gru-take-tour.student-home.stepFive.title': 'ਲਾਇਬਰੇਰੀ',
  'gru-take-tour.student-home.stepFive.description':
    'ਉਨ੍ਹਾਂ ਵਿਸ਼ਿਆਂ ਲਈ ਲਰਨਿੰਗ ਨੇਵੀਗੇਟਰ ਦੇ ਵਿਸ਼ੇਸ਼ ਕੋਰਸ ਅਤੇ ਸਹਿਭਾਗੀ ਲਾਇਬਰੇਰੀਆਂ ਬ੍ਰਾਉਜ਼ ਕਰੋ ਜਿਹਨਾਂ ਵਿੱਚ ਤੁਹਾਨੂੰ ਦਿਲਚਸਪੀ ਹੈ',
  'gru-take-tour.student-home.stepSix.title': 'ਪ੍ਰਦਰਸ਼ਨ',
  'gru-take-tour.student-home.stepSix.description':
    'ਜਿਨ੍ਹਾਂ ਕੋਰਸਾਂ ਵਿਚ ਤੁਸੀਂ ਦਾਖਲ ਹੋਏ ਹੋ ਉਨ੍ਹਾਂ ਵਿਚ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦਾ ਸਾਰ ਦੇਖੋ.',
  'gru-take-tour.student-home.stepSeven.title': 'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ',
  'gru-take-tour.student-home.stepSeven.description':
    'ਆਪਣੀ ਸਮਗਰੀ ਅਤੇ ਉਪਭੋਗਤਾ ਪ੍ਰੋਫਾਈਲ ਨੂੰ ਐਕਸੈਸ ਅਤੇ ਅਪਡੇਟ ਕਰੋ',
  'gru-take-tour.student-home.stepEight.title': 'ਸਹਿਯੋਗ',
  'gru-take-tour.student-home.stepEight.description':
    'ਸਹਾਇਤਾ ਕੇਂਦਰ ਜਾਂ ਲਾਗਆਉਟ ਤਕ ਪਹੁੰਚ',
  'gru-take-tour.student-home.stepNine.title': 'ਘੋਸ਼ਣਾਵਾਂ',
  'gru-take-tour.student-home.stepNine.description':
    'ਇੱਥੇ ਤੁਸੀਂ ਘੋਸ਼ਣਾਵਾਂ ਵੇਖੋਗੇ ਕਿ ਤੁਹਾਡਾ ਅਧਿਆਪਕ ਜਾਂ ਸਕੂਲ ਤੁਹਾਡੇ ਬਾਰੇ ਜਾਣਨਾ ਚਾਹੁੰਦਾ ਹੈ',
  'gru-take-tour.student-home.stepTen.title': 'ਕਲਾਸਰੂਮ',
  'gru-take-tour.student-home.stepTen.description':
    'ਸਾਰੇ ਕਲਾਸਰੂਮ ਦੇਖੋ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਤੁਸੀਂ ਨਾਮ ਦਰਜ ਕਰਾਉਂਦੇ ਹੋ.',
  'gru-take-tour.student-home.stepEleven.title': 'ਸੁਤੰਤਰ ਸਿੱਖਿਆ',
  'gru-take-tour.student-home.stepEleven.description':
    'ਉਹਨਾਂ ਵਿਸ਼ਿਆਂ ਦਾ ਪਤਾ ਲਗਾਓ ਜਿਨ੍ਹਾਂ ਦੇ ਤੁਸੀਂ ਬੁੱਕਮਾਰਕ ਕੀਤੇ ਹਨ ਅਤੇ ਤੁਸੀਂ ਇਸ ਬਾਰੇ ਹੋਰ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ.',
  'gru-take-tour.student-home.stepTwelve.title': 'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
  'gru-take-tour.student-home.stepTwelve.description':
    'ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਲਈ ਕਲਾਸਰੂਮ ਕੋਡ ਦਾਖਲ ਕਰੋ',
  'gru-take-tour.student-home.stepThirteen.title': 'ਮੁਕੰਮਲ ਹੋ ਗਿਆ!',
  'gru-take-tour.student-home.stepThirteen.description':
    'ਹੁਣ ਅੱਗੇ ਜਾਓ ਅਤੇ ਜੋ ਕੋਰਸ ਤੁਸੀਂ ਦਾਖਲ ਕੀਤਾ ਹੈ ਉਸ ਤੇ ਕਲਿਕ ਕਰੋ, ਕਲਾਸਰੂਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ, ਜਾਂ ਤੁਹਾਡੇ ਲਈ ਦਿਲਚਸਪੀ ਵਾਲੀ ਸਮਗਰੀ ਲੱਭੋ',
  'gru-take-tour.student-performance.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.student-performance.stepOne.description':
    'ਤੁਹਾਡੇ ਪ੍ਰਦਰਸ਼ਨ ਡੈਸ਼ਬੋਰਡ ਤੇ ਸਵਾਗਤ ਹੈ. ਤੁਸੀਂ ਇਹ ਦੇਖ ਸਕਦੇ ਹੋ ਕਿ ਤੁਸੀਂ ਸਾਰੇ ਕਲਾਸਾਂ ਅਤੇ ਕੋਰਸਾਂ ਵਿੱਚ ਕਿਵੇਂ ਪ੍ਰਦਰਸ਼ਨ ਕਰ ਰਹੇ ਹੋ.',
  'gru-take-tour.student-performance.stepTwo.title': 'ਫਿਲਟਰ ਟੈਬ',
  'gru-take-tour.student-performance.stepTwo.description':
    'ਕਿਰਿਆ, ਸਮਾਂ ਅਵਧੀ, ਵਿਸ਼ਾ ਅਤੇ ਕੋਰਸ ਦੁਆਰਾ ਆਪਣੇ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਫਿਲਟਰ ਕਰਨ ਲਈ ਤੀਰ ਤੇ ਕਲਿਕ ਕਰੋ.',
  'gru-take-tour.student-performance.stepThree.title': 'ਅਪਡੇਟ ਰਿਪੋਰਟ',
  'gru-take-tour.student-performance.stepThree.description':
    'ਇੱਕ ਵਾਰੀ ਜਦੋਂ ਤੁਸੀਂ ਆਪਣੇ ਫਿਲਟਰਜ਼ ਨੂੰ ਚੁਣਿਆ ਹੈ, ਨਤੀਜਿਆਂ ਨੂੰ ਪ੍ਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਅੱਪਡੇਟ ਰਿਪੋਰਟ ਤੇ ਕਲਿਕ ਕਰੋ',
  'gru-take-tour.student-performance.stepFour.title': 'ਡਾਊਨਲੋਡ / ਪ੍ਰਿੰਟ',
  'gru-take-tour.student-performance.stepFour.description':
    'ਆਪਣੀ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ.',
  'gru-take-tour.student-performance.stepFive.title': 'ਮੁਕੰਮਲ ਹੋ ਗਿਆ!',
  'gru-take-tour.student-performance.stepFive.description':
    'ਅੱਗੇ ਵਧੋ ਅਤੇ ਤੁਹਾਡੇ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ!',
  'gru-take-tour.student-class.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.student-class.stepOne.description':
    'ਤੁਹਾਡੀ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸਵਾਗਤ ਹੈ ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਕਲਾਸ ਗਤੀਵਿਧੀਆਂ, ਕੋਰਸ ਮੈਪ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ ਡੇਟਾ ਵੇਖੋਗੇ. ਆਓ! ਸ਼ੁਰੂ ਕਰੀਏ!',
  'gru-take-tour.student-class.stepTopBar.title': 'ਕੋਰਸ, ਕਾਰਗੁਜ਼ਾਰੀ, ਮੁਕੰਮਲਤਾ',
  'gru-take-tour.student-class.stepTopBar.description':
    'ਹੁਣ ਤਕ ਤੁਹਾਡੇ ਕੋਰਸ ਅਤੇ ਸਮੁੱਚੇ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਸਾਰ ਦੇਖੋ.',
  'gru-take-tour.student-class.stepTwo.title': 'ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ',
  'gru-take-tour.student-class.stepTwo.description':
    'ਆਪਣੇ ਅਧਿਆਪਕ ਦੁਆਰਾ ਦਿਤੇ ਗਏ ਅੱਜ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਤੱਕ ਪਹੁੰਚ ਅਤੇ ਅਧਿਐਨ ਕਰੋ.',
  'gru-take-tour.student-class.stepThree.title': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'gru-take-tour.student-class.stepThree.description':
    'ਕੋਰਸ ਵਿਚ ਸੰਗ੍ਰਹਿ ਅਤੇ ਮੁਲਾਂਕਣਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਯੂਨਿਟਾਂ ਅਤੇ ਪਾਠਾਂ ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-take-tour.student-class.stepFour.title': 'ਮੇਰੀ ਰਿਪੋਰਟ',
  'gru-take-tour.student-class.stepFour.description':
    'ਤੁਹਾਡੇ ਸਮੁੱਚੇ ਕਲਾਸ ਦੇ ਪ੍ਰਦਰਸ਼ਨ ਦੀ ਸਮੀਖਿਆ ਕਰੋ',
  'gru-take-tour.student-class.stepFive.title': 'ਮੁਕੰਮਲ ਹੋ ਗਿਆ!',
  'gru-take-tour.student-class.stepFive.description':
    'ਕੋਰਸ ਮੈਪ ਜਾਂ ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਤੇ ਕਲਿਕ ਕਰਕੇ ਕੋਰਸ ਦੀ ਪੜ੍ਹਾਈ ਸ਼ੁਰੂ ਕਰੋ.',
  'gru-take-tour.teacher-class.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.teacher-class.stepOne.description':
    'ਤੁਹਾਡੀ ਕਲਾਸਰੂਮ ਵਿੱਚ ਸਵਾਗਤ ਹੈ ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੀ ਰੋਜ਼ਾਨਾ ਕਲਾਸ ਦੀਆਂ ਸਰਗਰਮੀਆਂ, ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ, ਅਪਡੇਟ ਕਲਾਸ ਜਾਣਕਾਰੀ ਦੇਖਣ ਅਤੇ ਵਿਦਿਆਰਥੀ ਪ੍ਰਦਰਸ਼ਨ ਦੇ ਅੰਕੜੇ ਦੀ ਸਮੀਖਿਆ ਕਰਨ ਦੇ ਯੋਗ ਹੋਵੋਗੇ. ਆਓ! ਸ਼ੁਰੂ ਕਰੀਏ!',
  'gru-take-tour.teacher-class.stepTopBar.title': 'ਕੋਰਸ, ਕਾਰਗੁਜ਼ਾਰੀ, ਮੁਕੰਮਲਤਾ',
  'gru-take-tour.teacher-class.stepTopBar.description':
    'ਹੁਣ ਤੱਕ ਤੁਹਾਡੇ ਕੋਰਸ ਦਾ ਸੰਖੇਪ ਅਤੇ ਕੁੱਲ ਵਿਦਿਆਰਥੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਦੇਖੋ.',
  'gru-take-tour.teacher-class.stepTwo.title': 'ਰੋਜ਼ਾਨਾ ਕਲਾਸ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ',
  'gru-take-tour.teacher-class.stepTwo.description':
    'ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਅੱਜ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਵੇਖਣਾ ਅਤੇ ਨਿਯੁਕਤ ਕਰਨਾ.',
  'gru-take-tour.teacher-class.stepThree.title': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'gru-take-tour.teacher-class.stepThree.description':
    'ਕੋਰਸ ਵਿਚ ਨਿਰਧਾਰਿਤ ਇਕਾਈਆਂ, ਪਾਠਾਂ, ਸੰਗ੍ਰਹਿ ਜਾਂ ਮੁਲਾਂਕਣਾਂ ਨੂੰ ਵੇਖੋ ਜਾਂ ਸੋਧੋ.',
  'gru-take-tour.teacher-class.stepFour.title': 'ਮੇਰੀ ਰਿਪੋਰਟ',
  'gru-take-tour.teacher-class.stepFour.description':
    'ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀ ਕੋਰਸ ਵਿਚ ਕਿਵੇਂ ਪ੍ਰਦਰਸ਼ਨ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀਆਂ ਰਿਪੋਰਟਾਂ ਤੱਕ ਪਹੁੰਚਣ ਦਾ ਸਾਰ ਦੇਖੋ.',
  'gru-take-tour.teacher-class.stepClassManagement.title': 'ਕਲਾਸ ਪ੍ਰਬੰਧਨ',
  'gru-take-tour.teacher-class.stepClassManagement.description':
    'ਕਲਾਸ ਵਿਚ ਨਾਮਜ਼ਦ ਕਰਨ ਅਤੇ ਕਲਾਸਾਂ ਵਿਚ ਦਾਖਲ ਹੋਏ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਅਪਡੇਟ ਜਾਂ ਅਪਡੇਟ ਕਰੋ.',
  'gru-take-tour.teacher-class.stepFive.title': 'ਮੁਕੰਮਲ ਹੋ ਗਿਆ!',
  'gru-take-tour.teacher-class.stepFive.description':
    'ਹੁਣ ਅੱਗੇ ਵਧੋ ਅਤੇ ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਕਲਾਸਰੂਮ ਨੂੰ ਸਾਂਝਾ ਕਰੋ.',
  'gru-take-tour.study-player.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.study-player.stepOne.description':
    'ਇਹ ਤੁਹਾਡਾ ਸਟੱਡੀ ਪਲੇਅਰ ਹੈ ਤੁਹਾਡੇ ਲਈ ਉਪਲਬਧ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੇ ਚਲਦੇ ਚਲਦੇ ਹਾਂ.',
  'gru-take-tour.study-player.stepTwo.title': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'gru-take-tour.study-player.stepTwo.description':
    'ਆਪਣੇ ਕੋਰਸ ਮੈਪ ਤੇ ਵਾਪਸ ਆਉਣ ਲਈ ਕਿਸੇ ਵੀ ਸਮੇਂ ਆਈਕਨ ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-take-tour.study-player.stepThree.title': 'ਕੋਰਸ ਦਾ ਨਾਮ',
  'gru-take-tour.study-player.stepThree.description':
    'ਉਸ ਕੋਰਸ ਦਾ ਸੰਕੇਤ ਕਰਦਾ ਹੈ ਜਿਸਤੇ ਤੁਸੀਂ ਕੰਮ ਕਰ ਰਹੇ ਹੋ.',
  'gru-take-tour.study-player.stepFour.title': 'ਸੁਝਾਅ',
  'gru-take-tour.study-player.stepFour.description':
    'ਅਤਿਰਿਕਤ ਸ੍ਰੋਤ ਜੋ ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਜੋ ਤੁਸੀਂ ਪੜ੍ਹ ਰਹੇ ਹੋ ਉਸ ਦੇ ਅਧਾਰ ਤੇ ਖੋਜ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ.',
  'gru-take-tour.study-player.stepFive.title': 'ਮੁਕੰਮਲ',
  'gru-take-tour.study-player.stepFive.nuTitle': 'ਸਮਰੱਥਾ',
  'gru-take-tour.study-player.stepFive.description':
    'ਇਹ ਸੰਕੇਤ ਕਰਦਾ ਹੈ ਕਿ ਤੁਸੀਂ ਕਿੰਨੇ ਕੁ ਕੰਮ ਪੂਰੇ ਕਰ ਚੁੱਕੇ ਹੋ',
  'gru-take-tour.study-player.stepSix.title': 'ਪ੍ਰਦਰਸ਼ਨ',
  'gru-take-tour.study-player.stepSix.description':
    'ਇਹ ਸੰਕੇਤ ਕਰਦਾ ਹੈ ਕਿ ਤੁਸੀਂ ਕੋਰਸ ਵਿਚ ਕਿਵੇਂ ਪ੍ਰਦਰਸ਼ਨ ਕਰ ਰਹੇ ਹੋ.',
  'gru-take-tour.study-player.stepSeven.title': 'ਸਰੋਤ ਤੇ ਪ੍ਰਤੀਕਿਰਿਆ ਕਰੋ',
  'gru-take-tour.study-player.stepSeven.description':
    'ਆਪਣੇ ਅਧਿਆਪਕਾਂ ਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਇਸ ਸਰੋਤ ਬਾਰੇ ਕੀ ਸੋਚਦੇ ਹੋ',
  'gru-take-tour.study-player.stepEight.title': 'ਮੁਕੰਮਲ ਹੋ ਗਿਆ!',
  'gru-take-tour.study-player.stepEight.description': 'ਪੜ੍ਹਾਈ ਸ਼ੁਰੂ ਕਰੋ!',
  'gru-take-tour.study-player.stepNine.title': 'ਭੰਡਾਰ ਤੇ ਵਾਪਸ',
  'gru-take-tour.study-player.stepNine.description':
    'ਆਪਣੇ ਭੰਡਾਰਣ ਜਾਂ ਮੁਲਾਂਕਣ ਤੇ ਵਾਪਸ ਆਉਣ ਲਈ ਕਿਸੇ ਵੀ ਸਮੇਂ ਆਈਕਨ ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-take-tour.library.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.library.stepOne.description':
    'ਲਰਨਿੰਗ ਨੈਵੀਗੇਟਰ ਵਿੱਚ ਲਾਇਬਰੇਰੀਆਂ ਵਿੱਚ ਸਵਾਗਤ ਹੈ.',
  'gru-take-tour.library.stepTwo.title': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'gru-take-tour.library.stepTwo.description':
    'ਸਿੱਖਿਅਕਾਂ ਦੁਆਰਾ ਕਲਾਸਾਂ ਵਿਚ ਵਿਕਸਤ ਅਤੇ ਲਾਗੂ ਕੀਤੇ ਕੋਰਸ ਦੀ ਪੜਚੋਲ ਕਰੋ',
  'gru-take-tour.library.stepThree.title': 'ਹੋਰ ਲਾਇਬ੍ਰੇਰੀਆਂ',
  'gru-take-tour.library.stepThree.description':
    'ਗੋਰੂ ਦੇ ਸਾਂਝੇਦਾਰ ਦੁਆਰਾ ਵਿਕਸਤ ਸਮੱਗਰੀ ਦੀ ਪੜਚੋਲ ਕਰੋ.',
  'gru-take-tour.library.stepFour.title': 'ਪੂਰਵਦਰਸ਼ਨ',
  'gru-take-tour.library.stepFour.description':
    'ਦੇਖਣ ਲਈ ਕੋਰਸ ਦਾ ਪੂਰਵਦਰਸ਼ਨ ਕਰੋ ਕਿ ਇਹ ਤੁਹਾਡੀ ਦਿਲਚਸਪੀ ਹੈ ਜਾਂ ਨਹੀਂ.',
  'gru-take-tour.library.stepFive.title': 'ਸ਼ੇਅਰ ਕਰੋ',
  'gru-take-tour.library.stepFive.description': 'ਦੂਜਿਆਂ ਨਾਲ ਇਹ ਕੋਰਸ ਸਾਂਝਾ ਕਰੋ',
  'gru-take-tour.library.stepSix.title': 'ਬੁੱਕਮਾਰਕ',
  'gru-take-tour.library.stepSix.description':
    'ਬਾਅਦ ਵਿਚ ਇਸ ਦੀ ਸਮੀਖਿਆ ਕਰਨ ਲਈ ਇਸ ਕੋਰਸ ਦੀ ਬੁੱਕਮਾਰਕ ਕਰੋ',
  'gru-take-tour.profile.stepOne.title': 'ਸਵਾਗਤ ਹੈ!',
  'gru-take-tour.profile.stepOne.description':
    'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਤੇ ਸਵਾਗਤ ਕਰੋ ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੀ ਸਮਗਰੀ, ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਅਤੇ ਅਨੁਯਾਾਇਯੀਆਂ ਨੂੰ ਐਕਸੈਸ ਕਰ ਸਕਦੇ ਹੋ.',
  'gru-take-tour.profile.stepTwo.title': 'ਮੇਰੀ ਸਮੱਗਰੀ',
  'gru-take-tour.profile.stepTwo.description':
    'ਨਵੀਂ ਸਮੱਗਰੀ ਬਣਾਓ ਅਤੇ ਉਸ ਸਮਗਰੀ ਨੂੰ ਦੇਖੋ ਜਿਸਨੂੰ ਤੁਸੀਂ ਰੀਮਿਕਲ ਕੀਤਾ ਹੈ.',
  'gru-take-tour.profile.stepThree.title': 'ਮੇਰੇ ਬਾਰੇ ਵਿੱਚ',
  'gru-take-tour.profile.stepThree.description':
    'ਆਪਣੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ, ਸਕੂਲ ਜਾਣਕਾਰੀ ਅਤੇ ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਤਸਵੀਰ ਨੂੰ ਅਪਡੇਟ ਕਰੋ.',
  'gru-take-tour.profile.stepFour.title': 'ਟੀਚੇ',
  'gru-take-tour.profile.stepFour.description':
    'ਤੁਹਾਡੇ ਸਿੱਖਣ ਦੇ ਮੀਲਪੱਥਰ ਨੂੰ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਸੈੱਟ ਅਤੇ ਟਰੈਕ ਟੀਚੇ.',
  'gru-take-tour.profile.stepFive.title': 'ਚੇਲੇ',
  'gru-take-tour.profile.stepFive.description':
    'ਜੇ ਤੁਸੀਂ ਕਿਸੇ ਦੀ ਸਮੱਗਰੀ ਨੂੰ ਪਸੰਦ ਕਰਦੇ ਹੋ ਤਾਂ ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਦੀ ਪਾਲਣਾ ਕਰ ਸਕਦੇ ਹੋ. ਤੁਸੀਂ ਇਹ ਵੀ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਕੌਣ ਤੁਹਾਡੀ ਪਿੱਛਾ ਕਰ ਰਿਹਾ ਹੈ.',
  'gru-take-tour.profile.stepSix.title': 'ਬੈਜ',
  'gru-take-tour.profile.stepSix.description':
    'ਤੁਹਾਡੇ ਦੁਆਰਾ ਪ੍ਰਾਪਤ ਕੀਤੇ ਬੈਜ ਦੀ ਸਮੀਖਿਆ ਕਰੋ ਜੇ ਤੁਸੀਂ ਆਪਣੇ ਅਧਿਆਪਕ ਦੁਆਰਾ ਨਿਰਧਾਰਤ ਕੀਤੇ ਬੈਂਚਮਾਰਕ ਨਿਰਧਾਰਣ ਨੂੰ ਪੂਰਾ ਕਰਦੇ ਹੋ ਤਾਂ ਤੁਹਾਨੂੰ ਇੱਕ ਬੈਜ ਮਿਲਦਾ ਹੈ',
  'gru-tour.assessments-settings.stepOne.title': 'ਨੇਵੀਗੇਸ਼ਨ ਅਤੇ ਸਕੋਰਿੰਗ',
  'gru-tour.assessments-settings.stepOne.description':
    'ਇਹ ਸੈਟਿੰਗ ਇਹ ਨਿਰਧਾਰਤ ਕਰਦੀ ਹੈ ਕਿ ਵਿਦਿਆਰਥੀ ਕਿਵੇਂ ਮੁਲਾਂਕਣ ਦੁਆਰਾ ਪ੍ਰੇਰਿਤ ਹੋ ਸਕਦੇ ਹਨ ਅਤੇ ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਉਹਨਾਂ ਦੇ ਜਵਾਬ ਸਹੀ ਹਨ ਜਾਂ ਗਲਤ ਹਨ. ਇਹ ਉਹਨਾਂ ਨੂੰ ਇੱਕ ਉੱਤਰ ਕੁੰਜੀ ਨਹੀਂ ਦਿਖਾਉਂਦਾ.',
  'gru-tour.assessments-settings.stepTwo.title':
    'ਕੁੰਜੀ ਅਤੇ ਕੋਸ਼ਿਸ਼ਾਂ ਦੀ ਗਿਣਤੀ ਦਾ ਜਵਾਬ',
  'gru-tour.assessments-settings.stepTwo.description':
    'ਇਹ ਸੈਟਿੰਗ ਇੱਕ ਉਤਰਕੀ ਕੁੰਜੀ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਮੁਲਾਂਕਣ ਤੇ ਕੀਤੀਆਂ ਗਈਆਂ ਕੋਸ਼ਿਸ਼ਾਂ ਦੀ ਗਿਣਤੀ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰਦੀ ਹੈ.',
  'gru-tour.overview.stepOne.title': 'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ',
  'gru-tour.overview.stepOne.description':
    'ਕੋਰਸ ਦਾ ਨਕਸ਼ਾ ਉਹਨਾਂ ਸਾਰੇ ਮੁਲਾਂਕਣਾਂ ਅਤੇ ਸੰਗ੍ਰਿਹਾਂ ਨੂੰ ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਜੋ ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਸੌਂਪਦੇ ਹੋ.',
  'gru-tour.overview.stepTwo.title': 'ਕਲਾਸ ਕੋਡ',
  'gru-tour.overview.stepTwo.description':
    'ਤੁਹਾਡੇ ਦੁਆਰਾ ਬਣਾਏ ਹਰ ਕਲਾਸਰੂਮ ਵਿੱਚ ਇੱਕ ਵਿਲੱਖਣ ਕਲਾਸ ਕੋਡ ਹੁੰਦਾ ਹੈ. ਤੁਸੀਂ ਇਹ ਕੋਡ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਦੇ ਦਿਓਗੇ ਜਦੋਂ ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਲਈ ਆਪਣੇ ਕਲਾਸਰੂਮ ਵਿੱਚ ਦਾਖਲੇ ਅਤੇ ਆਪਣੀ ਸਮਗਰੀ ਐਕਸੈਸ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ.',
  'gru-tour.overview.stepThree.title': 'ਮਾਨੀਟਰ ਵਿਦਿਆਰਥੀ ਅਤੇ ਕਲਾਸ ਡੇਟਾ',
  'gru-tour.overview.stepThree.description':
    'ਇਹ ਤੁਹਾਨੂੰ ਕਲਾਸ ਅਤੇ ਵਿਅਕਤੀਗਤ ਵਿਦਿਆਰਥੀ ਦੇ ਮੁਲਾਂਕਣ ਡੇਟਾ ਨੂੰ ਦੇਖਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ ਜਦੋਂ ਵਿਦਿਆਰਥੀ ਕੋਰਸ ਦਾ ਹਿੱਸਾ ਹੁੰਦੇ ਹਨ.',
  'gru-tour.overview.stepFour.title': 'ਕਲਾਸਰੂਮ ਜਾਣਕਾਰੀ',
  'gru-tour.overview.stepFour.description':
    'ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੇ ਕਲਾਸਰੂਮ ਦੇ ਨਾਮ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰ ਸਕਦੇ ਹੋ, ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਘੋਸ਼ਣਾਵਾਂ ਪੋਸਟ ਕਰ ਸਕਦੇ ਹੋ, ਆਪਣੀ ਕਲਾਸ ਵਿੱਚ ਨਾਮਜਦ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਨਾਮ ਦੇਖ ਸਕਦੇ ਹੋ ਅਤੇ ਆਪਣੀ ਕਲਾਸਰੂਮ ਨੂੰ ਮਿਟਾ ਸਕਦੇ ਹੋ.',
  'gru-tour.overview.stepFive.title': 'ਤੁਹਾਡੇ ਕੋਰਸ ਦੀ ਸਮਗਰੀ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ',
  'gru-tour.overview.stepFive.description':
    'ਜਦੋਂ ਤੁਸੀਂ ਕਿਸੇ ਕਲਾਸਰੂਮ ਵਿੱਚ ਹੋ, ਤਾਂ ਆਪਣੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਜਾਰੀ ਕੀਤੀ ਕੋਰਸ ਸਮੱਗਰੀ ਨੂੰ ਸੋਧਣ ਲਈ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-tour.overview.stepSix.title': 'ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਪ੍ਰਗਤੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ!',
  'gru-tour.overview.stepSix.description':
    'ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਮੁਲਾਂਕਣ ਤੇ ਕਲਾਸ ਦੀ ਪ੍ਰਗਤੀ ਨੂੰ ਮਾਨੀਟਰ ਕਰਨ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਡੈਸ਼ਬੋਰਡ ਦੀ ਵਰਤੋਂ ਕਰੋ. [1] [2] ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਅਸੈਸਮੈਂਟ ਲਾਂਚ ਕਰਨ ਲਈ ਹਰੇਕ ਮੁਲਾਂਕਣ ਦੇ ਖੱਬੇ ਪਾਸੇ ਮਿਲੇ  "go live " ਆਈਕਨ ਤੇ ਕਲਿੱਕ ਕਰੋ . [3] [4] <i class =  "ਰੀਅਲ-ਟਾਈਮ ਆਈਕਾਨ ">',
  'gru-tour.quick-start.stepOne.title': 'ਆਪਣੇ ਕਲਾਸਰੂਮਾਂ ਨੂੰ ਨੈਵੀਗੇਟ ਕਰਨਾ',
  'gru-tour.quick-start.stepOne.description':
    'ਇਹ ਨਵੇ ਬਣਾਏ ਕਲਾਸਰੂਮ ਦਾ ਨਜ਼ਰੀਆ ਹੈ. ਕਿਸੇ ਵੀ ਸਮੇਂ ਕਲਾਸਰੂਮ ਵਿੱਚ ਵਾਪਸ ਜਾਣ ਲਈ,  "ਕਲਾਸਰੂਮ " ਤੇ ਕਲਿਕ ਕਰੋ ਅਤੇ ਡ੍ਰੌਪ ਡਾਊਨ ਮੀਨੂੰ ਦੀ ਵਰਤੋਂ ਕਰੋ, ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਦਾਖਲ ਹੋਣ ਵਾਲੇ ਕਲਾਸ ਦੀ ਚੋਣ ਕਰੋ.',
  'gru-tour.quick-start.stepTwo.title': 'ਸ਼ੁਰੂ ਕਰਨਾ? ਇੱਕ ਮੁਲਾਂਕਣ ਬਣਾਉ!',
  'gru-tour.quick-start.stepTwo.description':
    'ਅਸੀਂ ਗੋਰੂ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰਨ ਅਤੇ ਤੁਹਾਡੇ ਕਲਾਸ ਵਿਚ ਵਿਦਿਆਰਥੀ ਦੇ ਮੌਜੂਦਾ ਪੱਧਰ ਦੀ ਪਛਾਣ ਕਰਨ ਲਈ ਇਕ ਮੁਲਾਂਕਣ ਬਣਾਉਣ ਦਾ ਸੁਝਾਅ ਦਿੰਦੇ ਹਾਂ.',
  'gru-tour.real-time.stepOne.title': 'ਜਵਾਬਾਂ ਦੇ ਟੁੱਟਣ',
  'gru-tour.real-time.stepOne.description':
    'ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਜਵਾਬ ਦੇ ਬਰੇਕਣ ਦੇਖਣ ਲਈ ਹਰੇਕ ਸਵਾਲ ਤੇ ਕਲਿੱਕ ਕਰੋ.',
  'gru-tour.real-time.stepTwo.title': 'ਵਿਅਕਤੀਗਤ ਵਿਦਿਆਰਥੀ ਡੇਟਾ',
  'gru-tour.real-time.stepTwo.description':
    'ਵਿਅਕਤੀਗਤ ਵਿਦਿਆਰਥੀ ਡੇਟਾ ਰਿਪੋਰਟਾਂ ਨੂੰ ਵੇਖਣ ਲਈ ਹਰੇਕ ਵਿਦਿਆਰਥੀ ਦੀ ਟਾਇਲ ਚੁਣੋ.',
  'gru-tour.real-time.stepThree.title': 'ਇੱਕ ਦ੍ਰਿਸ਼ ਚੁਣੋ',
  'gru-tour.real-time.stepThree.description':
    'ਡਾਟਾ ਵੇਖਾਉਣ ਲਈ  "ਸਿਰਲੇਖ ਵੇਖੋ " ਜਾਂ  "ਸੂਚੀ ਵਿਊ " ਚੁਣੋ.',
  'gru-tour.real-time.stepFour.title': 'ਔਸਤ ਸਕੋਰ',
  'gru-tour.real-time.stepFour.description':
    'ਸਾਰੇ ਜਵਾਬਾਂ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਕੈਲਗਰੀ ਦੀ ਔਸਤ ਗਿਣਤੀ ਨੂੰ ਦੇਖੋ.',
  'gru-tour.real-time.stepFive.title': 'ਪ੍ਰੋਜੈਕਟ ਬੇਨਾਮ ਡਾਟਾ',
  'gru-tour.real-time.stepFive.description':
    'ਵਿਦਿਆਰਥੀ ਦੇ ਡੇਟਾ ਦੇ ਇੱਕ ਗੁਮਨਾਮ ਨਜ਼ਰੀਏ ਪ੍ਰੋਜੈਕਟ ਕਰਨ ਲਈ ਇਸ ਵਿਕਲਪ ਦੀ ਵਰਤੋਂ ਕਰੋ.',
  'gru-course-play.hide-unit-details': 'ਇਕਾਈ ਮੈਟਾਡੇਟਾ ਓਹਲੇ ਕਰੋ',
  'gru-course-play.view-unit-details': 'ਇਕਾਈ ਮੈਟਾਡੇਟਾ ਵੇਖੋ',
  'gru-course-play.performance': 'ਪ੍ਰਦਰਸ਼ਨ',
  'gru-century-skills.legends.hewlett': 'ਡਬਲ ਡਾਇਰਿੰਗ ਮਾਡਲ',
  'gru-century-skills.legends.conley': 'ਕਨਾਲੀ ਚਾਰ ਕੁੰਜੀਆਂ',
  'gru-century-skills.legends.framework': 'p21 ਫਰੇਮਵਰਕ',
  'gru-century-skills.legends.national': 'ਜੀਵਨ ਅਤੇ ਕੰਮ ਲਈ ਰਾਸ਼ਟਰੀ ਖੋਜ ਕੇਂਦਰ',
  'gru-century-skills.content.groups.cognitive':
    'ਮੁੱਖ ਗਿਆਨ ਦੇ ਹੁਨਰ ਅਤੇ ਰਣਨੀਤੀਆਂ',
  'gru-century-skills.content.groups.content': 'ਮੁੱਖ ਸਮੱਗਰੀ ਦਾ ਗਿਆਨ',
  'gru-century-skills.content.groups.learning': 'ਮੁੱਖ ਸਿੱਖਣ ਦੇ ਹੁਨਰ ਅਤੇ ਤਕਨੀਕ',
  'gru-rubric-edit.upload-rubric': 'ਅਪਲੋਡ ਕਰੋ',
  'gru-rubric-edit.copy.success-message':
    'ਤੁਸੀਂ \'ਚ ਕਾਪੀ ਕੀਤੀ {{title}} ਕੀ ਤੁਸੀਂ ਉਸ ਸ਼ਰਤ ਨੂੰ ਸੰਪਾਦਿਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'gru-rubric-creation.url': 'url',
  'gru-rubric-creation.upload-file': 'ਅਪਲੋਡ ਫਾਇਲ',
  'gru-rubric-creation.add-category': 'ਨਵੀਂ ਸ਼੍ਰੇਣੀ ਜੋੜੋ',
  'gru-rubric-creation.gru-preview-url.preview':
    'ਉੱਪਰ ਚਰਣਾਂ ਜੋੜਨਾ ਅਤੇ ਇੱਥੇ ਪੂਰਵਦਰਸ਼ਨ ਦੇਖੋ',
  'gru-rubric-creation.overall-narrative': 'ਸਮੁੱਚੀ ਕਹਾਣੀ ਫੀਡਬੈਕ',
  'gru-rubric-creation.feedback-guidance': 'ਫੀਡਬੈਕ ਮਾਰਗਦਰਸ਼ਨ',
  'gru-rubric-creation.required-feedback': 'ਫੀਡਬੈਕ ਦੀ ਲੋੜ ਹੈ',
  'gru-rubric-creation.feedback-guidance-placeholder':
    'ਸੰਪੂਰਨ ਤੌਰ ਤੇ ਲੇਖ ਤੇ ਤੁਹਾਡਾ ਪ੍ਰਤੀਕਰਮ ਦਾ ਸਾਰ ਕੱਢੋ.',
  'gru-rubric-creation.gru-category.category-title': 'ਸ਼੍ਰੇਣੀ ਦਾ ਸਿਰਲੇਖ',
  'gru-rubric-creation.gru-category.category-feedback':
    'ਸਾਬਕਾ ਜਿਵੇਂ ਤੁਸੀਂ ਇਸ ਸ਼੍ਰੇਣੀ ਦੀ ਸਮੀਖਿਆ ਕਰ ਰਹੇ ਹੋ, ਲੇਖਕ ਦੇ ਮੰਤਵ ਵੱਲ ਧਿਆਨ ਨਾਲ ਧਿਆਨ ਦਿਓ.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.0':
    'ਉਦਾਹਰਣ: ਵੱਧ ਪ੍ਰਵੀਨਤਾ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.1':
    'ਉਦਾਹਰਨ: ਮੀਟਿੰਗ ਦੀ ਮੁਹਾਰਤ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.2':
    'ਉਦਾਹਰਨ: ਨੇੜੇ ਮੁਹਾਰਤ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.3':
    'ਉਦਾਹਰਣ: ਮੁਹਾਰਤ ਦੀ ਸ਼ੁਰੂਆਤ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.4':
    'ਉਦਾਹਰਣ: ਮੁਹਾਰਤ ਦਾ ਕੋਈ ਸਬੂਤ ਨਹੀਂ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.best': 'ਵਧੀਆ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.levels': 'ਪੱਧਰ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.new-level':
    'ਨਵਾਂ ਪੱਧਰ ਜੋੜੋ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.scoring': 'ਸਕੋਰਿੰਗ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.worst': 'ਬੁਰਾ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.name-error':
    'ਕਿਰਪਾ ਕਰਕੇ ਪੱਧਰ ਦਾ ਸਿਰਲੇਖ ਭਰੋ.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.score-error':
    'ਸਕੋਰ ਮੁੱਲ ਦਾਖਲ ਕਰੋ.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.no-levels-error':
    'ਕਿਰਪਾ ਕਰਕੇ ਘੱਟੋ ਘੱਟ ਇੱਕ ਪੱਧਰ ਲਈ ਇੱਕ ਮੁੱਲ ਸੈਟ ਕਰੋ.',
  'library.browse-library': 'ਝਲਕ ਲਾਇਬਰੇਰੀ',
  'library.featured-courses': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੇ ਕੋਰਸ',
  'library.gru-library-card.featured-course': 'ਫੀਚਰ ਕੋਰਸ',
  'library.gru-partner-library-card.course.zero': '{{ਗਿਣਤੀ}} ਕੋਰਸ',
  'library.gru-partner-library-card.course.one': '{{ਗਿਣਤੀ}} ਕੋਰਸ',
  'library.gru-partner-library-card.course.other': '{{count}} ਕੋਰਸ',
  'library.gru-partner-library-card.collection.zero': '{{count}} ਸੰਗ੍ਰਹਿ',
  'library.gru-partner-library-card.collection.one': '{{count}} ਸੰਗ੍ਰਹਿ',
  'library.gru-partner-library-card.collection.other': '{{count}} ਸੰਗ੍ਰਹਿ',
  'library.gru-partner-library-card.assessment.zero': '{{count}} ਮੁਲਾਂਕਣ',
  'library.gru-partner-library-card.assessment.one': '{{count}} ਮੁਲਾਂਕਣ',
  'library.gru-partner-library-card.assessment.other': '{{count}} ਮੁਲਾਂਕਣ',
  'library.gru-partner-library-card.resource.zero': '{{count}} ਸਰੋਤ',
  'library.gru-partner-library-card.resource.one': '{{count}} ਸਰੋਤ',
  'library.gru-partner-library-card.resource.other': '{{count}} ਸਰੋਤ',
  'library.gru-partner-library-card.question.zero': '{{count}} ਪ੍ਰਸ਼ਨ',
  'library.gru-partner-library-card.question.one': '{{count}} ਪ੍ਰਸ਼ਨ',
  'library.gru-partner-library-card.question.other': '{{count}} ਪ੍ਰਸ਼ਨ',
  'library.gru-partner-library-card.rubric.zero': '{{ਗਿਣਤੀ}} ਚਿੰਨ੍ਹ',
  'library.gru-partner-library-card.rubric.one': '{{ਗਿਣਤੀ}} ਚਿੰਨ੍ਹ',
  'library.gru-partner-library-card.rubric.other': '{{ਗਿਣਤੀ}} ਕਤਲੇਆਮ',
  'library.partner-libraries': 'ਪਾਰਟਨਰ ਲਾਇਬਰੇਰੀਆਂ',
  'gru-study-header.lesson-legend': 'ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਸਬਕ ਤੇ ਹੋ',
  'gru-study-header.resource-legend': 'ਤੁਸੀਂ ਇਸ ਸਰੋਤ ਦੀ ਜਾਂਚ ਕਰ ਰਹੇ ਹੋ',
  'gru-study-header.resources-collection-report': 'ਭੰਡਾਰ ਵਰਤੋਂ ਰਿਪੋਰਟ',
  'gru-study-header.resources-assessment-report': 'ਮੁਲਾਂਕਣ ਸੰਖੇਪ ਰਿਪੋਰਟ',
  'gru-study-header.check-summary': 'ਆਪਣੀ ਸੰਖੇਪ ਰਿਪੋਰਟ ਵੇਖੋ',
  'gru-study-header.check-usage': 'ਆਪਣੀ ਵਰਤੋਂ ਦੀ ਰਿਪੋਰਟ ਚੈੱਕ ਕਰੋ',
  'gru-study-header.no-suggestions':
    'ਅਸੀਂ ਤੁਹਾਡੀ ਸਿਖਲਾਈ ਦੇ ਸਮਰਥਨ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਸੁਝਾਵਾਂ ਤੇ ਕੰਮ ਕਰ ਰਹੇ ਹਾਂ',
  'gru-study-header.resource.zero': 'ਸਰੋਤ',
  'gru-study-header.resource.one': 'ਸਰੋਤ',
  'gru-study-header.resource.other': 'ਸਰੋਤ',
  'gru-study-header.question.zero': 'ਸਵਾਲ',
  'gru-study-header.question.one': 'ਸਵਾਲ',
  'gru-study-header.question.other': 'ਸਵਾਲ',
  'gru-study-header.suggestions-legend':
    'ਹੋਰ ਜਾਣਨ ਲਈ, ਇਹਨਾਂ ਸਾਧਨਾਂ ਦੀ ਜਾਂਚ ਕਰੋ',
  'gru-suggest-test.pre-test-header': 'ਪ੍ਰੀ-ਟੈਸਟ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.post-test-header': 'ਪੋਸਟ-ਟੈਸਟ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.backfill-header': 'ਸੁਝਾਅ ਸੰਗ੍ਰਹਿ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.benchmark-header': 'ਬੈਂਚਮਾਰਕ-ਟੈਸਟ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.resource-header': 'ਸੁਝਾਏ ਗਏ ਸੰਸਾਧਨ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.signature_collection-header': 'ਸੁਝਾਅ ਸੰਗ੍ਰਹਿ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.signature_collection-lead':
    'ਇਸ ਕੋਰਸ ਤੇ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਆਧਾਰ ਤੇ, ਹੇਠ ਲਿਖੀ ਭੰਡਾਰ ਤੁਹਾਡੀ ਸਮਝ ਨੂੰ ਵਧਾ ਸਕਦਾ ਹੈ.',
  'gru-suggest-test.signature_assessment-header': 'ਸੁਝਾਏ ਗਏ ਮੁਲਾਂਕਣ (ਵਿਕਲਪਿਕ)',
  'gru-suggest-test.signature_assessment-lead':
    'ਇਸ ਕੋਰਸ ਤੇ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ ਤੇ, ਹੇਠਾਂ ਦਿੱਤੀ ਮੁਲਾਂਕਣ ਤੁਹਾਡੀ ਸਮਝ ਨੂੰ ਵਧਾ ਸਕਦੀ ਹੈ.',
  'gru-suggest-test.pre-test-lead':
    'ਇਸ ਪਾਠ ਦੇ ਸੰਕਲਪਾਂ ਬਾਰੇ ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਸਮਝ ਨੂੰ ਮਾਪਣ ਲਈ ਪ੍ਰੀ-ਟੈਸਟ ਦਾ ਸੁਝਾਅ ਦਿੱਤਾ ਗਿਆ ਹੈ. ਪ੍ਰੀ-ਟੈਸਟ ਪਾਠ ਵਿੱਚ ਸਮਗਰੀ ਲਈ ਤੁਹਾਨੂੰ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ. ਪ੍ਰੀ-ਟੈਸਟ ਤੁਹਾਡੇ ਕੋਰਸ ਕਾਰਗੁਜ਼ਾਰੀ ਸਕੋਰ ਨੂੰ ਪ੍ਰਭਾਵਤ ਨਹੀਂ ਕਰੇਗਾ.',
  'gru-suggest-test.post-test-lead':
    'ਪੇਸ਼ ਕੀਤੀ ਗਈ ਜਾਣਕਾਰੀ ਦੀ ਤੁਹਾਡੀ ਸਮਝ ਨੂੰ ਮਾਪਣ ਲਈ ਨਿਮਨਲਿਖਤ ਪੋਸਟ-ਟੈੱਸਟ ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਗਈ ਹੈ. ਪੋਸਟ-ਟੈਸਟ ਤੁਹਾਡੇ ਕੋਰਸ ਕਾਰਗੁਜ਼ਾਰੀ ਸਕੋਰ ਨੂੰ ਪ੍ਰਭਾਵਤ ਨਹੀਂ ਕਰੇਗਾ.',
  'gru-suggest-test.backfill-lead':
    'ਤੁਹਾਡੀ ਪ੍ਰੀ-ਟੈਸਟ ਤੋਂ ਪ੍ਰਤਿਕ੍ਰਿਆ ਦੇ ਆਧਾਰ ਤੇ, ਸਬਕ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵਧੀਕ ਸਮੱਗਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰਨ ਲਈ ਇਹ ਸਹਾਇਕ ਹੋ ਸਕਦਾ ਹੈ. ਸਹਾਇਤਾ ਸਮੱਗਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰਨਾ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਨਵੀਂ ਸਮੱਗਰੀ ਸਿੱਖਣ ਲਈ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ',
  'gru-suggest-test.benchmark-lead':
    'ਤੁਸੀਂ ਹੁਣ ਇੱਕ ਬੈਂਚਮਾਰਕ ਮੁਲਾਂਕਣ ਲੈ ਕੇ ਆਪਣੀ ਸਮਝ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ. ਤੁਸੀਂ ਸਫਲਤਾਪੂਰਕ ਬੈਂਚਮਾਰਕ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਇੱਕ ਬੈਜ ਪ੍ਰਾਪਤ ਕਰੋਗੇ. ਬੈਂਚਮਾਰਕ ਤੁਹਾਡੇ ਕੋਰਸ ਕਾਰਗੁਜ਼ਾਰੀ ਸਕੋਰ ਨੂੰ ਪ੍ਰਭਾਵਤ ਨਹੀਂ ਕਰੇਗਾ.',
  'gru-suggest-test.resource-lead':
    'ਇਸ ਕੋਰਸ ਤੇ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ ਤੇ, ਹੇਠਾਂ ਦਿੱਤੇ ਸਰੋਤ ਤੁਹਾਡੀ ਸਮਝ ਨੂੰ ਵਧਾ ਸਕਦੇ ਹਨ.',
  'gru-suggest-test.no': 'ਨਹੀਂ ਧੰਨਵਾਦ',
  'gru-suggest-test.no-suggestions': 'ਇੱਥੇ ਤੁਹਾਡੇ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਸੰਖੇਪ ਹੈ.',
  'gru-suggest-test.take': '{{ਕਿਸਮ}} ਲਵੋ',
  'gru-suggest-test.take-signature-collection': 'ਅਧਿਐਨ ਦਾ ਸੁਝਾਅ ਸੰਗ੍ਰਹਿ',
  'gru-suggest-test.take-signature-assessment': 'ਅਧਿਐਨ ਸੁਝਾਏ ਗਏ ਮੁਲਾਂਕਣ',
  'gru-suggest-test.take-backfill-pretest': 'ਅਧਿਐਨ ਦਾ ਸੁਝਾਅ ਸੰਗ੍ਰਹਿ',
  'gru-suggest-test.take-resource': 'ਅਧਿਐਨ ਸਰੋਤ',
  'gru-suggest-test.end-of-course': 'ਤੁਸੀਂ ਕੋਰਸ ਦੇ ਅੰਤ ਤੱਕ ਪਹੁੰਚ ਗਏ ਹੋ.',
  'gru-content-suggestion.header': 'ਸਾਡੇ ਕੋਲ ਤੁਹਾਡੇ ਲਈ ਕੋਈ ਸੁਝਾਅ ਹੈ!',
  'gru-content-suggestion.suggestion-text.collection':
    'ਇਸ ਵਿਸ਼ੇ ਤੇ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਤੇ ਅਧਾਰਤ, ਅਸੀਂ ਸਿਫ਼ਾਰਿਸ਼ ਕਰਾਂਗੇ ਕਿ ਤੁਸੀਂ ਨਿਪੁੰਨਤਾ ਹਾਸਲ ਕਰਨ ਵਿੱਚ ਮਦਦ ਲਈ ਸਾਡੇ ਸੁਝਾਏ ਗਏ ਸੰਗ੍ਰਿਹ ਵਿੱਚੋਂ ਜਾਓ.',
  'gru-content-suggestion.suggestion-text.assessment':
    'ਇਸ ਵਿਸ਼ੇ ਤੇ ਤੁਹਾਡੀ ਕਾਰਗੁਜ਼ਾਰੀ ਤੇ ਅਧਾਰਤ, ਅਸੀਂ ਸਿਫ਼ਾਰਿਸ਼ ਕਰਾਂਗੇ ਕਿ ਤੁਸੀਂ ਨਿਪੁੰਨਤਾ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਲਈ ਸਾਡੇ ਸੁਝਾਏ ਗਏ ਮੁਲਾਂਕਣ ਤੇ ਜਾਓ',
  'student-open-ended-summary.overall-comment': 'ਸਮੁੱਚੀ ਟਿੱਪਣੀ',
  'student-open-ended-summary.overall-score': 'ਸਮੁੱਚੇ ਸਕੋਰ',
  'student-open-ended-summary.prompt': 'ਸਵਾਲ ਪ੍ਰੌਮਪਟ',
  'gru-performance-chart.teacher-tooltip':
    'ਤੁਹਾਡੇ ਵਿਦਿਆਰਥੀਆਂ ਨੇ ਇਸ ਪਾਠ ਵਿੱਚ ਸਾਰੇ ਮੁਲਾਂਕਣਾਂ ਨੂੰ ਪੂਰਾ ਕਰ ਲਿਆ ਹੈ',
  'report.external-assessment-report.note':
    'ਇਹ ਮੁਲਾਂਕਣ ਲਈ ਵਿਦਿਆਰਥੀਆਂ ਦੁਆਰਾ ਅੰਕਿਤ ਕੀਤੇ ਸਕੋਰਾਂ ਦੇ ਨਾਲ ਬਾਹਰੀ ਮੁਲਾਂਕਣ ਹੈ ਵਿਅਕਤੀਗਤ ਪ੍ਰਸ਼ਨ ਲੈਵਲ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ.',
  'report.external-assessment-report.wish': 'ਵਧਾਈ! ਤੁਸੀਂ ਸਕੋਰ',
  'report.external-assessment-report.reference':
    'ਇਸ ਬਾਹਰੀ ਮੁਲਾਂਕਣ ਤੱਕ ਪਹੁੰਚ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ',
  'report.external-collection-report.note':
    'ਇਹ ਇੱਕ ਬਾਹਰੀ ਸੰਗ੍ਰਹਿ ਹੈ ਜਿਸਨੂੰ ਇਕੱਠਾ ਕਰਨ ਲਈ ਵਿਦਿਆਰਥੀਆਂ ਦੁਆਰਾ ਅੰਕਿਤ ਕੀਤੇ ਅੰਕ ਹਨ. ਵਿਅਕਤੀਗਤ ਪ੍ਰਸ਼ਨ ਲੈਵਲ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ.',
  'report.external-collection-report.wish': 'ਵਧਾਈ! ਤੁਸੀਂ ਸਕੋਰ',
  'report.external-collection-report.reference':
    'ਇਸ ਬਾਹਰੀ ਸੰਗ੍ਰਹਿ ਨੂੰ ਐਕਸੈਸ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ',
  'report.competency-report.title': 'ਸਮਰੱਥਾ ਰਿਪੋਰਟ',
  'report.competency-report.no-subject': 'ਕੋਈ ਵਿਸ਼ਾ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ',
  'report.competency-report.prerequisites': 'ਪੂਰਿ-ਲੋੜੀਂਦੀਆਂ ਚੀਜ਼ਾਂ',
  'report.competency-report.signature-assessments': 'ਹਸਤਾਖਰ ਮੁਲਾਂਕਣ',
  'report.competency-report.signature-collections': 'ਦਸਤਖਤ ਸੰਗ੍ਰਿਹ',
  'report.competency-report.show-global-data': 'ਗਲੋਬਲ ਡਾਟਾ ਦਿਖਾਓ',
  'report.competency-report.show-student-data': 'ਵਿਦਿਆਰਥੀ ਡੇਟਾ ਦਿਖਾਓ',
  'report.competency-report.show-learning-map': 'ਸਿਖਲਾਈ ਨਕਸ਼ਾ ਦਿਖਾਓ',
  'report.competency-report.note':
    'Score 80% or more in our signature assessment and show your mastery',
  'report.domain-report': 'ਡੋਮੇਨ ਰਿਪੋਰਟ',
  'competency-info-content.portfolio': 'PORTFOLIO',
  'competency-info-content.metadata': 'METADATA',
  'competency-info-content.learning-map': 'LEARNING MAP',
  'competency-meta-data.title': 'ALT-CONCEPTS',
  'competency-meta-data.heading.micro': 'MICRO COMPETENCIES',
  'competency-meta-data.heading.prequisite': 'PREQUISITE COMPETENCIES',
  'competency-meta-data.nodata.micro':
    'There are no micro-competencies defined for this competency',
  'competency-meta-data.nodata.prequisite':
    'There are no prerequisite-competencies defined for this competency',
  'competency-meta-data.nodata.competency':
    'There are no alt-concepts defined for this competency',
  'student-journey.heading': 'YOUR JOURNEY',
  'student-journey.teacher-heading': 'STUDENT JOURNEY',
  'student-journey.nodata':
    'You are yet to start your journey for this competency',
  'student-journey.no-data-teacher':
    'Student are yet to start journey for this competency',
  'student-journey.student-status-3':
    'You have asserted that you know this competency and you have not studied any learning activity on the Navigator for this competency.',
  'student-journey.student-status-2':
    'You have not studied any learning activity on the Navigator for this competency. The status for this competency is inferred mastery based on evidence of mastery in another competency',
  'student-journey.teacher-status-2':
    'The student has not studied any learning activity on the Navigator for this competency. The status for this competency is inferred mastery based on evidence of mastery in another competency',
  'student-journey.teacher-status-3':
    'The student has asserted mastery in the competency and has not studied any learning activity on the Navigator for this competency.',
  'learning-map.practice-question': 'practice questions',
  'learning-map.no-practice-questions':
    'There are no practice questions for this competency',
  'learning-map.solved-examples': 'solved examples',
  'learning-map.no-solved-examples':
    'There are no solved examples for this competency',
  'learning-map.challenging-questions': 'challenging questions',
  'learning-map.no-challenging-questions':
    'There are no challenging questions for this competency',
  'student-card.message': 'This {{type}} has been deleted',
  'self-report.your-score': 'ਤੁਹਾਡਾ ਸਕੋਰ',
  'self-report.time_spent': 'ਸਮਾਂ ਬਿਤਾਇਆ',
  'self-report.update-error': 'ਸਕੋਰ ਨੂੰ ਅੱਪਡੇਟ ਕਰਨ ਵਿੱਚ ਸਮੱਸਿਆ',
  'self-report.validation-error': 'ਪ੍ਰਮਾਣਿਤ ਅੰਕ ਦਾਖਲ ਕਰੋ',
  'self-report.enter-score': 'ਇੱਥੇ ਤੁਹਾਡਾ ਸਕੋਰ ਦਾਖਲ ਕਰੋ',
  'self-report.enter-timeSpent': 'ਇੱਥੇ ਬਿਤਾਏ ਆਪਣਾ ਸਮਾਂ ਦਰਜ ਕਰੋ',
  'self-report.validation-error-time': 'ਪ੍ਰਮਾਣਿਤ ਸਮਾਂ ਦਾਖ਼ਲ ਕਰੋ',
  'notifications.notificationlist-header-title': 'ਸੂਚਨਾਵਾਂ',
  'notifications.show-more': 'ਹੋਰ ਦਿਖਾਓ',
  'notifications.type.teacher-suggestion-title':
    'ਤੁਹਾਡੇ ਕੋਲ ਕਲਾਸ ਵਿਚ ਨਵਾਂ ਅਧਿਆਪਕ ਸੁਝਾਅ ਹੈ: {{classtitle}}',
  'notifications.type.student-gradable-submission-title':
    'ਤੁਹਾਡੇ ਕੋਲ {{occurrence}} ਆਈਟਮ (ਕਲਾਸਾਂ) ਕਲਾਸ ਵਿੱਚ ਗ੍ਰੇਡ ਤੱਕ ਹੈ: {{classtitle}}',
  'notifications.type.student-self-report-title':
    '{{occurrence}} ਵਿਦਿਆਰਥੀ (ਵਿਦਿਆਰਥੀ) ਨੇ ਕਲਾਸ ਤੇ ਪ੍ਰਦਰਸ਼ਨ ਦੀ ਰਿਪੋਰਟ ਦਿੱਤੀ: {{classtitle}}',
  'notifications.type.teacher-override-title':
    'ਅਧਿਆਪਕ ਨੇ ਕਲਾਸ ਵਿਚ ਤੁਹਾਡੀ ਅਧੀਨਗੀ ਨੂੰ ਠੀਕ ਕੀਤਾ ਹੈ: {{classtitle}}',
  'notifications.type.teacher-grading-complete-title':
    'ਅਧਿਆਪਕ ਨੇ ਕਲਾਸ ਵਿਚ ਤੁਹਾਡੀ ਅਧੀਨਗੀ ਨੂੰ ਸ਼੍ਰੇਣੀਬੱਧ ਕੀਤਾ ਹੈ: {{classtitle}}',
  'notifications.typeinclass.teacher-suggestion-title':
    'ਤੁਹਾਡੇ ਕੋਲ ਇਕ ਨਵਾਂ ਅਧਿਆਪਕ ਸੁਝਾਅ ਹੈ',
  'notifications.typeinclass.student-gradable-submission-title':
    'ਤੁਹਾਡੇ ਕੋਲ ਕਲਾਸ ਲਈ {{occurrence}} ਵਿਦਿਆਰਥੀ ਆਈਟਮਾਂ (ਨੰਬਰ) ਹਨ',
  'notifications.typeinclass.student-self-report-title':
    '{{occurrence}} ਵਿਦਿਆਰਥੀ (ਵਿਦਿਆਰਥੀ) ਨੇ ਰਿਪੋਰਟ ਕੀਤੀ ਪ੍ਰਦਰਸ਼ਨ',
  'notifications.typeinclass.teacher-override-title':
    'ਅਧਿਆਪਕ ਨੇ ਤੁਹਾਡੀ ਅਧੀਨਗੀ ਨੂੰ ਠੀਕ ਕੀਤਾ ਹੈ',
  'notifications.typeinclass.teacher-grading-complete-title':
    'ਅਧਿਆਪਕ ਨੇ ਤੁਹਾਡੀ ਜਮਾਤ ਨੂੰ ਕਲਾਸ ਵਿਚ ਦਰਜਾ ਦਿੱਤਾ ਹੈ',
  'goahead.add.something': 'Go ahead, add something.',
  'present.diagnostic.determine.not.know':
    'Present a diagnostic to determine the student\'s current location, if not known?',
  'present.diagnostic.determine.know':
    '(If you select No, the {{subject}} level will be used to approximate the student\'s location)',
  'add.to.todays.class': 'Add to Today\'s Class',
  warning: 'warning',
  'ca.warn.multiple-competencies-1':
    'The assessment is tagged to multiple competencies.',
  'ca.warn.multiple-competencies-2':
    'Students will gain mastery on all the competencies on successfully completing the assessment.',
  'ca.warn.multiple-competencies-3':
    'You can remix (copy) the assessment and tag it to the competency(ies) for which the students should gain masterymatery, before adding it to the Class Activity',
  'ca.warn.trun-off.mastery-accrual-1':
    'Any student who has already successfully completed the assessment will have gained mastery.',
  'ca.warn.trun-off.mastery-accrual-2':
    'Turning mastery off will not update the mastery status for these students.',
  'ca.warn.trun-on.mastery-accrual':
    'Turning mastery accrual on now will not result in update to mastery status for students who have already completed the assessment.',
  'ca.mastery-accrual.update.error':
    'Oops! Unable to update class activity content mastery accrual right now. Please try again shortly.'
});
