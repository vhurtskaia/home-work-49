import {render, screen, waitFor} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import UserProfile from "./UserProfile";
import {fetchUser} from "../api/userApi";

vi.mock("../api/userApi", () => ({
  fetchUser: vi.fn(),
}));

const mockedFetchUser = vi.mocked(fetchUser);

const user = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "leanne@example.com",
  phone: "1-770-736-8031",
  company: {name: "Romaguera-Crona"},
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("UserProfile", () => {
  it("shows a loading indicator while the request is pending", async () => {
    mockedFetchUser.mockReturnValue(new Promise(() => {}));

    render(<UserProfile />);

    expect(screen.getByRole("status")).toHaveTextContent("Завантаження користувача...");
    expect(screen.queryByText(user.name)).not.toBeInTheDocument();
  });

  it("renders user data after a successful request", async () => {
    mockedFetchUser.mockResolvedValue(user);

    render(<UserProfile />);

    expect(await screen.findByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.phone)).toBeInTheDocument();
    expect(screen.getByText(user.company.name)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("renders an error message when the request fails", async () => {
    mockedFetchUser.mockRejectedValue(new Error("Не вдалося завантажити користувача"));

    render(<UserProfile />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Не вдалося завантажити користувача"
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
