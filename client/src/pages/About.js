import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="about-us-container">
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada diam id consequat lobortis. Phasellus nec scelerisque
            justo. Nulla facilisi. Donec varius, nisi nec congue consectetur,
            tortor ipsum fermentum nisl, eget vestibulum nunc enim nec lectus.
            Quisque auctor auctor augue vitae sodales. Integer sit amet mauris
            vehicula, semper justo sit amet, sagittis dolor. Vivamus efficitur
            urna id ante vulputate luctus. Nam eget nulla arcu. Morbi efficitur
            dolor non est posuere, ut dignissim tortor pellentesque.
          </p>
        </div>
        <div className="about-image"></div>
      </div>
    </Layout>
  );
};

export default About;
