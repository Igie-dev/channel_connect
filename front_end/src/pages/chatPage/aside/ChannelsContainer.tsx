import { useState, useDeferredValue, ChangeEvent, useRef } from "react";
import ChannelList from "./ChannelList";
import { Input } from "@/components/ui/input";
type Props = {
  handleAside: () => void;
};
export default function ChannelsContainer({ handleAside }: Props) {
  const [search, setSearch] = useState("");
  const defferedSearch = useDeferredValue(search);
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setSearch(value);
    }, 1000);
  };
  return (
    <div className="flex flex-col flex-1 w-full min-h-0 gap-2 p-2">
      <div className="flex flex-col items-start w-full gap-2 pb-2 border-b h-fit">
        <span className="ml-1 text-lg font-semibold">Channels</span>
        <Input
          type="text"
          placeholder="Search..."
          className="bg-transparent"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <ChannelList searchText={defferedSearch} handleAside={handleAside} />
    </div>
  );
}
