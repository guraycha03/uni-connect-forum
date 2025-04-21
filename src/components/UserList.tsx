useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ]);
  
        const users = await usersRes.json();
        const posts = await postsRes.json();
        const comments = await commentsRes.json();
  
        setChartData(prevData => ({
          ...prevData,
          series: [users.length, posts.length, comments.length],
        }));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Every 10s
  
    return () => clearInterval(intervalId);
  }, []);
  