import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCloud } from "@/api/hooks/cloud/useCloud";
import type {
	AWSCredential,
	AzureCredential,
	Cloud,
	GCPCredential,
	Provider,
} from "@/api/services/cloud/types";
import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import { CloudGroupSelector } from "./cloud-group-selector";
import { CredentialsFields } from "./credentials-fields";
import { EnablementFlags } from "./enablement-flags";
import { EventSourceFields } from "./event-source-fields";
import { NameInput } from "./name-input";
import { ProviderSelector } from "./provider-selector";
import { RegionSelector } from "./region-selector";

interface CloudDialogProps {
	isOpen: boolean;
	onClose: () => void;
	type: "create" | "edit";
	cloudId?: string;
	onSubmit?: (data: Cloud) => Promise<void>;
}

const initialFormState: Partial<Cloud> = {
	provider: "AWS",
	name: "",
	cloudGroupName: [],
	regionList: ["global"],
	eventProcessEnabled: false,
	userActivityEnabled: false,
	scheduleScanEnabled: false,
	credentials: {} as AWSCredential | AzureCredential | GCPCredential,
	eventSource: {},
};

export function CloudDialog({
	isOpen,
	onClose,
	type,
	cloudId,
	onSubmit,
}: CloudDialogProps) {
	const { instance: cloudData } = useCloud(
		type === "edit" ? cloudId : undefined
	);
	const [formData, setFormData] = useState<Partial<Cloud>>(initialFormState);

	useEffect(() => {
		if (type === "edit" && cloudData.data) {
			console.log("data");
			setFormData(cloudData.data);
		}
	}, [type, cloudData.data]);

	useEffect(() => {
		return () => {
			setFormData(initialFormState);
		};
	}, [isOpen]);

	// All handlers are memoized with useCallback
	const handleProviderChange = useCallback((value: Provider) => {
		setFormData((prev) => ({
			...initialFormState,
			name: prev.name,
			provider: value,
		}));
	}, []);

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, name: e.target.value }));
		},
		[]
	);

	const handleCloudGroupChange = useCallback((value: string) => {
		setFormData((prev) => ({
			...prev,
			cloudGroupName: prev.cloudGroupName?.includes(value)
				? prev.cloudGroupName.filter((group) => group !== value)
				: [...(prev.cloudGroupName || []), value],
		}));
	}, []);

	const handleRegionChange = useCallback((value: string) => {
		setFormData((prev) => ({
			...prev,
			regionList: prev.regionList?.includes(value)
				? prev.regionList.filter((region) => region !== value)
				: [...(prev.regionList || []), value],
		}));
	}, []);

	const handleFlagChange = useCallback(
		(field: keyof Cloud, checked: boolean) => {
			setFormData((prev) => ({ ...prev, [field]: checked }));
		},
		[]
	);

	const handleReview = useCallback(() => {
		if (!formData.name || !formData.provider) {
			alert("Please fill in all required fields");
			return;
		}
		onSubmit?.(formData as Cloud);
	}, [formData, onSubmit]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{type === "create" ? "Create" : "Edit"} Cloud
						Configuration
					</DialogTitle>
				</DialogHeader>

				{cloudData.isLoading ? (
					<div className="flex items-center justify-center py-8">
						<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
					</div>
				) : (
					<div className="grid gap-6">
						<ProviderSelector
							value={formData.provider!}
							onValueChange={handleProviderChange}
						/>
						<NameInput
							value={formData.name!}
							onChange={handleNameChange}
						/>
						<CloudGroupSelector
							selectedGroups={formData.cloudGroupName!}
							onChange={handleCloudGroupChange}
						/>
						<RegionSelector
							selectedRegions={formData.regionList!}
							onChange={handleRegionChange}
						/>
						<EnablementFlags
							eventProcessEnabled={formData.eventProcessEnabled!}
							userActivityEnabled={formData.userActivityEnabled!}
							scheduleScanEnabled={formData.scheduleScanEnabled!}
							onChange={handleFlagChange}
						/>
						{type === "edit" && (
							<>
								<div className="grid gap-4">
									<Label>Credentials</Label>
									<CredentialsFields
										provider={formData.provider}
										credentials={formData.credentials}
									/>
								</div>
								<div className="grid gap-4">
									<Label>Event Source</Label>
									{formData.eventSource && (
										<EventSourceFields
											provider={formData.provider}
											eventSource={formData.eventSource}
										/>
									)}
								</div>
							</>
						)}
					</div>
				)}

				<DialogFooter className="mt-6">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleReview}>Review</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
