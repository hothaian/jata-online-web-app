"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();

    try {

      const usersData = [
        { username: 'Phu Tin', email: 'huutinphu@gmail.com', role_id: 1, first_name: 'John', last_name: 'Doe', gender: 'Male', date_of_birth: '1990-05-15', profile_pictureUrl: 'https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg', createdAt: currentDate, updatedAt: currentDate },
        { username: 'jane_smith', email: 'jane@example.com', role_id: 2, first_name: 'Jane', last_name: 'Smith', gender: 'Female', date_of_birth: '1988-09-21', profile_pictureUrl: 'https://images.assetsdelivery.com/compings_v2/fizkes/fizkes2011/fizkes201102042.jpg', createdAt: currentDate, updatedAt: currentDate },
        { username: 'mike_jones', email: 'mike@example.com', role_id: 1, first_name: 'Mike', last_name: 'Jones', gender: 'Male', date_of_birth: '1995-12-03', profile_pictureUrl: 'https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.jpg?b=1&s=612x612&w=0&k=20&c=dJPY0jBIe4JGgzN9ijZMrBRnvpx02_YZfc3T7hB-K9Q=', createdAt: currentDate, updatedAt: currentDate },
        { username: 'sara_adams', email: 'sara@example.com', role_id: 2, first_name: 'Sara', last_name: 'Adams', gender: 'Female', date_of_birth: '1985-03-28', profile_pictureUrl: 'https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.jpg?b=1&s=612x612&w=0&k=20&c=A5kpiV_WrshURTPtn3pGoMMZq8SiknQZ8ZIJyXcBCsM=', createdAt: currentDate, updatedAt: currentDate },
        { username: 'chris_brown', email: 'chris@example.com', role_id: 1, first_name: 'Chris', last_name: 'Brown', gender: 'Male', date_of_birth: '1982-07-12', profile_pictureUrl: 'https://cyberpersons.com/wp-content/uploads/2020/07/pexels-photo-220453.jpeg', createdAt: currentDate, updatedAt: currentDate },
        { username: 'emily_wilson', email: 'emily@example.com', role_id: 2, first_name: 'Emily', last_name: 'Wilson', gender: 'Female', date_of_birth: '1998-11-17', profile_pictureUrl: 'https://media.istockphoto.com/id/1305462732/photo/headshot-studio-portrait-of-a-woman-in-profile-looking-at-the-camera.webp?b=1&s=170667a&w=0&k=20&c=0AXRV3wA2u6gi3ccQcnQ4ISs7m-WMk3icBA6IlLwH34=', createdAt: currentDate, updatedAt: currentDate },
        { username: 'alex_robinson', email: 'alex@example.com', role_id: 1, first_name: 'Alex', last_name: 'Robinson', gender: 'Male', date_of_birth: '1977-09-05', profile_pictureUrl: 'https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg', createdAt: currentDate, updatedAt: currentDate },
        { username: 'lisa_jackson', email: 'lisa@example.com', role_id: 2, first_name: 'Lisa', last_name: 'Jackson', gender: 'Female', date_of_birth: '1970-12-30', profile_pictureUrl: 'https://scholarships360.org/wp-content/uploads/2023/05/1000-No-Essay-1.png', createdAt: currentDate, updatedAt: currentDate },
        { username: 'ryan_taylor', email: 'ryan@example.com', role_id: 1, first_name: 'Ryan', last_name: 'Taylor', gender: 'Male', date_of_birth: '1993-04-09', profile_pictureUrl: 'https://assets-global.website-files.com/5ee8ad43cc806482b6268d59/5f0866626672d1001b6ba1f4_StockProfile%20male.jpg', createdAt: currentDate, updatedAt: currentDate },
        { username: 'kate_miller', email: 'kate@example.com', role_id: 2, first_name: 'Kate', last_name: 'Miller', gender: 'Female', date_of_birth: '1996-08-22', profile_pictureUrl: 'https://media.istockphoto.com/id/1485052530/photo/portrait-fashion-and-braids-with-a-black-woman-on-an-orange-background-outdoor-for-style-or.jpg?b=1&s=612x612&w=0&k=20&c=nnnQ8OczstGhlEpL3cBwcaCstRZY4g0s3pDsbXyZs7M=', createdAt: currentDate, updatedAt: currentDate }
      ];
  
      const addressesData = [
        {
          user_id: 1,
          street_address: "123 Main St",
          city: "New York",
          state: "NY",
          zip_code: "10001",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 2,
          street_address: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          zip_code: "90001",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 3,
          street_address: "789 Elm St",
          city: "Chicago",
          state: "IL",
          zip_code: "60601",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 4,
          street_address: "101 Pine St",
          city: "Houston",
          state: "TX",
          zip_code: "77001",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 5,
          street_address: "202 Maple Ave",
          city: "Philadelphia",
          state: "PA",
          zip_code: "19101",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 6,
          street_address: "303 Cedar St",
          city: "Phoenix",
          state: "AZ",
          zip_code: "85001",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 7,
          street_address: "404 Walnut St",
          city: "San Antonio",
          state: "TX",
          zip_code: "78201",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 8,
          street_address: "505 Birch Ave",
          city: "San Diego",
          state: "CA",
          zip_code: "92101",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 9,
          street_address: "606 Cherry St",
          city: "Dallas",
          state: "TX",
          zip_code: "75201",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          user_id: 10,
          street_address: "707 Spruce Ave",
          city: "San Francisco",
          state: "CA",
          zip_code: "94101",
          country: "USA",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      ];

      const categoriesData = [
        {
          category_name: "Clothing",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          category_name: "Shoes",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          category_name: "Accessories",
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      ];

      const sellpostsData = [
        { seller_id: 1, item_name: 'T-Shirt', description: 'Blue cotton T-Shirt', price: 15.99, quantity: 100, size: 'M', gender: 'Male', color: 'Blue', brand: 'Represent', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/https://representclo.com/cdn/shop/products/SCALED__0037_blueOCfront.jpg?v=1685533911&width=1280' },
        { seller_id: 2, item_name: 'Sneakers', description: 'Running shoes', price: 59.99, quantity: 50, size: '10', gender: 'Male', color: 'White', brand: 'Adidas', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg' },
        { seller_id: 3, item_name: 'Handbag', description: 'Leather handbag', price: 89.50, quantity: 30, color: 'Brown', brand: 'Gucci', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1677774652/672206_10ODT_2579_010_065_0000_Light-Gucci-Bamboo-1947-medium-top-handle-bag.jpg' },
        { seller_id: 4, item_name: 'Dress', description: 'Evening dress', price: 129.99, quantity: 20, size: 'S', gender: 'Female', color: 'Black', brand: 'Calvin Klein', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://calvinklein.scene7.com/is/image/CalvinKlein/18488060_001_main?wid=1500&hei=1976&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp' },
        { seller_id: 5, item_name: 'Jeans', description: 'Slim-fit jeans', price: 49.99, quantity: 40, size: '32', gender: 'Male', color: 'Denim', brand: 'Levi\'s', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://lsco.scene7.com/is/image/lsco/015504886-front-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=880&hei=968' },
        { seller_id: 6, item_name: 'Earrings', description: 'Gold hoop earrings', price: 29.99, quantity: 100, color: 'Gold', brand: 'Tiffany & Co.', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearextra-large-link-earrings-38087983_987052_ED.jpg' },
        { seller_id: 7, item_name: 'Hat', description: 'Straw hat', price: 19.99, quantity: 80, color: 'Beige', brand: 'Ralph Lauren', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://dimg.dillards.com/is/image/DillardsZoom/zoom/polo-ralph-lauren-big--tall-chino-bucket-hat/00000000_zi_63408770-29a7-4897-8edd-28ec9aebeba1.jpg' },
        { seller_id: 8, item_name: 'Sunglasses', description: 'Polarized sunglasses', price: 79.99, quantity: 60, color: 'Black', brand: 'Ray-Ban', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://images2.ray-ban.com//cdn-record-files-pi/785cd2a8-5933-4d14-b145-a35800039b33/f150fe44-f372-4f0e-add9-b01300c1c1b9/0RB2140__901__P21__shad__qt.png?impolicy=RB_Product_clone&width=1024&bgc=%23f2f2f2' },
        { seller_id: 9, item_name: 'Scarf', description: 'Cashmere scarf', price: 39.99, quantity: 50, color: 'Red', brand: 'Burberry', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://assets.burberry.com/is/image/Burberryltd/A539A9B1-DE81-4F9D-B41B-5055319CEB4F?$BBY_V3_SL_1$&wid=2500&hei=2500' },
        { seller_id: 10, item_name: 'Suit', description: 'Business suit', price: 299.99, quantity: 10, size: '40R', gender: 'Male', color: 'Navy', brand: 'Hugo Boss', condition: 'New', createdAt: currentDate, updatedAt: currentDate, picUrl: 'https://cdn.shopify.com/s/files/1/1025/3059/products/NAVY_BLUE_SUIT__075_0ba78598-6c22-4024-820e-019a5fdb109a_900x1250_crop_center.jpg?v=1643118883' }
      ];

      const sellpostCategoriesData = [
        { category_id: 1, sellpost_id: 1, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 2, sellpost_id: 2, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 3, sellpost_id: 3, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 1, sellpost_id: 4, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 1, sellpost_id: 5, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 3, sellpost_id: 6, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 2, sellpost_id: 7, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 3, sellpost_id: 8, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 1, sellpost_id: 9, createdAt: currentDate, updatedAt: currentDate },
        { category_id: 1, sellpost_id: 10, createdAt: currentDate, updatedAt: currentDate }
      ];

            
      const ordersData = [
        { seller_id: 1, buyer_id: 2, sellpost_id: 1, quantity: 2, total_price: 31.98, order_shipping_state: 'Shipped', shipping_address_id: 1, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 2, buyer_id: 3, sellpost_id: 2, quantity: 1, total_price: 59.99, order_shipping_state: 'Pending', shipping_address_id: 2, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 3, buyer_id: 4, sellpost_id: 3, quantity: 1, total_price: 89.50, order_shipping_state: 'Pending', shipping_address_id: 3, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 4, buyer_id: 5, sellpost_id: 4, quantity: 1, total_price: 129.99, order_shipping_state: 'Pending', shipping_address_id: 4, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 5, buyer_id: 6, sellpost_id: 5, quantity: 2, total_price: 99.98, order_shipping_state: 'Pending', shipping_address_id: 5, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 6, buyer_id: 7, sellpost_id: 6, quantity: 1, total_price: 29.99, order_shipping_state: 'Pending', shipping_address_id: 6, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 7, buyer_id: 8, sellpost_id: 7, quantity: 3, total_price: 59.97, order_shipping_state: 'Pending', shipping_address_id: 7, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 8, buyer_id: 9, sellpost_id: 8, quantity: 2, total_price: 159.98, order_shipping_state: 'Pending', shipping_address_id: 8, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 9, buyer_id: 10, sellpost_id: 9, quantity: 1, total_price: 39.99, order_shipping_state: 'Pending', shipping_address_id: 9, createdAt: currentDate, updatedAt: currentDate },
        { seller_id: 10, buyer_id: 1, sellpost_id: 10, quantity: 1, total_price: 299.99, order_shipping_state: 'Pending', shipping_address_id: 10, createdAt: currentDate, updatedAt: currentDate }
      ];

      const commentData = [
        { user_id: 1, description: "Love it", sellpost_id: 3,  createdAt: currentDate, updatedAt: currentDate},
        { user_id: 2, description: "Love it", sellpost_id: 1,  createdAt: currentDate, updatedAt: currentDate},
        { user_id: 3, description: "Love it So Much", sellpost_id: 4,  createdAt: currentDate, updatedAt: currentDate},
        { user_id: 4, description: "Like it", sellpost_id: 2,  createdAt: currentDate, updatedAt: currentDate},
      ];

      // Insert data into 'user' table
      await queryInterface.bulkInsert('user', usersData, { returning: true });
      const insertedUsers = await queryInterface.sequelize.query('SELECT user_id FROM user', { type: Sequelize.QueryTypes.SELECT });
      const userIDs = insertedUsers.map(user => user.user_id);

      // Insert data into 'address' table
      await queryInterface.bulkInsert('address', addressesData);

      // Insert data into 'sellpost' table
      await queryInterface.bulkInsert('sellpost', sellpostsData);

      await queryInterface.bulkInsert('comment', commentData);

      // Insert data into 'category' table
      await queryInterface.bulkInsert('category', categoriesData);

      // Insert data into 'sellpostcategory' table
      await queryInterface.bulkInsert('sellpostcategory', sellpostCategoriesData);

      // Insert data into 'order' table
      await queryInterface.bulkInsert('order', ordersData);
    

      console.log('Migration successful');


    } catch (error) {
      console.error("Error executing migration:", error);
      throw error; // Re-throw the error to stop the migration in case of failure
    }

  

  },

  down: async (queryInterface, Sequelize) => {
    // Logic for reverting the changes if needed
    // For example: queryInterface.bulkDelete('user', null, {});
    //             queryInterface.bulkDelete('address', null, {});
  },
};
