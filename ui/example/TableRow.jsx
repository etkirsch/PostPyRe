import React, { useState } from 'react'

function useInput (initial) {
  const [data, setData] = useState(initial)
  const input = <input value={data} onChange={e => setData(e.target.value)} />
  return [data, input]
}

export default function TableRow ({ service, endpoint, initialData, onDelete }) {
  let [data, setData] = useState(initialData)
  let [name, nameInput] = useInput(data.name)
  let [showingInput, shouldShowInput] = useState(false)
  const specificEndpoint = `${endpoint}/${data.id}`

  function callDelete () {
    service
      .call({ endpoint: specificEndpoint, method: 'DELETE' })
      .then(res => onDelete(res, data.id))
  }

  function callUpdate () {
    let body = { ...data, name }
    shouldShowInput(false)
    setData(body)

    service
      .call({ endpoint: specificEndpoint, method: 'PUT', body })
  }

  function showName () {
    return (showingInput)
      ? <div>{nameInput}</div>
      : <div onClick={() => shouldShowInput(true)}>{data.name}</div>
  }

  function showControls () {
    return (showingInput)
      ? <button onClick={callUpdate}>Commit</button>
      : <button onClick={callDelete}>Delete</button>
  }

  return (
    <tr>
      <td>{data.id}</td>
      <td>{showName()}</td>
      <td>{showControls()}</td>
    </tr>
  )
}
