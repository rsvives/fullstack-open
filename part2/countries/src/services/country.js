import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  return axios.get(baseUrl + 'all').then((response) => {
    // console.log('fetching all countries', response)
    return response.data
  })
}

export default { getAll }
