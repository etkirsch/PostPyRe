import React from 'react'
import TableRow from './TableRow'
import './example-table.scss'

export default function ViewTable ({ service, endpoint, headers, onDelete, tableData=[] }) {
  function header (col) {
    return (
      <th key={`view-table-${col.text}`} style={col.style}>
        {col.text}
      </th>
    )
  }

  function row (rowData) {
    return (
      <TableRow
        key={rowData.id}
        service={service}
        endpoint={endpoint}
        initialData={rowData}
        onDelete={onDelete} />
    )
  }

  return (
    <table>
      <thead>
        <tr>{headers.map(col => header(col))}</tr>
      </thead>
      <tbody>
        {tableData.map(x => row(x))}
      </tbody>
    </table>
  )
}
