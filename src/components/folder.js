import React, { useState } from "react";

const Folder = ({ handelInsertNode, explore }) => {
  const [expand, SetExpand] = useState(false);
  const [showInput, SetShowInput] = useState({
    visible: false,
    isFolder: null
  });

  const handelNewFolder = (e, isFolder) => {
    e.stopPropagation();
    SetExpand(true);
    SetShowInput({
      visible: true,
      isFolder: isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handelInsertNode(explore.id, e.target.value, showInput.isFolder);
      SetShowInput({
        ...showInput,
        visible: false
      });
    }
  };

  if (explore.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => SetExpand(!expand)}>
          <span>📁 {explore.name}</span>

          <div>
            <button onClick={(e) => handelNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handelNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                className="inputContainer__input"
                type="text"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => SetShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          <span>
            {explore.items.map((exp) => {
              return <Folder explore={exp} key={exp.id} />;
            })}
          </span>
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explore.name}</span>;
  }
};
export default Folder;
