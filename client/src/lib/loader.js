import apiRequest from "./apiRequest.js"; // adjust path accordingly

export const shopLoader = async () => {
  try {
    const res = await apiRequest.get("/product/all");
    return res.data;
  } catch (err) {
    console.error("Shop loader failed:", err);
    throw new Response("Failed to load products", { status: 500 });
  }
};

export const sellerLoader = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "seller") {
      return { error: "unauthorized" };
    }

    const res = await apiRequest.get(`/user/seller/${user.id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to load seller:", err);
    throw new Response("Failed to load seller", { status: 500 });
  }
};

export const customerLoader = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "customer") {
      return { error: "unauthorized" };
    }

    const res = await apiRequest.get(`/user/customer/${user.id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to load customer:", err);
    return { error: "server_error" };
  }
};


export const productsLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await apiRequest.get(`/product/${id}`);
    return res.data; // usable in your component via useLoaderData()
  } catch (err) {
    console.error("Failed to load product:", err);
    throw new Response("Product not found", { status: 404 });
  }
};

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  try {
    const res = await apiRequest.get(`/product/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to load product:", err);
    throw new Response("Failed to load product", { status: 500 });
  }
};


export const adminLoader = async () => {
  try {

    const [userRes, prodRes] = await Promise.all([
      apiRequest.get("/user/"),
      apiRequest.get("/product/all"),
    ]);

    return {
      users: userRes.data,
      products: prodRes.data,
    };
  } catch (error) {
    console.error("Admin loader failed:", error);
    throw new Response("Failed to load admin data", { status: 500 });
  }
};
