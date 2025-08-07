import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from '@mui/material/Skeleton';

function App() {
    const [messages, setMessages] = useState({ data: [{ message: 'Hello! How can I assist you today?', client: false }] })
    const [inputMessage, setInputMessage] = useState({})
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        scrollIntoView()
    }, [messages])

    const scrollIntoView = () => {
        const container = containerRef.current
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }

    const askAI = async (inputSearch) => {
        setLoading(true)
        const computingMachineCode = 'p6grp74g59jf97qx'
        const baseUrl = `super-computing-machine-${computingMachineCode}-5000.app.github.dev`
        const response = await fetch(`https://${baseUrl}/query/` + inputSearch, { credentials: 'include' }).then(resp => resp?.json()).then(data => data)
            .catch(err => err)
        setLoading(false)
        updateLoader(response)
    }

    const updateLoader = (response) => {
        let tempList = messages?.data;
        let tempIndex = tempList?.findIndex((a) => a?.loading)
        tempList[tempIndex] = response
        setMessages({ data: tempList })
    }

    const handleSend = () => {
        const loadingMessage = { client: false, loading: true }
        if (inputMessage?.message) {
            messages.data = [...messages?.data, inputMessage, loadingMessage]
            setMessages({ ...messages })
        }
        else return
        setInputMessage({})
        askAI(inputMessage?.message)
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setInputMessage({ ...inputMessage, message: value, client: true })
    }

    return (
        <div className="App">
            <h5 className='title'>Powered by GitHub OpenAI GPT-4.1 Model</h5>
            <div className='chat_container'>
                <div className='chat_message_container' id='chat_message_container' ref={containerRef}>
                    {messages?.data?.map((messageObj, index) => (
                        <React.Fragment>
                            {messageObj?.message &&
                                <div key={index} className='message_text' style={{ justifyContent: (messageObj?.client ? 'right' : 'left') }}>
                                    <div className='message_body_inner' style={{ backgroundColor: (messageObj?.client ? '#028251' : '#848484') }}>
                                        {messageObj?.message}
                                    </div>
                                </div>
                            }
                            {messageObj?.loading &&
                                <div key={index} className='message_text' style={{ textAlign: (messageObj?.client ? 'right' : 'left') }}>
                                    <Box sx={{ width: '70%' }}>
                                        <Skeleton />
                                    </Box>
                                </div>
                            }
                        </React.Fragment>

                    ))}
                </div>

                <Box
                    component="form"
                    className='search_input'
                    sx={{ '& > :not(style)': { color: 'black' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='input_context'>
                        <TextField
                            value={inputMessage?.message ? inputMessage?.message : ''}
                            onChange={handleChange}
                            fullWidth
                            id="standard-basic"
                            label="Ask somthing"
                            variant="standard"
                        />

                        <Button size='small' loading={loading} variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
                            Send
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default App;
