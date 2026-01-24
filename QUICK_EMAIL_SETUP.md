# Quick Email Setup - Get Real Emails Working NOW!

## 🚀 Fastest Setup: Resend (Recommended)

**Resend is the easiest and most reliable option** - modern API, great free tier, professional emails.

### Step 1: Sign Up (2 minutes)
1. Go to https://resend.com/
2. Click "Sign Up" 
3. Use Google/GitHub or email signup
4. Verify your email

### Step 2: Get API Key (1 minute)
1. Go to Dashboard → API Keys
2. Click "Create API Key"
3. Name it "ShopHub"
4. Copy the API key (starts with `re_`)

### Step 3: Update Code (30 seconds)
Open `src/firebase/config.js` and find this line:
```javascript
const RESEND_API_KEY = 're_your_api_key_here'; // Replace with your Resend API key
```

Replace with your actual API key:
```javascript
const RESEND_API_KEY = 're_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789'; // Your real API key
```

### Step 4: Test It! (1 minute)
1. Go to your login page
2. Click "Forgot password?"
3. Enter your email
4. Check your email inbox!

**🎉 That's it! You're sending real emails!**

---

## 📧 Alternative Options (if Resend doesn't work)

### Option 2: Brevo (300 emails/day free)
1. Sign up: https://www.brevo.com/
2. Get API key from Settings → API & SMTP
3. Update `BREVO_API_KEY` in config.js
4. Replace `xkeysib-your-api-key-here`

### Option 3: Mailgun (1000 free emails/month)
1. Sign up: https://www.mailgun.com/
2. Get API key and domain
3. Update `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` in config.js

---

## 🔍 How to Test Your Email Setup

### Check Console Logs:
Open browser console (F12) and look for:
```
🚀 Attempting to send real email to: your@email.com
📧 Trying Resend API...
✅ Email sent successfully via Resend!
```

### What You'll Receive:
- **Professional HTML email** with ShopHub branding
- **Password reset button** that actually works
- **Security information** and expiration details
- **Mobile-friendly** responsive design

---

## 🛠️ Troubleshooting

### If emails aren't sending:

1. **Check API Key**: Make sure you replaced the placeholder
2. **Check Console**: Look for error messages
3. **Check Spam**: Emails might go to spam folder
4. **Verify Domain**: Some services require domain verification

### Common Console Errors:
- `401 Unauthorized` → API key is wrong
- `403 Forbidden` → API key doesn't have permissions
- `429 Too Many Requests` → Rate limit exceeded

### Quick Fix:
```javascript
// Test with a simple email service first
const RESEND_API_KEY = 're_your_real_api_key_here';
```

---

## 📊 Email Service Comparison

| Service | Free Tier | Setup Time | Reliability | Email Quality |
|---------|-----------|------------|-------------|---------------|
| **Resend** | 3,000 emails/month | 3 minutes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Brevo** | 300 emails/day | 5 minutes | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Mailgun** | 1,000 emails/month | 10 minutes | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Production Tips

### For Production Use:
1. **Use environment variables** for API keys
2. **Set up custom domain** for better deliverability
3. **Monitor email metrics** in your email service dashboard
4. **Set up backup email service** for reliability

### Environment Variables:
```javascript
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
```

### Domain Setup:
- Add your domain to Resend dashboard
- Verify DNS records (TXT, CNAME)
- Get better email deliverability

---

## 🆘 Need Help?

### Check Console First:
- Open browser console (F12)
- Look for email service logs
- Error messages will tell you what's wrong

### Common Issues:
- **API Key**: Make sure it's copied correctly
- **Network**: Check internet connection
- **Browser**: Try different browser
- **Firewall**: Corporate networks might block APIs

### Test Each Service:
The system tries services in this order:
1. Resend → Brevo → Mailgun → Formspree → Web3Forms

---

## ✅ Success Checklist

When your setup is working, you should see:

### ✅ Console Output:
```
🚀 Attempting to send real email to: user@example.com
📧 Trying Resend API...
✅ Email sent successfully via Resend!
```

### ✅ Email Received:
- Professional HTML design
- ShopHub branding
- Working reset button
- Security information

### ✅ User Flow:
1. User requests password reset
2. Email arrives in inbox
3. User clicks reset button
4. Reset page loads
5. Password is updated successfully

---

**🎉 Your password reset system will send real emails once you configure any of these services!**

**Start with Resend - it's the fastest and most reliable option.**
