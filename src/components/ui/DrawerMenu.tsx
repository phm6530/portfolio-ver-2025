import { cn } from "../../lib/utils";

const DrawerMenu: React.FC<{
  drawerView: boolean;
  scrollOver: boolean;
  setDrawerView: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ drawerView, setDrawerView, scrollOver }) => {
  return (
    <div
      className="z-[999] block md:hidden"
      onClick={() => setDrawerView((prev) => !prev)}
    >
      <div className="w-8 h-8 relative flex items-center justify-center cursor-pointer">
        {/* Line 1 */}
        <span
          className={cn(
            "absolute w-6 h-0.5 rounded transition-transform duration-300 ease-in-out",
            "bg-gray-400",
            scrollOver && "bg-zinc-800 dark:bg-gray-400",
            drawerView ? "rotate-45" : "-translate-y-2"
          )}
        />
        {/* Line 2 */}
        <span
          className={cn(
            "absolute w-6 h-0.5 rounded transition-all duration-300 ease-in-out",
            "bg-gray-400",
            scrollOver && "bg-zinc-800 dark:bg-gray-400",
            drawerView ? "opacity-0" : "opacity-100"
          )}
        />
        {/* Line 3 */}
        <span
          className={cn(
            "absolute w-6 h-0.5 rounded transition-transform duration-300 ease-in-out",
            "bg-gray-400",
            scrollOver && "bg-zinc-800 dark:bg-gray-400",
            drawerView ? "-rotate-45" : "translate-y-2"
          )}
        />
      </div>
    </div>
  );
};

export default DrawerMenu;
