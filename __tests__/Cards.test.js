// Cards.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { useCookies } from "next-client-cookies";
import { useSession } from "next-auth/react";
import Cards from "../path/to/Cards"; // Adjust the import path as necessary

// Mock the necessary hooks
jest.mock("next-client-cookies");
jest.mock("next-auth/react");

describe("Cards Component", () => {
  const mockJob = {
    id: 1,
    title: "Software Engineer",
    orgName: "Tech Company",
    location: ["New York", "Remote"],
    description: "A great job for software engineers.",
    logoUrl: "https://example.com/logo.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when user is unauthenticated", () => {
    useCookies.mockReturnValue({
      get: jest.fn(() => undefined), // Simulate no access token
    });
    useSession.mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    render(
      <Cards job={mockJob} ind={0} c={true} st="active" handler={() => {}} />
    );

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Company/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A great job for software engineers./i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/In Person/i)).toBeInTheDocument(); // Button should be present
    expect(screen.queryByText(/Education/i)).toBeInTheDocument(); // Button should be present
    expect(screen.queryByText(/IT/i)).toBeInTheDocument(); // Button should be present
  });

  test("renders Book component when user is authenticated", () => {
    useCookies.mockReturnValue({
      get: jest.fn(() => "some-access-token"), // Simulate having an access token
    });
    useSession.mockReturnValue({
      status: "authenticated",
      data: { user: { name: "John Doe" } },
    });

    render(
      <Cards job={mockJob} ind={0} c={true} st="active" handler={() => {}} />
    );

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Company/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A great job for software engineers./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/In Person/i)).toBeInTheDocument(); // Button should be present
    expect(screen.getByText(/Education/i)).toBeInTheDocument(); // Button should be present
    expect(screen.getByText(/IT/i)).toBeInTheDocument(); // Button should be present
  });
});
