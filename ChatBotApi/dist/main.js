/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/clone/clone.js":
/*!*************************************!*\
  !*** ./node_modules/clone/clone.js ***!
  \*************************************/
/***/ ((module) => {

eval("var clone = (function() {\n'use strict';\n\n/**\n * Clones (copies) an Object using deep copying.\n *\n * This function supports circular references by default, but if you are certain\n * there are no circular references in your object, you can save some CPU time\n * by calling clone(obj, false).\n *\n * Caution: if `circular` is false and `parent` contains circular references,\n * your program may enter an infinite loop and crash.\n *\n * @param `parent` - the object to be cloned\n * @param `circular` - set to true if the object to be cloned may contain\n *    circular references. (optional - true by default)\n * @param `depth` - set to a number if the object is only to be cloned to\n *    a particular depth. (optional - defaults to Infinity)\n * @param `prototype` - sets the prototype to be used when cloning an object.\n *    (optional - defaults to parent prototype).\n*/\nfunction clone(parent, circular, depth, prototype) {\n  var filter;\n  if (typeof circular === 'object') {\n    depth = circular.depth;\n    prototype = circular.prototype;\n    filter = circular.filter;\n    circular = circular.circular\n  }\n  // maintain two arrays for circular references, where corresponding parents\n  // and children have the same index\n  var allParents = [];\n  var allChildren = [];\n\n  var useBuffer = typeof Buffer != 'undefined';\n\n  if (typeof circular == 'undefined')\n    circular = true;\n\n  if (typeof depth == 'undefined')\n    depth = Infinity;\n\n  // recurse this function so we don't reset allParents and allChildren\n  function _clone(parent, depth) {\n    // cloning null always returns null\n    if (parent === null)\n      return null;\n\n    if (depth == 0)\n      return parent;\n\n    var child;\n    var proto;\n    if (typeof parent != 'object') {\n      return parent;\n    }\n\n    if (clone.__isArray(parent)) {\n      child = [];\n    } else if (clone.__isRegExp(parent)) {\n      child = new RegExp(parent.source, __getRegExpFlags(parent));\n      if (parent.lastIndex) child.lastIndex = parent.lastIndex;\n    } else if (clone.__isDate(parent)) {\n      child = new Date(parent.getTime());\n    } else if (useBuffer && Buffer.isBuffer(parent)) {\n      if (Buffer.allocUnsafe) {\n        // Node.js >= 4.5.0\n        child = Buffer.allocUnsafe(parent.length);\n      } else {\n        // Older Node.js versions\n        child = new Buffer(parent.length);\n      }\n      parent.copy(child);\n      return child;\n    } else {\n      if (typeof prototype == 'undefined') {\n        proto = Object.getPrototypeOf(parent);\n        child = Object.create(proto);\n      }\n      else {\n        child = Object.create(prototype);\n        proto = prototype;\n      }\n    }\n\n    if (circular) {\n      var index = allParents.indexOf(parent);\n\n      if (index != -1) {\n        return allChildren[index];\n      }\n      allParents.push(parent);\n      allChildren.push(child);\n    }\n\n    for (var i in parent) {\n      var attrs;\n      if (proto) {\n        attrs = Object.getOwnPropertyDescriptor(proto, i);\n      }\n\n      if (attrs && attrs.set == null) {\n        continue;\n      }\n      child[i] = _clone(parent[i], depth - 1);\n    }\n\n    return child;\n  }\n\n  return _clone(parent, depth);\n}\n\n/**\n * Simple flat clone using prototype, accepts only objects, usefull for property\n * override on FLAT configuration object (no nested props).\n *\n * USE WITH CAUTION! This may not behave as you wish if you do not know how this\n * works.\n */\nclone.clonePrototype = function clonePrototype(parent) {\n  if (parent === null)\n    return null;\n\n  var c = function () {};\n  c.prototype = parent;\n  return new c();\n};\n\n// private utility functions\n\nfunction __objToStr(o) {\n  return Object.prototype.toString.call(o);\n};\nclone.__objToStr = __objToStr;\n\nfunction __isDate(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Date]';\n};\nclone.__isDate = __isDate;\n\nfunction __isArray(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Array]';\n};\nclone.__isArray = __isArray;\n\nfunction __isRegExp(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';\n};\nclone.__isRegExp = __isRegExp;\n\nfunction __getRegExpFlags(re) {\n  var flags = '';\n  if (re.global) flags += 'g';\n  if (re.ignoreCase) flags += 'i';\n  if (re.multiline) flags += 'm';\n  return flags;\n};\nclone.__getRegExpFlags = __getRegExpFlags;\n\nreturn clone;\n})();\n\nif ( true && module.exports) {\n  module.exports = clone;\n}\n\n\n//# sourceURL=webpack://practice/./node_modules/clone/clone.js?");

/***/ }),

/***/ "./node_modules/common-errors/index.js":
/*!*********************************************!*\
  !*** ./node_modules/common-errors/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var util = __webpack_require__(/*! util */ \"util\");\n\nvar exports = module.exports = {\n  helpers: {\n    generateClass: __webpack_require__(/*! ./lib/helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\")\n  },\n  middleware: {\n    errorHandler: __webpack_require__(/*! ./lib/middleware/errorHandler */ \"./node_modules/common-errors/lib/middleware/errorHandler.js\"),\n    crashProtector: __webpack_require__(/*! ./lib/middleware/crashProtector */ \"./node_modules/common-errors/lib/middleware/crashProtector.js\")\n  }\n};\n\nexports.AlreadyInUseError = exports.AlreadyInUse = __webpack_require__(/*! ./lib/alreadyInUse */ \"./node_modules/common-errors/lib/alreadyInUse.js\");\nexports.ArgumentError = exports.Argument = __webpack_require__(/*! ./lib/argument */ \"./node_modules/common-errors/lib/argument.js\");\nexports.ArgumentNullError = exports.ArgumentNull = __webpack_require__(/*! ./lib/argumentNull */ \"./node_modules/common-errors/lib/argumentNull.js\");\nexports.AuthenticationRequiredError = exports.AuthenticationRequired = __webpack_require__(/*! ./lib/authenticationRequired */ \"./node_modules/common-errors/lib/authenticationRequired.js\");\nexports.Error = exports.helpers.generateClass('Error');\nexports.HttpStatusError = exports.HttpStatus = __webpack_require__(/*! ./lib/http-status */ \"./node_modules/common-errors/lib/http-status.js\");\nexports.NotFoundError = __webpack_require__(/*! ./lib/not-found */ \"./node_modules/common-errors/lib/not-found.js\");\nexports.NotImplementedError = exports.helpers.generateClass('NotImplementedError'),\nexports.NotSupportedError = exports.NotSupported = __webpack_require__(/*! ./lib/not-supported */ \"./node_modules/common-errors/lib/not-supported.js\");\nexports.NotPermittedError = exports.NotPermitted = __webpack_require__(/*! ./lib/notPermitted */ \"./node_modules/common-errors/lib/notPermitted.js\");\nexports.OutOfMemoryError = exports.helpers.generateClass('OutOfMemoryError');\nexports.RangeError = exports.helpers.generateClass('RangeError', { extends: RangeError });\nexports.ReferenceError = exports.helpers.generateClass('ReferenceError', { extends: ReferenceError });\nexports.StackOverflowError = exports.helpers.generateClass('StackOverflowError');\nexports.SyntaxError = exports.helpers.generateClass('SyntaxError', { extends: SyntaxError });\nexports.TypeError = exports.helpers.generateClass('TypeError', { extends: TypeError });\nexports.URIError = exports.helpers.generateClass('URIError', { extends: URIError });\nexports.ValidationError = exports.Validation = __webpack_require__(/*! ./lib/validation */ \"./node_modules/common-errors/lib/validation.js\");\n\nexports.io = {\n  IOError: __webpack_require__(/*! ./lib/io/io */ \"./node_modules/common-errors/lib/io/io.js\")\n};\nexports.io.DirectoryNotFoundError = exports.helpers.generateClass('DirectoryNotFoundError', { extends: exports.io.IOError });\nexports.io.DriveNotFoundError = exports.helpers.generateClass('DriveNotFoundError', { extends: exports.io.IOError });\nexports.io.EndOfStreamError = exports.helpers.generateClass('EndOfStreamError', { extends: exports.io.IOError });\nexports.io.FileLoadError = __webpack_require__(/*! ./lib/io/file-load */ \"./node_modules/common-errors/lib/io/file-load.js\");\nexports.io.FileNotFoundError = __webpack_require__(/*! ./lib/io/file-not-found */ \"./node_modules/common-errors/lib/io/file-not-found.js\");\n\n\nexports.Generic = exports.helpers.generateClass('GenericError'); //deprecated\n\n\nvar logErrorDeprecationWarning = false;\nmodule.exports.logError = function(err, cb) {\n  if (!logErrorDeprecationWarning) console.warn(\"logError is deprecated.  Use log instead.\");\n  logErrorDeprecationWarning = true;\n\n  if (err && !err.isLogged) {\n    err.isLogged = true;\n    console.error(err);\n  }\n  if (cb) cb(err);\n};\n\nmodule.exports.log = function(err, message) {\n  if (typeof err == 'string') {\n    err = new module.exports.Error(err);\n  } else {\n    if (message) {\n      err.message = message;\n    }\n    err = module.exports.prependCurrentStack(err, 3);\n  }\n  if (err) {\n    console.error(err && err.stack || err);\n    err.isLogged = true;\n  }\n  return err;\n}\n\nmodule.exports.prependCurrentStack = function(err, offset_) {\n  var linesToSkip = (typeof offset_ === 'undefined') ? 2 : offset_;\n  var stackToPrepend = (new Error()).stack.split(\"\\n\").slice(linesToSkip);\n  var mainStack = (err.stack || '').split(\"\\n\");\n  var errTitle = mainStack.shift();\n  err.stack = [errTitle].concat(stackToPrepend, \"====\", mainStack).join(\"\\n\");\n  return err;\n};\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/index.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/alreadyInUse.js":
/*!********************************************************!*\
  !*** ./node_modules/common-errors/lib/alreadyInUse.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"AlreadyInUseError\", {\n  args: ['entity_name', 'arg1', 'arg2', 'arg3', 'arg4'],\n  generateMessage: function(){\n    var args = Array.prototype.slice.call(this.args, 1);\n    return \"The specified '\" + this.entity_name + \"' value is already in use for: \" + args.join(', ');\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/alreadyInUse.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/argument.js":
/*!****************************************************!*\
  !*** ./node_modules/common-errors/lib/argument.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"ArgumentError\", {\n  args: ['argumentName', 'inner_error'],\n  generateMessage: function(){\n    return \"Invalid or missing argument supplied: \" + this.argumentName;\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/argument.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/argumentNull.js":
/*!********************************************************!*\
  !*** ./node_modules/common-errors/lib/argumentNull.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"ArgumentNullError\", {\n  args: ['argumentName', 'inner_error'],\n  extends: __webpack_require__(/*! ./argument */ \"./node_modules/common-errors/lib/argument.js\"),\n  generateMessage: function(){\n    return \"Missing argument: \" + this.argumentName;\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/argumentNull.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/authenticationRequired.js":
/*!******************************************************************!*\
  !*** ./node_modules/common-errors/lib/authenticationRequired.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"AuthenticationRequiredError\", {\n  args: ['message', 'inner_error'],\n  generateMessage: function(){\n    return \"An attempt was made to perform an operation without authentication: \" + this.message;\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/authenticationRequired.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/helpers/class-generator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/common-errors/lib/helpers/class-generator.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var util = __webpack_require__(/*! util */ \"util\");\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\nvar globalize = __webpack_require__(/*! ../internal/globalize */ \"./node_modules/common-errors/lib/internal/globalize.js\");\n\nmodule.exports = function generateErrorClass(name, options){\n  options = options || {};\n  if(options.subclass) console.warn(\"options.subclass is deprecated. use options.extends instead.\");\n  options.extends = options.extends || options.subclass || Error;\n  options.args = options.args || ['message', 'inner_error'];\n  options.generateMessage = options.generateMessage || null;\n  options.globalize = options.globalize === false ? false : true;\n\n  validateInput(name);\n  validateArrayInput(options.args);\n\n  var classConstructor = function classConstructor(){\n    Class.super_.call(this);\n    if(this.global_initialize) this.global_initialize(Class);\n\n    this.args = arguments;\n    for(var i = 0; i<options.args.length; i++){\n      this[options.args[i]] = arguments[i];\n    }\n    this.name = name;\n    if(this.generateMessage) this.message = this.generateMessage();\n    Class.captureStackTrace(this, Class);\n  };\n\n  var classGeneratorFn = new Function('classConstructor',\n    \"return function \" + name + \"(\" + options.args.join(', ') + \"){ classConstructor.apply(this, arguments); };\"\n  );\n  var Class = classGeneratorFn(classConstructor);\n\n  util.inherits(Class, options.extends);\n\n  Class.prototype.generateMessage = options.generateMessage;\n\n  Class.captureStackTrace = function captureStackTrace(error, error_class){\n    Error.captureStackTrace(error, error_class);\n    if(error.inner_error && error.inner_error.stack) error.stack += \"\\n--- inner error ---\\n\" + error.inner_error.stack;\n  }\n\n  if(options.globalize) globalize(Class);\n  return Class;\n}\n\nvar validateInput = function validateInput(str){\n  if(typeof str != 'string' || !/^[\\-\\w]+$/.test(str)) throw new Error(\"Unsafe or invalid string '\" + (str || '').toString() + \"' used to generate Error class.\");\n}\nvar validateArrayInput = function validateArrayInput(array){\n  if(!array || !Array.isArray(array)) throw new Error(\"Unsafe or invalid args used to generate Error class.\");\n  for(var i = 0; i<array.length; i++) validateInput(array[i]);\n}\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/helpers/class-generator.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/http-status.js":
/*!*******************************************************!*\
  !*** ./node_modules/common-errors/lib/http-status.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var util = __webpack_require__(/*! util */ \"util\");\n\nvar STATUS_CODE_ATTRIBUTE_NAME = module.exports.STATUS_CODE_ATTRIBUTE_NAME = 'status';\n\nvar HttpStatusError = module.exports = function HttpStatusError(status_code, message) {\n  if(typeof message == 'number' && typeof status_code != 'number') {\n    //old interface, so swap.\n    var c = message;\n    message = status_code;\n    status_code = c;\n  } else if(status_code instanceof Error) {\n    var err = status_code;\n    var req = message;\n    status_code = err[STATUS_CODE_ATTRIBUTE_NAME];\n    if(typeof status_code != \"number\") {\n      status_code = code_map[err.name];\n      if(typeof status_code == \"function\") {\n        status_code(err, req);\n        status_code = err.status_code;\n      }\n      status_code = status_code || 500;\n    } \n    message = err.message;\n    this.stack = err.stack;\n  }\n\n  this.status_code = this.statusCode = this[STATUS_CODE_ATTRIBUTE_NAME] = status_code || 500;\n  this.name = \"HttpStatusError\";\n\n  var http_message = \"(\" + this.status_code + \") \" + message_map[status_code] || 0;\n  this.message = message || http_message;\n  if(!this.stack) Error.captureStackTrace(this, HttpStatusError);\n  if(message) this.stack = http_message + \"\\n\" + this.stack;\n}\nutil.inherits(HttpStatusError, Error);\n\nvar code_map = HttpStatusError.code_map = {\n  \"ValidationError\": 400,\n  \"ArgumentError\": 400,\n  \"AuthenticationRequiredError\": 401,\n  \"NotPermittedError\": 403,\n  \"ArgumentNullError\": function(err, req){\n    var method = req && req.method || 'GET';\n    var params = req && req.params || {};\n    var route_path = req && req.route && req.route.path || '';\n\n    if(/GET|HEAD/i.test(method) || params.hasOwnProperty(err.argumentName) || new RegExp(\":\" + err.argumentName + '').test(route_path + '/')) err.status_code = 404;\n    else err.status_code = 400;\n    err.message = err.message.replace(new RegExp(\"^Missing argument: (\" + err.argumentName + \")$\"), 'Not Found: \"$1\"' );\n  },\n  \"NotFoundError\": 404,\n  \"NotSupportedError\": 405,\n  \"AlreadyInUseError\": 409,\n};\n\nvar message_map = HttpStatusError.message_map = {\n  400: \"Bad Request!\",\n  401: \"Authentication Required!\",\n  402: \"Payment Required!\",\n  403: \"Forbidden!\",\n  404: \"Not Found!\",\n  405: \"Method not Allowed!\",\n  406: \"Response Type Not Acceptable!\",\n  407: \"Proxy Authentication Required!\",\n  408: \"Request Timeout!\",\n  409: \"Conflict!\",\n  410: \"Gone!\",\n  411: \"Content-Length Required!\",\n  412: \"Precondition Failed!\",\n  413: \"Request Entity Too Lage!\",\n  414: \"Request URI Too Long!\",\n  415: \"Unsupported Media Type!\",\n  416: \"Requested Range Not Satisfiable!\",\n  417: \"Expectation Failed!\",\n  429: \"Too Many Requests!\",\n  500: \"Internal Server Error!\",\n  501: \"Not Implemented!\",\n  502: \"Bad Gateway!\",\n  503: \"Service Unavailable!\",\n  504: \"Gateway Timeout!\",\n  505: \"HTTP Version Not Supported!\"\n};\n\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/http-status.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/internal/globalize.js":
/*!**************************************************************!*\
  !*** ./node_modules/common-errors/lib/internal/globalize.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var util = __webpack_require__(/*! util */ \"util\");\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\nvar key = \"__COMMON-ERRORS-TYPES__\";\nvar global_errors = global[key] = global[key] || {};\n\nmodule.exports = function global_extend(Class) {\n  Class.__original_prototype__ = Class.prototype;\n  var global_class = global_errors[Class.name] = global_errors[Class.name] || Class;\n  Class.prototype = Class.__global_prototype__ = global_class.prototype;\n  Class.prototype.global_initialize = Class.prototype.global_initialize || function global_initialize(Class){\n  \t_.extend(this, Class.__original_prototype__);\n  };\n}\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/internal/globalize.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/io/file-load.js":
/*!********************************************************!*\
  !*** ./node_modules/common-errors/lib/io/file-load.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ../helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"FileLoadError\", {\n  args: ['file_name', 'inner_error'],\n  extends: __webpack_require__(/*! ./io */ \"./node_modules/common-errors/lib/io/io.js\"),\n  generateMessage: function(){\n    return \"Unable to load file: \" + this.file_name;\n  }\n});\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/io/file-load.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/io/file-not-found.js":
/*!*************************************************************!*\
  !*** ./node_modules/common-errors/lib/io/file-not-found.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ../helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"FileNotFoundError\", {\n  args: ['file_name', 'inner_error'],\n  extends: __webpack_require__(/*! ./io */ \"./node_modules/common-errors/lib/io/io.js\"),\n  generateMessage: function(){\n    return \"File not found: \" + this.file_name;\n  }\n});\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/io/file-not-found.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/io/io.js":
/*!*************************************************!*\
  !*** ./node_modules/common-errors/lib/io/io.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ../helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\")('IOError');\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/io/io.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/middleware/crashProtector.js":
/*!*********************************************************************!*\
  !*** ./node_modules/common-errors/lib/middleware/crashProtector.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = function (errorHandler){\n  return function crashProtector(req, res, next) {\n    var domain = __webpack_require__(/*! domain */ \"domain\"); //require only if needed, because \"Due to their experimental nature, the Domains features are disabled unless the domain module is loaded at least once.\"\n    var d = domain.create();\n    d.on('error', function(err){ \n      console.error(\"Fatal crash protected!\");\n      d.dispose();\n      if(res.finished || Object.keys(res._headers).length) {\n        console.error(err && err.stack);\n        return res.end();\n      } \n      if(errorHandler) errorHandler(err, req, res);\n      else next(err);\n    });\n    d.run(next);\n  }\n}\n\nvar findErrorHandler = function(app){\n  try {\n    var errorHandler;\n    var foundRouter = false;\n    for(var i=0; i<app.stack; i++){\n      var middleware = app.stack[i];\n      if(foundRouter && middleware.handle.length >= 4) {\n        errorHandler = middleware;\n        break;\n      } else if(app.router === middleware.handle) foundRouter = true;\n    }\n    return errorHandler;\n  } catch(e) {\n    console.error(\"Crash protector error\", e);\n  }\n}\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/middleware/crashProtector.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/middleware/errorHandler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/common-errors/lib/middleware/errorHandler.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var HttpStatusError = __webpack_require__(/*! ../http-status */ \"./node_modules/common-errors/lib/http-status.js\");\n\nmodule.exports = function errorHandler(err, req, res, next){\n  if(!err) {\n    if(next) return next();\n    else return res.end();\n  }\n\n  err = new HttpStatusError(err, req);\n  if(err.status_code >= 500) {\n    console.error(err.stack);\n    err.message = HttpStatusError.message_map[500]; //hide the real error from user agent.\n  }\n\n  res.status(err.status_code).send(err.message);\n}\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/middleware/errorHandler.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/not-found.js":
/*!*****************************************************!*\
  !*** ./node_modules/common-errors/lib/not-found.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"NotFoundError\", {\n  args: ['entity_name', 'inner_error'],\n  generateMessage: function(){\n    return 'Not Found: \"' + this.entity_name + '\"';\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/not-found.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/not-supported.js":
/*!*********************************************************!*\
  !*** ./node_modules/common-errors/lib/not-supported.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"NotSupportedError\", {\n  args: ['message', 'inner_error'],\n  generateMessage: function(){\n    return \"Not Supported: \" + this.message;\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/not-supported.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/notPermitted.js":
/*!********************************************************!*\
  !*** ./node_modules/common-errors/lib/notPermitted.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nmodule.exports = generateClass(\"NotPermittedError\", {\n  args: ['message', 'inner_error'],\n  generateMessage: function(){\n    return \"An attempt was made to perform an operation that is invalid: \" + this.message;\n  }\n})\n\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/notPermitted.js?");

/***/ }),

/***/ "./node_modules/common-errors/lib/validation.js":
/*!******************************************************!*\
  !*** ./node_modules/common-errors/lib/validation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var generateClass = __webpack_require__(/*! ./helpers/class-generator */ \"./node_modules/common-errors/lib/helpers/class-generator.js\");\nvar ArgumentError = __webpack_require__(/*! ./argument */ \"./node_modules/common-errors/lib/argument.js\");\n\nvar ValidationError = module.exports = generateClass(\"ValidationError\", {\n  args: ['message', 'code', 'field']\n});\n\nValidationError.prototype.addError = function addError(error) {\n  this.errors = this.errors || [];\n  this.errors.push(error);\n  return this;\n}\n\nValidationError.prototype.addErrors = function addErrors(errors) {\n  if(!(errors instanceof Array)) throw new ArgumentError(\"errors\");\n  \n  this.errors = this.errors || [];\n  Array.prototype.push.apply(this.errors, errors);\n  return this;\n}\n\nValidationError.prototype.generateMessage = function generateMessage(){\n  return this.message || \"Validation failed.\";\n}\n\nValidationError.prototype.toJSON = function toJSON(){\n  var o = {};\n  if(this.errors) {\n    if(this.message) o.message = this.message;\n    o.errors = this.errors.map(function(error){\n      return error.toJSON();\n    });\n  } else {\n    if(this.message) o.text = this.message;\n    if(this.code) o.code = this.code;\n    if(this.field) o.field = this.field;    \n  }\n  return o;\n}\n\n//# sourceURL=webpack://practice/./node_modules/common-errors/lib/validation.js?");

/***/ }),

/***/ "./node_modules/custom-merge/index.js":
/*!********************************************!*\
  !*** ./node_modules/custom-merge/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nvar clone = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\")\r\n  , log = false\r\n\r\nmodule.exports = function createMerger(options) {\r\n\toptions = options || {}\r\n\toptions.inPlace = options.inPlace !== undefined ? options.inPlace : true\r\n\toptions.deep = options.deep !== undefined ? options.deep : true\r\n\toptions.array = options.array !== undefined ? options.array : 'replace'\r\n\toptions.priority = options.priority !== undefined ? options.priority : 'right'\r\n\toptions.circular = options.circular !== undefined ? options.circular : false\r\n\r\n\treturn function merger(/*a, b, c, d, ...*/) {\r\n\t\ttry{ log = arguments[0].required[0] == 'name' &&  arguments[1].required[0] == 'age' }\r\n\t\tcatch(e) { log = false }\r\n\t\t\r\n\t\tif(arguments.length == 1) \r\n\t\t\treturn arguments[0]\r\n\r\n\t\tvar value = options.inPlace ? arguments[0] : clone(arguments[0])\r\n\r\n\t\tfor(var i = 1, len = arguments.length; i < len; i++) {\r\n\t\t\tmerge(value, arguments[i], 0)\r\n\t\t}\r\n\r\n\t\treturn value\r\n\t}\r\n\r\n\tfunction merge(a, b, level) {\r\n\t\tif(a === undefined) return b\r\n\t\tif(b === undefined) return a\r\n\r\n\t\tif(level == 0 || (isObject(a) && isObject(b) && options.deep)) {\r\n\t\t\tObject.keys(b).forEach(function(key) {\r\n\t\t\t\ta[key] = merge(a[key], b[key], ++level) \r\n\t\t\t})\r\n\t\t\treturn a\r\n\t\t}\r\n\r\n\t\tif(isArray(a) && isArray(b)) {\r\n\t\t\tif(options.array == 'merge') {\r\n\t\t\t\tfor(var i = 0, len = Math.max(a.length, b.length); i < len; i++) {\r\n\t\t\t\t\ta[i] = merge(a[i], b[i], ++level)\r\n\t\t\t\t}\r\n\t\t\t\treturn a\r\n\t\t\t}\r\n\t\t\tif(options.array == 'concat') {\r\n\t\t\t\tb.forEach(function(val) {\r\n\t\t\t\t\ta.push(val)\r\n\t\t\t\t})\r\n\t\t\t\treturn a\r\n\t\t\t}\r\n\t\t\t//options.array == 'replace'\r\n\t\t}\r\n\r\n\t\tif(options.priority == 'left') return a\r\n\t\telse return b //options.priority == 'right'\r\n\t}\r\n\r\n\tfunction isObject(value) {\r\n\t\treturn value && value.constructor === Object\r\n\t}\r\n\r\n\tfunction isArray(value) {\r\n\t\treturn Array.isArray(value)\r\n\t}\r\n}\n\n//# sourceURL=webpack://practice/./node_modules/custom-merge/index.js?");

/***/ }),

/***/ "./node_modules/schema-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/schema-js/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/schema */ \"./node_modules/schema-js/lib/schema.js\")\n\n//# sourceURL=webpack://practice/./node_modules/schema-js/index.js?");

/***/ }),

/***/ "./node_modules/schema-js/lib/schema.js":
/*!**********************************************!*\
  !*** ./node_modules/schema-js/lib/schema.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var clone = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\")\r\n  , sift = __webpack_require__(/*! sift */ \"sift\")\r\n  , util = __webpack_require__(/*! ./util */ \"./node_modules/schema-js/lib/util.js\")\r\n  , merger = __webpack_require__(/*! custom-merge */ \"./node_modules/custom-merge/index.js\")\r\n  , extend = merger({ inPlace:true, deep:true, array:'concat', priority:'right' })\r\n  , defaults = merger({ inPlace:true, deep:true, array:'replace', priority:'left' })\r\n  , JSONPrimitives = [String, Number, Boolean]\r\n  , ValidationError = __webpack_require__(/*! common-errors */ \"./node_modules/common-errors/index.js\").ValidationError\r\n\r\nfunction Schema(definition) {\r\n\tObject.defineProperty(this, 'registeredTypes', {\r\n\t\t  value:{}\r\n\t\t, writable:true\r\n\t\t, configurable:true\r\n\t})\r\n\tdefinition && this.extend(definition)\r\n}\r\n\r\nSchema.prototype.extend = function(definition) {\r\n\textend(this, this.expandDefinition(definition))\r\n\treturn this\r\n}\r\n\r\nSchema.prototype.extendWhen = function(query, definition) {\r\n\tthis.when = this.when || []\r\n\tthis.when.push({ test:sift(query), definition:this.expandDefinition(definition) })\r\n\treturn this\r\n}\r\n\r\nSchema.prototype.getActiveDefinition = function(data) {\r\n\tvar schema = this\r\n\t  , resultingSchema\r\n\r\n\tif(!schema.when || !schema.when.length) return schema\r\n\r\n\tschema.when.forEach(function(when) {\r\n\t\tif(when.test(data)) {\r\n\t\t\tresultingSchema = resultingSchema || clone(schema)\r\n\t\t\textend(resultingSchema, when.definition)\r\n\t\t}\r\n\t})\r\n\r\n\treturn resultingSchema || schema\r\n}\r\n\r\nSchema.prototype.applyDefaults = function(data, options, definition) {\r\n\tvar schema = this\r\n\r\n\tdefinition = definition || this.getActiveDefinition(data)\r\n\r\n\tif(definition.default === undefined)\r\n\t\treturn data\r\n\r\n\tif(data === undefined) {\r\n\t\treturn definition.default\r\n\t}\r\n\t\r\n\tif(util.isObject(data) && definition.type === Object) {\r\n\t\treturn defaults(data, definition.default)\r\n\t}\r\n\r\n\tif(util.isArray(data) && definition.type === Array) {\r\n\t\treturn data.map(function(item) {\r\n\t\t\treturn schema.applyDefaults(item, options, definition.items)\r\n\t\t})\r\n\t}\r\n\t\r\n\treturn data\r\n}\r\n\r\nSchema.ErrorCodes = {\r\n\t  REQUIRED:'REQUIRED'\r\n\t, TYPE:'TYPE'\r\n\t// to be continued...\r\n}\r\n\r\nSchema.prototype.validate = function(data, options, definition) {\r\n\tvar errors = new ValidationError()\r\n\t  , schema = this\r\n\r\n\tdefinition = definition || schema.getActiveDefinition(data)\r\n\toptions = options || {}\r\n\r\n\tif(!util.isExistent(data)) {\r\n\t\tif(!definition.required) return true\r\n\t\tif(util.isNull(data)) {\r\n\t\t\tthrow new ValidationError('Required but got \\'NULL\\'', Schema.ErrorCodes.REQUIRED)\r\n\t\t}\r\n\t\tif(util.isNaN(data)) {\r\n\t\t\tthrow new ValidationError('Required but got \\'NaN\\'', Schema.ErrorCodes.REQUIRED)\r\n\t\t}\r\n\t\tif(util.isUndefined(data)) {\r\n\t\t\tthrow new ValidationError('Required but got \\'undefined\\'', Schema.ErrorCodes.REQUIRED)\r\n\t\t}\r\n\t\tif(util.isEmptyStr(data)) {\r\n\t\t\tthrow new ValidationError('Required but got \\'empty string\\'', Schema.ErrorCodes.REQUIRED)\r\n\t\t}\r\n\t\tthrow new ValidationError('Required failed test for existence', Schema.ErrorCodes.REQUIRED)\r\n\t}\r\n\r\n\tif(!util.typeMatch(data, definition.type)) {\r\n\t\t// build up the error text and throw at end\r\n\t\t// 'expected' \r\n\t\tthrow new ValidationError('expected '+definition.type.name)\r\n\t}\r\n\r\n\tif(util.isObject(data)) {\r\n\t\tObject.keys(data).forEach(function(key) {\r\n\t\t\ttry {\r\n\t\t\t\tschema.validate(data[key], options, definition.properties[key])\r\n\t\t\t} catch(e) {\r\n\t\t\t\tutil.addNestedError(errors, e, key)\r\n\t\t\t}\r\n\t\t})\r\n\t\tdefinition.required && definition.required.forEach(function(key) {\r\n\t\t\tif(!util.isExistent(data[key]))\r\n\t\t\t\terrors.addError(new ValidationError('required'))\r\n\t\t})\r\n\t}\r\n\r\n\tif(util.isArray(data)) {\r\n\t\tdata.forEach(function(item, index) {\r\n\t\t\ttry{\r\n\t\t\t\tschema.validate(item, options, definition.items)\r\n\t\t\t} catch(e) {\r\n\t\t\t\tutil.addNestedError(errors, e, '['+index+']')\r\n\t\t\t}\r\n\t\t})\r\n\t}\r\n\r\n\tif(definition.validators) {\r\n\t\tdefinition.validators.forEach(function(validator) {\r\n\t\t\ttry {\r\n\t\t\t\tvalidator(data)\r\n\t\t\t} catch(e) {\r\n\t\t\t\terrors.addError(e)\r\n\t\t\t}\r\n\t\t})\r\n\t}\r\n\r\n\tif(errors.errors) throw errors\r\n\telse return true\r\n}\r\n\r\nSchema.prototype.expandDefinition = function(definition) {\r\n\tvar schema = this\r\n\t  , required\r\n\r\n\tif(util.isFunction(definition)) {\r\n\t\tdefinition = { type:definition }\r\n\t}\r\n\telse if(util.isArray(definition) && definition.length > 1) {\r\n\t\tdefinition = { type:definition }\r\n\t}\r\n\telse if(util.isArray(definition)) {\r\n\t\tdefinition = { type:Array, items:definition[0] }\r\n\t}\r\n\telse if(util.isObject(definition) && !definition.type) {\r\n\t\tdefinition = { type:Object, properties:definition }\r\n\t}\r\n\r\n\tif(definition.type === Object) {\r\n\t\trequired = []\r\n\t\tObject.keys(definition.properties).forEach(function(key) {\r\n\t\t\tif(!util.is(definition.properties[key], Schema)) {\r\n\t\t\t\tdefinition.properties[key] = schema.expandDefinition(definition.properties[key])\r\n\t\t\t} else {\r\n\t\t\t\tschema.registerTypes(definition.properties[key].registerTypes)\r\n\t\t\t}\r\n\t\t\tif(definition.properties[key].default !== undefined) {\r\n\t\t\t\tdefinition.default = definition.default || {}\r\n\t\t\t\tdefinition.default[key] = definition.properties[key].default\r\n\t\t\t}\r\n\t\t\tif(definition.properties[key].required) {\r\n\t\t\t\trequired.push(key)\r\n\t\t\t}\r\n\t\t})\r\n\t\tif(required.length) {\r\n\t\t\tdefinition.required = definition.required === undefined ? required : definition.required\r\n\t\t}\r\n\t}\r\n\r\n\tif(definition.type === Array) {\r\n\t\tif(!util.is(definition.items, Schema)) {\r\n\t\t\tdefinition.items = schema.expandDefinition(definition.items)\r\n\t\t} else {\r\n\t\t\tschema.registerTypes(definition.items.registerTypes)\r\n\t\t}\r\n\t}\r\n\r\n\tif(Schema.schema) Schema.schema.validate(definition)\r\n\r\n\tif(util.isArray(definition.type)) {\r\n\t\tdefinition.type.forEach(function(type) {\r\n\t\t\tschema.registerType(type)\r\n\t\t})\r\n\t} else {\r\n\t\tschema.registerType(definition.type)\r\n\t}\r\n\r\n\treturn definition\r\n}\r\n\r\nSchema.prototype.registerTypes = function(types) {\r\n\tvar schema = this\r\n\ttypes && Object.keys(types).forEach(function(name) {\r\n\t\tschema.registerType(types[name])\r\n\t})\r\n}\r\n\r\nSchema.prototype.registerType = function(Type) {\r\n\tvar types = this.registeredTypes\r\n\t  , name = Type.name\r\n\t\r\n\tif(types[name] && types[name] != Type)\r\n\t\tthrow new Error('A type named \"'+name+'\" has already been registerd')\r\n\t\r\n\ttypes[name] = Type\r\n}\r\n\r\nSchema.prototype.stringify = function(data) {\r\n\tvar types = this.registeredTypes\r\n\treturn JSON.stringify(util.traverse(function(value, key) {\r\n\t\tvar name\r\n\t\t  , result\r\n\r\n\t\tif(value == null || value == undefined) return value\r\n\t\tif(util.isAny(value, JSONPrimitives)) return value\r\n\t\t\r\n\t\tname = value.constructor.name\r\n\r\n\t\tif(types[name] != value.constructor) \r\n\t\t\tthrow new Error('Unrecognized type: '+value.constructor)\r\n\r\n\t\tresult = {}\r\n\t\tresult['$$_'+name] = value.toJSON()\r\n\t\treturn result\r\n\t}, data))\r\n}\r\n\r\nSchema.prototype.parse = function(string) {\r\n\tvar types = this.registeredTypes\r\n\treturn util.traverse(function(value, key) {\r\n\t\tvar Type\r\n\t\t  , name\r\n\t\t  , keys = Object.keys(value)\r\n\r\n\t\tif(keys.length == 1 && keys[0].indexOf('$$_') == 0) {\r\n\t\t\tname = keys[0].slice(3)\r\n\r\n\t\t\tif(Type = types[name])\r\n\t\t\t\tif(util.isFunction(Type.fromJSON))\r\n\t\t\t\t\treturn Type.fromJSON(value)\r\n\t\t\t\telse\r\n\t\t\t\t\treturn new Type(value)\r\n\t\t\t\r\n\t\t\tthrow new Error('Unrecognized type: '+name)\r\n\t\t}\r\n\t\t\r\n\t\treturn value\r\n\t}, JSON.parse(string))\r\n}\r\n\r\n/*Schema.schema = new Schema({\r\n\t  type:Object\r\n\t, properties: {\r\n\t\t  type:[Function, Array]\r\n\t\t, required:Boolean\r\n\t\t, validators:[Function]\r\n\t\t, default:null\r\n\t  }\r\n\t, validators:[function(schema){ \r\n\t\tif(!util.typeMatch(schema.default, schema.type)) \r\n\t\t\tthrow new Error('default value must match type') \r\n\t  }]\r\n\t, required:['type']\r\n})\r\nSchema.schema.extendWhen({ type:Array }, { \r\n\t  type:Object\r\n\t, properties: {\r\n\t\t  items:Schema.schema\r\n\t\t, loose:Boolean\r\n\t\t, required:[String]\r\n\t  }\r\n\t, required:['items']\r\n})\r\nSchema.schema.extendWhen({ type:Object }, { \r\n\t  type:Object\r\n\t, properties: {\r\n\t\t  properties: {\r\n\t\t  \t  type:Object\r\n\t\t  \t, properties:{}\r\n\t\t  \t, loose:true\r\n\t\t  \t, validators: [function(props){ \r\n\t\t  \t\tObject.keys(props).forEach(function(key){ \r\n\t\t  \t\t\tSchema.schema.validate(props[key]) \r\n\t\t  \t\t}) \r\n\t\t  \t  }]\r\n\t\t  }\r\n\t\t, loose:Boolean\r\n\t\t, required:[String]\r\n\t  }\r\n\t, required:['properties']\r\n})*/\r\n\r\nSchema.ValidationError = ValidationError\r\n\r\nmodule.exports = Schema\n\n//# sourceURL=webpack://practice/./node_modules/schema-js/lib/schema.js?");

/***/ }),

/***/ "./node_modules/schema-js/lib/util.js":
/*!********************************************!*\
  !*** ./node_modules/schema-js/lib/util.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("var util = exports\r\n\r\nutil.isNull = function(value) {\r\n\treturn value == null\r\n}\r\n\r\nutil.isNaN = function(value) {\r\n\treturn isNaN(value) && (value.constructor == Number || value.constructor == Date)\r\n}\r\n\r\nutil.isUndefined = function(value) {\r\n\tvar undefined\r\n\treturn value === undefined\r\n}\r\n\r\nutil.isMatchConstr = function(value, Constructor) {\r\n\treturn value.constructor == Constructor\r\n}\r\n\r\nutil.isEmptyStr = function(value) {\r\n\treturn value === ''\r\n}\r\n\r\nutil.is = function(value, Constructor) {\r\n\treturn (util.isNull(value) || util.isNaN(value) || util.isUndefined(value) || !util.isMatchConstr(value, Constructor)) ? false : true\r\n\r\n\t// return value !== undefined && value !== null && value.constructor == Constructor\r\n}\r\n\r\nutil.isAny = function(value, constructors) {\r\n\tvar is = false\r\n\tconstructors.forEach(function(constructor) {\r\n\t\tis = is || util.is(value, constructor)\r\n\t})\r\n\treturn is\r\n}\r\n\r\nutil.isObject = function(object) {\r\n\treturn util.is(object, Object)\r\n}\r\n\r\nutil.isFunction = function(func) {\r\n\treturn util.is(func, Function)\r\n}\r\n\r\nutil.isArray = function(array) {\r\n\treturn util.is(array, Array)\r\n}\r\n\r\nutil.isExistent = function(value) {\r\n\treturn !util.isNull(value) && !util.isNaN(value) && !util.isUndefined(value) && !util.isEmptyStr(value)\r\n\t// return value !== '' && value !== undefined && value !== null && (!isNaN(value) || (value.constructor != Number && value.constructor != Date))\r\n}\r\n\r\nutil.typeMatch = function(value, constructor) {\r\n\treturn util.isArray(constructor) ? util.isAny(value, constructor) : util.is(value, constructor)\r\n}\r\n\r\nutil.traverse = function(fn, value, key) {\r\n\tvar result = fn(value, key)\r\n\tif(result == value) {\r\n\t\tif(value.constructor == Object) {\r\n\t\t\tresult = {}\r\n\t\t\tObject.keys(value).forEach(function(key) {\r\n\t\t\t\tresult[key] = util.traverse(fn, value[key], key)\r\n\t\t\t})\r\n\t\t\treturn result \r\n\t\t} else if(value.constructor == Array) {\r\n\t\t\treturn value.map(function(val) {\r\n\t\t\t\treturn util.traverse(fn, val)\r\n\t\t\t})\r\n\t\t}\r\n\t}\r\n\treturn fn(value, key)\r\n}\r\n\r\nutil.addNestedError = function(errors, error, key) {\r\n\tif(error.errors) error.errors.forEach(function(error) {\r\n\t\tutil.addSingleNestedError(errors, error, key)\r\n\t})\r\n\telse util.addSingleNestedError(errors, error, key)\r\n}\r\n\r\nutil.addSingleNestedError = function(errors, error, key) {\r\n\terror.field = error.field ? key + '.' + error.field : key\r\n\terrors.addError(error)\r\n}\n\n//# sourceURL=webpack://practice/./node_modules/schema-js/lib/util.js?");

/***/ }),

/***/ "./config/dbconnection.ts":
/*!********************************!*\
  !*** ./config/dbconnection.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const mongoURI = config_1.default.get(\"mongoURI\");\n        const options = {\n            useNewUrlParser: true,\n            useCreateIndex: true,\n            useFindAndModify: false,\n            useUnifiedTopology: true,\n        };\n        yield (0, mongoose_1.connect)(mongoURI, options);\n        console.log(\"MongoDB Connected...\");\n    }\n    catch (err) {\n        console.error(err.message);\n        // Exit process with failure\n        process.exit(1);\n    }\n});\nexports[\"default\"] = connectDB;\n\n\n//# sourceURL=webpack://practice/./config/dbconnection.ts?");

/***/ }),

/***/ "./src/controller/chatBotController.ts":
/*!*********************************************!*\
  !*** ./src/controller/chatBotController.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Bot_1 = __importDefault(__webpack_require__(/*! ../model/Bot */ \"./src/model/Bot.ts\"));\nconst { validationResult } = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst chatBotController = {\n    /**\n     * Request a question from user return answer.\n     * @param req\n     * @param res\n     * @returns {*}\n     */\n    chatBot: function chatBot(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const errors = validationResult(req);\n            if (!errors.isEmpty()) {\n                return res.status(404).json({ \"status\": \"failed\", \"message\": \"Bad request\", \"errors\": errors.array() });\n            }\n            else {\n                let q = req.body.question;\n                let bot = yield Bot_1.default.findOne({ botQuestions: { $elemMatch: { \"question\": q } } });\n                if (bot) {\n                    let arr = [];\n                    for (let i = 0; i < bot.botQuestions.length; i++) {\n                        let item = bot.botQuestions;\n                        if (item[i].question === q) {\n                            let ans = item[i].answer;\n                            return res.status(200).json({ \"staus\": \"success\", \"message\": \"answer for this question\", \"answer\": ans });\n                        }\n                        arr.push(item[i].question);\n                    }\n                    if (!arr.includes(q)) {\n                        return res.status(400).json({ \"status\": \"failed\", \"message\": \"not found\" });\n                    }\n                }\n                else {\n                    return res.status(400).json({ \"status\": \"failed\", \"message\": \"not found\" });\n                }\n            }\n        });\n    },\n    /**\n     * Request a question from user return answer.\n     * @param req\n     * @param res\n     * @returns {*}\n     */\n    addChat: function addChat(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const errors = validationResult(req);\n            if (!errors.isEmpty()) {\n                return res.status(404).json({ \"status\": \"failed\", \"message\": \"Bad request\", \"errors\": errors.array() });\n            }\n            else {\n                let q = req.body.question;\n                let a = req.body.answer;\n                let bot = yield Bot_1.default.findById(req.body.id);\n                if (!bot) {\n                    let bot = new Bot_1.default();\n                    yield bot.save();\n                    return res.status(201).json({ \"staus\": \"success\", \"message\": \"bot created successfully\" });\n                }\n                else {\n                    if (bot.botQuestions.length === 0) {\n                        yield Bot_1.default.updateOne({ \"_id\": req.body.id }, { $push: { botQuestions: [{ \"question\": q, \"answer\": a }] } });\n                        let data = yield Bot_1.default.findById(req.body.id);\n                        return res.status(403).json({ \"status\": \"success\", \"message\": \"question & answer addedd successfully\", \"data\": data });\n                    }\n                    else {\n                        let arr = [];\n                        for (let j = 0; j < bot.botQuestions.length; j++) {\n                            let item = bot.botQuestions;\n                            if (item[j].question === q) {\n                                return res.status(403).json({ \"status\": \"failed\", \"message\": \"question already exists\" });\n                            }\n                            arr.push(item[j].question);\n                        }\n                        if (!arr.includes(q)) {\n                            yield Bot_1.default.updateOne({ \"_id\": req.body.id }, { $push: { botQuestions: [{ \"question\": q, \"answer\": a }] } });\n                            let data = yield Bot_1.default.findById(req.body.id);\n                            return res.status(403).json({ \"status\": \"success\", \"message\": \"question & answer addedd successfully\", \"data\": data });\n                        }\n                    }\n                }\n            }\n        });\n    }\n};\nexports[\"default\"] = chatBotController;\n\n\n//# sourceURL=webpack://practice/./src/controller/chatBotController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dbconnection_1 = __importDefault(__webpack_require__(/*! ../config/dbconnection */ \"./config/dbconnection.ts\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst chatBot_1 = __importDefault(__webpack_require__(/*! ./routes/chatBot */ \"./src/routes/chatBot.ts\"));\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst app = (0, express_1.default)();\n//connect to db\n(0, dbconnection_1.default)();\n// Express configuration\napp.set(\"port\", process.env.PORT || 3000);\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: false }));\napp.get(\"/\", (_req, res) => {\n    res.send(\"API Running\");\n});\napp.use('/api', chatBot_1.default);\nconst port = app.get(\"port\");\nconst server = app.listen(port, () => console.log(`Server started on port ${port}`));\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://practice/./src/index.ts?");

/***/ }),

/***/ "./src/model/Bot.ts":
/*!**************************!*\
  !*** ./src/model/Bot.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst botSchema = new mongoose_1.Schema({\n    botQuestions: { type: [Object] }\n});\nconst Bot = mongoose_2.default.model(\"Bot\", botSchema);\nexports[\"default\"] = Bot;\n\n\n//# sourceURL=webpack://practice/./src/model/Bot.ts?");

/***/ }),

/***/ "./src/routes/chatBot.ts":
/*!*******************************!*\
  !*** ./src/routes/chatBot.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst chatBotController_1 = __importDefault(__webpack_require__(/*! ../controller/chatBotController */ \"./src/controller/chatBotController.ts\"));\nconst chatvalidation = __webpack_require__(/*! ../validation/chatvalidation */ \"./src/validation/chatvalidation.ts\");\nconst router = (0, express_1.Router)();\n// @route   POST chatbot\n// @desc    Give question returns the answer.\nrouter.post(\"/chatbot\", chatvalidation.validationBodyRulesChatBots, chatBotController_1.default.chatBot);\n// @route   POST chatbot\n// @desc    Give question returns the answer.\nrouter.post(\"/addchat\", chatvalidation.validationBodyRulesAddChats, chatBotController_1.default.addChat);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://practice/./src/routes/chatBot.ts?");

/***/ }),

/***/ "./src/validation/chatvalidation.ts":
/*!******************************************!*\
  !*** ./src/validation/chatvalidation.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Schema = __webpack_require__(/*! schema-js */ \"./node_modules/schema-js/index.js\");\nconst { body } = __webpack_require__(/*! express-validator */ \"express-validator\");\nexports.validationBodyRulesAddChats = [\n    body('question', 'question is required').notEmpty(),\n    body('answer', 'answer is required').notEmpty()\n];\nexports.validationBodyRulesChatBots = [\n    body('question', 'question is required').notEmpty()\n];\n\n\n//# sourceURL=webpack://practice/./src/validation/chatvalidation.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-validator");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "sift":
/*!***********************!*\
  !*** external "sift" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("sift");

/***/ }),

/***/ "domain":
/*!*************************!*\
  !*** external "domain" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("domain");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;