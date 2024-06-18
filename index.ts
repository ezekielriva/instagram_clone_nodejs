import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Instagram Clone NodeJS app started on 127.0.0.1:${process.env.PORT}`);
})