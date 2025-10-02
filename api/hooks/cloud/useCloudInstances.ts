import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cloudService } from "../../services/cloud/cloudService";
import type {
	CloudInstance,
	CreateCloudInstanceDTO,
	UpdateCloudInstanceDTO,
} from "../../services/cloud/types";

export function useCloudInstances() {
	const queryClient = useQueryClient();
	const queryKey = ["cloudInstances"];

	// 인스턴스 목록 조회
	const instances = useQuery<CloudInstance[]>({
		queryKey,
		queryFn: cloudService.getInstances,
	});

	// 인스턴스 생성 mutation
	const createInstanceMutation = useMutation({
		mutationFn: (data: CreateCloudInstanceDTO) =>
			cloudService.createInstance(data),
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
		}) => cloudService.updateInstance(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	// 인스턴스 삭제 mutation
	const deleteInstanceMutation = useMutation({
		mutationFn: (id: string) => cloudService.deleteInstance(id),
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
}
