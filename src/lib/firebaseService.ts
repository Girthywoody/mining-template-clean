// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6TubJ_K6WryulHc3p2Dnpfkk60hS-pdI",
  authDomain: "truenorth-8dcea.firebaseapp.com",
  projectId: "truenorth-8dcea",
  storageBucket: "truenorth-8dcea.firebasestorage.app",
  messagingSenderId: "810236412709",
  appId: "1:810236412709:web:0bd73e0ad53ca2860850cc",
  measurementId: "G-TYRCHFZBZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Lead data interface
export interface LeadData {
  projectType: string;
  businessName: string;
  industry: string;
  email: string;
  phone?: string;
  timestamp: any; // Firestore serverTimestamp
  source: string;
}

// Submit lead to Firestore and trigger email
export const submitLeadToFirestore = async (data: Omit<LeadData, 'timestamp' | 'source'>): Promise<boolean> => {
  try {
    const leadData: LeadData = {
      ...data,
      timestamp: serverTimestamp(),
      source: 'get-started-modal'
    };

    // Add to formSubmissions collection for data storage
    await addDoc(collection(db, 'formSubmissions'), leadData);

    // Add to mail collection to trigger email notification
    await addDoc(collection(db, 'mail'), {
      to: 'joshualaw1525@gmail.com', // Replace with your actual email
      message: {
        subject: `🚀 New Lead: ${data.businessName} - ${data.projectType}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎉 New Lead Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">New Lead Notification</p>
            </div>
            
            <div style="padding: 30px;">
              <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px;">🏢 Business Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Business Name:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${data.businessName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151;">Industry:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${data.industry}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  ${data.phone ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #0ea5e9;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px;">🎯 Project Details</h2>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e0e7ff;">
                  <span style="font-weight: 600; color: #374151;">Project Type:</span>
                  <span style="color: #1f2937; margin-left: 10px;">${data.projectType}</span>
                </div>
              </div>

              <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">📊 Lead Summary</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                  <div style="background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; flex: 1; min-width: 150px;">
                    <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">Source</div>
                    <div style="font-size: 14px; color: #1f2937; font-weight: 500;">Get Started Modal</div>
                  </div>
                  <div style="background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; flex: 1; min-width: 150px;">
                    <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">Submitted</div>
                    <div style="font-size: 14px; color: #1f2937; font-weight: 500;">${new Date().toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${data.email}" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                  📧 Reply to Lead
                </a>
              </div>
            </div>

            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                This lead was submitted through the contact form.
              </p>
            </div>
          </div>
        `,
        text: `
🚀 NEW LEAD RECEIVED

🏢 BUSINESS INFORMATION:
Business Name: ${data.businessName}
Industry: ${data.industry}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}

🎯 PROJECT DETAILS:
Project Type: ${data.projectType}

📊 LEAD SUMMARY:
Source: Get Started Modal
Submitted: ${new Date().toLocaleString()}

---
This lead was submitted through the contact form.
Reply directly to this email to contact the lead.
        `
      }
    });

    console.log('✅ Lead submitted successfully to Firestore and email triggered');
    return true;
  } catch (error) {
    console.error('❌ Error submitting lead to Firestore:', error);
    return false;
  }
};

// Utility function to format form data
export const formatLeadData = (formData: any): Omit<LeadData, 'timestamp' | 'source'> => {
  return {
    projectType: formData.projectType,
    businessName: formData.businessName,
    industry: formData.industry,
    email: formData.email,
    phone: formData.phone
  };
};
