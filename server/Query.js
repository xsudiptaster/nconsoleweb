import { versionInt } from './config';

const jsforce = require('jsforce');

const queryMoreRecords = async (
  conn: any,
  nextRecordsUrl: string
): Promise<any> => {
  const result = await conn.queryMore(nextRecordsUrl);
  if (result.nextRecordsUrl) {
    return [
      ...result.records,
      ...(await queryMoreRecords(conn, result.nextRecordsUrl)),
    ];
  }
  return result.records;
};

const query = async (data: any) => {
  try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
      version: versionInt,
    });
    const result = await conn.query(data.query);
    let { records } = result;
    if (result.nextRecordsUrl) {
      const nextResults = await queryMoreRecords(conn, result.nextRecordsUrl);
      records = [...records, ...nextResults];
    }
    return {
      success: true,
      records,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
};
export default query;
