import React, { useState, useEffect } from 'react'
import ViewTable from './ViewTable'

const endpoint = 'test-model'

export default function TableExample ({ service, headers, initialData=[] }) {
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
  
  return (
    <div className='table-pane'>
      <div className='header'>
        <div className='text'>Viewing Test Models</div>
        <button className='create-new' onClick={createNew}>Create New</button>
      </div>
      <ViewTable
        service={service}
        endpoint={endpoint} 
        tableData={tableData}
        headers={headers}
        onDelete={(_, id) => removeElement(id)} />
    </div>
  )
}
