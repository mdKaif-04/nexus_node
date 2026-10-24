import { MessageSquare } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Nav = () => {
    const {selectedConv}=useSelector(state=>state.conversation)
    return (
        <div className='h-14 flex items-center justify-between px-5 border-b border-white/6 gap2.5 bg-[#0d0f14]'>
            <div>
                <MessageSquare />
            </div>
            <div>
           {selectedConv?.title || 'New Chat'}
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Nav