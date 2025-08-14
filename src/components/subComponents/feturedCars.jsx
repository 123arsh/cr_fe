import React, { useState } from "react";
import { FaCarSide, FaGasPump, FaPalette, FaTachometerAlt, FaCog, FaRoad } from "react-icons/fa";
import { cars } from "../../data/cars";

const FeturedCars = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredCar, setHoveredCar] = useState(null);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    setData(cars);
      setLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 py-12 pb-0 bg-gradient-to-b from-white via-gray-50 to-blue-50">
      <div className="text-center animate-fade-in">
        <h1 className="text-7xl font-serif font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          Our Premium Collection
        </h1>
        <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
          Discover our curated selection of premium vehicles, each chosen for their exceptional performance, comfort, and style.
        </p>
      </div>
      <div className="flex flex-col gap-48 w-[90%] mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[800px] bg-gray-100 animate-pulse rounded-3xl shadow-md"></div>
          ))
        ) : (
          data.map((car, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-24 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Car Image Section */}
              <div 
                className="w-full md:w-3/5 relative group animate-fade-in"
                onMouseEnter={() => setHoveredCar(car.index)}
                onMouseLeave={() => setHoveredCar(null)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 ease-out group-hover:shadow-3xl group-hover:scale-[1.02]">
                  <img
                    src={car.carImage}
                    alt={car.name}
                    className="w-full h-[800px] object-contain transition-transform duration-700 ease-out group-hover:scale-105 bg-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="transform translate-y-8 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <h3 className="text-white text-5xl font-bold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                        {car.typeofCar}
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                        {car.engineType}
                      </span>
                    </div>
                    <p className="text-white/90 text-xl font-medium leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      {car.index === 1 && "503 horses of pure adrenaline. The perfect fusion of luxury and track-ready performance."}
                      {car.index === 2 && "Where elegance meets innovation. A sophisticated statement of modern luxury."}
                      {car.index === 3 && "Sporty dynamics meet everyday comfort. The perfect balance for the modern driver."}
                      {car.index === 4 && "Commanding presence meets luxury. The ultimate SUV experience."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications Section */}
              <div 
                className={`w-full md:w-2/5 p-10 rounded-3xl transition-all duration-700 animate-fade-in backdrop-blur-lg ${
                  hoveredCar === car.index 
                    ? 'bg-white/95 shadow-2xl scale-105' 
                    : 'bg-white/90 shadow-lg'
                }`}
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-serif font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {car.name}
                  </h2>
                  <div className="flex gap-3">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {car.typeofCar}
                    </span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                      {car.engineType}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FaCarSide className="text-blue-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Type</p>
                    </div>
                    <p className="font-semibold text-lg">{car.typeofCar}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <FaGasPump className="text-green-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Engine</p>
                    </div>
                    <p className="font-semibold text-lg">{car.engineType}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-50 rounded-lg">
                        <FaPalette className="text-pink-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Color</p>
                    </div>
                    <p className="font-semibold text-lg">{car.colorOfCar}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <FaTachometerAlt className="text-purple-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Horsepower</p>
                    </div>
                    <p className="font-semibold text-lg">{car.specifications.horsepower}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <FaCog className="text-orange-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Transmission</p>
                    </div>
                    <p className="font-semibold text-lg">{car.specifications.transmission}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <FaRoad className="text-red-500 text-xl" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">0-60 mph</p>
                    </div>
                    <p className="font-semibold text-lg">{car.specifications.acceleration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeturedCars;
