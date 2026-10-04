import { getModel } from "../config/llmModels"

export const chatAgent=async(state)=>{
 const llm = getModel("chat")
 const systemPrompt="You are Nexus-node, an intelligent AI assistent."
 const response = await llm.invoke([
    {
        "role":"system",
        "content":systemPrompt
    },
    {
        "role":"human",
        "content":state.prompt
    }
 ])

 return {
    ...state,
    aiResponse:response.content
 }
}