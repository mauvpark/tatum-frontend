import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useCloud } from "@/api/hooks/cloud/useCloud";
import type {
	AWSCredential,
	AWSEventSource,
	AzureCredential,
	AzureEventSource,
	Cloud,
	GCPCredential,
	GCPEventSource,
	Provider,
} from "@/types";
import { AWSRegionList } from "@/types";

// Constants
const CloudGroupList = [
	"Production",
	"Development",
	"Staging",
	"Security",
	"Analytics",
	"Infrastructure",
	"Database",
	"Networking",
	"Monitoring",
	"Storage",
	"Machine-Learning",
	"Containers",
	"Serverless",
	"IoT",
	"Backup",
] as const;

type CloudGroup = (typeof CloudGroupList)[number];

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
	credentials: {} as AWSCredential,
	eventSource: {} as AWSEventSource,
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
			setFormData(cloudData.data);
		}

		return () => {
			setFormData(initialFormState);
		};
	}, [type, cloudData]);

	const handleProviderChange = (value: Provider) => {
		setFormData((prev) => ({
			...prev,
			provider: value,
			credentials:
				value === "AWS"
					? ({} as AWSCredential)
					: value === "AZURE"
					? ({} as AzureCredential)
					: ({} as GCPCredential),
			eventSource:
				value === "AWS"
					? ({} as AWSEventSource)
					: value === "AZURE"
					? ({} as AzureEventSource)
					: ({} as GCPEventSource),
		}));
	};

	const handleCloudGroupChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			cloudGroupName: prev.cloudGroupName?.includes(value)
				? prev.cloudGroupName.filter((group) => group !== value)
				: [...(prev.cloudGroupName || []), value],
		}));
	};

	const handleRegionChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			regionList: prev.regionList?.includes(value)
				? prev.regionList.filter((region) => region !== value)
				: [...(prev.regionList || []), value],
		}));
	};

	const handleCredentialsChange = (
		field: keyof (AWSCredential & AzureCredential & GCPCredential),
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			credentials: {
				...prev.credentials,
				[field]: value,
			} as AWSCredential | AzureCredential | GCPCredential,
		}));
	};

	const handleEventSourceChange = (
		field: keyof (AWSEventSource & AzureEventSource & GCPEventSource),
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			eventSource: {
				...prev.eventSource,
				[field]: value,
			},
		}));
	};

	const handleReview = () => {
		console.log("Form Data for Review:", formData);
		// Here you would typically show a confirmation dialog or summary view
		// before final submission
		if (!formData.name || !formData.provider) {
			alert("Please fill in all required fields");
			return;
		}
		// You can add more validation here
		onSubmit?.(formData as Cloud);
	};

	const renderCredentialsFields = () => {
		switch (formData.provider) {
			case "AWS":
				return (
					<>
						<div className="grid w-full gap-2">
							<Label htmlFor="accessKeyId">Access Key ID</Label>
							<Input
								id="accessKeyId"
								value={
									(formData.credentials as AWSCredential)
										?.accessKeyId || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"accessKeyId",
										e.target.value
									)
								}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="secretAccessKey">
								Secret Access Key
							</Label>
							<Input
								id="secretAccessKey"
								type="password"
								value={
									(formData.credentials as AWSCredential)
										?.secretAccessKey || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"secretAccessKey",
										e.target.value
									)
								}
							/>
						</div>
					</>
				);
			case "AZURE":
				return (
					<>
						<div className="grid w-full gap-2">
							<Label htmlFor="tenantId">Tenant ID</Label>
							<Input
								id="tenantId"
								value={
									(formData.credentials as AzureCredential)
										?.tenantId || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"tenantId",
										e.target.value
									)
								}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="subscriptionId">
								Subscription ID
							</Label>
							<Input
								id="subscriptionId"
								value={
									(formData.credentials as AzureCredential)
										?.subscriptionId || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"subscriptionId",
										e.target.value
									)
								}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="applicationId">
								Application ID
							</Label>
							<Input
								id="applicationId"
								value={
									(formData.credentials as AzureCredential)
										?.applicationId || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"applicationId",
										e.target.value
									)
								}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="secretKey">Secret Key</Label>
							<Input
								id="secretKey"
								type="password"
								value={
									(formData.credentials as AzureCredential)
										?.secretKey || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"secretKey",
										e.target.value
									)
								}
							/>
						</div>
					</>
				);
			case "GCP":
				return (
					<>
						<div className="grid w-full gap-2">
							<Label htmlFor="projectId">
								Project ID (Optional)
							</Label>
							<Input
								id="projectId"
								value={
									(formData.credentials as GCPCredential)
										?.projectId || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"projectId",
										e.target.value
									)
								}
							/>
						</div>
						<div className="grid w-full gap-2">
							<Label htmlFor="jsonText">
								Service Account Key (JSON)
							</Label>
							<textarea
								id="jsonText"
								className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
								value={
									(formData.credentials as GCPCredential)
										?.jsonText || ""
								}
								onChange={(e) =>
									handleCredentialsChange(
										"jsonText",
										e.target.value
									)
								}
							/>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	const renderEventSourceFields = () => {
		switch (formData.provider) {
			case "AWS":
				return (
					<div className="grid w-full gap-2">
						<Label htmlFor="cloudTrailName">CloudTrail Name</Label>
						<Input
							id="cloudTrailName"
							value={
								(formData.eventSource as AWSEventSource)
									?.cloudTrailName || ""
							}
							onChange={(e) =>
								handleEventSourceChange(
									"cloudTrailName",
									e.target.value
								)
							}
						/>
					</div>
				);
			case "AZURE":
			case "GCP":
				return (
					<div className="grid w-full gap-2">
						<Label htmlFor="storageAccountName">
							Storage Account Name
						</Label>
						<Input
							id="storageAccountName"
							value={
								(
									formData.eventSource as
										| AzureEventSource
										| GCPEventSource
								)?.storageAccountName || ""
							}
							onChange={(e) =>
								handleEventSourceChange(
									"storageAccountName",
									e.target.value
								)
							}
						/>
					</div>
				);
			default:
				return null;
		}
	};

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
						<div className="grid w-full gap-2">
							<Label htmlFor="provider">Provider</Label>
							<Select
								value={formData.provider}
								onValueChange={handleProviderChange}
							>
								<SelectTrigger>
									<SelectValue>
										{formData.provider}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="AWS">AWS</SelectItem>
									<SelectItem value="AZURE">Azure</SelectItem>
									<SelectItem value="GCP">GCP</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid w-full gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
							/>
						</div>

						<div className="grid w-full gap-2">
							<Label>Cloud Group Name</Label>
							<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[2.5rem]">
								{formData.cloudGroupName?.map((group) => (
									<Badge
										key={group}
										variant="secondary"
										className="cursor-pointer"
										onClick={() =>
											handleCloudGroupChange(group)
										}
									>
										{group}
									</Badge>
								))}
							</div>
							<Select onValueChange={handleCloudGroupChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select groups..." />
								</SelectTrigger>
								<SelectContent>
									{CloudGroupList.map((group: string) => (
										<SelectItem key={group} value={group}>
											{group}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="grid w-full gap-2">
							<Label>Region List</Label>
							<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[2.5rem]">
								{formData.regionList?.map((region) => (
									<Badge
										key={region}
										variant="outline"
										className="cursor-pointer"
										onClick={() =>
											region !== "global" &&
											handleRegionChange(region)
										}
									>
										{region}
									</Badge>
								))}
							</div>
							<Select onValueChange={handleRegionChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select regions..." />
								</SelectTrigger>
								<SelectContent>
									{AWSRegionList.filter(
										(region) =>
											!formData.regionList?.includes(
												region
											)
									).map((region) => (
										<SelectItem key={region} value={region}>
											{region}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-4">
							<Label>Enablement Flags</Label>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<Checkbox
										id="eventProcessEnabled"
										checked={formData.eventProcessEnabled}
										onCheckedChange={(checked: boolean) =>
											setFormData((prev) => ({
												...prev,
												eventProcessEnabled: checked,
											}))
										}
									/>
									<Label htmlFor="eventProcessEnabled">
										Event Process Enabled
									</Label>
								</div>
								<div className="flex items-center gap-2">
									<Checkbox
										id="userActivityEnabled"
										checked={formData.userActivityEnabled}
										onCheckedChange={(checked: boolean) =>
											setFormData((prev) => ({
												...prev,
												userActivityEnabled: checked,
											}))
										}
									/>
									<Label htmlFor="userActivityEnabled">
										User Activity Enabled
									</Label>
								</div>
								<div className="flex items-center gap-2">
									<Checkbox
										id="scheduleScanEnabled"
										checked={formData.scheduleScanEnabled}
										onCheckedChange={(checked: boolean) =>
											setFormData((prev) => ({
												...prev,
												scheduleScanEnabled: checked,
											}))
										}
									/>
									<Label htmlFor="scheduleScanEnabled">
										Schedule Scan Enabled
									</Label>
								</div>
							</div>
						</div>

						<div className="grid gap-4">
							<Label>Credentials</Label>
							{renderCredentialsFields()}
						</div>

						<div className="grid gap-4">
							<Label>Event Source</Label>
							{renderEventSourceFields()}
						</div>
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
