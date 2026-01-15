import { useState } from "react";
import { Calendar, MapPin, Users, X } from "lucide-react";
import { Button } from "./ui/button";

const events = [
  {
    title: "HIIT Bootcamp Challenge",
    date: "Jan 20, 2026",
    time: "6:00 AM - 7:00 AM",
    location: "Main Training Floor",
    spots: 12,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
  },
  {
    title: "Yoga Flow Session",
    date: "Jan 22, 2026",
    time: "7:30 AM - 8:30 AM",
    location: "Studio B",
    spots: 20,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
  },
  {
    title: "Strength Training Workshop",
    date: "Jan 25, 2026",
    time: "5:00 PM - 7:00 PM",
    location: "Weight Room",
    spots: 8,
    image: "https://media.istockphoto.com/id/1937164504/photo/man-dumbbell-and-weightlifting-in-fitness-workout-or-arm-exercise-on-bench-at-indoor-gym.jpg?s=612x612&w=0&k=20&c=0hE2lkA56dsaWVkSZrmeiEf04jRC3yUrtbigGWfXvvU="
  }
];

const Upcoming = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleBookNow = (eventTitle) => {
    setSelectedEvent(eventTitle);
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
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Event booking submitted:", {
      ...formData,
      event: selectedEvent
    });

    alert(`Thank you for booking ${selectedEvent}!`);
    setFormData({
      name: "",
      email: "",
      phone: ""
    });
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phone: ""
    });
  };
  return (
    <section id="upcoming" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            UPCOMING <span className="gradient-text">EVENTS</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Join our exciting fitness events and challenges. 
            Book your spot today and take your training to the next level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group card-elevated"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="font-display text-2xl mb-4">{event.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{event.spots} spots left</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleBookNow(event.title)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Booking Form Modal */}
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
                Book Your Spot
              </h2>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Secure your place for {selectedEvent}
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
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm md:text-base"
                    placeholder="+254 () 123-4567"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 text-sm md:text-base font-semibold"
                >
                  Confirm Booking
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

export default Upcoming;