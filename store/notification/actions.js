import axios from 'axios'

export default {
  /**
   * Fetch des notifications
   * @param context permet d'intéragir avec le store
   * @param data
   * @returns {Promise<unknown>}
   */
  fetch: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/notification/user?user=' + data.user, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('fill', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  },

  create: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_url + '/notification', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('add', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  seen: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/notification/seen', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('seen', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  },

  read: (context, data) => {
    const token = data.token
    delete data.token

    return new Promise((resolve, reject) => {
      axios.put(process.env.api_url + '/notification/read', data, {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('read', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  }
}
