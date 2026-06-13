import { z } from 'zod';
import { apiClient } from '../client';
import {
  createListSchema,
  updateListSchema,
  updateListItemsSchema,
} from '../schemas/lists.schema';
import {
  CreateListResponse,
  MyListsResponse,
  ListDetailResponse,
  GenericActionResponse,
} from '../types/lists.types';

export const ListsService = {
  createList: async (payload: z.infer<typeof createListSchema>): Promise<CreateListResponse> => {
    const { data } = await apiClient.post<CreateListResponse>('/api/v1/lists', payload);
    return data;
  },

  getMyLists: async (page: number = 1, limit: number = 20): Promise<MyListsResponse> => {
    const { data } = await apiClient.get<MyListsResponse>('/api/v1/lists/me', {
      params: { page, limit },
    });
    return data;
  },

  getListDetail: async (listId: string): Promise<ListDetailResponse> => {
    const { data } = await apiClient.get<ListDetailResponse>(`/api/v1/lists/${listId}`);
    return data;
  },

  updateList: async (listId: string, payload: z.infer<typeof updateListSchema>): Promise<GenericActionResponse> => {
    const { data } = await apiClient.put<GenericActionResponse>(`/api/v1/lists/${listId}`, payload);
    return data;
  },

  deleteList: async (listId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/lists/${listId}`);
  },

  updateListItems: async (listId: string, payload: z.infer<typeof updateListItemsSchema>): Promise<GenericActionResponse> => {
    const { data } = await apiClient.put<GenericActionResponse>(`/api/v1/lists/${listId}/items`, payload);
    return data;
  },
};
