import { useState } from "react";
import "./styles.css";
import explore from "./data/folderData";
import Folder from "./components/folder";
import useTraverseTree from "./hooks/use-traverse-tree";
export default function App() {
  const [exploreData, SetExploreData] = useState(explore);
  const { insertNode } = useTraverseTree();
  const handelInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(exploreData, folderId, item, isFolder);
    SetExploreData(finalTree);
  };
  return (
    <div className="App">
      <Folder handelInsertNode={handelInsertNode} explore={exploreData} />
    </div>
  );
}
