import React from 'react';
import logoImage from '../images/jata_black.png'; 

export const About = () => {

    return (
    <> 
     
        <div>
        <h1 className="display-4">Welcome to JATA Fashion</h1>

      </div>
      <div>
         <img
         style={{ width: '400px', height: '400px' }}
         src={logoImage}/>
         <h2>About Us </h2>
         <p>Welcome to <a href="#">JATA Fashion</a> - <em>Your Ultimate Fashion Marketplace</em></p>
         <p><strong>At JATA Fashion, we believe that style is a unique expression of individuality. 
          Our platform is more than just an online marketplace; it's a community where 
          fashion enthusiasts can come together to explore, express, and empower.</strong></p>
         
         <h3>Our Mission </h3>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            Connecting Fashion Lovers Worldwide:
            </strong> JATA Fashion is the go-to destination for individuals who 
          appreciate the beauty of diverse styles. Whether you're a trendsetter, 
          a vintage lover, or someone with a passion for sustainable fashion, 
          our platform connects you with like-minded individuals from across
          the globe.</p>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            Empowering Your Style Journey:
            </strong> We empower users to curate their wardrobe by offering a seamless and 
          user-friendly experience. Sell clothes you've outgrown, discover unique 
          pieces, and express your style journey with confidence.</p>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            Promoting Sustainable Fashion:
            </strong> JATA Fashion is committed to sustainability. By giving pre-loved garments
          a second life, we contribute to reducing fashion waste and promoting a 
          more environmentally conscious lifestyle.</p>

         <h4>What Sets Us Apart </h4>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            User-Friendly Interface:
            </strong> Our platform is designed with you in mind. Enjoy a hassle-free 
          experience as you navigate through our intuitive interface to buy or 
          sell your favorite fashion items.</p>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            Secure Transactions:
            </strong> Rest easy knowing that your transactions are secure. Our robust 
          payment system and data protection measures prioritize the safety 
          and privacy of our users.</p>
         <p>
          <strong style={{ fontWeight: 'bold'}}>
            Diverse Fashion Ecosystem:
            </strong> From high-end designer pieces to budget-friendly fashion finds, JATA 
          Fashion embraces diversity. Discover a wide range of styles that cater 
          to every taste and budget.</p>

         <h5>Get Started Today! </h5>
         <p>Whether you're cleaning out your closet or looking to revamp your wardrobe, 
          JATA Fashion is here for you. Join our vibrant community, explore endless 
          fashion possibilities, and make your style statement with JATA Fashion. Your journey 
          to a more stylish and sustainable lifestyle starts here. Let's redefine fashion together!</p>
         <p>Happy shopping and selling,</p>
         <p><em style={{ fontWeight: 'bold'}}>
          The JATA Fashion Team</em></p>
      </div>
    
    </>)

}