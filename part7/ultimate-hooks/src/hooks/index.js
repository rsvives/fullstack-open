import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    getAll().then(res => {
      setResources(res)
    })
  }, [])

  const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
  }
  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources(resources.concat(res.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
