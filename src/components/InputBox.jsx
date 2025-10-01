import { useState } from "react"

function InputBox({ onAdd }) {
    const [inputText, setInputText] = useState('');

    const setList = (inputText) => {
        if (inputText.trim()) {
            setInputText('')
            onAdd(inputText)
        }

    }
    const [todoList, setTodoList] = useState('')
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder='여따 할일 작성하쇼'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        e.key=='Enter'?setList(inputText):0
                        
                    }}
                />

                <button onClick={() => setList(inputText)}>확인</button>

            </div>
        </>
    );
}
export default InputBox