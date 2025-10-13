import { BadRequestException, Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class AttendanceService {
    process_url;

    constructor() {
        this.process_url = process.env.PROCESS_URL;

    }





    //@ts-ignore
    async processAttendance(file: Express.Multer.File) {
        try {


            const formData = new FormData();


            const blob = new Blob([file.buffer], { type: file.mimetype });
            const fileObject = new File([blob], file.originalname, { type: file.mimetype });

            formData.append("file", fileObject);

            // Send request to FastAPI
            const response = await fetch(this.process_url, {
                method: "POST",
                body: formData as any,

            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log("✅ Server response:", data);
            return data;
        } catch (error: any) {
            console.error("❌ Error processing attendance:", error.message || error);
            throw error;
        }
    }
}
