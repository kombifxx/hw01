"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../db/in-memory.db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter
    .delete('/testing/all-data', (_, res) => {
    in_memory_db_1.db.videos.splice(0, in_memory_db_1.db.videos.length);
    res.sendStatus(204);
});
