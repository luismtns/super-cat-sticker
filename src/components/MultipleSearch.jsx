import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import { X, Check } from 'lucide-react';

const MultiselectSearch = ({ array, label, onChange, isLoading }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selection) => selection !== item));
    }
  };

  const handleDeleteSelection = (item) => {
    setSelectedItems(selectedItems.filter((selection) => selection !== item));
  };

  useEffect(() => {
    onChange(selectedItems);
    return () => {};
  }, [selectedItems]);

  return (
    <div>
      <Autocomplete
        size='lg'
        value={selectedItems.join(',')}
        allowsCustomValue
        listboxProps={{ isVirtualized: true }}
        clearButtonProps={{
          onClick: () => {
            setSelectedItems([]);
          },
        }}
        label={label}
        className='w-full'
        scrollShadowProps={{
          isEnabled: false,
        }}
        selectedKey={''}
        isLoading={isLoading}>
        {array?.map((item, index) => (
          <AutocompleteItem
            size='lg'
            key={index}
            value={item}
            onClick={() => handleSelect(item)}
            endContent={selectedItems.includes(item) && <Check size={16} className='mr-2 text-green-500' />}>
            {item}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className='flex mt-2 w-96 flex-wrap'>
        {selectedItems?.map((item) => (
          <Chip
            size='lg'
            color={'primary'}
            className='mr-2 mt-2'
            endContent={<X size={14} className='mr-1 cursor-pointer' onClick={() => handleDeleteSelection(item)} />}>
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default MultiselectSearch;
