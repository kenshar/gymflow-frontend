import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, Shield, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { membersAPI } from "../lib/api";
import toast from "react-hot-toast";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadMember();
  }, [id]);

  const loadMember = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getById(id);
      setMember(response.member);
      setEditForm({
        first_name: response.member.first_name || "",
        last_name: response.member.last_name || "",
        email: response.member.email || "",
        phone: response.member.phone || "",
      });
    } catch (error) {
      console.error("Error loading member:", error);
      toast.error("Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await membersAPI.update(id, editForm);
      toast.success("Member updated successfully!");
      setEditing(false);
      loadMember();
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this member? This cannot be undone.")) return;

    try {
      await membersAPI.delete(id);
      toast.success("Member deleted successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading member...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-red-400" />
          </div>
          <p className="text-xl font-semibold mb-2">Member not found</p>
          <p className="text-muted-foreground mb-6">The member you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/admin")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft size={18} className="mr-2" />
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  const memberName = `${member.first_name || ""} ${member.last_name || ""}`.trim() || member.username;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <h1 className="font-display text-2xl tracking-wider gradient-text">
            MEMBER PROFILE
          </h1>
          <div className="flex gap-2">
            {!editing && (
              <>
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-500/10"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
            {/* Avatar & Name */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                member.is_active
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-gradient-to-br from-gray-500 to-gray-600"
              }`}>
                {(member.first_name?.[0] || member.username?.[0] || "?").toUpperCase()}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{memberName}</h2>
                <p className="text-muted-foreground mb-3">@{member.username}</p>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  member.is_active
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${member.is_active ? "bg-green-400" : "bg-gray-400"}`}></div>
                  {member.is_active ? "Active Member" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            {editing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">First Name</label>
                    <input
                      type="text"
                      value={editForm.first_name}
                      onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Last Name</label>
                    <input
                      type="text"
                      value={editForm.last_name}
                      onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 text-foreground border border-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleUpdate}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="outline"
                    className="flex-1 py-3 border-slate-600"
                  >
                    <X size={18} className="mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-blue-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">Email</span>
                  </div>
                  <p className="text-lg font-medium">{member.email}</p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-purple-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">Phone</span>
                  </div>
                  <p className="text-lg font-medium">{member.phone || "Not provided"}</p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Shield size={20} className="text-green-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">Role</span>
                  </div>
                  <p className="text-lg font-medium capitalize">{member.role}</p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Calendar size={20} className="text-orange-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">Member Since</span>
                  </div>
                  <p className="text-lg font-medium">
                    {new Date(member.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Member ID */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-sm text-muted-foreground">
                Member ID: <span className="font-mono text-foreground">#{member.id}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberProfile;
