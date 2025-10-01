import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TitleBox from './components/TitleBox'
import InputBox from './components/InputBox'
import Card from './components/Card'

function App() {
  const [todoList, setTodoList] = useState([])


  return (
    <>
      <div className="root">
        
        <TitleBox />
        <InputBox onAdd={
          (value) => 
          setTodoList((prev) => [...prev, value])} />
        
          <Card
              item={todoList}
          />
        
      </div>

    </>
    
  )
}

export default App
