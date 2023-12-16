import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
  const { id } = useParams(); 
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Errore durante la richiesta API:', error);
      }
    };

    fetchData();
  }, [id]); 

  return (
    <div className="container mx-auto flex justify-between items-center">
      {postData && (
        <>
          <img className="rounded-t-lg" src={postData.imageUrl} alt="immagine" />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{postData.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 ">{postData.description}</p>
            <Link
              to="/"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 "
            >
              Torna alla homepage
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Show;
