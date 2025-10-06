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
}: {
	provider?: Provider;
	credentials?: AWSCredential | AzureCredential | GCPCredential;
}) {
	switch (provider) {
		case "AWS":
			return (
				<>
					<div className="grid w-full gap-2">
						<Label htmlFor="accessKeyId">Access Key ID</Label>
						<Input
							className="bg-gray-50"
							readOnly
							id="accessKeyId"
							value={
								(credentials as AWSCredential)?.accessKeyId ||
								""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="secretAccessKey">
							Secret Access Key
						</Label>
						<Input
							className="bg-gray-50"
							readOnly
							id="secretAccessKey"
							type="password"
							value={
								(credentials as AWSCredential)
									?.secretAccessKey || ""
							}
						/>
					</div>
				</>
			);
		case "AZURE":
			return <>{/* Azure fields... */}</>;
		case "GCP":
			return <>{/* GCP fields... */}</>;
		default:
			return null;
	}
});
