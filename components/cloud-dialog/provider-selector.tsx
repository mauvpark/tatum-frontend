import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Provider } from "@/api/services/cloud/types";
import React from "react";

export const ProviderSelector = React.memo(function ProviderSelector({
	value,
	onValueChange,
}: {
	value: Provider;
	onValueChange: (value: Provider) => void;
}) {
	return (
		<div className="grid w-full gap-2">
			<Label htmlFor="provider">
				Provider <span className="text-red-500">*</span>
			</Label>
			<Select value={value} onValueChange={onValueChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="AWS">AWS</SelectItem>
					<SelectItem value="AZURE">Azure</SelectItem>
					<SelectItem value="GCP">GCP</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
});
