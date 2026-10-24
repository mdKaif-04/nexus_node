import api from '../utils/axios'

async function getMessages (convId) {
  try {
    const {data} = await api.get(`/api/chat/get-messages/${convId}`)
    console.log("datata",data)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default getMessages