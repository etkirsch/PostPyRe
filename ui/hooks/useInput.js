import React, { useState } from 'react'

export function useInput (initial, type='string') {
  const [data, setData] = useState(initial)
  const input = (
    <input
      value={data}
      onChange={e => setData(e.target.value)}
      type={type} />
  )

  return [data, input]
}
