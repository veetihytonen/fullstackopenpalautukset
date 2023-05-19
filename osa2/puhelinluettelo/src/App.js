import { useState } from 'react'

const Contact = ({ person }) => <p> {person.name} {person.number} </p>

const RenderContacts = ({ persons, filter }) => {
  const filteredPersons = persons.filter(
    (person) => !filter || person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return filteredPersons.map(
    (person) => <Contact key={person.name} person={person} />
  )
}

const Filter = ({ filter, onChange }) => {
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


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const submitForm = (event) => {
    event.preventDefault()

    if (nameAlreadyExists()) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <NewContact
        submitForm={submitForm}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <RenderContacts persons={persons} filter={filter} />
    </div>
  )

}

export default App