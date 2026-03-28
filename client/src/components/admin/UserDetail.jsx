import { BadgeAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/admin/adminSlice';

export default function UserDetail({ user, isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const handleUpdateUser = (user) => {
    dispatch(updateUser(user));
    onClose();
  }
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-gray-200">
          <div className="flex items-start gap-6 flex-1">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {user.role}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{user.email}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium text-sm">{user.isActive ? "Active" : "Inactive"}</span>
                </div>
                <span className="text-gray-500 text-sm">Joined {new Date(user.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
         

          {/* Recent Activity and Account Details */}
          <div className="grid md:grid-cols-2 gap-8">
           
            {/* Account Details */}
            <div>
              <h3 className="text-sm flex font-bold text-gray-500 uppercase tracking-wide mb-6">
                Account Details
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center">
                  <p className="w-[80px] text-gray-600 text-sm shrink-0">Phone</p>
                  <p className="text-gray-900 font-medium">{user.phone}</p>
                </div>
                
                <div className="flex items-center">
                  <p className="w-[120px] text-gray-600 text-sm shrink-0">Identity Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium text-sm">Verified</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="w-[100px] text-gray-600 text-sm shrink-0">Last Login</p>
                  <p className="text-gray-900 font-medium">{new Date(user.updatedAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Management Actions</p>
              <div className="flex items-center gap-2">
                {user.isActive ? (
                  <button 
                    onClick={() => handleUpdateUser({ id: user._id, isActive: false })} 
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors"
                  >
                    <BadgeAlert size={16} />
                    Suspend
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateUser({ id: user._id, isActive: true })} 
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors"
                  >
                    <ShieldCheck size={16} />
                    Activate
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 sm:flex-none">
              <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">Change Role</p>
              <select
                value={user.role}
                onChange={(e) => handleUpdateUser({ id: user._id, role: e.target.value })}
                className="w-full sm:w-32 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
