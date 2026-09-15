# UniFind Privacy Policy

**Last updated: September 15, 2025**

## 1. Overview

This policy explains what information UniFind collects, how we use it, and
what choices you have. It applies to your use of the UniFind web and mobile
app.

## 2. Information we collect

**Account information.** When you sign in with Google, restricted to
`@bicol-u.edu.ph` addresses, we receive your university email, display name,
and profile photo. Your email domain is verified before your account is
created; sign-ups from other domains are rejected before any account exists.

**Profile information you provide.** Display name, avatar, and a short bio,
which other signed-in users can see.

**Shop information (if you sell).** Shop name, description, banner image,
and your shop's aggregate rating - all visible publicly, including to
signed-out visitors where applicable.

**Content you create.** Listing titles, descriptions, prices, photos,
category selections, item conditions, and stock counts; messages you send to
other users; reviews you leave after a completed order.

**Transaction data.** Records of orders you place or receive, including
item, price, quantity, status (pending/accepted/rejected/completed/
cancelled), and timestamps. We do **not** collect or process payment card
or bank information - UniFind does not handle payment; exchanges happen
in person, off-platform.

**Meetup addresses.** Text-based meetup location entries you save (e.g.,
"Main Library, Ground Floor"). This is address text you type in, not device
GPS or continuous location tracking.

**Wishlist and interaction data.** Listings you save, and basic usage
signals needed to operate features like notifications and unread counts.

## 3. How we use your information

- To verify eligibility (university email) and operate your account;
- To display your profile, shop, listings, and reviews to other users as
  described in Section 4;
- To facilitate messaging and order communication between buyers and
  sellers, including real-time delivery of new messages and notifications;
- To maintain marketplace integrity (e.g., preventing a shop from receiving
  its own orders, enforcing one-review-per-order);
- To respond to support requests and enforce our Terms of Service.

## 4. What other users can see

Because UniFind is a closed university community, some information is
visible to any signed-in user, not only people you've directly interacted
with:

- Your display name, avatar, and bio are visible to other signed-in users
  (needed for chat, reviews, and shop pages to function).
- **Your university email is not shown to other users in the app.** Note,
  for transparency, that our backend's access-control design permits
  broader authenticated read access to basic profile data than what the
  interface actually renders - we made a deliberate choice not to surface
  email on any public-facing screen, but flagging this distinction here in
  the interest of being precise about the difference between "technically
  accessible on our servers" and "shown to other users."
- Shop name, description, rating, and active listings are public, including
  to people who aren't signed in, where the app allows browsing without an
  account.
- Reviews you leave (including your name) are visible publicly on the
  shop's page.
- Messages are visible only to the two participants in a conversation.

## 5. Data retention

- Most of your data is deleted if you delete your account (profile, shop,
  active listings).
- **Some records are retained even after deletion or removal**, specifically
  meetup addresses and order records tied to a completed or historical
  transaction. This is intentional: it preserves accurate records for
  disputes, and prevents a past transaction's details from silently changing
  or disappearing. This means account deletion may not remove 100% of your
  data immediately - see Section 7.

## 6. Security

- Sign-in uses Google's OAuth infrastructure; we don't see or store your
  Google password.
- Access to data is enforced at the database level (row-level security),
  meaning even a bug in the app's own code cannot easily expose another
  user's private data, such as another person's saved addresses or private
  messages.

## 7. Your choices and rights

Under the Data Privacy Act of 2012, you generally have rights to access,
correct, and request deletion of your personal data. In practice, on
UniFind today:

- You can view and edit your personal profile and shop profile directly in
  the app.
- **Full account deletion is currently limited** where you have order
  history: certain records (addresses used in past orders, the orders
  themselves) are structurally retained rather than deleted, to preserve
  transaction history. If you request deletion, we will [anonymize /
  restrict further use of / retain only as legally required] this data
  rather than erase it outright. **[This bracket needs an actual product +
  legal decision - right now the schema simply prevents deletion of
  referenced records; how that's communicated to users needs to be decided
  before this policy can promise something specific.]**

## 8. Third-party services

UniFind relies on infrastructure providers (including Supabase for
database/auth hosting and Google for sign-in) to operate. These providers
process data on our behalf under their own security and privacy terms.

## 9. Children's privacy

UniFind is intended for university students and is not directed at children.
We do not knowingly collect data from anyone under the applicable age of
digital consent.

## 10. Changes to this policy

We may update this policy from time to time; material changes will be
communicated in-app.

## 11. Contact

Questions or requests about your data: **the.todoers.group@gmail.com**, or the National
Privacy Commission if you believe your rights under RA 10173 have been
violated.
