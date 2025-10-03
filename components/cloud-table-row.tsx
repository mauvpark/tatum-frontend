import { memo } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { CloudsInstance } from "@/api/services/cloud/types";

interface CloudTableRowProps {
	item: CloudsInstance;
	onEdit: () => void;
}

export const CloudTableRow = memo(({ item, onEdit }: CloudTableRowProps) => {
	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this cloud?")) {
			console.log("Delete cloud with id:", item.id);
		}
	};

	return (
		<TableRow>
			<TableCell>{item.provider}</TableCell>
			<TableCell>{item.name}</TableCell>
			<TableCell>
				<div className="flex flex-wrap gap-1">
					{item.cloudGroupName.map((group) => (
						<Badge key={group} variant="secondary">
							{group}
						</Badge>
					))}
				</div>
			</TableCell>
			<TableCell>
				<div className="flex flex-wrap gap-1">
					{item.regionList.map((region) => (
						<Badge key={region} variant="outline">
							{region}
						</Badge>
					))}
				</div>
			</TableCell>
			<TableCell>
				<Button
					size="icon"
					variant="ghost"
					className="hover:text-blue-500 transition-colors"
					onClick={onEdit}
				>
					<Edit className="h-4 w-4" />
				</Button>
			</TableCell>
			<TableCell>
				<Button
					size="icon"
					variant="ghost"
					className="text-destructive hover:bg-destructive/10"
					onClick={handleDelete}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
});

CloudTableRow.displayName = "CloudTableRow";
