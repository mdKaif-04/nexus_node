import React, { useEffect, useState } from 'react'
import { Coins, LogOut, MessageSquare, PanelLeftIcon, PenSquare, Plus, User } from 'lucide-react'
import { createConversation, getConversations } from '../features/conversations'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, setConversation, setSelectedConv } from '../redux/conversationSlice'
import logOut from '../features/logOut'
import { setUserData } from '../redux/userSlice'

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const [imageError, setImageError] = useState(false)
    const { conversations, selectedConv } = useSelector(state => state.conversation)
    const { userData, setU } = useSelector(state => state.user)
    useEffect(() => {
        setImageError(false)
    }, [userData?.avatar])

    useEffect(() => {
        const getConv = async () => {
            const data = await getConversations()
            dispatch(setConversation(data))
        }
        getConv()
    }, [userData?._id])

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
                    {conversations.map((conv, i) => {
                        const isActive = selectedConv?._id == conv?._id
                        return (
                            <div key={conv?._id || i}
                                onClick={() => dispatch(setSelectedConv(conv))}
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5
                                rounded-[10px] border transition-colors duration-150
                                 ${isActive ? "bg-indigo-500/10 border-indigo-500/18"
                                        : "bg-transparent border-transparent"}`}>
                                <div className={`flex items-center justify-center shrink-0 w-7 h-7
                                        rounded-lg transition-colors duration-150
                                        ${isActive ? "bg-indigo-500/15 text-indigo-400"
                                        : "bg-white/5 text-slate-500"}`}>
                                    <MessageSquare size={13} />
                                </div>
                                <span className={`text-[13px] font-medium truncate 
                                    ${isActive ? "text-slate-100" : "text-slate-300"}`}>
                                    {conv?.title || "New Chat"}</span>

                            </div>
                        )

                    })}
                </div>

                <div className='mx-2.5 h-px bg-white/16' />
                <div className='px-3.5 py-3.5'>{userData ? (
                    <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 
                        hover:bg-white/5 transition-colors duration-150'>
                        <div className='relative shrink-0 '>
                            {
                                (userData?.avatar && !imageError)
                                    ?
                                    <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25'
                                        src={userData?.avatar}
                                        alt={userData?.name || 'User avatar'}
                                        referrerPolicy='no-referrer'
                                        onError={() => setImageError(true)} />
                                    :
                                    <div className='w-9 h-9 rounded-[10px] bg-white/6 flex items-center justify-center border-2 border-indigo-500/25'>
                                        <User size={16} className='text-slate-400' />
                                    </div>
                            }

                        </div>
                        <div className='flex-1 min-w-0'>
                           <p className='text-sm font-semibold text-slate-100 truncate'>
                            {userData?.name || "User"}</p>
                           <p className='text-xs text-slate-600 mt-px'>{"Free Plan"}</p>
                        </div>
                        <div className='flex gap-1'>
                            <button className='flex items-center justify-center w-7 h-7 rounded-lg border-none
                             bg-transparent text-yellow-600 cursor-pointer hover:bg-white/8 hover:text-slate-400
                             transition-all duration-150'>
                                <Coins size={16}/>
                            </button>
                            <button className='flex items-center justify-center w-7 h-7 rounded-lg border-none
                             bg-transparent text-slate-600 cursor-pointer hover:bg-white/8 hover:text-slate-400
                             transition-all duration-150'
                             onClick={()=>{logOut();
                                dispatch(setUserData(null))
                             }}>
                                <LogOut size={16}/>
                            </button>

                        </div>

                    </div>)
                    : <button className='w-full flex items-center justify-center gap-2 text-sm font-medium
                    text-slate-200 bg-white/5 border border-white/8 rounded-xl py-3 cursor-pointer 
                    hover:bg-white/8 transition-colors duration-150 '>
                        Login</button>}</div>

            </div>
        </div>
    )
}

export default Sidebar
