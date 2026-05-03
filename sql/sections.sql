-- ============================================================
-- Section builder — turns each public page into a list of
-- ordered, typed sections that admin can fully manage.
-- Run AFTER cms2.sql.
-- ============================================================

USE codebooks;

CREATE TABLE IF NOT EXISTS page_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(60) NOT NULL,
  section_type VARCHAR(50) NOT NULL,
  content JSON NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_page_sections (page_slug, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- HOMEPAGE — 8 sections
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (1, 'home', 'hero', JSON_OBJECT(
    'eyebrow', 'Spring 2026 collection · 50+ new arrivals',
    'title', 'The library every developer deserves.',
    'subtitle', 'Hand-picked programming books for Python, Java, JavaScript, HTML & CSS — curated, reviewed, and shipped to readers in 32 countries.',
    'ctaLabel', 'Browse the library',
    'ctaHref', '/books',
    'secondaryLabel', 'Free resources',
    'secondaryHref', '/free-resources'
  ), 1, 1),
  (2, 'home', 'banner_slider', JSON_OBJECT('source', 'banners'), 2, 1),
  (3, 'home', 'stats_strip', JSON_OBJECT('items', JSON_ARRAY(
    JSON_OBJECT('value', '500+', 'label', 'Curated books'),
    JSON_OBJECT('value', '120K', 'label', 'Readers worldwide'),
    JSON_OBJECT('value', '4.9★', 'label', 'Average rating'),
    JSON_OBJECT('value', '70+', 'label', 'Free resources')
  )), 3, 1),
  (4, 'home', 'categories_grid', JSON_OBJECT(
    'eyebrow', 'Browse by stack',
    'title', 'Pick your language.',
    'subtitle', 'Every category is curated by working developers — no SEO fluff.',
    'ctaLabel', 'View all categories',
    'ctaHref', '/categories'
  ), 4, 1),
  (5, 'home', 'featured_books', JSON_OBJECT(
    'eyebrow', 'Featured',
    'title', 'Editors picks for the month.',
    'subtitle', 'Bestsellers and hidden gems from across the library.',
    'limit', 8,
    'ctaLabel', 'See all books',
    'ctaHref', '/books'
  ), 5, 1),
  (6, 'home', 'feature_grid', JSON_OBJECT(
    'eyebrow', 'Why DevBooks',
    'title', 'Built by developers, for developers.',
    'body', 'Every book on DevBooks is read, reviewed, and tagged by working engineers. No noise, no SEO-optimized fluff — just titles that actually move you forward.',
    'items', JSON_ARRAY(
      JSON_OBJECT('icon', 'BookMarked', 'title', 'Hand-picked', 'body', 'Every book is reviewed before it lands here.'),
      JSON_OBJECT('icon', 'Award', 'title', 'Trusted authors', 'body', 'Industry leaders and bestselling educators only.'),
      JSON_OBJECT('icon', 'Sparkles', 'title', 'Free chapters', 'body', 'Preview before you commit — always.'),
      JSON_OBJECT('icon', 'Globe', 'title', 'Worldwide delivery', 'body', 'Digital and print, shipped wherever you code.')
    )
  ), 6, 1),
  (7, 'home', 'testimonials_grid', JSON_OBJECT(
    'eyebrow', 'Loved by readers',
    'title', '120,000+ developers, one bookshelf.'
  ), 7, 1),
  (8, 'home', 'cta_panel', JSON_OBJECT(
    'eyebrow', 'Start free',
    'title', 'Build your bookshelf today.',
    'body', 'Create a free account and we will send you a hand-picked book recommendation every week — tailored to your stack.',
    'ctaLabel', 'Create free account',
    'ctaHref', '/register',
    'secondaryLabel', 'Browse first',
    'secondaryHref', '/books'
  ), 8, 1);

-- -----------------------------
-- ABOUT — 5 sections
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (20, 'about', 'hero', JSON_OBJECT(
    'eyebrow', 'Our story',
    'title', 'We are building the bookshelf every developer deserves.',
    'subtitle', 'DevBooks started as a Notion list of must-read programming books shared between three engineers. Today it is a curated library used by 120,000+ developers around the world.'
  ), 1, 1),
  (21, 'about', 'stats_strip', JSON_OBJECT('items', JSON_ARRAY(
    JSON_OBJECT('value', '120K+', 'label', 'Developers using DevBooks'),
    JSON_OBJECT('value', '500+',  'label', 'Curated books'),
    JSON_OBJECT('value', '70+',   'label', 'Free resources'),
    JSON_OBJECT('value', '32',    'label', 'Countries shipping to')
  )), 2, 1),
  (22, 'about', 'feature_grid', JSON_OBJECT(
    'eyebrow', 'Our mission',
    'title', 'Quality over noise.',
    'body', 'Programming books are how most of us learned to code. But the shelf is noisy — outdated titles, repetitive content, and algorithm-optimized listings. DevBooks is a quiet, hand-tended alternative.',
    'items', JSON_ARRAY(
      JSON_OBJECT('icon', 'Heart',    'title', 'Honest reviews',          'body', 'We publish what we would recommend to a friend.'),
      JSON_OBJECT('icon', 'Sparkles', 'title', 'Curated, not exhaustive', 'body', 'Quality over quantity, every single time.'),
      JSON_OBJECT('icon', 'Users',    'title', 'Community-shaped',        'body', 'Reader reviews shape the rankings.'),
      JSON_OBJECT('icon', 'Globe',    'title', 'Global library',          'body', 'Books shipped to 32+ countries.')
    )
  ), 3, 1),
  (23, 'about', 'team_grid', JSON_OBJECT(
    'eyebrow', 'The team',
    'title', 'Engineers and designers who really love books.'
  ), 4, 1),
  (24, 'about', 'cta_panel', JSON_OBJECT(
    'eyebrow', '',
    'title', 'Got a book to recommend?',
    'body', 'Tell us about a title that changed how you write code — we read every suggestion.',
    'ctaLabel', 'Get in touch',
    'ctaHref', '/contact'
  ), 5, 1);

-- -----------------------------
-- CONTACT — 1 section (hero)
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (40, 'contact', 'hero', JSON_OBJECT(
    'eyebrow', 'We read every message',
    'title', 'Lets talk.',
    'subtitle', 'Questions, recommendations, partnerships — drop us a line and we will reply within 24 hours.'
  ), 1, 1);

-- -----------------------------
-- BOOKS — 1 section (hero)
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (50, 'books', 'hero', JSON_OBJECT(
    'eyebrow', '12 books · 5 categories',
    'title', 'The full library.',
    'subtitle', 'Search, filter and discover the right book for whatever you are building next.'
  ), 1, 1);

-- -----------------------------
-- CATEGORIES — 1 section (hero)
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (60, 'categories', 'hero', JSON_OBJECT(
    'eyebrow', '5 languages, hundreds of books',
    'title', 'Categories.',
    'subtitle', 'Pick a language and dive into a curated shelf — from first lines to production-grade patterns.'
  ), 1, 1);

-- -----------------------------
-- FREE RESOURCES — 3 sections
-- -----------------------------
INSERT IGNORE INTO page_sections (id, page_slug, section_type, content, display_order, is_active) VALUES
  (70, 'free-resources', 'hero', JSON_OBJECT(
    'eyebrow', '100% free, forever',
    'title', 'Free resources for developers.',
    'subtitle', 'Cheatsheets, full books, video courses, and PDFs — all free, all curated by working engineers.'
  ), 1, 1),
  (71, 'free-resources', 'resources_grid', JSON_OBJECT(
    'eyebrow', 'Cheatsheets, courses & guides',
    'title', 'Bite-sized learning.',
    'subtitle', 'Resources to keep on your second monitor.'
  ), 2, 1),
  (72, 'free-resources', 'cta_panel', JSON_OBJECT(
    'eyebrow', 'Newsletter',
    'title', 'A free resource every Friday.',
    'body', 'Subscribe and we will send a hand-picked resource to your inbox every week — books, cheatsheets, videos.',
    'ctaLabel', 'Subscribe',
    'ctaHref', '#'
  ), 3, 1);

SELECT page_slug, COUNT(*) AS sections FROM page_sections GROUP BY page_slug ORDER BY page_slug;
