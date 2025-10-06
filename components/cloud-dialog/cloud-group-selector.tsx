import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";

const CloudGroupList = [
	"Production", "Development", "Staging", "Security", "Analytics",
	"Infrastructure", "Database", "Networking", "Monitoring", "Storage",
	"Machine-Learning", "Containers", "Serverless", "IoT", "Backup",
] as const;

export const CloudGroupSelector = React.memo(function CloudGroupSelector({
	selectedGroups,
	onChange,
}: {
	selectedGroups: string[];
	onChange: (value: string) => void;
}) {
	return (
		<div className="grid w-full gap-2">
			<Label>Cloud Group Name</Label>
			<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[2.5rem]">
				{selectedGroups.map((group) => (
					<Badge
						key={group}
						variant="secondary"
						className="cursor-pointer"
						onClick={() => onChange(group)}
					>
						{group}
					</Badge>
				))}
			</div>
			<Select onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select groups..." />
				</SelectTrigger>
				<SelectContent>
					{CloudGroupList.map((group) => (
						<SelectItem key={group} value={group}>
							{group}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
