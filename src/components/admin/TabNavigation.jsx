const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-t border-border bg-background/50">
      <div className="container mx-auto px-6 flex gap-4">
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === "members"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
          }`}
        >
          Member Management
        </button>
        <button
          onClick={() => setActiveTab("checkin")}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === "checkin"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
          }`}
        >
          Check-In
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
