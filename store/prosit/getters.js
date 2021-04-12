export default {
  prosits (state) {
    return state.prosits
  },

  prositOrder (state) {
    const temp = state.prosits.slice()
    return temp
      .sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateA - dateB
      })
  },

  displayProsit (state) {
    return state.displayProsit
  }
}
