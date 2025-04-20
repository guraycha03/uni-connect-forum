import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

// Your Mapbox Token (Get from https://account.mapbox.com/access-tokens/)
const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
});

const UserProfile = ({ user }) => (
  <div>
    <h3>{user.name}</h3>
    <p>Email: {user.email}</p>
    <p>Address: {user.address.street}, {user.address.city}</p>

    {/* Mapbox Map */}
    <Map style="mapbox://styles/mapbox/streets-v11" containerStyle={{ height: '400px', width: '100%' }} center={[user.address.geo.lng, user.address.geo.lat]} zoom={[12]}>
      <Marker coordinates={[user.address.geo.lng, user.address.geo.lat]}>
        <div className="marker">📍</div>
      </Marker>
    </Map>
  </div>
);

export default UserProfile;
