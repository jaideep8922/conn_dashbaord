// import { ProductDetail } from "@/component/productManagement/SingleProductDetails";
// import { FC } from "react";

import { ProductDetail } from "@/component/productManagement/SingleProductDetails";
import { PageProps } from "../../../../.next/types/app/layout";

// interface PageProps {
//   params: { id: string }; // Ensure params is correctly typed
// }

// const Page: FC<PageProps> = ({ params }) => {
//   return (
//     <div>
//       <ProductDetail id={params.id} />
//     </div>
//   );
// };

// export default Page;



export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Ensure params are awaited

  return <ProductDetail id={resolvedParams.id} />;
}
