"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protectedEndpoint = function (req, res) {
    res.status(200).json({ Message: "You are qualified to access this route" });
};
exports.default = protectedEndpoint;
