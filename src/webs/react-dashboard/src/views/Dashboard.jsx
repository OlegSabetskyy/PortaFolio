import { formatCurrency } from "../utils/format";
import Card from "../components/Card";

const Dashboard = () => {
    return (
        <Card paddingSize={"big"}>
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 text-4xl font-black">
                    {formatCurrency(1234)}
                </h1>
                <p className="text-slate-900 text-2xl">Sales</p>
            </div>
        </Card>
    );
};

export default Dashboard;
