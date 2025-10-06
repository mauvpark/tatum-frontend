import { useQuery } from "@tanstack/react-query";
import type { Cloud } from "@/api/services/cloud/types";
import { cloudService } from "@/api/services/cloud/cloudService";

export const useCloud = (id?: string) => {
	// Cloud 인스턴스 상세 조회
	const instance = useQuery<Cloud>({
		queryKey: ["cloud", id],
		queryFn: () => cloudService.getInstanceById(id!),
		enabled: !!id,
	});

	return {
		instance,
	};
};
