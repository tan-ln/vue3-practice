import axios from 'axios'

// const instance = axios.create({
//   baseURL: '',
//   timeout: 1000
// })

const post = (url, data = {}) => {
  console.log('post')
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

export {
  post,
  get
}
