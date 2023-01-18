import {EHandler, Handler} from "../../utils/types";
import { inspectBuilder, body, param } from "../../utils/inspect";
import elasticClient from "../../utils/elasticsearch";
/**
 * :: STEP 1
 * Validate Request
 */
// const inspector = inspectBuilder(
//     body("firstName").optional().isString().withMessage("firstName is required"),
//     body("lastName").optional().isString().withMessage("lastName is is required"),
//     body("email").optional().isEmail().withMessage("email is required"),
//     body("telephone").optional().isMobilePhone("any").withMessage("telephone is required"),
//     param("userId").optional().isUUID().withMessage("invalid user id")
// )

/**
 * :: STEP 2
 * Search song
 */
const searchSong: Handler = async (req: any, res: any) => {
    const {r} = res;
    // // Setup Data
    // const userId = req.params.userId || req.user.userId

    // const userData = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     telephone: req.body.telephone,
    // };

    // // Sync model to database
    // const [{code}] = await model.user.update_UserDetails(userId, userData)

    // if (code === MErr.NO_ERROR) {
    //     r.status.OK()
    //         .message("Success")
    //         .send();
    //     return;
    // }

    // if (code === MErr.DUPLICATE_ENTRY) {
    //     r.status.BAD_REQ()
    //         .message("email address is associated with another account.")
    //         .send()
    //     return;
    // }
    r.status.OK().message("Success").send();
    // r.pb.ISE();
};


/**
 * Request Handler Chain
 */
export default [<EHandler>searchSong]
