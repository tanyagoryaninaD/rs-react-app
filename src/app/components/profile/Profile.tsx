import '../../../style/profile.scss';
import type { ProfileProps } from '../../../types/common';

export default function Profile(props: ProfileProps) {
  console.log('🚀 ~ Profile ~ props:', props.data.file);
  return (
    <div className={`profile ${props.last ? 'new' : ''}`}>
      <div className="profile-top">
        <h2 className="profile-title">{props.data.name}</h2>
        <div className="profile-avatar-wrapper">
          <img src={props.data.file} alt="avatar" />
        </div>
      </div>
      <div className="profile-content">
        <p>
          Age: <span className="profile-data">{props.data.age}</span>
        </p>
        <p>
          Gender: <span className="profile-data">{props.data.gender}</span>
        </p>
        <p>
          Country: <span className="profile-data">{props.data.country}</span>
        </p>
        <p>
          Email: <span className="profile-data">{props.data.email}</span>
        </p>
        <p>
          Password: <span className="profile-data">{props.data.password}</span>
        </p>
      </div>
    </div>
  );
}
