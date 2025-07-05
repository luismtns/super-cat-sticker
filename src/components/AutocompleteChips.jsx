// src/components/AutocompleteChips.js
import { Chip, Dropdown, Input, Skeleton } from '@heroui/react';
import { useState } from 'react';

const AutocompleteChips = ({ options, isLoading }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options || []);

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setInputValue('');
      setFilteredOptions(options);
    }
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter(
        (option) => option.toLowerCase().includes(value.toLowerCase()) && !selectedOptions.includes(option)
      )
    );
  };

  if (isLoading) return <Skeleton />;

  return (
    <div style={{ width: '300px' }}>
      <Input
        clearable
        fullWidth
        underlined
        labelPlaceholder='Selecionar opções'
        value={inputValue}
        onChange={handleInputChange}
      />
      <Dropdown>
        <Dropdown.Menu
          aria-label='Opções de autocomplete'
          disabledKeys={selectedOptions}
          onAction={(key) => handleSelectOption(key)}>
          {filteredOptions.map((option) => (
            <Dropdown.Item key={option}>{option}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {selectedOptions.map((option) => (
          <Chip key={option} onClose={() => handleRemoveOption(option)} color='primary' variant='flat'>
            {option}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteChips;
