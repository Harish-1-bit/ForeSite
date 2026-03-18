import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties, getAllUser } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { User } from "lucide-react";
import { toast } from "sonner";
import { LoaderScreen } from "../../components/LoaderScreen.jsx";

export default function AdminDashboard() {  
  const {allUser,allProperties,adminLoading,adminError,adminMessage} = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if(adminError && adminMessage){
      toast.error(adminMessage);
    }
    dispatch(getAllUser());
    dispatch(getAllProperties());
  }, [dispatch,adminError,adminMessage]);
  if(adminLoading){
    return <LoaderScreen/>
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <input type="text" placeholder="Search properties, users..." className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500" />
            </div>
            <div className="flex items-center gap-6">
              <button className="relative text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="text-right">

                  <div className="text-sm font-medium text-gray-900">Super Admin</div>
                </div>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera" alt="Alex Rivera" className="w-10 h-10 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Total Properties */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
                  </svg>
                  +12.5%
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium mb-2">Total Properties</div>
              <div className="text-3xl font-bold text-gray-900">{allProperties.length}</div>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
                  </svg>
                  +4.3%
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium mb-2">Total Users</div>
              <div className="text-3xl font-bold text-gray-900">{allUser.length}</div>
            </div>

            {/* Monthly Revenue */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
                  </svg>
                  +18.2%
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium mb-2">Monthly Revenue</div>
              <div className="text-3xl font-bold text-gray-900">₹ 145,200</div>
            </div>

            {/* Avg. AI Accuracy */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" />
                  </svg>
                  -0.2%
                </div>
              </div>
              <div className="text-gray-600 text-sm font-medium mb-2">Avg. AI Accuracy</div>
              <div className="text-3xl font-bold text-gray-900">98.4%</div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-8">
            {/* Recent Property Listings */}
            <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Property Listings</h2>
                <a href="#" className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</a>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Property</th>
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">City</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allProperties.map((property,index)=>{
                    if(index<4){
                      return (
                        <tr key={property._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={property.propertyImage[0]} alt="Azure Sky Tower" className="w-10 h-10 rounded object-cover" />
                        <span className="font-medium text-gray-900">{property.title}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 text-sm">{property.address}</td>
                    <td className="py-4 font-semibold text-gray-900">₹{property.price}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 ${property.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-semibold rounded`}>{property.isActive ? "ACTIVE" : "INACTIVE"}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div>{property.city}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                      )
                    }
                    })
                  }

                  
                </tbody>
              </table>
            </div>

            {/* User Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Seller</h2>

              <div className="space-y-6">
                  {
                    allUser.map((user,index)=>{
                      if(user.role==="seller"){
                        return (
                          <div key={user._id} className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{user.name}</h3>
                    <p className="text-gray-600 text-xs mt-1">{user.email}</p>
                  </div>
                </div>
                        )
                      }
                    })
                  }
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
