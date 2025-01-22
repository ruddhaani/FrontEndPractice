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

        <tbody>
        {list.map((item) => (
          <tr>
            {Object.keys(item).map((key) => (
              <td>{item[key]}</td>
            ))}
          </tr>
        ))}
        </tbody>
    </table>
  )
}

export default Table