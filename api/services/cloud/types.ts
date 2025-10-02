export interface CloudInstance {
	id: string;
	provider: string;
	name: string;
	cloudGroupName: string[];
	regionList: string[];
}

export type CreateCloudInstanceDTO = Omit<CloudInstance, "id">;
export type UpdateCloudInstanceDTO = Partial<CloudInstance>;
