import MobileHeader from "@/components/header-and-sidebar/MobileHeader";
import Sidebar from "@/components/header-and-sidebar/Sidebar";
import MessageContainer from "@/components/messages/MessageContainer";

function Home() {
  return (
    <div className="flex h-screen w-full max-w-4xl overflow-hidden bg-clip-padding backdrop-filter sm:h-112.5 sm:rounded-lg sm:bg-gray-400/0 sm:backdrop-blur-lg md:h-137.5">
      <div className="hidden sm:block sm:min-w-48">
        <Sidebar showMessageMenu={true} />
      </div>
      <div className="flex w-full flex-col md:min-w-112.5">
        <div className="block sm:hidden">
          <MobileHeader showMessageMenu={true} />
        </div>
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
