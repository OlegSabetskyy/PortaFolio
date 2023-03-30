import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer } from "../features/customerSlice";

const CustomerCard = ({ customerId, customerName, food }) => {
    const [foodName, setFoodName] = useState("");
    const dispatch = useDispatch();

    const addFoodHandler = () => {
        if (!foodName) return;

        dispatch(
            addFoodToCustomer({
                customerId,
                food: foodName
            })
        );
        setFoodName("");
    };

    return (
        <div className="customer-food-card-container">
            {customerName}
            <div className="customer-foods-container">
                {food.map((food, foodIndex) => (
                    <div key={foodIndex} className="customer-food">
                        {food}
                    </div>
                ))}
                <div className="customer-food-input-container">
                    <input
                        value={foodName}
                        onChange={(ev) => setFoodName(ev.currentTarget.value)}
                    />
                    <button onClick={addFoodHandler}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;
