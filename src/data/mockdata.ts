import { Contact } from "@/types/interface";
import { faker } from "@faker-js/faker";

export const mockContacts: Contact[] = [];
export const CONTACT_COUNT = 60;

for (let i = 0; i < CONTACT_COUNT; i++) {
  const created = faker.date.past().toISOString();
  mockContacts.push({
    id: faker.string.uuid(),
    createdate: created,
    properties: {
      createdate: created,
      hs_object_id: faker.string.uuid(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      hs_v2_date_entered_customer: faker.date.recent().toLocaleDateString(),
      hs_v2_date_entered_lead: faker.date.recent().toLocaleDateString(),
      lastmodifieddate: faker.date.recent().toISOString(),
    },
  });
}
