import React, { useState, useEffect } from 'react'
import TableRow from './TableRow'
import './example-table.css'

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

  function appendToData (result) {
    setTableData((currentData) => [...currentData, result])
  }

  function removeElement (id) {
    setTableData((currentData) => currentData.filter(x => x.id !== id))
  }

  function header (col) {
    return (
      <th style={col.style}>
        {col.text}
      </th>
    )
  }

  function row (data) {
    return (
      <TableRow
        key={data.id}
        service={service}
        endpoint={endpoint}
        initialData={data}
        onDelete={(_, id) => removeElement(id)} />
    )
  }

  return (
    <div className='table-pane'>
      <div className='header'>
        <div className='text'>Viewing Test Models</div>
        <button className='create-new' onClick={createNew}>Create New</button>
      </div>
      <table>
        <thead>
          <tr>{headers.map(col => header(col))}</tr>
        </thead>
        <tbody>
          {tableData.map(x => row(x))}
        </tbody>
      </table>
    </div>
  )
}
