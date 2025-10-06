import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Cloud } from "@/api/services/cloud/types";

interface Params {
	id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
	try {
		const { id } = params;
		const jsonDirectory = path.join(process.cwd(), "mocks");
		const fileContents = await fs.readFile(
			path.join(jsonDirectory, "data.json"),
			"utf8"
		);
		const data = JSON.parse(fileContents).find(
			(item: Cloud) => item.id === id
		);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to load data" },
			{ status: 500 }
		);
	}
}
