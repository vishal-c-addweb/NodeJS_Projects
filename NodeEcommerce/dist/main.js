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

/***/ "./src/controllers/cartApiController.ts":
/*!**********************************************!*\
  !*** ./src/controllers/cartApiController.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Cart_1 = __importDefault(__webpack_require__(/*! ../models/Cart */ \"./src/models/Cart.ts\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst cartController = {\n    addToCart: function addToCart(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newCart = new Cart_1.default(req.body);\n            try {\n                const savedCart = yield newCart.save();\n                let meta = { message: \"Product Added Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, savedCart, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    updateCart: function updateCart(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const updatedCart = yield Cart_1.default.findByIdAndUpdate(req.params.id, {\n                    $set: req.body,\n                }, { new: true });\n                let meta = { message: \"Cart Updated Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, updatedCart, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    deleteCart: function deleteCart(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield Cart_1.default.findByIdAndDelete(req.params.id);\n                let meta = { message: \"Cart Deleted successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getCart: function getCart(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const cart = yield Cart_1.default.find({ userId: req.params.userId });\n                if (cart) {\n                    let meta = { message: \"Cart Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, cart, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"Cart not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getAllCart: function getAllCart(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let cart = yield Cart_1.default.find();\n                if (cart) {\n                    let meta = { message: \"Cart Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, cart, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"Cart not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    }\n};\nexports[\"default\"] = cartController;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/controllers/cartApiController.ts?");

/***/ }),

/***/ "./src/controllers/orderApiController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/orderApiController.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Order_1 = __importDefault(__webpack_require__(/*! ../models/Order */ \"./src/models/Order.ts\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst orderController = {\n    addOrder: function addOrder(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newOrder = new Order_1.default(req.body);\n            try {\n                const savedOrder = yield newOrder.save();\n                let meta = { message: \"Product Ordered Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, savedOrder, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    updateOrder: function updateOrder(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const updatedOrder = yield Order_1.default.findByIdAndUpdate(req.params.id, {\n                    $set: req.body,\n                }, { new: true });\n                let meta = { message: \"Order Updated Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, updatedOrder, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    deleteOrder: function deleteOrder(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield Order_1.default.findByIdAndDelete(req.params.id);\n                let meta = { message: \"Order Deleted successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    },\n    getOrder: function getOrder(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const order = yield Order_1.default.findOne({ userId: req.params.userId });\n                if (order) {\n                    let meta = { message: \"Order Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, order, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"Order not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    },\n    getAllOrder: function getAllOrder(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let orders = yield Order_1.default.find();\n                if (orders) {\n                    let meta = { message: \"Cart Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, orders, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"Cart not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    },\n    getMonthlyIncome: function getMonthlyIncome(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const date = new Date();\n            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));\n            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));\n            try {\n                const income = yield Order_1.default.aggregate([\n                    { $match: { createdAt: { $gte: previousMonth } } },\n                    {\n                        $project: {\n                            month: { $month: \"$createdAt\" },\n                            sales: \"$month\",\n                        },\n                    },\n                    {\n                        $group: {\n                            _id: \"$month\",\n                            total: { $sum: \"$sales\" },\n                        },\n                    },\n                ]);\n                if (income) {\n                    let meta = { message: \"Income Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, income, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"Income not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                return res.status(500).json(error);\n            }\n        });\n    }\n};\nexports[\"default\"] = orderController;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/controllers/orderApiController.ts?");

/***/ }),

/***/ "./src/controllers/productApiController.ts":
/*!*************************************************!*\
  !*** ./src/controllers/productApiController.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Product_1 = __importDefault(__webpack_require__(/*! ../models/Product */ \"./src/models/Product.ts\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst productController = {\n    addProduct: function addProduct(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newProduct = new Product_1.default(req.body);\n            try {\n                let product = yield Product_1.default.findOne({ title: req.body.title });\n                if (!product) {\n                    const savedProduct = yield newProduct.save();\n                    let meta = { message: \"Product save Successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, savedProduct, responsecode_1.default.Created, res);\n                }\n                else {\n                    let meta = { message: \"Product Already Register\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    updateProduct: function updateProduct(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.params.id, {\n                    $set: req.body,\n                }, { new: true });\n                let meta = { message: \"Product Updated Successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, updatedProduct, responsecode_1.default.Created, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    deleteProduct: function deleteProduct(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield Product_1.default.findByIdAndDelete(req.params.id);\n                let meta = { message: \"Product Deleted successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getProduct: function getProduct(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const product = yield Product_1.default.findById(req.params.id);\n                if (product) {\n                    let meta = { message: \"Product Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, product, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"product not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getAllProduct: function getAllProduct(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const qNew = req.query.new;\n            const qCategory = req.query.category;\n            try {\n                let products;\n                if (qNew) {\n                    products = yield Product_1.default.find().sort({ createdAt: -1 }).limit(1);\n                }\n                else if (qCategory) {\n                    products = yield Product_1.default.find({\n                        categories: {\n                            $in: [qCategory],\n                        }\n                    });\n                }\n                else {\n                    products = yield Product_1.default.find();\n                }\n                let meta = { message: \"Products Fetched successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, products, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    }\n};\nexports[\"default\"] = productController;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/controllers/productApiController.ts?");

/***/ }),

/***/ "./src/controllers/userApiController.ts":
/*!**********************************************!*\
  !*** ./src/controllers/userApiController.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst User_1 = __importDefault(__webpack_require__(/*! ../models/User */ \"./src/models/User.ts\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\nconst mail_1 = __webpack_require__(/*! ../services/mail */ \"./src/services/mail.ts\");\nconst node_localstorage_1 = __webpack_require__(/*! node-localstorage */ \"node-localstorage\");\nglobal.localStorage = new node_localstorage_1.LocalStorage('./scratch');\nconst CryptoJs = __webpack_require__(/*! crypto-js */ \"crypto-js\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst userController = {\n    register: function register(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let user = yield User_1.default.findOne({ userName: req.body.userName });\n                if (!user) {\n                    let newUser = new User_1.default({\n                        userName: req.body.userName,\n                        email: req.body.email,\n                        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET)\n                    });\n                    const savedUser = yield newUser.save();\n                    // await mailService(req.body.email, req.body.userName, req.body.password);\n                    // let meta: object = { message: \"Registered Successfully\", status: \"Success\" };\n                    // responseFunction(meta, savedUser, responsecode.Created, res);\n                    req.flash('msg', 'successfully registered');\n                    res.redirect('/login');\n                }\n                else {\n                    // let meta: object = { message: \"User Already Register\", status: \"Failed\" };\n                    // responseFunction(meta, dataArray, responsecode.Forbidden, res);\n                    req.flash('msg', 'already registered');\n                    res.redirect('/register');\n                }\n            }\n            catch (error) {\n                // let meta: object = { message: \"Server error\", status: \"Failed\" };\n                // responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);\n                res.redirect('/register');\n            }\n        });\n    },\n    login: function login(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield User_1.default.findOne({ userName: req.body.userName });\n                if (user) {\n                    const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET);\n                    const password = hashPassword.toString(CryptoJs.enc.Utf8);\n                    if (password === req.body.password) {\n                        const _a = user._doc, { password } = _a, others = __rest(_a, [\"password\"]);\n                        const token = jwt.sign({ user_id: user._id, user_isAdmin: user.isAdmin }, config_1.default.get(\"jwtSecret\"), { expiresIn: config_1.default.get(\"jwtExpiration\") });\n                        let data = {\n                            \"data\": others,\n                            \"token\": token\n                        };\n                        // let meta: object = { message: \"logged in successfully\", status: \"Success\" };\n                        // responseFunction(meta, data, responsecode.Success, res);\n                        localStorage.setItem(\"jwt\", token);\n                        req.flash('msg', 'logged in successfully');\n                        res.redirect('/');\n                    }\n                    else {\n                        // let meta: object = { message: \"wrong credential\", status: \"Failed\" };\n                        // responseFunction(meta, dataArray, responsecode.Forbidden, res);\n                        req.flash('msg', 'wrong credential');\n                        res.redirect('/login');\n                    }\n                }\n                else {\n                    // let meta: object = { message: \"User not found\", status: \"Failed\" };\n                    // responseFunction(meta, dataArray, responsecode.Forbidden, res);\n                    req.flash('msg', 'User not found');\n                    res.redirect('/login');\n                }\n            }\n            catch (error) {\n                // let meta: object = { message: \"Server error\", status: \"Failed\" };\n                // responseFunction(meta, dataArray, responsecode.Internal_Server_Error, res);\n                req.flash('msg', 'Server error');\n                res.redirect('/login');\n            }\n        });\n    },\n    update: function update(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (req.body.password) {\n                req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();\n            }\n            try {\n                const user = yield User_1.default.findById(req.params.id);\n                if (user) {\n                    const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {\n                        $set: req.body\n                    }, { new: true });\n                    let meta = { message: \"User updated successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, updatedUser, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"user not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    deleteUser: function deleteUser(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield User_1.default.findByIdAndDelete(req.params.id);\n                let meta = { message: \"User Deleted successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getUser: function getUser(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield User_1.default.findById(req.params.id);\n                if (user) {\n                    const _a = user._doc, { password } = _a, others = __rest(_a, [\"password\"]);\n                    let meta = { message: \"User Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, others, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"user not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getAllUser: function getAllUser(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const query = req.query.new;\n            try {\n                const users = query ? yield User_1.default.find().sort({ _id: -1 }).limit(1) : yield User_1.default.find();\n                if (users) {\n                    let meta = { message: \"Users Fetched successfully\", status: \"Success\" };\n                    (0, responsefunction_1.responseFunction)(meta, users, responsecode_1.default.Success, res);\n                }\n                else {\n                    let meta = { message: \"user not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    getUserStats: function getUserStats(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const date = new Date();\n            const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));\n            try {\n                const data = yield User_1.default.aggregate([\n                    { $match: { createdAt: { $gt: lastYear } } },\n                    {\n                        $project: {\n                            month: { $month: \"$createdAt\" },\n                        },\n                    },\n                    {\n                        $group: {\n                            _id: \"$month\",\n                            total: { $sum: 1 },\n                        },\n                    },\n                ]);\n                let meta = { message: \"Users Fetched successfully\", status: \"Success\" };\n                (0, responsefunction_1.responseFunction)(meta, data, responsecode_1.default.Success, res);\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    },\n    forgotPassword: function forgotPassword(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let password;\n            try {\n                let user = yield User_1.default.findById(req.userId);\n                if (user) {\n                    const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET);\n                    password = hashPassword.toString(CryptoJs.enc.Utf8);\n                    if (req.body.currentPassword === password) {\n                        if (req.body.newPassword === req.body.confirmPassword) {\n                            yield User_1.default.updateOne({ \"_id\": req.userId }, { $set: { \"password\": CryptoJs.AES.encrypt(req.body.newPassword, process.env.PASS_SECRET).toString() } });\n                            yield (0, mail_1.mailService)(user.email, user.userName, req.body.newPassword);\n                            let meta = { message: \"Password Updated Successfully\", status: \"Success\" };\n                            (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Success, res);\n                        }\n                        else {\n                            let meta = { message: \"your new password and confirm password not match\", status: \"Failed\" };\n                            (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Bad_Request, res);\n                        }\n                    }\n                    else {\n                        let meta = { message: \"your current password is wrong\", status: \"Failed\" };\n                        (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                    }\n                }\n                else {\n                    let meta = { message: \"user not found\", status: \"Failed\" };\n                    (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n                }\n            }\n            catch (error) {\n                let meta = { message: \"Server error\", status: \"Failed\" };\n                (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Internal_Server_Error, res);\n            }\n        });\n    }\n};\nexports[\"default\"] = userController;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/controllers/userApiController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst dbconnection_1 = __importDefault(__webpack_require__(/*! ../config/dbconnection */ \"./config/dbconnection.ts\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ./routes/user */ \"./src/routes/user.ts\"));\nconst product_1 = __importDefault(__webpack_require__(/*! ./routes/product */ \"./src/routes/product.ts\"));\nconst cart_1 = __importDefault(__webpack_require__(/*! ./routes/cart */ \"./src/routes/cart.ts\"));\nconst order_1 = __importDefault(__webpack_require__(/*! ./routes/order */ \"./src/routes/order.ts\"));\nconst express_flash_1 = __importDefault(__webpack_require__(/*! express-flash */ \"express-flash\"));\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst app = (0, express_1.default)();\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n//db connection\n(0, dbconnection_1.default)();\napp.set('view-engine', 'ejs');\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: false }));\napp.use(session({\n    secret: process.env.PASS_SECRET,\n    resave: true,\n    saveUninitialized: true\n}));\napp.use((0, express_flash_1.default)());\n// app.use('/api/users', user);\n// app.use('/api/products', product);\n// app.use('/api/cart', cart);\n// app.use('/api/order', order);\napp.use('/', user_1.default);\napp.use('/api/products', product_1.default);\napp.use('/api/cart', cart_1.default);\napp.use('/api/order', order_1.default);\n//start the server\nconst server = app.listen(process.env.PORT || 3000, () => console.log(`server started on the port ${process.env.PORT || 3000}`));\n\n\n//# sourceURL=webpack://nodeecommerce/./src/index.ts?");

/***/ }),

/***/ "./src/middleware/authenticate.ts":
/*!****************************************!*\
  !*** ./src/middleware/authenticate.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.authenticate = exports.ValidateTokenAndAdmin = exports.ValidateTokenAndAuthorization = exports.ValidateToken = void 0;\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"config\"));\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst responsefunction_1 = __webpack_require__(/*! ../response_builder/responsefunction */ \"./src/response_builder/responsefunction.ts\");\nconst responsecode_1 = __importDefault(__webpack_require__(/*! ../response_builder/responsecode */ \"./src/response_builder/responsecode.ts\"));\nfunction ValidateToken(req, res, next) {\n    const header = localStorage.getItem(\"jwt\");\n    if (!header) {\n        let meta = { message: \"token is not added\", status: \"Failed\" };\n        (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Not_Found, res);\n    }\n    else {\n        try {\n            let token = localStorage.getItem(\"jwt\");\n            const payload = jsonwebtoken_1.default.verify(token, config_1.default.get(\"jwtSecret\"));\n            req.userId = payload.user_id;\n            req.isAdmin = payload.user_isAdmin;\n            next();\n        }\n        catch (err) {\n            let meta = { message: \"token is not valid\", status: \"Failed\" };\n            (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Unauthorized, res);\n        }\n    }\n}\nexports.ValidateToken = ValidateToken;\nfunction ValidateTokenAndAuthorization(req, res, next) {\n    ValidateToken(req, res, () => {\n        if (req.userId === req.params.id || req.isAdmin) {\n            next();\n        }\n        else {\n            let meta = { message: \"you are not allowed to do that\", status: \"Failed\" };\n            (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n        }\n    });\n}\nexports.ValidateTokenAndAuthorization = ValidateTokenAndAuthorization;\nfunction ValidateTokenAndAdmin(req, res, next) {\n    ValidateToken(req, res, () => {\n        if (req.isAdmin) {\n            next();\n        }\n        else {\n            let meta = { message: \"you are not allowed to do that\", status: \"Failed\" };\n            (0, responsefunction_1.responseFunction)(meta, responsefunction_1.dataArray, responsecode_1.default.Forbidden, res);\n        }\n    });\n}\nexports.ValidateTokenAndAdmin = ValidateTokenAndAdmin;\nfunction authenticate(req, res, next) {\n    if (localStorage.getItem(\"jwt\")) {\n        res.redirect('/');\n    }\n    else {\n        next();\n    }\n}\nexports.authenticate = authenticate;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/middleware/authenticate.ts?");

/***/ }),

/***/ "./src/models/Cart.ts":
/*!****************************!*\
  !*** ./src/models/Cart.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst cartSchema = new mongoose_1.Schema({\n    userId: { type: String, required: true },\n    products: [{\n            productId: { type: String },\n            quantity: { type: Number, default: 1 },\n            _id: false\n        }]\n}, { timestamps: true });\nconst Cart = mongoose_2.default.model(\"Cart\", cartSchema);\nexports[\"default\"] = Cart;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/models/Cart.ts?");

/***/ }),

/***/ "./src/models/Order.ts":
/*!*****************************!*\
  !*** ./src/models/Order.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst orderSchema = new mongoose_1.Schema({\n    userId: { type: String, required: true },\n    products: [{\n            productId: { type: String },\n            quantity: { type: Number, default: 1 },\n            _id: false\n        }],\n    amount: { type: Number, required: true },\n    address: { type: Object, required: true },\n    status: { type: String, default: \"pending\" },\n}, { timestamps: true });\nconst Order = mongoose_2.default.model(\"Order\", orderSchema);\nexports[\"default\"] = Order;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/models/Order.ts?");

/***/ }),

/***/ "./src/models/Product.ts":
/*!*******************************!*\
  !*** ./src/models/Product.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst productSchema = new mongoose_1.Schema({\n    title: { type: String, required: true, unique: true },\n    desc: { type: String, required: true },\n    img: { type: String, required: true },\n    categories: { type: Array },\n    size: { type: String },\n    color: { type: String },\n    price: { type: Number, required: true },\n});\nconst Product = mongoose_2.default.model(\"Product\", productSchema);\nexports[\"default\"] = Product;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/models/Product.ts?");

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

/***/ "./src/routes/cart.ts":
/*!****************************!*\
  !*** ./src/routes/cart.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst cartApiController_1 = __importDefault(__webpack_require__(/*! ../controllers/cartApiController */ \"./src/controllers/cartApiController.ts\"));\nconst authenticate_1 = __webpack_require__(/*! ../middleware/authenticate */ \"./src/middleware/authenticate.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/add', authenticate_1.ValidateToken, cartApiController_1.default.addToCart);\nrouter.get('/find/:userId', authenticate_1.ValidateTokenAndAuthorization, cartApiController_1.default.getCart);\nrouter.get('/all', authenticate_1.ValidateTokenAndAdmin, cartApiController_1.default.getAllCart);\nrouter.put('/update/:id', authenticate_1.ValidateTokenAndAuthorization, cartApiController_1.default.updateCart);\nrouter.delete('/delete/:id', authenticate_1.ValidateTokenAndAuthorization, cartApiController_1.default.deleteCart);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/routes/cart.ts?");

/***/ }),

/***/ "./src/routes/order.ts":
/*!*****************************!*\
  !*** ./src/routes/order.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst orderApiController_1 = __importDefault(__webpack_require__(/*! ../controllers/orderApiController */ \"./src/controllers/orderApiController.ts\"));\nconst authenticate_1 = __webpack_require__(/*! ../middleware/authenticate */ \"./src/middleware/authenticate.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/add', authenticate_1.ValidateToken, orderApiController_1.default.addOrder);\nrouter.get('/find/:userId', authenticate_1.ValidateTokenAndAuthorization, orderApiController_1.default.getOrder);\nrouter.get('/all', authenticate_1.ValidateTokenAndAdmin, orderApiController_1.default.getAllOrder);\nrouter.put('/update/:id', authenticate_1.ValidateTokenAndAdmin, orderApiController_1.default.updateOrder);\nrouter.delete('/delete/:id', authenticate_1.ValidateTokenAndAdmin, orderApiController_1.default.deleteOrder);\nrouter.get('/income', authenticate_1.ValidateTokenAndAdmin, orderApiController_1.default.getMonthlyIncome);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/routes/order.ts?");

/***/ }),

/***/ "./src/routes/product.ts":
/*!*******************************!*\
  !*** ./src/routes/product.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst productApiController_1 = __importDefault(__webpack_require__(/*! ../controllers/productApiController */ \"./src/controllers/productApiController.ts\"));\nconst authenticate_1 = __webpack_require__(/*! ../middleware/authenticate */ \"./src/middleware/authenticate.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/add', authenticate_1.ValidateTokenAndAdmin, productApiController_1.default.addProduct);\nrouter.put('/update/:id', authenticate_1.ValidateTokenAndAdmin, productApiController_1.default.updateProduct);\nrouter.delete('/delete/:id', authenticate_1.ValidateTokenAndAdmin, productApiController_1.default.deleteProduct);\nrouter.get('/find/:id', authenticate_1.ValidateToken, productApiController_1.default.getProduct);\nrouter.get('/all', authenticate_1.ValidateTokenAndAdmin, productApiController_1.default.getAllProduct);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/routes/product.ts?");

/***/ }),

/***/ "./src/routes/user.ts":
/*!****************************!*\
  !*** ./src/routes/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst userApiController_1 = __importDefault(__webpack_require__(/*! ../controllers/userApiController */ \"./src/controllers/userApiController.ts\"));\nconst authenticate_1 = __webpack_require__(/*! ../middleware/authenticate */ \"./src/middleware/authenticate.ts\");\nconst router = (0, express_1.Router)();\n//server started and api running\nrouter.get('/', authenticate_1.authenticate, (req, res) => {\n    if (localStorage.getItem(\"jwt\")) {\n        res.redirect('/');\n    }\n    else {\n        res.redirect('/login');\n    }\n});\nrouter.get('/register', authenticate_1.authenticate, (req, res) => {\n    res.render('register.ejs');\n});\nrouter.post('/register', authenticate_1.authenticate, userApiController_1.default.register);\nrouter.get('/login', authenticate_1.authenticate, (req, res) => {\n    res.render('login.ejs');\n});\nrouter.get('/logout', (req, res) => {\n    localStorage.clear();\n    res.redirect('/login');\n});\nrouter.post('/login', authenticate_1.authenticate, userApiController_1.default.login);\nrouter.post('/forgotPassword', authenticate_1.ValidateToken, userApiController_1.default.forgotPassword);\nrouter.get('/find/:id', authenticate_1.ValidateToken, userApiController_1.default.getUser);\nrouter.get('/all', authenticate_1.ValidateTokenAndAdmin, userApiController_1.default.getAllUser);\nrouter.put('/update/:id', authenticate_1.ValidateTokenAndAuthorization, userApiController_1.default.update);\nrouter.delete('/delete/:id', authenticate_1.ValidateTokenAndAdmin, userApiController_1.default.deleteUser);\nrouter.get('/stats', authenticate_1.ValidateToken, userApiController_1.default.getUserStats);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/routes/user.ts?");

/***/ }),

/***/ "./src/services/mail.ts":
/*!******************************!*\
  !*** ./src/services/mail.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mailService = void 0;\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\nconst transporter = nodemailer.createTransport({\n    host: 'smtp.gmail.com',\n    port: 587,\n    auth: {\n        user: process.env.AUTH_USERNAME,\n        pass: process.env.AUTH_PASSWORD\n    }\n});\nfunction mailService(email, userName, password) {\n    return __awaiter(this, void 0, void 0, function* () {\n        // send email\n        try {\n            yield transporter.sendMail({\n                from: process.env.AUTH_USERNAME,\n                to: email,\n                subject: 'Email From New Creation',\n                text: \"you are successfully register in New Creation\\n\" + `your userName & password for login is userName:${userName},password:${password}`\n            });\n        }\n        catch (e) {\n            console.log(e);\n        }\n    });\n}\nexports.mailService = mailService;\n\n\n//# sourceURL=webpack://nodeecommerce/./src/services/mail.ts?");

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

/***/ "express-flash":
/*!********************************!*\
  !*** external "express-flash" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("express-flash");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

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

/***/ }),

/***/ "node-localstorage":
/*!************************************!*\
  !*** external "node-localstorage" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("node-localstorage");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

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