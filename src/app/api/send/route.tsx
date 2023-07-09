
import { NextResponse } from 'next/server' 

import nodemailer from 'nodemailer';


export async function POST(req: Request, res: Response) {
    
    try {

        const json = await req.json();
        const { name, email, num, text } = json;


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: 'Portfolio contact',
            text: `
            Reply to: "<${email}>, ${num}", 
            Message: "${text}"`,
        }); 
    
        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ status: 200, body: { msg: 'success' } });
        
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500, body: { msg: 'error' } });
    }
}