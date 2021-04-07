import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/users', {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          context.commit('setUsers', response.data)
          context.commit('setDropdownUsers', response.data)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  },

  createAccount (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/users/createAccount', data, {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          context.commit('edit', response.data)
          resolve(response.data)
        }).catch((onerror) => {
        // eslint-disable-next-line no-console
          console.error(onerror)
          reject(onerror)
        })
    })
  },

  updateData (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/users/update', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        delete data._id
        updatedUser[Object.keys(data)[0]] = data[Object.keys(data)[0]]
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  checkPassword (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/users/checkPassword', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  changePassword (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/users/changePassword', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        // Le mdp à été changé donc on deconnecte l'user
        if (response.status === 200) {
          this.$auth.logout()
        }
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  },

  updateProfilePicture (context, data) {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/users/profilePicture', data, {
        headers: {
          authorization: token
        }
      }).then((response) => {
        const updatedUser = { ...this.$auth.user }
        delete response.data._id
        updatedUser.avatar = response.data.avatar
        this.$auth.setUser(updatedUser)
        resolve(response)
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(e)
      })
    })
  }
}
