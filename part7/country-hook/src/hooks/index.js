import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

const getCountryDetails = async()=>{
    const countryDetails = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    console.log('axios',countryDetails);
    return countryDetails

}

  useEffect(()=>{
    if(name===''){
      setCountry(null)
    }else{
      getCountryDetails().then(c=>{
        const mappedCountry = {
          data:{
            name:c.data.name.common,
            capital:c.data.capital,
            population:c.data.population,
            flag:c.data.flags.png,
            rest:c.data
          },
          found:true
        }
        // console.log(c,mappedCountry);
        
        setCountry(mappedCountry)
      }).catch(e=>{
        console.error(e);
        setCountry({
          data:e.response.data,
          found:false
        })
      })
    }
  },[name])

  return country 
}