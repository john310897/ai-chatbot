import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
function App() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState(null)

  const handleSend = (e) => {
    if(inputMessage)setMessages([...messages, inputMessage])
    console.log(messages)
    setInputMessage(null)
  }

  return (
    <div className="App">
      <div className='chat_container'>
        <Box
          component="form"
          className='search_input'
          sx={{ '& > :not(style)': { color: 'black' } }}
          noValidate
          autoComplete="off"
        >
          <div className='input_context'>
            <TextField value={inputMessage?inputMessage:''}onChange={(e)=>setInputMessage(e.target.value)}fullWidth id="standard-basic" label="Standard" variant="standard" />
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
              Send
            </Button>
          </div>


        </Box>
      </div>
    </div>
  );
}

export default App;
