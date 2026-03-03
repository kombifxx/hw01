"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../db/in-memory.db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter
    .get('/videos', (_, res) => {
    res.status(200).send(in_memory_db_1.db.videos);
})
    .get('/videos/:id', (req, res) => {
    const video = in_memory_db_1.db.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        return res.status(404).send({
            errorsMessages: [{ message: "Video not found", field: "id" }]
        });
    }
    res.status(200).send(video);
})
    .post('/videos', (req, res) => {
    const errors = [];
    const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
    const { title, author, availableResolutions } = req.body;
    // Проверка title
    if (!title) {
        errors.push({
            message: 'Title is required',
            field: 'title'
        });
    }
    else if (typeof title !== 'string') {
        errors.push({
            message: 'Title must be a string',
            field: 'title'
        });
    }
    else if (title.length > 40) {
        errors.push({
            message: 'Title must be less than 40 characters',
            field: 'title'
        });
    }
    // Проверка author
    if (!author) {
        errors.push({
            message: 'Author is required',
            field: 'author'
        });
    }
    else if (typeof author !== 'string') {
        errors.push({
            message: 'Author must be a string',
            field: 'author'
        });
    }
    else if (author.length > 20) {
        errors.push({
            message: 'Author must be less than 20 characters',
            field: 'author'
        });
    }
    // Проверка availableResolutions
    if (!availableResolutions) {
        errors.push({
            message: 'Available resolutions are required',
            field: 'availableResolutions'
        });
    }
    else if (!Array.isArray(availableResolutions)) {
        errors.push({
            message: 'Available resolutions must be an array',
            field: 'availableResolutions'
        });
    }
    else if (availableResolutions.length === 0) {
        errors.push({
            message: 'At least one resolution is required',
            field: 'availableResolutions'
        });
    }
    else {
        for (let i = 0; i < availableResolutions.length; i++) {
            const res = availableResolutions[i];
            if (typeof res !== 'string') {
                errors.push({
                    message: `Resolution at position ${i} must be a string`,
                    field: "availableResolutions"
                });
            }
            else if (!resolutions.includes(res)) {
                errors.push({
                    message: `Invalid resolution: ${res}. Allowed values: P144, P240, P360, P480, P720, P1080, P1440, P2160`,
                    field: "availableResolutions"
                });
            }
        }
    }
    // Если есть ошибки
    if (errors.length > 0) {
        return res.status(400).send({ errorsMessages: errors });
    }
    // Создаем видео
    const newVideo = {
        id: in_memory_db_1.db.videos.length ? in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1].id + 1 : 1,
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions
    };
    in_memory_db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
})
    .put('videos/:id', (req, res) => {
    const video = in_memory_db_1.db.videos.find((d) => d.id === +req.params.id);
    if (!video) {
        return res.status(404).send({
            message: "Video not found",
            field: "id"
        });
    }
    const errors = [];
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
    if (!title) {
        errors.push({ message: 'Title is required', field: 'title' });
    }
    else if (typeof title !== 'string') {
        errors.push({ message: 'Title must be a string', field: 'title' });
    }
    else if (title.length > 40) {
        errors.push({ message: 'Title must be less than 40 characters', field: 'title' });
    }
    if (!author) {
        errors.push({ message: 'Author is required', field: 'author' });
    }
    else if (typeof author !== 'string') {
        errors.push({ message: 'Author must be a string', field: 'author' });
    }
    else if (author.length > 20) {
        errors.push({ message: 'Author must be less than 20 characters', field: 'author' });
    }
    if (!availableResolutions) {
        errors.push({ message: 'Available resolutions are required', field: 'availableResolutions' });
    }
    else if (!Array.isArray(availableResolutions)) {
        errors.push({ message: 'Available resolutions must be an array', field: 'availableResolutions' });
    }
    else if (availableResolutions.length === 0) {
        errors.push({ message: 'At least one resolution is required', field: 'availableResolutions' });
    }
    else {
        for (let i = 0; i < availableResolutions.length; i++) {
            const res = availableResolutions[i];
            if (typeof res !== 'string') {
                errors.push({ message: `Resolution at position ${i} must be a string`, field: "availableResolutions" });
            }
            else if (!resolutions.includes(res)) {
                errors.push({ message: `Invalid resolution: ${res}`, field: "availableResolutions" });
            }
        }
    }
    if (canBeDownloaded === undefined) {
        errors.push({ message: 'canBeDownloaded is required', field: 'canBeDownloaded' });
    }
    else if (typeof canBeDownloaded !== 'boolean') {
        errors.push({ message: 'canBeDownloaded must be a boolean', field: 'canBeDownloaded' });
    }
    if (minAgeRestriction === undefined) {
        errors.push({ message: 'minAgeRestriction is required', field: 'minAgeRestriction' });
    }
    else if (minAgeRestriction !== null && typeof minAgeRestriction !== 'number') {
        errors.push({ message: 'minAgeRestriction must be a number or null', field: 'minAgeRestriction' });
    }
    else if (minAgeRestriction !== null && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
        errors.push({ message: 'minAgeRestriction must be between 1 and 18 or null', field: 'minAgeRestriction' });
    }
    if (!publicationDate) {
        errors.push({ message: 'publicationDate is required', field: 'publicationDate' });
    }
    else if (typeof publicationDate !== 'string') {
        errors.push({ message: 'publicationDate must be a string', field: 'publicationDate' });
    }
    else {
        const date = new Date(publicationDate);
        if (isNaN(date.getTime())) {
            errors.push({ message: 'publicationDate must be a valid date', field: 'publicationDate' });
        }
    }
    if (errors.length > 0) {
        return res.status(400).send({ errorsMessages: errors });
    }
    video.title = title;
    video.author = author;
    video.availableResolutions = availableResolutions;
    video.canBeDownloaded = canBeDownloaded;
    video.minAgeRestriction = minAgeRestriction;
    video.publicationDate = publicationDate;
    res.status(204).send();
})
    .delete('videos/:id', (req, res) => {
    const videoId = in_memory_db_1.db.videos.findIndex(video => video.id === video.id);
    if (videoId === -1) {
        return res.status(404).send({
            errorsMessages: [{ message: "Video not found", field: "id" }]
        });
    }
    in_memory_db_1.db.videos.splice(videoId, 1);
    res.status(204).send();
});
