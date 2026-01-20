import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Calendar, CreditCard, Banknote, Smartphone, RefreshCw, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";
import { paymentsAPI } from "../../lib/api";

const RevenueDashboard = ({ refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await paymentsAPI.getRevenueStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `KES ${(amount || 0).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
        <div className="flex items-center justify-center py-12">
          <RefreshCw size={32} className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center">
              <BarChart3 size={28} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Revenue Dashboard</h3>
              <p className="text-sm text-muted-foreground">Track your gym's financial performance</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={fetchStats}
            className="border-slate-600 hover:bg-slate-700"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </Button>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Today */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-5 border border-green-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign size={20} className="text-green-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(stats?.revenue?.today)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.payment_counts?.today || 0} payments
            </p>
          </div>

          {/* This Week */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Calendar size={20} className="text-blue-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">This Week</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{formatCurrency(stats?.revenue?.week)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.payment_counts?.week || 0} payments
            </p>
          </div>

          {/* This Month */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">This Month</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">{formatCurrency(stats?.revenue?.month)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.payment_counts?.month || 0} payments
            </p>
          </div>

          {/* All Time */}
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl p-5 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-orange-400" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">All Time</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{formatCurrency(stats?.revenue?.all_time)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.payment_counts?.all_time || 0} payments
            </p>
          </div>
        </div>
      </div>

      {/* Revenue by Payment Method */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
        <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <CreditCard size={20} className="text-primary" />
          Revenue by Payment Method
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cash */}
          <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Banknote size={24} className="text-green-400" />
              </div>
              <div>
                <p className="font-medium">Cash</p>
                <p className="text-xs text-muted-foreground">
                  {stats?.payment_counts_by_method?.cash || 0} payments
                </p>
              </div>
            </div>
            <p className="text-xl font-bold text-green-400">
              {formatCurrency(stats?.revenue_by_method?.cash)}
            </p>
            {stats?.revenue?.all_time > 0 && (
              <div className="mt-3">
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{
                      width: `${((stats?.revenue_by_method?.cash || 0) / stats?.revenue?.all_time * 100).toFixed(1)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats?.revenue_by_method?.cash || 0) / stats?.revenue?.all_time * 100).toFixed(1)}% of total
                </p>
              </div>
            )}
          </div>

          {/* Stripe */}
          <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CreditCard size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Stripe</p>
                <p className="text-xs text-muted-foreground">
                  {stats?.payment_counts_by_method?.stripe || 0} payments
                </p>
              </div>
            </div>
            <p className="text-xl font-bold text-blue-400">
              {formatCurrency(stats?.revenue_by_method?.stripe)}
            </p>
            {stats?.revenue?.all_time > 0 && (
              <div className="mt-3">
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${((stats?.revenue_by_method?.stripe || 0) / stats?.revenue?.all_time * 100).toFixed(1)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats?.revenue_by_method?.stripe || 0) / stats?.revenue?.all_time * 100).toFixed(1)}% of total
                </p>
              </div>
            )}
          </div>

          {/* M-Pesa */}
          <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Smartphone size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="font-medium">M-Pesa</p>
                <p className="text-xs text-muted-foreground">
                  {stats?.payment_counts_by_method?.mpesa || 0} payments
                </p>
              </div>
            </div>
            <p className="text-xl font-bold text-orange-400">
              {formatCurrency(stats?.revenue_by_method?.mpesa)}
            </p>
            {stats?.revenue?.all_time > 0 && (
              <div className="mt-3">
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{
                      width: `${((stats?.revenue_by_method?.mpesa || 0) / stats?.revenue?.all_time * 100).toFixed(1)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats?.revenue_by_method?.mpesa || 0) / stats?.revenue?.all_time * 100).toFixed(1)}% of total
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
