import React, { Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthState";
import {useForm} from "react-hook-form";

const SidePanel = () => {
  const authContext = useContext(AuthContext);
  const {bearerToken,  uploadAvatarPhoto, setIsFileUpload, isFileUpload } = authContext;
  const {register, handleSubmit} = useForm()
  const onChange = (e) => {
    if (e.target.files.length !== 0) {
      // We have selected a file
      if (e.target.files[0].type.startsWith('image')) {
        // image has been selected
        setIsFileUpload(true)
      }

    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    // uploadAvatarPhoto(bearerToken, file)
  };
  return (
    <Fragment>
      <div className="profile-img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
          alt=""
        />
        <form>
        <div className="file btn btn-lg btn-primary">
          Change Photo
            <input type="file" className="h-100" name="file" />
        </div>
          {/*{isFileUpload && <button onSubmit={onSubmit} type="submit" className="btn btn-success">Upload</button>}*/}
      </form>
      </div>
    </Fragment>
  );
};

export default SidePanel;
