import getError from '@/utils/get_error';
import { METHODS } from 'http';
import { NextResponse } from 'next/server' 

import nodemailer from 'nodemailer';


export async function POST(req: Request, res: Response) {    
    if (!METHODS.includes('POST')) {        
        return NextResponse.json({body: { error: 'method not allowed' } });
    }
    try {        
        const data = await req.json();
        const { name, email, message } = data;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailData = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_SEND,
            subject: 'Portfolio contact',
            text: `
            Reply to: "<${name}>, ${email}",
            Message: "${message}"`,
        }); 

        return NextResponse.json({body: {message: 'mail sent', id: mailData.messageId}});
    } catch (err) {
        const errMsg = getError(err);
        throw new Error(errMsg);
    }
}