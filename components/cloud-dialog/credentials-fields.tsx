import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
	AWSCredential,
	AzureCredential,
	GCPCredential,
	Provider,
} from "@/api/services/cloud/types";
import React from "react";

export const CredentialsFields = React.memo(function CredentialsFields({
	provider,
	credentials,
	onChange,
}: {
	provider?: Provider;
	credentials?: AWSCredential | AzureCredential | GCPCredential;
	onChange: (
		field: keyof (AWSCredential & AzureCredential & GCPCredential),
		value: string
	) => void;
}) {
	switch (provider) {
		case "AWS":
			return (
				<>
					<div className="grid w-full gap-2">
						<Label htmlFor="accessKeyId">Access Key ID</Label>
						<Input
							id="accessKeyId"
							value={
								(credentials as AWSCredential)?.accessKeyId ||
								""
							}
							onChange={(e) =>
								onChange("accessKeyId", e.target.value)
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
								(credentials as AWSCredential)
									?.secretAccessKey || ""
							}
							onChange={(e) =>
								onChange("secretAccessKey", e.target.value)
							}
						/>
					</div>
				</>
			);
		case "AZURE":
			return (
				<>
					{/* Azure fields... */}
				</>
			);
		case "GCP":
			return (
				<>
					{/* GCP fields... */}
				</>
			);
		default:
			return null;
	}
});
