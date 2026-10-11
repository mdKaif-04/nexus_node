import React, { useEffect, useState } from 'react'
import { PanelLeftIcon, PenSquare, Plus } from 'lucide-react'
import { createConversation, getConversations } from '../features/conversations'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, setConversation } from '../redux/conversationSlice'

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const { conversations,selectedConv } = useSelector(state => state.conversation)
    useEffect(() => {
        const getConv = async () => {
            const data = await getConversations()
            dispatch(setConversation(data))
        }
        getConv()
    }, [])

    const handleCreateConv = async () => {
        const data = await createConversation()
        dispatch(addConversation(data))
    }
    return (
        <div className='fixed  lg:static inset-y-0 left-0 z-50 w-67.5 h-screen shrink-0 bg-[#0d0f14] border-r 
     border-white/6'>
            <div className='flex flex-col h-full '>
                <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/6'>
                    <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
                hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none
                cursor-pointer' onClick={() => setCollapsed(true)}>

                        <PanelLeftIcon />
                    </div>
                    <span className='text-lg font-semibold text-slate-200 tracking-wide 
                    flex-1'>NexusNode</span>
                    <span className='text-10px font-medium text-indigo-400 bg-indigo-50/10 border
                    border-indigo-500/20 px-2  rounded-full tracking-wide'>free </span>
                    <button className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500
                hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none
                cursor-pointer' onClick={handleCreateConv}><PenSquare /></button>
                </div>
                <div className='px-4 pt-4 pb-1'>
                    <button className='w-full flex items-center justify-center gap-2 text-sm font-medium
                text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-2.5 
                border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'onClick={handleCreateConv}><Plus size={15} />New Chat</button>
                </div>
                {conversations.length == 0 ?
                    <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                        no recent Conversations
                    </div>
                    : (
                        <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                            recents
                        </div>)}

                        <div className='flex-1 overflow-y-auto px-2.5 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden'>
                          {conversations.map((conv,i)=>{
                             const isActive=selectedConv?._id==conv?._id
                             
                          })}
                        </div>

            </div>
        </div>
    )
}

export default Sidebar
