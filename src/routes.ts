import { Router } from "express";

import CelulaController from "./controllers/CelulaController";
import DateController from "./controllers/DateController";
import GaleriaController from "./controllers/GaleriaController";
import GaleriaDateController from "./controllers/GaleriaDateController";
import MaxCapacityController from "./controllers/MaxCapacityController";

const routes = Router();

routes.post("/celula", CelulaController.create);
routes.get("/celula", CelulaController.index);
routes.get("/celula/:date", CelulaController.show);
routes.delete("/celula/:id", CelulaController.delete);

routes.get("/date/:type", DateController.show);

routes.post("/galeria_date", GaleriaDateController.create);
routes.get("/galeria_date", GaleriaDateController.show);

routes.post("/galeria", GaleriaController.create);
routes.delete("/galeria/:id", GaleriaController.delete);
routes.get("/galeria/:date", GaleriaController.show);

routes.get("/max_capacity/:event", MaxCapacityController.show);
routes.post("/max_capacity/:event", MaxCapacityController.create);

export default routes;
