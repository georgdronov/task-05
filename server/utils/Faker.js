const { fakerPL, fakerUZ_UZ_latin, fakerEN_US } = require("@faker-js/faker");

function generateFakeData(region, errorsCount = 0, seed = 0) {
  const faker = getFakerInstance(region);
  faker.seed(seed);
  const totalRecords = 100;
  const data = [];

  for (let recordIndex = 0; recordIndex < totalRecords; recordIndex++) {
    data.push({
      id: recordIndex + 1,
      randomId: faker.string.uuid(),
      fullName: generateFullName(faker),
      address: generateAddress(faker),
      phone: generatePhone(faker, region),
    });
  }

  if (errorsCount > 0) {
    data.forEach((record) => applyErrors(record, errorsCount));
  }

  return data;
}

function getFakerInstance(region) {
  switch (region) {
    case "Poland":
      return fakerPL;
    case "Uzbekistan":
      return fakerUZ_UZ_latin;
    case "USA":
      return fakerEN_US;
    default:
      return fakerEN_US;
  }
}

function generateFullName(faker) {
  return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

function generateAddress(faker) {
  return faker.location.streetAddress();
}

function generatePhone(faker, region) {
  switch (region) {
    case "Poland":
      return faker.phone.number({ style: 'international' }); 
    case "Uzbekistan":
      return faker.phone.number({ style: 'international' }); 
    case "USA":
      return faker.phone.number({ style: 'international' }); 
    default:
      return faker.phone.number();
  }
}

function applyErrors(record, errorsCount) {
  const fields = ["fullName", "address", "phone"];

  for (let i = 0; i < errorsCount; i++) {
    const field = fields[Math.floor(Math.random() * fields.length)];
    record[field] = introduceError(record[field]);
  }

  return record;
}

function introduceError(str) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomChar = chars[Math.floor(Math.random() * chars.length)];
  const position = Math.floor(Math.random() * str.length);

  return str.slice(0, position) + randomChar + str.slice(position);
}

module.exports = { generateFakeData };
