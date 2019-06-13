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
  'errors.description': 'هذا الحقل',
  'errors.inclusion': '{{description}} غير مدرج في القائمة',
  'errors.exclusion': '{{description}} محجوز',
  'errors.invalid': '{{description}} غير صالح',
  'errors.confirmation': '\t{{description}} لا يطابق {{on}}',
  'errors.accepted': 'يجب قبول {{description}} ',
  'errors.empty': 'لا يمكن ترك {{description}} خالياً',
  'errors.blank': 'لا يمكن ترك {{description}} فارغاً',
  'errors.present': 'يجب أن يكون {{description}} فارغا',
  'errors.collection': 'يجب أن يكون {{description}} عبارة عن مجموعة',
  'errors.singular': 'لا يمكن أن يكون {{description}} مجموعة',
  'errors.tooLong': '{{description}} طويل جدا (الحد الأقصى هو {{max}})) حرفاً',
  'errors.tooShort': '{{description}} قصير جدا (الحد الأدنى هو {{min}}) حرف',
  'errors.before': 'يجب أن يكون {{description}} قبل {{before}}',
  'errors.after': 'يجب أن يكون {{description}} بعد {{after}}',
  'errors.wrongDateFormat': 'يجب أن يكون {{description}} بصيغة {{format}}',
  'errors.wrongLength':
    '{{description}} هو الطول الخاطئ، (يجب أن يكون {{is}} حرف)',
  'errors.notANumber': 'يجب أن يكون {{description}} رقما',
  'errors.notAnInteger': 'يجب أن يكون {{description}} عدداً صحيحاً',
  'errors.greaterThan': 'يجب أن يكون {{description}} أكبر من {{gt}}',
  'errors.greaterThanOrEqualTo':
    'يجب أن يكون {{description}} أكبر من أو يساوي {{gte}}',
  'errors.equalTo': '{{description}} يجب أن يساوي {{is}}',
  'errors.lessThan': 'يجب أن يكون {{description}} أقل من {{lt}}',
  'errors.lessThanOrEqualTo':
    'يجب أن يكون {{description}} أقل من أو يساوي {{lte}}',
  'errors.otherThan': 'يجب أن يختلف {{description}} عن {{value}}',
  'errors.odd': 'يجب أن يكون {{description}} فردي',
  'errors.even': 'يجب أن يكون {{description}}  زوجي',
  'errors.positive': 'يجب أن يكون {{description}}  موجب',
  'errors.date': 'يجب أن يكون {{description}} تاريخ صالح',
  'errors.email': 'يجب أن يكون {{description}} بريد إلكتروني صالح',
  'errors.phone': 'يجب أن يكون {{description}} رقم هاتف صالح',
  'errors.url': 'يجب أن يكون {{description}} رابط موقع صحيح',
  'common.relevance': 'Relevance',
  'common.engagement': 'Engagement',
  'common.efficacy': 'Efficacy',
  'common.grid': 'Grid',
  'my-content': 'My Content',
  'featured-libraries': 'featured libraries',
  'common.list': 'List',
  'common.first': 'First',
  'common.last': 'Last',
  'common.name': 'Name',
  'common.user': 'user',
  'common.content-name': 'Content Name',
  'common.lastName': 'Lastname',
  'common.firstName': 'Firstname',
  'common.filter-by': 'Filter By',
  'common.sub-filter': 'Sub-Filter',
  'common.more': 'more',
  'common.tasks': 'tasks',
  'common.apply-filter': 'apply filter',
  'search-help-message': 'Choose filters to apply',
  'common.avg-score': 'Avg Score',
  'common.frq': 'FRQ',
  'common.offline-activity': 'offline activity',
  'common.offline-activites': 'offline activites',
  'common.schedule': 'Schedule',
  'common.responses': 'Responses',
  'common.no-lesson-info-message': 'This unit does have any lessons.',
  'common.no-collection-info-message': 'This lesson does have any collections.',
  'common.gooru-suggestions': 'Gooru Suggestions',
  'common.gooru-catalog': 'Gooru Catalog',
  'common.answer-this-activity':
    'Answer this rubric to complete your activity.',
  'library-search-placeholder': 'Search for anything within the library…',
  'common.suggestion-made-to': 'Suggestion made to',
  'common.student-selected': 'Student Selected',
  'ca.student.no-content':
    'The teacher has not assigned any activities for the day',
  'oa.student.no-active-content':
    'Currently there are no offline activities assigned to you that are active',
  'oa.student.no-completed-content':
    'There are no offline activities that are completed yet',
  'common.no-suggest-result-message': ' No matching content found',
  'common.no-suggest-results-message':
    'You can search and  find the related content.',
  'common.no-suggest-search-results-message':
    'Check your spelling. We all make mistakes! Or try searching for a similar word instead.',
  'common.a-collection': 'مجموعة',
  'common.a-course': 'مساق دراسي\n',
  'common.no-search-result':
    'No matching {{contentType}} were found for the search term and the filter settings. Try modifying the search term or filter parameters',
  'common.a-question': 'سؤال',
  'common.a-resource': 'مصدر',
  'common.a-rubric': 'سلم تقييم',
  'common.all-completed': 'تم إنجاز الكل',
  'common.a-assessment': 'تقييم',
  'common.about': 'حول',
  'common.about-you': 'حولك',
  'common.about-me': 'حولي',
  'common.accept': 'Accept',
  'common.ignore': 'Ignore',
  'common.add': 'ضِف',
  'common.plan-an-activities': 'Plan your activities',
  'common.plan-activities': 'Plan Activities',
  'common.plan': 'plan',
  'offline-activities.no-completed-content':
    'There are no projects or other offline activities that have been completed yet',
  'offline-activities.no-active-content':
    'There are no projects or other offline activities that the students are currently working on',
  'common.plan-an-activities-msg':
    'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
  'common.Reschedule': 'Reschedule',
  'common.no-unschedule-items':
    'You don\'t have any activities that need scheduling for ',
  'common.repeat-activity': 'Repeat Activity',
  'common.add-assessment': 'إنشاء تقييم جديد',
  'common.add-century-skills': 'ضَف مهارات القرن الحادي والعشرين',
  'common.add-collaborator': 'ضِف مشارك',
  'common.add-collection': 'أنشئ مجموعة جديدة',
  'common.add-collection-item': 'أنشئ مصدر أو سؤال',
  'common.add-competency': 'ضِف كفاءة',
  'common.add-content-prompt': 'لم تنشئ {{type}} بعد',
  'common.add-course': 'أنشئ مساق دراسي جديد\n',
  'common.add-coruse-to-class': 'Add Course',
  'common.add-domains-to-unit': 'ضِف مجالات إلى الوحدة',
  'common.add-url': 'ضِف رابط',
  'common.add-from-url': 'ضِف من الرابط',
  'common.add-lessons': 'ضِف دروس',
  'common.add-new-lesson': 'أنشئ درس جديد',
  'common.add-new-unit': 'أنشئ وحدة جديدة',
  'common.add-new-resource': 'أنشئ مصدر جديد',
  'common.add-new-question': 'أنشئ سؤال جديد',
  'common.add-question': 'أنشئ سؤال',
  'common.add-question-image': 'ضِف سؤال على شكل صورة',
  'common.add-rubric': 'ضِف سلم تقييم جديد',
  'common.add-standard': 'ضِف معيار',
  'common.add-standards': 'ضِف معايير',
  'common.add-standards-to-collection': 'ضِف معايير إلى مجموعة',
  'common.add-to': 'ضِف إلى',
  'common.add-to-classroom': 'ضِف إلى الصف',
  'common.add-to-daily-class': 'ضِف إلى أنشطة الصف اليومية',
  'common.add-to-collection-success':
    'لقد ضفت {{contentTitle}} إلى {{collectionTitle}}. هل تريد تعديل ال {{collectionType}}؟',
  'common.add-to-lesson-success':
    'لقد ضفت {{collectionTitle}} إلى {{contentTitle}}. هل تريد تعديل ال{{collectionType}}؟',
  'common.add-type-question': 'ما نوع السؤال الذي تريد إضافته؟',
  'common.add-type-resource': 'ما نوع هذا المصدر؟',
  'common.add-units': 'ضِف وحدات',
  'common.added': 'مُضاف',
  'common.advanced-editing': 'تعديل متقدم',
  'common.announcements': 'الإعلانات',
  'common.anonymous_mode': 'أسلوب تقييم المجهول',
  'common.answer': 'إجابتك',
  'common.answer-correct': 'إجابتك صحيحة',
  'common.answer-incorrect': 'إجابتك خاطئة',
  'common.answer-key-was-hidden': 'ملاحظة: قام المعلم بإخفاء مفتاح الإجابة.',
  'common.approved': 'ُمعتمَد',
  'common.archive': 'الأأرشيف',
  'common.assessment': 'التقييم',
  'common.assessment-disabled': 'لا يمكنك إجراء هذا التقييم',
  'common.assessment-external': 'التقييم الخارجي',
  'common.assessment-pl.zero': 'التقييمات',
  'common.assessment-pl.one': 'التقييم',
  'common.assessment-pl.other': 'التقييمات',
  'common.assessment-title': 'عنوان التقييم',
  'common.activity-title': 'Activity Title',
  'common.assessmentInitial': 'ت',
  'common.assessments': 'التقييمات',
  'common.assign': 'تعيين',
  'common.assign-to-class': 'تعيين إلى الصف',
  'common.assign-to-course': 'تعيين إلى المساق الدراسي',
  'common.attempt': 'رقم المحاولة',
  'common.audience': 'الجمهور',
  'common.avatarFor': 'صورة رمزية لـ',
  'common.averageScore': 'متوسط العلامات',
  'common.back': 'عودة',
  'common.back-to-assessment': 'العودة إلى التقييم',
  'common.back-to-collection': 'العودة إلى المجموعة',
  'common.back-to-course-map': 'العودة إلى خريطة المساق الدراسي',
  'common.back-to-data': 'العودة إلى البيانات',
  'common.back-to-report': 'العودة إلى التقرير',
  'common.best-practices': 'أفضل التمارين',
  'common.beta': 'بيتا',
  'common.big-ideas': 'أفكار كبيرة',
  'common.biography': 'السيرة الشخصية',
  'common.bookmark': 'إشارة مرجعية',
  'common.bookmarks': 'إشارات مرجعية',
  'common.bookmarked-content-success':
    'سيتم إضافة {{contentType}} الذي تم وضع إشارة مرجعية عليه إلى صفحة التعليم المستقل الخاصة بك',
  'common.bookmarked-success':
    'سيتم إضافة كل المحتوى الذي تم وضع إشارة مرجعية عليه إلى صفحة التعليم المستقل الخاصة بك',
  'common.builder': 'محرِر',
  'common.cancel': 'إلغاء',
  'common.categories': 'فئات',
  'common.category': 'فئة',
  'common.categoryOptions.k12': 'روضة - الصف12',
  'common.categoryOptions.k12IN': 'K12IN',
  'common.categoryOptions.higher-ed': 'تعليم عالى',
  'common.categoryOptions.professional-dev': 'التطوير المهني',
  'common.century-skills': 'مهارات القرن الحادي والعشرين',
  'common.choose': 'اختر',
  'common.choose-file': 'اختر ملفاً',
  'common.class': 'الصف الدراسي',
  'common.classScores': 'علامات الصف الدراسي',
  'common.click-unBookmark': 'انقر لإزالة المؤشر',
  'common.close': 'إغلاق',
  'common.collection': 'مجموعة',
  'common.collection-external': 'External Collection',
  'common.collection-pl.zero': 'مجموعات',
  'common.collection-pl.one': 'مجموعة',
  'common.collection-pl.other': 'مجموعات',
  'common.collection-title': 'عنوان المجموعة',
  'common.collections': 'مجموعات',
  'common.collectionInitial': 'م',
  'common.competency': 'كفاءة',
  'common.competencies': 'كفاءات',
  'common.completed': 'تم إنجازه',
  'common.completion': 'إنجاز',
  'common.community': 'المجتمع',
  'common.confirm': 'تأكيد',
  'common.confirm-copy': 'تأكيد ونسخ',
  'common.content': 'محتوى',
  'common.content-manager': 'مدير المحتوى',
  'common.contentUnavailable': 'لا يوجد محتوى',
  'common.contentUnavailabletoday':
    'No current activities. Add  Class Activities from the Course Map or My Content.',
  'common.contentUnavailableyesterday': 'No activities were added.',
  'common.contributed-by': 'ساهم في ذلك',
  'common.copy': 'نسخ',
  'common.copy-to': 'نسخ إلى',
  'common.correct': 'صحيح',
  'common.correct-answer': 'إجابة صحيحة',
  'common.correct-answers': 'Correct Answer(s)',
  'common.incorrect-answers': 'InCorrect Answer(s)',
  'common.rubric-graded': 'Rubric Graded',
  'common.self-graded': 'Self-Graded',
  'common.rubric-grade': 'Rubric Grade',
  'common.brief': 'Brief',
  'common.update-grade-score': 'Update grade score to complete your FRQ.',
  'common.answer-this-rubric': 'Answer this rubric to complete your FRQ.',
  'common.all-caught-up': 'You are all caught up!',
  'common.no-users-to-grade': 'There are no users to grade for this FRQ.',
  'common.rubric-needs-grading': 'Rubric Needs Grading',
  'common.not-answered': 'Not Answered',
  'common.rubric-not-answered': 'Rubric Not Answered',
  'common.country': 'البلد',
  'common.course-map': 'خريطة المساق الدراسي',
  'common.course': 'مساق دراسي',
  'common.course-title': 'عنوان المساق الدراسي',
  'common.courses': 'المساقات الدراسية',
  'common.competency-status-0': 'Not Started',
  'common.competency-status-1': 'In Progress',
  'common.competency-status-2': 'Mastered (Inferred)',
  'common.competency-status-3': 'Mastered (Asserted)',
  'common.competency-status-4': 'Mastered (Earned)',
  'common.competency-status-5': 'Mastered (Demonstrated)',
  'common.create': 'أنشئ',
  'common.createClass': 'أنشئ مساق دراسي',
  'common.created-by': 'إعداد',
  'common.create-rubric': 'إنشاء سلم تقييم جديد',
  'common.current-attempt': 'الإجراء الحالي',
  'common.currently-studying': 'Currently Studying',
  'common.delete': 'حذف',
  'common.delete-instructions.links-inaccessible':
    'سيتعذر الوصول إلى  جميع الروابط المشارَكة',
  'common.delete-instructions.content-inaccessible':
    'سيتعذر وصول محتوى المساق المحذوف إلى الصفوف الدراسية المرتبطة به.',
  'common.depth-of-knowledge': 'عمق المعرفة',
  'common.description': 'وصف',
  'common.destination': 'Destination',
  'common.disappear-after-login': 'سيختفي هذا بعد  تسجيل دخول {{loginNumber}} ',
  'common.disappear-next-login': 'لن يظهر هذا عند تسجيل الدخول مرة أخرى',
  'common.district': 'مقاطعة',
  'common.domain': 'مجال',
  'common.domains': 'مجالات',
  'common.download': 'تنزيل',
  'common.download-print': 'تنزيل أو طباعة',
  'common.drag-drop-suggestions': 'أو ضع اقتراحاتك هنا.',
  'common.download-report': 'تنزيل  التقرير',
  'common.done': 'Done',
  'common.edit': 'تعديل',
  'common.date': 'Date',
  'common.showassessments': 'أظهر التقييمات',
  'common.showcollections': 'أظهر المجموعات',
  'common.showlessons': 'أظهر الدروس',
  'common.collapse': 'انطوى',
  'common.expand': 'تمدد',
  'common.edit-assessment': 'تعديل التقييم',
  'common.edit-collection': 'تعديل المجموعة',
  'common.edit-course': 'تعديل المساق الدراسي',
  'common.edit-question': 'تعديل السؤال',
  'common.edit-resource': 'تعديل المصدر',
  'common.edit-rubric': 'تعديل سلم التقييم',
  'common.email_support': 'support@gooru.org',
  'common.emotions.emotion-1': 'أحتاج للمساعدة',
  'common.emotions.emotion-2': 'لا أفهم',
  'common.emotions.emotion-3': 'الحيرة',
  'common.emotions.emotion-4': 'أفهم ذلك',
  'common.emotions.emotion-5': 'أستطيع الشرح',
  'common.enter-url': 'أدخِل رابط',
  'common.enrolled-students': 'الطلاب المسجلين',
  'common.errors.join-class-code': 'يرجى إدخال رمز الصف الدراسي',
  'common.errors.answer-has-no-image': 'يرجى تحميل الإجابة على شكل صورة',
  'common.errors.add-username': 'يرجى إدخال اسم مستخدم',
  'common.errors.add-course-title': 'يرجى إدخال عنوان المساق الدراسي',
  'common.errors.add-question-answer-text': 'يرجى إدخال نص الإجابة المختارة',
  'common.errors.add-question-description': 'يرجى إدخال السؤال',
  'common.errors.add-question-title': 'يرجى إدخال عنوان السؤال',
  'common.errors.assessment-title-presence': 'يرجى إدخال عنوان التقييم',
  'common.errors.can-not-join-class':
    'تعذر الانضمام إلى الصف الدراسي، يرجى إعادة المحاولة بعد قليل',
  'common.errors.assessment-not-added-to':
    'تعذر إضافة التقييم للدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.assessment-not-copied':
    'تعذر نسخ التقييم الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.assessment-not-created':
    'تعذر إنشاء التقييم الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.assessment-not-updated':
    'تعذر تحديث التقييم الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.category-title-presence': 'يرجى إدخال عنوان الفئة',
  'common.errors.class-min-score':
    'يجب أن يكون الحد الأدنى للعلامة بين 1 و 100',
  'common.errors.class-not-created':
    'تعذر إنشاء الصف الدراسي الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.class-title-presence': 'يرجى تسمية صفك الدراسي',
  'common.errors.collection-not-added-to':
    'يتعذر إضافة المجموعة إلى الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.collection-not-copied':
    'تعذر نسخ المجموعة في الوقت الحالي، يرجى إعادة المحاولة بعد قليل',
  'common.errors.collection-not-created':
    'تعذر إنشاء المجموعة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.collection-not-updated':
    'تعذر تحديث المجموعة الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.collection-title-presence': 'يرجى إدخال عنوان المجموعة',
  'common.errors.correct-answer-presence': 'يرجى تحديد الإجابة الصحيحة',
  'common.errors.course-not-copied':
    'تعذر نسخ المساق الدراسي في الوقت الحالي، يرجى إعادة المحاولة بعد قليل',
  'common.errors.course-not-created':
    'تعذر إنشاء المساق الدراسي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.course-not-updated':
    'تعذر تحديث المساق الدراسي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.highlight-text-not-selected': 'يرجى تحديد الإجابة الصحيحة',
  'common.errors.highlight-text-wrong-format': 'صيغة السؤال غير صحيحة',
  'common.errors.hotspot-text-max-choices':
    'لقد وصلت إلى الحد الأقصى من خيارات الإجابة',
  'common.errors.file-max-size':
    'يتم دعم الملفات التي يقل حجمها عن 5 ميغابايت فقط',
  'common.errors.file-upload-missing':
    'يرجى اختيار ملف بأي من الامتدادت التالية: {{extensiones}}',
  'common.errors.getting-next-resource':
    'حدث خطأ في تثبيت الإجابات، يرجى المحاولة مرة أخرى.',
  'common.errors.lesson-not-copied':
    'تعذر نسخ الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.lesson-not-created':
    'تعذر إنشاء الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.lesson-not-loaded':
    'تعذر تحميل الدرس في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.lesson-title-required': 'يرجى إدخال عنوان الدرس',
  'common.errors.password-confirm': 'يرجى التأكد من صحة كلمة المرور',
  'common.errors.password-length': 'يجب أن تكون كلمة المرور بين 5 و 14 حرفاً',
  'common.errors.password-not-match': 'كلمات المرور غير متطابقة',
  'common.errors.password-required': 'يرجى إدخال كلمة المرور',
  'common.errors.password-special-characters': 'يرجى عدم استخدام رموز خاصة',
  'common.errors.profile-not-updated':
    'تعذر تحديث الملف الشخصي في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.question-not-added-to':
    'تعذر إضافة سؤال إلى {{collectionType}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.question-not-copied':
    'تعذر نسخ السؤال في الوقت الحالي. يرجى  إعادة المحاولة بعد قليل',
  'common.errors.question-not-created':
    'تعذر إنشاء سؤال في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.question-not-updated':
    'تعذر تحديث السؤال في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.reset-password-error':
    'هناك خطأ ما، لا يمكن إعادة تعيين كلمة المرور. يرجى المحاولة بعد قليل',
  'common.errors.reset-google-account-exists':
    'لقد تم إنشاء حسابك باستخدام حساب جوجل، ولا يمكننا إعادة تعيين كلمة المرور الخاصة به. إذا نسيت كلمة المرور الخاصة بحساب جوجل، يجب عليك إعادة تعيينها عن طريق تطبيقات جوجل.',
  'common.errors.resource-description-length':
    'الحد الأقصى لعدد الأحرف في الوصف هو 500 حرف.',
  'common.errors.resource-invalid-url': 'رابط غير صالح',
  'common.errors.resource-missing-title': 'يرجى إدخال عنوان المصدر',
  'common.errors.resource-missing-type': 'يرجى تحديد نوع المصدر',
  'common.errors.resource-missing-url': 'يرجى إدخال رابط صالح',
  'common.errors.resource-not-added-to-collection':
    'تعذر إضافة المصدر إلى المجموعة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.resource-not-copied':
    'تعذر نسخ المصدر في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.resource-not-created':
    ' تعذر إنشاء المصدر في الوقت الحالي. الرجاء إعادة المحاولة بعد قليل',
  'common.errors.resource-not-updated':
    'تعذر تحديث المصدر في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.resource-same-host-url':
    'لا يمكن أن تكون المصادر عبارة عن روابط خاصة بجورو',
  'common.errors.resource-title-length':
    'الحد الأقصى لعدد الأحرف في العنوان هو 50 حرفاً',
  'common.errors.rubric-title-presence': 'يرجى إدخال عنوان سلم التقييم',
  'common.errors.rubric-url-presence': 'يرجى إدخال رابط سلم التقييم',
  'common.errors.select-correct-answer': 'يرجى اختيار الإجابة الصحيحة',
  'common.errors.search-collections-length': 'يرجى إدخال 3 أحرف على الأقل',
  'common.errors.sign-in-credentials-not-valid':
    'هناك خطأ ما، يرجة التأكد من اسم المستخدم وكلمة المرور والمحاولة مرة أخرى',
  'common.errors.sign-in-google-account-exists':
    'يرجى تسجيل الدخول باستخدام جوجل، لا يمكننا إعادة تعيين كلمة المرور',
  'common.errors.sign-up-error':
    'تعذر إنشاء الحساب الآن. يرجى إعادة المحاولة بعد قليل',
  'common.errors.sign-up-first-name': 'يرجى إدخال الاسم الاول',
  'common.errors.sign-up-last-name': 'يرجى إدخال اسم العائلة',
  'common.errors.sign-up-name-length':
    'يجب أن يحتوي اسم العائلة على حرفين على الأقل',
  'common.errors.sign-up-name-only-letters': 'يرجى استخدام الأحرف فقط',
  'common.errors.sign-up-valid-email': 'يرجى إدخال  بريد الكتروني صحيح',
  'common.errors.special-characters': 'يرجى عدم  استخدام الرموز أو المسافات',
  'common.errors.unit-not-copied':
    'تعذر نسخ الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.unit-not-created':
    'تعذر إنشاء الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.unit-not-loaded':
    'تعذر تحميل الوحدة في الوقت الحالي. يرجى إعادة المحاولة بعد قليل',
  'common.errors.unit-title-required': 'يرجى إدخال عنوان الوحدة',
  'common.errors.user-email-presence': 'يرجى إدخال بريد إلكتروني صالح',
  'common.errors.username-length':
    'يجب أن يتكون اسم المستخدم من 4 إلى 254 حرفاً. ',
  'common.errors.forgot-password-gmail':
    'يرجى تسجيل الدخول باستخدام جوجل، لا يمكننا إعادة تعيين كلمة المرور',
  'common.errors.no-studymaterial':
    'The course assigned to this class does not have any study material in it. Please contact your teacher to fix this',
  'common.essential-questions': 'الأسئلة الأساسية',
  'common.example': 'مثال:',
  'common.exit': 'خروج',
  'common.external-collection': 'External Collection',
  'common.explanation': 'شرح',
  'common.explore': 'ابحث',
  'common.false': 'خطأ',
  'common.featured-courses': 'المساقات الدراسية المميزة',
  'common.file-name': 'اسم الملف',
  'common.finish': 'إنهاء',
  'common.first-name': 'الاسم الأول',
  'common.follow': 'متابعة',
  'common.followers': 'متابِعون',
  'common.following': 'متابَعون',
  'common.forgotPassword': 'هل نسيت كلمة المرور؟',
  'common.from': 'من',
  'common.from-my-assessments': 'من تقييماتي',
  'common.from-my-collections': 'من مجموعاتي',
  'common.from-my-questions': 'من أسئلتي',
  'common.from-my-resources': 'من مصادري',
  'common.hide-results': 'إخفاء النتائج',
  'common.hide-correct-answer': 'Hide Correct Answer',
  'common.hints': 'تلميحات',
  'common.home': 'الصفحة الرئيسية',
  'common.if_questions': 'إذا كان لديك أية أسئلة،',
  'common.information': 'معلومات',
  'common.in-progress': 'جاري',
  'common.instructor': 'مدرب',
  'common.last-name': 'اسم العائلة',
  'common.last-updated': 'آخر تحديث',
  'common.latest-attempt': 'آخر محاولة',
  'common.launch-anonymous': 'بدء التقييم المجهول',
  'common.launch-on-air': 'التقييم المباشر',
  'common.learning-objectives': 'أهداف التعلم',
  'common.learning-target': 'معيار جزئي',
  'common.learning-target-mobile': 'المعيار الجزئي ضمن المعيارالأساسي',
  'common.lesson': 'درس',
  'common.lessonInitial': 'د',
  'common.lesson-title': 'عنوان الدرس',
  'common.lessonObj.zero': 'الدروس',
  'common.lessonObj.one': 'درس',
  'common.lessonObj.other': 'الدروس',
  'common.libraries': 'المكتبات',
  'common.license': 'رخصة',
  'common.link': 'الربط',
  'common.link-out': 'ربط خارجي',
  'common.link-out-message':
    '* إذا ظهر المصدر الخاص بك فارغاً عند المعاينة أعلاه، فقد تحتاج إلى تفعيل خاصية "ربط خارجي" لعرض المحتوى في صفحة أخرى.',
  'common.live-assessments': 'التقييمات المباشرة',
  'common.loading': 'جار التحميل ...',
  'common.login': 'تسجيل الدخول',
  'common.logout': 'تسجيل الخروج',
  'common.logout.head_1': 'Learning Navigator: ',
  'common.logout.head_2': 'Every Student',
  'common.logout.head_3': 'Achieves Mastery',
  'common.logout.description':
    'Learning Navigator is designed as “GPS for Learning” — a way for each student to follow their own path to mastery. Schools ask every student to achieve the same level of proficiency, but each student begins with a different set of knowledge and skills. The Learning Navigator meets each student exactly where they are and navigates them to their learning goals. ',
  'common.logout.logout-btn-msg1': 'You have been logout.',
  'common.logout.logout-btn-msg2': 'Click here to login.',
  'common.mastery': 'إتقان',
  'common.menu': 'القائمة',
  'common.more-details': 'مزيد من التفاصيل',
  'common.move': 'نقل',
  'common.myContent': 'المحتوى الخاص بي',
  'common.myProfile': 'My Location',
  'common.library': 'المكتبة',
  'common.myPerformance': 'آدائي',
  'common.edit-narration': 'تعديل السرد',
  'common.narration': 'السرد',
  'common.new-assessment': 'تقييم جديد',
  'common.new-collection': 'مجموعة جديدة',
  'common.new-question': 'سؤال جديد',
  'common.new-question-text': 'أدخل نص السؤال هنا',
  'common.new-fib-question-text': 'أدخل السؤال مع [الإجابة]',
  'common.new-resource': 'مصدر جديد',
  'common.next': 'التالى',
  'common.no': 'لا',
  'common.no-archived': 'لا يوجد لديك أي صفوف دراسية مؤرشفة',
  'common.no-content': 'لا يوجد محتوى',
  'common.no-content-my-report':
    'لا يوجد تقارير، سيكون لديك تقارير عند البدء بالتعلم.',
  'common.no-assessments-to-display': 'لا يوجد تقييمات',
  'common.no-collections-to-display': 'لا يوجد مجموعات',
  'common.no-courses-to-display': 'لا يوجد مساقات دراسية',
  'common.no-questions-to-display': 'لا يوجد أسئلة',
  'common.no-resources-to-display': 'لا يوجد مصادر',
  'common.no-rubrics-to-display': 'لا يوجد سلالم تقييم',
  'common.no-offline-activitys-to-display':
    'No <span>offline activities</span> to display.',
  'common.no-followers': 'لا يوجد متابِعون بعد',
  'common.no-independent-results':
    'عندما تبدأ البحث عن  {{contentType}} يحتوي على إشارة مرجعية، سيظهر هنا.',
  'common.no-results': 'لم يتمّ العثور على نتائج.',
  'common.no-available-results': 'لا يوجد نتائج',
  'common.no-results-message':
    'يرجى تفقد الإملاء، هناك خطأ ما.\nابحث في نطاق أوسع واحذف بعض مرشحات البحث.\nأو ابحث عن كلمة مشابهة.',
  'common.no-more-attempts': 'لا مزيد من المحاولات',
  'common.no-dca-student':
    'لم يقم معلمك بتعيين أي مجموعات أو تقييمات إلى نشاطات الصف اليومية.',
  'common.no-dca-teacher':
    'لا يوجد نشاطات حالية. ضِف نشاطات الصف اليومية من "خريطة المساق الدراسي" أو من "المحتوى الخاص بي"',
  'common.notScored': 'غير مسَجَّل',
  'common.notStarted': 'لم تبدأ.',
  'common.not-added': 'غير مُضاف',
  'common.not-applicable': 'غ/م',
  'common.not-following': 'أنت غير متابع لأي شخص.',
  'common.not-provided': 'غير مزوَّد',
  'common.not-specified': 'غير محدد',
  'common.not_started': 'لم تبدأ.',
  'common.nothing-to-display': 'لا شيء للعرض',
  'common.number': 'رقم',
  'common.numberStudents.zero': '{{count}} الطلاب',
  'common.numberStudents.one': '{{count}} طالب',
  'common.numberStudents.other': '{{count}} الطلاب',
  'common.of': 'من',
  'common.off': 'إيقاف',
  'common.on': 'تشغيل',
  'common.other': 'أخرى',
  'common.overall-performance': 'الآداء العام',
  'common.educational-use': 'Educational use',
  'common.resource-types': 'Resource types',
  'common.publishers': 'publishers',
  'common.password': 'كلمة المرور',
  'common.pending': 'قيد الانتظار',
  'common.performance': 'عرض الأداء',
  'common.performance-dashboard': 'لوحة التحكم بالأداء',
  'common.personal-information': 'Personal Information',
  'common.play': 'تشغيل',
  'common.please_contact': 'يرجى التواصل',
  'common.post-message': 'نشر الرسالة',
  'common.preview': 'معاينة',
  'common.profile': 'الملف الشخصي',
  'common.profile-publishing': 'إمكانية رؤية الملف الشخصي',
  'common.publish-to': 'اجعل هذا مرئيا للآخرين في مكتبة ملفي الشخصي',
  'common.published-by': 'نشرت من قبل',
  'common.published-tooltip': 'محتوى مميز',
  'common.publisher': 'الناشر',
  'common.prev': 'Prev',
  'common.progress': 'Progress',
  'common.question': 'سؤال',
  'common.questions': 'أسئلة',
  'common.questions-OE': 'أسئلة "الجواب الكتابي"',
  'common.question-pl.zero': 'أسئلة',
  'common.question-pl.one': 'سؤال',
  'common.question-pl.other': 'أسئلة',
  'common.question-title': 'عنوان السؤال',
  'common.question-type.SA': 'إجابة واحدة',
  'common.question-type.MC': 'خيارات متعددة',
  'common.question-type.FIB': 'املأ الفراغ',
  'common.question-type.T/F': 'صح أم خطأ',
  'common.question-type.T_F': 'صح أم خطأ',
  'common.question-type.MA': 'إجابات متعددة',
  'common.question-type.OE': 'إجابة كتابية',
  'common.question-type.HS_TXT': 'اختيار متعدد - نص',
  'common.question-type.HS_IMG': 'اختيار متعدد - صورة',
  'common.question-type.HT_TO': 'سحب وإفلات',
  'common.question-type.HT_RO': 'سحب وإفلات',
  'common.question-type.HT_HL': 'تظليل النص',
  'common.reaction': 'تفاعل',
  'common.read-first': 'اقرأ هذا أولاً',
  'common.remaining': 'بقي {{number}}',
  'common.remix': 'إعادة مزج',
  'common.remix-assessment': 'إعادة مزج التقييم',
  'common.remix-assessment-lead': 'أنت على وشك إعادة مزج التقييم.',
  'common.remix-assessment-success':
    'تمت إعادة مزج التقييم {{assessmentTitle}}. هل تريد تعديل هذا التقييم؟',
  'common.remix-collection': 'إعادة مزج المجموعة.',
  'common.remix-collection-lead': 'أنت على وشك إعادة مزج المجموعة.',
  'common.remix-collection-success':
    'لقد قمت بإعادة مزج مجموعة {{collectionTitle}}. هل تريد تعديل هذه المجموعة؟',
  'common.remix-course': 'إعادة مزج المساق الدراسي.',
  'common.remix-course-lead': 'أنت على وشك إعادة مزج المساق الدراسي.',
  'common.remix-course-success':
    'لقد قمت بإعادة مزج المساق الدراسي {{courseTitle}}. هل تريد تعديل هذا المساق؟',
  'common.remix-lesson': 'إعادة مزج الدرس',
  'common.remix-lesson-lead': 'أنت على وشك إعادة مزج هذا الدرس.',
  'common.remix-lesson-success': 'لقد قمت بإعادة مزج درس {{lessonTitle}}.',
  'common.remix-question': 'إعادة مزج السؤال',
  'common.remix-question-lead': 'أنت على وشك إعادة مزج السؤال.',
  'common.remix-question-success':
    'لقد قمت بإعادة مزج سؤال {{questionTitle}}. هل تريد تعديل هذا السؤال؟',
  'common.remix-resource': 'إعادة مزج المصدر',
  'common.remix-resource-lead': 'أنت على وشك إعادة مزج المصدر.',
  'common.remix-resource-success':
    'لقد قمت بإعادة مزج مصدر {{resourceTitle}}. هل تريد تعديل هذا المصدر؟',
  'common.remix-unit': 'إعادة مزج الوحدة',
  'common.remix-unit-lead': 'أنت على وشك إعادة مزج الوحدة.',
  'common.remix-unit-success': 'لقد قمت بإعادة مزج وحدة {{unitTitle}}.',
  'common.remixed-by': 'أُعيد مزجه من قبل',
  'common.remix-warning':
    'هناك الكثير من المحتوى الرائع في هذا المساق، ونسخه سيستغرق وقتاً، يرجى تأكيد بدء عملية النسخ وفي غضون 15 دقيقة ستكون نسختك على ملفك الشخصي. ',
  'common.remove': 'حذف',
  'common.report': 'تقرير',
  'common.report-in-progress': 'جاري إعداد التقرير.',
  'common.request-to': 'الطلب قيد المراجعة للحصول على شارة.',
  'common.request-report': 'طلب تقرير',
  'common.resource': 'مصدر',
  'common.resources': 'مصادر',
  'common.resource-format.image': 'صورة',
  'common.resource-format.text': 'نص',
  'common.resource-format.video': 'فيديو',
  'common.resource-format.interactive': 'تفاعلي',
  'common.resource-format.webpage': 'صفحة ويب',
  'common.resource-format.audio': 'تسجيل صوتي',
  'common.resource-format.question': 'سؤال',
  'common.resource-pl.zero': 'مصادر',
  'common.resource-pl.one': 'مصدر',
  'common.resource-pl.other': 'مصادر',
  'common.resource-title': 'عنوان المصدر',
  'common.resource-url': 'رابط المصدر',
  'common.role': 'دور',
  'common.rubric': 'سلم تقييم',
  'common.rubric-creation': 'إنشاء سلم التقييم',
  'common.rubrics': 'سلم تقييم',
  'common.rubric-title': 'عنوان سلم التقييم',
  'common.save': 'حفظ',
  'common.de-select': 'De Select',
  'common.select-all': 'Select All',
  'common.none': 'None',
  'common.add-data': 'Add Data',
  'common.update-data': 'Update Data',
  'common.all': 'All',
  'common.please-wait': 'Please Wait',
  'common.unscheduled-items': 'Unscheduled Items',
  'common.scheduled-items': 'Scheduled Items',
  'common.add-to-unschedule': 'Add to unscheduled list for',
  'common.save-next': 'حفظ والتالي',
  'common.save-submit': 'حفظ وتثبيت',
  'common.save-finish': 'حفظ وانتهاء',
  'common.school': 'مدرسة',
  'common.school-info': 'معلومات المدرسة',
  'common.score': 'العلامة',
  'common.select': 'اختر',
  'common.select-a-framework':
    'يرجى أولا اختيار إطار المعايير في قسم معلومات المساق الدراسي أعلاه.',
  'common.sentence': 'جملة',
  'common.settings': 'إعدادات',
  'common.search': 'بحث',
  'common.search-placeholder': 'بحث',
  'common.search-placeholder-text': 'بحث...',
  'common.search-error-message':
    'يجب أن تتكون مصطلحات البحث من 3 أحرف على الأقل.',
  'common.search-400-error-message': 'يرجى  إدخال مصطلح صحيح للبحث',
  'common.search-competency': 'كفاءة البحث',
  'common.search-standards': 'معايير البحث',
  'common.select-question-type': 'اختر نوع السؤال',
  'common.select-resource-type': 'اختر نوع المصدر',
  'common.send-request': 'أرسل الطلب',
  'common.share': 'مشاركة',
  'common.show-correct-answer': 'أظهر الإجابة الصحيحة',
  'common.show-more-results': 'أظهر المزيد من النتائج',
  'common.show-results': 'أظهر النتائج',
  'common.signUp': 'إنشاء حساب',
  'common.sortAlphabetical': 'فرز حسب الترتيب أبجدي',
  'common.sortAverage': 'فرز حسب المعدل',
  'common.sort-most-recently': 'فرز حسب آخر تحديث',
  'common.state': 'الدولة أو المقاطعة',
  'common.state-territory': 'الدولة/المقاطعة',
  'common.standard': 'معيار',
  'common.standards': 'المعايير',
  'common.study': 'ادرس',
  'common.study-now': 'ادرس الآن',
  'common.student': 'طالب',
  'common.students': 'Students',
  'common.student-id': 'هوية الطالب (غير ظاهرة على الملف الشخصي)',
  'common.studen-id-display':
    'هوية الطالب (غير ظاهرة على الملف الشخصي ولكن ظاهرة عند التقييم المجهول)',
  'common.subject-and-framework': 'الموضوع وإطار العمل',
  'common.subject': 'Subject',
  'common.submit': 'تثبيت',
  'common.submit-all': 'تثبيت',
  'common.submitAll': 'إرسال الكل',
  'common.submit-finish': 'تثبيت وإنهاء',
  'common.swap': 'إعادة ترتيب',
  'common.suggestion': 'اقتراح',
  'common.suggestions': 'اقتراحات',
  'common.suggested-resources': 'المصادر المقترحة',
  'common.support': 'المساعدة',
  'common.start-tour': 'قم بجولة',
  'common.take-me-there': 'انقلني إلى هناك',
  'common.teach': 'درِّس',
  'common.teacher': 'مدرس',
  'common.timeSpent': 'الوقت المستغرق',
  'common.toggle-dropdown': 'تبديل القائمة المنسدلة',
  'common.tools': 'أدوات',
  'common.true': 'صحيح',
  'common.type': 'اكتب',
  'common.title': 'Title',
  'common.unBookmark': 'إشارة مرجعية',
  'common.unexpectedError': 'حدث خطأ غير متوقع وتم الإبلاغ عنه، نعتذر عن ذلك!',
  'common.networkError':
    'Network disconnected. This may be a temporary issue. Retry later or check your internet connection.',
  'common.unfollow': 'إلغاء المتابعة',
  'common.unit': 'وحدة',
  'common.unit-title': 'عنوان الوحدة',
  'common.unitInitial': 'و',
  'common.unitObj.zero': 'وحدات',
  'common.unitObj.one': 'وحدة',
  'common.unitObj.other': 'وحدات',
  'common.untitled-course': 'المساق الدراسي  الأول',
  'common.untitled-lesson': 'درس بلا عنوان',
  'common.untitled-unit': 'وحدة بلا عنوان',
  'common.update-thumbnail': 'تحديث الصورة المصغرة',
  'common.update-photo': 'تحديث الصورة',
  'common.upload': 'تحميل',
  'common.upload-file': 'تحميل الملف',
  'common.upload-thumbnail': 'تحميل الصورة المصغرة',
  'common.upload-photo': 'تحميل الصورة',
  'common.until': 'Until',
  'common.remove-photo': 'حذف الصورة',
  'common.use-case': 'حالة الاستخدام',
  'common.valid-extensions': 'امتدادات الملفات الصالحة هي: {{extensions}}',
  'common.verified': 'تم التحقق منه',
  'common.visibility-tooltip': 'غير مرئي للآخرين',
  'common.visibility-available': 'مرئي للآخرين',
  'common.warnings.on-air-connection-lost':
    'فقدت لوحة تحكم "التقييم المباشر" الاتصال، وتتم إعادة المحاولة تلقائيا. يرجى عدم تحديث الشاشة.',
  'common.warnings.character-limit':
    'لقد وصلت إلى الحد الأقصى من عدد الأحرف المسموح به',
  'common.word': 'كلمة',
  'common.yes': 'نعم',
  'common.change-score': 'Change Score',
  'not-found.tenant.login-not-found-msg-1':
    'Gooru tenant login not found, page will be automatically redirect to ',
  'not-found.tenant.login-not-found-msg-2': 'login page in',
  'not-found.tenant.login-not-found-msg-3':
    'sec or click below button to login as',
  'index.joinUs': 'انضم الينا في "احترام حق الإنسان في التعيلم"',
  'index.browseContent.title': 'مرحباً بك! عن ماذا تبحث؟',
  'index.browseContent.description_1': 'أنا أبحث عن',
  'index.browseContent.description_2': 'مواد التعليم في',
  'index.browseContent.description_3': 'أو',
  'index.browseContent.button': 'تصفح المحتوى ',
  'index.browseContent.footer.description_1': 'هل لديك حساب؟',
  'index.browseContent.footer.description_2': 'هنا.',
  'index.browseContent.footer.login': 'تسجيل الدخول',
  'index.browseContent.grades_missing_message':
    'يرجى تحديد المرحلة الدراسية والموضوع.',
  'index.browseContent.subjects_missing_message': 'يرجى تحديد الموضوع',
  'index.gettingStarted.title': 'بدء استخدام موقع جورو',
  'index.gettingStarted.toolkit.title': 'أدوات بدء الاسنخدام',
  'index.gettingStarted.toolkit.description':
    'مرحبا بكم في جورو! ألق نظرة على هذه المصادر لمعرفة ما يمكنك القيام به مع جورو والبدء بسرعة.',
  'index.gettingStarted.classroom.title': 'قصص من الصف الدراسي',
  'index.gettingStarted.classroom.description':
    'تعلم مقتدياً بالقصص المطروحة من قبل المعلمين الذين يقولون أن جورو قد أحدث فرقاً في صفوفهم الدراسية.',
  'index.gettingStarted.events.title': 'أهم الأحداث.',
  'index.gettingStarted.events.description':
    'نقدم ندوات ودورات تدريبية مجانية لمساعدتك في البدء مع جورو.',
  'index.empowerStudents.title': 'تمكين الطلاب من التعلم على طريقتهم الخاصة.',
  'index.empowerStudents.find': 'جد',
  'index.empowerStudents.remix': 'إعادة مزج',
  'index.empowerStudents.share': 'مشاركة',
  'index.empowerStudents.monitor': 'راقِب',
  'index.findDescription':
    'تصفح الآلاف من المجموعات من الروضة وحتى الصف 12 التي أعدّها المعلمون  أو ابحث فيما يزيد عن 16 مليون مصدر. ',
  'index.remixDescription':
    'أعد مزج المجموعات ونسق المحتوى لتلبية احتياجات طلابك.',
  'index.shareDescription':
    'شارك المجموعات مع طلابك من خلال صفوف جورو. تسجيل الدخول غير مطلوب.',
  'index.monitorDescription':
    'قم بقياس مدى تقدم وتفاعل الطلاب، للتدخل المباشر إذا تطلب الأمر ذلك.',
  'index.freeAndOpen.title': 'مجاني ومتوفر دائماً',
  'index.freeAndOpen.description':
    'نؤمن بان التعليم حق من حقوق الإنسان. سيقدم موقع جورو للمعلمين والطلاب في جميع انحاء العالم خدمات تعليم مجانية دائمة وبدون إعلانات. ',
  'index.freeAndOpen.button': 'تعلم المزيد عن نهجنا',
  'class.info.class-info': 'معلومات الصف االدراسي',
  'class.info.teachers': 'المعلمون',
  'class.info.students': 'الطلاب',
  'class.info.subject': 'موضوع',
  'class.info.grade': 'مرحلة دراسية',
  'class.info.description': 'وصف',
  'class.info.edit-info': 'تعديل المعلومات',
  'class.info.share-class': 'شارك الصف الدراسي',
  'class.info.invite-co-teachers': 'قم بدعوة المعلمين المشاركين',
  'class.info.add-students': 'ضِف الطلاب',
  'class.info.class-code': 'رمز الصف الدراسي',
  'class.info.delete': 'حذف الصف الدراسي',
  'class.edit.assigned-course': 'المساق الدراسي المُعيّن',
  'class.edit.basic-info': 'معلومات أساسية',
  'class.edit.class-name': 'اسم الصف الدراسي',
  'class.edit.class-greetings': 'إعلانات الصف الدراسي',
  'class.edit.class-greetings-placeholder':
    'ألقِ التحية على طلابك أو حفزهم أو أنشئ إعلاناً لهم...إلخ',
  'class.edit.class-minscore': 'علامة التقييم الدنيا للجوائز (1-100%)',
  'class.edit.course-map': 'خريطة المساق الدراسي',
  'class.edit.edit-class': 'تعديل إعدادات الصف الدراسي',
  'class.overview.title': 'خريطة المساق الدراسي',
  'class.overview.locate': 'حدد موقعي',
  'class.overview.edit-content': 'تعديل المحتوى',
  'class.overview.add-to-daily-class-activities': 'ضِف إلى أنشطة الصف اليومية',
  'class.overview.assigned-course': 'Your assigned course',
  'class.overview.pre-study-title': 'Pre-study for your course',
  'class.overview.course-map.rescope-toggle': 'Show Complete Course',
  'class.overview.course-map.rescope-info':
    'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.',
  'class.overview.course-map.learning-path':
    'Your learning path has lessons to cover the gaps in your proficiency to your destination. Your class grade level milestone shows competencies already mastered (shown in italics in a light grey background), while the mastered ones are hidden for other milestones. Turn on this switch to view the lessons for mastered competencies in the other milestones.',
  'class.overview.course-map.custom-msg':
    'We are personalizing this course specifically for you based on your proficiency. Please check back in a little while to see the personalized course map.',
  'class.overview.course-map.route0-bannerdesc':
    'As per your competency profile, there are some competencies that you need to master so that you can do well in this course. We have a route that we recommend you take to master these competencies. Click here to see the details.',
  'class.analytics.performance.title': 'عرض الأداء',
  'class.analytics.performance.better-experience-message':
    'للحصول على تجربة أفضل مع جورو، قم بعرض التحليل الخاص بالصف الدراسي على الحاسوب المكتبي أو الحاسوب اللوحي.',
  'class.analytics.performance.no-content': 'لم يبدأ طلابك بدراسة أي مساق بعد.',
  'class.analytics.performance.actions.share': 'مشاركة',
  'class.analytics.performance.actions.edit': 'تعديل المحتوى',
  'class.analytics.performance.actions.download': 'تنزيل',
  'class.analytics.performance.actions.fullScreen': 'عرض ملء الشاشة',
  'class.analytics.performance.actions.exitFullScreen': 'تصغير الشاشة ',
  'class.analytics.performance.actions.assessment': 'عرض التقييم',
  'class.analytics.performance.actions.collection': 'عرض المجموعة',
  'class.analytics.performance.actions.both': 'عرض كلاهما',
  'class.analytics.performance.teacher.metricsTable.average': 'معدل',
  'class.analytics.performance.teacher.metricsTable.class-average': 'معدل الصف',
  'class.analytics.performance.grade-items': 'بنود الصف',
  'class.analytics.performance.no-grade-items':
    'Looks like you’re all caught up!',
  'class.analytics.performance.gru-grade-items.students.zero':
    '{{count}} الطلاب',
  'class.analytics.performance.gru-grade-items.students.one': '{{count}} طالب',
  'class.analytics.performance.gru-grade-items.students.other':
    '{{count}} الطلاب',
  'class.analytics.performance.gru-grade-items.students.not-started':
    'لم تبدأ.',
  'class.analytics.mastery.title': 'عرض الإتقان',
  'class.quick-start.title': 'تعيين محتوى لهذا الصف الدراسي.',
  'class.quick-start.new-course': 'ابدأ مساق درسي جديد سريعاً',
  'class.quick-start.new-course-desc':
    'ابدأ بإنشاء مساق دراسي جديد، أو مجموعة أو تقييم',
  'class.quick-start.course': 'مساق دراسي جديد',
  'class.quick-start.new-collection': 'مجموعة جديدة',
  'class.quick-start.new-assessment': 'تقييم جديد',
  'class.quick-start.remix-a-sample': 'امزج عينة',
  'class.quick-start.add-existing-course': 'ضِف مساق دراسي من مكتبتك',
  'class.quick-start.existing-course-desc': 'الطريقة الأسرع لبدء الصف الدراسي',
  'class.quick-start.choose-course': 'اختر المساق الدراسي',
  'class.quick-start.remix-from-course': 'امزج مساقاً دراسياً مميزاً',
  'class.quick-start.featured-course': 'عرض المساقات الدراسية المميزة',
  'class.quick-start.remix-desc': 'انسخ ونسق درساً مميزاً لطلابك',
  'class.quick-start.browse-content': 'or browse our content catalogs.',
  'classes.classesJoined': 'الصفوف الدراسية التي انضممت إليها',
  'classes.classesTaught': 'الصفوف التي أدرّسها',
  'classes.noClassesJoined': 'لم تنضم إلى أي صف دراسي',
  'classes.noClassesTaught': 'لم تنشئ أي صف دراسي',
  'content.assessments.edit.best-practices':
    'التقييم هو مجموعة من الأسئلة، كل سؤال بعلامة معينة، من خلال الإجابة عليها تستطيع أنت وطلابك تحديد مدى استيعابهم للدرس وتقييم الآداء. \n\nاستخدم أنواع مختلفة من الأسئلة في تقييمك بما في ذلك أسئلة متعددة تابعة لائتلاف تقييم متوازن أذكي(SBAC)، حتى يعبّر الطلاب عن استعيعابهم بطرق  مختلفة. و ننصح بربط الأسئلة بالمعايير والمعايير الجزئية الخاصة بها، ومفهوم عمق المعرفة لنورمان ويب.',
  'content.classes.create.title': 'أنشئ صف دراسي',
  'content.classes.create.content': 'حيث يستطيع الطلاب التفاعل مع المحتوى',
  'content.classes.create.class-name-input': 'قم بتسمية صفك الدراسي',
  'content.classes.create.condition-prompt':
    'كيف سينضم الطلاب إلى صفك الدراسي؟',
  'content.classes.create.condition-prompt-code':
    'أي شخص لديه رمز الصف الدراسي',
  'content.classes.create.condition-prompt-invite': 'دعوة فقط',
  'content.classes.create.get-started': 'ابدأ',
  'content.classes.join.title': 'انضم إلى صف دراسي جديد',
  'content.classes.join.join-a-classroom': 'Join a  Classroom',
  'content.classes.join.content': 'حيث تبدأ الرحلة.',
  'content.classes.join.not-now': 'ليس الان',
  'content.classes.join.class-code-input': 'أدخل رمز الصف الدراسي',
  'content.classes.join.class-not-found':
    'لم يتم العثور على الصف الدراسي. تأكد من إدخال رمز الصف الدراسي الصحيح.',
  'content.classes.join.invalid-code': 'رمز الصف الدراسي غير صالح.',
  'content.classes.join.join-not-allowed':
    'The class you are trying to join is no longer active. Please contact your teacher for the correct class code.',
  'content.classes.join.already-member': 'أنت عضو في هذا الصف  الدراسي بالفعل.',
  'content.classes.join.join-class': 'انضم للصف الدراسي',
  'content.classes.join.terms-and-conditions':
    'من خلال النقر على الانضمام إلى الصف الدراسي، أوافق على مشاركة بيانات تقدُّم تقييمي ومجموعتي التي تم إنشاؤها من خلال الدراسة في هذا الصف الدراسي ومعلميه في جورو.',
  'content.collections.edit.assign-to-course': 'تعيين إلى المساق الدراسي',
  'content.collections.edit.best-practices':
    'يستطيع الطلاب التفاعل مع المحتوى في مرحلة "المجموعة" ، فعند إنشاء مجموعة تعليمية تأكد من احتوائها على أهداف التعلم، مع الأخذ بعين الاعتبار استخدام أنواع متعددة من المصادر لعرض المفاهيم للطلاب وبطرق متعددة.\nاستخدم المصادر بشكل متسلسل لبناء المفاهيم، التقدم في مرحلة " المجموعة" يجب أن يتمّ بشكل منطقي، ويجب أن ينقل الطلاب المستهدفين من مرحلة عامة إلى مرحلة أكثر تعقيداً من الاستيعاب إذا كان ذلك مناسباً، أو أن يسمح باكتشاف مستوى الطلاب بشكل كافٍ.\n\nيمكنك أيضا للتحقق من مدى استيعاب الطلاب من خلال أسئلة جورو أو الوسائل التفاعلية الأخرى. نوصي بما يكفي من المصادر و/ أو تنوّع كاف من المصادر لتحقيق أهداف المجموعة والتأكد من أن كل مصدر له دور وهدف معين.',
  'content.courses.edit.assign-to-class': 'تعيين إلى الصف',
  'content.courses.edit.best-practices':
    'المساق الدراسي هو ملف يسمح لك بتنظيم المحتوى التعليمي الخاص بك على شكل وحدات ودروس. عند إنشاء مساق دراسي يجب أن تأخذ بعين الاعتبار الأسئلة الأساسية وأهداف التعلم وتنظيم المحتوى الخاص بك.\n\nتستطيع  تجميع الدروس معاً لإنشاء تجربة مختلفة لطلابك (مثال: يمكنك ترتيب الوحدات حسب التسلسل الزمني أو الموضوع أو المعيار)',
  'content.courses.edit.information.course-title': 'عنوان المساق الدراسي',
  'content.courses.edit.information.description': 'وصف',
  'content.questions.edit.add-to': 'إضافة إلى',
  'content.questions.edit.best-practices':
    'السؤال هو مصدر يتطلب الإجابة عليه من قبل الطالب، ونحن نقدم أنواعاُ مختلفة من الأسئلة لدعم طبيعة تلك التي سيراها طلابك على ائتلاف تقييم متوازن أذكي (SBAC) و الشراكة من أجل تقييم الجاهزية للكلية والوظائف(PARCC)  والتقييمات الأخرى. \n\nيجب أن تأخذ بعين الاعتبار تنويع طريقة اختيارك لطبيعة الأسئلة من حين لآخر، حتى تُعرّض الطلاب لأنواع مختلفة من االأسئلة، إضافة إلى تزويدهم بصيغ متعددة لكي يتمكنوا من اظهار استيعابهم بطرق مختلفة.\n\nاربط الأسئلة بالمعايير والمعايير الجزئية الخاصة بها، وبمفهوم عمق المعرفة لنورمان ويب، حتى تتمكن من رؤية مدى تفاعل طلابك مع الأسئلة من خلال لوحة التحكم الخاصة بك.',
  'content.questions.edit.information.question-title': 'عنوان السؤال',
  'content.questions.edit.information.question-type': 'نوع السؤال',
  'content.questions.edit.builder.add-answer-choice': '+ ضِف خيار سؤال',
  'content.questions.edit.builder.add-hint': 'ضِف تلميحات',
  'content.questions.edit.builder.add-explanation': 'ضِف شرح',
  'content.questions.edit.builder.answer': 'إجابة',
  'content.questions.edit.builder.answer-instructions.FIB':
    'ضِف ما يصل إلى 5 ملحوظات وشرح للإجابة.',
  'content.questions.edit.builder.answer-instructions.HS_IMG':
    'يمكنك إضافة ما يصل إلى 10 إجابات على شكل صورة واختيار إجابة صحيحة واحدة أو أكثر.',
  'content.questions.edit.builder.answer-instructions.HS_TXT':
    'يمكنك إضافة ما يصل إلى 10 إجابات على شكل خيارات واختيار إجابة صحيحة واحدة أو أكثر.',
  'content.questions.edit.builder.answer-instructions.HT_HL_ST':
    'عند كتابة السؤال، استخدم الأقواس للإشارة إلى الجمل المظللة. بحيث يحتوي زوج الأقواس الواحد على جملة واحدة فقط تنتهي بنقطة. مثال: بنى الخنزير الأول الصغير منزله من القش. (هاجم الذئب السيء الكبير المنزل من الأسفل.) بنى الخنزير الثاني بيته من الخشب. الحد الأقصى للأحرف: 5000',
  'content.questions.edit.builder.answer-instructions.HT_HL_WD':
    'عند كتابة السؤال، استخدم الأقواس للإشارة إلى الكلمات المظللة. بحيث يحتوي زوج الأقواس الواحد على كلمة واحدة فقط. مثال: هاجم الذئب الشرير (الكبير) المنزل من (الأسفل). الحد الأقصى للأحرف: 5000',
  'content.questions.edit.builder.answer-instructions.HT_RO':
    'يمكنك إضافة ما يصل إلى 10 إجابات بالترتيب الصحيح. حيث أن الترتيب سيكون عشوائيا لدى الطلاب.',
  'content.questions.edit.builder.answer-instructions.MA':
    'يمكنك إضافة ما يصل إلى 10 إجابات وصورة وشرح وما يصل إلى 5 تلميحات.',
  'content.questions.edit.builder.answer-instructions.MC':
    'يمكنك إضافة ما يصل إلى 10 إجابات وتحديد إجابة صحيحة واحدة. الحد الأقصى للأحرف: 200 ',
  'content.questions.edit.builder.answer-instructions.OE':
    'اكتب الإجابة الصحيحة. الحد الأقصى للأحرف: 5000.',
  'content.questions.edit.builder.answer-instructions.T/F':
    'اختر الإجابة الصحيحة.',
  'content.questions.edit.builder.question-instructions.FIB':
    'عند كتابة السؤال بصيغة "املأ الفراغ"، استخدم الأقواس لتحديد الكلمات التي يجب أن يكون مكانها فارغاً في الجملة. مثال: "هاجم (الذئب) الشرير الكبير (المنزل) من الأسفل." يمكنك إضافة صورة أيضاً.',
  'content.questions.edit.builder.question-instructions.HS_TXT': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.HS_IMG': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.HT_RO': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.HT_HL':
    'وجِه سؤالاً لطلابك.',
  'content.questions.edit.builder.question-instructions.MC': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.MA': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.OE': 'اكتب سؤالك.',
  'content.questions.edit.builder.question-instructions.T/F': 'اكتب سؤالك.',
  'content.questions.edit.builder.submission-format.title':
    'نموذج تقديم الطالب',
  'content.questions.edit.builder.submission-format.answer-type.text-box':
    'مربع النص',
  'content.questions.edit.builder.feedback-grading.title':
    'التغذية الراجعة و العلامة',
  'content.questions.edit.builder.feedback-grading.from-existing-rubric':
    'من سلم التقييم الحالي',
  'content.questions.edit.builder.feedback-grading.scoring': 'العلامة',
  'content.questions.edit.builder.feedback-grading.maximum-points':
    'الحد الأعلى لعدد النقاط',
  'content.questions.edit.builder.feedback-grading.increment':
    'الحد الأدنى لعدد النقاط',
  'content.questions.edit.builder.feedback-grading.rubric-error':
    'يرجا إضافة سلم تقييم',
  'content.modals.delete-bookmark.confirmation':
    'هل تريد حذف االإشارة المرجعية عن الـ {{type}}؟',
  'content.modals.delete-bookmark.delete-error':
    'تعذر حذف الإشارة المرجعية عن هذا الـ {{type}} الآن. يرجى إعادة المحاولة بعد قليل.',
  'content.modals.remove-class-activity.confirmation':
    'هل أنت متأكد من حذف هذا {{type}} من قائمة نشاطات الصف اليومية؟ ',
  'content.modals.remove-class-activity.delete-error':
    'تعذر حذف هذا {{type}} الآن، يرجى المحاولة بعد قليل.',
  'content.modals.delete-class.legend': 'أنت على وشك حذف صفك الدراسي',
  'content.modals.delete-class.student-access':
    'لن يتمكن الطلاب من الولوج للصف الدراسي',
  'content.modals.delete-class.student-data-deleted':
    'سيتم حذف جميع بيانات الطالب.',
  'content.modals.archive-class.title': 'قم بأرشفة الصف الدراسي',
  'content.modals.archive-class.legend': 'أنت على وشك أرشفة الصف الداسي ',
  'content.modals.archive-class.links-not-accessible':
    'سيتعذر الوصل إلى جميع الروابط المشاركة',
  'content.modals.archive-class.students-no-access':
    'لن يتمكن الطلاب من ولوج الصف الدراسي',
  'content.modals.archive-class.not-add-students':
    'لن تتمكن من إضافة المزيد من الطلاب إلى الصف الدراسي',
  'content.modals.archive-class.confirmation': 'هل أنت متأكد من أرشفة ',
  'content.modals.delete-content.legend': 'أنت على وشك حذف',
  'content.modals.delete-content.content-legend':
    '{{title}} - {{index}} {{type}} من {{parentName}}',
  'content.modals.delete-content.content-legend-header':
    '{{title}} من {{parentName}}',
  'content.modals.delete-content.delete-warning':
    'سيتم حذف جميع المحتويات الموجودة في هذا {{type}}',
  'content.modals.delete-content.delete-error':
    'تعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
  'content.modals.delete-content.confirmation':
    'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه وانقر على "حذف".',
  'content.modals.delete-resource.legend':
    'يرجى تأكيد حذف {{title}} بشكل نهائي.',
  'content.modals.delete-resource.delete-warning':
    'سيتم حذف جميع المحتويات الموجودة في هذا {{type}}',
  'content.modals.delete-resource.delete-error':
    'تعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
  'content.modals.delete-resource.confirmation':
    'هل تريد المتابعة؟ يرجى النقر على \'حذف نهائي\'.',
  'content.modals.delete-resource.first-check':
    'هذا حذف نهائي ولا يمكن التراجع عنه.',
  'content.modals.delete-resource.second-check':
    'سيتم حذف جميع نسخ هذا المصدر في مجموعاتك ومجموعات أي مستخدم في منظمتك.',
  'content.modals.delete-rubric.legend': 'يرجى تأكيد حذف {{title}} بشكل نهائي.',
  'content.modals.delete-rubric.delete-warning':
    'سيتم حذف المحتوى من سلم التقييم هذا',
  'content.modals.delete-rubric.delete-error':
    'يتعذر حذف سلم التقييم الآن، يرجى المحاولة بعد قليل. ',
  'content.modals.delete-rubric.confirmation':
    'هل تريد المتابعة؟ يرجى النقر على \'حذف نهائي\'.',
  'content.modals.delete-rubric.first-check':
    'هذا حذف نهائي ولا يمكن التراجع عنه.',
  'content.modals.remove-content.legend':
    'أنت على وجد حذف {{title}} من {{parentName}}',
  'content.modals.remove-content.remove-error':
    'يتعذر حذف {{type}} في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
  'content.modals.remove-content.confirmation':
    'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه والنقر على "حذف".',
  'content.modals.remove-student.title': 'حذف الطالب وبياناته',
  'content.modals.remove-student.legend':
    'أنت على وشك حذف{{studentName}} من هذا الفصل الدراسي وحذف جميع بياناته.',
  'content.modals.remove-student.data-inaccessible':
    'سيتم حذف جميع البيانات الخاصة به  ولا يمكن الوصول إليها من قبل أيٍ منكم.',
  'content.modals.remove-student.classroom-access':
    'لن يتمكن من الوصول إلى الصفوف الدراسية أو المحتوى.',
  'content.modals.remove-student.data-lost':
    'في حال انضمامه مرة أخرى، سيفقد جميع البيانات السابقة.',
  'content.modals.remove-student.remove-error':
    'تعذر حذف هذا الطالب في الوقت الحالي. يرجى إعادة المحاولة بعد قليل.',
  'content.modals.remove-student.confirmation':
    'هل تريد المتابعة؟ يرجى كتابة "حذف" أدناه وانقر على "حذف".',
  'content.modals.quick-remove-content.legend':
    'يرجى تأكيد حذف {{title}} من {{parentName}}.',
  'content.modals.quick-delete-content.legend':
    'يرجى تأكيد حذف {{title}} من {{parentName}} بشكل نهائي.',
  'content.modals.quick-delete-content.delete': 'حذف نهائي',
  'content.resources.edit.best-practices':
    ' المصادر عبارة عن وسائط متعددة بصيغ مختلفة كالفيديوهات، والمحتوى التفاعلي والمواقع الإلكترونية وصور ومستندات جوجل وغيرها. كن مبدعاً واستخدم مصادرك الخاصة  أو ابحث بدهاء في مخزون جورو الوافر من المصادر.\n\nاستخدم المصادر بصيغها المتنوعة  لجذب انتباه طلابك إضافة للشرح الكلامي لإرشادهم أثناء استخدام المصدر. \n\nكما ننصح بربط كل سؤال بالمعايير الخاصة به أو المعايير الجزئية، و مهارات القرن الواحد والعشرين. يمكنك مراقبة تفاعل الطلاب مع المصادر من خلال لوحة التحكم الخاصة بك.',
  'content.resources.edit.placeholder-message': 'ضِف المصدر لمعاينته هنا.',
  'content.resources.edit.not-implemented': 'لم تتم معاينة المصدر بعد',
  'content.resources.edit.information.im-publisher': 'أنا الناشر',
  'content.resources.edit.information.select-a-license': 'يرجى اختيار  رخصة',
  'user.active-classrooms': 'الصفوف الدراسية النشِطة',
  'user.archived-classrooms': 'الصفوف الدراسية المؤرشفة',
  'user.classrooms': 'الصفوف الدراسية',
  'user.rgo': 'RGO',
  'user.create-class': 'أنشئ صفاً دراسياً',
  'user.hello': 'مرحباً، {{name}}!',
  'user.independent-learning': 'التعليم المستقل',
  'user.join-class': 'انضم للصف الدراسي',
  'user.joined-classes.zero': 'أنت مسجِل حالياً في {{count}} صف دراسي',
  'user.joined-classes.one': 'أنت مسجِل حالياً في صف دراسي واحد',
  'user.joined-classes.other': 'أنت مسجِل حالياً في {{count}} صف دراسي',
  'user.my-current-classes': 'صفوفي الدراسية الحالية',
  'user.manage-goals': 'إدارة الأهداف',
  'user.my-classes': 'صفوفي الدراسية',
  'user.teaching-classes.zero': 'أنت تٌعلِّم حالياً {{count}} صف دراسي',
  'user.teaching-classes.one': 'أنت تٌعلِّم حالياً عصف دراسي واحد',
  'user.teaching-classes.other': 'أنت تٌعلِّم حالياً {{count}} صف دراسي',
  'student-landing.announcement': 'إعلان',
  'student-landing.browse-featured-courses': 'تصفح مساقاتنا الدراسية المميزة',
  'student-landing.browse-our': 'تصفح',
  'student-landing.class-code': 'رمز الصف',
  'student-landing.featured-courses': 'المساقات الدراسية المميزة',
  'student-landing.class.assigned-course': 'المساق الدراسي المعيّن',
  'student-landing.class.back-to': 'العودة إلى الصفوف الدراسية',
  'student-landing.class.no-course': 'لا يوجد مساقات دراسية في هذا الصف.',
  'student-landing.class.no-course-assigned': 'لم يتم تعييم مساق دراسي',
  'student-landing.class.back-to-independent': 'العودة إلى التعليم المستقل.',
  'student-landing.class.report': 'تقرير',
  'student-landing.class.performance': 'أداء',
  'student-landing.class.course-map': 'خريطة المساق الدراسي',
  'student-landing.class.unit': 'وحدة',
  'student-landing.class.lesson': 'درس',
  'student-landing.class.class-activities': 'أنشطة الصف اليومية',
  'student-landing.class.class-activities-tab.today': 'اليوم',
  'student-landing.class.class-activities-tab.past-activities':
    'Past Activities',
  'student-landing.class.my-report': 'تقريري',
  'student-landing.class.my-location': 'تقريري',
  'student-landing.class.my-proficiency': 'My Proficiency',
  'student-landing.class.establish-skyline': 'Let\'s Establish your Skyline',
  'student-landing.class.waiting-establish-skyline':
    'Waiting for your teacher to complete setting up the class.',
  'student-landing.class.setup-in-complete-desc1':
    'It looks like your teacher has not',
  'student-landing.class.setup-in-complete-desc2': 'updated class settings',
  'student-landing.class.setup-in-complete-desc3':
    'Please get in touch with her to resolve the matter. Once everything is correctly set up, refresh this page.',
  'student-landing.course.to-report': 'ملخص الاستخدام',
  'student-landing.course.total-time-spent': 'إجمالي الوقت المستغرق',
  'student-landing.current-activity': 'النشاط الحالي',
  'student-landing.resume-current-activity': 'لخِّص النشاط الحالي',
  'student-landing.last-activity': 'Last Activity',
  'student-landing.start-studying': 'Start Studying',
  'student-landing.not-available': 'غير متوفر',
  'student-landing.join-classroom': 'انضم لصف معلمك الدراسي لبدء التعلم',
  'student-landing.learn': 'تعلم مع صف جورو الدراسي',
  'student-landing.my-performance.activity': 'نشِط ',
  'student-landing.my-performance.activities.study': 'ادرس',
  'student-landing.my-performance.assessments': 'التقييمات',
  'student-landing.my-performance.collections': 'مجموعات',
  'student-landing.my-performance.filter': 'مُرشِح',
  'student-landing.my-performance.primary-text':
    'قم باختيار الأشياء التي تريد تحليلها، وسنقوم بإنشاء تقرير خاص بالأداء.',
  'student-landing.my-performance.subject': 'موضوع',
  'student-landing.my-performance.title': 'حلل أدائك',
  'student-landing.my-performance.time-period': 'فترة زمنية',
  'student-landing.my-performance.update-report': 'تحديث التقرير',
  'student-landing.study-player': 'Study Player',
  'student-landing.my-study': 'دراستي',
  'student-landing.no-classrooms':
    'لم تنضم إلى أي صف دراسي بعد . انقر على "انضم للصف" لإضافة الصف الخاص بمعلمك. بإمكانك أن تبحث عن الصفوف الدراسية المميزة تحت علامة تبويب "المكتبة".',
  'student-landing.no-content-classrooms': 'لا يوجد محتوى في هذا الصف حالياً',
  'student-landing.welcome': 'مرحبا بكم في جورو',
  'student-landing.no-course-assigned':
    'No course has been assigned to this class yet. Please contact your teacher.',
  'student-independent-learning.show-more': 'أظهر المزيد',
  'student-independent-learning.show-less': 'أظهر القليل',
  'student-independent-learning.no-courses':
    'ستظهر لك المساقات الدراسية التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
  'student-independent-learning.no-collections':
    'ستظهر لك المجموعات التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
  'student-independent-learning.no-assessments':
    'ستظهر لك التقييمات التي تم وضع إشارات مرجعية عليها عندما تبحث عنها هنا. ',
  'student-independent-learning.no-independent-results':
    'ابحث عن "المكتبة" لتعلم أشياء جديدة.',
  'student-independent-learning.no-bookmarks':
    'ستظهر المساقات الدراسية والمجموعات والتقييمات عندما يتم وضع إشارات مرجعية عليها هنا. ',
  'student-independent-learning.add-bookmark': 'ضِف إشارة مرجعية',
  'teacher-landing.latest-announcement': 'أحدث إعلان',
  'teacher-landing.latest-assessment': 'أحدث تقييم',
  'teacher-landing.create-classroom':
    'أنشئ صفاً دراسياً ثم عين المحتوى ثم قم بدعوة طلابك.',
  'teacher-landing.dca-create-info':
    'Click on the icons below and search for content from the Gooru Library to create a  class activity. You can also add content to  class activity from your course map by clicking on Course Map.',
  'teacher-landing.schedule-for-later': 'Schedule For Later',
  'teacher-landing.teach-this-activity-later':
    'teach this activity later at DCA',
  'teacher-landing.schedule-dca-instruction-1':
    'Pick a later date on which to teach this activity.',
  'teacher-landing.schedule-dca-instruction-2':
    'This activity will appear at DCA for the chosen date.',
  'teacher-landing.navigator-banner.title': 'Navigator for Math',
  'teacher-landing.navigator-banner.description':
    'Utilizing this GPS for Learning technology, we have designed Navigator for Math to ensure that every student can gain confidence and accelerate their learning in math.<br/>Navigator for Math is a course of study covering all math concepts from grades 2-12. Students are routed and rerouted through an individualized pathway designed to build on their current knowledge, as well as fill gaps in their understanding. Through this comprehensive and personalized learning experience, every student can become fully prepared for more advanced math.',
  'teacher-landing.navigator-banner.join': 'Join Demo Class',
  'teacher-landing.navigator-banner.success-message':
    'You have successfully joined as a co-teacher of the Navigator class',
  'teacher-landing.navigator-banner.error-message':
    'Problem with joining class',
  'teacher-landing.class.atc-view.progress-to-destination':
    'progress to destination',
  'teacher-landing.class.manage': 'Manage',
  'teacher-landing.class.reports': 'Reports',
  'teacher-landing.class.daily-activites': 'Daily Activites',
  'teacher-landing.class.courses': 'Course',
  'teacher-landing.class.back-to': 'العودة إلى الصفوف الدراسية',
  'teacher-landing.class.back-to-archived': 'العودة للصفوف الدراسية المؤرشفة ',
  'teacher-landing.class.class-management': 'إدارة الصف الدراسي. ',
  'teacher-landing.class.atc': 'ATC',
  'teacher-landing.class.performance-overview': 'Performance Overview',
  'teacher-landing.class.student-proficiency': 'Student Proficiency',
  'teacher-landing.class.class-management-tab.actions': 'أفعال',
  'teacher-landing.class.class-management-tab.assessment-min-score':
    'تقييم الحد الأدنى من النقاط للحصول على الجوائز',
  'teacher-landing.class.class-management-tab.assigned-course':
    'المساق الدراسي المعيّن',
  'teacher-landing.class.class-management-tab.archive': 'الأأرشيف',
  'teacher-landing.class.class-management-tab.archive-class': 'قم بأرشفة الصف.',
  'teacher-landing.class.class-management-tab.archive-classroom':
    'Archive Classroom',
  'teacher-landing.class.class-management-tab.attend-class-with-code':
    'احضر الصف مع رمزك الخاص.',
  'teacher-landing.class.class-management-tab.class-information':
    'معلومات الصف',
  'teacher-landing.class.class-management-tab.class-name': 'اسم الصف الدراسي',
  'teacher-landing.class.class-management-tab.class-code': 'رمز الصف',
  'teacher-landing.class.class-management-tab.click-to-copy-class-code':
    'انقر لنسخ رمز الصف',
  'teacher-landing.class.class-management-tab.course-information':
    'معلومات المساق الدراسي',
  'teacher-landing.class.class-management-tab.delete': 'حذف',
  'teacher-landing.class.class-management-tab.delete-class': 'حذف الصف',
  'teacher-landing.class.class-management-tab.download-roster': 'تنزيل القائمة',
  'teacher-landing.class.class-management-tab.edit': 'تعديل',
  'teacher-landing.class.class-management-tab.email-address':
    'عنوان البريد الإلكتروني',
  'teacher-landing.class.class-management-tab.first-name': 'الاسم الأول',
  'teacher-landing.class.class-management-tab.import-roster': 'استيراد القائمة',
  'teacher-landing.class.class-management-tab.last-name': 'اسم العائلة',
  'teacher-landing.class.class-management-tab.message': 'رسالة',
  'teacher-landing.class.class-management-tab.performance': 'أداء',
  'teacher-landing.class.class-management-tab.students': 'الطلاب',
  'teacher-landing.class.class-management-tab.student-name': 'اسم الطالب',
  'teacher-landing.class.class-management-tab.student-id': 'هوية الطالب',
  'teacher-landing.class.class-management-tab.teachers': 'المعلمون',
  'teacher-landing.class.class-management-tab.view-report': 'عرض التقرير',
  'teacher-landing.class.class-management-tab.course-null':
    'The classroom has no course assigned yet.',
  'teacher-landing.class.class-management-tab.course-subject-null':
    'The course assigned to classroom has not been tagged to a valid subject.',
  'teacher-landing.class.class-management-tab.students-null':
    'شارك رمز الصف مع الطلاب ليتمكنوا من الانضمام لصفك الدراسي.',
  'teacher-landing.class.students-tab.last-name': 'Lastname',
  'teacher-landing.class.students-tab.first-name': 'Firstname',
  'teacher-landing.class.students-tab.performance': 'Performance',
  'teacher-landing.class.students-tab.proficiency': 'Proficiency',
  'teacher-landing.class.students-tab.location': 'Location',
  'teacher-landing.class.students-tab.currently-studying': 'Currently Studying',
  'teacher-landing.class.students-tab.student-id': 'StudentId',
  'teacher-landing.class.students-tab.remove': 'Remove',
  'teacher-landing.class.students-tab.mastered': 'Mastered',
  'teacher-landing.class.students-tab.in-progress': 'In Progress',
  'teacher-landing.class.students-tab.not-started': 'Not Started',
  'teacher-landing.class.students-tab.course-coverage': 'Course Coverage',
  'teacher-landing.class.students-tab.class-statistics': 'Class Statistics',
  'teacher-landing.class.students-tab.proficiency-in': 'Proficiency in',
  'teacher-landing.class.students-tab.data-not-available': 'Data Not Available',
  'teacher-landing.class.students-tab.course-coverage-label':
    'Cumulative count of competencies for all students in class',
  'teacher-landing.class.students-tab.error-message':
    'The class does not have a course assigned or does not have students rostered into the class yet. Once the course has been assigned to the class and the students are rostered, the class competency report will be shown here',
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
  'teacher-landing.class.class-activities': 'أنشطة الصف اليومية',
  'teacher-landing.class.class-activities.input-timespent': 'Input Time Spent',
  'teacher-landing.class.class-activities.warning-message':
    'You have not entered data for {{questionCount}} questions for {{studentName}}. Selecting another student will discard <student name>\'s data. Do you want to continue?',
  'teacher-landing.class.class-activities.info-message':
    'You have entered data for {{studentName}}, but have not saved it. Do you want to save before continuing?',
  'teacher-landing.class.offline-class-report.class-report': 'Class Report',
  'teacher-landing.class.offline-class-report.class-activity-report':
    'Class Activity Report',
  'teacher-landing.class.offline-class-report.activity-report':
    'Activity Report',
  'teacher-landing.class.offline-class-report.conducted-on': 'Conducted On',
  'teacher-landing.class.offline-class-report.not-started': 'Not Started',
  'teacher-landing.class.back-to-class-activities':
    'العودة إلى نشاطات الصف اليومية',
  'teacher-landing.class.class-activities-tab.today': 'اليوم،',
  'teacher-landing.class.class-activities-tab.yesterday': 'Yesterday: ',
  'teacher-landing.class.class-activities-tab.month': 'Month: ',
  'teacher-landing.class.class-activities-tab.add-from-course-map':
    'ضِف من خريطة المساق الدراسي',
  'teacher-landing.class.class-activities-tab.add-from-my-content':
    'ضِف من المحتوى الخاص بي',
  'teacher-landing.class.class-activities-tab.welcome-dca':
    'أهلاً بك في نشاطات صفك اليومية، هنا يمكنك تعيين مجموعات وتقييمات لطلابك لإكمالها اليوم. \nملاحظة: أي تقارير يتم إنشاءها ستكون متوفرة اليوم حتى آخر محاولة. ',
  'teacher-landing.class.class-activities-tab.enter-max-timespent':
    'Enter the Maximum Timespent for the Assessment',
  'teacher-landing.class.class-activities-tab.enter-max-assessment-time-spent':
    'Enter the time spent in completing the assessment',
  'teacher-landing.class.class-activities-tab.enter-max-score':
    'Enter the Maximum Score for the Assessment',
  'teacher-landing.class.class-activities-tab.hour': 'h',
  'teacher-landing.class.class-activities-tab.min': 'm',
  'teacher-landing.class.class-activities-tab.question-score': 'Question Score',
  'teacher-landing.class.class-activities-tab.max-score': 'Max Score',
  'teacher-landing.class.class-activities-tab.assessment-score':
    'Assessment Score',
  'teacher-landing.class.class-activities-tab.assessment-max-score':
    'Assessment Max. Score',
  'teacher-landing.class.class-activities-tab.enter-valid-timespent':
    'Enter the valid time spent',
  'teacher-landing.class.class-activities-tab.create-activity':
    'Create Activity',
  'teacher-landing.class.class-activities-tab.schedule-activity':
    'Schedule Activity',
  'teacher-landing.class.class-activities-tab.add-subject-framework':
    'Please Select a Subject and Framework at Class Settings',
  'teacher-landing.class.class-activities-tab.create-external-collection':
    'Create an External Collection',
  'teacher-landing.class.click-to-copy': 'انقر لنسخ رمز الصف',
  'teacher-landing.class.course-map': 'خريطة المساق الدراسي',
  'teacher-landing.class.management': 'إدارة القوائم',
  'teacher-landing.class.report': 'تقرير',
  'teacher-landing.class.performance': 'أداء',
  'teacher-landing.class.performance-tab.assessments': 'التقييمات',
  'teacher-landing.class.performance-tab.collections': 'مجموعات',
  'teacher-landing.class.view-more': 'عرض المزيد',
  'teacher-landing.class.class-settings.class-settings-sec.generate-pathway':
    'Personalize Learning Path',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-head':
    'Class Settings',
  'teacher-landing.class.class-settings.class-settings-sec.class-settings-sec-desc':
    'Minimum performance to earn a trophy',
  'teacher-landing.class.class-settings.class-settings-sec.class-code':
    'Class Code',
  'teacher-landing.class.class-settings.class-settings-sec.subject': 'Subject',
  'teacher-landing.class.class-settings.class-settings-sec.framework':
    'Framework',
  'teacher-landing.class.class-settings.class-settings-sec.grade-level':
    'Grade Level',
  'teacher-landing.class.class-settings.class-settings-sec.option-choose-one':
    'Choose One',
  'teacher-landing.class.class-settings.class-settings-sec.co-teachers':
    'Co-Teachers',
  'teacher-landing.class.class-settings.class-settings-sec.add-coteacher':
    'Add another teacher',
  'teacher-landing.class.class-settings.class-settings-sec.language':
    'Language of instruction',
  'teacher-landing.class.class-settings.student-settings-sec.student-settings-sec-head':
    'Student Settings',
  'teacher-landing.class.class-settings.student-settings-sec.col-head-active':
    'Active',
  'teacher-landing.class.class-settings.course-settings-sec.course-settings-sec-head':
    'Course Settings',
  'teacher-landing.class.class-settings.course-settings-sec.is-route0-applicable':
    'Personalized Learning Path should cover gaps at profile?',
  'teacher-landing.class.class-settings.course-settings-sec.apply-settings':
    'Apply Settings',
  'teacher-landing.class.class-settings.course-settings-sec.origin-info':
    'What is the lowest grade level content that your students should study?',
  'teacher-landing.class.class-settings.course-settings-sec.current-grade-info':
    'What is the grade level of your class?',
  'teacher-landing.class.class-settings.origin': 'Origin',
  'teacher-landing.class.class-settings.destination': 'Destination',
  'teacher-landing.class.class-settings.students': 'Students',
  'teacher-landing.class.class-settings.student-id': 'Student-Id',
  'teacher-landing.class.class-settings.joined-on': 'Joined On',
  'teacher-landing.class.class-settings.action-lable-add-student':
    'Add onother student',
  'teacher-landing.no-classrooms':
    'لم تنشئ صفوف دراسية بعد، اضغط على "أنشئ صف دراسي"، أو ابحث عن المساقات الدراسية المميزة تحت علامة التبويب "المكتبة " ',
  'teacher-landing.no-course': 'لم تُعيِّن مساق دراسي لهذا الصف بعد.',
  'teacher-landing.teach': 'درِّس في صفوف جورو الدراسية.',
  'teacher-landing.welcome-course-map':
    'في خريطة المساق الدراسي، يمكنك عرض محتوى المساق، وتشغيل التقيماات أو إيقافها، و إطلاق التقييمات في الوقت الحالي. كما يمكنك مشاهدة ',
  'teacher-landing.welcome-rescoped-course-map':
    'This course has been personalized for each student in the class. You can view each student’s course map in the Class Management page by clicking on the student’s learning pathway ("->")',
  'teacher-landing.welcome-premium-course-map':
    'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.',
  'goals.manage.title': 'أهدافي!',
  'goals.manage.add-goal': 'ضِف هدف',
  'goals.manage.goal-label': 'هدف',
  'goals.manage.start-date-label': 'تاريخ البدء',
  'goals.manage.end-date-label': 'تاريخ الانتهاء',
  'goals.manage.type-label': 'نوع الهدف',
  'goals.manage.status-label': 'الحالة',
  'goals.manage.not_started': 'لم تبدأ.',
  'goals.manage.activated': 'مُفعَّل',
  'goals.manage.completed': 'تم إنجازه',
  'goals.manage.dropped': 'مهمل',
  'goals.manage.reflection-label': 'انعكاس',
  'goals.manage.save': 'حفظ',
  'goals.manage.update': 'تحديث',
  'goals.manage.goals-not-found':
    'لم تحدد أي أهداف بعد. يمكنك إضافة هدف بالنقر على \\"Add Goal\\" أعلاه. ',
  'goals.create.error-add-title': 'يرجى إدخال الهدف',
  'goals.create.error-length-title':
    'الحد الأقصى من الأحرف لكتابة الهدف 200 حرف',
  'goals.create.error-add-start-date': 'يرجى إدخال تاريخ البدء',
  'goals.create.error-add-end-date': 'يرجى إدخال تاريخ الانتهاء',
  'goals.create.error-greater-end-date':
    'يجب أن يكون تاريخ الانتهاء أحدث من تاريخ البدء',
  'goals.create.error-add-status': 'يرجى تحديد حالة الهدف',
  'goals.create.error-length-reflection':
    'الحد الأقصى من الأحرف لكتابة مدى تأثير الهدف 2000 حرف',
  'goals.create.created-success-msg': 'تم إنشاء الهدف ',
  'goals.delete.deleted-success-msg': 'تم حذف الهدف ',
  'goals.update.updated-success-msg': 'تم تحديث الهدف',
  'gru-add-to.add-assessment-to-lesson': 'أضف من تقييماتي.',
  'gru-add-to.add-assessment-to-lesson-lead':
    'اختر تقييماً لإضافته إلى هذا الدرس.',
  'gru-add-to.add-collection-to-lesson': 'أضف من مجموعاتي.',
  'gru-add-to.add-collection-to-lesson-lead':
    'اختر مجموعة لإضافتها لهذا الدرس.',
  'gru-add-to.add-to-collection': 'ضِف إلى المجموعة',
  'gru-add-to.add-to-collection-lead':
    'اختر مجموعة تريد إضافة {{contentTitle}} لها.',
  'gru-add-to.add-to-existing-classroom': 'ضِف إلى الصف الدراسي الحالي.',
  'gru-add-to.add-to-existing-classroom-lead':
    'اختر صفاً دراسياً تريد اضافته إلى ',
  'gru-add-to.add-to-assessment': 'ضِف إلى التقييم أو المجموعة.',
  'gru-add-to.add-to-assessment-lead':
    'اختر تقييما تريد إضافة {{contentTitle}} إليه.',
  'gru-add-to.assessments-info':
    'التقييمات المدرجة هنا لا تنتمي إلى درس أو مساق دراسي آخر.',
  'gru-add-to.collections-info':
    'المجموعات المدرجة هنا لا تنتمي إلى درس أو مساق دراسي آخر. ',
  'gru-add-rubric-to-question.title': 'ضِف من سلم التقييم الخاص بي',
  'gru-add-rubric-to-question.lead': 'اختر سلم تقييم لإضافته لهذا السؤال',
  'gru-add-rubric-to-question.no-rubrics':
    'لم تنشئ أي سلم تقييم لإرفاقه مع سؤال "الإجابة الكتابية". يمكنك إنشاء سلم تقييم تحت علامة تبويب "المحتوى الخاص بي" التي يمكن الولوج إليها من خلال ملفك الشخصي. ',
  'gru-add-rubric-to-question.go-to-content': 'اذهب إلى "المحتوى الخاص بي"',
  'gru-assessment-confirmation.title': 'أنت على وشك بدء تقييم...',
  'gru-assessment-confirmation.description': 'في هذا التقييم، {{model.title}}',
  'gru-assessment-confirmation.setting-forward': 'يمكنك التنقل إلى الأمام فقط',
  'gru-assessment-confirmation.setting-forward-backward':
    'يمكنك التنقل إلى الأمام وإلى الخلف للإجابة على الأسئلة.',
  'gru-assessment-confirmation.unlimited-attempts-left':
    'لديك عدد غير محدد من المحاولات.',
  'gru-assessment-confirmation.setting-forward-teacher':
    'Student can navigate forward only',
  'gru-assessment-confirmation.setting-forward-backward-teacher':
    'Student can navigate forward and backwards to answer questions',
  'gru-assessment-confirmation.unlimited-attempts-left-teacher':
    'Student have unlimited attempts',
  'gru-assessment-confirmation.attempts-left.zero':
    'لديك {{count}} من المحاولات.',
  'gru-assessment-confirmation.attempts-left.one':
    'تبقى لديك محاولة واحدة فقط.',
  'gru-assessment-confirmation.attempts-left.other':
    'لديك {{count}} من المحاولات.',
  'gru-assessment-confirmation.attempts-left.other-teacher':
    'Student have {{count}} attempts',
  'gru-assessment-confirmation.unlimited-attempts':
    'لديك عدد غير محدد من المحاولات.',
  'gru-assessment-confirmation.cancel': 'إلغاء',
  'gru-assessment-confirmation.continue': 'استمرار',
  'gru-assessment-confirmation.start': 'ابدأ',
  'gru-assessment-confirmation.submit': 'Submit',
  'gru-submit-confirmation.title': 'إنهاء الاختبار وتثبيت.',
  'gru-submit-confirmation.description':
    'أنت على وشك إنهاء هذا الاختبار وإرسال جميع الأجوبة. أي سؤال لم تتم الإجابة عليه يعتبر جواباً خاطئاً. ',
  'gru-submit-confirmation.cancel': 'إلغاء',
  'gru-submit-confirmation.ok': 'ok',
  'gru-submit-confirmation.confirm': 'إنهاء الاختبار.',
  'gru-submit-confirmation.finish-description':
    'انقر على "إنهاء الاختبار" لتثبيت إجاباتك.',
  'gru-quick-course-search.add-from-course': 'ضِف من المساق الحالي',
  'gru-quick-course-search.view-featured-courses':
    'عرض المساقات الدراسية المميزة',
  'gru-quick-course-search.assign': 'تعيين',
  'gru-share-pop-over.copy': 'نسخ',
  'gru-share-pop-over.ios-tooltip': 'انقر مطولاً للنسخ!',
  'gru-share-pop-over.multiarch-tooltip': 'اضغط على "Ctrl + C" للنسخ!',
  'gru-share-pop-over.safari-osx-tooltip': 'اضغط على "Ctrl + C" للنسخ.',
  'gru-share-pop-over.share-course': 'شارك المساق الدراسي مع إرفاق رابط',
  'gru-share-pop-over.share-question': 'شارك سؤالك مع إرفاق رابطو',
  'gru-share-pop-over.share-resource': 'شارك المصدر مع إرفاق رابط.',
  'gru-share-pop-over.share-assessment': 'شارك التقييم الخاص بك مع إرفاق رابط',
  'gru-share-pop-over.share-rubric': 'شارك سلم التقييم مع إرفاق رابط',
  'gru-share-pop-over.share-collection': 'شارك مجموعتك مع إرفاق رابك',
  'gru-category-panel.teacher.title': 'للمعلمين',
  'gru-category-panel.teacher.body':
    'اكتشف المحتوى المتوافق مع المعايير ونسق المحتوى وتتبع تقدم الطلاب من خلال تحليلات البيانات.',
  'gru-category-panel.teacher.cta': 'شاهد القصص',
  'gru-category-panel.student.title': 'للطلاب',
  'gru-category-panel.student.body':
    'ابتحث عن الاهتمامات وابنِ وراقب التقدم من خلال مواد التعليم. ',
  'gru-category-panel.student.cta': 'أدخِل',
  'gru-category-panel.student.text-placeholder': 'أدخِل رمز الصف الدراسي',
  'gru-category-panel.district.title': 'للمقاطعات',
  'gru-category-panel.district.body':
    'تعاون  مع جورو لإطلاق العنان للتعليم المخصص ولمشاركة المنهاج الذي تمت مراجعته من قبل السلطات المعنية.',
  'gru-category-panel.district.cta': 'شاهد مدى تأثيرنا',
  'gru-category-panel.partner.title': 'للشركاء',
  'gru-category-panel.partner.body':
    'تعاون مع شركائنا في المهمة لرفع نسبة التأثير الجماعي على بيئة التعليم. ',
  'gru-category-panel.partner.cta': 'تعلم المزيد',
  'class.gru-class-navigation.active': 'نشِط:',
  'class.gru-class-navigation.members': 'أفراد',
  'class.gru-class-navigation.greetings': 'الإعلانات',
  'class.gru-class-navigation.overview': 'خريطة المساق الدراسي',
  'class.gru-class-navigation.analytics': 'البيانات',
  'class.gru-class-navigation.teams': 'فِرَق',
  'class.gru-class-navigation.information': 'معلومات الصف االدراسي',
  'class.gru-class-statistics.title': 'إحصاءات الصف',
  'class.gru-class-statistics.on-average': 'في المعدل',
  'class.gru-class-statistics.performance': 'أداء',
  'class.gru-class-statistics.completion': 'إنجاز',
  'class.gru-class-statistics.time-spent': 'الوقت المستغرق',
  'class.gru-class-statistics.no-performance': '-',
  'gru-user-registration.joinTitle': 'انضم إلى مجتمع جورو!',
  'gru-user-registration.joinDescription':
    'جِد وامزج، وشارك أفضل مصادر التعليم المجانية من الروضة وحتى الصف 12. ',
  'gru-user-registration.googleButton': 'أنشئ حسابك باستخدام جوجل.',
  'gru-user-registration.whyGoogle': 'لماذا أنشئ حساباً باستخدام جوجل؟',
  'gru-user-registration.descriptionWhyGoogle':
    'إنشاء حسابك باستخدام جوجل سيكون أسهل وأسرع ولن تحتاج إلى كلمة مرور جديدة. ',
  'gru-user-registration.or': 'أو',
  'gru-user-registration.noGoogleAccount': 'لا يوجد لديك حساب جوجل؟ ',
  'gru-user-registration.signUpEmail': 'أنشئ حساباً باستخدام بريدك الإلكتروني.',
  'gru-user-registration.haveAccount': 'هل لديك حساب بالفعل؟',
  'gru-user-registration.clickLogIn': 'انقر هنا لتسجيل الدخول.',
  'gru-welcome-message.title': 'مرحباً بكم في متصفح جورو التعليمي!',
  'gru-welcome-message.text-temporary-one':
    'يسعدنا مساعدتك خلال رحلتك في متصفح جورو التعليمي، ابحث عن أيقونة  "قم بجولة" ',
  'gru-welcome-message.text-temporary-two':
    'للجولات الإرشادية حول كيفية استخدام مميزاتنا. ',
  'gru-welcome-message.text-one':
    'يسعدنا مساعدتك خلال رحلتك في متصفح جورو التعليمي بالطرق التالية: ',
  'gru-welcome-message.text-two.subtitle': 'قم بجولة',
  'gru-welcome-message.text-two.text':
    'توفير جولات إرشادية عن كيفية استخدام ميزاتنا.  ',
  'gru-welcome-message.text-three.subtitle': 'المساعدة',
  'gru-welcome-message.text-three.text':
    'يمكنك الحصول على المساعدة في حال وجود أي أسئلة إضافية.',
  'gru-welcome-message.text-four.subtitle': 'جديد',
  'gru-welcome-message.text-four.text': 'يمكنك تحديد ميزات جديدة لتجربتها. ',
  'gru-welcome-message.text-five':
    'إذا أردت العودة إلى صفحتك الرئيسية، ببساطة انقر على',
  'gru-welcome-message.dont-show-again': 'لا تُظهِر مرة أخرى',
  'sign-up.step-1-title': 'مرحباً!',
  'sign-up.step-1-description': 'نحن سعداء بانضمامك إلينا.',
  'sign-up.step-child-title': 'ليس بهذه السرعة!',
  'sign-up.step-child-subtitle': 'لا يمكننا إكمال عملية التسجيل.',
  'sign-up.step-child-description-1': 'لم يتمكن جورو من إنشاء حسابك بسبب ',
  'sign-up.step-child-age-requirements': 'الأحكام والشروط',
  'sign-up.step-child-description-2': 'استمر في التعلم، نراك في سنوات قادمة. ',
  'sign-up.step-2-title': 'معلومات أساسية.',
  'sign-up.step-2-description': 'أنت لست أساسياً، لكن هذه المعلومة أساسية.',
  'sign-up.log-in': 'تسجيل الدخول',
  'sign-up.log-in-description': 'إذا كان لديك حساب مسبقاً.',
  'sign-up.google-button': 'أنشئ حسابك عن طريق جوجل.',
  'sign-up.username': 'اسم المستخدم',
  'sign-up.dateOfBirth.title': 'تاريخ الميلاد',
  'sign-up.dateOfBirth.day': 'اليوم',
  'sign-up.dateOfBirth.month': 'الشهر',
  'sign-up.dateOfBirth.months.january': 'كانون الثاني',
  'sign-up.dateOfBirth.months.february': 'شباط',
  'sign-up.dateOfBirth.months.march': 'آذار',
  'sign-up.dateOfBirth.months.april': 'نيسان',
  'sign-up.dateOfBirth.months.may': 'أيار',
  'sign-up.dateOfBirth.months.june': 'حزيران',
  'sign-up.dateOfBirth.months.july': 'تموز',
  'sign-up.dateOfBirth.months.august': 'آب',
  'sign-up.dateOfBirth.months.september': 'أيلول',
  'sign-up.dateOfBirth.months.october': 'تشرين الأول',
  'sign-up.dateOfBirth.months.november': 'تشرين الثاني',
  'sign-up.dateOfBirth.months.december': 'كانون الأول',
  'sign-up.dateOfBirth.year': 'السنة',
  'sign-up.dateOfBirth.error-message': 'يرجى إدخال تاريخ الميلاد.',
  'sign-up.email': 'البريد الإلكتروني',
  'sign-up.password': 'كلمة المرور',
  'sign-up.rePassword': 'تأكيد كلمة المرور.',
  'sign-up.state': 'الدولة أو المقاطعة',
  'sign-up.district': 'المقاطعة',
  'sign-up.error-username-taken': 'هذا الاسم مُستخدم، يرجى المحاولة مرة أخرى\n',
  'sign-up.error-email-taken':
    'هذا البريد الإلكتروني مُستخدم، يرجى المحاولة مرة أخ\nرى',
  'sign-up.error-role-message': 'يرجى اختيار  دوراً. \n',
  'sign-up.error-country-message': 'يرجى اختيار بلدك.',
  'sign-up.error-state-message': 'يرجى تحديد الولاية أو الإقليم.',
  'sign-up.error-district-message':
    'يرجى اختيار المقاطعة من القائمة أو قم بتزويدنا بها في "أخرى" ',
  'gru-user-sign-up-cancel.title': 'مغادرة التسجيل؟',
  'gru-user-sign-up-cancel.exit?': 'هل أنت متأكد من الخروج؟',
  'gru-user-sign-up-cancel.registration_incomplete': 'لم يكتمل تسجيلك بعد.',
  'gru-user-sign-up-cancel.leave': 'مغادرة التسجيل',
  'gru-user-sign-up-cancel.continue': 'متابعة التسجيل',
  'login.title': 'أهلاً بعودتك!',
  'login.description': 'التعلم بين يديك.',
  'login.title-session-ends': 'انتهت صلاحية الفصل الدراسي.',
  'login.description-session-ends': 'يرجى تسجيل الدخول.',
  'login.gooruAccountTitle': 'تسجيل الدخول إلى حسابك في جورو.',
  'login.googleButton': 'تسجيل الدخول باستخدام جوجل.',
  'login.or': 'أو',
  'login.haveAccount': 'هل لديك حساب؟',
  'login.signUpHere': 'أنشئ حسابك هنا!',
  'login.forgotPassword': 'نسيت كلمة المرور؟ ',
  'login.password': 'كلمة المرور',
  'login.usernameOrEmail': 'اسم المستخدم أو البريد الالكتروني',
  'login.log-in': 'تسجيل الدخول',
  'forgot-password.description': 'يحدث لنا جميعاُ.',
  'forgot-password.usernameOrEmail': 'يرجى إدخال بريدك الإلكتروني.',
  'forgot-password.footer-google-description-1':
    'حاول تسجيل الدخول مرة أخرى بالضغط على \\\'تسجيل الدخول باستخدام جوجل\\\'',
  'forgot-password.footer-description-1':
    'ستصلك رسالة إلكترونية تتضمن رابطاً لإعادة تعيين كلمة المرور.',
  'forgot-password.footer-description-2':
    'إذا كان لديك أي أسئلة، يرجى التواصل معنا. ',
  'forgot-password.mail': 'support@gooru.org',
  'forgot-password.error-email-not-exists':
    'نعتذر، هذا البريد الاكتروني غير مُعرَّف',
  'forgot-password.secondStepTitle': 'تفقّد بريدك الالكتروني.',
  'forgot-password.secondStepDescription-1':
    'لقد أرسلنا لك رسالة إلكترونية تتضمن رابطاً لإعادة تعيين كلمة المرور. ',
  'forgot-password.secondStepDescription-2':
    'إذا كان لديك أي أسئلة، يرجى الاتصال',
  'reset-password.new-password': 'أدخل كلمة المرور الجديدة.',
  'reset-password.new-password-confirm': 'تأكيد كلمة المرور.',
  'reset-password.title': 'إعادة تعيين كلمة المرور.',
  'change-password.change-password': 'Change password link',
  'change-password.title': 'Change Password',
  'change-password.current-password-label': 'Enter your current password',
  'change-password.change-success': 'Password Changed Successfully !!',
  'change-password.new-password-required': 'Please enter your new password.',
  'change-password.change-password-error':
    'Uh oh! Something’s not right. Unable to change password. Please try again.',
  'footer.footerDescription':
    'يلتزم موقع جورو بالإبقاء على منصته التعليمية مفتوحة المصادر، وإتاحتها لبناء محتوى يحمل رخصة المشاع الإبداعي(CC0) ',
  'footer.company': 'الشركة',
  'footer.community': 'المجتمع',
  'footer.legal': 'قانوني',
  'footer.connect': 'الاتصال',
  'footer.aboutGooru': 'حول جورو',
  'footer.careers': 'الوظائف',
  'footer.supportCenter': 'مركز الدعم',
  'footer.contactUs': 'اتصل بنا',
  'footer.districts': 'المقاطعات',
  'footer.partners': 'الشركاء',
  'footer.coaches': 'المدربون',
  'footer.events': 'الأحداث',
  'footer.terms': 'الأحكام',
  'footer.privacy': 'الخصوصية',
  'footer.Copyright': 'حقوق النشر',
  'grade-dropdown.placeholder': 'المراحل الدراسية',
  'grade-dropdown.prompt': 'اختر المرحلة الدراسية',
  'grade-dropdown.pre-k': 'تعليم ما قبل الروضة',
  'grade-dropdown.elementary': 'المرحلة الابتدائية',
  'grade-dropdown.middle-school': 'المرحلة المتوسطة',
  'grade-dropdown.high-school': 'المدرسة الثانوية',
  'grade-dropdown.higher-ed': 'التعليم العالي',
  'grade-dropdown.k': 'الروضة',
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
  'standard-dropdown.placeholder': 'تصفح حسب المعيار',
  'subject-dropdown.placeholder': 'الموضوع (المواضيع)',
  'subject-dropdown.prompt': 'اختر موضوعاً',
  'search-filter.input-placeholder': 'Type {{type}} name here...',
  'search-filter.courses': 'المساقات الدراسية',
  'search-filter.collections': 'مجموعات',
  'search-filter.resources': 'مصادر',
  'search-filter.assessments': 'التقييمات',
  'search-filter.questions': 'أسئلة',
  'search-filter.rubrics': 'سلم تقييم',
  'search-filter.authors': 'Authors',
  'search-filter.question-types.MC': 'خيارات متعددة',
  'search-filter.question-types.FIB': 'املأ الفراغ',
  'search-filter.question-types.T/F': 'صح أم خطأ',
  'search-filter.question-types.TOF': 'صح أم خطأ',
  'search-filter.question-types.MA': 'إجابات متعددة',
  'search-filter.question-types.HS_TXT': 'اختيار متعدد - نص',
  'search-filter.question-types.HSTXT': 'اختيارأكثر من نص ',
  'search-filter.question-types.HS_IMG': 'متعددة حدد - صورة',
  'search-filter.question-types.HSIMG': 'اختيار أكثر من صورة',
  'search-filter.question-types.HT_RO': 'سحب وإفلات',
  'search-filter.question-types.HT&RO': 'ترتيب المسك والإفلات',
  'search-filter.question-types.HT_HL': 'نص مظلل',
  'search-filter.question-types.H-THL': 'نص مظلل',
  'search-filter.question-types.OE': 'إجابة كتابية',
  'search-filter.author.placeholder': 'كاتب',
  'resource.video': 'فيديو',
  'resource.webpage': 'صفحة ويب',
  'resource.interactive': 'تفاعلي',
  'resource.question': 'سؤال',
  'resource.image': 'صورة',
  'resource.text': 'نص',
  'resource.audio': 'تسجيل صوتي',
  'resource.oer': 'مصادر تعليم مفتوحة OER',
  'search-result.resource': 'مصدر',
  'search-result.resources': 'مصادر',
  'search-result.and': 'و',
  'search-result.question': 'سؤال',
  'search-result.questions': 'أسئلة',
  'search-result.in-this-collection': 'في هذه المجموعة',
  'search-result.search-results-for': 'نتائج البحث عن',
  'gru-image-picker.chooseFile': 'اختر ملف...',
  'gru-image-picker.instruction': 'حمل صورة من حاسوبك.',
  'gru-image-picker.restriction':
    'يجب أن تكون الصورة بصيغة  JPG أو GIF أو PNG وحجمها أقل من 5 ميغابايت.',
  'gru-image-picker.submit': 'استخدم الصورة',
  'gru-fib.instructions':
    'يرجى كتابة إجابتك في الفراغ المناسب، ثم الضغط على \\"{{action}}\\".',
  'gru-hs-image.instructions':
    'يرجى اختيار الصورة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-hs-text.instructions':
    'يرجى اختيار الإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-hot-text.instructions':
    'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-login-prompt.title': 'مرحباً بكم في جورو!',
  'gru-login-prompt.instructions': 'يجب تسجيل الدخول لإكمال هذا الإجراء.',
  'gru-login-prompt.existing-user': 'هل لديك حساب بالفعل؟',
  'gru-login-prompt.new-user': 'هل أنت جديد هنا؟',
  'gru-login-prompt.not-now': 'ليس الان',
  'gru-login-prompt.sign-in': 'تسجيل الدخول',
  'gru-multiple-answer.instructions':
    'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-multiple-choice.instructions':
    'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-open-ended.instructions':
    'يرجى كتابة إجابتك في الحقل أدناه، ثم الضغط على \\"{{action}}\\". لحفظها عند الانتهاء.',
  'gru-open-ended.characterLimit': 'الحد الأقصى من الأحرف.',
  'gru-question-viewer.answer': 'إجابة',
  'gru-question-viewer.question': 'سؤال',
  'gru-true-false.instructions':
    'يرجى اختيارالإجابة الصحيحة، ثم الضغط على \\"{{action}}\\".',
  'gru-true-false.true': 'صحيح',
  'gru-true-false.false': 'خطأ',
  'gru-reorder.instructions':
    'يرجى إعادة ترتيب الإجابات بشكل صحيح، ثم النقر على \\"{{action}}\\".',
  'student-first-experience.preStudyTitle': 'Pre-Study for {{title}}',
  'student-first-experience.lp-compute-inprogress':
    'We are computing your initial proficiency profile in {{title}}',
  'student-first-experience.route0-action.accept': 'Accept',
  'student-first-experience.route0-action.ignore': 'Ignore',
  'student-first-experience.competency.popover.title': '{{title}} HIGHLINE',
  'student-first-experience.competency.popover.content':
    'You need to study all the standards between your skyline and this grade line to reach your destination.',
  'student-first-experience.assigned-course-title':
    'Assigned Course for {{title}}',
  'student-first-experience.start-studying': 'Start Studying',
  'student-first-experience.show-route': 'Show Route',
  'student-first-experience.review-destination': 'Review Destination',
  'student-first-experience.competency-level.title': 'Your Proficiency Profile',
  'student-first-experience.competency-level.mastery':
    '{{count}} Standards Mastered',
  'student-first-experience.competency-level.in-progress':
    '{{count}} Standards In Progress',
  'student-first-experience.competency-level.not-started':
    '{{count}} Standards Not Started',
  'student-first-experience.competency-level.your-skyline': 'Your Skyline',
  'student-first-experience.explanatory.master.title': 'MASTERED',
  'student-first-experience.explanatory.master.desc':
    'Indicates that there is evidence that you have successfully mastered the standards ',
  'student-first-experience.explanatory.in-progress.title': 'IN PROGRESS',
  'student-first-experience.explanatory.in-progress.desc':
    'Indicates that there is evidence that you have started studying the standards and are in progress towards achieving mastered ',
  'student-first-experience.explanatory.not-started.title': 'NOT STARTED',
  'student-first-experience.explanatory.not-started.desc':
    'Indicates that there is no evidence and you are yet to begin studying the standards',
  'student-first-experience.competency-level-partial.desc1':
    'You are currently in ',
  'student-first-experience.competency-level-partial.desc2':
    'This is your {{title}} proficiency profile. It shows your mastery in standards (aka competencies) in the different focus areas in {{title}} (aka domains). The columns show domains and the boxes show the standards within each {{title}} domain.',
  'student-first-experience.competency-level-partial.desc3':
    'As you master each of the competencies, the corresponding box is updated to dark blue.',
  'student-first-experience.competency-level-partial.desc4':
    'The skyline is the thick white line that shows the highest competencies that you have mastered in each math domain.',
  'student-first-experience.competency-level-partial.desc5':
    'If the skyline is at the bottom of a domain, it means the system needs more information to be able to locate you in that topic. As soon as you start on the lessons and check for understandings, your skyline will bump up and update your proficiency in each domain.',
  'student-first-experience.units.other': '{{count}} Units',
  'player.gru-navigation.view-report': 'عرض التقرير',
  'player.gru-navigator.see-usage-report': 'شاهد تقرير الاستخدام.',
  'player.gru-viewer.not-iframe-url.header_1':
    'لا يمكن عرض هذا المصدر في جورو.',
  'player.gru-viewer.not-iframe-url.header_external_assessment_1':
    'لا يمكن عرض هذا التقييم باستخدام جورو.',
  'player.gru-viewer.not-iframe-url.header_2':
    'لا يمكن عرض هذا المصدر في جورو.',
  'player.gru-viewer.not-iframe-url.view-resource': 'عرض المصدر',
  'player.gru-viewer.not-iframe-url.https_external':
    'لا يمكن عرض هذا الرابط في جورو.',
  'player.gru-viewer.not-iframe-url.https_new_tab':
    'انقر على الرابط أدناه لفتحه في صفحة تبويب جديدة.',
  'player.gru-viewer.not-iframe-url.footer_1': 'لماذا أرى هذه الصفحة الفارغة؟',
  'player.gru-viewer.not-iframe-url.footer_2':
    'المصادر المضافة في جورو تأتي من آلاف الناشرين الذين',
  'player.gru-viewer.not-iframe-url.footer_3':
    'ينشؤون ويشاركون المحتوى الخاص بهم. تحتوي المصادر على إعدادت مختلفة تتضمن',
  'player.gru-viewer.not-iframe-url.footer_4':
    'المتطلبات التي تنقلك إلى صفحة أخرى لعرض المحتوى.',
  'grading-player.answer': 'العمل المُقدَّم',
  'grading-player.back-to': 'عودة',
  'grading-player.current-response': 'الإجابة الحالية',
  'grading-player.full-rubric': 'سلم تقييم كامل',
  'grading-player.grading': 'العلامة',
  'grading-player.level': 'المستوى',
  'grading-player.roster': 'قائمة',
  'grading-player.rubric': 'سلم تقييم',
  'grading-player.submitted-time': 'الوقت المحدد',
  'grading-player.points': 'النقاط',
  'grading-player.prompt': 'مهمة فورية',
  'grading-player.overall-comment': 'التعليق العام',
  'grading-player.overall-lead': 'لخِّص ملاحظاتك على المقال ككل.',
  'grading-player.time-spent': 'الوقت المستغرق',
  'grading-player.total-score': 'العلامة الكاملة',
  'grading-player.student-roster.title': 'لائحة الطالب',
  'grading-player.student-roster.lead': 'لقد أجبت على هذا السؤال ',
  'grading-player.rubric-panel.previous': 'الطالب السابق',
  'grading-player.rubric-panel.next': 'الطالب التالي',
  'grading-player.rubric-panel.total-score': 'العلامة الكاملة',
  'grading-player.rubric-panel.points': '({{total}} نقطة)',
  'profile.gru-navigation.about': 'حول',
  'profile.gru-navigation.about-me': 'حولي',
  'profile.gru-navigation.content': 'محتوى',
  'profile.gru-navigation.followers': 'متابِعون',
  'profile.gru-navigation.library': 'المكتبة',
  'profile.gru-navigation.my-content': 'المحتوى الخاص بي',
  'profile.gru-navigation.following': 'Following',
  'profile.gru-navigation.proficiency': 'Proficiency',
  'profile.gru-navigation.preference.preference': 'Preference',
  'profile.edit.select-district': 'اختر مقاطعة...',
  'profile.proficiency.is-empty':
    'No data available yet. Once you begin studying, your data will become available.',
  'profile.proficiency.expand-chart': 'Expand Chart',
  'profile.proficiency.mastered': 'Mastered',
  'profile.proficiency.in-progress': 'In Progress',
  'profile.proficiency.not-started': 'Not Started',
  'profile.proficiency.skyline': 'Skyline',
  'profile.proficiency.baseline': 'Baseline',
  'profile.proficiency.grade-line': 'Other Grade',
  'profile.proficiency.class-grade-line': 'Class Grade',
  'profile.proficiency.not-tagged':
    'The class has no course assigned or the course has not been tagged to a valid subject or standards.',
  'profile.proficiency.show-compressed-chart': 'Show Compressed Chart',
  'profile.proficiency.show-expanded-chart': 'Show Expanded Chart',
  'profile.preference.language-preference': 'Language Preference',
  'profile.preference.choose-language': 'Choose language',
  'profile.preference.choose-sec-language': 'Choose',
  'profile.preference.choose-preferred-language':
    'Select primary profile language',
  'profile.preference.choose-preferred-other-languages':
    'Select other preferred languages',
  'profile.preference.language': 'Language',
  'profile.preference.select-category-label': 'Add a new category',
  'profile.preference.choose-category': 'Choose Category',
  'profile.preference.no-data': 'No data',
  'profile.preference.category-preference': 'Category Preference',
  'profile.preference.choose-subject': 'Choose Subject',
  'profile.preference.choose-fwk': 'Choose Framework',
  'profile.preference.add-subject': 'Add Subject',
  'profile.preference.add-sec-language': 'Add other preferred language',
  'profile.preference.other-preferred-languages': 'Other preferred languages',
  'gru-data-picker.score': 'العلامة',
  'gru-data-picker.report': 'تقرير',
  'gru-data-picker.completion': 'إنجاز',
  'gru-data-picker.timeSpent': 'الوقت',
  'gru-data-picker.time-spent': 'الوقت المستغرق',
  'gru-data-picker.study-time': 'وقت الدراسة',
  'gru-data-picker.reaction': 'تفاعل',
  'gru-data-picker.attempts': 'محاولة',
  'gru-performance-summary.title': 'عنوان',
  'gru-performance-summary.scores': 'علامات',
  'gru-performance-summary.completion': 'إنجاز',
  'gru-performance-summary.time-spent': 'الوقت الكلي',
  'gru-performance-summary.reaction': 'تفاعل',
  'gru-performance-summary.attempts': 'محاولات',
  'gru-performance-summary.redo': 'إعادة',
  'gru-performance-summary.resume': 'ملخص',
  'gru-performance-summary.study': 'ادرس الآن',
  'gru-performance-summary.view-report': 'عرض التقرير',
  'gru-performance-summary.not-applicable': 'غ/م',
  'gru-performance-summary.not-started': 'لم تبدأ بعد',
  'gru-performance.no-content': 'لا يوجد محتوى',
  'gru-performance-metrics.assessment': 'التقييم',
  'gru-performance-metrics.collection': 'مجموعة',
  'gru-performance-metrics.completion': 'إنجاز',
  'gru-performance-metrics.report': 'تقرير',
  'gru-performance-metrics.student': 'طالب',
  'gru-performance-metrics.score': 'العلامة',
  'gru-performance-metrics.study-time': 'الوقت المستغرق',
  'gru-metrics-sub-header.assessment': 'التقييم',
  'gru-metrics-sub-header.student': 'طالب',
  'gru-metrics-sub-header.score': 'العلامة',
  'gru-metrics-sub-header.report': 'تقرير',
  'gru-metrics-sub-header.completion': 'إنجاز',
  'gru-metrics-sub-header.time-spent': 'الوقت',
  'gru-resource-new.resource-already-exist': 'هذا المصدر موجود مسبقاً في جورو!',
  'gru-assessment-report.gru-summary.total-time-spent':
    'إجمالي الوقت المستغرق.',
  'gru-assessment-report.hidden-report':
    'لقد قام معلمك بإخفاء ملخص التقرير لهذا التقييم. ',
  'cards.gru-class-card.student.zero': '{{count}} طالب',
  'cards.gru-class-card.student.one': '{{count}} طالب',
  'cards.gru-class-card.student.other': '{{count}} الطلاب',
  'cards.gru-class-card.student.not-started': 'لم تبدأ.',
  'cards.gru-class-card.unit.zero': 'لا يوجد مساق دراسي',
  'cards.gru-class-card.unit.one': '{{count}} وحدة',
  'cards.gru-class-card.unit.other': '{{count}} وحدات',
  'cards.gru-class-card.archived.request-report':
    'لا يمكن تعديل هذا الصف الدراسي لأنه مؤرشف، ويمكن الوصول إلى بيانات الصف الدراسي الحالي من خلال التقرير.',
  'cards.gru-class-card.archived.report-in-progress':
    'قد يستغرق إنشاء التقرير 20 دقيقة. يرجى التحقق مرة أخرى.',
  'cards.gru-class-card.archived.download-report': 'تنزيل بياناتك لهذا الصف.',
  'cards.gru-class-card.archived.no-report-available':
    'لم يتم تعيين محتوى لهذا الصف',
  'cards.gru-course-card.in': 'في',
  'cards.gru-course-card.units.zero': '{{count}} وحدات',
  'cards.gru-course-card.units.one': '{{count}} وحدة',
  'cards.gru-course-card.units.other': '{{count}} وحدات',
  'cards.gru-course-card.resource.zero': '{{count}} مصادر',
  'cards.gru-course-card.resource.one': '{{count}} مصدر',
  'cards.gru-course-card.resource.other': '{{count}} مصادر',
  'cards.gru-course-card.and': 'و',
  'cards.gru-course-card.question.zero': '{{count}} اسئلة',
  'cards.gru-course-card.question.one': '{{count}} سؤال',
  'cards.gru-course-card.question.other': '{{count}} اسئلة',
  'cards.gru-course-card.start-studying': 'بدء الدراسة',
  'cards.gru-collection-card.courses.zero': '{{count}} مساقات دراسية',
  'cards.gru-collection-card.courses.one': '{{count}} مساق دراسي',
  'cards.gru-collection-card.courses.other': '{{count}} مساقات دراسية',
  'cards.gru-collection-card.students.zero': '{{count}} الطلاب',
  'cards.gru-collection-card.students.one': '{{count}} طالب',
  'cards.gru-collection-card.students.other': '{{count}} الطلاب',
  'cards.gru-collection-card.collections.one': '{{count}} مجموعة',
  'cards.gru-collection-card.collections.other': '{{count}} مجموعات',
  'cards.gru-collection-card.assessments.one': '{{count}} تقييم',
  'cards.gru-collection-card.assessments.other': '{{count}} تقييمات',
  'cards.gru-collection-card.classrooms.zero': '{{count}} صوف دراسية',
  'cards.gru-collection-card.classrooms.one': '{{count}} صف دراسي',
  'cards.gru-collection-card.classrooms.other': '{{count}} صوف دراسية',
  'cards.gru-resource-card.add': 'إضافة إلى',
  'cards.gru-resource-result-card.skipped': 'تم التخطي عنه',
  'cards.gru-profile-card.followers': 'متابِعون',
  'cards.gru-profile-card.following': 'متابَعون',
  'cards.gru-user-network-card.follow': 'متابعة',
  'reports.gru-table-view.first-tier-header-prefix': 'س',
  'reports.gru-table-view.student': 'طالب',
  'reports.gru-table-view.reaction': 'تفاعل',
  'reports.gru-table-view.reactions': 'ردود الفعل',
  'reports.gru-table-view.score': 'العلامة',
  'reports.gru-table-view.scores': 'علامات',
  'reports.gru-table-view.study-time': 'وقت الدراسة',
  'reports.gru-table-view.time': 'الوقت',
  'reports.gru-table-view.time-spent': 'الوقت المستغرق',
  'reports.gru-table-view.totals': 'مجموع',
  'gru-emotion-picker.react-to-resource': 'تفاعل مع هذا المصدر',
  'home.no-classes-found.create-class.title': 'درِّس في صفوف جورو الدراسية.',
  'home.no-classes-found.create-class.description':
    'أنشئئ صف دراسي، عيِّن محتوى، ثم قم بدعوة الطلاب',
  'home.no-classes-found.create-class.button-text': 'أنشئ صفاً دراسياً',
  'home.no-classes-found.join-class.title': 'تعلم مع صف جورو الدراسي',
  'home.no-classes-found.join-class.description':
    'انضم  إلى صف معلمك الدراسي، لتبدأ التعلم.',
  'home.no-classes-found.join-class.button-text': 'أدخِل رمز الصف الدراسي',
  'home.no-classes-found.featured-courses.title': 'المساقات الدراسية المميزة',
  'home.no-classes-found.featured-courses.description':
    'تصفح مساقات الرياضيات والعلوم والدراسات الاجتماعية ومهارات اللغة الإنجليزية.',
  'home.no-classes-found.featured-courses.button-text':
    'المساقات الدراسية المميزة',
  'home.no-classes-found.teacher-toolkit.title': 'مجموعة أدوات المعلم',
  'home.no-classes-found.teacher-toolkit.description':
    'لمجموعة الأدوات هذه مصادر تساعدك في البدء. ',
  'home.no-classes-found.teacher-toolkit.button-text': 'مجموعة أدوات المعلم',
  'taxonomy.grades': 'Grades',
  'taxonomy.gru-taxonomy-selector.add-secondary': 'إضافة ثانوية',
  'taxonomy.gru-taxonomy-selector.choose-subject': 'اختر موضوعاً',
  'taxonomy.gru-taxonomy-selector.competency-subject-and-course':
    'إطار الكفاءات والمساق الدراسي',
  'taxonomy.gru-taxonomy-selector.primary-subject-and-course':
    'إطار المعايير والمساق الدراسي',
  'validations.unsavedChanges':
    'لم يتم حفظ التغييرات بعد، هل تريد مغادرة هذه الصفحة؟ ',
  'featured.featured-title': 'المساقات الدراسية المميزة',
  'featured.featured-description':
    'يتم تنظيم المساقات الدراسية المميزة من قبل معلمين مبتكِرين، وفحصها ومراجعتها من قِبل خبراء في المحتوى التعليمي. كما يتم تطبيقها في الصفوف الدراسية مع الطلاب. \nاكتشف وامزج ونسّق المساقات التعليمية لتخصيص التعليم ورفع مستوى تفاعل الطلاب مع هذه المساقات. اضغط هنا لمعرفة المزيد عن تطوير هذه المساقات.',
  'locateme.score': 'Score',
  'locateme.timespent': 'Time Spent',
  'locateme.view': 'View',
  'locateme.attempt': 'Attempt',
  'locateme.lastAcessesed': 'Last Accessed',
  'taxonomy.modals.gru-domain-picker.browseSelectorText':
    'ما هي النطاقات التي ستغطيها هذه الوحدة؟',
  'taxonomy.modals.gru-domain-picker.selectedText.zero':
    'تم تحديد {{count}} نطاقات',
  'taxonomy.modals.gru-domain-picker.selectedText.one':
    'تم تحديد {{count}} نطاق',
  'taxonomy.modals.gru-domain-picker.selectedText.other':
    'تم تحديد {{count}} نطاقات',
  'taxonomy.modals.gru-domain-picker.shortcutText': 'المساق الدراسي في',
  'taxonomy.modals.gru-standard-picker.browseSelectorText':
    'ما هي المعايير التي سيتم تغطيتها؟',
  'taxonomy.modals.gru-standard-picker.browseCompetencySelectorText':
    'ما هي الكفاءات التي سيتم تغطيتها؟',
  'taxonomy.modals.gru-standard-picker.selectedText.zero':
    'تم اختيار {{count}} معايير',
  'taxonomy.modals.gru-standard-picker.selectedText.one':
    'تم اختيار {{count}} معيار ',
  'taxonomy.modals.gru-standard-picker.selectedText.other':
    'تم اختيار {{count}} معايير',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.zero':
    'تم اختيار {{count}} كفاءات',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.one':
    'تم اختيار {{count}} كفاءة',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.other':
    'تم اختيار {{count}} كفاءات',
  'taxonomy.modals.gru-standard-picker.shortcutText': 'تم ربط الوحدة بـ',
  'account-settings.title': 'إعدادت الحساب',
  'account-settings.account-info': 'معلومات الحساب',
  'account-settings.private-info': 'معلومات خاصة',
  'account-settings.email-address': 'عنوان البريد الإلكتروني',
  'account-settings.gender': 'الجنس',
  'account-settings.birthday': 'تاريخ الميلاد',
  'gru-rich-text-editor.bold': 'غامق',
  'gru-rich-text-editor.expression': 'تعبير',
  'gru-rich-text-editor.italic': 'مائل',
  'gru-rich-text-editor.subscript': 'حرف أو رمز أو رقم سفلي',
  'gru-rich-text-editor.superscript': 'حرف أو رمز أو رقم علوي',
  'gru-rich-text-editor.underline': 'مخطوط',
  'gru-rich-text-editor.bullets': 'Bullets',
  'gru-rich-text-editor.expressions-panel.tabs.calculus': 'الحساب',
  'gru-rich-text-editor.expressions-panel.tabs.greek-letters': 'أحرف يونانية',
  'gru-rich-text-editor.expressions-panel.tabs.layout': 'تصميم',
  'gru-rich-text-editor.expressions-panel.tabs.relation': 'علاقة',
  'gru-rich-text-editor.expressions-panel.tabs.set-theory': 'نظرية المجموعات',
  'gru-rich-text-editor.expressions-panel.tabs.symbols': 'رموز',
  'gru-rich-text-editor.expressions-panel.tabs.trigonometry': 'علم المثلثات',
  'gru-rich-text-editor.expressions-panel.insert-expression': 'إدراج',
  'gru-rich-text-editor.expressions-panel.update-expression': 'تحديث',
  'gru-rich-text-editor.expressions-panel.create-expression': 'إنشاء التعبير',
  'gru-settings-edit.answerkey-attempts': 'مفتاح الإجابة والمحاولات',
  'gru-settings-edit.answer-key': 'يمكن للطلاب رؤية مفتاح الإجابة في النهاية',
  'gru-settings-edit.attempts': 'محاولات',
  'gru-settings-edit.attempts-unlimited': 'غير محدود',
  'gru-settings-edit.backwards': 'يمكن للطلاب العودة للخلف وتغيير الاجابات',
  'gru-settings-edit.feedback':
    'یرى الطلاب ما إذا کانت إجاباتهم صحیحة أو خاطئة',
  'gru-settings-edit.feedback-immediate': 'لكل سؤال وفي النهاية',
  'gru-settings-edit.feedback-never': 'أبداً',
  'gru-settings-edit.feedback-summary': 'في النهاية',
  'gru-settings-edit.navigation-scoring': 'التنقل والعلامات',
  'gru-settings-edit.disable-heading': 'فعِّل التقييم في خريطة المساق الدراسي',
  'gru-settings-edit.disable-legend':
    'يمكن للطلاب تشغيل التقييم من خريطة المساق الدراسي الخاصة بهم',
  'gru-icon-popover.settings-visibility-title': 'اجعل المحتوى الخاص بك مرئياً',
  'gru-icon-popover.settings-visibility-content':
    'هذا يجعل المحتوى الخاص بك مرئياً في ملفك الشخصي. إذا كنت ترغب في مشاركة المساقات والمجموعات والتقييمات والمصادر و/ أو الأسئلة التي تنشئها مع الزملاء، نقترح عليك تفعيل هذه الميزة.',
  'gru-take-tour.text': 'جولة',
  'gru-take-tour.teacher-home.stepOne.title': 'قم بجولة',
  'gru-take-tour.teacher-home.stepOne.description':
    'أهلاً بك في "قم بجولة" وفي صفحتك الرئيسية، لنبدأ الآن!',
  'gru-take-tour.teacher-home.stepTwo.title': 'شِعار',
  'gru-take-tour.teacher-home.stepTwo.description':
    'ستعود إلى صفحتك الرئيسية بالنقر على الشِعار. ',
  'gru-take-tour.teacher-home.stepThree.title': 'شريط البحث',
  'gru-take-tour.teacher-home.stepThree.description':
    'ابحث في فهرس المحتوى لدينا عن المواضيع التي تهمك.',
  'gru-take-tour.teacher-home.stepFour.title': 'الصفوف الدراسية',
  'gru-take-tour.teacher-home.stepFour.description':
    'العودة إلى صفحتك الرئيسية.',
  'gru-take-tour.teacher-home.stepFive.title': 'مدير المحتوى',
  'gru-take-tour.teacher-home.stepFive.description':
    'رابط لإنشاء المحتوى والولوج إليه بشكل سريع. ',
  'gru-take-tour.teacher-home.stepSix.title': 'المكتبة',
  'gru-take-tour.teacher-home.stepSix.description':
    'تصفّح مساقاتنا الدراسية المميزة.',
  'gru-take-tour.teacher-home.stepSeven.title': 'ملفك الشخصي',
  'gru-take-tour.teacher-home.stepSeven.description':
    'يمكنك ولوج وتحديث المحتوى الخاص بك وملفك الشخصي والإعدادات.',
  'gru-take-tour.teacher-home.stepEight.title': 'المساعدة',
  'gru-take-tour.teacher-home.stepEight.description':
    'الذهاب إلى مركز الدعم أو تسجيل الخروج. ',
  'gru-take-tour.teacher-home.stepNine.title': 'الصفوف الدراسية',
  'gru-take-tour.teacher-home.stepNine.description':
    'عرض قائمة الصفوف التي تُدرسها. ',
  'gru-take-tour.teacher-home.stepTen.title': 'الصفوف الدراسية المؤرشفة.',
  'gru-take-tour.teacher-home.stepTen.description':
    'عرض قائمة الصفوف التي درَّستها في الماضي.',
  'gru-take-tour.teacher-home.stepEleven.title': 'أنشئ صفاً دراسياً',
  'gru-take-tour.teacher-home.stepEleven.description':
    'قم بتسمية صفك الدراسي واضغط على الزر لإنشاء صف دراسي جديد. ',
  'gru-take-tour.student-home.stepOne.title': 'قم بجولة',
  'gru-take-tour.student-home.stepOne.description':
    'أهلا بك في "قم بجولة" وفي صفحتك الرئيسية، لنشاهد الميزات المتوفرة لك في صفحتك الرئيسية. ',
  'gru-take-tour.student-home.stepFeaturedCourses.title':
    'المساقات الدراسية المميزة',
  'gru-take-tour.student-home.stepFeaturedCourses.description':
    'تصفح المساقات الدراسية المميزة في المواضيع التي تهمك في فهرس المحتوى الخاص بمتصفح التعليم.',
  'gru-take-tour.student-home.stepTwo.title': 'شِعار',
  'gru-take-tour.student-home.stepTwo.description':
    'ستعود إلى صفحتك الرئيسية بالنقر على الشِعار. ',
  'gru-take-tour.student-home.stepThree.title': 'شريط البحث',
  'gru-take-tour.student-home.stepThree.description':
    'ابحث عن  المواضيع التي تهمك في فهرس المحتوى.',
  'gru-take-tour.student-home.stepFour.title': 'دراستي',
  'gru-take-tour.student-home.stepFour.description':
    'العودة إلى صفحتك الرئيسية.',
  'gru-take-tour.student-home.stepFive.title': 'المكتبة',
  'gru-take-tour.student-home.stepFive.description':
    'تصفح المساقات الدراسية المميزة في متصفح التعليم وفي مكتبات الشركاء لإيجاد عدد من المواضيع التي تهمك.',
  'gru-take-tour.student-home.stepSix.title': 'أداء',
  'gru-take-tour.student-home.stepSix.description':
    'اطلع على ملخص أدائك في المساقات التي سجلت فيها.',
  'gru-take-tour.student-home.stepSeven.title': 'ملفك الشخصي',
  'gru-take-tour.student-home.stepSeven.description':
    'يمكنك تحديث وولوج المحتوى الخاص بك وملفك الشخصي',
  'gru-take-tour.student-home.stepEight.title': 'المساعدة',
  'gru-take-tour.student-home.stepEight.description':
    'الذهاب إلى مركز الدعم أو تسجيل الخروج. ',
  'gru-take-tour.student-home.stepNine.title': 'الإعلانات',
  'gru-take-tour.student-home.stepNine.description':
    'هنا سترى الإعلانات التي يرغب معلمك أو المدرسة أن تعرف عنها.',
  'gru-take-tour.student-home.stepTen.title': 'الصفوف الدراسية',
  'gru-take-tour.student-home.stepTen.description':
    'شاهد جميع الصفوف الدراسية التي سجلت بها. ',
  'gru-take-tour.student-home.stepEleven.title': 'التعليم المستقل',
  'gru-take-tour.student-home.stepEleven.description':
    'ابحث عن المواضيع التي وضعت عليها إشارة مرجعية والتي تريد أن تتعلمها. ',
  'gru-take-tour.student-home.stepTwelve.title': 'انضم للصف الدراسي',
  'gru-take-tour.student-home.stepTwelve.description':
    'أدخِل رمز الصف الدراسي للانضمام إليه.',
  'gru-take-tour.student-home.stepThirteen.title': 'انتهيت!',
  'gru-take-tour.student-home.stepThirteen.description':
    'والآن اضغط على مساق دراسي سجلت به، انضم للصف الدراسي، أو ابحث عن المحتوى الذي يهمك. ',
  'gru-take-tour.student-performance.stepOne.title': 'أهلا بك!',
  'gru-take-tour.student-performance.stepOne.description':
    'مرحبا بكم في لوحة الأداء الخاصة بك. يمكنك استعراض أدائك في جميع الصفوف والمساقات الدراسية.',
  'gru-take-tour.student-performance.stepTwo.title':
    'علامة تبويب تفصيل البيانات',
  'gru-take-tour.student-performance.stepTwo.description':
    'انقر على السهم لتفصيل البيانات الخاصة بأدائك حسب النشاط والفترة الزمنية والموضوع والمساق الدراسي.',
  'gru-take-tour.student-performance.stepThree.title': 'تحديث التقرير',
  'gru-take-tour.student-performance.stepThree.description':
    'بعد تحديد المرشِّحات، انقر على "تحديث التقرير" لعرض النتائج.',
  'gru-take-tour.student-performance.stepFour.title': 'تنزيل أو طباعة',
  'gru-take-tour.student-performance.stepFour.description': 'تنزيل التقرير.',
  'gru-take-tour.student-performance.stepFive.title': 'انتهيت!',
  'gru-take-tour.student-performance.stepFive.description':
    'امضِ قدما وحلّل أدائك!',
  'gru-take-tour.student-class.stepOne.title': 'أهلا بك!',
  'gru-take-tour.student-class.stepOne.description':
    'أهلا بك في صفك الدراسي، هنا ستجد نشاطات صفك اليومية وخريطة المساق الدراسي وبيانات الأداء. لنبدأ الآن',
  'gru-take-tour.student-class.stepTopBar.title':
    'المساق الدراسي، الأداء، الإكمال',
  'gru-take-tour.student-class.stepTopBar.description':
    'شاهد ملخص عن المساق الدراسي والأداء العام حتى الآن. ',
  'gru-take-tour.student-class.stepTwo.title': 'أنشطة الصف اليومية',
  'gru-take-tour.student-class.stepTwo.description':
    'يمكنك ولوج ودراسة النشاطات المعينة من قَبل معلمك اليوم . ',
  'gru-take-tour.student-class.stepThree.title': 'خريطة المساق الدراسي',
  'gru-take-tour.student-class.stepThree.description':
    'انقر على الوحدات والدروس لإكمال المجموعات والتقييمات في المساق الدراسي.',
  'gru-take-tour.student-class.stepFour.title': 'تقريري',
  'gru-take-tour.student-class.stepFour.description':
    'عاين أداء سصفك الدراسي العام.',
  'gru-take-tour.student-class.stepFive.title': 'انتهيت!',
  'gru-take-tour.student-class.stepFive.description':
    'ابدأ بدراة المساق الدراسي بالنقر على "خريطة المساق الدراسي" أو "النشاطات اليومية"',
  'gru-take-tour.teacher-class.stepOne.title': 'أهلا بك!',
  'gru-take-tour.teacher-class.stepOne.description':
    'أهلاً بك في صفك الدراسي، هنك يمكنك مشاهدة وتعيين نشاطات صفك اليومية وخريطة المساق وتحديث معلومات الصف ومشاهدة بيانات أداء الطلاب. لنبدأ الآن!',
  'gru-take-tour.teacher-class.stepTopBar.title':
    'المساق الدراسي، الأداء، الإكمال',
  'gru-take-tour.teacher-class.stepTopBar.description':
    'شاهد ملخص عن المساق الدراسي والأداء العام حتى الآن. ',
  'gru-take-tour.teacher-class.stepTwo.title': 'أنشطة الصف اليومية',
  'gru-take-tour.teacher-class.stepTwo.description':
    'شاهد و عيِّن نشاطات اليوم لطلابك. ',
  'gru-take-tour.teacher-class.stepThree.title': 'خريطة المساق الدراسي',
  'gru-take-tour.teacher-class.stepThree.description':
    'شاهد و عدِّل الوحدات و الدروس والمجموعات و التقييمات المُعيَّنة في هذا المساق.',
  'gru-take-tour.teacher-class.stepFour.title': 'تقريري',
  'gru-take-tour.teacher-class.stepFour.description':
    'يمكنك مشاهدة ملخص عن آداء طلابك في المساق وولوج تقاريرهم. ',
  'gru-take-tour.teacher-class.stepClassManagement.title':
    'إدارة الصف الدراسي. ',
  'gru-take-tour.teacher-class.stepClassManagement.description':
    'عيِّن أو حدّث معلومات الصف والطلاب المسجلين فيه. ',
  'gru-take-tour.teacher-class.stepFive.title': 'انتهيت!',
  'gru-take-tour.teacher-class.stepFive.description':
    'ولآن شارك الصف الدراسي مع طلابك.',
  'gru-take-tour.study-player.stepOne.title': 'أهلا بك!',
  'gru-take-tour.study-player.stepOne.description':
    'هذا هو مشغل الدراسة الخاص بك، لنلق نظرة على الميزات المتوفرة لك. ',
  'gru-take-tour.study-player.stepTwo.title': 'خريطة المساق الدراسي',
  'gru-take-tour.study-player.stepTwo.description':
    'انقر على الأيقونة في أي وقت للعودة إلى خريطة المساق.',
  'gru-take-tour.study-player.stepThree.title': 'اسم المساق الدراسي',
  'gru-take-tour.study-player.stepThree.description':
    'يشير إلى المساق الذي تعمل عليه.',
  'gru-take-tour.study-player.stepFour.title': 'اقتراحات',
  'gru-take-tour.study-player.stepFour.description':
    'المصادر الإضافية التي من الممكن أن ترغب بالبحث عنها بناءً على ما تدرسه',
  'gru-take-tour.study-player.stepFive.title': 'إنجاز',
  'gru-take-tour.study-player.stepFive.nuTitle': 'كفاءات',
  'gru-take-tour.study-player.stepFive.description':
    'تشير إلى قدَر تقدمك في المساق. ',
  'gru-take-tour.study-player.stepSix.title': 'أداء',
  'gru-take-tour.study-player.stepSix.description': 'تشير إلى أدتئك في المساق',
  'gru-take-tour.study-player.stepSeven.title': 'تفاعل مع المصدر.',
  'gru-take-tour.study-player.stepSeven.description':
    'أخبر معلمك عن رأيك في هذا المصدر.',
  'gru-take-tour.study-player.stepEight.title': 'انتهيت!',
  'gru-take-tour.study-player.stepEight.description': 'ابدأ الدراسة!',
  'gru-take-tour.study-player.stepNine.title': 'العودة إلى المجموعة',
  'gru-take-tour.study-player.stepNine.description':
    'انقر على الأيقونة في أي وقت للعودة إلى المجموعة أو التقييم.',
  'gru-take-tour.library.stepOne.title': 'أهلا بك!',
  'gru-take-tour.library.stepOne.description':
    'أهلا بك في مكتبات متصفح التعلم. ',
  'gru-take-tour.library.stepTwo.title': 'المساقات الدراسية المميزة',
  'gru-take-tour.library.stepTwo.description':
    'ابحث في المساقات الدراسية التي طورها وطبقعا المعلمون سابقاً في صفوفهم الدراسية.',
  'gru-take-tour.library.stepThree.title': 'مكتبات أخرى',
  'gru-take-tour.library.stepThree.description':
    'ابحث في المحتوى الذي طوره شركاه جورو. ',
  'gru-take-tour.library.stepFour.title': 'معاينة',
  'gru-take-tour.library.stepFour.description':
    'عاين المساق لمعرفة إذا ما كان مهم بالنسبة لك أم لا.',
  'gru-take-tour.library.stepFive.title': 'مشاركة',
  'gru-take-tour.library.stepFive.description': 'شارك هذا المساق مع الآخرين.',
  'gru-take-tour.library.stepSix.title': 'إشارة مرجعية',
  'gru-take-tour.library.stepSix.description':
    'قم بوضع إشارة مرجعية على هذا المساق لمعاينته لاحقاً.',
  'gru-take-tour.profile.stepOne.title': 'أهلا بك!',
  'gru-take-tour.profile.stepOne.description':
    'أهلاً بك في ملفك الشخصي، هنا يمكنك الولوج للمحتوى الخاص بك ومعلوماتك الشخصية و المتابعين.',
  'gru-take-tour.profile.stepTwo.title': 'المحتوى الخاص بي',
  'gru-take-tour.profile.stepTwo.description':
    'أنشئ محتوى جديد، وشاهد المحتوى الذي قمت بإعادة مزجه.',
  'gru-take-tour.profile.stepThree.title': 'حولي',
  'gru-take-tour.profile.stepThree.description':
    'حدِّث معلوماتك الشخصية ومعلومات المدرسة و الصورة الشخصية. ',
  'gru-take-tour.profile.stepFour.title': 'الأهداف',
  'gru-take-tour.profile.stepFour.description':
    'ضَع و تعقب الأهداف لمساعدتك في تحقيق أهداف التعلم الخاصة بك. ',
  'gru-take-tour.profile.stepFive.title': 'متابِعون',
  'gru-take-tour.profile.stepFive.description':
    'إذا أعجبك محتوى إحدى المساقات الدراسية، يمكنك متابعة الأشخاص الذين قاموا ببنائه. كما يمكنك مشاهدة المتابعين. ',
  'gru-take-tour.profile.stepSix.title': 'شارات',
  'gru-take-tour.profile.stepSix.description':
    'شاهد الشارات التي حصلت عليها، ستحصل على شارة في حال إكمال تقييم معياري تم تعيينه من قِبل معلمك.',
  'gru-tour.assessments-settings.stepOne.title': 'التنقل والعلامات',
  'gru-tour.assessments-settings.stepOne.description':
    'يحدد هذا الإعداد كيفية انتقال الطلاب خلال تقييم معيّن ويبين ما إذا كانت إجاباتهم صحيحة أم خاطئة. هذا الإعداد لا يُظهر لهم مفتاح الإجابة.',
  'gru-tour.assessments-settings.stepTwo.title':
    'مفتاح الإجابة  وعدد المحاولات.',
  'gru-tour.assessments-settings.stepTwo.description':
    'يتيح هذا الإعداد إظهار مفتاح الإجابة  ويحدد عدد المحاولات التي يملكها الطلاب في التقييم.',
  'gru-tour.overview.stepOne.title': 'خريطة المساق الدراسي',
  'gru-tour.overview.stepOne.description':
    'تتيح خريطة المساق الدراسي للطلاب الوصول إلى جميع التقييمات والمجموعات التي تعيّنها لهم.',
  'gru-tour.overview.stepTwo.title': 'رمز الصف',
  'gru-tour.overview.stepTwo.description':
    'لكل صف تقوم بإنشائه رمز خاص. ستعطي هذا الرمز للطلاب عندما يصبح صفك الدراسي جاهز لانضمامهم ووصولهم إلى المحتوى الخاص بك.',
  'gru-tour.overview.stepThree.title': 'مراقبة بيانات الطالب والصف.',
  'gru-tour.overview.stepThree.description':
    'تتيح لك هذه الخطوة رؤية بيانات تقييم الصف والطالب عند استكمال الطلاب للتقييمات التي تشكّل جزءاً من المساق الدراسي.',
  'gru-tour.overview.stepFour.title': 'معلومات الصف االدراسي',
  'gru-tour.overview.stepFour.description':
    'هنا يمكنك تعديل اسم صفك الدراسي، ونشر الإعلانات لطلابك، ورؤية أسماء الطلاب المسجلين فيه، وحذفه.',
  'gru-tour.overview.stepFive.title': 'تعديل محتوى المساق الدراسي.',
  'gru-tour.overview.stepFive.description':
    'عندما تكون في صف دراسي، انقر هنا لتعديل أي محتوى في المساق الدراسي المعيّن لطلابك.',
  'gru-tour.overview.stepSix.title': 'رصد التقدم المحرز في الوقت الحقيقي!',
  'gru-tour.overview.stepSix.description':
    'استخدم لوحة تحكم "الوقت الحقيقي" لرصد تقدم الصف المحرز على التقييم في نفس وقت عمله.\nانقر على أيقونة \'التقييم المباشر\' -الموجودة إلى يسار كل تقييم- لبدء تقييم الطلاب في نفس وقت عملهم',
  'gru-tour.quick-start.stepOne.title': 'التنقل بين الصفوف الدراسية',
  'gru-tour.quick-start.stepOne.description':
    'هذا هو شكل الصف الدراسي الذي تم إنشاؤه حديثا. للرجوع إلى الصف الدراسي في أي وقت، انقر على \'الصفوف الدراسية\' واستخدم القائمة المنسدلة لتحديد الصفوف الدراسية التي ترغب في دخولها.',
  'gru-tour.quick-start.stepTwo.title': 'البدء؟ أنشئ تقييم!',
  'gru-tour.quick-start.stepTwo.description':
    'نقترح عليك إنشاء تقييم كوسيلة للبدء مع جورو وتقييم مستوى فهم الطلاب الحالي في صفك.',
  'gru-tour.real-time.stepOne.title': 'تفاصيل الإجابات',
  'gru-tour.real-time.stepOne.description':
    'انقر على كل سؤال للاطلاع على تفاصيل إجابات الطلاب.',
  'gru-tour.real-time.stepTwo.title': 'بيانات الطالب الفردية',
  'gru-tour.real-time.stepTwo.description':
    'اختر خانة كلّ طالب للاطلاع على تقارير بيانات الطالب الفردية.',
  'gru-tour.real-time.stepThree.title': 'حدد طريقة عرض',
  'gru-tour.real-time.stepThree.description':
    'اختر\'عرض العنوان\' أو \'عرض القائمة\' للاطلاع على خيارات عرض البيانات.',
  'gru-tour.real-time.stepFour.title': 'متوسط العلامات',
  'gru-tour.real-time.stepFour.description':
    'اطلع على متوسط ​​معدل الصف المحسوب في الوقت الحقيقي لجميع الإجابات',
  'gru-tour.real-time.stepFive.title': 'عرض البيانات المجهولة',
  'gru-tour.real-time.stepFive.description':
    'استخدم هذا الخيار لإظهار عرض مجهول لبيانات الطالب.',
  'gru-course-play.hide-unit-details': 'إخفاء بيانات الوحدة الوصفية',
  'gru-course-play.view-unit-details': 'عرض بيانات الوحدة الوصفية',
  'gru-course-play.performance': 'أداء',
  'gru-century-skills.legends.hewlett': 'نموذج هيوليت للتعمق في التعليم',
  'gru-century-skills.legends.conley': 'مفاتيح كونلي الأربعة للمعرفة',
  'gru-century-skills.legends.framework': 'إطار مهارات القرن الحادي والعشرين\n',
  'gru-century-skills.legends.national':
    'المركز الوطني للبحوث من أجل الحياة والعمل.',
  'gru-century-skills.content.groups.cognitive':
    'المهارات والاستراتيجيات المعرفية الرئيسية.',
  'gru-century-skills.content.groups.content': 'محتوى المعرفة الرئيسي',
  'gru-century-skills.content.groups.learning':
    'مهارات وتقنيات التعلم الأساسية',
  'gru-rubric-edit.upload-rubric': 'تحميل سلم تقييم',
  'gru-rubric-edit.copy.success-message':
    'لقد نسخت سلم التقييم {{title}}. هل تريد تعديله؟ ',
  'gru-rubric-creation.url': 'رابط',
  'gru-rubric-creation.upload-file': 'تحميل الملف',
  'gru-rubric-creation.add-category': 'ضِف فئة جديدة',
  'gru-rubric-creation.gru-preview-url.preview':
    'ضِف سلم تقييم أعلاه وعاينه هنا.',
  'gru-rubric-creation.overall-narrative': 'تغذية راجعة كلامية.',
  'gru-rubric-creation.feedback-guidance': 'دليل التغذية الراجعة',
  'gru-rubric-creation.required-feedback': 'التغذية الراجعة مطلوبة',
  'gru-rubric-creation.feedback-guidance-placeholder':
    'لخِّص ملاحظاتك على المقال ككل.',
  'gru-rubric-creation.gru-category.category-title': 'عوان الفئة',
  'gru-rubric-creation.gru-category.category-feedback':
    'عند معاينة هذه الفئة، انتبه لهذف الكاتب. ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.0':
    'مثال: تخطى الاحترافية',
  'gru-rubric-creation.gru-category.gru-scoring-levels.1': 'مثال: محترف',
  'gru-rubric-creation.gru-category.gru-scoring-levels.2':
    'مثال: قريب من الاحترافية',
  'gru-rubric-creation.gru-category.gru-scoring-levels.3': 'مثال: مبتدئ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.4': 'مثال: غير محترف',
  'gru-rubric-creation.gru-category.gru-scoring-levels.best': 'أفضل',
  'gru-rubric-creation.gru-category.gru-scoring-levels.levels': 'المستوى',
  'gru-rubric-creation.gru-category.gru-scoring-levels.new-level':
    'إضافة مستوى جديد',
  'gru-rubric-creation.gru-category.gru-scoring-levels.scoring': 'العلامة',
  'gru-rubric-creation.gru-category.gru-scoring-levels.worst': 'أسوأ',
  'gru-rubric-creation.gru-category.gru-scoring-levels.name-error':
    'يرجى إدخال عنوان المستوى',
  'gru-rubric-creation.gru-category.gru-scoring-levels.score-error':
    'يرجى إدخال قيمة العلامة',
  'gru-rubric-creation.gru-category.gru-scoring-levels.no-levels-error':
    'يرجى وضع قيمة لمستوى واحد على الأقل.',
  'library.browse-library': 'تصفح المكتبة',
  'library.featured-courses': 'المساقات الدراسية المميزة',
  'library.gru-library-card.featured-course': 'مساق دراسي مميز',
  'library.gru-partner-library-card.course.zero': '{{count}} مساق دراسي',
  'library.gru-partner-library-card.course.one': '{{count}} مساق دراسي',
  'library.gru-partner-library-card.course.other': '{{count}} مساقات دراسية',
  'library.gru-partner-library-card.collection.zero': '{{count}} مجموعة',
  'library.gru-partner-library-card.collection.one': '{{count}} مجموعة',
  'library.gru-partner-library-card.collection.other': '{{count}} مجموعات',
  'library.gru-partner-library-card.assessment.zero': '{{count}} تقييم',
  'library.gru-partner-library-card.assessment.one': '{{count}} تقييم',
  'library.gru-partner-library-card.assessment.other': '{{count}} تقييمات',
  'library.gru-partner-library-card.resource.zero': '{{count}} مصدر',
  'library.gru-partner-library-card.resource.one': '{{count}} مصدر',
  'library.gru-partner-library-card.resource.other': '{{count}} مصادر',
  'library.gru-partner-library-card.question.zero': '{{count}} سؤال',
  'library.gru-partner-library-card.question.one': '{{count}} سؤال',
  'library.gru-partner-library-card.question.other': '{{count}} اسئلة',
  'library.gru-partner-library-card.rubric.zero': '{{count}} سلم تقييم',
  'library.gru-partner-library-card.rubric.one': '{{count}} سلم تقييم',
  'library.gru-partner-library-card.rubric.other': '{{count}} سلم تقييمي',
  'library.partner-libraries': 'مكتبات الشركاء',
  'gru-study-header.lesson-legend': 'تمت إضافتك إلى الدرس',
  'gru-study-header.resource-legend': 'أنت تتحقق من المصدر',
  'gru-study-header.resources-collection-report': 'تقرير استخدام المجموعة',
  'gru-study-header.resources-assessment-report': 'ملخص تقرير التقييم',
  'gru-study-header.check-summary': 'تحقق من ملخص التقرير',
  'gru-study-header.check-usage': 'تحقق من تقرير الاستخدام',
  'gru-study-header.no-suggestions':
    'نحن نعمل على أفضل الاقتراحات لدعم عملية التعليم',
  'gru-study-header.resource.zero': 'مصدر',
  'gru-study-header.resource.one': 'مصدر',
  'gru-study-header.resource.other': 'مصادر',
  'gru-study-header.question.zero': 'سؤال',
  'gru-study-header.question.one': 'سؤال',
  'gru-study-header.question.other': 'أسئلة',
  'gru-study-header.suggestions-legend': 'لمعرفة المزيد، تحقق من هذه المصادر.',
  'gru-suggest-test.pre-test-header': 'اختبار مسبق للدرس (اختياري)',
  'gru-suggest-test.post-test-header': 'اختباربعد الانتهاء من الدرس (اختياري)',
  'gru-suggest-test.backfill-header': 'المجموعة المقترحة (اختياري)',
  'gru-suggest-test.benchmark-header': 'اختبار معياري (اختياري)',
  'gru-suggest-test.resource-header': 'المصدر المقترح (اختياري)',
  'gru-suggest-test.signature_collection-header':
    'Suggested Collection (Optional)',
  'gru-suggest-test.signature_collection-lead':
    'Based on your performance on this course, the following collection may enhance your understanding.',
  'gru-suggest-test.signature_assessment-header':
    'Suggested Assessment (Optional)',
  'gru-suggest-test.signature_assessment-lead':
    'Based on your performance on this course, the following assessment may enhance your understanding.',
  'gru-suggest-test.pre-test-lead':
    'يفضل الخضوع لاختبار قبل البدء بالدرس لتقييم مدى استيعاب الطالب للمفهوم الذي سيتم طرحه في هذا الدرس. يساعد هذا الاختبار الطالب في التحضير لمحتوى الدرس دون التأثير على علامة الآداء. ',
  'gru-suggest-test.post-test-lead':
    'الاختبار التالي هو اختبار بعد الانتهاء من الدرس، ويفضل الخضوع له لتقييم مدى استيعاب الطالب للمفهوم الذي تم طرحه أثناء شرح الدرس، ولن يؤثرهذا الاختبار على علامة الآداء. ',
  'gru-suggest-test.backfill-lead':
    'بناءً على إجاباتك في الامتحان المسبق للدرس، يُنصح بمراجعة مواد إضافية قبل البدء بالدرس، فمراجعة إحدى المواد المساندة يساعد الطالب في تعلم مادة جديدة. ',
  'gru-suggest-test.benchmark-lead':
    'أنت على استعداد لإظهار مدى استيعابك من خلال الخضوع للتقييم معياري. سيتم منحك شارة في حال إكمال هذا التقييم بنجاح، لن يؤثر هذا التقييم على علامة الآداء. ',
  'gru-suggest-test.resource-lead':
    'بناءً على آدائك في هذا المساق، سيعزز المصدر التالي اسيعابك له. ',
  'gru-suggest-test.no': 'لا، شكرا',
  'gru-suggest-test.no-suggestions': 'هذا ملخص لآدائك',
  'gru-suggest-test.take': 'خذ {{type}}',
  'gru-suggest-test.take-signature-collection': 'Study Suggested Collection',
  'gru-suggest-test.take-signature-assessment': 'Study Suggested Assessment',
  'gru-suggest-test.take-backfill-pretest': 'ادرس المجموعات المقترحة',
  'gru-suggest-test.take-resource': 'ادرس المصدر',
  'gru-suggest-test.end-of-course': 'لقد وصلت إلى نهاية المساق الدراسي.',
  'gru-content-suggestion.header': 'We have a suggestion for you!',
  'gru-content-suggestion.suggestion-text.collection':
    'Based on your performance on this topic, we recommend that you go through our suggested collection to help you gain mastery.',
  'gru-content-suggestion.suggestion-text.assessment':
    'Based on your performance on this topic, we recommend that you go through our suggested assessment to help you gain mastery.',
  'student-open-ended-summary.overall-comment': 'التعليق العام',
  'student-open-ended-summary.overall-score': 'العلامة العامة',
  'student-open-ended-summary.prompt': 'سؤال فوري',
  'gru-performance-chart.teacher-tooltip':
    'من طلابك أكمل كل التقييمات في هذا الدرس.',
  'report.external-assessment-report.note':
    'This is an external assessment with student reported scores for the assessment. Individual question level data is not available.',
  'report.external-assessment-report.wish': 'Congratulations! You scored',
  'report.external-assessment-report.reference':
    'This external assessment can be accessed ',
  'report.external-collection-report.note':
    'This is an external collection with student reported scores for the collection. Individual question level data is not available.',
  'report.external-collection-report.wish': 'Congratulations! You scored',
  'report.external-collection-report.reference':
    'This external collection can be accessed ',
  'report.competency-report.title': 'Competency Report',
  'report.competency-report.no-subject': 'No Subject Assigned',
  'report.competency-report.prerequisites': 'prerequisites',
  'report.competency-report.signature-assessments': 'Signature Assessments',
  'report.competency-report.signature-collections': 'Signature Collections',
  'report.competency-report.show-global-data': 'Show Global Data',
  'report.competency-report.show-student-data': 'Show Student Data',
  'report.competency-report.show-learning-map': 'Show Learning Map',
  'report.competency-report.note':
    'Score 80% or more in our signature assessment and show your mastery',
  'report.domain-report': 'Domain Report',
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
  'self-report.your-score': 'Your Score',
  'self-report.time_spent': 'Time Spent',
  'self-report.update-error': 'Problem with updating score',
  'self-report.validation-error': 'Enter valid score',
  'self-report.enter-score': 'Enter your score here',
  'self-report.enter-timeSpent': 'Enter your time spent here',
  'self-report.validation-error-time': 'Enter valid time',
  'notifications.notificationlist-header-title': 'NOTIFICATIONS',
  'notifications.show-more': 'SHOW MORE',
  'notifications.type.teacher-suggestion-title':
    'You have a new teacher suggestion in class : {{ classTitle }}',
  'notifications.type.student-gradable-submission-title':
    'You have {{occurrence}} item(s) to grade in class : {{ classTitle }}',
  'notifications.type.student-self-report-title':
    '{{occurrence}} Student(s) reported performance at class : {{ classTitle }}',
  'notifications.type.teacher-override-title':
    'Teacher has corrected your submission at class : {{ classTitle }}  ',
  'notifications.type.teacher-grading-complete-title':
    'Teacher has graded your submission at class : {{ classTitle }}',
  'notifications.typeinclass.teacher-suggestion-title':
    'You have a new teacher suggestion',
  'notifications.typeinclass.student-gradable-submission-title':
    'You have {{occurrence}} student item(s) to grade',
  'notifications.typeinclass.student-self-report-title':
    '{{occurrence}} Student(s) reported performance',
  'notifications.typeinclass.teacher-override-title':
    'Teacher has corrected your submission',
  'notifications.typeinclass.teacher-grading-complete-title':
    'Teacher has graded your submission at class',
  'goahead.add.something': 'Go ahead, add something.',
  'present.diagnostic.determine.not.know':
    'Present a diagnostic to determine the student\'s current location, if not known?',
  'present.diagnostic.determine.know':
    '(If you select No, the {{subject}} level will be used to approximate the student\'s location)',
  'add.to.todays.class': 'Add to Today\'s Class',
  warning: 'warning',
  'ca.warn.turn-on.multiple-competencies':
    'This assessment is tagged to multiple competencies. Turning ON mastery will mean students can acquire mastery against all the competencies tagged to this assessment.',
  'ca.warn.turn-on.multiple-competencies.question':
    'Do you want to allow multiple competencies to be mastered via single assessment ?',
  'ca.warn.turn-on.multiple-competencies.note':
    'Note: You can remix (copy) any assessment and tag the right competency intended for students to gain mastery, before adding it at class acitivities.',
  'ca.warn.trun-off.mastery-accrual':
    'Turning OFF mastery will not revert any existing student data. Students who have already accrued mastery against competencies tagged to this assessment will have their data continue to reflect so.',
  'ca.warn.trun-on.mastery-accrual':
    'Turning ON mastery accrual  will not update mastery status for students who have already completed the assessment.',
  'ca.mastery-accrual.update.error':
    'Oops! Unable to update class activity content mastery accrual right now. Please try again shortly.',
  'want.to.proceed': 'Do you want to proceed ?',
  proceed: 'Proceed',
  'enter-student-score': 'Enter Student Score',
  'enter-assessment-max-score': 'Enter Assessment Max Score',
  'student-score': 'Student Score',
  'search-resource-question': 'Search Resource/Question',
  'enter-resource-timespent': 'Enter Resource Time Spent',
  'enter-collection-timespent': 'Enter Collection Time Spent',
  'suggested-lessons': 'Suggested Lessons',
  'created-by-kangoorus': 'Created by Kangoorus',
  'preparatory-material': 'Preparatory Material',
  milestones: 'Milestones',
  'show-course-map': 'Show course Map',
  'show-milestones': 'Show Milestones',
  'warn.class-destination-not-setup':
    'Class setup is not complete unless the class destination is set. Go to Class Settings and complete setup. Otherwise, students will not be able to access content for this class.',
  'milestone-rescoped':
    'This milestone is available due to your {{subject}} level setup by teacher, but you seem to have caught up on all relevant competencies.',
  'student-milestone-not-ready':
    'Personalized learning pathway is not fully setup yet. Please contact your teacher to help with content access.',
  'warn.teacher-milestone-not-ready':
    'Milestone view for the course used at class is not ready yet. Unless milestone view is ready, students will have trouble accessing content at class. Check if class setup is complete with origin and destination values.',
  'pre-study': 'Pre-Study',
  'course-map.your-learning-path': 'Your Learning Path',
  'mastery-greeting-msg':
    'You’ve earned a Mastery Badge! Would you like to see the improvement in your competency skyline?',
  'show-me': 'Show Me',
  'common.subtask.oa.project.poster': 'Project Poster',
  'common.subtask.oa.project.presentation': 'Project Presentation',
  'common.subtask.oa.project.video': ' Project Video',
  'common.subtask.oa.project.diorama': 'Project Diorama',
  'common.subtask.oa.project.brochure': 'Project Brochure',
  'common.subtask.oa.project.model': 'Project Model',
  'common.subtask.oa.seminar': 'Seminar',
  'common.subtask.oa.short_answer': 'Short Answer',
  'common.subtask.oa.extended_response': 'Extended Response',
  'common.subtask.oa.research_paper': 'Research Paper',
  'common.subtask.oa.position_paper': 'Position Paper',
  'common.subtask.oa.lab_report': 'Lab Report',
  'common.subtask.oa.explanation_argument': 'Explanation Argument',
  'common.subtask.oa.debate': 'Debate',
  project: 'Project',
  'oa.project.poster': 'Poster',
  'oa.project.presentation': 'Presentation',
  'oa.project.video': 'Video',
  'oa.project.diorama': 'Diorama',
  'oa.project.brochure': 'Brochure',
  'oa.project.model': 'Model',
  'oa.seminar': 'seminar',
  'oa.short_answer': 'Short Answer',
  'oa.extended_response': 'Extended Response',
  'oa.research_paper': 'Research Paper',
  'oa.position_paper': 'Position Paper',
  'oa.lab_report': 'Report',
  'oa.explanation_argument': 'Explanation Argument',
  'oa.debate': 'Debate',
  'oa.format': 'Activity Type',
  'oa.tasks.label': 'Tasks',
  'oa.references.label': 'References',
  'oa.references.artifacts': 'Reference Artifacts',
  'oa.references.urls': 'Reference URLs',
  'oa.references.exemplar': 'Exemplar Answer',
  'oa.references.uploads': 'Uploads',
  'oa.submissions.type': 'Type of Submission',
  'oa.edit_activity': 'Edit Activity',
  'oa.add_activity': 'Add Activity',
  'oa.remix': 'Remix Offline Activity',
  'oa.remix.lead': 'You are about to remix an offline activity.',
  'oa.remix.success':
    'You\'ve remixed an offline activity {{title}}. Do you want to edit that offline activity?',
  'oa.title': 'Offline Activity Title',
  'errors.oa-not-copied':
    'Oops! Unable to copy offline activity right now. Please try again shortly.',
  'common.self': 'Self',
  'oa.enter-timespent-label':
    'Please enter the total time spent on the activity',
  'no-task-available': 'No Task Available',
  'your-answer': 'Your Answer',
  'common.saving': 'Saving',
  'oa.offline_activity.label': 'Offline Activity',
  'common.oa.offline_activity.label': 'Offline Activity',
  'oa.pending-submissions': 'Pending Submissions'
});
