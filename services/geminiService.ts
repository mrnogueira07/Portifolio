import { ChatMessage } from "../types";

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  return "Serviço de IA desativado.";
};