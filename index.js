const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event, context) => {
  const { tableName } = event;
  const params = {
    TableName: tableName,
  };

  const command = new ScanCommand(params);

  try {
    const response = await client.send(command);
    const convertedData = response.Items.map((item) => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify(convertedData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
