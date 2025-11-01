# PR Gurukul NFC Review System - Setup Guide

## 🎉 Your NFC Review System is Ready!

This system bridges NFC cards and Google My Business reviews, making customer feedback collection seamless.

## 🏗️ Architecture

**Lovable Cloud Backend:**
- PostgreSQL database (businesses & review_templates tables)
- Authentication system for admin access
- Row-level security for data protection

**Frontend:**
- Dynamic landing pages per business
- Mood-based review selection
- Admin dashboard for business management

## 🚀 Getting Started

### 1. Access Admin Dashboard
Visit: `https://your-domain.com/admin`

**First time?** Create your admin account:
- Click "Need an account? Sign up"
- Enter email and password (min 6 characters)
- Auto-confirm is enabled, so you can log in immediately

### 2. Add Your First Business

In the admin dashboard:
1. Click **"Add New Business"**
2. Fill in the form:
   - **Business Name**: e.g., "Gold's Gym Downtown"
   - **Logo URL**: Upload to Cloudinary or any image host
   - **Niche**: Select from dropdown (gym, restaurant, salon, etc.)
   - **Google Review URL**: Your Google My Business review link
3. Click **"Create Business"**

✅ Your NFC landing page is automatically created at:  
`https://your-domain.com/business-slug`

### 3. Create Review Templates

You need to add review templates for each niche and mood level.

**Using Cloud Database UI:**
<lov-actions>
<lov-open-backend>Open Backend</lov-open-backend>
</lov-actions>

1. Go to "Tables" → `review_templates`
2. Click "Insert Row"
3. Add review templates:
   - **niche**: Match your business niche (e.g., "gym")
   - **mood_level**: 1-5 (1=😡, 5=😍)
   - **review_text**: Pre-written review text

**Example templates:**

```
Gym - Mood 5 (😍):
"Amazing gym! The equipment is top-notch and the staff is incredibly helpful. Best decision I made for my fitness journey!"

Gym - Mood 4 (🙂):
"Great facility with good equipment. Staff is friendly and the atmosphere is motivating. Highly recommend!"

Restaurant - Mood 5 (😍):
"Absolutely incredible! The food was delicious, service was impeccable, and the ambiance was perfect. Will definitely return!"
```

💡 **Tip**: Create 3-5 templates per mood level for variety (system picks randomly).

### 4. Program Your NFC Cards

1. Get writable NFC cards (NFC Type 2 compatible)
2. Use an NFC writing app:
   - Android: "NFC Tools" (free)
   - iOS: "NFC Tools" or "Simply NFC"
3. Write URL to card: `https://your-domain.com/business-slug`
4. Test by tapping with your phone

## 📱 Customer Flow

1. **Tap NFC card** → Opens landing page
2. **View business** → Logo + name displayed
3. **Select mood emoji** → 5 options (😡 to 😍)
4. **See pre-written review** → Based on mood + niche
5. **Copy & Proceed** → Text copied, redirects to Google
6. **Paste & submit** → On Google Review page

## 🎨 Customization

### Change Design Colors
Edit `src/index.css` - all colors use HSL format:
```css
--primary: 217 91% 60%;  /* Main blue */
--accent: 25 95% 53%;    /* Orange accent */
```

### Modify Mood Emojis
Edit `src/pages/BusinessLanding.tsx`:
```typescript
const MOOD_EMOJIS = [
  { level: 1, emoji: "😡", label: "Very Unhappy" },
  // ... customize here
];
```

## 🔐 Security

- **Admin access**: Email/password authentication required
- **Public pages**: Business landing pages are public (no login needed)
- **RLS enabled**: Database security policies protect data
- **Review templates**: Readable by everyone, editable only by admins

## 📊 Managing Businesses

**Edit Business:**
1. Admin dashboard → Click "Edit" on any business
2. Update details and click "Update Business"

**Delete Business:**
1. Admin dashboard → Click "Delete" 
2. Confirm deletion (cannot be undone)

**View Live Page:**
- Click "View Page" to see the customer-facing landing page

## 🌐 Deployment

Your app is already live on Lovable! To use a custom domain:

<lov-actions>
<lov-link url="https://docs.lovable.dev/features/custom-domain">Setup Custom Domain</lov-link>
</lov-actions>

## 💡 Pro Tips

1. **Test first**: Create a test business and NFC card before going live
2. **Vary templates**: Write 3-5 different reviews per mood level
3. **Monitor usage**: Check which moods customers select most
4. **Update regularly**: Refresh review templates monthly
5. **Logo quality**: Use high-res logos (at least 512x512px)

## 📚 Next Steps

- Add review templates for all your niches
- Create multiple businesses
- Program NFC cards
- Place cards at strategic locations (checkout, exit, tables)

## 🆘 Need Help?

- Check Lovable Cloud for database management
- Use Visual Edits for quick design changes
- Refer to the component files for customization

---

**Built with Lovable Cloud** - Full-stack, zero-config backend
