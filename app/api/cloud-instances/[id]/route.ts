import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Cloud } from "@/api/services/cloud/types";

type Params = Promise<{ id: string }>;

export async function GET(
	request: NextRequest,
	{ params }: { params: Params }
) {
	try {
		const { id } = await params;
		const jsonDirectory = path.join(process.cwd(), "mocks");
		const fileContents = await fs.readFile(
			path.join(jsonDirectory, "data.json"),
			"utf8"
		);
		const allData: Cloud[] = JSON.parse(fileContents);
		const data = allData.find((item: Cloud) => item.id === id);

		if (!data) {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Failed to load data:", error); // 에러 로깅 추가
		return NextResponse.json(
			{ error: "Failed to load data" },
			{ status: 500 }
		);
	}
}
