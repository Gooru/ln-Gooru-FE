//  we have to pass local url ../../public/

var fs = require('file-system');
var baseUrl = process.argv.slice(2)[0] || '../../public/';

var translationDatas = {};

var translationNameList = [
  {
    en: 'English'
  },
  {
    sp: 'Español'
  },
  {
    ar: 'عربى'
  },
  {
    mr: 'मराठी'
  },
  {
    kn: 'ಕನ್ನಡ'
  },
  {
    hi: 'हिंदी'
  },
  {
    as: 'অসমীয়া'
  },
  {
    bn: 'বাংলা'
  },
  {
    gu: 'ગુજરાતી'
  },
  {
    ml: 'മല്യാലം'
  },
  {
    or: ' ଓଡ଼ିଆ'
  },
  {
    pa: 'ਪੰਜਾਬੀ'
  },
  {
    ta: 'தமிழ்'
  },
  {
    te: 'తెలుగు'
  }
];

var removeCommands = function(data) {
  let removeConstant = data.replace('window.i18ln', '');
  if (data.indexOf('//eslint-disable-next-line') !== -1) {
    removeConstant = removeConstant.substring(removeConstant.indexOf('\n') + 1);
  }
  return removeConstant;
};

var writeFile = function(url, data) {
  let streams = fs.createWriteStream(url, function() {
    'a';
  });
  streams.write('//eslint-disable-next-line\n');
  streams.write('window.i18ln = {\n');
  let objKeys = Object.keys(data);
  let promiseData = objKeys.map((keys, index) => {
    return new Promise(resolve => {
      var separator = index !== objKeys.length - 1 ? ',' : '';
      streams.write(
        `'${keys}' : "${data[keys].replace(/[\""]/g, '\\"')}"${separator}\n`
      );
      return resolve();
    });
  });
  Promise.all(promiseData).then(() => {
    streams.write('};');
    streams.end();
  });
};

var fileReader = function() {
  let langList = translationNameList.map(lang => {
    return Object.keys(lang)[0];
  });
  var promiseData = langList.map(lang => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        `${baseUrl}assets/locales/${lang}/translations.js`,
        'utf8',
        (err, data) => {
          if (err) {
            reject();
          }
          let langObj;
          eval(`langObj ${removeCommands(data)}`);
          translationDatas[lang] = langObj;
          return resolve(langObj);
        }
      );
    });
  });

  Promise.all(promiseData).then(() => {
    let engLang = Object.keys(translationDatas.en);
    langList.map(lang => {
      if (lang !== 'en') {
        let missingKeys = {};
        let otherLang = Object.keys(translationDatas[lang]);
        let keyPromise = engLang.map(langKey => {
          return new Promise(resolve => {
            if (otherLang.indexOf(langKey) === -1) {
              missingKeys[langKey] = translationDatas.en[langKey];
            }
            return resolve();
          });
        });
        Promise.all(keyPromise).then(() => {
          let missingKeysList = Object.keys(missingKeys);
          if (missingKeysList.length) {
            let updatedList = { ...translationDatas[lang], ...missingKeys };
            writeFile(
              `${baseUrl}assets/locales/${lang}/translations.js`,
              updatedList
            );
          }
        });
      }
    });
  });
};

fileReader();
