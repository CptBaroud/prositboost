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
  }
}
