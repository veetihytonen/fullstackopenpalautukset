import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Contact = ({ person, rmContact }) => {

  return <p> {person.name} {person.number} <button onClick={() => rmContact(person.id)} >delete</button> </p >
}

const RenderContacts = ({ persons, filter, rmContact }) => {
  const filteredPersons = persons.filter(
    (person) => !filter || person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return filteredPersons.map(
    (person) => <Contact key={person.name} person={person} rmContact={rmContact} />
  )
}

const FilterBox = ({ filter, onChange }) => {
  return (
    <>
      <label>filter shown with: </label>
      <input value={filter} onChange={onChange}></input>
    </>
  )
}

const NewContact = ({
  submitForm,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) =>
  <form onSubmit={submitForm}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={notificationStyle}> {message} </div>
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={notificationStyle}> {message} </div>

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initalContacts => {
        setPersons(initalContacts)
      })
  }, [])

  const submitForm = (event) => {
    event.preventDefault()

    if (nameAlreadyExists()) {
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)) {

        const currContact = persons.find(person => person.name === newName)
        const modifiedContact = { ...currContact, number: newNumber }

        contactService
          .changeNumber(modifiedContact)
          .then((modifiedList) => {
            setPersons(modifiedList)
            setAlertMessage(`Changed number of ${newName} from ${currContact.number} to ${modifiedContact.number}`)
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000)
            clearForm()
          })
          .catch(error => {
            setErrorMessage(`Information of ${modifiedContact.name} has already been removed from the server`)
          })

      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    contactService
      .create(newPerson)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setAlertMessage(`Added ${newName}`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
        clearForm()
      })
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const nameAlreadyExists = () => {
    const searchResults = persons.filter((person) => person.name === newName)

    return searchResults.length > 0
  }

  const removeContact = (id) => {
    const contactToBeRemoved = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${contactToBeRemoved.name} ?`)) {
      contactService.remove(id)
      setAlertMessage(`Deleted ${contactToBeRemoved.name}`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <ErrorMessage message={errorMessage} />
      <FilterBox filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <NewContact
        submitForm={submitForm}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <RenderContacts persons={persons} filter={filter} rmContact={removeContact} />
    </div>
  )

}

export default App