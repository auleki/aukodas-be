import { allUsers, register } from "../controllers/auth.controller.js";
import router from "../helpers/instances/router.js";

router.post("/register", register)
router.get("/users", allUsers)

export default router