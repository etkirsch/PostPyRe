import React, { useState, useEffect } from 'react'
import TableRow from './TableRow'

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
    <div>
      <button onClick={createNew}>Create New</button>
      <table>
        <thead>
          <tr>
            {headers.map(col => <th>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableData.map(x => row(x))}
        </tbody>
      </table>
    </div>
  )
}
