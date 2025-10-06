import { memo, useState } from "react";
import { TableBody } from "@/components/ui/table";
import { CloudTableRow } from "@/components/cloud-table-row";
import type { CloudsInstance } from "@/api/services/cloud/types";
import { CloudDialog } from "./cloud-dialog";
import { Cloud } from "@/api/services/cloud/types";

interface CloudTableProps {
	data: CloudsInstance[];
}

export const CloudTable = memo(({ data }: CloudTableProps) => {
	const [isDialogOpen, setisDialogOpen] = useState(false);
	const [selectedCloudId, setSelectedCloudId] = useState<string | null>(null);

	if (data.length === 0) {
		return (
			<TableBody>
				<tr className="text-center">
					<td colSpan={6} className="py-10">
						No cloud instances found.
					</td>
				</tr>
			</TableBody>
		);
	}

	return (
		<>
			<TableBody>
				{data.map((item) => (
					<CloudTableRow
						key={item.id}
						item={item}
						onEdit={() => {
							setSelectedCloudId(item.id);
							setisDialogOpen(true);
						}}
					/>
				))}
			</TableBody>
			<CloudDialog
				isOpen={isDialogOpen}
				onClose={() => setisDialogOpen(false)}
				type="edit"
				cloudId={selectedCloudId!}
				onSubmit={async (cloud: Cloud) => {
					console.log("Edit cloud:", cloud);
					setisDialogOpen(false);
				}}
			/>
		</>
	);
});

CloudTable.displayName = "CloudTable";
