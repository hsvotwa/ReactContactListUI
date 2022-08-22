import { Component, useEffect, useState } from "react";
import { Contact } from "../state/contacts";
import contactsQuery from "../state/contacts.query";
import contactsService, { ContactsService } from "../state/contact.service";

const contacts$ = contactsQuery.selectAll();

export default function ContactsComponent() {
  const [contactList, setContactList] = useState<Array<Contact>>([]);

  const [currentContact, setCurrentContact] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });

  useEffect(() => {
    contacts$.subscribe((list) => setContactList(list));
    contactsService.getContacts();
  }, [contacts$]);

  const handleFieldChange = (e: any) => {
    if (e.target.name === "firstName") {
      setCurrentContact({
        id: currentContact.id,
        firstName: e.target.value,
        lastName: currentContact.lastName,
        phoneNumber: currentContact.phoneNumber
      });
    } else if (e.target.name === "lastName") {
      setCurrentContact({
        id: currentContact.id,
        firstName: currentContact.firstName,
        lastName: e.target.value,
        phoneNumber: currentContact.phoneNumber
      });
    } else {
      setCurrentContact({
        id: currentContact.id,
        firstName: currentContact.firstName,
        lastName: currentContact.lastName,
        phoneNumber: e.target.value
      });
    }
  };

  const handleEdit = (item: Contact) => {
    setCurrentContact(item);
  };

  const handleDelete = (item: Contact) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      contactsService.deleteContact(item.id);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentContact.id == 0) {
      contactsService.addUpdateContact(currentContact);
    } else {
      contactsService.updateUpdateContact(currentContact);
    }
    setCurrentContact({ id: 0, firstName: "", lastName: "", phoneNumber: "" });
  };

  return (
    <>
      <div className="m-3">
        <h3>Contact Manager</h3>
        <hr />

        <h4>Add/Edit Contact</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            required
            placeholder="First Name"
            value={currentContact.firstName}
            onChange={(e: any) => handleFieldChange(e)}
          />
          <input
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
            value={currentContact.lastName}
            onChange={(e: any) => handleFieldChange(e)}
          />
          <input
            type="text"
            name="phoneNumber"
            required
            placeholder="Phone Number"
            value={currentContact.phoneNumber}
            onChange={(e: any) => handleFieldChange(e)}
          />
          <input className="btn btn-primary" type="submit" value="Save" />
        </form>
        <hr />

        <h4>Contact List</h4>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => contactsService.getContacts()}
        >
          Refresh
        </button>

        <hr />

        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contactList.length > 0 &&
              contactList.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
