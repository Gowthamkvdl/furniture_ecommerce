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
    const [userRes, prodRes, revRes] = await Promise.all([
      apiRequest.get("/user/"),
      apiRequest.get("/product/all"),
      apiRequest.get("/product/reviews"),
    ]);

    return {
      users: userRes.data,
      products: prodRes.data,  
      reviews: revRes.data,
    };
  } catch (error) {
    console.error("Admin loader failed:", error);
    throw new Response("Failed to load admin data", { status: 500 });
  }
};

export const adminCustomerLoader = async () => {
  try {
    const customer = await apiRequest.get("/user/");
    return customer.data;
  } catch (error) {
    console.error("adminCustomerLoader failed:", error);
    throw new Response("Failed to load adminCustomerLoader", { status: 500 });
  }
};

export const adminSellerLoader = async () => {
  try {
    const seller = await apiRequest.get("/user/");
    return seller.data;
  } catch (error) {
    console.error("adminSellerLoader failed:", error);
    throw new Response("Failed to load adminSellerLoader", { status: 500 });
  }
};

export const adminProductLoader = async () => {
  try {
    const products = await apiRequest.get("/product/all");
    return products.data;
  } catch (error) {
    console.error("adminProductLoader failed:", error);
    throw new Response("Failed to load adminProductLoader", { status: 500 });
  }
};

export const adminReviewsLoader = async () => {
  try {
    const reviews = await apiRequest.get("/product/reviews");
    return reviews.data;
  } catch (error) {
    console.error("adminReviewsLoader failed:", error);
    throw new Response("Failed to load adminReviewsLoader", { status: 500 });
  }
};
