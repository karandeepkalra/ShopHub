# Email Setup Guide for ShopHub

## 📧 Email Service Configuration

Your password reset system needs a real email service to send actual emails. Here are the options:

### Option 1: EmailJS (Recommended for Development)

**EmailJS** is a free service that lets you send emails directly from your React app without a backend.

#### Setup Steps:

1. **Sign up for EmailJS**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account
   - Verify your email address

2. **Create an Email Service**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection instructions
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to Email Templates → Create New Template
   - Use this template for password reset:

   ```
   Subject: ShopHub - Password Reset Request
   
   Hello {{to_name}},
   
   You requested to reset your password for your ShopHub account.
   
   Click the link below to reset your password:
   {{reset_link}}
   
   This link will expire in 1 hour for security reasons.
   
   If you didn't request this password reset, please ignore this email.
   
   Best regards,
   The ShopHub Team
   ```

4. **Get Your Credentials**
   - Service ID (from step 2)
   - Template ID (from step 3)
   - Public Key (from Account → API Keys)

5. **Update Your Configuration**
   - Open `src/firebase/config.js`
   - Replace the placeholder values:

   ```javascript
   const EMAIL_SERVICE = {
     service: 'emailjs',
     publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
     serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
     templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
     privateKey: 'YOUR_PRIVATE_KEY' // Replace with your EmailJS private key
   };
   ```

6. **Install EmailJS**
   ```bash
   npm install @emailjs/browser
   ```

7. **Update the sendEmail function**
   - Uncomment the EmailJS code in `src/firebase/config.js`

### Option 2: Firebase Email Templates (Production)

For production, you can configure Firebase to send real emails:

1. **Go to Firebase Console**
   - Select your project
   - Go to Authentication → Templates

2. **Configure Password Reset Email**
   - Edit the password reset template
   - Customize the email content
   - Set up custom domain (optional)

3. **Update Firebase Configuration**
   - Enable email/password sign-in method
   - Configure email templates

### Option 3: Backend SMTP Service

For full control, set up a backend service:

1. **Create a Backend Service** (Node.js, Python, etc.)
2. **Use SMTP Library** (nodemailer, etc.)
3. **Configure SMTP Settings** (Gmail, SendGrid, etc.)
4. **Create API Endpoint** for email sending

## 🔧 Current Implementation

The current system includes:

### ✅ What's Working:
- **Token Generation**: Secure reset tokens
- **Database Storage**: Tokens stored in Firestore
- **Email Templates**: Professional email content
- **User Validation**: Email existence checking
- **Security**: Token expiration (1 hour)
- **UI/UX**: Complete reset flow

### 🔄 What Needs Setup:
- **Email Service**: Configure EmailJS or Firebase
- **Credentials**: Add your email service keys
- **Templates**: Set up email templates

## 🚀 Quick Setup (EmailJS)

### Step 1: Install EmailJS
```bash
npm install @emailjs/browser
```

### Step 2: Update Configuration
Edit `src/firebase/config.js` and replace:
```javascript
const EMAIL_SERVICE = {
  service: 'emailjs',
  publicKey: 'YOUR_PUBLIC_KEY', // Get from EmailJS
  serviceId: 'YOUR_SERVICE_ID', // Get from EmailJS
  templateId: 'YOUR_TEMPLATE_ID', // Get from EmailJS
  privateKey: 'YOUR_PRIVATE_KEY' // Get from EmailJS
};
```

### Step 3: Enable EmailJS
Uncomment the EmailJS code in the `sendEmail` function:
```javascript
// Replace this:
return { success: true, message: 'Email sent successfully (demo mode)' };

// With this:
emailjs.send(EMAIL_SERVICE.serviceId, EMAIL_SERVICE.templateId, {
  to_email: toEmail,
  subject: subject,
  message: message,
  ...templateParams
}).then((response) => {
  console.log('Email sent successfully:', response);
  return { success: true, message: 'Email sent successfully' };
}).catch((error) => {
  console.error('Email send error:', error);
  return { success: false, error: 'Failed to send email' };
});
```

## 📧 Email Template Example

### Password Reset Email Template:
```
Subject: ShopHub - Password Reset Request

Hello {{user_name}},

You requested to reset your password for your ShopHub account.

Click the link below to reset your password:
{{reset_link}}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The ShopHub Team
```

### Variables:
- `{{user_name}}`: User's name
- `{{reset_link}}`: Password reset link
- `{{to_email}}`: User's email address

## 🔍 Testing

### Test the Email System:
1. **Go to Login Page**
2. **Click "Forgot password?"**
3. **Enter your email**
4. **Check your email inbox**
5. **Click the reset link**
6. **Reset your password**

### Debug Email Issues:
- **Check Console**: Look for email service logs
- **Verify Credentials**: Ensure EmailJS keys are correct
- **Check Spam Folder**: Emails might go to spam
- **Test Template**: Verify EmailJS template works

## 🛡️ Security Considerations

### Email Security:
- **Rate Limiting**: Prevent email abuse
- **Token Expiration**: 1-hour expiry
- **User Validation**: Check email exists
- **Secure Tokens**: Random token generation

### Best Practices:
- **Use HTTPS**: Secure email service calls
- **Validate Input**: Email format checking
- **Monitor Usage**: Track email sending
- **Backup Methods**: Multiple email providers

## 📞 Support

If you need help setting up email services:

1. **EmailJS Documentation**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. **Firebase Email Templates**: [https://firebase.google.com/docs/auth/custom-email-templates](https://firebase.google.com/docs/auth/custom-email-templates)
3. **SMTP Services**: SendGrid, Mailgun, AWS SES

## 🎯 Next Steps

1. **Choose Email Service**: EmailJS (easy) or Firebase (production)
2. **Set Up Account**: Create email service account
3. **Configure Templates**: Create email templates
4. **Update Configuration**: Add your credentials
5. **Test System**: Verify emails are sent
6. **Deploy**: Launch with real email functionality

**Your password reset system is ready - just configure the email service!**
