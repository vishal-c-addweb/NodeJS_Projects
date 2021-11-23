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

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const mongoURI = config_1.default.get(\"mongoURI\");\n        const options = {\n            useNewUrlParser: true,\n            useCreateIndex: true,\n            useFindAndModify: false,\n            useUnifiedTopology: true,\n        };\n        yield (0, mongoose_1.connect)(mongoURI, options);\n        console.log(\"MongoDB Connected...\");\n    }\n    catch (err) {\n        console.error(err.message);\n        // Exit process with failure\n        process.exit(1);\n    }\n});\nexports[\"default\"] = connectDB;\n\n\n//# sourceURL=webpack://practice/./config/dbconnection.ts?");

/***/ }),

/***/ "./src/controller/sendOtpController.ts":
/*!*********************************************!*\
  !*** ./src/controller/sendOtpController.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst otpGenerator = __webpack_require__(/*! otp-generator */ \"otp-generator\");\nvar springedge = __webpack_require__(/*! springedge */ \"springedge\");\nconst { validationResult } = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst Otp_1 = __importDefault(__webpack_require__(/*! ../model/Otp */ \"./src/model/Otp.ts\"));\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst sendOtpController = {\n    /**\n     * Request a mobile from user return response.\n     * @param req\n     * @param res\n     * @returns {*}\n     */\n    sendOtp: function sendOtp(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const errors = validationResult(req).array();\n            if (errors && errors.length) {\n                return res.status(400).json(errors);\n            }\n            else {\n                let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false, digits: true });\n                let params = {\n                    'apikey': process.env.SPRING_EDGE_API_KEY,\n                    'sender': process.env.SPRING_EDGE_SENDER,\n                    'to': [\n                        req.body.mobile //Moblie Number \n                    ],\n                    'message': 'Hello ' + otp + ', This is a test message from spring edge',\n                    'format': 'json'\n                };\n                springedge.messages.send(params, 3000, function (err, response) {\n                    if (err) {\n                        console.log(err);\n                        return res.json(err);\n                    }\n                    else {\n                        let otps = new Otp_1.default({\n                            otp: otp,\n                            expiration_time: new Date(new Date().getTime() + 3 * 60000),\n                            verified: false\n                        });\n                        otps.save();\n                        return res.status(201).json(response);\n                    }\n                });\n            }\n        });\n    },\n    /**\n     * Request a otp from user and verify and return response.\n     * @param req\n     * @param res\n     * @returns {*}\n     */\n    verify: function verify(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const errors = validationResult(req);\n            if (!errors.isEmpty()) {\n                return res.status(400).json(errors.array());\n            }\n            else {\n                var otp = req.body.otp;\n                var notExpire = yield Otp_1.default.findOne({ otp: otp, verified: false, expiration_time: { $gt: new Date() } });\n                if (notExpire) {\n                    yield Otp_1.default.updateOne({ otp: otp }, { verified: true });\n                    res.status(200).json(\"your otp verified successfully\");\n                }\n                else {\n                    res.status(403).json(\"your otp expired\");\n                }\n            }\n        });\n    }\n};\nexports[\"default\"] = sendOtpController;\n\n\n//# sourceURL=webpack://practice/./src/controller/sendOtpController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dbconnection_1 = __importDefault(__webpack_require__(/*! ../config/dbconnection */ \"./config/dbconnection.ts\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst sendOtp_1 = __importDefault(__webpack_require__(/*! ./routes/sendOtp */ \"./src/routes/sendOtp.ts\"));\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst app = (0, express_1.default)();\n//connect to db\n(0, dbconnection_1.default)();\n// Express configuration\napp.set(\"port\", process.env.PORT || 3000);\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: false }));\napp.get(\"/\", (_req, res) => {\n    res.send(\"API Running\");\n});\napp.use('/api', sendOtp_1.default);\nconst port = app.get(\"port\");\nconst server = app.listen(port, () => console.log(`Server started on port ${port}`));\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://practice/./src/index.ts?");

/***/ }),

/***/ "./src/model/Otp.ts":
/*!**************************!*\
  !*** ./src/model/Otp.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst otpSchema = new mongoose_1.Schema({\n    otp: { type: Number },\n    expiration_time: { type: Date },\n    verified: { type: Boolean }\n});\nconst Otp = mongoose_2.default.model(\"Otp\", otpSchema);\nexports[\"default\"] = Otp;\n\n\n//# sourceURL=webpack://practice/./src/model/Otp.ts?");

/***/ }),

/***/ "./src/routes/sendOtp.ts":
/*!*******************************!*\
  !*** ./src/routes/sendOtp.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst sendOtpController_1 = __importDefault(__webpack_require__(/*! ../controller/sendOtpController */ \"./src/controller/sendOtpController.ts\"));\nconst userValidation = __webpack_require__(/*! ../validation/userValidation */ \"./src/validation/userValidation.ts\");\nconst router = (0, express_1.Router)();\n// @route   POST sendotp\n// @desc    Give Mobile number, returns the otp.\n// @access  Private with springedge api-key\nrouter.post(\"/sendotp\", userValidation.validationBodyRules, sendOtpController_1.default.sendOtp);\n// @route   POST verify\n// @desc    verify otp and return proper message.\n// @access  Public\nrouter.post(\"/verify\", userValidation.validationBodyRules, sendOtpController_1.default.verify);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://practice/./src/routes/sendOtp.ts?");

/***/ }),

/***/ "./src/validation/userValidation.ts":
/*!******************************************!*\
  !*** ./src/validation/userValidation.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst { body, check } = __webpack_require__(/*! express-validator */ \"express-validator\");\nexports.validationBodyRules = [\n    check('mobile')\n        .trim()\n        .isNumeric()\n        .withMessage('Phone number must be numeric.')\n        .bail()\n        .isLength({ max: 10, min: 10 })\n        .withMessage('Phone number must be 10 digits long.')\n        .bail(),\n];\n\n\n//# sourceURL=webpack://practice/./src/validation/userValidation.ts?");

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

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("express-validator");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "otp-generator":
/*!********************************!*\
  !*** external "otp-generator" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("otp-generator");

/***/ }),

/***/ "springedge":
/*!*****************************!*\
  !*** external "springedge" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("springedge");

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