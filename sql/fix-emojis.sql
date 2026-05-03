-- ============================================================
-- Repair emoji columns. The emojis are written as raw UTF-8
-- byte sequences (hex literals) so phpMyAdmin's own connection
-- charset cannot mangle them in transit. This script is pure
-- ASCII end-to-end.
-- Run in phpMyAdmin: pick the `codebooks` DB → SQL tab → paste
-- the whole file → Go.
-- ============================================================

USE codebooks;

ALTER DATABASE codebooks CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE categories CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SET NAMES utf8mb4;

-- Hex bytes are the UTF-8 encoding of each emoji.
-- python    🐍 = F0 9F 90 8D
-- java      ☕  = E2 98 95
-- javascript🟨 = F0 9F 9F A8
-- html-css  🎨 = F0 9F 8E A8
-- react     ⚛  = E2 9A 9B
UPDATE categories SET emoji = CONVERT(UNHEX('F09F908D')   USING utf8mb4) WHERE slug = 'python';
UPDATE categories SET emoji = CONVERT(UNHEX('E29895')     USING utf8mb4) WHERE slug = 'java';
UPDATE categories SET emoji = CONVERT(UNHEX('F09F9FA8')   USING utf8mb4) WHERE slug = 'javascript';
UPDATE categories SET emoji = CONVERT(UNHEX('F09F8EA8')   USING utf8mb4) WHERE slug = 'html-css';
UPDATE categories SET emoji = CONVERT(UNHEX('E29A9B')     USING utf8mb4) WHERE slug = 'react';

-- Verify
SELECT slug, emoji, HEX(emoji) AS bytes FROM categories ORDER BY display_order;
