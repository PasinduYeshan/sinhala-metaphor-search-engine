import {Router} from "express";
import cAbout from "./about";
import {rBuilder} from "../utils/resp";

import rSong from "./[song]";


export const rApi = Router();

// Specific middlewares for /api routes
rApi.use(rBuilder);

// Endpoints
rApi.get("/", cAbout);

// Routers
rApi.use("/song", rSong)

// Router
export default rApi
