import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GoChevronLeft, GoPlus } from "react-icons/go";
import { Modal, Input } from "antd";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import FormStepper from "../Stepper/FormStepper";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BsFonts } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { LuFileUp } from "react-icons/lu";
import MetaData from "../layout/MetaData";

import RightPanel from "./RightPanel";

const Content = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [selectedSide, setSelectedSide] = useState("");

  const [tabSelected, setTabSelected] = useState("General");
  const [selectedItem, setSelectedItem] = useState(null);

  const allElements = [
    { id: "1", name: "First Name", type: "text" },
    { id: "2", name: "Last Name", type: "text" },
    { id: "3", name: "Text", type: "text" },
    { id: "4", name: "Email", type: "email" },
    { id: "5", name: "Phone", type: "number" },
    {
      id: "name",
      name: "Name",
      type: "name",
      elementLeft: { id: uuidv4(), name: "First Name", type: "text" },
      elementRight: { id: uuidv4(), name: "Last Name", type: "text" },
    },
  ];

  const advancedElements = [
    {
      id: "column",
      name: "Column",
      type: "column",
      elementLeft: {},
      elementRight: {},
    },
  ];

  const updateItem = (updatedItem) => {
    const updateNestedItems = (items) =>
      items.map((item) => {
        if (item.id === updatedItem.id) {
          return { ...item, ...updatedItem };
        } else if (item.type === "column" || item.type === "name") {
          return {
            ...item,
            elementLeft:
              item.elementLeft?.id === updatedItem.id
                ? updatedItem
                : item.elementLeft,
            elementRight:
              item.elementRight?.id === updatedItem.id
                ? updatedItem
                : item.elementRight,
          };
        } else {
          return item;
        }
      });

    setDroppedItems(updateNestedItems(droppedItems));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      (source.droppableId === "ELEMENTS" ||
        source.droppableId === "ADVANCED_ELEMENTS") &&
      destination.droppableId === "DROP_AREA"
    ) {
      const newItem = [...allElements, ...advancedElements].find(
        (el) => el.id === result.draggableId
      );
      const newItemWithUniqueId = { ...newItem, id: uuidv4() };
      const newDroppedItems = Array.from(droppedItems);
      newDroppedItems.splice(destination.index, 0, newItemWithUniqueId);
      setDroppedItems(newDroppedItems);
    }

    if (
      source.droppableId === "DROP_AREA" &&
      destination.droppableId === "DROP_AREA"
    ) {
      const items = Array.from(droppedItems);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setDroppedItems(items);
    }
  };

  const showModal = (columnId, side) => {
    setCurrentColumn(columnId);
    setSelectedSide(side);
    setIsModalVisible(true);
  };

  const handleOk = (element) => {
    const updatedItems = droppedItems.map((item) => {
      if (item.id === currentColumn) {
        if (selectedSide === "left") {
          return { ...item, elementLeft: element };
        } else {
          return { ...item, elementRight: element };
        }
      }
      return item;
    });
    setDroppedItems(updatedItems);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteColumnItem = (itemId, side) => {
    const updatedItems = droppedItems.map((item) => {
      if (item.id === itemId) {
        if (side === "left") {
          return { ...item, elementLeft: {} };
        } else if (side === "right") {
          return { ...item, elementRight: {} };
        } else {
        }
      }
      return item;
    });
    setDroppedItems(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = droppedItems.filter((item) => item.id !== itemId);
    setDroppedItems(updatedItems);
  };

  const renderInputField = (item, dragHandleProps) => {
    if (item.type === "column") {
      return (
        <div
          className="flex items-center space-x-2 bg-zinc-100 rounded p-4"
          {...dragHandleProps}
        >
          <div className="space-y-1 w-1/2">
            {item.elementLeft.name ? (
              <div className="space-y-1">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-zinc-400">
                    {item.elementLeft.name}
                  </p>

                  <div className="flex flex-row gap-2 items-center">
                    <a className="" onClick={() => showModal(item.id, "left")}>
                      <FaExchangeAlt size={12} />
                    </a>

                    <a
                      onClick={() => (
                        setSelectedItem(item.elementLeft),
                        setTabSelected("Selection")
                      )}
                    >
                      <BsPencilSquare size={12} />
                    </a>

                    <a onClick={() => deleteColumnItem(item.id, "left")}>
                      <FaRegTrashAlt size={12} />
                    </a>
                  </div>
                </div>
                <Input
                  size="large"
                  readOnly
                  className="p-3 cursor-move"
                  placeholder={item.elementLeft.placeholder}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <a
                  className="space-y-1 w-full flex flex-col items-center justify-center"
                  onClick={() => showModal(item.id, "left")}
                >
                  <div>
                    <FaPlus size={18} />
                  </div>
                  <p>Add Element</p>
                </a>
              </div>
            )}
          </div>
          <div className="space-y-1 w-1/2">
            {item.elementRight.name ? (
              <div className="space-y-1">
                <div className="flex flex-row justify-between">
                  <p className="text-xs text-zinc-400">
                    {item.elementRight.name}
                  </p>

                  <div className="flex flex-row gap-2 items-center ">
                    <a className="" onClick={() => showModal(item.id, "right")}>
                      <FaExchangeAlt size={12} />
                    </a>

                    <a
                      onClick={() => (
                        setSelectedItem(item.elementRight),
                        setTabSelected("Selection")
                      )}
                    >
                      <BsPencilSquare size={12} />
                    </a>

                    <a onClick={() => deleteColumnItem(item.id, "right")}>
                      <FaRegTrashAlt size={12} />
                    </a>
                  </div>
                </div>
                <Input
                  size="large"
                  readOnly
                  className="p-3 cursor-move"
                  placeholder={item.elementRight.placeholder}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <a
                  className="space-y-1 w-full flex flex-col items-center justify-center"
                  onClick={() => showModal(item.id, "right")}
                >
                  <div>
                    <FaPlus size={18} />
                  </div>
                  <p>Add Element</p>
                </a>
              </div>
            )}
          </div>

          {(!item.elementLeft.name || !item.elementRight.name) && (
            <a onClick={() => deleteItem(item.id)}>
              <FaRegTrashAlt size={12} />
            </a>
          )}
        </div>
      );
    } else if (item.type === "name") {
      return (
        <div
          className="flex flex-row items-center space-x-2"
          {...dragHandleProps}
        >
          <div className="space-y-1 w-1/2">
            <div className="flex flex-row justify-between">
              <p className="text-xs text-zinc-400">{item.elementLeft.name}</p>

              <div className="flex flex-row gap-2 items-center ">
                <a
                  onClick={() => (
                    setSelectedItem(item.elementLeft),
                    setTabSelected("Selection")
                  )}
                >
                  <BsPencilSquare size={12} />
                </a>

                <a onClick={() => deleteItem(item.id, "left")}>
                  <FaRegTrashAlt size={12} />
                </a>
              </div>
            </div>
            <Input
              size="large"
              readOnly
              className="p-3 cursor-move"
              placeholder={item.elementLeft.placeholder}
            />
          </div>
          <div className="space-y-1 w-1/2">
            <div className="flex flex-row justify-between">
              <p className="text-xs text-zinc-400">{item.elementRight.name}</p>

              <div className="flex flex-row gap-2 items-center ">
                <a
                  onClick={() => (
                    setSelectedItem(item.elementRight),
                    setTabSelected("Selection")
                  )}
                >
                  <BsPencilSquare size={12} />
                </a>

                <a onClick={() => deleteItem(item.id, "right")}>
                  <FaRegTrashAlt size={12} />
                </a>
              </div>
            </div>
            <Input
              size="large"
              readOnly
              className="p-3 cursor-move"
              placeholder={item.elementRight.placeholder}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-1" {...dragHandleProps}>
          <div className="flex flex-row items-center justify-between">
            <p className="text-xs text-zinc-400">{item.name}</p>

            <div className="flex flex-row gap-2 items-center ">
              <a
                onClick={() => (
                  setSelectedItem(item), setTabSelected("Selection")
                )}
              >
                <BsPencilSquare size={12} />
              </a>

              <a onClick={() => deleteItem(item.id)}>
                <FaRegTrashAlt size={12} />
              </a>
            </div>
          </div>
          <Input
            size="large"
            readOnly
            className="p-3 cursor-move"
            placeholder={item.placeholder}
          />
        </div>
      );
    }
  };

  console.log(selectedItem, "selected");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MetaData title={"Content"} />

      <div className="flex flex-col bg-white h-screen">
        <div className="flex flex-row items-center justify-between p-4 border-b border-neutral-900">
          <div className="flex flex-row items-center gap-1">
            <GoChevronLeft size={38} />
            <p className="text-3xl">Create</p>
          </div>
          <FormStepper />
          <div className="flex items-center bg-neutral-400 px-10 py-2 rounded-full">
            <p>Next</p>
          </div>
        </div>
        <div className="flex flex-row flex-grow">
          {/* left panel */}
          <div className="w-1/5 border-r border-neutral-900 min-h-full h-full overflow-auto p-6">
            <Input
              placeholder="Search Fields"
              size="large"
              prefix={
                <FaMagnifyingGlass style={{ color: "rgba(0,0,0,.25)" }} />
              }
            />

            <p className="mt-8 text-lg font-semibold">General</p>

            <Droppable droppableId="ELEMENTS" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-4 flex flex-row flex-wrap"
                >
                  {allElements.map((element, index) => (
                    <div className="w-1/2">
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex flex-row items-center gap-2 grow border border-dashed p-4 mb-2 ${
                              snapshot.isDragging ? "bg-blue-100" : ""
                            }`}
                          >
                            <IoDocumentTextOutline size={34} />
                            <p className="text-lg">{element.name}</p>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                </div>
              )}
            </Droppable>

            <p className="mt-8 text-lg font-semibold">Advanced</p>
            <Droppable droppableId="ADVANCED_ELEMENTS" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-4"
                >
                  {advancedElements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex flex-row items-center gap-2 grow border border-dashed p-4 mb-2 ${
                            snapshot.isDragging ? "bg-blue-100" : ""
                          }`}
                        >
                          <IoDocumentTextOutline size={34} />
                          <p className="text-lg">{element.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>

          {/* middle panel */}
          <div className="w-3/5 min-h-full h-full overflow-auto  py-4">
            <div className="mt-1 border-b border-zinc-200 flex flex-row gap-2 justify-center items-center">
              <div className="border-t border-l border-r border-zinc-200 rounded-t-xl px-8 py-2">
                <p className="text-lg">Step 1</p>
              </div>
              <div className="border-t border-l border-r border-zinc-200 rounded-t-xl px-8 py-2">
                <p className="text-lg">Step 2</p>
              </div>
              <GoPlus size={28} color="#71717a" />
            </div>

            <div className="px-10 h-full space-y-3">
              <Input
                size="large"
                variant="borderless"
                defaultValue="Untitled Form"
                placeholder="Enter form title"
                className="mt-4"
              />
              <Droppable droppableId="DROP_AREA">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="h-full"
                  >
                    {droppedItems.length > 0 ? (
                      <div className=" border-2 border-dashed p-4 mt-4 rounded-lg">
                        {droppedItems.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="hover:bg-zinc-100 p-2 mb-2"
                              >
                                {renderInputField(
                                  item,
                                  provided.dragHandleProps
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
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

                        {provided.placeholder}
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* right panel */}
          <RightPanel
            item={selectedItem}
            onUpdateItem={updateItem}
            setTabSelected={setTabSelected}
            tabSelected={tabSelected}
          />
        </div>
      </div>
      <Modal
        title="Select Element"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {allElements.map((element) => (
          <div
            key={element.id}
            className="flex flex-row items-center gap-2 border p-2 mb-2 cursor-pointer"
            onClick={() => handleOk(element)}
          >
            <IoDocumentTextOutline size={34} />
            <p className="text-lg">{element.name}</p>
          </div>
        ))}
      </Modal>
    </DragDropContext>
  );
};

export default Content;
