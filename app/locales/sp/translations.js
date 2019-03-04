import quizzesTranslations from './quizzes/translations';

export default Object.assign(quizzesTranslations, {
  en: 'English',
  sp: 'Español',
  ar: 'عربى',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
  errors: {
    description: 'Este campo',
    inclusion: '{{description}} no está incluido en la lista',
    exclusion: '{{description}} está reservado',
    invalid: '{{description}} no es válido',
    confirmation: '{{description}} no coincide {{on}}',
    accepted: 'Se debe aceptar {{description}}',
    empty: '{{description}} no puede estar vacío',
    blank: '{{description}} no puede estar en blanco',
    present: '{{description}} debe estar en blanco',
    collection: '{{description}} debe ser una colección',
    singular: '{{description}} no puede ser una colección',
    tooLong:
      '{{description}} es demasiado largo (el máximo es {{max}} caracteres)',
    tooShort:
      '{{description}} es demasiado corta (el mínimo es {{min}} caracteres)',
    before: '{{description}} debe ser antes de {{before}}',
    after: '{{description}} debe ser después de {{after}}',
    wrongDateFormat: '{{description}} debe tener el formato {{format}}',
    wrongLength:
      '{{description}} es la longitud incorrecta (debería ser {{is}} caracteres)',
    notANumber: '{{description}} debe ser un número',
    notAnInteger: '{{description}} debe ser un entero',
    greaterThan: '{{description}} debe ser mayor que {{gt}}',
    greaterThanOrEqualTo: '{{Description}} debe ser mayor o igual que {{gte}}',
    equalTo: '{{description}} debe ser igual a {{is}}',
    lessThan: '{{description}} debe ser menor que {{lt}}',
    lessThanOrEqualTo: '{{description}} debe ser menor o igual que {{lte}}',
    otherThan: '{{description}} debe ser distinto de {{value}}',
    odd: '{{description}} debe ser impar',
    even: '{{description}} debe ser par',
    positive: '{{description}} debe ser positivo',
    date: '{{description}} debe ser una fecha válida',
    email:
      '{{description}} debe ser una dirección de correo electrónico válida',
    phone: '{{description}} debe ser un número de teléfono válido',
    url: '{{description}} debe ser una URL válida'
  },
  common: {
    relevance: 'Relevance',
    engagement: 'Engagement',
    efficacy: 'Efficacy',
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
    'a-collection': 'Una colección',
    'a-course': 'un curso',
    'a-question': 'una pregunta',
    'a-resource': 'un recurso',
    'a-rubric': 'Una rúbrica',
    'all-completed': 'Todo completado',
    'an-assessment': 'Una evaluación',
    about: 'Acerca de',
    'about-you': 'Acerca de ti',
    'about-me': 'About Me',
    accept: 'Accept',
    ignore: 'Ignore',
    add: 'Añadir',
    'plan-an-activities': 'Plan your activities',
    'plan-an-activities-msg':
      'Add activities to conduct in class. Click on the collection or assessment icon above to Plan your activities',
    Reschedule: 'Reschedule',
    'no-unschedule-items':
      'You don\'t have any activities that need scheduling for ',
    'repeat-activity': 'Repeat Activity',
    'add-assessment': 'Crear una nueva evaluación',
    'add-century-skills': 'Añadir habilidades del siglo XXI',
    'add-collaborator': 'Añadir Colaborador',
    'add-collection': 'Crear nueva colección',
    'add-collection-item': 'Crear recurso o pregunta',
    'add-competency': 'Añadir Competencia',
    'add-content-prompt':
      'No has creado <span>{{type}}</span> todavía. Sigue siendo audaz.',
    'add-course': 'Crear nuevo curso',
    'add-coruse-to-class': 'Add Course',
    'add-domains-to-unit': 'Agregar dominios a la unidad',
    'add-url': 'Agregar URL',
    'add-from-url': 'Agregar desde URL',
    'add-lessons': 'Añadir lecciones',
    'add-new-lesson': 'Crear nueva lección',
    'add-new-unit': 'Crear nueva unidad',
    'add-new-resource': 'Crear nuevo recurso',
    'add-new-question': 'Crear una nueva pregunta',
    'add-question': 'Crear pregunta',
    'add-question-image': 'Añadir imagen de pregunta',
    'add-rubric': 'Añadir nueva rubrica',
    'add-standard': 'Añadir Estándar',
    'add-standards': 'Añadir normas',
    'add-standards-to-collection': 'Agregar normas a la recopilación',
    'add-to': 'Añadir',
    'add-to-classroom': 'Añadir al aula',
    'add-to-daily-class': 'Añadir a las Actividades de la Clase Diaria',
    'add-to-collection-success':
      'Has añadido {{contentTitle}} a {{collectionTitle}}. ¿Desea editar ese {{collectionType}}?',
    'add-to-lesson-success':
      'Has añadido {{collectionTitle}} a {{lessonTitle}}. ¿Desea editar ese {{collectionType}}?',
    'add-type-question': '¿Qué tipo de pregunta le gustaría agregar?',
    'add-type-resource': '¿Qué tipo de recurso es este?',
    'add-units': 'Añadir unidades',
    added: 'Adicional',
    'advanced-editing': 'Edición avanzada',
    announcements: 'Anuncios',
    anonymous_mode: 'Modo anónimo',
    answer: 'Tu respuesta',
    'answer-correct': '¡Estás en lo correcto!',
    'answer-incorrect': 'Eres incorrecto ...',
    'answer-key-was-hidden':
      'Nota: Su profesor ha ocultado la tecla de respuesta.',
    approved: 'Aprobado',
    archive: 'Archive',
    assessment: 'Evaluación',
    'assessment-disabled': 'Usted no puede intentar esta evaluación',
    'assessment-external': 'Evaluación externa',
    'assessment-pl': {
      zero: 'Evaluaciones',
      one: 'Evaluación',
      other: 'Evaluaciones'
    },
    'assessment-title': 'Título de la evaluación',
    assessmentInitial: 'UN',
    assessments: 'Evaluaciones',
    assign: 'Asignar',
    'assign-to-class': 'Asignar al aula',
    'assign-to-course': 'Asignar al curso',
    attempt: 'Número de intento',
    audience: 'Audiencia',
    avatarFor: 'Avatar para',
    averageScore: 'Puntuación media',
    back: 'Espalda',
    'back-to-assessment': 'Volver a la evaluación',
    'back-to-collection': 'Volver a la colección',
    'back-to-course-map': 'Volver al Mapa del Curso',
    'back-to-data': 'Volver a Datos',
    'back-to-report': 'Back to Report',
    'best-practices': 'Mejores prácticas',
    beta: 'Beta',
    'big-ideas': 'Grandes ideas',
    biography: 'Biografía',
    bookmark: 'Marcador',
    bookmarks: 'Marcadores',
    'bookmarked-content-success':
      'Este marcador {{contentType}} se agregará a su página de aprendizaje independiente.',
    'bookmarked-success':
      'Todos los contenidos marcados se añadirán a la página de aprendizaje independiente.',
    builder: 'Editor',
    cancel: 'Cancelar',
    categories: 'Categorías',
    category: 'Categoría',
    categoryOptions: {
      k12: 'K-12',
      k12IN: 'K12IN',
      'higher-ed': 'Educación más alta',
      'professional-dev': 'Desarrollo profesional'
    },
    'century-skills': 'Habilidades del siglo XXI',
    choose: 'Escoger',
    'choose-file': 'Escoge un archivo',
    class: 'Aula',
    classScores: 'Puntuaciones de clase',
    'click-unBookmark': 'Haga clic para desmarcar',
    close: 'Cerca',
    collection: 'Colección',
    'collection-pl': {
      zero: 'Colecciones',
      one: 'Colección',
      other: 'Colecciones'
    },
    'collection-title': 'Título de la colección',
    collections: 'Colecciones',
    collectionInitial: 'do',
    competency: 'Competencia',
    competencies: 'Competencias',
    completed: 'Terminado',
    completion: 'Terminación',
    community: 'Comunidad',
    confirm: 'Confirmar',
    'confirm-copy': 'Confirmar y copiar',
    content: 'Contenido',
    'content-manager': 'Gestor de contenidos',
    contentUnavailable: 'Contenido no disponible',
    contentUnavailabletoday:
      'No current activities. Add  Class Activities from the Course Map or My Content.',
    contentUnavailableyesterday: 'No activities were added.',
    'contributed-by': 'Contribuido por',
    copy: 'Dupdo',
    'copy-to': 'Copiar a',
    correct: 'Correcto',
    'correct-answer': 'Respuesta correcta',
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
    country: 'País',
    'course-map': 'Mapa del curso',
    course: 'Curso',
    'course-title': 'Título del curso',
    courses: 'Cursos',
    'competency-status-0': 'Not Started',
    'competency-status-1': 'In Progress',
    'competency-status-2': 'Mastered (Inferred)',
    'competency-status-3': 'Mastered (Asserted)',
    'competency-status-4': 'Mastered (Earned)',
    'competency-status-5': 'Mastered (Demonstrated)',
    create: 'Crear',
    createClass: 'Create Class',
    'created-by': 'Creado por',
    'create-rubric': 'Crear nueva rúbrica',
    'current-attempt': 'Intento actual',
    'currently-studying': 'Currently Studying',
    delete: 'Borrar',
    'delete-instructions': {
      'links-inaccessible': 'Todos los enlaces compartidos serán inaccesibles',
      'content-inaccessible':
        'Todo el contenido será inaccesible a las aulas vinculadas a él'
    },
    'depth-of-knowledge': 'Profundidad del Conocimiento',
    description: 'Descripción',
    destination: 'Destination',
    'disappear-after-login':
      'Esto desaparecerá después de los logins de {{loginNumber}}',
    'disappear-next-login':
      'Esto no aparecerá en el siguiente inicio de sesión',
    district: 'Distrito',
    domain: 'Dominio',
    domains: 'Dominios',
    download: 'Descargar',
    'download-print': 'Descargar / Imprimir',
    'drag-drop-suggestions': 'O Sugerencias de arrastrar y soltar ...',
    'download-report': 'Descargar informe',
    done: 'Done',
    edit: 'Editar',
    showassessments: 'Show Assessments',
    showcollections: 'Show Collections',
    showlessons: 'Show Lessons',
    collapse: 'Collapse',
    expand: 'Expand',
    'edit-assessment': 'Editar evaluación',
    'edit-collection': 'Editar colección',
    'edit-course': 'Editar curso',
    'edit-question': 'Editar pregunta',
    'edit-resource': 'Editar Recurso',
    'edit-rubric': 'Edit Rubric',
    email_support: 'Support@gooru.org',
    emotions: {
      'emotion-1': 'necesito ayuda',
      'emotion-2': 'No entiendo',
      'emotion-3': 'Meh ...',
      'emotion-4': 'entiendo',
      'emotion-5': 'puedo explicarlo'
    },
    'enter-url': 'Introducir URL',
    'enrolled-students': 'Estudiantes inscritos',
    errors: {
      'join-class-code': 'Por favor ingrese el código de la clase.',
      'answer-has-no-image': 'Cargue una imagen de respuesta.',
      'add-username': 'Por favor, ingrese un nombre de usuario.',
      'add-course-title': 'Ingrese el título del curso.',
      'add-question-answer-text': 'Introduzca el texto de la respuesta.',
      'add-question-description': 'Ingrese la pregunta.',
      'add-question-title': 'Introduzca el título de la pregunta.',
      'assessment-title-presence': 'Ingrese el título de evaluación.',
      'can-not-join-class':
        '¡Vaya! No se puede unir al aula. Vuelve a intentarlo en breve.',
      'assessment-not-added-to':
        '¡Vaya! No se puede agregar la evaluación a la lección ahora mismo. Vuelve a intentarlo en breve.',
      'assessment-not-copied':
        '¡Vaya! No se puede copiar la evaluación ahora mismo. Vuelve a intentarlo en breve.',
      'assessment-not-created':
        '¡Vaya! No se puede crear evaluación en este momento. Vuelve a intentarlo en breve.',
      'assessment-not-updated':
        '¡Vaya! No se puede actualizar la evaluación ahora mismo. Vuelve a intentarlo en breve.',
      'category-title-presence': 'Please enter the category title.',
      'class-min-score':
        'La puntuación mínima debe ser un número entre 1 y 100',
      'class-not-created':
        '¡Vaya! No se puede crear el aula ahora mismo. Vuelve a intentarlo en breve.',
      'class-title-presence': 'Por favor dé un nombre a su salón de clases.',
      'collection-not-added-to':
        '¡Vaya! No se puede agregar la colección a la lección ahora mismo. Vuelve a intentarlo en breve.',
      'collection-not-copied':
        '¡Vaya! No se puede copiar la colección ahora mismo. Vuelve a intentarlo en breve.',
      'collection-not-created':
        '¡Vaya! No se puede crear colección ahora mismo. Vuelve a intentarlo en breve.',
      'collection-not-updated':
        '¡Vaya! No se puede actualizar la colección ahora mismo. Vuelve a intentarlo en breve.',
      'collection-title-presence': 'Introduzca el título de la colección.',
      'correct-answer-presence': 'Por favor, indique la respuesta correcta.',
      'course-not-copied':
        '¡Vaya! No se puede copiar el curso ahora mismo. Vuelve a intentarlo en breve.',
      'course-not-created':
        '¡Vaya! No se puede crear curso ahora mismo. Vuelve a intentarlo en breve.',
      'course-not-updated':
        '¡Vaya! No se puede actualizar el curso ahora mismo. Vuelve a intentarlo en breve.',
      'highlight-text-not-selected':
        'Por favor, indique la respuesta correcta.',
      'highlight-text-wrong-format': 'Formato incorrecto de la pregunta.',
      'hotspot-text-max-choices':
        'Ha alcanzado el límite de opciones de respuesta.',
      'file-max-size': 'Sólo se admiten archivos de tamaño inferior a 5 MB',
      'file-upload-missing':
        'Selecciona un archivo con cualquiera de las siguientes extensiones: {{extensions}}',
      'getting-next-resource':
        'There was an error submitting your answer. Please try again.',
      'lesson-not-copied':
        '¡Vaya! No se puede copiar la lección ahora mismo. Vuelve a intentarlo en breve.',
      'lesson-not-created':
        '¡Vaya! No se puede crear lección ahora mismo. Vuelve a intentarlo en breve.',
      'lesson-not-loaded':
        '¡Vaya! No se puede cargar la lección ahora mismo. Vuelve a intentarlo en breve.',
      'lesson-title-required': 'Introduzca el título de la lección.',
      'password-confirm': 'Por favor, confirme su contraseña.',
      'password-length': 'La contraseña debe tener entre 5 y 14 caracteres.',
      'password-not-match': 'Las contraseñas no coinciden.',
      'password-required': 'Porfavor ingrese una contraseña.',
      'password-special-characters': 'No utilice caracteres especiales.',
      'profile-not-updated':
        '¡Vaya! No se puede actualizar el perfil ahora mismo. Vuelve a intentarlo en breve.',
      'question-not-added-to':
        '¡Vaya! No se puede agregar la pregunta a {{collectionType}} ahora mismo. Vuelve a intentarlo en breve.',
      'question-not-copied':
        '¡Vaya! No se puede copiar la pregunta ahora mismo. Vuelve a intentarlo en breve.',
      'question-not-created':
        '¡Vaya! No se puede crear la pregunta ahora mismo. Vuelve a intentarlo en breve.',
      'question-not-updated':
        '¡Vaya! No se puede actualizar la pregunta ahora mismo. Vuelve a intentarlo en breve.',
      'reset-password-error':
        '¡UH oh! Algo no esta bien. No se puede restablecer la contraseña. Vuelve a intentarlo en breve.',
      'reset-google-account-exists':
        'Su inicio de sesión de correo electrónico se creó con una cuenta de Google y no podemos restablecer una contraseña de Google. Si olvidaste tu contraseña de Google, tendrás que restablecerla a través de tus aplicaciones de Google.',
      'resource-description-length':
        'La descripción no puede tener más de 500 caracteres.',
      'resource-invalid-url': 'URL invalida.',
      'resource-missing-title': 'Introduzca un título de recurso.',
      'resource-missing-type': 'Seleccione un tipo de recurso.',
      'resource-missing-url': 'Por favor introduzca un URL válido.',
      'resource-not-added-to-collection':
        '¡Vaya! No se puede agregar el recurso a la recopilación ahora mismo. Vuelve a intentarlo en breve.',
      'resource-not-copied':
        '¡Vaya! No se puede copiar recurso ahora mismo. Vuelve a intentarlo en breve.',
      'resource-not-created':
        '¡Vaya! No se puede crear recursos ahora mismo. Vuelve a intentarlo en breve.',
      'resource-not-updated':
        '¡Vaya! No se puede actualizar el recurso ahora mismo. Vuelve a intentarlo en breve.',
      'resource-same-host-url': 'Los recursos no pueden ser URL de Gooru.',
      'resource-title-length': 'El título no puede tener más de 50 caracteres.',
      'rubric-title-presence': 'Ingrese el título de la rúbrica.',
      'rubric-url-presence': 'Please enter the rubric URL.',
      'select-correct-answer': 'Seleccione la respuesta correcta.',
      'search-collections-length': 'Introduzca al menos 3 caracteres.',
      'sign-in-credentials-not-valid':
        '¡UH oh! Algo no esta bien. Revisa tu nombre de usuario y contraseña y vuelve a intentarlo.',
      'sign-in-google-account-exists':
        'Utiliza el inicio de sesión de Google. No podemos restablecer su contraseña.',
      'sign-up-error':
        '¡Vaya! No se puede registrar ahora mismo. Vuelve a intentarlo en breve.',
      'sign-up-first-name': 'Por favor, introduzca su nombre de pila.',
      'sign-up-last-name': 'Por favor ingrese su apellido.',
      'sign-up-name-length': 'El apellido debe tener al menos 2 letras.',
      'sign-up-name-only-letters': 'Por favor, escriba sólo letras.',
      'sign-up-valid-email':
        'Por favor, introduce una dirección de correo electrónico válida.',
      'special-characters':
        'No puede utilizar caracteres o espacios especiales.',
      'unit-not-copied':
        '¡Vaya! No se puede copiar la unidad ahora mismo. Vuelve a intentarlo en breve.',
      'unit-not-created':
        '¡Vaya! No se puede crear la unidad ahora mismo. Vuelve a intentarlo en breve.',
      'unit-not-loaded':
        '¡Vaya! No se puede cargar la unidad ahora mismo. Vuelve a intentarlo en breve.',
      'unit-title-required': 'Introduzca el título de la unidad.',
      'user-email-presence':
        'Por favor introduzca una dirección de correo electrónico válida.',
      'username-length':
        'El nombre de usuario debe tener entre 4 y 16 caracteres.',
      'forgot-password-gmail':
        'Utiliza el inicio de sesión de Google. No podemos restablecer su contraseña.',
      'no-studymaterial':
        'The course assigned to this class does not have any study material in it. Please contact your teacher to fix this'
    },
    'essential-questions': 'Preguntas esenciales',
    example: 'example: ',
    exit: 'Salida',
    'external-collection': 'External Collection',
    explanation: 'Explicación',
    explore: 'Explorar',
    false: 'Falso',
    'featured-courses': 'Cursos destacados',
    'file-name': 'Nombre del archivo',
    finish: 'Terminar',
    'first-name': 'Nombre de pila',
    follow: 'Seguir',
    followers: 'Seguidores',
    following: 'Siguiendo',
    forgotPassword: 'Se te olvidó tu contraseña',
    from: 'de',
    'from-my-assessments': 'De mis evaluaciones',
    'from-my-collections': 'De mis colecciones',
    'from-my-questions': 'De mis preguntas',
    'from-my-resources': 'De Mis Recursos',
    'hide-results': 'Ocultar resultados',
    hints: 'Sugerencias',
    home: 'Casa',
    if_questions: 'Si tienes alguna pregunta,',
    information: 'Información',
    'in-progress': 'En progreso',
    instructor: 'Instructor',
    'last-name': 'Apellido',
    'last-updated': 'Última actualización',
    'latest-attempt': 'Último intento',
    'launch-anonymous': 'Lanzamiento Anónimo',
    'launch-on-air': 'Ir a vivir',
    'learning-objectives': 'Objetivos de aprendizaje',
    'learning-target': 'Micro-estándar',
    'learning-target-mobile': 'Micro-estándar en estándar',
    lesson: 'Lección',
    lessonInitial: 'L',
    'lesson-title': 'Título de la Lección',
    lessonObj: {
      zero: 'Lecciones',
      one: 'Lección',
      other: 'Lecciones'
    },
    libraries: 'Bibliotecas',
    license: 'Licencia',
    link: 'Enlazar',
    'link-out': 'Vincular a',
    'link-out-message':
      '* Si su recurso aparece en blanco en la vista previa anterior, es posible que necesite un enlace a otra página para ver el contenido.',
    'live-assessments': 'Evaluaciones en directo',
    loading: 'Cargando ...',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    mastery: 'Maestría',
    menu: 'Menú',
    'more-details': 'Más detalles',
    move: 'Movimiento',
    myContent: 'Mi contenido',
    myProfile: 'My Location',
    library: 'Biblioteca',
    myPerformance: 'Mi rendimiento',
    'edit-narration': 'Editar Narración',
    narration: 'Narración',
    'new-assessment': 'Nueva Evaluación',
    'new-collection': 'Nueva colección',
    'new-question': 'Nueva pregunta',
    'new-question-text': 'Introduzca el texto de la pregunta aquí',
    'new-fib-question-text': 'Enter question with [answer]',
    'new-resource': 'Nuevo recurso',
    next: 'Siguiente',
    no: 'No',
    'no-archived': 'No tienes aulas archivadas.',
    'no-content': 'No hay contenido disponible',
    'no-content-my-report':
      'No reports available yet. Once you begin studying, your reports will become available.',
    'no-assessments-to-display':
      'No hay <span>evaluaciones</span> que mostrar.',
    'no-collections-to-display': 'No se mostrarán <span>colecciones</span> .',
    'no-courses-to-display': 'No hay <span>cursos</span> para mostrar.',
    'no-questions-to-display': 'No hay <span>preguntas</span> para mostrar.',
    'no-resources-to-display': 'No hay <span>recursos</span> para mostrar.',
    'no-rubrics-to-display': 'No hay <span>rúbricas</span> para mostrar.',
    'no-followers': 'Aún no tienes seguidores.',
    'no-independent-results':
      'Cuando empieces a explorar tu {{contentType}} marcado como favorito, aparecerán aquí.',
    'no-results': 'No se han encontrado resultados',
    'no-available-results': 'Not available results',
    'no-results-message':
      'Corrige tu ortografía. ¡Todos cometemos errores! <br/> Ir más amplio y quitar algunos filtros. <br/> O intente buscar una palabra similar en su lugar.',
    'no-more-attempts': 'No más intentos',
    'no-dca-student':
      'Your teacher has not yet assigned any collections or assessments to Class Activities.',
    'no-dca-teacher':
      'No current activities. Add  Class Activities from the Course Map or Content Catalog.',
    notScored: 'Unscored',
    notStarted: 'No empezado',
    'not-added': 'No añadido',
    'not-applicable': 'N / A',
    'not-following': 'No estás siguiendo a nadie.',
    'not-provided': 'No proporcionado',
    'not-specified': 'No especificado',
    not_started: 'No empezado',
    'nothing-to-display': 'Nada que mostrar.',
    number: 'No.',
    numberStudents: {
      zero: '{{count}} Estudiantes',
      one: '{{count}} Estudiante',
      other: '{{count}} Estudiantes'
    },
    of: 'de',
    off: 'APAGADO',
    on: 'EN',
    other: 'Otro',
    'overall-performance': 'Rendimiento global',
    password: 'Contraseña',
    pending: 'Pendiente',
    performance: 'Mostrar el rendimiento',
    'performance-dashboard': 'Panel de rendimiento',
    'personal-information': 'Personal Information',
    play: 'Jugar',
    please_contact: 'Por favor contactar',
    'post-message': 'Publicar mensaje',
    preview: 'Avance',
    profile: 'Perfil',
    'profile-publishing': 'Visibilidad del perfil',
    'publish-to': 'Hacer esto visible para otros en mi biblioteca de perfiles',
    'published-by': 'Publicado por',
    'published-tooltip': 'Contenido Badged',
    publisher: 'Editor',
    prev: 'Prev',
    progress: 'Progress',
    question: 'Pregunta',
    questions: 'Preguntas',
    'questions-OE': 'Preguntas de Respuesta Gratuitas',
    'question-pl': {
      zero: 'Preguntas',
      one: 'Pregunta',
      other: 'Preguntas'
    },
    'question-title': 'Título de la pregunta',
    'question-type': {
      SA: 'Respuesta única',
      MC: 'Opción multiple',
      FIB: 'Llena el espacio en blanco',
      'T/F': 'Verdadero o falso',
      T_F: 'Verdadero o falso',
      MA: 'Respuesta múltiple',
      OE: 'Respuesta libre',
      HS_TXT: 'Selección múltiple - Texto',
      HS_IMG: 'Selección múltiple - Imagen',
      HT_TO: 'Arrastrar y soltar orden',
      HT_RO: 'Arrastrar y soltar orden',
      HT_HL: 'Subrayar el texto'
    },
    reaction: 'Reacción',
    'read-first': '<b>¡Leé esto primero!</b>',
    remaining: '{{number}} Izquierda',
    remix: 'Remix',
    'remix-assessment': 'Evaluación Remix',
    'remix-assessment-lead': 'Estás a punto de remixar una evaluación.',
    'remix-assessment-success':
      'Has remezclado una evaluación {{assessmentTitle}}. ¿Quieres editar esa evaluación?',
    'remix-collection': 'Colección Remix',
    'remix-collection-lead': 'Estás a punto de remixar una colección.',
    'remix-collection-success':
      'Has remezclado una colección {{collectionTitle}}. ¿Quieres editar esa colección?',
    'remix-course': 'Curso Remix',
    'remix-course-lead': 'Estás a punto de remezclar un curso.',
    'remix-course-success':
      'Has remezclado un curso {{courseTitle}}. ¿Quieres editar ese curso?',
    'remix-lesson': 'Lección Remix',
    'remix-lesson-lead': 'Estás a punto de remezclar una lección.',
    'remix-lesson-success': 'Has remezclado una lección {{lessonTitle}}.',
    'remix-question': 'Pregunta de Remix',
    'remix-question-lead': 'Estás a punto de remezclar una pregunta.',
    'remix-question-success':
      'Has remezclado una pregunta {{questionTitle}}. ¿Quieres editar esa pregunta?',
    'remix-resource': 'Recurso Remix',
    'remix-resource-lead': 'Estás a punto de remixar un recurso.',
    'remix-resource-success':
      'Has remezclado un recurso {{resourceTitle}}. ¿Quieres editar ese recurso?',
    'remix-unit': 'Unidad Remix',
    'remix-unit-lead': 'Estás a punto de remixar una unidad.',
    'remix-unit-success': 'Has remixado una unidad {{unitTitle}}.',
    'remixed-by': 'Remixado por',
    'remix-warning':
      '¡Aviso! Hay un montón de contenido impresionante en este curso y hacer una copia llevará tiempo. Confirme que desea iniciar el proceso y en 15 minutos encontrará su copia de este curso en su <b>perfil.</b>',
    remove: 'retirar',
    report: 'Report',
    'report-in-progress': 'Informe en curso',
    'request-to': 'Solicitud de revisión de una insignia',
    'request-report': 'Solicitar informe',
    resource: 'Recurso',
    resources: 'Recursos',
    'resource-format': {
      image: 'Imagen',
      text: 'Texto',
      video: 'Vídeo',
      interactive: 'Interactivo',
      webpage: 'Página web',
      audio: 'Audio',
      question: 'Pregunta'
    },
    'resource-pl': {
      zero: 'Recursos',
      one: 'Recurso',
      other: 'Recursos'
    },
    'resource-title': 'Título del recurso',
    'resource-url': 'URL del recurso',
    role: 'Papel',
    rubric: 'Rúbrica',
    'rubric-creation': 'Rubric Creation',
    rubrics: 'Rúbricas',
    'rubric-title': 'Título de Rúbrica',
    save: 'Salvar',
    'de-select': 'De Select',
    'select-all': 'Select All',
    none: 'None',
    'add-data': 'Add Data',
    'update-data': 'Update Data',
    all: 'All',
    'please-wait': 'Please Wait',
    'unscheduled-items': 'Unscheduled Items',
    'add-to-unschedule': 'Add to unscheduled list for',
    'save-next': 'Guardar y Siguiente',
    'save-submit': 'Guardar y enviar todo',
    'save-finish': 'Guardar y terminar',
    school: 'Colegio',
    'school-info': 'Información de la escuela',
    score: 'Puntuación',
    select: 'Seleccionar',
    'select-a-framework':
      'Primero seleccione un Marco de Estándares en la sección de Información sobre el curso.',
    sentence: 'Frase',
    settings: 'Ajustes',
    search: 'Buscar',
    'search-placeholder': 'Buscar',
    'search-placeholder-text': 'Search...',
    'search-error-message':
      'Los términos de búsqueda deben tener al menos 3 letras.',
    'search-400-error-message': 'Introduzca un término de búsqueda válido',
    'search-competency': 'Competencia de búsqueda',
    'search-standards': 'Normas de búsqueda',
    'select-question-type': 'Seleccione el tipo de pregunta',
    'select-resource-type': 'Seleccione el tipo de recurso',
    'send-request': 'Enviar petición',
    share: 'Compartir',
    'show-correct-answer': 'Mostrar respuesta correcta',
    'show-more-results': 'Mostrar más resultados',
    'show-results': 'Mostrar resultados',
    signUp: 'Regístrate',
    sortAlphabetical: 'Ordenar alfabéticamente',
    sortAverage: 'Ordenar por Promedio',
    'sort-most-recently': 'Ordenar por Actualizaciones más recientes',
    state: 'Estado o territorio',
    'state-territory': 'State/Territory',
    standard: 'Estándar',
    standards: 'Estándares',
    study: 'Estudiar',
    'study-now': 'Estudia ahora',
    student: 'Estudiante',
    students: 'Students',
    'student-id': 'ID del estudiante (no se muestra en el perfil)',
    'studen-id-display':
      'Student ID (not displayed on Profile, displayed in Anonymous mode)',
    'subject-and-framework': 'Asignatura y marco',
    subject: 'Subject',
    submit: 'Enviar',
    'submit-all': 'Enviar todo',
    submitAll: 'Submit All',
    'submit-finish': 'Submit and Finish',
    swap: 'Reordenar',
    suggestion: 'Sugerencia',
    suggestions: 'Sugerencias',
    'suggested-resources': 'Recursos sugeridos',
    support: 'Apoyo',
    'start-tour': 'Hacer un tour',
    'take-me-there': 'Llévame allí',
    teach: 'Enseñar',
    teacher: 'Profesor',
    timeSpent: 'Tiempo usado',
    'toggle-dropdown': 'Desactivar desplegable',
    tools: 'Herramientas',
    true: 'Cierto',
    type: 'Tipo',
    title: 'Title',
    unBookmark: 'Unbookmark',
    unexpectedError:
      'Se ha producido un error inesperado y se ha informado. ¡Lo sentimos por las molestias!',
    unfollow: 'No seguir',
    unit: 'Unidad',
    'unit-title': 'Título de la Unidad',
    unitInitial: 'Tu',
    unitObj: {
      zero: 'Unidades',
      one: 'Unidad',
      other: 'Unidades'
    },
    'untitled-course': 'Curso 1',
    'untitled-lesson': 'Lección sin título',
    'untitled-unit': 'Untitled Unit',
    'update-thumbnail': 'Actualizar miniatura',
    'update-photo': 'Update Photo',
    upload: 'Subir',
    'upload-file': 'Subir archivo',
    'upload-thumbnail': 'Subir miniatura',
    'upload-photo': 'Upload Photo',
    until: 'Until',
    'remove-photo': 'Remove Photo',
    'use-case': 'Caso de uso',
    'valid-extensions':
      'Las extensiones de archivo válidas son: {{extensions}}',
    verified: 'Verificado',
    'visibility-tooltip': 'No visible para los demás',
    'visibility-available': 'Visible to others',
    warnings: {
      'on-air-connection-lost':
        'El panel de Go Live ha perdido la conexión y está intentando de nuevo automáticamente. Es tentador, pero por favor no actualice su pantalla!',
      'character-limit': 'Has alcanzado el límite de caracteres.'
    },
    word: 'Palabra',
    yes: 'Sí',
    'change-score': 'Change Score'
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
    joinUs:
      'Únase a nosotros para <br/> Honrar el derecho humano a <br/> Educación',
    browseContent: {
      title: '¡Hola! ¿Qué estás buscando?',
      description_1: 'Busco',
      description_2: 'Materiales de aprendizaje',
      description_3: 'o',
      button: 'Navegar contenido',
      footer: {
        description_1: '¿Ya tienes una cuenta?',
        description_2: 'aquí.',
        login: 'Iniciar sesión'
      },
      grades_missing_message: 'Seleccione Grado y Asunto.',
      subjects_missing_message: 'Por favor, seleccione Asunto.'
    },
    gettingStarted: {
      title: 'Introducción a Gooru',
      toolkit: {
        title: 'Kit de herramientas de introducción',
        description:
          '¡Bienvenido a Gooru! Echa un vistazo a estos recursos para aprender lo que puedes hacer con Gooru y empezar rápidamente.'
      },
      classroom: {
        title: 'Historias del aula',
        description:
          'Aprenda con ejemplos a través de historias de maestros que dicen que Gooru ha hecho una diferencia en su salón de clases.'
      },
      events: {
        title: 'Echa un vistazo a nuestros eventos!',
        description:
          'Ofrecemos seminarios y seminarios gratuitos para ayudarle a comenzar con Gooru.'
      }
    },
    empowerStudents: {
      title: 'Capacitar a los estudiantes para que aprendan a su manera',
      find: 'Encontrar',
      remix: 'Remix',
      share: 'Compartir',
      monitor: 'Monitor'
    },
    findDescription:
      'Navegue por miles de colecciones de K-12 hechas por profesores, o busque más de 16 millones de recursos',
    remixDescription:
      'Recupere colecciones y personalice contenido para satisfacer las necesidades de sus estudiantes.',
    shareDescription:
      'Compartir colecciones con estudiantes a través de las aulas de Gooru. El acceso no es necesario para acceder.',
    monitorDescription:
      'Mida el compromiso y el progreso de sus estudiantes para que intervengan en tiempo real.',
    freeAndOpen: {
      title: 'Libre y abierto. <br/> Siempre.',
      description:
        'Creemos que la educación es un derecho humano. Gooru siempre estará libre de costo y anuncios para educadores y estudiantes de todo el mundo.',
      button: 'Más información sobre nuestro enfoque'
    }
  },
  class: {
    info: {
      'class-info': 'Información del Aula',
      teachers: 'Maestros',
      students: 'Estudiantes',
      subject: 'Tema',
      grade: 'Grado',
      description: 'Descripción',
      'edit-info': 'editar informacion',
      'share-class': 'Compartir Clase',
      'invite-co-teachers': 'Invitar a los Co-maestros',
      'add-students': 'Añadir Estudiantes',
      'class-code': 'Código de aula',
      delete: 'Eliminar sala de clase'
    },
    edit: {
      'assigned-course': 'Curso asignado',
      'basic-info': 'Información básica',
      'class-name': 'Nombre del aula',
      'class-greetings': 'Anuncios de aula',
      'class-greetings-placeholder':
        'Salude a sus estudiantes, motivarlos, hacer un anuncio, etc.',
      'class-minscore':
        'Calificación Puntuación mínima para los trofeos (1-100%)',
      'course-map': 'Mapa del curso',
      'edit-class': 'Editar configuración del aula'
    },
    overview: {
      title: 'Mapa del curso',
      locate: 'Ubícame',
      'edit-content': 'Editar contenido',
      'add-to-daily-class-activities':
        'Añadir a las Actividades de la Clase Diaria',
      'assigned-course': 'Your assigned course',
      'pre-study-title': 'Pre-study for your course',
      'course-map': {
        'rescope-toggle': 'Show Complete Course',
        'rescope-info':
          'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.',
        'custom-msg':
          'We are personalizing this course specifically for you based on your proficiency. Please check back in a little while to see the personalized course map.',
        'route0-bannerdesc':
          'As per your competency profile, there are some competencies that you need to master so that you can do well in this course. We have a route that we recommend you take to master these competencies. Click here to see the details.'
      }
    },
    analytics: {
      performance: {
        title: 'Ver rendimiento',
        'better-experience-message':
          'Para una mejor experiencia de Gooru, vea el análisis de aula completo en tableta o escritorio.',
        'no-content':
          'Sus estudiantes aún no han comenzado a estudiar un curso.',
        actions: {
          share: 'Compartir',
          edit: 'Editar contenido',
          download: 'Descargar',
          fullScreen: 'Ver en pantalla completa',
          exitFullScreen: 'Salir de pantalla completa',
          assessment: 'Ver evaluación',
          collection: 'Ver Colección',
          both: 'Ver ambos'
        },
        teacher: {
          metricsTable: {
            average: 'Promedio',
            'class-average': 'Promedio de clase'
          }
        },
        'grade-items': 'Items to Grade',
        'no-grade-items': 'Looks like you’re all caught up!',
        'gru-grade-items': {
          students: {
            zero: '{{count}} students',
            one: '{{count}} student',
            other: '{{count}} students',
            'not-started': 'not started'
          }
        }
      },
      mastery: {
        title: 'Ver dominio'
      }
    },
    'quick-start': {
      title: 'Asignar contenido a este aula.',
      'new-course': 'Inicio rápido de un nuevo curso',
      'new-course-desc':
        'Comience creando un nuevo curso, una colección o una evaluación',
      course: 'Nuevo curso',
      'new-collection': 'Nueva colección',
      'new-assessment': 'Nueva Evaluación',
      'remix-a-sample': 'Remix una muestra',
      'add-existing-course': 'Agregar un curso de su biblioteca',
      'existing-course-desc': 'La forma más rápida de comenzar un aula',
      'choose-course': 'Elija Curso',
      'remix-from-course': 'Remix de un curso destacado',
      'featured-course': 'Ver cursos destacados',
      'remix-desc':
        'Copia y personaliza un curso destacado para tus estudiantes',
      'browse-content': 'or browse our content catalogs.'
    }
  },
  classes: {
    classesJoined: 'Aulas a las que me he unido',
    classesTaught: 'Aulas que enseño',
    noClassesJoined: 'No te has unido a ninguna clase',
    noClassesTaught: 'No tienes clases creadas'
  },
  content: {
    assessments: {
      edit: {
        'best-practices':
          '<p> Una evaluación es un conjunto de preguntas puntuadas que usted y sus alumnos pueden usar para monitorear el entendimiento y el desempeño. </p><p> Use una variedad de tipos de preguntas (incluyendo varias basadas en SBAC) en su evaluación para que los estudiantes puedan demostrar comprensión de diferentes maneras. Recomendamos etiquetar cada pregunta a estándares, micro-estándares y Profundidad de conocimiento de Webb. </p>'
      }
    },
    classes: {
      create: {
        title: 'Crear un aula',
        content: 'Donde los estudiantes se involucran con el contenido.',
        'class-name-input': 'Nombre su aula',
        'condition-prompt': '¿Cómo se unirán los estudiantes a su aula?',
        'condition-prompt-code': 'Cualquier persona con código de Clase',
        'condition-prompt-invite': 'Sólo invitados',
        'get-started': 'Empezar'
      },
      join: {
        title: 'Únete a un aula',
        'join-a-classroom': 'Join a  Classroom',
        content: 'Donde comienza el viaje.',
        'not-now': 'Ahora no',
        'class-code-input': 'Introduzca un código de salón de clases',
        'class-not-found':
          'Aula no encontrada. Asegúrese de haber introducido el código correcto en el aula',
        'invalid-code': 'Código de salón no válido.',
        'join-not-allowed': 'No puedes unirte a este aula',
        'already-member': 'Ya eres miembro de este salón de clases.',
        'join-class': 'Únete al aula',
        'terms-and-conditions':
          'Al hacer clic en Unirse al aula, estoy de acuerdo en compartir mis datos de evaluación y recopilación de datos generados a partir del estudio de este salón Gooru con el (los) maestro (s) de este salón.'
      }
    },
    collections: {
      edit: {
        'assign-to-course': 'Asignar al curso',
        'best-practices':
          '<p> Los estudiantes interactúan con su contenido en el nivel de colección. Al crear una colección de aprendizaje, asegúrese de incluir los objetivos de aprendizaje y considere el uso de una variedad de tipos de recursos para exponer a los estudiantes a los conceptos de múltiples maneras. </p><p> Utilice la secuenciación de los recursos para desarrollar conceptos. La progresión a través de una colección debe fluir de una manera lógica y llevar a la audiencia prevista de un nivel general a un nivel más complejo de comprensión si es apropiado, o permitir adecuadamente para la exploración del estudiante. </p><p> Incluya chequeos de comprensión a lo largo del camino a través de nuestras preguntas Gooru u otros interactivos. Recomendamos recursos suficientes y / o suficientes recursos para lograr los objetivos de la recolección y asegurar que cada recurso tenga un papel y propósito. </p>'
      }
    },
    courses: {
      edit: {
        'assign-to-class': 'Asignar al aula',
        'best-practices':
          '<p> Un curso es una carpeta que le permite organizar su contenido de aprendizaje en unidades y lecciones. Al crear un curso, considere las preguntas esenciales que está abordando, los objetivos de aprendizaje y la organización de su contenido. </p><p> Puede juntar las lecciones para crear una experiencia diversa para su población estudiantil (por ejemplo, puede ordenar sus unidades cronológicamente, por tema o por estándar). </p>',
        information: {
          'course-title': 'Título del curso',
          description: 'Descripción'
        }
      }
    },
    questions: {
      edit: {
        'add-to': 'Añadir',
        'best-practices':
          '<p> Una pregunta es un recurso que requiere una respuesta del estudiante, y ofrecemos una variedad de tipos de preguntas para apoyar el tipo de preguntas que sus estudiantes verán en SBAC, PARCC y otras evaluaciones. </p><p> Considere la posibilidad de alternar los tipos de preguntas que usted utiliza para ofrecer a los estudiantes la exposición a estos tipos de preguntas y para proporcionar múltiples formatos para demostrar el conocimiento. </p><p> Etiquetar sus preguntas a las normas, micro-estándares, y Profundidad del conocimiento de Webb. Usted puede ver cómo sus estudiantes están interactuando con preguntas a través del tablero del profesor. </p>',
        information: {
          'question-title': 'Título de la pregunta',
          'question-type': 'tipo de pregunta'
        },
        builder: {
          'add-answer-choice': '+ Responder respuesta Choice',
          'add-hint': 'Añadir sugerencias',
          'add-explanation': 'Añadir explicación',
          answer: 'Responder',
          'answer-instructions': {
            FIB:
              'Añadir hasta 5 sugerencias para la respuesta y una explicación.',
            HS_IMG:
              'Puede agregar hasta diez imágenes de respuesta y seleccionar una o más respuestas correctas.',
            HS_TXT:
              'Puede agregar hasta diez opciones de respuesta y seleccionar una o más respuestas correctas.',
            HT_HL_ST:
              'Al escribir la pregunta, utilice los corchetes para indicar las oraciones resaltadas. Un soporte sólo puede contener una oración a la vez, utilizando un período dentro del corchete. Por ejemplo, El primer pequeño cerdo construyó su casa de paja. El gran lobo arruinó la casa. El segundo cerdo construyó su casa de madera. Límite de caracteres: 5000.',
            HT_HL_WD:
              'Al escribir la pregunta, utilice los corchetes para las palabras resaltadas. Un soporte sólo puede contener una palabra a la vez. Por ejemplo, el [grande] lobo malo sopló [hacia abajo] la casa. Límite de caracteres: 5000.',
            HT_RO:
              'Puede agregar hasta diez opciones de respuesta en el orden correcto. La orden será codificada para los estudiantes.',
            MA:
              'Puede agregar hasta diez respuestas, una imagen, una explicación y hasta cinco sugerencias.',
            MC:
              'Puede agregar hasta diez opciones de respuesta e indicar una respuesta correcta. Límite de caracteres: 200.',
            OE: 'Escriba la respuesta correcta. Límite de caracteres: 5000.',
            'T/F': 'Selecciona la respuesta correcta.'
          },
          'question-instructions': {
            FIB:
              'Al escribir la pregunta, utilice los corchetes para sus respuestas de relleno en blanco. Por ejemplo: \'El gran mal [lobo] sopló la casa\'. También puedes añadir una imagen.',
            HS_TXT: 'Escriba su pregunta.',
            HS_IMG: 'Escriba su pregunta.',
            HT_RO: 'Escriba su pregunta.',
            HT_HL: 'Escriba el mensaje de pregunta.',
            MC: 'Escriba su pregunta.',
            MA: 'Escriba su pregunta.',
            OE: 'Escriba su pregunta.',
            'T/F': 'Escriba su pregunta.'
          },
          'submission-format': {
            title: 'Student Submission Format',
            'answer-type': {
              'text-box': 'Text Box'
            }
          },
          'feedback-grading': {
            title: 'Feedback and Grading',
            'from-existing-rubric': 'From Existing Rubric',
            scoring: 'Scoring',
            'maximum-points': 'Maximum Points',
            increment: 'Increment',
            'rubric-error': 'Please add a Rubric'
          }
        }
      }
    },
    modals: {
      'delete-bookmark': {
        confirmation: '¿Deseas desmarcar este {{type}}?',
        'delete-error':
          '¡Vaya! No se puede desmarcar este {{type}} ahora. Vuelve a intentarlo en breve.'
      },
      'remove-class-activity': {
        confirmation:
          'Are you sure you want to remove this {{type}} from your  Class Activities?',
        'delete-error':
          'Oops! Unable to remove this {{type}} right now. Please try again shortly.'
      },
      'delete-class': {
        legend: 'Estás a punto de eliminar tu aula',
        'student-access': 'Los estudiantes no podrán acceder al aula',
        'student-data-deleted': 'Se borrarán todos los datos de los estudiantes'
      },
      'archive-class': {
        title: 'Archive classroom',
        legend: 'You are about to archive your classroom',
        'links-not-accessible': 'All shared links will be inaccessible',
        'students-no-access':
          'Students will not be able to access the classroom',
        'not-add-students':
          'You will not be able to add more students to the class',
        confirmation: 'Are you sure you want to archive?'
      },
      'delete-content': {
        legend: 'Estás a punto de eliminar',
        'content-legend':
          '<span>{{Type}}</span> {{index}} - {{title}} de {{parentName}}',
        'content-legend-header': '{{title}} de {{parentName}}',
        'delete-warning': 'Todo el contenido de este {{type}} se eliminará',
        'delete-error':
          '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
        confirmation:
          'Estás seguro de que quieres continuar? Por favor, escriba &quot;eliminar&quot; a continuación y haga clic en &quot;eliminar&quot;.'
      },
      'delete-resource': {
        legend: 'Confirma que deseas eliminar permanentemente <b>{{title}}</b>',
        'delete-warning': 'Todo el contenido de este {{type}} se eliminará',
        'delete-error':
          '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
        confirmation:
          'Estás seguro de que quieres continuar? Haga clic en \'Eliminar permanentemente\'.',
        'first-check':
          'Se trata de una eliminación permanente y no se puede deshacer',
        'second-check':
          'Se eliminarán copias de este recurso, en sus colecciones y en cualquier colección de otros usuarios de la comunidad'
      },
      'delete-rubric': {
        legend: 'Confirm you want to permanently delete <b>{{title}}</b>',
        'delete-warning': 'All content in this Rubric will be deleted',
        'delete-error':
          'Oops! Unable to delete Rubric right now. Please try again shortly.',
        confirmation:
          'Are you sure you want to continue? Please click “Permanently Delete”.',
        'first-check': 'This is a permanent delete and cannot be undone'
      },
      'remove-content': {
        legend:
          'Estás a punto de eliminar <b>{{title}}</b> de <b>{{parentName}}</b>',
        'remove-error':
          '¡Vaya! No se puede eliminar {{type}} ahora mismo. Vuelve a intentarlo en breve.',
        confirmation:
          'Estás seguro de que quieres continuar? Por favor escriba &quot;remove&quot; y haga clic en &quot;remove&quot;.'
      },
      'remove-student': {
        title: 'Eliminar al estudiante y eliminar sus datos',
        legend:
          'Estás a punto de eliminar {{studentName}} de este salón y eliminar todos sus datos.',
        'data-inaccessible':
          'Todos sus datos serán borrados y no accesibles por usted o por ellos',
        'classroom-access': 'No tendrán acceso al aula ni al contenido',
        'data-lost':
          'Si vuelven a unirse a la clase, todos los datos pasados ​​se perderán',
        'remove-error':
          '¡Vaya! No se puede eliminar este estudiante ahora mismo. Vuelve a intentarlo en breve.',
        confirmation:
          'Estás seguro de que quieres continuar? Por favor, escriba &quot;eliminar&quot; a continuación y haga clic en &quot;eliminar&quot;.'
      },
      'quick-remove-content': {
        legend:
          'Confirma que deseas eliminar <b>{{title}}</b> de <b>{{parentName}}</b> .'
      },
      'quick-delete-content': {
        legend:
          'Confirma que deseas eliminar permanentemente <b>{{title}}</b> de <b>{{parentName}}</b> .',
        delete: 'Borrar permanentemente'
      }
    },
    resources: {
      edit: {
        'best-practices':
          '<p> Los recursos son contenido multimedia en una variedad de formatos como videos, interactivos, sitios web, imágenes, Google Docs y más. Sea creativo y utilice sus propios recursos o obtenga \'recursos\' y busque en nuestra amplia oferta en Gooru. </p><p> Utilice una variedad de tipos de recursos para involucrar a sus estudiantes e incluir narración para que pueda ayudar a guiar a sus estudiantes a través del recurso. </p><p> Recomendamos etiquetar cada pregunta a estándares, micro-estándares y habilidades del siglo XXI. Usted puede ver cómo sus estudiantes están interactuando con los recursos a través del tablero del profesor. </p>',
        'placeholder-message': 'Añade un recurso para <span>verlo aquí.</span>',
        'not-implemented':
          'La vista previa del formato de recursos <span>no se ha implementado todavía.</span>',
        information: {
          'im-publisher': 'Soy el editor',
          'select-a-license': 'Seleccione una licencia'
        }
      }
    }
  },
  user: {
    'active-classrooms': 'Aulas Activas',
    'archived-classrooms': 'Aulas archivadas',
    classrooms: 'Aulas',
    rgo: 'RGO',
    'create-class': 'Crear un aula',
    hello: 'Hola, {{name}}!',
    'independent-learning': 'Aprendizaje independiente',
    'join-class': 'Únete al aula',
    'joined-classes': {
      zero: 'Actualmente estás inscrito en aulas de {{count}}',
      one: 'Actualmente estás inscrito en 1 aula',
      other: 'Actualmente estás inscrito en aulas de {{count}}'
    },
    'my-current-classes': 'Mis clases actuales',
    'manage-goals': 'Administrar objetivos',
    'my-classes': 'Mis clases',
    'teaching-classes': {
      zero: 'Actualmente está enseñando a las salas de clase {{count}}',
      one: 'Actualmente estás enseñando 1 aula',
      other: 'Actualmente está enseñando a las salas de clase {{count}}'
    }
  },
  'student-landing': {
    announcement: 'Anuncio',
    'browse-featured-courses': 'Navegue por nuestros cursos destacados',
    'browse-our': 'Navegue por',
    'class-code': 'Código de clase',
    'featured-courses': 'Cursos destacados',
    class: {
      'assigned-course': 'Curso asignado',
      'back-to': 'Volver a las aulas',
      'no-course': 'This classroom does not have a related course.',
      'no-course-assigned': 'No Course Assigned',
      'back-to-independent': 'Volver a Aprendizaje Independiente',
      report: 'Report',
      performance: 'Actuación',
      'course-map': 'Mapa del curso',
      unit: 'Unidad',
      lesson: 'Lección',
      'class-activities': 'Actividades de Clases Diarias',
      'class-activities-tab': {
        today: 'Hoy',
        'past-activities': 'Past Activities'
      },
      'my-report': 'Mi reporte',
      'my-location': 'Mi location',
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
      'to-report': 'Resumen de uso',
      'total-time-spent': 'Tiempo total dedicado'
    },
    'current-activity': 'Actividad actual',
    'resume-current-activity': 'Resume Current Activity',
    'last-activity': 'Last Activity',
    'start-studying': 'Start Studying',
    'not-available': '-NA-',
    'join-classroom':
      'Únase al salón de clases de su maestro para comenzar a aprender',
    learn: 'Aprender con un aula de Gooru',
    'my-performance': {
      activity: 'Actividad',
      activities: {
        study: 'Estudiar'
      },
      assessments: 'Evaluaciones',
      collections: 'Colecciones',
      filter: 'Filtrar',
      'primary-text':
        'Elija las cosas que desea analizar y generaremos un informe de rendimiento personalizado.',
      subject: 'Tema',
      title: 'Analiza tu rendimiento',
      'time-period': 'Periodo de tiempo',
      'update-report': 'Actualizar informe'
    },
    'study-player': 'Study Player',
    'my-study': 'Mi estudio',
    'no-classrooms':
      'Aún no te has unido a las aulas. Haga clic en \'Join </br> Clase \'para añadir la clase de su profesor. También puede buscar </br> Un curso destacado bajo la pestaña Biblioteca.',
    'no-content-classrooms':
      'This classroom currently has no content available',
    welcome: 'Bienvenido a Gooru.',
    'no-course-assigned':
      'No course has been assigned to this class yet. Please contact your teacher.'
  },
  'student-independent-learning': {
    'show-more': 'Show More',
    'show-less': 'Show Less',
    'no-courses':
      'When you start exploring your bookmarked Courses, they will appear here.',
    'no-collections':
      'When you start exploring your bookmarked Collections, they will appear here.',
    'no-assessments':
      'When you start exploring your bookmarked Assessments, they will appear here.',
    'no-independent-results': 'Explore the Library to learn something new.',
    'no-bookmarks':
      'When you start bookmarking Courses, Collections, and Assessments, they will appear here.',
    'add-bookmark': 'Add Bookmark'
  },
  'teacher-landing': {
    'latest-announcement': 'Último anuncio',
    'latest-assessment': 'Evaluación más reciente',
    'create-classroom':
      'Crear un aula, asignar contenidos, invitar a los estudiantes',
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
      'back-to': 'Volver a las aulas',
      'back-to-archived': 'Back to Archived Classrooms',
      'class-management': 'Gestión de la clase',
      atc: 'ATC',
      'performance-overview': 'Performance Overview',
      'student-proficiency': 'Student Proficiency',
      'class-management-tab': {
        actions: 'Comportamiento',
        'assessment-min-score':
          'Calificación Puntuación mínima para los trofeos',
        'assigned-course': 'Curso asignado',
        archive: 'Archivo',
        'archive-class': 'Clase de archivo',
        'archive-classroom': 'Archive Classroom',
        'attend-class-with-code': 'Asistir a clase con código',
        'class-information': 'Información de clase',
        'class-name': 'Nombre del aula',
        'class-code': 'Código de clase',
        'click-to-copy-class-code':
          'Haga clic para copiar el código de la clase',
        'course-information': 'Información del curso',
        delete: 'Borrar',
        'delete-class': 'Eliminar Clase',
        'download-roster': 'Descargar Roster',
        edit: 'Editar',
        'email-address': 'Dirección de correo electrónico',
        'first-name': 'Nombre de pila',
        'import-roster': 'Lista de importación',
        'last-name': 'Apellido',
        message: 'Mensaje',
        performance: 'Actuación',
        students: 'Estudiantes',
        'student-name': 'Nombre del estudiante',
        'student-id': 'Identificación del Estudiante',
        teachers: 'Maestros',
        'view-report': 'Vista del informe',
        'course-null': 'The classroom has no course assigned yet.',
        'course-subject-null':
          'The course assigned to classroom has not been tagged to a valid subject.',
        'students-null':
          'Share the Class Code with your students to have them join the classroom.'
      },
      'students-tab': {
        'last-name': 'Lastname',
        'first-name': 'Firstname',
        performance: 'Performance',
        proficiency: 'Proficiency',
        location: 'Location',
        'currently-studying': 'Currently Studying',
        'student-id': 'StudentId',
        remove: 'Remove',
        mastered: 'Mastered',
        'in-progress': 'In Progress',
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
      'class-activities': 'Actividades de Clases Diarias',
      'offline-class-report': {
        'class-report': 'Class Report',
        'activity-report': 'Activity Report',
        'conducted-on': 'Conducted On',
        'not-started': 'Not Started'
      },
      'back-to-class-activities': 'Back to  Class Activities',
      'class-activities-tab': {
        today: 'Hoy,',
        yesterday: 'Yesterday: ',
        month: 'Month: ',
        'add-from-course-map': 'Add from Course Map',
        'add-from-my-content': 'Add from My Content',
        'welcome-dca':
          'Welcome to your  Class Activities where you can assign collections and assessments for students to complete today. Please note: any reports generated will only be available today for the most recent attempt.',
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
      'click-to-copy': 'Haga clic para copiar el código de la clase',
      'course-map': 'Mapa del curso',
      management: 'Gestión de listas',
      report: 'Informe',
      performance: 'Actuación',
      'performance-tab': {
        assessments: 'Evaluaciones',
        collections: 'Colecciones'
      },
      'view-more': 'Ver más',
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
      'Todavía no has creado aulas. Haga clic en \'Crear clase\' o busque </br> Para un curso destacado en la pestaña Biblioteca.',
    'no-course': 'No has asignado un curso a esta </br> Aula todavía.',
    teach: 'Enseñar con una clase de Gooru',
    'welcome-course-map':
      'This is your Course Map where you can view course content, turn assessments on or off and launch assessments in real-time. You can also view overall class performance and completion. For a detailed view of class performance, visit your classroom\'s Report tab.',
    'welcome-rescoped-course-map':
      'This course has been personalized for each student in the class. You can view each student’s course map in the Class Management page by clicking on the student’s learning pathway ("->")',
    'welcome-premium-course-map':
      'This Navigator course is a personalized course covering standards across multiple grades. Each student is provided a unique course to help fill gaps, reinforce concepts and practices, and accelerate their learning. Personalized routes are designed and students are re-routed in real-time to maximize each student\'s learning potential and to navigate to their set destination.'
  },
  goals: {
    manage: {
      title: '¡Mis metas!',
      'add-goal': 'Añadir objetivo',
      'goal-label': 'Gol',
      'start-date-label': 'Fecha de inicio',
      'end-date-label': 'Fecha final',
      'type-label': 'Tipo de objetivo',
      'status-label': 'Estado',
      not_started: 'No empezado',
      activated: 'Activado',
      completed: 'Terminado',
      dropped: 'Caído',
      'reflection-label': 'Reflexión',
      save: 'Salvar',
      update: 'Actualizar',
      'goals-not-found':
        'Aún no has establecido metas. Puede agregar un objetivo haciendo clic en el botón &quot;Añadir meta&quot;.'
    },
    create: {
      'error-add-title': 'Por favor, introduzca la meta',
      'error-length-title':
        'El objetivo debe tener un máximo de 200 caracteres',
      'error-add-start-date': 'Introduzca la fecha de inicio',
      'error-add-end-date': 'Ingrese la fecha de finalización',
      'error-greater-end-date':
        'La fecha de finalización debe ser mayor que la fecha de inicio',
      'error-add-status': 'Seleccione el estado de objetivo',
      'error-length-reflection':
        'La reflexión debe tener un máximo de 2000 caracteres',
      'created-success-msg': 'Has creado el objetivo {{goalTitle}}'
    },
    delete: {
      'deleted-success-msg': 'Has eliminado el objetivo'
    },
    update: {
      'updated-success-msg': 'Ha actualizado la meta'
    }
  },
  'gru-add-to': {
    'add-assessment-to-lesson': 'Añadir de mis evaluaciones',
    'add-assessment-to-lesson-lead':
      'Seleccione una evaluación para agregar a esta lección.',
    'add-collection-to-lesson': 'Añadir de mis colecciones',
    'add-collection-to-lesson-lead':
      'Seleccione una colección para agregar a esta lección.',
    'add-to-collection': 'Añadir a la colección',
    'add-to-collection-lead':
      'Elige una colección que quieras agregar {{contentTitle}} a',
    'add-to-existing-classroom': 'Agregar al aula existente',
    'add-to-existing-classroom-lead': 'Elija un aula al que desea agregar',
    'add-to-assessment': 'Añadir a la valoración o recaudación',
    'add-to-assessment-lead':
      'Elija una evaluación que desea agregar {{contentTitle}} a',
    'assessments-info':
      'Las evaluaciones enumeradas aquí <b>no</b> pertenecen a otra lección o curso',
    'collections-info':
      'Las colecciones que aparecen aquí <b>no</b> pertenecen a otra lección o curso'
  },
  'gru-add-rubric-to-question': {
    title: 'Add from my Rubrics',
    lead: 'Select a rubric to add to this question.',
    'no-rubrics':
      'You have not yet created any rubrics that can be attached to this Free Response Question. You can create rubrics under My Content which can be accessed from your profile.',
    'go-to-content': 'Go to My Content'
  },
  'gru-assessment-confirmation': {
    title: 'Estás a punto de comenzar una evaluación ...',
    description: 'En esta evaluación, {{model.title}}',
    'setting-forward': 'Solo puede navegar hacia adelante',
    'setting-forward-backward':
      'Puede navegar hacia adelante y hacia atrás para responder preguntas',
    'unlimited-attempts-left': 'Tienes intentos ilimitados',
    'setting-forward-teacher': 'Student can navigate forward only',
    'setting-forward-backward-teacher':
      'Student can navigate forward and backwards to answer questions',
    'unlimited-attempts-left-teacher': 'Student have unlimited attempts',
    'attempts-left': {
      zero: 'Tienes intentos de {{count}}',
      one: 'Tienes 1 intento a la izquierda',
      other: 'Tienes intentos de {{count}}',
      'other-teacher': 'Student have {{count}} attempts'
    },
    'unlimited-attempts': 'Tienes intentos ilimitados',
    cancel: 'Cancelar',
    continue: 'Continuar',
    start: '¡Comienzo!',
    submit: 'Submit'
  },
  'gru-submit-confirmation': {
    title: 'Termina esta prueba y envía todos',
    description:
      'Estás a punto de terminar este intento y presentar todas las respuestas. Cualquier pregunta omitida se contará como incorrecta.',
    cancel: 'Cancelar',
    ok: 'ok',
    confirm: 'Concurso de finalización',
    'finish-description':
      'Haga clic en \'Finalizar cuestionario\' para enviar sus respuestas.'
  },
  'gru-quick-course-search': {
    'add-from-course': 'Agregar desde el curso existente',
    'view-featured-courses': 'Ver cursos destacados',
    assign: 'Asignar'
  },
  'gru-share-pop-over': {
    copy: 'Dupdo',
    'ios-tooltip': 'Mantenga pulsado para copiar!',
    'multiarch-tooltip': 'Presiona Ctrl + C para copiar!',
    'safari-osx-tooltip': '¡Presione Cmd + C para copiar!',
    'share-course': 'Comparte tu curso con el enlace',
    'share-question': 'Comparta su pregunta con el enlace',
    'share-resource': 'Comparte tu recurso con el enlace',
    'share-assessment': 'Comparta su evaluación con el enlace',
    'share-rubric': 'Share your rubric with link',
    'share-collection': 'Comparte tu colección con el enlace'
  },
  'gru-category-panel': {
    teacher: {
      title: 'Para maestros',
      body:
        'Descubra el contenido alineado con las normas, personalice el contenido y realice el seguimiento del progreso de los estudiantes a través del análisis de datos.',
      cta: 'Ver historias'
    },
    student: {
      title: 'Para estudiantes',
      body:
        'Explore los intereses, construya y monitoree el progreso a través de materiales de aprendizaje.',
      cta: 'Entrar',
      'text-placeholder': 'Introduzca el código del salón de clases'
    },
    district: {
      title: 'Para Distritos',
      body:
        'Colabore con Gooru para dar rienda suelta al aprendizaje personalizado y compartir un plan de estudios aprobado por el distrito.',
      cta: 'Vea Nuestro Impacto'
    },
    partner: {
      title: 'Para socios',
      body:
        'Colaborar con socios de misión para aumentar nuestro impacto colectivo en el ecosistema educativo.',
      cta: 'Aprende más'
    }
  },
  'class.gru-class-navigation': {
    active: 'Activo:',
    members: 'Miembros',
    greetings: 'Anuncios',
    overview: 'Mapa del curso',
    analytics: 'Datos',
    teams: 'Equipos',
    information: 'Información del Aula'
  },
  'class.gru-class-statistics': {
    title: 'Estadísticas de la clase',
    'on-average': 'De media',
    performance: 'Actuación',
    completion: 'Terminación',
    'time-spent': 'Tiempo usado',
    'no-performance': '-'
  },
  'gru-user-registration': {
    joinTitle: '¡Únase a la comunidad de Gooru!',
    joinDescription:
      'Encuentra, remix y comparte los mejores recursos de aprendizaje K-12 gratuitos.',
    googleButton: 'Regístrese con Google',
    whyGoogle: '¿Por qué registrarse en Google?',
    descriptionWhyGoogle:
      'Es rápido y fácil. Utiliza tu cuenta de Google existente para iniciar sesión sin contraseña.',
    or: 'O',
    noGoogleAccount: '¿No tienes una cuenta de Google?',
    signUpEmail: 'Regístrese con su dirección de correo electrónico',
    haveAccount: '¿Ya tienes una cuenta?',
    clickLogIn: 'Haga clic aquí para ingresar.'
  },
  'gru-welcome-message': {
    title: 'Bienvenido a Gooru\'s Learning Navigator!',
    'text-temporary-one':
      'As you move throughout the Learning Navigator, we are happy to support your journey. Look for the Take a Tour icon ',
    'text-temporary-two': ' for guided tours on how to use our features.',
    'text-one':
      'A medida que se desplaza por el Navegador de Aprendizaje, estamos felices de apoyar su viaje de las siguientes maneras:',
    'text-two': {
      subtitle: 'Hacer un tour',
      text: ': Ofrece visitas guiadas sobre cómo utilizar nuestras funciones.'
    },
    'text-three': {
      subtitle: 'Ayuda',
      text: ': Apoyo a su alcance para preguntas adicionales.'
    },
    'text-four': {
      subtitle: 'Nuevo',
      text: ': Identifica las nuevas características que puede probar.'
    },
    'text-five':
      'En cualquier momento si desea volver a su página de inicio, simplemente haga clic en',
    'dont-show-again': 'No mostrar de nuevo'
  },
  'sign-up': {
    'step-1-title': '¡Hola!',
    'step-1-description': 'Nos alegra que haya decidido unirse a nosotros.',
    'step-child-title': '¡No tan rapido!',
    'step-child-subtitle': 'No podemos completar su registro.',
    'step-child-description-1':
      'Gooru no pudo crear su cuenta debido a nuestra',
    'step-child-age-requirements': 'Términos y condiciones',
    'step-child-description-2':
      '. Sigue aprendiendo y te veré en unos pocos años!',
    'step-2-title': 'Información básica',
    'step-2-description': 'No eres básico, pero esta información es.',
    'log-in': 'Iniciar sesión',
    'log-in-description': 'Si ya tiene una cuenta.',
    'google-button': 'Regístrese con Google',
    username: 'Nombre de usuario',
    dateOfBirth: {
      title: 'Cumpleaños',
      day: 'Día',
      month: 'Mes',
      months: {
        january: 'enero',
        february: 'febrero',
        march: 'marzo',
        april: 'abril',
        may: 'Mayo',
        june: 'junio',
        july: 'julio',
        august: 'agosto',
        september: 'septiembre',
        october: 'octubre',
        november: 'noviembre',
        december: 'diciembre'
      },
      year: 'Año',
      'error-message': 'Por favor, introduce tu fecha de nacimiento.'
    },
    email: 'Email',
    password: 'Contraseña',
    rePassword: 'Confirmar contraseña',
    state: 'Estado o territorio',
    district: 'Organización del distrito o de la carta',
    'error-username-taken':
      'Aww, este nombre de usuario es tomado. Prueba otro.',
    'error-email-taken': 'Este correo electrónico se ha tomado. Prueba otro.',
    'error-role-message': 'Seleccione un rol.',
    'error-country-message': 'Por favor seleccione su país.',
    'error-state-message': 'Seleccione su estado o territorio.',
    'error-district-message':
      'Por favor, seleccione su distrito / charter de la lista o proporcionarlo en \'Otro\'.'
  },
  'gru-user-sign-up-cancel': {
    title: '¿Dejar el registro?',
    'exit?': '¿Seguro que quieres salir?',
    registration_incomplete: 'Su registro no está completo.',
    leave: 'Dejar el registro',
    continue: 'Continuar con Registro'
  },
  login: {
    title: '¡Dar una buena acogida!',
    description: 'El aprendizaje está a la vuelta de la esquina.',
    'title-session-ends': 'Su sesión ha caducado.',
    'description-session-ends': 'Por Favor regístrese.',
    gooruAccountTitle: 'Inicie sesión en su cuenta de Gooru',
    googleButton: 'Inicia sesión con Google',
    or: 'O',
    haveAccount: '¿Tiene usted una cuenta?',
    signUpHere: '¡Registrate aquí!',
    forgotPassword: '¿Olvidaste tu contraseña?',
    password: 'Contraseña',
    usernameOrEmail: 'Nombre de usuario o correo electrónico',
    'log-in': 'Iniciar sesión'
  },
  'forgot-password': {
    description: 'Nos pasa a todos.',
    usernameOrEmail: 'Por favor introduzca su correo electrónico',
    'footer-google-description-1':
      'Prueba a iniciar sesión de nuevo pulsando <a href=\'/sign-in\'>\'Iniciar sesión con Google\'.</a>',
    'footer-description-1':
      'Recibirá un correo electrónico con un enlace para restablecer su contraseña.',
    'footer-description-2': 'Si tiene alguna pregunta, póngase en contacto con',
    mail: 'Support@gooru.org',
    'error-email-not-exists':
      'Lo sentimos, no reconocemos este correo electrónico.',
    secondStepTitle: 'Consultar su correo electrónico',
    'secondStepDescription-1':
      'Te hemos enviado un correo electrónico con un enlace para restablecer tu contraseña.',
    'secondStepDescription-2':
      'Si tiene alguna pregunta, póngase en contacto con'
  },
  'reset-password': {
    'new-password': 'Introduzca su nueva contraseña',
    'new-password-confirm': 'Confirmar la contraseña',
    title: 'Restablecer la contraseña'
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
      'Gooru se ha comprometido a mantener su plataforma de código abierto y comunidad CC0 contenido creado.',
    company: 'Empresa',
    community: 'Comunidad',
    legal: 'Legal',
    connect: 'Conectar',
    aboutGooru: 'Acerca de Gooru',
    careers: 'Carreras',
    supportCenter: 'Centro de Apoyo',
    contactUs: 'Contáctenos',
    districts: 'Distritos',
    partners: 'Fogonadura',
    coaches: 'Entrenadores',
    events: 'Eventos',
    terms: 'Condiciones',
    privacy: 'Intimidad',
    Copyright: 'Derechos de autor'
  },
  'grade-dropdown': {
    placeholder: 'Grado (s)',
    prompt: 'Seleccione un grado',
    'pre-k': 'Pre-k',
    elementary: 'Elemental',
    'middle-school': 'Escuela intermedia',
    'high-school': 'Escuela secundaria',
    'higher-ed': 'Ed más alto',
    k: 'K',
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
    placeholder: 'Navegar por Estándar'
  },
  'subject-dropdown': {
    placeholder: 'asignaturas)',
    prompt: 'Seleccione un tema'
  },
  'search-filter': {
    courses: 'Cursos',
    collections: 'Colecciones',
    resources: 'Recursos',
    assessments: 'Evaluaciones',
    questions: 'Preguntas',
    rubrics: 'Rúbricas',
    'question-types': {
      MC: 'Opción multiple',
      FIB: 'Llena el espacio en blanco',
      'T/F': 'Verdadero Falso',
      TOF: 'True or False',
      MA: 'Respuesta múltiple',
      HS_TXT: 'Selección múltiple - Texto',
      HSTXT: 'Multiple Select Text',
      HS_IMG: 'Selección múltiple - Imagen',
      HSIMG: 'Multiple Select Image',
      HT_RO: 'Arrastrar y soltar orden',
      'HT&RO': 'Drag & Drop Order',
      HT_HL: 'Texto en caliente',
      'H-THL': 'Hot-Text Highlight',
      OE: 'Respuesta libre'
    },
    author: {
      placeholder: 'Autor'
    }
  },
  resource: {
    video: 'Vídeo',
    webpage: 'Página web',
    interactive: 'Interactivo',
    question: 'Pregunta',
    image: 'Imagen',
    text: 'Texto',
    audio: 'Audio',
    oer: 'REA'
  },
  'search-result': {
    resource: 'Recurso',
    resources: 'Recursos',
    and: 'y',
    question: 'Pregunta',
    questions: 'Preguntas',
    'in-this-collection': 'En esta colección',
    'search-results-for': 'Buscar resultados para'
  },
  'gru-image-picker': {
    chooseFile: 'Escoge un archivo ...',
    instruction: 'Cargue una imagen de un archivo en su computadora.',
    restriction:
      'La imagen debe ser un archivo JPG, GIF o PNG inferior a 5 MB.',
    submit: 'Usar la imagen'
  },
  'gru-fib': {
    instructions:
      'Escriba su respuesta en el espacio en blanco proporcionado y haga clic en \'{{action}}\'.'
  },
  'gru-hs-image': {
    instructions: 'Seleccione la imagen correcta y haga clic en \'{{action}}\'.'
  },
  'gru-hs-text': {
    instructions:
      'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.'
  },
  'gru-hot-text': {
    instructions:
      'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.'
  },
  'gru-login-prompt': {
    title: '¡Bienvenido a Gooru!',
    instructions: 'Debe iniciar sesión para completar esta acción.',
    'existing-user': '¿Ya tienes una cuenta?',
    'new-user': '¿Nuevo aquí?',
    'not-now': 'Ahora no',
    'sign-in': 'Registrarse'
  },
  'gru-multiple-answer': {
    instructions:
      'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.'
  },
  'gru-multiple-choice': {
    instructions:
      'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.'
  },
  'gru-open-ended': {
    instructions:
      'Escribe tu respuesta en el campo siguiente y haz clic en el botón \'{{action}}\' para guardar tu respuesta cuando hayas terminado.',
    characterLimit: 'Límite de caracteres'
  },
  'gru-question-viewer': {
    answer: 'Responder',
    question: 'Pregunta'
  },
  'gru-true-false': {
    instructions:
      'Seleccione la respuesta correcta y haga clic en \'{{action}}\'.',
    true: 'Cierto',
    false: 'Falso'
  },
  'gru-reorder': {
    instructions:
      'Reorganice las respuestas en el orden correcto y haga clic en \'{{action}}\'.'
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
      'view-report': 'Vista del informe'
    },
    'gru-navigator': {
      'see-usage-report': 'Ver el informe de uso'
    },
    'gru-viewer': {
      'not-iframe-url': {
        header_1: 'Este recurso no se puede ver en Gooru.',
        header_external_assessment_1:
          'This assessment cannot be viewed within Gooru.',
        header_2:
          'Haga clic en el botón de abajo para abrir el recurso en una nueva pestaña.',
        'view-resource': 'Ver Recurso',
        https_external: 'This link cannot be viewed within Gooru.',
        https_new_tab: 'Click the link below to open it in a new tab.',
        footer_1: '¿Por qué estoy viendo esta página en blanco?',
        footer_2:
          'Los recursos añadidos en Gooru provienen de miles de editores diferentes que',
        footer_3:
          'Crear y compartir su contenido. Los recursos tienen una variedad de',
        footer_4:
          'Requisitos que lo llevan a otra página para ver el contenido.'
      }
    }
  },
  'grading-player': {
    answer: 'Submitted Work',
    'back-to': 'Back',
    'current-response': 'Current Response',
    'full-rubric': 'Full Rubric',
    grading: 'Grading',
    level: 'Level',
    roster: 'Roster',
    rubric: 'Rubric',
    'submitted-time': 'Submitted Time',
    points: 'Points',
    prompt: 'Task Prompt',
    'overall-comment': 'Overall Comment',
    'overall-lead': 'Summarize your feedback on the essay as a whole.',
    'time-spent': 'Time Spent',
    'total-score': 'Total Score',
    'student-roster': {
      title: 'Students List',
      lead: 'Have answered this question'
    },
    'rubric-panel': {
      previous: 'Previous Student',
      next: 'Next Student',
      'total-score': 'Total Score',
      points: '({{total}}pts)'
    }
  },
  profile: {
    'gru-navigation': {
      about: 'Acerca de',
      'about-me': 'About Me',
      content: 'Content',
      followers: 'Seguidores',
      library: 'Biblioteca',
      'my-content': 'My Content',
      following: 'Following',
      proficiency: 'Proficiency',
      preference: {
        preference: 'Preference'
      }
    },
    edit: {
      'select-district': 'Seleccione un distrito ...'
    },
    proficiency: {
      'is-empty':
        'No data available yet. Once you begin studying, your data will become available.',
      'expand-chart': 'Expand Chart',
      mastered: 'Mastered',
      'in-progress': 'In Progress',
      'not-started': 'Not Started',
      skyline: 'Skyline',
      baseline: 'Baseline',
      'grade-line': 'Grade Line',
      'not-tagged':
        'The class has no course assigned or the course has not been tagged to a valid subject or standards.',
      'show-compressed-chart': 'Show Compressed Chart',
      'show-expanded-chart': 'Show Expanded Chart'
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
    score: 'Puntuación',
    report: 'Informe',
    completion: 'Terminación',
    timeSpent: 'Hora',
    'time-spent': 'Tiempo usado',
    'study-time': 'Tiempo de estudio',
    reaction: 'Reacción',
    attempts: 'Intento'
  },
  'gru-performance-summary': {
    title: 'Título',
    scores: 'Puntuaciones',
    completion: 'Terminación',
    'time-spent': 'Tiempo Total',
    reaction: 'Reacción',
    attempts: 'Intentos',
    redo: 'Rehacer',
    resume: 'Currículum',
    study: 'Estudia ahora',
    'view-report': 'Vista del informe',
    'not-applicable': 'N / A',
    'not-started': 'No ha comenzado todavía'
  },
  'gru-performance': {
    'no-content': 'No hay contenido disponible'
  },
  'gru-performance-metrics': {
    assessment: 'Evaluación',
    collection: 'Colección',
    completion: 'Terminación',
    report: 'Informe',
    student: 'Estudiante',
    score: 'Puntuación',
    'study-time': 'Tiempo usado'
  },
  'gru-metrics-sub-header': {
    assessment: 'Evaluación',
    student: 'Estudiante',
    score: 'Puntuación',
    report: 'Informe',
    completion: 'Terminación',
    'time-spent': 'Hora'
  },
  'gru-resource-new': {
    'resource-already-exist': 'Este recurso ya existe en Gooru!'
  },
  'gru-assessment-report': {
    'gru-summary': {
      'total-time-spent': 'Tiempo total gastado'
    },
    'hidden-report':
      'Su profesor ha seleccionado ocultar su informe de resumen para esta evaluación.'
  },
  cards: {
    'gru-class-card': {
      student: {
        zero: '{{count}} Estudiante',
        one: '{{count}} Estudiante',
        other: '{{count}} Estudiantes',
        'not-started': 'No empezado'
      },
      unit: {
        zero: 'Sin curso',
        one: 'Unidad {{count}}',
        other: 'Unidades {{count}}'
      },
      archived: {
        'request-report':
          'Esta clase está archivada y no se puede modificar. Se puede acceder a los datos de clase existentes mediante el informe.',
        'report-in-progress':
          'La generación de informes puede tardar hasta 20 min. Por favor, vuelva.',
        'download-report': 'Descargue sus datos para esta clase.',
        'no-report-available':
          'Esta clase no tiene contenido de curso asignado.'
      }
    },
    'gru-course-card': {
      in: 'en',
      units: {
        zero: 'Unidades {{count}}',
        one: 'Unidad {{count}}',
        other: 'Unidades {{count}}'
      },
      resource: {
        zero: '{{Count}} Recursos',
        one: '{{Count}} Recurso',
        other: '{{Count}} Recursos'
      },
      and: 'y',
      question: {
        zero: '{{Count}} Preguntas',
        one: '{{Count}} Pregunta',
        other: '{{Count}} Preguntas'
      },
      'start-studying': 'Empezar a estudiar'
    },
    'gru-collection-card': {
      courses: {
        zero: '{{count}} Cursos',
        one: '{{count}} Curso',
        other: '{{count}} Cursos'
      },
      students: {
        zero: '{{count}} Estudiantes',
        one: '{{count}} Estudiante',
        other: '{{count}} Estudiantes'
      },
      collections: {
        one: '{{count}} Colección',
        other: '{{count}} Colecciones'
      },
      assessments: {
        one: '{{count}} Evaluación',
        other: '{{count}} Evaluaciones'
      },
      classrooms: {
        zero: 'Aulas',
        one: 'Sala de clase',
        other: 'Aulas'
      }
    },
    'gru-resource-card': {
      add: 'Añadir'
    },
    'gru-resource-result-card': {
      skipped: 'Omitido'
    },
    'gru-profile-card': {
      followers: 'Seguidores',
      following: 'Siguiendo'
    },
    'gru-user-network-card': {
      follow: 'Seguir'
    }
  },
  'reports.gru-table-view': {
    'first-tier-header-prefix': 'Q',
    student: 'Estudiante',
    reaction: 'Reacción',
    reactions: 'Reacciones',
    score: 'Puntuación',
    scores: 'Puntuaciones',
    'study-time': 'Tiempo de estudio',
    time: 'Hora',
    'time-spent': 'Tiempo usado',
    totals: 'Total'
  },
  'gru-emotion-picker': {
    'react-to-resource': 'Reaccionar a este recurso'
  },
  home: {
    'no-classes-found': {
      'create-class': {
        title: 'Enseñar con una clase de Gooru',
        description:
          'Crear un aula, asignar contenido e invitar a los estudiantes.',
        'button-text': 'Crear un aula'
      },
      'join-class': {
        title: 'Aprender con un aula de Gooru',
        description:
          'Únase al salón de clases de su maestro para comenzar a aprender.',
        'button-text': 'Introduzca el código del salón de clases'
      },
      'featured-courses': {
        title: 'Cursos destacados',
        description:
          'Examine los cursos de matemáticas, ciencias, estudios sociales y ELA.',
        'button-text': 'Cursos destacados'
      },
      'teacher-toolkit': {
        title: 'Kit de herramientas del profesor',
        description:
          'Este juego de herramientas tiene recursos para ayudarle a empezar.',
        'button-text': 'Kit de herramientas del profesor'
      }
    }
  },
  taxonomy: {
    grades: 'Grades',
    'gru-taxonomy-selector': {
      'add-secondary': 'Agregar secundario',
      'choose-subject': 'Elija el asunto',
      'competency-subject-and-course': 'Marco y Curso de Competencias',
      'primary-subject-and-course': 'Marco y Curso de Normas'
    }
  },
  validations: {
    unsavedChanges:
      'Tus cambios aún no se han guardado. ¿Quieres dejar esta página?'
  },
  featured: {
    'featured-title': 'Cursos destacados',
    'featured-description':
      'Los cursos ofrecidos por Gooru son examinados y revisados, educados por el educador, creados en las aulas y estudiados por los estudiantes. Ellos fueron desarrollados e implementados en escuelas, distritos y charters innovadores, y están diseñados para apoyar el aprendizaje combinado, las aulas volteadas, el aprendizaje basado en proyectos y muchos otros modelos de instrucción. Descubre, remezcla y personaliza cursos para personalizar el aprendizaje y aumentar el compromiso estudiantil. Haga clic aquí para <a href=\'http://about.gooru.org/courses\' target=\'_blank\'>obtener más información</a> sobre el desarrollo de estos cursos.'
  },
  locateme: {
    score: 'Score',
    timespent: 'Time Spent',
    view: 'View',
    attempt: 'Attempt',
    lastAcessesed: 'Last Accessed'
  },
  'taxonomy.modals': {
    'gru-domain-picker': {
      browseSelectorText: '¿Qué dominios cubrirá esta unidad?',
      selectedText: {
        zero: '{{Count}} dominios seleccionados',
        one: '{{Count}} dominio seleccionado',
        other: '{{Count}} dominios seleccionados'
      },
      shortcutText: 'Curso está en'
    },
    'gru-standard-picker': {
      browseSelectorText: '¿Qué estándares serán cubiertos?',
      browseCompetencySelectorText: '¿Qué competencias serán cubiertas?',
      selectedText: {
        zero: '{{Count}} estándares seleccionados',
        one: '{{Count}} estándar seleccionado',
        other: '{{Count}} estándares seleccionados'
      },
      selectedCompetencyText: {
        zero: '{{count}} competencias seleccionadas',
        one: '{{count}} competencia seleccionada',
        other: '{{count}} competencias seleccionadas'
      },
      shortcutText: 'La unidad está etiquetada como'
    }
  },
  'account-settings': {
    title: 'Configuraciones de la cuenta',
    'account-info': 'Informacion de cuenta',
    'private-info': 'Información Privada',
    'email-address': 'Dirección de correo electrónico',
    gender: 'Género',
    birthday: 'Cumpleaños'
  },
  'gru-rich-text-editor': {
    bold: 'Negrita',
    expression: 'Expresión',
    italic: 'Itálico',
    subscript: 'Subíndice',
    superscript: 'Sobrescrito',
    underline: 'Subrayar',
    bullets: 'Bullets',
    'expressions-panel': {
      tabs: {
        calculus: 'Cálculo',
        'greek-letters': 'Letras griegas',
        layout: 'Diseño',
        relation: 'Relación',
        'set-theory': 'Teoría de conjuntos',
        symbols: 'Símbolos',
        trigonometry: 'Trigonometría'
      },
      'insert-expression': 'Insertar',
      'update-expression': 'Actualizar',
      'create-expression': 'Crear expresión'
    }
  },
  'gru-settings-edit': {
    'answerkey-attempts': 'Tecla de respuesta y intentos',
    'answer-key': 'Los estudiantes pueden ver la tecla de respuesta al final',
    attempts: 'Intentos',
    'attempts-unlimited': 'Ilimitado',
    backwards:
      'Los estudiantes pueden navegar hacia atrás y cambiar las respuestas',
    feedback: 'Los estudiantes verán si son correctos / incorrectos',
    'feedback-immediate': 'Por pregunta y al final',
    'feedback-never': 'Nunca',
    'feedback-summary': 'Al final',
    'navigation-scoring': 'Navegación y Puntuación',
    'disable-heading': 'Activar evaluación en el mapa del curso',
    'disable-legend':
      'Los estudiantes pueden jugar la evaluación desde su mapa de cursos'
  },
  'gru-icon-popover': {
    'settings-visibility-title': 'Haga visible su contenido',
    'settings-visibility-content':
      'Esta configuración hace que su contenido sea visible a través de su perfil de usuario. Si desea compartir los cursos, las colecciones, las evaluaciones, los recursos y / o las preguntas que cree con los colegas, le sugerimos que active esta función.'
  },
  'gru-take-tour': {
    text: 'Hacer un tour',
    'teacher-home': {
      stepOne: {
        title: 'Su Página de Inicio',
        description:
          '¡Bienvenidos a la página de inicio de Gooru! Aquí puede encontrar una lista de las aulas que usted crea en Gooru. Las aulas le permiten compartir contenido directamente con los estudiantes. Siempre puedes volver a tu página principal haciendo clic en el icono de Gooru.'
      },
      stepTwo: {
        title: 'Clases en las que enseña o se une',
        description:
          'Todas las aulas que enseña o se une a este año escolar aparecerán aquí bajo Aulas Activas.'
      },
      stepThree: {
        title: 'Crear un aula',
        description:
          'Haga clic aquí para crear un nuevo aula. Una vez que tenga contenido para compartir con los estudiantes, se lo asignará a través de un aula.'
      },
      stepFour: {
        title: 'Tu perfil',
        description:
          'Este es tu perfil. Haz clic en tu perfil en cualquier momento para acceder al contenido que creas o remixas en Gooru.'
      },
      stepFive: {
        title: 'Content Manager',
        description: 'Quick link to create and access your content.'
      },
      stepSix: {
        title: 'Library',
        description: 'Browse our featured courses.'
      },
      stepSeven: {
        title: 'Your Profile',
        description:
          'Access and update your content, user profile, and settings.'
      },
      stepEight: {
        title: 'Support',
        description: 'Access the support center or logout.'
      },
      stepNine: {
        title: 'Classrooms',
        description: 'View a list of classes you are currently teaching.'
      },
      stepTen: {
        title: 'Archived Classes',
        description: 'View a list of classes you taught in the past.'
      },
      stepEleven: {
        title: 'Create Classroom',
        description:
          'Name your classroom and click the button to create a new classroom.'
      }
    },
    'student-home': {
      stepOne: {
        title: 'Tome un Tour Icon',
        description:
          'Bienvenido a Tome un Tour! Esta es tu página personal. Recuerde que siempre puede volver a su página haciendo clic en el logotipo de Gooru. Ahora vamos a empezar!'
      },
      stepFeaturedCourses: {
        title: 'Featured Courses',
        description:
          'Browse the featured courses in the Learning Navigator’s content catalog for topics that interest you.'
      },
      stepTwo: {
        title: 'Anuncios',
        description:
          'Aquí verá anuncios que su maestro o escuela le gustaría que conociera.'
      },
      stepThree: {
        title: 'Search Bar',
        description: 'Search our content catalog for topics that interest you.'
      },
      stepFour: {
        title: 'Aulas',
        description: 'Vea todas las clases en las que está inscrito.'
      },
      stepFive: {
        title: 'Únete al aula',
        description:
          'Para unirse a un nuevo aula, ingrese el código de la clase y se mostrará en &quot;Mis clases&quot;.'
      },
      stepSix: {
        title: 'Aprendizaje independiente',
        description:
          'Explorar y marcar temas que le interesen y que desea obtener más información.'
      },
      stepSeven: {
        title: 'Barra de búsqueda',
        description:
          'Busque en nuestro catálogo de contenido los temas que le interesan.'
      },
      stepEight: {
        title: 'Su Página de Inicio',
        description: 'Vuelva a su página de inicio.'
      },
      stepNine: {
        title: 'Biblioteca',
        description: 'Navegue por nuestros cursos destacados.'
      },
      stepTen: {
        title: 'Actuación',
        description:
          'Vea un resumen de su rendimiento en los cursos en los que está inscrito.'
      },
      stepEleven: {
        title: 'Independent Learning',
        description:
          'Explore the topics you have bookmarked and that you want to learn more about.'
      },
      stepTwelve: {
        title: 'Join Classroom',
        description: 'Enter the classroom code to join a classroom.'
      },
      stepThirteen: {
        title: 'Nombre de usuario',
        description: 'Acceda y actualice su perfil de usuario.'
      },
      stepFourteen: []
    },
    'student-performance': {
      stepOne: {
        title: '¡Bienvenido!',
        description:
          'Bienvenido a su Panel de rendimiento. Puede ver cómo se desempeña en todas las clases y cursos.'
      },
      stepTwo: {
        title: 'Ficha Filtrar',
        description:
          'Haga clic en la flecha para filtrar su rendimiento por actividad, período de tiempo, tema y curso.'
      },
      stepThree: {
        title: 'Actualizar informe',
        description:
          'Una vez que haya seleccionado sus filtros, haga clic en el informe de actualización para mostrar los resultados.'
      },
      stepFour: {
        title: 'Descargar / Imprimir',
        description: 'Descargue su informe.'
      },
      stepFive: {
        title: '¡Terminado!',
        description: 'Adelante y analice su rendimiento!'
      }
    },
    'student-class': {
      stepOne: {
        title: '¡Bienvenido!',
        description:
          'Bienvenido a la página del curso. Aquí encontrará sus actividades diarias, el mapa del curso y los datos de rendimiento. ¡Empecemos!'
      },
      stepTopBar: {
        title: 'Course, Performance, Completion',
        description:
          'See a summary of your course and overall performance so far.'
      },
      stepTwo: {
        title: 'Actividades de Clases Diarias',
        description:
          'Acceda a una lista de actividades asignadas por su maestro. Seleccione las actividades que desea estudiar.'
      },
      stepThree: {
        title: 'Mapa del curso',
        description:
          'Haga clic en las unidades y lecciones para completar las colecciones y evaluaciones en el curso.'
      },
      stepFour: {
        title: 'Mi reporte',
        description: 'Echa un vistazo a su rendimiento general de clase.'
      },
      stepFive: {
        title: '¡Terminado!',
        description:
          'Para empezar, haga clic en la ficha Mapa del curso o Actividades diarias para comenzar a estudiar.'
      }
    },
    'teacher-class': {
      stepOne: {
        title: 'Welcome!',
        description:
          'Welcome to your classroom. Here you will we be able to view and assign your daily class activities, course map, update class information and review student performance data. Let’s get started!'
      },
      stepTopBar: {
        title: 'Course, Performance, Completion',
        description:
          'See a summary of your course and overall student performance so far.'
      },
      stepTwo: {
        title: 'Daily Class Activities',
        description: 'View and assign today’s activities to your students.'
      },
      stepThree: {
        title: 'Course Map',
        description:
          'View or edit the units, lessons, collections or assessments assigned in the course.'
      },
      stepFour: {
        title: 'My Report',
        description:
          'View the summary of how your students are performing in the course and access their reports.'
      },
      stepClassManagement: {
        title: 'Class Management',
        description:
          'Assign or update your class information and students enrolled in the class.'
      },
      stepFive: {
        title: 'Finished!',
        description: 'Now go ahead and share the classroom with your students.'
      }
    },
    'study-player': {
      stepOne: {
        title: '¡Bienvenido!',
        description:
          'Este es tu Jugador de Estudio. Vamos a caminar a través de las funciones disponibles para usted.'
      },
      stepTwo: {
        title: 'Unidad / curso / encabezado de la lección',
        description:
          'Indica dónde se encuentra la colección o evaluación en su curso.'
      },
      stepThree: {
        title: 'Rendimiento / Finalización',
        description:
          'Indica cómo se está realizando y cuánto del curso ha completado.'
      },
      stepFour: {
        title: 'Reaccionar al recurso',
        description:
          'Deje a su profesor saber lo que usted piensa acerca de este recurso.'
      },
      stepFive: {
        title: 'Mapa del curso',
        nuTitle: 'Competencies',
        description:
          'Regrese a su mapa de cursos para ver el contenido adicional del curso.'
      },
      stepSix: {
        title: 'Sugerencias',
        description:
          'Estos son recursos que puede que desee explorar basados ​​en lo que está estudiando actualmente.'
      },
      stepSeven: {
        title: 'Echa un vistazo a estos recursos',
        description: ''
      },
      stepEight: {
        title: '¡Terminado!',
        description: 'Empezar a estudiar!'
      },
      stepNine: {
        title: 'Back To Collection',
        description:
          'Click on the icon at any time to return to your Collection or Assessment.'
      }
    },
    library: {
      stepOne: {
        title: 'Welcome!',
        description: 'Welcome to Libraries in the Learning Navigator.'
      },
      stepTwo: {
        title: 'Featured Courses',
        description:
          'Explore courses developed and implemented in classrooms by educators.'
      },
      stepThree: {
        title: 'Other Libraries',
        description: 'Explore content developed by Gooru’s partners.'
      },
      stepFour: {
        title: 'Preview',
        description: 'Preview the course to see if it is of interest to you.'
      },
      stepFive: {
        title: 'Share',
        description: 'Share this course with others.'
      },
      stepSix: {
        title: 'Bookmark',
        description: 'Bookmark this course to review it later.'
      }
    },
    profile: {
      stepOne: {
        title: 'Welcome!',
        description:
          'Welcome to your Profile. Here you can access your content, personal information and followers.'
      },
      stepTwo: {
        title: 'My Content',
        description: 'Create new content and view the content you have remixed.'
      },
      stepThree: {
        title: 'About Me',
        description:
          'Update your personal information, school information and your profile picture.'
      },
      stepFour: {
        title: 'Goals',
        description:
          'Set and track goals to help you achieve your learning milestones.'
      },
      stepFive: {
        title: 'Followers',
        description:
          'If you like someone’s content, you can follow them. You can also view who is following you.'
      },
      stepSix: {
        title: 'Badges',
        description:
          'Review the badges you have received. You receive a badge if you complete a benchmark assessment assigned by your teacher.'
      }
    }
  },
  'gru-tour': {
    'assessments-settings': {
      stepOne: {
        title: 'Navegación y Puntuación',
        description:
          'Este ajuste determina cómo los estudiantes pueden pasar a través de una evaluación y muestra si sus respuestas son correctas o incorrectas. No les muestra una clave de respuesta.'
      },
      stepTwo: {
        title: 'Clave de respuesta y número de intentos',
        description:
          'Esta configuración permite revelar una clave de respuesta y establece el número de intentos que los estudiantes tienen en la evaluación.'
      }
    },
    overview: {
      stepOne: {
        title: 'Mapa del curso',
        description:
          'El mapa de cursos proporciona a sus estudiantes acceso a todas las evaluaciones y colecciones que les asignan.'
      },
      stepTwo: {
        title: 'Código de clase',
        description:
          'Cada aula que crees tiene un código de clase único. Le dará este código a los estudiantes cuando esté listo para que se unan a su salón de clases y accedan a su contenido.'
      },
      stepThree: {
        title: 'Monitorear Datos de Estudiantes y Clases',
        description:
          'Esto le permite ver los datos de evaluación de la clase y los estudiantes individuales cuando los estudiantes completan las evaluaciones que son parte de un curso.'
      },
      stepFour: {
        title: 'Información del Aula',
        description:
          'Aquí puede editar su nombre de salón de clases, publicar anuncios para sus estudiantes, ver los nombres de los estudiantes matriculados en su clase y eliminar su salón de clases.'
      },
      stepFive: {
        title: 'Edición del contenido del curso',
        description:
          'Cuando usted está en un salón de clases, haga clic aquí para editar cualquier contenido del curso asignado a sus estudiantes.'
      },
      stepSix: {
        title: '¡Supervise el progreso en tiempo real!',
        description:
          'Utilice el panel de control en tiempo real para supervisar el progreso de la clase en una evaluación en tiempo real. <br><br> Haga clic en el icono &quot;Go Live&quot; que se encuentra a la izquierda de cada evaluación para lanzar una evaluación en tiempo real para los estudiantes. <br><br>'
      }
    },
    'quick-start': {
      stepOne: {
        title: 'Navegando por sus aulas',
        description:
          'Esta es una vista de un aula recién creada. Para regresar a un aula en cualquier momento, haga clic en &quot;Aulas&quot; y use el menú desplegable para seleccionar el aula que desea ingresar.'
      },
      stepTwo: {
        title: '¿Empezando? Crear una evaluación!',
        description:
          'Sugerimos crear una evaluación como una forma de empezar con Gooru y evaluar los niveles actuales de comprensión del estudiante en su clase.'
      }
    },
    'real-time': {
      stepOne: {
        title: 'Desglose de las respuestas',
        description:
          'Haga clic en cada pregunta para ver un desglose de cómo respondieron los estudiantes.'
      },
      stepTwo: {
        title: 'Datos Individuales del Estudiante',
        description:
          'Seleccione cada mosaico de estudiantes para ver los informes individuales de datos de los estudiantes.'
      },
      stepThree: {
        title: 'Seleccione una vista',
        description:
          'Seleccione &quot;vista de título&quot; o &quot;vista de lista&quot; para ver las opciones de visualización de datos.'
      },
      stepFour: {
        title: 'Puntuación media',
        description:
          'Ver el promedio de la clase calculado en tiempo real para todas las respuestas.'
      },
      stepFive: {
        title: 'Datos anónimos del proyecto',
        description:
          'Utilice esta opción para proyectar una vista anónima de los datos del estudiante.'
      }
    }
  },
  'gru-course-play': {
    'hide-unit-details': 'Ocultar metadatos de la unidad',
    'view-unit-details': 'Ver metadatos de la unidad',
    performance: 'Actuación'
  },
  'gru-century-skills': {
    legends: {
      hewlett: 'Modelo de aprendizaje más profundo de Hewlett',
      conley: 'Conley Cuatro Llaves',
      framework: 'Marco P21',
      national: 'Centro Nacional de Investigación para la Vida y el Trabajo'
    },
    content: {
      groups: {
        cognitive: 'Principales Habilidades Cognitivas y Estrategias',
        content: 'Conocimiento de Contenido Clave',
        learning: 'Habilidades y técnicas clave de aprendizaje'
      }
    }
  },
  'gru-rubric-edit': {
    'upload-rubric': 'Rúbrica de subida',
    copy: {
      'success-message':
        'You\'ve copied rubric {{title}}. Do you want to edit that Rubric?'
    }
  },
  'gru-rubric-creation': {
    url: 'URL',
    'upload-file': 'Subir archivo',
    'add-category': 'Añadir nueva categoria',
    'gru-preview-url': {
      preview: 'Añadir rúbrica anterior y vista previa aquí'
    },
    'overall-narrative': 'Retroalimentación narrativa general',
    'feedback-guidance': 'Guía de retroalimentación',
    'required-feedback': 'Requiere retroalimentación',
    'feedback-guidance-placeholder':
      'Resuma sus comentarios sobre el ensayo como un todo.',
    'gru-category': {
      'category-title': 'Categoría Título',
      'category-feedback':
        'ex. Al revisar esta categoría, preste mucha atención al propósito del autor.',
      'gru-scoring-levels': {
        '0': 'ex. Competente',
        '1': 'ex. Ejemplar',
        '2': 'ex. BASIC',
        '3': 'ex. Debajo de Básico',
        '4': 'example: No Evidence of Proficiency',
        best: 'Mejor',
        levels: 'Nivel',
        'new-level': 'Agregar nuevo nivel',
        scoring: 'Tanteo',
        worst: 'Peor',
        'name-error': 'Please enter the level title.',
        'score-error': 'Please enter the score value.',
        'no-levels-error': 'Please set a value for at least one level.'
      }
    }
  },
  library: {
    'browse-library': 'Explorar la biblioteca',
    'featured-courses': 'Cursos destacados',
    'gru-library-card': {
      'featured-course': 'Curso destacado'
    },
    'gru-partner-library-card': {
      course: {
        zero: '{{count}} Curso',
        one: '{{count}} Curso',
        other: '{{count}} Cursos'
      },
      collection: {
        zero: '{{count}} Colección',
        one: '{{count}} Colección',
        other: '{{count}} Colecciones'
      },
      assessment: {
        zero: '{{count}} Evaluación',
        one: '{{count}} Evaluación',
        other: '{{count}} Evaluaciones'
      },
      resource: {
        zero: '{{Count}} Recurso',
        one: '{{Count}} Recurso',
        other: '{{Count}} Recursos'
      },
      question: {
        zero: '{{Count}} Pregunta',
        one: '{{Count}} Pregunta',
        other: '{{Count}} Preguntas'
      },
      rubric: {
        zero: 'Rúbrica {{count}}',
        one: 'Rúbrica {{count}}',
        other: 'Rúbricas {{count}}'
      }
    },
    'partner-libraries': 'Bibliotecas asociadas'
  },
  'gru-study-header': {
    'lesson-legend': 'Actualmente estás en la lección',
    'resource-legend': 'Está revisando este recurso.',
    'resources-collection-report': 'Informe de uso de la colección',
    'resources-assessment-report': 'Informe de resumen de la evaluación',
    'check-summary': 'Revise su informe de resumen',
    'check-usage': 'Compruebe su informe de uso',
    'no-suggestions':
      'We\'re working on the best suggestions to support your learning',
    resource: {
      zero: 'Recurso',
      one: 'Recurso',
      other: 'Recursos'
    },
    question: {
      zero: 'Pregunta',
      one: 'Pregunta',
      other: 'Preguntas'
    },
    'suggestions-legend':
      'Para obtener más información, consulte estos recursos.'
  },
  'gru-suggest-test': {
    'pre-test-header': 'Pre-prueba (opcional)',
    'post-test-header': 'Post-prueba (opcional)',
    'backfill-header': 'Colección Sugerida (Opcional)',
    'benchmark-header': 'Prueba de referencia (opcional)',
    'resource-header': 'Recursos sugeridos (Opcional)',
    'signature_collection-header': 'Suggested Collection (Optional)',
    'signature_collection-lead':
      'Based on your performance on this course, the following collection may enhance your understanding.',
    'signature_assessment-header': 'Suggested Assessment (Optional)',
    'signature_assessment-lead':
      'Based on your performance on this course, the following assessment may enhance your understanding.',
    'pre-test-lead':
      'Se sugiere una pre-prueba para medir su comprensión actual de los conceptos de esta lección. El pre-test puede ayudarlo a prepararse para el contenido de la lección. El pre-test no afectará la puntuación de rendimiento de su curso.',
    'post-test-lead':
      'Se sugiere el siguiente post-test para medir su comprensión de la información presentada. La post-prueba no afectará la puntuación de rendimiento de su curso.',
    'backfill-lead':
      'Sobre la base de las respuestas de su pre-prueba, puede ser útil revisar material adicional antes de comenzar la lección. Revisar el material de apoyo puede ayudar a preparar a los estudiantes para aprender material nuevo.',
    'benchmark-lead':
      'Ahora está listo para demostrar su comprensión tomando una evaluación de referencia. Obtendrá una insignia para completar satisfactoriamente el punto de referencia. El punto de referencia no afectará la puntuación de rendimiento del curso.',
    'resource-lead':
      'Sobre la base de su rendimiento en este curso, el siguiente recurso puede mejorar su comprensión.',
    no: 'No, gracias',
    'no-suggestions': 'He aquí un resumen de su rendimiento.',
    take: 'Toma {{type}}',
    'take-signature-collection': 'Study Suggested Collection',
    'take-signature-assessment': 'Study Suggested Assessment',
    'take-backfill-pretest': 'Estudio de la colección sugerida',
    'take-resource': 'Recurso de estudio',
    'end-of-course': 'Has llegado al final del curso.'
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
    'overall-comment': 'Overall Comment',
    'overall-score': 'Overall score',
    prompt: 'Question Prompt'
  },
  'gru-performance-chart': {
    'teacher-tooltip':
      'of your students have completed all the assessments in this lesson'
  },
  report: {
    'external-assessment-report': {
      note:
        'This is an external assessment with student reported scores for the assessment. Individual question level data is not available.',
      wish: 'Congratulations! You scored',
      reference: 'This external assessment can be accessed '
    },
    'external-collection-report': {
      note:
        'This is an external collection with student reported scores for the collection. Individual question level data is not available.',
      wish: 'Congratulations! You scored',
      reference: 'This external collection can be accessed '
    },
    'competency-report': {
      title: 'Competency Report',
      'no-subject': 'No Subject Assigned',
      prerequisites: 'prerequisites',
      'signature-assessments': 'Signature Assessments',
      'signature-collections': 'Signature Collections',
      'show-global-data': 'Show Global Data',
      'show-student-data': 'Show Student Data',
      'show-learning-map': 'Show Learning Map',
      note:
        'Score 80% or more in our signature assessment and show your mastery'
    },
    'domain-report': 'Domain Report'
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
    'your-score': 'Your Score',
    time_spent: 'Time Spent',
    'update-error': 'Problem with updating score',
    'validation-error': 'Enter valid score',
    'enter-score': 'Enter your score here',
    'enter-timeSpent': 'Enter your time spent here',
    'validation-error-time': 'Enter valid time'
  },
  notifications: {
    'notificationlist-header-title': 'NOTIFICATIONS',
    'show-more': 'SHOW MORE',
    type: {
      'teacher-suggestion-title':
        'You have a new teacher suggestion in class : {{ classTitle }}',
      'student-gradable-submission-title':
        'You have {{occurrence}} item(s) to grade in class : {{ classTitle }}',
      'student-self-report-title':
        '{{occurrence}} Student(s) reported performance at class : {{ classTitle }}',
      'teacher-override-title':
        'Teacher has corrected your submission at class : {{ classTitle }}  ',
      'teacher-grading-complete-title':
        'Teacher has graded your submission at class : {{ classTitle }}'
    },
    typeinclass: {
      'teacher-suggestion-title': 'You have a new teacher suggestion',
      'student-gradable-submission-title':
        'You have {{occurrence}} student item(s) to grade',
      'student-self-report-title':
        '{{occurrence}} Student(s) reported performance',
      'teacher-override-title': 'Teacher has corrected your submission',
      'teacher-grading-complete-title':
        'Teacher has graded your submission at class'
    }
  }
});
