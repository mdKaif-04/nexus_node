import React from 'react'

const ChatInput = () => {
  return (
    <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]'>
      <div className='flex flex-col bg-white/3 gap-2 border-white/7 rounded-2xl px-4 pt-3.5 pb-3'>
        <textarea placeholder='Ask NexusNode' className='w-full bg-transparent outline-none resize-none text-[14px] text-slate-200
          placeholder:text-slate-600 leading-relaxed scrollbar-none [&::webkit-scrollbar]:hidden disabled:opacity-50'/>
      </div>
    </div>
  )
}

export default ChatInput