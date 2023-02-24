import { spawnSync } from "child_process";

export default class WeasyPrintWrapper {
  htmlToPDF(html: string): Buffer {
    const result = spawnSync("weasyprint", ["-", "-"], {
      input: html
    });

    if (result.error ?? result.status !== 0) {
      throw new Error("Error generating PDF from HTML");
    }

    return Buffer.from(result.stdout);
  }
}
