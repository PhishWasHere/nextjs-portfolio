import { runWithAmplifyServerContext } from '@/utils/amplifyUtil/amplifyServerUtils';
import { cookies } from "next/headers";
import { METHODS } from 'http';
import { NextResponse } from 'next/server' 
import getError from '@/utils/get_error';
import nodemailer from 'nodemailer';

export async function POST(req: Request, res: Response) {
  if (!METHODS.includes('POST')) return NextResponse.json({body: { error: true } });
  
  try {
    const formData = await req.json();
    const { name, email, message } = formData;
    
    const data:NextResponse = await runWithAmplifyServerContext({
      nextServerContext: {cookies},
      operation: async (contextSpec) => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
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

        return NextResponse.json({body: {error: false, mailId: mailData.messageId}});
      }
    })
    
    return data;
  } catch (err) {
    return NextResponse.json({body: { error: true, mailId: null } });
  }
}