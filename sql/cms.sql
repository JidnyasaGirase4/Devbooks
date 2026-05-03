-- ============================================================
-- CMS layer — settings, banners, media
-- Run AFTER schema.sql + books.sql.
-- ============================================================

USE codebooks;

-- -----------------------------
-- settings (site-wide key/value)
-- -----------------------------
CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) NOT NULL PRIMARY KEY,
  `value` TEXT,
  `group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `label` VARCHAR(150),
  `kind` ENUM('text','textarea','url','email','tel') NOT NULL DEFAULT 'text',
  `display_order` INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO settings (`key`, `value`, `group`, `label`, `kind`, `display_order`) VALUES
  -- Hero
  ('hero.eyebrow', 'Spring 2026 collection · 50+ new arrivals', 'hero', 'Hero eyebrow', 'text', 1),
  ('hero.title', 'The library every developer deserves.', 'hero', 'Hero title', 'text', 2),
  ('hero.subtitle', 'Hand-picked programming books for Python, Java, JavaScript, HTML & CSS — curated, reviewed, and shipped to readers in 32 countries.', 'hero', 'Hero subtitle', 'textarea', 3),
  ('hero.cta_primary_label', 'Browse the library', 'hero', 'Primary CTA label', 'text', 4),
  ('hero.cta_primary_href', '/books', 'hero', 'Primary CTA link', 'url', 5),
  ('hero.cta_secondary_label', 'Free resources', 'hero', 'Secondary CTA label', 'text', 6),
  ('hero.cta_secondary_href', '/free-resources', 'hero', 'Secondary CTA link', 'url', 7),

  -- Brand
  ('brand.name', 'DevBooks', 'brand', 'Brand name', 'text', 1),
  ('brand.tagline', 'A library for the modern developer', 'brand', 'Tagline', 'text', 2),

  -- Contact
  ('contact.email', 'hello@devbooks.io', 'contact', 'Contact email', 'email', 1),
  ('contact.phone', '+91 80 4567 1234', 'contact', 'Contact phone', 'tel', 2),
  ('contact.hours', 'Mon – Fri · 9am – 6pm IST', 'contact', 'Working hours', 'text', 3),
  ('contact.hq', 'Bengaluru, India', 'contact', 'Headquarters', 'text', 4),

  -- Newsletter
  ('newsletter.title', 'A new book every Friday, straight to your inbox.', 'newsletter', 'Newsletter title', 'textarea', 1),
  ('newsletter.subtitle', 'Join 42,000+ developers receiving curated programming reads every week. Free chapters always included.', 'newsletter', 'Newsletter subtitle', 'textarea', 2),

  -- Section toggles (yes/no)
  ('home.show_banners', 'yes', 'sections', 'Show banner slider on home', 'text', 1),
  ('home.show_categories', 'yes', 'sections', 'Show categories grid on home', 'text', 2),
  ('home.show_featured', 'yes', 'sections', 'Show featured books on home', 'text', 3),
  ('home.show_testimonials', 'yes', 'sections', 'Show testimonials on home', 'text', 4);

-- -----------------------------
-- banners (homepage slider)
-- -----------------------------
CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(500),
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  link_label VARCHAR(80),
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_banners_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO banners (id, title, subtitle, image_url, link_url, link_label, display_order, is_active) VALUES
  (1, 'Spring 2026 collection',
      '50+ new programming books, hand-picked by working engineers.',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80',
      '/books', 'Browse new arrivals', 1, 1),
  (2, 'Free chapters, always',
      'Preview before you commit — every paid book ships with at least one free sample.',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80',
      '/free-resources', 'See free resources', 2, 1),
  (3, 'A new read every Friday',
      'Subscribe to The Friday Read and get a curated recommendation in your inbox each week.',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80',
      '/free-resources', 'Subscribe', 3, 1);

-- -----------------------------
-- media (uploaded files)
-- -----------------------------
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(200),
  mime_type VARCHAR(100),
  size_bytes INT,
  width INT,
  height INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
