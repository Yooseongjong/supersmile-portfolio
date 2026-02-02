# Deployment Guide for SuperSmile Creative

This guide explains how to deploy your Next.js project to the web. The recommended platform is **Vercel**, the creators of Next.js, for easiest integration.

## 1. Prerequisites

- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account (you can sign up with GitHub).
- Your project code pushed to a GitHub repository.

## 2. Deploy to Vercel

1. **Log in to Vercel**.
2. Click **"Add New..."** -> **"Project"**.
3. Select **"Import"** next to your `Supersmile-Creative` repository.
4. **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Environment Variables**:
        - Add key: `RESEND_API_KEY`
        - Value: `re_123456789...` (Your actual API key)
5. Click **"Deploy"**.

Vercel will build your project and give you a live URL (e.g., `supersmile-creative.vercel.app`) in about 1-2 minutes.

## 3. Environment Variables

This project requires the following environment variables to function correctly (especially the Contact Form):

- `RESEND_API_KEY`: Required for sending emails via Resend.

See `.env.example` for a template.

## 4. Post-Deployment Checks

- **Check Contact Form**: Test the contact form on the live site to ensure emails are sent.
- **Check Custom Domain**: If you have a custom domain (e.g., `supersmile.com`), you can add it in the Vercel project settings under "Domains".

## Troubleshooting

- **Email Failed**: Verify the `RESEND_API_KEY` is correct in Vercel settings.
- **Video Not Playing**: Ensure the YouTube video URL is correct and browser permissions allow autoplay.
