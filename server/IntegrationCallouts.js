import apexCode from './ApexCode';
import deleteMethod from './Delete';
import describeGlobal from './DescribeGlobal';
import fetchCall from './Fetch';
import getDatasetDetails from './GetDatasetDetails';
import getDatasetList from './GetDatasetList';
import getDatasetXMD from './GetDatasetXMD';
import insert from './Insert';
import login from './Login';
import metadataDeploy from './MetadataDeploy';
import metadataDescribe from './MetadataDescribe';
import metadataList from './MetadataList';
import metadataRead from './MetadataRead';
import metadataRetrieve from './MetadataRetrieve';
import metadataUpsert from './MetadataUpsert';
import objectDescribe from './ObjectDescribe';
import query from './Query';
import update from './Update';
import upsert from './Upsert';

export interface integrationRequest {
  method: string;
  payloadData?: any;
}
const IntegrationCallouts = async (payload: integrationRequest) => {
  switch (payload.method) {
    case 'login':
      return login(payload.payloadData);
    case 'query':
      return query(payload.payloadData);
    case 'fetch':
      return fetchCall(payload.payloadData);
    case 'describeGlobal':
      return describeGlobal(payload.payloadData);
    case 'objectDescribe':
      return objectDescribe(payload.payloadData);
    case 'insert':
      return insert(payload.payloadData);
    case 'update':
      return update(payload.payloadData);
    case 'upsert':
      return upsert(payload.payloadData);
    case 'delete':
      return deleteMethod(payload.payloadData);
    case 'getDataSetList':
      return getDatasetList(payload.payloadData);
    case 'getDatasetDetails':
      return getDatasetDetails(payload.payloadData);
    case 'getDatasetXMD':
      return getDatasetXMD(payload.payloadData);
    case 'apexCode':
      return apexCode(payload.payloadData);
    case 'metadataUpsert':
      return metadataUpsert(payload.payloadData);
    case 'metadataRetrieve':
      return metadataRetrieve(payload.payloadData);
    case 'metadataDeploy':
      return metadataDeploy(payload.payloadData);
    case 'metadataRead':
      return metadataRead(payload.payloadData);
    case 'metadataDescribe':
      return metadataDescribe(payload.payloadData);
    case 'metadataList':
      return metadataList(payload.payloadData);
    default:
      return null;
  }
};
export default IntegrationCallouts;
