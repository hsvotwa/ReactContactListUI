import { resolve } from "path";
import contactsStore, { ContactsState, ContactsStore } from "./contacts.store";
import { env } from "process";
import { baseUrl } from "../URI";
import { Contact } from "./contacts";

export class ContactsService {
  async getContacts() {
    contactsStore.setLoading(true);
    fetch(`${baseUrl}Contact/GetContacts`)
      .then((response) => response.json())
      .then((response) => {
        contactsStore.add(response);
        contactsStore.setLoading(false);
      })
      .catch((error) => contactsStore.setError(error));
  }

  async addUpdateContact(currentContact: Contact) {
    contactsStore.setLoading(true);
    const postOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentContact),
    };
    fetch(`${baseUrl}Contact/SaveContact`, postOptions)
      .then((response) => response.json())
      .then((response) => {
        contactsStore.setLoading(false);

        if (!isNaN(response.feedback)) {
          currentContact.id = response.feedback;
          contactsStore.add(currentContact);
          alert("Successfully added!");
        } else {
          alert(response.description == "" ? "Something went wrong, please try again" : response.description);
        }
      })
      .catch((error) => contactsStore.setError(error));
  }

  async updateUpdateContact(currentContact: Contact) {
    const putOptions = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentContact),
    };
    fetch(`${baseUrl}Contact/UpdateContact/`, putOptions)
      .then((response) => response.json())
      .then((response) => {
        contactsStore.setLoading(false);

        if (response.feedback) {
          contactsStore.update(currentContact.id, currentContact);
          alert("Successfully updated!");
        } else {
          alert(response.description == "" ? "Something went wrong, please try again" : response.description);
        }
      })
      .catch((error) => contactsStore.setError(error));
  }

  async deleteContact(id: number) {
    contactsStore.setLoading(false);
    const deleteOptions = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(`${baseUrl}Contact/DeleteContact?id=${id}`, deleteOptions)
      .then((response) => response.json())
      .then((response) => {
        contactsStore.setLoading(false);

        if (response.feedback) {
          contactsStore.remove(id);
          alert("Successfully deleted!");
        } else {
          alert(response.description == "" ? "Something went wrong, please try again" : response.description);
        }
      })
      .catch((error) => contactsStore.setError(error));
  }
}

const contactsService: ContactsService = new ContactsService();
export default contactsService;