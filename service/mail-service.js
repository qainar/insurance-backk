import nodemailer from 'nodemailer'
import pkg from 'mysql/lib/protocol/Auth.js';
const {auth} = pkg;


export class MailService{
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: 'qainar.test@gmail.com' ,
                pass: 'qainar2002'
            }
        })
    }

    async sendActivationLink(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: 'Пожалуйста активируйте аккаунт. По нажатию кнопку вы перейдете на сайт',
            html: `
                <div>
                    <h1>Ссылка на активацию аккаунта</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}