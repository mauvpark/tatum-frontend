import { apiClient } from "@/api/client/apiClient";
import { Cloud } from "@/types";

export const cloudService = {
	getInstanceById: async (id: string) => {
		const response = await apiClient.get<Cloud>(`/cloud-instances/${id}`);
		return response.data;
	},
};
