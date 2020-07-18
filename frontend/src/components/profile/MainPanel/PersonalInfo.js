import React, {Fragment} from 'react';
import Info from "./Info";

const PersonalInfo = ({user}) => {
  return (
    <Fragment>
      {user.role === "user" ?
        <Fragment>
        <Info label="Name" value={`${user.firstname} ${user.lastname}`}/>
        <Info label="Email" value={`${user.email}`} />
        <Info
        label="Address"
        value={`${user.address_geojson.formattedAddress}`}
        />
        <Info
        label="Insurance Company"
        value={`${user.insurance_company}`}
        />
        <Info
        label="Insurance Number"
        value={`${user.insurance_number}`}
        />
        <Info label="Phone Number" value={`${user.phone}`} />
        </Fragment>
        : <Fragment>
          <Info label="Name" value={`${user.firstname} ${user.lastname}`} />
          <Info label="Email" value={`${user.email}`} />
          {user.hospital && <Info
            label="Address"
            value={`${user.hospital.address_geojson.formattedAddress}`}
          />}
          {user.phone && <Info label="Phone Number" value={`${user.phone}`}/>}
          {user.experience && <Info label="Description" value={`${user.experience}`}/>}
        </Fragment> }
    </Fragment>
  );
};

export default PersonalInfo;
