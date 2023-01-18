import { Router } from "express";
import searchSong from "./queries";
import getMeta from "./agg";

const rSong = Router();
rSong.post("/search", searchSong);
rSong.get("/meta", getMeta);



export default rSong;
