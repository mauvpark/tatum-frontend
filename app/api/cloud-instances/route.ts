import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const jsonDirectory = path.join(process.cwd(), "mocks");
		const fileContents = await fs.readFile(
			jsonDirectory + "/data.json",
			"utf8"
		);
		const data = JSON.parse(fileContents);

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to load data" },
			{ status: 500 }
		);
	}
}
