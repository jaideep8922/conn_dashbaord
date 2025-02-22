// import { ProfileSidebar } from '@/component/profile/ProfileSidebar'

import { PageProps } from "../../../../.next/types/app/layout";

// type Props = {
//     params: {
//       id: string
//     }
//   }
  
//   const page = ({ params }: Props) => {
//     return (
//       <div>
//         <ProfileSidebar id={params.id} />
//       </div>
//     )
//   }
  
//   export default page
  
  

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Ensure params are awaited

  return <div>Product ID: {resolvedParams.id}</div>;
}
