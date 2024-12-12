import React, { useState } from "react";
import "./contact.css";

const ContactForm = () => {
  const [contacts, setContacts] = useState([
    { firstName: "", lastName: "", email: "", phoneNumber: "", designation: "" },
  ]);
  const [errors, setErrors] = useState([]);

  const validateField = (field, value) => {
    switch (field) {
      case "phoneNumber":
        return /^[0-9]{10}$/.test(value) ? "" : "Phone number must be 10 digits.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
      default:
        return value.trim() === "" ? "This field is required." : "";
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newContacts = [...contacts];
    newContacts[index][name] = value;
    setContacts(newContacts);

    // Validate field and update errors
    const error = validateField(name, value);
    const newErrors = [...errors];
    if (!newErrors[index]) {
      newErrors[index] = {};
    }
    newErrors[index][name] = error;
    setErrors(newErrors);
  };

  const addContact = () => {
    if (contacts.length < 3) {
      setContacts([
        ...contacts,
        { firstName: "", lastName: "", email: "", phoneNumber: "", designation: "" },
      ]);
      setErrors([...errors, {}]);
    }
  };

  const removeContact = (index) => {
    const newContacts = [...contacts];
    const newErrors = [...errors];
    newContacts.splice(index, 1);
    newErrors.splice(index, 1);
    setContacts(newContacts);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = [];
    const newErrors = [...errors];

    contacts.forEach((contact, index) => {
      Object.keys(contact).forEach((field) => {
        const error = validateField(field, contact[field]);
        if (error) {
          if (!newErrors[index]) {
            newErrors[index] = {};
          }
          newErrors[index][field] = error;
          formErrors.push(`Contact ${index + 1}: ${field} is required.`);
        }
      });
    });

    setErrors(newErrors);

    if (formErrors.length > 0) {
      alert(formErrors.join("\n"));
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h1>Contact Form</h1>
      {contacts.map((contact, index) => (
        <div key={index} className="contact-card">
          <h3>Contact {index + 1}</h3>
          {Object.keys(contact).map((field) => (
            <div key={field} className="form-group">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={contact[field]}
                onChange={(e) => handleChange(index, e)}
                className={`form-input ${errors[index]?.[field] ? "input-error" : ""}`}
              />
              {errors[index]?.[field] && (
                <p className="error-text">{errors[index][field]}</p>
              )}
            </div>
          ))}
          <button type="button" onClick={() => removeContact(index)} className="remove-btn">
            Remove Contact
          </button>
        </div>
      ))}
      <div className="form-buttons">
        <button
          type="button"
          onClick={addContact}
          className="add-btn"
          disabled={contacts.length >= 3}
        >
          Add Contact
        </button>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
