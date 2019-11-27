import React, { useState, useEffect } from 'react'

export default function ViewTable ({ service, headers, initialData=[] }) {
  let [tableData, setTableData] = useState([])

  useEffect(() => {
    service
      .call({ endpoint: 'options' })
      .then(res => buildSearchTree(res))
  })

  function createNew () {
    service
      .call({ endpoint: 'options' })
      .then(res => buildSearchTree(res))
  }

  function callDelete (id) {
    console.log('call delete')
  }

  function buildSearchTree (input) {
    setTableData(input)
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
