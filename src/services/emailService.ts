import { Application } from '../types';

interface EmailTemplate {
  subject: string;
  body: string;
}

export class EmailService {
  static getStatusChangeTemplate(application: Application, jobTitle: string): EmailTemplate {
    const templates: Record<string, EmailTemplate> = {
      reviewed: {
        subject: `Application Update: ${jobTitle}`,
        body: `Your application for ${jobTitle} has been reviewed by our team.`,
      },
      shortlisted: {
        subject: `Great News! You've been shortlisted for ${jobTitle}`,
        body: `Congratulations! You've been shortlisted for the ${jobTitle} position. We'll contact you soon for the next steps.`,
      },
      accepted: {
        subject: `Congratulations! Job Offer for ${jobTitle}`,
        body: `We're pleased to offer you the ${jobTitle} position. Please check your email for further details.`,
      },
      rejected: {
        subject: `Application Update: ${jobTitle}`,
        body: `Thank you for your interest in ${jobTitle}. Unfortunately, we've decided to move forward with other candidates.`,
      },
    };

    return templates[application.status] || templates.reviewed;
  }

  static async sendStatusUpdate(
    email: string,
    application: Application,
    jobTitle: string
  ): Promise<boolean> {
    try {
      const template = this.getStatusChangeTemplate(application, jobTitle);
      
      console.log('Sending email:', {
        to: email,
        subject: template.subject,
        body: template.body,
      });

      // Integration with email service (SendGrid, AWS SES, etc.)
      // await fetch('/api/send-email', { ... });

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  static async sendApplicationConfirmation(
    email: string,
    jobTitle: string
  ): Promise<boolean> {
    try {
      console.log('Sending confirmation email:', {
        to: email,
        subject: `Application Received: ${jobTitle}`,
        body: `Thank you for applying to ${jobTitle}. We've received your application and will review it shortly.`,
      });

      return true;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      return false;
    }
  }
}
