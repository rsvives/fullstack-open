import {gql} from '@apollo/client'

export const ALL_PERSONS = gql`
query{
  allPersons{
    name
    phone
    id
  }
}
`

export const FIND_BY_NAME = gql`
query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch){
    name
    phone
    id
    address{
      street
      city
    }
  }
}
`

export const ADD_PERSON = gql`
mutation createPerson($name: String!,$street: String!, $city: String!, $phone: String){
  addPerson(name:$name, street:$street, city:$city, phone:$phone){
    id
    name
    phone
    address{
      street
      city
    }
  }
}
`

export const EDIT_NUMBER = gql`
mutation editNumber($name: String!,$phone: String!){
    editNumber(name:$name, phone:$phone){
        id
        name
        phone
        address{
            street
            city
        }
    }
}
`
