import AllModulesCard from "@/components/cards/all-module-card";

// Sample data, ensure you have correct data structure
const modules = [
  { moduleId: 1, module: "Module 01", description: "description 01" },
  { moduleId: 2, module: "Module 02", description: "description 02" },
  { moduleId: 3, module: "Module 03", description: "description 03" }
];

const AllModules = () => {
  return (
    <div className="p-4 px-6">
      {/* header */}
      <h1 className="font-inter font-bold text-2xl">All Modules</h1>
      {/* Module cards */}
      <div className="mt-8 mx-20">
        {modules.map((module) => (
          <AllModulesCard
            key={module.moduleId}
            moduleId={module.moduleId}
            module={module.module}
            description={module.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AllModules;
