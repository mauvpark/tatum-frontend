import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Cloud } from "@/api/services/cloud/types";
import React from "react";

export const EnablementFlags = React.memo(function EnablementFlags({
	eventProcessEnabled,
	userActivityEnabled,
	scheduleScanEnabled,
	onChange,
}: {
	eventProcessEnabled: boolean;
	userActivityEnabled: boolean;
	scheduleScanEnabled: boolean;
	onChange: (field: keyof Cloud, checked: boolean) => void;
}) {
	return (
		<div className="grid gap-4">
			<Label>Enablement Flags</Label>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Checkbox
						id="eventProcessEnabled"
						checked={eventProcessEnabled}
						onCheckedChange={(checked: boolean) =>
							onChange("eventProcessEnabled", checked)
						}
					/>
					<Label htmlFor="eventProcessEnabled">
						Event Process Enabled
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="userActivityEnabled"
						checked={userActivityEnabled}
						onCheckedChange={(checked: boolean) =>
							onChange("userActivityEnabled", checked)
						}
					/>
					<Label htmlFor="userActivityEnabled">
						User Activity Enabled
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="scheduleScanEnabled"
						checked={scheduleScanEnabled}
						onCheckedChange={(checked: boolean) =>
							onChange("scheduleScanEnabled", checked)
						}
					/>
					<Label htmlFor="scheduleScanEnabled">
						Schedule Scan Enabled
					</Label>
				</div>
			</div>
		</div>
	);
});
