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
  'errors.description': 'ഈ ഫീൽഡ്',
  'errors.inclusion': '{{description}} പട്ടികയിൽ ഉൾപ്പെടുത്തിയിട്ടില്ല',
  'errors.exclusion': '{{വിവരണം}} സംവരണം ചെയ്തിരിക്കുന്നു',
  'errors.invalid': '{{description}} അസാധുവാണ്',
  'errors.confirmation': '{{വിവരണം}} പൊരുത്തമില്ല {{on}}',
  'errors.accepted': '{{വിവരണം}} അംഗീകരിക്കണം',
  'errors.empty': '{{description}} എന്നത് ശൂന്യമാവില്ല',
  'errors.blank': '{{description}} എന്നത് ശൂന്യമാവില്ല',
  'errors.present': '{{description}} ശൂന്യമായിരിക്കണം',
  'errors.collection': '{{description}} ഒരു ശേഖരമായിരിക്കണം',
  'errors.singular': '{{description}} ഒരു ശേഖരമായിരിക്കാൻ കഴിയില്ല',
  'errors.tooLong':
    '{{description}} ദൈർഘ്യമേറിയതാണ് (പരമാവധി {{max}} പ്രതീകങ്ങൾ)',
  'errors.tooShort': '{{വിവരണം}} വളരെ ചെറുതാണ് (കുറഞ്ഞത് {{മി}} പ്രതീകങ്ങൾ)',
  'errors.before': '{{description}} {{pre}} എന്നതിനു മുമ്പായിരിക്കണം',
  'errors.after': '{{വിവരണം}} {{വിവരണം}}',
  'errors.wrongDateFormat':
    '{{description}} {{format}} യുടെ രൂപത്തിൽ ആയിരിക്കണം',
  'errors.wrongLength':
    '{{description}} തെറ്റായ ദൈർഘ്യം ({{is}} പ്രതീകങ്ങൾ ആയിരിക്കണം)',
  'errors.notANumber': '{{description}} ഒരു സംഖ്യയായിരിക്കണം',
  'errors.notAnInteger': '{{description}} ഒരു പൂർണ്ണസംഖ്യയായിരിക്കണം',
  'errors.greaterThan': '{{വിവരണം}}, {{gt is}}',
  'errors.greaterThanOrEqualTo':
    '{{description}} {{gte}} എന്നതിനെക്കാൾ കൂടുതലോ തുല്യമോ ആയിരിക്കണം',
  'errors.equalTo': '{{വിവരണം}} {{വിവരണം} എന്നതിന് തുല്യമായിരിക്കണം.',
  'errors.lessThan': '{{description}} {{lt}} എന്നതിനേക്കാൾ കുറവായിരിക്കണം',
  'errors.lessThanOrEqualTo':
    '{{description}} {{lte}} എന്നതിലും കുറഞ്ഞതിലും ആയിരിക്കണം',
  'errors.otherThan': '{{വിവരണം}} {{value}}',
  'errors.odd': '{{description}} ഒറ്റ സംഖ്യയായിരിക്കണം',
  'errors.even': '{{description}} ഉണ്ടായിരിക്കണം',
  'errors.positive': '{{വിവരണം}} പോസിറ്റീവ് ആയിരിക്കണം',
  'errors.date': '{{description}} ഒരു സാധുവായ തീയതി ആയിരിക്കണം',
  'errors.email': '{{description}} ഒരു സാധുവായ ഇമെയിൽ വിലാസമായിരിക്കണം',
  'errors.phone': '{{description}} ഒരു സാധുവായ ഫോൺ നമ്പർ ആയിരിക്കണം',
  'errors.url': '{{description}} ഒരു സാധുവായ url ആയിരിക്കണം',
  'common.relevance': 'പ്രാധാന്യം',
  'common.engagement': 'ഇടപഴകൽ',
  'common.efficacy': 'ഫലപ്രാപ്തി',
  'common.grid': 'ഗ്രിഡ്',
  'common.list': 'പട്ടിക',
  'common.first': 'ആദ്യം',
  'common.last': 'അവസാനത്തെ',
  'common.name': 'പേര്',
  'common.user': 'ഉപയോക്താവ്',
  'common.content-name': 'ഉള്ളടക്കത്തിന്റെ പേര്',
  'common.lastName': 'പേരിന്റെ അവസാന ഭാഗം',
  'common.firstName': 'പേരിന്റെ ആദ്യഭാഗം',
  'common.filter-by': 'ഫിൽട്ടർ ചെയ്യുക',
  'common.more': 'കൂടുതൽ',
  'common.apply-filter': 'apply filter',
  'search-help-message': 'Choose filters to apply',
  'common.avg-score': 'ശരാശരി സ്കോർ',
  'common.frq': 'frq',
  'common.schedule': 'പട്ടിക',
  'common.responses': 'പ്രതികരണങ്ങൾ',
  'common.no-lesson-info-message': 'ഈ യൂണിറ്റിന് എന്തെങ്കിലും പാഠങ്ങൾ ഉണ്ട്.',
  'common.no-collection-info-message': 'ഈ പാഠത്തിൽ ശേഖരങ്ങളുണ്ടെങ്കിലും.',
  'common.gooru-suggestions': 'gooru നിർദ്ദേശങ്ങൾ',
  'common.gooru-catalog': 'ഗോറു കാറ്റലോഗ്',
  'common.suggestion-made-to': 'നിർദ്ദേശം ഉണ്ടാക്കി',
  'common.student-selected': 'വിദ്യാർത്ഥി തിരഞ്ഞെടുത്തു',
  'common.no-suggest-result-message':
    ' പൊരുത്തപ്പെടുന്ന ഉള്ളടക്കമൊന്നും കണ്ടെത്തിയില്ല',
  'common.no-suggest-results-message':
    'നിങ്ങൾക്ക് അനുബന്ധ ഉള്ളടക്കം തിരയാനും കണ്ടെത്താനും കഴിയും.',
  'common.no-suggest-search-results-message':
    'നിങ്ങളുടെ അക്ഷരപ്പിശക് പരിശോധിക്കുക. നമ്മൾ എല്ലാവരും തെറ്റ് ചെയ്യുന്നു! അല്ലെങ്കിൽ സമാനമായ പദം തിരയാൻ ശ്രമിക്കുക.',
  'common.a-collection': 'ഒരു ശേഖരം',
  'common.a-course': 'ഒരു കോഴ്സ്',
  'common.a-question': 'ഒരു ചോദ്യം',
  'common.a-resource': 'ഒരു വിഭവം',
  'common.a-rubric': 'ഒരു റബ്രിക്ക്',
  'common.all-completed': 'എല്ലാം പൂർത്തിയായി',
  'common.an-assessment': 'ഒരു വിലയിരുത്തൽ',
  'common.about': 'കുറിച്ച്',
  'common.about-you': 'നിന്നേക്കുറിച്ച്',
  'common.about-me': 'എന്നെ പറ്റി',
  'common.accept': 'സ്വീകരിക്കൂ',
  'common.ignore': 'അവഗണിക്കുക',
  'common.add': 'ചേർക്കുക',
  'common.plan-an-activities': 'Plan your activities',
  'common.plan-an-activities-msg':
    'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
  'common.Reschedule': 'പുനരാരംഭിക്കുക',
  'common.no-unschedule-items': 'ഷെഡ്യൂൾ ചെയ്യേണ്ട പ്രവർത്തനങ്ങൾ നിങ്ങൾക്കില്ല',
  'common.repeat-activity': 'ആവർത്തിക്കുന്ന പ്രവർത്തനം',
  'common.add-assessment': 'പുതിയ വിലയിരുത്തൽ സൃഷ്ടിക്കുക',
  'common.add-century-skills': '21-ാം നൂറ്റാണ്ടിലെ കഴിവുകൾ ചേർക്കുക',
  'common.add-collaborator': 'സഹകാരി ചേർക്കുക',
  'common.add-collection': 'പുതിയ ശേഖരം സൃഷ്ടിക്കുക',
  'common.add-collection-item': 'വിഭവമോ ചോദ്യമോ സൃഷ്ടിക്കുക',
  'common.add-competency': 'യോഗ്യത കൂട്ടുക',
  'common.add-content-prompt':
    'നിങ്ങൾ ഇതുവരെ സൃഷ്ടിച്ചില്ല [1] {{type}} [2]. ധൈര്യമായിരിക്കുക.',
  'common.add-course': 'പുതിയ കോഴ്സുകൾ സൃഷ്ടിക്കുക',
  'common.add-coruse-to-class': 'കോഴ്സ് ചേർക്കുക',
  'common.add-domains-to-unit': 'യൂണിറ്റുകൾ ഡൊമെയ്നുകൾ ചേർക്കുക',
  'common.add-url': 'url ചേർക്കുക',
  'common.add-from-url': 'url ൽ നിന്ന് ചേർക്കുക',
  'common.add-lessons': 'പാഠങ്ങൾ ചേർക്കുക',
  'common.add-new-lesson': 'പുതിയ പാഠം സൃഷ്ടിക്കുക',
  'common.add-new-unit': 'പുതിയ യൂണിറ്റ് സൃഷ്ടിക്കുക',
  'common.add-new-resource': 'പുതിയ റിസോഴ്സ് ഉണ്ടാക്കുക',
  'common.add-new-question': 'ഒരു പുതിയ ചോദ്യം സൃഷ്ടിക്കുക',
  'common.add-question': 'ചോദ്യം സൃഷ്ടിക്കുക',
  'common.add-question-image': 'ചോദ്യ ചിത്രം ചേർക്കുക',
  'common.add-rubric': 'പുതിയ റബ്രിക്ക് ചേർക്കുക',
  'common.add-standard': 'സ്റ്റാൻഡേർഡ് ചേർക്കുക',
  'common.add-standards': 'മാനദണ്ഡങ്ങൾ ചേർക്കുക',
  'common.add-standards-to-collection': 'ശേഖരത്തിലേക്ക് മാനദണ്ഡങ്ങൾ ചേർക്കുക',
  'common.add-to': 'ഇതിലേക്ക് ചേർക്കുക',
  'common.add-to-classroom': 'ക്ലാസ്റൂമിൽ ചേർക്കുക',
  'common.add-to-daily-class': 'ക്ലാസ് പ്രവർത്തനങ്ങൾ ചേർക്കുക',
  'common.add-to-collection-success':
    'നിങ്ങൾ {{collectiontitle}} ൽ {{contenttitle}} ചേർത്തിട്ടുണ്ട്. നിങ്ങൾ {{collectiontype}} എഡിറ്റുചെയ്യണോ?',
  'common.add-to-lesson-success':
    '{{lesstitle}} - ലേക്ക് താങ്കൾ {{collectiontitle}} ചേർത്തിട്ടുണ്ട്. നിങ്ങൾ {{collectiontype}} എഡിറ്റുചെയ്യണോ?',
  'common.add-type-question': 'നിങ്ങൾ ഏത് തരം ചോദ്യം ആഗ്രഹിക്കുന്നു?',
  'common.add-type-resource': 'എന്ത് വിഭവമാണ് ഇത്?',
  'common.add-units': 'യൂണിറ്റുകൾ ചേർക്കുക',
  'common.added': 'ചേർത്തു',
  'common.advanced-editing': 'വിപുലമായ എഡിറ്റിംഗ്',
  'common.announcements': 'പ്രഖ്യാപനങ്ങൾ',
  'common.anonymous_mode': 'അജ്ഞാത മോഡ്',
  'common.answer': 'നിങ്ങളുടെ ഉത്തരം',
  'common.answer-correct': 'നിങ്ങൾ ശരിയാണ്!',
  'common.answer-incorrect': 'നിങ്ങൾ തെറ്റാണ് ...',
  'common.answer-key-was-hidden':
    'ശ്രദ്ധിക്കുക: നിങ്ങളുടെ ടീച്ചർ ഉത്തരം കീ മറച്ചിരിക്കുന്നു.',
  'common.approved': 'അംഗീകരിച്ചു',
  'common.archive': 'ആർക്കൈവ് ചെയ്യുക',
  'common.assessment': 'മൂല്യനിർണ്ണയം',
  'common.assessment-disabled': 'നിങ്ങൾക്ക് ഈ വിലയിരുത്തൽ ശ്രമിക്കരുത്',
  'common.assessment-external': 'വിലയിരുത്തൽ-ബാഹ്യ',
  'common.assessment-pl.zero': 'വിലയിരുത്തലുകൾ',
  'common.assessment-pl.one': 'മൂല്യനിർണ്ണയം',
  'common.assessment-pl.other': 'വിലയിരുത്തലുകൾ',
  'common.assessment-title': 'വിലയിരുത്തൽ ശീർഷകം',
  'common.assessmentInitial': 'a',
  'common.assessments': 'വിലയിരുത്തലുകൾ',
  'common.assign': 'നിയമിക്കുക',
  'common.assign-to-class': 'ക്ലാസ്റൂമിൽ നൽകുക',
  'common.assign-to-course': 'കോഴ്സിനു നൽകുക',
  'common.attempt': 'ശ്രമം നമ്പർ',
  'common.audience': 'പ്രേക്ഷകർ',
  'common.avatarFor': 'എന്നതിനായുള്ള അവതാർ',
  'common.averageScore': 'ശരാശരി സ്കോർ',
  'common.back': 'തിരികെ',
  'common.back-to-assessment': 'തിരികെ വിലയിരുത്തൽ',
  'common.back-to-collection': 'തിരികെ ശേഖരത്തിലേക്ക്',
  'common.back-to-course-map': 'തിരികെ പോകാൻ മാപ്പ്',
  'common.back-to-data': 'തിരികെ ഡാറ്റയിലേക്ക്',
  'common.back-to-report': 'തിരികെ റിപ്പോർട്ട്',
  'common.best-practices': 'മികച്ച രീതികൾ',
  'common.beta': 'ബീറ്റ',
  'common.big-ideas': 'വലിയ ആശയങ്ങൾ',
  'common.biography': 'ജീവചരിത്രം',
  'common.bookmark': 'ബുക്ക്മാർക്ക്',
  'common.bookmarks': 'ബുക്ക്മാർക്കുകൾ',
  'common.bookmarked-content-success':
    'ഈ ബുക്മാർക്ക് ചെയ്ത {{contenttype}} നിങ്ങളുടെ സ്വതന്ത്ര പഠന പേജിലേക്ക് ചേർക്കും.',
  'common.bookmarked-success':
    'എല്ലാ ബുക്ക്മാർക്കുചെയ്ത ഉള്ളടക്കവും സ്വതന്ത്ര പഠന പേജിലേക്ക് ചേർക്കും.',
  'common.builder': 'എഡിറ്റർ',
  'common.cancel': 'റദ്ദാക്കുക',
  'common.categories': 'വിഭാഗങ്ങൾ',
  'common.category': 'വിഭാഗം',
  'common.categoryOptions.k12': 'k-12',
  'common.categoryOptions.k12IN': 'k12in',
  'common.categoryOptions.higher-ed': 'ഉന്നത വിദ്യാഭ്യാസം',
  'common.categoryOptions.professional-dev': 'പ്രൊഫഷണൽ വികസനം',
  'common.century-skills': '21-ാം നൂറ്റാണ്ടിലെ കഴിവുകൾ',
  'common.choose': 'തിരഞ്ഞെടുക്കുക',
  'common.choose-file': 'ഒരു ഫയൽ തിരഞ്ഞെടുക്കുക',
  'common.class': 'ക്ലാസ്റൂം',
  'common.classScores': 'ക്ലാസ് സ്കോറുകൾ',
  'common.click-unBookmark': 'unbookmark ലേക്ക് ക്ലിക്കുചെയ്യുക',
  'common.close': 'അടയ്ക്കുക',
  'common.collection': 'ശേഖരണം',
  'common.collection-external': 'External Collection',
  'common.collection-pl.zero': 'ശേഖരങ്ങൾ',
  'common.collection-pl.one': 'ശേഖരണം',
  'common.collection-pl.other': 'ശേഖരങ്ങൾ',
  'common.collection-title': 'ശേഖരത്തിന്റെ ശീർഷകം',
  'common.collections': 'ശേഖരങ്ങൾ',
  'common.collectionInitial': 'സി',
  'common.competency': 'യോഗ്യത',
  'common.competencies': 'കഴിവുകൾ',
  'common.completed': 'പൂർത്തിയായി',
  'common.completion': 'പൂർത്തീകരണം',
  'common.community': 'കമ്മ്യൂണിറ്റി',
  'common.confirm': 'സ്ഥിരീകരിക്കുക',
  'common.confirm-copy': 'സ്ഥിരീകരിക്കുക & പകർത്തുക',
  'common.content': 'ഉള്ളടക്കം',
  'common.content-manager': 'ഉള്ളടക്ക മാനേജർ',
  'common.contentUnavailable': 'ഉള്ളടക്കം ലഭ്യമല്ല',
  'common.contentUnavailabletoday':
    'നിലവിലെ പ്രവർത്തനങ്ങളൊന്നുമില്ല. കോഴ്സ് മാപ്പിൽ അല്ലെങ്കിൽ എന്റെ ഉള്ളടക്കം നിന്ന് ക്ലാസ് പ്രവർത്തനങ്ങൾ ചേർക്കുക.',
  'common.contentUnavailableyesterday': 'പ്രവർത്തനങ്ങളൊന്നും ചേർത്തിട്ടില്ല.',
  'common.contributed-by': 'സംഭാവന നൽകിയത്',
  'common.copy': 'പകർത്തുക',
  'common.copy-to': 'ഇതിലേക്ക് പകർത്തുക',
  'common.correct': 'ശരിയാണ്',
  'common.correct-answer': 'ശരിയായ ഉത്തരം',
  'common.correct-answers': 'ശരിയായ ഉത്തരം (കൾ)',
  'common.incorrect-answers': 'തെറ്റായ ഉത്തരം (കൾ)',
  'common.rubric-graded': 'റൂബിക്ക് ബിരുദം',
  'common.self-graded': 'സ്വയം പക്വത',
  'common.rubric-grade': 'റൂബിക്ക് ഗ്രേഡ്',
  'common.brief': 'ചുരുക്കത്തിലുള്ള',
  'common.update-grade-score':
    'നിങ്ങളുടെ ഫ്രേക്ക് പൂർത്തിയാക്കാൻ ഗ്രേഡ് സ്കോർ അപ്ഡേറ്റ് ചെയ്യുക.',
  'common.answer-this-rubric':
    'നിങ്ങളുടെ FRQ പൂർത്തിയാക്കാൻ ഈ റബ്ബിക്ക് ഉത്തരം നൽകുക.',
  'common.all-caught-up': 'നിങ്ങളെല്ലാം പിടിക്കപ്പെടുന്നു!',
  'common.no-users-to-grade': 'ഈ ഫ്രേക്ക് വേണ്ടി ഉപയോക്താക്കൾക്ക് ഗ്രേഡ് ഇല്ല.',
  'common.rubric-needs-grading': 'റൂബിക്ക് ഗ്രേഡിംഗ് ആവശ്യമാണ്',
  'common.not-answered': 'ഉത്തരം കിട്ടിയില്ല',
  'common.rubric-not-answered': 'ഉത്തരം കിട്ടിയില്ല',
  'common.country': 'രാജ്യം',
  'common.course-map': 'കോഴ്സ് മാപ്പ്',
  'common.course': 'കോഴ്സ്',
  'common.course-title': 'കോഴ്സ് ശീർഷകം',
  'common.courses': 'കോഴ്സുകൾ',
  'common.competency-status-0': 'Not Started',
  'common.competency-status-1': 'In Progress',
  'common.competency-status-2': 'Mastered (Inferred)',
  'common.competency-status-3': 'Mastered (Asserted)',
  'common.competency-status-4': 'Mastered (Earned)',
  'common.competency-status-5': 'Mastered (Demonstrated)',
  'common.create': 'സൃഷ്ടിക്കാൻ',
  'common.createClass': 'ക്ലാസ് സൃഷ്ടിക്കുക',
  'common.created-by': 'ഉണ്ടാക്കിയത്',
  'common.create-rubric': 'പുതിയ റബ്രിക്ക് സൃഷ്ടിക്കുക',
  'common.current-attempt': 'നിലവിലുള്ള ശ്രമം',
  'common.currently-studying': 'നിലവിൽ പഠിക്കുന്നു',
  'common.delete': 'ഇല്ലാതാക്കുക',
  'common.delete-instructions.links-inaccessible':
    'എല്ലാ പങ്കിടൽ ലിങ്കുകളും പ്രവേശനക്ഷമമാകും',
  'common.delete-instructions.content-inaccessible':
    'എല്ലാ ഉള്ളടക്കവും അതിനെ കെട്ടിയിട്ടിരിക്കുന്ന ക്ലാസ്മുറികളിലേക്ക് പ്രവേശിക്കാൻ കഴിയില്ല',
  'common.depth-of-knowledge': 'അറിവിന്റെ ആഴം',
  'common.description': 'വിവരണം',
  'common.destination': 'Destination',
  'common.disappear-after-login':
    'ഇത് {{loginnumber}} ലോഗിനുകൾക്കുശേഷം അപ്രത്യക്ഷമാകും',
  'common.disappear-next-login': 'ഇത് അടുത്ത പ്രവേശനത്തിൽ ദൃശ്യമാകില്ല',
  'common.district': 'ജില്ല',
  'common.domain': 'ഡൊമെയ്ൻ',
  'common.domains': 'ഡൊമെയ്നുകൾ',
  'common.download': 'ഡൗൺലോഡ് ചെയ്യുക',
  'common.download-print': 'ഡൗൺലോഡ് ചെയ്യുക / പ്രിന്റ് ചെയ്യുക',
  'common.drag-drop-suggestions': 'അല്ലെങ്കിൽ നിർദ്ദേശങ്ങൾ വലിച്ചിടുക ...',
  'common.download-report': 'റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
  'common.done': 'ചെയ്തു',
  'common.edit': 'എഡിറ്റ് ചെയ്യുക',
  'common.showassessments': 'വിലയിരുത്തലുകൾ കാണിക്കുക',
  'common.showcollections': 'ശേഖരങ്ങൾ കാണിക്കുക',
  'common.showlessons': 'പാഠങ്ങൾ കാണിക്കുക',
  'common.collapse': 'ചുരുക്കുക',
  'common.expand': 'വികസിപ്പിക്കുക',
  'common.edit-assessment': 'വിലയിരുത്തൽ എഡിറ്റുചെയ്യുക',
  'common.edit-collection': 'ശേഖരം എഡിറ്റുചെയ്യുക',
  'common.edit-course': 'കോഴ്സ് എഡിറ്റുചെയ്യുക',
  'common.edit-question': 'ചോദ്യം എഡിറ്റുചെയ്യുക',
  'common.edit-resource': 'റിസോഴ്സ് എഡിറ്റ് ചെയ്യുക',
  'common.edit-rubric': 'റബ്രിക്ക് എഡിറ്റ് ചെയ്യുക',
  'common.email_support': 'support@gooru.org',
  'common.emotions.emotion-1': 'എനിക്ക് സഹായം ആവശ്യമാണ്',
  'common.emotions.emotion-2': 'എനിക്ക് മനസ്സിലായില്ല',
  'common.emotions.emotion-3': 'മെഹ് ...',
  'common.emotions.emotion-4': 'എനിക്ക് മനസിലായി',
  'common.emotions.emotion-5': 'എനിക്ക് വിശദീകരിക്കാം',
  'common.enter-url': 'url നൽകുക',
  'common.enrolled-students': 'എൻറോൾ ചെയ്ത വിദ്യാർത്ഥികൾ',
  'common.errors.join-class-code': 'ദയവായി ക്ലാസ്റൂം കോഡ് നൽകുക.',
  'common.errors.answer-has-no-image':
    'ദയവായി ഒരു ഉത്തരം ഇമേജ് അപ്ലോഡ് ചെയ്യുക.',
  'common.errors.add-username': 'ദയവായി ഒരു ഉപയോക്തൃനാമം നൽകുക.',
  'common.errors.add-course-title': 'ദയവായി കോഴ്സ് ടൈറ്റിൽ നൽകുക.',
  'common.errors.add-question-answer-text': 'ദയവായി ഉത്തരം ചോയ്സ് പാഠം നൽകുക.',
  'common.errors.add-question-description': 'ദയവായി ചോദ്യം നൽകുക.',
  'common.errors.add-question-title': 'ദയവായി ചോദ്യ ശീർഷകം നൽകുക.',
  'common.errors.assessment-title-presence':
    'ദയവായി അസസ്സ്മെന്റ് ശീർഷകം നൽകുക.',
  'common.errors.can-not-join-class':
    'ക്ഷമിക്കണം! ക്ലാസ്റൂമിൽ ചേരാൻ കഴിഞ്ഞില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.assessment-not-added-to':
    'ക്ഷമിക്കണം! പാഠം ഇപ്പോൾ മൂല്യനിർണയം ചേർക്കാൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.assessment-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ മൂല്യനിർണ്ണയം പകർത്താൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.assessment-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ മൂല്യനിർണ്ണയം സൃഷ്ടിക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.assessment-not-updated':
    'ക്ഷമിക്കണം! ഇപ്പോൾ മൂല്യനിർണ്ണയം അപ്ഡേറ്റ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.category-title-presence': 'ദയവായി വിഭാഗം ശീർഷകം നൽകുക.',
  'common.errors.class-min-score':
    'ഏറ്റവും കുറഞ്ഞ സ്കോർ 1 നും 100 നും ഇടയിലുള്ള ഒരു സംഖ്യയായിരിക്കണം',
  'common.errors.class-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ക്ലാസ്റൂം സൃഷ്ടിക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.class-title-presence':
    'ദയവായി താങ്കളുടെ ക്ലാസ്റൂം ഒരു പേര് നൽകുക.',
  'common.errors.collection-not-added-to':
    'ക്ഷമിക്കണം! ഇപ്പോൾ പാഠം ശേഖരിക്കാൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.collection-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ശേഖരം പകർത്താൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.collection-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ശേഖരം സൃഷ്ടിക്കാൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.collection-not-updated':
    'ക്ഷമിക്കണം! ശേഖരം ഇപ്പോൾ അപ്ഡേറ്റുചെയ്യാൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.collection-title-presence': 'ശേഖരത്തിന്റെ ശീർഷകം നൽകുക.',
  'common.errors.correct-answer-presence':
    'ദയവായി ശരിയായ ഉത്തരം സൂചിപ്പിക്കുക.',
  'common.errors.course-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ കോഴ്സ് പകർത്താനാവില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.course-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ കോഴ്സ് സൃഷ്ടിക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.course-not-updated':
    'ക്ഷമിക്കണം! ഇപ്പോൾ കോഴ്സ് അപ്ഡേറ്റ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.highlight-text-not-selected':
    'ദയവായി ശരിയായ ഉത്തരം സൂചിപ്പിക്കുക.',
  'common.errors.highlight-text-wrong-format': 'തെറ്റായ ചോദ്യ ഫോർമാറ്റ്.',
  'common.errors.hotspot-text-max-choices':
    'നിങ്ങൾ ഉത്തര ചോയ്സിന്റെ പരിധിയിൽ എത്തി.',
  'common.errors.file-max-size':
    '5mb ൽ കുറഞ്ഞ വലിപ്പമുള്ള ഫയലുകൾ മാത്രമേ പിന്തുണയ്ക്കൂ',
  'common.errors.file-upload-missing':
    'താഴെക്കൊടുത്തിരിക്കുന്ന ഏതെങ്കിലും വിപുലീകരണങ്ങളുള്ള ഒരു ഫയൽ ദയവായി തിരഞ്ഞെടുക്കുക: {{extensions}}',
  'common.errors.getting-next-resource':
    'നിങ്ങളുടെ ഉത്തരം സമർപ്പിക്കുന്നതിൽ ഒരു പിശകുണ്ടായി. വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.lesson-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ പാഠം പകർത്താൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.lesson-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ പാഠം സൃഷ്ടിക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.lesson-not-loaded':
    'ക്ഷമിക്കണം! ഇപ്പോൾ പാഠം ലോഡുചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.lesson-title-required': 'ദയവായി പാഠം ശീർഷകം നൽകുക.',
  'common.errors.password-confirm': 'ദയവായി നിങ്ങളുടെ പാസ്വേഡ് സ്ഥിരീകരിക്കുക.',
  'common.errors.password-length':
    'പാസ്വേഡ് 5 മുതൽ 14 വരെ പ്രതീകങ്ങൾക്കിടയിലായിരിക്കണം.',
  'common.errors.password-not-match': 'പാസ്വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല.',
  'common.errors.password-required': 'ദയവായി ഒരു പാസ്വേഡ് നൽകുക.',
  'common.errors.password-special-characters':
    'ദയവായി പ്രത്യേക പ്രതീകങ്ങൾ ഉപയോഗിക്കരുത്.',
  'common.errors.profile-not-updated':
    'ക്ഷമിക്കണം! പ്രൊഫൈൽ ഇപ്പോൾ അപ്ഡേറ്റുചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.question-not-added-to':
    'ക്ഷമിക്കണം! ഇപ്പോൾ {{collectiontype}} എന്ന താളിൽ ചോദ്യം ചെയ്യാനായില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.question-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ചോദ്യം പകർത്താനാവില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.question-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ചോദ്യം സൃഷ്ടിക്കാൻ സാധിക്കുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.question-not-updated':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ചോദ്യം അപ്ഡേറ്റ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.reset-password-error':
    'ക്ഷമിക്കണം! എന്തെങ്കിലും ശരിയല്ല. പാസ്വേഡ് പുനഃസജ്ജമാക്കാനാവില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.reset-google-account-exists':
    'നിങ്ങളുടെ ഇമെയിൽ ലോഗിൻ ഒരു Google അക്കൌണ്ട് ഉപയോഗിച്ച് സൃഷ്ടിച്ചതാണ്, ഞങ്ങൾക്ക് ഒരു ഗൂഗിൾ രഹസ്യവാക്ക് പുനസജ്ജീകരിക്കാൻ കഴിയില്ല. നിങ്ങളുടെ ഗൂഗിൾ രഹസ്യവാക്ക് മറന്നുപോയെങ്കിൽ, നിങ്ങളുടെ Google ആപ്ലിക്കേഷൻ വഴി നിങ്ങൾ അത് പുനഃസജ്ജമാക്കേണ്ടതുണ്ട്.',
  'common.errors.resource-description-length':
    'വിവരണം 500 പ്രതീകങ്ങളിൽ കൂടുതൽ ഉണ്ടാകരുത്.',
  'common.errors.resource-invalid-url': 'അസാധുവായ url.',
  'common.errors.resource-missing-title': 'ദയവായി ഒരു റിസോഴ്സ് ടൈറ്റിൽ നൽകുക.',
  'common.errors.resource-missing-type': 'ദയവായി ഒരു വിഭവ തരം തിരഞ്ഞെടുക്കുക.',
  'common.errors.resource-missing-url': 'ദയവായി സാധുവായ ഒരു യു ആർ എൽ നൽകുക.',
  'common.errors.resource-not-added-to-collection':
    'ക്ഷമിക്കണം! ശേഖരണത്തിലേക്ക് ശേഖരം സൃഷ്ടിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.resource-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ റിസോഴ്സ് പകർത്താൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.resource-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ തന്നെ വിഭവം സൃഷ്ടിക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.resource-not-updated':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ഉറവിടം അപ്ഡേറ്റ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.resource-same-host-url': 'ഉറവിടങ്ങൾ gooru urls ആകാൻ പാടില്ല.',
  'common.errors.resource-title-length':
    'ശീർഷകത്തിൽ 50 പ്രതീകങ്ങളിൽ കൂടുതൽ ദൈർഘ്യമുണ്ടാകാൻ പാടില്ല.',
  'common.errors.rubric-title-presence': 'ദയവായി റബ്രിക്ക് ടൈറ്റിൽ നൽകുക.',
  'common.errors.rubric-url-presence': 'ദയവായി റൂബിക്ക് യുആർഎൽ നൽകുക.',
  'common.errors.select-correct-answer': 'ദയവായി ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക.',
  'common.errors.search-collections-length':
    'ദയവായി കുറഞ്ഞത് 3 പ്രതീകങ്ങൾ നൽകുക.',
  'common.errors.sign-in-credentials-not-valid':
    'ക്ഷമിക്കണം! എന്തെങ്കിലും ശരിയല്ല. ദയവായി നിങ്ങളുടെ ഉപയോക്തൃനാമവും രഹസ്യവാക്കും പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.sign-in-google-account-exists':
    'ദയവായി ഗൂഗിൾ സൈൻ ഇൻ ഉപയോഗിക്കൂ. ഞങ്ങൾക്ക് നിങ്ങളുടെ പാസ്വേഡ് പുനഃസജ്ജമാക്കില്ല.',
  'common.errors.sign-up-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ സൈൻ അപ്പ് ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.sign-up-first-name': 'ദയവായി നിങ്ങളുടെ ആദ്യ പേര് നൽകുക.',
  'common.errors.sign-up-last-name': 'നിങ്ങളുടെ പേരിന്റെ അവസാന ഭാഗം നൽകുക.',
  'common.errors.sign-up-name-length':
    'അവസാന നാമത്തിൽ കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം.',
  'common.errors.sign-up-name-only-letters': 'അക്ഷരങ്ങൾ മാത്രം നൽകുക.',
  'common.errors.sign-up-valid-email': 'സാധുവായ ഒരു ഇമെയിൽ വിലാസം നൽകുക.',
  'common.errors.special-characters':
    'നിങ്ങൾക്ക് പ്രത്യേക പ്രതീകങ്ങളോ സ്പെയ്സുകളോ ഉപയോഗിക്കാൻ കഴിയില്ല.',
  'common.errors.unit-not-copied':
    'ക്ഷമിക്കണം! ഇപ്പോൾ യൂണിറ്റ് പകർത്താനാവില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.unit-not-created':
    'ക്ഷമിക്കണം! ഇപ്പോൾ യൂണിറ്റ് സൃഷ്ടിക്കാൻ കഴിയില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.unit-not-loaded':
    'ക്ഷമിക്കണം! ഇപ്പോൾ യൂണിറ്റ് ലോഡുചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'common.errors.unit-title-required': 'ദയവായി യൂണിറ്റ് ശീർഷകം നൽകുക.',
  'common.errors.user-email-presence': 'സാധുവായ ഒരു ഇമെയിൽ നൽകുക.',
  'common.errors.username-length':
    'ഉപയോക്തൃനാമം 4-നും 254-നും ഇടയിലായിരിക്കണം.',
  'common.errors.forgot-password-gmail':
    'ദയവായി ഗൂഗിൾ സൈൻ ഇൻ ഉപയോഗിക്കൂ. ഞങ്ങൾക്ക് നിങ്ങളുടെ പാസ്വേഡ് പുനഃസജ്ജമാക്കില്ല.',
  'common.errors.no-studymaterial':
    'ഈ ക്ലാസ്സിൽ നൽകിയിരിക്കുന്ന ഗതിയിൽ അതിൽ പഠന വസ്തുക്കൾ ഒന്നും തന്നെയില്ല. ഇത് പരിഹരിക്കാൻ നിങ്ങളുടെ അധ്യാപകനെ ബന്ധപ്പെടുക',
  'common.essential-questions': 'അവശ്യ ചോദ്യങ്ങൾ',
  'common.example': 'ഉദാഹരണം:',
  'common.exit': 'പുറത്ത്',
  'common.external-collection': 'ബാഹ്യ ശേഖരണം',
  'common.explanation': 'വിശദീകരണം',
  'common.explore': 'പര്യവേക്ഷണം ചെയ്യുക',
  'common.false': 'തെറ്റായ',
  'common.featured-courses': 'ഫീച്ചർ & കോഴ്സുകൾ',
  'common.file-name': 'ഫയലിന്റെ പേര്',
  'common.finish': 'പൂർത്തിയാക്കുക',
  'common.first-name': 'പേരിന്റെ ആദ്യഭാഗം',
  'common.follow': 'പിന്തുടരുക',
  'common.followers': 'പിന്തുടരുന്നവർ',
  'common.following': 'പിന്തുടരുന്നു',
  'common.forgotPassword': 'പാസ്വേഡ് മറന്നോ',
  'common.from': 'മുതൽ',
  'common.from-my-assessments': 'എന്റെ മൂല്യനിർണ്ണയങ്ങളിൽ നിന്ന്',
  'common.from-my-collections': 'എന്റെ ശേഖരങ്ങളിൽ നിന്ന്',
  'common.from-my-questions': 'എന്റെ ചോദ്യങ്ങളിൽ നിന്ന്',
  'common.from-my-resources': 'എന്റെ വിഭവങ്ങളിൽ നിന്ന്',
  'common.hide-results': 'ഫലങ്ങൾ മറയ്ക്കൂ',
  'common.hide-correct-answer': 'Hide Correct Answer',
  'common.hints': 'സൂചനകൾ',
  'common.home': 'വീട്',
  'common.if_questions': 'നിങ്ങൾക്ക് എന്തെങ്കിലും ചോദ്യങ്ങൾ ഉണ്ടെങ്കിൽ,',
  'common.information': 'വിവരം',
  'common.in-progress': 'പുരോഗതിയിൽ',
  'common.instructor': 'പരിശീലകൻ',
  'common.last-name': 'പേരിന്റെ അവസാന ഭാഗം',
  'common.last-updated': 'അവസാനമായി പുതുക്കിയത്',
  'common.latest-attempt': 'ഏറ്റവും പുതിയ ശ്രമം',
  'common.launch-anonymous': 'അജ്ഞാതനായി തുടങ്ങണം',
  'common.launch-on-air': 'ജീവിക്കൂ',
  'common.learning-objectives': 'പഠന ലക്ഷ്യങ്ങൾ',
  'common.learning-target': 'മൈക്രോ സ്റ്റാൻഡേർഡ്',
  'common.learning-target-mobile': 'നിലവാരത്തിൽ മൈക്രോ സ്റ്റാൻഡേർഡ്',
  'common.lesson': 'പാഠം',
  'common.lessonInitial': 'L',
  'common.lesson-title': 'പാഠത്തിന്റെ തലക്കെട്ട്',
  'common.lessonObj.zero': 'പാഠങ്ങൾ',
  'common.lessonObj.one': 'പാഠം',
  'common.lessonObj.other': 'പാഠങ്ങൾ',
  'common.libraries': 'ലൈബ്രറികൾ',
  'common.license': 'ലൈസൻസ്',
  'common.link': 'ലിങ്ക്',
  'common.link-out': 'ലിങ്ക്-ഔട്ട്',
  'common.link-out-message':
    '* പ്രിവ്യൂയിൽ നിങ്ങളുടെ റിസോഴ്സ് ശൂന്യമായി കാണിക്കുന്നെങ്കിൽ, ഉള്ളടക്കം കാണുന്നതിന് മറ്റൊരു പേജിലേക്ക് ഒരു "ലിങ്ക്-ഔട്ട്" ആവശ്യമായി വരും.',
  'common.live-assessments': 'തൽസമയ വിലയിരുത്തലുകൾ',
  'common.loading': 'ലോഡിംഗ് ...',
  'common.login': 'ലോഗിൻ',
  'common.logout': 'പുറത്തുകടക്കുക',
  'common.logout.head_1': 'Learning Navigator: ',
  'common.logout.head_2': 'Every Student',
  'common.logout.head_3': 'Achieves Mastery',
  'common.logout.description':
    'Learning Navigator is designed as “GPS for Learning” — a way for each student to follow their own path to mastery. Schools ask every student to achieve the same level of proficiency, but each student begins with a different set of knowledge and skills. The Learning Navigator meets each student exactly where they are and navigates them to their learning goals. ',
  'common.logout.logout-btn-msg1': 'You have been logout.',
  'common.logout.logout-btn-msg2': 'Click here to login.',
  'common.mastery': 'പ്രാധാന്യം',
  'common.menu': 'മെനു',
  'common.more-details': 'കൂടുതൽ വിശദാംശങ്ങൾ',
  'common.move': 'നീങ്ങുക',
  'common.myContent': 'എന്റെ ഉള്ളടക്കം',
  'common.myProfile': 'എന്റെ ലൊക്കേഷൻ',
  'common.library': 'ലൈബ്രറി',
  'common.myPerformance': 'എന്റെ പ്രകടനം',
  'common.edit-narration': 'വിവരണം വിവരിക്കുന്നു',
  'common.narration': 'വിവരണം',
  'common.new-assessment': 'പുതിയ വിലയിരുത്തൽ',
  'common.new-collection': 'പുതിയ ശേഖരം',
  'common.new-question': 'പുതിയ ചോദ്യം',
  'common.new-question-text': 'ചോദ്യം പാഠം ഇവിടെ നൽകുക',
  'common.new-fib-question-text': 'ഉത്തരം നൽകിക്കൊണ്ട് ചോദ്യം നൽകുക',
  'common.new-resource': 'പുതിയ വിഭവം',
  'common.next': 'അടുത്തത്',
  'common.no': 'ഇല്ല',
  'common.no-archived': 'നിങ്ങൾക്ക് ആർക്കൈവുചെയ്ത ക്ലാസ് മുറികളൊന്നുമില്ല.',
  'common.no-content': 'ഉള്ളടക്കമൊന്നും ലഭ്യമല്ല',
  'common.no-content-my-report':
    'ഇതുവരെ റിപ്പോർട്ടുകളൊന്നും ലഭ്യമല്ല. നിങ്ങൾ പഠിക്കാൻ തുടങ്ങുമ്പോൾ, നിങ്ങളുടെ റിപ്പോർട്ടുകൾ ലഭ്യമാകും.',
  'common.no-assessments-to-display': 'ഇല്ല [1] വിലയിരുത്തലുകൾ നടത്താൻ [2].',
  'common.no-collections-to-display':
    'പ്രദർശിപ്പിക്കുന്നതിനായി [1] ശേഖരങ്ങൾ [2] ഇല്ല.',
  'common.no-courses-to-display': 'ഇല്ല [1] കോഴ്സുകൾ [2] പ്രദർശിപ്പിക്കുക.',
  'common.no-questions-to-display': 'പ്രദർശിപ്പിക്കുക [1] ചോദ്യങ്ങൾ.',
  'common.no-resources-to-display': 'ഇല്ല [1] പ്രദർശിപ്പിക്കാൻ റിസോഴ്സുകൾ [2].',
  'common.no-rubrics-to-display': 'ഇല്ല [1] റബ്രിക്സ് [2] പ്രദർശിപ്പിക്കുക.',
  'common.no-followers': 'നിങ്ങൾക്ക് ഇതുവരെ പിന്തുടരാത്തവർക്കാവില്ല.',
  'common.no-independent-results':
    'നിങ്ങളുടെ ബുക്ക്മാർക്ക് ചെയ്ത {{contenttype}} പര്യവേക്ഷണം ആരംഭിക്കുമ്പോൾ, അവ ഇവിടെ ദൃശ്യമാകും.',
  'common.no-results': 'ഒരു ഫലവും കണ്ടെത്താനായില്ല',
  'common.no-available-results': 'ലഭ്യമായ ഫലങ്ങൾ ലഭ്യമല്ല',
  'common.no-results-message':
    'നിങ്ങളുടെ അക്ഷരപ്പിശക് പരിശോധിക്കുക. ഞങ്ങൾ എല്ലാവരും തെറ്റുകൾ വരുത്തുന്നു! [1] വിശാലമായ പോയി കുറെ ഫിൽട്ടറുകൾ നീക്കം ചെയ്യുക. അല്ലെങ്കിൽ സമാനമായ പദം തിരയാൻ ശ്രമിക്കുക.',
  'common.no-more-attempts': 'കൂടുതൽ ശ്രമങ്ങൾ ഇല്ല',
  'common.no-dca-student':
    'നിങ്ങളുടെ അധ്യാപകൻ ഇതുവരെ ക്ലാസ് പ്രവർത്തനങ്ങളിലേക്കോ ശേഖരത്തിലോ ശേഖരത്തിലോ നൽകിയിട്ടില്ല.',
  'common.no-dca-teacher':
    'നിലവിലെ പ്രവർത്തനങ്ങളൊന്നുമില്ല. കോഴ്സ് മാപ്പിൽ അല്ലെങ്കിൽ ഉള്ളടക്ക കാറ്റലോഗിൽ ക്ലാസ് പ്രവർത്തനങ്ങൾ ചേർക്കുക.',
  'common.notScored': 'ഉദ്ധരിക്കപ്പെടാത്ത',
  'common.notStarted': 'ആരംഭിച്ചില്ല',
  'common.not-added': 'ചേർത്തില്ല',
  'common.not-applicable': 'n / a',
  'common.not-following': 'നിങ്ങൾ ആരെയെങ്കിലും പിന്തുടരുന്നില്ല.',
  'common.not-provided': 'നൽകിയിട്ടില്ല',
  'common.not-specified': 'വ്യക്തമാക്കിയിട്ടില്ല',
  'common.not_started': 'ആരംഭിച്ചില്ല',
  'common.nothing-to-display': 'പ്രദർശിപ്പിക്കാൻ ഒന്നുമില്ല.',
  'common.number': 'ഇല്ല.',
  'common.numberStudents.zero': '{{count}} വിദ്യാർത്ഥികൾ',
  'common.numberStudents.one': '{{count}} വിദ്യാർത്ഥി',
  'common.numberStudents.other': '{{count}} വിദ്യാർത്ഥികൾ',
  'common.of': 'അതിൽ',
  'common.off': 'ഓഫ്',
  'common.on': 'ഓണാണ്',
  'common.other': 'മറ്റുള്ളവ',
  'common.overall-performance': 'മൊത്തത്തിലുള്ള പ്രകടനം',
  'common.educational-use': 'Educational use',
  'common.resource-types': 'Resource types',
  'common.publishers': 'publishers',
  'common.password': 'password',
  'common.pending': 'തീർപ്പുകൽപ്പിച്ചിട്ടില്ല',
  'common.performance': 'പ്രകടനം കാണിക്കുക',
  'common.performance-dashboard': 'പ്രകടനം ഡാഷ്ബോർഡ്',
  'common.personal-information': 'സ്വകാര്യ വിവരം',
  'common.play': 'കളിക്കുക',
  'common.please_contact': 'ദയവായി ബന്ധപ്പെടൂ',
  'common.post-message': 'പോസ്റ്റ് സന്ദേശം',
  'common.preview': 'പ്രിവ്യൂ',
  'common.profile': 'പ്രൊഫൈൽ',
  'common.profile-publishing': 'പ്രൊഫൈൽ ദൃശ്യപരത',
  'common.publish-to':
    ' ഇത് എന്റെ പ്രൊഫൈൽ ലൈബ്രറിയിൽ മറ്റുള്ളവർക്ക് ദൃശ്യമാക്കുക',
  'common.published-by': 'പ്രസിദ്ധീകരിച്ചത്',
  'common.published-tooltip': 'ബാഡ്ജ് ചെയ്ത ഉള്ളടക്കം',
  'common.publisher': 'പ്രസാധകൻ',
  'common.prev': 'മുമ്പത്തേത്',
  'common.progress': 'Progress',
  'common.question': 'ചോദ്യം',
  'common.questions': 'ചോദ്യങ്ങൾ',
  'common.questions-OE': 'സൌജന്യ പ്രതികരണ ചോദ്യങ്ങൾ',
  'common.question-pl.zero': 'ചോദ്യങ്ങൾ',
  'common.question-pl.one': 'ചോദ്യം',
  'common.question-pl.other': 'ചോദ്യങ്ങൾ',
  'common.question-title': 'ചോദ്യ ശീർഷകം',
  'common.question-type.SA': 'ഒറ്റ ഉത്തരം',
  'common.question-type.MC': 'മൾട്ടിപ്പിൾ ചോയ്സ്',
  'common.question-type.FIB': 'വിട്ട ഭാഗം പൂരിപ്പിക്കുക',
  'common.question-type.T/F': 'ശരിയോ തെറ്റോ',
  'common.question-type.T_F': 'ശരിയോ തെറ്റോ',
  'common.question-type.MA': 'ഒന്നിലധികം ഉത്തരം',
  'common.question-type.OE': 'സൌജന്യ പ്രതികരണം',
  'common.question-type.HS_TXT': 'ഒന്നിലധികം തിരഞ്ഞെടുക്കുക - വാചകം',
  'common.question-type.HS_IMG': 'ഒന്നിലധികം തിരഞ്ഞെടുക്കുക - ചിത്രം',
  'common.question-type.HT_TO': 'ഓർഡർ വലിച്ചിടുക',
  'common.question-type.HT_RO': 'ഓർഡർ വലിച്ചിടുക',
  'common.question-type.HT_HL': 'ടെക്സ്റ്റ് ഹൈലൈറ്റ് ചെയ്യുക',
  'common.reaction': 'പ്രതികരണം',
  'common.read-first': '[1] ഇത് ആദ്യം വായിക്കുക!',
  'common.remaining': '{{number}} അവശേഷിക്കുന്നു',
  'common.remix': 'റീമിക്സ്',
  'common.remix-assessment': 'റീമിക്സ് വിലയിരുത്തൽ',
  'common.remix-assessment-lead':
    'നിങ്ങൾ ഒരു വിലയിരുത്തൽ ഓർമ്മപ്പെടുത്താൻ പോകുകയാണ്.',
  'common.remix-assessment-success':
    'നിങ്ങൾ ഒരു വിലയിരുത്തൽ {{assessmenttitle}} റീമിക്സ് ചെയ്തു. നിങ്ങൾക്ക് ആ വിലയിരുത്തൽ എഡിറ്റുചെയ്യണോ?',
  'common.remix-collection': 'റീമിക്സ് ശേഖരം',
  'common.remix-collection-lead':
    'നിങ്ങൾ ഒരു ശേഖരത്തെ റീമിക്സ് ചെയ്യാൻ പോകുകയാണ്.',
  'common.remix-collection-success':
    'നിങ്ങൾ ശേഖരത്തെ {{collectiontitle}} റീമിക്സ് ചെയ്തു. ആ ശേഖരം എഡിറ്റുചെയ്യണോ?',
  'common.remix-course': 'റീമിക്സ് കോഴ്സ്',
  'common.remix-course-lead': 'നിങ്ങൾ ഒരു കോഴ്സ് റീമിക്സ് ചെയ്യാൻ പോകുകയാണ്.',
  'common.remix-course-success':
    'താങ്കൾ കോഴ്സ് {{courtsetitle}} റീമിക്സ് ചെയ്തു. ആ കോഴ്സ് എഡിറ്റുചെയ്യണോ?',
  'common.remix-lesson': 'റീമിക്സ് പാഠം',
  'common.remix-lesson-lead': 'നിങ്ങൾ ഒരു പാഠം റീമിക്സ് ചെയ്യാൻ പോകുകയാണ്.',
  'common.remix-lesson-success':
    'നിങ്ങൾ {{lessontitle}} ഒരു പാഠം റീമിക്സ് ചെയ്തു.',
  'common.remix-question': 'റീമിക്സ് ചോദ്യം',
  'common.remix-question-lead': 'നിങ്ങൾ ഒരു ചോദ്യമെഴുതാൻ പോകുകയാണ്.',
  'common.remix-question-success':
    'താങ്കൾ ഒരു ചോദ്യം {{questiontitle}} റീമിക്സ് ചെയ്തു. നിങ്ങൾക്ക് ആ ചോദ്യം എഡിറ്റുചെയ്യണോ?',
  'common.remix-resource': 'റീമിക്സ് റിസോഴ്സ്',
  'common.remix-resource-lead':
    'നിങ്ങൾ ഒരു റിസോഴ്സ് റീമിക്സ് ചെയ്യാൻ പോകുകയാണ്.',
  'common.remix-resource-success':
    'നിങ്ങൾ ഒരു വിഭവം {{resourcetitle}} റീമിക്സ് ചെയ്തു. ആ റിസോഴ്സ് എഡിറ്റുചെയ്യണോ?',
  'common.remix-unit': 'റീമിക്സ് യൂണിറ്റ്',
  'common.remix-unit-lead': 'നിങ്ങൾ ഒരു യൂണിറ്റ് റീമിക്സ് ചെയ്യാൻ പോകുകയാണ്.',
  'common.remix-unit-success':
    'നിങ്ങൾ ഒരു യൂണിറ്റ് {{unittitle}} റീമിക്സ് ചെയ്തു.',
  'common.remixed-by': 'റീമിക്സ് ചെയ്തത്',
  'common.remix-warning':
    'ഹെഡ്സ് അപ്പുകൾ! ഈ കോഴ്സിൽ വളരെയധികം ആകർഷണീയമായ ഉള്ളടക്കം ഉണ്ട്, കൂടാതെ പകർപ്പെടുക്കുന്നത് സമയമെടുക്കും. നിങ്ങൾക്ക് പ്രക്രിയ ആരംഭിക്കണമെന്ന് സ്ഥിരീകരിക്കുകയും 15 മിനിറ്റിനകം ഈ കോഴ്സിൻറെ കോപ്പി നിങ്ങളുടെ [1] പ്രൊഫൈലിൽ കണ്ടെത്തും. [2]',
  'common.remove': 'നീക്കം ചെയ്യുക',
  'common.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'common.report-in-progress': 'റിപ്പോർട്ട് പുരോഗതിയിലാണ്',
  'common.request-to': 'ബാഡ്ജിനായി അവലോകനം ചെയ്യാനുള്ള അഭ്യർത്ഥന',
  'common.request-report': 'അഭ്യർത്ഥന റിപ്പോർട്ട്',
  'common.resource': 'വിഭവം',
  'common.resources': 'വിഭവങ്ങൾ',
  'common.resource-format.image': 'ചിത്രം',
  'common.resource-format.text': 'വാചകം',
  'common.resource-format.video': 'വീഡിയോ',
  'common.resource-format.interactive': 'സംവേദനാത്മകം',
  'common.resource-format.webpage': 'വെബ് പേജ്',
  'common.resource-format.audio': 'ഓഡിയോ',
  'common.resource-format.question': 'ചോദ്യം',
  'common.resource-pl.zero': 'വിഭവങ്ങൾ',
  'common.resource-pl.one': 'വിഭവം',
  'common.resource-pl.other': 'വിഭവങ്ങൾ',
  'common.resource-title': 'റിസോഴ്സ് ശീർഷകം',
  'common.resource-url': 'ഉറവിട url',
  'common.role': 'പങ്ക്',
  'common.rubric': 'റബ്രിക്ക്',
  'common.rubric-creation': 'റബ്രിക് ക്രിയേഷൻ',
  'common.rubrics': 'തവിട്ടുകള്',
  'common.rubric-title': 'റബ്രിക്ക് ടൈറ്റിൽ',
  'common.save': 'രക്ഷിക്കും',
  'common.de-select': 'തിരഞ്ഞെടുക്കുന്നതിന്',
  'common.select-all': 'എല്ലാം തിരഞ്ഞെടുക്കുക',
  'common.none': 'ഒന്നുമില്ല',
  'common.add-data': 'ഡാറ്റ ചേർക്കുക',
  'common.update-data': 'ഡാറ്റ അപ്ഡേറ്റ് ചെയ്യുക',
  'common.all': 'എല്ലാം',
  'common.please-wait': 'Please Wait',
  'common.unscheduled-items': 'ഷെഡ്യൂൾ ചെയ്ത ഇനങ്ങൾ',
  'common.scheduled-items': 'Scheduled Items',
  'common.add-to-unschedule': 'ഇതിനായി അവിസ്മരണീയ പട്ടികയിലേക്ക് ചേർക്കുക',
  'common.save-next': 'സംരക്ഷിക്കുക, അടുത്തത്',
  'common.save-submit': 'എല്ലാം സംരക്ഷിച്ച് സമർപ്പിക്കുക',
  'common.save-finish': 'സംരക്ഷിച്ച് പൂർത്തിയാക്കുക',
  'common.school': 'സ്കൂൾ',
  'common.school-info': 'സ്കൂൾ വിവരം',
  'common.score': 'സ്കോർ',
  'common.select': 'തിരഞ്ഞെടുക്കുക',
  'common.select-a-framework':
    'ആദ്യം ദയവായി കോഴ്സ് വിവര വകുപ്പിൽ ഒരു നിലവാര ചട്ടക്കൂട് തിരഞ്ഞെടുക്കുക.',
  'common.sentence': 'വാചകം',
  'common.settings': 'ക്രമീകരണങ്ങൾ',
  'common.search': 'തിരയൽ',
  'common.search-placeholder': 'തിരയൽ',
  'common.search-placeholder-text': 'തിരയൽ ...',
  'common.search-error-message':
    'തിരയൽ പദങ്ങൾ ചുരുങ്ങിയത് 3 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം.',
  'common.search-400-error-message': 'സാധുവായ ഒരു തിരയൽ പദം നൽകുക',
  'common.search-competency': 'തിരയൽ യോഗ്യത',
  'common.search-standards': 'തിരയൽ മാനദണ്ഡങ്ങൾ',
  'common.select-question-type': 'ചോദ്യ തരം തിരഞ്ഞെടുക്കുക',
  'common.select-resource-type': 'വിഭവ തരം തിരഞ്ഞെടുക്കുക',
  'common.send-request': 'അഭ്യർത്ഥന അയയ്ക്കുക',
  'common.share': 'പങ്ക്',
  'common.show-correct-answer': 'ശരിയായ ഉത്തരം കാണിക്കുക',
  'common.show-more-results': 'കൂടുതൽ ഫലങ്ങൾ കാണിക്കുക',
  'common.show-results': 'ഫലങ്ങൾ കാണിക്കുക',
  'common.signUp': 'സൈൻ അപ്പ് ചെയ്യുക',
  'common.sortAlphabetical': 'അക്ഷരമാലാ ക്രമത്തിൽ',
  'common.sortAverage': 'ശരാശരി അനുസരിച്ച്',
  'common.sort-most-recently': 'അടുത്തിടെ അപ്ഡേറ്റുചെയ്തത് അടുക്കുക',
  'common.state': 'സംസ്ഥാനം അല്ലെങ്കിൽ പ്രദേശം',
  'common.state-territory': 'സംസ്ഥാന / പ്രദേശം',
  'common.standard': 'സ്റ്റാൻഡേർഡ്',
  'common.standards': 'മാനദണ്ഡങ്ങൾ',
  'common.study': 'പഠിക്കുക',
  'common.study-now': 'ഇപ്പോൾ പഠിക്കുക',
  'common.student': 'വിദ്യാർത്ഥി',
  'common.students': 'വിദ്യാർത്ഥികൾ',
  'common.student-id': 'വിദ്യാർത്ഥി ഐഡി (പ്രൊഫൈലിൽ പ്രദർശിപ്പിച്ചിട്ടില്ല)',
  'common.studen-id-display':
    'വിദ്യാർത്ഥി ഐഡി (പ്രൊഫൈലിൽ പ്രദർശിപ്പിച്ചിട്ടില്ല, അജ്ഞാത മോഡിൽ പ്രദർശിപ്പിച്ചിരിക്കുന്നു)',
  'common.subject-and-framework': 'വിഷയം, ചട്ടക്കൂട്',
  'common.subject': 'വിഷയം',
  'common.submit': 'സമർപ്പിക്കുക',
  'common.submit-all': 'എല്ലാം സമർപ്പിക്കുക',
  'common.submitAll': 'എല്ലാം സമർപ്പിക്കുക',
  'common.submit-finish': 'സമർപ്പിക്കുകയും അവസാനിപ്പിക്കുകയും ചെയ്യുക',
  'common.swap': 'പുനഃക്രമീകരിക്കുക',
  'common.suggestion': 'നിർദ്ദേശം',
  'common.suggestions': 'നിർദ്ദേശങ്ങൾ',
  'common.suggested-resources': 'നിർദ്ദേശിച്ച ഉറവിടങ്ങൾ',
  'common.support': 'പിന്തുണ',
  'common.start-tour': 'ഒരു ടൂർ നടത്തുക',
  'common.take-me-there': 'എന്നെ അവിടെ എത്തിക്കൂ',
  'common.teach': 'പഠിപ്പിക്കുക',
  'common.teacher': 'അധ്യാപകൻ',
  'common.timeSpent': 'ചിലവഴിച്ച സമയം',
  'common.toggle-dropdown': 'ഡ്രോപ്പ്ഡൌൺ ടോഗിൾ ചെയ്യുക',
  'common.tools': 'ടൂളുകൾ',
  'common.true': 'ശരി',
  'common.type': 'ടൈപ്പ് ചെയ്യുക',
  'common.title': 'ശീർഷകം',
  'common.unBookmark': 'unbookmark',
  'common.unexpectedError':
    'ഒരു അപ്രതീക്ഷിത പിശക് സംഭവിച്ചു, റിപ്പോർട്ടുചെയ്തു. അസൗകര്യത്തിൽ ഞങ്ങൾ ഖേദിക്കുന്നു!',
  'common.networkError':
    'Network disconnected. This may be a temporary issue. Retry later or check your internet connection.',
  'common.unfollow': 'പിന്തുടരാതിരിക്കുക',
  'common.unit': 'യൂണിറ്റ്',
  'common.unit-title': 'യൂണിറ്റ് ശീർഷകം',
  'common.unitInitial': 'നീ',
  'common.unitObj.zero': 'യൂണിറ്റുകൾ',
  'common.unitObj.one': 'യൂണിറ്റ്',
  'common.unitObj.other': 'യൂണിറ്റുകൾ',
  'common.untitled-course': 'കോഴ്സ് 1',
  'common.untitled-lesson': 'തലക്കെട്ടില്ലാത്ത പാഠം',
  'common.untitled-unit': 'തലക്കെട്ടില്ലാത്ത യൂണിറ്റ്',
  'common.update-thumbnail': 'ലഘുചിത്ര അപ്ഡേറ്റ് ചെയ്യുക',
  'common.update-photo': 'ഫോട്ടോ അപ്ഡേറ്റ് ചെയ്യുക',
  'common.upload': 'അപ്ലോഡ് ചെയ്യുക',
  'common.upload-file': 'ഫയൽ അപ്ലോഡുചെയ്യുക',
  'common.upload-thumbnail': 'ലഘുചിത്ര അപ്ലോഡ് ചെയ്യുക',
  'common.upload-photo': 'ഫോട്ടോ അപ്ലോഡുചെയ്യുക',
  'common.until': 'Until',
  'common.remove-photo': 'ഫോട്ടോ നീക്കംചെയ്യുക',
  'common.use-case': 'കേസ് ഉപയോഗിക്കുക',
  'common.valid-extensions':
    'സാധുവായ ഫയൽ എക്സ്റ്റെൻഷനുകൾ ഇവയാണ്: {{extensions}}',
  'common.verified': 'പരിശോധിച്ചു',
  'common.visibility-tooltip': 'മറ്റുള്ളവർക്ക് ദൃശ്യമല്ല',
  'common.visibility-available': 'മറ്റുള്ളവർക്ക് ദൃശ്യമാണ്',
  'common.warnings.on-air-connection-lost':
    'ഗാൻ ലൈവ് ഡാഷ്ബോർഡ് കണക്ഷൻ നഷ്ടപ്പെട്ടതിനാൽ യാന്ത്രികമായി വീണ്ടും ശ്രമിക്കുന്നു. അത് പരീക്ഷിച്ചുനോക്കൂ, പക്ഷേ നിങ്ങളുടെ സ്ക്രീൻ പുതുക്കരുത്!',
  'common.warnings.character-limit': 'നിങ്ങൾ പ്രതീക പരിധിയിൽ എത്തി.',
  'common.word': 'വാക്ക്',
  'common.yes': 'അതെ',
  'common.change-score': 'സ്കോർ മാറ്റൂ',
  'not-found.tenant.login-not-found-msg-1':
    'gooru വാടകയ്ക്ക് നൽകൽ ലോഗിൻ കാണുന്നില്ല, പേജ് സ്വപ്രേരിതമായി റീഡയറക്ട് ചെയ്യും',
  'not-found.tenant.login-not-found-msg-2': 'പേജിൽ ലോഗിൻ ചെയ്യുക',
  'not-found.tenant.login-not-found-msg-3':
    'ചുവടെ അല്ലെങ്കിൽ ചുവടെ ലോഗിൻ ചെയ്യാൻ ബട്ടൺ ക്ലിക്കുചെയ്യുക',
  'index.joinUs':
    'വിദ്യാഭ്യാസം [2] വിദ്യാഭ്യാസത്തിന് മാനവവിഭവശേഷിക്ക് [1] നമ്മോടൊപ്പം ചേരൂ',
  'index.browseContent.title': 'ഹേയ്, അവിടെയുണ്ടോ! എന്താണ് നിങ്ങൾ തിരയുന്നത്?',
  'index.browseContent.description_1': 'ഞാൻ തിരയുകയാണ്',
  'index.browseContent.description_2': 'പഠന സാമഗ്രികൾ',
  'index.browseContent.description_3': 'അഥവാ',
  'index.browseContent.button': 'ഉള്ളടക്കം ബ്രൗസുചെയ്യുക',
  'index.browseContent.footer.description_1': 'ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?',
  'index.browseContent.footer.description_2': ' ഇവിടെ.',
  'index.browseContent.footer.login': 'ലോഗിൻ',
  'index.browseContent.grades_missing_message': 'ഗ്രേഡ്, വിഷയം തിരഞ്ഞെടുക്കുക.',
  'index.browseContent.subjects_missing_message':
    'ദയവായി വിഷയം തിരഞ്ഞെടുക്കുക.',
  'index.gettingStarted.title': 'ഗോറുവുമൊത്ത് ആരംഭിക്കുന്നു',
  'index.gettingStarted.toolkit.title': 'ടൂൾകിറ്റ് ആരംഭിക്കുന്നു',
  'index.gettingStarted.toolkit.description':
    'ഗോറുവിലേക്ക് സ്വാഗതം! gooru- ൽ നിങ്ങൾക്ക് എന്തുചെയ്യാനാകുമെന്ന് അറിയാൻ ഈ വിഭവങ്ങൾ പരിശോധിക്കുകയും വേഗത്തിൽ ആരംഭിക്കുകയും ചെയ്യുക.',
  'index.gettingStarted.classroom.title': 'ക്ലാസ്റൂമിൽ നിന്നുള്ള കഥകൾ',
  'index.gettingStarted.classroom.description':
    'അദ്ധ്യാപകരുടെ കഥകളിലൂടെ പഠിക്കുക. അവർ ക്ലാസ്സൗറിൽ ഒരു വ്യത്യാസമുണ്ടാക്കി.',
  'index.gettingStarted.events.title': 'നമ്മുടെ ഇവന്റുകൾ പരിശോധിക്കുക!',
  'index.gettingStarted.events.description':
    'gooru- ൽ ആരംഭിക്കാൻ നിങ്ങളെ സഹായിക്കുന്നതിന് ഞങ്ങൾ സൗജന്യ webinars ഉം പരിശീലനങ്ങളും വാഗ്ദാനം ചെയ്യുന്നു.',
  'index.empowerStudents.title':
    'വിദ്യാർത്ഥികളെ അവരുടെ വഴി മനസ്സിലാക്കാൻ അവരെ പ്രാപ്തരാക്കുക',
  'index.empowerStudents.find': 'കണ്ടെത്താം',
  'index.empowerStudents.remix': 'റീമിക്സ്',
  'index.empowerStudents.share': 'പങ്ക്',
  'index.empowerStudents.monitor': 'മോണിറ്റർ',
  'index.findDescription':
    'അധ്യാപകർ നിർമ്മിച്ച ആയിരക്കണക്കിന് k-12 ശേഖരങ്ങൾ ബ്രൌസ് ചെയ്യുകയോ 16 മില്ല്യണിലധികം വിഭവങ്ങൾ തിരയുകയോ ചെയ്യുക',
  'index.remixDescription':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികളുടെ ആവശ്യങ്ങൾ നിറവേറ്റുന്നതിനായി റീമിക്സ് ശേഖരങ്ങളും ഉള്ളടക്കവും ഇച്ഛാനുസൃതമാക്കുക.',
  'index.shareDescription':
    'ഗോകു ക്ലാസ്റൂമിലൂടെ വിദ്യാർത്ഥികളുമായി പങ്കുവെക്കുക. പ്രവേശനത്തിനായി പ്രവേശന ആവശ്യമില്ല.',
  'index.monitorDescription':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികളുടെ ഇടപഴകലും യഥാസമയത്തിൽ ഇടപെടുന്നതിന് പുരോഗതിയും വിലയിരുത്തുക.',
  'index.freeAndOpen.title': 'സ്വതന്ത്രവും തുറന്നതും. [1] എല്ലായ്പ്പോഴും',
  'index.freeAndOpen.description':
    'വിദ്യാഭ്യാസം ഒരു മാനുഷിക അവകാശമാണെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു. ലോകമെമ്പാടുമുള്ള അധ്യാപകർക്കും വിദ്യാർത്ഥികൾക്കും സൗജന്യമായി ഗാരോസ് സൗജന്യമായി നൽകും.',
  'index.freeAndOpen.button':
    'ഞങ്ങളുടെ സമീപനത്തെക്കുറിച്ച് കൂടുതൽ മനസ്സിലാക്കുക',
  'class.info.class-info': 'ക്ലാസ്റൂം വിവരം',
  'class.info.teachers': 'അധ്യാപകർ',
  'class.info.students': 'വിദ്യാർത്ഥികൾ',
  'class.info.subject': 'വിഷയം',
  'class.info.grade': 'ഗ്രേഡ്',
  'class.info.description': 'വിവരണം',
  'class.info.edit-info': 'വിവരങ്ങൾ എഡിറ്റുചെയ്യുക',
  'class.info.share-class': 'ക്ലാസ് മുറികൾ പങ്കിടുക',
  'class.info.invite-co-teachers': 'സഹ-അദ്ധ്യാപകരെ ക്ഷണിക്കുക',
  'class.info.add-students': 'വിദ്യാർത്ഥികളെ ചേർക്കുക',
  'class.info.class-code': 'ക്ലാസ്റൂം കോഡ്',
  'class.info.delete': 'ക്ലാസ്റൂം ഇല്ലാതാക്കുക',
  'class.edit.assigned-course': 'നിയുക്ത കോഴ്സ്',
  'class.edit.basic-info': 'അടിസ്ഥാന വിവരങ്ങൾ',
  'class.edit.class-name': 'ക്ലാസ്മുറിയുടെ പേര്',
  'class.edit.class-greetings': 'ക്ലാസ്റൂം അറിയിപ്പുകൾ',
  'class.edit.class-greetings-placeholder':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികളെ സ്വാഗതം ചെയ്യുക, അവരെ പ്രചോദിപ്പിക്കുക, അല്ലെങ്കിൽ ഒരു പ്രഖ്യാപനം നടത്തുക തുടങ്ങിയവ.',
  'class.edit.class-minscore':
    'ട്രോഫികൾക്കായുള്ള മൂല്യനിർണയ കുറഞ്ഞ സ്കോർ (1-100%)',
  'class.edit.course-map': 'കോഴ്സ് മാപ്പ്',
  'class.edit.edit-class': 'ക്ലാസ്റൂം ക്രമീകരണങ്ങൾ എഡിറ്റുചെയ്യുക',
  'class.overview.title': 'കോഴ്സ് മാപ്പ്',
  'class.overview.locate': 'എന്നെ കണ്ടുപിടിക്കൂ',
  'class.overview.edit-content': 'ഉള്ളടക്കം എഡിറ്റുചെയ്യുക',
  'class.overview.add-to-daily-class-activities':
    'ക്ലാസ് പ്രവർത്തനങ്ങൾ ചേർക്കുക',
  'class.overview.assigned-course': 'നിങ്ങൾ നിയമിച്ച ഗതി',
  'class.overview.pre-study-title': 'നിങ്ങളുടെ കോഴ്സിനുള്ള പ്രീ-സ്റ്റഡി',
  'class.overview.course-map.rescope-toggle': 'മുഴുവൻ കോഴ്സും കാണിക്കുക',
  'class.overview.course-map.rescope-info':
    'ഈ നാവിഗേറ്റർ കോഴ്സ് ഒന്നിലധികം ഗ്രേഡുകളിൽ നിലവാരത്തെ ഉൾക്കൊള്ളുന്ന വ്യക്തിഗത കോഴ്സാണ്. ഓരോ വിദ്യാർത്ഥിക്കും വിടവ് നികത്താനും, ആശയങ്ങളെ ശക്തിപ്പെടുത്താനും, അവരുടെ പഠനത്തെ ത്വരിതപ്പെടുത്തുന്നതിനും സഹായിക്കുന്ന ഒരു അദ്വിതീയ കോഴ്സാണ് നൽകുന്നത്. വ്യക്തിഗതമാക്കിയ യാത്രാമാർഗ്ഗങ്ങൾ രൂപകൽപ്പന ചെയ്യപ്പെടുന്നു, ഓരോ വിദ്യാർത്ഥികളുടെയും പഠന ശേഷി പരമാവധിയാക്കാനും അവരുടെ സെറ്റ് ഡെസ്റ്റിനേഷനിലേക്ക് നാവിഗേറ്റുചെയ്യാനും വിദ്യാർത്ഥികൾ യഥാ സമയം വീണ്ടും രൂപത്തിൽ എത്തിച്ചേരുന്നു.',
  'class.overview.course-map.custom-msg':
    'നിങ്ങളുടെ യോഗ്യതയെ അടിസ്ഥാനമാക്കി ഞങ്ങൾ നിങ്ങൾക്ക് പ്രത്യേകമായി ഈ പഠന വ്യക്തിവൽക്കരിക്കുന്നു. വ്യക്തിഗതമാക്കിയ കോഴ്സ് മാപ്പുകൾ കാണാൻ കുറച്ച് സമയത്തിനുള്ളിൽ വീണ്ടും പരിശോധിക്കുക.',
  'class.overview.course-map.route0-bannerdesc':
    'നിങ്ങളുടെ യോഗ്യതാപത്ര പ്രൊഫൈൽ അനുസരിച്ച് നിങ്ങൾക്ക് മാനേജ് ചെയ്യേണ്ട ചില കാര്യങ്ങളുണ്ട്, അതിനാൽ നിങ്ങൾക്ക് ഈ കോഴ്സിൽ നന്നായി ചെയ്യാനാകും. ഈ കഴിവുകൾ കൈകാര്യം ചെയ്യാൻ ഞങ്ങൾ നിങ്ങളെ ശുപാർശ ചെയ്യുന്ന ഒരു റൂട്ട് ഉണ്ട്. വിശദാംശങ്ങൾ കാണാൻ ഇവിടെ ക്ലിക്കുചെയ്യുക.',
  'class.analytics.performance.title': 'പ്രകടനം കാണുക',
  'class.analytics.performance.better-experience-message':
    'മികച്ച നല്ല അനുഭവത്തിനായി, ടാബ്ലറ്റിലോ ഡെസ്ക്ടോപ്പിലോ പൂർണ്ണ ക്ലാസ്റൂം അനലിറ്റിക്സ് കാണുക.',
  'class.analytics.performance.no-content':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികൾ ഇതുവരെ കോഴ്സ് പഠിക്കാൻ തുടങ്ങിയിട്ടില്ല.',
  'class.analytics.performance.actions.share': 'പങ്ക്',
  'class.analytics.performance.actions.edit': 'ഉള്ളടക്കം എഡിറ്റുചെയ്യുക',
  'class.analytics.performance.actions.download': 'ഡൗൺലോഡ് ചെയ്യുക',
  'class.analytics.performance.actions.fullScreen': 'പൂർണ്ണ സ്ക്രീനിൽ കാണുക',
  'class.analytics.performance.actions.exitFullScreen':
    'പൂർണ്ണ സ്ക്രീനിൽ നിന്ന് പുറത്തുകടക്കുക',
  'class.analytics.performance.actions.assessment': 'വിലയിരുത്തൽ കാണുക',
  'class.analytics.performance.actions.collection': 'ശേഖരം കാണുക',
  'class.analytics.performance.actions.both': 'രണ്ടും കാണുക',
  'class.analytics.performance.teacher.metricsTable.average': 'ശരാശരി',
  'class.analytics.performance.teacher.metricsTable.class-average':
    'ക്ലാസ് ശരാശരി',
  'class.analytics.performance.grade-items': 'ഗ്രേഡിലേക്ക് ഇനങ്ങൾ',
  'class.analytics.performance.no-grade-items':
    'നിങ്ങൾ എല്ലാവരും ചേർന്ന് കാണപ്പെടുന്നുവെന്ന് തോന്നുന്നു!',
  'class.analytics.performance.gru-grade-items.students.zero':
    '{{count}} വിദ്യാർത്ഥികൾ',
  'class.analytics.performance.gru-grade-items.students.one':
    '{{count}} വിദ്യാർത്ഥി',
  'class.analytics.performance.gru-grade-items.students.other':
    '{{count}} വിദ്യാർത്ഥികൾ',
  'class.analytics.performance.gru-grade-items.students.not-started':
    'ആരംഭിച്ചില്ല',
  'class.analytics.mastery.title': 'കാഴ്ചപ്പാട്',
  'class.quick-start.title': 'ഈ ക്ലാസ്റൂമിന് ഉള്ളടക്കം നൽകുക.',
  'class.quick-start.new-course': 'ഒരു പുതിയ കോഴ്സ് വേഗത്തിലാക്കുക',
  'class.quick-start.new-course-desc':
    'ഒരു പുതിയ കോഴ്സ്, ശേഖരണം അല്ലെങ്കിൽ ഒരു വിലയിരുത്തൽ എന്നിവ സൃഷ്ടിച്ചുകൊണ്ട് തുടങ്ങുക',
  'class.quick-start.course': 'പുതിയ കോഴ്സ്',
  'class.quick-start.new-collection': 'പുതിയ ശേഖരം',
  'class.quick-start.new-assessment': 'പുതിയ വിലയിരുത്തൽ',
  'class.quick-start.remix-a-sample': 'ഒരു മാതൃക റീമിക്സ് ചെയ്യുക',
  'class.quick-start.add-existing-course':
    'നിങ്ങളുടെ ലൈബ്രറിയിൽ നിന്ന് ഒരു കോഴ്സ് ചേർക്കുക',
  'class.quick-start.existing-course-desc':
    'ഒരു ക്ലാസ്റൂം തുടങ്ങാനുള്ള വേഗമേറിയ മാർഗം',
  'class.quick-start.choose-course': 'കോഴ്സ് തിരഞ്ഞെടുക്കൂ',
  'class.quick-start.remix-from-course': 'റീമിക്സ് ഒരു തിരഞ്ഞെടുത്ത കോഴ്സ്',
  'class.quick-start.featured-course': 'ഫീച്ചർ കോഴ്സുകൾ കാണുക',
  'class.quick-start.remix-desc':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികൾക്ക് ഒരു തിരഞ്ഞെടുത്ത കോഡു പകർത്തി ഇഷ്ടാനുസൃതമാക്കുക',
  'class.quick-start.browse-content':
    'അല്ലെങ്കിൽ ഞങ്ങളുടെ ഉള്ളടക്ക കാറ്റലോഗുകൾ ബ്രൗസുചെയ്യുക.',
  'classes.classesJoined': 'ഞാൻ ചേർന്ന ക്ലാസ്മുറികൾ',
  'classes.classesTaught': 'ഞാൻ പഠിപ്പിക്കുന്ന ക്ലാസ്മുറികൾ',
  'classes.noClassesJoined': 'നിങ്ങൾ ഏതെങ്കിലും ക്ലാസ് മുറികളിൽ ചേർന്നിട്ടില്ല',
  'classes.noClassesTaught': 'നിങ്ങൾക്ക് സൃഷ്ടിക്കാൻ ക്ലാസ്മുറികളൊന്നും ഇല്ല',
  'content.assessments.edit.best-practices':
    '[1] നിങ്ങളുടെ മാനദണ്ഡത്തിൽ നിങ്ങൾക്കും നിങ്ങളുടെ വിദ്യാർത്ഥികൾക്കും നിരീക്ഷണത്തിനും പ്രവർത്തനത്തിനും മേൽനോട്ടം വഹിക്കുന്നതിനുള്ള ഒരു കൂട്ടം ചോദ്യങ്ങൾ ഉണ്ട്. [2] [3] നിങ്ങളുടെ വിലയിരുത്തലിൽ പല തരത്തിലുള്ള ചോദ്യരീതികൾ (sbac അടിസ്ഥാനമാക്കിയുള്ളവ ഉൾപ്പെടെ) ഉപയോഗിക്കുക വ്യത്യസ്ത വിധങ്ങളിൽ മനസ്സിലാക്കാൻ പ്രകടമാക്കുക. മാനദണ്ഡങ്ങൾ, മൈക്രോ-മാനദണ്ഡങ്ങൾ, വെബ്ബ് \'s അറിവുകൾ എന്നിവയിലേക്ക് ഓരോ ചോദ്യവും ഞങ്ങൾ ടാഗ് ചെയ്യാൻ ശുപാർശചെയ്യുന്നു.',
  'content.classes.create.title': 'ഒരു ക്ലാസ്റൂം സൃഷ്ടിക്കുക',
  'content.classes.create.content': 'വിദ്യാർത്ഥികൾ ഉള്ളടക്കം മുഴുകുന്ന.',
  'content.classes.create.class-name-input':
    'നിങ്ങളുടെ ക്ലാസ്റൂമിന് പേര് നൽകുക',
  'content.classes.create.condition-prompt':
    'വിദ്യാർത്ഥികൾ നിങ്ങളുടെ ക്ലാസ്റൂമിൽ എങ്ങനെ ചേരും?',
  'content.classes.create.condition-prompt-code': 'ക്ലാസ്റൂം കോഡുള്ള ആർക്കും',
  'content.classes.create.condition-prompt-invite': 'ക്ഷണിക്കൂ മാത്രം',
  'content.classes.create.get-started': 'തുടങ്ങി',
  'content.classes.join.title': 'ഒരു പുതിയ ക്ലാസ്റൂമിൽ ചേരുക',
  'content.classes.join.join-a-classroom': 'ഒരു ക്ലാസ്മുറിയിൽ ചേരുക',
  'content.classes.join.content': 'യാത്ര ആരംഭിക്കുന്നത് എവിടെയാണ്.',
  'content.classes.join.not-now': 'ഇപ്പോൾ വേണ്ട',
  'content.classes.join.class-code-input': 'ഒരു ക്ലാസ്റൂം കോഡ് നൽകുക',
  'content.classes.join.class-not-found':
    'ക്ലാസ് മുറി കണ്ടെത്തിയില്ല. നിങ്ങൾ ശരിയായ ക്ലാസ്റൂം കോഡ് നൽകിയിട്ടുണ്ടെന്ന് ഉറപ്പുവരുത്തുക',
  'content.classes.join.invalid-code': 'അസാധുവായ ക്ലാസ്റൂം കോഡ്.',
  'content.classes.join.join-not-allowed':
    'നിങ്ങൾ ചേരാൻ ശ്രമിക്കുന്ന ക്ലാസ് ഇപ്പോൾ സജീവമല്ല. ശരിയായ ക്ലാസ് കോഡിനായി നിങ്ങളുടെ അധ്യാപകനെ ബന്ധപ്പെടുക.',
  'content.classes.join.already-member': 'നിങ്ങൾ ഇതിനകം ഈ ക്ലാസ്റൂമിൽ അംഗമാണ്.',
  'content.classes.join.join-class': 'ക്ലാസ്റൂമിൽ ചേരുക',
  'content.classes.join.terms-and-conditions':
    'ക്ലാസ് മുറിയിൽ ക്ലിക്കുചെയ്തുകൊണ്ട്, ഈ ക്ലാസ്മുറിയെ അധ്യാപകൻ (കളിൽ) പഠിക്കുന്നതിൽ നിന്നും ഈ ഗുവരെ ക്ലാസ്സ് മുറികൾ പഠിക്കുന്നതിൽ നിന്നും എന്റെ മൂല്യനിർണ്ണയവും ശേഖര പുരോഗതി വിവരങ്ങളും പങ്കിടാൻ ഞാൻ സമ്മതിക്കുന്നു.',
  'content.collections.edit.assign-to-course': 'കോഴ്സിനു നൽകുക',
  'content.collections.edit.best-practices':
    '[1] വിദ്യാർത്ഥികൾ ശേഖര തലത്തിൽ നിങ്ങളുടെ ഉള്ളടക്കവുമായി സംവദിക്കുന്നു. ഒരു പഠന ശേഖരം സൃഷ്ടിക്കുമ്പോൾ, പഠന ലക്ഷ്യങ്ങൾ ഉൾപ്പെടുത്തുന്നുവെന്ന് ഉറപ്പാക്കുക, വിവിധ തരത്തിലുള്ള ആശയങ്ങളെ വിദ്യാർത്ഥികളെ തുറന്നുകൊടുക്കാൻ വിവിധ വിഭവങ്ങളുടെ തരം പരിഗണിക്കൂ. [2] [3] ആശയങ്ങൾ നിർമ്മിക്കുന്നതിനുള്ള വിഭവങ്ങളുടെ വിനിയോഗം ഉപയോഗിക്കുക. ശേഖരത്തിലൂടെയുള്ള പുരോഗതി ഒരു യുക്തിസഹമായ രീതിയിൽ ഒഴുകുകയും ഉചിതമായ രീതിയിൽ ഉദ്ദേശിച്ച പ്രേക്ഷകരെ പൊതുജനങ്ങൾക്ക് കൂടുതൽ സങ്കീർണ്ണമായി മനസ്സിലാക്കുകയും വേണം അല്ലെങ്കിൽ വിദ്യാർത്ഥി പര്യവേക്ഷണത്തിന് പര്യാപ്തമായി അനുവദിക്കുക. [4] [5] ചോദ്യങ്ങൾ അല്ലെങ്കിൽ മറ്റ് ഇടപെടലുകൾ. ശേഖരത്തിലെ ഉദ്ദേശ്യങ്ങൾ നിർവ്വഹിക്കുന്നതിനും ഓരോ വിഭവത്തിനും ഒരു റോളും ഉദ്ദേശവും ഉണ്ടെന്ന് ഉറപ്പുവരുത്താൻ മതിയായ വിഭവങ്ങളും / അല്ലെങ്കിൽ വിഭവങ്ങളുടെ മതിയായ വൈവിധ്യങ്ങളും ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.',
  'content.courses.edit.assign-to-class': 'ക്ലാസ്റൂമിൽ നൽകുക',
  'content.courses.edit.best-practices':
    '[1] ഒരു പാഠം നിങ്ങളുടെ പഠന ഉള്ളടക്കം യൂണിറ്റുകളും പാഠങ്ങളും ആക്കാൻ നിങ്ങളെ അനുവദിക്കുന്ന ഒരു ഫോൾഡറാണ്. ഒരു കോഴ്സ് സൃഷ്ടിക്കുമ്പോൾ നിങ്ങൾ അഭിസംബോധന ചെയ്യേണ്ട സുപ്രധാന ചോദ്യങ്ങൾ, പഠന ലക്ഷ്യങ്ങൾ, നിങ്ങളുടെ ഉള്ളടക്കത്തിന്റെ ഓർഗനൈസേഷൻ എന്നിവ കണക്കിലെടുക്കുക. [2] [3] നിങ്ങളുടെ വിദ്യാർത്ഥികളുടെ ജനസംഖ്യയ്ക്ക് വേണ്ടി വ്യത്യസ്തമായ ഒരു അനുഭവം സൃഷ്ടിക്കുന്നതിന് നിങ്ങൾക്ക് പാഠഭാഗങ്ങൾ ഒന്നിച്ച് ചേർക്കാം (ഉദാഹരണത്തിന്, നിങ്ങൾക്ക് ക്രമം നിങ്ങളുടെ യൂണിറ്റുകൾ കാലക്രമപ്രകാരം, വിഷയം, അല്ലെങ്കിൽ നിലവാരം). [4]',
  'content.courses.edit.information.course-title': 'കോഴ്സ് ശീർഷകം',
  'content.courses.edit.information.description': 'വിവരണം',
  'content.questions.edit.add-to': 'ഇതിലേക്ക് ചേർക്കുക',
  'content.questions.edit.best-practices':
    '[1] ഒരു ചോദ്യമാണ് വിദ്യാർത്ഥിയുടെ ഉത്തരം ആവശ്യമുള്ള ഒരു ഉറവിടം, കൂടാതെ നിങ്ങളുടെ വിദ്യാർത്ഥികൾ sbac, parcc, മറ്റ് വിലയിരുത്തലുകൾ എന്നിവയിൽ കാണുന്ന തരത്തിൽ വിവിധ തരത്തിലുള്ള ചോദ്യങ്ങളെ പിന്തുണയ്ക്കുന്നതിനായി വ്യത്യസ്ത തരത്തിലുള്ള ചോദ്യരീതി ഞങ്ങൾ വാഗ്ദാനം ചെയ്യുന്നു. [2] [3] വിദ്യാർത്ഥികൾക്ക് ഈ ചോദ്യങ്ങളുമായി നേരിട്ട് ബന്ധപ്പെടാനും അറിവ് തെളിയിക്കുന്നതിനുള്ള വിവിധ ഫോർമാറ്റുകൾ നൽകാനും നിങ്ങൾ ഉപയോഗിക്കുന്ന ചോദ്യങ്ങൾ. [4] [5] നിങ്ങളുടെ ചോദ്യങ്ങൾ, മാനദണ്ഡങ്ങൾ, മൈക്രോ-സ്റ്റാൻഡേർഡുകൾ, വെബ്ബ് എന്നിവയെക്കുറിച്ചുള്ള അറിവിന്റെ ആഴത്തിലേക്ക് ടാഗ് ചെയ്യുക. ടീച്ചർ ഡാഷ്ബോർഡിലൂടെ നിങ്ങളുടെ വിദ്യാർത്ഥികൾ ചോദ്യങ്ങളുമായി ഇടപെടുന്നതെങ്ങനെയെന്ന് നിങ്ങൾക്ക് കാണാൻ കഴിയും. [6]',
  'content.questions.edit.information.question-title': 'ചോദ്യ ശീർഷകം',
  'content.questions.edit.information.question-type': 'ചോദ്യ തരം',
  'content.questions.edit.builder.add-answer-choice': '+ ഉത്തരം തെരഞ്ഞെടുക്കുക',
  'content.questions.edit.builder.add-hint': 'സൂചനകൾ ചേർക്കുക',
  'content.questions.edit.builder.add-explanation': 'വിശദീകരണം ചേർക്കുക',
  'content.questions.edit.builder.answer': 'ഉത്തരം',
  'content.questions.edit.builder.answer-instructions.FIB':
    'ഉത്തരങ്ങൾക്കും ഒരു വിശദീകരണത്തിനും 5 സൂചനകൾ വരെ ചേർക്കുക.',
  'content.questions.edit.builder.answer-instructions.HS_IMG':
    'നിങ്ങൾക്ക് പത്ത് മറുപടി ചിത്രങ്ങൾ ചേർക്കാൻ ഒന്നോ അതിലധികമോ ശരിയായ ഉത്തരങ്ങൾ തിരഞ്ഞെടുക്കുക.',
  'content.questions.edit.builder.answer-instructions.HS_TXT':
    'നിങ്ങൾക്ക് പത്ത് ഉത്തര ചോയ്സുകൾ ചേർക്കാൻ ഒന്നോ അതിലധികമോ ശരിയായ ഉത്തരങ്ങൾ തിരഞ്ഞെടുക്കുക.',
  'content.questions.edit.builder.answer-instructions.HT_HL_ST':
    'നിങ്ങൾ ചോദ്യമെഴുതുന്നതുപോലെ, ഹൈലൈറ്റ് ചെയ്ത വാചകങ്ങൾ സൂചിപ്പിക്കുന്നതിന് ബ്രാക്കറ്റുകൾ ഉപയോഗിക്കുക. ഒരു ബ്രാക്കറ്റിനുള്ളിൽ ഒറ്റത്തവണ മാത്രമേ ഒരു ബ്രാക്കറ്റിനുള്ളിൽ വയ്ക്കാനാകൂ. ഉദാഹരണത്തിന്, ആദ്യത്തെ ചെറിയ പന്നി വൈക്കോൽ പണിതു. [വലിയ മോശമായ ചെന്നായ വീട് വീണ് തകർത്തു.] രണ്ടാം പന്നി തന്റെ വീടിന്റെ വീട് പണിതു. പ്രതീക പരിധി: 5000.',
  'content.questions.edit.builder.answer-instructions.HT_HL_WD':
    'നിങ്ങൾ ചോദ്യമെഴുതുന്നതുപോലെ, ഹൈലൈറ്റുചെയ്ത പദങ്ങൾക്കായി ബ്രാക്കറ്റുകൾ ഉപയോഗിക്കുക. ഒരു ബ്രാക്കറ്റിന് ഒരു സമയം ഒരു വാക്കു മാത്രമേ ഉൾക്കൊള്ളാൻ കഴിയൂ. ഉദാഹരണത്തിന്, വൃത്തികെട്ട ചെന്നായക്കാരൻ വീടിനു മുന്നിൽ ചാടിവീണു. പ്രതീക പരിധി: 5000.',
  'content.questions.edit.builder.answer-instructions.HT_RO':
    'ശരിയായ ഉത്തരത്തിൽ പത്ത് ഉത്തര ചോയിസുകൾ വരെ ചേർക്കാൻ കഴിയും. വിദ്യാർത്ഥികൾക്ക് ഓർഡർ വിതരണം ചെയ്യും.',
  'content.questions.edit.builder.answer-instructions.MA':
    'പത്ത് ഉത്തരങ്ങൾ, ചിത്രം, വിശദീകരണം, അഞ്ച് സൂചനകൾ എന്നിവ വരെ നിങ്ങൾക്ക് ചേർക്കാൻ കഴിയും.',
  'content.questions.edit.builder.answer-instructions.MC':
    'നിങ്ങൾക്ക് പത്ത് ഉത്തര ചോയ്സുകൾ വരെ ചേർക്കുകയും ഒരു ശരിയായ ഉത്തരം സൂചിപ്പിക്കുകയും ചെയ്യാം. പ്രതീക പരിധി: 200.',
  'content.questions.edit.builder.answer-instructions.OE':
    'ശരിയായ പ്രതികരണം എഴുതുക. പ്രതീക പരിധി: 5000.',
  'content.questions.edit.builder.answer-instructions.T/F':
    'ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക.',
  'content.questions.edit.builder.question-instructions.FIB':
    'നിങ്ങൾ ചോദ്യമെഴുതുന്നതുപോലെ, നിങ്ങളുടെ ഫിൽ ഇൻ ദ വെൺ ഉത്തരങ്ങൾക്ക് ബ്രാക്കറ്റുകൾ ഉപയോഗിക്കുക. ഉദാഹരണത്തിന്: "വലിയ ചീത്ത [ചെന്നായ] വീഴുമ്പോൾ." നിങ്ങൾക്ക് ഒരു ഇമേജ് ചേർക്കാനും കഴിയും.',
  'content.questions.edit.builder.question-instructions.HS_TXT':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.HS_IMG':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.HT_RO':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.HT_HL':
    'നിങ്ങളുടെ ചോദ്യം പ്രോംപ്റ്റ് എഴുതുക.',
  'content.questions.edit.builder.question-instructions.MC':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.MA':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.OE':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.question-instructions.T/F':
    'നിങ്ങളുടെ ചോദ്യം എഴുതുക.',
  'content.questions.edit.builder.submission-format.title':
    'വിദ്യാർത്ഥി സമർപ്പണ ഫോർമാറ്റ്',
  'content.questions.edit.builder.submission-format.answer-type.text-box':
    'ടെക്സ്റ്റ് ബോക്സ്',
  'content.questions.edit.builder.feedback-grading.title':
    'ഫീഡ്ബാക്കും ഗ്രേഡിംഗും',
  'content.questions.edit.builder.feedback-grading.from-existing-rubric':
    'നിലവിലുള്ള റൂബിക് മുതൽ',
  'content.questions.edit.builder.feedback-grading.scoring': 'സ്കോർ ചെയ്യുന്നു',
  'content.questions.edit.builder.feedback-grading.maximum-points':
    'പരമാവധി പോയിന്റുകൾ',
  'content.questions.edit.builder.feedback-grading.increment': 'ഇൻക്രിമെന്റും',
  'content.questions.edit.builder.feedback-grading.rubric-error':
    'ദയവായി ഒരു റബ്രിക്ക് ചേർക്കുക',
  'content.modals.delete-bookmark.confirmation':
    'നിങ്ങൾക്ക് ഈ {{type}} unbookmark ആഗ്രഹിക്കുന്നോ?',
  'content.modals.delete-bookmark.delete-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ഈ {{type}} unbookmark മാർക്കുചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.remove-class-activity.confirmation':
    'നിങ്ങളുടെ ക്ലാസ് പ്രവർത്തനങ്ങളിൽ നിന്ന് ഈ {{type}} നീക്കംചെയ്യണമെന്ന് തീർച്ചയാണോ?',
  'content.modals.remove-class-activity.delete-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ {{type}} നീക്കംചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.delete-class.legend':
    'നിങ്ങൾ ക്ലാസ്സ്റൂം ഇല്ലാതാക്കാൻ പോകുകയാണ്',
  'content.modals.delete-class.student-access':
    'വിദ്യാർത്ഥികൾ ക്ലാസ്മുറിയിലേക്ക് പ്രവേശിക്കാൻ കഴിയില്ല',
  'content.modals.delete-class.student-data-deleted':
    'എല്ലാ വിദ്യാർത്ഥി ഡാറ്റകളും ഇല്ലാതാക്കപ്പെടും',
  'content.modals.archive-class.title': 'ആർക്കൈവ് ക്ലാസ്റൂം',
  'content.modals.archive-class.legend':
    'നിങ്ങൾ നിങ്ങളുടെ ക്ലാസ്റൂം ആർക്കൈവുചെയ്യാൻ പോകുകയാണ്',
  'content.modals.archive-class.links-not-accessible':
    'പങ്കിട്ട എല്ലാ ലിങ്കുകളും ആക്സസ് ചെയ്യാൻ കഴിയില്ല',
  'content.modals.archive-class.students-no-access':
    'വിദ്യാർത്ഥികൾക്ക് ക്ലാസ്റൂം ആക്സസ് ചെയ്യാൻ കഴിയില്ല',
  'content.modals.archive-class.not-add-students':
    'നിങ്ങൾക്ക് കൂടുതൽ വിദ്യാർത്ഥികളെ ക്ലാസിൽ ചേർക്കാൻ കഴിയില്ല',
  'content.modals.archive-class.confirmation':
    'നിങ്ങൾക്ക് ആർക്കൈവുചെയ്യാൻ താൽപ്പര്യമുണ്ടോ?',
  'content.modals.delete-content.legend': 'നിങ്ങൾ ഇല്ലാതാക്കാൻ പോകുകയാണ്',
  'content.modals.delete-content.content-legend':
    '{{Type}} [2] {{index}} - {{parentname}}',
  'content.modals.delete-content.content-legend-header':
    '{{parentname}} യിൽ നിന്നുള്ള {{title}} എന്ന ഫലകം',
  'content.modals.delete-content.delete-warning':
    'ഈ {{type}} ലെ എല്ലാ ഉള്ളടക്കവും ഇല്ലാതാക്കപ്പെടും',
  'content.modals.delete-content.delete-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ {{type}} നീക്കം ചെയ്യാൻ സാധിക്കുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.delete-content.confirmation':
    'നിങ്ങൾക്ക് തുടരണമെന്ന് തീർച്ചയാണോ? ദയവായി ചുവടെ "ഇല്ലാതാക്കുക" എന്ന് ടൈപ്പുചെയ്ത് "ഇല്ലാതാക്കുക" ക്ലിക്കുചെയ്യുക.',
  'content.modals.delete-resource.legend':
    'ശാശ്വതമായി ഇല്ലാതാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെന്ന് സ്ഥിരീകരിക്കുക [1] {{title}} [2]',
  'content.modals.delete-resource.delete-warning':
    'ഈ {{type}} ലെ എല്ലാ ഉള്ളടക്കവും ഇല്ലാതാക്കപ്പെടും',
  'content.modals.delete-resource.delete-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ {{type}} നീക്കം ചെയ്യാൻ സാധിക്കുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.delete-resource.confirmation':
    'നിങ്ങൾക്ക് തുടരണമെന്ന് തീർച്ചയാണോ? ദയവായി "ശാശ്വതമായി ഇല്ലാതാക്കുക" ക്ലിക്ക് ചെയ്യുക.',
  'content.modals.delete-resource.first-check':
    'ഇത് ഒരു ശാശ്വതമായ ഇല്ലാതാക്കിയതിനാൽ പഴയപടിയാക്കാനാവില്ല',
  'content.modals.delete-resource.second-check':
    'ഈ ശേഖരത്തിലെ പകർപ്പുകളും നിങ്ങളുടെ ശേഖരങ്ങളും സമൂഹത്തിലെ മറ്റ് ഉപയോക്താക്കൾ ശേഖരിക്കുന്നതുമായ പകർപ്പുകൾ ഇല്ലാതാക്കപ്പെടും',
  'content.modals.delete-rubric.legend':
    'ശാശ്വതമായി ഇല്ലാതാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെന്ന് സ്ഥിരീകരിക്കുക [1] {{title}} [2]',
  'content.modals.delete-rubric.delete-warning':
    'ഈ റൂഫറിനുള്ളിലെ എല്ലാ ഉള്ളടക്കവും ഇല്ലാതാക്കപ്പെടും',
  'content.modals.delete-rubric.delete-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ റബ്രിക് ഇല്ലാതാക്കാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.delete-rubric.confirmation':
    'നിങ്ങൾക്ക് തുടരണമെന്ന് തീർച്ചയാണോ? ദയവായി "ശാശ്വതമായി ഇല്ലാതാക്കുക" ക്ലിക്ക് ചെയ്യുക.',
  'content.modals.delete-rubric.first-check':
    'ഇത് ഒരു ശാശ്വതമായ ഇല്ലാതാക്കിയതിനാൽ പഴയപടിയാക്കാനാവില്ല',
  'content.modals.remove-content.legend':
    'നിങ്ങൾ {{parentname}} നിന്നും [1] {{title}} [2] നീക്കംചെയ്യാൻ പോവുകയാണ്.',
  'content.modals.remove-content.remove-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ {{type}} നീക്കംചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.remove-content.confirmation':
    'നിങ്ങൾക്ക് തുടരണമെന്ന് തീർച്ചയാണോ? ദയവായി ചുവടെ "നീക്കംചെയ്യുക" എന്ന് ടൈപ്പുചെയ്ത് "നീക്കംചെയ്യുക" ക്ലിക്കുചെയ്യുക.',
  'content.modals.remove-student.title':
    'വിദ്യാർത്ഥിയെ നീക്കംചെയ്ത് അവരുടെ ഡാറ്റ ഇല്ലാതാക്കുക',
  'content.modals.remove-student.legend':
    'നിങ്ങൾ ഈ ക്ലാസ്റൂമിൽ നിന്ന് {{studentname}} നീക്കംചെയ്യുകയും അവരുടെ എല്ലാ ഡാറ്റയും ഇല്ലാതാക്കുകയും ചെയ്യും.',
  'content.modals.remove-student.data-inaccessible':
    'അവരുടെ എല്ലാ ഡാറ്റയും ഇല്ലാതാക്കപ്പെടും, അല്ലെങ്കിൽ നിങ്ങൾക്കോ ആക്സസ്സുചെയ്യാനാകില്ല',
  'content.modals.remove-student.classroom-access':
    'അവർക്ക് ക്ലാസ് മുറികളിലോ ഉള്ളടക്കത്തിലോ ആക്സസ് ചെയ്യാൻ കഴിയില്ല',
  'content.modals.remove-student.data-lost':
    'ക്ലാസ്സിലേക്ക് അവർ വീണ്ടും ചേരുന്നുവെങ്കിൽ, കഴിഞ്ഞകാല ഡാറ്റ നഷ്ടമാകും',
  'content.modals.remove-student.remove-error':
    'ക്ഷമിക്കണം! ഇപ്പോൾ ഈ വിദ്യാർത്ഥിയെ നീക്കം ചെയ്യാൻ കഴിയുന്നില്ല. ദയവായി ഉടൻ വീണ്ടും ശ്രമിക്കുക.',
  'content.modals.remove-student.confirmation':
    'നിങ്ങൾക്ക് തുടരണമെന്ന് തീർച്ചയാണോ? ദയവായി ചുവടെ "ഇല്ലാതാക്കുക" എന്ന് ടൈപ്പുചെയ്ത് "ഇല്ലാതാക്കുക" ക്ലിക്കുചെയ്യുക.',
  'content.modals.quick-remove-content.legend':
    '[3] {{parentname}} [1] മുതൽ നീക്കം ചെയ്യാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെന്ന് [1] {{title}} [2] ഉറപ്പുവരുത്തുക.',
  'content.modals.quick-delete-content.legend':
    '[3] {{parentname}} [4] മുതൽ സ്ഥിരമായി [1] {{title}} [2]',
  'content.modals.quick-delete-content.delete': 'ശാശ്വതമായി ഇല്ലാതാക്കുക',
  'content.resources.edit.best-practices':
    'വീഡിയോകൾ, ഇൻട്രാക്ടീവ്സ്, വെബ്സൈറ്റുകൾ, ഇമേജുകൾ, ഗൂഗിൾ ഡോക്സ് എന്നിവയും അതിലേറെയും പോലുള്ള വിവിധ ഫോർമാറ്റുകളിലുള്ള മൾട്ടിമീഡിയ ഉള്ളടക്കം ഉറവിടങ്ങളാണ്. നിങ്ങളുടെ സ്വന്തം വിഭവങ്ങൾ ഉപയോഗിക്കുകയോ നിങ്ങളുടെ സ്വന്തം വിഭവങ്ങൾ ഉപയോഗിക്കുകയോ "വിഭവസമ്പന്നനായ" നേടുകയും ഗൊറുവിൽ ഞങ്ങളുടെ മതിയായ വിതരണത്തിൽ അന്വേഷിക്കുകയും ചെയ്യുക. [2] [3] നിങ്ങളുടെ വിദ്യാർത്ഥികളുമായി ഇടപഴകുന്നതിനും നിങ്ങളുടെ വിദ്യാർത്ഥികളെ പരിശീലിപ്പിക്കുന്നതിനുമായി വിവരണങ്ങളിൽ ഉൾപ്പെടുത്തിക്കൊണ്ട് വിവിധ വിഭവങ്ങളുടെ തരം പ്രയോജനപ്പെടുത്തുക. [4] [5] മാനദണ്ഡങ്ങൾ, മൈക്രോ- മാനദണ്ഡങ്ങൾ, 21-ാം നൂറ്റാണ്ടിലെ കഴിവുകൾ എന്നിവയിലേക്ക് ഓരോ ചോദ്യങ്ങൾക്കും ടാഗ് ചെയ്യണമെന്ന് ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു. ടീച്ചർ ഡാഷ്ബോർഡിലൂടെ നിങ്ങളുടെ വിദ്യാർത്ഥികൾ എങ്ങനെ വിഭവങ്ങളുമായി ഇടപഴകുന്നതെന്ന് നിങ്ങൾക്ക് കാണാം. [6]',
  'content.resources.edit.placeholder-message':
    'ഇതിന് ഒരു വിഭവം ചേർക്കുക [1] ഇത് ഇവിടെ പ്രിവ്യൂ ചെയ്യുക.',
  'content.resources.edit.not-implemented':
    'റിസോഴ്സ് ഫോർമാറ്റ് പ്രിവ്യൂ [1] ഇതുവരെ നടപ്പിലാക്കിയില്ല. [2]',
  'content.resources.edit.information.im-publisher': 'ഞാൻ പ്രസാധകനായിരുന്നു',
  'content.resources.edit.information.select-a-license':
    'ദയവായി ഒരു ലൈസൻസ് തിരഞ്ഞെടുക്കൂ',
  'user.active-classrooms': 'സജീവ ക്ലാസ് മുറികൾ',
  'user.archived-classrooms': 'ക്ലാസ് മുറികൾ ആർക്കൈവുചെയ്തു',
  'user.classrooms': 'ക്ലാസ് മുറികൾ',
  'user.rgo': 'ര്ഗൊ',
  'user.create-class': 'ക്ലാസ്റൂം സൃഷ്ടിക്കുക',
  'user.hello': 'ഹലോ, {{name}}!',
  'user.independent-learning': 'സ്വതന്ത്ര പഠന',
  'user.join-class': 'ക്ലാസ്റൂമിൽ ചേരുക',
  'user.joined-classes.zero':
    'നിങ്ങൾ {{count}} ക്ലാസ് മുറികളിൽ ഇപ്പോൾ എൻറോൾ ചെയ്തു',
  'user.joined-classes.one': 'നിങ്ങൾ നിലവിൽ 1 ക്ലാസ്റൂമിൽ എൻറോൾ ചെയ്തു',
  'user.joined-classes.other':
    'നിങ്ങൾ {{count}} ക്ലാസ് മുറികളിൽ ഇപ്പോൾ എൻറോൾ ചെയ്തു',
  'user.my-current-classes': 'എന്റെ നിലവിലെ ക്ലാസുകൾ',
  'user.manage-goals': 'ലക്ഷ്യങ്ങൾ നിയന്ത്രിക്കുക',
  'user.my-classes': 'എന്റെ ക്ലാസുകൾ',
  'user.teaching-classes.zero':
    'നിങ്ങൾ ഇപ്പോൾ {{count}} ക്ലാസ്മുറികൾ പഠിക്കുന്നു',
  'user.teaching-classes.one': 'നിങ്ങൾ നിലവിൽ 1 ക്ലാസ് റൂമിൽ പഠിക്കുന്നു',
  'user.teaching-classes.other':
    'നിങ്ങൾ ഇപ്പോൾ {{count}} ക്ലാസ്മുറികൾ പഠിക്കുന്നു',
  'student-landing.announcement': 'പ്രഖ്യാപനം',
  'student-landing.browse-featured-courses':
    'ഞങ്ങളുടെ തിരഞ്ഞെടുത്ത കോഴ്സുകൾ ബ്രൗസുചെയ്യുക',
  'student-landing.browse-our': 'ഞങ്ങളുടെ ബ്രൗസ് ചെയ്യുക',
  'student-landing.class-code': 'ക്ലാസ് കോഡ്',
  'student-landing.featured-courses': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'student-landing.class.assigned-course': 'നിയുക്ത കോഴ്സ്',
  'student-landing.class.back-to': 'തിരികെ ക്ലാസ് മുറികൾ',
  'student-landing.class.no-course': 'ഈ ക്ലാസ്റൂമിൽ ഒരു അനുബന്ധ കോഴ്സ് ഇല്ല.',
  'student-landing.class.no-course-assigned': 'ഒരു കോഴ്സുകളില്ല',
  'student-landing.class.back-to-independent': 'സ്വതന്ത്ര പഠനത്തിലേക്ക്',
  'student-landing.class.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'student-landing.class.performance': 'പ്രകടനം',
  'student-landing.class.course-map': 'കോഴ്സ് മാപ്പ്',
  'student-landing.class.unit': 'യൂണിറ്റ്',
  'student-landing.class.lesson': 'പാഠം',
  'student-landing.class.class-activities': 'ക്ലാസ് പ്രവർത്തനങ്ങൾ',
  'student-landing.class.class-activities-tab.today': 'ഇന്ന്',
  'student-landing.class.class-activities-tab.past-activities':
    'കഴിഞ്ഞ പ്രവർത്തനങ്ങൾ',
  'student-landing.class.my-report': 'എന്റെ റിപ്പോർട്ട്',
  'student-landing.class.my-location': 'എന്റെ ലൊക്കേഷൻ',
  'student-landing.class.my-proficiency': 'My Proficiency',
  'student-landing.class.establish-skyline': 'Let\'s Establish your Skyline',
  'student-landing.class.waiting-establish-skyline':
    'Waiting for your teacher to complete setting up the class.',
  'student-landing.class.setup-in-complete-desc1':
    'It looks like your teacher has not',
  'student-landing.class.setup-in-complete-desc2': 'updated class settings',
  'student-landing.class.setup-in-complete-desc3':
    'Please get in touch with her to resolve the matter. Once everything is correctly set up, refresh this page.',
  'student-landing.course.to-report': 'ഉപയോഗ സംഗ്രഹം',
  'student-landing.course.total-time-spent': 'ചെലവഴിച്ച മൊത്തം സമയം',
  'student-landing.current-activity': 'നിലവിലെ പ്രവർത്തനം',
  'student-landing.resume-current-activity':
    'നിലവിലെ പ്രവർത്തനം പുനരാരംഭിക്കുക',
  'student-landing.last-activity': 'അവസാന പ്രവർത്തനം',
  'student-landing.start-studying': 'പഠിക്കാൻ ആരംഭിക്കുക',
  'student-landing.not-available': '-na-',
  'student-landing.join-classroom':
    'പഠന ആരംഭിക്കാൻ നിങ്ങളുടെ ടീച്ചറുടെ ക്ലാസ്റൂമിൽ ചേരുക',
  'student-landing.learn': 'ഒരു കോറോറൂം ക്ലാസ്റൂം പഠിക്കുക',
  'student-landing.my-performance.activity': 'പ്രവർത്തനം',
  'student-landing.my-performance.activities.study': 'പഠിക്കുക',
  'student-landing.my-performance.assessments': 'വിലയിരുത്തലുകൾ',
  'student-landing.my-performance.collections': 'ശേഖരങ്ങൾ',
  'student-landing.my-performance.filter': 'ഫിൽറ്റർ ചെയ്യുക',
  'student-landing.my-performance.primary-text':
    'നിങ്ങൾ വിശകലനം ചെയ്യാൻ ആഗ്രഹിക്കുന്ന കാര്യങ്ങൾ തിരഞ്ഞെടുക്കുക, ഞങ്ങൾ ഒരു ഇഷ്ടാനുസൃത പ്രവർത്തന റിപ്പോർട്ട് സൃഷ്ടിക്കും.',
  'student-landing.my-performance.subject': 'വിഷയം',
  'student-landing.my-performance.title': 'നിങ്ങളുടെ പ്രകടനം വിശകലനം ചെയ്യുക',
  'student-landing.my-performance.time-period': 'സമയ കാലയളവ്',
  'student-landing.my-performance.update-report':
    'റിപ്പോർട്ട് അപ്ഡേറ്റുചെയ്യുക',
  'student-landing.study-player': 'പഠന കളിക്കാരൻ',
  'student-landing.my-study': 'എന്റെ പഠനം',
  'student-landing.no-classrooms':
    'നിങ്ങൾ ഇതുവരെ ക്ലാസ്സുകളിലൊന്നും ചേർന്നിട്ടില്ല. നിങ്ങളുടെ ടീച്ചർ ക്ലാസ് ചേർക്കാൻ "[1] ക്ലാസ്റൂമിൽ ചേരുക. നിങ്ങൾക്ക് ലൈബ്രറി ടാബിൽ ഒരു തിരഞ്ഞെടുത്ത കോഡിനായി തിരയാൻ കഴിയും.',
  'student-landing.no-content-classrooms':
    'നിലവിൽ ഈ ക്ലാസ്റൂമിൽ ഉള്ളടക്കമൊന്നും ലഭ്യമല്ല',
  'student-landing.welcome': 'gooru ലേക്ക് സ്വാഗതം.',
  'student-landing.no-course-assigned':
    'ഇതുവരെ ഈ ക്ലാസിലേക്ക് ഗ്യാരൻ നൽകിയിട്ടില്ല. ദയവായി നിങ്ങളുടെ ടീച്ചറെ ബന്ധപ്പെടുക.',
  'student-independent-learning.show-more': 'കൂടുതൽ കാണിക്കുക',
  'student-independent-learning.show-less': 'കുറച്ച് കാണിക്കുക',
  'student-independent-learning.no-courses':
    'നിങ്ങൾ ബുക്ക്മാർക്ക് ചെയ്ത കോഴ്സുകൾ പര്യവേക്ഷണം ചെയ്യുമ്പോൾ, അവ ഇവിടെ ദൃശ്യമാകും.',
  'student-independent-learning.no-collections':
    'നിങ്ങളുടെ ബുക്ക്മാർക്ക് ചെയ്ത ശേഖരങ്ങൾ നിങ്ങൾ പര്യവേക്ഷണം ആരംഭിക്കുമ്പോൾ, അവ ഇവിടെ ദൃശ്യമാകും.',
  'student-independent-learning.no-assessments':
    'നിങ്ങളുടെ ബുക്ക്മാർക്ക് ചെയ്ത അസെസ്മെന്റുകൾ നിങ്ങൾ പര്യവേക്ഷണം ആരംഭിക്കുമ്പോൾ, അവ ഇവിടെ ദൃശ്യമാകും.',
  'student-independent-learning.no-independent-results':
    'പുതിയതെന്തെങ്കിലും അറിയാൻ ലൈബ്രറി പര്യവേക്ഷണം ചെയ്യുക.',
  'student-independent-learning.no-bookmarks':
    'നിങ്ങൾ ബുക്ക്മാർക്കിംഗ് കോഴ്സുകൾ, ശേഖരങ്ങൾ, അസസ്സ്മെന്റുകൾ എന്നിവ ആരംഭിക്കുമ്പോൾ അവ ഇവിടെ ദൃശ്യമാകും.',
  'student-independent-learning.add-bookmark': 'ബുക്ക്മാർക്ക് ചേർക്കുക',
  'teacher-landing.latest-announcement': 'ഏറ്റവും പുതിയ പ്രഖ്യാപനം',
  'teacher-landing.latest-assessment': 'ഏറ്റവും പുതിയ വിലയിരുത്തൽ',
  'teacher-landing.create-classroom':
    'ഒരു ക്ലാസ്റൂം സൃഷ്ടിക്കുക, ഉള്ളടക്കം കൊടുക്കുക, വിദ്യാർത്ഥികളെ ക്ഷണിക്കുക',
  'teacher-landing.dca-create-info':
    'താഴെയുള്ള ഐക്കണുകളിൽ ക്ലിക്ക് ചെയ്ത് gooru ലൈബ്രറിയിൽ നിന്നും ഒരു വർക്ക് പ്രവർത്തനം സൃഷ്ടിക്കുന്നതിന് ഉള്ളടക്കം തിരയാൻ. കോഴ്സ് മാപ്പിൽ ക്ലിക്കുചെയ്ത് നിങ്ങളുടെ കോഴ്സ് മാപ്പിൽ നിന്ന് നിങ്ങൾക്ക് ക്ലാസ് പ്രവർത്തനങ്ങളിലേക്ക് ഉള്ളടക്കം ചേർക്കാൻ കഴിയും.',
  'teacher-landing.schedule-for-later': 'പിന്നീട് ഷെഡ്യൂൾ ചെയ്യുക',
  'teacher-landing.teach-this-activity-later':
    'പിന്നീട് ഈ പ്രവർത്തനത്തെ dca ൽ പഠിപ്പിക്കുക',
  'teacher-landing.schedule-dca-instruction-1':
    'ഈ പ്രവർത്തനം പഠിപ്പിക്കുന്നതിനുള്ള ഒരു പിന്നീടുള്ള തീയതി തിരഞ്ഞെടുക്കുക.',
  'teacher-landing.schedule-dca-instruction-2':
    'തിരഞ്ഞെടുത്ത തീയതിക്ക് ഈ പ്രവർത്തനം dca ൽ പ്രത്യക്ഷപ്പെടും.',
  'teacher-landing.navigator-banner.title': 'ഗണിതം നാവിഗേറ്റർ',
  'teacher-landing.navigator-banner.description':
    'പഠന സാങ്കേതിക വിദ്യയ്ക്കായി ഈ ജിപിഎസ് പ്രയോജനപ്പെടുത്തുന്നു, എല്ലാ വിദ്യാർത്ഥികൾക്കും ആത്മവിശ്വാസം നേടുന്നതിനും ഗണിത പഠനം സാധ്യമാക്കുന്നതിനും ഗണിതശാസ്ത്രജ്ഞനായ നാവിഗേറ്റർ രൂപകൽപന ചെയ്തിട്ടുണ്ട്. [1] ഗണിതശാസ്ത്രജ്ഞനായ നാവിഗേറ്റർ എല്ലാ ക്ലാസിക്കൽ കോഴ്സുകളും 2 മുതൽ 2 വരെയുള്ള ഗ്രേഡുകളിൽ ഉൾക്കൊള്ളുന്ന പഠന പാഠമാണ്. വിദ്യാർത്ഥികൾ അവരുടെ നിലവിലെ അറിവ് സൃഷ്ടിക്കുന്നതിനായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്ന ഒരു വ്യക്തിഗത മാർഗത്തിലൂടെ വഴി തിരിച്ചുവരുന്നു, കൂടാതെ അവരുടെ ധാരണയിലെ പൂരിപ്പിക്കൽ വിടവുകൾ മാറുന്നു. ഈ സമഗ്രവും വ്യക്തിഗതമാക്കിയ പഠനാനുഭവവും മുഖേന ഓരോ വിദ്യാർത്ഥിയും കൂടുതൽ വിപുലമായ ഗണിതത്തിനു വേണ്ടി പൂർണ്ണമായി തയ്യാറാക്കാൻ കഴിയും.',
  'teacher-landing.navigator-banner.join': 'ഡെമോ ക്ലാസിൽ ചേരുക',
  'teacher-landing.navigator-banner.success-message':
    'നാവിഗേറ്റർ ക്ലാസിലെ കോ-ടീച്ചറായി നിങ്ങൾ ചേർന്നു',
  'teacher-landing.navigator-banner.error-message':
    'ക്ലാസിൽ ചേരുന്നതിൽ പ്രശ്നം',
  'teacher-landing.class.atc-view.progress-to-destination':
    'progress to destination',
  'teacher-landing.class.manage': 'മാനേജ് ചെയ്യുക',
  'teacher-landing.class.reports': 'റിപ്പോർട്ടുകൾ',
  'teacher-landing.class.daily-activites': 'ദൈനംദിന പ്രവർത്തനങ്ങൾ',
  'teacher-landing.class.courses': 'കോഴ്സ്',
  'teacher-landing.class.back-to': 'തിരികെ ക്ലാസ് മുറികൾ',
  'teacher-landing.class.back-to-archived':
    'തിരികെ ആർക്കൈവ് ചെയ്ത ക്ലാസ് മുറികൾ',
  'teacher-landing.class.class-management': 'ക്ലാസ് മാനേജ്മെന്റ്',
  'teacher-landing.class.atc': 'ATC',
  'teacher-landing.class.performance-overview': 'Performance Overview',
  'teacher-landing.class.student-proficiency': 'Student Proficiency',
  'teacher-landing.class.class-management-tab.actions': 'പ്രവർത്തനങ്ങൾ',
  'teacher-landing.class.class-management-tab.assessment-min-score':
    'ട്രോഫികളുടെ മൂല്യനിർണ്ണയ കുറഞ്ഞ സ്കോർ',
  'teacher-landing.class.class-management-tab.assigned-course':
    'നിയുക്ത കോഴ്സ്',
  'teacher-landing.class.class-management-tab.archive': 'ആർക്കൈവ് ചെയ്യുക',
  'teacher-landing.class.class-management-tab.archive-class': 'ആർക്കൈവ് ക്ലാസ്',
  'teacher-landing.class.class-management-tab.archive-classroom':
    'ആർക്കൈവ് ക്ലാസ്റൂം',
  'teacher-landing.class.class-management-tab.attend-class-with-code':
    'കോഡ് ഉപയോഗിച്ച് ക്ലാസിൽ പഠിക്കൂ',
  'teacher-landing.class.class-management-tab.class-information':
    'ക്ലാസ് വിവരം',
  'teacher-landing.class.class-management-tab.class-name':
    'ക്ലാസ്മുറിയുടെ പേര്',
  'teacher-landing.class.class-management-tab.class-code': 'ക്ലാസ് കോഡ്',
  'teacher-landing.class.class-management-tab.click-to-copy-class-code':
    'ക്ലാസ് കോഡ് പകർത്താൻ ക്ലിക്കുചെയ്യുക',
  'teacher-landing.class.class-management-tab.course-information':
    'കോഴ്സ് വിവരങ്ങൾ',
  'teacher-landing.class.class-management-tab.delete': 'ഇല്ലാതാക്കുക',
  'teacher-landing.class.class-management-tab.delete-class':
    'ക്ലാസ് ഇല്ലാതാക്കുക',
  'teacher-landing.class.class-management-tab.download-roster':
    'റോസ്റ്റർ ഡൗൺലോഡ് ചെയ്യുക',
  'teacher-landing.class.class-management-tab.edit': 'എഡിറ്റ് ചെയ്യുക',
  'teacher-landing.class.class-management-tab.email-address':
    'ഈ - മെയില് വിലാസം',
  'teacher-landing.class.class-management-tab.first-name': 'പേരിന്റെ ആദ്യഭാഗം',
  'teacher-landing.class.class-management-tab.import-roster':
    'റോസ്റ്റർ ഇറക്കുമതി ചെയ്യുക',
  'teacher-landing.class.class-management-tab.last-name': 'പേരിന്റെ അവസാന ഭാഗം',
  'teacher-landing.class.class-management-tab.message': 'സന്ദേശം',
  'teacher-landing.class.class-management-tab.performance': 'പ്രകടനം',
  'teacher-landing.class.class-management-tab.students': 'വിദ്യാർത്ഥികൾ',
  'teacher-landing.class.class-management-tab.student-name':
    'വിദ്യാർഥിയുടെ പേര്',
  'teacher-landing.class.class-management-tab.student-id':
    'വിദ്യാർത്ഥിയുടെ ഐഡി',
  'teacher-landing.class.class-management-tab.teachers': 'അധ്യാപകർ',
  'teacher-landing.class.class-management-tab.view-report':
    'റിപ്പോർട്ട് കാണുക',
  'teacher-landing.class.class-management-tab.course-null':
    'ക്ലാസ്റൂം ഇതുവരെ നിശ്ചയിച്ചിട്ടില്ല.',
  'teacher-landing.class.class-management-tab.course-subject-null':
    'ക്ലാസ് റൂമിൽ നൽകിയിരിക്കുന്ന ഗതി ഒരു സാധുതയുള്ള വിഷയത്തിലേക്ക് ടാഗുചെയ്തിട്ടില്ല.',
  'teacher-landing.class.class-management-tab.students-null':
    'ക്ലാസ്മുറിയിൽ ചേരാൻ നിങ്ങളുടെ വിദ്യാർത്ഥികളുമായി ക്ലാസ് കോഡ് പങ്കിടുക.',
  'teacher-landing.class.students-tab.last-name': 'പേരിന്റെ അവസാന ഭാഗം',
  'teacher-landing.class.students-tab.first-name': 'പേരിന്റെ ആദ്യഭാഗം',
  'teacher-landing.class.students-tab.performance': 'പ്രകടനം',
  'teacher-landing.class.students-tab.proficiency': 'യോഗ്യത',
  'teacher-landing.class.students-tab.location': 'സ്ഥലം',
  'teacher-landing.class.students-tab.currently-studying': 'നിലവിൽ പഠിക്കുന്നു',
  'teacher-landing.class.students-tab.student-id': 'വിദ്യാർത്ഥി',
  'teacher-landing.class.students-tab.remove': 'നീക്കം ചെയ്യുക',
  'teacher-landing.class.students-tab.mastered': 'കഴിവുള്ളവൻ',
  'teacher-landing.class.students-tab.in-progress': 'പുരോഗതിയിൽ',
  'teacher-landing.class.students-tab.not-started': 'ആരംഭിച്ചില്ല',
  'teacher-landing.class.students-tab.course-coverage': 'കോഴ്സ് കവറേജ്',
  'teacher-landing.class.students-tab.class-statistics':
    'ക്ലാസ് സ്റ്റാറ്റിസ്റ്റിക്സ്',
  'teacher-landing.class.students-tab.proficiency-in': 'യോഗ്യത',
  'teacher-landing.class.students-tab.data-not-available': 'ഡാറ്റ ലഭ്യമല്ല',
  'teacher-landing.class.students-tab.course-coverage-label':
    'ക്ലാസിലെ എല്ലാ വിദ്യാർത്ഥികൾക്കും ശേഷിയുള്ള കൂട്ടായ എണ്ണം',
  'teacher-landing.class.students-tab.error-message':
    'ക്ലാസ്സിന് നിശ്ചയിച്ചിട്ടുള്ള ഒരു കോഴ്സ് ഇല്ല അല്ലെങ്കിൽ ഇതുവരെ വിദ്യാർത്ഥികൾ ക്ലാസിൽ കടന്നു rostered ഇല്ല. ക്ലാസ്സിന് കോഴ്സ് നൽകിയിട്ട് വിദ്യാർത്ഥികൾ അട്ടിമറിക്കപ്പെട്ടാൽ, ക്ലാസ് യോഗ്യതയുള്ള റിപ്പോർട്ട് ഇവിടെ പ്രദർശിപ്പിക്കും',
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
  'teacher-landing.class.class-activities': 'ക്ലാസ് പ്രവർത്തനങ്ങൾ',
  'teacher-landing.class.offline-class-report.class-report':
    'ക്ലാസ് റിപ്പോർട്ട്',
  'teacher-landing.class.offline-class-report.activity-report':
    'പ്രവർത്തന റിപ്പോർട്ട്',
  'teacher-landing.class.offline-class-report.conducted-on': 'നടന്നത്',
  'teacher-landing.class.offline-class-report.not-started': 'ആരംഭിച്ചില്ല',
  'teacher-landing.class.back-to-class-activities':
    'തിരികെ ക്ലാസ് പ്രവർത്തനങ്ങൾ',
  'teacher-landing.class.class-activities-tab.today': 'ഇന്ന്:',
  'teacher-landing.class.class-activities-tab.yesterday': 'ഇന്നലെ:',
  'teacher-landing.class.class-activities-tab.month': 'മാസം:',
  'teacher-landing.class.class-activities-tab.add-from-course-map':
    'കോഴ്സ് മാപ്പിൽ നിന്ന് ചേർക്കുക',
  'teacher-landing.class.class-activities-tab.add-from-my-content':
    'എന്റെ ഉള്ളടക്കത്തിൽ നിന്ന് ചേർക്കുക',
  'teacher-landing.class.class-activities-tab.welcome-dca':
    'നിങ്ങളുടെ ക്ലാസ് പ്രവർത്തനങ്ങളിലേയ്ക്ക് സ്വാഗതം ചെയ്യുക. അവിടെ നിങ്ങൾക്ക് വിദ്യാർത്ഥികൾക്കുള്ള ശേഖരവും മൂല്യനിർണ്ണയവും ഇന്ന് പൂർത്തിയാക്കാൻ കഴിയും. ദയവായി ശ്രദ്ധിക്കുക: ഏറ്റവും പുതിയ ശ്രമം നടത്തുന്നതിന് നിലവിൽ ലഭ്യമായ റിപ്പോർട്ടുകൾ ഇന്ന് ലഭ്യമാകും.',
  'teacher-landing.class.class-activities-tab.enter-max-timespent':
    'വിലയിരുത്തലിനായി പരമാവധി ടൈംപെന്റ് നൽകുക',
  'teacher-landing.class.class-activities-tab.enter-max-assessment-time-spent':
    'മൂല്യനിർണയം പൂർത്തിയാക്കുന്നതിന് ചെലവഴിച്ച സമയം നൽകുക',
  'teacher-landing.class.class-activities-tab.enter-max-score':
    'മൂല്യനിർണ്ണയത്തിനായി പരമാവധി സ്കോർ നൽകുക',
  'teacher-landing.class.class-activities-tab.hour': 'മ',
  'teacher-landing.class.class-activities-tab.min': 'm',
  'teacher-landing.class.class-activities-tab.question-score': 'ചോദ്യ സ്കോർ',
  'teacher-landing.class.class-activities-tab.max-score': 'പരമാവധി സ്കോർ',
  'teacher-landing.class.class-activities-tab.assessment-score':
    'വിലയിരുത്തൽ സ്കോർ',
  'teacher-landing.class.class-activities-tab.assessment-max-score':
    'മൂല്യനിർണയ പരമാവധി. സ്കോർ',
  'teacher-landing.class.class-activities-tab.enter-valid-timespent':
    'ചെലവഴിച്ച സാധുവായ സമയം നൽകുക',
  'teacher-landing.class.class-activities-tab.create-activity':
    'പ്രവർത്തനം സൃഷ്ടിക്കുക',
  'teacher-landing.class.class-activities-tab.schedule-activity':
    'ഷെഡ്യൂൾ പ്രവർത്തനം',
  'teacher-landing.class.class-activities-tab.add-subject-framework':
    'ദയവായി ക്ലാസ് സജ്ജീകരണങ്ങളിൽ ഒരു വിഷയവും ചട്ടക്കൂടിനും തിരഞ്ഞെടുക്കുക',
  'teacher-landing.class.class-activities-tab.create-external-collection':
    'ഒരു ബാഹ്യ ശേഖരം സൃഷ്ടിക്കുക',
  'teacher-landing.class.click-to-copy': 'ക്ലാസ് കോഡ് പകർത്താൻ ക്ലിക്കുചെയ്യുക',
  'teacher-landing.class.course-map': 'കോഴ്സ് മാപ്പ്',
  'teacher-landing.class.management': 'റോസ്റ്റർ മാനേജ്മെന്റ്',
  'teacher-landing.class.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'teacher-landing.class.performance': 'പ്രകടനം',
  'teacher-landing.class.performance-tab.assessments': 'വിലയിരുത്തലുകൾ',
  'teacher-landing.class.performance-tab.collections': 'ശേഖരങ്ങൾ',
  'teacher-landing.class.view-more': 'കൂടുതൽ കാണു',
  'teacher-landing.class.class-settings.class-settings-sec.generate-pathway':
    'പഠന പാത് വ്യക്തിഗതമാക്കുക',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-head':
    'ക്ലാസ് സജ്ജീകരണങ്ങൾ',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-desc':
    'ഒരു ട്രോഫി നേടുന്നതിന് കുറഞ്ഞ പ്രകടനം',
  'teacher-landing.class.class-settings.class-settings-sec.class-code':
    'ക്ലാസ് കോഡ്',
  'teacher-landing.class.class-settings.class-settings-sec.subject': 'വിഷയം',
  'teacher-landing.class.class-settings.class-settings-sec.framework':
    'ചട്ടക്കൂട്',
  'teacher-landing.class.class-settings.class-settings-sec.grade-level':
    'ഗ്രേഡ് നില',
  'teacher-landing.class.class-settings.class-settings-sec.option-choose-one':
    'ഒന്ന് തിരഞ്ഞെടുക്കുക',
  'teacher-landing.class.class-settings.class-settings-sec.co-teachers':
    'സഹ-അദ്ധ്യാപകർ',
  'teacher-landing.class.class-settings.class-settings-sec.add-coteacher':
    'മറ്റൊരു അധ്യാപകനെ ചേർക്കുക',
  'teacher-landing.class.class-settings.class-settings-sec.language':
    'പ്രബോധന ഭാഷ',
  'teacher-landing.class.class-settings.student-settings-sec.student-settings-sec-head':
    'വിദ്യാർത്ഥി ക്രമീകരണങ്ങൾ',
  'teacher-landing.class.class-settings.student-settings-sec.col-head-active':
    'സജീവമാണ്',
  'teacher-landing.class.class-settings.course-settings-sec.course-settings-sec-head':
    'കോഴ്സ് ക്രമീകരണങ്ങൾ',
  'teacher-landing.class.class-settings.course-settings-sec.is-route0-applicable':
    'വ്യക്തിഗതമാക്കാൻ പഠന പാത്ത് പ്രൊഫൈലിൽ വിടവുകൾ ഉണ്ടായിരിക്കണമോ?',
  'teacher-landing.class.class-settings.course-settings-sec.apply-settings':
    'ക്രമീകരണങ്ങൾ പ്രയോഗിക്കുക',
  'teacher-landing.class.class-settings.course-settings-sec.origin-info':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികൾ പഠിക്കേണ്ട ഏറ്റവും കുറഞ്ഞ നിലവാരത്തിലുള്ള ഉള്ളടക്കം എന്താണ്?',
  'teacher-landing.class.class-settings.course-settings-sec.current-grade-info':
    'നിങ്ങളുടെ ക്ലാസ് ഗ്രേഡ് നില എന്താണ്?',
  'teacher-landing.class.class-settings.origin': 'ഉത്ഭവം',
  'teacher-landing.class.class-settings.destination': 'ഉദ്ദിഷ്ടസ്ഥാനം',
  'teacher-landing.class.class-settings.students': 'വിദ്യാർത്ഥികൾ',
  'teacher-landing.class.class-settings.student-id': 'വിദ്യാർത്ഥി-ഐഡി',
  'teacher-landing.class.class-settings.joined-on': 'ചേർന്നു',
  'teacher-landing.class.class-settings.action-lable-add-student':
    'മറ്റൊരു വിദ്യാർത്ഥിയെ ചേർക്കുക',
  'teacher-landing.no-classrooms':
    'നിങ്ങൾ ഇതുവരെ ക്ലാസ്മുറികളൊന്നും സൃഷ്ടിച്ചിട്ടില്ല. ലൈബ്രറി ടാബിൽ "തിരഞ്ഞെടുത്ത ക്ലാസ്റൂം" ക്ലിക്കുചെയ്യുക അല്ലെങ്കിൽ ഒരു തിരഞ്ഞെടുത്ത കോഴ്സിന് [1] തിരയുക.',
  'teacher-landing.no-course':
    'നിങ്ങൾ ഈ [1] ക്ലാസ്മുറിയിലേയ്ക്ക് ഒരു കോഴ്സ് നൽകിയിട്ടില്ല.',
  'teacher-landing.teach': 'ഒരു കോറസ് ക്ലാസ്റൂം പഠിപ്പിക്കുക',
  'teacher-landing.welcome-course-map':
    'ഇത് നിങ്ങളുടെ കോഴ്സ് മാപ്പാണ്, അവിടെ നിങ്ങൾക്ക് കോഴ്സ് ഉള്ളടക്കം കാണാൻ കഴിയും, അസെസ്മെന്റുകൾ ഓണാക്കുക അല്ലെങ്കിൽ ഓഫ് ചെയ്ത് തത്സമയം അസെസ്മെന്റുകൾ ആരംഭിക്കുക. നിങ്ങൾക്ക് മൊത്തം ക്ലാസ് പ്രകടനവും പൂർത്തീകരണം കാണാനാകും. ക്ലാസ് പ്രകടനത്തിന്റെ വിശദമായ കാഴ്ചയ്ക്കായി, നിങ്ങളുടെ ക്ലാസ്റൂമിലെ റിപ്പോർട്ട് ടാബ് സന്ദർശിക്കുക.',
  'teacher-landing.welcome-rescoped-course-map':
    'ക്ലാസിൽ ഓരോ വിദ്യാർത്ഥിക്കും ഈ കോഴ്സിനു വ്യക്തിപരമാക്കുകയും ചെയ്തു. വിദ്യാർത്ഥിയുടെ \'s പഠന പാത്ത്വേ ( "-> ") ക്ലിക്ക് ചെയ്ത് ക്ലാസ് മാനേജ്മെൻറ് പേജിൽ ഓരോ വിദ്യാർത്ഥിയുടെ കോഴ്സ് മാപ്പും കാണാൻ കഴിയും.',
  'teacher-landing.welcome-premium-course-map':
    'ഈ നാവിഗേറ്റർ കോഴ്സ് ഒന്നിലധികം ഗ്രേഡുകളിൽ നിലവാരത്തെ ഉൾക്കൊള്ളുന്ന വ്യക്തിഗത കോഴ്സാണ്. ഓരോ വിദ്യാർത്ഥിക്കും വിടവ് നികത്താനും, ആശയങ്ങളെ ശക്തിപ്പെടുത്താനും, അവരുടെ പഠനത്തെ ത്വരിതപ്പെടുത്തുന്നതിനും സഹായിക്കുന്ന ഒരു അദ്വിതീയ കോഴ്സാണ് നൽകുന്നത്. വ്യക്തിഗതമാക്കിയ യാത്രാമാർഗ്ഗങ്ങൾ രൂപകൽപ്പന ചെയ്യപ്പെടുന്നു, ഓരോ വിദ്യാർത്ഥികളുടെയും പഠന ശേഷി പരമാവധിയാക്കാനും അവരുടെ സെറ്റ് ഡെസ്റ്റിനേഷനിലേക്ക് നാവിഗേറ്റുചെയ്യാനും വിദ്യാർത്ഥികൾ യഥാ സമയം വീണ്ടും രൂപത്തിൽ എത്തിച്ചേരുന്നു.',
  'goals.manage.title': 'എന്റെ ലക്ഷ്യങ്ങൾ!',
  'goals.manage.add-goal': 'ലക്ഷ്യം ചേർക്കുക',
  'goals.manage.goal-label': 'ലക്ഷ്യം',
  'goals.manage.start-date-label': 'തുടങ്ങുന്ന ദിവസം',
  'goals.manage.end-date-label': 'അവസാന ദിവസം',
  'goals.manage.type-label': 'ലക്ഷ്യം തരം',
  'goals.manage.status-label': 'പദവി',
  'goals.manage.not_started': 'ആരംഭിച്ചില്ല',
  'goals.manage.activated': 'സജീവമാക്കി',
  'goals.manage.completed': 'പൂർത്തിയായി',
  'goals.manage.dropped': 'ഉപേക്ഷിച്ചു',
  'goals.manage.reflection-label': 'പ്രതിഫലനം',
  'goals.manage.save': 'രക്ഷിക്കും',
  'goals.manage.update': 'അപ്ഡേറ്റ്',
  'goals.manage.goals-not-found':
    'നിങ്ങൾ ഇതുവരെ ലക്ഷ്യങ്ങൾ ഒന്നും സജ്ജീകരിച്ചിട്ടില്ല. മുകളിലുള്ള  "ഗോൾ ചേർക്കുക " ബട്ടൺ ക്ലിക്കുചെയ്ത് ഒരു ലക്ഷ്യം നിങ്ങൾക്ക് ചേർക്കാൻ കഴിയും.',
  'goals.create.error-add-title': 'ലക്ഷ്യം നൽകുക',
  'goals.create.error-length-title':
    'ലക്ഷ്യത്തിൽ പരമാവധി 200 പ്രതീകങ്ങൾ ഉണ്ടായിരിക്കണം',
  'goals.create.error-add-start-date': 'ദയവായി ആരംഭ തീയതി നൽകുക',
  'goals.create.error-add-end-date': 'ദയവായി അവസാന തീയതി നൽകുക',
  'goals.create.error-greater-end-date':
    'അവസാന തീയതി, ആരംഭ തീയതിയേക്കാൾ കൂടുതലായിരിക്കണം',
  'goals.create.error-add-status': 'ലക്ഷ്യ നില തിരഞ്ഞെടുക്കുക',
  'goals.create.error-length-reflection':
    'പ്രതിഫലനത്തിന് പരമാവധി 2000 പ്രതീകങ്ങൾ ഉണ്ടായിരിക്കണം',
  'goals.create.created-success-msg': 'നിങ്ങൾ ലക്ഷ്യം സൃഷ്ടിച്ചു {{goaltitle}}',
  'goals.delete.deleted-success-msg': 'നിങ്ങൾ ലക്ഷ്യം ഇല്ലാതാക്കിയല്ലോ',
  'goals.update.updated-success-msg': 'നിങ്ങൾ ലക്ഷ്യം അപ്ഡേറ്റുചെയ്തു',
  'gru-add-to.add-assessment-to-lesson':
    'എന്റെ മൂല്യനിർണ്ണയങ്ങളിൽ നിന്ന് ചേർക്കുക',
  'gru-add-to.add-assessment-to-lesson-lead':
    'ഈ പാഠത്തിലേക്ക് ചേർക്കാൻ മൂല്യനിർണ്ണയം തിരഞ്ഞെടുക്കുക.',
  'gru-add-to.add-collection-to-lesson': 'എന്റെ ശേഖരങ്ങളിൽ നിന്ന് ചേർക്കുക',
  'gru-add-to.add-collection-to-lesson-lead':
    'ഈ പാഠത്തിലേക്ക് ചേർക്കാൻ ഒരു ശേഖരം തിരഞ്ഞെടുക്കുക.',
  'gru-add-to.add-to-collection': 'ശേഖരത്തിൽ ചേർക്കുക',
  'gru-add-to.add-to-collection-lead':
    'നിങ്ങൾ {{contenttitle}} ചേർക്കേണ്ട ഒരു ശേഖരം തിരഞ്ഞെടുക്കുക',
  'gru-add-to.add-to-existing-classroom': 'നിലവിലുള്ള ക്ലാസ്റൂമിൽ ചേർക്കുക',
  'gru-add-to.add-to-existing-classroom-lead':
    'നിങ്ങൾ ചേർക്കാൻ ആഗ്രഹിക്കുന്ന ഒരു ക്ലാസ്റൂം തിരഞ്ഞെടുക്കുക',
  'gru-add-to.add-to-assessment': 'മൂല്യനിർണയം അല്ലെങ്കിൽ ശേഖരത്തിൽ ചേർക്കുക',
  'gru-add-to.add-to-assessment-lead':
    'നിങ്ങൾ {{contenttitle}} ചേർക്കാൻ ആഗ്രഹിക്കുന്ന ഒരു വിലയിരുത്തൽ തിരഞ്ഞെടുക്കുക',
  'gru-add-to.assessments-info':
    'ഇവിടെ നൽകിയിരിക്കുന്ന മൂല്യനിർണ്ണയം [1] മറ്റൊരു പാഠം അല്ലെങ്കിൽ പഠനത്തിന്റെ ഭാഗമായിരിക്കുകയില്ല',
  'gru-add-to.collections-info':
    'ഇവിടെ പറഞ്ഞിരിക്കുന്ന ശേഖരങ്ങൾ [1] മറ്റൊരു പാഠഭാഗമോ പഠനമോ അല്ല',
  'gru-add-rubric-to-question.title': 'എന്റെ റൂബിക്സ് കൂട്ടിച്ചേർക്കുക',
  'gru-add-rubric-to-question.lead':
    'ഈ ചോദ്യത്തിലേക്ക് ചേർക്കുന്നതിന് ഒരു റബ്രിക് തിരഞ്ഞെടുക്കുക.',
  'gru-add-rubric-to-question.no-rubrics':
    'ഈ സൌജന്യ പ്രതികരണ ചോദ്യവുമായി ബന്ധിപ്പിക്കാൻ സാധിക്കുന്ന ഏതൊരു റക്സും നിങ്ങൾ ഇതുവരെ സൃഷ്ടിച്ചിട്ടില്ല. നിങ്ങളുടെ പ്രൊഫൈലിൽ നിന്ന് ആക്സസ് ചെയ്യാൻ കഴിയുന്ന എന്റെ ഉള്ളടക്കത്തിൽ നിങ്ങൾക്ക് റൂട്ട്ക്സ് സൃഷ്ടിക്കാൻ കഴിയും.',
  'gru-add-rubric-to-question.go-to-content': 'എന്റെ ഉള്ളടക്കത്തിലേക്ക് പോവുക',
  'gru-assessment-confirmation.title':
    'നിങ്ങൾ ഒരു വിലയിരുത്തൽ ആരംഭിക്കാൻ പോകുകയാണ് ...',
  'gru-assessment-confirmation.description':
    'ഈ മൂല്യനിർണ്ണയത്തിൽ {{model.title}}',
  'gru-assessment-confirmation.setting-forward':
    'നിങ്ങൾക്ക് മുന്നോട്ട് നാവിഗേറ്റ് ചെയ്യാം',
  'gru-assessment-confirmation.setting-forward-backward':
    'നിങ്ങൾക്ക് ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകാൻ മുന്നോട്ടു പിന്നോട്ട് നാവിഗേറ്റ് ചെയ്യാം',
  'gru-assessment-confirmation.unlimited-attempts-left':
    'നിങ്ങൾക്ക് പരിമിതികളില്ലാത്ത ശ്രമങ്ങളുണ്ട്',
  'gru-assessment-confirmation.setting-forward-teacher':
    'Student can navigate forward only',
  'gru-assessment-confirmation.setting-forward-backward-teacher':
    'Student can navigate forward and backwards to answer questions',
  'gru-assessment-confirmation.unlimited-attempts-left-teacher':
    'Student have unlimited attempts',
  'gru-assessment-confirmation.attempts-left.zero': 'നിങ്ങൾക്ക് ശ്രമങ്ങൾ ഉണ്ട്',
  'gru-assessment-confirmation.attempts-left.one':
    'നിങ്ങൾക്ക് 1 ശ്രമം ശേഷിക്കുന്നു',
  'gru-assessment-confirmation.attempts-left.other':
    'നിങ്ങൾക്ക് ശ്രമങ്ങൾ ഉണ്ട്',
  'gru-assessment-confirmation.attempts-left.other-teacher':
    'Student have {{count}} attempts',
  'gru-assessment-confirmation.unlimited-attempts':
    'നിങ്ങൾക്ക് പരിമിതികളില്ലാത്ത ശ്രമങ്ങളുണ്ട്',
  'gru-assessment-confirmation.cancel': 'റദ്ദാക്കുക',
  'gru-assessment-confirmation.continue': 'തുടരുക',
  'gru-assessment-confirmation.start': 'ആരംഭിക്കുക',
  'gru-assessment-confirmation.submit': 'സമർപ്പിക്കുക',
  'gru-submit-confirmation.title': 'ഈ ക്വിസ് പൂർത്തിയാക്കി എല്ലാം സമർപ്പിക്കുക',
  'gru-submit-confirmation.description':
    'നിങ്ങൾ ഈ ശ്രമം അവസാനിപ്പിക്കാനും എല്ലാ പ്രതികരണങ്ങൾ സമർപ്പിക്കാനും പോകുകയാണ്. ഏതെങ്കിലും ഒഴിവാക്കിയ ചോദ്യങ്ങൾ തെറ്റായി കണക്കാക്കപ്പെടും.',
  'gru-submit-confirmation.cancel': 'റദ്ദാക്കുക',
  'gru-submit-confirmation.ok': 'ശരി',
  'gru-submit-confirmation.confirm': 'ക്വിസ് പൂർത്തിയാക്കുക',
  'gru-submit-confirmation.finish-description':
    'നിങ്ങളുടെ പ്രതികരണങ്ങൾ സമർപ്പിക്കുന്നതിന് "ക്വിസ് അവസാനിപ്പിക്കുക" ക്ലിക്കുചെയ്യുക.',
  'gru-quick-course-search.add-from-course':
    'നിലവിലുള്ള കോഴ്സിൽ നിന്ന് ചേർക്കുക',
  'gru-quick-course-search.view-featured-courses': 'ഫീച്ചർ കോഴ്സുകൾ കാണുക',
  'gru-quick-course-search.assign': 'നിയമിക്കുക',
  'gru-share-pop-over.copy': 'പകർത്തുക',
  'gru-share-pop-over.ios-tooltip': 'പകർത്താൻ ടാപ്പുചെയ്യുക!',
  'gru-share-pop-over.multiarch-tooltip': 'പകർത്താൻ ctrl + c അമർത്തുക!',
  'gru-share-pop-over.safari-osx-tooltip': 'പകർത്താൻ cmd + c അമർത്തുക!',
  'gru-share-pop-over.share-course':
    'നിങ്ങളുടെ കോഴ്സ് ലിങ്ക് ഉപയോഗിച്ച് പങ്കിടുക',
  'gru-share-pop-over.share-question': 'നിങ്ങളുടെ ചോദ്യവുമായി ലിങ്ക് പങ്കിടുക',
  'gru-share-pop-over.share-resource':
    'ലിങ്ക് ഉപയോഗിച്ച് നിങ്ങളുടെ റിസോഴ്സ് പങ്കിടുക',
  'gru-share-pop-over.share-assessment':
    'ലിങ്ക് ഉപയോഗിച്ച് നിങ്ങളുടെ മൂല്യനിർണ്ണയം പങ്കിടുക',
  'gru-share-pop-over.share-rubric':
    'നിങ്ങളുടെ റൂബിക്ക് ലിങ്ക് ഉപയോഗിച്ച് പങ്കിടുക',
  'gru-share-pop-over.share-collection':
    'ലിങ്ക് ഉപയോഗിച്ച് നിങ്ങളുടെ ശേഖരം പങ്കിടുക',
  'gru-category-panel.teacher.title': 'അധ്യാപകർക്കായി',
  'gru-category-panel.teacher.body':
    'സ്റ്റാൻഡേർഡുകൾ സംയോജിപ്പിച്ച ഉള്ളടക്കം കണ്ടെത്തുക, ഉള്ളടക്കം ഇച്ഛാനുസൃതമാക്കുക, ഡാറ്റ വിശകലനത്തിലൂടെ വിദ്യാർത്ഥി പുരോഗതി ട്രാക്ക് ചെയ്യുക.',
  'gru-category-panel.teacher.cta': 'കഥകൾ കാണുക',
  'gru-category-panel.student.title': 'വിദ്യാർത്ഥികൾക്ക്',
  'gru-category-panel.student.body':
    'പഠന വസ്തുക്കളിലൂടെ പുരോഗതികൾ, വളർച്ച, പുരോഗതി എന്നിവ നിരീക്ഷിക്കുക.',
  'gru-category-panel.student.cta': 'നൽകുക',
  'gru-category-panel.student.text-placeholder': 'ക്ലാസ്റൂം കോഡ് നൽകുക',
  'gru-category-panel.district.title': 'ജില്ലകൾക്കായി',
  'gru-category-panel.district.body':
    'വ്യക്തിഗതമായ പഠനരഹിതമാക്കുകയും ജില്ലാ-വെറ്റ്ട്രെയ്ഡ് പാഠ്യപദ്ധതി പങ്കുവയ്ക്കുകയും ചെയ്യുന്നതിനായി gooru- മായി സഹകരിക്കുക.',
  'gru-category-panel.district.cta': 'ഞങ്ങളുടെ ആഘാതം കാണുക',
  'gru-category-panel.partner.title': 'പങ്കാളികൾക്കായി',
  'gru-category-panel.partner.body':
    'വിദ്യാഭ്യാസ ആവാസവ്യവസ്ഥയിൽ ഞങ്ങളുടെ കൂട്ടായ സ്വാധീനം വർദ്ധിപ്പിക്കുന്നതിന് മിഷൻ വിന്യസിച്ച പങ്കാളികളുമായി സഹകരിക്കുക.',
  'gru-category-panel.partner.cta': 'കൂടുതലറിവ് നേടുക',
  'class.gru-class-navigation.active': 'സജീവമാണ്:',
  'class.gru-class-navigation.members': 'അംഗങ്ങൾ',
  'class.gru-class-navigation.greetings': 'പ്രഖ്യാപനങ്ങൾ',
  'class.gru-class-navigation.overview': 'കോഴ്സ് മാപ്പ്',
  'class.gru-class-navigation.analytics': 'ഡാറ്റ',
  'class.gru-class-navigation.teams': 'ടീമുകൾ',
  'class.gru-class-navigation.information': 'ക്ലാസ്റൂം വിവരം',
  'class.gru-class-statistics.title': 'ക്ലാസ് സ്റ്റാറ്റിസ്റ്റിക്സ്',
  'class.gru-class-statistics.on-average': 'ശരാശരി',
  'class.gru-class-statistics.performance': 'പ്രകടനം',
  'class.gru-class-statistics.completion': 'പൂർത്തീകരണം',
  'class.gru-class-statistics.time-spent': 'ചിലവഴിച്ച സമയം',
  'class.gru-class-statistics.no-performance': '-',
  'gru-user-registration.joinTitle': 'ഗോറു സമൂഹത്തിൽ ചേരുക!',
  'gru-user-registration.joinDescription':
    'മികച്ച സൗജന്യ k-12 പഠന ഉറവിടങ്ങൾ കണ്ടെത്തുക, റീമിക്സ് ചെയ്യുക.',
  'gru-user-registration.googleButton': 'google ഉപയോഗിച്ച് സൈൻ അപ്പ് ചെയ്യൂ',
  'gru-user-registration.whyGoogle':
    'എന്തുകൊണ്ടാണ് google മായി സൈൻ അപ്പ് ചെയ്യുക',
  'gru-user-registration.descriptionWhyGoogle':
    'ഇത് വേഗതയാർന്നതും ലളിതവുമാണ്. രഹസ്യവാക്ക് കൂടാതെ പ്രവേശിക്കുന്നതിനായി നിങ്ങളുടെ നിലവിലുള്ള google അക്കൌണ്ട് ഉപയോഗിക്കുക.',
  'gru-user-registration.or': 'അഥവാ',
  'gru-user-registration.noGoogleAccount': 'google അക്കൗണ്ട് ഇല്ലേ?',
  'gru-user-registration.signUpEmail':
    'നിങ്ങളുടെ ഇമെയിൽ വിലാസം ഉപയോഗിച്ച് സൈൻ അപ്പ് ചെയ്യുക',
  'gru-user-registration.haveAccount': 'ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?',
  'gru-user-registration.clickLogIn': 'ലോഗിൻ ചെയ്യാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക.',
  'gru-welcome-message.title': 'gooru\'s പഠന ഗൈഡിലേക്ക് സ്വാഗതം!',
  'gru-welcome-message.text-temporary-one':
    'പഠന ഗൈഡറിയിലുടനീളം നിങ്ങൾ സഞ്ചരിക്കുമ്പോൾ, നിങ്ങളുടെ യാത്രയ്ക്ക് ഞങ്ങൾ സന്തുഷ്ടരാണ്. ഒരു ടൂർ ഐക്കൺ എടുക്കുക',
  'gru-welcome-message.text-temporary-two':
    ' ഞങ്ങളുടെ സവിശേഷതകൾ എങ്ങനെ ഉപയോഗിക്കണമെന്നതിനുള്ള മാർഗനിർദേശങ്ങളായ ടൂർകൾക്കായി.',
  'gru-welcome-message.text-one':
    'പഠന നാവിഗേറ്റർ മുഴുവൻ നീങ്ങുമ്പോൾ, നിങ്ങളുടെ യാത്രയെ പിൻതുടരാനായി ഇനിപ്പറയുന്ന മാർഗ്ഗങ്ങളിൽ ഞങ്ങൾ സന്തുഷ്ടരാണ്:',
  'gru-welcome-message.text-two.subtitle': 'ഒരു ടൂർ നടത്തുക',
  'gru-welcome-message.text-two.text':
    ': ഞങ്ങളുടെ സവിശേഷതകൾ എങ്ങനെ ഉപയോഗിക്കണമെന്നതിനുള്ള മാർഗനിർദേശത്തോടുകൂടിയ ടൂറുകൾ നൽകുന്നു.',
  'gru-welcome-message.text-three.subtitle': 'സഹായിക്കൂ',
  'gru-welcome-message.text-three.text':
    ': നിങ്ങളുടെ-വിരലടികൾ കൂടുതൽ ചോദ്യങ്ങൾക്കുള്ള പിന്തുണ.',
  'gru-welcome-message.text-four.subtitle': 'പുതിയത്',
  'gru-welcome-message.text-four.text':
    ': നിങ്ങൾ പരീക്ഷിച്ചു് പുതിയ സവിശേഷതകൾ തിരിച്ചറിയുന്നു.',
  'gru-welcome-message.text-five':
    'എപ്പോൾ വേണമെങ്കിലും ഹോംപേജിലേക്ക് മടങ്ങി പോകാൻ ആഗ്രഹിക്കുന്നെങ്കിൽ, അതിൽ ക്ലിക്ക് ചെയ്യുക',
  'gru-welcome-message.dont-show-again': 'വീണ്ടും കാണിക്കരുത്',
  'sign-up.step-1-title': 'ഹലോ!',
  'sign-up.step-1-description':
    'ഞങ്ങളോടൊപ്പം ചേരാൻ തീരുമാനിച്ചതിൽ ഞങ്ങൾ സന്തോഷിക്കുന്നു.',
  'sign-up.step-child-title': 'അത്ര വേഗത്തിൽ അല്ലെ?',
  'sign-up.step-child-subtitle':
    'ഞങ്ങൾക്ക് നിങ്ങളുടെ രജിസ്ട്രേഷൻ പൂർത്തിയാക്കാൻ കഴിയില്ല.',
  'sign-up.step-child-description-1':
    'ഞങ്ങളുടെ കാരണത്താൽ നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കാനായില്ല',
  'sign-up.step-child-age-requirements': 'നിബന്ധനകളും വ്യവസ്ഥകളും',
  'sign-up.step-child-description-2': '. ഏതാനും വർഷങ്ങൾക്കുള്ളിൽ പഠിക്കുക.',
  'sign-up.step-2-title': 'അടിസ്ഥാന വിവരങ്ങൾ',
  'sign-up.step-2-description': 'നിങ്ങൾ അടിസ്ഥാനമല്ല, എന്നാൽ ഈ വിവരം.',
  'sign-up.log-in': 'ലോഗിൻ',
  'sign-up.log-in-description': 'നിങ്ങൾക്ക് ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടെങ്കിൽ.',
  'sign-up.google-button': 'google ഉപയോഗിച്ച് സൈൻ അപ്പ് ചെയ്യൂ',
  'sign-up.username': 'ഉപയോക്തൃനാമം',
  'sign-up.dateOfBirth.title': 'ജന്മദിനം',
  'sign-up.dateOfBirth.day': 'ദിവസം',
  'sign-up.dateOfBirth.month': 'മാസം',
  'sign-up.dateOfBirth.months.january': 'ജനുവരി',
  'sign-up.dateOfBirth.months.february': 'ഫെബ്രുവരി',
  'sign-up.dateOfBirth.months.march': 'മാർച്ച്',
  'sign-up.dateOfBirth.months.april': 'ഏപ്രിൽ',
  'sign-up.dateOfBirth.months.may': 'മെയ്',
  'sign-up.dateOfBirth.months.june': 'ജൂൺ',
  'sign-up.dateOfBirth.months.july': 'ജൂലി',
  'sign-up.dateOfBirth.months.august': 'ഓഗസ്റ്റ്',
  'sign-up.dateOfBirth.months.september': 'സെപ്റ്റംബർ',
  'sign-up.dateOfBirth.months.october': 'ഒക്ടോബർ',
  'sign-up.dateOfBirth.months.november': 'നവംബര്',
  'sign-up.dateOfBirth.months.december': 'december',
  'sign-up.dateOfBirth.year': 'വർഷം',
  'sign-up.dateOfBirth.error-message': 'ദയവായി നിങ്ങളുടെ ജനനത്തീയതി നൽകുക.',
  'sign-up.email': 'ഇമെയിൽ',
  'sign-up.password': 'password',
  'sign-up.rePassword': 'പാസ്വേഡ് സ്ഥിരീകരിക്കുക',
  'sign-up.state': 'സംസ്ഥാനം അല്ലെങ്കിൽ പ്രദേശം',
  'sign-up.district': 'ജില്ലാ അല്ലെങ്കിൽ ചാർട്ടർ ഓർഗനൈസേഷൻ',
  'sign-up.error-username-taken':
    'എല്ലാം, ഈ ഉപയോക്തൃനാമം സ്വീകരിച്ചിരിക്കുന്നു. മറ്റൊന്ന് പരീക്ഷിക്കുക.',
  'sign-up.error-email-taken': 'ഈ ഇമെയിൽ എടുത്തതാണ്. മറ്റൊന്ന് പരീക്ഷിക്കുക.',
  'sign-up.error-role-message': 'ദയവായി ഒരു റോൾ തിരഞ്ഞെടുക്കുക.',
  'sign-up.error-country-message': 'ദയവായി നിങ്ങളുടെ രാജ്യം തിരഞ്ഞെടുക്കൂ.',
  'sign-up.error-state-message':
    'നിങ്ങളുടെ സംസ്ഥാനമോ പ്രദേശമോ ദയവായി തിരഞ്ഞെടുക്കുക.',
  'sign-up.error-district-message':
    'പട്ടികയിൽ നിന്ന് നിങ്ങളുടെ ജില്ലാ / ചാർട്ടർ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ  "other " ൽ നൽകുക.',
  'gru-user-sign-up-cancel.title': 'രജിസ്ട്രേഷൻ ഉപേക്ഷിക്കണോ?',
  'gru-user-sign-up-cancel.exit?':
    'തങ്കള് ഉറപ്പായും പുറത്തു പോവാന് ആഗ്രഹിക്കുന്നോ?',
  'gru-user-sign-up-cancel.registration_incomplete':
    'നിങ്ങളുടെ രജിസ്ട്രേഷൻ പൂർത്തിയായില്ല.',
  'gru-user-sign-up-cancel.leave': 'രജിസ്ട്രേഷൻ ഉപേക്ഷിക്കുക',
  'gru-user-sign-up-cancel.continue': 'രജിസ്ട്രേഷൻ തുടരുക',
  'login.title': 'തിരികെ സ്വാഗതം!',
  'login.description': 'പഠനം ഏതാണ്ട് മൂലക്കല്ലാണ്.',
  'login.title-session-ends': 'നിങ്ങളുടെ സെഷൻ കാലഹരണപ്പെട്ടു.',
  'login.description-session-ends': 'ദയവായി സൈനിൻ ചെയ്യുക.',
  'login.gooruAccountTitle': 'നിങ്ങളുടെ gooru അക്കൌണ്ടിലേക്ക് പ്രവേശിക്കുക',
  'login.googleButton': 'ഗൂഗിൾ ഉപയോഗിച്ച് പ്രവേശിക്കുക',
  'login.or': 'അഥവാ',
  'login.haveAccount': 'നിങ്ങൾക്ക് ഒരു അക്കൗണ്ട് ഉണ്ടോ?',
  'login.signUpHere': 'ഇവിടെ സൈൻ അപ് ചെയ്യുക!',
  'login.forgotPassword': 'നിങ്ങളുടെ പാസ്വേഡ് മറന്നോ?',
  'login.password': 'password',
  'login.usernameOrEmail': 'ഉപയോക്തൃനാമം അല്ലെങ്കിൽ ഇമെയിൽ',
  'login.log-in': 'ലോഗിൻ',
  'forgot-password.description': 'അത് നമുക്കെല്ലാവർക്കും സംഭവിക്കുന്നു.',
  'forgot-password.usernameOrEmail': 'ദയവായി നിങ്ങളുടെ ഇമെയിൽ നൽകുക',
  'forgot-password.footer-google-description-1':
    '\'Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക \' [1] അമർത്തി വീണ്ടും ലോഗിൻ ചെയ്യാൻ ശ്രമിക്കുക.',
  'forgot-password.footer-description-1':
    'നിങ്ങളുടെ പാസ്വേഡ് പുനഃസജ്ജമാക്കുന്നതിനുള്ള ഒരു ലിങ്ക് നിങ്ങൾക്ക് ലഭിക്കും.',
  'forgot-password.footer-description-2':
    'നിങ്ങൾക്ക് എന്തെങ്കിലും ചോദ്യങ്ങൾ ഉണ്ടെങ്കിൽ ദയവായി ബന്ധപ്പെടുക',
  'forgot-password.mail': 'support@gooru.org',
  'forgot-password.error-email-not-exists':
    'ക്ഷമിക്കണം, ഞങ്ങൾ ഈ ഇമെയിൽ തിരിച്ചറിയുന്നില്ല.',
  'forgot-password.secondStepTitle': 'നിങ്ങളുടെ ഇമെയിൽ പരിശോധിക്കുക',
  'forgot-password.secondStepDescription-1':
    'നിങ്ങളുടെ പാസ്വേർഡ് പുനസജ്ജമാക്കുന്നതിനുള്ള ലിങ്കുള്ള ഒരു ഇമെയിൽ ഞങ്ങൾ അയച്ചു.',
  'forgot-password.secondStepDescription-2':
    'നിങ്ങൾക്ക് എന്തെങ്കിലും ചോദ്യങ്ങൾ ഉണ്ടെങ്കിൽ ദയവായി ബന്ധപ്പെടുക',
  'reset-password.new-password': 'നിങ്ങളുടെ പുതിയ പാസ്വേഡ് നൽകുക',
  'reset-password.new-password-confirm': 'നിങ്ങളുടെ പാസ്വേഡ് സ്ഥിരീകരിക്കുക',
  'reset-password.title': 'പാസ്വേഡ് റീസെറ്റ് ചെയ്യുക',
  'change-password.change-password': 'പാസ്വേഡ് ലിങ്ക് മാറ്റുക',
  'change-password.title': 'പാസ്വേഡ് മാറ്റുക',
  'change-password.current-password-label': 'നിങ്ങളുടെ നിലവിലെ പാസ്വേഡ് നൽകുക',
  'change-password.change-success': 'പാസ്വേഡ് മാറ്റി!',
  'change-password.new-password-required':
    'ദയവായി നിങ്ങളുടെ പുതിയ പാസ്വേഡ് നൽകുക.',
  'change-password.change-password-error':
    'ക്ഷമിക്കണം! എന്തെങ്കിലും ശരിയല്ല. രഹസ്യവാക്ക് മാറ്റാൻ കഴിയുന്നില്ല. വീണ്ടും ശ്രമിക്കുക.',
  'footer.footerDescription':
    'gooru അതിന്റെ പ്ലാറ്റ്ഫോം ഓപ്പൺ സോഴ്സ്, കമ്മ്യൂണിറ്റി സൃഷ്ടിച്ച ഉള്ളടക്കം cc0 സൂക്ഷിക്കുന്നതിൽ പ്രതിജ്ഞാബദ്ധമാണ്.',
  'footer.company': 'കമ്പനി',
  'footer.community': 'കമ്മ്യൂണിറ്റി',
  'footer.legal': 'നിയമപരമായ',
  'footer.connect': 'ബന്ധിപ്പിക്കുക',
  'footer.aboutGooru': 'ഗോറൗവിനെ കുറിച്ച്',
  'footer.careers': 'തൊഴിലുകൾ',
  'footer.supportCenter': 'പിന്തുണ കേന്ദ്രം',
  'footer.contactUs': 'ഞങ്ങളെ സമീപിക്കുക',
  'footer.districts': 'ജില്ലകൾ',
  'footer.partners': 'പങ്കാളികൾ',
  'footer.coaches': 'കോച്ചുകൾ',
  'footer.events': 'ഇവന്റുകൾ',
  'footer.terms': 'നിബന്ധനകൾ',
  'footer.privacy': 'സ്വകാര്യത',
  'footer.Copyright': 'പകർപ്പവകാശം',
  'grade-dropdown.placeholder': 'ഗ്രേഡുകളും)',
  'grade-dropdown.prompt': 'ഒരു ഗ്രേഡ് തിരഞ്ഞെടുക്കുക',
  'grade-dropdown.pre-k': 'പ്രീ-കെ',
  'grade-dropdown.elementary': 'പ്രാഥമികം',
  'grade-dropdown.middle-school': 'മിഡിൽ സ്കൂൾ',
  'grade-dropdown.high-school': 'ഹൈസ്കൂൾ',
  'grade-dropdown.higher-ed': 'ഉയർന്ന എഡിറ്റർ',
  'grade-dropdown.k': 'കെ',
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
  'standard-dropdown.placeholder': 'സ്റ്റാൻഡേർഡ് ബ്രൗസുചെയ്യുക',
  'subject-dropdown.placeholder': 'വിഷയം (കൾ)',
  'subject-dropdown.prompt': 'ഒരു വിഷയം തിരഞ്ഞെടുക്കുക',
  'search-filter.input-placeholder': 'Type {{type}} name here...',
  'search-filter.courses': 'കോഴ്സുകൾ',
  'search-filter.collections': 'ശേഖരങ്ങൾ',
  'search-filter.resources': 'വിഭവങ്ങൾ',
  'search-filter.assessments': 'വിലയിരുത്തലുകൾ',
  'search-filter.questions': 'ചോദ്യങ്ങൾ',
  'search-filter.rubrics': 'തവിട്ടുകള്',
  'search-filter.authors': 'Authors',
  'search-filter.question-types.MC': 'മൾട്ടിപ്പിൾ ചോയ്സ്',
  'search-filter.question-types.FIB': 'വിട്ട ഭാഗം പൂരിപ്പിക്കുക',
  'search-filter.question-types.T/F': 'ശരി തെറ്റ്',
  'search-filter.question-types.TOF': 'ശരിയോ തെറ്റോ',
  'search-filter.question-types.MA': 'ഒന്നിലധികം ഉത്തരം',
  'search-filter.question-types.HS_TXT': 'ഒന്നിലധികം തിരഞ്ഞെടുക്കുക - വാചകം',
  'search-filter.question-types.HSTXT': 'ഒന്നിലധികം വാചകം തിരഞ്ഞെടുക്കുക',
  'search-filter.question-types.HS_IMG': 'ഒന്നിലധികം തിരഞ്ഞെടുക്കുക - ചിത്രം',
  'search-filter.question-types.HSIMG': 'ഒന്നിലധികം തിരഞ്ഞെടുക്കുക ചിത്രം',
  'search-filter.question-types.HT_RO': 'ഓർഡർ വലിച്ചിടുക',
  'search-filter.question-types.HT&RO': 'ഓർഡർ ഡ്രോപ്പ് ചെയ്യുക',
  'search-filter.question-types.HT_HL': 'ചൂടേറിയ വാചകം- ഹൈലൈറ്റ്',
  'search-filter.question-types.H-THL': 'ഹോട്ട്-ടെക്സ്റ്റ് ഹൈലൈറ്റ്',
  'search-filter.question-types.OE': 'സൌജന്യ പ്രതികരണം',
  'search-filter.author.placeholder': 'രചയിതാവ്',
  'resource.video': 'വീഡിയോ',
  'resource.webpage': 'വെബ് പേജ്',
  'resource.interactive': 'സംവേദനാത്മകം',
  'resource.question': 'ചോദ്യം',
  'resource.image': 'ചിത്രം',
  'resource.text': 'വാചകം',
  'resource.audio': 'ഓഡിയോ',
  'resource.oer': 'ഓവർ',
  'search-result.resource': 'വിഭവം',
  'search-result.resources': 'വിഭവങ്ങൾ',
  'search-result.and': 'ഒപ്പം',
  'search-result.question': 'ചോദ്യം',
  'search-result.questions': 'ചോദ്യങ്ങൾ',
  'search-result.in-this-collection': 'ഈ ശേഖരത്തിൽ',
  'search-result.search-results-for': 'ഇതിനായി തിരയൽ ഫലങ്ങൾ',
  'gru-image-picker.chooseFile': 'ഒരു ഫയൽ തിരഞ്ഞെടുക്കുക ...',
  'gru-image-picker.instruction':
    'നിങ്ങളുടെ കമ്പ്യൂട്ടറിലെ ഒരു ഫയലിൽ നിന്ന് ഒരു ഇമേജ് അപ്ലോഡുചെയ്യുക.',
  'gru-image-picker.restriction':
    'ചിത്രം 5 mb നേക്കാൾ ചെറുതായ jpg, gif അല്ലെങ്കിൽ png ഫയൽ ആയിരിക്കണം.',
  'gru-image-picker.submit': 'ചിത്രം ഉപയോഗിക്കുക',
  'gru-fib.instructions':
    'ദയവായി നിങ്ങളുടെ ഉത്തരം (കൾ) നൽകിയിരിക്കുന്ന ശൂന്യമായ (കള്) ടൈപ്പുചെയ്യുക, തുടർന്ന്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-hs-image.instructions':
    'ദയവായി ശരിയായ ചിത്രം (കൾ) തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-hs-text.instructions':
    'ദയവായി ശരിയായ ഉത്തരം (കൾ) തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-hot-text.instructions':
    'ദയവായി ശരിയായ ഉത്തരം തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-login-prompt.title': 'ഗോറുവിലേക്ക് സ്വാഗതം!',
  'gru-login-prompt.instructions':
    'ആ പ്രവർത്തനം പൂർത്തിയാക്കാൻ നിങ്ങൾ സൈൻ ഇൻ ചെയ്യേണ്ടതുണ്ട്.',
  'gru-login-prompt.existing-user': 'ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?',
  'gru-login-prompt.new-user': 'ഇവിടെ പുതിയത്?',
  'gru-login-prompt.not-now': 'ഇപ്പോൾ വേണ്ട',
  'gru-login-prompt.sign-in': 'സൈൻ ഇൻ',
  'gru-multiple-answer.instructions':
    'ദയവായി ശരിയായ ഉത്തരം തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-multiple-choice.instructions':
    'ദയവായി ശരിയായ ഉത്തരം തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-open-ended.instructions':
    'ചുവടെയുള്ള ഫീൽഡിൽ നിങ്ങളുടെ ഉത്തരം ടൈപ്പുചെയ്യുക, തുടർന്ന് നിങ്ങൾ പൂർത്തിയാക്കിയപ്പോൾ നിങ്ങളുടെ പ്രതികരണം സംരക്ഷിക്കാൻ  "{{action}} " ബട്ടൺ ക്ലിക്കുചെയ്യുക.',
  'gru-open-ended.characterLimit': 'പ്രതീക പരിധി',
  'gru-question-viewer.answer': 'ഉത്തരം',
  'gru-question-viewer.question': 'ചോദ്യം',
  'gru-true-false.instructions':
    'ദയവായി ശരിയായ ഉത്തരം തിരഞ്ഞെടുത്ത്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'gru-true-false.true': 'ശരി',
  'gru-true-false.false': 'തെറ്റായ',
  'gru-reorder.instructions':
    'കൃത്യമായ ക്രമത്തിൽ ഉത്തരങ്ങൾ പുനഃക്രമീകരിക്കുക, തുടർന്ന്  "{{action}} " ക്ലിക്കുചെയ്യുക.',
  'student-first-experience.preStudyTitle': '{{title}} നായുള്ള പ്രീ-പഠനം',
  'student-first-experience.lp-compute-inprogress':
    'We are computing your initial proficiency profile in {{title}}',
  'student-first-experience.route0-action.accept': 'സ്വീകരിക്കൂ',
  'student-first-experience.route0-action.ignore': 'അവഗണിക്കുക',
  'student-first-experience.competency.popover.title': '{{title}} അതിർത്തി',
  'student-first-experience.competency.popover.content':
    'നിങ്ങളുടെ ലക്ഷ്യ സ്ഥാനത്തേക്കുള്ള നിങ്ങളുടെ ആകാശവാണിക്കും ഈ ഗ്രേഡ് ലൈനും തമ്മിലുള്ള എല്ലാ മാനദണ്ഡങ്ങളും നിങ്ങൾ പഠിക്കേണ്ടതുണ്ട്.',
  'student-first-experience.assigned-course-title':
    '{{title}} എന്നതിനായി നിയുക്ത കോഴ്സ്',
  'student-first-experience.start-studying': 'Start Studying',
  'student-first-experience.show-route': 'Show Route',
  'student-first-experience.review-destination': 'Review Destination',
  'student-first-experience.competency-level.title':
    'നിങ്ങളുടെ പ്രൊഫിഷ്യൻസി പ്രൊഫൈൽ',
  'student-first-experience.competency-level.mastery':
    '{{count}} മാനദണ്ഡങ്ങൾ വികാസം പ്രാപിച്ചു',
  'student-first-experience.competency-level.in-progress':
    '{{count}} മാനദണ്ഡങ്ങൾ പുരോഗമിക്കുന്നു',
  'student-first-experience.competency-level.not-started':
    '{{count}} നിലവാരങ്ങൾ ആരംഭിച്ചിട്ടില്ല',
  'student-first-experience.competency-level.your-skyline': 'നിങ്ങളുടെ സ്കൈലൈൻ',
  'student-first-experience.explanatory.master.title': 'കഴിവുള്ളവൻ',
  'student-first-experience.explanatory.master.desc':
    'നിങ്ങൾ വിജയകരമായി നിലവാരം മെച്ചപ്പെടുത്തി എന്നതിന് തെളിവുകൾ ഉണ്ടെന്ന് സൂചിപ്പിക്കുന്നു',
  'student-first-experience.explanatory.in-progress.title': 'പുരോഗതിയിൽ',
  'student-first-experience.explanatory.in-progress.desc':
    'നിങ്ങൾ മാനദണ്ഡങ്ങൾ പഠിച്ചു തുടങ്ങി, മാർക്കറ്റ് നേടിയെടുക്കാനായി പുരോഗമിക്കുന്ന തെളിവുകൾ ഉണ്ടെന്ന് സൂചിപ്പിക്കുന്നു',
  'student-first-experience.explanatory.not-started.title': 'ആരംഭിച്ചില്ല',
  'student-first-experience.explanatory.not-started.desc':
    'യാതൊരു തെളിവുമില്ലെന്നും നിങ്ങൾ നിലവാരം പഠിക്കാൻ തുടങ്ങുന്നില്ലെന്നും സൂചിപ്പിക്കുന്നു',
  'student-first-experience.competency-level-partial.desc1':
    'നിങ്ങൾ നിലവിൽ ഉള്ളിലുണ്ട്',
  'student-first-experience.competency-level-partial.desc2':
    'ഗണിതത്തിനുള്ള നിങ്ങളുടെ സ്കൈലൈൻ മാപ്പിലേക്ക് സ്വാഗതം. ഓരോ ഡൊമെയ്നിൽ നിങ്ങൾ ഏറ്റെടുത്തിട്ടുള്ള ഏറ്റവും ഉയർന്ന നിലവാരമാണ് ആകാശം (കട്ടിയുള്ള വെള്ള ലൈൻ). ഒരു സംഖ്യാസം നിങ്ങൾ പഠിക്കുന്ന ഒരു ഗണിത മേഖലയാണ്, അത്തരം സംഖ്യകൾ, എക്സ്പ്രഷനുകൾ, സമവാക്യങ്ങൾ തുടങ്ങിയവ. ഓരോ നിരയും ഒരു ഗണിത മണ്ഡലത്തെ പ്രതിനിധീകരിക്കുന്നു. കോളത്തിലെ ഓരോ ബോക്സും ഡൊമെയ്നിലെ ഒരു സ്റ്റാൻഡേർഡ് പ്രതിനിധീകരിക്കുന്നു. നിങ്ങൾ മാനദണ്ഡങ്ങൾ പഠിക്കുകയും മാനേജ് ചെയ്യുകയും ചെയ്തുകഴിഞ്ഞാൽ, നിങ്ങളുടെ സ്കൈലൈൻ നിരന്തരം വളരും.',
  'student-first-experience.competency-level-partial.desc3':
    'As you master each of the competencies, the corresponding box is updated to dark blue.',
  'student-first-experience.competency-level-partial.desc4':
    'The skyline is the thick white line that shows the highest competencies that you have mastered in each math domain.',
  'student-first-experience.competency-level-partial.desc5':
    'If the skyline is at the bottom of a domain, it means the system needs more information to be able to locate you in that topic. As soon as you start on the lessons and check for understandings, your skyline will bump up and update your proficiency in each domain.',
  'student-first-experience.units.other': '{{count}} യൂണിറ്റുകൾ',
  'player.gru-navigation.view-report': 'റിപ്പോർട്ട് കാണുക',
  'player.gru-navigator.see-usage-report': 'ഉപയോഗ റിപ്പോർട്ട് കാണുക',
  'player.gru-viewer.not-iframe-url.header_1':
    'gooru- ൽ ഈ ഉറവിടം കാണാൻ കഴിയില്ല.',
  'player.gru-viewer.not-iframe-url.header_external_assessment_1':
    'ഈ മൂല്യനിർണയം ഗോറുവിൽ കാണാൻ കഴിയില്ല.',
  'player.gru-viewer.not-iframe-url.header_2':
    'ഒരു പുതിയ ടാബിൽ റിസോഴ്സ് തുറക്കാൻ താഴെയുള്ള ബട്ടൺ ക്ലിക്കുചെയ്യുക.',
  'player.gru-viewer.not-iframe-url.view-resource': 'വിഭവം കാണുക',
  'player.gru-viewer.not-iframe-url.https_external':
    'gooru- ൽ ഈ ലിങ്ക് കാണാൻ കഴിയില്ല.',
  'player.gru-viewer.not-iframe-url.https_new_tab':
    'ഒരു പുതിയ ടാബിൽ തുറക്കാൻ ചുവടെയുള്ള ലിങ്ക് ക്ലിക്കുചെയ്യുക.',
  'player.gru-viewer.not-iframe-url.footer_1':
    'ഞാൻ എന്തുകൊണ്ടാണ് ഈ ശൂന്യമായ പേജ് കാണുന്നത്?',
  'player.gru-viewer.not-iframe-url.footer_2':
    'ആയിരക്കണക്കിന് വ്യത്യസ്ത പ്രസാധകരിൽ നിന്നാണ് കോറസ് കൂട്ടിച്ചേർത്തത്',
  'player.gru-viewer.not-iframe-url.footer_3':
    'അവരുടെ ഉള്ളടക്കം സൃഷ്ടിക്കുകയും പങ്കിടുകയും ചെയ്യുക. ഉറവിടങ്ങൾ ഉൾപ്പെടെ വിവിധ ക്രമീകരണങ്ങൾ ഉണ്ട്',
  'player.gru-viewer.not-iframe-url.footer_4':
    'ഉള്ളടക്കം കാണുന്നതിനായി നിങ്ങളെ മറ്റൊരു പേജിലേക്ക് കൊണ്ടുപോകുന്ന ആവശ്യകതകൾ.',
  'grading-player.answer': 'സമർപ്പിച്ച പ്രവർത്തനം',
  'grading-player.back-to': 'തിരികെ',
  'grading-player.current-response': 'നിലവിലെ പ്രതികരണം',
  'grading-player.full-rubric': 'പൂർണ്ണമായ റബ്രിക്ക്',
  'grading-player.grading': 'ഗ്രേഡിംഗ്',
  'grading-player.level': 'നില',
  'grading-player.roster': 'റോസ്റ്റർ',
  'grading-player.rubric': 'റബ്രിക്ക്',
  'grading-player.submitted-time': 'സമർപ്പിച്ച സമയം',
  'grading-player.points': 'പോയിന്റുകൾ',
  'grading-player.prompt': 'ടാസ്ക് പ്രോംപ്റ്റ്',
  'grading-player.overall-comment': 'മൊത്തത്തിലുള്ള അഭിപ്രായം',
  'grading-player.overall-lead':
    'മൊത്തത്തിൽ നിങ്ങളുടെ ഫീഡ്ബാക്ക് മുഴുവനായും സംഗ്രഹിക്കുക.',
  'grading-player.time-spent': 'ചിലവഴിച്ച സമയം',
  'grading-player.total-score': 'മൊത്തം സ്കോർ',
  'grading-player.student-roster.title': 'വിദ്യാർത്ഥികളുടെ ലിസ്റ്റ്',
  'grading-player.student-roster.lead': 'ഈ ചോദ്യത്തിന് ഉത്തരം നൽകിയിട്ടുണ്ട്',
  'grading-player.rubric-panel.previous': 'മുൻ അധ്യാപകൻ',
  'grading-player.rubric-panel.next': 'അടുത്ത വിദ്യാർത്ഥി',
  'grading-player.rubric-panel.total-score': 'മൊത്തം സ്കോർ',
  'grading-player.rubric-panel.points': '({{total}})',
  'profile.gru-navigation.about': 'കുറിച്ച്',
  'profile.gru-navigation.about-me': 'എന്നെ പറ്റി',
  'profile.gru-navigation.content': 'ഉള്ളടക്കം',
  'profile.gru-navigation.followers': 'പിന്തുടരുന്നവർ',
  'profile.gru-navigation.library': 'ലൈബ്രറി',
  'profile.gru-navigation.my-content': 'എന്റെ ഉള്ളടക്കം',
  'profile.gru-navigation.following': 'പിന്തുടരുന്നു',
  'profile.gru-navigation.proficiency': 'യോഗ്യത',
  'profile.gru-navigation.preference.preference': 'മുൻഗണന',
  'profile.edit.select-district': 'ഒരു ജില്ല തിരഞ്ഞെടുക്കൂ ...',
  'profile.proficiency.is-empty':
    'ഇതുവരെ ഡാറ്റയൊന്നും ലഭ്യമല്ല. ഒരിക്കൽ നിങ്ങൾ പഠിക്കാൻ തുടങ്ങുമ്പോൾ, നിങ്ങളുടെ ഡാറ്റ ലഭ്യമാകും.',
  'profile.proficiency.expand-chart': 'ചാർട്ട് വികസിപ്പിക്കുക',
  'profile.proficiency.mastered': 'കഴിവുള്ളവൻ',
  'profile.proficiency.in-progress': 'പുരോഗതിയിൽ',
  'profile.proficiency.not-started': 'ആരംഭിച്ചില്ല',
  'profile.proficiency.skyline': 'ആകാശം',
  'profile.proficiency.baseline': 'അടിസ്ഥാനരേഖ',
  'profile.proficiency.grade-line': 'ഗ്രേഡ് ലൈൻ',
  'profile.proficiency.not-tagged':
    'ക്ലാസ് ഒന്നും തന്നെ നിശ്ചയിച്ചിട്ടില്ല, അല്ലെങ്കിൽ കോഴ്സ് ഒരു സാധുതയുള്ള വിഷയം അല്ലെങ്കിൽ നിലവാരത്തിലേക്ക് ടാഗുചെയ്തിട്ടില്ല.',
  'profile.proficiency.show-compressed-chart':
    'കംപ്രസ് ചെയ്ത ചാർട്ട് കാണിക്കുക',
  'profile.proficiency.show-expanded-chart': 'വിപുലീകരിച്ച ചാർട്ട് കാണിക്കുക',
  'profile.preference.language-preference': 'ഭാഷാ മുൻഗണന',
  'profile.preference.choose-language': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
  'profile.preference.choose-sec-language': 'തിരഞ്ഞെടുക്കുക',
  'profile.preference.choose-preferred-language':
    'പ്രാഥമിക പ്രൊഫൈൽ ഭാഷ തിരഞ്ഞെടുക്കുക',
  'profile.preference.choose-preferred-other-languages':
    'തിരഞ്ഞെടുത്ത മറ്റ് ഭാഷകൾ തിരഞ്ഞെടുക്കുക',
  'profile.preference.language': 'ഭാഷ',
  'profile.preference.select-category-label': 'ഒരു പുതിയ വിഭാഗം ചേർക്കുക',
  'profile.preference.choose-category': 'വിഭാഗം തിരഞ്ഞെടുക്കുക',
  'profile.preference.no-data': 'ഡാറ്റാ ഇല്ല',
  'profile.preference.category-preference': 'വിഭാഗ മുൻഗണന',
  'profile.preference.choose-subject': 'വിഷയം തിരഞ്ഞെടുക്കുക',
  'profile.preference.choose-fwk': 'ചട്ടക്കൂട് തിരഞ്ഞെടുക്കുക',
  'profile.preference.add-subject': 'വിഷയം ചേർക്കുക',
  'profile.preference.add-sec-language': 'മറ്റ് മുൻഗണന ഭാഷ ചേർക്കുക',
  'profile.preference.other-preferred-languages': 'മറ്റ് മുൻഗണന ഭാഷകൾ',
  'gru-data-picker.score': 'സ്കോർ',
  'gru-data-picker.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'gru-data-picker.completion': 'പൂർത്തീകരണം',
  'gru-data-picker.timeSpent': 'സമയം',
  'gru-data-picker.time-spent': 'ചിലവഴിച്ച സമയം',
  'gru-data-picker.study-time': 'പഠിക്കാനുള്ള സമയം',
  'gru-data-picker.reaction': 'പ്രതികരണം',
  'gru-data-picker.attempts': 'ശ്രമം',
  'gru-performance-summary.title': 'ശീർഷകം',
  'gru-performance-summary.scores': 'സ്കോറുകൾ',
  'gru-performance-summary.completion': 'പൂർത്തീകരണം',
  'gru-performance-summary.time-spent': 'ആകെ സമയം',
  'gru-performance-summary.reaction': 'പ്രതികരണം',
  'gru-performance-summary.attempts': 'ശ്രമങ്ങൾ',
  'gru-performance-summary.redo': 'തയ്യാറായ',
  'gru-performance-summary.resume': 'പുനരാരംഭിക്കുക',
  'gru-performance-summary.study': 'ഇപ്പോൾ പഠിക്കുക',
  'gru-performance-summary.view-report': 'റിപ്പോർട്ട് കാണുക',
  'gru-performance-summary.not-applicable': 'n / a',
  'gru-performance-summary.not-started': 'ഇതുവരെ ആരംഭിച്ചിട്ടില്ല',
  'gru-performance.no-content': 'ഉള്ളടക്കമൊന്നും ലഭ്യമല്ല',
  'gru-performance-metrics.assessment': 'മൂല്യനിർണ്ണയം',
  'gru-performance-metrics.collection': 'ശേഖരണം',
  'gru-performance-metrics.completion': 'പൂർത്തീകരണം',
  'gru-performance-metrics.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'gru-performance-metrics.student': 'വിദ്യാർത്ഥി',
  'gru-performance-metrics.score': 'സ്കോർ',
  'gru-performance-metrics.study-time': 'ചിലവഴിച്ച സമയം',
  'gru-metrics-sub-header.assessment': 'മൂല്യനിർണ്ണയം',
  'gru-metrics-sub-header.student': 'വിദ്യാർത്ഥി',
  'gru-metrics-sub-header.score': 'സ്കോർ',
  'gru-metrics-sub-header.report': 'റിപ്പോർട്ട് ചെയ്യുക',
  'gru-metrics-sub-header.completion': 'പൂർത്തീകരണം',
  'gru-metrics-sub-header.time-spent': 'സമയം',
  'gru-resource-new.resource-already-exist':
    'gooru ൽ ഈ ഉറവിടം ഇതിനകം നിലവിലുണ്ട്!',
  'gru-assessment-report.gru-summary.total-time-spent': 'ചെലവഴിച്ച മൊത്തം സമയം',
  'gru-assessment-report.hidden-report':
    'ഈ മൂല്യനിർണയത്തിനായി നിങ്ങളുടെ സസ്പെർഷൻ റിപ്പോർട്ട് മറയ്ക്കാൻ നിങ്ങളുടെ അധ്യാപകൻ തിരഞ്ഞെടുത്തു.',
  'cards.gru-class-card.student.zero': '{{count}} വിദ്യാർത്ഥി',
  'cards.gru-class-card.student.one': '{{count}} വിദ്യാർത്ഥി',
  'cards.gru-class-card.student.other': '{{count}} വിദ്യാർത്ഥികൾ',
  'cards.gru-class-card.student.not-started': 'ആരംഭിച്ചില്ല',
  'cards.gru-class-card.unit.zero': 'തീർച്ചയായും ഇല്ല',
  'cards.gru-class-card.unit.one': '{{count}} യൂണിറ്റ്',
  'cards.gru-class-card.unit.other': '{{count}} യൂണിറ്റുകൾ',
  'cards.gru-class-card.archived.request-report':
    'ഈ ക്ലാസ് ആർക്കൈവുചെയ്തു, പരിഷ്കരിക്കാനാവില്ല. നിലവിലുള്ള ക്ലാസ് ഡാറ്റ റിപ്പോർട്ട് വഴി ആക്സസ് ചെയ്യാൻ കഴിയും.',
  'cards.gru-class-card.archived.report-in-progress':
    'റിപ്പോർട്ട് തലമുറയ്ക്ക് 20 മിനുട്ട് വരെ എടുക്കാം. ദയവായി വീണ്ടും പരിശോധിക്കുക.',
  'cards.gru-class-card.archived.download-report':
    'ഈ ക്ലാസ്സിനായി നിങ്ങളുടെ ഡാറ്റ ഡൗൺലോഡുചെയ്യുക.',
  'cards.gru-class-card.archived.no-report-available':
    'ഈ ക്ലാസ്സിന് അസൈൻ കോഴ്സിന്റെ ഉള്ളടക്കമില്ല.',
  'cards.gru-course-card.in': 'അകത്ത്',
  'cards.gru-course-card.units.zero': '{{count}} യൂണിറ്റുകൾ',
  'cards.gru-course-card.units.one': '{{count}} യൂണിറ്റ്',
  'cards.gru-course-card.units.other': '{{count}} യൂണിറ്റുകൾ',
  'cards.gru-course-card.resource.zero': '{{count}} വിഭവങ്ങൾ',
  'cards.gru-course-card.resource.one': '{{count}} റിസോഴ്സ്',
  'cards.gru-course-card.resource.other': '{{count}} വിഭവങ്ങൾ',
  'cards.gru-course-card.and': 'ഒപ്പം',
  'cards.gru-course-card.question.zero': '{{count}} ചോദ്യങ്ങൾ',
  'cards.gru-course-card.question.one': '{{count}} ചോദ്യം',
  'cards.gru-course-card.question.other': '{{count}} ചോദ്യങ്ങൾ',
  'cards.gru-course-card.start-studying': 'പഠിക്കാൻ ആരംഭിക്കുക',
  'cards.gru-collection-card.courses.zero': '{{count}} കോഴ്സുകൾ',
  'cards.gru-collection-card.courses.one': '{{count}} കോഴ്സ്',
  'cards.gru-collection-card.courses.other': '{{count}} കോഴ്സുകൾ',
  'cards.gru-collection-card.students.zero': '{{count}} വിദ്യാർത്ഥികൾ',
  'cards.gru-collection-card.students.one': '{{count}} വിദ്യാർത്ഥി',
  'cards.gru-collection-card.students.other': '{{count}} വിദ്യാർത്ഥികൾ',
  'cards.gru-collection-card.collections.one': '{{count}} ശേഖരം',
  'cards.gru-collection-card.collections.other': '{{count}} ശേഖരങ്ങൾ',
  'cards.gru-collection-card.assessments.one': '{{count}} മൂല്യനിർണ്ണയം',
  'cards.gru-collection-card.assessments.other': '{{count}} അസെസ്മെന്റുകൾ',
  'cards.gru-collection-card.classrooms.zero': '{{count}} ക്ലാസ് മുറികൾ',
  'cards.gru-collection-card.classrooms.one': '{{count}} ക്ലാസ് റൂം',
  'cards.gru-collection-card.classrooms.other': '{{count}} ക്ലാസ് മുറികൾ',
  'cards.gru-resource-card.add': 'ഇതിലേക്ക് ചേർക്കുക',
  'cards.gru-resource-result-card.skipped': 'ഒഴിവാക്കി',
  'cards.gru-profile-card.followers': 'പിന്തുടരുന്നവർ',
  'cards.gru-profile-card.following': 'പിന്തുടരുന്നു',
  'cards.gru-user-network-card.follow': 'പിന്തുടരുക',
  'reports.gru-table-view.first-tier-header-prefix': 'q',
  'reports.gru-table-view.student': 'വിദ്യാർത്ഥി',
  'reports.gru-table-view.reaction': 'പ്രതികരണം',
  'reports.gru-table-view.reactions': 'പ്രതികരണങ്ങൾ',
  'reports.gru-table-view.score': 'സ്കോർ',
  'reports.gru-table-view.scores': 'സ്കോറുകൾ',
  'reports.gru-table-view.study-time': 'പഠിക്കാനുള്ള സമയം',
  'reports.gru-table-view.time': 'സമയം',
  'reports.gru-table-view.time-spent': 'ചിലവഴിച്ച സമയം',
  'reports.gru-table-view.totals': 'മൊത്തം',
  'gru-emotion-picker.react-to-resource': 'ഈ വിഭവത്തോട് പ്രതികരിക്കുക',
  'home.no-classes-found.create-class.title':
    'ഒരു കോറസ് ക്ലാസ്റൂം പഠിപ്പിക്കുക',
  'home.no-classes-found.create-class.description':
    'ഒരു ക്ലാസ്റൂം ഉണ്ടാക്കി, ഉള്ളടക്കം നൽകുക, വിദ്യാർത്ഥികളെ ക്ഷണിക്കുക.',
  'home.no-classes-found.create-class.button-text': 'ക്ലാസ്റൂം സൃഷ്ടിക്കുക',
  'home.no-classes-found.join-class.title': 'ഒരു കോറോറൂം ക്ലാസ്റൂം പഠിക്കുക',
  'home.no-classes-found.join-class.description':
    'പഠന ആരംഭിക്കാൻ നിങ്ങളുടെ ടീച്ചറുടെ ക്ലാസ്റൂമിൽ ചേരുക.',
  'home.no-classes-found.join-class.button-text': 'ക്ലാസ്റൂം കോഡ് നൽകുക',
  'home.no-classes-found.featured-courses.title': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'home.no-classes-found.featured-courses.description':
    'മാത്ത്, സയൻസ്, സോഷ്യൽ സ്റ്റഡീസ്, എല കോഴ്സുകൾ എന്നിവ ബ്രൌസ് ചെയ്യുക.',
  'home.no-classes-found.featured-courses.button-text': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'home.no-classes-found.teacher-toolkit.title': 'ടീച്ചർ ടൂൾകിറ്റ്',
  'home.no-classes-found.teacher-toolkit.description':
    'ഈ ടൂൾക്കിറ്റ് ആരംഭിക്കുന്നതിന് നിങ്ങളെ സഹായിക്കാൻ ഉറവിടങ്ങളുണ്ട്.',
  'home.no-classes-found.teacher-toolkit.button-text': 'ടീച്ചർ ടൂൾകിറ്റ്',
  'taxonomy.grades': 'Grades',
  'taxonomy.gru-taxonomy-selector.add-secondary': 'ദ്വിതീയ ചേർക്കുക',
  'taxonomy.gru-taxonomy-selector.choose-subject': 'വിഷയം തിരഞ്ഞെടുക്കുക',
  'taxonomy.gru-taxonomy-selector.competency-subject-and-course':
    'യോഗ്യതയും ചട്ടക്കൂടും',
  'taxonomy.gru-taxonomy-selector.primary-subject-and-course':
    'സ്റ്റാൻഡേർഡ് ചട്ടക്കൂടുകളും കോഴ്സ്',
  'validations.unsavedChanges':
    'നിങ്ങളുടെ മാറ്റങ്ങൾ ഇതുവരെ സംരക്ഷിക്കപ്പെട്ടിട്ടില്ല. ഈ പേജ് ഉപേക്ഷിക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?',
  'featured.featured-title': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'featured.featured-description':
    'ഫീച്ചർ കോഴ്സുകൾ നൂതന അധ്യാപകരെ നിയന്ത്രിക്കാനും, ഉള്ളടക്ക വിദഗ്ധർ പരിശോധിച്ച് അവലോകനം ചെയ്യാനും ക്ലാസ്മുറികളിൽ വിദ്യാർത്ഥികൾ നടപ്പിലാക്കുവാനും ചെയ്യുന്നു. പഠന വ്യക്തിഗതമാക്കാനും വിദ്യാർത്ഥി ഇടപെടൽ വർദ്ധിപ്പിക്കാനും കോഴ്സുകൾ കണ്ടെത്തുക, റീമിക്സ് ചെയ്യുക, ഇഷ്ടാനുസൃതമാക്കുക! ഈ കോഴ്സുകളുടെ വികസനത്തെക്കുറിച്ച് കൂടുതൽ പഠിക്കുക [2].',
  'locateme.score': 'സ്കോർ',
  'locateme.timespent': 'ചിലവഴിച്ച സമയം',
  'locateme.view': 'കാണുക',
  'locateme.attempt': 'ശ്രമം',
  'locateme.lastAcessesed': 'അവസാനം ആക്സസ് ചെയ്തവ',
  'taxonomy.modals.gru-domain-picker.browseSelectorText':
    'ഏത് യൂണിറ്റാണ് ഈ യൂണിറ്റ് കവർ ചെയ്യുന്നത്?',
  'taxonomy.modals.gru-domain-picker.selectedText.zero':
    '{{count}} ഡൊമെയ്നുകൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-domain-picker.selectedText.one':
    '{{count}} ഡൊമെയ്ൻ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-domain-picker.selectedText.other':
    '{{count}} ഡൊമെയ്നുകൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-domain-picker.shortcutText': 'കോഴ്സ് ഉണ്ട്',
  'taxonomy.modals.gru-standard-picker.browseSelectorText':
    'എന്ത് മാനദണ്ഡങ്ങൾ മറയ്ക്കപ്പെടും?',
  'taxonomy.modals.gru-standard-picker.browseCompetencySelectorText':
    'എന്ത് കഴിവുകൾ ഉൾപ്പെടുത്തും?',
  'taxonomy.modals.gru-standard-picker.selectedText.zero':
    '{{count}} നിലവാരങ്ങൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-standard-picker.selectedText.one':
    '{{count}} നിലവാരം തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-standard-picker.selectedText.other':
    '{{count}} നിലവാരങ്ങൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.zero':
    '{{count}} യോഗ്യതകൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.one':
    '{{count}} യോഗ്യത പരിശോധിച്ചു',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.other':
    '{{count}} യോഗ്യതകൾ തിരഞ്ഞെടുത്തു',
  'taxonomy.modals.gru-standard-picker.shortcutText': 'യൂണിറ്റ് ടാഗുചെയ്തു',
  'account-settings.title': 'അക്കൗണ്ട് ക്രമീകരണങ്ങൾ',
  'account-settings.account-info': 'അക്കൗണ്ട് വിവരങ്ങൾ',
  'account-settings.private-info': 'സ്വകാര്യ വിവരം',
  'account-settings.email-address': 'ഈ - മെയില് വിലാസം',
  'account-settings.gender': 'ലിംഗഭേദം',
  'account-settings.birthday': 'ജന്മദിനം',
  'gru-rich-text-editor.bold': 'ധീരമായ',
  'gru-rich-text-editor.expression': 'എക്സ്പ്രഷൻ',
  'gru-rich-text-editor.italic': 'ഇറ്റാലിക്',
  'gru-rich-text-editor.subscript': 'സബ്സ്ക്രിപ്റ്റ്',
  'gru-rich-text-editor.superscript': 'സൂപ്പർസ്ക്രിപ്റ്റ്',
  'gru-rich-text-editor.underline': 'അടിവരയിടുക',
  'gru-rich-text-editor.bullets': 'ബുള്ളറ്റുകൾ',
  'gru-rich-text-editor.expressions-panel.tabs.calculus': 'കാൽക്കുലസ്',
  'gru-rich-text-editor.expressions-panel.tabs.greek-letters':
    'ഗ്രീക്ക് അക്ഷരങ്ങൾ',
  'gru-rich-text-editor.expressions-panel.tabs.layout': 'ലേഔട്ട്',
  'gru-rich-text-editor.expressions-panel.tabs.relation': 'ബന്ധം',
  'gru-rich-text-editor.expressions-panel.tabs.set-theory': 'സെറ്റ് സിദ്ധാന്തം',
  'gru-rich-text-editor.expressions-panel.tabs.symbols': 'ചിഹ്നങ്ങൾ',
  'gru-rich-text-editor.expressions-panel.tabs.trigonometry': 'ത്രികോണമിതി',
  'gru-rich-text-editor.expressions-panel.insert-expression': 'തിരുകുക',
  'gru-rich-text-editor.expressions-panel.update-expression': 'അപ്ഡേറ്റ്',
  'gru-rich-text-editor.expressions-panel.create-expression':
    'എക്സ്പ്രഷൻ സൃഷ്ടിക്കുക',
  'gru-settings-edit.answerkey-attempts': 'ഉത്തരം കീയും ശ്രമങ്ങളും',
  'gru-settings-edit.answer-key':
    'വിദ്യാർത്ഥികൾക്ക് അവസാനം ഉത്തരം കീ കാണാൻ കഴിയും',
  'gru-settings-edit.attempts': 'ശ്രമങ്ങൾ',
  'gru-settings-edit.attempts-unlimited': 'പരിമിതികളില്ലാത്ത',
  'gru-settings-edit.backwards':
    'വിദ്യാർത്ഥികൾക്ക് പിന്നോട്ടും നാവിഗേറ്റുചെയ്യാനും പ്രതികരണങ്ങൾ മാറ്റാനും കഴിയും',
  'gru-settings-edit.feedback':
    'അവർ ശരിയായ / തെറ്റാണ് എന്ന് വിദ്യാർത്ഥികൾ കാണുക',
  'gru-settings-edit.feedback-immediate': 'ഒരു ചോദ്യത്തിന് & അവസാനം',
  'gru-settings-edit.feedback-never': 'ഒരിക്കലും',
  'gru-settings-edit.feedback-summary': 'അവസാനം',
  'gru-settings-edit.navigation-scoring': 'നാവിഗേഷനും സ്കോറിംഗ്',
  'gru-settings-edit.disable-heading': 'മാർജിനിൽ മൂല്യനിർണ്ണയം സജീവമാക്കുക',
  'gru-settings-edit.disable-legend':
    'വിദ്യാർത്ഥികൾക്ക് അവരുടെ കോഴ്സ് മാപ്പിൽ നിന്ന് മൂല്യനിർണ്ണയം നടത്താം',
  'gru-icon-popover.settings-visibility-title':
    'നിങ്ങളുടെ ഉള്ളടക്കം ദൃശ്യമാക്കുക',
  'gru-icon-popover.settings-visibility-content':
    'ഈ ക്രമീകരണം നിങ്ങളുടെ പ്രൊഫൈലിലൂടെ നിങ്ങളുടെ ഉള്ളടക്കം ദൃശ്യമാക്കുന്നു. സഹപ്രവർത്തകരുമായി നിങ്ങൾ സൃഷ്ടിക്കുന്ന കോഴ്സുകൾ, ശേഖരങ്ങൾ, മൂല്യനിർണ്ണയം, വിഭവങ്ങൾ, കൂടാതെ / അല്ലെങ്കിൽ ചോദ്യങ്ങൾ എന്നിവ പങ്കുവയ്ക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെങ്കിൽ, ഈ സവിശേഷത ഓൺ ചെയ്യാൻ ഞങ്ങൾ നിർദ്ദേശിക്കുന്നു.',
  'gru-take-tour.text': 'ടൂർ',
  'gru-take-tour.teacher-home.stepOne.title': 'ഒരു ടൂർ നടത്തുക',
  'gru-take-tour.teacher-home.stepOne.description':
    'ഒരു ടൂർ, നിങ്ങളുടെ ഹോംപേജ് എന്നിവയിലേക്ക് സ്വാഗതം! ഇപ്പോൾ നമുക്ക് ആരംഭിക്കാം!',
  'gru-take-tour.teacher-home.stepTwo.title': 'ലോഗോ',
  'gru-take-tour.teacher-home.stepTwo.description':
    'ലോഗോയിൽ ക്ലിക്കുചെയ്യുന്നത് നിങ്ങളെ നിങ്ങളുടെ ഹോംപേജിലേക്ക് തിരികെ നൽകുന്നു.',
  'gru-take-tour.teacher-home.stepThree.title': 'തിരയൽ ബാർ',
  'gru-take-tour.teacher-home.stepThree.description':
    'നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള വിഷയങ്ങൾക്കായി ഞങ്ങളുടെ ഉള്ളടക്ക കാറ്റലോഗിൽ തിരയുക.',
  'gru-take-tour.teacher-home.stepFour.title': 'ക്ലാസ് മുറികൾ',
  'gru-take-tour.teacher-home.stepFour.description':
    'നിങ്ങളുടെ ഹോംപേജിലേക്ക് മടങ്ങുക.',
  'gru-take-tour.teacher-home.stepFive.title': 'ഉള്ളടക്ക മാനേജർ',
  'gru-take-tour.teacher-home.stepFive.description':
    'നിങ്ങളുടെ ഉള്ളടക്കം സൃഷ്ടിക്കുന്നതിനും ആക്സസ് ചെയ്യുന്നതിനും വേഗത്തിലുള്ള ലിങ്ക്.',
  'gru-take-tour.teacher-home.stepSix.title': 'ലൈബ്രറി',
  'gru-take-tour.teacher-home.stepSix.description':
    'ഞങ്ങളുടെ തിരഞ്ഞെടുത്ത കോഴ്സുകൾ ബ്രൗസുചെയ്യുക.',
  'gru-take-tour.teacher-home.stepSeven.title': 'നിങ്ങളുടെ പ്രൊഫൈൽ',
  'gru-take-tour.teacher-home.stepSeven.description':
    'നിങ്ങളുടെ ഉള്ളടക്കം, ഉപയോക്തൃ പ്രൊഫൈൽ, ക്രമീകരണങ്ങൾ എന്നിവ ആക്സസ് ചെയ്ത് അപ്ഡേറ്റ് ചെയ്യുക.',
  'gru-take-tour.teacher-home.stepEight.title': 'പിന്തുണ',
  'gru-take-tour.teacher-home.stepEight.description':
    'പിന്തുണ കേന്ദ്രം അല്ലെങ്കിൽ ലോഗ്ഔട്ട് ആക്സസ് ചെയ്യുക.',
  'gru-take-tour.teacher-home.stepNine.title': 'ക്ലാസ് മുറികൾ',
  'gru-take-tour.teacher-home.stepNine.description':
    'നിങ്ങൾ നിലവിൽ പഠിപ്പിക്കുന്ന ക്ലാസുകളുടെ ലിസ്റ്റ് കാണുക.',
  'gru-take-tour.teacher-home.stepTen.title': 'ആർക്കൈവ് ചെയ്ത ക്ലാസുകൾ',
  'gru-take-tour.teacher-home.stepTen.description':
    'നിങ്ങൾ പഠിപ്പിച്ച ക്ലാസുകളുടെ പട്ടിക കാണുക.',
  'gru-take-tour.teacher-home.stepEleven.title': 'ക്ലാസ്റൂം സൃഷ്ടിക്കുക',
  'gru-take-tour.teacher-home.stepEleven.description':
    'നിങ്ങളുടെ ക്ലാസ്റൂമിൽ പേര് ഒരു പുതിയ ക്ലാസ്റൂം സൃഷ്ടിക്കാൻ ബട്ടൺ ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.student-home.stepOne.title': 'ഒരു ടൂർ നടത്തുക',
  'gru-take-tour.student-home.stepOne.description':
    'ഒരു ടൂർ, നിങ്ങളുടെ ഹോംപേജ് എന്നിവയിലേക്ക് സ്വാഗതം! നിങ്ങളുടെ ഹോംപേജിൽ ലഭ്യമായ സവിശേഷതകളിലൂടെ നടക്കുക.',
  'gru-take-tour.student-home.stepFeaturedCourses.title': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'gru-take-tour.student-home.stepFeaturedCourses.description':
    'നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള വിഷയങ്ങൾക്കായി പഠന നാവിഗേറ്റർ\'s ഉള്ളടക്കം കാറ്റലോഗിലെ തിരഞ്ഞെടുത്ത കോഴ്സുകൾ ബ്രൗസുചെയ്യുക.',
  'gru-take-tour.student-home.stepTwo.title': 'ലോഗോ',
  'gru-take-tour.student-home.stepTwo.description':
    'ലോഗോയിൽ ക്ലിക്കുചെയ്യുന്നത് നിങ്ങളെ നിങ്ങളുടെ ഹോംപേജിലേക്ക് തിരികെ നൽകുന്നു.',
  'gru-take-tour.student-home.stepThree.title': 'തിരയൽ ബാർ',
  'gru-take-tour.student-home.stepThree.description':
    'നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള വിഷയങ്ങൾക്കായി ഞങ്ങളുടെ ഉള്ളടക്ക കാറ്റലോഗിൽ തിരയുക.',
  'gru-take-tour.student-home.stepFour.title': 'എന്റെ പഠനം',
  'gru-take-tour.student-home.stepFour.description':
    'നിങ്ങളുടെ ഹോംപേജിലേക്ക് മടങ്ങുന്നു.',
  'gru-take-tour.student-home.stepFive.title': 'ലൈബ്രറി',
  'gru-take-tour.student-home.stepFive.description':
    'നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള വിഷയങ്ങൾക്കായി പഠന നാവിഗേറ്റർയുടെ തിരഞ്ഞെടുത്ത കോഴ്സുകളും പങ്കാളി ലൈബ്രറികളും ബ്രൌസുചെയ്യുക.',
  'gru-take-tour.student-home.stepSix.title': 'പ്രകടനം',
  'gru-take-tour.student-home.stepSix.description':
    'നിങ്ങൾ എൻറോൾ ചെയ്ത കോഴ്സുകളിൽ നിങ്ങളുടെ പ്രകടനത്തിന്റെ ഒരു സംഗ്രഹം കാണുക.',
  'gru-take-tour.student-home.stepSeven.title': 'നിങ്ങളുടെ പ്രൊഫൈൽ',
  'gru-take-tour.student-home.stepSeven.description':
    'നിങ്ങളുടെ ഉള്ളടക്കവും ഉപയോക്തൃ പ്രൊഫൈലും ആക്സസ് ചെയ്യുക, അപ്ഡേറ്റുചെയ്യുക.',
  'gru-take-tour.student-home.stepEight.title': 'പിന്തുണ',
  'gru-take-tour.student-home.stepEight.description':
    'പിന്തുണ കേന്ദ്രം അല്ലെങ്കിൽ ലോഗ്ഔട്ട് ആക്സസ് ചെയ്യുക.',
  'gru-take-tour.student-home.stepNine.title': 'പ്രഖ്യാപനങ്ങൾ',
  'gru-take-tour.student-home.stepNine.description':
    'നിങ്ങളുടെ ടീച്ചർ അല്ലെങ്കിൽ സ്കൂൾ നിങ്ങൾ അറിയാൻ ആഗ്രഹിക്കുന്നു എന്ന് അറിയിപ്പുകൾ കാണും.',
  'gru-take-tour.student-home.stepTen.title': 'ക്ലാസ് മുറികൾ',
  'gru-take-tour.student-home.stepTen.description':
    'നിങ്ങൾ എൻറോൾ ചെയ്യുന്ന എല്ലാ ക്ലാസ്മുറികളും കാണുക.',
  'gru-take-tour.student-home.stepEleven.title': 'സ്വതന്ത്ര പഠന',
  'gru-take-tour.student-home.stepEleven.description':
    'നിങ്ങൾ ബുക്ക്മാർക്ക് ചെയ്ത വിഷയങ്ങൾ നിങ്ങൾ കൂടുതൽ മനസിലാക്കാൻ ആഗ്രഹിക്കുന്നു.',
  'gru-take-tour.student-home.stepTwelve.title': 'ക്ലാസ്റൂമിൽ ചേരുക',
  'gru-take-tour.student-home.stepTwelve.description':
    'ഒരു ക്ലാസ്റൂമിൽ ചേരാൻ ക്ലാസ്റൂം കോഡ് നൽകുക.',
  'gru-take-tour.student-home.stepThirteen.title': 'പൂർത്തിയായി!',
  'gru-take-tour.student-home.stepThirteen.description':
    'നിങ്ങൾ മുന്നോട്ട് പോയി ഒരു കോഴ്സ് ക്ലിക്കുചെയ്യുക, ഒരു ക്ലാസ്റൂമിൽ ചേരുക അല്ലെങ്കിൽ നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള ഉള്ളടക്കത്തിനായി തിരയുക.',
  'gru-take-tour.student-performance.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.student-performance.stepOne.description':
    'നിങ്ങളുടെ പ്രകടന ഡാഷ്ബോർഡിലേക്ക് സ്വാഗതം. നിങ്ങൾ എല്ലാ ക്ലാസുകളിലും കോഴ്സുകളിലും എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് കാണാൻ കഴിയും.',
  'gru-take-tour.student-performance.stepTwo.title': 'ഫിൽറ്റർ ടാബ്',
  'gru-take-tour.student-performance.stepTwo.description':
    'പ്രവർത്തനം, സമയം, വിഷയം, കോഴ്സ് എന്നിവയിലൂടെ നിങ്ങളുടെ പ്രകടനം ഫിൽട്ടർ ചെയ്യാൻ അമ്പ് ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.student-performance.stepThree.title':
    'റിപ്പോർട്ട് അപ്ഡേറ്റുചെയ്യുക',
  'gru-take-tour.student-performance.stepThree.description':
    'ഒരിക്കൽ നിങ്ങളുടെ ഫിൽട്ടറുകൾ തിരഞ്ഞെടുത്ത്, ഫലങ്ങൾ പ്രദർശിപ്പിക്കുന്നതിന് അപ്ഡേറ്റ് റിപ്പോർട്ട് ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.student-performance.stepFour.title':
    'ഡൗൺലോഡ് ചെയ്യുക / പ്രിന്റ് ചെയ്യുക',
  'gru-take-tour.student-performance.stepFour.description':
    'നിങ്ങളുടെ റിപ്പോർട്ട് ഡൌൺലോഡ് ചെയ്യുക.',
  'gru-take-tour.student-performance.stepFive.title': 'പൂർത്തിയായി!',
  'gru-take-tour.student-performance.stepFive.description':
    'മുന്നോട്ട് പോയി നിങ്ങളുടെ പ്രകടനത്തെ വിശകലനം ചെയ്യുക!',
  'gru-take-tour.student-class.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.student-class.stepOne.description':
    'നിങ്ങളുടെ ക്ലാസ്റൂമിൽ സ്വാഗതം. ഇവിടെ നിങ്ങളുടെ ക്ലാസ് പ്രവർത്തനങ്ങൾ, കോഴ്സ് മാപ്പ്, പ്രവർത്തന പ്രകടന ഡാറ്റ എന്നിവ കണ്ടെത്തും. നമുക്ക് തുടങ്ങാം!',
  'gru-take-tour.student-class.stepTopBar.title':
    'കോഴ്സ്, പ്രകടനം, പൂർത്തിയാക്കൽ',
  'gru-take-tour.student-class.stepTopBar.description':
    'നിങ്ങളുടെ കോഴ്സിന്റെ സംഗ്രഹവും മൊത്തത്തിലുള്ള പ്രകടനവും കാണുക.',
  'gru-take-tour.student-class.stepTwo.title': 'ക്ലാസ് പ്രവർത്തനങ്ങൾ',
  'gru-take-tour.student-class.stepTwo.description':
    'ഇന്ന് നിങ്ങളുടെ ടീച്ചർ നൽകുന്ന ചുമതലകൾ ആക്സസ് ചെയ്ത് പഠിക്കുക.',
  'gru-take-tour.student-class.stepThree.title': 'കോഴ്സ് മാപ്പ്',
  'gru-take-tour.student-class.stepThree.description':
    'കോഴ്സുകളിൽ ശേഖരണവും മൂല്യനിർണ്ണയവും പൂർത്തിയാക്കുന്നതിന് യൂണിറ്റുകളും പാഠങ്ങളും ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.student-class.stepFour.title': 'എന്റെ റിപ്പോർട്ട്',
  'gru-take-tour.student-class.stepFour.description':
    'നിങ്ങളുടെ മൊത്തത്തിലുള്ള ക്ലാസ് പ്രകടന അവലോകനം ചെയ്യുക.',
  'gru-take-tour.student-class.stepFive.title': 'പൂർത്തിയായി!',
  'gru-take-tour.student-class.stepFive.description':
    'കോഴ്സ് മാപ്പിനോ ദൈനംദിന പ്രവർത്തനങ്ങളിലോ ക്ലിക്ക് ചെയ്തുകൊണ്ട് കോഴ്സ് പഠിക്കാൻ ആരംഭിക്കുക.',
  'gru-take-tour.teacher-class.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.teacher-class.stepOne.description':
    'നിങ്ങളുടെ ക്ലാസ്റൂമിൽ സ്വാഗതം. ഇവിടെ നിങ്ങൾക്ക് നിങ്ങളുടെ ദൈനംദിന ക്ലാസ് പ്രവർത്തനങ്ങൾ, കോഴ്സ് മാപ്പുകൾ, അപ്ഡേറ്റ് ക്ലാസ് വിവരങ്ങൾ കാണാനും അവ നൽകാൻ കഴിയും, ഒപ്പം വിദ്യാർത്ഥികളുടെ പ്രകടന ഡാറ്റ അവലോകനം ചെയ്യുക. നമുക്ക് തുടങ്ങാം!',
  'gru-take-tour.teacher-class.stepTopBar.title':
    'കോഴ്സ്, പ്രകടനം, പൂർത്തിയാക്കൽ',
  'gru-take-tour.teacher-class.stepTopBar.description':
    'നിങ്ങളുടെ കോഴ്സിന്റെ ഒരു സംഗ്രഹവും ആകെ വിദ്യാർത്ഥി പ്രകടനവും കാണുക.',
  'gru-take-tour.teacher-class.stepTwo.title': 'ദൈനംദിന ക്ലാസ് പ്രവർത്തനങ്ങൾ',
  'gru-take-tour.teacher-class.stepTwo.description':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികളുടെ ഇന്നത്തെ പ്രവർത്തനങ്ങൾ കാണുക, നൽകുക.',
  'gru-take-tour.teacher-class.stepThree.title': 'കോഴ്സ് മാപ്പ്',
  'gru-take-tour.teacher-class.stepThree.description':
    'കോഴ്സുകളിൽ നൽകിയിട്ടുള്ള യൂണിറ്റുകൾ, പാഠങ്ങൾ, കളക്ഷനുകൾ അല്ലെങ്കിൽ മൂല്യനിർണ്ണയം എന്നിവ കാണുക അല്ലെങ്കിൽ എഡിറ്റുചെയ്യുക.',
  'gru-take-tour.teacher-class.stepFour.title': 'എന്റെ റിപ്പോർട്ട്',
  'gru-take-tour.teacher-class.stepFour.description':
    'നിങ്ങളുടെ വിദ്യാർത്ഥികൾ ഈ കോഴ്സിൽ എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്നതിന്റെ സംഗ്രഹം കാണുക അവരുടെ റിപ്പോർട്ടുകൾ ആക്സസ് ചെയ്യുക.',
  'gru-take-tour.teacher-class.stepClassManagement.title':
    'ക്ലാസ് മാനേജ്മെന്റ്',
  'gru-take-tour.teacher-class.stepClassManagement.description':
    'നിങ്ങളുടെ ക്ലാസ് വിവരവും ക്ലാസിൽ എൻറോൾ ചെയ്ത വിദ്യാർത്ഥികളും അപ്ഡേറ്റ് ചെയ്യുകയോ പുതുക്കുകയോ ചെയ്യുക.',
  'gru-take-tour.teacher-class.stepFive.title': 'പൂർത്തിയായി!',
  'gru-take-tour.teacher-class.stepFive.description':
    'ഇപ്പോൾ മുന്നോട്ട് പോയി നിങ്ങളുടെ വിദ്യാർത്ഥികളുമായി ക്ലാസ്സ്റൂം പങ്കുവയ്ക്കുക.',
  'gru-take-tour.study-player.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.study-player.stepOne.description':
    'ഇത് നിങ്ങളുടെ പഠന കളിക്കാരനാണ്. നിങ്ങൾക്ക് ലഭ്യമായ സവിശേഷതകളിലൂടെ നടക്കട്ടെ.',
  'gru-take-tour.study-player.stepTwo.title': 'കോഴ്സ് മാപ്പ്',
  'gru-take-tour.study-player.stepTwo.description':
    'നിങ്ങളുടെ കോഴ്സ് മാപ്പിലേക്ക് മടങ്ങാൻ ഏത് സമയത്തും ഐക്കണിൽ ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.study-player.stepThree.title': 'കോഴ്സിന്റെ പേര്',
  'gru-take-tour.study-player.stepThree.description':
    'നിങ്ങൾ പ്രവർത്തിക്കുന്ന കോഴ്സ് സൂചിപ്പിക്കുന്നു.',
  'gru-take-tour.study-player.stepFour.title': 'നിർദ്ദേശങ്ങൾ',
  'gru-take-tour.study-player.stepFour.description':
    'നിങ്ങൾ നിലവിൽ പഠിച്ചുകൊണ്ടിരിക്കുന്ന അടിസ്ഥാനത്തിൽ നിങ്ങൾ പര്യവേക്ഷണം ആഗ്രഹിക്കുന്ന അധിക റിസോർസുകൾ.',
  'gru-take-tour.study-player.stepFive.title': 'പൂർത്തീകരണം',
  'gru-take-tour.study-player.stepFive.nuTitle': 'കഴിവുകൾ',
  'gru-take-tour.study-player.stepFive.description':
    'നിങ്ങൾ പൂർത്തിയാക്കിയ കോഴ്സ് എത്രയാണെന്ന് സൂചിപ്പിക്കുന്നു.',
  'gru-take-tour.study-player.stepSix.title': 'പ്രകടനം',
  'gru-take-tour.study-player.stepSix.description':
    'നിങ്ങൾ കോഴ്സിൽ എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് സൂചിപ്പിക്കുന്നു.',
  'gru-take-tour.study-player.stepSeven.title': 'ഉറവിടമായി പ്രതികരിക്കുക',
  'gru-take-tour.study-player.stepSeven.description':
    'ഈ വിഭവത്തെക്കുറിച്ച് നിങ്ങൾ എന്ത് ചിന്തിക്കുന്നുവെന്ന് നിങ്ങളുടെ അധ്യാപകനെ അറിയിക്കുക.',
  'gru-take-tour.study-player.stepEight.title': 'പൂർത്തിയായി!',
  'gru-take-tour.study-player.stepEight.description': 'പഠിക്കാൻ തുടങ്ങൂ!',
  'gru-take-tour.study-player.stepNine.title': 'തിരികെ ശേഖരത്തിലേക്ക്',
  'gru-take-tour.study-player.stepNine.description':
    'നിങ്ങളുടെ ശേഖരത്തിലോ മൂല്യനിർണയത്തിലേക്കോ എപ്പോൾ വേണമെങ്കിലും ഐക്കണിൽ ക്ലിക്കുചെയ്യുക.',
  'gru-take-tour.library.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.library.stepOne.description':
    'പഠന ഗൈഡറിൽ ലൈബ്രറികളിലേക്ക് സ്വാഗതം.',
  'gru-take-tour.library.stepTwo.title': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'gru-take-tour.library.stepTwo.description':
    'അധ്യാപകർ ക്ലാസ്മുറികളിൽ വികസിപ്പിച്ചതും നടപ്പാക്കിയതുമായ കോഴ്സുകൾ പര്യവേക്ഷണം ചെയ്യുക.',
  'gru-take-tour.library.stepThree.title': 'മറ്റ് ലൈബ്രറികൾ',
  'gru-take-tour.library.stepThree.description':
    'goor- ന്റെ പങ്കാളികൾ വികസിപ്പിച്ച ഉള്ളടക്കം പര്യവേക്ഷണം ചെയ്യുക.',
  'gru-take-tour.library.stepFour.title': 'പ്രിവ്യൂ',
  'gru-take-tour.library.stepFour.description':
    'നിങ്ങൾക്ക് താൽപ്പര്യമുണ്ടെങ്കിൽ കാണുന്നതിന് കോഴ്സിന്റെ പ്രിവ്യൂ കാണുക.',
  'gru-take-tour.library.stepFive.title': 'പങ്ക്',
  'gru-take-tour.library.stepFive.description':
    'ഈ കോഴ്സ് മറ്റുള്ളവരുമായി പങ്കുവയ്ക്കുക.',
  'gru-take-tour.library.stepSix.title': 'ബുക്ക്മാർക്ക്',
  'gru-take-tour.library.stepSix.description':
    'ഇത് പിന്നീട് അവലോകനം ചെയ്യുന്നതിനായി ഈ കോഴ്സിനെ ബുക്ക്മാർക്ക് ചെയ്യുക.',
  'gru-take-tour.profile.stepOne.title': 'സ്വാഗതം!',
  'gru-take-tour.profile.stepOne.description':
    'നിങ്ങളുടെ പ്രൊഫൈലിലേക്ക് സ്വാഗതം. ഇവിടെ നിങ്ങളുടെ ഉള്ളടക്കം, വ്യക്തിഗത വിവരങ്ങളും പിന്തുടരുന്നവരും നിങ്ങൾക്ക് ആക്സസ് ചെയ്യാൻ കഴിയും.',
  'gru-take-tour.profile.stepTwo.title': 'എന്റെ ഉള്ളടക്കം',
  'gru-take-tour.profile.stepTwo.description':
    'പുതിയ ഉള്ളടക്കം സൃഷ്ടിച്ച് നിങ്ങൾ റീമിക്സ് ചെയ്ത ഉള്ളടക്കം കാണുക.',
  'gru-take-tour.profile.stepThree.title': 'എന്നെ പറ്റി',
  'gru-take-tour.profile.stepThree.description':
    'നിങ്ങളുടെ വ്യക്തിഗത വിവരം, സ്കൂൾ വിവരം, നിങ്ങളുടെ പ്രൊഫൈൽ ചിത്രം എന്നിവ അപ്ഡേറ്റ് ചെയ്യുക.',
  'gru-take-tour.profile.stepFour.title': 'ലക്ഷ്യങ്ങൾ',
  'gru-take-tour.profile.stepFour.description':
    'നിങ്ങളുടെ പഠന നാഴികക്കല്ലുകൾ നേടിയെടുക്കാൻ സഹായിക്കുന്നതിന് ഗോളുകൾ സജ്ജമാക്കി ട്രാക്ക് ചെയ്യുക.',
  'gru-take-tour.profile.stepFive.title': 'പിന്തുടരുന്നവർ',
  'gru-take-tour.profile.stepFive.description':
    'നിങ്ങൾക്ക് ഒരാളുടെ ഉള്ളടക്കം ഇഷ്ടമാണെങ്കിൽ, നിങ്ങൾക്ക് അവ പിന്തുടരാൻ കഴിയും. നിങ്ങളെ പിന്തുടരുന്നവരെ നിങ്ങൾക്ക് കാണാൻ കഴിയും.',
  'gru-take-tour.profile.stepSix.title': 'ബാഡ്ജുകൾ',
  'gru-take-tour.profile.stepSix.description':
    'നിങ്ങൾക്ക് ലഭിച്ച ബാഡ്ജുകൾ അവലോകനം ചെയ്യുക. നിങ്ങളുടെ ടീച്ചർ നൽകുന്ന ഒരു ബഞ്ച്മാർക്ക് വിലയിരുത്തൽ പൂർത്തിയാക്കിയാൽ നിങ്ങൾക്ക് ഒരു ബാഡ്ജ് ലഭിക്കും.',
  'gru-tour.assessments-settings.stepOne.title': 'നാവിഗേഷനും സ്കോറിംഗ്',
  'gru-tour.assessments-settings.stepOne.description':
    'വിദ്യാർത്ഥികൾ ഒരു മൂല്യനിർണ്ണയത്തിലൂടെ എങ്ങനെ സഞ്ചരിക്കുന്നുവെന്നും അവരുടെ ഉത്തരങ്ങൾ ശരിയാണോ തെറ്റാണെന്നും എങ്ങനെ കാണിക്കുന്നുവെന്നത് ഈ ക്രമീകരണം നിർണ്ണയിക്കുന്നു. അത് അവർക്ക് ഒരു ഉത്തരം കീ കാണിക്കുന്നില്ല.',
  'gru-tour.assessments-settings.stepTwo.title':
    'ഉത്തരം കീയും ശ്രമങ്ങളുടെ എണ്ണം',
  'gru-tour.assessments-settings.stepTwo.description':
    'ഈ ക്രമീകരണം ഒരു ഉത്തരം കീ വെളിപ്പെടുത്തുകയും അസസ്സ്മെന്റിൽ വിദ്യാർത്ഥികളുടെ എണ്ണം സജ്ജമാക്കുകയും ചെയ്യുന്നു.',
  'gru-tour.overview.stepOne.title': 'കോഴ്സ് മാപ്പ്',
  'gru-tour.overview.stepOne.description':
    'കോഴ്സിന്റെ ഭൂപടം നിങ്ങളുടെ വിദ്യാർത്ഥികൾക്ക് നിങ്ങൾ നൽകുന്ന എല്ലാ മൂല്യനിർണ്ണയങ്ങളും ശേഖരണവും ആക്സസ് നൽകുന്നു.',
  'gru-tour.overview.stepTwo.title': 'ക്ലാസ് കോഡ്',
  'gru-tour.overview.stepTwo.description':
    'നിങ്ങൾ സൃഷ്ടിക്കുന്ന ഓരോ ക്ലാസ്മുറിയും ഒരു തനതായ ക്ലാസ് കോഡ് ഉണ്ട്. നിങ്ങളുടെ ക്ലാസ് മുറികളിൽ ചേരാനും നിങ്ങളുടെ ഉള്ളടക്കം ആക്സസ് ചെയ്യാനും നിങ്ങൾ തയാറാകുമ്പോൾ വിദ്യാർത്ഥികൾക്ക് ഈ കോഡ് നൽകും.',
  'gru-tour.overview.stepThree.title': 'വിദ്യാർത്ഥി ക്ലാസ് ഡാറ്റ നിരീക്ഷിക്കുക',
  'gru-tour.overview.stepThree.description':
    'ഒരു കോഴ്സിന്റെ ഭാഗമായ വിദ്യാർത്ഥികളെ പൂർത്തിയാക്കാൻ വിദ്യാർത്ഥി ക്ലാസ്, വ്യക്തിഗത വിദ്യാർത്ഥി വിലയിരുത്തൽ ഡാറ്റ എന്നിവ കാണുന്നതിന് ഇത് അനുവദിക്കുന്നു.',
  'gru-tour.overview.stepFour.title': 'ക്ലാസ്റൂം വിവരം',
  'gru-tour.overview.stepFour.description':
    'ഇവിടെ നിങ്ങളുടെ ക്ലാസ്റൂം പേര് എഡിറ്റുചെയ്യാം, നിങ്ങളുടെ വിദ്യാർത്ഥികൾക്കുള്ള അറിയിപ്പുകൾ പോസ്റ്റ് ചെയ്യുക, നിങ്ങളുടെ ക്ലാസിൽ എൻറോൾ ചെയ്ത വിദ്യാർത്ഥികളുടെ പേരുകൾ കാണുക, നിങ്ങളുടെ ക്ലാസ്റൂം ഇല്ലാതാക്കുക.',
  'gru-tour.overview.stepFive.title':
    'നിങ്ങളുടെ കോഴ്സ് ഉള്ളടക്കം എഡിറ്റുചെയ്യുന്നു',
  'gru-tour.overview.stepFive.description':
    'നിങ്ങൾ ഒരു ക്ലാസ്റൂമിൽ ആയിരിക്കുമ്പോൾ, നിങ്ങളുടെ വിദ്യാർത്ഥികൾക്ക് നൽകിയിട്ടുള്ള കോഴ്സുകളുടെ ഏതെങ്കിലും ഉള്ളടക്കം എഡിറ്റുചെയ്യാൻ ഇവിടെ ക്ലിക്കുചെയ്യുക.',
  'gru-tour.overview.stepSix.title': 'തത്സമയം പുരോഗതി നിരീക്ഷിക്കുക!',
  'gru-tour.overview.stepSix.description':
    'വിദ്യാർത്ഥികൾക്ക് തൽസമയ മൂല്യനിർണ്ണയം ആരംഭിക്കുന്നതിന് ഓരോ മൂല്യനിർണയത്തിന്റെയും ഇടതുവശത്തുള്ള  "തൽസമയ " ഐക്കണിൽ ക്ലിക്ക് ചെയ്യുക. [1] [2] . [3] [4] <i class =  "real-time-icon ">',
  'gru-tour.quick-start.stepOne.title':
    'നിങ്ങളുടെ ക്ലാസ്റൂമുകൾ നാവിഗേറ്റുചെയ്യുന്നു',
  'gru-tour.quick-start.stepOne.description':
    'ഇത് പുതുതായി സൃഷ്ടിച്ച ഒരു ക്ലാസ്റൂം ആണ്. ക്ലാസ്റൂമിലേക്ക് എത്താൻ നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും,  "ക്ലാസ്മുറികൾ " ക്ലിക്കുചെയ്ത് നിങ്ങൾ പ്രവേശിക്കാൻ ആഗ്രഹിക്കുന്ന ക്ലാസ്റൂം തിരഞ്ഞെടുക്കുന്നതിന് ഡ്രോപ്പ് ഡൗൺ മെനു ഉപയോഗിക്കുക.',
  'gru-tour.quick-start.stepTwo.title': 'ആമുഖം? ഒരു വിലയിരുത്തൽ സൃഷ്ടിക്കുക!',
  'gru-tour.quick-start.stepTwo.description':
    'Gooru ഉപയോഗിച്ച് ആരംഭിക്കുന്നതിനുള്ള ഒരു മൂല്യനിർണ്ണയം സൃഷ്ടിക്കാനും നിങ്ങളുടെ ക്ലാസിലെ വിദ്യാർത്ഥി ഗ്രാഹ്യത്തിന്റെ നിലവിലെ നിലകളെ വിലയിരുത്താനും ഞങ്ങൾ നിർദ്ദേശിക്കുന്നു.',
  'gru-tour.real-time.stepOne.title': 'പ്രതികരണങ്ങളുടെ തകർച്ച',
  'gru-tour.real-time.stepOne.description':
    'വിദ്യാർത്ഥികൾ എങ്ങനെ ഉത്തരം നൽകി എന്ന് വിശദീകരിക്കാൻ ഓരോ ചോദ്യത്തിലും ക്ലിക്ക് ചെയ്യുക.',
  'gru-tour.real-time.stepTwo.title': 'വ്യക്തിഗത വിദ്യാർത്ഥിയുടെ ഡാറ്റ',
  'gru-tour.real-time.stepTwo.description':
    'വിദ്യാർത്ഥി ഡാറ്റ റിപ്പോർട്ടുകൾ കാണുന്നതിന് ഓരോ വിദ്യാർത്ഥി ടൈൽ തിരഞ്ഞെടുക്കുക.',
  'gru-tour.real-time.stepThree.title': 'ഒരു കാഴ്ച തിരഞ്ഞെടുക്കുക',
  'gru-tour.real-time.stepThree.description':
    'ഡാറ്റ പ്രദർശിപ്പിക്കുന്നതിനുള്ള ഓപ്ഷനുകൾ കാണുന്നതിന്  "ശീർഷക കാഴ്ച " അല്ലെങ്കിൽ  "ലിസ്റ്റ് കാഴ്ച " തിരഞ്ഞെടുക്കുക.',
  'gru-tour.real-time.stepFour.title': 'ശരാശരി സ്കോർ',
  'gru-tour.real-time.stepFour.description':
    'എല്ലാ പ്രതികരണങ്ങൾക്കും തത്സമയം കണക്കാക്കിയ ക്ലാസ്സ് ശരാശരി കാണുക.',
  'gru-tour.real-time.stepFive.title': 'അജ്ഞാത ഡാറ്റ പ്രൊജക്റ്റ് ചെയ്യുക',
  'gru-tour.real-time.stepFive.description':
    'വിദ്യാർത്ഥിയുടെ ഡാറ്റയുടെ അജ്ഞാത കാഴ്ചപ്പാട് രൂപകൽപ്പന ചെയ്യാൻ ഈ ഓപ്ഷൻ ഉപയോഗിക്കുക.',
  'gru-course-play.hide-unit-details': 'യൂണിറ്റ് മെറ്റാഡാറ്റ മറയ്ക്കുക',
  'gru-course-play.view-unit-details': 'യൂണിറ്റ് മെറ്റാഡേറ്റാ കാണുക',
  'gru-course-play.performance': 'പ്രകടനം',
  'gru-century-skills.legends.hewlett': 'ഹ്യൂലറ്റ് ആഴമേറിയ പഠന മാതൃക',
  'gru-century-skills.legends.conley': 'നാലു താക്കോലുകളോടുകൂടിയത്',
  'gru-century-skills.legends.framework': 'p21 ചട്ടക്കൂട്',
  'gru-century-skills.legends.national':
    'ജീവിതത്തിനും ജോലിയ്ക്കുമായുള്ള ദേശീയ ഗവേഷണ കേന്ദ്രം',
  'gru-century-skills.content.groups.cognitive':
    'താക്കോൽ പ്രതിജ്ഞാ നയങ്ങളും തന്ത്രങ്ങളും',
  'gru-century-skills.content.groups.content': 'കീ ഉള്ളടക്ക അറിവ്',
  'gru-century-skills.content.groups.learning':
    'പ്രധാന പഠന വൈദഗ്ദ്ധ്യവും വിദ്യകളും',
  'gru-rubric-edit.upload-rubric': 'റൂബിക്ക് അപ്ലോഡുചെയ്യുക',
  'gru-rubric-edit.copy.success-message':
    'നിങ്ങൾ റൂബിക് പകർത്തി {{title}}. ആ റബ്രിക്ക് എഡിറ്റുചെയ്യണോ?',
  'gru-rubric-creation.url': 'url',
  'gru-rubric-creation.upload-file': 'ഫയൽ അപ്ലോഡുചെയ്യുക',
  'gru-rubric-creation.add-category': 'പുതിയ വിഭാഗം ചേർക്കുക',
  'gru-rubric-creation.gru-preview-url.preview':
    'മുകളിലുള്ള റബ്രിക് ചേർത്ത് ഇവിടെ പ്രിവ്യൂ ചെയ്യുക',
  'gru-rubric-creation.overall-narrative': 'മൊത്തത്തിലുള്ള വിവരണ ഫീഡ്ബാക്ക്',
  'gru-rubric-creation.feedback-guidance': 'ഫീഡ് മാർഗനിർദ്ദേശം',
  'gru-rubric-creation.required-feedback': 'ഫീഡ്ബാക്ക് ആവശ്യമാണ്',
  'gru-rubric-creation.feedback-guidance-placeholder':
    'മൊത്തത്തിൽ നിങ്ങളുടെ ഫീഡ്ബാക്ക് മുഴുവനായും സംഗ്രഹിക്കുക.',
  'gru-rubric-creation.gru-category.category-title': 'വിഭാഗ ശീർഷകം',
  'gru-rubric-creation.gru-category.category-feedback':
    'ഉദാ. നിങ്ങൾ ഈ വിഭാഗം അവലോകനം ചെയ്യുന്നതിനാൽ, രചയിതാവിൻറെ ഉദ്ദേശ്യത്തോട് ശ്രദ്ധാലുക്കൾ ശ്രദ്ധിക്കുക.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.0':
    'ഉദാഹരണം: പ്രൊഫഷണലിനെ കവിയുക',
  'gru-rubric-creation.gru-category.gru-scoring-levels.1':
    'ഉദാഹരണം: യോഗ്യതാ പരീക്ഷ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.2':
    'ഉദാഹരണം: പ്രൊഫഷണലിനെ സമീപിക്കുന്നു',
  'gru-rubric-creation.gru-category.gru-scoring-levels.3':
    'ഉദാഹരണം: പ്രാഥമിക യോഗ്യത',
  'gru-rubric-creation.gru-category.gru-scoring-levels.4':
    'ഉദാഹരണം: യോഗ്യതയുടെ തെളിവില്ല',
  'gru-rubric-creation.gru-category.gru-scoring-levels.best': 'മികച്ചത്',
  'gru-rubric-creation.gru-category.gru-scoring-levels.levels': 'നില',
  'gru-rubric-creation.gru-category.gru-scoring-levels.new-level':
    'പുതിയ തലത്തിലേക്ക് ചേർക്കുക',
  'gru-rubric-creation.gru-category.gru-scoring-levels.scoring':
    'സ്കോർ ചെയ്യുന്നു',
  'gru-rubric-creation.gru-category.gru-scoring-levels.worst': 'ഏറ്റവും മോശം',
  'gru-rubric-creation.gru-category.gru-scoring-levels.name-error':
    'ദയവായി തല ശീർഷകം നൽകുക.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.score-error':
    'സ്കോർ മൂല്യം നൽകുക.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.no-levels-error':
    'കുറഞ്ഞത് ഒരു ലെവലിലേയ്ക്ക് ഒരു മൂല്യം സജ്ജീകരിക്കുക.',
  'library.browse-library': 'ലൈബ്രറി ബ്രൗസ് ചെയ്യുക',
  'library.featured-courses': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
  'library.gru-library-card.featured-course': 'ഫീച്ചർ കോഴ്സ്',
  'library.gru-partner-library-card.course.zero': '{{count}} കോഴ്സ്',
  'library.gru-partner-library-card.course.one': '{{count}} കോഴ്സ്',
  'library.gru-partner-library-card.course.other': '{{count}} കോഴ്സുകൾ',
  'library.gru-partner-library-card.collection.zero': '{{count}} ശേഖരം',
  'library.gru-partner-library-card.collection.one': '{{count}} ശേഖരം',
  'library.gru-partner-library-card.collection.other': '{{count}} ശേഖരങ്ങൾ',
  'library.gru-partner-library-card.assessment.zero': '{{count}} മൂല്യനിർണ്ണയം',
  'library.gru-partner-library-card.assessment.one': '{{count}} മൂല്യനിർണ്ണയം',
  'library.gru-partner-library-card.assessment.other':
    '{{count}} അസെസ്മെന്റുകൾ',
  'library.gru-partner-library-card.resource.zero': '{{count}} റിസോഴ്സ്',
  'library.gru-partner-library-card.resource.one': '{{count}} റിസോഴ്സ്',
  'library.gru-partner-library-card.resource.other': '{{count}} വിഭവങ്ങൾ',
  'library.gru-partner-library-card.question.zero': '{{count}} ചോദ്യം',
  'library.gru-partner-library-card.question.one': '{{count}} ചോദ്യം',
  'library.gru-partner-library-card.question.other': '{{count}} ചോദ്യങ്ങൾ',
  'library.gru-partner-library-card.rubric.zero': '{{count}} റബ്രിക്ക്',
  'library.gru-partner-library-card.rubric.one': '{{count}} റബ്രിക്ക്',
  'library.gru-partner-library-card.rubric.other': '{{count}} റബ്രിക്സ്',
  'library.partner-libraries': 'പങ്കാളി ലൈബ്രറികൾ',
  'gru-study-header.lesson-legend': 'നിങ്ങൾ ഇപ്പോൾ പാഠമാണ്',
  'gru-study-header.resource-legend': 'നിങ്ങൾ ഈ ഉറവിടം പരിശോധിക്കുന്നു.',
  'gru-study-header.resources-collection-report':
    'ശേഖര ഉപയോഗത്തിന്റെ റിപ്പോർട്ട്',
  'gru-study-header.resources-assessment-report': 'വിലയിരുത്തൽ',
  'gru-study-header.check-summary': 'നിങ്ങളുടെ സംഗ്രഹ റിപ്പോർട്ട് പരിശോധിക്കുക',
  'gru-study-header.check-usage': 'നിങ്ങളുടെ ഉപയോഗ റിപ്പോർട്ട് പരിശോധിക്കുക',
  'gru-study-header.no-suggestions':
    'നിങ്ങളുടെ പഠനം പിന്തുണയ്ക്കുന്നതിനുള്ള മികച്ച നിർദ്ദേശങ്ങളിൽ ഞങ്ങൾ പ്രവർത്തിക്കുന്നു',
  'gru-study-header.resource.zero': 'വിഭവം',
  'gru-study-header.resource.one': 'വിഭവം',
  'gru-study-header.resource.other': 'വിഭവങ്ങൾ',
  'gru-study-header.question.zero': 'ചോദ്യം',
  'gru-study-header.question.one': 'ചോദ്യം',
  'gru-study-header.question.other': 'ചോദ്യങ്ങൾ',
  'gru-study-header.suggestions-legend':
    'കൂടുതൽ അറിയാൻ, ഈ വിഭവങ്ങൾ പരിശോധിക്കുക.',
  'gru-suggest-test.pre-test-header': 'പ്രീ-ടെസ്റ്റ് (ഓപ്ഷണൽ)',
  'gru-suggest-test.post-test-header': 'പോസ്റ്റ് ടെസ്റ്റ് (ഓപ്ഷണൽ)',
  'gru-suggest-test.backfill-header': 'നിർദ്ദേശിച്ചിരിക്കുന്ന ശേഖരം (ഓപ്ഷണൽ)',
  'gru-suggest-test.benchmark-header': 'ബെഞ്ച്മാർക്ക് ടെസ്റ്റ് (ഓപ്ഷണൽ)',
  'gru-suggest-test.resource-header': 'നിർദ്ദേശിത റിസോഴ്സ് (ഓപ്ഷണൽ)',
  'gru-suggest-test.signature_collection-header':
    'നിർദ്ദേശിച്ചിരിക്കുന്ന ശേഖരം (ഓപ്ഷണൽ)',
  'gru-suggest-test.signature_collection-lead':
    'ഈ കോഴ്സിലുള്ള നിങ്ങളുടെ പ്രകടനത്തെ അടിസ്ഥാനമാക്കി, താഴെപ്പറയുന്ന ശേഖരം നിങ്ങളുടെ ധാരണ മെച്ചപ്പെടുത്താം.',
  'gru-suggest-test.signature_assessment-header':
    'നിർദ്ദേശിച്ച വിലയിരുത്തൽ (ഓപ്ഷണൽ)',
  'gru-suggest-test.signature_assessment-lead':
    'ഈ കോഴ്സിലുള്ള നിങ്ങളുടെ പ്രകടനത്തെ അടിസ്ഥാനമാക്കി, താഴെ പറയുന്ന മൂല്യനിർണ്ണയം നിങ്ങളുടെ ധാരണയെ മെച്ചപ്പെടുത്തും.',
  'gru-suggest-test.pre-test-lead':
    'ഈ പാഠത്തിൽ ആശയങ്ങൾ നിങ്ങളുടെ നിലവിലെ അറിവ് അളക്കാൻ ഒരു പ്രീ-ടെസ്റ്റ് നിർദ്ദേശിക്കപ്പെട്ടിട്ടുണ്ട്. പ്രീ-ടെസ്റ്റ് നിങ്ങളെ പാഠം പഠിപ്പിക്കുന്നതിന് സഹായിക്കും. പ്രീ-ടെസ്റ്റ് നിങ്ങളുടെ പഠന പ്രകടനത്തെ ബാധിക്കുകയില്ല.',
  'gru-suggest-test.post-test-lead':
    'അവതരിപ്പിച്ച വിവരങ്ങൾ നിങ്ങൾ മനസ്സിലാക്കുന്നതായി കണക്കാക്കാൻ ഇനിപ്പറയുന്ന പോസ്റ്റ് ടെസ്റ്റ് നിർദ്ദേശിച്ചിട്ടുണ്ട്. പോസ്റ്റ്-ടെസ്റ്റ് നിങ്ങളുടെ കോഴ്സിന്റെ പ്രകടനത്തെ ബാധിക്കുകയില്ല.',
  'gru-suggest-test.backfill-lead':
    'നിങ്ങളുടെ പ്രീ-ടെസ്റ്റിലെ പ്രതികരണങ്ങളെ അടിസ്ഥാനമാക്കി, പാഠം ആരംഭിക്കുന്നതിനു മുമ്പ് അധിക മെറ്റീരിയലുകൾ അവലോകനം ചെയ്യുന്നത് സഹായകമാകും. സഹായകരമായ മെറ്റീരിയലുകൾ അവലോകനം ചെയ്യുന്നതിലൂടെ പുതിയ മെറ്റീരിയൽ പഠനത്തിനായി വിദ്യാർത്ഥികളെ തയ്യാറാക്കാൻ കഴിയും.',
  'gru-suggest-test.benchmark-lead':
    'ഒരു ബെഞ്ച്മാർക്ക് വിലയിരുത്തൽ കൊണ്ട് നിങ്ങൾ ഇപ്പോൾ മനസിലാക്കാൻ തയ്യാറാണ്. ബെഞ്ച്മാർക്ക് വിജയകരമായി പൂർത്തിയാക്കാൻ ഒരു ബാഡ്ജും നിങ്ങൾക്ക് ലഭിക്കും. ബെഞ്ച്മാർക്ക് നിങ്ങളുടെ പഠന പ്രകടനത്തെ ബാധിക്കില്ല.',
  'gru-suggest-test.resource-lead':
    'ഈ കോഴ്സിലുള്ള നിങ്ങളുടെ പ്രകടനത്തെ അടിസ്ഥാനമാക്കി, ഇനിപ്പറയുന്ന ഉറവിടം നിങ്ങളുടെ ധാരണയെ മെച്ചപ്പെടുത്തും.',
  'gru-suggest-test.no': 'വേണ്ട, നന്ദി',
  'gru-suggest-test.no-suggestions':
    'നിങ്ങളുടെ പ്രകടനത്തിന്റെ സംഗ്രഹം ഇവിടെയുണ്ട്.',
  'gru-suggest-test.take': '{{type}} എടുക്കുക',
  'gru-suggest-test.take-signature-collection': 'പഠനം നിർദ്ദേശിച്ച ശേഖരം',
  'gru-suggest-test.take-signature-assessment': 'പഠനം നിർദ്ദേശിച്ച വിലയിരുത്തൽ',
  'gru-suggest-test.take-backfill-pretest': 'പഠനം നിർദ്ദേശിച്ച ശേഖരം',
  'gru-suggest-test.take-resource': 'പഠന ഉറവിടം',
  'gru-suggest-test.end-of-course':
    'നിങ്ങൾ കോഴ്സിന്റെ അന്ത്യത്തിൽ എത്തിച്ചേർന്നു.',
  'gru-content-suggestion.header': 'ഞങ്ങൾക്ക് നിങ്ങൾക്കായി ഒരു നിർദ്ദേശമുണ്ട്!',
  'gru-content-suggestion.suggestion-text.collection':
    'ഈ വിഷയത്തെക്കുറിച്ചുള്ള നിങ്ങളുടെ പ്രകടനത്തെ അടിസ്ഥാനമാക്കി, നിങ്ങൾ പ്രാധാന്യം നേടുന്നതിന് നിങ്ങളെ നിർദ്ദേശിച്ച ശേഖരത്തിലൂടെ സഞ്ചരിക്കാൻ ഞങ്ങൾ ശുപാർശചെയ്യുന്നു.',
  'gru-content-suggestion.suggestion-text.assessment':
    'ഈ വിഷയത്തെക്കുറിച്ചുള്ള നിങ്ങളുടെ പ്രകടനത്തെ അടിസ്ഥാനമാക്കി, നിങ്ങൾ പ്രാധാന്യം നേടുന്നതിന് നിങ്ങളെ നിർദ്ദേശിച്ച മൂല്യനിർണ്ണയത്തിലൂടെ മുന്നോട്ടുപോകാൻ ഞങ്ങൾ ശുപാർശചെയ്യുന്നു.',
  'student-open-ended-summary.overall-comment': 'മൊത്തത്തിലുള്ള അഭിപ്രായം',
  'student-open-ended-summary.overall-score': 'മൊത്തം സ്കോർ',
  'student-open-ended-summary.prompt': 'ചോദ്യം ചോദിക്കുന്നു',
  'gru-performance-chart.teacher-tooltip':
    'ഈ പാഠത്തിലെ എല്ലാ വിലയിരുത്തലുകളും നിങ്ങളുടെ വിദ്യാർത്ഥികൾ പൂർത്തിയാക്കിയിട്ടുണ്ട്',
  'report.external-assessment-report.note':
    'ഈ വിദ്യാർത്ഥിക്ക് മൂല്യനിർണ്ണയം നടത്തുന്നതിനുള്ള സ്കോർ സ്കോർ ചെയ്ത ഒരു വിദേശ മാനദണ്ഡമാണ്. വ്യക്തിഗത ചോദ്യ നില ഡാറ്റ ലഭ്യമല്ല.',
  'report.external-assessment-report.wish': 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ നേടി',
  'report.external-assessment-report.reference':
    'ഈ ബാഹ്യ മൂല്യനിർണയം ആക്സസ് ചെയ്യാൻ കഴിയും',
  'report.external-collection-report.note':
    'ശേഖരത്തിനായി സ്ക്വയർ ചെയ്ത സ്കോർ സ്ക്വയറുകളുള്ള ഒരു ബാഹ്യ ശേഖരമാണിത്. വ്യക്തിഗത ചോദ്യ നില ഡാറ്റ ലഭ്യമല്ല.',
  'report.external-collection-report.wish': 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ നേടി',
  'report.external-collection-report.reference':
    'ഈ ബാഹ്യ ശേഖരം ആക്സസ് ചെയ്യാൻ കഴിയും',
  'report.competency-report.title': 'യോഗ്യതയുള്ള റിപ്പോർട്ട്',
  'report.competency-report.no-subject': 'വിഷയം നൽകിയിട്ടില്ല',
  'report.competency-report.prerequisites': 'മുൻവ്യവസ്ഥകൾ',
  'report.competency-report.signature-assessments': 'സിഗ്നേച്ചർ അസെസ്മെന്റുകൾ',
  'report.competency-report.signature-collections': 'ഒപ്പ് ശേഖരണം',
  'report.competency-report.show-global-data': 'ആഗോള ഡാറ്റ കാണിക്കുക',
  'report.competency-report.show-student-data':
    'വിദ്യാർത്ഥിയുടെ ഡാറ്റ കാണിക്കുക',
  'report.competency-report.show-learning-map': 'പഠന ഭൂപടം കാണിക്കുക',
  'report.competency-report.note':
    'Score 80% or more in our signature assessment and show your mastery',
  'report.domain-report': 'ഡൊമെയ്ൻ റിപ്പോർട്ട്',
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
  'self-report.your-score': 'നിങ്ങളുടെ സ്കോർ',
  'self-report.time_spent': 'ചിലവഴിച്ച സമയം',
  'self-report.update-error': 'സ്കോർ അപ്ഡേറ്റ് ചെയ്യുന്നതിൽ പ്രശ്നം',
  'self-report.validation-error': 'സാധുവായ സ്കോർ നൽകുക',
  'self-report.enter-score': 'നിങ്ങളുടെ സ്കോർ ഇവിടെ നൽകുക',
  'self-report.enter-timeSpent': 'ഇവിടെ ചെലവഴിച്ച സമയം നൽകുക',
  'self-report.validation-error-time': 'സാധുവായ സമയം നൽകുക',
  'notifications.notificationlist-header-title': 'അറിയിപ്പുകൾ',
  'notifications.show-more': 'കൂടുതൽ കാണിക്കുക',
  'notifications.type.teacher-suggestion-title':
    'ക്ലാസിൽ ഒരു പുതിയ അദ്ധ്യാപക നിർദ്ദേശം നിങ്ങൾക്കുണ്ട്: {{classtitle}}',
  'notifications.type.student-gradable-submission-title':
    'നിങ്ങൾ ക്ലാസിൽ ഉൾപ്പെടുന്ന ഗ്രേഡിലേക്ക് {{clare}} ഉണ്ട്: {{classtitle}}',
  'notifications.type.student-self-report-title':
    '{{occurrence}} വിദ്യാർത്ഥി ക്ലാസിൽ പ്രവർത്തനം നടത്തി: {{classtitle}}',
  'notifications.type.teacher-override-title':
    'അധ്യാപകൻ ക്ലാസിൽ നിങ്ങളുടെ സമർപ്പണം ശരിയാക്കി: {{classtitle}}',
  'notifications.type.teacher-grading-complete-title':
    'അധ്യാപകൻ ക്ലാസ്സിൽ നിങ്ങളുടെ സമർപ്പണം ക്രമാനുഗതമാക്കി: {{classtitle}}',
  'notifications.typeinclass.teacher-suggestion-title':
    'നിങ്ങൾക്ക് ഒരു പുതിയ ടീച്ചർ നിർദ്ദേശമുണ്ട്',
  'notifications.typeinclass.student-gradable-submission-title':
    'നിങ്ങൾക്ക് ഗ്രേഡിലേക്ക് വിദ്യാർത്ഥി ഇനം (ങ്ങൾ) ഉണ്ട്',
  'notifications.typeinclass.student-self-report-title':
    'വിദ്യാർത്ഥി (വിദ്യാർത്ഥികൾ) റിപ്പോർട്ട് ചെയ്ത പ്രകടനം',
  'notifications.typeinclass.teacher-override-title':
    'അധ്യാപകൻ നിങ്ങളുടെ സമർപ്പണം തിരുത്തി',
  'notifications.typeinclass.teacher-grading-complete-title':
    'അധ്യാപകൻ ക്ലാസിൽ നിങ്ങളുടെ സമർപ്പണം ക്രമാനുഗതമാക്കിയിരിക്കുന്നു',
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
    'You can remix (copy) the assessment and tag it to the competency(ies) for which the students should gain mastery, before adding it to the Class Activity',
  'ca.warn.trun-off.mastery-accrual-1':
    'Any student who has already successfully completed the assessment will have gained mastery.',
  'ca.warn.trun-off.mastery-accrual-2':
    'Turning mastery off will not update the mastery status for these students.',
  'ca.warn.trun-on.mastery-accrual':
    'Turning mastery accrual on now will not result in update to mastery status for students who have already completed the assessment.',
  'ca.mastery-accrual.update.error':
    'Oops! Unable to update class activity content mastery accrual right now. Please try again shortly.'
});
