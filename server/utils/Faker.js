const faker = require("faker");

function generateFakeData(region, errorsCount = 0, seed = 42, page = 1) {
  faker.seed(seed);

  const data = [];

  for (let i = 0; i < 20; i++) {
    let record = {
      id: i + 1,
      randomId: faker.datatype.uuid(),
      fullName: generateFullName(region),
      address: generateAddress(region),
      phone: gemeratePhone(region),
    };

    if (errorsCount > 0) {
      record = applayErrors(record, errorsCount);
    }

    data.push(record);
  }

  return data;
}

function generateFullName(region) {
  switch (region) {
    case "Poland":
      return `${faker.name.firstName()} ${faker.name.lastName()}`;
    case "Uzbekistan":
      return `${faker.name.firstName()} ${faker.name.lastName()}`;
    default:
      return `${faker.name.firstName()} ${faker.name.lastName()}`;
  }
}

function generateAddress(region) {
  switch (region) {
    case "Poland":
      return faker.address.streetAddress(true);
    case "Uzbekistan":
      return faker.address.streetAddress(true);
    default:
      return faker.address.streetAddress();
  }
}

function gemeratePhone(region) {
  switch (region) {
    case "Poland":
      return faker.phone.phoneNumber("+48 ### ### ###");
    case "Uzbekistan":
      return faker.phone.phoneNumber("+998 ## ### ## ##");
    default:
      return faker.phone.phoneNumber();
  }
}

function applayErrors(record, errorsCount) {
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
