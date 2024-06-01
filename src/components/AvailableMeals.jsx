import useHttp from "../hooks/useHttp";
import Meal from "./Meal";
import Error from "./Error";

const requestConfig = {}

function AvailableMeals() {

    const { data: availableMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p>Fetching Meals... </p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error}></Error>

    }

    return (
        <ul id="meals">
            {availableMeals.map((availableMeal) => {
                return (
                    <li key={availableMeal.id} className="meal-item">
                        <Meal
                            meal={availableMeal}>
                        </Meal>
                    </li>
                );
            })}
        </ul>
    );
}

export default AvailableMeals;