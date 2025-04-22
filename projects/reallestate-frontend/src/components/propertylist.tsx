// src/components/PropertyList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define the interface for a property
interface Property {
  id: number;
  name: string;
  // Add other fields if needed
}

const PropertyList: React.FC = () => {
  // State to store the properties, loading state, and error state
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch the data using axios, ensure the API endpoint is correct
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data); // Store the fetched data
        setLoading(false); // Turn off the loading state once the data is fetched
      } catch (err) {
        console.error('Error fetching properties:', err); // Log any error that occurs
        setError('Failed to load properties. Please try again later.'); // Show an error message
        setLoading(false); // Turn off the loading state in case of error
      }
    };

    fetchProperties(); // Call the function to fetch properties
  }, []); // Empty dependency array ensures this effect runs only once

  // Handle loading state
  if (loading) {
    return <div>Loading properties...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the list of properties if data is fetched successfully
  return (
    <div>
      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No properties available.</p> // Handle the case when no properties are available
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <Link to={`/property/${property.id}`}>{property.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;
