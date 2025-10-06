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
							readOnly
							className="bg-gray-50"
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
							readOnly
							className="bg-gray-50"
							id="secretAccessKey"
							type="password"
							value={
								(credentials as AWSCredential)
									?.secretAccessKey || ""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="roleArn">Role ARN (Optional)</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="roleArn"
							value={
								(credentials as AWSCredential)?.roleArn || ""
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
							readOnly
							className="bg-gray-50"
							id="tenantId"
							value={
								(credentials as AzureCredential)?.tenantId || ""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="subscriptionId">Subscription ID</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="subscriptionId"
							value={
								(credentials as AzureCredential)
									?.subscriptionId || ""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="applicationId">Application ID</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="applicationId"
							value={
								(credentials as AzureCredential)
									?.applicationId || ""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="secretKey">Secret Key</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="secretKey"
							type="password"
							value={
								(credentials as AzureCredential)?.secretKey ||
								""
							}
						/>
					</div>
				</>
			);
		case "GCP":
			return (
				<>
					<div className="grid w-full gap-2">
						<Label htmlFor="projectId">Project ID (Optional)</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="projectId"
							value={
								(credentials as GCPCredential)?.projectId || ""
							}
						/>
					</div>
					<div className="grid w-full gap-2">
						<Label htmlFor="jsonText">JSON Text</Label>
						<Input
							readOnly
							className="bg-gray-50"
							id="jsonText"
							type="password"
							value={
								(credentials as GCPCredential)?.jsonText || ""
							}
						/>
					</div>
				</>
			);
		default:
			return null;
	}
});
