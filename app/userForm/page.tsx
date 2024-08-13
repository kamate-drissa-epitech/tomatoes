'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Form from '../components/Form';



const PostDataComponent = () => {
  const [data, setData] = useState(null); // État pour les données reçues
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs

    const postData = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: 'value' }), // Remplacez par vos données
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

   
// Le tableau de dépendances est vide, donc useEffect s'exécute une seule fois après le premier rendu

//   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
    
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className='flex flex-col flex-1 overflow-hidden'>
            <Header onSidebarOpen={() => {}} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container px-6 py-8 mx-auto">
                    <h3 className="text-3xl font-medium text-gray-700">Create User</h3>
                </div>
                <Form/>
            </main>
        </div>
        
      </div>
    </>
  );
};

export default PostDataComponent;
