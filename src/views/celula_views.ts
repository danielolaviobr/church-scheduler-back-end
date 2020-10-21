import Celula from "../models/Celula";

export default {
  render(celula: Celula) {
    return {
      id: celula.id,
      name: celula.name,
      scheduled_to: celula.scheduled_to,
    };
  },

  renderMany(celulas: Celula[]) {
    return celulas.map((celula) => this.render(celula));
  },
};
