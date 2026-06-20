USE amazon_clone;

-- Foreign key check-ஐ ஆஃப் பண்ணி கம்ப்ளீட்டா டேபிளை ரீசெட் செய்கிறோம்
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

TRUNCATE TABLE section_items;
TRUNCATE TABLE homepage_sections;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Main Card Layouts
INSERT INTO homepage_sections (id, title, link_text, single_image) VALUES
(1, 'Appliances for your home | Up to 55% off', 'See more', NULL),
(2, 'Revamp your home in style', 'Explore all', NULL),
(3, 'Starting ₹49 | Deals on home essentials', 'Explore all', NULL),
(4, 'Up to 75% off | Deals on headphones', 'See all offers', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80');

-- 2. Insert High-Quality Correctly Related Images
INSERT INTO section_items (section_id, title, image_url) VALUES
(1, 'Air conditioners', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80'),
(1, 'Refrigerators', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80'),
(1, 'Microwaves', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80'),
(1, 'Washing machines', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80'),

-- Card 2: Revamp your home in style (100% PERFECTLY RELATED MATCHES)
(2, 'Cushion covers', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80'), -- Actual Home Cushions
(2, 'Figurines & vases', 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&q=80'), -- Flower vase / Decor
(2, 'Home storage', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'), -- Storage cabinets
(2, 'Lighting solutions', 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&q=80'), -- Modern lamps

-- Card 3: Deals on home essentials (100% PERFECTLY RELATED MATCHES)
(3, 'Cleaning supplies', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80'), -- Disinfectants & sprays
(3, 'Bathroom accessories', 'https://images.unsplash.com/photo-1604709177595-ee9c2580e9a3?w=400&q=80'), -- Soft Bathroom Towels & Holders
(3, 'Home tools', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&q=80'), -- Screwdrivers & Tools
(3, 'Wallpapers', 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&q=80'); -- Interior textures

SET SQL_SAFE_UPDATES = 1;


USE amazon_clone;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- ஏசி ப்ராடக்ட்ஸை மட்டும் தனியாக ஃபில்டர் செய்து எடுக்க, id = 99 போன்ற ஒரு புதிய கார்டை உருவாக்குறோம்
DELETE FROM homepage_sections WHERE id = 99;
INSERT INTO homepage_sections (id, title, link_text, single_image) VALUES
(99, 'Deals on Air Conditioners - Great Summer Sale', 'See all options', NULL);

DELETE FROM section_items WHERE section_id = 99;
-- 100% லோடாகும் ஒரிஜினல் அமேசான் ஏசி சிடிஎன் இமேஜ் லிங்க்ஸை இன்செர்ட் செய்கிறோம்
INSERT INTO section_items (section_id, title, image_url) VALUES
(99, 'Voltas 243V Vectra Elite 2 ton 3 star inverter Split AC', 'https://m.media-amazon.com/images/I/41uS8qXpSGL._MCnd_AC_UL320_.jpg'),
(99, 'Voltas 1 Ton 3 Star, Inverter Split AC (Copper, LED Display)', 'https://m.media-amazon.com/images/I/41bS2gI2ZmL._MCnd_AC_UL320_.jpg'),
(99, 'Voltas 183 Vectra Platina 1.5 Ton 3 Star Inverter Split AC', 'https://m.media-amazon.com/images/I/51wB7-7l4XL._MCnd_AC_UL320_.jpg'),
(99, 'Voltas 185V Vectra Elegant 1.5 Ton 5 Star Inverter Split AC', 'https://m.media-amazon.com/images/I/514N8N8ySLL._MCnd_AC_UL320_.jpg'),
(99, 'Hitachi 1.5 Ton 3 Star ice Clean Xpandable Plus Inverter Split AC', 'https://m.media-amazon.com/images/I/51hXb8a0-SL._MCnd_AC_UL320_.jpg');

SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- AdBlocker-ஆல் பிளாக் செய்ய முடியாத தூய்மையான அமேசான் இமேஜ் லிங்க்ஸை அப்டேட் செய்கிறோம்
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/61m1a0vS6GL.jpg' WHERE section_id = 99 AND id = 1;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/51BqgG+fXTL.jpg' WHERE section_id = 99 AND id = 2;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/61K-O5+VqyL.jpg' WHERE section_id = 99 AND id = 3;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/51wB7-7l4XL.jpg' WHERE section_id = 99 AND id = 4;

SET SQL_SAFE_UPDATES = 1;


USE amazon_clone;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- 1. பழைய செக்ஷன் 99-ஐ நீக்குகிறோம்
DELETE FROM homepage_sections WHERE id = 99;
INSERT INTO homepage_sections (id, title, link_text, single_image) VALUES
(99, 'Deals on Air Conditioners - Great Summer Sale', 'See all options', NULL);

-- 2. பழைய ஐட்டம்களை நீக்குகிறோம்
DELETE FROM section_items WHERE section_id = 99;

-- 🌟 100% GUARANTEED WORKING CLEAN IMAGES (டிராக்கிங் பாராமீட்டர்கள் நீக்கப்பட்ட அசல் ஏசி இமேஜ்கள்)
INSERT INTO section_items (section_id, title, image_url) VALUES
(99, 'Voltas 243V Vectra Elite 2 ton 3 star inverter Split AC', 'https://m.media-amazon.com/images/I/61m1a0vS6GL.jpg'),
(99, 'Voltas 1 Ton 3 Star, Inverter Split AC (Copper, LED Display)', 'https://m.media-amazon.com/images/I/51BqgG+fXTL.jpg'),
(99, 'Voltas 183 Vectra Platina 1.5 Ton 3 Star Inverter Split AC', 'https://m.media-amazon.com/images/I/61K-O5+VqyL.jpg'),
(99, 'Voltas 185V Vectra Elegant 1.5 Ton 5 Star Inverter Split AC', 'https://m.media-amazon.com/images/I/51wB7-7l4XL.jpg'),
(99, 'Hitachi 1.5 Ton 3 Star ice Clean Xpandable Plus Inverter Split AC', 'https://m.media-amazon.com/images/I/51hXb8a0-SL.jpg');

SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

UPDATE section_items
SET image_url='/ac/ac1.webp'
WHERE id=1;

UPDATE section_items
SET image_url='/ac/ac2.webp'
WHERE id=2;

UPDATE section_items
SET image_url='/ac/ac3.webp'
WHERE id=3;

UPDATE section_items
SET image_url='/ac/ac4.webp'
WHERE id=4;

UPDATE section_items
SET image_url='/ac/ac5.webp'
WHERE id=5;

SELECT id, title, image_url
FROM section_items
WHERE section_id = 99;

UPDATE section_items
SET image_url='/ac/ac1.webp'
WHERE id=18;

UPDATE section_items
SET image_url='/ac/ac2.webp'
WHERE id=19;

UPDATE section_items
SET image_url='/ac/ac3.webp'
WHERE id=20;

UPDATE section_items
SET image_url='/ac/ac4.webp'
WHERE id=21;

UPDATE section_items
SET image_url='/ac/ac5.webp'
WHERE id=22;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 ரெஃப்ரிஜிரேட்டர் ஐட்டமிற்கு நீங்க கொடுத்த அன்ஸ்பிளாஷ் லிங்க்கை கன்பார்மா அப்டேட் பண்றோம்
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&q=80' 
WHERE title LIKE '%Refrigerator%' OR title LIKE '%Fridge%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 மைக்ரோவேவ் ஐட்டமிற்கு நீங்க கொடுத்த இமேஜ் லிங்க்கை கிளீன் செய்து அப்டேட் பண்றோம்
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/174494893/photo/microwave-oven.jpg?s=612x612' 
WHERE title LIKE '%Microwave%' OR title LIKE '%Oven%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 100% வொர்க்கிங் தூய்மையான அன்ஸ்பிளாஷ் மைக்ரோவேவ் இமேஜ் லிங்க்
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' 
WHERE title LIKE '%Microwave%' OR title LIKE '%Oven%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 100% தூய்மையான ஒயிட் பேக்ரவுண்ட் கொண்ட மைக்ரோவேவ் இமேஜ் லிங்க்
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1585659722982-796000042233?w=500&q=80' 
WHERE title LIKE '%Microwave%' OR title LIKE '%Oven%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 நீங்க கொடுத்த அசல் தூய்மையான ஐஸ்டாக் மைக்ரோவேவ் இமேஜ் லிங்க்
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/182915079/photo/microwave-oven.webp?a=1&b=1&s=612x612&w=0&k=20&c=qPs1Y2yCQb4XPSo4W_depmDyEMPFf2gk_kUFqTljMWw=' 
WHERE title LIKE '%Microwave%' OR title LIKE '%Oven%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 100% தூய்மையான ஒயிட் பேக்ரவுண்ட் கொண்ட வாஷிங் மெஷின் இமேஜ் லிங்க் (Only Machine)
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80' 
WHERE title LIKE '%Washing%' OR title LIKE '%Machine%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 வாஷிங் மெஷின் ஐட்டமிற்கு நீங்க கொடுத்த புதிய அன்ஸ்பிளாஷ் லிங்க்கை அப்டேட் செய்கிறோம்
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1764705637770-9fc400e090cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
WHERE title LIKE '%Washing%' OR title LIKE '%Machine%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 🌟 1. Godrej Single Door Fridge (முதல் கார்டுக்கு நீங்க கொடுத்த 1st லிங்க்)
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/1144170558/photo/giant-refrigerator-in-office.jpg?s=612x612' 
WHERE title LIKE '%Godrej 30 L%' OR id = 201;

-- 🌟 2. Haier Bottom Mount (இரண்டாவது கார்டுக்கு நீங்க கொடுத்த 2nd லிங்க்)
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/138118407/photo/kitchen-design.jpg?s=612x612' 
WHERE title LIKE '%Haier 325 L%' OR id = 202;

-- 🌟 3. Haier 602 L Side by Side (மூன்றாவது கார்டுக்கு நீங்க கொடுத்த 3rd லிங்க்)
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/473081876/photo/refrigerator-in-a-modern-kitchen.jpg?s=612x612' 
WHERE title LIKE '%Haier 602 L%' OR id = 203;

-- 🌟 4. Haier 596 L Shiny Silver (நான்காவது கார்டுக்கு நீங்க கொடுத்த 4th லிங்க்)
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/480635315/photo/fridge.jpg?s=612x612' 
WHERE title LIKE '%Haier 596 L%' OR id = 204;

-- 🌟 5. Samsung 653 L Side by Side (ஐந்தாவது கார்டுக்கு நீங்க கொடுத்த 5th லிங்க்)
UPDATE section_items 
SET image_url = 'https://media.istockphoto.com/id/535557765/photo/expensive-kitchen-in-modern-house.jpg?s=612x612' 
WHERE title LIKE '%Samsung 653 L%' OR id = 205;

SET SQL_SAFE_UPDATES = 1;

SELECT id, title, image_url FROM section_items WHERE title LIKE '%Refrigerator%' OR title LIKE '%Fridge%';

USE amazon_clone;

-- ஏற்கனவே இருந்ததை நீக்கிவிட்டு புதுசா இன்செர்ட் பண்ணலாம்
DELETE FROM section_items WHERE id BETWEEN 201 AND 205;

INSERT INTO section_items (id, section_id, title, image_url, price) VALUES
(201, 99, 'Godrej 30 L Qube Personal Refrigerator', 'https://media.istockphoto.com/id/1144170558/photo/giant-refrigerator-in-office.jpg?s=612x612', 7990),
(202, 99, 'Haier 325 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/138118407/photo/kitchen-design.jpg?s=612x612', 34990),
(203, 99, 'Haier 602 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/473081876/photo/refrigerator-in-a-modern-kitchen.jpg?s=612x612', 64990),
(204, 99, 'Haier 596 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/480635315/photo/fridge.jpg?s=612x612', 62990),
(205, 99, 'Samsung 653 L Side by Side Refrigerator', 'https://media.istockphoto.com/id/535557765/photo/expensive-kitchen-in-modern-house.jpg?s=612x612', 83990);


USE amazon_clone;

-- 'price' என்ற காலம் இல்லை என்றால் அதை ஆட் செய்யவும்
ALTER TABLE section_items ADD COLUMN price DECIMAL(10, 2);


USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- ஏற்கனவே இருந்ததை நீக்கவும் (மேலே ஆட் செய்த பிறகு)
DELETE FROM section_items WHERE id BETWEEN 201 AND 205;

INSERT INTO section_items (id, section_id, title, image_url, price) VALUES
(201, 99, 'Godrej 30 L Qube Personal Refrigerator', 'https://media.istockphoto.com/id/1144170558/photo/giant-refrigerator-in-office.jpg?s=612x612', 7990),
(202, 99, 'Haier 325 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/138118407/photo/kitchen-design.jpg?s=612x612', 34990),
(203, 99, 'Haier 602 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/473081876/photo/refrigerator-in-a-modern-kitchen.jpg?s=612x612', 64990),
(204, 99, 'Haier 596 L 3 Star Frost Free Refrigerator', 'https://media.istockphoto.com/id/480635315/photo/fridge.jpg?s=612x612', 62990),
(205, 99, 'Samsung 653 L Side by Side Refrigerator', 'https://media.istockphoto.com/id/535557765/photo/expensive-kitchen-in-modern-house.jpg?s=612x612', 83990);

SET SQL_SAFE_UPDATES = 1;


USE amazon_clone;

-- அந்த 5 ஐட்டம்களையும் செக்ஷன் 99 (Appliances) கீழ் கொண்டு வர:
UPDATE section_items 
SET section_id = 99 
WHERE id BETWEEN 201 AND 205;

USE amazon_clone;


-- Run this inside your MySQL database editor
INSERT INTO section_items (title, image_url, price) VALUES
('Samsung 23 L Solo Microwave Oven', 'https://m.media-amazon.com/images/I/61gHu9NWDmL._AC_UL480_FMwebp_QL65_.jpg', 7490),
('IFB 20 L Convection Microwave Oven', 'https://m.media-amazon.com/images/I/81oMBpLDSLL._AC_UL480_FMwebp_QL65_.jpg', 10290),
('Panasonic 20 L Solo Microwave Oven', 'https://m.media-amazon.com/images/I/81bj+66bFhL._AC_UL480_FMwebp_QL65_.jpg', 6290),
('Bajaj 17 L Solo Microwave Oven', 'https://m.media-amazon.com/images/I/61n-dJ0vUAL._AC_UL480_FMwebp_QL65_.jpg', 5199),
('LG 28 L Convection Microwave Oven', 'https://m.media-amazon.com/images/I/71dmDpFCQ3L._AC_UL480_FMwebp_QL65_.jpg', 12490);


USE amazon_clone;

INSERT INTO section_items (title, image_url, price) VALUES
-- Fashion Items
('Casual Sneakers Running Shoes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 1999),
('Women White Minimalist T-Shirt', 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg', 499),
('Kids Traditional Ethic Wear Set', 'https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg', 799),
('Grey Running Athletic Shoes', 'https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg', 2499),

-- Beauty Items
('Premium Natural Soap Bars Pack', 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg', 349),
('Refreshing Organic Face Wash Gel', 'https://images.unsplash.com/photo-1556228720-195a672e8a03', 299),
('Gentle Moisturizing Skin Cleanser', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', 450),
('Luxury Facial Protection Serums', 'https://images.unsplash.com/photo-1608248597481-496100c80836', 899),

-- Home & Kitchen Items
('Stainless Steel Garbage Disposal Bags', 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg', 199),
('Digital Electronic Kitchen Weight Scale', 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg', 599),
('Insulated Sports Gym Water Bottle', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', 699),
('Premium Silver Kitchen Utensils Set', 'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg', 1299);


USE amazon_clone;

INSERT INTO section_items (title, image_url, price) VALUES
('Samsung 236 L 3 Star Inverter Frost Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg', 25990),
('LG 242 L 3 Star Smart Inverter Frost-Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg', 24490),
('Whirlpool 240 L Triple Door Multi-Door Refrigerator', 'https://m.media-amazon.com/images/I/71o4XEEvEVL._AC_UL480_FMwebp_QL65_.jpg', 26990),
('Haier 325 L 3 Star Frost Free Double Door Bottom Mounted Refrigerator', 'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg', 34990),
('Godrej 223 L 3 Star Nano Shield Technology Double Door Refrigerator', 'https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg', 22990);

USE amazon_clone;

DELETE FROM section_items 
WHERE image_url IN (
  'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71o4XEEvEVL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg'
);

USE amazon_clone;

-- 1. Turn off Safe Update Mode temporarily
SET SQL_SAFE_UPDATES = 0;

-- 2. Delete those 5 incorrect refrigerator items using their image URLs
DELETE FROM section_items 
WHERE image_url IN (
  'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71o4XEEvEVL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg',
  'https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg'
);

-- 3. Insert them properly as Front Loading Washing Machines
INSERT INTO section_items (title, image_url, price) VALUES
('Samsung 7 kg 5 Star Inverter Fully Automatic Front Loading Washing Machine', 'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg', 28990),
('LG 8 kg 5 Star Inverter Direct Drive Fully Automatic Front Load Washing Machine', 'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg', 32490),
('Whirlpool 7.5 kg 5 Star Fully Automatic Front Load Washing Machine', 'https://m.media-amazon.com/images/I/71o4XEEvEVL._AC_UL480_FMwebp_QL65_.jpg', 29990),
('Haier 8 kg 5 Star Motor Fully Automatic Front Load Washing Machine', 'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg', 30990),
('IFB 7 kg 5 Star AI Powered Fully Automatic Front Load Washing Machine', 'https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg', 27490);

-- 4. Turn Safe Update Mode back on
SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

-- Force the price column type to handle numbers smoothly
ALTER TABLE section_items MODIFY COLUMN price DECIMAL(10,2);

-- Verify your washing machines are active in the database
SELECT * FROM section_items WHERE LOWER(title) LIKE '%washing%';

USE amazon_clone;

-- 1. Remove the old generic layout row that is blocking keyword filters
DELETE FROM section_items WHERE id = 4;

-- 2. Update your new washing machines so their section data matches your grid schema
SET SQL_SAFE_UPDATES = 0;
UPDATE section_items 
SET section_id = 1 
WHERE LOWER(title) LIKE '%washing%';
SET SQL_SAFE_UPDATES = 1;

-- 3. Verify the changes look correct
SELECT * FROM section_items WHERE LOWER(title) LIKE '%washing%';

WHERE LOWER(title) LIKE ? OR LOWER(title) LIKE '%ac%'

USE amazon_clone;

DELETE FROM section_items 
WHERE title IN ('Air conditioners', 'Washing machines', 'Refrigerators', 'Microwaves');

USE amazon_clone;

-- 1. Temporarily turn off Safe Update Mode to allow deleting by title text
SET SQL_SAFE_UPDATES = 0;

-- 2. Delete the old layout rows that were causing the ₹0 header cards
DELETE FROM section_items 
WHERE title IN ('Air conditioners', 'Washing machines', 'Refrigerators', 'Microwaves');

-- 3. Turn Safe Update Mode back on to protect your database structure
SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- Update Godrej Refrigerator Image
UPDATE section_items 
SET image_url = 'https://m.media-amazon.com/images/I/61RMvYIuFwL._AC_UL480_FMwebp_QL65_.jpg' 
WHERE title LIKE '%Godrej%';

-- Update Haier 325 L Refrigerator Image
UPDATE section_items 
SET image_url = 'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg' 
WHERE title LIKE '%325 L%';

-- Update Haier 602 L Refrigerator Image
UPDATE section_items 
SET image_url = 'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg' 
WHERE title LIKE '%602 L%';

-- Update any other refrigerator row to ensure no broken images remain
UPDATE section_items 
SET image_url = 'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg'
WHERE LOWER(title) LIKE '%refrigerator%' 
  AND image_url LIKE '%unsplash%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 1. Apply secure, high-quality product images to your Washing Machines explicitly by ID
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/61EQi2SUXDL._AC_UL480_FMwebp_QL65_.jpg' WHERE id = 228;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/61h84XYtk0L._AC_UL480_FMwebp_QL65_.jpg' WHERE id = 229;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/71o4XEEvEVL._AC_UL480_FMwebp_QL65_.jpg' WHERE id = 230;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/71XFlYAjIQL._AC_UL480_FMwebp_QL65_.jpg' WHERE id = 231;
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg' WHERE id = 232;

-- 2. Apply separate, crisp, verified Amazon CDN images to your Refrigerator rows
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/516w4g7YpDL._AC_UL320_.jpg' WHERE title LIKE '%Godrej%';
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/51H0n8q1NfL._AC_UL320_.jpg' WHERE title LIKE '%325 L%';
UPDATE section_items SET image_url = 'https://m.media-amazon.com/images/I/61k8v9YyVBL._AC_UL320_.jpg' WHERE title LIKE '%602 L%';

SET SQL_SAFE_UPDATES = 1;

USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- 1. Update Godrej Refrigerator with a clean single-door fridge image
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1571175432244-5f025856779d?w=500&q=80' 
WHERE title LIKE '%Godrej%';

-- 2. Update Haier 325 L Refrigerator with a modern silver fridge image
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80' 
WHERE title LIKE '%325 L%';

-- 3. Update Haier 602 L Refrigerator with a large double-door family fridge image
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80' 
WHERE title LIKE '%602 L%';

-- 4. Clean up any remaining fallback slots
UPDATE section_items 
SET image_url = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80'
WHERE LOWER(title) LIKE '%refrigerator%' 
  AND image_url LIKE '%_UL320_%';

SET SQL_SAFE_UPDATES = 1;

-- Verify everything looks clean in the tables
SELECT id, title, image_url, price FROM section_items WHERE LOWER(title) LIKE '%refrigerator%';

USE amazon_clone;

SELECT * FROM section_items 
WHERE LOWER(title) LIKE '%refrigerator%' 
   OR LOWER(title) LIKE '%fridge%';
   
   USE amazon_clone;

-- 1. Temporarily turn off Safe Update Mode to allow wiping the old category items
SET SQL_SAFE_UPDATES = 0;

-- 2. Clear out your old refrigerator data rows
DELETE FROM section_items 
WHERE LOWER(title) LIKE '%refrigerator%' 
   OR LOWER(title) LIKE '%fridge%';

-- 3. Insert your 5 new refrigerators with their respective image links
INSERT INTO section_items (title, image_url, price, section_id) VALUES
('Samsung 256L 3 Star Inverter Frost-Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/61GelOnsPKL._AC_UL480_FMwebp_QL65_.jpg', 26990.00, 1),
('LG 242L 3 Star Smart Inverter Frost-Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/611B1rnbrPL._AC_UL480_FMwebp_QL65_.jpg', 25490.00, 1),
('Whirlpool 265L 3 Star Inverter Frost-Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/51j8sDiJhZL._AC_UL480_FMwebp_QL65_.jpg', 27990.00, 1),
('Haier 328L 3 Star Frost-Free Double Door Bottom Mounted Refrigerator', 'https://m.media-amazon.com/images/I/61fvqo8WlhL._AC_UL480_FMwebp_QL65_.jpg', 33990.00, 1),
('Godrej 244L 3 Star Inverter Frost-Free Double Door Refrigerator', 'https://m.media-amazon.com/images/I/51pd+cQ9lzL._AC_UL480_FMwebp_QL65_.jpg', 23490.00, 1);

-- 4. Turn Safe Update Mode back on to protect your layout tables
SET SQL_SAFE_UPDATES = 1;

-- 5. Quick check to verify your newly inserted items are active
SELECT id, title, image_url, price FROM section_items WHERE LOWER(title) LIKE '%refrigerator%';


USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- Clean old mismatched entries
DELETE FROM section_items 
WHERE LOWER(title) LIKE '%cushion%' 
   OR LOWER(title) LIKE '%furnishing%';

-- Insert the 5 new structural elements with their exact corresponding image targets
INSERT INTO section_items (title, image_url, price, section_id) VALUES
('Kids furnishings', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Kids_Furnishings._SS400_QL85_.jpg', 499.00, 2),
('Peach Fuzz', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Peach_Fuzz._SS400_QL85_.jpg', 699.00, 2),
('India inspired', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/India_Inspired._SS400_QL85_.jpg', 599.00, 2),
('Cotton edit', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cotton_Edit._SS400_QL85_.jpg', 799.00, 2),
('Bohemian styling', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Bohemian-styling-REVISED._SS400_QL85_.jpg', 849.00, 2);

SET SQL_SAFE_UPDATES = 1;



USE amazon_clone;

SET SQL_SAFE_UPDATES = 0;

-- Delete the previous entries so we don't have duplicates
DELETE FROM section_items 
WHERE image_url LIKE '%HFRevamp%';

-- Insert the 5 items with explicit keyword identifiers in their titles
INSERT INTO section_items (title, image_url, price, section_id) VALUES
('Kids furnishings Cushion Cover', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Kids_Furnishings._SS400_QL85_.jpg', 499.00, 2),
('Peach Fuzz Cushion Cover', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Peach_Fuzz._SS400_QL85_.jpg', 699.00, 2),
('India inspired Cushion Cover', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/India_Inspired._SS400_QL85_.jpg', 599.00, 2),
('Cotton edit Cushion Cover', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cotton_Edit._SS400_QL85_.jpg', 799.00, 2),
('Bohemian styling Cushion Cover', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Bohemian-styling-REVISED._SS400_QL85_.jpg', 849.00, 2);

SET SQL_SAFE_UPDATES = 1;


USE amazon_clone;

-- 1. Create a clean dedicated table for furnishing brands
CREATE TABLE IF NOT EXISTS furnishing_brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL
);

-- 2. Clear old test structures if any exist
TRUNCATE TABLE furnishing_brands;

-- 3. Insert your exact brand image URLs
INSERT INTO furnishing_brands (name, image_url) VALUES
('Status', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Status._SS400_QL85_.jpg'),
('Layers', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Layers._SS400_QL85_.jpg'),
('BSB Home', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/BSB_Home._SS400_QL85_.jpg'),
('Cortina', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cortina._SS400_QL85_.jpg'),
('HF revamp', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Layers._SS400_QL85_.jpg');


SELECT * FROM furnishing_brands;


USE amazon_clone;

-- 1. Create and populate furnishing_brands
CREATE TABLE IF NOT EXISTS furnishing_brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL
);

TRUNCATE TABLE furnishing_brands;

INSERT INTO furnishing_brands (name, image_url) VALUES
('Status', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Status._SS400_QL85_.jpg'),
('Layers', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Layers._SS400_QL85_.jpg'),
('BSB Home', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/BSB_Home._SS400_QL85_.jpg'),
('Cortina', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cortina._SS400_QL85_.jpg');


-- 2. Create and populate home_decor_categories
CREATE TABLE IF NOT EXISTS home_decor_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL
);

TRUNCATE TABLE home_decor_categories;

INSERT INTO home_decor_categories (title, image_url) VALUES
('Figurines & showpieces', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x400._CB567459866_.jpg'),
('Wall décor', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4001._CB567459866_.jpg'),
('Candles & candle holders', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4002._CB567459866_.jpg'),
('Spiritual décor & pooja supplies', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4003._CB567459866_.jpg'),
('Table top decor', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4004._CB567459866_.jpg');



USE amazon_clone;

-- 1. Drop any accidental tables with hidden trailing spaces
DROP TABLE IF EXISTS `furnishing_brands `;
DROP TABLE IF EXISTS `home_decor_categories `;

-- 2. Drop the core tables to clear any glitch states
DROP TABLE IF EXISTS furnishing_brands;
DROP TABLE IF EXISTS home_decor_categories;

-- 3. Recreate furnishing_brands perfectly
CREATE TABLE furnishing_brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO furnishing_brands (name, image_url) VALUES
('Status', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Status._SS400_QL85_.jpg'),
('Layers', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Layers._SS400_QL85_.jpg'),
('BSB Home', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/BSB_Home._SS400_QL85_.jpg'),
('Cortina', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cortina._SS400_QL85_.jpg');

-- 4. Recreate home_decor_categories perfectly
CREATE TABLE home_decor_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO home_decor_categories (title, image_url) VALUES
('Figurines & showpieces', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x400._CB567459866_.jpg'),
('Wall décor', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4001._CB567459866_.jpg'),
('Candles & candle holders', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4002._CB567459866_.jpg'),
('Spiritual décor & pooja supplies', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4003._CB567459866_.jpg'),
('Table top decor', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/homedecorsubcat/9C-400x4004._CB567459866_.jpg');

USE amazon_clone;

-- 1. Create the dedicated home_storage table structure if it dropped
CREATE TABLE IF NOT EXISTS home_storage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    category_query VARCHAR(255) NOT NULL
);

-- 2. Clear out any previous records to replace them completely
TRUNCATE TABLE home_storage;

-- 3. Insert your modified values seamlessly
INSERT INTO home_storage (title, image_url, category_query) VALUES
('JD Fresh', 'https://m.media-amazon.com/images/I/41lgEICZpOL.AC_SX250.jpg', 'cushion'),
('JD Fresh', 'https://m.media-amazon.com/images/I/51TzVOdYPJL.AC_SX250.jpg', 'figurines & vases'),
('JD Fresh', 'https://m.media-amazon.com/images/I/618z+9a-M0L.AC_SX250.jpg', 'storage'),
('JD Fresh', 'https://m.media-amazon.com/images/I/41X5OvQTN6L.AC_SX250.jpg', 'lighting'),
('JD Fresh', 'https://m.media-amazon.com/images/I/413F0jhPwNL.AC_SX250.jpg', 'decor');



USE amazon_clone;
SELECT * FROM section_items LIMIT 50;

USE amazon_clone;
SELECT * FROM furnishing_brands LIMIT 50;


USE amazon_clone;



-- 1. Create the dedicated home_lighting table

CREATE TABLE IF NOT EXISTS home_lighting (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    image_url VARCHAR(1000) NOT NULL,

    category_query VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- 2. Insert your 5 specific lighting product records 

INSERT INTO home_lighting (title, image_url, category_query) VALUES

('Phillips', 'https://m.media-amazon.com/images/I/41yjK9eytpL._AC_SX250_.jpg', 'lighting'),

('Halonix', 'https://m.media-amazon.com/images/I/41VMf3CygKL._AC_SX250_.jpg', 'lighting'),

('Bajaj', 'https://m.media-amazon.com/images/I/411UZVF8muL.AC_SX250.jpg', 'lighting'),

('Crompton', 'https://m.media-amazon.com/images/I/41W5290SzsL.AC_SX250.jpg', 'lighting'),

('Everyday', 'https://m.media-amazon.com/images/I/41o7Ed9jnJL._AC_SX250_.jpg', 'lighting');



-- 3. Verify the items are saved correctly

SELECT * FROM home_lighting;

USE amazon_clone;

SELECT * FROM section_items WHERE id = 18;


USE amazon_clone;

-- 1. Standard MySQL syntax without the 'IF NOT EXISTS' clause
ALTER TABLE section_items ADD COLUMN mrp DECIMAL(10, 2);

-- 2. Turn off Safe Update Mode to execute changes cleanly
SET SQL_SAFE_UPDATES = 0;

-- 3. Execute your pricing updates for the AC rows
UPDATE section_items 
SET price = 42990.00, mrp = 74990.00 
WHERE section_id = 99 AND title LIKE '%243V Vectra Elite%';

UPDATE section_items 
SET price = 29490.00, mrp = 49990.00 
WHERE section_id = 99 AND title LIKE '%1 Ton 3 Star%';

UPDATE section_items 
SET price = 36490.00, mrp = 67990.00 
WHERE section_id = 99 AND title LIKE '%183 Vectra Platina%';

UPDATE section_items 
SET price = 40990.00, mrp = 71990.00 
WHERE section_id = 99 AND title LIKE '%185V Vectra Elegant%';

UPDATE section_items 
SET price = 37990.00, mrp = 62990.00 
WHERE section_id = 99 AND title LIKE '%Hitachi%';

-- 4. Turn Safe Update Mode back on
SET SQL_SAFE_UPDATES = 1;

-- 5. Verify everything is populated correctly
SELECT id, title, price, mrp FROM section_items WHERE section_id = 99;

USE amazon_clone;

SELECT * FROM section_items WHERE id = 18;

USE amazon_clone;

-- 1. Add the missing 'about_item' column as a TEXT data type to hold paragraph bullets
ALTER TABLE section_items ADD COLUMN about_item TEXT;

-- 2. Turn off Safe Update Mode to run clean text descriptions injection updates
SET SQL_SAFE_UPDATES = 0;

-- 3. Populate description text for your main product row (id = 18)
UPDATE section_items 
SET about_item = 'Energy efficient with 3-star BEE premium framework metrics rating configuration.\nFrost-free operation engine modules for seamless operational maintenance cycles.\nHigh-ambient cooling performance keeps rooms chilled even at high outside temperatures.\nMulti-stage filtration keeps incoming airflow clean and breathable.' 
WHERE id = 18;

-- 4. Turn Safe Update Mode back on
SET SQL_SAFE_UPDATES = 1;

-- 5. Test the query from your screenshot again — it will now turn green!
SELECT id, title, brand, price, mrp, star_rating, warranty, about_item 
FROM section_items 
WHERE id = 18;

USE amazon_clone;

-- Checks all 5 Air Conditioner records under the appliances section
SELECT 
    id, 
    section_id, 
    title, 
    image_url, 
    price, 
    mrp, 
    brand, 
    model, 
    colour, 
    star_rating, 
    item_weight, 
    warranty, 
    about_item 
FROM section_items 
WHERE section_id = 99;

USE amazon_clone;

-- 1. Turn off Safe Update Mode to modify the text rows cleanly
SET SQL_SAFE_UPDATES = 0;

-- 2. Update all 5 AC items under section 99 with the exact text from your screenshot
UPDATE section_items 
SET about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.' 
WHERE section_id = 99;

-- 3. Turn Safe Update Mode back on to protect your layout tables
SET SQL_SAFE_UPDATES = 1;

-- 4. Verify that all rows are updated perfectly without any remaining NULL values
SELECT id, title, price, mrp, about_item FROM section_items WHERE section_id = 99;



USE amazon_clone;

-- 1. Turn off Safe Update Mode to execute changes cleanly
SET SQL_SAFE_UPDATES = 0;

-- =========================================================================
-- 1. REFRIGERATOR CATEGORY - 5 PRODUCTS
-- =========================================================================
UPDATE section_items 
SET brand = 'Samsung', model = 'Samsung 256L 3', colour = 'Silver', star_rating = '4.2', item_weight = '52 kg', warranty = '1 Year Comprehensive + 5 Years on Compressor', price = 26990.00, mrp = 35087.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Samsung 256L%';

UPDATE section_items 
SET brand = 'LG', model = 'LG 242L Double Door', colour = 'Silver', star_rating = '4.3', item_weight = '54 kg', warranty = '1 Year Product + 10 Years on Smart Inverter Compressor', price = 25490.00, mrp = 32990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%LG 242L%';

UPDATE section_items 
SET brand = 'Whirlpool', model = 'Whirlpool 240L Triple', colour = 'German Steel', star_rating = '4.1', item_weight = '60 kg', warranty = '1 Year on Product + 10 Years on Compressor', price = 26990.00, mrp = 34990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Whirlpool 240L%';

UPDATE section_items 
SET brand = 'Haier', model = 'Haier 328L Bottom Mount', colour = 'Inox Steel', star_rating = '4.3', item_weight = '62 kg', warranty = '1 Year on Product + 10 Years on Motor', price = 33990.00, mrp = 44990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Haier 328L%';

UPDATE section_items 
SET brand = 'Godrej', model = 'Godrej 244L Inverter', colour = 'Steel Glow', star_rating = '4.0', item_weight = '50 kg', warranty = '1 Year Comprehensive + 10 Years Compressor Warranty', price = 23490.00, mrp = 29990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Godrej 244L%';


-- =========================================================================
-- 2. MICROWAVE OVEN CATEGORY - 5 PRODUCTS
-- =========================================================================
UPDATE section_items 
SET brand = 'Samsung', model = 'Samsung 23 L', colour = 'Silver', star_rating = '4.0', item_weight = '52 kg', warranty = '1 Year Comprehensive + 5 Years on Compressor', price = 7490.00, mrp = 9737.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Samsung 23 L%';

UPDATE section_items 
SET brand = 'IFB', model = 'IFB 20 L Convection', colour = 'Black', star_rating = '4.3', item_weight = '15 kg', warranty = '1 Year Machine + 3 Years on Magnetron', price = 10290.00, mrp = 13490.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%IFB 20 L%';

UPDATE section_items 
SET brand = 'Panasonic', model = 'Panasonic 20 L Solo', colour = 'Silver Black', star_rating = '4.2', item_weight = '12 kg', warranty = '1 Year Comprehensive Warranty on Product', price = 6290.00, mrp = 8200.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Panasonic 20 L%';

UPDATE section_items 
SET brand = 'Bajaj', model = 'Bajaj 17 L Solo', colour = 'White', star_rating = '4.1', item_weight = '11 kg', warranty = '1 Year on Product + 2 Years on Magnetron', price = 5199.00, mrp = 7000.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Bajaj 17 L%';

UPDATE section_items 
SET brand = 'LG', model = 'LG 28 L Convection', colour = 'Black Glow', star_rating = '4.4', item_weight = '18 kg', warranty = '1 Year Comprehensive + 4 Years on Magnetron', price = 12490.00, mrp = 16990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%LG 28 L%';


-- =========================================================================
-- 3. WASHING MACHINE CATEGORY - 5 PRODUCTS
-- =========================================================================
UPDATE section_items 
SET brand = 'Samsung', model = 'Samsung 7 kg', colour = 'Silver', star_rating = '4.5', item_weight = '52 kg', warranty = '1 Year Comprehensive + 5 Years on Compressor', price = 28990.00, mrp = 37687.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Samsung 7 kg%';

UPDATE section_items 
SET brand = 'LG', model = 'LG 8 kg Direct Drive', colour = 'Luxury Silver', star_rating = '4.6', item_weight = '65 kg', warranty = '2 Years Comprehensive + 10 Years on Motor', price = 32490.00, mrp = 41990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%LG 8 kg%';

UPDATE section_items 
SET brand = 'Whirlpool', model = 'Whirlpool 7.5 kg Front', colour = 'White Satin', star_rating = '4.2', item_weight = '62 kg', warranty = '2 Years on Product + 10 Years on Motor', price = 29990.00, mrp = 38000.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Whirlpool 7.5 kg%';

UPDATE section_items 
SET brand = 'Haier', model = 'Haier 8 kg Front Load', colour = 'Titanium Gray', star_rating = '4.4', item_weight = '64 kg', warranty = '3 Years Comprehensive + 12 Years on Motor', price = 30990.00, mrp = 39990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%Haier 8 kg%';

UPDATE section_items 
SET brand = 'IFB', model = 'IFB 7 kg AI Front', colour = 'Silver Glaze', star_rating = '4.5', item_weight = '66 kg', warranty = '4 Years Super Warranty + 10 Years Spare Support', price = 27490.00, mrp = 34990.00,
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE title LIKE '%IFB 7 kg%';

-- 2. Turn Safe Update Mode back on
SET SQL_SAFE_UPDATES = 1;

-- 3. Quick verification to confirm data is active
SELECT id, title, price, mrp, model FROM section_items WHERE price IS NOT NULL;


USE amazon_clone;

SELECT 
    id, 
    section_id, 
    title, 
    brand, 
    model, 
    colour, 
    star_rating, 
    item_weight, 
    warranty, 
    price, 
    mrp, 
    about_item, 
    image_url 
FROM section_items 
WHERE section_id = 99 
ORDER BY id ASC;

USE amazon_clone;

-- Displays all items across all categories sorted by their layout groupings
SELECT 
    si.id AS product_id, 
    si.section_id, 
    hs.title AS category_name, -- Joins the master section card title
    si.title AS product_title, 
    si.brand, 
    si.model, 
    si.colour, 
    si.star_rating, 
    si.price, 
    si.mrp, 
    si.image_url 
FROM section_items si
LEFT JOIN homepage_sections hs ON si.section_id = hs.id
ORDER BY si.section_id ASC, si.id ASC;

USE amazon_clone;

-- 1. Turn off Safe Update Mode to run global data modifications cleanly
SET SQL_SAFE_UPDATES = 0;

-- =========================================================================
-- STEP 1: FIX MISSING MRP VALUES FOR ALL PRODUCTS
-- Computes a realistic MRP automatically (Price * 1.3) where it is currently NULL
-- =========================================================================
UPDATE section_items 
SET mrp = ROUND(price * 1.3, 0)
WHERE mrp IS NULL AND price IS NOT NULL;


-- =========================================================================
-- STEP 2: FIX THE SECTION_ID CODES SO THEY ARE NO LONGER NULL
-- Maps your miscellaneous products back to their correct category layouts
-- =========================================================================

-- Apparel / Clothes Category (T-Shirts, Wear Sets, Shoes, etc.)
UPDATE section_items 
SET section_id = 4 
WHERE id IN (212, 213, 214) 
   OR title LIKE '%T-Shirt%' 
   OR title LIKE '%Wear Set%' 
   OR title LIKE '%Shoes%';

-- Beauty / Personal Care Category (Soap Bars, Face Wash, Cleanser, Serums)
UPDATE section_items 
SET section_id = 5 
WHERE id IN (215, 216, 217, 218) 
   OR title LIKE '%Soap%' 
   OR title LIKE '%Face Wash%' 
   OR title LIKE '%Cleanser%' 
   OR title LIKE '%Serums%';

-- Home Essentials / Kitchen Category (Garbage Bags, Weight Scale)
UPDATE section_items 
SET section_id = 3 
WHERE id IN (219, 220) 
   OR title LIKE '%Garbage Bags%' 
   OR title LIKE '%Weight Scale%';


-- =========================================================================
-- STEP 3: FILL IN ACCURATE BRAND & SPECIFICATION FIELDS FROM THE TITLE
-- Clean up fallback fields so the detail table looks pristine
-- =========================================================================

-- Fix Clothes details
UPDATE section_items SET brand = 'Zara Clone', model = 'Minimalist Edition', colour = 'White' WHERE id = 212;
UPDATE section_items SET brand = 'Kids Wear', model = 'Ethnic Festive Set', colour = 'Multicolor' WHERE id = 213;
UPDATE section_items SET brand = 'Puma Clone', model = 'Athletic Runner v2', colour = 'Grey' WHERE id = 214;

-- Fix Skincare / Beauty details
UPDATE section_items SET brand = 'Nivea Clone', model = 'Natural Organic Pack', colour = 'Transparent' WHERE id = 215;
UPDATE section_items SET brand = 'Cetaphil Clone', model = 'Refreshing Cleansing Gel', colour = 'Aqua' WHERE id = 216;
UPDATE section_items SET brand = 'The Derma Co', model = 'Gentle Skin Cleanser', colour = 'White Cream' WHERE id = 217;
UPDATE section_items SET brand = 'Ordinary Clone', model = 'Luxury Facial Protection Serum', colour = 'Clear' WHERE id = 218;

-- Fix Kitchen / Home Utilities details
UPDATE section_items SET brand = 'Prestige Clone', model = 'Stainless Steel Trash Bags', colour = 'Black' WHERE id = 219;
UPDATE section_items SET brand = 'HealthSense', model = 'Digital Electronic Scale', colour = 'Silver Glass' WHERE id = 220;


-- 2. Turn Safe Update Mode back on to secure your structures
SET SQL_SAFE_UPDATES = 1;

-- =========================================================================
-- STEP 4: AUDIT LOG VERIFICATION (Run this to confirm everything is fixed!)
-- =========================================================================
SELECT 
    si.id AS product_id, 
    si.section_id, 
    si.title AS product_title, 
    si.brand, 
    si.model, 
    si.colour, 
    si.price, 
    si.mrp 
FROM section_items si
WHERE si.id BETWEEN 212 AND 220;



USE amazon_clone;

-- 1. Insert the missing category IDs into the parent table first
INSERT INTO homepage_sections (id, title) 
VALUES 
    (3, 'Home Utilities & Essentials')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO homepage_sections (id, title) 
VALUES 
    (4, 'Apparel & Fashion Wear')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO homepage_sections (id, title) 
VALUES 
    (5, 'Beauty & Personal Care')
ON DUPLICATE KEY UPDATE title = VALUES(title);


-- 2. Turn off Safe Update Mode to run your updates again
SET SQL_SAFE_UPDATES = 0;

-- 3. Now re-run the product updates — they will succeed perfectly!
UPDATE section_items 
SET section_id = 4 
WHERE id IN (212, 213, 214) OR title LIKE '%T-Shirt%' OR title LIKE '%Wear Set%' OR title LIKE '%Shoes%';

UPDATE section_items 
SET section_id = 5 
WHERE id IN (215, 216, 217, 218) OR title LIKE '%Soap%' OR title LIKE '%Face Wash%' OR title LIKE '%Cleanser%' OR title LIKE '%Serums%';

UPDATE section_items 
SET section_id = 3 
WHERE id IN (219, 220) OR title LIKE '%Garbage Bags%' OR title LIKE '%Weight Scale%';


-- 4. Clean up pricing, MRP, and custom details
UPDATE section_items SET mrp = ROUND(price * 1.3, 0) WHERE mrp IS NULL AND price IS NOT NULL;
UPDATE section_items SET brand = 'Zara Clone', model = 'Minimalist Edition', colour = 'White' WHERE id = 212;
UPDATE section_items SET brand = 'Kids Wear', model = 'Ethnic Festive Set', colour = 'Multicolor' WHERE id = 213;
UPDATE section_items SET brand = 'Puma Clone', model = 'Athletic Runner v2', colour = 'Grey' WHERE id = 214;
UPDATE section_items SET brand = 'Nivea Clone', model = 'Natural Organic Pack', colour = 'Transparent' WHERE id = 215;
UPDATE section_items SET brand = 'Cetaphil Clone', model = 'Refreshing Cleansing Gel', colour = 'Aqua' WHERE id = 216;
UPDATE section_items SET brand = 'The Derma Co', model = 'Gentle Skin Cleanser', colour = 'White Cream' WHERE id = 217;
UPDATE section_items SET brand = 'Ordinary Clone', model = 'Luxury Facial Protection Serum', colour = 'Clear' WHERE id = 218;
UPDATE section_items SET brand = 'Prestige Clone', model = 'Stainless Steel Trash Bags', colour = 'Black' WHERE id = 219;
UPDATE section_items SET brand = 'HealthSense', model = 'Digital Electronic Scale', colour = 'Silver Glass' WHERE id = 220;

-- 5. Turn Safe Update Mode back on
SET SQL_SAFE_UPDATES = 1;



USE amazon_clone;

-- 1. Insert the missing categories with the mandatory 'link_text' field included
INSERT INTO homepage_sections (id, title, link_text) 
VALUES 
    (3, 'Home Utilities & Essentials', 'See all offers'),
    (4, 'Apparel & Fashion Wear', 'Explore more'),
    (5, 'Beauty & Personal Care', 'Shop now')
ON DUPLICATE KEY UPDATE 
    title = VALUES(title),
    link_text = VALUES(link_text);


-- 2. Turn off Safe Update Mode to run your updates cleanly
SET SQL_SAFE_UPDATES = 0;

-- 3. Now map your products to their new category parent codes
UPDATE section_items 
SET section_id = 4 
WHERE id IN (212, 213, 214) OR title LIKE '%T-Shirt%' OR title LIKE '%Wear Set%' OR title LIKE '%Shoes%';

UPDATE section_items 
SET section_id = 5 
WHERE id IN (215, 216, 217, 218) OR title LIKE '%Soap%' OR title LIKE '%Face Wash%' OR title LIKE '%Cleanser%' OR title LIKE '%Serums%';

UPDATE section_items 
SET section_id = 3 
WHERE id IN (219, 220) OR title LIKE '%Garbage Bags%' OR title LIKE '%Weight Scale%';


-- 4. Clean up pricing, MRP math, and custom specifications details
UPDATE section_items SET mrp = ROUND(price * 1.3, 0) WHERE mrp IS NULL AND price IS NOT NULL;
UPDATE section_items SET brand = 'Zara Clone', model = 'Minimalist Edition', colour = 'White' WHERE id = 212;
UPDATE section_items SET brand = 'Kids Wear', model = 'Ethnic Festive Set', colour = 'Multicolor' WHERE id = 213;
UPDATE section_items SET brand = 'Puma Clone', model = 'Athletic Runner v2', colour = 'Grey' WHERE id = 214;
UPDATE section_items SET brand = 'Nivea Clone', model = 'Natural Organic Pack', colour = 'Transparent' WHERE id = 215;
UPDATE section_items SET brand = 'Cetaphil Clone', model = 'Refreshing Cleansing Gel', colour = 'Aqua' WHERE id = 216;
UPDATE section_items SET brand = 'The Derma Co', model = 'Gentle Skin Cleanser', colour = 'White Cream' WHERE id = 217;
UPDATE section_items SET brand = 'Ordinary Clone', model = 'Luxury Facial Protection Serum', colour = 'Clear' WHERE id = 218;
UPDATE section_items SET brand = 'Prestige Clone', model = 'Stainless Steel Trash Bags', colour = 'Black' WHERE id = 219;
UPDATE section_items SET brand = 'HealthSense', model = 'Digital Electronic Scale', colour = 'Silver Glass' WHERE id = 220;

-- 5. Restore Safe Update Mode protection configuration
SET SQL_SAFE_UPDATES = 1;

-- 6. Audit verification check: rows 212 through 220 will now display beautifully!
SELECT id, section_id, title, price, mrp FROM section_items WHERE id BETWEEN 212 AND 220;


USE amazon_clone;

-- 1. Turn off Safe Update Mode to run clean mass data fixes
SET SQL_SAFE_UPDATES = 0;

-- =========================================================================
-- STEP 1: ASSIGN SECTION_ID = 99 TO ALL APPLIANCES THAT ARE NULL
-- =========================================================================
UPDATE section_items 
SET section_id = 99 
WHERE section_id IS NULL 
  AND (title LIKE '%Microwave%' 
       OR title LIKE '%Oven%' 
       OR title LIKE '%Refrigerator%' 
       OR title LIKE '%Washing Machine%'
       OR title LIKE '%Split AC%'
       OR title LIKE '%Voltas%'
       OR title LIKE '%Hitachi%');


-- =========================================================================
-- STEP 2: ASSIGN SPECIFICATIONS & PRICING TO THE APPLIANCES EXTRACTED ABOVE
-- =========================================================================

-- Fix any remaining Microwave Ovens (IFB, Panasonic, Bajaj, LG)
UPDATE section_items 
SET brand = 'Appliances Store', model = 'Convection Series', colour = 'Black/Silver', star_rating = '4.2', item_weight = '14 kg', warranty = '1 Year Product Warranty',
    price = COALESCE(price, 8490.00), mrp = COALESCE(mrp, 11990.00),
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE section_id = 99 AND (title LIKE '%Microwave%' OR title LIKE '%Oven%') AND (brand IS NULL OR price IS NULL);

-- Fix any remaining Washing Machines
UPDATE section_items 
SET brand = 'Appliances Store', model = 'Automatic Series', colour = 'Silver Gray', star_rating = '4.4', item_weight = '60 kg', warranty = '2 Years Comprehensive Motor Warranty',
    price = COALESCE(price, 24990.00), mrp = COALESCE(mrp, 32990.00),
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE section_id = 99 AND title LIKE '%Washing Machine%' AND (brand IS NULL OR price IS NULL);

-- Fix any remaining Refrigerators
UPDATE section_items 
SET brand = 'Appliances Store', model = 'Inverter Series', colour = 'Silver Metal', star_rating = '3 Star', item_weight = '55 kg', warranty = '1 Year Product + 10 Years Compressor Warranty',
    price = COALESCE(price, 25990.00), mrp = COALESCE(mrp, 34990.00),
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE section_id = 99 AND title LIKE '%Refrigerator%' AND (brand IS NULL OR price IS NULL);


-- =========================================================================
-- STEP 3: CATCH-ALL SAFETY NET FOR EXTRA MISCELLANEOUS NULL PRICES
-- Ensures absolutely NO row has a NULL price/mrp calculation layout
-- =========================================================================
UPDATE section_items 
SET price = 499.00 WHERE price IS NULL;

UPDATE section_items 
SET mrp = ROUND(price * 1.3, 0) WHERE mrp IS NULL;


-- 2. Turn Safe Update Mode back on to protect your records
SET SQL_SAFE_UPDATES = 1;

-- =========================================================================
-- STEP 4: VERIFY RESULTS GRID
-- =========================================================================
SELECT 
    si.id AS product_id, 
    si.section_id, 
    hs.title AS category_name, 
    si.title AS product_title, 
    si.price, 
    si.mrp 
FROM section_items si
LEFT JOIN homepage_sections hs ON si.section_id = hs.id
WHERE si.section_id = 99;


USE amazon_clone;

-- Displays all items across all categories sorted by their layout groupings
SELECT 
    si.id AS product_id, 
    si.section_id, 
    hs.title AS category_name, -- Joins the master section card title
    si.title AS product_title, 
    si.brand, 
    si.model, 
    si.colour, 
    si.star_rating, 
    si.price, 
    si.mrp, 
    si.image_url 
FROM section_items si
LEFT JOIN homepage_sections hs ON si.section_id = hs.id
ORDER BY si.section_id ASC, si.id ASC;

USE amazon_clone;

-- 1. Turn off Safe Update Mode to run clean mass data fixes
SET SQL_SAFE_UPDATES = 0;

-- =========================================================================
-- STEP 1: CATCH REMAINING APPLIANCES USING BROADER KEYWORDS
-- Maps any remaining appliance rows to section_id 99
-- =========================================================================
UPDATE section_items 
SET section_id = 99 
WHERE section_id IS NULL 
  AND (title LIKE '%Oven%' 
       OR title LIKE '%Fridge%' 
       OR title LIKE '%Machine%'
       OR title LIKE '%Cooler%'
       OR title LIKE '%Panasonic%'
       OR title LIKE '%IFB%'
       OR title LIKE '%Bajaj%'
       OR title LIKE '%LG%'
       OR title LIKE '%Samsung%');

-- =========================================================================
-- STEP 2: CLEAN UP PRICING AND LAYOUT MATH GAPS
-- Automatically assigns realistic prices and calculations if they are still blank
-- =========================================================================

-- Set default product metadata details if missing
UPDATE section_items 
SET brand = 'Premium Brand', 
    model = 'Smart Series Edition', 
    colour = 'Silver Satin', 
    star_rating = '4.1', 
    item_weight = '35 kg', 
    warranty = '1 Year Standard Warranty',
    about_item = 'Energy efficient rating metric architecture built for performance delivery profiles.\nFrost-free operation system configurations wrapper for operational longevity optimization.\nPrisinte interior airflow mechanics cycle keeps temperature thresholds steady.'
WHERE section_id = 99 AND (brand IS NULL OR model IS NULL OR about_item IS NULL);

-- Fallback to populate any remaining empty price and MRP configurations
UPDATE section_items 



SET price = 12490.00 
WHERE price IS NULL AND section_id = 99;

UPDATE section_items 
SET mrp = ROUND(price * 1.3, 0) 
WHERE mrp IS NULL;


-- 3. Turn Safe Update Mode back on to secure your structures
SET SQL_SAFE_UPDATES = 1;

-- =========================================================================
-- STEP 3: AUDIT CHECK VERIFICATION
-- =========================================================================
SELECT 
    si.id AS product_id, 
    si.section_id, 
    hs.title AS category_name, 
    si.title AS product_title, 
    si.price, 
    si.mrp 
FROM section_items si
LEFT JOIN homepage_sections hs ON si.section_id = hs.id
WHERE si.section_id = 99;

USE amazon_clone;

-- 1. Turn off Safe Update Mode to run clean data modifications
SET SQL_SAFE_UPDATES = 0;

-- =========================================================================
-- FIX PRODUCT ID 221: Insulated Sports Gym Water Bottle
-- =========================================================================
UPDATE section_items 
SET 
    section_id = 3, -- Maps to Home Utilities & Essentials
    brand = 'Milton Clone',
    model = 'Stainless Steel Sports Edition',
    colour = 'Matte Silver',
    star_rating = '4.2',
    item_weight = '450 g',
    warranty = '6 Months Warranty',
    about_item = 'Double-walled vacuum insulation keeps beverages cold for up to 24 hours.\nPremium BPA-free stainless steel prevents rust and metallic aftertaste.\nLeak-proof sports cap design with a durable carrying loop for gym use.'
WHERE id = 221;

-- =========================================================================
-- FIX PRODUCT ID 222: Premium Silver Kitchen Utensils Set
-- =========================================================================
UPDATE section_items 
SET 
    section_id = 3, -- Maps to Home Utilities & Essentials
    brand = 'Prestige Clone',
    model = 'Non-Stick Cooking Ladles Pack',
    colour = 'Silver/Black',
    star_rating = '4.3',
    item_weight = '1.2 kg',
    warranty = '1 Year Manufacturing Warranty',
    about_item = 'Complete multi-piece culinary setup including soup spoon, spatula, and skimmer.\nHeat-resistant ergonomic handles provide a comfortable, non-slip grip.\nFood-grade premium steel structure is dishwasher safe and highly durable.'
WHERE id = 222;


-- 2. Turn Safe Update Mode back on to protect your records
SET SQL_SAFE_UPDATES = 1;

-- =========================================================================
-- STEP 3: RUN YOUR VERIFICATION LOG
-- =========================================================================
SELECT 
    si.id AS product_id, 
    si.section_id, 
    hs.title AS category_name, 
    si.title AS product_title, 
    si.brand,
    si.model,
    si.price, 
    si.mrp 
FROM section_items si
LEFT JOIN homepage_sections hs ON si.section_id = hs.id
WHERE si.id IN (221, 222);

USE amazon_clone;

-- 1. Create Air Conditioners Table
CREATE TABLE IF NOT EXISTS air_conditioners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    brand VARCHAR(100),
    model VARCHAR(255),
    colour VARCHAR(100),
    star_rating VARCHAR(50),
    item_weight VARCHAR(100),
    warranty VARCHAR(255),
    price DECIMAL(10,2),
    mrp DECIMAL(10,2),
    about_item TEXT
);

-- 2. Create Refrigerators Table
CREATE TABLE IF NOT EXISTS refrigerators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    brand VARCHAR(100),
    model VARCHAR(255),
    colour VARCHAR(100),
    star_rating VARCHAR(50),
    item_weight VARCHAR(100),
    warranty VARCHAR(255),
    price DECIMAL(10,2),
    mrp DECIMAL(10,2),
    about_item TEXT
);

-- 3. Create Microwave Ovens Table
CREATE TABLE IF NOT EXISTS microwaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    brand VARCHAR(100),
    model VARCHAR(255),
    colour VARCHAR(100),
    star_rating VARCHAR(50),
    item_weight VARCHAR(100),
    warranty VARCHAR(255),
    price DECIMAL(10,2),
    mrp DECIMAL(10,2),
    about_item TEXT
);

-- 4. Create Washing Machines Table
CREATE TABLE IF NOT EXISTS washing_machines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    brand VARCHAR(100),
    model VARCHAR(255),
    colour VARCHAR(100),
    star_rating VARCHAR(50),
    item_weight VARCHAR(100),
    warranty VARCHAR(255),
    price DECIMAL(10,2),
    mrp DECIMAL(10,2),
    about_item TEXT
);



-- Move ACs (Assuming they were section_id = 99 or identified by titles)
INSERT INTO air_conditioners (title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item)
SELECT title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item
FROM section_items WHERE title LIKE '%Vectra%' OR title LIKE '%Hitachi%';

-- Move Refrigerators
INSERT INTO refrigerators (title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item)
SELECT title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item
FROM section_items WHERE title LIKE '%Refrigerator%';

-- Move Microwaves
INSERT INTO microwaves (title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item)
SELECT title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item
FROM section_items WHERE title LIKE '%Microwave%' OR title LIKE '%Oven%';

-- Move Washing Machines
INSERT INTO washing_machines (title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item)
SELECT title, image_url, brand, model, colour, star_rating, item_weight, warranty, price, mrp, about_item
FROM section_items WHERE title LIKE '%Washing Machine%';