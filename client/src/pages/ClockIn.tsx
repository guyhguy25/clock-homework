import { useClockIn } from '../api/timesheetApi';

const ClockIn = () => {
  const clockInMutation = useClockIn();

  const handleClockIn = async () => {
    const now = new Date();

    const date = now.toISOString().split("T")[0]; // 2024-03-18
    const startTime = "09:00:00"; // static for now

    try {
      await clockInMutation.mutateAsync({ date, startTime });
      alert("Clocked in successfully!");
    } catch (error) {
      alert("Failed to clock in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6 text-darkText">Clock In</h1>
        <button
          onClick={handleClockIn}
          disabled={clockInMutation.isPending}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          {clockInMutation.isPending ? "Clocking in..." : "Clock In"}
        </button>
      </div>
    </div>
  );
};

export default ClockIn;
