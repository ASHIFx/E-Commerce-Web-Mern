import axios from 'axios';
import { config } from '../config/config.js';

const sendEmail = async ({ email, subject, message }) => {
  try {
    if (!config.EMAIL_USER || !config.BREVO_API_KEY) {
      console.warn('Email credentials are not configured. Skipping email send.');
      return null;
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Asif',
          email: config.EMAIL_USER,
        },
        to: [{ email }],
        subject,
        htmlContent: message,
      },
      {
        headers: {
          'api-key': config.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Email sent successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Email Error');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
};

export default sendEmail;
