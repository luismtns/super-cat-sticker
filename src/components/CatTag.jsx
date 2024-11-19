import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCatTags } from '../cataasService';

const CatTags = () => {
  const { data: tags, error, isLoading } = useQuery(['catTags'], fetchCatTags);

  if (isLoading) return <p>Carregando tags...</p>;
  if (error) return <p>Erro ao carregar tags de gatos.</p>;

  return (
    <div>
      <h2>Tags de Gatos</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatTags;
