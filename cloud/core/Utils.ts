import config from "../../parse_config";
const { parseConfig } = config;

const setTableData = async (table: string, data: any, method = "POST") => {
  const endpoint = "/schemas/" + table;
  const response = await Parse.Cloud.httpRequest({
    method,
    url: parseConfig.publicServerURL + endpoint,

    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-Parse-Application-Id": parseConfig.appId,
      "X-Parse-Master-Key": parseConfig.masterKey,
    },
  });

  if (response.status !== 200) {
    throw response.status;
  }
};
const getTableData = async (table: string) => {
  const endpoint = "/schemas/" + table;

  try {
    const response = await Parse.Cloud.httpRequest({
      method: "GET",
      url: parseConfig.serverURL + endpoint,

      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": parseConfig.appId,
        "X-Parse-Master-Key": parseConfig.masterKey,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log("Error getting table data:", e);
  }

  return null;
};

export { getTableData, setTableData };
