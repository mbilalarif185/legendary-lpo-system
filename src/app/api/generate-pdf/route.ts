export const runtime = "nodejs";

import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { buildTiffanyTemplate } from "./template";
import { buildLegendaryTemplate } from "./legendary_template";

export async function POST(request: Request) {
  const data = await request.json();

let html = "";

if (data.from === "legendary") {
  html = buildLegendaryTemplate(data);
} 
else if (data.from === "tiffany") {
  html = buildTiffanyTemplate(data);
} 
else {
  return NextResponse.json(
    { error: "Invalid From value" },
    { status: 400 }
  );
}

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 60000 });


  const pdfUint8 = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();

  return new NextResponse(Buffer.from(pdfUint8), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=lpo-${data.from}.pdf`,
    },
  });
}

