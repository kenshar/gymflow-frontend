import { useState, useEffect } from "react";
import { History, Download, Filter, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, RefreshCw, CreditCard, Banknote, Smartphone, Search } from "lucide-react";
import { Button } from "../ui/button";
import { paymentsAPI } from "../../lib/api";

const PaymentHistory = ({ refreshTrigger }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    method: '',
    start_date: '',
    end_date: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, [currentPage, refreshTrigger]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: 10,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      };
      const response = await paymentsAPI.getAll(params);
      setPayments(response.payments || []);
      setTotalPages(response.pages || 1);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchPayments();
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      method: '',
      start_date: '',
      end_date: ''
    });
    setCurrentPage(1);
  };

  const handleDownloadReceipt = async (receiptId) => {
    try {
      const blob = await paymentsAPI.downloadReceipt(receiptId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${receiptId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { icon: CheckCircle, color: 'text-green-400 bg-green-500/10 border-green-500/30' },
      pending: { icon: Clock, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
      failed: { icon: XCircle, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
      refunded: { icon: RefreshCw, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    const icons = {
      cash: <Banknote size={16} className="text-green-400" />,
      stripe: <CreditCard size={16} className="text-blue-400" />,
      mpesa: <Smartphone size={16} className="text-orange-400" />
    };
    return icons[method] || <CreditCard size={16} />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center">
            <History size={28} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Payment History</h3>
            <p className="text-sm text-muted-foreground">View and manage all payments</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-slate-600 hover:bg-slate-700"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={fetchPayments}
            className="border-slate-600 hover:bg-slate-700"
          >
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-600/50 text-foreground border border-slate-500 focus:border-primary outline-none text-sm"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Payment Method</label>
              <select
                value={filters.method}
                onChange={(e) => setFilters(prev => ({ ...prev, method: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-600/50 text-foreground border border-slate-500 focus:border-primary outline-none text-sm"
              >
                <option value="">All Methods</option>
                <option value="cash">Cash</option>
                <option value="stripe">Stripe</option>
                <option value="mpesa">M-Pesa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Start Date</label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => setFilters(prev => ({ ...prev, start_date: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-600/50 text-foreground border border-slate-500 focus:border-primary outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">End Date</label>
              <input
                type="date"
                value={filters.end_date}
                onChange={(e) => setFilters(prev => ({ ...prev, end_date: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-slate-600/50 text-foreground border border-slate-500 focus:border-primary outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleFilter} size="sm" className="bg-primary">
              <Search size={14} className="mr-1" />
              Apply Filters
            </Button>
            <Button onClick={clearFilters} variant="outline" size="sm" className="border-slate-500">
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Payments Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw size={24} className="animate-spin text-primary" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History size={48} className="mx-auto mb-4 opacity-50" />
            <p>No payments found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">
                        {payment.member?.first_name || ''} {payment.member?.last_name || ''}
                      </p>
                      <p className="text-xs text-muted-foreground">@{payment.member?.username}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-green-400">
                      {payment.currency} {payment.amount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.payment_method)}
                      <span className="capitalize">{payment.payment_method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(payment.payment_status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {formatDate(payment.created_at)}
                  </td>
                  <td className="py-4 px-4">
                    {payment.receipt && payment.payment_status === 'completed' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment.receipt.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Download size={16} className="mr-1" />
                        PDF
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-slate-600"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-600"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
