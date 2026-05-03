-- ============================================================
-- Final batch — Cart / Login / Register / Privacy / Terms / Navbar
-- Run AFTER cms2.sql.
-- ============================================================

USE codebooks;

INSERT IGNORE INTO settings (`key`, `value`, `group`, `label`, `kind`, `display_order`) VALUES
  -- Navbar
  ('nav.login_label', 'Login', 'navbar', 'Login button', 'text', 1),
  ('nav.signup_label', 'Sign up', 'navbar', 'Sign up button', 'text', 2),
  ('nav.search_placeholder', 'Search books, authors…', 'navbar', 'Search placeholder', 'text', 3),

  -- Cart
  ('cart.continue_shopping', 'Continue shopping', 'cart', 'Continue shopping link', 'text', 1),
  ('cart.title', 'Your cart', 'cart', 'Page title', 'text', 2),
  ('cart.empty_title', 'Your bookshelf is empty for now.', 'cart', 'Empty state title', 'text', 3),
  ('cart.empty_body', 'Browse the library and add a few reads to get started.', 'cart', 'Empty state body', 'textarea', 4),
  ('cart.empty_cta', 'Browse the library', 'cart', 'Empty state button', 'text', 5),
  ('cart.summary_title', 'Order summary', 'cart', 'Summary heading', 'text', 6),
  ('cart.subtotal_label', 'Subtotal', 'cart', 'Subtotal row', 'text', 7),
  ('cart.shipping_label', 'Shipping', 'cart', 'Shipping row', 'text', 8),
  ('cart.shipping_free_hint', 'Free over Rs 50', 'cart', 'Free shipping hint', 'text', 9),
  ('cart.total_label', 'Total', 'cart', 'Total row', 'text', 10),
  ('cart.promo_placeholder', 'Promo code', 'cart', 'Promo input placeholder', 'text', 11),
  ('cart.promo_button', 'Apply', 'cart', 'Promo apply button', 'text', 12),
  ('cart.checkout_button', 'Checkout', 'cart', 'Checkout button', 'text', 13),
  ('cart.trust1', 'Worldwide shipping in 2–6 days', 'cart', 'Trust badge 1', 'text', 14),
  ('cart.trust2', '30-day money-back guarantee', 'cart', 'Trust badge 2', 'text', 15),
  ('cart.success_eyebrow', 'Order placed', 'cart', 'Success eyebrow', 'text', 16),
  ('cart.success_title', 'Thanks for the read!', 'cart', 'Success title', 'text', 17),
  ('cart.success_body', 'Your order is on its way. We just sent a confirmation to your inbox — check your spam if it is not there in a minute.', 'cart', 'Success body', 'textarea', 18),
  ('cart.success_cta', 'Keep browsing', 'cart', 'Success primary button', 'text', 19),
  ('cart.success_cta_href', '/books', 'cart', 'Success primary link', 'url', 20),
  ('cart.success_secondary', 'View receipt', 'cart', 'Success secondary button', 'text', 21),

  -- Login
  ('login.eyebrow', 'Welcome back', 'login', 'Eyebrow', 'text', 1),
  ('login.title', 'Sign in to DevBooks.', 'login', 'Title', 'text', 2),
  ('login.subtitle_prefix', 'New here?', 'login', 'Subtitle prefix', 'text', 3),
  ('login.subtitle_link', 'Create a free account →', 'login', 'Subtitle link', 'text', 4),
  ('login.username_label', 'Username', 'login', 'Username label', 'text', 5),
  ('login.password_label', 'Password', 'login', 'Password label', 'text', 6),
  ('login.forgot_link', 'Forgot?', 'login', 'Forgot link', 'text', 7),
  ('login.remember_label', 'Keep me signed in', 'login', 'Remember-me label', 'text', 8),
  ('login.button_label', 'Sign in', 'login', 'Submit button', 'text', 9),
  ('login.divider_text', 'or continue with', 'login', 'Social divider', 'text', 10),
  ('login.left_eyebrow', 'Staff area', 'login', 'Left panel eyebrow', 'text', 11),
  ('login.left_title', 'Manage the catalogue, edit live.', 'login', 'Left panel title', 'textarea', 12),
  ('login.left_body', 'Add, update and remove items in MySQL. Public pages refresh instantly via Next.js server actions.', 'login', 'Left panel body', 'textarea', 13),
  ('login.left_quote', 'DevBooks saves me hours of guessing what is worth reading. It is the only library I trust.', 'login', 'Left panel quote', 'textarea', 14),
  ('login.left_quote_author', 'Maya R.', 'login', 'Quote author', 'text', 15),
  ('login.left_quote_role', 'Sr. Backend Engineer', 'login', 'Quote role', 'text', 16),

  -- Register
  ('register.eyebrow', 'Create account', 'register', 'Eyebrow', 'text', 1),
  ('register.title', 'Start your shelf.', 'register', 'Title', 'text', 2),
  ('register.subtitle', 'Free forever. No credit card required.', 'register', 'Subtitle', 'text', 3),
  ('register.name_label', 'Your name', 'register', 'Name label', 'text', 4),
  ('register.email_label', 'Email', 'register', 'Email label', 'text', 5),
  ('register.password_label', 'Password', 'register', 'Password label', 'text', 6),
  ('register.terms_text', 'I agree to the Terms of Service & Privacy Policy.', 'register', 'Terms checkbox text', 'textarea', 7),
  ('register.button_label', 'Create free account', 'register', 'Submit button', 'text', 8),
  ('register.left_eyebrow', 'Free forever', 'register', 'Left eyebrow', 'text', 9),
  ('register.left_title', 'Join 120,000+ developers building their bookshelf.', 'register', 'Left title', 'textarea', 10),
  ('register.left_feature1_title', 'Curated library', 'register', 'Feature 1 title', 'text', 11),
  ('register.left_feature1_body', 'Every book is hand-picked by working engineers.', 'register', 'Feature 1 body', 'textarea', 12),
  ('register.left_feature2_title', 'Free chapters', 'register', 'Feature 2 title', 'text', 13),
  ('register.left_feature2_body', 'Preview before you buy — always.', 'register', 'Feature 2 body', 'textarea', 14),
  ('register.left_feature3_title', 'Friday newsletter', 'register', 'Feature 3 title', 'text', 15),
  ('register.left_feature3_body', 'A new book recommendation every week.', 'register', 'Feature 3 body', 'textarea', 16),
  ('register.left_signin_text', 'Already have an account? Sign in instead →', 'register', 'Sign-in link text', 'text', 17),

  -- Privacy
  ('privacy.eyebrow', 'Legal', 'privacy', 'Eyebrow', 'text', 1),
  ('privacy.title', 'Privacy policy', 'privacy', 'Title', 'text', 2),
  ('privacy.subtitle', 'How we collect, use, and protect your information when you use DevBooks.', 'privacy', 'Subtitle', 'textarea', 3),
  ('privacy.last_updated', 'Last updated · 1 May 2026', 'privacy', 'Last updated line', 'text', 4),
  ('privacy.body', '## 1. Who we are\n\nDevBooks ("we", "our", "us") is a curated programming book library operated from Bengaluru, India. This policy describes what happens to your data when you visit devbooks.io or buy a book from us.\n\n## 2. What we collect\n\n- Account information — your name, email and a hashed password when you create an account.\n- Order details — billing & shipping address, the books you bought, and a payment-processor reference.\n- Usage data — pages you view, books you save, and reviews you leave so we can improve recommendations.\n- Cookies — small files to keep you signed in and remember your reading preferences.\n\n## 3. How we use it\n\n- To send you the books you ordered and the receipts.\n- To personalise your library and weekly reading email.\n- To prevent fraud and keep accounts secure.\n- To answer support questions and reach out about your order.\n\nWe never sell your data. We do not run third-party ad trackers on DevBooks.\n\n## 4. Where it lives\n\nYour data is stored on encrypted servers in the EU. Payments are processed by Stripe — we never see your card number. Only DevBooks staff with a legitimate need can access your records.\n\n## 5. Your rights\n\nYou can, at any time:\n- Download a copy of your data from your account settings.\n- Ask us to correct or delete it — write to privacy@devbooks.io.\n- Unsubscribe from any non-transactional email in one click.\n\n## 6. Cookies\n\nWe use a small set of strictly-necessary cookies (session, cart) and one optional analytics cookie to understand which books are being read.\n\n## 7. Children\n\nDevBooks is not directed at people under 13. If you believe a child has shared data with us, contact privacy@devbooks.io and we will remove it.\n\n## 8. Changes\n\nWe may update this policy as the product evolves. If the change is material, we will email you at least 14 days before it takes effect.', 'privacy', 'Body (Markdown supported)', 'textarea', 5),
  ('privacy.contact_text', 'Questions? Reach the team at privacy@devbooks.io or visit our contact page.', 'privacy', 'Contact box text', 'textarea', 6),

  -- Terms
  ('terms.eyebrow', 'Legal', 'terms', 'Eyebrow', 'text', 1),
  ('terms.title', 'Terms & conditions', 'terms', 'Title', 'text', 2),
  ('terms.subtitle', 'The agreement between you and DevBooks when you use our library and shop.', 'terms', 'Subtitle', 'textarea', 3),
  ('terms.last_updated', 'Last updated · 1 May 2026', 'terms', 'Last updated line', 'text', 4),
  ('terms.body', '## 1. Accepting these terms\n\nBy creating an account, browsing the library, or placing an order, you agree to these terms. If you do not agree, please do not use DevBooks.\n\n## 2. Your account\n\n- You must be 13 or older to create an account.\n- You are responsible for keeping your password confidential.\n- We may suspend accounts that violate these terms, abuse our support team, or break the law.\n\n## 3. Books and orders\n\n- Listed prices include applicable taxes. Shipping is calculated at checkout — it is free above Rs 50.\n- We ship to 32 countries. Standard delivery is 2–6 business days within India and 5–15 days internationally.\n- Once an order is placed, you can cancel it for a full refund within 24 hours, before it ships.\n- Digital books and free chapters are licensed for personal use only. You may not redistribute them.\n\n## 4. Returns and refunds\n\nWe offer a 30-day money-back guarantee on physical books in their original condition.\n\nDigital purchases are non-refundable once the file has been downloaded.\n\n## 5. Reviews and content\n\nWhen you post a review or rating, you give us a non-exclusive licence to display it on DevBooks.\n\n## 6. Intellectual property\n\nDevBooks and the editorial content (curation notes, summaries, article text) are © DevBooks. Book covers, titles and excerpts belong to their respective publishers and authors.\n\n## 7. Limitation of liability\n\nDevBooks is provided "as is". We do our best to keep the service available, accurate and useful, but we cannot guarantee it will be uninterrupted or error-free.\n\n## 8. Governing law\n\nThese terms are governed by the laws of India, and disputes are handled by the courts of Bengaluru.\n\n## 9. Changes to these terms\n\nWe may update these terms occasionally. Material changes will be announced by email at least 14 days before they take effect.', 'terms', 'Body (Markdown supported)', 'textarea', 5),
  ('terms.contact_text', 'Need to talk to us? Email hello@devbooks.io or use the contact form.', 'terms', 'Contact box text', 'textarea', 6);

SELECT COUNT(*) AS total_settings FROM settings;
