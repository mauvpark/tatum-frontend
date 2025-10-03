import { apiClient } from "../../client/apiClient";
import type { CloudsInstance } from "./types";

export const cloudsService = {
	getInstances: async () => {
		const response = await apiClient.get<CloudsInstance[]>(
			"/cloud-instances"
		);
		return response.data;
	},

	createInstance: async (data: Omit<CloudsInstance, "id">) => {
		const response = await apiClient.post<CloudsInstance>(
			"/cloud-instances",
			data
		);
		return response.data;
	},

	updateInstance: async (id: string, data: Partial<CloudsInstance>) => {
		const response = await apiClient.put<CloudsInstance>(
			`/cloud-instances/${id}`,
			data
		);
		return response.data;
	},

	deleteInstance: async (id: string) => {
		const response = await apiClient.delete(`/cloud-instances/${id}`);
		return response.data;
	},
};
