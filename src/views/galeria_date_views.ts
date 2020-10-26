import GaleriaDate from "../models/GaleriaDate";

export default {
  render(galeriaDate: GaleriaDate) {
    return {
      date: galeriaDate.date,
      selected: galeriaDate.selected,
    };
  },

  renderMany(galeriaDates: GaleriaDate[]) {
    return galeriaDates.map((galeriaDate) => this.render(galeriaDate));
  },
};
