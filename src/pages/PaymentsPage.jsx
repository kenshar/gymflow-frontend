import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CreditCard, History, BarChart3, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import PaymentForm from "../components/admin/PaymentForm";
import PaymentHistory from "../components/admin/PaymentHistory";
import RevenueDashboard from "../components/admin/RevenueDashboard";
import { isAuthenticated, removeAuthToken } from "../lib/api";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("record");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Check for Stripe success/cancel in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('success') === 'true') {
      toast.success('Payment completed successfully!');
      setActiveTab('history');
      setRefreshTrigger(prev => prev + 1);
      // Clean up URL
      navigate('/admin/payments', { replace: true });
    } else if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled');
      navigate('/admin/payments', { replace: true });
    }
  }, [location, navigate]);

  const handlePaymentSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('history');
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate("/");
  };

  const tabs = [
    { id: "record", label: "Record Payment", icon: CreditCard },
    { id: "history", label: "Payment History", icon: History },
    { id: "revenue", label: "Revenue Dashboard", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Admin
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold flex items-center gap-2">
                <CreditCard size={24} className="text-primary" />
                Payment Management
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-600"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-border bg-background/50">
          <div className="container mx-auto px-6 flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          {activeTab === "record" && (
            <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
          )}

          {activeTab === "history" && (
            <PaymentHistory refreshTrigger={refreshTrigger} />
          )}

          {activeTab === "revenue" && (
            <RevenueDashboard refreshTrigger={refreshTrigger} />
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentsPage;
