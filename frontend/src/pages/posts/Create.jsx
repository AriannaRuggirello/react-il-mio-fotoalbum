import React, { useState } from 'react';
const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image:'',
    // categories: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Invia i dati del nuovo post al backend
      const response = await fetch('http://localhost:3000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Post creato con successo!');
        // Resetta lo stato dopo la creazione
        setFormData({
          title: '',
          description: '',
          // altri campi...
        });

        // Redirect o esegui altre azioni dopo la creazione
        // ...
      } else {
        console.error('Errore durante la creazione del post:', response.statusText);
      }
    } catch (error) {
      console.error('Errore durante la creazione del post:', error);
    }
  };

  return (
    <div className='container mx-auto'>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto'>
      <h1 className='font-bold mt-6'>Crea un nuovo Post!</h1>
    
      {/* NAME */}
      <div>
        <label className="block font-bold mb-2" htmlFor="title_input">
          Title
        </label>
        <input
          className="border px-3 py-4 w-full"
          type="text"
            name="title"
            id="title_input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Insert a title..."
        />
      </div>
    
      {/* DESC */}
      <div>
        <label className="block font-bold mb-2" htmlFor="description_input">
          Description
        </label>
        <input
          className="border px-3 py-4 w-full"
          type="text"
            name="description"
            id="description_input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Insert a description..."
        />
      </div>
    
      {/* IMAGE */}
      <div>
        <label className="block font-bold mb-2" htmlFor="image_input">
          Image
        </label>
        <input
          className="border px-3 py-4 w-full"
          type="file"
          name="image"
          id="image_input"
          accept="image/*"
          value={formData.image}
            onChange={handleChange}
        />
      </div>
    
      {/* CATEGORY */}
      {/* <div>
        <label className="block font-bold mb-2">
          Choose the category
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              name="category"
              value="category1"
            />
            Category 1
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="category"
              value="category2"
            />
            Category 2
          </label>
        </div>
    
      </div> */}
    
    <button type="submit" className='max-w-min px-5 py-2 text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white'> 
    Crea
    </button>
    </form>
    
    
        </div>
  )
}

export default Create