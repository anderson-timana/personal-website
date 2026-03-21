import { defineAction } from 'astro:actions';
import { z } from 'astro:content';

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const BREVO_LIST_ID = import.meta.env.PUBLIC_BREVO_LIST_ID;
const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY;

export const subscribeSchema = z.object({
  email: z.string().email("Please provide a valid executive email."),
  consent: z.any().transform(val => !!val).refine(val => val === true, {
    message: "Consent is required to proceed."
  }),
  // Turnstile Token
  'cf-turnstile-response': z.string().min(1, "Security verification required."),
  // Honeypot
  email_address_check: z.string().max(0, "Bot detected.")
});

export const server = {
  subscribe: defineAction({
    accept: 'form',
    input: subscribeSchema,
    handler: async (input) => {
      // 1. Verify Turnstile Token
      const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: input['cf-turnstile-response'],
        }),
      });

      const verification = await verifyResponse.json() as { success: boolean };
      if (!verification.success) {
        throw new Error("Security verification failed. Please try again.");
      }

      // 2. Sync with Brevo
      if (!BREVO_API_KEY) {
        throw new Error("Missing BREVO_API_KEY in environment.");
      }

      const listId = parseInt(BREVO_LIST_ID || '2');

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          email: input.email,
          listIds: [listId],
          updateEnabled: true,
          attributes: {
            "OPT_IN": true
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Brevo API Error:', errorData);
        throw new Error(errorData.message || "Failed to sync with marketing protocol.");
      }

      return { success: true, message: "Transmission received. Protocol updated." };
    }
  })
};
