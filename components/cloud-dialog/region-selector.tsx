import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AWSRegionList } from "@/api/services/cloud/types";
import React from "react";

export const RegionSelector = React.memo(function RegionSelector({
	selectedRegions,
	onChange,
}: {
	selectedRegions: string[];
	onChange: (value: string) => void;
}) {
	return (
		<div className="grid w-full gap-2">
			<Label>Region List</Label>
			<div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[2.5rem]">
				{selectedRegions.map((region) => (
					<Badge
						key={region}
						variant="outline"
						className="cursor-pointer"
						onClick={() => region !== "global" && onChange(region)}
					>
						{region}
					</Badge>
				))}
			</div>
			<Select onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select regions..." />
				</SelectTrigger>
				<SelectContent>
					{AWSRegionList.filter(
						(region) => !selectedRegions.includes(region)
					).map((region) => (
						<SelectItem key={region} value={region}>
							{region}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
