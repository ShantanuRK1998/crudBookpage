import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./Staticdata.json";
import Readrow from "./components/Readrow";
import Edit from "./components/Edit";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    bookName: "",
    author: "",
    price: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    bookName: "",
    author: "",
    price: "",
    description: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      bookName: addFormData.bookName,
      author: addFormData.author,
      price: addFormData.price,
      description: addFormData.description,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      bookName: editFormData.bookName,
      author: editFormData.author,
      price: editFormData.price,
      description: editFormData.description,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      bookName: contact.bookName,
      author: contact.author,
      price: contact.price,
      description: contact.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Book Price</th>
              <th>Book Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <Edit
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <Readrow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="bookName"
          required="required"
          placeholder="Enter a book name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="author"
          required="required"
          placeholder="Enter an author name..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="price"
          required="required"
          placeholder="Enter book price..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="description"
          required="required"
          placeholder="Enter book description..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;