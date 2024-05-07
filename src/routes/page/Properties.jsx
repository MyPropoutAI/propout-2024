import Card from "../marketplace/Card";

const Properties = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-20">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Properties;
