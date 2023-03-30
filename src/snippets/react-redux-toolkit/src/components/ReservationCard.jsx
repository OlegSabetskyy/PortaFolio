import React from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../features/customerSlice";
import { removeReservation } from "../features/reservationSlice";

const ReservationCard = ({ name, index }) => {
    const dispatch = useDispatch();

    const handleOnAddCustomer = (index) => {
        dispatch(removeReservation(index));
        dispatch(addCustomer(name));
    };

    return (
        <div
            className="reservation-card-container"
            onClick={() => handleOnAddCustomer(index)}
        >
            {name}
        </div>
    );
};

export default ReservationCard;
