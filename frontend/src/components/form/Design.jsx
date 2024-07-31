import React, { useState } from "react";
import FormStepper from "../Stepper/FormStepper";
import { GoChevronLeft } from "react-icons/go";
import { ColorPicker, Input, Select, Radio } from "antd";
import { AiOutlineFontSize } from "react-icons/ai";
import { RxFontItalic } from "react-icons/rx";
import { RxFontBold } from "react-icons/rx";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { PiPencilSimpleLine } from "react-icons/pi";
import { FiLayout } from "react-icons/fi";

const Design = () => {
  const [rightPanel, setRightPanel] = useState("Templates");

  return (
    <div className="flex flex-col bg-white h-screen">
      {/* Navbar */}
      <div className="flex flex-row items-center justify-between p-4 border-b border-neutral-900">
        <div className="flex flex-row items-center gap-1">
          <GoChevronLeft size={38} />
          <p className="text-3xl">Create</p>
        </div>

        <div>
          <FormStepper />
        </div>

        <div className="flex items-center bg-neutral-400 px-10 py-2 rounded-full">
          <p className="">Next</p>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* left panel */}
        <div className="w-4/5 bg-neutral-200 py-8 px-6">
          {/* form */}
          <div className="h-5/6 w-2/5">
            <div className="flex flex-row gap-1">
              <div className="bg-white rounded-t-lg px-6 py-2 border-b">
                Step 1
              </div>
              <div className="bg-white rounded-t-lg px-6 py-2 border-b">
                Step 2
              </div>
            </div>

            <div className="bg-white p-8 space-y-4 rounded-r-lg rounded-b-lg">
              <div>
                <p>Untitled Form</p>
              </div>

              <div className="flex flex-row gap-2">
                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-400">First Name</p>
                  <Input size="large" placeholder="ex: Juan" className="p-3" />
                </div>

                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-400">Last Name</p>
                  <Input
                    size="large"
                    placeholder="ex: Dela Cruz"
                    className="p-3"
                  />
                </div>
              </div>

              <div>
                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-400">Email</p>
                  <Input
                    size="large"
                    placeholder="ex: juandelacruz@gmail.com"
                    className="p-3"
                  />
                </div>
              </div>

              <div>
                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-400">Phone</p>
                  <Input
                    size="large"
                    placeholder="ex: juandelacruz@gmail.com"
                    className="p-3"
                  />
                </div>
              </div>

              <div>
                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-400">Instagram Tag</p>
                  <Input
                    size="large"
                    placeholder="ex: juandelacruz@gmail.com"
                    className="p-3"
                  />
                </div>
              </div>

              <div>
                <div className="space-y-1 grow">
                  <p className="text-xs text-neutral-500">Category</p>

                  <Select
                    placeholder="Select Category"
                    style={{
                      width: "100%",
                      height: "50px",
                    }}
                    size="large"
                    options={[
                      {
                        value: "Dog",
                        label: "Dog",
                      },
                      {
                        value: "Cat",
                        label: "Cat",
                      },
                    ]}
                  />
                </div>
              </div>

              <div>
                <div className="space-y-2 grow">
                  <p className="text-xs text-neutral-500">Radio</p>

                  <Radio.Group>
                    <Radio value={1}>Selection A</Radio>
                    <Radio value={2}>Selection B</Radio>
                    <Radio value={3}>Selection C</Radio>
                    <Radio value={4}>Selection D</Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className="flex flex-row justify-end pt-3">
                <div className="border border-neutral-500 w-fit px-8 py-2 rounded-full">
                  <p>Submit</p>
                </div>
              </div>
            </div>
          </div>

          {/* background image */}
          <div></div>
        </div>

        {/* right panel */}
        <div className="w-1/5 border-l border-neutral-900 h-full">
          <div className="flex flex-row border border-neutral-200">
            <a
              className="flex items-center justify-center grow p-3 bg-neutral-200 hover:bg-neutral-100"
              onClick={() => setRightPanel("Templates")}
            >
              Templates
            </a>
            <button
              className="flex items-center justify-center grow p-3 bg-white hover:bg-neutral-100"
              onClick={() => setRightPanel("Settings")}
            >
              Settings
            </button>
          </div>

          {rightPanel === "Templates" ? (
            <div className="flex flex-col gap-8 py-4 px-6">
              {/* Layouts */}
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">Layouts</p>
                </div>

                <div className="space-y-3">
                  <div className="border border-neutral-200">
                    <img
                      src="/images/template-1.png"
                      alt="Template 1"
                      width="100%"
                    />
                  </div>
                  <div className="border border-neutral-200">
                    <img
                      src="/images/template-2.png"
                      alt="Template 1"
                      width="100%"
                    />
                  </div>
                  <div className="border border-neutral-200">
                    <img
                      src="/images/template-3.png"
                      alt="Template 1"
                      width="100%"
                    />
                  </div>
                </div>
              </div>

              {/* Background images */}
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">Background images</p>
                </div>

                <div className="grid grid-cols-2 grid-rows-1 gap-2">
                  <div className="bg-neutral-300 h-24 rounded"></div>
                  <div className="bg-neutral-300 h-24 rounded"></div>
                  <div className="bg-neutral-300 h-24 rounded"></div>
                  <div className="bg-neutral-300 h-24 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 py-4 px-6 ">
              {/* Essentials */}
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">General</p>
                </div>

                <div className="space-y-2">
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Layout</p>

                    <div className="flex flex-row items-center">
                      <FiLayout size={18} />
                      <Select
                        placeholder="Select Layout"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "Default Layout",
                            label: "Default Layout",
                          },
                          {
                            value: "test",
                            label: "test",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Background Color</p>
                    <ColorPicker defaultValue="#000000" size="small" showText />
                  </div>
                </div>
              </div>

              {/* Background */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold">Background</p>
                </div>

                <div className="space-y-2">
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">
                      Background Sizing
                    </p>

                    <div className="flex flex-row items-center">
                      <Select
                        placeholder="Select Sizing"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "Center Right",
                            label: "Center Right",
                          },
                          {
                            value: "Center Left",
                            label: "Center Left",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Cover</p>

                    <div className="flex flex-row items-center">
                      <Select
                        placeholder="Select Cover"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "Contain",
                            label: "Contain",
                          },
                          {
                            value: "Cover",
                            label: "Cover",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Repeat</p>

                    <div className="flex flex-row items-center">
                      <Select
                        placeholder="Select Sizing"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "No-Repeat",
                            label: "No-Repeat",
                          },
                          {
                            value: "Repeat",
                            label: "Repeat",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Background */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold">Step Styling</p>
                </div>

                <div className="space-y-2">
                  <div className="border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Step Layout</p>

                    <div className="flex flex-row items-center">
                      <Select
                        placeholder="Select Step Layout"
                        style={{
                          width: "100%",
                        }}
                        variant="borderless"
                        size="large"
                        options={[
                          {
                            value: "Left",
                            label: "Left",
                          },
                          {
                            value: "Center",
                            label: "Center",
                          },
                          {
                            value: "Right",
                            label: "Right",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Tab Color</p>
                    <ColorPicker defaultValue="#000000" size="small" showText />
                  </div>

                  <div className="space-y-1 border-b border-neutral-200 py-2">
                    <p className="text-xs text-neutral-500">Background Color</p>
                    <ColorPicker defaultValue="#000000" size="small" showText />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Design;
