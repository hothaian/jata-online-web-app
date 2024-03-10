// import React from "react";
// import logoImage from "../images/jata_black.png";

// export const About = () => {
//   return (
//     <>
//       <div className="">
//         <h1 className="display-4">Welcome to JATA Fashion</h1>
//       </div>

//       <div>
//         <img style={{ width: "400px", height: "400px" }} src={logoImage} />
//         <h2>About Us </h2>
//         <p>
//           Welcome to <a href="#">JATA Fashion</a> -{" "}
//           <em>Your Ultimate Fashion Marketplace</em>
//         </p>
//         <p>
//           <strong>
            // At JATA Fashion, we believe that style is a unique expression of
            // individuality. Our platform is more than just an online marketplace;
            // it's a community where fashion enthusiasts can come together to
            // explore, express, and empower.
//           </strong>
//         </p>

//         <h3>Our Mission </h3>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>
//             Connecting Fashion Lovers Worldwide:
//           </strong>{" "}
          // JATA Fashion is the go-to destination for individuals who appreciate
          // the beauty of diverse styles. Whether you're a trendsetter, a vintage
          // lover, or someone with a passion for sustainable fashion, our platform
          // connects you with like-minded individuals from across the globe.
//         </p>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>
//             Empowering Your Style Journey:
//           </strong>{" "}
//           We empower users to curate their wardrobe by offering a seamless and
//           user-friendly experience. Sell clothes you've outgrown, discover
//           unique pieces, and express your style journey with confidence.
//         </p>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>
//             Promoting Sustainable Fashion:
//           </strong>{" "}
//           JATA Fashion is committed to sustainability. By giving pre-loved
//           garments a second life, we contribute to reducing fashion waste and
//           promoting a more environmentally conscious lifestyle.
//         </p>

//         <h4>What Sets Us Apart </h4>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>
//             User-Friendly Interface:
//           </strong>{" "}
//           Our platform is designed with you in mind. Enjoy a hassle-free
//           experience as you navigate through our intuitive interface to buy or
//           sell your favorite fashion items.
//         </p>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>Secure Transactions:</strong>{" "}
//           Rest easy knowing that your transactions are secure. Our robust
//           payment system and data protection measures prioritize the safety and
//           privacy of our users.
//         </p>
//         <p>
//           <strong style={{ fontWeight: "bold" }}>
//             Diverse Fashion Ecosystem:
//           </strong>{" "}
//           From high-end designer pieces to budget-friendly fashion finds, JATA
//           Fashion embraces diversity. Discover a wide range of styles that cater
//           to every taste and budget.
//         </p>

//         <h5>Get Started Today! </h5>
//         <p>
//           Whether you're cleaning out your closet or looking to revamp your
//           wardrobe, JATA Fashion is here for you. Join our vibrant community,
//           explore endless fashion possibilities, and make your style statement
//           with JATA Fashion. Your journey to a more stylish and sustainable
//           lifestyle starts here. Let's redefine fashion together!
//         </p>
//         <p>Happy shopping and selling,</p>
//         <p>
//           <em style={{ fontWeight: "bold" }}>The JATA Fashion Team</em>
//         </p>
//       </div>
//     </>
//   );
// };
// Import necessary React components and styles
// Import necessary React and Material-UI components
import React from 'react';
import logoImage from "../images/jata_black.png";
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ShieldIcon from '@mui/icons-material/Shield';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// About component
const About = () => {
  return (
    <Container style={{ padding: '20px' }}>
    {/* Introduction Section */}
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>Welcome to Our Online Market</h1>
        <p>
          JATA Market is the go-to destination for individuals who appreciate
          the beauty of diverse styles. Whether you're a trendsetter, a vintage
          lover, or someone with a passion for sustainable fashion, our platform
          connects you with like-minded individuals from across the globe.
        </p>
        <img style={{ width: '200px', height: '200px', marginTop: '20px' }} src={logoImage} alt="Logo" />
      </div>

    

    {/* Features Section */}
    <div>
      <Grid container spacing={2}>
        {/* Feature 1 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <span style={{ marginRight: '8px' }}><CloudDoneIcon color="success"/></span> Database Management System
              </Typography>
              <Typography>
                Utilizes MySQL and Firebase Storage database management system and Sequelize for handling migrations and data operations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 2 */}
        <Grid item xs={12}>
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                <span style={{ marginRight: '8px' }}><SettingsSuggestIcon color="success"/></span> Diverse Web Services (RESTful APIs)
              </Typography>
              <Typography>
                Platform where users can register, post sell listings, manage their inventory, complete PayPal checkouts, and interact with other users through likes and comments. The project aims to facilitate buying and selling within a virtual marketplace.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 3 */}
        <Grid item xs={12}>
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                <span style={{ marginRight: '8px' }}><ShieldIcon color="success"/></span> Secure Authentication Services
              </Typography>
              <Typography>
              Using Firebase Auth manages secure user identity, login sessions, and token-based security. It includes features like registration, login, and multi-factor authentication.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 4 */}
        <Grid item xs={12}>
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                <span style={{ marginRight: '8px' }}><ShoppingCartCheckoutIcon color="success"/></span> Hassle-free checkout  with PayPal
              </Typography>
              <Typography>
              Simplify your payment process using PayPal robust API. Enable seamless transactions, accept various payment methods, and enhance user experience. 
              </Typography>
            </CardContent>
          </Card>
        </Grid>
                {/* Feature 5 */}
                <Grid item xs={12}>
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5">
                <span style={{ marginRight: '8px' }}><ThumbUpAltIcon color="success"/></span> Friendly Market Hub
              </Typography>
              <Typography>
              Connect with fellow buyers and sellers in our welcoming online marketplace. Share likes, comments, and build a vibrant community around your favorite listings!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  </Container>
  );
};

export default About;
