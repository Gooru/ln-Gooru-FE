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
  'errors.description': 'Este campo',
  'errors.inclusion': '{{description}} no está incluido en la lista',
  'errors.exclusion': '{{description}} está reservado',
  'errors.invalid': '{{description}} no es válido',
  'errors.confirmation': '{{description}} no coincide {{on}}',
  'errors.accepted': 'Se debe aceptar {{description}}',
  'errors.empty': '{{description}} no puede estar vacío',
  'errors.blank': '{{description}} no puede estar en blanco',
  'errors.present': '{{description}} debe estar en blanco',
  'errors.collection': '{{description}} debe ser una colección',
  'errors.singular': '{{description}} no puede ser una colección',
  'errors.tooLong':
    '{{description}} es demasiado largo (el máximo es {{max}} caracteres)',
  'errors.tooShort':
    '{{description}} es demasiado corta (el mínimo es {{min}} caracteres)',
  'errors.before': '{{description}} debe ser antes de {{before}}',
  'errors.after': '{{description}} debe ser después de {{after}}',
  'errors.wrongDateFormat': '{{description}} debe tener el formato {{format}}',
  'errors.wrongLength':
    '{{description}} es la longitud incorrecta (debería ser {{is}} caracteres)',
  'errors.notANumber': '{{description}} debe ser un número',
  'errors.notAnInteger': '{{description}} debe ser un entero',
  'errors.greaterThan': '{{description}} debe ser mayor que {{gt}}',
  'errors.greaterThanOrEqualTo':
    '{{Description}} debe ser mayor o igual que {{gte}}',
  'errors.equalTo': '{{description}} debe ser igual a {{is}}',
  'errors.lessThan': '{{description}} debe ser menor que {{lt}}',
  'errors.lessThanOrEqualTo':
    '{{description}} debe ser menor o igual que {{lte}}',
  'errors.otherThan': '{{description}} debe ser distinto de {{value}}',
  'errors.odd': '{{description}} debe ser impar',
  'errors.even': '{{description}} debe ser par',
  'errors.positive': '{{description}} debe ser positivo',
  'errors.date': '{{description}} debe ser una fecha válida',
  'errors.email':
    '{{description}} debe ser una dirección de correo electrónico válida',
  'errors.phone': '{{description}} debe ser un número de teléfono válido',
  'errors.url': '{{description}} debe ser una URL válida',
  'common.relevance': 'Relevance',
  'common.engagement': 'Engagement',
  'common.efficacy': 'Efficacy',
  'common.grid': 'Grid',
  'common.list': 'List',
  'common.first': 'First',
  'common.last': 'Last',
  'common.name': 'Name',
  'common.user': 'user',
  'common.content-name': 'Content Name',
  'common.lastName': 'Lastname',
  'common.firstName': 'Firstname',
  'common.filter-by': 'Filter By',
  'common.more': 'more',
  'common.apply-filter': 'apply filter',
  'common.avg-score': 'Avg Score',
  'common.frq': 'FRQ',
  'common.schedule': 'Schedule',
  'common.responses': 'Responses',
  'common.no-lesson-info-message': 'This unit does have any lessons.',
  'common.no-collection-info-message': 'This lesson does have any collections.',
  'common.gooru-suggestions': 'Gooru Suggestions',
  'common.gooru-catalog': 'Gooru Catalog',
  'common.suggestion-made-to': 'Suggestion made to',
  'common.student-selected': 'Student Selected',
  'common.no-suggest-result-message': ' No matching content found',
  'common.no-suggest-results-message':
    'You can search and  find the related content.',
  'common.no-suggest-search-results-message':
    'Check your spelling. We all make mistakes! Or try searching for a similar word instead.',
  'common.a-collection': 'Una colección',
  'common.a-course': 'un curso',
  'common.a-question': 'una pregunta',
  'common.a-resource': 'un recurso',
  'common.a-rubric': 'Una rúbrica',
  'common.all-completed': 'Todo completado',
  'common.an-assessment': 'Una evaluación',
  'common.about': 'Acerca de',
  'common.about-you': 'Acerca de ti',
  'common.about-me': 'About Me',
  'common.accept': 'Accept',
  'common.ignore': 'Ignore',
  'common.add': 'Añadir',
  'common.plan-an-activities': 'Plan your activities',
  'common.plan-an-activities-msg':
    'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
  'common.Reschedule': 'Reschedule',
  'common.no-unschedule-items':
    'You don\'t have any activities that need scheduling for ',
  'common.repeat-activity': 'Repeat Activity',
  'common.add-assessment': 'Crear una nueva evaluación',
  'common.add-century-skills': 'Añadir habilidades del siglo XXI',
  'common.add-collaborator': 'Añadir Colaborador',
  'common.add-collection': 'Crear nueva colección',
  'common.add-collection-item': 'Crear recurso o pregunta',
  'common.add-competency': 'Añadir Competencia',
  'common.add-content-prompt':
    'No has creado <span>{{type}}</span> todavía. Sigue siendo audaz.',
  'common.add-course': 'Crear nuevo curso',
  'common.add-coruse-to-class': 'Add Course',
  'common.add-domains-to-unit': 'Agregar dominios a la unidad',
  'common.add-url': 'Agregar URL',
  'common.add-from-url': 'Agregar desde URL',
  'common.add-lessons': 'Añadir lecciones',
  'common.add-new-lesson': 'Crear nueva lección',
  'common.add-new-unit': 'Crear nueva unidad',
  'common.add-new-resource': 'Crear nuevo recurso',
  'common.add-new-question': 'Crear una nueva pregunta',
  'common.add-question': 'Crear pregunta',
  'common.add-question-image': 'Añadir imagen de pregunta',
  'common.add-rubric': 'Añadir nueva rubrica',
  'common.add-standard': 'Añadir Estándar',
  'common.add-standards': 'Añadir normas',
  'common.add-standards-to-collection': 'Agregar normas a la recopilación',
  'common.add-to': 'Añadir',
  'common.add-to-classroom': 'Añadir al aula',
  'common.add-to-daily-class': 'Añadir a las Actividades de la Clase Diaria',
  'common.add-to-collection-success':
    'Has añadido {{contentTitle}} a {{collectionTitle}}. ¿Desea editar ese {{collectionType}}?',
  'common.add-to-lesson-success':
    'Has añadido {{collectionTitle}} a {{lessonTitle}}. ¿Desea editar ese {{collectionType}}?',
  'common.add-type-question': '¿Qué tipo de pregunta le gustaría agregar?',
  'common.add-type-resource': '¿Qué tipo de recurso es este?',
  'common.add-units': 'Añadir unidades',
  'common.added': 'Adicional',
  'common.advanced-editing': 'Edición avanzada',
  'common.announcements': 'Anuncios',
  'common.anonymous_mode': 'Modo anónimo',
  'common.answer': 'Tu respuesta',
  'common.answer-correct': '¡Estás en lo correcto!',
  'common.answer-incorrect': 'Eres incorrecto ...',
  'common.answer-key-was-hidden':
    'Nota: Su profesor ha ocultado la tecla de respuesta.',
  'common.approved': 'Aprobado',
  'common.archive': 'Archive',
  'common.assessment': 'Evaluación',
  'common.assessment-disabled': 'Usted no puede intentar esta evaluación',
  'common.assessment-external': 'Evaluación externa',
  'common.assessment-pl.zero': 'Evaluaciones',
  'common.assessment-pl.one': 'Evaluación',
  'common.assessment-pl.other': 'Evaluaciones',
  'common.assessment-title': 'Título de la evaluación',
  'common.assessmentInitial': 'UN',
  'common.assessments': 'Evaluaciones',
  'common.assign': 'Asignar',
  'common.assign-to-class': 'Asignar al aula',
  'common.assign-to-course': 'Asignar al curso',
  'common.attempt': 'Número de intento',
  'common.audience': 'Audiencia',
  'common.avatarFor': 'Avatar para',
  'common.averageScore': 'Puntuación media',
  'common.back': 'Espalda',
  'common.back-to-assessment': 'Volver a la evaluación',
  'common.back-to-collection': 'Volver a la colección',
  'common.back-to-course-map': 'Volver al Mapa del Curso',
  'common.back-to-data': 'Volver a Datos',
  'common.back-to-report': 'Back to Report',
  'common.best-practices': 'Mejores prácticas',
  'common.beta': 'Beta',
  'common.big-ideas': 'Grandes ideas',
  'common.biography': 'Biografía',
  'common.bookmark': 'Marcador',
  'common.bookmarks': 'Marcadores',
  'common.bookmarked-content-success':
    'Este marcador {{contentType}} se agregará a su página de aprendizaje independiente.',
  'common.bookmarked-success':
    'Todos los contenidos marcados se añadirán a la página de aprendizaje independiente.',
  'common.builder': 'Editor',
  'common.cancel': 'Cancelar',
  'common.categories': 'Categorías',
  'common.category': 'Categoría',
  'common.categoryOptions.k12': 'K-12',
  'common.categoryOptions.k12IN': 'K12IN',
  'common.categoryOptions.higher-ed': 'Educación más alta',
  'common.categoryOptions.professional-dev': 'Desarrollo profesional',
  'common.century-skills': 'Habilidades del siglo XXI',
  'common.choose': 'Escoger',
  'common.choose-file': 'Escoge un archivo',
  'common.class': 'Aula',
  'common.classScores': 'Puntuaciones de clase',
  'common.click-unBookmark': 'Haga clic para desmarcar',
  'common.close': 'Cerca',
  'common.collection': 'Colección',
  'common.collection-external': 'External Collection',
  'common.collection-pl.zero': 'Colecciones',
  'common.collection-pl.one': 'Colección',
  'common.collection-pl.other': 'Colecciones',
  'common.collection-title': 'Título de la colección',
  'common.collections': 'Colecciones',
  'common.collectionInitial': 'do',
  'common.competency': 'Competencia',
  'common.competencies': 'Competencias',
  'common.completed': 'Terminado',
  'common.completion': 'Terminación',
  'common.community': 'Comunidad',
  'common.confirm': 'Confirmar',
  'common.confirm-copy': 'Confirmar y copiar',
  'common.content': 'Contenido',
  'common.content-manager': 'Gestor de contenidos',
  'common.contentUnavailable': 'Contenido no disponible',
  'common.contentUnavailabletoday':
    'No current activities. Add  Class Activities from the Course Map or My Content.',
  'common.contentUnavailableyesterday': 'No activities were added.',
  'common.contributed-by': 'Contribuido por',
  'common.copy': 'Dupdo',
  'common.copy-to': 'Copiar a',
  'common.correct': 'Correcto',
  'common.correct-answer': 'Respuesta correcta',
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
  'common.country': 'País',
  'common.course-map': 'Mapa del curso',
  'common.course': 'Curso',
  'common.course-title': 'Título del curso',
  'common.courses': 'Cursos',
  'common.competency-status-0': 'Not Started',
  'common.competency-status-1': 'In Progress',
  'common.competency-status-2': 'Mastered (Inferred)',
  'common.competency-status-3': 'Mastered (Asserted)',
  'common.competency-status-4': 'Mastered (Earned)',
  'common.competency-status-5': 'Mastered (Demonstrated)',
  'common.create': 'Crear',
  'common.createClass': 'Create Class',
  'common.created-by': 'Creado por',
  'common.create-rubric': 'Crear nueva rúbrica',
  'common.current-attempt': 'Intento actual',
  'common.currently-studying': 'Currently Studying',
  'common.delete': 'Borrar',
  'common.delete-instructions.links-inaccessible':
    'Todos los enlaces compartidos serán inaccesibles',
  'common.delete-instructions.content-inaccessible':
    'Todo el contenido será inaccesible a las aulas vinculadas a él',
  'common.depth-of-knowledge': 'Profundidad del Conocimiento',
  'common.description': 'Descripción',
  'common.destination': 'Destination',
  'common.disappear-after-login':
    'Esto desaparecerá después de los logins de {{loginNumber}}',
  'common.disappear-next-login':
    'Esto no aparecerá en el siguiente inicio de sesión',
  'common.district': 'Distrito',
  'common.domain': 'Dominio',
  'common.domains': 'Dominios',
  'common.download': 'Descargar',
  'common.download-print': 'Descargar / Imprimir',
  'common.drag-drop-suggestions': 'O Sugerencias de arrastrar y soltar ...',
  'common.download-report': 'Descargar informe',
  'common.done': 'Done',
  'common.edit': 'Editar',
  'common.showassessments': 'Show Assessments',
  'common.showcollections': 'Show Collections',
  'common.showlessons': 'Show Lessons',
  'common.collapse': 'Collapse',
  'common.expand': 'Expand',
  'common.edit-assessment': 'Editar evaluación',
  'common.edit-collection': 'Editar colección',
  'common.edit-course': 'Editar curso',
  'common.edit-question': 'Editar pregunta',
  'common.edit-resource': 'Editar Recurso',
  'common.edit-rubric': 'Edit Rubric',
  'common.email_support': 'Support@gooru.org',
  'common.emotions.emotion-1': 'necesito ayuda',
  'common.emotions.emotion-2': 'No entiendo',
  'common.emotions.emotion-3': 'Meh ...',
  'common.emotions.emotion-4': 'entiendo',
  'common.emotions.emotion-5': 'puedo explicarlo',
  'common.enter-url': 'Introducir URL',
  'common.enrolled-students': 'Estudiantes inscritos',
  'common.errors.join-class-code': 'Por favor ingrese el código de la clase.',
  'common.errors.answer-has-no-image': 'Cargue una imagen de respuesta.',
  'common.errors.add-username': 'Por favor, ingrese un nombre de usuario.',
  'common.errors.add-course-title': 'Ingrese el título del curso.',
  'common.errors.add-question-answer-text':
    'Introduzca el texto de la respuesta.',
  'common.errors.add-question-description': 'Ingrese la pregunta.',
  'common.errors.add-question-title': 'Introduzca el título de la pregunta.',
  'common.errors.assessment-title-presence': 'Ingrese el título de evaluación.',
  'common.errors.can-not-join-class':
    '¡Vaya! No se puede unir al aula. Vuelve a intentarlo en breve.',
  'common.errors.assessment-not-added-to':
    '¡Vaya! No se puede agregar la evaluación a la lección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.assessment-not-copied':
    '¡Vaya! No se puede copiar la evaluación ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.assessment-not-created':
    '¡Vaya! No se puede crear evaluación en este momento. Vuelve a intentarlo en breve.',
  'common.errors.assessment-not-updated':
    '¡Vaya! No se puede actualizar la evaluación ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.category-title-presence': 'Please enter the category title.',
  'common.errors.class-min-score':
    'La puntuación mínima debe ser un número entre 1 y 100',
  'common.errors.class-not-created':
    '¡Vaya! No se puede crear el aula ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.class-title-presence':
    'Por favor dé un nombre a su salón de clases.',
  'common.errors.collection-not-added-to':
    '¡Vaya! No se puede agregar la colección a la lección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.collection-not-copied':
    '¡Vaya! No se puede copiar la colección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.collection-not-created':
    '¡Vaya! No se puede crear colección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.collection-not-updated':
    '¡Vaya! No se puede actualizar la colección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.collection-title-presence':
    'Introduzca el título de la colección.',
  'common.errors.correct-answer-presence':
    'Por favor, indique la respuesta correcta.',
  'common.errors.course-not-copied':
    '¡Vaya! No se puede copiar el curso ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.course-not-created':
    '¡Vaya! No se puede crear curso ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.course-not-updated':
    '¡Vaya! No se puede actualizar el curso ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.highlight-text-not-selected':
    'Por favor, indique la respuesta correcta.',
  'common.errors.highlight-text-wrong-format':
    'Formato incorrecto de la pregunta.',
  'common.errors.hotspot-text-max-choices':
    'Ha alcanzado el límite de opciones de respuesta.',
  'common.errors.file-max-size':
    'Sólo se admiten archivos de tamaño inferior a 5 MB',
  'common.errors.file-upload-missing':
    'Selecciona un archivo con cualquiera de las siguientes extensiones: {{extensions}}',
  'common.errors.getting-next-resource':
    'There was an error submitting your answer. Please try again.',
  'common.errors.lesson-not-copied':
    '¡Vaya! No se puede copiar la lección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.lesson-not-created':
    '¡Vaya! No se puede crear lección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.lesson-not-loaded':
    '¡Vaya! No se puede cargar la lección ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.lesson-title-required': 'Introduzca el título de la lección.',
  'common.errors.password-confirm': 'Por favor, confirme su contraseña.',
  'common.errors.password-length':
    'La contraseña debe tener entre 5 y 14 caracteres.',
  'common.errors.password-not-match': 'Las contraseñas no coinciden.',
  'common.errors.password-required': 'Porfavor ingrese una contraseña.',
  'common.errors.password-special-characters':
    'No utilice caracteres especiales.',
  'common.errors.profile-not-updated':
    '¡Vaya! No se puede actualizar el perfil ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.question-not-added-to':
    '¡Vaya! No se puede agregar la pregunta a {{collectionType}} ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.question-not-copied':
    '¡Vaya! No se puede copiar la pregunta ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.question-not-created':
    '¡Vaya! No se puede crear la pregunta ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.question-not-updated':
    '¡Vaya! No se puede actualizar la pregunta ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.reset-password-error':
    '¡UH oh! Algo no esta bien. No se puede restablecer la contraseña. Vuelve a intentarlo en breve.',
  'common.errors.reset-google-account-exists':
    'Su inicio de sesión de correo electrónico se creó con una cuenta de Google y no podemos restablecer una contraseña de Google. Si olvidaste tu contraseña de Google, tendrás que restablecerla a través de tus aplicaciones de Google.',
  'common.errors.resource-description-length':
    'La descripción no puede tener más de 500 caracteres.',
  'common.errors.resource-invalid-url': 'URL invalida.',
  'common.errors.resource-missing-title': 'Introduzca un título de recurso.',
  'common.errors.resource-missing-type': 'Seleccione un tipo de recurso.',
  'common.errors.resource-missing-url': 'Por favor introduzca un URL válido.',
  'common.errors.resource-not-added-to-collection':
    '¡Vaya! No se puede agregar el recurso a la recopilación ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.resource-not-copied':
    '¡Vaya! No se puede copiar recurso ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.resource-not-created':
    '¡Vaya! No se puede crear recursos ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.resource-not-updated':
    '¡Vaya! No se puede actualizar el recurso ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.resource-same-host-url':
    'Los recursos no pueden ser URL de Gooru.',
  'common.errors.resource-title-length':
    'El título no puede tener más de 50 caracteres.',
  'common.errors.rubric-title-presence': 'Ingrese el título de la rúbrica.',
  'common.errors.rubric-url-presence': 'Please enter the rubric URL.',
  'common.errors.select-correct-answer': 'Seleccione la respuesta correcta.',
  'common.errors.search-collections-length':
    'Introduzca al menos 3 caracteres.',
  'common.errors.sign-in-credentials-not-valid':
    '¡UH oh! Algo no esta bien. Revisa tu nombre de usuario y contraseña y vuelve a intentarlo.',
  'common.errors.sign-in-google-account-exists':
    'Utiliza el inicio de sesión de Google. No podemos restablecer su contraseña.',
  'common.errors.sign-up-error':
    '¡Vaya! No se puede registrar ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.sign-up-first-name':
    'Por favor, introduzca su nombre de pila.',
  'common.errors.sign-up-last-name': 'Por favor ingrese su apellido.',
  'common.errors.sign-up-name-length':
    'El apellido debe tener al menos 2 letras.',
  'common.errors.sign-up-name-only-letters': 'Por favor, escriba sólo letras.',
  'common.errors.sign-up-valid-email':
    'Por favor, introduce una dirección de correo electrónico válida.',
  'common.errors.special-characters':
    'No puede utilizar caracteres o espacios especiales.',
  'common.errors.unit-not-copied':
    '¡Vaya! No se puede copiar la unidad ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.unit-not-created':
    '¡Vaya! No se puede crear la unidad ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.unit-not-loaded':
    '¡Vaya! No se puede cargar la unidad ahora mismo. Vuelve a intentarlo en breve.',
  'common.errors.unit-title-required': 'Introduzca el título de la unidad.',
  'common.errors.user-email-presence':
    'Por favor introduzca una dirección de correo electrónico válida.',
  'common.errors.username-length':
    'El nombre de usuario debe tener entre 4 y 16 caracteres.',
  'common.errors.forgot-password-gmail':
    'Utiliza el inicio de sesión de Google. No podemos restablecer su contraseña.',
  'common.errors.no-studymaterial':
    'The course assigned to this class does not have any study material in it. Please contact your teacher to fix this',
  'common.essential-questions': 'Preguntas esenciales',
  'common.example': 'example: ',
  'common.exit': 'Salida',
  'common.external-collection': 'External Collection',
  'common.explanation': 'Explicación',
  'common.explore': 'Explorar',
  'common.false': 'Falso',
  'common.featured-courses': 'Cursos destacados',
  'common.file-name': 'Nombre del archivo',
  'common.finish': 'Terminar',
  'common.first-name': 'Nombre de pila',
  'common.follow': 'Seguir',
  'common.followers': 'Seguidores',
  'common.following': 'Siguiendo',
  'common.forgotPassword': 'Se te olvidó tu contraseña',
  'common.from': 'de',
  'common.from-my-assessments': 'De mis evaluaciones',
  'common.from-my-collections': 'De mis colecciones',
  'common.from-my-questions': 'De mis preguntas',
  'common.from-my-resources': 'De Mis Recursos',
  'common.hide-results': 'Ocultar resultados',
  'common.hide-correct-answer': 'Hide Correct Answer',
  'common.hints': 'Sugerencias',
  'common.home': 'Casa',
  'common.if_questions': 'Si tienes alguna pregunta,',
  'common.information': 'Información',
  'common.in-progress': 'En progreso',
  'common.instructor': 'Instructor',
  'common.last-name': 'Apellido',
  'common.last-updated': 'Última actualización',
  'common.latest-attempt': 'Último intento',
  'common.launch-anonymous': 'Lanzamiento Anónimo',
  'common.launch-on-air': 'Ir a vivir',
  'common.learning-objectives': 'Objetivos de aprendizaje',
  'common.learning-target': 'Micro-estándar',
  'common.learning-target-mobile': 'Micro-estándar en estándar',
  'common.lesson': 'Lección',
  'common.lessonInitial': 'L',
  'common.lesson-title': 'Título de la Lección',
  'common.lessonObj.zero': 'Lecciones',
  'common.lessonObj.one': 'Lección',
  'common.lessonObj.other': 'Lecciones',
  'common.libraries': 'Bibliotecas',
  'common.license': 'Licencia',
  'common.link': 'Enlazar',
  'common.link-out': 'Vincular a',
  'common.link-out-message':
    '* Si su recurso aparece en blanco en la vista previa anterior, es posible que necesite un enlace a otra página para ver el contenido.',
  'common.live-assessments': 'Evaluaciones en directo',
  'common.loading': 'Cargando ...',
  'common.login': 'Iniciar sesión',
  'common.logout': 'Cerrar sesión',
  'common.logout.head_1': 'Learning Navigator: ',
  'common.logout.head_2': 'Every Student',
  'common.logout.head_3': 'Achieves Mastery',
  'common.logout.description':
    'Learning Navigator is designed as “GPS for Learning” — a way for each student to follow their own path to mastery. Schools ask every student to achieve the same level of proficiency, but each student begins with a different set of knowledge and skills. The Learning Navigator meets each student exactly where they are and navigates them to their learning goals. ',
  'common.logout.logout-btn-msg1': 'You have been logout.',
  'common.logout.logout-btn-msg2': 'Click here to login.',
  'common.mastery': 'Maestría',
  'common.menu': 'Menú',
  'common.more-details': 'Más detalles',
  'common.move': 'Movimiento',
  'common.myContent': 'Mi contenido',
  'common.myProfile': 'My Location',
  'common.library': 'Biblioteca',
  'common.myPerformance': 'Mi rendimiento',
  'common.edit-narration': 'Editar Narración',
  'common.narration': 'Narración',
  'common.new-assessment': 'Nueva Evaluación',
  'common.new-collection': 'Nueva colección',
  'common.new-question': 'Nueva pregunta',
  'common.new-question-text': 'Introduzca el texto de la pregunta aquí',
  'common.new-fib-question-text': 'Enter question with [answer]',
  'common.new-resource': 'Nuevo recurso',
  'common.next': 'Siguiente',
  'common.no': 'No',
  'common.no-archived': 'No tienes aulas archivadas.',
  'common.no-content': 'No hay contenido disponible',
  'common.no-content-my-report':
    'No reports available yet. Once you begin studying, your reports will become available.',
  'common.no-assessments-to-display':
    'No hay <span>evaluaciones</span> que mostrar.',
  'common.no-collections-to-display':
    'No se mostrarán <span>colecciones</span> .',
  'common.no-courses-to-display': 'No hay <span>cursos</span> para mostrar.',
  'common.no-questions-to-display':
    'No hay <span>preguntas</span> para mostrar.',
  'common.no-resources-to-display':
    'No hay <span>recursos</span> para mostrar.',
  'common.no-rubrics-to-display': 'No hay <span>rúbricas</span> para mostrar.',
  'common.no-followers': 'Aún no tienes seguidores.',
  'common.no-independent-results':
    'Cuando empieces a explorar tu {{contentType}} marcado como favorito, aparecerán aquí.',
  'common.no-results': 'No se han encontrado resultados',
  'common.no-available-results': 'Not available results',
  'common.no-results-message':
    'Corrige tu ortografía. ¡Todos cometemos errores! <br/> Ir más amplio y quitar algunos filtros. <br/> O intente buscar una palabra similar en su lugar.',
  'common.no-more-attempts': 'No más intentos',
  'common.no-dca-student':
    'Your teacher has not yet assigned any collections or assessments to Class Activities.',
  'common.no-dca-teacher':
    'No current activities. Add  Class Activities from the Course Map or Content Catalog.',
  'common.notScored': 'Unscored',
  'common.notStarted': 'No empezado',
  'common.not-added': 'No añadido',
  'common.not-applicable': 'N / A',
  'common.not-following': 'No estás siguiendo a nadie.',
  'common.not-provided': 'No proporcionado',
  'common.not-specified': 'No especificado',
  'common.not_started': 'No empezado',
  'common.nothing-to-display': 'Nada que mostrar.',
  'common.number': 'No.',
  'common.numberStudents.zero': '{{count}} Estudiantes',
  'common.numberStudents.one': '{{count}} Estudiante',
  'common.numberStudents.other': '{{count}} Estudiantes',
  'common.of': 'de',
  'common.off': 'APAGADO',
  'common.on': 'EN',
  'common.other': 'Otro',
  'common.overall-performance': 'Rendimiento global',
  'common.educational-use': 'Educational use',
  'common.resource-types': 'Resource types',
  'common.publishers': 'publishers',
  'common.password': 'Contraseña',
  'common.pending': 'Pendiente',
  'common.performance': 'Mostrar el rendimiento',
  'common.performance-dashboard': 'Panel de rendimiento',
  'common.personal-information': 'Personal Information',
  'common.play': 'Jugar',
  'common.please_contact': 'Por favor contactar',
  'common.post-message': 'Publicar mensaje',
  'common.preview': 'Avance',
  'common.profile': 'Perfil',
  'common.profile-publishing': 'Visibilidad del perfil',
  'common.publish-to':
    'Hacer esto visible para otros en mi biblioteca de perfiles',
  'common.published-by': 'Publicado por',
  'common.published-tooltip': 'Contenido Badged',
  'common.publisher': 'Editor',
  'common.prev': 'Prev',
  'common.progress': 'Progress',
  'common.question': 'Pregunta',
  'common.questions': 'Preguntas',
  'common.questions-OE': 'Preguntas de Respuesta Gratuitas',
  'common.question-pl.zero': 'Preguntas',
  'common.question-pl.one': 'Pregunta',
  'common.question-pl.other': 'Preguntas',
  'common.question-title': 'Título de la pregunta',
  'common.question-type.SA': 'Respuesta única',
  'common.question-type.MC': 'Opción multiple',
  'common.question-type.FIB': 'Llena el espacio en blanco',
  'common.question-type.T/F': 'Verdadero o falso',
  'common.question-type.T_F': 'Verdadero o falso',
  'common.question-type.MA': 'Respuesta múltiple',
  'common.question-type.OE': 'Respuesta libre',
  'common.question-type.HS_TXT': 'Selección múltiple - Texto',
  'common.question-type.HS_IMG': 'Selección múltiple - Imagen',
  'common.question-type.HT_TO': 'Arrastrar y soltar orden',
  'common.question-type.HT_RO': 'Arrastrar y soltar orden',
  'common.question-type.HT_HL': 'Subrayar el texto',
  'common.reaction': 'Reacción',
  'common.read-first': '<b>¡Leé esto primero!</b>',
  'common.remaining': '{{number}} Izquierda',
  'common.remix': 'Remix',
  'common.remix-assessment': 'Evaluación Remix',
  'common.remix-assessment-lead': 'Estás a punto de remixar una evaluación.',
  'common.remix-assessment-success':
    'Has remezclado una evaluación {{assessmentTitle}}. ¿Quieres editar esa evaluación?',
  'common.remix-collection': 'Colección Remix',
  'common.remix-collection-lead': 'Estás a punto de remixar una colección.',
  'common.remix-collection-success':
    'Has remezclado una colección {{collectionTitle}}. ¿Quieres editar esa colección?',
  'common.remix-course': 'Curso Remix',
  'common.remix-course-lead': 'Estás a punto de remezclar un curso.',
  'common.remix-course-success':
    'Has remezclado un curso {{courseTitle}}. ¿Quieres editar ese curso?',
  'common.remix-lesson': 'Lección Remix',
  'common.remix-lesson-lead': 'Estás a punto de remezclar una lección.',
  'common.remix-lesson-success': 'Has remezclado una lección {{lessonTitle}}.',
  'common.remix-question': 'Pregunta de Remix',
  'common.remix-question-lead': 'Estás a punto de remezclar una pregunta.',
  'common.remix-question-success':
    'Has remezclado una pregunta {{questionTitle}}. ¿Quieres editar esa pregunta?',
  'common.remix-resource': 'Recurso Remix',
  'common.remix-resource-lead': 'Estás a punto de remixar un recurso.',
  'common.remix-resource-success':
    'Has remezclado un recurso {{resourceTitle}}. ¿Quieres editar ese recurso?',
  'common.remix-unit': 'Unidad Remix',
  'common.remix-unit-lead': 'Estás a punto de remixar una unidad.',
  'common.remix-unit-success': 'Has remixado una unidad {{unitTitle}}.',
  'common.remixed-by': 'Remixado por',
  'common.remix-warning':
    '¡Aviso! Hay un montón de contenido impresionante en este curso y hacer una copia llevará tiempo. Confirme que desea iniciar el proceso y en 15 minutos encontrará su copia de este curso en su <b>perfil.</b>',
  'common.remove': 'retirar',
  'common.report': 'Report',
  'common.report-in-progress': 'Informe en curso',
  'common.request-to': 'Solicitud de revisión de una insignia',
  'common.request-report': 'Solicitar informe',
  'common.resource': 'Recurso',
  'common.resources': 'Recursos',
  'common.resource-format.image': 'Imagen',
  'common.resource-format.text': 'Texto',
  'common.resource-format.video': 'Vídeo',
  'common.resource-format.interactive': 'Interactivo',
  'common.resource-format.webpage': 'Página web',
  'common.resource-format.audio': 'Audio',
  'common.resource-format.question': 'Pregunta',
  'common.resource-pl.zero': 'Recursos',
  'common.resource-pl.one': 'Recurso',
  'common.resource-pl.other': 'Recursos',
  'common.resource-title': 'Título del recurso',
  'common.resource-url': 'URL del recurso',
  'common.role': 'Papel',
  'common.rubric': 'Rúbrica',
  'common.rubric-creation': 'Rubric Creation',
  'common.rubrics': 'Rúbricas',
  'common.rubric-title': 'Título de Rúbrica',
  'common.save': 'Salvar',
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
  'common.save-next': 'Guardar y Siguiente',
  'common.save-submit': 'Guardar y enviar todo',
  'common.save-finish': 'Guardar y terminar',
  'common.school': 'Colegio',
  'common.school-info': 'Información de la escuela',
  'common.score': 'Puntuación',
  'common.select': 'Seleccionar',
  'common.select-a-framework':
    'Primero seleccione un Marco de Estándares en la sección de Información sobre el curso.',
  'common.sentence': 'Frase',
  'common.settings': 'Ajustes',
  'common.search': 'Buscar',
  'common.search-placeholder': 'Buscar',
  'common.search-placeholder-text': 'Search...',
  'common.search-error-message':
    'Los términos de búsqueda deben tener al menos 3 letras.',
  'common.search-400-error-message': 'Introduzca un término de búsqueda válido',
  'common.search-competency': 'Competencia de búsqueda',
  'common.search-standards': 'Normas de búsqueda',
  'common.select-question-type': 'Seleccione el tipo de pregunta',
  'common.select-resource-type': 'Seleccione el tipo de recurso',
  'common.send-request': 'Enviar petición',
  'common.share': 'Compartir',
  'common.show-correct-answer': 'Mostrar respuesta correcta',
  'common.show-more-results': 'Mostrar más resultados',
  'common.show-results': 'Mostrar resultados',
  'common.signUp': 'Regístrate',
  'common.sortAlphabetical': 'Ordenar alfabéticamente',
  'common.sortAverage': 'Ordenar por Promedio',
  'common.sort-most-recently': 'Ordenar por Actualizaciones más recientes',
  'common.state': 'Estado o territorio',
  'common.state-territory': 'State/Territory',
  'common.standard': 'Estándar',
  'common.standards': 'Estándares',
  'common.study': 'Estudiar',
  'common.study-now': 'Estudia ahora',
  'common.student': 'Estudiante',
  'common.students': 'Students',
  'common.student-id': 'ID del estudiante (no se muestra en el perfil)',
  'common.studen-id-display':
    'Student ID (not displayed on Profile, displayed in Anonymous mode)',
  'common.subject-and-framework': 'Asignatura y marco',
  'common.subject': 'Subject',
  'common.submit': 'Enviar',
  'common.submit-all': 'Enviar todo',
  'common.submitAll': 'Submit All',
  'common.submit-finish': 'Submit and Finish',
  'common.swap': 'Reordenar',
  'common.suggestion': 'Sugerencia',
  'common.suggestions': 'Sugerencias',
  'common.suggested-resources': 'Recursos sugeridos',
  'common.support': 'Apoyo',
  'common.start-tour': 'Hacer un tour',
  'common.take-me-there': 'Llévame allí',
  'common.teach': 'Enseñar',
  'common.teacher': 'Profesor',
  'common.timeSpent': 'Tiempo usado',
  'common.toggle-dropdown': 'Desactivar desplegable',
  'common.tools': 'Herramientas',
  'common.true': 'Cierto',
  'common.type': 'Tipo',
  'common.title': 'Title',
  'common.unBookmark': 'Unbookmark',
  'common.unexpectedError':
    'Se ha producido un error inesperado y se ha informado. ¡Lo sentimos por las molestias!',
  'common.networkError':
    'Network disconnected. This may be a temporary issue. Retry later or check your internet connection.',
  'common.unfollow': 'No seguir',
  'common.unit': 'Unidad',
  'common.unit-title': 'Título de la Unidad',
  'common.unitInitial': 'Tu',
  'common.unitObj.zero': 'Unidades',
  'common.unitObj.one': 'Unidad',
  'common.unitObj.other': 'Unidades',
  'common.untitled-course': 'Curso 1',
  'common.untitled-lesson': 'Lección sin título',
  'common.untitled-unit': 'Untitled Unit',
  'common.update-thumbnail': 'Actualizar miniatura',
  'common.update-photo': 'Update Photo',
  'common.upload': 'Subir',
  'common.upload-file': 'Subir archivo',
  'common.upload-thumbnail': 'Subir miniatura',
  'common.upload-photo': 'Upload Photo',
  'common.until': 'Until',
  'common.remove-photo': 'Remove Photo',
  'common.use-case': 'Caso de uso',
  'common.valid-extensions':
    'Las extensiones de archivo válidas son: {{extensions}}',
  'common.verified': 'Verificado',
  'common.visibility-tooltip': 'No visible para los demás',
  'common.visibility-available': 'Visible to others',
  'common.warnings.on-air-connection-lost':
    'El panel de Go Live ha perdido la conexión y está intentando de nuevo automáticamente. Es tentador, pero por favor no actualice su pantalla!',
  'common.warnings.character-limit': 'Has alcanzado el límite de caracteres.',
  'common.word': 'Palabra',
  'common.yes': 'Sí',
  'common.change-score': 'Change Score',
  'not-found.tenant.login-not-found-msg-1':
    'Gooru tenant login not found, page will be automatically redirect to ',
  'not-found.tenant.login-not-found-msg-2': 'login page in',
  'not-found.tenant.login-not-found-msg-3':
    'sec or click below button to login as',
  'index.joinUs':
    'Únase a nosotros para <br/> Honrar el derecho humano a <br/> Educación',
  'index.browseContent.title': '¡Hola! ¿Qué estás buscando?',
  'index.browseContent.description_1': 'Busco',
  'index.browseContent.description_2': 'Materiales de aprendizaje',
  'index.browseContent.description_3': 'o',
  'index.browseContent.button': 'Navegar contenido',
  'index.browseContent.footer.description_1': '¿Ya tienes una cuenta?',
  'index.browseContent.footer.description_2': 'aquí.',
  'index.browseContent.footer.login': 'Iniciar sesión',
  'index.browseContent.grades_missing_message': 'Seleccione Grado y Asunto.',
  'index.browseContent.subjects_missing_message':
    'Por favor, seleccione Asunto.',
  'index.gettingStarted.title': 'Introducción a Gooru',
  'index.gettingStarted.toolkit.title': 'Kit de herramientas de introducción',
  'index.gettingStarted.toolkit.description':
    '¡Bienvenido a Gooru! Echa un vistazo a estos recursos para aprender lo que puedes hacer con Gooru y empezar rápidamente.',
  'index.gettingStarted.classroom.title': 'Historias del aula',
  'index.gettingStarted.classroom.description':
    'Aprenda con ejemplos a través de historias de maestros que dicen que Gooru ha hecho una diferencia en su salón de clases.',
  'index.gettingStarted.events.title': 'Echa un vistazo a nuestros eventos!',
  'index.gettingStarted.events.description':
    'Ofrecemos seminarios y seminarios gratuitos para ayudarle a comenzar con Gooru.',
  'index.empowerStudents.title':
    'Capacitar a los estudiantes para que aprendan a su manera',
  'index.empowerStudents.find': 'Encontrar',
  'index.empowerStudents.remix': 'Remix',
  'index.empowerStudents.share': 'Compartir',
  'index.empowerStudents.monitor': 'Monitor',
  'index.findDescription':
    'Navegue por miles de colecciones de K-12 hechas por profesores, o busque más de 16 millones de recursos',
  'index.remixDescription':
    'Recupere colecciones y personalice contenido para satisfacer las necesidades de sus estudiantes.',
  'index.shareDescription':
    'Compartir colecciones con estudiantes a través de las aulas de Gooru. El acceso no es necesario para acceder.',
  'index.monitorDescription':
    'Mida el compromiso y el progreso de sus estudiantes para que intervengan en tiempo real.',
  'index.freeAndOpen.title': 'Libre y abierto. <br/> Siempre.',
  'index.freeAndOpen.description':
    'Creemos que la educación es un derecho humano. Gooru siempre estará libre de costo y anuncios para educadores y estudiantes de todo el mundo.',
  'index.freeAndOpen.button': 'Más información sobre nuestro enfoque',
  'class.info.class-info': 'Información del Aula',
  'class.info.teachers': 'Maestros',
  'class.info.students': 'Estudiantes',
  'class.info.subject': 'Tema',
  'class.info.grade': 'Grado',
  'class.info.description': 'Descripción',
  'class.info.edit-info': 'editar informacion',
  'class.info.share-class': 'Compartir Clase',
  'class.info.invite-co-teachers': 'Invitar a los Co-maestros',
  'class.info.add-students': 'Añadir Estudiantes',
  'class.info.class-code': 'Código de aula',
  'class.info.delete': 'Eliminar sala de clase',
  'class.edit.assigned-course': 'Curso asignado',
  'class.edit.basic-info': 'Información básica',
  'class.edit.class-name': 'Nombre del aula',
  'class.edit.class-greetings': 'Anuncios de aula',
  'class.edit.class-greetings-placeholder':
    'Salude a sus estudiantes, motivarlos, hacer un anuncio, etc.',
  'class.edit.class-minscore':
    'Calificación Puntuación mínima para los trofeos (1-100%)',
  'class.edit.course-map': 'Mapa del curso',
  'class.edit.edit-class': 'Editar configuración del aula',
  'class.overview.title': 'Mapa del curso',
  'class.overview.locate': 'Ubícame',
  'class.overview.edit-content': 'Editar contenido',
  'class.overview.add-to-daily-class-activities':
    'Añadir a las Actividades de la Clase Diaria',
  'class.overview.assigned-course': 'Your assigned course',
  'class.overview.pre-study-title': 'Pre-study for your course',
  'class.overview.course-map.rescope-toggle': 'Show Complete Course',
  'class.overview.course-map.rescope-info':
    'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.',
  'class.overview.course-map.custom-msg':
    'We are personalizing this course specifically for you based on your proficiency. Please check back in a little while to see the personalized course map.',
  'class.overview.course-map.route0-bannerdesc':
    'As per your competency profile, there are some competencies that you need to master so that you can do well in this course. We have a route that we recommend you take to master these competencies. Click here to see the details.',
  'class.analytics.performance.title': 'Ver rendimiento',
  'class.analytics.performance.better-experience-message':
    'Para una mejor experiencia de Gooru, vea el análisis de aula completo en tableta o escritorio.',
  'class.analytics.performance.no-content':
    'Sus estudiantes aún no han comenzado a estudiar un curso.',
  'class.analytics.performance.actions.share': 'Compartir',
  'class.analytics.performance.actions.edit': 'Editar contenido',
  'class.analytics.performance.actions.download': 'Descargar',
  'class.analytics.performance.actions.fullScreen': 'Ver en pantalla completa',
  'class.analytics.performance.actions.exitFullScreen':
    'Salir de pantalla completa',
  'class.analytics.performance.actions.assessment': 'Ver evaluación',
  'class.analytics.performance.actions.collection': 'Ver Colección',
  'class.analytics.performance.actions.both': 'Ver ambos',
  'class.analytics.performance.teacher.metricsTable.average': 'Promedio',
  'class.analytics.performance.teacher.metricsTable.class-average':
    'Promedio de clase',
  'class.analytics.performance.grade-items': 'Items to Grade',
  'class.analytics.performance.no-grade-items':
    'Looks like you’re all caught up!',
  'class.analytics.performance.gru-grade-items.students.zero':
    '{{count}} students',
  'class.analytics.performance.gru-grade-items.students.one':
    '{{count}} student',
  'class.analytics.performance.gru-grade-items.students.other':
    '{{count}} students',
  'class.analytics.performance.gru-grade-items.students.not-started':
    'not started',
  'class.analytics.mastery.title': 'Ver dominio',
  'class.quick-start.title': 'Asignar contenido a este aula.',
  'class.quick-start.new-course': 'Inicio rápido de un nuevo curso',
  'class.quick-start.new-course-desc':
    'Comience creando un nuevo curso, una colección o una evaluación',
  'class.quick-start.course': 'Nuevo curso',
  'class.quick-start.new-collection': 'Nueva colección',
  'class.quick-start.new-assessment': 'Nueva Evaluación',
  'class.quick-start.remix-a-sample': 'Remix una muestra',
  'class.quick-start.add-existing-course': 'Agregar un curso de su biblioteca',
  'class.quick-start.existing-course-desc':
    'La forma más rápida de comenzar un aula',
  'class.quick-start.choose-course': 'Elija Curso',
  'class.quick-start.remix-from-course': 'Remix de un curso destacado',
  'class.quick-start.featured-course': 'Ver cursos destacados',
  'class.quick-start.remix-desc':
    'Copia y personaliza un curso destacado para tus estudiantes',
  'class.quick-start.browse-content': 'or browse our content catalogs.',
  'classes.classesJoined': 'Aulas a las que me he unido',
  'classes.classesTaught': 'Aulas que enseño',
  'classes.noClassesJoined': 'No te has unido a ninguna clase',
  'classes.noClassesTaught': 'No tienes clases creadas',
  'content.assessments.edit.best-practices':
    '<p> Una evaluación es un conjunto de preguntas puntuadas que usted y sus alumnos pueden usar para monitorear el entendimiento y el desempeño. </p><p> Use una variedad de tipos de preguntas (incluyendo varias basadas en SBAC) en su evaluación para que los estudiantes puedan demostrar comprensión de diferentes maneras. Recomendamos etiquetar cada pregunta a estándares, micro-estándares y Profundidad de conocimiento de Webb. </p>',
  'content.classes.create.title': 'Crear un aula',
  'content.classes.create.content':
    'Donde los estudiantes se involucran con el contenido.',
  'content.classes.create.class-name-input': 'Nombre su aula',
  'content.classes.create.condition-prompt':
    '¿Cómo se unirán los estudiantes a su aula?',
  'content.classes.create.condition-prompt-code':
    'Cualquier persona con código de Clase',
  'content.classes.create.condition-prompt-invite': 'Sólo invitados',
  'content.classes.create.get-started': 'Empezar',
  'content.classes.join.title': 'Únete a un aula',
  'content.classes.join.join-a-classroom': 'Join a  Classroom',
  'content.classes.join.content': 'Donde comienza el viaje.',
  'content.classes.join.not-now': 'Ahora no',
  'content.classes.join.class-code-input':
    'Introduzca un código de salón de clases',
  'content.classes.join.class-not-found':
    'Aula no encontrada. Asegúrese de haber introducido el código correcto en el aula',
  'content.classes.join.invalid-code': 'Código de salón no válido.',
  'content.classes.join.join-not-allowed': 'No puedes unirte a este aula',
  'content.classes.join.already-member':
    'Ya eres miembro de este salón de clases.',
  'content.classes.join.join-class': 'Únete al aula',
  'content.classes.join.terms-and-conditions':
    'Al hacer clic en Unirse al aula, estoy de acuerdo en compartir mis datos de evaluación y recopilación de datos generados a partir del estudio de este salón Gooru con el (los) maestro (s) de este salón.',
  'content.collections.edit.assign-to-course': 'Asignar al curso',
  'content.collections.edit.best-practices':
    '<p> Los estudiantes interactúan con su contenido en el nivel de colección. Al crear una colección de aprendizaje, asegúrese de incluir los objetivos de aprendizaje y considere el uso de una variedad de tipos de recursos para exponer a los estudiantes a los conceptos de múltiples maneras. </p><p> Utilice la secuenciación de los recursos para desarrollar conceptos. La progresión a través de una colección debe fluir de una manera lógica y llevar a la audiencia prevista de un nivel general a un nivel más complejo de comprensión si es apropiado, o permitir adecuadamente para la exploración del estudiante. </p><p> Incluya chequeos de comprensión a lo largo del camino a través de nuestras preguntas Gooru u otros interactivos. Recomendamos recursos suficientes y / o suficientes recursos para lograr los objetivos de la recolección y asegurar que cada recurso tenga un papel y propósito. </p>',
  'content.courses.edit.assign-to-class': 'Asignar al aula',
  'content.courses.edit.best-practices':
    '<p> Un curso es una carpeta que le permite organizar su contenido de aprendizaje en unidades y lecciones. Al crear un curso, considere las preguntas esenciales que está abordando, los objetivos de aprendizaje y la organización de su contenido. </p><p> Puede juntar las lecciones para crear una experiencia diversa para su población estudiantil (por ejemplo, puede ordenar sus unidades cronológicamente, por tema o por estándar). </p>',
  'content.courses.edit.information.course-title': 'Título del curso',
  'content.courses.edit.information.description': 'Descripción',
  'content.questions.edit.add-to': 'Añadir',
  'content.questions.edit.best-practices':
    '<p> Una pregunta es un recurso que requiere una respuesta del estudiante, y ofrecemos una variedad de tipos de preguntas para apoyar el tipo de preguntas que sus estudiantes verán en SBAC, PARCC y otras evaluaciones. </p><p> Considere la posibilidad de alternar los tipos de preguntas que usted utiliza para ofrecer a los estudiantes la exposición a estos tipos de preguntas y para proporcionar múltiples formatos para demostrar el conocimiento. </p><p> Etiquetar sus preguntas a las normas, micro-estándares, y Profundidad del conocimiento de Webb. Usted puede ver cómo sus estudiantes están interactuando con preguntas a través del tablero del profesor. </p>',
  'content.questions.edit.information.question-title': 'Título de la pregunta',
  'content.questions.edit.information.question-type': 'tipo de pregunta',
  'content.questions.edit.builder.add-answer-choice':
    '+ Responder respuesta Choice',
  'content.questions.edit.builder.add-hint': 'Añadir sugerencias',
  'content.questions.edit.builder.add-explanation': 'Añadir explicación',
  'content.questions.edit.builder.answer': 'Responder',
  'content.questions.edit.builder.answer-instructions.FIB':
    'Añadir hasta 5 sugerencias para la respuesta y una explicación.',
  'content.questions.edit.builder.answer-instructions.HS_IMG':
    'Puede agregar hasta diez imágenes de respuesta y seleccionar una o más respuestas correctas.',
  'content.questions.edit.builder.answer-instructions.HS_TXT':
    'Puede agregar hasta diez opciones de respuesta y seleccionar una o más respuestas correctas.',
  'content.questions.edit.builder.answer-instructions.HT_HL_ST':
    'Al escribir la pregunta, utilice los corchetes para indicar las oraciones resaltadas. Un soporte sólo puede contener una oración a la vez, utilizando un período dentro del corchete. Por ejemplo, El primer pequeño cerdo construyó su casa de paja. El gran lobo arruinó la casa. El segundo cerdo construyó su casa de madera. Límite de caracteres: 5000.',
  'content.questions.edit.builder.answer-instructions.HT_HL_WD':
    'Al escribir la pregunta, utilice los corchetes para las palabras resaltadas. Un soporte sólo puede contener una palabra a la vez. Por ejemplo, el [grande] lobo malo sopló [hacia abajo] la casa. Límite de caracteres: 5000.',
  'content.questions.edit.builder.answer-instructions.HT_RO':
    'Puede agregar hasta diez opciones de respuesta en el orden correcto. La orden será codificada para los estudiantes.',
  'content.questions.edit.builder.answer-instructions.MA':
    'Puede agregar hasta diez respuestas, una imagen, una explicación y hasta cinco sugerencias.',
  'content.questions.edit.builder.answer-instructions.MC':
    'Puede agregar hasta diez opciones de respuesta e indicar una respuesta correcta. Límite de caracteres: 200.',
  'content.questions.edit.builder.answer-instructions.OE':
    'Escriba la respuesta correcta. Límite de caracteres: 5000.',
  'content.questions.edit.builder.answer-instructions.T/F':
    'Selecciona la respuesta correcta.',
  'content.questions.edit.builder.question-instructions.FIB':
    'Al escribir la pregunta, utilice los corchetes para sus respuestas de relleno en blanco. Por ejemplo: \'El gran mal [lobo] sopló la casa\'. También puedes añadir una imagen.',
  'content.questions.edit.builder.question-instructions.HS_TXT':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.HS_IMG':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.HT_RO':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.HT_HL':
    'Escriba el mensaje de pregunta.',
  'content.questions.edit.builder.question-instructions.MC':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.MA':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.OE':
    'Escriba su pregunta.',
  'content.questions.edit.builder.question-instructions.T/F':
    'Escriba su pregunta.',
  'content.questions.edit.builder.submission-format.title':
    'Student Submission Format',
  'content.questions.edit.builder.submission-format.answer-type.text-box':
    'Text Box',
  'content.questions.edit.builder.feedback-grading.title':
    'Feedback and Grading',
  'content.questions.edit.builder.feedback-grading.from-existing-rubric':
    'From Existing Rubric',
  'content.questions.edit.builder.feedback-grading.scoring': 'Scoring',
  'content.questions.edit.builder.feedback-grading.maximum-points':
    'Maximum Points',
  'content.questions.edit.builder.feedback-grading.increment': 'Increment',
  'content.questions.edit.builder.feedback-grading.rubric-error':
    'Please add a Rubric',
  'content.modals.delete-bookmark.confirmation':
    '¿Deseas desmarcar este {{type}}?',
  'content.modals.delete-bookmark.delete-error':
    '¡Vaya! No se puede desmarcar este {{type}} ahora. Vuelve a intentarlo en breve.',
  'content.modals.remove-class-activity.confirmation':
    'Are you sure you want to remove this {{type}} from your  Class Activities?',
  'content.modals.remove-class-activity.delete-error':
    'Oops! Unable to remove this {{type}} right now. Please try again shortly.',
  'content.modals.delete-class.legend': 'Estás a punto de eliminar tu aula',
  'content.modals.delete-class.student-access':
    'Los estudiantes no podrán acceder al aula',
  'content.modals.delete-class.student-data-deleted':
    'Se borrarán todos los datos de los estudiantes',
  'content.modals.archive-class.title': 'Archive classroom',
  'content.modals.archive-class.legend':
    'You are about to archive your classroom',
  'content.modals.archive-class.links-not-accessible':
    'All shared links will be inaccessible',
  'content.modals.archive-class.students-no-access':
    'Students will not be able to access the classroom',
  'content.modals.archive-class.not-add-students':
    'You will not be able to add more students to the class',
  'content.modals.archive-class.confirmation':
    'Are you sure you want to archive?',
  'content.modals.delete-content.legend': 'Estás a punto de eliminar',
  'content.modals.delete-content.content-legend':
    '<span>{{Type}}</span> {{index}} - {{title}} de {{parentName}}',
  'content.modals.delete-content.content-legend-header':
    '{{title}} de {{parentName}}',
  'content.modals.delete-content.delete-warning':
    'Todo el contenido de este {{type}} se eliminará',
  'content.modals.delete-content.delete-error':
    '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
  'content.modals.delete-content.confirmation':
    'Estás seguro de que quieres continuar? Por favor, escriba &quot;eliminar&quot; a continuación y haga clic en &quot;eliminar&quot;.',
  'content.modals.delete-resource.legend':
    'Confirma que deseas eliminar permanentemente <b>{{title}}</b>',
  'content.modals.delete-resource.delete-warning':
    'Todo el contenido de este {{type}} se eliminará',
  'content.modals.delete-resource.delete-error':
    '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
  'content.modals.delete-resource.confirmation':
    'Estás seguro de que quieres continuar? Haga clic en \'Eliminar permanentemente\'.',
  'content.modals.delete-resource.first-check':
    'Se trata de una eliminación permanente y no se puede deshacer',
  'content.modals.delete-resource.second-check':
    'Se eliminarán copias de este recurso, en sus colecciones y en cualquier colección de otros usuarios de la comunidad',
  'content.modals.delete-rubric.legend':
    'Confirm you want to permanently delete <b>{{title}}</b>',
  'content.modals.delete-rubric.delete-warning':
    'All content in this Rubric will be deleted',
  'content.modals.delete-rubric.delete-error':
    'Oops! Unable to delete Rubric right now. Please try again shortly.',
  'content.modals.delete-rubric.confirmation':
    'Are you sure you want to continue? Please click “Permanently Delete”.',
  'content.modals.delete-rubric.first-check':
    'This is a permanent delete and cannot be undone',
  'content.modals.remove-content.legend':
    'Estás a punto de eliminar <b>{{title}}</b> de <b>{{parentName}}</b>',
  'content.modals.remove-content.remove-error':
    '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
  'content.modals.remove-content.confirmation':
    'Estás seguro de que quieres continuar? Por favor escriba &quot;remove&quot; y haga clic en &quot;remove&quot;.',
  'content.modals.remove-student.title':
    'Eliminar al estudiante y eliminar sus datos',
  'content.modals.remove-student.legend':
    'Estás a punto de eliminar {{studentName}} de este salón y eliminar todos sus datos.',
  'content.modals.remove-student.data-inaccessible':
    'Todos sus datos serán borrados y no accesibles por usted o por ellos',
  'content.modals.remove-student.classroom-access':
    'No tendrán acceso al aula ni al contenido',
  'content.modals.remove-student.data-lost':
    'Si vuelven a unirse a la clase, todos los datos pasados ​​se perderán',
  'content.modals.remove-student.remove-error':
    '¡Vaya! No se puede eliminar este estudiante ahora mismo. Vuelve a intentarlo en breve.',
  'content.modals.remove-student.confirmation':
    'Estás seguro de que quieres continuar? Por favor, escriba &quot;eliminar&quot; a continuación y haga clic en &quot;eliminar&quot;.',
  'content.modals.quick-remove-content.legend':
    'Confirma que deseas eliminar <b>{{title}}</b> de <b>{{parentName}}</b> .',
  'content.modals.quick-delete-content.legend':
    'Confirma que deseas eliminar permanentemente <b>{{title}}</b> de <b>{{parentName}}</b> .',
  'content.modals.quick-delete-content.delete': 'Borrar permanentemente',
  'content.resources.edit.best-practices':
    '<p> Los recursos son contenido multimedia en una variedad de formatos como videos, interactivos, sitios web, imágenes, Google Docs y más. Sea creativo y utilice sus propios recursos o obtenga \'recursos\' y busque en nuestra amplia oferta en Gooru. </p><p> Utilice una variedad de tipos de recursos para involucrar a sus estudiantes e incluir narración para que pueda ayudar a guiar a sus estudiantes a través del recurso. </p><p> Recomendamos etiquetar cada pregunta a estándares, micro-estándares y habilidades del siglo XXI. Usted puede ver cómo sus estudiantes están interactuando con los recursos a través del tablero del profesor. </p>',
  'content.resources.edit.placeholder-message':
    'Añade un recurso para <span>verlo aquí.</span>',
  'content.resources.edit.not-implemented':
    'La vista previa del formato de recursos <span>no se ha implementado todavía.</span>',
  'content.resources.edit.information.im-publisher': 'Soy el editor',
  'content.resources.edit.information.select-a-license':
    'Seleccione una licencia',
  'user.active-classrooms': 'Aulas Activas',
  'user.archived-classrooms': 'Aulas archivadas',
  'user.classrooms': 'Aulas',
  'user.rgo': 'RGO',
  'user.create-class': 'Crear un aula',
  'user.hello': 'Hola, {{name}}!',
  'user.independent-learning': 'Aprendizaje independiente',
  'user.join-class': 'Únete al aula',
  'user.joined-classes.zero':
    'Actualmente estás inscrito en aulas de {{count}}',
  'user.joined-classes.one': 'Actualmente estás inscrito en 1 aula',
  'user.joined-classes.other':
    'Actualmente estás inscrito en aulas de {{count}}',
  'user.my-current-classes': 'Mis clases actuales',
  'user.manage-goals': 'Administrar objetivos',
  'user.my-classes': 'Mis clases',
  'user.teaching-classes.zero':
    'Actualmente está enseñando a las salas de clase {{count}}',
  'user.teaching-classes.one': 'Actualmente estás enseñando 1 aula',
  'user.teaching-classes.other':
    'Actualmente está enseñando a las salas de clase {{count}}',
  'student-landing.announcement': 'Anuncio',
  'student-landing.browse-featured-courses':
    'Navegue por nuestros cursos destacados',
  'student-landing.browse-our': 'Navegue por',
  'student-landing.class-code': 'Código de clase',
  'student-landing.featured-courses': 'Cursos destacados',
  'student-landing.class.assigned-course': 'Curso asignado',
  'student-landing.class.back-to': 'Volver a las aulas',
  'student-landing.class.no-course':
    'This classroom does not have a related course.',
  'student-landing.class.no-course-assigned': 'No Course Assigned',
  'student-landing.class.back-to-independent':
    'Volver a Aprendizaje Independiente',
  'student-landing.class.report': 'Report',
  'student-landing.class.performance': 'Actuación',
  'student-landing.class.course-map': 'Mapa del curso',
  'student-landing.class.unit': 'Unidad',
  'student-landing.class.lesson': 'Lección',
  'student-landing.class.class-activities': 'Actividades de Clases Diarias',
  'student-landing.class.class-activities-tab.today': 'Hoy',
  'student-landing.class.class-activities-tab.past-activities':
    'Past Activities',
  'student-landing.class.my-report': 'Mi reporte',
  'student-landing.class.my-location': 'Mi location',
  'student-landing.class.my-proficiency': 'My Proficiency',
  'student-landing.class.establish-skyline': 'Let\'s Establish your Skyline',
  'student-landing.class.waiting-establish-skyline':
    'Waiting for your teacher to complete setting up the class.',
  'student-landing.class.setup-in-complete-desc1':
    'It looks like your teacher has not',
  'student-landing.class.setup-in-complete-desc2': 'updated class settings',
  'student-landing.class.setup-in-complete-desc3':
    'Please get in touch with her to resolve the matter. Once everything is correctly set up, refresh this page.',
  'student-landing.course.to-report': 'Resumen de uso',
  'student-landing.course.total-time-spent': 'Tiempo total dedicado',
  'student-landing.current-activity': 'Actividad actual',
  'student-landing.resume-current-activity': 'Resume Current Activity',
  'student-landing.last-activity': 'Last Activity',
  'student-landing.start-studying': 'Start Studying',
  'student-landing.not-available': '-NA-',
  'student-landing.join-classroom':
    'Únase al salón de clases de su maestro para comenzar a aprender',
  'student-landing.learn': 'Aprender con un aula de Gooru',
  'student-landing.my-performance.activity': 'Actividad',
  'student-landing.my-performance.activities.study': 'Estudiar',
  'student-landing.my-performance.assessments': 'Evaluaciones',
  'student-landing.my-performance.collections': 'Colecciones',
  'student-landing.my-performance.filter': 'Filtrar',
  'student-landing.my-performance.primary-text':
    'Elija las cosas que desea analizar y generaremos un informe de rendimiento personalizado.',
  'student-landing.my-performance.subject': 'Tema',
  'student-landing.my-performance.title': 'Analiza tu rendimiento',
  'student-landing.my-performance.time-period': 'Periodo de tiempo',
  'student-landing.my-performance.update-report': 'Actualizar informe',
  'student-landing.study-player': 'Study Player',
  'student-landing.my-study': 'Mi estudio',
  'student-landing.no-classrooms':
    'Aún no te has unido a las aulas. Haga clic en \'Join </br> Clase \'para añadir la clase de su profesor. También puede buscar </br> Un curso destacado bajo la pestaña Biblioteca.',
  'student-landing.no-content-classrooms':
    'This classroom currently has no content available',
  'student-landing.welcome': 'Bienvenido a Gooru.',
  'student-landing.no-course-assigned':
    'No course has been assigned to this class yet. Please contact your teacher.',
  'student-independent-learning.show-more': 'Show More',
  'student-independent-learning.show-less': 'Show Less',
  'student-independent-learning.no-courses':
    'When you start exploring your bookmarked Courses, they will appear here.',
  'student-independent-learning.no-collections':
    'When you start exploring your bookmarked Collections, they will appear here.',
  'student-independent-learning.no-assessments':
    'When you start exploring your bookmarked Assessments, they will appear here.',
  'student-independent-learning.no-independent-results':
    'Explore the Library to learn something new.',
  'student-independent-learning.no-bookmarks':
    'When you start bookmarking Courses, Collections, and Assessments, they will appear here.',
  'student-independent-learning.add-bookmark': 'Add Bookmark',
  'teacher-landing.latest-announcement': 'Último anuncio',
  'teacher-landing.latest-assessment': 'Evaluación más reciente',
  'teacher-landing.create-classroom':
    'Crear un aula, asignar contenidos, invitar a los estudiantes',
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
  'teacher-landing.class.back-to': 'Volver a las aulas',
  'teacher-landing.class.back-to-archived': 'Back to Archived Classrooms',
  'teacher-landing.class.class-management': 'Gestión de la clase',
  'teacher-landing.class.atc': 'ATC',
  'teacher-landing.class.performance-overview': 'Performance Overview',
  'teacher-landing.class.student-proficiency': 'Student Proficiency',
  'teacher-landing.class.class-management-tab.actions': 'Comportamiento',
  'teacher-landing.class.class-management-tab.assessment-min-score':
    'Calificación Puntuación mínima para los trofeos',
  'teacher-landing.class.class-management-tab.assigned-course':
    'Curso asignado',
  'teacher-landing.class.class-management-tab.archive': 'Archivo',
  'teacher-landing.class.class-management-tab.archive-class':
    'Clase de archivo',
  'teacher-landing.class.class-management-tab.archive-classroom':
    'Archive Classroom',
  'teacher-landing.class.class-management-tab.attend-class-with-code':
    'Asistir a clase con código',
  'teacher-landing.class.class-management-tab.class-information':
    'Información de clase',
  'teacher-landing.class.class-management-tab.class-name': 'Nombre del aula',
  'teacher-landing.class.class-management-tab.class-code': 'Código de clase',
  'teacher-landing.class.class-management-tab.click-to-copy-class-code':
    'Haga clic para copiar el código de la clase',
  'teacher-landing.class.class-management-tab.course-information':
    'Información del curso',
  'teacher-landing.class.class-management-tab.delete': 'Borrar',
  'teacher-landing.class.class-management-tab.delete-class': 'Eliminar Clase',
  'teacher-landing.class.class-management-tab.download-roster':
    'Descargar Roster',
  'teacher-landing.class.class-management-tab.edit': 'Editar',
  'teacher-landing.class.class-management-tab.email-address':
    'Dirección de correo electrónico',
  'teacher-landing.class.class-management-tab.first-name': 'Nombre de pila',
  'teacher-landing.class.class-management-tab.import-roster':
    'Lista de importación',
  'teacher-landing.class.class-management-tab.last-name': 'Apellido',
  'teacher-landing.class.class-management-tab.message': 'Mensaje',
  'teacher-landing.class.class-management-tab.performance': 'Actuación',
  'teacher-landing.class.class-management-tab.students': 'Estudiantes',
  'teacher-landing.class.class-management-tab.student-name':
    'Nombre del estudiante',
  'teacher-landing.class.class-management-tab.student-id':
    'Identificación del Estudiante',
  'teacher-landing.class.class-management-tab.teachers': 'Maestros',
  'teacher-landing.class.class-management-tab.view-report': 'Vista del informe',
  'teacher-landing.class.class-management-tab.course-null':
    'The classroom has no course assigned yet.',
  'teacher-landing.class.class-management-tab.course-subject-null':
    'The course assigned to classroom has not been tagged to a valid subject.',
  'teacher-landing.class.class-management-tab.students-null':
    'Share the Class Code with your students to have them join the classroom.',
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
  'teacher-landing.class.class-activities': 'Actividades de Clases Diarias',
  'teacher-landing.class.offline-class-report.class-report': 'Class Report',
  'teacher-landing.class.offline-class-report.activity-report':
    'Activity Report',
  'teacher-landing.class.offline-class-report.conducted-on': 'Conducted On',
  'teacher-landing.class.offline-class-report.not-started': 'Not Started',
  'teacher-landing.class.back-to-class-activities': 'Back to  Class Activities',
  'teacher-landing.class.class-activities-tab.today': 'Hoy,',
  'teacher-landing.class.class-activities-tab.yesterday': 'Yesterday: ',
  'teacher-landing.class.class-activities-tab.month': 'Month: ',
  'teacher-landing.class.class-activities-tab.add-from-course-map':
    'Add from Course Map',
  'teacher-landing.class.class-activities-tab.add-from-my-content':
    'Add from My Content',
  'teacher-landing.class.class-activities-tab.welcome-dca':
    'Welcome to your  Class Activities where you can assign collections and assessments for students to complete today. Please note: any reports generated will only be available today for the most recent attempt.',
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
  'teacher-landing.class.click-to-copy':
    'Haga clic para copiar el código de la clase',
  'teacher-landing.class.course-map': 'Mapa del curso',
  'teacher-landing.class.management': 'Gestión de listas',
  'teacher-landing.class.report': 'Informe',
  'teacher-landing.class.performance': 'Actuación',
  'teacher-landing.class.performance-tab.assessments': 'Evaluaciones',
  'teacher-landing.class.performance-tab.collections': 'Colecciones',
  'teacher-landing.class.view-more': 'Ver más',
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
    'Todavía no has creado aulas. Haga clic en \'Crear clase\' o busque </br> Para un curso destacado en la pestaña Biblioteca.',
  'teacher-landing.no-course':
    'No has asignado un curso a esta </br> Aula todavía.',
  'teacher-landing.teach': 'Enseñar con una clase de Gooru',
  'teacher-landing.welcome-course-map':
    'This is your Course Map where you can view course content, turn assessments on or off and launch assessments in real-time. You can also view overall class performance and completion. For a detailed view of class performance, visit your classroom\'s Report tab.',
  'teacher-landing.welcome-rescoped-course-map':
    'This course has been personalized for each student in the class. You can view each student’s course map in the Class Management page by clicking on the student’s learning pathway ("->")',
  'teacher-landing.welcome-premium-course-map':
    'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.',
  'goals.manage.title': '¡Mis metas!',
  'goals.manage.add-goal': 'Añadir objetivo',
  'goals.manage.goal-label': 'Gol',
  'goals.manage.start-date-label': 'Fecha de inicio',
  'goals.manage.end-date-label': 'Fecha final',
  'goals.manage.type-label': 'Tipo de objetivo',
  'goals.manage.status-label': 'Estado',
  'goals.manage.not_started': 'No empezado',
  'goals.manage.activated': 'Activado',
  'goals.manage.completed': 'Terminado',
  'goals.manage.dropped': 'Caído',
  'goals.manage.reflection-label': 'Reflexión',
  'goals.manage.save': 'Salvar',
  'goals.manage.update': 'Actualizar',
  'goals.manage.goals-not-found':
    'Aún no has establecido metas. Puede agregar un objetivo haciendo clic en el botón &quot;Añadir meta&quot;.',
  'goals.create.error-add-title': 'Por favor, introduzca la meta',
  'goals.create.error-length-title':
    'El objetivo debe tener un máximo de 200 caracteres',
  'goals.create.error-add-start-date': 'Introduzca la fecha de inicio',
  'goals.create.error-add-end-date': 'Ingrese la fecha de finalización',
  'goals.create.error-greater-end-date':
    'La fecha de finalización debe ser mayor que la fecha de inicio',
  'goals.create.error-add-status': 'Seleccione el estado de objetivo',
  'goals.create.error-length-reflection':
    'La reflexión debe tener un máximo de 2000 caracteres',
  'goals.create.created-success-msg': 'Has creado el objetivo {{goalTitle}}',
  'goals.delete.deleted-success-msg': 'Has eliminado el objetivo',
  'goals.update.updated-success-msg': 'Ha actualizado la meta',
  'gru-add-to.add-assessment-to-lesson': 'Añadir de mis evaluaciones',
  'gru-add-to.add-assessment-to-lesson-lead':
    'Seleccione una evaluación para agregar a esta lección.',
  'gru-add-to.add-collection-to-lesson': 'Añadir de mis colecciones',
  'gru-add-to.add-collection-to-lesson-lead':
    'Seleccione una colección para agregar a esta lección.',
  'gru-add-to.add-to-collection': 'Añadir a la colección',
  'gru-add-to.add-to-collection-lead':
    'Elige una colección que quieras agregar {{contentTitle}} a',
  'gru-add-to.add-to-existing-classroom': 'Agregar al aula existente',
  'gru-add-to.add-to-existing-classroom-lead':
    'Elija un aula al que desea agregar',
  'gru-add-to.add-to-assessment': 'Añadir a la valoración o recaudación',
  'gru-add-to.add-to-assessment-lead':
    'Elija una evaluación que desea agregar {{contentTitle}} a',
  'gru-add-to.assessments-info':
    'Las evaluaciones enumeradas aquí <b>no</b> pertenecen a otra lección o curso',
  'gru-add-to.collections-info':
    'Las colecciones que aparecen aquí <b>no</b> pertenecen a otra lección o curso',
  'gru-add-rubric-to-question.title': 'Add from my Rubrics',
  'gru-add-rubric-to-question.lead': 'Select a rubric to add to this question.',
  'gru-add-rubric-to-question.no-rubrics':
    'You have not yet created any rubrics that can be attached to this Free Response Question. You can create rubrics under My Content which can be accessed from your profile.',
  'gru-add-rubric-to-question.go-to-content': 'Go to My Content',
  'gru-assessment-confirmation.title':
    'Estás a punto de comenzar una evaluación ...',
  'gru-assessment-confirmation.description':
    'En esta evaluación, {{model.title}}',
  'gru-assessment-confirmation.setting-forward':
    'Solo puede navegar hacia adelante',
  'gru-assessment-confirmation.setting-forward-backward':
    'Puede navegar hacia adelante y hacia atrás para responder preguntas',
  'gru-assessment-confirmation.unlimited-attempts-left':
    'Tienes intentos ilimitados',
  'gru-assessment-confirmation.setting-forward-teacher':
    'Student can navigate forward only',
  'gru-assessment-confirmation.setting-forward-backward-teacher':
    'Student can navigate forward and backwards to answer questions',
  'gru-assessment-confirmation.unlimited-attempts-left-teacher':
    'Student have unlimited attempts',
  'gru-assessment-confirmation.attempts-left.zero':
    'Tienes intentos de {{count}}',
  'gru-assessment-confirmation.attempts-left.one':
    'Tienes 1 intento a la izquierda',
  'gru-assessment-confirmation.attempts-left.other':
    'Tienes intentos de {{count}}',
  'gru-assessment-confirmation.attempts-left.other-teacher':
    'Student have {{count}} attempts',
  'gru-assessment-confirmation.unlimited-attempts':
    'Tienes intentos ilimitados',
  'gru-assessment-confirmation.cancel': 'Cancelar',
  'gru-assessment-confirmation.continue': 'Continuar',
  'gru-assessment-confirmation.start': '¡Comienzo!',
  'gru-assessment-confirmation.submit': 'Submit',
  'gru-submit-confirmation.title': 'Termina esta prueba y envía todos',
  'gru-submit-confirmation.description':
    'Estás a punto de terminar este intento y presentar todas las respuestas. Cualquier pregunta omitida se contará como incorrecta.',
  'gru-submit-confirmation.cancel': 'Cancelar',
  'gru-submit-confirmation.ok': 'ok',
  'gru-submit-confirmation.confirm': 'Concurso de finalización',
  'gru-submit-confirmation.finish-description':
    'Haga clic en \'Finalizar cuestionario\' para enviar sus respuestas.',
  'gru-quick-course-search.add-from-course': 'Agregar desde el curso existente',
  'gru-quick-course-search.view-featured-courses': 'Ver cursos destacados',
  'gru-quick-course-search.assign': 'Asignar',
  'gru-share-pop-over.copy': 'Dupdo',
  'gru-share-pop-over.ios-tooltip': 'Mantenga pulsado para copiar!',
  'gru-share-pop-over.multiarch-tooltip': 'Presiona Ctrl + C para copiar!',
  'gru-share-pop-over.safari-osx-tooltip': '¡Presione Cmd + C para copiar!',
  'gru-share-pop-over.share-course': 'Comparte tu curso con el enlace',
  'gru-share-pop-over.share-question': 'Comparta su pregunta con el enlace',
  'gru-share-pop-over.share-resource': 'Comparte tu recurso con el enlace',
  'gru-share-pop-over.share-assessment': 'Comparta su evaluación con el enlace',
  'gru-share-pop-over.share-rubric': 'Share your rubric with link',
  'gru-share-pop-over.share-collection': 'Comparte tu colección con el enlace',
  'gru-category-panel.teacher.title': 'Para maestros',
  'gru-category-panel.teacher.body':
    'Descubra el contenido alineado con las normas, personalice el contenido y realice el seguimiento del progreso de los estudiantes a través del análisis de datos.',
  'gru-category-panel.teacher.cta': 'Ver historias',
  'gru-category-panel.student.title': 'Para estudiantes',
  'gru-category-panel.student.body':
    'Explore los intereses, construya y monitoree el progreso a través de materiales de aprendizaje.',
  'gru-category-panel.student.cta': 'Entrar',
  'gru-category-panel.student.text-placeholder':
    'Introduzca el código del salón de clases',
  'gru-category-panel.district.title': 'Para Distritos',
  'gru-category-panel.district.body':
    'Colabore con Gooru para dar rienda suelta al aprendizaje personalizado y compartir un plan de estudios aprobado por el distrito.',
  'gru-category-panel.district.cta': 'Vea Nuestro Impacto',
  'gru-category-panel.partner.title': 'Para socios',
  'gru-category-panel.partner.body':
    'Colaborar con socios de misión para aumentar nuestro impacto colectivo en el ecosistema educativo.',
  'gru-category-panel.partner.cta': 'Aprende más',
  'class.gru-class-navigation.active': 'Activo:',
  'class.gru-class-navigation.members': 'Miembros',
  'class.gru-class-navigation.greetings': 'Anuncios',
  'class.gru-class-navigation.overview': 'Mapa del curso',
  'class.gru-class-navigation.analytics': 'Datos',
  'class.gru-class-navigation.teams': 'Equipos',
  'class.gru-class-navigation.information': 'Información del Aula',
  'class.gru-class-statistics.title': 'Estadísticas de la clase',
  'class.gru-class-statistics.on-average': 'De media',
  'class.gru-class-statistics.performance': 'Actuación',
  'class.gru-class-statistics.completion': 'Terminación',
  'class.gru-class-statistics.time-spent': 'Tiempo usado',
  'class.gru-class-statistics.no-performance': '-',
  'gru-user-registration.joinTitle': '¡Únase a la comunidad de Gooru!',
  'gru-user-registration.joinDescription':
    'Encuentra, remix y comparte los mejores recursos de aprendizaje K-12 gratuitos.',
  'gru-user-registration.googleButton': 'Regístrese con Google',
  'gru-user-registration.whyGoogle': '¿Por qué registrarse en Google?',
  'gru-user-registration.descriptionWhyGoogle':
    'Es rápido y fácil. Utiliza tu cuenta de Google existente para iniciar sesión sin contraseña.',
  'gru-user-registration.or': 'O',
  'gru-user-registration.noGoogleAccount': '¿No tienes una cuenta de Google?',
  'gru-user-registration.signUpEmail':
    'Regístrese con su dirección de correo electrónico',
  'gru-user-registration.haveAccount': '¿Ya tienes una cuenta?',
  'gru-user-registration.clickLogIn': 'Haga clic aquí para ingresar.',
  'gru-welcome-message.title': 'Bienvenido a Gooru\'s Learning Navigator!',
  'gru-welcome-message.text-temporary-one':
    'As you move throughout the Learning Navigator, we are happy to support your journey. Look for the Take a Tour icon ',
  'gru-welcome-message.text-temporary-two':
    ' for guided tours on how to use our features.',
  'gru-welcome-message.text-one':
    'A medida que se desplaza por el Navegador de Aprendizaje, estamos felices de apoyar su viaje de las siguientes maneras:',
  'gru-welcome-message.text-two.subtitle': 'Hacer un tour',
  'gru-welcome-message.text-two.text':
    ': Ofrece visitas guiadas sobre cómo utilizar nuestras funciones.',
  'gru-welcome-message.text-three.subtitle': 'Ayuda',
  'gru-welcome-message.text-three.text':
    ': Apoyo a su alcance para preguntas adicionales.',
  'gru-welcome-message.text-four.subtitle': 'Nuevo',
  'gru-welcome-message.text-four.text':
    ': Identifica las nuevas características que puede probar.',
  'gru-welcome-message.text-five':
    'En cualquier momento si desea volver a su página de inicio, simplemente haga clic en',
  'gru-welcome-message.dont-show-again': 'No mostrar de nuevo',
  'sign-up.step-1-title': '¡Hola!',
  'sign-up.step-1-description':
    'Nos alegra que haya decidido unirse a nosotros.',
  'sign-up.step-child-title': '¡No tan rapido!',
  'sign-up.step-child-subtitle': 'No podemos completar su registro.',
  'sign-up.step-child-description-1':
    'Gooru no pudo crear su cuenta debido a nuestra',
  'sign-up.step-child-age-requirements': 'Términos y condiciones',
  'sign-up.step-child-description-2':
    '. Sigue aprendiendo y te veré en unos pocos años!',
  'sign-up.step-2-title': 'Información básica',
  'sign-up.step-2-description': 'No eres básico, pero esta información es.',
  'sign-up.log-in': 'Iniciar sesión',
  'sign-up.log-in-description': 'Si ya tiene una cuenta.',
  'sign-up.google-button': 'Regístrese con Google',
  'sign-up.username': 'Nombre de usuario',
  'sign-up.dateOfBirth.title': 'Cumpleaños',
  'sign-up.dateOfBirth.day': 'Día',
  'sign-up.dateOfBirth.month': 'Mes',
  'sign-up.dateOfBirth.months.january': 'enero',
  'sign-up.dateOfBirth.months.february': 'febrero',
  'sign-up.dateOfBirth.months.march': 'marzo',
  'sign-up.dateOfBirth.months.april': 'abril',
  'sign-up.dateOfBirth.months.may': 'Mayo',
  'sign-up.dateOfBirth.months.june': 'junio',
  'sign-up.dateOfBirth.months.july': 'julio',
  'sign-up.dateOfBirth.months.august': 'agosto',
  'sign-up.dateOfBirth.months.september': 'septiembre',
  'sign-up.dateOfBirth.months.october': 'octubre',
  'sign-up.dateOfBirth.months.november': 'noviembre',
  'sign-up.dateOfBirth.months.december': 'diciembre',
  'sign-up.dateOfBirth.year': 'Año',
  'sign-up.dateOfBirth.error-message':
    'Por favor, introduce tu fecha de nacimiento.',
  'sign-up.email': 'Email',
  'sign-up.password': 'Contraseña',
  'sign-up.rePassword': 'Confirmar contraseña',
  'sign-up.state': 'Estado o territorio',
  'sign-up.district': 'Organización del distrito o de la carta',
  'sign-up.error-username-taken':
    'Aww, este nombre de usuario es tomado. Prueba otro.',
  'sign-up.error-email-taken':
    'Este correo electrónico se ha tomado. Prueba otro.',
  'sign-up.error-role-message': 'Seleccione un rol.',
  'sign-up.error-country-message': 'Por favor seleccione su país.',
  'sign-up.error-state-message': 'Seleccione su estado o territorio.',
  'sign-up.error-district-message':
    'Por favor, seleccione su distrito / charter de la lista o proporcionarlo en \'Otro\'.',
  'gru-user-sign-up-cancel.title': '¿Dejar el registro?',
  'gru-user-sign-up-cancel.exit?': '¿Seguro que quieres salir?',
  'gru-user-sign-up-cancel.registration_incomplete':
    'Su registro no está completo.',
  'gru-user-sign-up-cancel.leave': 'Dejar el registro',
  'gru-user-sign-up-cancel.continue': 'Continuar con Registro',
  'login.title': '¡Dar una buena acogida!',
  'login.description': 'El aprendizaje está a la vuelta de la esquina.',
  'login.title-session-ends': 'Su sesión ha caducado.',
  'login.description-session-ends': 'Por Favor regístrese.',
  'login.gooruAccountTitle': 'Inicie sesión en su cuenta de Gooru',
  'login.googleButton': 'Inicia sesión con Google',
  'login.or': 'O',
  'login.haveAccount': '¿Tiene usted una cuenta?',
  'login.signUpHere': '¡Registrate aquí!',
  'login.forgotPassword': '¿Olvidaste tu contraseña?',
  'login.password': 'Contraseña',
  'login.usernameOrEmail': 'Nombre de usuario o correo electrónico',
  'login.log-in': 'Iniciar sesión',
  'forgot-password.description': 'Nos pasa a todos.',
  'forgot-password.usernameOrEmail':
    'Por favor introduzca su correo electrónico',
  'forgot-password.footer-google-description-1':
    'Prueba a iniciar sesión de nuevo pulsando <a href=\'/sign-in\'>\'Iniciar sesión con Google\'.</a>',
  'forgot-password.footer-description-1':
    'Recibirá un correo electrónico con un enlace para restablecer su contraseña.',
  'forgot-password.footer-description-2':
    'Si tiene alguna pregunta, póngase en contacto con',
  'forgot-password.mail': 'Support@gooru.org',
  'forgot-password.error-email-not-exists':
    'Lo sentimos, no reconocemos este correo electrónico.',
  'forgot-password.secondStepTitle': 'Consultar su correo electrónico',
  'forgot-password.secondStepDescription-1':
    'Te hemos enviado un correo electrónico con un enlace para restablecer tu contraseña.',
  'forgot-password.secondStepDescription-2':
    'Si tiene alguna pregunta, póngase en contacto con',
  'reset-password.new-password': 'Introduzca su nueva contraseña',
  'reset-password.new-password-confirm': 'Confirmar la contraseña',
  'reset-password.title': 'Restablecer la contraseña',
  'change-password.change-password': 'Change password link',
  'change-password.title': 'Change Password',
  'change-password.current-password-label': 'Enter your current password',
  'change-password.change-success': 'Password Changed Successfully !!',
  'change-password.new-password-required': 'Please enter your new password.',
  'change-password.change-password-error':
    'Uh oh! Something’s not right. Unable to change password. Please try again.',
  'footer.footerDescription':
    'Gooru se ha comprometido a mantener su plataforma de código abierto y comunidad CC0 contenido creado.',
  'footer.company': 'Empresa',
  'footer.community': 'Comunidad',
  'footer.legal': 'Legal',
  'footer.connect': 'Conectar',
  'footer.aboutGooru': 'Acerca de Gooru',
  'footer.careers': 'Carreras',
  'footer.supportCenter': 'Centro de Apoyo',
  'footer.contactUs': 'Contáctenos',
  'footer.districts': 'Distritos',
  'footer.partners': 'Fogonadura',
  'footer.coaches': 'Entrenadores',
  'footer.events': 'Eventos',
  'footer.terms': 'Condiciones',
  'footer.privacy': 'Intimidad',
  'footer.Copyright': 'Derechos de autor',
  'grade-dropdown.placeholder': 'Grado (s)',
  'grade-dropdown.prompt': 'Seleccione un grado',
  'grade-dropdown.pre-k': 'Pre-k',
  'grade-dropdown.elementary': 'Elemental',
  'grade-dropdown.middle-school': 'Escuela intermedia',
  'grade-dropdown.high-school': 'Escuela secundaria',
  'grade-dropdown.higher-ed': 'Ed más alto',
  'grade-dropdown.k': 'K',
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
  'grade-selector.placeholder': 'Choose Grade Lines to Display',
  'standard-dropdown.placeholder': 'Navegar por Estándar',
  'subject-dropdown.placeholder': 'asignaturas)',
  'subject-dropdown.prompt': 'Seleccione un tema',
  'search-filter.input-placeholder': 'Type {{type}} name here...',
  'search-filter.courses': 'Cursos',
  'search-filter.collections': 'Colecciones',
  'search-filter.resources': 'Recursos',
  'search-filter.assessments': 'Evaluaciones',
  'search-filter.questions': 'Preguntas',
  'search-filter.rubrics': 'Rúbricas',
  'search-filter.authors': 'Authors',
  'search-filter.question-types.MC': 'Opción multiple',
  'search-filter.question-types.FIB': 'Llena el espacio en blanco',
  'search-filter.question-types.T/F': 'Verdadero Falso',
  'search-filter.question-types.TOF': 'True or False',
  'search-filter.question-types.MA': 'Respuesta múltiple',
  'search-filter.question-types.HS_TXT': 'Selección múltiple - Texto',
  'search-filter.question-types.HSTXT': 'Multiple Select Text',
  'search-filter.question-types.HS_IMG': 'Selección múltiple - Imagen',
  'search-filter.question-types.HSIMG': 'Multiple Select Image',
  'search-filter.question-types.HT_RO': 'Arrastrar y soltar orden',
  'search-filter.question-types.HT&RO': 'Drag & Drop Order',
  'search-filter.question-types.HT_HL': 'Texto en caliente',
  'search-filter.question-types.H-THL': 'Hot-Text Highlight',
  'search-filter.question-types.OE': 'Respuesta libre',
  'search-filter.author.placeholder': 'Autor',
  'resource.video': 'Vídeo',
  'resource.webpage': 'Página web',
  'resource.interactive': 'Interactivo',
  'resource.question': 'Pregunta',
  'resource.image': 'Imagen',
  'resource.text': 'Texto',
  'resource.audio': 'Audio',
  'resource.oer': 'REA',
  'search-result.resource': 'Recurso',
  'search-result.resources': 'Recursos',
  'search-result.and': 'y',
  'search-result.question': 'Pregunta',
  'search-result.questions': 'Preguntas',
  'search-result.in-this-collection': 'En esta colección',
  'search-result.search-results-for': 'Buscar resultados para',
  'gru-image-picker.chooseFile': 'Escoge un archivo ...',
  'gru-image-picker.instruction':
    'Cargue una imagen de un archivo en su computadora.',
  'gru-image-picker.restriction':
    'La imagen debe ser un archivo JPG, GIF o PNG inferior a 5 MB.',
  'gru-image-picker.submit': 'Usar la imagen',
  'gru-fib.instructions':
    'Escriba su respuesta en el espacio en blanco proporcionado y haga clic en \'{{action}}\'.',
  'gru-hs-image.instructions':
    'Seleccione la imagen correcta y haga clic en \'{{action}}\'.',
  'gru-hs-text.instructions':
    'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
  'gru-hot-text.instructions':
    'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
  'gru-login-prompt.title': '¡Bienvenido a Gooru!',
  'gru-login-prompt.instructions':
    'Debe iniciar sesión para completar esta acción.',
  'gru-login-prompt.existing-user': '¿Ya tienes una cuenta?',
  'gru-login-prompt.new-user': '¿Nuevo aquí?',
  'gru-login-prompt.not-now': 'Ahora no',
  'gru-login-prompt.sign-in': 'Registrarse',
  'gru-multiple-answer.instructions':
    'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
  'gru-multiple-choice.instructions':
    'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
  'gru-open-ended.instructions':
    'Escribe tu respuesta en el campo siguiente y haz clic en el botón \'{{action}}\' para guardar tu respuesta cuando hayas terminado.',
  'gru-open-ended.characterLimit': 'Límite de caracteres',
  'gru-question-viewer.answer': 'Responder',
  'gru-question-viewer.question': 'Pregunta',
  'gru-true-false.instructions':
    'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
  'gru-true-false.true': 'Cierto',
  'gru-true-false.false': 'Falso',
  'gru-reorder.instructions':
    'Reorganice las respuestas en el orden correcto y haga clic en \'{{action}}\'.',
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
  'player.gru-navigation.view-report': 'Vista del informe',
  'player.gru-navigator.see-usage-report': 'Ver el informe de uso',
  'player.gru-viewer.not-iframe-url.header_1':
    'Este recurso no se puede ver en Gooru.',
  'player.gru-viewer.not-iframe-url.header_external_assessment_1':
    'This assessment cannot be viewed within Gooru.',
  'player.gru-viewer.not-iframe-url.header_2':
    'Haga clic en el botón de abajo para abrir el recurso en una nueva pestaña.',
  'player.gru-viewer.not-iframe-url.view-resource': 'Ver Recurso',
  'player.gru-viewer.not-iframe-url.https_external':
    'This link cannot be viewed within Gooru.',
  'player.gru-viewer.not-iframe-url.https_new_tab':
    'Click the link below to open it in a new tab.',
  'player.gru-viewer.not-iframe-url.footer_1':
    '¿Por qué estoy viendo esta página en blanco?',
  'player.gru-viewer.not-iframe-url.footer_2':
    'Los recursos añadidos en Gooru provienen de miles de editores diferentes que',
  'player.gru-viewer.not-iframe-url.footer_3':
    'Crear y compartir su contenido. Los recursos tienen una variedad de',
  'player.gru-viewer.not-iframe-url.footer_4':
    'Requisitos que lo llevan a otra página para ver el contenido.',
  'grading-player.answer': 'Submitted Work',
  'grading-player.back-to': 'Back',
  'grading-player.current-response': 'Current Response',
  'grading-player.full-rubric': 'Full Rubric',
  'grading-player.grading': 'Grading',
  'grading-player.level': 'Level',
  'grading-player.roster': 'Roster',
  'grading-player.rubric': 'Rubric',
  'grading-player.submitted-time': 'Submitted Time',
  'grading-player.points': 'Points',
  'grading-player.prompt': 'Task Prompt',
  'grading-player.overall-comment': 'Overall Comment',
  'grading-player.overall-lead':
    'Summarize your feedback on the essay as a whole.',
  'grading-player.time-spent': 'Time Spent',
  'grading-player.total-score': 'Total Score',
  'grading-player.student-roster.title': 'Students List',
  'grading-player.student-roster.lead': 'Have answered this question',
  'grading-player.rubric-panel.previous': 'Previous Student',
  'grading-player.rubric-panel.next': 'Next Student',
  'grading-player.rubric-panel.total-score': 'Total Score',
  'grading-player.rubric-panel.points': '({{total}}pts)',
  'profile.gru-navigation.about': 'Acerca de',
  'profile.gru-navigation.about-me': 'About Me',
  'profile.gru-navigation.content': 'Content',
  'profile.gru-navigation.followers': 'Seguidores',
  'profile.gru-navigation.library': 'Biblioteca',
  'profile.gru-navigation.my-content': 'My Content',
  'profile.gru-navigation.following': 'Following',
  'profile.gru-navigation.proficiency': 'Proficiency',
  'profile.gru-navigation.preference.preference': 'Preference',
  'profile.edit.select-district': 'Seleccione un distrito ...',
  'profile.proficiency.is-empty':
    'No data available yet. Once you begin studying, your data will become available.',
  'profile.proficiency.expand-chart': 'Expand Chart',
  'profile.proficiency.mastered': 'Mastered',
  'profile.proficiency.in-progress': 'In Progress',
  'profile.proficiency.not-started': 'Not Started',
  'profile.proficiency.skyline': 'Skyline',
  'profile.proficiency.baseline': 'Baseline',
  'profile.proficiency.grade-line': 'Grade Line',
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
  'gru-data-picker.score': 'Puntuación',
  'gru-data-picker.report': 'Informe',
  'gru-data-picker.completion': 'Terminación',
  'gru-data-picker.timeSpent': 'Hora',
  'gru-data-picker.time-spent': 'Tiempo usado',
  'gru-data-picker.study-time': 'Tiempo de estudio',
  'gru-data-picker.reaction': 'Reacción',
  'gru-data-picker.attempts': 'Intento',
  'gru-performance-summary.title': 'Título',
  'gru-performance-summary.scores': 'Puntuaciones',
  'gru-performance-summary.completion': 'Terminación',
  'gru-performance-summary.time-spent': 'Tiempo Total',
  'gru-performance-summary.reaction': 'Reacción',
  'gru-performance-summary.attempts': 'Intentos',
  'gru-performance-summary.redo': 'Rehacer',
  'gru-performance-summary.resume': 'Currículum',
  'gru-performance-summary.study': 'Estudia ahora',
  'gru-performance-summary.view-report': 'Vista del informe',
  'gru-performance-summary.not-applicable': 'N / A',
  'gru-performance-summary.not-started': 'No ha comenzado todavía',
  'gru-performance.no-content': 'No hay contenido disponible',
  'gru-performance-metrics.assessment': 'Evaluación',
  'gru-performance-metrics.collection': 'Colección',
  'gru-performance-metrics.completion': 'Terminación',
  'gru-performance-metrics.report': 'Informe',
  'gru-performance-metrics.student': 'Estudiante',
  'gru-performance-metrics.score': 'Puntuación',
  'gru-performance-metrics.study-time': 'Tiempo usado',
  'gru-metrics-sub-header.assessment': 'Evaluación',
  'gru-metrics-sub-header.student': 'Estudiante',
  'gru-metrics-sub-header.score': 'Puntuación',
  'gru-metrics-sub-header.report': 'Informe',
  'gru-metrics-sub-header.completion': 'Terminación',
  'gru-metrics-sub-header.time-spent': 'Hora',
  'gru-resource-new.resource-already-exist': 'Este recurso ya existe en Gooru!',
  'gru-assessment-report.gru-summary.total-time-spent': 'Tiempo total gastado',
  'gru-assessment-report.hidden-report':
    'Su profesor ha seleccionado ocultar su informe de resumen para esta evaluación.',
  'cards.gru-class-card.student.zero': '{{count}} Estudiante',
  'cards.gru-class-card.student.one': '{{count}} Estudiante',
  'cards.gru-class-card.student.other': '{{count}} Estudiantes',
  'cards.gru-class-card.student.not-started': 'No empezado',
  'cards.gru-class-card.unit.zero': 'Sin curso',
  'cards.gru-class-card.unit.one': 'Unidad {{count}}',
  'cards.gru-class-card.unit.other': 'Unidades {{count}}',
  'cards.gru-class-card.archived.request-report':
    'Esta clase está archivada y no se puede modificar. Se puede acceder a los datos de clase existentes mediante el informe.',
  'cards.gru-class-card.archived.report-in-progress':
    'La generación de informes puede tardar hasta 20 min. Por favor, vuelva.',
  'cards.gru-class-card.archived.download-report':
    'Descargue sus datos para esta clase.',
  'cards.gru-class-card.archived.no-report-available':
    'Esta clase no tiene contenido de curso asignado.',
  'cards.gru-course-card.in': 'en',
  'cards.gru-course-card.units.zero': 'Unidades {{count}}',
  'cards.gru-course-card.units.one': 'Unidad {{count}}',
  'cards.gru-course-card.units.other': 'Unidades {{count}}',
  'cards.gru-course-card.resource.zero': '{{Count}} Recursos',
  'cards.gru-course-card.resource.one': '{{Count}} Recurso',
  'cards.gru-course-card.resource.other': '{{Count}} Recursos',
  'cards.gru-course-card.and': 'y',
  'cards.gru-course-card.question.zero': '{{Count}} Preguntas',
  'cards.gru-course-card.question.one': '{{Count}} Pregunta',
  'cards.gru-course-card.question.other': '{{Count}} Preguntas',
  'cards.gru-course-card.start-studying': 'Empezar a estudiar',
  'cards.gru-collection-card.courses.zero': '{{count}} Cursos',
  'cards.gru-collection-card.courses.one': '{{count}} Curso',
  'cards.gru-collection-card.courses.other': '{{count}} Cursos',
  'cards.gru-collection-card.students.zero': '{{count}} Estudiantes',
  'cards.gru-collection-card.students.one': '{{count}} Estudiante',
  'cards.gru-collection-card.students.other': '{{count}} Estudiantes',
  'cards.gru-collection-card.collections.one': '{{count}} Colección',
  'cards.gru-collection-card.collections.other': '{{count}} Colecciones',
  'cards.gru-collection-card.assessments.one': '{{count}} Evaluación',
  'cards.gru-collection-card.assessments.other': '{{count}} Evaluaciones',
  'cards.gru-collection-card.classrooms.zero': 'Aulas',
  'cards.gru-collection-card.classrooms.one': 'Sala de clase',
  'cards.gru-collection-card.classrooms.other': 'Aulas',
  'cards.gru-resource-card.add': 'Añadir',
  'cards.gru-resource-result-card.skipped': 'Omitido',
  'cards.gru-profile-card.followers': 'Seguidores',
  'cards.gru-profile-card.following': 'Siguiendo',
  'cards.gru-user-network-card.follow': 'Seguir',
  'reports.gru-table-view.first-tier-header-prefix': 'Q',
  'reports.gru-table-view.student': 'Estudiante',
  'reports.gru-table-view.reaction': 'Reacción',
  'reports.gru-table-view.reactions': 'Reacciones',
  'reports.gru-table-view.score': 'Puntuación',
  'reports.gru-table-view.scores': 'Puntuaciones',
  'reports.gru-table-view.study-time': 'Tiempo de estudio',
  'reports.gru-table-view.time': 'Hora',
  'reports.gru-table-view.time-spent': 'Tiempo usado',
  'reports.gru-table-view.totals': 'Total',
  'gru-emotion-picker.react-to-resource': 'Reaccionar a este recurso',
  'home.no-classes-found.create-class.title': 'Enseñar con una clase de Gooru',
  'home.no-classes-found.create-class.description':
    'Crear un aula, asignar contenido e invitar a los estudiantes.',
  'home.no-classes-found.create-class.button-text': 'Crear un aula',
  'home.no-classes-found.join-class.title': 'Aprender con un aula de Gooru',
  'home.no-classes-found.join-class.description':
    'Únase al salón de clases de su maestro para comenzar a aprender.',
  'home.no-classes-found.join-class.button-text':
    'Introduzca el código del salón de clases',
  'home.no-classes-found.featured-courses.title': 'Cursos destacados',
  'home.no-classes-found.featured-courses.description':
    'Examine los cursos de matemáticas, ciencias, estudios sociales y ELA.',
  'home.no-classes-found.featured-courses.button-text': 'Cursos destacados',
  'home.no-classes-found.teacher-toolkit.title':
    'Kit de herramientas del profesor',
  'home.no-classes-found.teacher-toolkit.description':
    'Este juego de herramientas tiene recursos para ayudarle a empezar.',
  'home.no-classes-found.teacher-toolkit.button-text':
    'Kit de herramientas del profesor',
  'taxonomy.grades': 'Grades',
  'taxonomy.gru-taxonomy-selector.add-secondary': 'Agregar secundario',
  'taxonomy.gru-taxonomy-selector.choose-subject': 'Elija el asunto',
  'taxonomy.gru-taxonomy-selector.competency-subject-and-course':
    'Marco y Curso de Competencias',
  'taxonomy.gru-taxonomy-selector.primary-subject-and-course':
    'Marco y Curso de Normas',
  'validations.unsavedChanges':
    'Tus cambios aún no se han guardado. ¿Quieres dejar esta página?',
  'featured.featured-title': 'Cursos destacados',
  'featured.featured-description':
    'Los cursos ofrecidos por Gooru son examinados y revisados, educados por el educador, creados en las aulas y estudiados por los estudiantes. Ellos fueron desarrollados e implementados en escuelas, distritos y charters innovadores, y están diseñados para apoyar el aprendizaje combinado, las aulas volteadas, el aprendizaje basado en proyectos y muchos otros modelos de instrucción. Descubre, remezcla y personaliza cursos para personalizar el aprendizaje y aumentar el compromiso estudiantil. Haga clic aquí para <a href=\'http://about.gooru.org/courses\' target=\'_blank\'>obtener más información</a> sobre el desarrollo de estos cursos.',
  'locateme.score': 'Score',
  'locateme.timespent': 'Time Spent',
  'locateme.view': 'View',
  'locateme.attempt': 'Attempt',
  'locateme.lastAcessesed': 'Last Accessed',
  'taxonomy.modals.gru-domain-picker.browseSelectorText':
    '¿Qué dominios cubrirá esta unidad?',
  'taxonomy.modals.gru-domain-picker.selectedText.zero':
    '{{Count}} dominios seleccionados',
  'taxonomy.modals.gru-domain-picker.selectedText.one':
    '{{Count}} dominio seleccionado',
  'taxonomy.modals.gru-domain-picker.selectedText.other':
    '{{Count}} dominios seleccionados',
  'taxonomy.modals.gru-domain-picker.shortcutText': 'Curso está en',
  'taxonomy.modals.gru-standard-picker.browseSelectorText':
    '¿Qué estándares serán cubiertos?',
  'taxonomy.modals.gru-standard-picker.browseCompetencySelectorText':
    '¿Qué competencias serán cubiertas?',
  'taxonomy.modals.gru-standard-picker.selectedText.zero':
    '{{Count}} estándares seleccionados',
  'taxonomy.modals.gru-standard-picker.selectedText.one':
    '{{Count}} estándar seleccionado',
  'taxonomy.modals.gru-standard-picker.selectedText.other':
    '{{Count}} estándares seleccionados',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.zero':
    '{{count}} competencias seleccionadas',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.one':
    '{{count}} competencia seleccionada',
  'taxonomy.modals.gru-standard-picker.selectedCompetencyText.other':
    '{{count}} competencias seleccionadas',
  'taxonomy.modals.gru-standard-picker.shortcutText':
    'La unidad está etiquetada como',
  'account-settings.title': 'Configuraciones de la cuenta',
  'account-settings.account-info': 'Informacion de cuenta',
  'account-settings.private-info': 'Información Privada',
  'account-settings.email-address': 'Dirección de correo electrónico',
  'account-settings.gender': 'Género',
  'account-settings.birthday': 'Cumpleaños',
  'gru-rich-text-editor.bold': 'Negrita',
  'gru-rich-text-editor.expression': 'Expresión',
  'gru-rich-text-editor.italic': 'Itálico',
  'gru-rich-text-editor.subscript': 'Subíndice',
  'gru-rich-text-editor.superscript': 'Sobrescrito',
  'gru-rich-text-editor.underline': 'Subrayar',
  'gru-rich-text-editor.bullets': 'Bullets',
  'gru-rich-text-editor.expressions-panel.tabs.calculus': 'Cálculo',
  'gru-rich-text-editor.expressions-panel.tabs.greek-letters': 'Letras griegas',
  'gru-rich-text-editor.expressions-panel.tabs.layout': 'Diseño',
  'gru-rich-text-editor.expressions-panel.tabs.relation': 'Relación',
  'gru-rich-text-editor.expressions-panel.tabs.set-theory':
    'Teoría de conjuntos',
  'gru-rich-text-editor.expressions-panel.tabs.symbols': 'Símbolos',
  'gru-rich-text-editor.expressions-panel.tabs.trigonometry': 'Trigonometría',
  'gru-rich-text-editor.expressions-panel.insert-expression': 'Insertar',
  'gru-rich-text-editor.expressions-panel.update-expression': 'Actualizar',
  'gru-rich-text-editor.expressions-panel.create-expression': 'Crear expresión',
  'gru-settings-edit.answerkey-attempts': 'Tecla de respuesta y intentos',
  'gru-settings-edit.answer-key':
    'Los estudiantes pueden ver la tecla de respuesta al final',
  'gru-settings-edit.attempts': 'Intentos',
  'gru-settings-edit.attempts-unlimited': 'Ilimitado',
  'gru-settings-edit.backwards':
    'Los estudiantes pueden navegar hacia atrás y cambiar las respuestas',
  'gru-settings-edit.feedback':
    'Los estudiantes verán si son correctos / incorrectos',
  'gru-settings-edit.feedback-immediate': 'Por pregunta y al final',
  'gru-settings-edit.feedback-never': 'Nunca',
  'gru-settings-edit.feedback-summary': 'Al final',
  'gru-settings-edit.navigation-scoring': 'Navegación y Puntuación',
  'gru-settings-edit.disable-heading':
    'Activar evaluación en el mapa del curso',
  'gru-settings-edit.disable-legend':
    'Los estudiantes pueden jugar la evaluación desde su mapa de cursos',
  'gru-icon-popover.settings-visibility-title': 'Haga visible su contenido',
  'gru-icon-popover.settings-visibility-content':
    'Esta configuración hace que su contenido sea visible a través de su perfil de usuario. Si desea compartir los cursos, las colecciones, las evaluaciones, los recursos y / o las preguntas que cree con los colegas, le sugerimos que active esta función.',
  'gru-take-tour.text': 'Hacer un tour',
  'gru-take-tour.teacher-home.stepOne.title': 'Su Página de Inicio',
  'gru-take-tour.teacher-home.stepOne.description':
    '¡Bienvenidos a la página de inicio de Gooru! Aquí puede encontrar una lista de las aulas que usted crea en Gooru. Las aulas le permiten compartir contenido directamente con los estudiantes. Siempre puedes volver a tu página principal haciendo clic en el icono de Gooru.',
  'gru-take-tour.teacher-home.stepTwo.title':
    'Clases en las que enseña o se une',
  'gru-take-tour.teacher-home.stepTwo.description':
    'Todas las aulas que enseña o se une a este año escolar aparecerán aquí bajo Aulas Activas.',
  'gru-take-tour.teacher-home.stepThree.title': 'Crear un aula',
  'gru-take-tour.teacher-home.stepThree.description':
    'Haga clic aquí para crear un nuevo aula. Una vez que tenga contenido para compartir con los estudiantes, se lo asignará a través de un aula.',
  'gru-take-tour.teacher-home.stepFour.title': 'Tu perfil',
  'gru-take-tour.teacher-home.stepFour.description':
    'Este es tu perfil. Haz clic en tu perfil en cualquier momento para acceder al contenido que creas o remixas en Gooru.',
  'gru-take-tour.teacher-home.stepFive.title': 'Content Manager',
  'gru-take-tour.teacher-home.stepFive.description':
    'Quick link to create and access your content.',
  'gru-take-tour.teacher-home.stepSix.title': 'Library',
  'gru-take-tour.teacher-home.stepSix.description':
    'Browse our featured courses.',
  'gru-take-tour.teacher-home.stepSeven.title': 'Your Profile',
  'gru-take-tour.teacher-home.stepSeven.description':
    'Access and update your content, user profile, and settings.',
  'gru-take-tour.teacher-home.stepEight.title': 'Support',
  'gru-take-tour.teacher-home.stepEight.description':
    'Access the support center or logout.',
  'gru-take-tour.teacher-home.stepNine.title': 'Classrooms',
  'gru-take-tour.teacher-home.stepNine.description':
    'View a list of classes you are currently teaching.',
  'gru-take-tour.teacher-home.stepTen.title': 'Archived Classes',
  'gru-take-tour.teacher-home.stepTen.description':
    'View a list of classes you taught in the past.',
  'gru-take-tour.teacher-home.stepEleven.title': 'Create Classroom',
  'gru-take-tour.teacher-home.stepEleven.description':
    'Name your classroom and click the button to create a new classroom.',
  'gru-take-tour.student-home.stepOne.title': 'Tome un Tour Icon',
  'gru-take-tour.student-home.stepOne.description':
    'Bienvenido a Tome un Tour! Esta es tu página personal. Recuerde que siempre puede volver a su página haciendo clic en el logotipo de Gooru. Ahora vamos a empezar!',
  'gru-take-tour.student-home.stepFeaturedCourses.title': 'Featured Courses',
  'gru-take-tour.student-home.stepFeaturedCourses.description':
    'Browse the featured courses in the Learning Navigator’s content catalog for topics that interest you.',
  'gru-take-tour.student-home.stepTwo.title': 'Anuncios',
  'gru-take-tour.student-home.stepTwo.description':
    'Aquí verá anuncios que su maestro o escuela le gustaría que conociera.',
  'gru-take-tour.student-home.stepThree.title': 'Search Bar',
  'gru-take-tour.student-home.stepThree.description':
    'Search our content catalog for topics that interest you.',
  'gru-take-tour.student-home.stepFour.title': 'Aulas',
  'gru-take-tour.student-home.stepFour.description':
    'Vea todas las clases en las que está inscrito.',
  'gru-take-tour.student-home.stepFive.title': 'Únete al aula',
  'gru-take-tour.student-home.stepFive.description':
    'Para unirse a un nuevo aula, ingrese el código de la clase y se mostrará en &quot;Mis clases&quot;.',
  'gru-take-tour.student-home.stepSix.title': 'Aprendizaje independiente',
  'gru-take-tour.student-home.stepSix.description':
    'Explorar y marcar temas que le interesen y que desea obtener más información.',
  'gru-take-tour.student-home.stepSeven.title': 'Barra de búsqueda',
  'gru-take-tour.student-home.stepSeven.description':
    'Busque en nuestro catálogo de contenido los temas que le interesan.',
  'gru-take-tour.student-home.stepEight.title': 'Su Página de Inicio',
  'gru-take-tour.student-home.stepEight.description':
    'Vuelva a su página de inicio.',
  'gru-take-tour.student-home.stepNine.title': 'Biblioteca',
  'gru-take-tour.student-home.stepNine.description':
    'Navegue por nuestros cursos destacados.',
  'gru-take-tour.student-home.stepTen.title': 'Actuación',
  'gru-take-tour.student-home.stepTen.description':
    'Vea un resumen de su rendimiento en los cursos en los que está inscrito.',
  'gru-take-tour.student-home.stepEleven.title': 'Independent Learning',
  'gru-take-tour.student-home.stepEleven.description':
    'Explore the topics you have bookmarked and that you want to learn more about.',
  'gru-take-tour.student-home.stepTwelve.title': 'Join Classroom',
  'gru-take-tour.student-home.stepTwelve.description':
    'Enter the classroom code to join a classroom.',
  'gru-take-tour.student-home.stepThirteen.title': 'Nombre de usuario',
  'gru-take-tour.student-home.stepThirteen.description':
    'Acceda y actualice su perfil de usuario.',
  'gru-take-tour.student-performance.stepOne.title': '¡Bienvenido!',
  'gru-take-tour.student-performance.stepOne.description':
    'Bienvenido a su Panel de rendimiento. Puede ver cómo se desempeña en todas las clases y cursos.',
  'gru-take-tour.student-performance.stepTwo.title': 'Ficha Filtrar',
  'gru-take-tour.student-performance.stepTwo.description':
    'Haga clic en la flecha para filtrar su rendimiento por actividad, período de tiempo, tema y curso.',
  'gru-take-tour.student-performance.stepThree.title': 'Actualizar informe',
  'gru-take-tour.student-performance.stepThree.description':
    'Una vez que haya seleccionado sus filtros, haga clic en el informe de actualización para mostrar los resultados.',
  'gru-take-tour.student-performance.stepFour.title': 'Descargar / Imprimir',
  'gru-take-tour.student-performance.stepFour.description':
    'Descargue su informe.',
  'gru-take-tour.student-performance.stepFive.title': '¡Terminado!',
  'gru-take-tour.student-performance.stepFive.description':
    'Adelante y analice su rendimiento!',
  'gru-take-tour.student-class.stepOne.title': '¡Bienvenido!',
  'gru-take-tour.student-class.stepOne.description':
    'Bienvenido a la página del curso. Aquí encontrará sus actividades diarias, el mapa del curso y los datos de rendimiento. ¡Empecemos!',
  'gru-take-tour.student-class.stepTopBar.title':
    'Course, Performance, Completion',
  'gru-take-tour.student-class.stepTopBar.description':
    'See a summary of your course and overall performance so far.',
  'gru-take-tour.student-class.stepTwo.title': 'Actividades de Clases Diarias',
  'gru-take-tour.student-class.stepTwo.description':
    'Acceda a una lista de actividades asignadas por su maestro. Seleccione las actividades que desea estudiar.',
  'gru-take-tour.student-class.stepThree.title': 'Mapa del curso',
  'gru-take-tour.student-class.stepThree.description':
    'Haga clic en las unidades y lecciones para completar las colecciones y evaluaciones en el curso.',
  'gru-take-tour.student-class.stepFour.title': 'Mi reporte',
  'gru-take-tour.student-class.stepFour.description':
    'Echa un vistazo a su rendimiento general de clase.',
  'gru-take-tour.student-class.stepFive.title': '¡Terminado!',
  'gru-take-tour.student-class.stepFive.description':
    'Para empezar, haga clic en la ficha Mapa del curso o Actividades diarias para comenzar a estudiar.',
  'gru-take-tour.teacher-class.stepOne.title': 'Welcome!',
  'gru-take-tour.teacher-class.stepOne.description':
    'Welcome to your classroom. Here you will we be able to view and assign your daily class activities, course map, update class information and review student performance data. Let’s get started!',
  'gru-take-tour.teacher-class.stepTopBar.title':
    'Course, Performance, Completion',
  'gru-take-tour.teacher-class.stepTopBar.description':
    'See a summary of your course and overall student performance so far.',
  'gru-take-tour.teacher-class.stepTwo.title': 'Daily Class Activities',
  'gru-take-tour.teacher-class.stepTwo.description':
    'View and assign today’s activities to your students.',
  'gru-take-tour.teacher-class.stepThree.title': 'Course Map',
  'gru-take-tour.teacher-class.stepThree.description':
    'View or edit the units, lessons, collections or assessments assigned in the course.',
  'gru-take-tour.teacher-class.stepFour.title': 'My Report',
  'gru-take-tour.teacher-class.stepFour.description':
    'View the summary of how your students are performing in the course and access their reports.',
  'gru-take-tour.teacher-class.stepClassManagement.title': 'Class Management',
  'gru-take-tour.teacher-class.stepClassManagement.description':
    'Assign or update your class information and students enrolled in the class.',
  'gru-take-tour.teacher-class.stepFive.title': 'Finished!',
  'gru-take-tour.teacher-class.stepFive.description':
    'Now go ahead and share the classroom with your students.',
  'gru-take-tour.study-player.stepOne.title': '¡Bienvenido!',
  'gru-take-tour.study-player.stepOne.description':
    'Este es tu Jugador de Estudio. Vamos a caminar a través de las funciones disponibles para usted.',
  'gru-take-tour.study-player.stepTwo.title':
    'Unidad / curso / encabezado de la lección',
  'gru-take-tour.study-player.stepTwo.description':
    'Indica dónde se encuentra la colección o evaluación en su curso.',
  'gru-take-tour.study-player.stepThree.title': 'Rendimiento / Finalización',
  'gru-take-tour.study-player.stepThree.description':
    'Indica cómo se está realizando y cuánto del curso ha completado.',
  'gru-take-tour.study-player.stepFour.title': 'Reaccionar al recurso',
  'gru-take-tour.study-player.stepFour.description':
    'Deje a su profesor saber lo que usted piensa acerca de este recurso.',
  'gru-take-tour.study-player.stepFive.title': 'Mapa del curso',
  'gru-take-tour.study-player.stepFive.nuTitle': 'Competencies',
  'gru-take-tour.study-player.stepFive.description':
    'Regrese a su mapa de cursos para ver el contenido adicional del curso.',
  'gru-take-tour.study-player.stepSix.title': 'Sugerencias',
  'gru-take-tour.study-player.stepSix.description':
    'Estos son recursos que puede que desee explorar basados ​​en lo que está estudiando actualmente.',
  'gru-take-tour.study-player.stepSeven.title':
    'Echa un vistazo a estos recursos',
  'gru-take-tour.study-player.stepSeven.description': '',
  'gru-take-tour.study-player.stepEight.title': '¡Terminado!',
  'gru-take-tour.study-player.stepEight.description': 'Empezar a estudiar!',
  'gru-take-tour.study-player.stepNine.title': 'Back To Collection',
  'gru-take-tour.study-player.stepNine.description':
    'Click on the icon at any time to return to your Collection or Assessment.',
  'gru-take-tour.library.stepOne.title': 'Welcome!',
  'gru-take-tour.library.stepOne.description':
    'Welcome to Libraries in the Learning Navigator.',
  'gru-take-tour.library.stepTwo.title': 'Featured Courses',
  'gru-take-tour.library.stepTwo.description':
    'Explore courses developed and implemented in classrooms by educators.',
  'gru-take-tour.library.stepThree.title': 'Other Libraries',
  'gru-take-tour.library.stepThree.description':
    'Explore content developed by Gooru’s partners.',
  'gru-take-tour.library.stepFour.title': 'Preview',
  'gru-take-tour.library.stepFour.description':
    'Preview the course to see if it is of interest to you.',
  'gru-take-tour.library.stepFive.title': 'Share',
  'gru-take-tour.library.stepFive.description':
    'Share this course with others.',
  'gru-take-tour.library.stepSix.title': 'Bookmark',
  'gru-take-tour.library.stepSix.description':
    'Bookmark this course to review it later.',
  'gru-take-tour.profile.stepOne.title': 'Welcome!',
  'gru-take-tour.profile.stepOne.description':
    'Welcome to your Profile. Here you can access your content, personal information and followers.',
  'gru-take-tour.profile.stepTwo.title': 'My Content',
  'gru-take-tour.profile.stepTwo.description':
    'Create new content and view the content you have remixed.',
  'gru-take-tour.profile.stepThree.title': 'About Me',
  'gru-take-tour.profile.stepThree.description':
    'Update your personal information, school information and your profile picture.',
  'gru-take-tour.profile.stepFour.title': 'Goals',
  'gru-take-tour.profile.stepFour.description':
    'Set and track goals to help you achieve your learning milestones.',
  'gru-take-tour.profile.stepFive.title': 'Followers',
  'gru-take-tour.profile.stepFive.description':
    'If you like someone’s content, you can follow them. You can also view who is following you.',
  'gru-take-tour.profile.stepSix.title': 'Badges',
  'gru-take-tour.profile.stepSix.description':
    'Review the badges you have received. You receive a badge if you complete a benchmark assessment assigned by your teacher.',
  'gru-tour.assessments-settings.stepOne.title': 'Navegación y Puntuación',
  'gru-tour.assessments-settings.stepOne.description':
    'Este ajuste determina cómo los estudiantes pueden pasar a través de una evaluación y muestra si sus respuestas son correctas o incorrectas. No les muestra una clave de respuesta.',
  'gru-tour.assessments-settings.stepTwo.title':
    'Clave de respuesta y número de intentos',
  'gru-tour.assessments-settings.stepTwo.description':
    'Esta configuración permite revelar una clave de respuesta y establece el número de intentos que los estudiantes tienen en la evaluación.',
  'gru-tour.overview.stepOne.title': 'Mapa del curso',
  'gru-tour.overview.stepOne.description':
    'El mapa de cursos proporciona a sus estudiantes acceso a todas las evaluaciones y colecciones que les asignan.',
  'gru-tour.overview.stepTwo.title': 'Código de clase',
  'gru-tour.overview.stepTwo.description':
    'Cada aula que crees tiene un código de clase único. Le dará este código a los estudiantes cuando esté listo para que se unan a su salón de clases y accedan a su contenido.',
  'gru-tour.overview.stepThree.title':
    'Monitorear Datos de Estudiantes y Clases',
  'gru-tour.overview.stepThree.description':
    'Esto le permite ver los datos de evaluación de la clase y los estudiantes individuales cuando los estudiantes completan las evaluaciones que son parte de un curso.',
  'gru-tour.overview.stepFour.title': 'Información del Aula',
  'gru-tour.overview.stepFour.description':
    'Aquí puede editar su nombre de salón de clases, publicar anuncios para sus estudiantes, ver los nombres de los estudiantes matriculados en su clase y eliminar su salón de clases.',
  'gru-tour.overview.stepFive.title': 'Edición del contenido del curso',
  'gru-tour.overview.stepFive.description':
    'Cuando usted está en un salón de clases, haga clic aquí para editar cualquier contenido del curso asignado a sus estudiantes.',
  'gru-tour.overview.stepSix.title': '¡Supervise el progreso en tiempo real!',
  'gru-tour.overview.stepSix.description':
    'Utilice el panel de control en tiempo real para supervisar el progreso de la clase en una evaluación en tiempo real. <br><br> Haga clic en el icono &quot;Go Live&quot; que se encuentra a la izquierda de cada evaluación para lanzar una evaluación en tiempo real para los estudiantes. <br><br>',
  'gru-tour.quick-start.stepOne.title': 'Navegando por sus aulas',
  'gru-tour.quick-start.stepOne.description':
    'Esta es una vista de un aula recién creada. Para regresar a un aula en cualquier momento, haga clic en &quot;Aulas&quot; y use el menú desplegable para seleccionar el aula que desea ingresar.',
  'gru-tour.quick-start.stepTwo.title': '¿Empezando? Crear una evaluación!',
  'gru-tour.quick-start.stepTwo.description':
    'Sugerimos crear una evaluación como una forma de empezar con Gooru y evaluar los niveles actuales de comprensión del estudiante en su clase.',
  'gru-tour.real-time.stepOne.title': 'Desglose de las respuestas',
  'gru-tour.real-time.stepOne.description':
    'Haga clic en cada pregunta para ver un desglose de cómo respondieron los estudiantes.',
  'gru-tour.real-time.stepTwo.title': 'Datos Individuales del Estudiante',
  'gru-tour.real-time.stepTwo.description':
    'Seleccione cada mosaico de estudiantes para ver los informes individuales de datos de los estudiantes.',
  'gru-tour.real-time.stepThree.title': 'Seleccione una vista',
  'gru-tour.real-time.stepThree.description':
    'Seleccione &quot;vista de título&quot; o &quot;vista de lista&quot; para ver las opciones de visualización de datos.',
  'gru-tour.real-time.stepFour.title': 'Puntuación media',
  'gru-tour.real-time.stepFour.description':
    'Ver el promedio de la clase calculado en tiempo real para todas las respuestas.',
  'gru-tour.real-time.stepFive.title': 'Datos anónimos del proyecto',
  'gru-tour.real-time.stepFive.description':
    'Utilice esta opción para proyectar una vista anónima de los datos del estudiante.',
  'gru-course-play.hide-unit-details': 'Ocultar metadatos de la unidad',
  'gru-course-play.view-unit-details': 'Ver metadatos de la unidad',
  'gru-course-play.performance': 'Actuación',
  'gru-century-skills.legends.hewlett':
    'Modelo de aprendizaje más profundo de Hewlett',
  'gru-century-skills.legends.conley': 'Conley Cuatro Llaves',
  'gru-century-skills.legends.framework': 'Marco P21',
  'gru-century-skills.legends.national':
    'Centro Nacional de Investigación para la Vida y el Trabajo',
  'gru-century-skills.content.groups.cognitive':
    'Principales Habilidades Cognitivas y Estrategias',
  'gru-century-skills.content.groups.content':
    'Conocimiento de Contenido Clave',
  'gru-century-skills.content.groups.learning':
    'Habilidades y técnicas clave de aprendizaje',
  'gru-rubric-edit.upload-rubric': 'Rúbrica de subida',
  'gru-rubric-edit.copy.success-message':
    'You\'ve copied rubric {{title}}. Do you want to edit that Rubric?',
  'gru-rubric-creation.url': 'URL',
  'gru-rubric-creation.upload-file': 'Subir archivo',
  'gru-rubric-creation.add-category': 'Añadir nueva categoria',
  'gru-rubric-creation.gru-preview-url.preview':
    'Añadir rúbrica anterior y vista previa aquí',
  'gru-rubric-creation.overall-narrative':
    'Retroalimentación narrativa general',
  'gru-rubric-creation.feedback-guidance': 'Guía de retroalimentación',
  'gru-rubric-creation.required-feedback': 'Requiere retroalimentación',
  'gru-rubric-creation.feedback-guidance-placeholder':
    'Resuma sus comentarios sobre el ensayo como un todo.',
  'gru-rubric-creation.gru-category.category-title': 'Categoría Título',
  'gru-rubric-creation.gru-category.category-feedback':
    'ex. Al revisar esta categoría, preste mucha atención al propósito del autor.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.0': 'ex. Competente',
  'gru-rubric-creation.gru-category.gru-scoring-levels.1': 'ex. Ejemplar',
  'gru-rubric-creation.gru-category.gru-scoring-levels.2': 'ex. BASIC',
  'gru-rubric-creation.gru-category.gru-scoring-levels.3':
    'ex. Debajo de Básico',
  'gru-rubric-creation.gru-category.gru-scoring-levels.4':
    'example: No Evidence of Proficiency',
  'gru-rubric-creation.gru-category.gru-scoring-levels.best': 'Mejor',
  'gru-rubric-creation.gru-category.gru-scoring-levels.levels': 'Nivel',
  'gru-rubric-creation.gru-category.gru-scoring-levels.new-level':
    'Agregar nuevo nivel',
  'gru-rubric-creation.gru-category.gru-scoring-levels.scoring': 'Tanteo',
  'gru-rubric-creation.gru-category.gru-scoring-levels.worst': 'Peor',
  'gru-rubric-creation.gru-category.gru-scoring-levels.name-error':
    'Please enter the level title.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.score-error':
    'Please enter the score value.',
  'gru-rubric-creation.gru-category.gru-scoring-levels.no-levels-error':
    'Please set a value for at least one level.',
  'library.browse-library': 'Explorar la biblioteca',
  'library.featured-courses': 'Cursos destacados',
  'library.gru-library-card.featured-course': 'Curso destacado',
  'library.gru-partner-library-card.course.zero': '{{count}} Curso',
  'library.gru-partner-library-card.course.one': '{{count}} Curso',
  'library.gru-partner-library-card.course.other': '{{count}} Cursos',
  'library.gru-partner-library-card.collection.zero': '{{count}} Colección',
  'library.gru-partner-library-card.collection.one': '{{count}} Colección',
  'library.gru-partner-library-card.collection.other': '{{count}} Colecciones',
  'library.gru-partner-library-card.assessment.zero': '{{count}} Evaluación',
  'library.gru-partner-library-card.assessment.one': '{{count}} Evaluación',
  'library.gru-partner-library-card.assessment.other': '{{count}} Evaluaciones',
  'library.gru-partner-library-card.resource.zero': '{{Count}} Recurso',
  'library.gru-partner-library-card.resource.one': '{{Count}} Recurso',
  'library.gru-partner-library-card.resource.other': '{{Count}} Recursos',
  'library.gru-partner-library-card.question.zero': '{{Count}} Pregunta',
  'library.gru-partner-library-card.question.one': '{{Count}} Pregunta',
  'library.gru-partner-library-card.question.other': '{{Count}} Preguntas',
  'library.gru-partner-library-card.rubric.zero': 'Rúbrica {{count}}',
  'library.gru-partner-library-card.rubric.one': 'Rúbrica {{count}}',
  'library.gru-partner-library-card.rubric.other': 'Rúbricas {{count}}',
  'library.partner-libraries': 'Bibliotecas asociadas',
  'gru-study-header.lesson-legend': 'Actualmente estás en la lección',
  'gru-study-header.resource-legend': 'Está revisando este recurso.',
  'gru-study-header.resources-collection-report':
    'Informe de uso de la colección',
  'gru-study-header.resources-assessment-report':
    'Informe de resumen de la evaluación',
  'gru-study-header.check-summary': 'Revise su informe de resumen',
  'gru-study-header.check-usage': 'Compruebe su informe de uso',
  'gru-study-header.no-suggestions':
    'We\'re working on the best suggestions to support your learning',
  'gru-study-header.resource.zero': 'Recurso',
  'gru-study-header.resource.one': 'Recurso',
  'gru-study-header.resource.other': 'Recursos',
  'gru-study-header.question.zero': 'Pregunta',
  'gru-study-header.question.one': 'Pregunta',
  'gru-study-header.question.other': 'Preguntas',
  'gru-study-header.suggestions-legend':
    'Para obtener más información, consulte estos recursos.',
  'gru-suggest-test.pre-test-header': 'Pre-prueba (opcional)',
  'gru-suggest-test.post-test-header': 'Post-prueba (opcional)',
  'gru-suggest-test.backfill-header': 'Colección Sugerida (Opcional)',
  'gru-suggest-test.benchmark-header': 'Prueba de referencia (opcional)',
  'gru-suggest-test.resource-header': 'Recursos sugeridos (Opcional)',
  'gru-suggest-test.signature_collection-header':
    'Suggested Collection (Optional)',
  'gru-suggest-test.signature_collection-lead':
    'Based on your performance on this course, the following collection may enhance your understanding.',
  'gru-suggest-test.signature_assessment-header':
    'Suggested Assessment (Optional)',
  'gru-suggest-test.signature_assessment-lead':
    'Based on your performance on this course, the following assessment may enhance your understanding.',
  'gru-suggest-test.pre-test-lead':
    'Se sugiere una pre-prueba para medir su comprensión actual de los conceptos de esta lección. El pre-test puede ayudarlo a prepararse para el contenido de la lección. El pre-test no afectará la puntuación de rendimiento de su curso.',
  'gru-suggest-test.post-test-lead':
    'Se sugiere el siguiente post-test para medir su comprensión de la información presentada. La post-prueba no afectará la puntuación de rendimiento de su curso.',
  'gru-suggest-test.backfill-lead':
    'Sobre la base de las respuestas de su pre-prueba, puede ser útil revisar material adicional antes de comenzar la lección. Revisar el material de apoyo puede ayudar a preparar a los estudiantes para aprender material nuevo.',
  'gru-suggest-test.benchmark-lead':
    'Ahora está listo para demostrar su comprensión tomando una evaluación de referencia. Obtendrá una insignia para completar satisfactoriamente el punto de referencia. El punto de referencia no afectará la puntuación de rendimiento del curso.',
  'gru-suggest-test.resource-lead':
    'Sobre la base de su rendimiento en este curso, el siguiente recurso puede mejorar su comprensión.',
  'gru-suggest-test.no': 'No, gracias',
  'gru-suggest-test.no-suggestions': 'He aquí un resumen de su rendimiento.',
  'gru-suggest-test.take': 'Toma {{type}}',
  'gru-suggest-test.take-signature-collection': 'Study Suggested Collection',
  'gru-suggest-test.take-signature-assessment': 'Study Suggested Assessment',
  'gru-suggest-test.take-backfill-pretest': 'Estudio de la colección sugerida',
  'gru-suggest-test.take-resource': 'Recurso de estudio',
  'gru-suggest-test.end-of-course': 'Has llegado al final del curso.',
  'gru-content-suggestion.header': 'We have a suggestion for you!',
  'gru-content-suggestion.suggestion-text.collection':
    'Based on your performance on this topic, we recommend that you go through our suggested collection to help you gain mastery.',
  'gru-content-suggestion.suggestion-text.assessment':
    'Based on your performance on this topic, we recommend that you go through our suggested assessment to help you gain mastery.',
  'student-open-ended-summary.overall-comment': 'Overall Comment',
  'student-open-ended-summary.overall-score': 'Overall score',
  'student-open-ended-summary.prompt': 'Question Prompt',
  'gru-performance-chart.teacher-tooltip':
    'of your students have completed all the assessments in this lesson',
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
  'add.to.todays.class': 'Add to Today\'s Class'
});
