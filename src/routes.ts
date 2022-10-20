import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/pets", ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: "Lunna" },
    { id: 2, name: "Nina" },
    { id: 3, name: "Bela" },
  ]);
});

export { router };
