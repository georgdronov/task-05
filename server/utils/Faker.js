const { faker } = require("@faker-js/faker");

function generateFakeData(region, errorsCount = 0, seed = 42) {
  const totalRecords = 100;
  const data = [];

  for (let recordIndex = 0; recordIndex < totalRecords; recordIndex++) {
    data.push({
      id: recordIndex + 1,
      randomId: faker.string.uuid(),
      fullName: generateFullName(region),
      address: generateAddress(region),
      phone: generatePhone(region),
    });
  }

  if (errorsCount > 0) {
    data.forEach((record) => applyErrors(record, errorsCount));
  }

  return data;
}

function generateFullName(region) {
  return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

function generateAddress(region) {
  return faker.location.streetAddress(true);
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
