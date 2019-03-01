﻿import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',

  errors: {
    description: 'हे फील्ड',
    inclusion: '{{description}} सूचीमध्ये समाविष्ट नाही',
    exclusion: '{{description}} राखीव आहे}}',
    invalid: '{{description}} अवैध आहे}}',
    confirmation: '{{description}}  शी जुळत नाही{{on}}',
    accepted: '{{description}} स्वीकार करणे आवश्यक आहे}}',
    empty: '{{description}} रिक्त असू शकत नाही',
    blank: '{{description}} रिक्त असू शकत नाही',
    present: '{{description}} रिक्त असणे आवश्यक आहे',
    collection: '{{description}} हा संग्रह असणे आवश्यक आहे',
    singular: '{{description}} हा संग्रह असू शकत नाही',
    tooLong: '{{description}} खूपच लांब आहे (अधिकतम {{max}} वर्ण)',
    tooShort: '{{description}} खूप लहान आहे (किमान {{min}} वर्ण आहेत)',
    before: '  {{description}} आधी असणे आवश्यक आहे{{before}}',
    after: '  {{description}} नंतर असणे आवश्यक आहे{{after}}',
    wrongDateFormat: ' {{description}} च्या स्वरूपात असणे आवश्यक आहे{{format}}',
    wrongLength: '{{description}} चुकीच्या लांबीचे आहे(असले पाहिजे{{is}}वर्ण)',
    notANumber: '{{description}} एक संख्या असणे आवश्यक आहे',
    notAnInteger: '{{description}} हा पूर्णांक असणे आवश्यक आहे',
    greaterThan: '{{description}}  पेक्षा जास्त असणे आवश्यक आहे.{{gt}}',
    greaterThanOrEqualTo:
      '{{description}}  पेक्षा मोठे किंवा त्यासमान असणे आवश्यक आहे{{gte}',
    equalTo: ' {{description}}  च्या बरोबरीने असणे आवश्यक आहे{{is}}.',
    lessThan: '{{description}} {{lt}} पेक्षा कमी असणे आवश्यक आहे',
    lessThanOrEqualTo:
      '{{description}} {{lte}} पेक्षा कमी किंवा त्यासमान असणे आवश्यक आहे',
    otherThan: '{{description}} {{value}} पेक्षा इतर असणे आवश्यक आहे',
    odd: '{{description}} विषम असला पाहिजे',
    even: '{{description}} सम असला पाहिजे',
    positive: '{{description}} सकारात्मक असणे आवश्यक आहे',
    date: '{{description}} एक वैध तारीख असणे आवश्यक आहे',
    email: '{{description}} एक वैध ईमेल पत्ता असणे आवश्यक आहे',
    phone: '{{description}} एक वैध फोन नंबर असणे आवश्यक आहे',
    url: '{{description}} वैध url असणे आवश्यक आहे'
  },
  common: {
    relevance: 'समर्पकता',
    engagement: 'प्रतिबद्धता',
    efficacy: 'परिणामकारकता',
    grid: 'ग्रिड',
    list: 'यादी',
    first: 'पहिला',
    last: 'शेवटचे',
    name: 'नाव',
    user: 'वापरणारी व्यक्ती',
    'content-name': 'सामग्रीचे नाव',
    lastName: 'आडनाव',
    firstName: 'पहिले नाव',
    'filter-by': 'द्वारे फिल्टर',
    more: 'अधिक',
    'avg-score': 'सरासरी गुण',
    frq: 'फ्रॅक',
    schedule: 'वेळापत्रक',
    responses: 'प्रतिसाद',
    'no-lesson-info-message': 'या युनिटमध्ये काही धडे आहेत.',
    'no-collection-info-message': 'या धड्यात कोणतेही संग्रह आहेत.',
    'gooru-suggestions': 'गुरूच्या सूचना',
    'gooru-catalog': 'गुरू कॅटलॉग',
    'suggestion-made-to': 'सूचित केले',
    'student-selected': 'विद्यार्थी निवडले',
    'no-suggest-result-message': ' कोणतीही जुळणारी सामग्री सापडली नाही',
    'no-suggest-results-message': 'आपण संबंधित सामग्री शोधू आणि शोधू शकता.',
    'no-suggest-search-results-message':
      'आपले शब्दलेखन तपासा. आम्ही सर्व चुका करतो! किंवा त्याऐवजी समान शब्द शोधण्याचा प्रयत्न करा.',
    'a-collection': 'एक संग्रह',
    'a-course': 'एक कोर्स',
    'a-question': 'एक प्रश्न',
    'a-resource': 'एक स्त्रोत',
    'a-rubric': 'एक rubric',
    'all-completed': 'सर्व पूर्ण केले',
    'an-assessment': 'एक मूल्यांकन',
    about: 'याबद्दल',
    'about-you': 'तुमच्याबद्दल',
    'about-me': 'माझ्याबद्दल',
    accept: 'स्वीकार',
    ignore: 'दुर्लक्ष',
    add: 'जोडा',
    'plan-an-activities': 'Plan your activities',
    'plan-an-activities-msg':
      'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
    Reschedule: 'पुनर्नियोजन',
    'no-unschedule-items': 'नियोजन करण्यसाठी उपक्रम उपलब्ध नाही',
    'repeat-activity': 'उपक्रमाची पुनरावृत्ती',
    'add-assessment': 'नवीन मूल्यांकन तयार करा',
    'add-century-skills': ' 21 व्या    शतकाची कौशल्ये जोडा',
    'add-collaborator': 'सहयोगकर्ता जोडा',
    'add-collection': 'नवीन संकलन तयार करा',
    'add-collection-item': 'स्रोत किंवा प्रश्न तयार करा',
    'add-competency': 'योग्यता जोडा',
    'add-content-prompt':
      'आपण <span> {{Type}} </span> अजून तयार केले नाही ,चला धीट व्हा',
    'add-course': 'नवीन अभ्यासक्रम तयार करा',
    'add-coruse-to-class': 'तुमच्या वर्गाशी अभ्यासक्रम जोडा',
    'add-domains-to-unit': 'युनिटमध्ये डोमेन्स जोडा',
    'add-url': 'url जोडा',
    'add-from-url': 'url मधून जोडा',
    'add-lessons': 'धडे जोडा',
    'add-new-lesson': 'नवीन धडा तयार करा',
    'add-new-unit': 'नवीन युनिट तयार करा',
    'add-new-resource': 'नवीन स्त्रोत तयार करा',
    'add-new-question': 'एक नवीन प्रश्न तयार करा',
    'add-question': 'प्रश्न तयार करा',
    'add-question-image': 'प्रश्नाची प्रतिमा जोडा',
    'add-rubric': 'नवीन रूब्रिक जोडा',
    'add-standard': 'मानक जोडा',
    'add-standards': 'मानक जोडा',
    'add-standards-to-collection': 'संकलनात मानक जोडा',
    'add-to': 'मध्ये जोडा',
    'add-to-classroom': 'वर्गामध्ये जोडा',
    'add-to-daily-class': 'वर्गाच्या दैनंदिन कामकाजामध्ये सामील करा',
    'add-to-collection-success':
      'आपण {{contenttitle}} ला {{collectiontitle}} वर जोडले आहे. आपण {{collectiontype}} संपादित करू इच्छिता?',
    'add-to-lesson-success':
      'आपण {{collecttitle}} {{lowontitle}} वर जोडले आहे आपण {{collectiontype}} संपादित करू इच्छिता?',
    'add-type-question': 'आपण कोणत्या प्रकारचा प्रश्न जोडू इच्छिता?',
    'add-type-resource': 'हे कशा प्रकारचे साधन आहे?',
    'add-units': 'एकके जोडा',
    added: 'जोडले',
    'advanced-editing': '.प्रगत संपादन',
    announcements: 'घोषणा',
    anonymous_mode: 'निनावी मोड',
    answer: 'तुमचे उत्तर',
    'answer-correct': 'आपण बरोबर आहात!',
    'answer-incorrect': 'आपण चुकीचे आहात ...',
    'answer-key-was-hidden': 'टीप: आपल्या शिक्षकाने उत्तर की लपवली आहे.',
    approved: 'मंजूर',
    archive: 'संग्रह',
    assessment: 'मूल्यांकन',
    'assessment-disabled': 'आपण या मूल्यांकनाचा प्रयत्न करू शकत नाही',
    'assessment-external': 'मूल्यांकन- बाह्य',
    'assessment-pl': {
      zero: 'मूल्यांकन',
      one: 'मूल्यांकन',
      other: 'मूल्यांकन'
    },
    'assessment-title': 'मूल्यांकन शीर्षक',
    assessmentInitial: 'अ',
    assessments: 'मूल्यांकन',
    assign: 'सोपवा',
    'assign-to-class': 'वर्गाकडे सोपवा',
    'assign-to-course': 'पाठ्यक्रमात द्या',
    attempt: 'या आकड्याचा प्रयत्न करा',
    audience: 'प्रेक्षक',
    avatarFor: 'चा अवतार',
    averageScore: 'सरासरी गुण',
    back: 'मागे',
    'back-to-assessment': 'परत मूल्यांकन करण्यासाठी',
    'back-to-collection': 'संकलनावर परत',
    'back-to-course-map': 'पाठ्यक्रमाच्या आराखड्या कडे परत',
    'back-to-data': 'डेटाकडे परत',
    'back-to-report': 'अहवालाकडे परत या',
    'best-practices': 'सर्वोत्कृष्ट प्रथा',
    beta: 'बीटा',
    'big-ideas': 'मोठ्या कल्पना',
    biography: 'जीवनचरित्र',
    bookmark: 'बुकमार्क',
    bookmarks: 'बुकमार्क्स',
    'bookmarked-content-success':
      'हे {{contenttype} बुकमार्क केलेले आपल्या स्वतंत्र शिक्षण पृष्ठावर जोडले जाईल.',
    'bookmarked-success':
      'सर्व बुकमार्क सामग्री स्वतंत्र शिक्षण पृष्ठावर जोडली जाईल.',
    builder: 'संपादक',
    cancel: 'रद्द करा',
    categories: 'श्रेण्या',
    category: 'श्रेणी',
    categoryOptions: {
      k12: 'के -12',
      'higher-ed': 'उच्च शिक्षण',
      'professional-dev': 'व्यावसायिक विकास'
    },
    'century-skills': '21 व्या शतकातील कौशल्ये',
    choose: 'निवडा',
    'choose-file': 'एक फाइल निवडा',
    class: 'वर्ग',
    classScores: 'वर्ग गुण',
    'click-unBookmark': 'unbookmark करण्यासाठी क्लिक करा',
    close: 'बंद',
    collection: 'संकलन',
    'collection-pl': {
      zero: 'संग्रह',
      one: 'संकलन',
      other: 'संग्रह'
    },
    'collection-title': 'संग्रह शीर्षक',
    collections: 'संग्रह',
    collectionInitial: 'क',
    competency: 'योग्यता',
    competencies: 'अनेक योग्यता',
    completed: 'पूर्ण केले',
    completion: 'पूर्णत्व',
    community: 'समुदाय',
    confirm: 'पुष्टी',
    'confirm-copy': 'पुष्टी करा व कॉपी करा',
    content: 'आशय',
    'content-manager': 'आशय व्यवस्थापक',
    contentUnavailable: 'आशय उपलब्ध नाही',
    contentUnavailabletoday:
      'कोणतेही वर्तमान काम नाहीत कोर्स मॅप किंवा माय कंट्रेंट मधून दैनिक वर्ग कृती जोडा.',
    contentUnavailableyesterday: 'कोणतीही गतिविधी जोडली नाही.',
    'contributed-by': 'द्वारा योगदान',
    copy: 'कॉपी करा',
    'copy-to': 'मध्ये कॉपी करा',
    correct: 'योग्य/बरोबर',
    'correct-answer': 'योग्य उत्तर',
    'correct-answers': 'योग्य उत्तर',
    'incorrect-answers': 'चुकीचा उत्तर',
    'rubric-graded': 'रुब्रिक श्रेणीबद्ध',
    'self-graded': 'स्व-श्रेणीबद्ध',
    'rubric-grade': 'रुब्रिक ग्रेड',
    brief: 'थोडक्यात',
    'update-grade-score':
      'आपले फ्रॅक पूर्ण करण्यासाठी ग्रेड स्कोअर अद्यतनित करा.',
    'answer-this-rubric': 'आपल्या frq पूर्ण करण्यासाठी या रुब्रिक उत्तर.',
    'all-caught-up': 'आपण सर्व पकडले आहे!',
    'no-users-to-grade': 'या frq साठी ग्रेडसाठी कोणतेही वापरकर्ते नाहीत.',
    'rubric-needs-grading': 'rubric ग्रेडिंग आवश्यक आहे',
    'not-answered': 'उत्तर दिले नाही',
    'rubric-not-answered': 'रुब्रिक उत्तर दिले नाही',
    country: 'देश',
    'course-map': 'पाठ्यक्रम नकाशा',
    course: 'अभ्यासक्रम',
    'course-title': 'अभ्यासक्रम शीर्षक',
    courses: 'अभ्यासक्रम',
    'competency-status-0': 'Not Started',
    'competency-status-1': 'In Progress',
    'competency-status-2': 'Mastered (Inferred)',
    'competency-status-3': 'Mastered (Asserted)',
    'competency-status-4': 'Mastered (Earned)',
    'competency-status-5': 'Mastered (Demonstrated)',
    create: 'तयार करा',
    createClass: 'वर्ग तयार करा',
    'created-by': 'द्वारा निर्मित',
    'create-rubric': 'नवीन रुब्रिक तयार करा',
    'current-attempt': 'वर्तमान प्रयत्न',
    'currently-studying': 'सध्या हा अभ्यास करत आहे',
    delete: 'हटवा',
    'delete-instructions': {
      'links-inaccessible': 'सर्व शेअर लिंक्सना प्रवेश असणार नाहीत',
      'content-inaccessible':
        'सर्व आशयास त्याच्याशी संलग्न कक्षांसाठी प्रवेश असणार नाही'
    },
    'depth-of-knowledge': 'ज्ञानाची खोली',
    description: 'वर्णन',
    destination: 'गंतव्य',
    'disappear-after-login': 'हे {{loginnumber}} लॉग-इन नंतर अदृश्य होईल',
    'disappear-next-login': 'हे पुढील लॉग-इन वर दिसणार नाही',
    district: 'जिल्हा',
    domain: 'डोमेन',
    domains: 'डोमेन्स',
    download: 'डाऊनलोड',
    'download-print': 'डाउनलोड / प्रिंट',
    'drag-drop-suggestions': 'किंवा  ड्रॅग आणि ड्रॉप सूचना करा ...',
    'download-report': 'अहवाल  डाउनलोड करा',
    edit: 'संपादित करा',
    showassessments: 'मूल्यांकन दाखवा',
    showcollections: 'संकलन दर्शवा',
    showlessons: 'धडे दाखवा',
    collapse: 'संकुचित करा',
    expand: 'विस्तृत करा',
    'edit-assessment': 'मूल्यांकन संपादित करा',
    'edit-collection': 'संग्रह संपादित करा',
    'edit-course': 'कोर्स संपादित करा',
    'edit-question': 'प्रश्न संपादित करा',
    'edit-resource': 'स्त्रोत संपादित करा',
    'edit-rubric': 'रुब्रीक संपादित करा',
    email_support: 'support@gooru.org',
    emotions: {
      'emotion-1': 'मला मदत हवी आहे',
      'emotion-2': 'मला समजत नाही',
      'emotion-3': 'मेह ...',
      'emotion-4': 'मला समजते',
      'emotion-5': 'मी समजावून सांगू शकतो'
    },
    'enter-url': 'url प्रविष्ट करा',
    'enrolled-students': 'नोंदणीकृत विद्यार्थी',
    errors: {
      'join-class-code': 'कृपया वर्ग कोड प्रविष्ट करा.',
      'answer-has-no-image': 'कृपया उत्तर प्रतिमा अपलोड करा.',
      'add-username': 'कृपया युजरनेम प्रविष्ट करा',
      'add-course-title': 'कृपया कोर्स शीर्षक प्रविष्ट करा.',
      'add-question-answer-text': 'कृपया उत्तर निवड मजकूर प्रविष्ट करा.',
      'add-question-description': 'कृपया प्रश्न प्रविष्ट करा.',
      'add-question-title': 'कृपया प्रश्न शीर्षक प्रविष्ट करा.',
      'assessment-title-presence': 'कृपया मूल्यांकन शीर्षक प्रविष्ट करा.',
      'can-not-join-class':
        'अरेरे! वर्गांत येवू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'assessment-not-added-to':
        'अरेरे! लगेच धडयात  मूल्यांकन जोडणे नाही. शक्य कृपया लवकरच पुन्हा प्रयत्न करा',
      'assessment-not-copied':
        'अरेरे! आत्ता मूल्यांकनाची लगेच कॉपी करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'assessment-not-created':
        'अरेरे! आत्ता लगेच मूल्यांकन तयार करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'assessment-not-updated':
        'अरेरे! आत्ता लगेच मूल्यांकन अ्पडेट करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'category-title-presence': 'श्रेणी शीर्षक प्रविष्ट करा.',
      'class-min-score': 'किमान स्कोअर  ही 1 आणि 100 दरम्यानची संख्या असावी',
      'class-not-created':
        'अरेरे! आत्ताच वर्ग तयार करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'class-title-presence': 'कृपया आपल्या वर्गात एक नाव द्या.',
      'collection-not-added-to':
        'अरेरे! आता लगेच  धड्यात संकलन जो्डू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'collection-not-copied':
        'अरेरे! आत्ताच संग्रह कॉपी करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा.',
      'collection-not-created':
        'अरेरे! आत्ताच संग्रह तयार करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'collection-not-updated':
        'अरेरे! आता लगेच संकलन अपडेट करू शकत नाही.  कृपया लवकरच पुन्हा प्रयत्न करा',
      'collection-title-presence': 'कृपया संग्रह शीर्षक प्रविष्ट करा.',
      'correct-answer-presence': 'कृपया योग्य उत्तर सूचित करा.',
      'course-not-copied':
        'अरेरे! सध्या अभ्यासक्रम कॉपी करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'course-not-created':
        'अरेरे! सध्या अभ्यासक्रम तयार करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'course-not-updated':
        'अरेरे! आत्ता लगेच अभ्यासक्रम अपडेट करू शकत नाही.  कृपया लवकरच पुन्हा प्रयत्न करा',
      'highlight-text-not-selected': 'कृपया योग्य उत्तर सूचित करा.',
      'highlight-text-wrong-format': 'प्रश्नांचा चुकीचा फॉर्मॅट.',
      'hotspot-text-max-choices': 'आपण उत्तर निवडींची मर्यादा गाठली आहे.',
      'file-max-size': 'फक्त  5MB पेक्षा लहान आकाराच्या फाइल्स सपोर्टेड आहेत',
      'file-upload-missing':
        'खालीलपैकी कोणत्याही  एका एक्नेस्टेन्शनची फाइल निवडा: {{extensions}}',
      'getting-next-resource':
        'आपले उत्तर सबमिट करताना एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
      'lesson-not-copied':
        'अरेरे! सध्या धडा कॉपी करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'lesson-not-created':
        'अरेरे! आत्ता धडा तयार करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'lesson-not-loaded':
        'अरेरे! आत्ता धडा  लोड करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'lesson-title-required': 'कृपया धड्याचे शीर्षक प्रविष्ट करा.',
      'password-confirm': 'कृपया आपल्या पासवर्ड पुष्टी करा.',
      'password-length': 'पासवर्ड 5 ते 14 वर्ण असणे आवश्यक आहे',
      'password-not-match': 'पासवर्ड्स जुळत नाही्त.',
      'password-required': 'कृपया एक पासवर्ड प्रविष्ट करा.',
      'password-special-characters': 'कृपया विशेष वर्ण वापरू नका.',
      'profile-not-updated':
        'अरेरे! आत्ता प्रोफाईल अपडेट शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा.',
      'question-not-added-to':
        'अरेरे! आत्ताच {{collectiontype}} मध्ये प्रश्न जोडू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'question-not-copied':
        'अरेरे! आत्ता प्रश्न कॉपी  करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा.',
      'question-not-created':
        'अरेरे! आत्ताच प्रश्न तयार करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'question-not-updated':
        'अरेरे! आत्ताच प्रश्न अपडेट करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'reset-password-error':
        'अरे हो! काहीतरी बरोबर नाही.पासवर्ड रीसेट करू शकत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
      'reset-google-account-exists':
        'आपले ईमेल लॉगिन Google अकाऊंट सह तयार केले गेले आहे आणि आम्ही Google पासवर्ड रिसेट करू शकत नाही. आपण आपला Google पासवर्ड विसरला असल्यास, आपल्याला आपल्या google अॅप्सद्वारे तो रीसेट करणे आवश्यक आहे.',
      'resource-description-length':
        'वर्णन 500 वर्णांपेक्षा जास्त लांब असू शकत नाही.',
      'resource-invalid-url': 'अवैध url',
      'resource-missing-title': 'कृपया एक स्त्रोत शीर्षक प्रविष्ट करा.',
      'resource-missing-type': 'कृपया स्रोत प्रकार निवडा.',
      'resource-missing-url': 'कृपया वैध यूआरएल प्रविष्ट करा.',
      'resource-not-added-to-collection':
        'अरेरे! आत्ताच तुमच्या संकलनात स्त्रोत जोडू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'resource-not-copied':
        'अरेरे! आत्ताच स्त्रोत कॉपी करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'resource-not-created':
        'अरेरे! आत्ताच स्त्रोत निर्माण करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'resource-not-updated':
        'अरेरे! आत्ताच स्त्रोत अपडेट करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'resource-same-host-url': 'स्रोत Gooru यूआरएल्स असू शकत नाहीत.',
      'resource-title-length': 'शीर्षक 50 वर्णांपेक्षा मोठे असू शकत नाही.',
      'rubric-title-presence': 'कृपया रुब्रिक शीर्षक प्रविष्ट करा.',
      'rubric-url-presence': 'कृपया रुब्रिक url प्रविष्ट करा.',
      'select-correct-answer': 'कृपया योग्य उत्तर निवडा.',
      'search-collections-length': 'कृपया किमान 3 वर्ण प्रविष्ट करा.',
      'sign-in-credentials-not-valid':
        'अरे ! काहीतरी बरोबर नाही कृपया आपले युजरनेम आणि पासवर्ड पुन्हा नीट तपासा आणि पुन्हा प्रयत्न करा.',
      'sign-in-google-account-exists':
        'कृपया Google साइनइन वापरा आम्ही आपला पासवर्ड रीसेट करू शकत नाही.',
      'sign-up-error':
        'अरेरे! आत्ताच साइन-अप करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'sign-up-first-name': 'कृपया आपले प्रथम नाव प्रविष्ट करा',
      'sign-up-last-name': 'कृपया आपले आडनाव प्रविष्ट करा',
      'sign-up-name-length': 'आडनावात किमान 2 अक्षरे असणे आवश्यक आहे.',
      'sign-up-name-only-letters': 'कृपया केवळ अक्षरे प्रविष्ट करा',
      'sign-up-valid-email': 'कृपया एक वैध ईमेल पत्ता प्रविष्ट करा.',
      'special-characters': 'आपण विशेष वर्ण किंवा जागा वापरू शकत नाही.',
      'unit-not-copied':
        'अरेरे! आत्ताच युनिट कॉपी करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'unit-not-created':
        'अरेरे! आत्ताच युनिट निर्माण करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'unit-not-loaded':
        'अरेरे! आत्ताच युनिट लोड करू शकत नाही.कृपया लवकरच पुन्हा प्रयत्न करा',
      'unit-title-required': 'कृपया एकक शीर्षक प्रविष्ट करा.',
      'user-email-presence': 'एक वैध ईमेल प्रविष्ट करा.',
      'username-length': 'युजरनेम 4 ते 254 वर्ण असणे आवश्यक आहे',
      'forgot-password-gmail':
        'कृपया Google साइनइन वापरा आम्ही आपला पासवर्ड रीसेट करू शकत नाही.',
      'no-studymaterial':
        'या वर्गात नियुक्त केलेल्या कोर्समध्ये कोणतीही अभ्यास सामग्री नाही. कृपया हे निश्चित करण्यासाठी आपल्या शिक्षकांशी संपर्क साधा'
    },
    'essential-questions': 'आवश्यक प्रश्न',
    example: 'उदाहरण:',
    exit: 'बाहेर जा',
    explanation: 'स्पष्टीकरण',
    explore: 'अन्वेषण',
    false: 'खोटे',
    'featured-courses': 'दाखवलेले पाठ्यक्रम',
    'file-name': 'फाईलचे नाव',
    finish: 'समाप्त',
    'first-name': 'पहिले नाव',
    follow: 'अनुसरण करा',
    followers: 'अनुयायी',
    following: 'पाळत आहोत',
    forgotPassword: 'पासवर्ड विसरलात',
    from: 'पासून',
    'from-my-assessments': 'माझ्या मूल्यांकनांमधून',
    'from-my-collections': 'माझ्या संकलनातून',
    'from-my-questions': 'माझ्या प्रश्नांमधून',
    'from-my-resources': 'माझ्या स्रोतांकडून',
    'hide-results': 'परिणाम लपवा',
    hints: 'इशारे',
    home: 'होम',
    if_questions: 'तुम्हाला जर काही प्रश्न असतील तर,',
    information: 'माहिती',
    'in-progress': 'काम चालू',
    instructor: 'प्रशिक्षक',
    'last-name': 'आडनाव',
    'last-updated': 'शेवटचे अपडेट',
    'latest-attempt': 'नवीनतम प्रयत्न',
    'launch-anonymous': 'निनावी लाँच करा',
    'launch-on-air': 'थेट जा',
    'learning-objectives': 'शिकण्याचे उद्दिष्ट',
    'learning-target': 'मायक्रो-स्टॅंडर्ड',
    'learning-target-mobile': 'मायक्रो-स्टॅंडर्ड मध्ये स्टॅंडर्ड',
    lesson: 'धडा',
    lessonInitial: 'L',
    'lesson-title': 'पाठ शीर्षक',
    lessonObj: {
      zero: 'धडे',
      one: 'धडा',
      other: 'धडे'
    },
    libraries: 'ग्रंथालये',
    license: 'परवाना',
    link: 'लिंक',
    'link-out': 'लिंक-आऊट',
    'link-out-message':
      '* वरील प्रिव्ह्यू मध्ये तुमचा स्त्रोत ब्लॅंक दाखवत असेल तर कंटेंट पाहण्यासाठी त्याला कदाचित दुसर्‍या पृष्ठावर लिंक-आऊट लागेल. ',
    'live-assessments': 'लाइव्ह मूल्यांकने',
    loading: 'लोड करत आहे ...',
    login: 'लॉग इन',
    logout: 'लॉग-आऊट',
    mastery: 'प्रभुत्व',
    menu: 'मेनू',
    'more-details': 'अधिक माहिती',
    move: 'पुढे जा',
    myContent: 'माझा कंटेंट',
    myProfile: 'माझे स्थान',
    library: 'ग्रंथालय',
    myPerformance: 'माझी कामगिरी',
    'edit-narration': 'वर्णन संपादित करा',
    narration: 'वर्णन',
    'new-assessment': 'नवीन मूल्यांकन',
    'new-collection': 'नविन संग्रह',
    'new-question': 'नवीन प्रश्न',
    'new-question-text': 'येथे प्रश्न मजकूर एंटर करा',
    'new-fib-question-text': '[उत्तर]  सहित प्रश्न एंटर करा',
    'new-resource': 'नवीन स्त्रोत',
    next: 'पुढे',
    no: 'नाही',
    'no-archived': 'आपल्याकडे कोणतीही संग्रहित वर्गकक्ष नाहीत',
    'no-content': 'कोणताही कंटेंट उपलब्ध नाही',
    'no-content-my-report':
      'अद्याप कोणतीही अहवाल उपलब्ध नाहीत एकदा आपण अभ्यास करणे सुरू करताच, आपले अहवाल उपलब्ध होतील.',
    'no-assessments-to-display':
      'नाही <span> मूल्यमापन </span> प्रदर्शित करण्यासाठी',
    'no-collections-to-display':
      'नाही <span> संकलन </span> प्रदर्शित करण्यासाठी.',
    'no-courses-to-display':
      'नाही <span> अभ्यासक्रम </span> प्रदर्शित करण्यासाठी.',
    'no-questions-to-display':
      'नाही <span> प्रश्न </span> प्रदर्शित करण्यासाठी.',
    'no-resources-to-display':
      'प्रदर्शित करण्यासाठी <span> स्त्रोत नाहीत </span>',
    'no-rubrics-to-display':
      'प्रदर्शित करण्यासाठी <span> रुब्रिक्स </span> नाही',
    'no-followers': 'आपल्याकडे अद्याप अनुयायी नाहीत',
    'no-independent-results':
      'जेव्हा आपण आपले {{contenttype}} बुकमार्क एक्सप्लोर करणे सुरू कराल तेव्हा ते येथे दिसतील.',
    'no-results': 'परिणाम आढळले नाही',
    'no-available-results': 'उपलब्ध परिणाम नाहीत',
    'no-results-message':
      'आपले  स्पेलिंग तपासा. आपण सर्वच जण चुका करतो! <br/> आणखी विस्तार करा  आणि काही फिल्टर काढून टाका. <br/> किंवा त्याऐवजी समान शब्द शोधण्याचा प्रयत्न करा.',
    'no-more-attempts': 'आणखी प्रयत्न नाहीत',
    'no-dca-student':
      'आपल्या शिक्षकाने अद्याप दैनिक वर्गांच्या कार्यांसाठी कोणतेही संग्रह किंवा मूल्यांकन सोपवलेले नाही.',
    'no-dca-teacher':
      'कोणतेही वर्तमान काम नाहीत कोर्स मॅप किंवा माय कंट्रेंट मधून दैनिक वर्ग कृती जोडा.',
    notScored: 'unscored',
    notStarted: 'सुरु केले नाही',
    'not-added': 'जोडले नाही',
    'not-applicable': 'N/A लागू नाही',
    'not-following': 'आपण कोणाचेही अनुसरण करीत नाही.',
    'not-provided': 'उपलब्ध केले नाही',
    'not-specified': 'निर्दिष्ट केलेले नाही',
    not_started: 'सुरु  केलेले नाही',
    'nothing-to-display': 'प्रदर्शनासाठी काहीही नाही',
    number: 'नाही',
    numberStudents: {
      zero: '{{count}} विद्यार्थी',
      one: '{{count}} विद्यार्थी',
      other: '{{count}} विद्यार्थी'
    },
    of: 'च्या',
    off: 'बंद',
    on: 'चालू',
    other: 'इतर',
    'overall-performance': 'एकूण कामगिरी',
    password: 'पासवर्ड',
    pending: 'प्रलंबित/पेंडिंग',
    performance: 'कामगिरी दर्शवा',
    'performance-dashboard': 'कामगिरी डॅशबोर्ड',
    'personal-information': 'वैयक्तिक माहिती',
    play: 'खेळा',
    please_contact: 'कृपया संपर्क करा',
    'post-message': 'संदेश(मेसेज) पोस्ट करा',
    preview: 'पूर्वावलोकन (प्रिव्ह्यू)',
    profile: 'प्रोफाइल',
    'profile-publishing': 'प्रोफाइल दिसण्याची शक्यता',
    'publish-to': ' हे माझ्या प्रोफाइल लायब्ररीवर इतरांना  दिसू द्या',
    'published-by': 'द्वारा प्रकाशित',
    'published-tooltip': 'बॅज्ड सामग्री',
    publisher: 'प्रकाशक',
    prev: 'मागे',
    progress: 'प्रगति',
    question: 'प्रश्न',
    questions: 'प्रश्न',
    'questions-OE': 'मुक्त प्रतिसाद प्रश्न',
    'question-pl': {
      zero: 'प्रश्न',
      one: 'प्रश्न',
      other: 'प्रश्न'
    },
    'question-title': 'प्रश्न शीर्षक',
    'question-type': {
      SA: 'एकच उत्तर',
      MC: 'बहु पर्यायी',
      FIB: 'रिकाम्या जागा भरा',
      'T/F': 'चूक किंवा बरोबर',
      T_F: 'चूक किंवा बरोबर',
      MA: 'अनेक उत्तरे',
      OE: 'मुक्त प्रतिसाद',
      HS_TXT: 'एकापेक्षा अधिक निवड - मजकूर',
      HS_IMG: 'एकापेक्षा अधिक निवड - प्रतिमा',
      HT_TO: 'ड्रॅग आणि ड्रॉप ऑर्डर',
      HT_RO: 'ड्रॅग आणि ड्रॉप ऑर्डर',
      HT_HL: ' मजकूर हायलाइट करा'
    },
    reaction: 'प्रतिक्रिया',
    'read-first': '<b> सर्वप्रथम हे वाचा! </b>',
    remaining: '{{number}} बाकी',
    remix: 'रीमिक्स',
    'remix-assessment': 'रीमिक्स मूल्यांकन',
    'remix-assessment-lead':
      'आपण मूल्यांकन पुन्हा एकत्रित (रिमिक्स) करण्याची सुरुवात करणार आहात',
    'remix-assessment-success':
      'आपण मूल्यांकन {{assesstitle}} रिमिक्स केले आहे. आप्ण ते मूल्यांकन संपादित करू इच्छिता का?',
    'remix-collection': 'रीमिक्स संग्रह',
    'remix-collection-lead': 'आपण एक संग्रह रीमिक्स करणार आहात',
    'remix-collection-success':
      'आपण {{collectiontitle}} एक संग्रह रीमिक्स केला आहे आपण तो संग्रह संपादन करू इच्छिता का?',
    'remix-course': 'रीमिक्स कोर्स',
    'remix-course-lead': 'आपण एक कोर्स रीमिक्स करणार आहात',
    'remix-course-success':
      'आपण {{coursetitle}} कोर्स रीमिक्स केला आहे. आपण ते कोर्स संपादित करू इच्छिता का?',
    'remix-lesson': 'रीमिक्स धडा',
    'remix-lesson-lead': 'आपण एक धडा रिमिक्स करणार आहात',
    'remix-lesson-success': 'आपण एक धडा {{lessonTitle}} रीमिक्स केला आहे',
    'remix-question': 'रीमिक्स प्रश्न',
    'remix-question-lead': 'आपण आता एक प्रश्न रिमिक्स करणारच  आहात',
    'remix-question-success':
      'आपण {{questiontitle}} प्रश्न रिमिक्स केला आहे आपण ते प्रश्न संपादित करू इच्छिता का?',
    'remix-resource': 'रीमिक्स स्त्रोत',
    'remix-resource-lead': 'आपण आता एक स्त्रोत रीमिक्स करणारच आहात',
    'remix-resource-success':
      'आपण {{resource Title}} चे संसाधन रीमिक्स केले आहे आपण त्या स्रोतास संपादित करू इच्छिता  का?',
    'remix-unit': 'रीमिक्स युनिट',
    'remix-unit-lead': 'आपण आता एक युनिट रीमिक्स करणारच आहात',
    'remix-unit-success': 'आपण एक युनिट {{unit Title}}  रीमिक्स केle आहे',
    'remixed-by': 'द्वारा रीमिक्स',
    'remix-warning':
      'जागे व्हा! या कोर्समध्ये खूप छान सामग्री आहे आणि प्रत तयार करण्यास वेळ लागेल. आपण प्रक्रिया सुरू करू इच्छित असल्याची पुष्टी करा आणि 15 मिनिटांमध्ये आपल्याला आपल्या <b> प्रोफाईलवर या अभ्यासक्रमाची कॉपी मिळेल. </b>',
    remove: 'काढून टाका',
    report: 'अहवाल',
    'report-in-progress': 'अहवाल तयार होत आहे',
    'request-to': 'बॅजसाठी पुनरावलोकनाची विनंती',
    'request-report': 'विनंती अहवाल',
    resource: 'स्त्रोत',
    resources: 'स्त्रोत',
    'resource-format': {
      image: 'प्रतिमा',
      text: 'मजकूर',
      video: 'व्हिडिओ',
      interactive: 'परस्परसंवादी',
      webpage: 'वेब पेज',
      audio: 'ऑडिओ',
      question: 'प्रश्न'
    },
    'resource-pl': {
      zero: 'स्त्रोत',
      one: 'स्त्रोत',
      other: 'स्त्रोत'
    },
    'resource-title': 'स्त्रोत शीर्षक',
    'resource-url': 'स्त्रोत url',
    role: 'भूमिका',
    rubric: 'रुब्रिक',
    'rubric-creation': 'रुब्रिक निर्मिती',
    rubrics: 'रुब्रिक्स',
    'rubric-title': 'रूब्रिक शीर्षक',
    save: 'सेव्ह करा',
    'de-select': 'निवडलेले खोडा',
    'select-all': 'सर्व निवडा',
    none: 'काहीही नाही',
    'no-students': 'काहीही नाही',
    'add-data': 'माहिती भरा',
    'update-data': 'Update करा',
    all: 'सर्व',
    everyone: 'सर्व विद्यार्थी',
    'unscheduled-items': 'अनियोजित',
    'add-to-unschedule': 'अनियोजित उपक्रमांच्या यादीत टाका',
    'save-next': 'सेव्ह आणि पुढे',
    'save-submit': 'सर्व से्व्ह आणि सबमिट करा',
    'save-finish': 'सेव्ह आणि समाप्त',
    school: 'शाळा',
    'school-info': 'शाळेची माहिती',
    score: 'स्कोअर',
    select: 'निवडा',
    'select-a-framework':
      'कृपया प्रथम वरील अभ्यासक्रम माहिती विभागात एक स्टॅंडर्ड्स फ्रेमवर्क निवडा.',
    sentence: 'वाक्य',
    settings: 'सेटिंग्ज',
    search: 'शोध',
    'search-placeholder': 'शोध',
    'search-placeholder-text': 'शोधा ...',
    'search-error-message': 'शोध शब्द किमान 3 अक्षरे असणे आवश्यक आहे.',
    'search-400-error-message': 'कृपया एक वैध शोध शब्द एंटर करा',
    'search-competency': 'शोध क्षमता',
    'search-standards': 'शोध मानके',
    'select-question-type': 'प्रश्न प्रकार निवडा',
    'select-resource-type': 'स्त्रोत प्रकार निवडा',
    'send-request': 'विनंती पाठवा',
    share: 'शेअर करा',
    'show-correct-answer': 'बरोबर उत्तर दाखवा',
    'show-more-results': 'अधिक परिणाम दर्शवा',
    'show-results': 'परिणाम दाखवा',
    signUp: 'साइन अप करा',
    sortAlphabetical: 'वर्णानुक्रमानुसार क्रमवारी लावा',
    sortAverage: 'सरासरीनुसार क्रमवारी लावा',
    'sort-most-recently': 'सर्वात अलीकडील अपडेट केलेल्यानुसार क्रमवारी लावा',
    state: 'राज्य किंवा प्रदेश',
    'state-territory': 'राज्य / प्रदेश',
    standard: 'मानक',
    standards: 'मानके',
    study: 'अभ्यास',
    'study-now': 'आता अभ्यास करा',
    student: 'विद्यार्थी',
    students: 'विद्यार्थी',
    'student-id': 'विद्यार्थी आयडी (प्रोफाइलवर प्रदर्शित नाही)',
    'studen-id-display':
      'विद्यार्थी आयडी (प्रोफाइलवर प्रदर्शित केला नाही, निनावी मोडमध्ये प्रदर्शित केला आहे)',
    'subject-and-framework': 'विषय आणि फ्रेमवर्क',
    subject: 'विषय',
    submit: 'सबमिट करा',
    'submit-all': 'सर्व सबमिट करा',
    submitAll: 'सर्व सबमिट करा',
    'submit-finish': 'सबमिट करा आणि समाप्त करा',
    swap: 'पुन्हा ऑर्डर करा',
    suggestion: 'सूचना',
    suggestions: 'सूचना',
    'suggested-resources': 'सुचविलेले स्त्रोत',
    support: 'सपोर्ट',
    'start-tour': 'एक फेरफटका मारा',
    'take-me-there': 'मला तेथे घेऊन जा',
    teach: 'शिकवा',
    teacher: 'शिक्षक',
    timeSpent: 'खर्च केलेला वेळ',
    'toggle-dropdown': 'टॉगल ड्रॉपडाउन',
    tools: 'औजारे',
    true: 'खरे',
    type: 'प्रकार',
    title: 'शीर्षक',
    unBookmark: 'बुकमार्क काढा',
    unexpectedError:
      'एक अनपेक्षित त्रुटी आली आणि रिपोर्ट करण्यात आली आहे. असुविधेसाठी आम्ही दिलगीर आहोत!',
    unfollow: 'अन-फॉलो (फॉलो न करणे)',
    unit: 'युनिट',
    'unit-title': 'युनिट शीर्षक',
    unitInitial: 'U',
    unitObj: {
      zero: 'युनिट्स',
      one: 'युनिट',
      other: 'युनिट्स'
    },
    'untitled-course': 'अभ्यासक्रम 1',
    'untitled-lesson': 'शीर्षक नसलेला धडा',
    'untitled-unit': 'शीर्षक नसलेले युनिट',
    'update-thumbnail': 'थंबनेल (लघुचित्र) अपडेट करा',
    'update-photo': 'फोटो अपडेट करा',
    upload: 'अपलोड करा',
    'upload-file': ' फाइल अपलोड करा',
    'upload-thumbnail': ' थंबनेल अपलोड करा',
    'upload-photo': 'फोटो अपलोड करा',
    until: 'Until',
    'remove-photo': 'फोटो काढा',
    'use-case': 'केस वापरा',
    'valid-extensions': 'वैध फाइल एक्सटेन्शन्स हे आहेत: {{extensions}}',
    verified: 'सत्यापित',
    'visibility-tooltip': 'इतरांना दिसत नाही',
    'visibility-available': 'इतरांना दिसते',
    warnings: {
      'on-air-connection-lost':
        'गो-लाईव्ह डॅशबोर्ड्चे कनेक्शन तुटले आहे आणि  पुन्हा ऑटोमॅटिक मधून प्रयत्न करत आहे. हे भाग पाडू शकते आहे, परंतु कृपया आपली स्क्रीन रिफ्रेश करू नका!',
      'character-limit': 'आपण वर्ण मर्यादा गाठली आहे'
    },
    word: 'शब्द',
    yes: 'होय',
    'change-score': 'गुण बदला'
  },
  index: {
    joinUs:
      'आमच्यात सामील व्हा <br/>  शिक्षणा्च्या मानवी ह्क्काचा आदर करा <br/>',
    browseContent: {
      title: 'नमस्कार! आपणास काय हवे आहे?',
      description_1: 'मी शोधत आहे',
      description_2: 'मध्ये शिक्षण साहित्य',
      description_3: 'किंवा',
      button: 'सामग्री ब्राउझ करा',
      footer: {
        description_1: 'आधीपासूनच एक खाते आहे का?',
        description_2: ' येथे.',
        login: 'लॉगइन'
      },
      grades_missing_message: 'कृपया ग्रेड आणि विषय निवडा.',
      subjects_missing_message: 'कृपया विषय निवडा.'
    },
    gettingStarted: {
      title: 'गूरुने  सुरुवात करणे',
      toolkit: {
        title: 'प्रारंभ करण्यासाठी टूलकिट',
        description:
          'गूरू मध्ये स्वागत आहे! आपण गूरुसह काय करू शकता हे जाणून घेण्यासाठी हा स्त्रोत तपासा आणि त्वरीत प्रारंभ करा.'
      },
      classroom: {
        title: 'वर्गातील कथा',
        description:
          ' त्यांच्या वर्गात गूरुने बदल केला आहे असे सांगणार्‍या शिक्षकांच्या कथांमधून उदाहरणासह शिका'
      },
      events: {
        title: 'आमच्या इव्हेंट तपासा!',
        description:
          'तुम्ही गोरूसह प्रारंभ करण्यास आपल्याला मदत करण्यासाठी  आम्ही विनामूल्य वेबिनार आणि ट्रेनिंग ऑफर करतो'
      }
    },
    empowerStudents: {
      title: ' त्यांचे मार्ग जाणून घेण्यासाठी विद्यार्थ्यांना सक्षम करा',
      find: 'शोधणे',
      remix: 'रीमिक्स',
      share: 'शेअर करा',
      monitor: 'मॉनिटर'
    },
    findDescription:
      'शिक्षकांनी बनवलेले हजारो के -12 संग्रह ब्राउझ करा किंवा 16m संसाधनांवर शोधा',
    remixDescription:
      'आपल्या विद्यार्थ्यांना गरजा पूर्ण करण्यासाठी  रीमिक्स संग्रहित करा आणि सामग्री सानुकूलित करा',
    shareDescription:
      'गोरु वर्गांच्या माध्यमातून संग्रह विद्यार्थ्यांसह  शेअर करा. प्रवेशासाठी लॉगिन आवश्यक नाही',
    monitorDescription:
      'प्रत्यक्ष वेळात(रियल टाईम) हस्तक्षेप करण्यासाठी आपल्या विद्यार्थ्यांचा सहभाग आणि प्रगतीचे मापन करा.',
    freeAndOpen: {
      title: 'मुक्त आणि खुले. <br/> नेहमी.',
      description:
        'शिक्षण हा मानवी हक्क  आहे असा आमचा विश्वास आहे.  गोोरू नेहमीच मोफत असेल व जगभरातील शिक्षण तज्ञ आणि विद्यार्थ्यांसाठी सहाय्य करेल',
      button: 'आमच्या दृष्टीकोनबद्दल अधिक जाणून घ्या'
    }
  },
  class: {
    info: {
      'class-info': 'वर्गाबद्दल माहिती',
      teachers: 'शिक्षक',
      students: 'विद्यार्थी',
      subject: 'विषय',
      grade: 'ग्रेड',
      description: 'वर्णन',
      'edit-info': 'माहिती संपादित करा',
      'share-class': 'सामायिक वर्ग',
      'invite-co-teachers': 'सह-शिक्षकांना आमंत्रित करा',
      'add-students': 'विद्यार्थी जोडा',
      'class-code': 'वर्ग (क्लासरूम) कोड',
      delete: 'वर्ग(क्लासरूम)  हटवा'
    },
    edit: {
      'assigned-course': 'नियुक्त कोर्स',
      'basic-info': 'मुलभूत माहिती',
      'class-name': 'वर्गाचे नाव',
      'class-greetings': 'वर्गातील घोषणा',
      'class-greetings-placeholder':
        'आपल्या विद्यार्थ्यांना अभिवादन करा, त्यांना प्रवृत्त करा, किंवा घोषणा करा इ.',
      'class-minscore': 'ट्रॉफीसाठी कमीत कमी गुण (1-100%)',
      'course-map': 'पाठ्यक्रम नकाशा',
      'edit-class': 'कक्षा सेटिंग्ज संपादित करा'
    },
    overview: {
      title: 'पाठ्यक्रम नकाशा',
      locate: 'मला शोधा',
      'edit-content': 'सामग्री संपादित करा',
      'add-to-daily-class-activities':
        'वर्गाच्या दैनंदिन कामकाजामध्ये सामील करा',
      'assigned-course': 'आपका नियुक्त पाठ्यक्रम',
      'pre-study-title': 'अपने पाठ्यक्रम के लिए पूर्व-अध्ययन',
      'course-map': {
        'rescope-toggle': 'पूर्ण कोर्स नकाशा दर्शवा',
        'rescope-info':
          'हा कोर्स विशेषतः गणित पाया अभ्यासक्रम आपल्याकडून वैयक्तिकृत केला गेला आहे. मूळ कोर्स पाहण्यासाठी, हे वैशिष्ट्य सक्षम करा',
        'custom-msg':
          'आम्ही आपल्या प्रवीणताच्या आधारावर विशेषतः आपल्यासाठी हा कोर्स वैयक्तिकृत करत आहोत. वैयक्तिकृत अभ्यासक्रम नकाशा पाहण्यासाठी थोड्या वेळाने परत तपासा.',
        'route0-bannerdesc':
          'आपल्या पात्रतेच्या प्रोफाइलनुसार, काही सक्षमता आहेत ज्या आपल्याला मास्टर करावे लागतात ज्यायोगे आपण या मार्गात चांगले कार्य करू शकता. आमच्याकडे असा एक मार्ग आहे जो आपण या सक्षमतांचे पालन करण्यास आम्ही शिफारस करतो. तपशील पाहण्यासाठी येथे क्लिक करा.'
      }
    },
    analytics: {
      performance: {
        title: 'कामगिरी पहा',
        'better-experience-message':
          'चांगल्या गोरु अनुभवासाठी, टॅब्लेट किंवा डेस्कटॉपमध्ये पूर्ण वर्गाचे विश्लेषण पहा.',
        'no-content':
          'आपल्या विद्यार्थ्यांनी अद्याप अभ्यासक्रम अभ्यासणे सुरु केले नाही',
        actions: {
          share: 'शेअर करा',
          edit: 'सामग्री संपादित करा',
          download: 'डाऊनलोड',
          fullScreen: 'पूर्ण स्क्रीन पहा',
          exitFullScreen: 'पूर्ण स्क्रीनमधून निर्गमन करा',
          assessment: 'मूल्यांकन पहा',
          collection: 'संकलन पहा',
          both: 'दोन्ही पहा'
        },
        teacher: {
          metricsTable: {
            average: 'सरासरी',
            'class-average': 'वर्ग सरासरी'
          }
        },
        'grade-items': 'श्रेणीसाठी आयटम',
        'no-grade-items': 'असे दिसते की आपण सगळे पकडले आहात!',
        'gru-grade-items': {
          students: {
            zero: '{{count}} विद्यार्थी',
            one: '{{count}} विद्यार्थी',
            other: '{{count}} विद्यार्थी',
            'not-started': 'सुरु नाही'
          }
        }
      },
      mastery: {
        title: 'महत्ता पहा'
      }
    },
    'quick-start': {
      title: 'या कक्षामध्ये सामग्री नियुक्त करा.',
      'new-course': 'एक नवीन कोर्स क्विकर्ट करा',
      'new-course-desc':
        'एक नवीन अभ्यासक्रम, संग्रह किंवा आकलन तयार करून प्रारंभ करा',
      course: 'नवीन अभ्यासक्रम',
      'new-collection': 'नविन संग्रह',
      'new-assessment': 'नवीन मूल्यांकन',
      'remix-a-sample': 'एक नमुना रीमिक्स करा',
      'add-existing-course': 'आपल्या लायब्ररीमधून एक कोर्स जोडा',
      'existing-course-desc': 'एक वर्ग प्रारंभ करण्यासाठी जलद मार्ग',
      'choose-course': 'कोर्स निवडा',
      'remix-from-course': 'एक वैशिष्ट्यपूर्ण अभ्यासक्रम रीमिक्स करा',
      'featured-course': 'वैशिष्ट्यीकृत अभ्यासक्रम पहा',
      'remix-desc':
        'कॉपी करा आणि आपल्या विद्यार्थ्यांसाठी वैशिष्ट्यीकृत अभ्यासक्रम सानुकूल करा',
      'browse-content': 'मजकूर शोधा'
    }
  },
  classes: {
    classesJoined: ' मी सामील झालो आहे ते वर्ग',
    classesTaught: 'मी शिकवतो ते वर्ग',
    noClassesJoined: 'आपण कोणत्याही वर्गांमध्ये सामील झालेले नाहीत',
    noClassesTaught: 'आपल्याकडे कोणतेही तयार केलेले वर्ग नाहीत'
  },
  content: {
    assessments: {
      edit: {
        'best-practices':
          '<p> एक मूल्नयांक्न म्हणजे मूल्यांकन केलेल्या अशा प्रश्नांचा संच जो आप आणि आपले विद्यार्थी  समज व कामगिरीवर लक्ष ठेवण्यासाठीवापरू शकाल. </p> <p> आपल्या मूल्यांकना मध्ये विविध प्रश्नांचे प्रकार वापरा  (एसबीएसीवर आधारित) ज्यांच्या द्वारी विद्यार्थी त्यांची समज   विविध प्रकारे  प्रदर्शित करू शकतील. आम्ही प्रत्येक प्रश्न मानक, सूक्ष्म मानके आणि Webb\'s Depth of Knowledge टॅग करण्याची शिफारस करतो. </p>'
      }
    },
    classes: {
      create: {
        title: 'वर्ग तयार करा',
        content: 'जिथे विद्यार्थी आशयासह व्यस्त असतात.',
        'class-name-input': 'आपल्या वर्गाला नाव द्या',
        'condition-prompt': 'विद्यार्थी आपल्या वर्गात कसे सामील होतील?',
        'condition-prompt-code': 'वर्गाचा कोड असणारा कोणीही',
        'condition-prompt-invite': 'केवळ आमंत्रिततच',
        'get-started': 'सुरु करा'
      },
      join: {
        title: 'नवीन वर्गात सामील व्हा',
        'join-a-classroom': 'वर्गात सामील व्हा',
        content: 'जिथे प्रवास सुरु होतो',
        'not-now': 'आता नाही',
        'class-code-input': 'वर्गाचा कोड एंटर करा',
        'class-not-found':
          'वर्ग सापडला नाही.. आपण योग्य वर्ग कोड  एंटर केल्याची खात्री करा',
        'invalid-code': 'अवैध वर्ग कोड',
        'join-not-allowed':
          'आपण जो वर्ग सामील करण्याचा प्रयत्न करीत आहात तो आता सक्रिय नाही. कृपया आपल्या शिक्षकांशी योग्य वर्ग कोडसाठी संपर्क साधा.',
        'already-member': 'आपण आधीच या वर्गाचे सदस्य आहात',
        'join-class': 'क्लासरूममध्ये सामील व्हा',
        'terms-and-conditions':
          'जॉइन क्लासारूम या वर क्लिक करून, मी या वर्गाच्या  या गोरू कक्षामध्ये अभ्यास करण्याने निर्माण झालेले माझे मूल्यमापन आणि संकलित प्रगती डेटा शिक्षकांबरोबर शेअर करण्यास सहमत आहे.'
      }
    },
    collections: {
      edit: {
        'assign-to-course': 'पाठ्यक्रमात द्या',
        'best-practices':
          '<p> विद्यार्थी संकलन स्तरावर आपल्या सामग्रीसह संवाद साधतात. शिक्षणाचे संकलन तयार करताना, शिकण्याची उद्दिष्टे समाविष्ट करणे सुनिश्चित करा आणि विद्यार्थ्यांसमोर सिध्दांत विविध स्त्रोतांद्वारे प्रस्तुत करण्याचा विचार करा. </p> <p> संकल्पना तयार करण्यासाठी संसाधनांच्या क्रमवारीचा वापर करा. एका संकलन माध्यमातून प्रगती तार्किक पद्धतीने प्रवाहित झाली पाहिजे आणि गरज भासल्यास  अपेक्षित श्रोत्यांना  समजूतीच्या/आत्मसात करण्याच्या एका सर्व सामान्य स्तरावरून आणखी क्लीष्ट स्तरावर घेऊन जा किंवा विद्यार्थ्यांना अप्र्याप्त पणे अन्वेषण करू द्या   . </p> <p> मार्आगावर समजले आहे का हे जाणण्यासाठी चाचण्या घ्या आणि त्या साठी आमच्या गूरु प्र्श्नांचा वा इतर संभषकांचा वापर करा.  आम्ही संग्रहातील उद्दीष्टे पूर्ण करण्यासाठी आणि प्रत्येक स्रोताची भूमिका आणि उद्देश सुनिश्चित करण्यासाठी पुरेसे स्त्रोत आणि / किंवा पुरेशी विविध संसाधने शिफारस करतो. </p>'
      }
    },
    courses: {
      edit: {
        'assign-to-class': 'वर्गाकडे सोपवा',
        'best-practices':
          '<p> एक पाठ्यक्रम  एक फोल्डर आहे जोआपल्याला आपल्या शिकण्याच्या सामग्रीस एकके आणि धडे बनविण्यास मदत करते. अभ्यासक्रम तयार करताना आपण संबोधित करत असलेले महत्वाचे प्रश्न, शिकण्याच्या उद्देश आणि आपल्या सामग्रीचे संघटन यावर विचार करा. </p> <p> आपण आपल्या विद्यार्थी जनतेसाठी पाठवू शकता (उदाहरणार्थ, तुम्ही तुमची युनिट्स(एकके) कालानुक्रमे किंवा  विषयानुसार, किंवा मानकानुसार अनुक्रमित करू शकता. </p>',
        information: {
          'course-title': 'अभ्यासक्रम शीर्षक',
          description: 'वर्णन'
        }
      }
    },
    questions: {
      edit: {
        'add-to': 'जोडू',
        'best-practices':
          '<p> एक प्रश्न हा  असा एक स्रोत आहे ज्याचे विद्यार्थ्याने उत्तर देणे आवश्यक आहे आणि आम्ही विविध प्रकारचे प्रश्न देऊ करतो जे आपल्या विद्यार्थ्यांना एसएबीएसी, पीएआर्सीसी आणि इतर मूल्यांकनांवर दिसतील. </p> <p> प्रश्नांचे प्रकार  बदलत्या स्वरूपाचे करण्याचा  विचार करा आणि आपल्या विद्यार्थ्यांना अशा प्रकारच्या प्रश्नांना सामोरे करा आणि ज्ञान प्रदस्र्हित करण्यासाठी विविध प्रकारच्या फॉर्मॆट्सच्या वापराबद्दल विचार करा  . </p> <p> आपल्या प्रश्नांना मानदंड, सूक्ष्म मानके आणि वेबबॉग्जच्या ज्ञानाच्या गहनतेवर टॅग करा. आपण शिक्षक डॅशबोर्ड द्वारे आपले विद्यार्थी प्रश्नांशी कसे परस्परसंवाद साधू शकता ते पाहू शकता. </p>',
        information: {
          'question-title': 'प्रश्न शीर्षक',
          'question-type': 'प्रश्न प्रकार'
        },
        builder: {
          'add-answer-choice': '+ उत्तर निवडी जोडा',
          'add-hint': 'सूचना जोडा',
          'add-explanation': 'स्पष्टीकरण जोडा',
          answer: 'उत्तर',
          'answer-instructions': {
            FIB: 'उत्तर आणि स्पष्टीकरण यासाठी 5 इशारे (हिंट्स)जोडा.',
            HS_IMG:
              'आपण दहा पर्यंत उत्तर प्रतिमा जोडू शकता  आणि एक किंवा अधिक बरोबर उत्तरे निवडू शकता',
            HS_TXT:
              'आपण दहा उत्तर निवडी जोडू शकता आणि एक किंवा अधिक बरोबर उत्तरे निवडू शकता',
            HT_HL_ST:
              'जसे आपण प्रश्न लिहिता, हायलाइट केलेले वाक्य दर्शविण्यासाठी ब्रॅकेटचा वापर करा. एका ब्रॅकेटमध्ये फक्त एक वाक्य असू शकते,ब्रॅकेट मधील काल वापरा उदाहरणार्थ, पहिल्या छोट्या डुक्कराने आपले घर गवताने बांधले   [मोठ्ठ्या वाईट लांडग्याने घर उडवून लावले] दुसर्‍या डुक्कराने त्याचे घर लाकडाने बांधले. वर्ण मर्यादा: 5000',
            HT_HL_WD:
              'जसे आपण प्रश्न लिहिता, हायलाइट केलेल्या शब्दांसाठी ब्रॅकेटचा वापर करा. एका कंसात केवळ एक शब्द असू शकतो. उदाहरणार्थ, [मोठ्या] खराब लांडग्याने घर खाली [उडवून] लावले. वर्ण मर्यादा: 5000',
            HT_RO:
              'आपण योग्य क्रमाने दहा उत्तर पर्याय जोडू शकता. हा क्रम विद्यार्थ्यांसाठी पुढे मागे केला जाईल.',
            MA:
              'आपण दहा उत्तरे, एक प्रतिमा, एक स्पष्टीकरण आणि पाच पर्यंत हिंट्स जोडू शकता.',
            MC:
              'आपण दहा उत्तर निवडी जोडू शकता आणि एक बरोबर उत्तर दर्शवू शकता. वर्ण मर्यादा: 200',
            OE: 'योग्य प्रतिसाद लिहा. वर्ण मर्यादा: 5000',
            'T/F': 'योग्य उत्तर निवडा.'
          },
          'question-instructions': {
            FIB:
              'जसे आपण प्रश्न लिहिता, आपल्या रिक्त-जागा -भरा उत्तरे भरण्यासाठी ब्रॅकेटचा वापर करा. उदाहरणार्थ: "मोठ्या दुष्ट [लांडग्याने] [घर] उडवून दिले." आपण  एक प्रतिमा देखील जोडू शकता',
            HS_TXT: 'आपला प्रश्न लिहा.',
            HS_IMG: 'आपला प्रश्न लिहा.',
            HT_RO: 'आपला प्रश्न लिहा.',
            HT_HL: 'आपला प्रश्न प्रॉम्प्ट लिहा.',
            MC: 'आपला प्रश्न लिहा.',
            MA: 'आपला प्रश्न लिहा.',
            OE: 'आपला प्रश्न लिहा.',
            'T/F': 'आपला प्रश्न लिहा.'
          },
          'submission-format': {
            title: 'विद्यार्थी सबमिशन फॉर्मेट',
            'answer-type': {
              'text-box': 'मजकूर बॉक्स'
            }
          },
          'feedback-grading': {
            title: 'अभिप्राय आणि ग्रेडिंग',
            'from-existing-rubric': 'विद्यमान रुब्रिक कडून',
            scoring: 'स्कोअरिंग',
            'maximum-points': 'जास्तीत जास्त गुण',
            increment: 'वाढ',
            'rubric-error': 'कृपया एक रुब्रिक जोडा'
          }
        }
      }
    },
    modals: {
      'delete-bookmark': {
        confirmation: 'आपण हा  {{type}} अनबुकमार्क करू इच्छिता?',
        'delete-error':
          'अरेरे! या {{type}} अनबुकमार्क करू शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा'
      },
      'remove-class-activity': {
        confirmation:
          'आपल्याला खात्री आहे की आपण {{type}} आपल्या दैनिक वर्ग कार्यातून काढून टाकू इच्छिता?',
        'delete-error':
          'अरेरे! सध्या हे {{type}} काढून शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा'
      },
      'delete-class': {
        legend: 'आपण  आता आपला वर्ग हटवण्याच्या (डिलीट) तयारीत आहात.',
        'student-access': 'विद्यार्थी वर्गास ॲक्सेस करू शकणार नाहीत',
        'student-data-deleted': 'सर्व विद्यार्थी डेटा हटविला (डिलिट केला) जाईल'
      },
      'archive-class': {
        title: ' वर्ग संग्रहित करा',
        legend: 'आपण आता आपला वर्ग संग्रहित करण्याच्या तयारीत आहात',
        'links-not-accessible':
          'सर्व शेअर्ड लिंक्स ॲक्सेस न करण्याजोग्या होतील',
        'students-no-access': 'विद्यार्थी वर्ग ॲक्सेस  करू शकणार नाहीत',
        'not-add-students': 'आपण वर्गात आणखी विद्यार्थी जोडू शकणार नाही',
        confirmation: 'आपल्याला खात्री आहे की आपण संग्रहित करू इच्छिता?'
      },
      'delete-content': {
        legend: 'आपण हटवण्याच्या(डिलिट करण्याच्या) तयारीत आहात',
        'content-legend':
          '<span> {{प्रकार}} </span> {{index}} - {{title}} कडून {{parentname}}',
        'content-legend-header': '{{parentname}} पासून {{title}}',
        'delete-warning': 'या {{type}} मधील सर्व कंटेंट (आशय) हटवला जाईल',
        'delete-error':
          'अरेरे! आत्ता {{type}} हटवू शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
        confirmation:
          'आपल्याला खात्री आहे की आपण सुरू ठेवू इच्छिता? कृपया खाली "हटवा/डिलीट" टाइप करा आणि "हटवा/डिलीट" क्लिक करा.'
      },
      'delete-resource': {
        legend:
          'आपण कायमचे <b> {{title}} </b> हटवू /डिलीट करू इच्छिता याची पुष्टी करा',
        'delete-warning': 'या {{type}} मधील सर्व कंटेंट (आशय) हटवला जाईल',
        'delete-error':
          'अरेरे! आत्ता {{type}} हटवू शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
        confirmation:
          'आपल्याला खात्री आहे की आपण सुरू ठेवू इच्छिता? कृपया "कायमचे हटवा/डिलीट" वर क्लिक करा.',
        'first-check':
          'हे कायमचे हटविले /डिलीट केले गेले आहे आणि पूर्ववत केले जाऊ शकत नाही',
        'second-check':
          'आपल्या संकलनातील आणि समुदायाच्या इतर युजर्सकडील कोणत्याही संकलनातील या स्रोताची कॉपी हटविली/डिलीट केली जाईल'
      },
      'delete-rubric': {
        legend:
          'आपण कायमचे <b> {{title}} </b> हटवू /डिलीट करू इच्छिता याची पुष्टी करा',
        'delete-warning': 'या रुब्रिक मधील ्कंटेंट हटवला जाईल',
        'delete-error':
          'अरेरे! आत्ताच रुब्रिक डिलीट करू शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
        confirmation:
          'आपल्याला खात्री आहे की आपण सुरू ठेवू इच्छिता? कृपया "कायमचे हटवा/डिलीट" वर क्लिक करा.',
        'first-check':
          'हे कायमचे हटविले /डिलीट केले गेले आहे आणि पूर्ववत केले जाऊ शकत नाही'
      },
      'remove-content': {
        legend:
          'आपण {{parentname}} </b> मधून <b> {{title}} </b> काढून टाकणार आहात </b>',
        'remove-error':
          'अरेरे! आत्ता {{type}} काढू शकलो नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
        confirmation:
          'आपल्याला खात्री आहे की आपण सुरू ठेवू इच्छिता? कृपया खाली "काढा/रिमूव्ह" टाइप करा आणि "काढा/रिमूव्ह" क्लिक करा.'
      },
      'remove-student': {
        title: 'विद्यार्थी काढा आणि त्यांचा डेटा  डिलीट करा',
        legend:
          'आपण या वर्गातून {{studentname}} काढून टाकणार आहात आणि त्यांचा सर्व डेटा डिलीट करणार आहात.',
        'data-inaccessible':
          'त्यांचा सर्व डेटा डिलीट केला जाईल आणि तुम्हाला किंवा  त्यांना ॲक्सेस करण्यायोग्य नसेल',
        'classroom-access': 'त्यांना वर्ग किंवा कंटेंटला ॲक्सेस असणार नाही',
        'data-lost':
          'जर ते पुन्हा क्लासमध्ये सामील होतील, तर मागील सर्व डेटा गमावलेला असेल',
        'remove-error':
          'अरेरे! आत्ताच हा विद्यार्थी काढता येत नाही. कृपया लवकरच पुन्हा प्रयत्न करा',
        confirmation:
          'आपल्याला खात्री आहे की आपण सुरू ठेवू इच्छिता? कृपया खाली "हटवा/डिलीट" टाइप करा आणि "हटवा/डिलीट" क्लिक करा.'
      },
      'quick-remove-content': {
        legend:
          'आपण <b> {{title}} </b> <b> {{parentname}} </b> मधून काढू इच्छिता याची पुष्टी करा.'
      },
      'quick-delete-content': {
        legend:
          'आपण निश्चितपणे <b> {{title}} </b> <b> <b> {{parentname}} </b> मधून डिलीट करू इच्छिता याची पुष्टी करा.',
        delete: 'कायमचे हटवा/डिलीट करा'
      }
    },
    resources: {
      edit: {
        'best-practices':
          '<p> संसाधने विविध स्वरुपामध्ये मल्टिमिडिया सामग्री आहेत उदा व्हिडिओ, परस्परसंवाद, वेबसाइट, प्रतिमा, Google डॉक्स, आणि बरेच काही. सर्जनशील व्हा आणि आपल्या स्वत: च्या स्त्रोतांचा वापर करा किंवा "स्त्रोतसंशोधक" बना आणि गोरुमध्ये आमचा भरपूर पुरवठा शोधा. </p> <p> आपल्या विद्यार्थ्यांना व्यस्त ठेवण्यासाठी विविध प्रकारचे संसाधन वापरा आणि  वर्णन व विवरण समाविष्ट करा जेणेकरुन आपण  आपल्या विद्यार्थ्यांना स्त्रोताद्वारे मार्गदर्शन करण्यास मदत करू शकता. </p> <p> आम्ही प्रत्येक प्रश्नासाठी मानक, सूक्ष्म-मानके आणि 21 व्या शतकातील कौशल्यांचे टॅगिंग करण्याची शिफारस करतो. आपण शिक्षक डॅशबोर्डद्वारे आपले विद्यार्थी संसाधनांसह परस्परसंवाद कसा करतात हे पाहू शकता. </p>',
        'placeholder-message':
          'येथे एक संसाधन जोडा <span> येथे पूर्वावलोकन करा </span>',
        'not-implemented':
          'स्त्रोत फॉर्मॅट पूर्वावलोकन <span> अद्याप लागू नाही. </span>',
        information: {
          'im-publisher': 'मी प्रकाशक आहे',
          'select-a-license': 'कृपया परवाना निवडा'
        }
      }
    }
  },
  user: {
    'active-classrooms': 'सक्रिय वर्ग',
    'archived-classrooms': 'संग्रहित कक्षा',
    classrooms: 'वर्ग',
    rgo: 'RGO',
    'create-class': 'वर्ग तयार करा',
    hello: 'नमस्कार {{name}}!',
    'independent-learning': 'स्वतंत्र शिक्षण',
    'join-class': 'क्लासरूममध्ये सामील व्हा',
    'joined-classes': {
      zero: 'आपण सध्या {{count}} वर्गांमध्ये नोंदणी केली आहे',
      one: 'आपण सध्या 1 वर्गामध्ये नाव नोंदवले आहे',
      other: 'आपण सध्या {{count}} वर्गांमध्ये नोंदणी केली आहे'
    },
    'my-current-classes': 'माझे वर्तमान वर्ग',
    'manage-goals': 'गोल व्यवस्थापित करा',
    'my-classes': 'माझे वर्ग',
    'teaching-classes': {
      zero: 'आपण सध्या {{count}} वर्ग शिकवत आहात',
      one: 'आपण सध्या 1   वर्ग शिकवत आहात',
      other: 'आपण सध्या {{count}} वर्ग शिकवत आहात'
    }
  },
  'student-landing': {
    announcement: 'घोषणा',
    'browse-featured-courses': 'आमचे वैशिष्ट्यीकृत अभ्यासक्रम ब्राउझ करा',
    'browse-our': 'आमच्या ब्राउझ करा',
    'class-code': 'वर्ग कोड',
    'featured-courses': 'प्रदर्शित अभ्यासक्रम',
    class: {
      'assigned-course': 'नियुक्त कोर्स',
      'back-to': 'क्लासरूम कडे परत',
      'no-course': 'या वर्गात  संबंधित अभ्यासक्रम नाही.',
      'no-course-assigned': 'कोणताही कोर्स सोपवला नाही',
      'back-to-independent': 'स्वतंत्र शिक्षणाकडे परत',
      report: 'अहवाल',
      performance: 'कामगिरी',
      'course-map': 'पाठ्यक्रम नकाशा',
      unit: 'युनिट',
      lesson: 'धडा',
      'class-activities': 'दैनंदिन वर्ग कृती',
      'class-activities-tab': {
        today: 'आज',
        'past-activities': 'मागील क्रियाकलाप'
      },
      'my-report': 'माझा रिपो्र्ट',
      'my-location': 'माझा स्थान',
      'my-proficiency': 'My Proficiency'
    },
    course: {
      'to-report': 'वापर सारांश',
      'total-time-spent': 'खर्च केलेला एकूण वेळ'
    },
    'current-activity': 'वर्तमान कार्य',
    'resume-current-activity': 'वर्तमान कार्य पुन्हा सुरू करा',
    'last-activity': 'शेवटची क्रिया',
    'start-studying': 'अभ्यास सुरू करा',
    'not-available': '-NA-',
    'join-classroom':
      'शिकण्यास प्रारंभ करण्यासाठी आपल्या शिक्षकांच्या वर्गात सामील व्हा',
    learn: 'गोरु वर्गातून  शिका',
    'my-performance': {
      activity: 'कार्य/कृती',
      activities: {
        study: 'अभ्यास'
      },
      assessments: 'मूल्यांकन',
      collections: 'संग्रह',
      filter: 'फिल्टर',
      'primary-text':
        'आपण विश्लेषण करू इच्छिता त्या गोष्टी निवडा आणि आम्ही एक  तुमच्यासाठेच तयार केलेला कामगिरी अहवाल तयार करू.',
      subject: 'विषय',
      title: 'आपल्या कामगिरीचे विश्लेषण करा',
      'time-period': 'कालावधी',
      'update-report': 'रिपोर्ट अपडेट करा'
    },
    'study-player': 'अभ्यास खेळाडू',
    'my-study': 'माझे अभ्यास',
    'no-classrooms':
      'आपण अद्याप कोणत्याही वर्गांमध्ये सामील झालेले नाही. आपल्या शिक्षकांचे वर्ग जोडण्यासाठी "कक्षामध्ये </br> सामील व्हा" वर क्लिक करा आपण लायब्ररी टॅब अंतर्गत सुध्दा वैशिष्ट्यीकृत कोर्स शोधू शकता.',
    'no-content-classrooms':
      'या वर्गात सध्या कोणताही कंटेंटंत सामग्री उपलब्ध नाही',
    welcome: 'गोवरुमध्ये स्वागत आहे',
    'no-course-assigned':
      'अद्याप या वर्गात कोणताही कोर्स नियुक्त केला गेला नाही. कृपया आपल्या शिक्षकांशी संपर्क साधा.'
  },
  'student-independent-learning': {
    'show-more': 'अजून दाखवा',
    'show-less': 'कमी दर्शवा',
    'no-courses':
      'जेव्हा आपण आपल्या बुकर्माड अभ्यासक्रमांचा शोध सुरू करता, ते इथे दिसतील',
    'no-collections':
      'जेव्हा आपण आपले बुकमार्क संग्रहित करणे प्रारंभ करता तेव्हा ते येथे दिसून येतील.',
    'no-assessments':
      'जेव्हा आपण आपले बुकमार्क केलेले मूल्यमापन एक्सप्लोर करणे सुरू करता, तेव्हा ते येथे दिसून येतील.',
    'no-independent-results': 'काहीतरी नवीन शिकण्यासाठी लायब्ररी एक्सप्लोर करा',
    'no-bookmarks':
      'जेव्हा आपण बुकमार्किंग अभ्यासक्रम, संकलन आणि मूल्यमापन प्रारंभ करता तेव्हा ते येथे दिसून येतील.',
    'add-bookmark': 'बुकमार्क जोडा'
  },
  'teacher-landing': {
    'latest-announcement': 'नवीनतम घोषणा',
    'latest-assessment': 'नवीनतम मूल्यांकन',
    'create-classroom':
      'वर्ग तयार करा, सामग्री नियुक्त करा, विद्यार्थ्यांना आमंत्रित करा',
    'dca-create-info':
      'दैनिक चिन्ह क्रिया तयार करण्यासाठी खालील चिन्हावर क्लिक करा आणि गुरू ग्रंथालयातील सामग्री शोधा. आपण अभ्यासक्रमाच्या नकाशावर क्लिक करून आपल्या अभ्यासक्रमाच्या नकाशातून दररोज श्रेणी क्रियाकलाप देखील सामग्री जोडू शकता.',
    'schedule-for-later': 'नंतरसाठी शेड्यूल',
    'teach-this-activity-later': 'नंतर dca येथे या क्रिया शिकवा',
    'schedule-dca-instruction-1': 'ही गतिविधी शिकवण्याची पुढील तारीख निवडा.',
    'schedule-dca-instruction-2':
      'ही क्रिया निवडलेल्या तारखेसाठी dca ​​येथे दिसेल.',
    'navigator-banner': {
      title: 'गणित साठी नेव्हिगेटर',
      description:
        'शिक्षण तंत्रज्ञानासाठी या जीपीएसचा वापर करून, आम्ही गणितासाठी नेव्हिगेटर तयार केले आहे जेणेकरुन प्रत्येक विद्यार्थी आत्मविश्वास मिळवू शकेल आणि गणितातील त्यांच्या शिक्षणास वेग वाढवू शकेल. <br/> गणितासाठी नेव्हिगेटर अभ्यासक्रमांचा अभ्यासक्रम आहे ज्यायोगे ग्रेड 2-12 मधील सर्व गणित संकल्पनांचा समावेश असेल. विद्यार्थ्यांना त्यांचे वर्तमान ज्ञान तयार करण्यासाठी डिझाइन केलेल्या वैयक्तिकृत मार्गाने मार्गक्रमण केले जाते आणि त्याचप्रमाणे त्यांच्या समजानुसार अंतर भरते. या व्यापक आणि वैयक्तिकृत शिक्षणाच्या अनुभवाद्वारे, प्रत्येक विद्यार्थी अधिक प्रगत गणितासाठी पूर्णपणे तयार होऊ शकतो.',
      join: 'डेमो क्लासमध्ये सामील व्हा',
      'success-message':
        'आपण नेव्हिगेटर क्लासचे सह-शिक्षक म्हणून यशस्वीरित्या सामील झाले',
      'error-message': 'वर्ग सामील सह समस्या'
    },
    class: {
      manage: 'व्यवस्थापित करा',
      reports: 'अहवाल',
      'daily-activites': 'दररोज सक्रिय',
      courses: 'अर्थातच',
      'back-to': 'क्लासरूम कडे परत',
      'back-to-archived': 'संग्रहित कक्षांमध्ये परत',
      'class-management': 'वर्ग व्यवस्थापन',
      'student-proficiency': 'विद्यार्थी प्रवीणता',
      'performance-overview': 'Performance Overview',
      atc: 'शीर्ष द़ृश्य',
      'class-management-tab': {
        actions: 'क्रिया',
        'assessment-min-score': 'ट्रॉफीसाठी कमीत कमी गुण',
        'assigned-course': 'नियुक्त कोर्स',
        archive: 'संग्रह',
        'archive-class': 'संग्रह वर्ग',
        'archive-classroom': 'संग्रह वर्ग',
        'attend-class-with-code': 'कोडसह वर्गात हजर रहा',
        'class-information': 'वर्ग माहिती',
        'class-name': 'वर्गाचे नाव',
        'class-code': 'वर्ग कोड',
        'click-to-copy-class-code': 'वर्ग कोड कॉपी करण्यासाठी क्लिक करा',
        'course-information': 'अभ्यासक्रम माहिती',
        delete: 'हटवा',
        'delete-class': 'वर्ग हटवा',
        'download-roster': 'रोस्टर डाउनलोड करा',
        edit: 'संपादित करा',
        'email-address': 'ईमेल पत्ता',
        'first-name': 'पहिले नाव',
        'import-roster': 'आयात रोस्टर',
        'last-name': 'आडनाव',
        message: 'संदेश',
        performance: 'कामगिरी',
        students: 'विद्यार्थी',
        'student-name': 'विद्यार्थी नाव',
        'student-id': 'विद्यार्थी ओळखपत्र',
        teachers: 'शिक्षक',
        'view-report': 'अहवाल पहा',
        'course-null': 'The classroom has no course assigned yet.',
        'course-subject-null':
          'वर्गासाठी निवडलेला कोर्स योग्य विषयाशी जोडला गेला नाही.',
        'students-null':
          'त्यांना आपल्या वर्गात प्रवेश करण्यासाठी वर्ग कोड वापरा.'
      },
      'students-tab': {
        'last-name': 'आडनाव',
        'first-name': 'पहिले नाव',
        performance: 'कामगिरी',
        proficiency: 'प्रवीणता',
        location: 'स्थान',
        'currently-studying': 'सध्या अभ्यास करत आहे',
        'student-id': 'विद्यार्थी ओळखपत्र',
        remove: 'काढा',
        mastered: 'प्रभुत्व मिळवले आहे',
        'in-progress': 'प्रगतीपथावर',
        'not-started': 'सुरु झालेले नाही',
        'course-coverage': 'अभ्यासक्रमाची व्याप्ती',
        'class-statistics': 'वर्गाची आकडेवारी',
        'proficiency-in': 'मध्ये प्रभुत्व',
        'data-not-available': 'माहिती उपलब्ध नाही',
        'course-coverage-label':
          'वर्गातील सर्व विद्यार्थ्यांनी आत्मसात केलेल्या क्षमतांचा आढावा',
        'error-message':
          'या वर्गामध्ये सलंग्न अभ्यासक्रम किंवा विद्यार्थी नाहीत. जेव्हा वर्गात अभ्यासक्रम तसेच त्यातील विद्यार्थी भरले जातील तेव्हा वर्गाचा क्षमता अहवाल येथे दाखवला जाईल.'
      },
      'atc-view': {
        'domains-reviewed': 'समी़क्षा किये जाने वाले क्षेत्र',
        'class-activities-completed': 'कक्षा में आयोजित गतिविधियाँ',
        'class-activities-pending':
          'कक्षा में आयोजित की जाने वाली आगामी  गतिविधियाँ',
        'show-all': 'सभी दिखाएं ',
        collapse: 'समेटें',
        'total-competencies-gained': 'कुल हासिल दक्षताएँ'
      },
      'class-activities': 'दैनिक वर्ग कृती',
      'offline-class-report': {
        'class-report': 'वर्ग अहवाल',
        'activity-report': 'कृती अहवाल',
        'conducted-on': 'चालू',
        'not-started': 'सुरु केली नाही'
      },
      'back-to-class-activities': 'परत दैनंदिन कामकाजातील',
      'class-activities-tab': {
        today: 'आज:',
        yesterday: 'काल:',
        month: 'महिना:',
        'add-from-course-map': 'कोर्स नकाशावरून जोडा',
        'add-from-my-content': 'माझी सामग्री पासून जोडा',
        'welcome-dca':
          'आपल्या दैनंदिन कामकाजामध्ये आपले स्वागत आहे जिथे आपण आज विद्यार्थी पूर्ण करण्यासाठी संकलने आणि आकलन देऊ शकता. कृपया लक्षात ठेवा: व्युत्पन्न केलेली कोणतीही अहवाल आजच सर्वात अलीकडील प्रयत्नासाठी उपलब्ध असेल.',
        'enter-max-timespent': 'मूल्यमापनासाठी लागलेला जास्तीत जास्त वेळ',
        'enter-max-assessment-time-spent':
          'मूल्यमापन पूर्ण करण्यासाठी लागलेला एकूण वेळ',
        'enter-max-score':
          'या मूल्यमापनासाठी दिले जाणारे जास्तीत जास्त गुण भरा',
        hour: 'ता',
        min: 'मि',
        'question-score': 'प्रश्नाचे गुण',
        'max-score': 'जास्तीत जास्त गुण',
        'assessment-score': 'मूल्यमापनाचे गुण',
        'assessment-max-score': 'मूल्यमापनाचे जास्तीत जास्त गुण',
        'enter-valid-timespent':
          'लागलेला एकूण वैध वेळ भतास आणि मिनिटांमध्ये योग्य वेळ भरा',
        'create-activity': 'उपक्रम तयार करा',
        'schedule-activity': 'नियोजित उपक्रम',
        'add-subject-framework':
          'कृपया वर्ग सेटिंग्जमध्ये विषय आणि अभ्यासक्रम आराखडा निवडा'
      },
      'click-to-copy': 'वर्ग कोड कॉपी करण्यासाठी क्लिक करा',
      'course-map': 'पाठ्यक्रम नकाशा',
      management: 'रोस्टर व्यवस्थापन',
      report: 'अहवाल',
      performance: 'कामगिरी',
      'performance-tab': {
        assessments: 'मूल्यांकन',
        collections: 'संग्रह'
      },
      'view-more': 'अधिक पहा',
      'class-settings': {
        'class-settings-sec': {
          'generate-pathway': 'मुलनिहाय शिक्षणाचा मार्ग',
          'class-settings-sec-head': 'वर्ग सेटिंग्ज',
          'class-settings-sec-desc': 'पारितोषिक मिळवण्यासाठी किमान पात्रता',
          'class-code': 'वर्ग संकेतांक',
          subject: 'विषय',
          framework: 'आराखडा',
          'grade-level': 'इयत्तेनुसार',
          'option-choose-one': 'पर्याय निवडा',
          'co-teachers': 'सहशिक्षक',
          'add-coteacher': 'आणखी शिक्षक जोडा',
          'offline-class-label': 'हा ऑफलाईन वर्ग आहे',
          'offline-msg':
            'एकदा ऑफलाईन म्हणून नोंदवलेला वर्ग पुन्हा ऑनलाईन करता येणार नाही',
          'offline-toggle-tooltip':
            'जर हा वर्ग आपल्याला ऑफलाईन म्हणून नोंदवायचा असेल तर \'हो\' निवडा',
          'offline-tooltip':
            'ज्या वर्गात विद्यार्थी नेविगेटरवर ऑनलाईन शिकत नसतील तो वर्ग ऑफलाईन वर्ग म्हणून नोंदवला जातो. शिक्षक विद्यार्थ्यांच्या प्रगतीचा पाठपुरावा ऑफलाईन/प्रत्यक्ष वर्गात  घेतात आणि विद्यार्थ्यांच्या वतीने शिक्षकच नेविगेटर मध्ये माहिती भरतात.',
          language: 'माध्यम'
        },
        'student-settings-sec': {
          'student-settings-sec-head': 'विद्यार्थी सेटिंग्ज',
          'col-head-active': 'Active'
        },
        'course-settings-sec': {
          'course-settings-sec-head': 'अभ्यासक्रम सेटिंग्ज',
          'is-route0-applicable':
            'हा मुलनिहाय शैक्षणिक मार्ग मुलाच्या गरजांनुसार आहे का ?',
          'apply-settings': 'Apply Settings',
          'origin-info':
            'तुमच्या वर्गामधील सर्वात खालची अभ्यासक्रमाची पातळी/इयत्ता कोणती?',
          'current-grade-info': 'तुमच्या वर्गाची इयत्ता?'
        },
        origin: 'मूळ',
        destination: 'अंतिम अपेक्षित पातळी',
        students: 'विद्यार्थी',
        'student-id': 'विद्यार्थी आय डी',
        'joined-on': 'वर्गात प्रवेश घेतल्याची तारीख',
        'action-lable-add-student': 'आणखी एक विद्यार्थी भरा'
      }
    },
    'no-classrooms':
      'आपण अद्याप कोणतेही वर्ग तयार केले नाहीत लायब्ररी टॅब अंतर्गत वैशिष्ट्यीकृत अभ्यासक्रमासाठी "वर्गाची निर्मिती करा" क्लिक करा किंवा </br> शोधा.',
    'no-course': 'आपण अद्याप या </br> कक्षामध्ये एक कोर्स नियुक्त केलेला नाही.',
    teach: 'गोरू वर्गाने शिकवा',
    'welcome-course-map':
      'हा आपला अभ्यासक्रम नकाशा आहे जेथे आपण अभ्यासक्रमाची सामग्री पाहू शकता, मूल्यांकन चालू किंवा बंद करू शकता आणि रिअल टाईममध्ये मूल्यांकनास लाँच करू शकता. आपण एकंदर क्लास कामगिरी आणि पूर्णता पाहू शकता. वर्ग कामगिरीच्या तपशीलवार दृश्यासाठी, आपल्या कक्षाच्या अहवाल टॅबला भेट द्या.',
    'welcome-rescoped-course-map':
      'हा कोर्स वर्ग प्रत्येक विद्यार्थ्याला वैयक्तिकृत केले गेले आहे. आपण विद्यार्थ्यांच्या शिकण्याच्या मार्ग (वर्ण - आणि>) वर क्लिक करून वर्ग व्यवस्थापनातील प्रत्येक विद्यार्थ्याचे अभ्यासक्रम नकाशा पाहू शकता.',
    'welcome-premium-course-map':
      'हे नॅव्हिगेटर कोर्स अनेक श्रेणींमध्ये वैयक्तिकृत अभ्यासक्रम मानके आहे. प्रत्येक विद्यार्थ्याला अंतर भरण्यासाठी, संकल्पना आणि सराव मजबूतीसाठी आणि त्यांचे शिक्षण वाढवण्यासाठी एक अद्वितीय अभ्यासक्रम प्रदान केला जातो. वैयक्तिकृत मार्ग तयार केले गेले आहेत आणि विद्यार्थ्यांना प्रत्येक विद्यार्थ्याच्या शिक्षणाची क्षमता वाढविण्यासाठी आणि त्यांच्या निर्धारित गंतव्यस्थानावर नेव्हिगेट करण्यासाठी रीअल-टाइममध्ये री-रूट केले जाते.'
  },
  goals: {
    manage: {
      title: 'माझे ध्येय!',
      'add-goal': 'गोल जोडा',
      'goal-label': 'ध्येय',
      'start-date-label': 'प्रारंभ तारीख',
      'end-date-label': 'शेवटची तारीख',
      'type-label': 'ध्येय प्रकार',
      'status-label': 'स्थिती',
      not_started: 'सुरु  केलेले नाही',
      activated: 'सक्रिय',
      completed: 'पूर्ण केले',
      dropped: 'सोडला',
      'reflection-label': 'प्रतिबिंब',
      save: 'सेव्ह करा',
      update: 'अद्यतन करा',
      'goals-not-found':
        'आपण अद्याप कोणत्याही गोल सेट नाही आपण वरील "लक्ष्य जोडा" बटण क्लिक करून एक ध्येय जोडू शकता.'
    },
    create: {
      'error-add-title': 'कृपया लक्ष्य प्रविष्ट करा',
      'error-length-title': 'ध्येय मध्ये कमाल 200 वर्ण असणे आवश्यक आहे',
      'error-add-start-date': 'कृपया प्रारंभ तारीख प्रविष्ट करा',
      'error-add-end-date': 'कृपया शेवटची तारीख प्रविष्ट करा',
      'error-greater-end-date':
        'शेवटची तारीख ही प्रारंभ तारखेपेक्षा मोठी असणे आवश्यक आहे',
      'error-add-status': 'कृपया ध्येय स्थिती निवडा',
      'error-length-reflection':
        'प्रतिबिंबांमध्ये कमाल 2000 वर्ण असणे आवश्यक आहे',
      'created-success-msg': 'आपण लक्ष्य {{goaltitle}} तयार केले आहे'
    },
    delete: {
      'deleted-success-msg': 'आपण लक्ष्य हटविले आहे'
    },
    update: {
      'updated-success-msg': 'आपण लक्ष्य अद्यतनित केले आहे'
    }
  },
  'gru-add-to': {
    'add-assessment-to-lesson': 'माझे मुल्यमापनमधून भरा ',
    'add-assessment-to-lesson-lead': 'या धड्यासाठी मूल्यमापन निवडा',
    'add-collection-to-lesson': 'माझे संग्रह मधून भरा ',
    'add-collection-to-lesson-lead': 'या धड्यासाठी संग्रह निवडा',
    'add-to-collection': 'संग्रहामध्ये भरा',
    'add-to-collection-lead': '{{contentTitle}} हे नाव देण्यासाठी संग्रह निवडा',
    'add-to-existing-classroom': 'विद्यमान वर्गातीलमध्ये जोडा',
    'add-to-existing-classroom-lead':
      'आपण जोडण्यास इच्छुक असलेले एक वर्ग निवडा',
    'add-to-assessment': 'मूल्यमापन किंवा संग्रहामध्ये भरा',
    'add-to-assessment-lead':
      '{{contentTitle}} हे नाव देण्यासाठी मूल्यमापन निवडा',
    'assessments-info':
      'येथे दिलेले मूल्यमापन हे इतर कोणत्याही धड्याला किंवा अभ्यासक्रमाला लागू  <b> होत नाही </b>.',
    'collections-info':
      'येथे दिलेले संग्रह हे इतर कोणत्याही धड्याला किंवा अभ्यासक्रमाला लागू  <b> होत नाही </b>.'
  },
  'gru-add-rubric-to-question': {
    title: 'माझ्या रूबरॅब्रिकमधून जोडा',
    lead: 'या प्रश्नावर जोडण्यासाठी एक ठसाक निवडा.',
    'no-rubrics':
      'आपण अद्याप कोणतीही मुक्त रचना प्रश्न जोडला जाऊ शकत नाही अशी कोणतीही रचना तयार केली नाही. आपण माझ्या सामग्री अंतर्गत कर्कशब्द तयार करू शकता जे आपल्या प्रोफाइलवरून ऍक्सेस करता येते.',
    'go-to-content': 'माझ्या सामग्रीवर जा'
  },
  'gru-assessment-confirmation': {
    title: 'आपण मूल्यांकन सुरू करणार आहात ...',
    description: 'या मूल्यांकनामध्ये, {{model.title}}',
    'setting-forward': 'आपण फक्त पुढे नॅव्हिगेट करू शकता',
    'setting-forward-backward':
      'आपण प्रश्नांची उत्तरे देण्यासाठी अग्रेषित व मागे नेव्हिगेट करू शकता',
    'unlimited-attempts-left': 'आपल्याकडे अमर्यादित प्रयत्न आहेत',
    'setting-forward-teacher': 'Student can navigate forward only',
    'setting-forward-backward-teacher':
      'Student can navigate forward and backwards to answer questions',
    'unlimited-attempts-left-teacher': 'Student have unlimited attempts',
    'attempts-left': {
      zero: 'आपण {{count}} प्रयत्न केले आहेत',
      one: 'आपल्याकडे 1 प्रयत्न शिल्लक आहे',
      other: 'आपण {{count}} प्रयत्न केले आहेत',
      'other-teacher': 'Student have {{count}} attempts'
    },
    'unlimited-attempts': 'आपल्याकडे अमर्यादित प्रयत्न आहेत',
    cancel: 'रद्द करा',
    continue: 'सुरू',
    start: 'प्रारंभ!',
    submit: 'सबमिट करा'
  },
  'gru-submit-confirmation': {
    title: 'ही प्रश्नमंजुषा पूर्ण करा आणि सर्व प्रश्नांची उत्तरे सबमिट करा',
    description:
      'तुम्ही सर्व प्रतिसाद सबमिट करत आहात. कोणताही अनुत्तरीत प्रश्न हा चुकीचे उत्तर म्हणून मोजला जाईल.',
    cancel: 'कॅन्सल',
    ok: 'ओके',
    confirm: 'प्रश्नमंजुषा पूर्ण करा',
    'finish-description':
      'आपले प्रतिसाद सबमिट करण्यासाठी "समाप्त क्विझ" क्लिक करा'
  },
  'gru-quick-course-search': {
    'add-from-course': 'अस्तित्वात असणाऱ्या अभ्यासक्रमातून add करा',
    'view-featured-courses': 'उपलब्ध अभ्यासक्रम बघा',
    assign: 'नेमून द्या'
  },
  'gru-share-pop-over': {
    copy: 'कॉपी',
    'ios-tooltip': 'कॉपी करण्यासाठी बटण धरून ठेवा',
    'multiarch-tooltip': 'कॉपी करण्यासाठी Ctrl + C वापरा',
    'safari-osx-tooltip': 'कॉपी करण्यासाठी Cmd + C वापरा',
    'share-course': 'लिंकसह तुमचा अभ्यासक्रम शेयर करा ',
    'share-question': 'लिंकसह तुमचा प्रश्न शेयर करा ',
    'share-resource': 'लिंकसह तुमचे संसाधन शेयर करा ',
    'share-assessment': 'लिंकसह तुमचे मूल्यमापन शेयर करा ',
    'share-rubric': 'लिंकसह आपले रूब्ररी सामायिक करा',
    'share-collection': 'लिंकसह तुमचा संग्रह शेयर करा '
  },
  'gru-category-panel': {
    teacher: {
      title: 'शिक्षकांसाठी',
      body:
        'इयात्तांशी संलग्न मजकूर शोधा, त्यात अनुकूल बदल करा, माहिती विश्लेषणाच्या आधारे तुमच्या विद्यार्थ्यांच्या प्रगतीचा मागोवा घ्या',
      cta: 'गोष्टी बघा'
    },
    student: {
      title: 'विद्यार्थ्यांसाठी',
      body:
        'आवड शोधा, घडवा, शैक्षणिक साहित्याच्या आधारे प्रगतीचा मागोवा घ्या आणि त्यावर लक्ष ठेवा',
      cta: 'Enter',
      'text-placeholder': 'वर्गाचा संकेतांक भरा'
    },
    district: {
      title: 'जिल्ह्यांसाठी',
      body:
        'मुलनिहाय शैक्षणिक मार्ग तयार करण्यासाठी आणि जिल्हानिहाय अभ्यासक्रम शेयर करण्यासाठी गुरुसोबत सहकार्य करा.',
      cta: 'आमचा प्रभाव'
    },
    partner: {
      title: 'भागीदारांसाठी',
      body:
        'शिक्षण व्यवस्थेवरील आपला एकत्रित प्रभाव वाढवण्यासाठी समान ध्येय्य उराशी बाळगणाऱ्या भागीदारांसोबत सहकार्य करा.',
      cta: 'आणखी शिका'
    }
  },
  'class.gru-class-navigation': {
    active: 'Active:',
    members: 'सदस्य',
    greetings: 'घोषणा',
    overview: 'अभ्यासक्रम आराखडा',
    analytics: 'माहिती',
    teams: 'गट',
    information: 'वर्गाची माहिती'
  },
  'class.gru-class-statistics': {
    title: 'वर्ग आकडेवारी',
    'on-average': 'सरासरी',
    performance: 'कामगिरी',
    completion: 'पूर्णत्व',
    'time-spent': 'खर्च केलेला वेळ',
    'no-performance': '-'
  },
  'gru-user-registration': {
    joinTitle: 'गोरू समुदायात सामील व्हा!',
    joinDescription:
      'शोधा, रीमिक्स करा आणि सर्वोत्तम विनामूल्य के -12 शिक्षण संसाधने सामायिक करा',
    googleButton: 'google सह साइन अप करा',
    whyGoogle: 'google सह साइन अप का?',
    descriptionWhyGoogle:
      'ते जलद आणि सोपे आहे पासवर्डशिवाय साइन इन करण्यासाठी आपले विद्यमान Google खाते वापरा',
    or: 'किंवा',
    noGoogleAccount: 'आपल्याकडे Google खाते नाही?',
    signUpEmail: 'आपल्या ईमेल पत्त्यासह साइन अप करा',
    haveAccount: 'आधीपासूनच एक खाते आहे?',
    clickLogIn: 'लॉग इन करण्यासाठी येथे क्लिक करा'
  },
  'gru-welcome-message': {
    title: 'गोरुच्या लर्निंग नेविगेटरला स्वागत आहे!',
    'text-temporary-one':
      'आपण संपूर्ण शिकत नेव्हीगेटरमध्ये जाता तेव्हा आपल्या प्रवासाला समर्थन देण्यास आम्ही आनंदी आहोत. एक फेरफटका चिन्ह घ्या',
    'text-temporary-two':
      ' आमच्या वैशिष्ट्यांचा वापर कसा करावा यासाठी मार्गदर्शन केलेल्या टुरांसाठी',
    'text-one':
      'आपण संपूर्ण लर्निंग नेविगेटरमध्ये जाता तेव्हा, आम्ही खालील प्रकारे आपल्या प्रवासास समर्थन करण्यास आनंदित आहोत:',
    'text-two': {
      subtitle: 'एक फेरफटका मारा',
      text:
        ': आमच्या वैशिष्ट्यांचा वापर कसा करावा यावर मार्गदर्शनित टूर प्रदान करते'
    },
    'text-three': {
      subtitle: 'मदत',
      text: ': अतिरिक्त प्रश्नांसाठी-आपल्या-बोटांचे समर्थन.'
    },
    'text-four': {
      subtitle: 'नवीन',
      text: ': आपल्यासाठी नवीन वैशिष्ट्ये ओळखणे'
    },
    'text-five': 'आपण आपल्या मुख्यपृष्ठावर परत याल तर कधीही, फक्त वर क्लिक करा',
    'dont-show-again': 'पुन्हा दाखवू नका'
  },
  'sign-up': {
    'step-1-title': 'नमस्कार !',
    'step-1-description':
      'आपण आमच्यासोबत  या प्रवासात सहभागी होत आहात याचा आम्हाला आनंद आहे.',
    'step-child-title': 'इतक्या जलद नाही',
    'step-child-subtitle': 'तुमची नोंदणी आम्ही पूर्ण करू शकत नाही.',
    'step-child-description-1':
      'यामुळे गुरू आपली नाव नोंदणी पूर्ण करू शकत नाही.',
    'step-child-age-requirements': 'नियम व अटी',
    'step-child-description-2':
      '. शिकणे चालू राहू द्या आणि आपण भेटूच काही वर्षात !',
    'step-2-title': 'मुलभूत माहिती.',
    'step-2-description': 'ही माहिती फारच महत्वाची आहे.',
    'log-in': 'लॉग इन',
    'log-in-description': 'जर आपले खाते आधीच अस्तित्वात असेल',
    'google-button': 'गुगलसह साईन इन करा',
    username: 'वापरकर्त्याचे नाव',
    dateOfBirth: {
      title: 'जन्मतारीख',
      day: 'वार',
      month: 'महिना',
      months: {
        january: 'जानेवारी',
        february: 'फेब्रुवारी',
        march: 'मार्च',
        april: 'एप्रिल',
        may: 'मे',
        june: 'जून',
        july: 'जुलै',
        august: 'ऑगस्ट',
        september: 'सप्टेंबर',
        october: 'ऑक्टोबर',
        november: 'नोव्हेंबर',
        december: 'डिसेंबर'
      },
      year: 'वर्ष',
      'error-message': 'कृपया आपली जन्मतारीख टाका.'
    },
    email: 'ईमेल',
    password: 'पासवर्ड',
    rePassword: 'पासवर्डची खात्री करा',
    state: 'राज्य किंवा केंद्रशासित प्रदेश',
    district: 'जिल्हा किंवा नोंदणीकृत संस्था',
    'error-username-taken':
      'अरेरे, हे युजरनेम याआधी कोणीतरी वापरलेले आहे. दुसऱ्या युजरनेमचा वापरून प्रयत्न करा.',
    'error-email-taken':
      'माफ करा, हा इमेल आयडी याआधी कोणीतरी वापरलेला आहे. दुसऱ्या इमेल आयडी वापरून प्रयत्न करा.',
    'error-role-message': 'प्रोफाईलचे स्वरूप निवडा',
    'error-country-message': 'तुमचा देश निवडा',
    'error-state-message': 'तुमचे राज्य किंवा केंद्रशासित प्रदेश निवडा',
    'error-district-message':
      'दिलेल्या यादीतून तुमचा जिल्हा किंवा संस्थेच नाव निवडा अन्यथा \'इतर\' हा पर्याय निवडा'
  },
  'gru-user-sign-up-cancel': {
    title: 'रजा नोंदणी?',
    'exit?': 'आपण निश्चितपणे बाहेर पडू इच्छिता?',
    registration_incomplete: 'आपली नोंदणी पूर्ण नाही.',
    leave: 'रजा नोंदणी',
    continue: 'नोंदणी सुरू ठेवा'
  },
  login: {
    title: 'आपले स्वागत आहे!',
    description: 'शिकणे फक्त कोपर्यात आहे',
    'title-session-ends': 'तुमचे सत्र संपले',
    'description-session-ends': 'कृपया साइन इन करा',
    gooruAccountTitle: 'आपल्या गोरू खात्यात लॉग इन करा',
    googleButton: 'google सह साइन इन करा',
    or: 'किंवा',
    haveAccount: 'आपल्याकडे खाते आहे का?',
    signUpHere: 'येथे साइन अप करा!',
    forgotPassword: 'तुमचा पासवर्ड विसरलात?',
    password: 'पासवर्ड',
    usernameOrEmail: 'वापरकर्तानाव किंवा ईमेल',
    'log-in': 'लॉग इन'
  },
  'forgot-password': {
    description: 'हे आपल्या सर्वांच्या बाबतीत घडते',
    usernameOrEmail: 'कृपया आपले ईमेल प्रविष्ट करा',
    'footer-google-description-1':
      '<a href=\'sign-in\'> \'google सह साइन इन\' दाबून पुन्हा लॉग इन करण्याचा प्रयत्न करा. </a>',
    'footer-description-1':
      'आपल्याला आपला संकेतशब्द रीसेट करण्यासाठी एका दुव्यासह एक ईमेल प्राप्त होईल.',
    'footer-description-2':
      'आपल्याला कोणतेही प्रश्न असल्यास, कृपया येथे संपर्क साधा',
    mail: 'support@gooru.org',
    'error-email-not-exists': 'क्षमस्व, आम्ही हे ईमेल ओळखत नाही',
    secondStepTitle: 'तुमची ई डाक तपासा',
    'secondStepDescription-1':
      'आम्ही आपला संकेतशब्द रीसेट करण्यासाठी एका दुव्यासह ईमेल पाठविला आहे.',
    'secondStepDescription-2':
      'आपल्याला कोणतेही प्रश्न असल्यास, कृपया येथे संपर्क साधा'
  },
  'reset-password': {
    'new-password': 'आपला नवीन पासवर्ड प्रविष्ट करा',
    'new-password-confirm': 'आपल्या संकेतशब्दाची पुष्टी करा',
    title: 'संकेतशब्द रीसेट करा'
  },
  'change-password': {
    'change-password': 'पासवर्डची लिंक बदला',
    title: 'पासवर्ड बदला',
    'current-password-label': 'तुमचा आताचा पासवर्ड टाका',
    'change-success': 'पासवर्ड यशस्वीरित्या बदलला आहे !',
    'new-password-required': 'तुमचा नवा पासवर्ड टाका ',
    'change-password-error':
      'काहीतरी चुकले आहे. तुमचा पासवर्ड बदलण्यात अपयश आले आहे. थोड्यावेळाने पुन्हा प्रयत्न करा.'
  },
  footer: {
    footerDescription:
      'आपला प्लॅटफॉर्म हा मुक्त स्त्रोत ठेवण्यासाठी तसेच समुदायाने तयार केलेल्या मजकुरासाठी CC0 गुरु वचनबद्ध आहे.',
    company: 'कंपनी',
    community: 'समुदाय',
    legal: 'कायदेशीर',
    connect: 'संबंध',
    aboutGooru: 'गुरु विषयी',
    careers: 'करीयर्स',
    supportCenter: 'सपोर्ट सेंटर',
    contactUs: 'संपर्क करा',
    districts: 'जिल्हे',
    partners: 'भागीदार',
    coaches: 'प्रशिक्षक',
    events: 'घडामोडी',
    terms: 'अटी',
    privacy: 'गोपनीयता',
    Copyright: 'कॉपीराइट'
  },
  'grade-dropdown': {
    placeholder: 'इयत्ता',
    prompt: 'इयत्ता निवडा',
    'pre-k': 'बालवाडी',
    elementary: 'प्राथमिक',
    'middle-school': 'माध्यमिक शाळा',
    'high-school': 'उच्च माध्यमिक शाळा',
    'higher-ed': 'उच्च शिक्षण',
    k: 'बा',
    first: '१',
    second: '२',
    third: '३',
    fourth: '४',
    fifth: '५',
    sixth: '६',
    seventh: '७',
    eighth: '८',
    ninth: '९',
    tenth: '१०',
    eleventh: '११',
    twelfth: '१२'
  },
  'standard-dropdown': {
    placeholder: 'वर्गानुसार शोध'
  },
  'subject-dropdown': {
    placeholder: 'विषय',
    prompt: 'विषय निवडा'
  },
  'search-filter': {
    courses: 'अभ्यासक्रम',
    collections: 'संग्रह',
    resources: 'स्त्रोत',
    assessments: 'मूल्यांकन',
    questions: 'प्रश्न',
    rubrics: 'रुब्रिक्स',
    'question-types': {
      MC: 'बहु पर्यायी',
      FIB: 'रिकाम्या जागा भरा',
      'T/F': 'खरे खोटे',
      TOF: 'चूक किंवा बरोबर',
      MA: 'अनेक उत्तरे',
      HS_TXT: 'एकापेक्षा अधिक निवड - मजकूर',
      HSTXT: 'एकाधिक निवडक मजकूर',
      HS_IMG: 'एकाधिक निवड - प्रतिमा',
      HSIMG: 'एकाधिक निवडक प्रतिमा',
      HT_RO: 'ड्रॅग आणि ड्रॉप ऑर्डर',
      'HT&RO': 'ड्रॅग आणि ड्रॉप ऑर्डर',
      HT_HL: 'हॉट मजकूर- हायलाइट',
      'H-THL': 'हॉट-टेक्स्ट हायलाइट',
      OE: 'मुक्त प्रतिसाद'
    },
    author: {
      placeholder: 'लेखक'
    }
  },
  resource: {
    video: 'Video',
    webpage: 'Webpage',
    interactive: 'Interactive',
    question: 'Question',
    image: 'Image',
    text: 'Text',
    audio: 'Audio',
    oer: 'OER'
  },
  'search-result': {
    resource: 'स्त्रोत',
    resources: 'स्त्रोत',
    and: 'आणि',
    question: 'प्रश्न',
    questions: 'प्रश्न',
    'in-this-collection': 'या संग्रहातील',
    'search-results-for': 'च्या शोधाचे निकाल'
  },
  'gru-image-picker': {
    chooseFile: 'Choose a file ...',
    instruction: 'Upload an image from a file on your computer.',
    restriction: 'The image must be a JPG, GIF or PNG file smaller than 5 MB.',
    submit: 'Use Image'
  },
  'gru-fib': {
    instructions:
      'कृपया दिलेल्या उत्तर (रिक्त) मध्ये आपले उत्तर (रे) टाइप करा आणि "{{action}}" क्लिक करा.'
  },
  'gru-hs-image': {
    instructions: 'कृपया योग्य प्रतिमा निवडा आणि "{{action}}" वर क्लिक करा.'
  },
  'gru-hs-text': {
    instructions: 'कृपया योग्य उत्तर निवडा आणि "{{action}}" वर क्लिक करा.'
  },
  'gru-hot-text': {
    instructions: 'कृपया योग्य उत्तर निवडा आणि "{{action}}" वर क्लिक करा.'
  },
  'gru-login-prompt': {
    title: 'गोरू मध्ये स्वागत आहे!',
    instructions:
      'ती क्रिया पूर्ण करण्यासाठी आपल्याला साइन इन करणे आवश्यक आहे.',
    'existing-user': 'आधीपासूनच एक खाते आहे?',
    'new-user': 'येथे नवीन?',
    'not-now': 'आता नाही',
    'sign-in': 'साइन इन'
  },
  'gru-multiple-answer': {
    instructions: 'कृपया योग्य उत्तर निवडा आणि "{{action}}" वर क्लिक करा.'
  },
  'gru-multiple-choice': {
    instructions: 'कृपया योग्य उत्तर निवडा आणि "{{action}}" वर क्लिक करा.'
  },
  'gru-open-ended': {
    instructions:
      'कृपया आपले उत्तर खालील क्षेत्रामध्ये टाइप करा आणि आपले कार्य पूर्ण झाल्यावर आपला प्रतिसाद जतन करण्यासाठी "{{action}}" बटण क्लिक करा.',
    characterLimit: 'वर्ण मर्यादा'
  },
  'gru-question-viewer': {
    answer: 'उत्तर',
    question: 'प्रश्न'
  },
  'gru-true-false': {
    instructions: 'कृपया योग्य उत्तर निवडा आणि "{{action}}" वर क्लिक करा.',
    true: 'खरे',
    false: 'खोटे'
  },
  'gru-reorder': {
    instructions:
      'कृपया योग्य क्रमाने उत्तरे पुनर्क्रमित करा आणि "{{action}}" क्लिक करा.'
  },
  'student-first-experience': {
    preStudyTitle: '{{title}} साठी पूर्व-अभ्यास',
    'route0-action': {
      accept: 'स्वीकार',
      ignore: 'दुर्लक्ष'
    },
    competency: {
      popover: {
        title: '{{शीर्षक}} सीमा',
        content:
          'आपल्याला आपल्या स्काईलाइन आणि या ग्रेडलाइन दरम्यान आपल्या गंतव्यस्थानापर्यंत पोहोचण्यासाठी सर्व मानकांचा अभ्यास करण्याची आवश्यकता आहे.'
      }
    },
    'assigned-course-title': '{{शीर्षक}} साठी नियुक्त केलेला कोर्स',
    'start-studying': 'Start Studying',
    'show-route': 'Show Route',
    'review-destination': 'Review Destination',
    'competency-level': {
      title: 'आपल्या प्रवीण प्रोफाइल',
      mastery: '{{गणना}} मानके महारत',
      'in-progress': '{{गणित}} दर्जा प्रगतीपथावर आहे',
      'not-started': '{{गणित}} मानक सुरू झाले नाहीत',
      'your-skyline': 'तुझा स्कायलाइन'
    },
    explanatory: {
      master: {
        title: 'मास्टर्ड',
        desc: 'आपण असे मानले आहे की आपण यशस्वीरित्या गुणवत्तेचे मास्तर केले आहे'
      },
      'in-progress': {
        title: 'प्रगतीपथावर',
        desc:
          'आपण असे मानले आहे की आपण मानकांचा अभ्यास करण्यास प्रारंभ केला आहे आणि महारत प्राप्त करण्याच्या दिशेने प्रगती करीत आहे'
      },
      'not-started': {
        title: 'सुरु केले नाही',
        desc:
          'असे कोणतेही पुरावे नाहीत आणि आपण अद्याप मानकांचा अभ्यास करण्यास प्रारंभ केला आहे असे सूचित करते'
      }
    },
    'competency-level-partial': {
      desc1: 'तू सध्या आहेस',
      desc2:
        'गणितासाठी आपल्या स्काईलाइन नकाशात आपले स्वागत आहे. स्काईलाइन (जाड पांढरे ओळ) प्रत्येक डोमेनमध्ये आपण उच्च दर्जाचे उच्च दर्जा दर्शवितो. डोमेन म्हणजे गणित क्षेत्र आहे जे आपण अभ्यास करता, जसे की संख्या प्रणाली आणि अभिव्यक्ती आणि समीकरण. प्रत्येक स्तंभ गणित डोमेन प्रस्तुत करते. आणि स्तंभातील प्रत्येक बॉक्स डोमेनमधील मानक प्रस्तुत करते. एकदा आपण शिकणे सुरू केले आणि मानकांचे व्यवस्थापन केले, तर आपले स्कायलाइन सतत बंप होईल.'
    }
  },
  player: {
    'gru-navigation': {
      'view-report': 'अहवाल पहा'
    },
    'gru-navigator': {
      'see-usage-report': 'वापर अहवाल पहा'
    },
    'gru-viewer': {
      'not-iframe-url': {
        header_1: 'हे संसाधन गोरू अंतर्गत पाहिले जाऊ शकत नाही',
        header_external_assessment_1:
          'हे मूल्यांकन गोरू अंतर्गत पाहिले जाऊ शकत नाही.',
        header_2: 'नवीन टॅबमध्ये संसाधन उघडण्यासाठी खालील बटण क्लिक करा.',
        'view-resource': 'स्त्रोत पहा',
        https_external: 'हा दुवा गोरुमध्ये पाहिला जाऊ शकत नाही',
        https_new_tab: 'नवीन टॅबमध्ये उघडण्यासाठी खालील दुव्यावर क्लिक करा.',
        footer_1: 'मी हे रिक्त पृष्ठ का पहात आहे?',
        footer_2:
          'गोरो मध्ये जोडलेले संसाधने हजारो वेगवेगळ्या प्रकाशकांकडून येतात जे ते वेगवेगळ्या प्रकाशकांमधून येतात',
        footer_3:
          'त्यांची सामग्री तयार आणि सामायिक करा. संसाधनांवर विविध सेटिंग्ज आहेत, यासह',
        footer_4:
          'आपल्याला सामग्री पाहण्यासाठी दुसर्या पृष्ठावर घेऊन जाण्याची आवश्यकता.'
      }
    }
  },
  'grading-player': {
    answer: 'सादर केलेला कार्य',
    'back-to': 'मागे',
    'current-response': 'वर्तमान प्रतिसाद',
    'full-rubric': 'पूर्ण घोडेस्वार',
    grading: 'ग्रेडिंग',
    level: 'स्तर',
    roster: 'रोस्टर',
    rubric: 'रुब्रिक',
    'submitted-time': 'सबमिट केलेली वेळ',
    points: 'गुण',
    prompt: 'कार्य प्रॉम्प्ट',
    'overall-comment': 'एकूणच टिप्पणी',
    'overall-lead': 'संपूर्णतया निबंधावर आपल्या अभिप्रायाचा सारांश करा.',
    'time-spent': 'खर्च केलेला वेळ',
    'total-score': 'एकूण गुण',
    'student-roster': {
      title: 'विद्यार्थी सूची',
      lead: 'या प्रश्नाचे उत्तर आहे'
    },
    'rubric-panel': {
      previous: 'मागील विद्यार्थी',
      next: 'पुढील विद्यार्थी',
      'total-score': 'एकूण गुण',
      points: '({{total}} गुण)'
    }
  },
  profile: {
    'gru-navigation': {
      about: 'याबद्दल',
      'about-me': 'माझ्याबद्दल',
      content: 'आशय',
      followers: 'अनुयायी',
      library: 'ग्रंथालय',
      'my-content': 'माझा कंटेंट',
      following: 'पाळत आहोत',
      proficiency: 'प्राविण्य',
      preference: {
        preference: 'प्राधान्यक्रम'
      }
    },
    edit: {
      'select-district': 'एक जिल्हा निवडा ...'
    },
    proficiency: {
      'is-empty':
        'अद्याप कोणताही डेटा उपलब्ध नाही एकदा आपण अभ्यास करणे सुरू केले की आपला डेटा उपलब्ध होईल.',
      'expand-chart': 'चार्ट विस्तृत करा',
      mastered: 'ताकदवान',
      'in-progress': 'काम चालू',
      'not-started': 'सुरु  केलेले नाही',
      skyline: 'स्काईलाइन',
      baseline: 'बेसलाइन',
      'grade-line': 'ग्रेड ओळ',
      'not-tagged':
        'वर्गात कोणत्याही प्रकारचे नियुक्त केलेले नाही किंवा अर्थातच एखाद्या वैध विषयावर किंवा मानकांवर टॅग केले गेले नाही.',
      'show-compressed-chart': 'संक्षिप्त चार्ट दर्शवा',
      'show-expanded-chart': 'विस्तृत चार्ट दर्शवा'
    },
    preference: {
      'language-preference': 'भाषेचा प्राधान्य क्रम',
      'choose-language': 'भाषा निवडा',
      'choose-sec-language': 'निवडा',
      'choose-preferred-language': 'प्रोफाईलसाठी भाषा निवडा',
      'choose-preferred-other-languages': 'इतर भाषा निवडा',
      language: 'भाषा',
      'select-category-label': 'Add करण्यासाठी वर्ग निवडा',
      'choose-category': 'वर्ग निवडा',
      'no-data': 'माहिती उपलब्ध नाही',
      'category-preference': 'श्रेणीनुसार प्राधन्यक्रम',
      'choose-subject': 'विषय निवडा',
      'choose-fwk': 'अभ्यासक्रम आराखडा निवडा',
      'add-subject': 'विषय जोडा',
      'add-sec-language': 'प्राधान्यानुसार इतर भाषा add करा',
      'other-preferred-languages': 'प्राधान्यानुसार इतर भाषा'
    }
  },
  'gru-data-picker': {
    score: 'गुण',
    report: 'अहवाल',
    completion: 'पूर्ण झाले',
    timeSpent: 'वेळ',
    'time-spent': 'खर्च केलेला वेळ',
    'study-time': 'अभ्यासाचा वेळ',
    reaction: 'प्रतिक्रिया',
    attempts: 'प्रयत्न'
  },
  'gru-performance-summary': {
    title: 'शीर्षक',
    scores: 'गुण',
    completion: 'पूर्ण झाले',
    'time-spent': 'एकूण वेळ',
    reaction: 'प्रतिक्रिया',
    attempts: 'प्रयत्न',
    redo: 'पुन्हा करा',
    resume: 'पुन्हा सुरु करा',
    study: 'आता अभ्यास करा',
    'view-report': 'अहवाल बघा',
    'not-applicable': 'लागू नाही',
    'not-started': 'अद्याप सुरु झाले नाही'
  },
  'gru-performance': {
    'no-content': 'मजकूर उपलब्ध नाही'
  },
  'gru-performance-metrics': {
    assessment: 'मूल्यांकन',
    collection: 'संकलन',
    completion: 'पूर्णत्व',
    report: 'अहवाल',
    student: 'विद्यार्थी',
    score: 'स्कोअर',
    'study-time': 'खर्च केलेला वेळ'
  },
  'gru-metrics-sub-header': {
    assessment: 'मूल्यांकन',
    student: 'विद्यार्थी',
    score: 'गुण',
    report: 'अहवाल',
    completion: 'पूर्ण झाले',
    'time-spent': 'वेळ'
  },
  'gru-resource-new': {
    'resource-already-exist': 'हे संसाधन आधीपासूनच गोरुमध्ये आहे!'
  },
  'gru-assessment-report': {
    'gru-summary': {
      'total-time-spent': 'एकूण वेळ घालवला'
    },
    'hidden-report':
      'आपल्या शिक्षकाने या मूल्यांकनासाठी आपला सारांश अहवाल लपविण्यासाठी निवडले आहे.'
  },
  cards: {
    'gru-class-card': {
      student: {
        zero: '{{count}} विद्यार्थी',
        one: '{{count}} विद्यार्थी',
        other: '{{count}} विद्यार्थी',
        'not-started': 'सुरु  केलेले नाही'
      },
      unit: {
        zero: 'अर्थातच नाही',
        one: '{{count}} युनिट',
        other: '{{count}} युनिट्स'
      },
      archived: {
        'request-report':
          'हा वर्ग संग्रहित केला आहे आणि सुधारित केला जाऊ शकत नाही. विद्यमान वर्ग डेटाचा अहवाल द्वारे प्रवेश करणे शक्य आहे.',
        'report-in-progress':
          'अहवाल तयार करणे 20 मिनिटे लागू शकतात कृपया परत तपासा.',
        'download-report': 'या वर्गासाठी आपला डेटा डाउनलोड करा',
        'no-report-available': 'या वर्गात नियोजित अभ्यासक्रम सामग्री नाही'
      }
    },
    'gru-course-card': {
      in: 'मध्ये',
      units: {
        zero: '{{count}} युनिट्स',
        one: '{{count}} युनिट',
        other: '{{count}} युनिट्स'
      },
      resource: {
        zero: '{{count}} स्त्रोत',
        one: '{{count}} स्त्रोत',
        other: '{{count}} स्त्रोत'
      },
      and: 'आणि',
      question: {
        zero: '{{count}} प्रश्न',
        one: '{{count}} प्रश्न',
        other: '{{count}} प्रश्न'
      },
      'start-studying': 'अभ्यास सुरू करा'
    },
    'gru-collection-card': {
      courses: {
        zero: '{{count}} अभ्यासक्रम',
        one: '{{count}} कोर्स',
        other: '{{count}} अभ्यासक्रम'
      },
      students: {
        zero: '{{count}} विद्यार्थी',
        one: '{{count}} विद्यार्थी',
        other: '{{count}} विद्यार्थी'
      },
      collections: {
        one: '{{count}} संग्रह',
        other: '{{count}} संग्रह'
      },
      assessments: {
        one: '{{count}} मूल्यांकन',
        other: '{{count}} मूल्यमापन'
      },
      classrooms: {
        zero: '{{count}} वर्गसंख्या',
        one: '{{count}} वर्गमहोत्सव',
        other: '{{count}} वर्गसंख्या'
      }
    },
    'gru-resource-card': {
      add: 'मध्ये add करा'
    },
    'gru-resource-result-card': {
      skipped: 'वगळले आहे'
    },
    'gru-profile-card': {
      followers: 'अनुयायी',
      following: 'पाळत आहोत'
    },
    'gru-user-network-card': {
      follow: 'अनुसरण करा'
    }
  },
  'reports.gru-table-view': {
    'first-tier-header-prefix': 'q',
    student: 'विद्यार्थी',
    reaction: 'प्रतिक्रिया',
    reactions: 'प्रतिक्रिया',
    score: 'स्कोअर',
    scores: 'स्कोअर',
    'study-time': 'अभ्यासाची वेळ',
    time: 'वेळ',
    'time-spent': 'खर्च केलेला वेळ',
    totals: 'एकूण'
  },
  'gru-emotion-picker': {
    'react-to-resource': 'या स्रोतावर प्रतिक्रिया द्या'
  },
  home: {
    'no-classes-found': {
      'create-class': {
        title: 'गोरू वर्गाने शिकवा',
        description:
          'एक वर्ग तयार केला, सामग्री नियुक्त करा आणि विद्यार्थ्यांना आमंत्रित करा',
        'button-text': 'वर्ग तयार करा'
      },
      'join-class': {
        title: 'गोरु वर्गातून  शिका',
        description:
          'शिकण्यास प्रारंभ करण्यासाठी आपल्या शिक्षकांच्या वर्गात सामील व्हा',
        'button-text': 'वर्ग कोड प्रविष्ट करा'
      },
      'featured-courses': {
        title: 'प्रदर्शित अभ्यासक्रम',
        description:
          'गणित, विज्ञान, सामाजिक अभ्यास आणि एला अभ्यासक्रम ब्राउझ करा.',
        'button-text': 'प्रदर्शित अभ्यासक्रम'
      },
      'teacher-toolkit': {
        title: 'शिक्षक टूलकिट',
        description:
          'या टूलकिटमध्ये आपल्याला प्रारंभ करण्यात मदत करण्यासाठी संसाधने आहेत.',
        'button-text': 'शिक्षक टूलकिट'
      }
    }
  },
  taxonomy: {
    grades: 'Grades',
    'gru-taxonomy-selector': {
      'add-secondary': 'Add secondary',
      'choose-subject': 'विषय निवडा',
      'competency-subject-and-course': 'क्षमता फ्रेमवर्क आणि अभ्यासक्रम',
      'primary-subject-and-course': 'क्षमता आराखडा आणि अभ्यासक्रम'
    }
  },
  validations: {
    unsavedChanges:
      'आपले बदल अजून सेव्ह केले गेलेले नाहीत. आपण हे पान सोडू इच्छिता?'
  },
  featured: {
    'featured-title': 'प्रदर्शित अभ्यासक्रम',
    'featured-description':
      'वैशिष्ट्यपूर्ण अभ्यासक्रम अभिनव शिक्षकांनी तयार केलेले आहेत, नमुने तपासलेले आणि सामग्री तज्ञांचे पुनरावलोकन केले आणि विद्यार्थ्यांसह कक्षांमध्ये कार्यान्वित केले. शोधा आणि रीमिक्स करा आणि अभ्यासक्रम वैयक्तिकृत करा आणि विद्यार्थी प्रतिबद्धता वाढवा! <a href=\' http://about.gooru.org/courses\' target=\'_blank\'> या अभ्यासक्रमांच्या विकासाबद्दल अधिक जाणून घ्या </a>.'
  },
  locateme: {
    score: 'स्कोअर',
    timespent: 'खर्च केलेला वेळ',
    view: 'पहा',
    attempt: 'प्रयत्न',
    lastAcessesed: 'अखेरचा प्रवेश केला'
  },
  'taxonomy.modals': {
    'gru-domain-picker': {
      browseSelectorText: 'हे युनिट कोणते विषय कव्हर करेल?',
      selectedText: {
        zero: '{{count}} डोमेन निवडले',
        one: '{{count}} विषय निवडला आहे',
        other: '{{count}} विषय निवडले आहेत'
      },
      shortcutText: 'Course is in'
    },
    'gru-standard-picker': {
      browseSelectorText: 'कुठल्या क्षमता समाविष्ट केल्या जातील?',
      browseCompetencySelectorText: 'काय क्षमता समाविष्ट केले जाईल?',
      selectedText: {
        zero: '{{count}} मानक निवडले',
        one: '{{count}} क्षमता निवडली आहे',
        other: '{{count}} क्षमता निवडल्या आहेत'
      },
      selectedCompetencyText: {
        zero: '{{count}} निवडलेल्या क्षमता',
        one: '{{count}} निवडलेल्या क्षमता',
        other: '{{count}} निवडलेल्या क्षमता'
      },
      shortcutText: 'युनिटचा शी संबंध जोडला आहे'
    }
  },
  'account-settings': {
    title: 'खाते सेटिंग्ज',
    'account-info': 'खात्याची माहिती',
    'private-info': 'खाजगी माहिती',
    'email-address': 'ईमेल पत्ता',
    gender: 'लिंग',
    birthday: 'वाढदिवस'
  },
  'gru-rich-text-editor': {
    bold: 'धीट',
    expression: 'अभिव्यक्ती',
    italic: 'तिर्यक',
    subscript: 'सबस्क्रिप्ट',
    superscript: 'सुपरस्क्रिप्ट',
    underline: 'अधोरेखित करा',
    bullets: 'बुलेट्स',
    'expressions-panel': {
      tabs: {
        calculus: 'गणित',
        'greek-letters': 'ग्रीक अक्षरे',
        layout: 'लेआउट',
        relation: 'संबंध',
        'set-theory': 'सेट सिद्धांत',
        symbols: 'चिन्हे',
        trigonometry: 'त्रिकोणमिती'
      },
      'insert-expression': 'घाला',
      'update-expression': 'अद्यतन करा',
      'create-expression': 'अभिव्यक्ती तयार करा'
    }
  },
  'gru-settings-edit': {
    'answerkey-attempts': 'उत्तरे आणि प्रयत्न',
    'answer-key': 'विद्यार्थी शेवटी उत्तरे पाहू शकतात',
    attempts: 'प्रयत्न',
    'attempts-unlimited': 'अमर्यादित',
    backwards: 'विद्यार्थी मागे जाऊन उत्तर बदलू शकतात',
    feedback: 'विद्यार्थी त्यांची उत्तरे चूक/ बरोबर आहेत ते पाहतात',
    'feedback-immediate': 'प्रत्येक प्रश्नाकरिता आणि शेवटी',
    'feedback-never': 'कधीही नाही',
    'feedback-summary': 'शेवटी',
    'navigation-scoring': 'नॅव्हिगेशन आणि स्कोअरिंग',
    'disable-heading':
      'अभ्यासक्रमाच्या आराखड्यामध्ये मूल्यमापन कार्यान्वित करा',
    'disable-legend':
      'विद्यार्थी त्यांच्या अभ्यासक्रमाच्या आराखड्यामध्ये मूल्यमापन सुरु करू शकतात'
  },
  'gru-icon-popover': {
    'settings-visibility-title': 'आपली सामग्री दृश्यमान करा',
    'settings-visibility-content':
      'हे सेटिंग आपल्या वापरकर्त्याच्या प्रोफाइलद्वारे दृश्यमान बनविते. आपण सहकार्यांसह तयार केलेले अभ्यासक्रम, संग्रह, आकलन, संसाधने आणि / किंवा प्रश्न सामायिक करू इच्छित असल्यास, आम्ही सुचवितो की आपण हे वैशिष्ट्य चालू कराल.'
  },
  'gru-take-tour': {
    text: 'फेरफटका',
    'teacher-home': {
      stepOne: {
        title: 'एक फेरफटका मारा',
        description:
          'फेरफटका आणि आपले मुख्यपृष्ठ घेण्यासाठी स्वागत आहे! आता प्रारंभ करूया!'
      },
      stepTwo: {
        title: 'लोगो',
        description: 'लोगोवर क्लिक केल्यावर आपल्या मुख्यपृष्ठावर परत येईल.'
      },
      stepThree: {
        title: 'शोध बार',
        description:
          'आपल्याला स्वारस्य असलेल्या विषयांसाठी आमचे सामग्री सूची शोधा'
      },
      stepFour: {
        title: 'वर्ग',
        description: 'आपल्या मुख्यपृष्ठावर परत जा.'
      },
      stepFive: {
        title: 'आशय व्यवस्थापक',
        description: 'आपली सामग्री तयार आणि प्रवेश करण्यासाठी जलद दुवा.'
      },
      stepSix: {
        title: 'ग्रंथालय',
        description: 'आमच्या वैशिष्ट्यीकृत अभ्यासक्रम ब्राउझ'
      },
      stepSeven: {
        title: 'आपले प्रोफाइल',
        description:
          'आपल्या सामग्री, वापरकर्ता प्रोफाइल आणि सेटिंग्जमध्ये प्रवेश करा आणि अद्यतनित करा.'
      },
      stepEight: {
        title: 'सपोर्ट',
        description: 'समर्थन केंद्र किंवा लॉगआउटमध्ये प्रवेश करा'
      },
      stepNine: {
        title: 'वर्ग',
        description: 'आपण सध्या शिक्षण देत असलेल्या वर्गांची यादी पहा.'
      },
      stepTen: {
        title: 'संग्रहित वर्ग',
        description: 'आपण पूर्वी शिकविलेल्या वर्गांची यादी पहा.'
      },
      stepEleven: {
        title: 'वर्ग तयार करा',
        description:
          'आपल्या वर्गाचे नाव द्या आणि एक नवीन वर्ग तयार करण्यासाठी बटण क्लिक करा'
      }
    },
    'student-home': {
      stepOne: {
        title: 'एक फेरफटका मारा',
        description:
          'फेरफटका आणि आपले मुख्यपृष्ठ घेण्यासाठी स्वागत आहे! आपल्या होमपेजवर आपल्यासाठी उपलब्ध असलेल्या वैशिष्ट्यांमधून फिरूया.'
      },
      stepFeaturedCourses: {
        title: 'प्रदर्शित अभ्यासक्रम',
        description:
          'आपल्याला स्वारस्य असलेल्या विषयांसाठी लर्निंग नेव्हिगेटरच्या सामग्री कॅटलॉगमध्ये वैशिष्ट्यीकृत अभ्यासक्रम ब्राउझ करा'
      },
      stepTwo: {
        title: 'लोगो',
        description: 'लोगोवर क्लिक केल्यावर आपल्या मुख्यपृष्ठावर परत येईल.'
      },
      stepThree: {
        title: 'शोध बार',
        description:
          'आपल्याला स्वारस्य असलेल्या विषयांसाठी आमचे सामग्री सूची शोधा'
      },
      stepFour: {
        title: 'माझे अभ्यास',
        description: 'आपल्या मुख्यपृष्ठावर परत जा'
      },
      stepFive: {
        title: 'ग्रंथालय',
        description:
          'आपल्याला स्वारस्य असलेल्या विषयांसाठी लर्निंग नेव्हगेटरचे वैशिष्ट्यीकृत अभ्यासक्रम आणि भागीदार लायब्ररी ब्राउझ करा.'
      },
      stepSix: {
        title: 'कामगिरी',
        description:
          'आपण नोंदवलेला अभ्यासक्रमांमध्ये आपल्या कामगिरीचा सारांश पहा.'
      },
      stepSeven: {
        title: 'आपले प्रोफाइल',
        description:
          'आपल्या सामग्री आणि वापरकर्ता प्रोफाइलमध्ये प्रवेश करा आणि अद्यतनित करा.'
      },
      stepEight: {
        title: 'सपोर्ट',
        description: 'समर्थन केंद्र किंवा लॉगआउटमध्ये प्रवेश करा'
      },
      stepNine: {
        title: 'घोषणा',
        description:
          'येथे आपल्याला आपल्या शिक्षक किंवा शाळेबद्दलची माहिती हवी असेल असे दिसेल'
      },
      stepTen: {
        title: 'वर्ग',
        description: 'आपण नोंदवलेली सर्व वर्गांची पहा.'
      },
      stepEleven: {
        title: 'स्वतंत्र शिक्षण',
        description:
          'आपण बुकमार्क केलेले विषय अन्वेषित करा आणि आपण याबद्दल अधिक जाणून घेऊ इच्छिता.'
      },
      stepTwelve: {
        title: 'क्लासरूममध्ये सामील व्हा',
        description: 'वर्गात सामील होण्यासाठी वर्गातील कोड प्रविष्ट करा'
      },
      stepThirteen: {
        title: 'पूर्ण!',
        description:
          'आता पुढे जा आणि आपण नोंदवलेला कोर्स वर क्लिक करा, वर्गात प्रवेश करा किंवा आपल्यास आवडणार्या सामग्रीचा शोध घ्या'
      }
    },
    'student-performance': {
      stepOne: {
        title: 'स्वागत आहे!',
        description:
          'आपल्या कार्यप्रदर्शन डॅशबोर्डवर आपले स्वागत आहे आपण सर्व वर्ग आणि अभ्यासक्रमांमध्ये कसे कार्य करीत आहात ते पाहू शकता.'
      },
      stepTwo: {
        title: 'फिल्टर टॅब',
        description:
          'क्रियाकलाप, कालावधी, विषय आणि अभ्यासक्रमानुसार आपले कार्यप्रदर्शन फिल्टर करण्यासाठी बाणावर क्लिक करा'
      },
      stepThree: {
        title: 'रिपोर्ट अपडेट करा',
        description:
          'एकदा आपण आपले फिल्टर निवडल्यास, परिणाम प्रदर्शित करण्यासाठी अद्यतन अहवालावर क्लिक करा.'
      },
      stepFour: {
        title: 'डाउनलोड / प्रिंट',
        description: 'आपला अहवाल डाउनलोड करा'
      },
      stepFive: {
        title: 'पूर्ण!',
        description: 'पुढे जा आणि आपल्या कार्यक्षमतेचे विश्लेषण!'
      }
    },
    'student-class': {
      stepOne: {
        title: 'स्वागत आहे!',
        description:
          'आपल्या वर्गात स्वागत आहे येथे आपण आपली दैनिक वर्ग क्रियाकलाप, अभ्यासक्रम नकाशा आणि कार्यप्रदर्शन डेटा शोधू शकाल. चला सुरू करुया!'
      },
      stepTopBar: {
        title: 'अभ्यासक्रम, कार्यप्रदर्शन, पूर्णता',
        description:
          'आतापर्यंत आपल्या अभ्यासक्रमाचा आणि संपूर्ण कामगिरीचा सारांश पहा.'
      },
      stepTwo: {
        title: 'दैनिक वर्ग कृती',
        description:
          'आपल्या शिक्षकाने नियुक्त केलेल्या आजच्या हालचालींमध्ये प्रवेश आणि अभ्यास करा.'
      },
      stepThree: {
        title: 'पाठ्यक्रम नकाशा',
        description:
          'अभ्यासक्रमातील संग्रह आणि मूल्यमापना पूर्ण करण्यासाठी युनिट्सवर क्लिक करा आणि धडे पहा.'
      },
      stepFour: {
        title: 'माझा रिपो्र्ट',
        description: 'आपल्या एकूण क्लास कामगिरीचे पुनरावलोकन करा.'
      },
      stepFive: {
        title: 'पूर्ण!',
        description:
          'अर्थात नकाशा किंवा दैनंदिन कामावर क्लिक करुन अभ्यासक्रमाचा अभ्यास करणे सुरू करा.'
      }
    },
    'teacher-class': {
      stepOne: {
        title: 'स्वागत आहे!',
        description:
          'आपल्या वर्गात स्वागत आहे येथे आपण आपली दैनिक वर्ग क्रियाकलाप, अभ्यासक्रम नकाशा, अद्यतन वर्ग माहिती पाहू आणि विद्यार्थ्यांच्या कामगिरी डेटाचे पुनरावलोकन करू शकाल. चला सुरू करुया!'
      },
      stepTopBar: {
        title: 'अभ्यासक्रम, कार्यप्रदर्शन, पूर्णता',
        description:
          'आतापर्यंत आपल्या अभ्यासक्रमाचा सारांश आणि एकूण विद्यार्थी कामगिरी पाहा.'
      },
      stepTwo: {
        title: 'दैनिक वर्ग कृती',
        description: 'आपल्या विद्यार्थ्यांना आजच्या गोष्टी पहा आणि नेमून द्या.'
      },
      stepThree: {
        title: 'पाठ्यक्रम नकाशा',
        description:
          'अभ्यासक्रमात नेमून दिलेले युनिट्स, पाठ, संकलन किंवा मूल्यांकने पाहणे किंवा संपादित करणे.'
      },
      stepFour: {
        title: 'माझा रिपो्र्ट',
        description:
          'आपल्या विद्यार्थ्यांना अभ्यासक्रमात कसे कार्यप्रदर्शन करतात याचे सारांश पहा आणि त्यांच्या अहवालांमध्ये प्रवेश करा.'
      },
      stepClassManagement: {
        title: 'वर्ग व्यवस्थापन',
        description:
          'आपली वर्ग माहिती आणि वर्गात नोंदणी झालेल्या विद्यार्थ्यांना नियुक्त किंवा अद्यतन करा.'
      },
      stepFive: {
        title: 'पूर्ण!',
        description:
          'आता पुढे जा आणि आपल्या विद्यार्थ्यांसह वर्गाकार सामायिक करा'
      }
    },
    'study-player': {
      stepOne: {
        title: 'स्वागत आहे!',
        description:
          'हा आपला अभ्यास खेळाडू आहे आपल्यासाठी उपलब्ध असलेल्या वैशिष्ट्यांमधून फिरूया.'
      },
      stepTwo: {
        title: 'पाठ्यक्रम नकाशा',
        description:
          'आपल्या कोर्स नकाशावर परत येण्यासाठी कोणत्याही वेळी चिन्ह क्लिक करा.'
      },
      stepThree: {
        title: 'कोर्सचे नाव',
        description: 'आपण ज्या पद्धतीने कार्य करीत आहात ते दर्शवितात.'
      },
      stepFour: {
        title: 'सूचना',
        description:
          'सध्या आपण काय अभ्यास करीत आहात यावर आधारित अतिरिक्त संसाधने शोधू शकता.'
      },
      stepFive: {
        title: 'पूर्णत्व',
        nuTitle: 'अनेक योग्यता',
        description: 'आपण किती पूर्ण केले आहे हे दर्शविते.'
      },
      stepSix: {
        title: 'कामगिरी',
        description: 'आपण नक्की काय करत आहात हे दर्शविते.'
      },
      stepSeven: {
        title: 'स्रोतावर प्रतिक्रिया',
        description:
          'आपल्या संसाधनकर्त्याबद्दल काय मत आहे हे आपल्या शिक्षकांना कळू द्या'
      },
      stepEight: {
        title: 'पूर्ण!',
        description: 'अभ्यास सुरू!'
      },
      stepNine: {
        title: 'संकलनावर परत',
        description:
          'आपल्या संग्रह किंवा मूल्यांकनाकडे परत येण्यासाठी कोणत्याही वेळी चिन्हावर क्लिक करा'
      }
    },
    library: {
      stepOne: {
        title: 'स्वागत आहे!',
        description: 'लर्निंग नेविगेटरमध्ये लायब्ररीमध्ये स्वागत आहे.'
      },
      stepTwo: {
        title: 'प्रदर्शित अभ्यासक्रम',
        description:
          'शिक्षकांनी वर्गामध्ये विकसित व अंमलबजावणी करणाऱ्या अभ्यासक्रमांचे अन्वेषण केले'
      },
      stepThree: {
        title: 'इतर लायब्ररी',
        description: 'गोरूच्या भागीदारांनी विकसित केलेली सामग्री एक्सप्लोर करा.'
      },
      stepFour: {
        title: 'पूर्वावलोकन (प्रिव्ह्यू)',
        description:
          'ते आपल्यास स्वारस्य आहे की नाही हे पाहण्यासाठी अभ्यासक्रमाचे पूर्वावलोकन करा.'
      },
      stepFive: {
        title: 'शेअर करा',
        description: 'इतरांशी हा कोर्स सामायिक करा'
      },
      stepSix: {
        title: 'बुकमार्क',
        description: 'या अभ्यासक्रमाचे नंतर पुनरावलोकन करा.'
      }
    },
    profile: {
      stepOne: {
        title: 'स्वागत आहे!',
        description:
          'आपल्या प्रोफाइलमध्ये स्वागत आहे येथे आपण आपल्या सामग्री, वैयक्तिक माहिती आणि अनुयायी प्रवेश करू शकता.'
      },
      stepTwo: {
        title: 'माझा कंटेंट',
        description: 'नवीन सामग्री तयार करा आणि आपण रीमिक्स केलेली सामग्री पहा.'
      },
      stepThree: {
        title: 'माझ्याबद्दल',
        description:
          'आपली वैयक्तिक माहिती, शाळा माहिती आणि आपले प्रोफाइल चित्र अद्यतनित करा.'
      },
      stepFour: {
        title: 'गोल',
        description:
          'आपल्या शिकण्यासंबंधीचे लक्ष्य साध्य करण्यासाठी आपले लक्ष्य निर्धारित करा आणि ट्रॅक करा'
      },
      stepFive: {
        title: 'अनुयायी',
        description:
          'आपल्याला एखाद्याची सामग्री आवडत असल्यास, आपण त्यांचे अनुसरण करू शकता. आपण हे देखील पाहू शकता की आपण कोणाचे अनुसरण करीत आहात.'
      },
      stepSix: {
        title: 'बॅज',
        description:
          'आपल्याला प्राप्त झालेल्या बॅजचे पुनरावलोकन करा. आपण आपल्या शिक्षकाने ठरवलेली बेंचमार्क मूल्यमापन पूर्ण केल्यास आपल्याला एक बॅज प्राप्त होईल.'
      }
    }
  },
  'gru-tour': {
    'assessments-settings': {
      stepOne: {
        title: 'नेव्हिगेशन आणि स्कोअरिंग',
        description:
          'हे सेटिंग विद्यार्थ्यांना मूल्यांकनानुसार कसे हलवू शकते हे दर्शवते आणि त्यांचे उत्तर अचूक आहेत किंवा नाही हे दर्शविते. हे त्यांना उत्तर की दर्शवत नाही.'
      },
      stepTwo: {
        title: 'उत्तर आणि प्रयत्नांच्या संख्येची उत्तर',
        description:
          'ही सेटिंग उत्तर की प्रकट करण्यास परवानगी देते आणि मूल्यांकन केलेल्या विद्यार्थ्यांची संख्या निर्धारित करते.'
      }
    },
    overview: {
      stepOne: {
        title: 'अभ्यासक्रमाचा आराखडा',
        description:
          'अभ्यासक्रमाच्या आराखड्यावरून तुमच्या विद्यार्थ्यांना त्यांच्यासाठी नेमून दिलेली सर्व मूल्यमापने आणि संग्रह मिळू शकतात'
      },
      stepTwo: {
        title: 'वर्गाचा कोड',
        description:
          'तुम्ही तयार केलेल्या प्रत्येक वर्गाकरिता एक युनिक वर्ग कोड असतो. जेव्हा तुम्ही त्यांना तुमच्या वर्गात प्रवेश देण्याकरिता आणि त्यातील मजकूर बघू देण्याकरिता तयार असाल तेव्हा त्यांना  हा कोड द्या.'
      },
      stepThree: {
        title: 'विद्यार्थी आणि वर्गाची माहिती लक्षपूर्वक पहा',
        description:
          'यामुळे तुम्ही जेव्हा विद्यार्थी अभ्यासक्रमाचा भाग असलेली मूल्यमापने पूर्ण करता तेव्हा वर्गाच्या आणि विद्यार्थ्याच्या वैयक्तिक मूल्यमापनाच्या माहितीचे विश्लेषण बघू शकता'
      },
      stepFour: {
        title: 'वर्गाची माहिती',
        description:
          'येथे तुम्ही तुमच्या वर्गाचे नाव बदलू शकता, तुमच्या विद्यार्थ्यांसाठी सूचना पोस्ट करू शकता, तुमच्या वर्गात नोंदणी केलेल्या विद्यार्थ्यांची नावे पाहू शकता आणि तुमचा वर्ग डिलीट करू शकता.'
      },
      stepFive: {
        title: 'तुमच्या अभ्यासक्रमातील साहित्यमध्ये बदल होत आहे',
        description:
          'जेव्हा तुम्ही वर्गात असाल तेव्हा तुमच्या विद्यार्थ्यांना नेमुन दिलेल्या अभ्यासक्रमातील काहीही बदलण्यासाठी येथे क्लिक करा.'
      },
      stepSix: {
        title: 'प्रत्यक्षात प्रगतीवर लक्ष ठेवा!',
        description:
          'वर्गाच्या मूल्यमापनामधील प्रगतीवर सतत लक्ष ठेवण्यासाठी रिअल-टाइम डॅशबोर्ड वापरा. <br><br>विद्यार्थ्यांसाठी रियल-टाईम मूल्यमापन लाँच करण्यासाठी प्रत्येक मूल्यमापनाच्या डाव्या बाजुला असलेल्या "गो लाइव्ह" चिन्हावर क्लिक करा. <br><br><i class="real-time-icon">'
      }
    },
    'quick-start': {
      stepOne: {
        title: 'तुमच्या वर्गांमध्ये पुढे मागे जाणे',
        description:
          'हा नवीन तयार केलेला वर्ग आहे. कोणत्याही वेळी एखाद्या वर्गात परत जाण्यासाठी, "वर्ग" वर क्लिक करा आणि ड्रॉप डाउन मधील सूची वापरून तुम्हाला हवा असलेला वर्ग निवडा.'
      },
      stepTwo: {
        title: 'सुरवात करताय? मूल्यमापन तयार करा!',
        description:
          'आम्ही तुम्हाला असे सुचवू की Gooru वापरण्याची सुरवात करताना तसेच तुमच्या वर्गातील विद्यार्थ्यांच्या आकलनशक्तीची सध्याची पातळी मोजण्याकरिता तुम्ही एक मूल्यमापन तयार करावे'
      }
    },
    'real-time': {
      stepOne: {
        title: 'प्रतिसादांची विघटन',
        description:
          'विद्यार्थ्यांनी कशी उत्तर दिले याचे विश्लेषण पाहण्यासाठी प्रत्येक प्रश्नावर क्लिक करा.'
      },
      stepTwo: {
        title: 'वैयक्तिक विद्यार्थी डेटा',
        description:
          'व्यक्तिगत विद्यार्थी डेटा अहवाल पाहण्यासाठी प्रत्येक विद्यार्थी टाइल निवडा.'
      },
      stepThree: {
        title: 'एक दृश्य निवडा',
        description:
          'डेटा प्रदर्शित करण्यासाठी पर्याय पाहण्यासाठी "शीर्षक दृश्य" किंवा "सूची दृश्य" निवडा.'
      },
      stepFour: {
        title: 'सरासरी गुण',
        description:
          'सर्व प्रतिसादांसाठी रीअल टाईममध्ये गणना केलेली सरासरी वर्गवारी पहा.'
      },
      stepFive: {
        title: 'प्रकल्प निनावी डेटा',
        description:
          'या पर्यायाचा उपयोग विद्यार्थ्यांच्या डेटाचे अनामित दृश्य प्रोजेक्ट करण्यासाठी करा.'
      }
    }
  },
  'gru-course-play': {
    'hide-unit-details': 'एकक मेटाडेटा लपवा',
    'view-unit-details': 'एकक मेटाडेटा पाहा',
    performance: 'कामगिरी'
  },
  'gru-century-skills': {
    legends: {
      hewlett: 'हेवेट्ट सखोल शिक्षण मॉडेल',
      conley: 'शंकू चार कळा',
      framework: 'पी 21 फ्रेमवर्क',
      national: 'जीवन आणि कार्य राष्ट्रीय संशोधन केंद्र'
    },
    content: {
      groups: {
        cognitive: 'की संज्ञानात्मक कौशल्य आणि धोरण',
        content: 'मुख्य सामग्री ज्ञान',
        learning: 'कळ शिकण्याचे कौशल आणि तंत्र'
      }
    }
  },
  'gru-rubric-edit': {
    'upload-rubric': 'अपलोड पुनर्रचना',
    copy: {
      'success-message':
        'आपण {{title}} वर्णित प्रत तयार केली आहे आपण त्या घुमट संपादित करू इच्छिता?'
    }
  },
  'gru-rubric-creation': {
    url: 'url',
    'upload-file': ' फाइल अपलोड करा',
    'add-category': 'नवीन श्रेणी जोडा',
    'gru-preview-url': {
      preview: 'उपरोक्त परिमाण जोडा आणि येथे पूर्वावलोकन करा'
    },
    'overall-narrative': 'संपूर्ण कथा अभिप्राय',
    'feedback-guidance': 'प्रतिक्रिया मार्गदर्शन',
    'required-feedback': 'अभिप्राय आवश्यक',
    'feedback-guidance-placeholder':
      'संपूर्णतया निबंधावर आपल्या अभिप्रायाचा सारांश करा.',
    'gru-category': {
      'category-title': 'श्रेणी शीर्षक',
      'category-feedback':
        'माजी आपण या श्रेणीचे पुनरावलोकन करत असताना, लेखकाचे उद्देशावर लक्षपूर्वक लक्ष द्या',
      'gru-scoring-levels': {
        '0': 'उदाहरण: प्रवीणता वाढवणे',
        '1': 'उदाहरण: बैठक प्रवीणता',
        '2': 'उदाहरण: जवळ येणे प्राविण्य',
        '3': 'उदाहरण: सुरुवातीची प्रवीणता',
        '4': 'उदाहरण: नैपुण्यचा कोणताही पुरावा नाही',
        best: 'सर्वोत्कृष्ट',
        levels: 'स्तर',
        'new-level': 'नवीन स्तर जोडा',
        scoring: 'स्कोअरिंग',
        worst: 'सर्वात वाईट',
        'name-error': 'कृपया स्तर शीर्षक प्रविष्ट करा.',
        'score-error': 'कृपया गुण मूल्य प्रविष्ट करा.',
        'no-levels-error': 'कृपया कमीत कमी एक पातळीसाठी एक मूल्य सेट करा.'
      }
    }
  },
  library: {
    'browse-library': 'ब्राउझ लायब्ररी',
    'featured-courses': 'प्रदर्शित अभ्यासक्रम',
    'gru-library-card': {
      'featured-course': 'वैशिष्ट्यीकृत अभ्यासक्रम'
    },
    'gru-partner-library-card': {
      course: {
        zero: '{{count}} कोर्स',
        one: '{{count}} कोर्स',
        other: '{{count}} अभ्यासक्रम'
      },
      collection: {
        zero: '{{count}} संग्रह',
        one: '{{count}} संग्रह',
        other: '{{count}} संग्रह'
      },
      assessment: {
        zero: '{{count}} मूल्यांकन',
        one: '{{count}} मूल्यांकन',
        other: '{{count}} मूल्यमापन'
      },
      resource: {
        zero: '{{count}} स्त्रोत',
        one: '{{count}} स्त्रोत',
        other: '{{count}} स्त्रोत'
      },
      question: {
        zero: '{{count}} प्रश्न',
        one: '{{count}} प्रश्न',
        other: '{{count}} प्रश्न'
      },
      rubric: {
        zero: '{{count}} चक्रीय',
        one: '{{count}} चक्रीय',
        other: '{{count}} शब्दाचा उच्चार'
      }
    },
    'partner-libraries': 'भागीदार लायब्ररी'
  },
  'gru-study-header': {
    'lesson-legend': 'आपण सध्या धड्यावर आहात',
    'resource-legend': 'आपण हे संसाधन तपासत आहात',
    'resources-collection-report': 'संग्रह वापर अहवाल',
    'resources-assessment-report': 'मूल्यांकन सारांश अहवाल',
    'check-summary': 'आपला सारांश अहवाल तपासा',
    'check-usage': 'आपला वापर अहवाल तपासा',
    'no-suggestions':
      'आम्ही आपल्या शिक्षणास समर्थन करण्यासाठी सर्वोत्कृष्ट सूचनांवर कार्य करीत आहोत',
    resource: {
      zero: 'स्त्रोत',
      one: 'स्त्रोत',
      other: 'स्त्रोत'
    },
    question: {
      zero: 'प्रश्न',
      one: 'प्रश्न',
      other: 'प्रश्न'
    },
    'suggestions-legend': 'अधिक जाणून घेण्यासाठी, हे संसाधने तपासा'
  },
  'gru-suggest-test': {
    'pre-test-header': 'पूर्व-चाचणी (पर्यायी)',
    'post-test-header': 'पोस्ट-टेस्ट (पर्यायी)',
    'backfill-header': 'सूचित संग्रह (पर्यायी)',
    'benchmark-header': 'बेंचमार्क-चाचणी (पर्यायी)',
    'resource-header': 'सूचित स्त्रोत (पर्यायी)',
    'signature_collection-header': 'सूचित संग्रह (पर्यायी)',
    'signature_collection-lead':
      'या अभ्यासक्रमावरील आपल्या कार्यक्षमतेवर आधारित, पुढील संकलन आपली समज वाढवू शकते.',
    'signature_assessment-header': 'सुचविलेले मूल्यांकन (पर्यायी)',
    'signature_assessment-lead':
      'या अभ्यासक्रमावरील आपल्या कार्यक्षमतेवर आधारित, खालील मूल्यांकनमुळे आपली समज वाढेल.',
    'pre-test-lead':
      'या धड्यातील संकल्पनांची सध्याची समज मोजण्यासाठी पूर्व चाचणीचा सल्ला दिला जातो. प्री-टेस्ट आपल्याला धड्यातील सामग्रीसाठी तयार करण्यास मदत करू शकते. पूर्व-चाचणी आपल्या अभ्यासक्रमाचे गुणोत्तर परिणाम करणार नाही.',
    'post-test-lead':
      'प्रस्तुत माहितीची आपली समज मोजण्यासाठी पुढील पोस्ट-टेस्ट सुचविण्यात येते. पोस्ट-टेस्ट आपल्या अभ्यासक्रमाच्या गुणोत्तराला प्रभावित करणार नाही',
    'backfill-lead':
      'आपल्या प्री-टेस्टमधील प्रतिसादांवर आधारित, धडे सुरवातीपूर्वी अतिरिक्त सामग्रीचे पुनरावलोकन करणे उपयुक्त ठरू शकते. आधार सामग्रीचे पुनरावलोकन करणे नवीन सामग्री शिकण्यासाठी विद्यार्थ्यांना तयार करण्यास मदत करू शकेल.',
    'benchmark-lead':
      'आपण आता एक बेंचमार्क मूल्यांकन घेऊन आपली समज प्रदर्शित करण्यासाठी सज्ज आहात आपण यशस्वीरित्या बेंचमार्क पूर्ण करण्यासाठी बॅज प्राप्त कराल बेंचमार्क आपल्या अभ्यासक्रमाच्या गुणक्रमावर परिणाम करणार नाही.',
    'resource-lead':
      'या अभ्यासक्रमावरील आपल्या कार्यक्षमतेवर आधारित, खालील स्रोत आपली समज वाढवू शकतात.',
    no: 'नको धन्यवाद',
    'no-suggestions': 'येथे आपल्या कामगिरीचा सारांश आहे.',
    take: '{{प्रकार}} घ्या',
    'take-signature-collection': 'अभ्यास सुचवलेले संग्रह',
    'take-signature-assessment': 'अभ्यास सुचविले मूल्यांकन',
    'take-backfill-pretest': 'अभ्यास सुचवलेले संग्रह',
    'take-resource': 'अभ्यास संसाधन',
    'end-of-course': 'आपण कोर्सच्या शेवटी पोहोचला आहात.'
  },
  'gru-content-suggestion': {
    header: 'आमच्याकडे आपल्यासाठी एक सूचना आहे!',
    'suggestion-text': {
      collection:
        'या विषयावरील आपल्या कार्यप्रदर्शनावर आधारित, आम्ही आपल्याला निपुणता मिळविण्यात मदत करण्यासाठी आमच्या सुचविलेल्या संकलनातून पुढे जाण्याची शिफारस करतो.',
      assessment:
        'या विषयावरील आपल्या कार्यप्रदर्शनावर आधारित, आम्ही आपल्याला निपुणता मिळविण्यात मदत करण्यासाठी आमच्या सुचविलेल्या मूल्यांकनानुसार शिफारस करतो.'
    }
  },
  'student-open-ended-summary': {
    'overall-comment': 'एकूणच टिप्पणी',
    'overall-score': 'एकूण धावसंख्या',
    prompt: 'प्रश्न प्रॉमप्ट'
  },
  'gru-performance-chart': {
    'teacher-tooltip':
      'आपल्या विद्यार्थ्यांनी या धड्यातील सर्व मूल्यमापन पूर्ण केले आहेत'
  },
  report: {
    'external-assessment-report': {
      note:
        'मूल्यांकनासाठी विद्यार्थ्यांच्या अहवालानुसार हा एक बाह्य मूल्यांकन आहे. वैयक्तिक प्रश्न पातळी डेटा उपलब्ध नाही.',
      wish: 'अभिनंदन! तुम्ही गोल केले',
      reference: 'हे बाह्य मूल्यांकन प्रवेश केला जाऊ शकतो '
    },
    'competency-report': {
      title: 'क्षमता अहवाल',
      'no-subject': 'कोणताही विषय नियुक्त केला नाही',
      prerequisites: 'पूर्वीची',
      'signature-assessments': 'Signature मूल्यांकन',
      'signature-collections': 'Signature संग्रह',
      'show-global-data': 'ग्लोबल डेटा दर्शवा',
      'show-student-data': 'विद्यार्थी डेटा दर्शवा',
      'show-learning-map': 'शैक्षणिक आराखडा दाखवा'
    },
    'domain-report': 'डोमेन अहवाल'
  },
  'competency-info-content': {
    journey: 'JOURNEY',
    metadata: 'METADATA',
    'learning-map': 'LEARNING MAP'
  },
  'grade-selector': {
    placeholder: 'Choose Grade Lines to Display'
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
  'self-report': {
    'your-score': 'आपला स्कोअर',
    time_spent: 'एकूण लागलेला वेळ',
    'update-error': 'स्कोअर अद्यतनित करताना समस्या',
    'validation-error': 'वैध गुण प्रविष्ट करा',
    'enter-score': 'येथे आपला स्कोअर प्रविष्ट करा',
    'enter-timeSpent': 'तुम्हाला लागलेला एकूण वेळ येथे भरा',
    'validation-error-time': 'वैध वेळ भरा'
  },
  notifications: {
    'notificationlist-header-title': 'अधिसूचना',
    'show-more': 'अजून दाखवा',
    type: {
      'teacher-suggestion-title':
        'आपल्याकडे वर्गात एक नवीन शिक्षक सूचना आहे : {{ classTitle }}',
      'student-gradable-submission-title':
        'You have {{occurrence}} item(s) to grade in class : {{ classTitle }}',
      'student-self-report-title':
        '{{occurrence}} Student(s) reported performance at class : {{ classTitle }}',
      'teacher-override-title':
        'शिक्षकाने आपली सबमिशन क्लासमध्ये दुरुस्त केली आहे : {{ classTitle }}  ',
      'teacher-grading-complete-title':
        'शिक्षकाने आपली सबमिशन श्रेणीमध्ये केली आहे : {{ classTitle }}'
    },
    typeinclass: {
      'teacher-suggestion-title': 'आपल्याकडे एक नवीन शिक्षक सूचना आहे',
      'student-gradable-submission-title':
        'You have {{occurrence}} student item(s) to grade',
      'student-self-report-title':
        '{{occurrence}} विद्यार्थ्यांनी कार्यप्रदर्शन केले',
      'teacher-override-title': 'शिक्षकाने आपली सबमिशन दुरुस्त केली आहे',
      'teacher-grading-complete-title':
        'शिक्षकाने आपली सबमिशन श्रेणीमध्ये केली आहे'
    }
  }
});
