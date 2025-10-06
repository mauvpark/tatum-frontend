import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const NameInput = React.memo(function NameInput({
	value,
	onChange,
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<div className="grid w-full gap-2">
			<Label htmlFor="name">
				Name <span className="text-red-500">*</span>
			</Label>
			<Input id="name" value={value} onChange={onChange} />
		</div>
	);
});
