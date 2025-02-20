import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { MailConfig } from './mail-config.type';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService<MailConfig>) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST', { infer: true }),
      port: configService.get('MAIL_PORT', { infer: true }),
      ignoreTLS: configService.get('MAIL_IGNORE_TLS', { infer: true }),
      secure: configService.get('MAIL_SECURE', { infer: true }),
      requireTLS: configService.get('MAIL_REQUIRE_TLS', { infer: true }),
      auth: {
        user: configService.get('MAIL_USER', { infer: true }),
        pass: configService.get('MAIL_PASSWORD', { infer: true }),
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.configService.get('MAIL_DEFAULT_NAME', {
            infer: true,
          })}" <${this.configService.get('MAIL_DEFAULT_EMAIL', {
            infer: true,
          })}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
