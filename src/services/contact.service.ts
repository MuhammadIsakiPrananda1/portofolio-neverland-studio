import apiClient from './api.client';

// Types
export interface Contact {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message_type?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message_type?: string;
  message: string;
}

export interface ContactsResponse {
  success: boolean;
  data: {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ContactResponse {
  success: boolean;
  data: Contact;
  message?: string;
}

class ContactService {
  /**
   * Submit contact form (Public)
   */
  async submitContact(data: ContactFormData): Promise<ContactResponse> {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
  }

  /**
   * Get all contacts (Protected - Dashboard)
   */
  async getContacts(status?: string, page = 1, perPage = 15): Promise<ContactsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    const response = await apiClient.get<ContactsResponse>(`/contacts?${params.toString()}`);
    return response.data;
  }

  /**
   * Get single contact
   */
  async getContact(id: number): Promise<ContactResponse> {
    const response = await apiClient.get<ContactResponse>(`/contacts/${id}`);
    return response.data;
  }

  /**
   * Mark contact as read
   */
  async markAsRead(id: number): Promise<ContactResponse> {
    const response = await apiClient.put<ContactResponse>(`/contacts/${id}/read`);
    return response.data;
  }

  /**
   * Mark contact as replied
   */
  async markAsReplied(id: number): Promise<ContactResponse> {
    const response = await apiClient.put<ContactResponse>(`/contacts/${id}/replied`);
    return response.data;
  }

  /**
   * Delete contact
   */
  async deleteContact(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
  }
}

export default new ContactService();
