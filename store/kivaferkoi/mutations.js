export default {
  fillKivaferkoi (state, data) {
    state.kivaferkoi = { ...data }
  },

  editPicked (state, data) {
    state.kivaferkoi.picked = [...data]
  }
}
