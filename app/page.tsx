"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Edit, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { useCloudInstances } from "@/api/hooks/cloud/useCloudInstances";
import type { CloudInstance } from "@/api/services/cloud/types";

type SortConfig = {
	key: keyof Pick<CloudInstance, "provider" | "name"> | null;
	direction: "asc" | "desc";
};

export default function CloudManagement() {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: null,
		direction: "asc",
	});

	const itemsPerPage = 10;

	const {
		instances: { data: cloudData = [], isLoading, error },
		deleteInstance,
	} = useCloudInstances();

	const handleSort = (key: "provider" | "name") => {
		setSortConfig((current) => ({
			key,
			direction:
				current.key === key && current.direction === "asc"
					? "desc"
					: "asc",
		}));
	};

	const sortedData = [...cloudData].sort((a, b) => {
		if (sortConfig.key === null) return 0;

		const aValue = a[sortConfig.key].toLowerCase();
		const bValue = b[sortConfig.key].toLowerCase();

		if (sortConfig.direction === "asc") {
			return aValue > bValue ? 1 : -1;
		} else {
			return aValue < bValue ? 1 : -1;
		}
	});

	const paginatedData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(cloudData.length / itemsPerPage);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data</div>;

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Cloud Management</h1>
				<Button className="bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors border border-blue-500">
					Create Cloud
				</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Button
									variant="ghost"
									onClick={() => handleSort("provider")}
									className="h-8 w-full flex items-center justify-between"
								>
									Provider
									<ArrowUpDown className="h-4 w-4" />
								</Button>
							</TableHead>
							<TableHead>
								<Button
									variant="ghost"
									onClick={() => handleSort("name")}
									className="h-8 w-full flex items-center justify-between"
								>
									Name
									<ArrowUpDown className="h-4 w-4" />
								</Button>
							</TableHead>
							<TableHead>Cloud Group Name</TableHead>
							<TableHead>Region List</TableHead>
							<TableHead>Edit</TableHead>
							<TableHead>Delete</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedData.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.provider}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{item.cloudGroupName.map((group) => (
											<Badge
												key={group}
												variant="secondary"
											>
												{group}
											</Badge>
										))}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{item.regionList.map((region) => (
											<Badge
												key={region}
												variant="outline"
											>
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
									>
										<Edit className="h-4 w-4" />
									</Button>
								</TableCell>
								<TableCell>
									<Button
										size="icon"
										variant="ghost"
										className="text-destructive"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="mt-4">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() =>
									setCurrentPage((prev) =>
										Math.max(prev - 1, 1)
									)
								}
								className={`cursor-pointer hover:text-blue-500 transition-colors ${
									currentPage === 1
										? "pointer-events-none opacity-50"
										: ""
								}`}
							/>
						</PaginationItem>

						{[...Array(totalPages)].map((_, index) => (
							<PaginationItem key={index + 1}>
								<PaginationLink
									onClick={() => setCurrentPage(index + 1)}
									isActive={currentPage === index + 1}
									className="cursor-pointer hover:text-blue-500 transition-colors data-[active]:bg-blue-500 data-[active]:text-white data-[active]:hover:text-white"
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setCurrentPage((prev) =>
										Math.min(prev + 1, totalPages)
									)
								}
								className={`cursor-pointer hover:text-blue-500 transition-colors ${
									currentPage === totalPages
										? "pointer-events-none opacity-50"
										: ""
								}`}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
