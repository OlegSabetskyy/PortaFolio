import { formatCurrency } from "../utils/format";
import Card from "../components/Card";

const Dashboard = () => {
    return (
        <div className="flex flex-1 py-8 justify-center items-start bg-slate-100">
            <div className="flex flex-col flex-1 max-w-screen-lg">
                <Card paddingSize={"big"}>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-slate-900 text-4xl font-black">
                            {formatCurrency(1234)}
                        </h1>
                        <p className="text-slate-900 text-2xl">Sales</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
