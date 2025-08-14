import React from 'react';

const Button = () => {
  return (
    <div className='w-full bg-white rounded-3xl flex flex-col sm:flex-row justify-center items-center gap-5 shadow-xl p-6'>
      {/* Type of Car */}
      <select className='h-[45px] w-[200px] border border-black rounded-2xl px-3 text-[#444]'>
        <option disabled selected>Select Type of Car</option>
        <option value='suv'>SUV</option>
        <option value='coupe'>Coupe</option>
        <option value='sedan'>Sedan</option>
      </select>

      {/* Engine Type */}
      <select className='h-[45px] w-[200px] border border-black rounded-2xl px-3 text-[#444]'>
        <option disabled selected>Select Engine Type</option>
        <option value='diesel'>Diesel</option>
        <option value='petrol'>Petrol</option>
        <option value='cng'>CNG</option>
        <option value='electric'>Electric</option>
      </select>

      {/* Color of Car */}
      <select className='h-[45px] w-[200px] border border-black rounded-2xl px-3 text-[#444]'>
        <option disabled selected>Select Color</option>
        <option value='black'>Black</option>
        <option value='white'>White</option>
        <option value='grey'>Grey</option>
        <option value='blue'>Blue</option>
        <option value='red'>Red</option>
      </select>

      {/* Filter Button */}
      <button className='h-[40px] w-[150px] rounded-xl text-white bg-green-700 hover:bg-green-800 transition'>
        Filter
      </button>
    </div>
  );
};

export default Button;
