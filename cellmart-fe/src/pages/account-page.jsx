import MyReservations from "@/components/MyReservations";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

const AccountPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">My Account</h1>
      
      {/* Personal Information Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Personal Information
        </h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Name</p>
              <p className="text-lg font-semibold">{user?.fullName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-lg font-semibold">{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Reservations Section - Centered and Mobile Responsive */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <MyReservations />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;