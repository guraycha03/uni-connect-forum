import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import Mapbox from 'react-mapbox-gl';

const Dashboard = () => {
  // State hooks to hold data
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // State for the data visualization chart
  const [chartData, setChartData] = useState({
    users: 0,
    posts: 0,
    comments: 0,
  });

  // Fetch users data
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setChartData(prevState => ({
          ...prevState,
          users: response.data.length,
        }));
      })
      .catch(err => console.error(err));

    // Fetch posts data
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setChartData(prevState => ({
          ...prevState,
          posts: response.data.length,
        }));
      })
      .catch(err => console.error(err));

    // Fetch comments data
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
        setChartData(prevState => ({
          ...prevState,
          comments: response.data.length,
        }));
      })
      .catch(err => console.error(err));
  }, []);

  // Handle user click to display profile
  const handleUserClick = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);

    // Fetch the user's posts
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        setSelectedPost(response.data);
      })
      .catch(err => console.error(err));
  };

  // Data for the ApexCharts
  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Users', 'Posts', 'Comments'],
  };

  const series = [chartData.users, chartData.posts, chartData.comments];

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Data Visualization */}
      <ReactApexChart options={options} series={series} type="pie" width="500" />

      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user.id)}>
              {user.name} ({user.username})
            </li>
          ))}
        </ul>

        {/* Selected User Profile */}
        {selectedUser && (
          <div>
            <h3>{selectedUser.name}</h3>
            <p>Email: {selectedUser.email}</p>
            <p>Address: {selectedUser.address.street}, {selectedUser.address.city}</p>

            {/* Display user's posts */}
            <h4>Posts by {selectedUser.name}</h4>
            <ul>
              {selectedPost.map(post => (
                <li key={post.id}>
                  <h5>{post.title}</h5>
                  <p>{post.body}</p>
                  <h6>Comments</h6>
                  <ul>
                    {comments.filter(comment => comment.postId === post.id).map(comment => (
                      <li key={comment.id}>{comment.body}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
