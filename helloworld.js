exports.handler = async (event) => {
    return sendRes(200,'Hello World from Trial Day 2');
};

const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "text/html"
    },
    body: body
  };
  return response;
};