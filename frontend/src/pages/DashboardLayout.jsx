import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';


const DashboardDefault = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

// ************************ POST LIST ************************
  async function fetchPosts() {
    try {
      const response = await axios.get('http://localhost:3000/posts/');
      console.log(response.data); 
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Errore nella richiesta al backend:', error);
    }
  }

    // ************************ DELETE POST ID ************************


    async function removePost(idToRemove) {
      try {
        // Effettuo la richiesta di cancellazione al backend
        await axios.delete(`http://localhost:3000/posts/${idToRemove}`);
        // Aggiorno l'elenco dei post solo dopo che la cancellazione è avvenuta con successo
        setPosts(posts.filter((post) => post.id !== idToRemove));
      } catch (error) {
        console.error('Errore durante la cancellazione del post:', error);
      }
    }





  // ************************ CATEGORY LIST ************************
  async function fetchCategories() {
    try {
      const response = await axios.get('http://localhost:3000/categories/');
      // console.log('Raw category data:', response.data);

      const categoryNames = response.data.map(category => category.name);
      // console.log('Category names:', categoryNames);

      setCategories(response.data);
    } catch (error) {
      console.error('Errore nella richiesta al backend:', error);
    }
  }



  // ************************ DELETE CATEGORY ID ************************

  async function removeCategory(idToRemove) {
    try {
      // Effettuo la richiesta di cancellazione al backend
      await axios.delete(`http://localhost:3000/categories/${idToRemove}`);
      // Aggiorno l'elenco dei post solo dopo che la cancellazione è avvenuta con successo
      setCategories(categories.filter((category) => category.id !== idToRemove));
    } catch (error) {
      console.error('Errore durante la cancellazione del post:', error);
    }
  }

  

  useEffect(() => {
    fetchPosts();
    fetchCategories()
  }, []);

  return (
    <section className="">
      <div className="container mx-auto ">
        <h1 className='font-bold my-3 uppercase'>Pannello Admin</h1>
        <Link
                className="max-w-min px-5 py-2 text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white "
                to={`/create`}
              >
              +
        </Link>


        {/* *****STAMPA DEI POST */}
        <h1 className='font-bold my-7 uppercase'>I miei Post</h1>
        {posts.map(post => (
          <div key={post.id} className="flex justify-between items-center bg-white border rounded-lg shadow px-5 my-5">
            {/* title */}
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
            </div>
            {/* buttons */}
            <div className='flex gap-3'>
              {/* show */}
              <Link
                className="flex items-center justify-center p-2 m- text-l bg-yellow-500 rounded-lg  focus:ring-4 focus:outline-none focus:ring-yellow-300 text-white "
                to={`/posts/${post.id}`}
              >
                <i className="fa-solid fa-circle-info"></i>
              </Link>
              {/* delete */}
              <button
                className="flex items-center justify-center p-2 m- text-l bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 text-white "
                onClick={() => removePost(post.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              {/* edit */}
              <Link
                className="flex items-center justify-center p-2 m- text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white "
                to={`/edit`}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
          </div>
        ))}
        <h1 className='font-bold my-7 uppercase'>Le mie Categorie</h1>
        {categories.map(category => (
          <div key={category.id} className="flex justify-between items-center bg-white border rounded-lg shadow px-5 my-5">
            {/* title */}
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{category.name}</h5>
            </div>
            
            {/* buttons */}
            <div className='flex gap-3'>
              
              {/* delete */}
              <button
                className="flex items-center justify-center p-2 m- text-l bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 text-white "
                onClick={() => removeCategory(category.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              {/* edit */}
              <button
                className="flex items-center justify-center p-2 m- text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white "
                // onClick={() => updateCategory(category.id)}
              >
                 <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardDefault;






