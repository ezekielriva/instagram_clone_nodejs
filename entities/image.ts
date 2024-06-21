export type TImageParams = {
    fieldname:string;
    originalname:string;
    encoding:string;
    mimetype:string;
    destination:string;
    filename:string;
    path:string;
    size:number;
}

export default class Image {
    fieldname:string;
    originalname:string;
    encoding:string;
    mimetype:string;
    destination:string;
    filename:string;
    path:string;
    size:number;

    constructor(imageParams: TImageParams) {
        this.fieldname = imageParams.fieldname;
        this.originalname = imageParams.originalname;
        this.encoding = imageParams.encoding;
        this.mimetype = imageParams.mimetype;
        this.destination = imageParams.destination;
        this.filename = imageParams.filename;
        this.path = imageParams.path;
        this.size = imageParams.size;
    }
}

export class NullImage extends Image {
    constructor() {
        super({
            fieldname: "",
            originalname: "",
            encoding: "",
            mimetype: "",
            destination: "",
            filename: "",
            path: "",
            size: 0
        });
    }
}