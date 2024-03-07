-- Sample data for 'user' table
INSERT INTO `user` (`username`, `email`, `role_id`, `first_name`, `last_name`, `gender`, `date_of_birth`, `profile_pictureUrl`, `createdAt`, `updatedAt`) 
VALUES
('john_doe', 'john@example.com', 1, 'John', 'Doe', 'Male', '1990-05-15', 'https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg', NOW(), NOW()),
('jane_smith', 'jane@example.com', 2, 'Jane', 'Smith', 'Female', '1988-09-21', 'https://images.assetsdelivery.com/compings_v2/fizkes/fizkes2011/fizkes201102042.jpg', NOW(), NOW()),
('mike_jones', 'mike@example.com', 1, 'Mike', 'Jones', 'Male', '1995-12-03', 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.jpg?b=1&s=612x612&w=0&k=20&c=dJPY0jBIe4JGgzN9ijZMrBRnvpx02_YZfc3T7hB-K9Q=', NOW(), NOW()),
('sara_adams', 'sara@example.com', 2, 'Sara', 'Adams', 'Female', '1985-03-28', 'https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.jpg?b=1&s=612x612&w=0&k=20&c=A5kpiV_WrshURTPtn3pGoMMZq8SiknQZ8ZIJyXcBCsM=', NOW(), NOW()),
('chris_brown', 'chris@example.com', 1, 'Chris', 'Brown', 'Male', '1982-07-12', 'https://cyberpersons.com/wp-content/uploads/2020/07/pexels-photo-220453.jpeg', NOW(), NOW()),
('emily_wilson', 'emily@example.com', 2, 'Emily', 'Wilson', 'Female', '1998-11-17', 'https://media.istockphoto.com/id/1305462732/photo/headshot-studio-portrait-of-a-woman-in-profile-looking-at-the-camera.webp?b=1&s=170667a&w=0&k=20&c=0AXRV3wA2u6gi3ccQcnQ4ISs7m-WMk3icBA6IlLwH34=', NOW(), NOW()),
('alex_robinson', 'alex@example.com', 1, 'Alex', 'Robinson', 'Male', '1977-09-05', 'https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg', NOW(), NOW()),
('lisa_jackson', 'lisa@example.com', 2, 'Lisa', 'Jackson', 'Female', '1970-12-30', 'https://scholarships360.org/wp-content/uploads/2023/05/1000-No-Essay-1.png', NOW(), NOW()),
('ryan_taylor', 'ryan@example.com', 1, 'Ryan', 'Taylor', 'Male', '1993-04-09', 'https://assets-global.website-files.com/5ee8ad43cc806482b6268d59/5f0866626672d1001b6ba1f4_StockProfile%20male.jpg', NOW(), NOW()),
('kate_miller', 'kate@example.com', 2, 'Kate', 'Miller', 'Female', '1996-08-22', 'https://media.istockphoto.com/id/1485052530/photo/portrait-fashion-and-braids-with-a-black-woman-on-an-orange-background-outdoor-for-style-or.jpg?b=1&s=612x612&w=0&k=20&c=nnnQ8OczstGhlEpL3cBwcaCstRZY4g0s3pDsbXyZs7M=', NOW(), NOW());

-- Sample data for 'address' table
INSERT INTO `address` (`user_id`, `street_address`, `city`, `state`, `zip_code`, `country`, `createdAt`, `updatedAt`) 
VALUES
(1, '123 Main St', 'New York', 'NY', '10001', 'USA', NOW(), NOW()),
(2, '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA', NOW(), NOW()),
(3, '789 Elm St', 'Chicago', 'IL', '60601', 'USA', NOW(), NOW()),
(4, '101 Pine St', 'Houston', 'TX', '77001', 'USA', NOW(), NOW()),
(5, '202 Maple Ave', 'Philadelphia', 'PA', '19101', 'USA', NOW(), NOW()),
(6, '303 Cedar St', 'Phoenix', 'AZ', '85001', 'USA', NOW(), NOW()),
(7, '404 Walnut St', 'San Antonio', 'TX', '78201', 'USA', NOW(), NOW()),
(8, '505 Birch Ave', 'San Diego', 'CA', '92101', 'USA', NOW(), NOW()),
(9, '606 Cherry St', 'Dallas', 'TX', '75201', 'USA', NOW(), NOW()),
(10, '707 Spruce Ave', 'San Francisco', 'CA', '94101', 'USA', NOW(), NOW());

-- Sample data for 'category' table (only fashion category)
INSERT INTO `category` (`category_id`, `category_name`, `createdAt`, `updatedAt`) 
VALUES
(1, 'Clothing', NOW(), NOW()),
(2, 'Shoes', NOW(), NOW()),
(3, 'Accessories', NOW(), NOW());

-- Sample data for 'sellpost' table (only fashion sellposts)
INSERT INTO `sellpost` (`seller_id`, `item_name`, `description`, `price`, `quantity`, `size`, `gender`, `color`, `brand`, `condition`, `createdAt`, `updatedAt`,`picUrl`) 
VALUES
(1, 'T-Shirt', 'Blue cotton T-Shirt', 15.99, 100, 'M', 'Male', 'Blue', 'Represent', 'New', NOW(), NOW(),'https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/https://representclo.com/cdn/shop/products/SCALED__0037_blueOCfront.jpg?v=1685533911&width=1280'),
(2, 'Sneakers', 'Running shoes', 59.99, 50, '10', 'Male', 'White', 'Adidas', 'New', NOW(), NOW(),'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg'),
(3, 'Handbag', 'Leather handbag', 89.50, 30, NULL, NULL, 'Brown', 'Gucci', 'New', NOW(), NOW(),'https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1677774652/672206_10ODT_2579_010_065_0000_Light-Gucci-Bamboo-1947-medium-top-handle-bag.jpg'),
(4, 'Dress', 'Evening dress', 129.99, 20, 'S', 'Female', 'Black', 'Calvin Klein', 'New', NOW(), NOW(),'https://calvinklein.scene7.com/is/image/CalvinKlein/18488060_001_main?wid=1500&hei=1976&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp'),
(5, 'Jeans', 'Slim-fit jeans', 49.99, 40, '32', 'Male', 'Denim', "Levi's", 'New', NOW(), NOW(),'https://lsco.scene7.com/is/image/lsco/015504886-front-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=880&hei=968'),
(6, 'Earrings', 'Gold hoop earrings', 29.99, 100, NULL, NULL, 'Gold', 'Tiffany & Co.', 'New', NOW(), NOW(),'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearextra-large-link-earrings-38087983_987052_ED.jpg'),
(7, 'Hat', 'Straw hat', 19.99, 80, NULL, NULL, 'Beige', 'Ralph Lauren', 'New', NOW(), NOW(), 'https://dimg.dillards.com/is/image/DillardsZoom/zoom/polo-ralph-lauren-big--tall-chino-bucket-hat/00000000_zi_63408770-29a7-4897-8edd-28ec9aebeba1.jpg'),
(8, 'Sunglasses', 'Polarized sunglasses', 79.99, 60, NULL, NULL, 'Black', 'Ray-Ban', 'New', NOW(), NOW(),'https://images2.ray-ban.com//cdn-record-files-pi/785cd2a8-5933-4d14-b145-a35800039b33/f150fe44-f372-4f0e-add9-b01300c1c1b9/0RB2140__901__P21__shad__qt.png?impolicy=RB_Product_clone&width=1024&bgc=%23f2f2f2'),
(9, 'Scarf', 'Cashmere scarf', 39.99, 50, NULL, NULL, 'Red', 'Burberry', 'New', NOW(), NOW(),'https://assets.burberry.com/is/image/Burberryltd/A539A9B1-DE81-4F9D-B41B-5055319CEB4F?$BBY_V3_SL_1$&wid=2500&hei=2500'),
(10, 'Suit', 'Business suit', 299.99, 10, '40R', 'Male', 'Navy', 'Hugo Boss', 'New', NOW(), NOW(), 'https://cdn.shopify.com/s/files/1/1025/3059/products/NAVY_BLUE_SUIT__075_0ba78598-6c22-4024-820e-019a5fdb109a_900x1250_crop_center.jpg?v=1643118883');

-- Sample data for 'sellpostcategory' table (linking fashion sellposts with fashion categories)
INSERT INTO `sellpostcategory` (`category_id`, `sellpost_id`, `createdAt`, `updatedAt`) 
VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(1, 4, NOW(), NOW()),
(1, 5, NOW(), NOW()),
(3, 6, NOW(), NOW()),
(2, 7, NOW(), NOW()),
(3, 8, NOW(), NOW()),
(1, 9, NOW(), NOW()),
(1, 10, NOW(), NOW());
-- Sample data for 'order' table
INSERT INTO `order` (`seller_id`, `buyer_id`, `sellpost_id`, `quantity`, `total_price`, `order_shipping_state`, `shipping_address_id`, `createdAt`, `updatedAt`) 
VALUES
(1, 2, 1, 2, 31.98, 'Shipped', 1, NOW(), NOW()),
(2, 3, 2, 1, 59.99, 'Pending', 2, NOW(), NOW()),
(3, 4, 3, 1, 89.50, 'Pending', 3, NOW(), NOW()),
(4, 5, 4, 1, 129.99, 'Pending', 4, NOW(), NOW()),
(5, 6, 5, 2, 99.98, 'Pending', 5, NOW(), NOW()),
(6, 7, 6, 1, 29.99, 'Pending', 6, NOW(), NOW()),
(7, 8, 7, 3, 59.97, 'Pending', 7, NOW(), NOW()),
(8, 9, 8, 2, 159.98, 'Pending', 8, NOW(), NOW()),
(9, 10, 9, 1, 39.99, 'Pending', 9, NOW(), NOW()),
(10, 1, 10, 1, 299.99, 'Pending', 10, NOW(), NOW());