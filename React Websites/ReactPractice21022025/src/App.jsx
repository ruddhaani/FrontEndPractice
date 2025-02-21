import { createBrowserRouter } from "react-router"
import HomeLayout from "./layouts/HomeLayout"
import Home from "./components/Home"
import About from "./components/About"
import { RouterProvider } from "react-router-dom"
import Stopwatch from "./components/Stopwatch"
import Counter from "./components/Counter"

function App() {

  let router = createBrowserRouter([
    {
      "path" : "/",
      "element" : <HomeLayout />,
      "children" : [
        {
          "path" : "",
          "element" : <Home />
        },
        {
          "path" : "about",
          "element" : <About /> 
        },
        {
          "path" : "stopwatch",
          "element" :  <Stopwatch />
        },
        {
          "path" : "counter",
          "element" : <Counter />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
