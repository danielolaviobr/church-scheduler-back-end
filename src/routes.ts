import { Router } from "express";
import CultoController from "./controllers/CultoController";
import DateController from "./controllers/DateController";

const routes = Router();

routes.post("/celula", CultoController.create);
routes.get("/celula", CultoController.index);
routes.get("/celula/:date", CultoController.show);
routes.delete("/celula/:id", CultoController.delete);

routes.get("/date/:type", DateController.show);

export default routes;
