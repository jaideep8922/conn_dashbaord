import Link from 'next/link'

export const locationData = {
  
    "Maharashtra": {
      cities: [
        { name: "Mumbai", pincode: "400001", userCount: 323579 },
        { name: "Pune", pincode: "411001", userCount: 156789 }
      ]
    },
    "Rajasthan": {
      cities: [
        { name: "Jaipur", pincode: "302001", userCount: 175923 },
        { name: "Udaipur", pincode: "313001", userCount: 89567 }
      ]
    }
  }

export default function Industry() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-6 border shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-semibold">Industry Type list</h1>
        <select className="border rounded-md px-3 py-2">
          <option>32</option>
          <option>64</option>
          <option>128</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">industry type</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(locationData).map(([state, data]) => (
              data.cities.map((city) => (
                <tr key={`${state}-${city.name}`} className="hover:bg-gray-50">
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {state.charAt(0)}
                      </div>
                      <div className="ml-4">{state}</div>
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">{city.name}</td>
                  {/* {/* <td className="px-6 py-4 whitespace-nowrap">{city.pincode}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap">{city.userCount.toLocaleString()}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">

                    <Link 
                      href={`/user-list`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                    </Link>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of {Object.values(locationData).reduce((acc, state) => acc + state.cities.length, 0)} results
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

