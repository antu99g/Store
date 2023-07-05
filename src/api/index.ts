export const ServerUrl = "https://store-api-ovo5.onrender.com";

interface Category {
  categoryId: number;
  title: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

interface PaymentItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export const fetchAllCategories: () => Promise<Category[]> = async () => {
  try {
    const response = await fetch(ServerUrl + "/categories");
    const data = await response.json();
    return data.categories;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const fetchProductById: (id: string) => Promise<Product> = async (
  id
) => {
  try {
    const response = await fetch(ServerUrl + `/${id}/product`);
    const data = await response.json();
    return data.product;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const fetchPopularProducts: () => Promise<Product[]> = async () => {
  try {
    const response = await fetch(ServerUrl + "/products");
    const data = await response.json();
    return data.products.slice(0, 8);
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const fetchRelatedProducts: (id: string) => Promise<Product[]> = async (
  id
) => {
  try {
    const response = await fetch(ServerUrl + `/${id}/related-products`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const fetchSearchedProducts: (
  keyword: string
) => Promise<Product[]> = async (keyword) => {
  try {
    const response = await fetch(
      ServerUrl + `/products/search?keyword=${keyword}`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const fetchCategoryProducts: (
  categoryId: string
) => Promise<Product[]> = async (categoryId) => {
  try {
    const response = await fetch(ServerUrl + `/${categoryId}/products`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export const initiatePayment = async (items: PaymentItem[]) => {
  try {
    const response = await fetch(ServerUrl + "/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(items),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data);
  } catch (err) {
    throw new Error("Failed to fetch data from the API.");
  }
};
