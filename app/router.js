import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

var Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {
    path: '/'
  });

  this.route('sign-in');
  this.route('forgot-password');
  this.route('reset-password');
  this.route('sign-up');
  this.route('sign-up-finish');
  this.route('logout');

  this.route('content', function() {
    this.route('assessments', function() {
      this.route('edit', {
        path: '/edit/:assessmentId'
      });
    });

    this.route('activity', function() {
      this.route('edit', { path: '/edit/:lessonId' });
    });

    this.route('collections', function() {
      this.route('edit', {
        path: '/edit/:collectionId'
      });
    });

    this.route('courses', function() {
      this.route('edit', {
        path: '/edit/:courseId'
      });
      this.route('play', {
        path: '/play/:courseId'
      });
    });

    this.route('classes', function() {
      this.route('create');
      this.route('join');
    });

    this.route('resources', function() {
      this.route('edit', {
        path: '/edit/:resourceId'
      });
      this.route('play', {
        path: '/play/:resourceId'
      });
    });

    this.route('questions', function() {
      this.route('edit', {
        path: '/edit/:questionId'
      });
      this.route('play', {
        path: '/play/:questionId'
      });
    });

    this.route('rubric', function() {
      this.route('edit', {
        path: 'edit/:rubricId'
      });
      this.route('preview', {
        path: 'preview/:rubricId'
      });
    });
  });

  this.route('grading-player', {
    path: '/grading'
  });

  this.route('player', {
    path: '/player/:collectionId'
  });

  this.route('study-player-external');

  this.route('study-player', {
    path: '/study-player/course/:courseId'
  });

  this.route('student-locate');

  this.route('resource-player', {
    path: '/study-player/course/:courseId/resource/:resourceId'
  });

  this.route('context-player', {
    path:
      '/player/class/:classId/course/:courseId/unit/:unitId/lesson/:lessonId/collection/:collectionId'
  });

  this.route('student-learner-proficiency', {
    path: '/student-learner-proficiency/:userId'
  });

  this.route(
    'class',
    {
      path: '/class/:classId'
    },
    function() {
      this.route('analytics', function() {
        this.route('performance', function() {
          this.route('teacher', function() {
            this.route('course');
            this.route('unit', {
              path: '/unit/:unitId'
            });
            this.route('lesson', {
              path: '/unit/:unitId/lesson/:lessonId'
            });
            this.route('collection', {
              path: '/unit/:unitId/lesson/:lessonId/collection/:collectionId'
            });
          });
        });
      });
    }
  );

  this.route('reports', function() {
    this.route('collection', {
      path: '/class/:classId/collection/:collectionId'
    });
    this.route('student-collection');
    this.route('study-student-collection');
    this.route('student-collection-analytics');
    this.route('student-open-ended-summary');
  });

  this.route('goals', function() {
    this.route('manage');
  });

  this.route('home');

  this.route('student-home');

  this.route('student-independent-learning', function() {
    this.route('learning-base', {
      path: '/studying'
    });
    this.route('student-bookmarks', {
      path: '/bookmarks'
    });
  });

  this.route('student', function() {
    this.route('performance');
    this.route(
      'class',
      {
        path: '/class/:classId'
      },
      function() {
        this.route('analytics', function() {
          this.route('performance');
        });
        this.route('course-map');
        this.route('milestone', {
          path: '/course-map-milestone'
        });
        this.route('class-activities');
        this.route('performance');
        this.route('setup-in-complete');
        this.route('proficiency');
        this.route('diagnosis-of-knowledge');
        this.route('student-learner-proficiency');
      }
    );
    this.route(
      'independent',
      {
        path: '/course/:courseId'
      },
      function() {
        this.route('course-map');
        this.route('performance');
      }
    );
  });

  this.route('teacher-home');

  this.route('teacher', function() {
    this.route(
      'class',
      {
        path: '/class/:classId'
      },
      function() {
        this.route('class-activities');
        this.route('class-management');
        this.route('course-map');
        this.route('performance');
        this.route('collection', {
          path: '/unit/:unitId/lesson/:lessonId/collection/:collectionId'
        });
        this.route('students');
        this.route('students-proficiency');
        this.route('student-learner-proficiency');
        this.route('add-course');
        this.route('atc');
      }
    );
  });

  this.route('featured');

  this.route('account-settings', {
    path: '/account-settings/:userId'
  });

  this.route('player-external');
  this.route('not-found', {
    path: '/not-found/:entity'
  });
  this.route(
    'profile',
    {
      path: '/:userId'
    },
    function() {
      this.route('about');
      this.route('edit');
      this.route('activity');
      this.route('analytics');
      this.route('preference');

      this.route('network', function() {
        this.route('following');
        this.route('followers');
      });

      this.route('proficiency');
      this.route('portfolio');
    }
  );
  /**
   * IMPORTANT! the profile route should be the last one at this file, so we can handle the app urls
   * and the vanity urls for profiles like www.gooru.org/javier-perez
   */
  this.route('preference');
  this.route('library');
  this.route('library-search');
  this.route('player-offline-activity', {
    path: 'player-offline-activity/:offlineActivityId'
  });
});

export default Router;
