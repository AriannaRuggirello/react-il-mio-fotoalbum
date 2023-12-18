import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts/');
        setPosts(response.data.posts);
        // console.log(response.data);
      } catch (error) {
        console.error('Errore nella richiesta al backend:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="bg-orange-100 my-10 py-10">
      <div className="container mx-auto grid grid-cols-3 justify-between gap-5 ">
        {posts.map(post => (
          <div key={post.id} className="max-w-sm bg-white border rounded-lg shadow">
            <img src={`http://localhost:3000/${post.image}`} alt={post.title} />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 ">{post.description}</p>
              <Link
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 "
                to={`/posts/${post.id}`}
              >
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Post;
