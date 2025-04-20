import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

mapboxgl.accessToken = 'YOUR_MAPBOX_API_KEY';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { data: user } = useQuery(['user', id], () => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data));
  const { data: posts } = useQuery(['posts', id], () => axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(res => res.data));

  useEffect(() => {
    if (user?.address) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [user.address.geo.lng, user.address.geo.lat],
        zoom: 10,
      });
      new mapboxgl.Marker().setLngLat([user.address.geo.lng, user.address.geo.lat]).addTo(map);
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user?.name}'s Profile</h1>
      <div id="map" className="w-full h-64 my-4" />
      <h2 className="text-xl font-semibold">Posts:</h2>
      {posts?.map(post => (
        <div key={post.id} className="border p-2 my-2">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}