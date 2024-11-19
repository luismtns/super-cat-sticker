# Super Cat Sticker

**Super Cat Sticker** is a user-friendly application designed to create personalized cat stickers using valid tags fetched from the Cataas API. This app allows users to explore tags, validate them, and organize them into custom collections to use as stickers for WhatsApp or other platforms.

---

## Features

### 1. **Tag Validation**

- Users can add tags manually through a text input.
- Each tag is validated against the comprehensive list of cat tags fetched from the Cataas API.
- Invalid or duplicate tags are prevented from being added, ensuring a clean and accurate sticker collection.

### 2. **Custom Sticker Creation**

- Users can select multiple tags to define sticker attributes.
- Stickers are created based on user-selected tags for maximum personalization.

### 3. **Dynamic Interaction**

- Tags are displayed as interactive chips, allowing users to easily add or remove them.
- A real-time interface ensures seamless interaction while editing tags.

### 4. **Error Handling and Feedback**

- Clear messages when:
  - A tag is invalid.
  - A tag is already added.
- A responsive and user-friendly design.

---

## Technologies Used

### **Frontend**

- **React**: For building dynamic and interactive UI components.
- **NextUI**: For sleek and modern UI elements like `Input`, `Autocomplete`, and `Chip`.
- **Lucide Icons**: To enhance the interface with icons (e.g., checkmarks, close icons).

### **Backend**

- **Cataas API**: To fetch the complete list of valid cat tags.
- **Axios**: For handling HTTP requests to the API.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/luismtns/super-cat-sticker.git
   cd super-cat-sticker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Integration

The app fetches a list of valid tags from the **Cataas API** using the following service:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cataas.com/api',
});

export const fetchCatTags = async () => {
  const response = await api.get('/tags');
  return response.data?.filter((e) => !!e && e.length > 1);
};
```

- **Base URL**: `https://cataas.com/api`
- **Endpoint**: `/tags`
- **Filter**: Only includes tags with a length greater than 1.

---

## Usage

### Adding Tags

1. Type a tag in the input field.
2. Press **Add** to include the tag in your collection.
3. If the tag is valid, it will appear as a chip in the collection.

### Removing Tags

- Click the **X** icon on any chip to remove it from your collection.

### Error Messages

- **Invalid Tag**: If the tag does not exist in the Cataas API's list of valid tags.
- **Duplicate Tag**: If the tag has already been added to your collection.

---

## Demo

- [Online Demo](https://github.com/luisbovo)

---

## Author

**Luis Otávio Bovo**

- [GitHub](https://github.com/luisbovo)
- [LinkedIn](https://linkedin.com/in/luisbovo)

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature description"`.
4. Push to your branch: `git push origin feature-name`.
5. Create a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## Future Features

- **Sticker Export**: Save selected tags as pre-built stickers for sharing on WhatsApp and other platforms.
- **Tag Suggestions**: Autocomplete suggestions based on frequently used tags.
- **Custom Themes**: Allow users to personalize the interface with light and dark themes.

---

Feel free to reach out for questions, feedback, or collaboration opportunities! 🚀
