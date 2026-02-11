-- Seed SQLite: produits de test front/src/data/products.ts
PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS equipements_productstorestock;
DROP TABLE IF EXISTS equipements_productimages;
DROP TABLE IF EXISTS equipements_productfeatures;
DROP TABLE IF EXISTS equipements_productlevels;
DROP TABLE IF EXISTS equipements_productsports;
DROP TABLE IF EXISTS equipements_product;

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  price REAL NOT NULL,
  rating REAL NOT NULL,
  review_count INTEGER NOT NULL,
  warranty_months INTEGER NOT NULL,
  delivery_days INTEGER NOT NULL,
  in_stock INTEGER NOT NULL CHECK (in_stock IN (0,1)),
  stock_count INTEGER NOT NULL,
  card_image TEXT NOT NULL
);

CREATE TABLE product_sports (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sport TEXT NOT NULL,
  PRIMARY KEY (product_id, sport)
);

CREATE TABLE product_levels (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  PRIMARY KEY (product_id, level)
);

CREATE TABLE product_features (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  feature TEXT NOT NULL,
  PRIMARY KEY (product_id, position)
);

CREATE TABLE product_images (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  is_card INTEGER NOT NULL CHECK (is_card IN (0,1)),
  PRIMARY KEY (product_id, position)
);

CREATE TABLE product_store_stock (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  stock INTEGER NOT NULL,
  PRIMARY KEY (product_id, store_name)
);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-bad-001', 'REF-P-BAD-001', 'Chaussures badminton court grip 900', 'Chaussure indoor stable et legere pour les changements de direction rapides sur terrain.', 'CHAUSSURES', 'Aptonia', 84.99, 4.6, 18, 12, 1, 0, 0, '/src/assets/products/p-bad-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-bad-001', 'BADMINTON');
INSERT INTO product_levels (product_id, level) VALUES ('p-bad-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-bad-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-bad-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-001', 1, 'Respirabilite');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-001', 2, 'Amorti');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-001', 3, 'Maintien lateral');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bad-001', 1, '/src/assets/products/p-bad-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bad-001', 2, '/src/assets/products/p-bad-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-001', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-001', 'Decathlon Paris Madeleine', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-001', 'Decathlon Lyon Part-Dieu', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-001', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-bad-002', 'REF-P-BAD-002', 'Raquette badminton power strike 78', 'Raquette equilibree orientee puissance, ideale pour un jeu offensif et des smashs repetes.', 'MATERIEL', 'Kalenji', 69.99, 4.4, 42, 24, 2, 1, 12, '/src/assets/products/p-bad-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-bad-002', 'BADMINTON');
INSERT INTO product_levels (product_id, level) VALUES ('p-bad-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-bad-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-002', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-002', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bad-002', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bad-002', 1, '/src/assets/products/p-bad-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bad-002', 2, '/src/assets/products/p-bad-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-002', 'Decathlon Lille', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-002', 'Decathlon Paris Madeleine', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-002', 'Decathlon Lyon Part-Dieu', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bad-002', 'Decathlon Bordeaux Lac', 3);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-run-001', 'REF-P-RUN-001', 'Chaussures running comfort run 500', 'Amorti souple pour les sorties regulieres sur route avec un bon maintien du pied.', 'CHAUSSURES', 'Kipsta', 59.99, 4.8, 65, 12, 3, 1, 6, '/src/assets/products/p-run-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-run-001', 'RUNNING');
INSERT INTO product_levels (product_id, level) VALUES ('p-run-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-run-001', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-001', 1, 'Respirabilite');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-001', 2, 'Amorti');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-001', 3, 'Maintien lateral');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-run-001', 1, '/src/assets/products/p-run-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-run-001', 2, '/src/assets/products/p-run-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-001', 'Decathlon Lille', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-001', 'Decathlon Paris Madeleine', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-001', 'Decathlon Lyon Part-Dieu', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-001', 'Decathlon Bordeaux Lac', 2);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-run-002', 'REF-P-RUN-002', 'Veste running coupe-vent dry pace', 'Veste respirante et deperlante pour courir par temps frais ou vent modere.', 'TEXTILE', 'Domyos', 44.99, 4.3, 27, 24, 2, 1, 20, '/src/assets/products/p-run-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-run-002', 'RUNNING');
INSERT INTO product_levels (product_id, level) VALUES ('p-run-002', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-run-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-run-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-002', 1, 'Respirant');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-002', 2, 'Leger');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-run-002', 3, 'Séchage rapide');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-run-002', 1, '/src/assets/products/p-run-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-run-002', 2, '/src/assets/products/p-run-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-002', 'Decathlon Lille', 5);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-002', 'Decathlon Paris Madeleine', 5);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-002', 'Decathlon Lyon Part-Dieu', 5);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-run-002', 'Decathlon Bordeaux Lac', 5);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-foot-001', 'REF-P-FOOT-001', 'Ballon football match team pro', 'Ballon cousu machine avec toucher regulier et bonne resistance a l''usure.', 'MATERIEL', 'Artengo', 29.99, 4.7, 103, 36, 4, 1, 3, '/src/assets/products/p-foot-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-foot-001', 'FOOTBALL');
INSERT INTO product_levels (product_id, level) VALUES ('p-foot-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-foot-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-foot-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-foot-001', 1, '/src/assets/products/p-foot-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-foot-001', 2, '/src/assets/products/p-foot-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-001', 'Decathlon Lille', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-001', 'Decathlon Paris Madeleine', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-001', 'Decathlon Lyon Part-Dieu', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-001', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-foot-002', 'REF-P-FOOT-002', 'Protege-tibias shield flex', 'Protection legere avec coque flexible et manchette textile pour un confort durable.', 'PROTECTION', 'Btwin', 19.99, 4.1, 11, 12, 1, 0, 0, '/src/assets/products/p-foot-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-foot-002', 'FOOTBALL');
INSERT INTO product_levels (product_id, level) VALUES ('p-foot-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-foot-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-002', 1, 'Protection ciblee');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-002', 2, 'Confort');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-foot-002', 3, 'Maintien');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-foot-002', 1, '/src/assets/products/p-foot-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-foot-002', 2, '/src/assets/products/p-foot-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-002', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-002', 'Decathlon Paris Madeleine', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-002', 'Decathlon Lyon Part-Dieu', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-foot-002', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-ten-001', 'REF-P-TEN-001', 'Raquette tennis control spin 102', 'Raquette maniable pour progresser, favorise le controle de balle et les effets.', 'MATERIEL', 'Nabaiji', 89.99, 4.5, 54, 24, 3, 1, 8, '/src/assets/products/p-ten-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-ten-001', 'TENNIS');
INSERT INTO product_levels (product_id, level) VALUES ('p-ten-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-ten-001', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-ten-001', 1, '/src/assets/products/p-ten-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-ten-001', 2, '/src/assets/products/p-ten-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-001', 'Decathlon Lille', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-001', 'Decathlon Paris Madeleine', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-001', 'Decathlon Lyon Part-Dieu', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-001', 'Decathlon Bordeaux Lac', 2);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-ten-002', 'REF-P-TEN-002', 'Sac tennis competition 9 raquettes', 'Grand compartiment isotherme pour transporter raquettes, textiles et accessoires.', 'ACCESSOIRES', 'Aptonia', 64.99, 4.2, 89, 12, 2, 1, 14, '/src/assets/products/p-ten-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-ten-002', 'TENNIS');
INSERT INTO product_levels (product_id, level) VALUES ('p-ten-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-ten-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-002', 1, 'Pratique');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-002', 2, 'Compact');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-ten-002', 3, 'Polyvalent');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-ten-002', 1, '/src/assets/products/p-ten-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-ten-002', 2, '/src/assets/products/p-ten-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-002', 'Decathlon Lille', 4);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-002', 'Decathlon Paris Madeleine', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-002', 'Decathlon Lyon Part-Dieu', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-ten-002', 'Decathlon Bordeaux Lac', 4);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-cyc-001', 'REF-P-CYC-001', 'Casque velo route safe ride 300', 'Casque aeroventile ajuste avec molette arriere pour les sorties route et velotaf.', 'MATERIEL', 'Kalenji', 39.99, 4.6, 34, 24, 1, 1, 5, '/src/assets/products/p-cyc-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-cyc-001', 'CYCLISME');
INSERT INTO product_levels (product_id, level) VALUES ('p-cyc-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-cyc-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-cyc-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-cyc-001', 1, '/src/assets/products/p-cyc-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-cyc-001', 2, '/src/assets/products/p-cyc-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-001', 'Decathlon Lille', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-001', 'Decathlon Paris Madeleine', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-001', 'Decathlon Lyon Part-Dieu', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-001', 'Decathlon Bordeaux Lac', 1);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-cyc-002', 'REF-P-CYC-002', 'Eclairage velo avant/arriere usb', 'Kit d''eclairage rechargeable pour etre visible en ville et sur pistes cyclables.', 'ACCESSOIRES', 'Kipsta', 24.99, 4.4, 22, 36, 2, 1, 2, '/src/assets/products/p-cyc-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-cyc-002', 'CYCLISME');
INSERT INTO product_levels (product_id, level) VALUES ('p-cyc-002', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-cyc-002', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-002', 1, 'Pratique');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-002', 2, 'Compact');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-cyc-002', 3, 'Polyvalent');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-cyc-002', 1, '/src/assets/products/p-cyc-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-cyc-002', 2, '/src/assets/products/p-cyc-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-002', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-002', 'Decathlon Paris Madeleine', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-002', 'Decathlon Lyon Part-Dieu', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-cyc-002', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-mus-001', 'REF-P-MUS-001', 'Halteres ajustables home set 20kg', 'Jeu d''halteres modulables pour entrainements a domicile, progression par paliers.', 'MATERIEL', 'Domyos', 119.99, 4.8, 18, 12, 3, 0, 0, '/src/assets/products/p-mus-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-mus-001', 'MUSCULATION');
INSERT INTO product_levels (product_id, level) VALUES ('p-mus-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-mus-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-mus-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-mus-001', 1, '/src/assets/products/p-mus-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-mus-001', 2, '/src/assets/products/p-mus-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-001', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-001', 'Decathlon Paris Madeleine', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-001', 'Decathlon Lyon Part-Dieu', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-001', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-mus-002', 'REF-P-MUS-002', 'Ceinture de force power support', 'Ceinture de maintien lombaire pour les exercices de souleve et squat charges.', 'ACCESSOIRES', 'Artengo', 34.99, 4.3, 42, 24, 2, 1, 11, '/src/assets/products/p-mus-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-mus-002', 'MUSCULATION');
INSERT INTO product_levels (product_id, level) VALUES ('p-mus-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-mus-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-002', 1, 'Pratique');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-002', 2, 'Compact');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-mus-002', 3, 'Polyvalent');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-mus-002', 1, '/src/assets/products/p-mus-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-mus-002', 2, '/src/assets/products/p-mus-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-002', 'Decathlon Lille', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-002', 'Decathlon Paris Madeleine', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-002', 'Decathlon Lyon Part-Dieu', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-mus-002', 'Decathlon Bordeaux Lac', 3);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-nat-001', 'REF-P-NAT-001', 'Lunettes natation clear vision', 'Lunettes anti-buee avec joint souple pour un confort longue duree en piscine.', 'MATERIEL', 'Btwin', 14.99, 4.7, 65, 12, 4, 1, 9, '/src/assets/products/p-nat-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-nat-001', 'NATATION');
INSERT INTO product_levels (product_id, level) VALUES ('p-nat-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-nat-001', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-nat-001', 1, '/src/assets/products/p-nat-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-nat-001', 2, '/src/assets/products/p-nat-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-001', 'Decathlon Lille', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-001', 'Decathlon Paris Madeleine', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-001', 'Decathlon Lyon Part-Dieu', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-001', 'Decathlon Bordeaux Lac', 2);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-nat-002', 'REF-P-NAT-002', 'Maillot natation training one-piece', 'Maillot resistant au chlore, coupe ergonomique pour entrainements frequents.', 'TEXTILE', 'Nabaiji', 27.99, 4.1, 27, 24, 1, 1, 4, '/src/assets/products/p-nat-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-nat-002', 'NATATION');
INSERT INTO product_levels (product_id, level) VALUES ('p-nat-002', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-nat-002', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-002', 1, 'Respirant');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-002', 2, 'Leger');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-nat-002', 3, 'Séchage rapide');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-nat-002', 1, '/src/assets/products/p-nat-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-nat-002', 2, '/src/assets/products/p-nat-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-002', 'Decathlon Lille', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-002', 'Decathlon Paris Madeleine', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-002', 'Decathlon Lyon Part-Dieu', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-nat-002', 'Decathlon Bordeaux Lac', 1);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-rand-001', 'REF-P-RAND-001', 'Chaussures randonnee mid trek 100', 'Tige montante pour maintenir la cheville, semelle adherente sur sentiers mixtes.', 'CHAUSSURES', 'Aptonia', 74.99, 4.5, 103, 36, 3, 1, 1, '/src/assets/products/p-rand-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-rand-001', 'RANDONNEE');
INSERT INTO product_levels (product_id, level) VALUES ('p-rand-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-rand-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-rand-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-001', 1, 'Respirabilite');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-001', 2, 'Amorti');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-001', 3, 'Maintien lateral');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-rand-001', 1, '/src/assets/products/p-rand-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-rand-001', 2, '/src/assets/products/p-rand-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-001', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-001', 'Decathlon Paris Madeleine', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-001', 'Decathlon Lyon Part-Dieu', 1);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-001', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-rand-002', 'REF-P-RAND-002', 'Sac a dos randonnee 25L breathe', 'Sac compact avec dos ventile et poches acces rapide pour sorties a la journee.', 'ACCESSOIRES', 'Kalenji', 49.99, 4.2, 11, 12, 2, 0, 0, '/src/assets/products/p-rand-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-rand-002', 'RANDONNEE');
INSERT INTO product_levels (product_id, level) VALUES ('p-rand-002', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-rand-002', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-002', 1, 'Pratique');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-002', 2, 'Compact');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-rand-002', 3, 'Polyvalent');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-rand-002', 1, '/src/assets/products/p-rand-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-rand-002', 2, '/src/assets/products/p-rand-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-002', 'Decathlon Lille', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-002', 'Decathlon Paris Madeleine', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-002', 'Decathlon Lyon Part-Dieu', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-rand-002', 'Decathlon Bordeaux Lac', 0);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-bas-001', 'REF-P-BAS-001', 'Chaussures basketball jump elite 700', 'Amorti dynamique et maintien lateral renforce pour les appuis explosifs.', 'CHAUSSURES', 'Kipsta', 94.99, 4.6, 54, 24, 1, 1, 7, '/src/assets/products/p-bas-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-bas-001', 'BASKETBALL');
INSERT INTO product_levels (product_id, level) VALUES ('p-bas-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-bas-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bas-001', 1, 'Respirabilite');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bas-001', 2, 'Amorti');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-bas-001', 3, 'Maintien lateral');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bas-001', 1, '/src/assets/products/p-bas-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-bas-001', 2, '/src/assets/products/p-bas-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bas-001', 'Decathlon Lille', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bas-001', 'Decathlon Paris Madeleine', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bas-001', 'Decathlon Lyon Part-Dieu', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-bas-001', 'Decathlon Bordeaux Lac', 1);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-yog-001', 'REF-P-YOG-001', 'Tapis yoga confort align 6mm', 'Tapis antiderapant avec bonne densite pour postures d''equilibre et seances au sol.', 'MATERIEL', 'Domyos', 22.99, 4.4, 89, 12, 2, 1, 15, '/src/assets/products/p-yog-001-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-yog-001', 'YOGA');
INSERT INTO product_levels (product_id, level) VALUES ('p-yog-001', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-yog-001', 'AVERAGE');
INSERT INTO product_levels (product_id, level) VALUES ('p-yog-001', 'EXPERT');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-001', 1, 'Robustesse');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-001', 2, 'Performance');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-001', 3, 'Confort d''utilisation');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-yog-001', 1, '/src/assets/products/p-yog-001-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-yog-001', 2, '/src/assets/products/p-yog-001-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-001', 'Decathlon Lille', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-001', 'Decathlon Paris Madeleine', 4);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-001', 'Decathlon Lyon Part-Dieu', 4);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-001', 'Decathlon Bordeaux Lac', 4);

INSERT INTO products (id, sku, name, description, category, brand, price, rating, review_count, warranty_months, delivery_days, in_stock, stock_count, card_image) VALUES ('p-yog-002', 'REF-P-YOG-002', 'Sangle yoga stretch assist', 'Sangle reglable pour travailler la mobilite et progresser sur les amplitudes.', 'ACCESSOIRES', 'Artengo', 9.99, 4.8, 34, 24, 3, 1, 10, '/src/assets/products/p-yog-002-1.png');
INSERT INTO product_sports (product_id, sport) VALUES ('p-yog-002', 'YOGA');
INSERT INTO product_levels (product_id, level) VALUES ('p-yog-002', 'BEGINNER');
INSERT INTO product_levels (product_id, level) VALUES ('p-yog-002', 'AVERAGE');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-002', 1, 'Pratique');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-002', 2, 'Compact');
INSERT INTO product_features (product_id, position, feature) VALUES ('p-yog-002', 3, 'Polyvalent');
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-yog-002', 1, '/src/assets/products/p-yog-002-1.png', 1);
INSERT INTO product_images (product_id, position, image_url, is_card) VALUES ('p-yog-002', 2, '/src/assets/products/p-yog-002-2.png', 0);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-002', 'Decathlon Lille', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-002', 'Decathlon Paris Madeleine', 2);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-002', 'Decathlon Lyon Part-Dieu', 3);
INSERT INTO product_store_stock (product_id, store_name, stock) VALUES ('p-yog-002', 'Decathlon Bordeaux Lac', 3);


ALTER TABLE product_store_stock RENAME TO equipements_productstorestock;
ALTER TABLE product_images RENAME TO equipements_productimages;
ALTER TABLE product_features RENAME TO equipements_productfeatures;
ALTER TABLE product_levels RENAME TO equipements_productlevels;
ALTER TABLE product_sports RENAME TO equipements_productsports;
ALTER TABLE products RENAME TO equipements_product;

COMMIT;



-- Vérification rapide
-- SELECT COUNT(*) FROM products;
-- SELECT * FROM product_images WHERE is_card = 1 LIMIT 5;
