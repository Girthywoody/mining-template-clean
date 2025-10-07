// Email service for contact form submissions

import emailjs from '@emailjs/browser';

interface LeadData {
  projectType: string;
  businessName: string;
  industry: string;
  email: string;
  phone?: string;
  timestamp: string;
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_l98hndk';
const EMAILJS_TEMPLATE_ID = 'template_8215c85';
const EMAILJS_PUBLIC_KEY = 'mEEpltltTZIcoq0Xk';

export const submitLead = async (data: LeadData): Promise<boolean> => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Prepare email parameters
    const templateParams = {
      to_email: 'joshualaw1525@gmail.com', // Your email address
      from_name: data.businessName,
      from_email: data.email,
      project_type: data.projectType,
      business_name: data.businessName,
      industry: data.industry,
      phone: data.phone || 'Not provided',
      message: `
New Lead from Contact Form

Business Information:
- Business Name: ${data.businessName}
- Industry: ${data.industry}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}

Project Details:
- Project Type: ${data.projectType}

Submitted: ${data.timestamp}

This lead was submitted through the contact form.
      `,
      reply_to: data.email
    };
    
    // Send email
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    if (result.status === 200) {
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

// Utility function to format form data
export const formatLeadData = (formData: any): LeadData => {
  return {
    projectType: formData.projectType,
    businessName: formData.businessName,
    industry: formData.industry,
    email: formData.email,
    phone: formData.phone,
    timestamp: new Date().toLocaleString()
  };
};
