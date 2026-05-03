-- ============================================================
-- CodeBooks DB schema — run this in phpMyAdmin (XAMPP) or mysql CLI
-- ============================================================

CREATE DATABASE IF NOT EXISTS codebooks
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE codebooks;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data — safe to re-run; uses INSERT IGNORE on a unique name index.
ALTER TABLE services
  ADD UNIQUE KEY uniq_services_name (name);

INSERT IGNORE INTO services (name, price, description) VALUES
  ('Signature Haircut', 599, 'Precision haircut tailored to your face shape, finished with a hot-towel and styling.'),
  ('Hair Color', 1499, 'Single-process colour with a deep-conditioning gloss treatment.'),
  ('Highlights & Balayage', 2999, 'Hand-painted highlights blended with a custom toner.'),
  ('Beard Sculpt', 349, 'Sharp lines, clean fade and a hot-towel finish for the perfect beard.'),
  ('Classic Manicure', 549, 'Filing, buffing, cuticle care, polish and a relaxing hand massage.'),
  ('Spa Pedicure', 749, 'Soak, scrub, callus care and a long-lasting polish.'),
  ('Bridal Makeup', 4999, 'HD or airbrush makeup with on-site touch-ups for the big day.'),
  ('Hydrating Facial', 1299, 'Deep cleanse, exfoliation, lymphatic massage and a custom mask.');
