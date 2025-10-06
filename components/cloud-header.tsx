import { Cloud } from "@/api/services/cloud/types";
import React, { memo } from "react";
import { CloudDialog } from "./cloud-dialog";
import { Button } from "./ui/button";

const CloudHeader = () => {
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Cloud Management</h1>
				<Button
					className="bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors border border-blue-500"
					onClick={() => {
						setIsDialogOpen(true);
					}}
				>
					Create Cloud
				</Button>
			</div>
			<CloudDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				type="create"
				onSubmit={async (cloud: Cloud) => {
					console.log("Creating cloud:", cloud);
					setIsDialogOpen(false);
				}}
			/>
		</>
	);
};

export default memo(CloudHeader);
