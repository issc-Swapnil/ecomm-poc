const { DynamoDBClient, ScanCommand, GetItemCommand} = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    }
  });

const fetchProducts = async (req,res) => {
  const params = {
    TableName: "product_list",
  };

  try {
    const data = await client.send(new ScanCommand(params));
    const items = data.Items.map((item) => unmarshall(item)) || [];

    res.status(200).json({
        success: true,
        message: "Product list fetched successfully",
        data: items,
      });

  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch products" }),
    };
  }
}
const fetchProductByID = async (req, res) => {
    const productId = req.params.id; 

    const params = {
        TableName: "product_list",
        Key: {
            'id': {S: productId },
        },
    };
    try {
        const data = await client.send(new GetItemCommand(params));
        
        if (!data.Item) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const item = unmarshall(data.Item);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: item,
        });

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Could not fetch product" });
    }
}

module.exports = {
    fetchProducts,
    fetchProductByID
}
