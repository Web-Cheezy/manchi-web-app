# Backend alignment (website + mobile)

This app follows the same ideas as your **mobile backend guide**: Paystack on the server, Supabase for data, and (optionally) an **API key** for non-browser clients.

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server | Browser-safe key (session + RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Same as mobile: inserts/updates orders with **admin** privileges (bypasses RLS). **Never** put this in the mobile app or frontend bundle. |
| `API_SECRET_KEY` | Server only | If set, requests can authenticate with header `x-api-key` (mobile). If unset, only the **website session** (cookies) is used. |
| `PAYSTACK_SECRET_KEY` | Server only | Paystack secret for initialize / verify |

## How the website authenticates

- **Browser**: User signs in with Supabase → cookies → `getUser()` on the server. No `x-api-key` needed.

## How the mobile app can call the same checkout API

`POST /api/checkout/paystack`

Headers:

```http
Content-Type: application/json
x-api-key: <same value as API_SECRET_KEY on the server>
```

Body: same JSON as the web client, plus:

- `userId` or `user_id` — Supabase auth user id (the app should already know this after login).
- `email` — required for Paystack (web gets it from session).

Example:

```json
{
  "userId": "uuid-here",
  "email": "user@example.com",
  "cart_items": [ ... ],
  "total": 5000,
  "vat": 375,
  "subtotal": 4125,
  "delivery_method": "delivery",
  "location": "Chasemall",
  "delivery_address": "Full address string",
  "delivery_notes": null,
  "callback_url": "https://your-app.com/checkout/success?..."
}
```

**Security:** Anyone who knows `API_SECRET_KEY` can pass any `userId`. Protect the key like a password; rotate if leaked. Same tradeoff as your existing mobile API.

## Orders in the database

- Order inserts use **`SUPABASE_SERVICE_ROLE_KEY`** when set (matches “service role bypasses RLS” in your mobile doc).
- If the service role key is **missing**, the code falls back to the anon server client (RLS applies), which can break inserts until policies are correct.
- Checkout does **not** require a `paystack_reference` column on `orders`. The server creates the row first, then calls Paystack initialize with **`metadata.order_id`** and **`metadata.user_id`**. After redirect, **`/transaction/verify`** returns that metadata so the order can be marked **paid** by id — same idea as the mobile flow.

## RLS SQL

Optional: `lib/db/migrations/orders_and_addresses_rls.sql` — still useful for **direct** client access to tables. Server-side order writes with the **service role** do not depend on RLS.
