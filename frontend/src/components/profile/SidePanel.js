import React, {Fragment} from 'react';

const SidePanel = () => {
  return (
    <Fragment>
      <div className="profile-img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
          alt=""/>
        <div className="file btn btn-lg btn-primary">
          Change Photo
          <input type="file" name="file"/>
        </div>
      </div>
      <div className="profile-work">
        <p>WORK LINK</p>
        <a href="">Website Link</a><br/>
        <a href="">Bootsnipp Profile</a><br/>
        <a href="">Bootply Profile</a>
        <p>SKILLS</p>
        <a href="">Web Designer</a><br/>
        <a href="">Web Developer</a><br/>
        <a href="">WordPress</a><br/>
        <a href="">WooCommerce</a><br/>
        <a href="">PHP, .Net</a><br/>
      </div>
    </Fragment>
  );
};

export default SidePanel;
