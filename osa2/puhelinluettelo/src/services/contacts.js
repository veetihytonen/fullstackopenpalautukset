import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

const create = (newContact) => {
    const request = axios.post(baseUrl, newContact)

    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)
}

const changeNumber = (modifiedContact) => {
    const request = axios.put(`${baseUrl}/${modifiedContact.id}`, modifiedContact)
    const modifiedList = request
        .then(() => getAll())

    return modifiedList
}

export default { getAll, create, remove, changeNumber }