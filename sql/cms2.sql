-- ============================================================
-- CMS expansion — testimonials, team, resources, lots more settings
-- Run AFTER cms.sql.
-- ============================================================

USE codebooks;

-- -----------------------------
-- testimonials
-- -----------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120),
  accent VARCHAR(120) DEFAULT 'from-brand-500 to-brand-700',
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_testimonials_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO testimonials (id, quote, name, role, accent, display_order, is_active) VALUES
  (1, 'DevBooks is the only library I trust. The curation saves me hours of guessing what is worth reading.',
      'Maya R.', 'Senior Backend Engineer', 'from-brand-500 to-brand-700', 1, 1),
  (2, 'I started here as a bootcamp grad. Two years later, I still come back for every new framework.',
      'Diego A.', 'Full-stack Developer', 'from-gold-500 to-gold-700', 2, 1),
  (3, 'Beautiful UI, honest reviews, and free chapters that actually help me decide. Easy 10/10.',
      'Priya N.', 'Frontend Lead', 'from-rose-500 to-pink-700', 3, 1);

-- -----------------------------
-- team_members
-- -----------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120),
  bio TEXT,
  initials VARCHAR(4),
  accent VARCHAR(120) DEFAULT 'from-brand-500 to-brand-700',
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO team_members (id, name, role, bio, initials, accent, display_order, is_active) VALUES
  (1, 'Aarav Kapoor', 'Founder · Backend',
      'Built distributed systems at two unicorns before starting DevBooks.',
      'AK', 'from-brand-500 to-brand-700', 1, 1),
  (2, 'Lena Park', 'Co-founder · Design',
      'Ex-design lead at a major fintech. Obsessed with editorial layouts.',
      'LP', 'from-rose-500 to-pink-700', 2, 1),
  (3, 'Mateo Silva', 'Engineering',
      'Full-stack engineer, type-system enthusiast, occasional bookbinder.',
      'MS', 'from-cyan-500 to-sky-700', 3, 1);

-- -----------------------------
-- resources (free-resources page)
-- -----------------------------
CREATE TABLE IF NOT EXISTS resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type ENUM('PDF','Cheatsheet','Course','Video') NOT NULL DEFAULT 'PDF',
  category_slug VARCHAR(50),
  href VARCHAR(500),
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO resources (id, title, description, type, category_slug, href, display_order, is_active) VALUES
  (1, 'Python Cheatsheet — Standard Library Essentials', 'Two-page reference covering everything from list comprehensions to dataclasses.', 'Cheatsheet', 'python', '#python-cheatsheet', 1, 1),
  (2, 'JavaScript Async Patterns Handbook', 'Promises, async/await, generators and modern async iteration patterns.', 'PDF', 'javascript', '#js-async', 2, 1),
  (3, 'CSS Grid in 30 Minutes', 'A free crash course that takes you from zero to confident with CSS Grid.', 'Video', 'html-css', '#css-grid', 3, 1),
  (4, 'Java Interview Prep Pack', '300+ curated questions across core Java, concurrency, and Spring.', 'PDF', 'java', '#java-interview', 4, 1),
  (5, 'React Hooks Reference Card', 'All built-in hooks with usage tips, gotchas and dependency rules.', 'Cheatsheet', 'react', '#react-hooks', 5, 1),
  (6, 'Modern HTML5 Semantics — Free Course', 'Six lessons that level up your accessibility and SEO foundations.', 'Course', 'html-css', '#html-course', 6, 1);

-- -----------------------------
-- More settings
-- -----------------------------
INSERT IGNORE INTO settings (`key`, `value`, `group`, `label`, `kind`, `display_order`) VALUES
  -- Homepage stats
  ('home.stat1_value', '500+', 'home_stats', 'Stat #1 value', 'text', 1),
  ('home.stat1_label', 'Curated books', 'home_stats', 'Stat #1 label', 'text', 2),
  ('home.stat2_value', '120K', 'home_stats', 'Stat #2 value', 'text', 3),
  ('home.stat2_label', 'Readers worldwide', 'home_stats', 'Stat #2 label', 'text', 4),
  ('home.stat3_value', '4.9★', 'home_stats', 'Stat #3 value', 'text', 5),
  ('home.stat3_label', 'Average rating', 'home_stats', 'Stat #3 label', 'text', 6),
  ('home.stat4_value', '70+', 'home_stats', 'Stat #4 value', 'text', 7),
  ('home.stat4_label', 'Free resources', 'home_stats', 'Stat #4 label', 'text', 8),

  -- "Why us" features
  ('home.whyus_eyebrow', 'Why DevBooks', 'home_whyus', 'Section eyebrow', 'text', 1),
  ('home.whyus_title', 'Built by developers, for developers.', 'home_whyus', 'Section title', 'text', 2),
  ('home.whyus_body', 'Every book on DevBooks is read, reviewed, and tagged by working engineers. No noise, no SEO-optimized fluff — just titles that actually move you forward.', 'home_whyus', 'Section body', 'textarea', 3),
  ('home.whyus_feature1_title', 'Hand-picked', 'home_whyus', 'Feature 1 title', 'text', 4),
  ('home.whyus_feature1_body', 'Every book is reviewed before it lands here.', 'home_whyus', 'Feature 1 body', 'textarea', 5),
  ('home.whyus_feature2_title', 'Trusted authors', 'home_whyus', 'Feature 2 title', 'text', 6),
  ('home.whyus_feature2_body', 'Industry leaders and bestselling educators only.', 'home_whyus', 'Feature 2 body', 'textarea', 7),
  ('home.whyus_feature3_title', 'Free chapters', 'home_whyus', 'Feature 3 title', 'text', 8),
  ('home.whyus_feature3_body', 'Preview before you commit — always.', 'home_whyus', 'Feature 3 body', 'textarea', 9),
  ('home.whyus_feature4_title', 'Worldwide delivery', 'home_whyus', 'Feature 4 title', 'text', 10),
  ('home.whyus_feature4_body', 'Digital and print, shipped wherever you code.', 'home_whyus', 'Feature 4 body', 'textarea', 11),

  -- Testimonials section header
  ('home.testimonials_eyebrow', 'Loved by readers', 'home_testimonials', 'Testimonials eyebrow', 'text', 1),
  ('home.testimonials_title', '120,000+ developers, one bookshelf.', 'home_testimonials', 'Testimonials title', 'textarea', 2),

  -- Final CTA section
  ('home.cta_eyebrow', 'Start free', 'home_cta', 'CTA eyebrow', 'text', 1),
  ('home.cta_title', 'Build your bookshelf today.', 'home_cta', 'CTA title', 'text', 2),
  ('home.cta_body', 'Create a free account and we will send you a hand-picked book recommendation every week — tailored to your stack.', 'home_cta', 'CTA body', 'textarea', 3),
  ('home.cta_primary_label', 'Create free account', 'home_cta', 'CTA primary label', 'text', 4),
  ('home.cta_primary_href', '/register', 'home_cta', 'CTA primary link', 'url', 5),

  -- About stats
  ('about.stat1_value', '120K+', 'about_stats', 'Stat #1 value', 'text', 1),
  ('about.stat1_label', 'Developers using DevBooks', 'about_stats', 'Stat #1 label', 'text', 2),
  ('about.stat2_value', '500+', 'about_stats', 'Stat #2 value', 'text', 3),
  ('about.stat2_label', 'Curated books', 'about_stats', 'Stat #2 label', 'text', 4),
  ('about.stat3_value', '70+', 'about_stats', 'Stat #3 value', 'text', 5),
  ('about.stat3_label', 'Free resources', 'about_stats', 'Stat #3 label', 'text', 6),
  ('about.stat4_value', '32', 'about_stats', 'Stat #4 value', 'text', 7),
  ('about.stat4_label', 'Countries shipping to', 'about_stats', 'Stat #4 label', 'text', 8),

  -- About values cards
  ('about.value1_title', 'Honest reviews', 'about_values', 'Value 1 title', 'text', 1),
  ('about.value1_body', 'We publish what we would recommend to a friend.', 'about_values', 'Value 1 body', 'textarea', 2),
  ('about.value2_title', 'Curated, not exhaustive', 'about_values', 'Value 2 title', 'text', 3),
  ('about.value2_body', 'Quality over quantity, every single time.', 'about_values', 'Value 2 body', 'textarea', 4),
  ('about.value3_title', 'Community-shaped', 'about_values', 'Value 3 title', 'text', 5),
  ('about.value3_body', 'Reader reviews shape the rankings.', 'about_values', 'Value 3 body', 'textarea', 6),
  ('about.value4_title', 'Global library', 'about_values', 'Value 4 title', 'text', 7),
  ('about.value4_body', 'Books shipped to 32+ countries.', 'about_values', 'Value 4 body', 'textarea', 8),

  -- About team header
  ('about.team_eyebrow', 'The team', 'about_team', 'Team eyebrow', 'text', 1),
  ('about.team_title', 'Engineers and designers who really love books.', 'about_team', 'Team title', 'textarea', 2),

  -- Free-resources newsletter card
  ('freeResources.newsletter_eyebrow', 'Newsletter', 'freeResources_extra', 'Card eyebrow', 'text', 1),
  ('freeResources.newsletter_title', 'A free resource every Friday.', 'freeResources_extra', 'Card title', 'text', 2),
  ('freeResources.newsletter_body', 'Subscribe and we will send a hand-picked resource to your inbox every week — books, cheatsheets, videos.', 'freeResources_extra', 'Card body', 'textarea', 3),

  -- Footer
  ('footer.description', 'A modern library of programming books — curated, reviewed, and built for developers who care about their craft.', 'footer', 'Footer description', 'textarea', 1),
  ('footer.copyright', 'Crafted for readers who code.', 'footer', 'Copyright tagline', 'text', 2),
  ('footer.social_twitter', '#', 'footer', 'Twitter URL', 'url', 3),
  ('footer.social_github', '#', 'footer', 'GitHub URL', 'url', 4),
  ('footer.social_linkedin', '#', 'footer', 'LinkedIn URL', 'url', 5),
  ('footer.social_youtube', '#', 'footer', 'YouTube URL', 'url', 6);

SELECT
  (SELECT COUNT(*) FROM settings) AS settings_count,
  (SELECT COUNT(*) FROM testimonials) AS testimonials_count,
  (SELECT COUNT(*) FROM team_members) AS team_count,
  (SELECT COUNT(*) FROM resources) AS resources_count;
