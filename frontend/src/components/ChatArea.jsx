import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setMessages } from '../redux/messageSlice'

const ChatArea = () => {
  const {selectedConv}=useSelector(state=>state.conversation)
  const dispatch = useDispatch()
  useEffect(()=>{
   const getMesg =async() =>{
    if(selectedConv){
    const data= await getMessages(selectedConv?._id)
   dispatch(setMessages(data))
    }
  }
    getMesg()
  },[selectedConv])
  return (
    <div className='flex flex-1 flex-col'>
     <Nav/>
     <MessageList/>
     <ChatInput/>
    </div>
  )
}

export default ChatArea