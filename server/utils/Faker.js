const faker = require("faker");

function generateFakeData(region, errorsCount, seed, page) {
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
  return faker.address.findName();
}

function generateAddress(region) {
  return faker.address.streetAddress();
}

function gemeratePhone(region) {
  return faker.phone.phoneNumber();
}

function applayErrors(record, errorsCount) {
  return record;
}

module.exports = { generateFakeData };
