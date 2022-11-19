"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import morgan from 'morgan';
var image_1 = __importDefault(require("./routes/image"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// app.use(morgan('tiny'));
app.get('/', function (req, res) {
    res.redirect('/images?file=nightfall.jpg');
});
app.use('/images', image_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
    console.log("Visit http://localhost:".concat(PORT));
});
exports.default = app;
