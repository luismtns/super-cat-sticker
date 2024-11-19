import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { X, Check } from 'lucide-react';
import { fetchCatTags } from '../services/cataasService';

const CatTagsAutocomplete = ({ label, onChange }) => {
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const TAGS_PER_PAGE = 50; // Número de tags para carregar por página

  useEffect(() => {
    const fetchInitialTags = async () => {
      setIsLoading(true);
      try {
        const allTags = await fetchCatTags();
        setTags(allTags.slice(0, TAGS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTags();
  }, []);

  const loadMoreTags = async () => {
    if (isLoading || tags.length >= 1000) return; // Para quando todas as tags já foram carregadas

    setIsLoading(true);
    try {
      const allTags = await fetchCatTags();
      const nextTags = allTags.slice(tags.length, tags.length + TAGS_PER_PAGE);
      setTags((prevTags) => [...prevTags, ...nextTags]);
    } catch (error) {
      console.error('Error loading more tags:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [, scrollerRef] = useInfiniteScroll({
    isLoading,
    isEnabled: isOpen,
    hasMore: tags.length < 1000,
    onLoadMore: loadMoreTags,
    distance: 0,
  });

  const handleSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      setSelectedTags((prev) => prev.filter((selection) => selection !== tag));
    }
  };

  const handleDeleteSelection = (tag) => {
    setSelectedTags((prev) => prev.filter((selection) => selection !== tag));
  };

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <div>
      <Autocomplete
        size='lg'
        value={selectedTags.join(',')}
        allowsCustomValue
        clearButtonProps={{
          onClick: () => setSelectedTags([]),
        }}
        label={label}
        className='w-full'
        scrollShadowProps={{
          isEnabled: false,
        }}
        scrollRef={scrollerRef}
        isLoading={isLoading}
        onOpenChange={setIsOpen}
        selectedKey=''>
        {tags.map((tag, index) => (
          <AutocompleteItem
            key={index}
            size='lg'
            value={tag}
            onClick={() => handleSelect(tag)}
            endContent={selectedTags.includes(tag) && <Check size={16} className='mr-2 text-green-500' />}>
            {tag}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className='flex mt-2 w-96 flex-wrap'>
        {selectedTags?.map((tag) => (
          <Chip
            key={tag}
            size='lg'
            color='primary'
            className='mr-2 mt-2'
            endContent={<X size={14} className='mr-1 cursor-pointer' onClick={() => handleDeleteSelection(tag)} />}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default CatTagsAutocomplete;
