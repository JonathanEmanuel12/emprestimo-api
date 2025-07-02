import sgMail from '@sendgrid/mail';
import { EmailDto } from '../dtos/email_dto.js'
import env from '#start/env';
import Client from '#models/client';

export default class EmailService {
    public async sendNewClientEmail(client: Client, validationCode: string): Promise<void> {
        await this.sendEmail({
            to: client.user.email,
            subject: 'Bem-vindo ao nosso app',
            text: 'Bem-vindo ao nosso app',
            html: `<strong>${validationCode}</strong>`,
        })
    }

    private async sendEmail(emailDto: Omit<EmailDto, 'from'>): Promise<void> {
        if(env.get('NODE_ENV') === 'development' || env.get('NODE_ENV') === 'test') {
            console.log(emailDto)
            return
        }
        sgMail.setApiKey(env.get('SENDGRID_API_KEY'))
        await sgMail.send({ from: 'admin@gmail.com', ...emailDto })
    }
}