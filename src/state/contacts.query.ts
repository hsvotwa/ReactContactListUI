import { QueryEntity } from "@datorama/akita";
import contactsStore, {ContactsStore, ContactsState} from "./contacts.store";

export class ContactsQuery extends QueryEntity<ContactsState>{
    constructor(protected store: ContactsStore){
        super(store);
    }
}

const contactsQuery:ContactsQuery = new ContactsQuery(contactsStore);
export default contactsQuery;