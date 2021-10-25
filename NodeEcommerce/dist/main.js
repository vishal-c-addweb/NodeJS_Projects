/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/dbconnection.ts":
/*!********************************!*\
  !*** ./config/dbconnection.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const mongoURI = process.env.MONGO_URI;\n        const options = {\n            dbName: 'ecommerce',\n            useCreateIndex: true,\n            useFindAndModify: false,\n            useUnifiedTopology: true,\n            useNewUrlParser: true\n        };\n        yield (0, mongoose_1.connect)(mongoURI, options);\n        console.log(\"mongodb connected\");\n    }\n    catch (error) {\n        console.log(error.message);\n        process.exit(1);\n    }\n});\nexports[\"default\"] = connectDB;\n\n\n//# sourceURL=webpack://nodeecommerce/./config/dbconnection.ts?");

/***/ }),

/***/ "./src/controllers/userApiController.ts":
/*!**********************************************!*\
  !*** ./src/controllers/userApiController.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst User_1 = __importDefault(__webpack_require__(/*! ../models/User */ \"./src/models/User.ts\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\nconst CryptoJs = __webpack_require__(/*! crypto-js */ \"crypto-js\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst userController = {\n    register: function register(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const newUser = new User_1.default({\n                    userName: req.body.userName,\n                    email: req.body.email,\n                    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET)\n                });\n                const savedUser = yield newUser.save();\n                let meta = { message: \"Registered Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, savedUser, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    login: function login(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield User_1.default.findOne({ userName: req.body.userName });\n                const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET);\n                const password = hashPassword.toString(CryptoJs.enc.Utf8);\n                if (user && password === req.body.password) {\n                    const _a = user._doc, { password } = _a, others = __rest(_a, [\"password\"]);\n                    const token = jwt.sign({ user_id: user._id, user_isAdmin: user.isAdmin }, config_1.default.get(\"jwtSecret\"), { expiresIn: config_1.default.get(\"jwtExpiration\") });\n                    let data = {\n                        \"data\": others,\n                        \"token\": token\n                    };\n                    let meta = { message: \"logged in successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, data, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"wrong credential\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    update: function update(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (req.body.password) {\n                req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();\n            }\n            try {\n                if (req.isAdmin) {\n                    const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {\n                        $set: req.body\n                    }, { new: true });\n                    let meta = { message: \"User updated successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, updatedUser, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"you are not allowed to do that\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    },\n    deleteUser: function deleteUser(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                if (req.isAdmin) {\n                    yield User_1.default.findByIdAndDelete(req.params.id);\n                    let result = {\n                        \"meta\": { \"status\": 200, \"message\": \"deleted successfully\" },\n                        \"data\": { \"data\": {} }\n                    };\n                    let meta = { message: \"User Deleted successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"you are not allowed to do that\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    },\n    getUser: function getUser(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield User_1.default.findById(req.params.id);\n                const _a = user._doc, { password } = _a, others = __rest(_a, [\"password\"]);\n                if (user) {\n                    let meta = { message: \"User Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, user, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"user not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    }\n};\nexports[\"default\"] = userController;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/controllers/userApiController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst dbconnection_1 = __importDefault(__webpack_require__(/*! ../config/dbconnection */ \"./config/dbconnection.ts\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ./routes/user */ \"./src/routes/user.ts\"));\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst app = (0, express_1.default)();\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n//db connection\n(0, dbconnection_1.default)();\n//start the server\nconst server = app.listen(process.env.PORT || 3000, () => console.log(`server started on the port ${process.env.PORT || 3000}`));\n//server started and api running\napp.get('/', (req, res) => {\n    res.send(\"api is running\");\n});\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: false }));\napp.use('/api/user', user_1.default);\n\n\n//# sourceURL=webpack://nodeecommerce/./src/index.ts?");

/***/ }),

/***/ "./src/middleware/authenticate.ts":
/*!****************************************!*\
  !*** ./src/middleware/authenticate.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\nfunction default_1(req, res, next) {\n    // Get token from header\n    const header = req.headers.authorization;\n    // Check if no token\n    if (!header) {\n        let meta = { message: \"token is not added\", status: \"Failed\" };\n        (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n    }\n    // Verify token\n    try {\n        let token = header.split(' ')[1];\n        const payload = jsonwebtoken_1.default.verify(token, config_1.default.get(\"jwtSecret\"));\n        req.userId = payload.user_id;\n        req.isAdmin = payload.user_isAdmin;\n        next();\n    }\n    catch (err) {\n        let meta = { message: \"token is not valid\", status: \"Failed\" };\n        (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Unauthorized, res);\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/middleware/authenticate.ts?");

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst userSchema = new mongoose_1.Schema({\n    userName: { type: String, required: true, unique: true },\n    email: { type: String, required: true, unique: true },\n    password: { type: String, required: true },\n    isAdmin: { type: Boolean, default: false },\n}, { timestamps: true });\nconst User = mongoose_2.default.model(\"User\", userSchema);\nexports[\"default\"] = User;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/models/User.ts?");

/***/ }),

/***/ "./src/response_builder/responsecode.ts":
/*!**********************************************!*\
  !*** ./src/response_builder/responsecode.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/** response codes */\nconst responsecode = {\n    Success: 200,\n    Created: 201,\n    Bad_Request: 400,\n    Unauthorized: 401,\n    Forbidden: 403,\n    Not_Found: 404,\n    Method_Not_Allowed: 405,\n    Conflict: 409,\n    Internal_Server_Error: 500,\n    Service_Unavailabel: 503,\n    No_Content: 204,\n};\nexports[\"default\"] = responsecode;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/response_builder/responsecode.ts?");

/***/ }),

/***/ "./src/response_builder/responsefunction.ts":
/*!**************************************************!*\
  !*** ./src/response_builder/responsefunction.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.dataArray = exports.responseFunction = void 0;\nfunction responseFunction(meta, data, res_code, res) {\n    let response = { meta, data };\n    return res.status(res_code).json(response);\n}\nexports.responseFunction = responseFunction;\nexports.dataArray = {};\n\n\n//# sourceURL=webpack://nodeecommerce/./src/response_builder/responsefunction.ts?");

/***/ }),

/***/ "./src/routes/user.ts":
/*!****************************!*\
  !*** ./src/routes/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst userApiController_1 = __importDefault(__webpack_require__(/*! ../controllers/userApiController */ \"./src/controllers/userApiController.ts\"));\nconst authenticate_1 = __importDefault(__webpack_require__(/*! ../middleware/authenticate */ \"./src/middleware/authenticate.ts\"));\nconst router = (0, express_1.Router)();\nrouter.post('/register', userApiController_1.default.register);\nrouter.post('/login', userApiController_1.default.login);\nrouter.put('/:id', authenticate_1.default, userApiController_1.default.update);\nrouter.delete('/:id', authenticate_1.default, userApiController_1.default.deleteUser);\nrouter.get('/:id', authenticate_1.default, userApiController_1.default.getUser);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/routes/user.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("config");

/***/ }),

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("crypto-js");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

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