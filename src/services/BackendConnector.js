import Amplify, { API, graphqlOperation } from 'aws-amplify';

import awsconfig from '../aws-exports'

import { createNoiseReading } from '../graphql/mutations';
import { listNoiseReadings} from '../graphql/queries';

Amplify.configure(awsconfig);



export async function putNoiseReading(data) {

  return await API.graphql(graphqlOperation(createNoiseReading, { input: data }));
}

// export async function GetData() {
//   try {
//     const billData = await API.graphql(graphqlOperation(listBillData))
//     return billData.data.listBillData.items
  
//   } catch (err) { console.log(err) }
// }

// export async function PutData(data) {
//   console.log(data)

//   try {
//     const updated = await API.graphql({ query: updateBillData, variables: { input: data }});
//     return updated
  
//   } catch (err) { console.log(err) }
// }
