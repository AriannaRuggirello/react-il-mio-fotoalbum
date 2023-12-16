import React from 'react'

const Create = () => {
  return (
    <div className='container mx-auto'>
    <form className='flex flex-col gap-4 mx-auto'>
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
        />
      </div>
    
      {/* CATEGORY */}
      <div>
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
    
      </div>
    
    <button type="submit" className='max-w-min px-5 py-2 text-l bg-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-white'> 
    Crea
    </button>
    </form>
    
    
        </div>
  )
}

export default Create