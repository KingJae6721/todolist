import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TitleBox from '../../components/Box/TitleBox/TitleBox'
import InputBox from '../../components/Box/InputBox/InputBox'
import Card from '../../components/Box/Card/Card'
import Topbar from '../../components/Bar/Topbar/Topbar'


function Todolist() {
  const [todoList, setTodoList] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching todos from:', window.location.origin + '/api/todos');
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodoList(data))
      .catch(err => console.error('Failed to fetch todos:', err));
  }, []);

  // 새로운 할 일 추가
  const handleAdd = (taskValue) => {
    const newTodo = {
      task: taskValue,
      completed: false,         // 기본값
      category: "기본",         // 선택값 또는 드롭다운에서 선택
      notes: "",                 // 메모 입력값
      user_id: 1
    };

    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(() => {
        // ✅ POST 성공 후 DB에서 전체 리스트 다시 가져오기
        return fetch('/api/todos');
      })
      .then(res => res.json())
      .then(freshList => {
        setTodoList(freshList);
      })

      .catch(err => console.error('Failed to add todo:', err));
  };

  

  return (
    <>
      <div className="root">
        <Topbar />
        <TitleBox />
        <InputBox onAdd={handleAdd} />

        <Card item={todoList} />
      </div>

    </>

  )
}

export default Todolist
