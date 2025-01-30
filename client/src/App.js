import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post("http://localhost:5000/items", {
        name: itemName,
      });
      setItems([...items, response.data]);
      setItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/items/${id}`, {
        name: editItemName,
      });
      setItems(items.map((item) => (item._id === id ? response.data : item)));
      setEditItemId(null);
      setEditItemName("");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editItemId === item._id ? (
              <input
                type="text"
                value={editItemName}
                onChange={(e) => setEditItemName(e.target.value)}
              />
            ) : (
              item.name
            )}
            {editItemId === item._id ? (
              <button onClick={() => updateItem(item._id)}>Update</button>
            ) : (
              <button
                onClick={() => {
                  setEditItemId(item._id);
                  setEditItemName(item.name);
                }}
              >
                Edit
              </button>
            )}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
