export default {
  prosits (state) {
    return state.prosits
  },

  prositOrder (state) {
    const temp = state.prosits.slice()
    return temp
      .sort(function (a, b) {
        const dateA = new Date(a.created)
        console.log('Date A ' + dateA)
        const dateB = new Date(b.created)
        console.log('Date B ' + dateB)
        return dateA - dateB
      })
  },

  displayProsit (state) {
    return state.displayProsit
  }
}
