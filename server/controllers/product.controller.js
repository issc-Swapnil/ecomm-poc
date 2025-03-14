const { DynamoDBClient, ScanCommand, GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const ULID = require('ulid')

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  }
});

const fetchProducts = async (req, res) => {
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
      'id': { S: productId },
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
const addToCart = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, productId, quantity, productName, price } = req.body;

  if (!userId || !productId || !quantity || !productName || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const params = {
    TableName: "cart_list",
    Item: {
      'id':{ S: ULID.ulid()},
      'userId': { S: userId },
      'productId': { S: productId },
      'quantity': { N: quantity },
      'productName': { S: productName },
      'price': { N: price },
      'createdAt': {S: new Date().toISOString()}, // Timestamp for tracking
    },
  };
  try {
    await client.send(new PutItemCommand(params));

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Could not add item to cart" });
  }
};

module.exports = {
  fetchProducts,
  fetchProductByID,
  addToCart
}
