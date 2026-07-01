import { api } from "@/services/api";
import type { ChatConversation, Message, MessageCreatePayload } from "@/types/message";

export async function getMyChatConversations(): Promise<ChatConversation[]> {
  const response = await api.get<ChatConversation[]>("/messages/conversations/my");
  return response.data;
}

export async function getSessionMessages(sessionId: string | number): Promise<Message[]> {
  const response = await api.get<Message[]>(`/messages/session/${sessionId}`);
  return response.data;
}

export async function getApplicationMessages(applicationId: string | number): Promise<Message[]> {
  const response = await api.get<Message[]>(`/messages/application/${applicationId}`);
  return response.data;
}

export async function sendMessage(data: MessageCreatePayload): Promise<Message> {
  const response = await api.post<Message>("/messages", data);
  return response.data;
}

export async function sendApplicationMessage(applicationId: string | number, message: string): Promise<Message> {
  const response = await api.post<Message>(`/messages/application/${applicationId}`, { message });
  return response.data;
}
