import { useState, useEffect } from "react";
import { CreditCard, Banknote, User, Calendar, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { paymentsAPI, membersAPI, membershipsAPI } from "../../lib/api";

const PaymentForm = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    member_id: '',
    plan_id: '',
    amount: '',
    start_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, plansRes] = await Promise.all([
        membersAPI.getAll(),
        membershipsAPI.getPlans()
      ]);
      setMembers(membersRes.members || []);
      setPlans(plansRes.plans || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePlanChange = (planId) => {
    const plan = plans.find(p => p.id === parseInt(planId));
    setFormData(prev => ({
      ...prev,
      plan_id: planId,
      amount: plan ? plan.price : ''
    }));
  };

  const handleMemberSelect = (member) => {
    setFormData(prev => ({ ...prev, member_id: member.id.toString() }));
    setSearchTerm(`${member.first_name || ''} ${member.last_name || ''} (${member.username})`.trim());
    setShowDropdown(false);
  };

  const filteredMembers = members.filter(member => {
    const fullName = `${member.first_name || ''} ${member.last_name || ''} ${member.username} ${member.email}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      if (paymentMethod === 'cash') {
        const response = await paymentsAPI.recordCashPayment({
          member_id: parseInt(formData.member_id),
          plan_id: parseInt(formData.plan_id),
          amount: parseFloat(formData.amount),
          start_date: formData.start_date,
          notes: formData.notes
        });

        setFeedback({
          type: 'success',
          message: 'Cash payment recorded successfully!',
          details: `Receipt: ${response.payment?.receipt?.receipt_number || 'Generated'}`
        });

        // Reset form
        setFormData({
          member_id: '',
          plan_id: '',
          amount: '',
          start_date: new Date().toISOString().split('T')[0],
          notes: ''
        });
        setSearchTerm('');

        if (onPaymentSuccess) onPaymentSuccess();
      } else {
        // Stripe checkout
        const response = await paymentsAPI.createStripeCheckout(parseInt(formData.plan_id));
        if (response.checkout_url) {
          window.location.href = response.checkout_url;
        }
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Failed to process payment'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedMember = members.find(m => m.id === parseInt(formData.member_id));

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center">
          <CreditCard size={28} className="text-green-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Record Payment</h3>
          <p className="text-sm text-muted-foreground">Process cash or online payments</p>
        </div>
      </div>

      {/* Payment Method Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => setPaymentMethod('cash')}
          className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
            paymentMethod === 'cash'
              ? 'border-green-500 bg-green-500/10 text-green-400'
              : 'border-slate-600 hover:border-slate-500'
          }`}
        >
          <Banknote size={24} />
          <span className="font-semibold">Cash Payment</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('stripe')}
          className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
            paymentMethod === 'stripe'
              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
              : 'border-slate-600 hover:border-slate-500'
          }`}
        >
          <CreditCard size={24} />
          <span className="font-semibold">Stripe Payment</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Selection - Searchable Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            <User size={14} className="inline mr-2" />
            Select Member *
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                if (!e.target.value) {
                  setFormData(prev => ({ ...prev, member_id: '' }));
                }
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search by name or username..."
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required={paymentMethod === 'cash'}
            />
            {showDropdown && searchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleMemberSelect(member)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium">
                          {member.first_name || ''} {member.last_name || ''}
                        </span>
                        <span className="text-muted-foreground ml-2">(@{member.username})</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{member.email}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-muted-foreground">No members found</div>
                )}
              </div>
            )}
          </div>
          {selectedMember && (
            <p className="text-xs text-green-400 mt-1">
              Selected: {selectedMember.first_name} {selectedMember.last_name} ({selectedMember.email})
            </p>
          )}
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            <CreditCard size={14} className="inline mr-2" />
            Membership Plan *
          </label>
          <select
            value={formData.plan_id}
            onChange={(e) => handlePlanChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          >
            <option value="">Select a plan</option>
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - KES {plan.price?.toLocaleString()} ({plan.duration_days} days)
              </option>
            ))}
          </select>
        </div>

        {/* Amount - Auto-filled from plan */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Amount (KES) *
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Amount"
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            <Calendar size={14} className="inline mr-2" />
            Membership Start Date
          </label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {/* Notes - Cash only */}
        {paymentMethod === 'cash' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <FileText size={14} className="inline mr-2" />
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              rows={3}
              placeholder="Add any notes about this payment..."
            />
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-xl border ${
            feedback.type === 'success'
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {feedback.type === 'success' ? (
                <CheckCircle className="text-green-400 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-red-400 mt-0.5" size={20} />
              )}
              <div>
                <p className={`font-semibold ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.message}
                </p>
                {feedback.details && (
                  <p className="text-xs text-muted-foreground mt-1">{feedback.details}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !formData.plan_id || (paymentMethod === 'cash' && !formData.member_id)}
          className={`w-full py-6 text-base font-semibold rounded-xl transition-all shadow-lg ${
            paymentMethod === 'cash'
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-green-500/25'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : paymentMethod === 'cash' ? (
            <>
              <Banknote size={20} className="mr-2" />
              Record Cash Payment
            </>
          ) : (
            <>
              <CreditCard size={20} className="mr-2" />
              Proceed to Stripe Checkout
            </>
          )}
        </Button>
      </form>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default PaymentForm;
