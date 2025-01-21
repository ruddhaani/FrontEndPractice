import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// const tableElement = (
//   <table>
//     <tr>
//       <th>Name</th>
//       <th>Id</th>
//       <th>Email</th>
//     </tr>
//     <tr>
//       <td>Ani</td>
//       <td>123</td>
//       <td>ramaneaniruddha22@gmail.com</td>
//     </tr>
//   </table>
// )

createRoot(document.getElementById('root')).render(
  <App />
)
