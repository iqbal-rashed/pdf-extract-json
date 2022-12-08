const { Poppler } = require("node-poppler");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const sharp = require("sharp");
const { OPS } = pdfjs;
const path = require("path");

pdfjs.GlobalWorkerOptions.workerSrc = path.join(
    __dirname,
    "../node_modules/pdfjs-dist/legacy/build/pdf.worker.js"
);

class ExtractPdf {
    constructor(buffer) {
        this.buffer = buffer;
        this.poppler = new Poppler();
    }

    async extractImages() {
        const pdf = await pdfjs.getDocument({ data: this.buffer }).promise;
        const pageCount = pdf.numPages;
        const images = [];

        for (let p = 1; p <= pageCount; p++) {
            const page = await pdf.getPage(p);
            const ops = await page.getOperatorList();

            for (let i = 0; i < ops.fnArray.length; i++) {
                if (
                    ops.fnArray[i] === OPS.paintJpegXObject ||
                    ops.fnArray[i] === OPS.paintImageXObject ||
                    ops.fnArray[i] === OPS.paintInlineImageXObject
                ) {
                    const name = ops.argsArray[i][0];
                    const img = await page.objs.get(name);
                    const { width, height, kind } = img;
                    const bytes = img.data.length;
                    const channels = bytes / width / height;

                    const imageBuffer = await sharp(img.data, {
                        raw: { width, height, channels },
                    }).toBuffer();

                    images.push(imageBuffer);
                }
            }
        }

        return images;
    }

    async extractText() {
        return await this.poppler.pdfToText(this.buffer);
    }
}

module.exports = ExtractPdf;
