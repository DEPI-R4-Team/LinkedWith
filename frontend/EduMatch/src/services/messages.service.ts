import { api } from "@/services/api";
import type { Message, MessageCreatePayload } from "@/types/message";

export async function getSessionMessages(sessionId: string | number): Promise<Message[]> {
  const response = await api.get<Message[]>(`/messages/session/${sessionId}`);
  return response.data;
}

export async function sendMessage(data: MessageCreatePayload): Promise<Message> {
  const response = await api.post<Message>("/messages", data);
  return response.data;
}
