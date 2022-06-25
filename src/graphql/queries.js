/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoiseReading = /* GraphQL */ `
  query GetNoiseReading($id: ID!) {
    getNoiseReading(id: $id) {
      id
      lat
      long
      reading
      date
      createdAt
      updatedAt
    }
  }
`;
export const listNoiseReadings = /* GraphQL */ `
  query ListNoiseReadings(
    $filter: ModelNoiseReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoiseReadings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lat
        long
        reading
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
