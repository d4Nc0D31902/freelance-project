import React, { useEffect, useState } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { BsFonts } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { LuFileUp } from "react-icons/lu";

const ItemTypes = {
  ELEMENT: "element",
  COLUMN: "column",
};

// DraggableItem component
const DraggableItem = ({
  item,
  index,
  moveItem,
  onDropOutside,
  onSelectItem,
  setTabSelected,
  removeFromSource,
}) => {
  useEffect(() => {
    console.log("Item rendered:", item);
  }, [item]);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELEMENT,
    item: { index, id: item.id, type: item.type, name: item.name },
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        onDropOutside(draggedItem.index);
      } else {
        // Ensure the item is removed from its source
        removeFromSource(draggedItem.id, draggedItem.index);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    hover: (draggedItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleClick = (item) => {
    console.log("Clicked item details:", item);
    onSelectItem(item);
    setTabSelected("Selection");
  };

  return (
    <div
      className="my-2"
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.1 : 1 }}
    >
      {item.type === "Column" ? (
        <div className="bg-zinc-100 hover:bg-zinc-200">
          <div className="flex space-x-4">
            <div
              className="px-2 w-full rounded"
              onClick={() => handleClick(item.contentLeft[0])}
            >
              <DropZone
                items={item.contentLeft || []}
                onDropItem={(newItem) => {
                  const newItemWithId = { ...newItem, id: uuidv4() };
                  const newItems = [...(item.contentLeft || []), newItemWithId];
                  item.contentLeft = newItems;
                }}
                onMoveItem={(fromIndex, toIndex) => {
                  const newItems = [...(item.contentLeft || [])];
                  const [movedItem] = newItems.splice(fromIndex, 1);
                  newItems.splice(toIndex, 0, movedItem);
                  item.contentLeft = newItems;
                }}
                removeFromSource={(itemId, itemIndex) => {
                  item.contentLeft = item.contentLeft.filter(
                    (contentItem, idx) =>
                      contentItem.id !== itemId || idx !== itemIndex
                  );
                }}
                acceptTypes={[ItemTypes.ELEMENT]}
                onSelectItem={onSelectItem}
                setTabSelected={setTabSelected}
                className="px-2 bg-zinc-200 w-full"
              />
            </div>
            <div
              className="px-2 w-full rounded"
              onClick={() => handleClick(item.contentRight[0])}
            >
              <DropZone
                items={item.contentRight || []}
                onDropItem={(newItem) => {
                  const newItemWithId = { ...newItem, id: uuidv4() };
                  const newItems = [
                    ...(item.contentRight || []),
                    newItemWithId,
                  ];
                  item.contentRight = newItems;
                }}
                onMoveItem={(fromIndex, toIndex) => {
                  const newItems = [...(item.contentRight || [])];
                  const [movedItem] = newItems.splice(fromIndex, 1);
                  newItems.splice(toIndex, 0, movedItem);
                  item.contentRight = newItems;
                }}
                removeFromSource={(itemId, itemIndex) => {
                  item.contentRight = item.contentRight.filter(
                    (contentItem, idx) =>
                      contentItem.id !== itemId || idx !== itemIndex
                  );
                }}
                acceptTypes={[ItemTypes.ELEMENT]}
                onSelectItem={onSelectItem}
                setTabSelected={setTabSelected}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="space-y-1 cursor-move hover:bg-zinc-200 p-2"
          onClick={() => handleClick(item)}
        >
          <p className="text-xs text-zinc-400">{item.name}</p>
          <Input
            size="large"
            label={item.type}
            readOnly
            className="p-3 cursor-move"
            placeholder={item.placeholder}
          />
        </div>
      )}
    </div>
  );
};

// DropZone Component
const DropZone = ({
  items,
  onDropItem,
  onMoveItem,
  acceptTypes,
  removeFromSource,
  onSelectItem,
  setTabSelected,
}) => {
  const [, drop] = useDrop({
    accept: acceptTypes,
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      if (!items.some((i) => i.id === item.id)) {
        onDropItem(item);
        removeFromSource(item.id, item.index);
      }
    },
  });

  return (
    <div ref={drop} className="w-full min-h-16">
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          index={index}
          item={item}
          moveItem={(fromIndex, toIndex) =>
            onMoveItem(index, fromIndex, toIndex)
          }
          onDropOutside={() => {}}
          onSelectItem={onSelectItem}
          setTabSelected={setTabSelected}
          removeFromSource={removeFromSource}
        />
      ))}
    </div>
  );
};

// MyDropArea Component
const MyDropArea = ({
  onSelectItem,
  droppedItems,
  setDroppedItems,
  setTabSelected,
}) => {
  const removeItem = (index) => {
    setDroppedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...droppedItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setDroppedItems(updatedItems);
  };

  const handleDropItem = (newItem) => {
    if (!droppedItems.some((item) => item.id === newItem.id)) {
      if (newItem.type === "Column") {
        setDroppedItems((prevItems) => [
          ...prevItems,
          { id: uuidv4(), type: "Column", contentLeft: [], contentRight: [] },
        ]);
      } else {
        setDroppedItems((prevItems) => [
          ...prevItems,
          { id: uuidv4(), ...newItem },
        ]);
      }
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.ELEMENT, ItemTypes.COLUMN],
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        if (!droppedItems.some((i) => i.id === item.id)) {
          handleDropItem({ ...item, id: uuidv4() });
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? "rgba(0, 0, 0, 0.05)" : "transparent";

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={drop}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor,
        }}
        className="p-3"
      >
        {droppedItems.length > 0 ? (
          <div className="p-3 h-full">
            {droppedItems.map((item, index) => (
              <DraggableItem
                key={item.id}
                index={index}
                item={item}
                moveItem={moveItem}
                onDropOutside={removeItem}
                onSelectItem={onSelectItem}
                setTabSelected={setTabSelected}
                removeFromSource={(itemId, itemIndex) => {
                  // Ensure that the item is removed from its source
                  const updatedItems = [...droppedItems];
                  updatedItems.splice(itemIndex, 1);
                  setDroppedItems(updatedItems);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="p-3 h-full flex flex-col gap-2 justify-center items-center border-2 border-dashed rounded-lg">
            <div className="flex flex-row items-center gap-3">
              <BsFonts size={38} color="#a1a1aa" />
              <CiImageOn size={38} color="#a1a1aa" />
              <LuFileUp size={34} color="#a1a1aa" />
            </div>
            <p className="text-lg text-zinc-400">
              Click and drag an element to get started
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MyDropArea;
