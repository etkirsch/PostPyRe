import React, { useState, useEffect } from 'react'

const endpoint = 'test-model'

export default function ViewTable ({ service, headers, initialData=[] }) {
  let [tableData, setTableData] = useState([])

  useEffect(() => {
    service
      .call({ endpoint })
      .then(res => setTableData(res))
  }, [service])

  function createNew () {
    let body = { name: 'Hero Test' }

    service
      .call({ endpoint, method: 'POST', body })
      .then(res => appendToData(res))
  }

  function callDelete (id) {
    service
      .call({ endpoint: `${endpoint}/${id}`, method: 'DELETE' })
      .then(res => removeElement(id))
  }

  function appendToData (result) {
    setTableData((currentData) => [...currentData, result])
  }

  function removeElement (id) {
    setTableData((currentData) => currentData.filter(x => x.id !== id))
  }

  function row (data) {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td><button onClick={() => callDelete(data.id)}>X</button></td>
      </tr>
    )
  }

  function table (data) {
    return (
      <table>
        {tableHeader(data)}
        <tbody>
          {data.map(x => row(x))}
        </tbody>
      </table>
    )
  }

  function tableHeader (data) {
    return (
      <thead>
        <tr>
          {headers.map(col => <th>{col}</th>)}
        </tr>
      </thead>
    )
  }

  return (
    <div>
      <button onClick={createNew}>Create New</button>
      {table(tableData)}
    </div>
  )
}
