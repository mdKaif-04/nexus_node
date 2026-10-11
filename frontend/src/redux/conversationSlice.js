import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        selectedConv:null
        },
     reducers:{
       setConversation:(state,action)=>{
        state.conversations=action.payload
       },
       addConversation:(state,action)=>{
        state.conversations.unshift(action.payload)
       },
       setSelectedConv:(state,action)=>{
        state.selectedConv=action.payload

       }
     }   
})

export const {setConversation,addConversation,setSelectedConv}=conversationSlice.actions
export default conversationSlice.reducer