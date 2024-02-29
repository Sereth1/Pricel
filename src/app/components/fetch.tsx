import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Head, Trait, House } from '../assets/types';
import { gryffindor, slytherin, hufflepuff, ravenclaw } from '../assets/images';
import { houseColors, houseImages } from '../assets/houseConfig';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">

            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        </div>
    );
};





const Houses: React.FC = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await fetch('http://localhost:3001/houses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: House[] = await response.json();
                setHouses(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouses();
    }, []);

    if (isLoading) {
        return <div><Loading /></div>;
    }

    return (
        <div>

            <div className="grid md:grid-cols-2 gap-8">
                {houses.map((house) => (
                    <div key={house.id} className="bg-gray-900 rounded-xl shadow-xl overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                        <Image src={houseImages[house.name as keyof typeof houseImages]} alt={`${house.name} house`} className="w-full h-56 object-cover rounded-t-xl" />
                        <div className="px-8 py-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className={`text-2xl font-bold`} style={{ color: houseColors[house.name as keyof typeof houseColors].text }}>{house.name}</h2>
                                <span className="font-semibold text-gray-700 bg-gray-200 rounded-full px-3 py-1">{house.animal}</span>
                            </div>
                            <div className="h-1 w-full mb-4" style={{ backgroundColor: houseColors[house.name as keyof typeof houseColors].bar }}></div>
                            <p className="text-md text-white">Founder: {house.founder}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Houses;
