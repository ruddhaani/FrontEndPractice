import React from 'react'

const Table = ({list}) => {
  return (
    <table>
        <tr>
            {Object.keys(list[0]).map((key) => {
                return (
                    <th>{key}</th>
                )
            })}
        </tr>

        {list.map((item) => (
          <tr>
            {Object.keys(item).map((key) => (
              <td>{item[key]}</td>
            ))}
          </tr>
        ))}
    </table>
  )
}

export default Table