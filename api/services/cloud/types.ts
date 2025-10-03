export interface CloudsInstance {
	id: string;
	provider: string;
	name: string;
	cloudGroupName: string[];
	regionList: string[];
}

export type CreateCloudInstanceDTO = Omit<CloudsInstance, "id">;
export type UpdateCloudInstanceDTO = Partial<CloudsInstance>;
