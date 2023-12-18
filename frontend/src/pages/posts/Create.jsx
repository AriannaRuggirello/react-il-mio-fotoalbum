import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
    available: false,
    categoryIds: [] // Assuming it's an array of category ids
  });

  const [categories, setCategories] = useState([]); // Assuming you fetch categories from the server

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategoryIds = post.categoryIds.includes(categoryId)
      ? post.categoryIds.filter((id) => id !== categoryId)
      : [...post.categoryIds, categoryId];

    setPost((prev) => ({
      ...prev,
      categoryIds: updatedCategoryIds
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/posts/', post);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };


// console.log(post);
  return (
    <form  className='flex flex-col gap-4 mx-auto max-w-sm'>
      <h1 className='font-bold mt-6 text-xl'>Crea un nuovo Post!</h1>

      <div>
        <label className="block font-bold mb-2" htmlFor="title_input">
          Title
        </label>
        <input
          className="border px-3 py-2 w-full"
          type="text"
          onChange={handleChange}
          name="title"
          id="title_input"
          placeholder="Inserisci un titolo..."
        />
      </div>

      <div>
        <label className="block font-bold mb-2" htmlFor="description_input">
          Description
        </label>
        <input
          className="border px-3 py-2 w-full"
          type="text"
          onChange={handleChange}
          name="description"
          id="description_input"
          placeholder="Inserisci una descrizione..."
        />
      </div>

      <div>
        <label className="block font-bold mb-2" htmlFor="image_input">
          Image
        </label>
        <input
          className="border px-3 py-2 w-full"
          type="file"
          name="image"
          onChange={handleChange}

          id="image_input"
          accept="image/*"
        />
      </div>

      <div>
        <label className="block font-bold mb-2" htmlFor="available_input">
          Pubblico
        </label>
        <input
          type="checkbox"
          name="available"
          onChange={handleChange}

          id="available_input"
        />
      </div>
     
      <div>
        <label className="block font-bold mb-2">Categories</label>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              id={`category_${category.id}`}
              name={`category_${category.id}`}
              checked={post.categoryIds.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            <label htmlFor={`category_${category.id}`} className="ml-2">
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleClick}
        type="submit" 
        className='max-w-min px-5 py-2 text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white'
      >
        Crea
      </button>
    </form>
  );
};

export default Create;
