"use client"
import { MetricCard } from "./chart/metric-card"
import { AreaChart } from "./chart/area-chart"
import { DonutChart } from "./chart/donut-chart"
import { Users, Mail, UserCheck, UserMinus, UserCog, Monitor, Phone } from 'lucide-react'
import { useEffect, useState } from "react"

export default function UserList() {

  const [count, setCount] = useState<any>(0)
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-dashboard-counts`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();
        console.log("result", result)

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch product details');
        }

        setCount(result)
        // setProductData(result);
        // setError(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching product list:', error.message);
        }
        // setError(error.message);
      }
    };

    fetchProductList();

  }, []);


  return (
    <div className="p-2 space-y-2 m-3">
      <div className="grid grid-cols-7 gap-4">
        <MetricCard
          title="Retailer"
          value={count?.data?.retailerCount}
          icon={<Users className="text-purple-500" width={20} />}
        />
        <MetricCard
          title="Distributor"
          value={count?.data?.supplierCount}
          icon={<Mail className="text-orange-500" width={20} />}
        />
        <MetricCard
          title="Active Users"
          value={count?.data?.activeUsersCount}
          icon={<UserCheck className="text-green-500" width={20} />}
        />
        <MetricCard
          title="Dropped User"
          value={count?.data?.droppedUsersCounts}
          icon={<UserMinus className="text-blue-500" width={20} />}
        />
        <MetricCard
          title="Churned User"
          value={count?.data?.droppedUsersCounts}
          icon={<UserCog className="text-yellow-500" width={20} />}
        />
        <MetricCard
          title="Enquiries Received"
          value={count?.data?.enquiresCount}
          icon={<Monitor className="text-green-500" width={20} />}
        />
        <MetricCard
          title="Enquiries Confirmed"
          value={count?.data?.confirmedEnquiresCount}
          icon={<Phone className="text-pink-500" width={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="p-2">
            <h3 className="font-semibold mb-4"><span className="text-2xl font-bold pr-3">{count?.data?.activeUsersCount}</span>Total Users</h3>
            {/* <LineChart /> */}
            <AreaChart data={[{ name: "Total Users", value: 0 }, { name: "Total Users", value: count?.data?.activeUsersCount || 0 }]} />

          </div>
        </div>

        <div>
          <div className="p-4">
            <h3 className="font-semibold mb-4"><span className="text-2xl font-bold pr-3">{count?.data?.registeredProducts}</span>Registered Product</h3>
            {/* <LineChart variant="yellow" /> */}
            <AreaChart data={[{ name: "Total Registered Product", value: 0 }, { name: "Total Registered Product", value: count?.data?.registeredProducts || 0 }]} />

          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="p-4">
            <h3 className="font-semibold mb-4">Peak Platform Traffic</h3>
            <AreaChart />
          </div>
        </div>

        <div>
          <div className="p-4">
            <h3 className="font-semibold mb-4"><span className="text-2xl font-bold pr-3 text-yellow-400">4000</span>Total Active User</h3>
            <LineChart variant="multi" />
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold mb-4">Enquiries<span className="text-2xl font-bold pl-3 text-yellow-400">{count?.data?.enquiresCount}</span></h3>
            </div>
            {/* Check if registeredProducts exists and is an array */}
            <DonutChart registeredProducts={count?.data?.enquiresCount || [0, 0, 0, 0, 0]} />
          </div>
        </div>
      </div>

    </div>
  )
}

