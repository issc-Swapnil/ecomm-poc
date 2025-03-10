import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import db from "@/app/lib/dynamoDB";

export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: "product_list",
    });

    const response = await db.send(command);

    return NextResponse.json({ success: true, data: response.Items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
