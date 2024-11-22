import { Resend } from 'resend';
import dotenv, { config } from "dotenv"

dotenv.config();

if (!process.env.RESEND-API){
    console.log("resend api fail")
}

const resend = new Resend(process.env.RESEND-API);

const sendEmail = async({name, sendTo, subject, html}) =>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }
          console.log({ data });
          return data;
    } catch(error) {
        console.log(error)

    }
}

export default sendEmail;

 

 

  

