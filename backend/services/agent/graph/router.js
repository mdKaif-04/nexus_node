import { getModel } from "../config/llmModels"

export const router = async (state) => {
    const llm = await getModel("router")
    const prompt = `Route the user's message to ONE agent. Reply with only the agent name.

chat: general questions, explanations, learning, writing, advice (default)
search: needs live or recent info (news, prices, scores, weather, latest versions)
coding: write/debug/review code, architecture, APIs, errors
pdf: create PDFs or work with a provided document
ppt: create slides/decks or work with provided slides
imageGen: create a new image, logo, or artwork

Rules:
- Judge intent, not keywords.
- Needs recent/real-time info -> search, even for technical topics.
- Conceptual questions -> chat; actual code work -> coding.
- Short follow-ups keep the previous agent.
- Unsure -> chat.

Output exactly one of: chat, search, coding, pdf, ppt, imageGen

    user Query:
    ${state.prompt}
    `

    const response =await llm.invoke(prompt)
    return {
        ...state,
        agent:response.content.trim().toLowerCase()
    }
}
