import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Products from "../products";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("Products Component", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      products: {
        products: [
          { id: 1, title: "Product 1", price: 10 },
          { id: 2, title: "Product 2", price: 20 },
        ],
      },
    });
  });

  it("renders the products page", () => {
    render(
      <Router>
        <Provider store={store}>
          <Products />
        </Provider>
      </Router>
    );

    expect(screen.getByText("Our Products")).toBeInTheDocument();
  });

  it("displays the correct number of products", () => {
    render(
      <Router>
        <Provider store={store}>
          <Products />
        </Provider>
      </Router>
    );

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });
});
