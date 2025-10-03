"use client";

import { useClouds } from "@/api/hooks/cloud/useClouds";
import type { CloudsInstance } from "@/api/services/cloud/types";
import CloudHeader from "@/components/cloud-header";
import { CloudTable } from "@/components/cloud-table";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

type SortConfig = {
	key: keyof Pick<CloudsInstance, "provider" | "name"> | null;
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
		createInstance,
		updateInstance,
		deleteInstance,
	} = useClouds();

	const handleSort = (key: "provider" | "name") => {
		setSortConfig((current) => ({
			key,
			direction:
				current.key === key && current.direction === "asc"
					? "desc"
					: "asc",
		}));
	};

	const sortedData = useMemo(
		() =>
			[...cloudData].sort((a, b) => {
				if (sortConfig.key === null) return 0;

				const aValue = a[sortConfig.key].toLowerCase();
				const bValue = b[sortConfig.key].toLowerCase();

				if (sortConfig.direction === "asc") {
					return aValue > bValue ? 1 : -1;
				} else {
					return aValue < bValue ? 1 : -1;
				}
			}),
		[cloudData, sortConfig]
	);

	const paginatedData = useMemo(
		() =>
			sortedData.slice(
				(currentPage - 1) * itemsPerPage,
				currentPage * itemsPerPage
			),
		[sortedData, currentPage]
	);

	const totalPages = Math.ceil(cloudData.length / itemsPerPage);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data</div>;

	return (
		<div className="container mx-auto py-10">
			<CloudHeader />
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
					<CloudTable data={paginatedData} />
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
