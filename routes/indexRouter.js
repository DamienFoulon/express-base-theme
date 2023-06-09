// Libs
import express from 'express';

// Config
const router = express.Router();

// Middlewares
import { isFirstVisitMiddleware} from "../middlewares/isFirstVisit.js";

// Controllers
import { indexController } from "../controllers/indexControllers.js";

// Routes
router.get('/', isFirstVisitMiddleware, indexController);

export { router as indexRouter };