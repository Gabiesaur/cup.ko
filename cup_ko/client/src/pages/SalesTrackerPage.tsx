import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  _id: string;
  customerName: string;
  totalPrice: number;
  modePayment: "cash" | "gcash";
  modeBuying: "reservation" | "physical" | "delivery";
  status: "pending" | "paid" | "completed";
  date: string;
  items: OrderItem[];
  location?: string;
  customerUsername?: string;
  pickupTime?: string;
  gcashRefNo?: string;
};

type StatusFilter = "all" | Order["status"];

const SalesTrackerPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [modeFilter, setModeFilter] = useState<"all" | Order["modeBuying"]>(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem("salesTrackerAuth") === "true"
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleUpdateStatus = async (
    order: Order,
    nextStatus: "pending" | "paid" | "completed",
  ) => {
    if (order.status === nextStatus) {
      return;
    }

    try {
      setActiveOrderId(order._id);
      setErrorMessage(null);

      const response = await fetch(
        `${API_URL}/updateOrder/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to update status (${response.status})`);
      }

      setOrders((previousOrders) =>
        previousOrders.map((existingOrder) =>
          existingOrder._id === order._id
            ? { ...existingOrder, status: nextStatus }
            : existingOrder,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
    } finally {
      setActiveOrderId(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) {
      return;
    }

    try {
      setActiveOrderId(orderId);
      setErrorMessage(null);

      const response = await fetch(
        `${API_URL}/deleteOrder/${orderId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete order (${response.status})`);
      }

      setOrders((previousOrders) =>
        previousOrders.filter((order) => order._id !== orderId),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
    } finally {
      setActiveOrderId(null);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await fetch(`${API_URL}/getOrders`);

      if (!response.ok) {
        throw new Error(`Failed to fetch orders (${response.status})`);
      }

      const data = (await response.json()) as Order[];
      setOrders(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      void fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!passwordInput) {
      setAuthError("Please enter a password");
      return;
    }
    
    try {
      setIsAuthenticating(true);
      setAuthError(null);
      const response = await fetch(`${API_URL}/verifyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem("salesTrackerAuth", "true");
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch (err) {
      setAuthError("Server communication error");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const totalSales = useMemo(
    () =>
      orders.reduce(
        (runningTotal, order) => runningTotal + order.totalPrice,
        0,
      ),
    [orders],
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesMode =
          modeFilter === "all" || order.modeBuying === modeFilter;
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;

        return matchesMode && matchesStatus;
      }),
    [modeFilter, orders, statusFilter],
  );

  const formatPickupTime = (pickupTime?: string) => {
    if (!pickupTime) {
      return "Not provided";
    }

    return new Date(pickupTime).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center z-10 w-full max-w-[650px] mx-auto mt-8 md:mt-2">
          {/* Main Pink Container matching PurchaseFormPage */}
          <div className="relative h-auto md:h-[500px] w-full md:w-[650px] bg-[#cc8386] rounded-[40px] flex flex-col justify-center items-center pt-24 px-6 md:px-12 pb-20 md:pb-12 gap-8 shadow-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-50 flex flex-col items-center">
              <div className="h-20 w-full bg-[#cc8386] rounded-[40px] flex flex-row justify-center items-center gap-4 shadow-md">
                <p
                  className="text-[#f8cc1b] text-4xl md:text-5xl font-bold [text-shadow:2px_3px_2px_#a8606c]"
                  style={{ fontFamily: "Opun Mai Bold Italic" }}
                >
                  sales tracker
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 relative z-0 items-center">
              <label
                className="text-white text-3xl font-bold text-center"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Admin Access Requires Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full max-w-[400px] bg-[#fce18d] text-[#873641] rounded-full px-6 py-4 text-xl outline-none placeholder-[#873641]/70 mt-2"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
                placeholder="Enter admin password..."
              />
              {authError && (
                <p className="text-[#873641] bg-[#fce18d] px-4 py-2 rounded-full font-bold text-lg text-center mt-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                  {authError}
                </p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={isAuthenticating}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-6 bg-[#fce18d] text-[#e1a0aa] text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-14 py-3 shadow-md z-0 font-bold"
              style={{ fontFamily: "Opun Mai Bold Italic" }}
            >
              {isAuthenticating ? "Wait..." : "Enter"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-white/30 hover:bg-white/50 text-white rounded-full px-8 py-2 font-bold transition-colors"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
               Cancel & Go Back
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center">
        <div className="relative min-h-180 w-[95vw] max-w-275 bg-[#cc8386] rounded-4xl flex flex-col justify-start items-center gap-4 py-12 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-120 bg-[#cc8386] rounded-4xl flex flex-row justify-center items-center">
            <p
              className="text-[#e1a0aa] text-6xl font-bold [text-shadow:2px_3px_2px_#a8606c]"
              style={{ fontFamily: "Opun Mai Bold Italic" }}
            >
              sales tracker{" "}
            </p>
          </div>

          <div className="w-full mt-8 bg-[#fce18d] rounded-3xl p-5 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p
                className="text-[#873641] text-2xl md:text-4xl font-bold"
                style={{ fontFamily: "Opun Mai Bold Italic" }}
              >
                Total sales: P{totalSales.toFixed(2)}
              </p>
              <p
                className="text-[#873641] text-lg md:text-2xl font-bold"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Orders: {orders.length}
              </p>
            </div>
          </div>

          <div className="w-full bg-white/90 rounded-3xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex flex-col gap-2 w-full md:w-auto md:flex-1">
              <label
                className="text-[#873641] text-xl font-bold"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Filter by mode of buying
              </label>
              <select
                value={modeFilter}
                onChange={(event) =>
                  setModeFilter(
                    event.target.value as "all" | Order["modeBuying"],
                  )
                }
                className="w-full md:w-72 rounded-full bg-[#fce18d] px-4 py-3 text-[#873641] text-lg font-bold outline-none"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                <option value="all">All modes</option>
                <option value="physical">physical</option>
                <option value="delivery">delivery</option>
                <option value="reservation">reservation</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto md:flex-1">
              <label
                className="text-[#873641] text-xl font-bold"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Filter by status
              </label>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className="w-full md:w-72 rounded-full bg-[#fce18d] px-4 py-3 text-[#873641] text-lg font-bold outline-none"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                <option value="all">All statuses</option>
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </div>

          <div className="w-full h-96 overflow-y-auto overflow-x-auto bg-white/90 rounded-3xl p-4 md:p-6">
            {isLoading && (
              <p
                className="text-[#873641] text-xl"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Loading orders...
              </p>
            )}

            {!isLoading && errorMessage && (
              <p
                className="text-red-700 text-xl"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Failed to load orders: {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && filteredOrders.length === 0 && (
              <p
                className="text-[#873641] text-xl"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                {modeFilter === "all" && statusFilter === "all"
                  ? "No orders yet."
                  : `No orders found for ${modeFilter === "all" ? "any mode" : modeFilter} and ${statusFilter === "all" ? "any status" : statusFilter}.`}
              </p>
            )}

            {!isLoading && !errorMessage && filteredOrders.length > 0 && (
              <table className="w-full min-w-205 border-collapse">
                <thead>
                  <tr className="text-left border-b-2 border-[#cc8386]">
                    <th className="py-3 px-2 text-[#873641] text-xl">Date</th>
                    <th className="py-3 px-2 text-[#873641] text-xl">
                      Customer
                    </th>
                    <th className="py-3 px-2 text-[#873641] text-xl">Items</th>
                    <th className="py-3 px-2 text-[#873641] text-xl">Mode</th>
                    <th className="py-3 px-2 text-[#873641] text-xl">
                      Payment
                    </th>
                    <th className="py-3 px-2 text-[#873641] text-xl">Status</th>
                    <th className="py-3 px-2 text-[#873641] text-xl">Total</th>
                    <th className="py-3 px-2 text-[#873641] text-xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#e5b0b3] align-top"
                    >
                      <td className="py-3 px-2 text-[#873641]">
                        {new Date(order.date).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-[#873641]">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-2 text-[#873641]">
                        {order.items
                          .map((item) => `${item.name} x${item.quantity}`)
                          .join(", ")}
                      </td>
                      <td className="py-3 px-2 text-[#873641]">
                        {order.modeBuying}
                      </td>
                      <td className="py-3 px-2 text-[#873641]">
                        {order.modePayment}
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleUpdateStatus(
                              order,
                              event.target.value as
                              | "pending"
                              | "paid"
                              | "completed",
                            )
                          }
                          disabled={activeOrderId === order._id}
                          className={`rounded-full px-3 py-1 text-sm font-bold text-white outline-none disabled:opacity-60 ${order.status === "paid" ? "bg-green-600" : order.status === "completed" ? "bg-blue-600" : "bg-orange-500"}`}
                        >
                          <option value="pending" className="text-[#873641]">
                            pending
                          </option>
                          <option value="paid" className="text-[#873641]">
                            paid
                          </option>
                          <option value="completed" className="text-[#873641]">
                            completed
                          </option>
                        </select>
                      </td>
                      <td className="py-3 px-2 text-[#873641] font-bold">
                        P{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {(order.modeBuying === "delivery" ||
                            order.modeBuying === "reservation" ||
                            (order.modePayment === "gcash" && order.gcashRefNo)) && (
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="rounded-full bg-[#e08a1d] px-3 py-1 text-sm font-bold text-white hover:bg-[#c87413]"
                              >
                                Details
                              </button>
                            )}
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            disabled={activeOrderId === order._id}
                            className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={() => navigate("/")}
              className="bg-[#fce18d] text-[#e1a0aa] text-2xl md:text-3xl hover:bg-[#e08a1d] transition-colors rounded-[30px] px-10 py-3 shadow-md font-bold"
              style={{ fontFamily: "Opun Mai Bold Italic" }}
            >
              Back to Home
            </button>
            <button
              onClick={fetchOrders}
              className="bg-[#e1a0aa] text-white text-2xl md:text-3xl hover:bg-[#c98e97] transition-colors rounded-[30px] px-10 py-3 shadow-md font-bold"
              style={{ fontFamily: "Opun Mai Bold Italic" }}
            >
              Reload Data
            </button>
          </div>
        </div>
      </div>

      {selectedOrder &&
        (selectedOrder.modeBuying === "delivery" ||
          selectedOrder.modeBuying === "reservation" ||
          selectedOrder.modePayment === "gcash") && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="w-full max-w-lg rounded-3xl bg-[#fce18d] p-6 md:p-8 shadow-2xl border-4 border-[#cc8386]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b-2 border-[#cc8386] pb-4">
                <h2
                  className="text-[#873641] text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "Opun Mai Bold Italic" }}
                >
                  {selectedOrder.modeBuying === "delivery"
                    ? "Delivery Details"
                    : selectedOrder.modeBuying === "reservation"
                      ? "Reservation Details"
                      : "Payment Details"}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-full bg-[#cc8386] px-4 py-2 text-white font-bold hover:bg-[#a8606c]"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4 text-[#873641]">
                {selectedOrder.modeBuying === "delivery" && (
                  <>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                        Location
                      </p>
                      <p className="text-xl font-bold">
                        {selectedOrder.location || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                        IG/FB Contact
                      </p>
                      <p className="text-xl font-bold">
                        {selectedOrder.customerUsername || "Not provided"}
                      </p>
                    </div>
                  </>
                )}

                {selectedOrder.modeBuying === "reservation" && (
                  <>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                        Time of Pickup
                      </p>
                      <p className="text-xl font-bold">
                        {formatPickupTime(selectedOrder.pickupTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                        IG/FB Contact
                      </p>
                      <p className="text-xl font-bold">
                        {selectedOrder.customerUsername || "Not provided"}
                      </p>
                    </div>
                  </>
                )}

                {selectedOrder.modePayment === "gcash" && (
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                      GCash Reference Number
                    </p>
                    <p className="text-xl font-bold">
                      {selectedOrder.gcashRefNo || "Not provided"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </PageLayout>
  );
};

export default SalesTrackerPage;
