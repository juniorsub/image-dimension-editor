import { RequestHandler } from "express";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export const generator: RequestHandler = async (req, res) => {
    if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({ error: "Nenhum arquivo enviado!" });
        return;
    }

    const processedImages = [];

    for (const file of req.files) {
        const newName = uuidv4() + ".jpg";

        const image = await sharp(file.path)
            .resize(500, 400, { fit: "inside" })
            .composite([{ input: "./src/assets/sti3.png", gravity: "centre" }])
            .toBuffer();

        await sharp(image).toFile(`./public/images/${newName}`);
        await sharp(image).resize(200, 200, { fit: "inside" }).toFile(`./public/images/mini-${newName}`);

        await fs.unlink(file.path);

        processedImages.push({
            original: `/images/${newName}`,
            thumbnail: `/images/mini-${newName}`,
        });
    }

    res.json({ success: true, message: "Arquivos recebidos!", files: req.files });
};