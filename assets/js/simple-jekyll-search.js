 !
  * Simple-Jekyll-Search v1.6.0 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2017, Christian Fei
  * Licenciado sob a licença MIT.
  * /

( function () {
/ * globals ActiveXObject: false * /

' use strict '

var  _ $ JSONLoader_2 = {
  carga : carga
}

 carga de função ( localização , retorno de chamada ) {
  var xhr =  getXHR ()
  xhr . aberto ( ' GET ' , localização, verdadeiro )
  xhr . onreadystatechange  =  createStateChangeListener (xhr, callback)
  xhr . enviar ()
}

função  createStateChangeListener ( xhr , callback ) {
   função de retorno () {
    se ( xhr . readyState  ===  4  &&  xhr . status  ===  200 ) {
      tente {
        retorno de chamada ( null , JSON . parse ( xhr . responseText ))
      } catch (err) {
        retorno de chamada (err, null )
      }
    }
  }
}

função  getXHR () {
   janela de retorno . XMLHttpRequest  ?  novo  XMLHttpRequest () :  novo  ActiveXObject ( ' Microsoft.XMLHTTP ' )
}

' use strict '

var  _ $ OptionsValidator_3  =  função  OptionsValidator ( params ) {
  se ( ! validateParams (params)) {
    lançar  novo  erro ( ' - OptionsValidator: opções necessárias ausentes ' )
  }

  se ( ! ( esta  instância do OptionsValidator)) {
    Retornar  novo  OptionsValidator (params)
  }

  var requiredOptions =  params . requeridos

  isso . getRequiredOptions  =  function () {
    retorno obrigatórioOpções
  }

  isso . validate  =  function ( parameters ) {
    var errors = []
    ObrigadoOpções . forEach ( function ( requiredOptionName ) {
      se ( tipo de parâmetros [requiredOptionName] ===  ' indefinido ' ) {
        erros . push (requiredOptionName)
      }
    })
    erros de retorno
  }

  função  validateParams ( params ) {
    se ( ! params) {
      retornar  falso
    }
    retornar  tipo de  params . obrigatório  ! ==  ' indefinido '  &&  params . instância requerida do  Array 
  }
}

" uso rigoroso " ;

função  fuzzysearch ( agulha , palheiro ) {
  var tlen =  palheiro . comprimento ;
  var qlen =  agulha . comprimento ;
  se (qlen > tlen) {
    retornar  falso ;
  }
  se (qlen === tlen) {
    Agulha de retorno === palheiro;
  }
  exterior :  para ( var i =  0 , j =  0 ; i < qlen; i ++ ) {
    var nch =  agulha . charCodeAt (i);
    enquanto (j < tlen) {
      se ( haystack . charCodeAt (j ++ ) === nch) {
        continuar exterior;
      }
    }
    retornar  falso ;
  }
  retornar  verdadeiro ;
}

var _ $ fuzzysearch_1 = fuzzysearch;

' use strict '

/ * removido: var _ $ fuzzysearch_1 = require ('fuzzysearch') * / ;

var  _ $ FuzzySearchStrategy_5 =  novo  FuzzySearchStrategy ()

função  FuzzySearchStrategy () {
  isso . match  =  function ( string , crit ) {
    retornar  _ $ fuzzysearch_1 (crit, string)
  }
}

' use strict '

var  _ $ LiteralSearchStrategy_6 =  new  LiteralSearchStrategy ()

função  LiteralSearchStrategy () {
  this.matches = function (str, crit) {
    if (typeof str !== 'string') {
      return false
    }
    str = str.trim()
    return str.toLowerCase().indexOf(crit.toLowerCase()) >= 0
  }
}

'use strict'

var _$Repository_4 = {
  put: put,
  clear: clear,
  search: search,
  setOptions: setOptions
}

/* removed: var _$FuzzySearchStrategy_5 = require('./SearchStrategies/FuzzySearchStrategy') */;
/* removed: var _$LiteralSearchStrategy_6 = require('./SearchStrategies/LiteralSearchStrategy') */;

var data = []
var opt = {}

opt.fuzzy = false
opt.limit = 10
opt . searchStrategy  =  opt . fuzzy  ?  _ $ FuzzySearchStrategy_5 :  _ $ LiteralSearchStrategy_6

função  colocada ( dados ) {
  se ( isObject (dados)) {
    return  addObject (dados)
  }
  se ( isArray (dados)) {
    retornar  addArray (dados)
  }
  retorno  indefinido
}
função  clara () {
  dados . comprimento  =  0
  retornar dados
}

function  isObject ( obj ) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject(_data) {
  data.push(_data)
  return data
}

function addArray(_data) {
  var added = []
  for (var i = 0, len = _data.length; i < len; i++) {
    if (isObject(_data[i])) {
      added.push(addObject(_data[i]))
    }
  }
  return added
}

function search(crit) {
  if (!crit) {
    return []
  }
  return findMatches(data, crit, opt.searchStrategy, opt)
}

function setOptions(_opt) {
  opt = _opt || {}

  opt.fuzzy = _opt.fuzzy || false
  opt.limit = _opt.limit || 10
  opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
}

function findMatches(data, crit, strategy, opt) {
  var matches = []
  for (var i = 0; i < data.length && matches.length < opt.limit; i++) {
    var match = findMatchesInObject(data[i], crit, strategy, opt)
    if (match) {
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject(obj, crit, strategy, opt) {
  for (var key in obj) {
    if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
      return obj
    }
  }
}

function isExcluded(term, excludedTerms) {
  var excluded = false
  excludedTerms = excludedTerms || []
  for (var i = 0, len = excludedTerms.length; i < len; i++) {
    var excludedTerm = excludedTerms[i]
    if (!excluded && new RegExp(term).test(excludedTerm)) {
      excluded = true
    }
  }
  return excluded
}

'use strict'

var _$Templater_7 = {
  compile: compile,
  setOptions: __setOptions_7
}

var options = {}
options.pattern = /\{(.*?)\}/g
options.template = ''
options.middleware = function () {}

function __setOptions_7(_options) {
  options.pattern = _options.pattern || options.pattern
  options.template = _options.template || options.template
  if (typeof _options.middleware === 'function') {
    options.middleware = _options.middleware
  }
}

function compile(data) {
  return options.template.replace(options.pattern, function (match, prop) {
    var value = options.middleware(prop, data[prop], options.template)
    if (typeof value !== 'undefined') {
      return value
    }
    return data[prop] || match
  })
}

'use strict'

var _$utils_9 = {
  merge: merge,
  isJSON: isJSON
}

function merge(defaultParams, mergeParams) {
  var mergedOptions = {}
  for (var option in defaultParams) {
    if (Object.prototype.hasOwnProperty.call(defaultParams, option)) {
      mergedOptions[option] = defaultParams[option]
      if (typeof mergeParams[option] !== 'undefined') {
        mergedOptions[option] = mergeParams[option]
      }
    }
  }
  return mergedOptions
}

function isJSON(json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

var _$src_8 = {};
(function (window) {
  'use strict'

  var options = {
    searchInput: null,
    resultsContainer: null,
    json: [],
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware: function () {},
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  }

  var requiredOptions = ['searchInput', 'resultsContainer', 'json']

  /* removed: var _$Templater_7 = require('./Templater') */;
  /* removed: var _$Repository_4 = require('./Repository') */;
  /* removed: var _$JSONLoader_2 = require('./JSONLoader') */;
  var optionsValidator = _$OptionsValidator_3({
    required: requiredOptions
  })
  /* removed: var _$utils_9 = require('./utils') */;

  /*
    Public API
  */
  window.SimpleJekyllSearch = function (_options) {
    var errors = optionsValidator.validate(_options)
    if (errors.length > 0) {
      throwError('You must specify the following required options: ' + requiredOptions)
    }

    options = _$utils_9.merge(options, _options)

    _$Templater_7.setOptions({
      template: options.searchResultTemplate,
      middleware: options.templateMiddleware
    })

    _$Repository_4.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit
    })

    if (_$utils_9.isJSON(options.json)) {
      initWithJSON(options.json)
    } else {
      initWithURL(options.json)
    }

    return {
      search: search
    }
  }

  // For backwards compatibility
  window.SimpleJekyllSearch.init = window.SimpleJekyllSearch

  if (typeof window.SimpleJekyllSearchInit === 'function') {
    window.SimpleJekyllSearchInit.call(this, window.SimpleJekyllSearch)
  }

  function initWithJSON(json) {
    _$Repository_4.put(json)
    registerInput()
  }

  function initWithURL(url) {
    _$JSONLoader_2.load(url, function (err, json) {
      if (err) {
        throwError('failed to get JSON (' + url + ')')
      }
      initWithJSON(json)
    })
  }

  function emptyResultsContainer() {
    options.resultsContainer.innerHTML = ''
  }

  function appendToResultsContainer(text) {
    options.resultsContainer.innerHTML += text
  }

  function registerInput() {
    options.searchInput.addEventListener('keyup', function (e) {
      if (isWhitelistedKey(e.which)) {
        emptyResultsContainer()
        search(e.target.value)
      }
    })
  }

  function search(query) {
    if (isValidQuery(query)) {
      render(_$Repository_4.search(query))
    }
  }

  function render(results) {
    var len = results.length
    if (len === 0) {
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < len; i++) {
      appendToResultsContainer(_$Templater_7.compile(results[i]))
    }
  }

  function isValidQuery(query) {
    return query && query.length > 0
  }

  function isWhitelistedKey(key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
  }

  function throwError(message) {
    throw new Error('SimpleJekyllSearch --- ' + message)
  }
})(window)

}());
