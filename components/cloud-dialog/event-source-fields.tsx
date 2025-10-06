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
	onChange,
}: {
	provider?: Provider;
	eventSource?: AWSEventSource & AzureEventSource & GCPEventSource;
	onChange: (
		field: keyof (AWSEventSource & AzureEventSource & GCPEventSource),
		value: string
	) => void;
}) {
	switch (provider) {
		case "AWS":
			return (
				<div className="grid w-full gap-2">
					<Label htmlFor="cloudTrailName">CloudTrail Name</Label>
					<Input
						id="cloudTrailName"
						value={eventSource?.cloudTrailName || ""}
						onChange={(e) =>
							onChange("cloudTrailName", e.target.value)
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
						value={eventSource?.storageAccountName || ""}
						onChange={(e) =>
							onChange("storageAccountName", e.target.value)
						}
					/>
				</div>
			);
		default:
			return null;
	}
});
