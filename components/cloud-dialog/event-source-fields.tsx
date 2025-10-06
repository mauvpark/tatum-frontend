import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
	AWSEventSource,
	AzureEventSource,
	GCPEventSource,
	Provider,
} from "@/api/services/cloud/types";
import React from "react";

export const EventSourceFields = React.memo(function EventSourceFields({
	provider,
	eventSource,
}: {
	provider?: Provider;
	eventSource?: AWSEventSource & AzureEventSource & GCPEventSource;
}) {
	switch (provider) {
		case "AWS":
			return (
				<div className="grid w-full gap-2">
					<Label htmlFor="cloudTrailName">CloudTrail Name</Label>
					<Input
						className="bg-gray-50"
						readOnly
						id="cloudTrailName"
						value={eventSource?.cloudTrailName || ""}
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
						className="bg-gray-50"
						readOnly
						id="storageAccountName"
						value={eventSource?.storageAccountName || ""}
					/>
				</div>
			);
		default:
			return null;
	}
});
