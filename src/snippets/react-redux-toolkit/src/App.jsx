import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import CustomerCard from "./components/CustomerCard";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

function App() {
    const reservations = useSelector((state) => state.reservations.value);
    const customers = useSelector((state) => state.customers.value);
    const [reservationName, setReservationName] = useState("");
    const dispatch = useDispatch();

    const addReservationHandler = () => {
        if (!reservationName) return;

        dispatch(addReservation(reservationName));
        setReservationName("");
    };

    return (
        <div className="App">
            <div className="container">
                <div className="reservation-container">
                    <div>
                        <h5 className="reservation-header">Reservations</h5>
                        <div className="reservation-cards-container">
                            {reservations.map(
                                (reservation, reservationIndex) => (
                                    <ReservationCard
                                        key={reservationIndex}
                                        name={reservation}
                                        index={reservationIndex}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="reservation-input-container">
                        <input
                            value={reservationName}
                            onChange={(ev) =>
                                setReservationName(ev.currentTarget.value)
                            }
                        />
                        <button onClick={addReservationHandler}>Add</button>
                    </div>
                </div>
                <div className="customer-food-container">
                    {customers.map((customer) => (
                        <CustomerCard
                            key={customer.id}
                            customerId={customer.id}
                            customerName={customer.name}
                            food={customer.food}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
