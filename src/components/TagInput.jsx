import React, { useState, useEffect } from 'react';
import { Chip, Input, Button } from '@nextui-org/react';
import { X } from 'lucide-react';
import { fetchCatTags } from '../services/cataasService';

const TagInput = ({ label, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [validTags, setValidTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const tags = await fetchCatTags();
        setValidTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleAddTag = () => {
    if (!inputValue.trim()) return; // Prevent adding empty tags
    const trimmedValue = inputValue.trim().toLowerCase();

    if (!validTags.includes(trimmedValue)) {
      setErrorMsg(`"${trimmedValue}" is invalid.`);
      setHasError(true);
      return;
    }

    if (!selectedTags.includes(trimmedValue)) {
      setSelectedTags((prev) => [...prev, trimmedValue]);
      setInputValue('');
    } else {
      setErrorMsg(`"${trimmedValue}" is invalid.`);
      setHasError(true);
    }
  };

  const handleDeleteTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <div>
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <Input
          fullWidth
          value={inputValue}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleAddTag();
            }
          }}
          onChange={(e) => {
            setErrorMsg('');
            setHasError(false);
            setInputValue(e.target.value);
          }}
          placeholder='Type a tag and press Add'
          disabled={isLoading}
          isInvalid={hasError}
          errorMessage={errorMsg}
        />
        <Button auto onClick={handleAddTag} disabled={isLoading || !inputValue.trim()}>
          Add
        </Button>
      </div>
      {isLoading && <p>Loading tags...</p>}
      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            color='primary'
            endContent={<X size={14} className='cursor-pointer' onClick={() => handleDeleteTag(tag)} />}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
