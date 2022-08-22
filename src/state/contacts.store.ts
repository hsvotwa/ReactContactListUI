import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Contact } from "./contacts";

export interface ContactsState extends EntityState<Contact, number> {
  filter: string;
}

@StoreConfig({ name: "contacts" })
export class ContactsStore extends EntityStore<ContactsState> {
  constructor() {
    super({ filter: "ALL" });
  }
}

const contactsStore: ContactsStore = new ContactsStore();
export default contactsStore;
