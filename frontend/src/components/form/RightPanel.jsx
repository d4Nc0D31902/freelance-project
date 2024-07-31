import React, { useEffect, useState } from "react";
import { Checkbox, ColorPicker, Input, Select } from "antd";
import { AiOutlineFontSize } from "react-icons/ai";
import { RxFontItalic } from "react-icons/rx";
import { RxFontBold } from "react-icons/rx";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { PiPencilSimpleLine } from "react-icons/pi";

const RightPanel = ({ item, onUpdateItem, setTabSelected, tabSelected }) => {
  const [data, setData] = useState(item);

  useEffect(() => {
    setData(item);
  }, [item]);

  const handleNameChange = (e) => {
    const updatedItem = { ...data, name: e.target.value };
    setData(updatedItem);
    onUpdateItem(updatedItem);

    console.log(updatedItem, "update item");
  };

  const handlePlaceholderChange = (e) => {
    const updatedItem = { ...data, placeholder: e.target.value };
    setData(updatedItem);
    onUpdateItem(updatedItem);
  };

  return (
    <div className="w-1/5 border-l border-neutral-900 h-full">
      <div className="flex flex-row border-b boder-zinc-300">
        <a
          className={`flex items-center justify-center grow p-3 ${
            tabSelected === "General" ? "bg-neutral-200" : ""
          } hover:bg-neutral-100`}
          onClick={() => setTabSelected("General")}
        >
          General
        </a>
        <a
          className={`flex items-center justify-center grow p-3 ${
            tabSelected === "Selection" ? "bg-neutral-200" : ""
          } hover:bg-neutral-100`}
          onClick={() => setTabSelected("Selection")}
        >
          Selection
        </a>
      </div>

      {tabSelected === "General" ? (
        <div className="flex flex-col gap-8 mt-10 px-6">
          {/* general tab */}

          {/* Essentials */}
          <div className="space-y-3">
            <div>
              <p className="font-semibold">Essentials</p>
            </div>

            <div className="space-y-2">
              <div className="space-y-1 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Label Color</p>
                <ColorPicker defaultValue="#000000" size="small" showText />
              </div>

              <div className="space-y-1 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Border Color</p>
                <ColorPicker defaultValue="#000000" size="small" showText />
              </div>

              <div className="space-y-1 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Placeholder Color</p>
                <ColorPicker defaultValue="#000000" size="small" showText />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-3 mb-4">
            <div>
              <p className="font-semibold">Appearance</p>
            </div>

            <div className="space-y-2">
              <div className="border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Font Style</p>

                <div className="flex flex-row items-center">
                  <AiOutlineFontSize size={18} />
                  <Select
                    placeholder="Helvetica Neue"
                    style={{
                      width: "100%",
                    }}
                    variant="borderless"
                    size="large"
                    options={[
                      {
                        value: "Helvetica Neue",
                        label: "Helvetica Neue",
                      },
                      {
                        value: "test",
                        label: "test",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div className="flex-1 border-b border-neutral-200 py-2">
                  <p className="text-xs text-neutral-500">Font Weight</p>

                  <div className="flex flex-row items-center">
                    <RxFontBold size={18} />
                    <Select
                      placeholder="Select Weight"
                      variant="borderless"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={[
                        {
                          value: "Bold",
                          label: "Bold",
                        },
                        {
                          value: "Semibold",
                          label: "Semibold",
                        },
                        {
                          value: "Normal",
                          label: "Normal",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex-1 border-b border-neutral-200 py-2">
                  <p className="text-xs text-neutral-500">Styling</p>

                  <div className="flex flex-row items-center">
                    <RxFontItalic size={18} />
                    <Select
                      placeholder="Select Styling"
                      variant="borderless"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      options={[
                        {
                          value: "Italics",
                          label: "Italics",
                        },
                        {
                          value: "Normal",
                          label: "Normal",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Text Alignment</p>

                <div className="flex flex-row gap-4 py-1">
                  <FaAlignLeft size={18} />
                  <FaAlignJustify size={18} />
                  <FaAlignRight size={18} />
                </div>
              </div>

              <div className="space-y-2 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Font Color</p>
                <ColorPicker defaultValue="#000000" size="small" showText />
              </div>

              <div className="space-y-2 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">Required Field Text</p>
                <ColorPicker defaultValue="#000000" size="small" showText />
              </div>

              <div className="space-y-1 border-b border-neutral-200 py-2">
                <p className="text-xs text-neutral-500">
                  Required Field Text <span className="text-red-500">*</span>
                </p>

                <div className="flex flex-row items-center">
                  <Input
                    variant="borderless"
                    placeholder="Your name is required"
                  />

                  <PiPencilSimpleLine size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 mt-10 px-6">
          {data ? (
            <>
              {/* selection tab */}

              {/* Advanced */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold">Advanced</p>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-row items-center gap-2 border-b border-neutral-200 py-2">
                    <Checkbox />

                    <p className="text-normal ">Required Field</p>
                  </div>

                  <div className="space-y-2 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">
                      Required Field Text
                    </p>
                    <ColorPicker defaultValue="#000000" size="small" showText />
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">
                      Label Name
                      <span className="text-red-500"> *</span>
                    </p>

                    <div className="flex flex-row items-center">
                      <Input
                        variant="borderless"
                        placeholder="Enter label name"
                        value={data?.name || ""}
                        onChange={handleNameChange}
                      />

                      <PiPencilSimpleLine size={18} />
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">
                      Placeholder Text
                      <span className="text-red-500"> *</span>
                    </p>

                    <div className="flex flex-row items-center">
                      <Input
                        variant="borderless"
                        placeholder="Your name is required"
                        value={data?.placeholder || ""}
                        onChange={handlePlaceholderChange}
                      />

                      <PiPencilSimpleLine size={18} />
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">
                      Required Field Text{" "}
                      <span className="text-red-500">*</span>
                    </p>

                    <div className="flex flex-row items-center">
                      <Input
                        variant="borderless"
                        placeholder="Your name is required"
                      />

                      <PiPencilSimpleLine size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold">Appearance</p>
                </div>

                <div className="space-y-2">
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Font Style</p>

                    <div className="flex flex-row items-center">
                      <AiOutlineFontSize size={18} />
                      <Select
                        placeholder="Helvetica Neue"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "Helvetica Neue",
                            label: "Helvetica Neue",
                          },
                          {
                            value: "test",
                            label: "test",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="flex-1 border-b border-neutral-200 py-2">
                      <p className="text-xs text-neutral-500">Font Weight</p>

                      <div className="flex flex-row items-center">
                        <RxFontBold size={18} />
                        <Select
                          placeholder="Select Weight"
                          variant="borderless"
                          size="large"
                          style={{
                            width: "100%",
                          }}
                          options={[
                            {
                              value: "Bold",
                              label: "Bold",
                            },
                            {
                              value: "Semibold",
                              label: "Semibold",
                            },
                            {
                              value: "Normal",
                              label: "Normal",
                            },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex-1 border-b border-neutral-200 py-2">
                      <p className="text-xs text-neutral-500">Styling</p>

                      <div className="flex flex-row items-center">
                        <RxFontItalic size={18} />
                        <Select
                          placeholder="Select Styling"
                          variant="borderless"
                          size="large"
                          style={{
                            width: "100%",
                          }}
                          options={[
                            {
                              value: "Italics",
                              label: "Italics",
                            },
                            {
                              value: "Normal",
                              label: "Normal",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Text Alignment</p>

                    <div className="flex flex-row gap-4 py-1">
                      <FaAlignLeft size={18} />
                      <FaAlignJustify size={18} />
                      <FaAlignRight size={18} />
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Font Color</p>
                    <ColorPicker defaultValue="#000000" size="small" showText />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p>No element selected. Please choose an element to proceed.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightPanel;
