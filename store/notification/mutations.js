export default {
  fill (state, data) {
    state.notification = data
  },

  add (state, data) {
    state.notification.push(data)
  },

  /**
   * Edit d'une notification
   * @param state
   * @param data
   */
  edit (state, data) {
    console.log(data._id)
    const index = state.notification.findIndex((item) => {
      return item._id === data._id
    })
    state.notification[index] = data
  },

  seen (state, data) {
    const index = state.notification.findIndex((item) => {
      return item._id === data._id
    })
    state.notification[index].seen = true
  },

  read (state, data) {
    const index = state.notification.findIndex((item) => {
      return item._id === data._id
    })
    state.notification[index].read = true
  }
}
