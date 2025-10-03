import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cloudsService } from "../../services/cloud/cloudsService";
import type {
	CloudsInstance,
	CreateCloudInstanceDTO,
	UpdateCloudInstanceDTO,
} from "../../services/cloud/types";

export const useClouds = () => {
	const queryClient = useQueryClient();
	const queryKey = ["clouds"];

	// 인스턴스 목록 조회
	const instances = useQuery<CloudsInstance[]>({
		queryKey,
		queryFn: cloudsService.getInstances,
	});

	// 인스턴스 생성 mutation
	const createInstanceMutation = useMutation({
		mutationFn: (data: CreateCloudInstanceDTO) =>
			cloudsService.createInstance(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	// 인스턴스 수정 mutation
	const updateInstanceMutation = useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: UpdateCloudInstanceDTO;
		}) => cloudsService.updateInstance(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	// 인스턴스 삭제 mutation
	const deleteInstanceMutation = useMutation({
		mutationFn: (id: string) => cloudsService.deleteInstance(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	// 래핑된 메서드들 - 에러 처리와 로딩 상태를 포함
	const handleCreateInstance = async (data: CreateCloudInstanceDTO) => {
		try {
			await createInstanceMutation.mutateAsync(data);
			return { success: true as const };
		} catch (error) {
			return {
				success: false as const,
				error:
					error instanceof Error
						? error.message
						: "Failed to create instance",
			};
		}
	};

	const handleUpdateInstance = async (
		id: string,
		data: UpdateCloudInstanceDTO
	) => {
		try {
			await updateInstanceMutation.mutateAsync({ id, data });
			return { success: true as const };
		} catch (error) {
			return {
				success: false as const,
				error:
					error instanceof Error
						? error.message
						: "Failed to update instance",
			};
		}
	};

	const handleDeleteInstance = async (id: string) => {
		try {
			await deleteInstanceMutation.mutateAsync(id);
			return { success: true as const };
		} catch (error) {
			return {
				success: false as const,
				error:
					error instanceof Error
						? error.message
						: "Failed to delete instance",
			};
		}
	};

	return {
		// 데이터와 로딩 상태
		instances,

		// 작업 상태
		isCreating: createInstanceMutation.isPending,
		isUpdating: updateInstanceMutation.isPending,
		isDeleting: deleteInstanceMutation.isPending,

		// 래핑된 메서드들
		createInstance: handleCreateInstance,
		updateInstance: handleUpdateInstance,
		deleteInstance: handleDeleteInstance,
	};
};
