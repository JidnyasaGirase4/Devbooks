-- ============================================================
-- DevBooks schema — categories + books tables
-- Run AFTER schema.sql so the codebooks database already exists.
-- Safe to re-run: uses CREATE TABLE IF NOT EXISTS + INSERT IGNORE.
-- ============================================================

USE codebooks;

-- -----------------------------
-- categories
-- -----------------------------
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  tagline VARCHAR(200),
  description TEXT,
  count INT DEFAULT 0,
  accent VARCHAR(120),
  emoji VARCHAR(16),
  image VARCHAR(500),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO categories (slug, name, tagline, description, count, accent, emoji, image, display_order) VALUES
('python', 'Python', 'From basics to ML & data science',
 'Master Python from first script to production. Web, scripting, data science, machine learning and AI engineering.',
 124, 'from-emerald-500 to-teal-600', '🐍',
 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', 1),
('java', 'Java', 'OOP, Spring, enterprise patterns',
 'Enterprise-grade Java — from core OOP to Spring Boot, microservices, and JVM internals.',
 92, 'from-amber-500 to-orange-600', '☕',
 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', 2),
('javascript', 'JavaScript', 'ES2026, Node, async patterns',
 'Modern JavaScript end-to-end — language fundamentals, async, Node.js, and frontend frameworks.',
 187, 'from-yellow-400 to-amber-500', '🟨',
 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80', 3),
('html-css', 'HTML & CSS', 'Semantic markup & modern layouts',
 'Beautiful, accessible interfaces with semantic HTML, modern CSS layouts, and design systems.',
 76, 'from-rose-400 to-pink-500', '🎨',
 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80', 4),
('react', 'React', 'Hooks, Server Components, Next.js',
 'Build production React apps — hooks, state management, performance, and the Next.js ecosystem.',
 64, 'from-cyan-500 to-sky-600', '⚛️',
 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80', 5);

-- -----------------------------
-- books
-- -----------------------------
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(120) NOT NULL,
  category_slug VARCHAR(50) NOT NULL,
  level ENUM('Beginner','Intermediate','Advanced') NOT NULL DEFAULT 'Beginner',
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  old_price DECIMAL(10, 2),
  rating DECIMAL(2, 1) NOT NULL DEFAULT 0,
  reviews INT NOT NULL DEFAULT 0,
  cover VARCHAR(120),
  cover_image VARCHAR(500),
  badge ENUM('Bestseller','New','Free'),
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_books_category (category_slug),
  KEY idx_books_display_order (display_order),
  CONSTRAINT fk_books_category FOREIGN KEY (category_slug) REFERENCES categories(slug)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO books
  (slug, title, author, category_slug, level, price, old_price, rating, reviews, cover, cover_image, badge, description, display_order)
VALUES
('py-crash', 'The Python Book', 'Imagine Publishing', 'python', 'Beginner', 29, 39, 4.8, 2415, 'from-emerald-600 to-teal-700', '/books/python.jpg', 'Bestseller',
 'The ultimate guide to coding with Python — projects, games, creative builds.', 1),
('fluent-py', 'Fluent Python', 'Luciano Ramalho', 'python', 'Advanced', 44, NULL, 4.9, 1820, 'from-teal-700 to-emerald-900', '/books/fluent-py.jpg', NULL,
 'Idiomatic Python — data models, concurrency, metaprogramming and performance.', 2),
('automate', 'Automate the Boring Stuff', 'Al Sweigart', 'python', 'Beginner', 0, NULL, 4.7, 5210, 'from-lime-500 to-emerald-600', '/books/automate.jpg', 'Free',
 'Practical programming for total beginners — automate everyday tasks with Python.', 3),
('eloquent-js', 'Eloquent JavaScript', 'Marijn Haverbeke', 'javascript', 'Intermediate', 0, NULL, 4.7, 3120, 'from-yellow-500 to-amber-600', '/books/javascript.jpg', 'Free',
 'A modern introduction to programming using JavaScript — clear, deep, and project-driven.', 4),
('ydkjs', 'You Don''t Know JS Yet', 'Kyle Simpson', 'javascript', 'Intermediate', 25, 35, 4.8, 2010, 'from-amber-500 to-yellow-600', '/books/ydkjs.jpg', 'Bestseller',
 'Deep dives into JavaScript — scopes, closures, async, and the language''s quirks.', 5),
('js-good-parts', 'JavaScript: The Good Parts', 'Douglas Crockford', 'javascript', 'Intermediate', 22, NULL, 4.4, 1560, 'from-yellow-400 to-amber-500', '/books/js-good-parts.jpg', NULL,
 'A timeless guide to the elegant subset of JavaScript that produces reliable code.', 6),
('effective-java', 'Programming with Java', 'E. Balagurusamy', 'java', 'Advanced', 42, NULL, 4.9, 2780, 'from-orange-600 to-amber-800', '/books/java.jpg', 'Bestseller',
 'Comprehensive Java — OOP, collections, concurrency and modern best practices.', 7),
('head-first-java', 'Head First Java', 'Kathy Sierra', 'java', 'Beginner', 33, 45, 4.6, 1990, 'from-amber-600 to-orange-700', '/books/head-first-java.jpg', NULL,
 'A brain-friendly, visual guide that makes learning Java genuinely enjoyable.', 8),
('spring-boot-up', 'Spring Boot Up & Running', 'Mark Heckler', 'java', 'Intermediate', 38, NULL, 4.5, 720, 'from-orange-700 to-red-700', '/books/spring-boot.jpg', 'New',
 'Build production-grade Spring Boot apps with reactive features and cloud integration.', 9),
('html-css-jon', 'HTML & CSS: The Complete Reference', 'Thomas A. Powell', 'html-css', 'Beginner', 27, NULL, 4.7, 4310, 'from-rose-500 to-pink-600', '/books/htmlcss.jpg', 'Bestseller',
 'Standards-based pages, semantic markup and battle-tested CSS — the complete reference.', 10),
('css-in-depth', 'CSS in Depth', 'Keith J. Grant', 'html-css', 'Intermediate', 35, NULL, 4.8, 1240, 'from-pink-500 to-rose-700', '/books/css-in-depth.jpg', NULL,
 'Master modern CSS — flexbox, grid, custom properties, and responsive design at scale.', 11),
('react-up', 'Learning React', 'Alex Banks', 'react', 'Beginner', 32, NULL, 4.6, 1410, 'from-cyan-500 to-sky-600', '/books/learning-react.jpg', NULL,
 'Modern functional React with hooks, suspense, and best-in-class patterns.', 12);
