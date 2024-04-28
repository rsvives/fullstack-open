import { useEffect, useState } from 'react'
import './App.css'
import{ useQuery, useMutation} from '@apollo/client'
import {ALL_PERSONS,FIND_BY_NAME, ADD_PERSON, EDIT_NUMBER} from './queries.js'

function App() {

  const [add_person] = useMutation(ADD_PERSON,{refetchQueries:[{query:ALL_PERSONS}]})


  useEffect

  const result = useQuery(ALL_PERSONS)
// const result = useQuery(FIND_BY_NAME,{variables:{nameToSearch:"Arto Hellas"}})
if (result.loading) {
  return <div> loading...</div>
}
console.log(result);

const addNewPerson = ()=>{
  const person={
    name: null,
    phone: null,
    street: null,
    city: "caladre"
  }
  const {name,phone,street,city} = person
  add_person({variables:{name,phone,street,city}})
}

    return(
      <>
      <h1>Hola mundo</h1>
      <div>
        {result.data.allPersons.map(p => <pre key={p.id}>{JSON.stringify(p)}</pre>)}
      </div>
      <button onClick={addNewPerson}>add new</button>
      {/* <div>{JSON.stringify(result.data.findPerson)}</div> */}


      </>
    )
}

export default App
