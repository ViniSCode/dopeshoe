import { GetServerSideProps } from "next";

export default function Index() {
  return <div>Search</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const search = "";

  if (!search) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      search,
    },
  };
};
