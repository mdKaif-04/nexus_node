import api from '../utils/axios'
export const createConversation=async()=>{
    try {
        const {data}=await api.get('/api/chat/create-conversation')
          return data
    } catch (error) {
        console.log(error)
        return []
        
    }
}

export const getConversations=async()=>{
    try {
        const {data}=await api.get('/api/chat/get-conversation')
           return data
    } catch (error) {
        console.log(error)
        return []
        
    }
    
}
