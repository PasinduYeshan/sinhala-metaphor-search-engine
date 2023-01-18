import { Router } from "express";
import searchSong from "./queries";

const rSong = Router();

// rUser.get('/details', auth.any, get_details)

// // User Login
// rUser.post('/login/local', localLogin)
// rUser.post('/login/admin', adminLogin)
// rUser.post("/refresh", refresh)

// // Other
// rUser.post("/register", register)

// rUser.put("/set-avatar/:userId*?", auth.any, avatar)
// rUser.put("/set-password/:userId*?", auth.any, password)
// rUser.put("/set-details/:userId*?", auth.any, details)

// rUser.post("/reset-password", reset_password)
// rUser.post("/send-reset-password", send_reset_password)
rSong.post("/search", searchSong);


export default rSong;
