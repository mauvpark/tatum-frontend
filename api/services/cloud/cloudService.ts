import { apiClient } from "../../client/apiClient";
import type { CloudInstance } from "./types";

export const cloudService = {
	// Instances
	getInstances: async () => {
		const response = await apiClient.get<CloudInstance[]>(
			"/cloud-instances"
		);
		return response.data;
	},

	getInstanceById: async (id: string) => {
		const response = await apiClient.get<CloudInstance>(
			`/cloud-instances/${id}`
		);
		return response.data;
	},

	createInstance: async (data: Omit<CloudInstance, "id">) => {
		const response = await apiClient.post<CloudInstance>(
			"/cloud-instances",
			data
		);
		return response.data;
	},

	updateInstance: async (id: string, data: Partial<CloudInstance>) => {
		const response = await apiClient.put<CloudInstance>(
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
