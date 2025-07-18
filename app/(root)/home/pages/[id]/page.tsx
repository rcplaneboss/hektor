// app/(root)/home/pages/[id]/page.tsx

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <main>User: {params.id}</main>;
};

export default Page;
