import WeasyPrintWrapper from "@/lib/WeasyPrintWrapper";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  try {
    const wrapper = new WeasyPrintWrapper();

    const htmlPath = path.resolve("./src/public/index.html");
    const html = fs.readFileSync(htmlPath).toString();

    const pdf = wrapper.htmlToPDF(html);

    return res.setHeader("Content-Type", "application/pdf").send(pdf);
  } catch (e) {
    console.log(e);
  }
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
