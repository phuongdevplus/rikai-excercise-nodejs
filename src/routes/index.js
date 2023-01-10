import express from "express";
import { ArticlesController } from "../controllers/Articles.controller.js";
import { authController } from "../controllers/Auth.controller.js";
import { AuthorsController } from "../controllers/Authors.controller.js";
import { RoleController } from "../controllers/Roles.controller.js";
import { Usermiddleware } from "../middlewares/User.middleware.js";
import { upload } from "../middlewares/MulterMiddleWare.js";

const router = express.Router();

router.get("/roles", RoleController.get);

router.get("/articles", ArticlesController.get);
router.get("/articles/:id", ArticlesController.getOne);
router.post("/articles/:id",upload.single("Images"), ArticlesController.upload);
router.patch("/update/:id",upload.single("Images"), ArticlesController.update);
router.delete("/articles/:id", ArticlesController.delete);

router.get("/authors", AuthorsController.get);
router.post("/authors",upload.single("Images"), AuthorsController.upload);
router.patch("/update/:id",upload.single("Images"), AuthorsController.update);
router.delete("/authors/:id", AuthorsController.delete);

router.post("/login", authController.loginUser);
router.post("/register", authController.register);
router.post("/logout",Usermiddleware.verifyToken, authController.userLogout);

export default router;