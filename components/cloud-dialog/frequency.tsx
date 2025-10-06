import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ScheduleScanSetting } from "@/api/services/cloud/types";
import React from "react";

interface FrequencySelectorProps {
	scheduleScanSetting?: Partial<ScheduleScanSetting>;
	onHourChange: (value: string) => void;
}

export const FrequencySelector = React.memo(function FrequencySelector({
	scheduleScanSetting,
	onHourChange,
}: FrequencySelectorProps) {
	const hours = Array.from({ length: 24 }, (_, i) => i.toString());

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="grid w-full gap-2">
				<Label htmlFor="frequency">Frequency</Label>
				<Select value="HOUR" disabled>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="HOUR">Hourly</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="hour">
					Hour <span className="text-red-500">*</span>
				</Label>
				<Select
					value={scheduleScanSetting?.hour}
					onValueChange={onHourChange}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select hour" />
					</SelectTrigger>
					<SelectContent>
						{hours.map((hour) => (
							<SelectItem key={hour} value={hour}>
								{hour}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
});