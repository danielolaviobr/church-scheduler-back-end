import Galeria from "../models/Galeria";

export default {
  render(galeria: Galeria) {
    return {
      id: galeria.id,
      name: galeria.name,
      scheduled_to: galeria.scheduled_to,
    };
  },

  renderMany(galeiras: Galeria[]) {
    return galeiras.map((galeira) => this.render(galeira));
  },
};
