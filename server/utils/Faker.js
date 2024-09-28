const { faker } = require("@faker-js/faker");

function generateFakeData(region, errorsCount = 0, seed = 42, page = 1) {
  faker.seed(seed);

  const pageSize = 20;
  const start = (page - 1) * pageSize;

  const data = [];

  for (let i = start; i < pageSize; i++) {
    let record = {
      id: i + 1,
      randomId: faker.string.uuid(),
      fullName: generateFullName(region),
      address: generateAddress(region),
      phone: generatePhone(region),
    };

    if (errorsCount > 0) {
      record = applyErrors(record, errorsCount);
    }

    data.push(record);
  }

  return data;
}

function generateFullName(region) {
  switch (region) {
    case "Poland":
      return `${faker.person.firstName()} ${faker.person.lastName()}`;
    case "Uzbekistan":
      return `${faker.person.firstName()} ${faker.person.lastName()}`;
    default:
      return `${faker.person.firstName()} ${faker.person.lastName()}`;
  }
}

function generateAddress(region) {
  switch (region) {
    case "Poland":
      return faker.location.streetAddress(true);
    case "Uzbekistan":
      return faker.location.streetAddress(true);
    default:
      return faker.location.streetAddress();
  }
}

function generatePhone(region) {
  switch (region) {
    case "Poland":
      return faker.phone.number("+48 ### ### ###");
    case "Uzbekistan":
      return faker.phone.number("+998 ## ### ## ##");
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
