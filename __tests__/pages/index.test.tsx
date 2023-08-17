import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useGetBlogsQuery } from "@/store/features/blogs-api";
import { store } from "@/store";
import { mockData } from "./index.mock";
import Home from "@/app/page";

jest.mock("@/store/features/blogs-api", () => ({
  ...jest.requireActual("@/store/features/blogs-api"),
  useGetBlogsQuery: jest.fn(),
}));

test("renders blogs Page with Correct Data of blogs", async () => {
  (useGetBlogsQuery as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
  });

  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  await screen.findByText("Title1");
});

