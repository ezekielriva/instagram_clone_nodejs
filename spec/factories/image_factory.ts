import Image from "../../entities/image";

export function BuildImage():Image {
    return new Image({
        fieldname: crypto.randomUUID(),
        originalname: crypto.randomUUID(),
        encoding: crypto.randomUUID(),
        mimetype: crypto.randomUUID(),
        destination: crypto.randomUUID(),
        filename: crypto.randomUUID(), 
        path: crypto.randomUUID(), 
        size: 10
    });
};