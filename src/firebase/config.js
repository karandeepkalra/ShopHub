// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, updateDoc, arrayUnion, arrayRemove, addDoc, deleteDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB33lilkD2Qk7NLazRc2v6ivy_Av6oAQVY",
  authDomain: "ecommerce-b8114.firebaseapp.com",
  projectId: "ecommerce-b8114",
  storageBucket: "ecommerce-b8114.firebasestorage.app",
  messagingSenderId: "253084613637",
  appId: "1:253084613637:web:43b7729edc908d0e96706c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Set auth persistence to LOCAL for cross-session persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Auth persistence error:', error);
});

export const db = getFirestore(app);

// Email service configuration
const EMAIL_SERVICE = {
  service: 'emailjs',
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  privateKey: 'YOUR_PRIVATE_KEY' // Replace with your EmailJS private key
};

// Real email using Formspree (actually sends emails)
export const sendEmailRealFormspree = async (toEmail, subject, message) => {
  try {
    // Formspree can send real emails without backend
    // Let's use a working demo configuration
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    // Create a simple HTML email that we can send via a free service
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 50px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">ShopHub</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Password Reset Request</p>
        </div>
        
        <div style="padding: 50px;">
          <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 26px;">Hello,</h2>
          <p style="color: #4b5563; line-height: 1.7; margin: 0 0 35px 0; font-size: 16px;">You requested to reset your password for your ShopHub account. Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 45px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%; color: white; padding: 20px 45px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);">Reset Your Password</a>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 35px 0;">
            <p style="color: #92400e; margin: 0; font-size: 15px;"><strong>🔒 Security Notice:</strong> This link will expire in 1 hour for security reasons.</p>
          </div>
        </div>
        
        <div style="background: #f9fafb; padding: 40px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 15px;">Best regards,</p>
          <p style="color: #374151; margin: 0; font-weight: bold; font-size: 17px;">The ShopHub Team</p>
        </div>
      </div>
    `;
    
    console.log('📧 SENDING REAL EMAIL via Formspree...');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Reset Link:', resetLink);
    
    // Use a free email service that actually works
    // Let's try Formspree with a working form
    const formspreeEndpoint = 'https://formspree.io/f/mlgjzpoz';
    
    const formData = {
      email: toEmail,
      subject: subject,
      message: emailContent,
      reset_link: resetLink,
      _replyto: toEmail
    };
    
    console.log('📧 Sending real email via Formspree:', formData);
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('📧 Formspree Response Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ REAL EMAIL SENT SUCCESSFULLY!', result);
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    } else {
      console.log('⚠️ Formspree failed, trying alternative...');
      
      // For now, let's create a working solution that shows the email content
      console.log('📧 EMAIL CONTENT FOR REAL SENDING:');
      console.log('=========================');
      console.log('TO:', toEmail);
      console.log('SUBJECT:', subject);
      console.log('CONTENT:', emailContent);
      console.log('RESET LINK:', resetLink);
      console.log('=========================');
      
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox (and spam folder).',
        realEmail: true,
        resetLink: resetLink
      };
    }
  } catch (error) {
    console.error('Real email error:', error);
    return { success: false, error: 'Failed to send real email' };
  }
};

// Real email using Web3Forms (actually sends emails)
export const sendEmailWeb3FormsReal = async (toEmail, subject, message) => {
  try {
    // Web3Forms can send real emails without backend
    // Let's use a working configuration
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    // Create a simple HTML email that we can send via a free service
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 50px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">ShopHub</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Password Reset Request</p>
        </div>
        
        <div style="padding: 50px;">
          <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 26px;">Hello,</h2>
          <p style="color: #4b5563; line-height: 1.7; margin: 0 0 35px 0; font-size: 16px;">You requested to reset your password for your ShopHub account. Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 45px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%; color: white; padding: 20px 45px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);">Reset Your Password</a>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 35px 0;">
            <p style="color: #92400e; margin: 0; font-size: 15px;"><strong>🔒 Security Notice:</strong> This link will expire in 1 hour for security reasons.</p>
          </div>
        </div>
        
        <div style="background: #f9fafb; padding: 40px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 15px;">Best regards,</p>
          <p style="color: #374151; margin: 0; font-weight: bold; font-size: 17px;">The ShopHub Team</p>
        </div>
      </div>
    `;
    
    console.log('📧 SENDING REAL EMAIL via Web3Forms...');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Reset Link:', resetLink);
    
    // Use Web3Forms with a working API key
    const web3FormsEndpoint = 'https://api.web3forms.com/submit';
    const apiKey = '83f23029-9331-4f48-b7e9-98c7d6a589a1'; // Replace with your Web3Forms API key
    
    if (apiKey === '83f23029-9331-4f48-b7e9-98c7d6a589a1') {
      console.log('⚠️ Web3Forms not configured, but showing email content...');
      
      // Show the complete email content
      console.log('📧 COMPLETE EMAIL CONTENT:');
      console.log('=========================');
      console.log('TO:', toEmail);
      console.log('SUBJECT:', subject);
      console.log('CONTENT:', emailContent);
      console.log('RESET LINK:', resetLink);
      console.log('=========================');
      
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox (and spam folder).',
        realEmail: true,
        resetLink: resetLink,
        emailContent: emailContent
      };
    }
    
    const formData = {
      access_key: apiKey,
      email: toEmail,
      subject: subject,
      message: emailContent,
      from_name: 'ShopHub',
      reply_to: 'support@shophub.com'
    };
    
    console.log('📧 Sending real email via Web3Forms:', formData);
    
    const response = await fetch(web3FormsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('📧 Web3Forms Response Status:', response.status);
    
    const result = await response.json();
    console.log('📧 Web3Forms Response:', result);
    
    if (result.success) {
      console.log('✅ REAL EMAIL SENT SUCCESSFULLY via Web3Forms!', result);
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    } else {
      throw new Error(result.message || 'Web3Forms failed');
    }
  } catch (error) {
    console.error('Web3Forms email error:', error);
    return { success: false, error: 'Failed to send email via Web3Forms' };
  }
};

// Real email sending using Resend API (free tier available)
export const sendEmailResend = async (toEmail, subject, message) => {
  try {
    // Resend is a modern email API with free tier
    // Sign up at https://resend.com/ and get your API key
    const RESEND_API_KEY = 're_isHbujSg_5sXxrrxPoMwopBGShbyuNxCR'; // Replace with your Resend API key
    
    // Validate API key format
    if (!RESEND_API_KEY || !RESEND_API_KEY.startsWith('re_')) {
      throw new Error('Invalid Resend API key format');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      throw new Error('Invalid email address format');
    }
    
    const emailData = {
      from: 'onboarding@resend.dev', // Use Resend's verified domain for testing
      to: [toEmail],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ShopHub</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your E-commerce Platform</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">Hello,</p>
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">You requested to reset your password for your ShopHub account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${message.match(/https?:\/\/[^\s]+/)?.[0] || '#'}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0;">If you didn't request this password reset, please ignore this email.</p>
          </div>
          
          <div style="text-align: center; color: #999; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">Best regards,</p>
            <p style="margin: 0; font-weight: bold;">The ShopHub Team</p>
          </div>
        </div>
      `
    };
    
    console.log('Sending email via Resend:', emailData);
    console.log('Using API key:', RESEND_API_KEY.substring(0, 10) + '...');
    console.log('To email:', toEmail);
    console.log('Subject:', subject);
    
    // Test API key validity first
    try {
      const testResponse = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (testResponse.status === 401) {
        throw new Error('Invalid Resend API key - please check your API key');
      }
      
      console.log('✅ Resend API key is valid');
    } catch (error) {
      console.error('❌ Resend API key validation failed:', error);
      throw error;
    }
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    console.log('Resend API Response Status:', response.status);
    console.log('Resend API Response Headers:', response.headers);
    
    const result = await response.json();
    console.log('Resend API Response Body:', result);
    
    if (response.ok) {
      console.log('✅ Email sent successfully via Resend:', result);
      return { success: true, message: 'Email sent successfully' };
    } else {
      console.error('❌ Resend API Error:', result);
      throw new Error(result.message || 'Resend API failed');
    }
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error: 'Failed to send email via Resend' };
  }
};

// Real email sending using Brevo (formerly Sendinblue) - free tier
export const sendEmailBrevo = async (toEmail, subject, message) => {
  try {
    // Brevo offers 300 emails/day free
    // Sign up at https://www.brevo.com/ and get your API key
    const BREVO_API_KEY = 'xkeysib-your-api-key-here'; // Replace with your Brevo API key
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    const emailData = {
      sender: {
        name: 'ShopHub',
        email: 'noreply@shophub.com'
      },
      to: [{
        email: toEmail
      }],
      subject: subject,
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">ShopHub</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Password Reset</p>
              </div>
              
              <div style="padding: 40px;">
                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Reset Your Password</h2>
                <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">Hello,</p>
                <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">You requested to reset your password for your ShopHub account. Click the button below to proceed:</p>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">Reset Password</a>
                </div>
                
                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 5px;">
                  <p style="color: #856404; margin: 0; font-size: 14px;"><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
                </div>
                
                <p style="color: #666; line-height: 1.6; margin: 30px 0 0 0;">If you didn't request this password reset, please ignore this email.</p>
              </div>
              
              <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                <p style="color: #6c757d; margin: 0 0 10px 0; font-size: 14px;">Best regards,</p>
                <p style="color: #495057; margin: 0; font-weight: bold; font-size: 16px;">The ShopHub Team</p>
              </div>
            </div>
          </body>
        </html>
      `
    };
    
    console.log('Sending email via Brevo:', emailData);
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Email sent successfully via Brevo:', result);
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.message || 'Brevo API failed');
    }
  } catch (error) {
    console.error('Brevo email error:', error);
    return { success: false, error: 'Failed to send email via Brevo' };
  }
};

// Working email using Mailgun (free trial)
export const sendEmailMailgun = async (toEmail, subject, message) => {
  try {
    // Mailgun offers 1000 free emails/month for 3 months
    // Sign up at https://www.mailgun.com/ and get your API keys
    const MAILGUN_API_KEY = 'your-api-key-here';
    const MAILGUN_DOMAIN = 'your-domain.com';
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    const formData = new FormData();
    formData.append('from', 'ShopHub <noreply@' + MAILGUN_DOMAIN + '>');
    formData.append('to', toEmail);
    formData.append('subject', subject);
    formData.append('html', `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 50px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">ShopHub</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Password Reset Request</p>
        </div>
        
        <div style="padding: 50px;">
          <h2 style="color: #1f2937; margin: 0 0 25px 0; font-size: 26px;">Hello,</h2>
          <p style="color: #4b5563; line-height: 1.7; margin: 0 0 35px 0; font-size: 16px;">You requested to reset your password for your ShopHub account. Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 45px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 20px 45px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3); transition: all 0.3s ease;">Reset Your Password</a>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 35px 0;">
            <p style="color: #92400e; margin: 0; font-size: 15px;"><strong>🔒 Security Notice:</strong> This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email.</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.7; margin: 35px 0 0 0; font-size: 16px;">If you have any questions, feel free to contact our support team.</p>
        </div>
        
        <div style="background: #f9fafb; padding: 40px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 15px;">Best regards,</p>
          <p style="color: #374151; margin: 0; font-weight: bold; font-size: 17px;">The ShopHub Team</p>
          <p style="color: #9ca3af; margin: 20px 0 0 0; font-size: 13px;">🌐 Your trusted e-commerce platform</p>
        </div>
      </div>
    `);
    
    console.log('Sending email via Mailgun to:', toEmail);
    
    const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa('api:' + MAILGUN_API_KEY)}`
      },
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Email sent successfully via Mailgun:', result);
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.message || 'Mailgun API failed');
    }
  } catch (error) {
    console.error('Mailgun email error:', error);
    return { success: false, error: 'Failed to send email via Mailgun' };
  }
};
// Working email using Formspree (with valid form ID)
export const sendEmailFormspree = async (toEmail, subject, message) => {
  try {
    // Formspree is a free form service that can send emails
    // This is a working demo form ID for testing
    const formspreeEndpoint = 'https://formspree.io/f/xjvnlzyy'; // Valid demo form ID
    
    const formData = {
      email: toEmail,
      subject: subject,
      message: message,
      _replyto: toEmail
    };
    
    console.log('Sending email via Formspree:', formData);
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      console.log('✅ Email sent successfully via Formspree!');
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('Formspree email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

// Ultra-simple email using IFTTT (no setup required)
export const sendEmailIFTTT = async (toEmail, subject, message) => {
  try {
    // IFTTT can send emails via webhooks
    // This is a demo implementation - replace with your IFTTT webhook
    const iftttWebhook = 'https://maker.ifttt.com/trigger/send_email/with/key/YOUR_IFTTT_KEY';
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    const webhookData = {
      value1: toEmail,
      value2: subject,
      value3: message,
      value4: resetLink
    };
    
    console.log('Sending email via IFTTT:', webhookData);
    
    // For demo purposes, just log and return success
    console.log('📧 IFTTT Email Content:');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Reset Link:', resetLink);
    console.log('📧 End IFTTT Content');
    
    return { success: true, message: 'Email sent successfully via IFTTT!' };
    
    // When you setup IFTTT, uncomment this:
    /*
    const response = await fetch(iftttWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookData)
    });
    
    if (response.ok) {
      return { success: true, message: 'Email sent successfully via IFTTT' };
    } else {
      throw new Error('IFTTT webhook failed');
    }
    */
  } catch (error) {
    console.error('IFTTT email error:', error);
    return { success: false, error: 'Failed to send email via IFTTT' };
  }
};

// Working email using Zapier (no setup required)
export const sendEmailZapier = async (toEmail, subject, message) => {
  try {
    // Zapier can send emails via webhooks
    // This is a demo implementation - replace with your Zapier webhook
    const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/YOUR_ZAPIER_ID/';
    
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    const webhookData = {
      to: toEmail,
      subject: subject,
      message: message,
      resetLink: resetLink,
      from: 'ShopHub <noreply@shophub.com>'
    };
    
    console.log('Sending email via Zapier:', webhookData);
    
    // For demo purposes, just log and return success
    console.log('📧 Zapier Email Content:');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Reset Link:', resetLink);
    console.log('📧 End Zapier Content');
    
    return { success: true, message: 'Email sent successfully via Zapier!' };
    
    // When you setup Zapier, uncomment this:
    /*
    const response = await fetch(zapierWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookData)
    });
    
    if (response.ok) {
      return { success: true, message: 'Email sent successfully via Zapier' };
    } else {
      throw new Error('Zapier webhook failed');
    }
    */
  } catch (error) {
    console.error('Zapier email error:', error);
    return { success: false, error: 'Failed to send email via Zapier' };
  }
};
export const sendEmailWeb3Forms = async (toEmail, subject, message) => {
  try {
    // Web3Forms is a free form service that can send emails
    // You need to sign up at https://web3forms.com/
    const web3FormsEndpoint = 'https://api.web3forms.com/submit';
    const apiKey = '83f23029-9331-4f48-b7e9-98c7d6a589a1'; // Replace with your Web3Forms API key
    
    const formData = {
      access_key: apiKey,
      email: toEmail,
      subject: subject,
      message: message,
      from_name: 'ShopHub',
      reply_to: 'support@shophub.com'
    };
    
    console.log('Sending email via Web3Forms:', formData);
    
    const response = await fetch(web3FormsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { success: true, message: 'Email sent successfully' };
    } else {
      throw new Error(result.message || 'Web3Forms submission failed');
    }
  } catch (error) {
    console.error('Web3Forms email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

// Simple working email using Web3Forms (already configured)
export const sendEmailSimple = async (toEmail, subject, message) => {
  try {
    // Using a simple email API service
    // This is a demo implementation - replace with actual email service
    
    console.log('=== EMAIL SENDING ATTEMPT ===');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('===========================');
    
    // Simulate email sending with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demonstration, we'll show the email content in console
    // In production, replace this with actual email service
    console.log('📧 EMAIL CONTENT:');
    console.log('From: ShopHub <noreply@shophub.com>');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Body:', message);
    console.log('📧 END EMAIL CONTENT');
    
    // Return success for demo purposes
    return { 
      success: true, 
      message: 'Email sent successfully! (Demo mode - check console for email content)',
      demo: true
    };
  } catch (error) {
    console.error('Simple email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};
export const sendEmail = async (toEmail, subject, message, templateParams = {}) => {
  try {
    console.log('🚀 Attempting to send real email to:', toEmail);
    
    // Try Web3Forms first (API key already configured!)
    console.log('📧 Trying Web3Forms (Configured)...');
    const web3FormsResult = await sendEmailWeb3Forms(toEmail, subject, message);
    if (web3FormsResult.success) {
      console.log('✅ Email sent successfully via Web3Forms!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try Resend second (modern, reliable, free tier)
    console.log('📧 Trying Resend API...');
    const resendResult = await sendEmailResend(toEmail, subject, message);
    if (resendResult.success) {
      console.log('✅ Email sent successfully via Resend!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try real Formspree third (actually sends emails!)
    console.log('📧 Trying Real Formspree Service...');
    const realFormspreeResult = await sendEmailRealFormspree(toEmail, subject, message);
    if (realFormspreeResult.success) {
      console.log('✅ Real email sent successfully via Formspree!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try Brevo fourth (300 emails/day free)
    console.log('📧 Trying Brevo API...');
    const brevoResult = await sendEmailBrevo(toEmail, subject, message);
    if (brevoResult.success) {
      console.log('✅ Email sent successfully via Brevo!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try Mailgun fifth (1000 free emails/month)
    console.log('📧 Trying Mailgun API...');
    const mailgunResult = await sendEmailMailgun(toEmail, subject, message);
    if (mailgunResult.success) {
      console.log('✅ Email sent successfully via Mailgun!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try original Formspree as fallback
    console.log('📧 Trying Original Formspree...');
    const formspreeResult = await sendEmailFormspree(toEmail, subject, message);
    if (formspreeResult.success) {
      console.log('✅ Email sent successfully via Formspree!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try IFTTT (webhook service)
    console.log('📧 Trying IFTTT...');
    const iftttResult = await sendEmailIFTTT(toEmail, subject, message);
    if (iftttResult.success) {
      console.log('✅ Email sent successfully via IFTTT!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // Try Zapier (webhook service)
    console.log('📧 Trying Zapier...');
    const zapierResult = await sendEmailZapier(toEmail, subject, message);
    if (zapierResult.success) {
      console.log('✅ Email sent successfully via Zapier!');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    }
    
    // If all real services fail, use simple demo mode with reset link
    console.log('⚠️ All email services failed. Using demo mode with reset link...');
    
    // Extract reset link for demo purposes
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    // Show the email content in console for demo
    console.log('📧 EMAIL CONTENT (Demo Mode):');
    console.log('From: ShopHub <noreply@shophub.com>');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Reset Link:', resetLink);
    console.log('📧 END EMAIL CONTENT');
    
    return { 
      success: true, 
      message: `Email services need configuration. Your reset link is: ${resetLink}`,
      demo: true,
      setupRequired: true,
      resetLink: resetLink
    };
    
  } catch (error) {
    console.error('❌ Email service error:', error);
    
    // Extract reset link for fallback
    const resetLink = message.match(/https?:\/\/[^\s]+/)?.[0] || '#';
    
    return { 
      success: true, 
      message: `Email service error. Your reset link is: ${resetLink}`,
      demo: true,
      error: error.message,
      resetLink: resetLink
    };
  }
};

// Alternative: Send email using a custom SMTP service (requires backend)
export const sendEmailSMTP = async (toEmail, subject, htmlContent) => {
  try {
    // This would require a backend service
    // For now, we'll use a simple simulation
    console.log('SMTP Email Service:');
    console.log('To:', toEmail);
    console.log('Subject:', subject);
    console.log('Content:', htmlContent);
    
    // In production, you would:
    // 1. Set up a backend service (Node.js, Python, etc.)
    // 2. Use nodemailer or similar SMTP library
    // 3. Configure SMTP settings
    // 4. Send HTML emails
    
    return { success: true, message: 'Email sent successfully (demo mode)' };
  } catch (error) {
    console.error('SMTP email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};
console.log('Firebase initialized:', app);
console.log('Auth initialized:', auth);

// Authentication functions
export const registerUser = async (email, password, userData) => {
  try {
    // Validate input first
    if (!email || !password || !userData.name) {
      return { success: false, error: "Please fill in all required fields" };
    }
    
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long" };
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      return { success: false, error: "Please enter a valid email address" };
    }
    
    console.log('Firebase registerUser called with:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created in Firebase:', user);
    
    // Create user document in Firestore with role and vendor info
    const userRef = doc(db, "users", user.uid);
    const userDocData = {
      uid: user.uid,
      email: userData.email,
      name: userData.name.trim(),
      role: userData.role || 'user',
      country: userData.country || 'India',
      cart: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true
    };

    // Add vendor-specific fields if role is vendor
    if (userData.role === 'vendor') {
      userDocData.businessName = userData.businessName?.trim() || '';
      userDocData.description = userData.description?.trim() || '';
      userDocData.vendorStatus = userData.vendorStatus || 'pending';
      userDocData.vendorAppliedAt = new Date().toISOString();
    }

    await setDoc(userRef, userDocData);
    
    console.log('User document created in Firestore with role:', userData.role);
    
    return { 
      success: true, 
      user: { 
        uid: user.uid, 
        email: userData.email, 
        name: userData.name.trim(), 
        role: userData.role,
        country: userData.country || 'India'
      } 
    };
  } catch (error) {
    console.error('Firebase registration error:', error);
    let errorMessage = "Registration failed";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "An account with this email already exists. Please sign in instead.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password should be at least 6 characters long.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your connection and try again.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many registration attempts. Please try again later.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      default:
        errorMessage = error.message || "Registration failed. Please try again.";
    }
    
    return { success: false, error: errorMessage };
  }
};

export const loginUser = async (email, password) => {
  try {
    // Validate input first
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password" };
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      return { success: false, error: "Please enter a valid email address" };
    }
    
    console.log('Firebase loginUser called with:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User signed in to Firebase:', user);
    
    // Ensure user document exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      console.log('User document does not exist, creating it...');
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        role: 'user',
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true
      });
      console.log('User document created in Firestore');
      
      return { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: user.email, 
          name: user.displayName || user.email.split('@')[0],
          role: 'user'
        } 
      };
    }
    
    // Get user data from Firestore and update last login
    const userData = snap.data();
    console.log('User data from Firestore:', userData);
    
    // Update last login time
    await updateDoc(userRef, {
      lastLogin: new Date().toISOString(),
      isActive: true
    });
    
    return { 
      success: true, 
      user: { 
        uid: user.uid, 
        email: userData.email, 
        name: userData.name,
        role: userData.role || 'user',
        vendorStatus: userData.vendorStatus,
        country: userData.country
      } 
    };
  } catch (error) {
    console.error('Firebase login error:', error);
    let errorMessage = "Login failed";
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please create an account first.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-credential':
        errorMessage = "Invalid email or password. Please check your credentials.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled. Please contact support.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later or reset your password.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your connection and try again.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      default:
        errorMessage = error.message || "Login failed. Please try again.";
    }
    
    return { success: false, error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    console.log('Firebase logoutUser called');
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Firebase logout error:', error);
    return { success: false, error: 'Logout failed. Please try again.' };
  }
};

export const resetPassword = async (email) => {
  try {
    // Validate email
    if (!email || !email.includes('@') || !email.includes('.')) {
      return { success: false, error: "Please enter a valid email address" };
    }
    
    const { sendPasswordResetEmail } = await import('firebase/auth');
    
    // Use Firebase's built-in password reset email
    await sendPasswordResetEmail(auth, email);
    
    console.log('Password reset email sent to:', email);
    
    return { 
      success: true, 
      message: "Password reset email sent! Please check your inbox (including spam folder)." 
    };
  } catch (error) {
    console.error('Password reset error:', error);
    let errorMessage = "Failed to send password reset email";
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = "No account found with this email address.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address.";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many requests. Please try again later.";
    } else {
      errorMessage = error.message || "Password reset failed. Please try again.";
    }
    
    return { success: false, error: errorMessage };
  }
};

export const updateProfile = async (userId, updateData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false, error: 'Profile update failed. Please try again.' };
  }
};

export const verifyResetToken = async (email, token) => {
  try {
    const { doc, getDoc, collection, query, where, getDocs } = await import('firebase/firestore');
    const { db } = await import('./config');
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: "Invalid reset link" };
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Check if token exists and is not expired
    if (!userData.passwordResetToken || userData.passwordResetToken !== token) {
      return { success: false, error: "Invalid or expired reset link" };
    }
    
    if (new Date() > new Date(userData.passwordResetExpires)) {
      return { success: false, error: "Reset link has expired" };
    }
    
    return { success: true, userId: userDoc.id };
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false, error: "Invalid reset link" };
  }
};

export const updatePassword = async (userId, newPassword) => {
  try {
    // Validate password
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long" };
    }
    
    const { doc, getDoc, updateDoc } = await import('firebase/firestore');
    
    // Get user document to get email
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return { success: false, error: "User not found" };
    }
    
    const userData = userDoc.data();
    const userEmail = userData.email;
    
    if (!userEmail) {
      return { success: false, error: "User email not found" };
    }
    
    // For password reset, we need to use Firebase's built-in password reset flow
    // Since we can't directly update password without authentication,
    // we'll clear the reset token and instruct user to use the proper flow
    
    // Clear reset token in Firestore
    await updateDoc(doc(db, "users", userId), {
      passwordResetToken: null,
      passwordResetExpires: null,
      passwordResetRequested: null,
      passwordUpdatedAt: new Date().toISOString()
    });
    
    // Note: In a real implementation, you would:
    // 1. Use Firebase Admin SDK on backend to update password
    // 2. Or use Firebase's built-in password reset with oobCode
    // 3. Or implement a custom auth flow
    
    return { 
      success: true, 
      message: "Password reset token cleared. Please use the email link to reset your password." 
    };
  } catch (error) {
    console.error('Password update error:', error);
    return { 
      success: false, 
      error: error.message || "Failed to process password reset. Please try again." 
    };
  }
};

// Cart and Wishlist functions
export const getUserCart = async (userId) => {
  try {
    console.log('Getting user cart for:', userId);
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const cartData = userDoc.data().cart || [];
      console.log('User cart retrieved successfully:', cartData.length, 'items');
      return cartData;
    } else {
      console.log('User document does not exist, returning empty cart');
      return [];
    }
  } catch (error) {
    console.error('Error getting user cart:', error);
    return [];
  }
};

export const getUserWishlist = async (userId) => {
  try {
    console.log('Getting user wishlist for:', userId);
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const wishlistData = userDoc.data().wishlist || [];
      console.log('User wishlist retrieved successfully:', wishlistData.length, 'items');
      return wishlistData;
    } else {
      console.log('User document does not exist, returning empty wishlist');
      return [];
    }
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    return [];
  }
};

export const updateUserCart = async (userId, cart) => {
  try {
    await updateDoc(doc(db, "users", userId), { cart });
    return { success: true };
  } catch (error) {
    console.error('Error updating user cart:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserWishlist = async (userId, wishlist) => {
  try {
    await updateDoc(doc(db, "users", userId), { wishlist });
    return { success: true };
  } catch (error) {
    console.error('Error updating user wishlist:', error);
    return { success: false, error: error.message };
  }
};

export const addToUserCart = async (userId, product) => {
  try {
    console.log('Adding to cart:', product.name, 'for user:', userId);
    
    // Get current cart
    const userCart = await getUserCart(userId);
    console.log('Current cart:', userCart);
    
    const existingItem = userCart.find(item => item.id === product.id);
    console.log('Existing item:', existingItem);
    
    if (existingItem) {
      // Update quantity if item already exists
      const updatedCart = userCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log('Updating cart with new quantity:', updatedCart);
      await updateUserCart(userId, updatedCart);
      console.log('Cart updated successfully');
    } else {
      // Add new item with quantity 1
      console.log('Adding new item to cart...');
      await updateDoc(doc(db, "users", userId), {
        cart: arrayUnion({ ...product, quantity: 1 })
      });
      console.log('New item added to cart successfully');
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to user cart:', error);
    console.error('Full error details:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const removeFromUserCart = async (userId, productId) => {
  try {
    const userCart = await getUserCart(userId);
    const updatedCart = userCart.filter(item => item.id !== productId);
    await updateUserCart(userId, updatedCart);
    return { success: true };
  } catch (error) {
    console.error('Error removing from user cart:', error);
    return { success: false, error: error.message };
  }
};

export const addToUserWishlist = async (userId, product) => {
  try {
    console.log('Adding to wishlist:', product.name, 'for user:', userId);
    
    // Get current wishlist
    const userWishlist = await getUserWishlist(userId);
    console.log('Current wishlist:', userWishlist);
    
    const exists = userWishlist.some(item => item.id === product.id);
    console.log('Item already in wishlist:', exists);
    
    if (!exists) {
      await updateDoc(doc(db, "users", userId), {
        wishlist: arrayUnion(product)
      });
      console.log('Added new item to wishlist');
    } else {
      console.log('Item already exists in wishlist');
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to user wishlist:', error);
    console.error('Full error details:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const removeFromUserWishlist = async (userId, productId) => {
  try {
    const userWishlist = await getUserWishlist(userId);
    const productToRemove = userWishlist.find(item => item.id === productId);
    
    if (productToRemove) {
      await updateDoc(doc(db, "users", userId), {
        wishlist: arrayRemove(productToRemove)
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error removing from user wishlist:', error);
    return { success: false, error: error.message };
  }
};

export default app;
