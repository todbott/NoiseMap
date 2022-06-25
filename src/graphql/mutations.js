/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNoiseReading = /* GraphQL */ `
  mutation CreateNoiseReading(
    $input: CreateNoiseReadingInput!
    $condition: ModelNoiseReadingConditionInput
  ) {
    createNoiseReading(input: $input, condition: $condition) {
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
export const updateNoiseReading = /* GraphQL */ `
  mutation UpdateNoiseReading(
    $input: UpdateNoiseReadingInput!
    $condition: ModelNoiseReadingConditionInput
  ) {
    updateNoiseReading(input: $input, condition: $condition) {
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
export const deleteNoiseReading = /* GraphQL */ `
  mutation DeleteNoiseReading(
    $input: DeleteNoiseReadingInput!
    $condition: ModelNoiseReadingConditionInput
  ) {
    deleteNoiseReading(input: $input, condition: $condition) {
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
