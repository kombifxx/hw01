import { Video } from "../types/interface";

export const db: { videos: Video[] } = {
    videos: []  // теперь TS знает: это массив Video, просто пока пустой
};

