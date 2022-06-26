import Amplify, { API, graphqlOperation } from 'aws-amplify';

import awsconfig from '../aws-exports'

import { createNoiseReading } from '../graphql/mutations';
import { listNoiseReadings} from '../graphql/queries';

Amplify.configure(awsconfig);



export async function putNoiseReading(data) {
    try {
        return await API.graphql(graphqlOperation(createNoiseReading, { input: data }));
    } catch (err) { console.log(err)}
}

export async function getNoiseReadings() {
  try {
    const nR = await API.graphql(graphqlOperation(listNoiseReadings))
    return nR.data.listNoiseReadings.items
  
  } catch (err) { console.log(err) }
}

// export async function PutData(data) {
//   console.log(data)

//   try {
//     const updated = await API.graphql({ query: updateBillData, variables: { input: data }});
//     return updated
  
//   } catch (err) { console.log(err) }
// }
