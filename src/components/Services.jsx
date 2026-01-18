import { useState } from "react";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";

const services = [
  {
    name: "Essential Fitness",
    price: "Ksh 1,500",
    period: "/month",
    features: [
      "Cardio",
      "Access to gym floor",
      "Basic equipment usage",
      "Locker room access",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Diverse Group Class",
    price: "Ksh 3,500",
    period: "/month",
    features: [
      "Yoga",
      "Zumba",
      "Everything in Essential Fitness",
      "Group fitness classes",
      "Personal trainer (2x/month)",
      "Nutrition consultation",
      "Sauna & spa access"
    ],
    popular: true
  },
  {
    name: "Wellness % Recovery",
    price: "Ksh 9,000",
    period: "/month",
    features: [
      "Spa Services",
      "Physiotherapy",
      "Unlimited personal training",
      "Private locker",
      "Guest passes (4/month)",
      "Recovery zone access",
      "Priority class booking"
    ],
    popular: false
  }
];

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipType: ""
  });

  const handleGetStarted = (planName) => {
    setSelectedPlan(planName);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.membershipType) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Enrollment submitted:", {
      ...formData,
      plan: selectedPlan
    });

    alert(`Thank you for signing up for ${selectedPlan}!`);
    setFormData({
      name: "",
      email: "",
      membershipType: ""
    });
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      membershipType: ""
    });
  };
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            MEMBERSHIP <span className="gradient-text">PLANS</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your lifestyle and fitness goals. 
            Upgrade or downgrade anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card p-8 rounded-lg border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary card-elevated animate-pulse-glow' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-display text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="font-display text-5xl gradient-text">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-body text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleGetStarted(plan.name)}
                className={`w-full py-6 font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Enrollment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border animate-in fade-in zoom-in duration-300">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl md:text-3xl font-display mb-2 gradient-text">
                Complete Your Enrollment
              </h2>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Join our {selectedPlan} membership plan
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Membership Type</label>
                  <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
                    required
                  >
                    <option value="">Select membership type</option>
                    <option value="Essential Fitness">Essential Fitness - Ksh 1,500/month</option>
                    <option value="Diverse Group Class">Diverse Group Class - Ksh 3,500/month</option>
                    <option value="Wellness & Recovery">Wellness & Recovery - Ksh 9,000/month</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 text-sm md:text-base font-semibold"
                >
                  Complete Enrollment
                </Button>

                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="w-full py-3 text-sm md:text-base font-semibold border border-border rounded-lg hover:bg-background transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
