import axios from 'axios'
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL

const getAll = () => {
  console.log('fetching', baseUrl)
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
    .catch((error) => {
      alert(`the note '${newObject.content}' was already deleted from server`)
      return error
    })
}

export default {
  getAll,
  create,
  update
}
