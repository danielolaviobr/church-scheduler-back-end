import { Router } from "express";
import CelulaController from "./controllers/CelulaController";
import DateController from "./controllers/DateController";

const routes = Router();

routes.post("/celula", CelulaController.create);
routes.get("/celula", CelulaController.index);
routes.get("/celula/:date", CelulaController.show);
routes.delete("/celula/:id", CelulaController.delete);

routes.get("/date/:type", DateController.show);

export default routes;
