"use client";
import React, { useState } from "react";
import { Template } from "../../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: Template;
  userFormInput?:any,
  loading?:boolean
}

function FormSection({ selectedTemplate,userFormInput,loading }: PROPS) {
    const [formData, setFormData] = useState<any>({});
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => {
            if (value === "") {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            }
            return { ...prev, [name]: value };
        });
    };

    const onSubmit =(e:any) =>{
        e.preventDefault();
        userFormInput(formData)
    }

  return (
    <div className="p-5 shadow-md border rounded-lg max-w-md mx-auto bg-white">
      {/* @ts-ignore */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src={selectedTemplate?.icon || "/logo.svg"}
          alt="icon"
          width={70}
          height={70}
          className="mb-2"
        />
        <h2 className="font-bold text-2xl mb-1 text-blue-700 text-center">
          {selectedTemplate?.name}
        </h2>
        <p className="text-gray-800 text-sm text-center mb-4">
          {selectedTemplate?.desc}
        </p>
      </div>
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="mb-1 font-bold text-gray-700">
              {item.label}
            </label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
                value={formData?.[item.name] || ""}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
                value={formData?.[item.name] || ""}
              />
            ) : null}
          </div>
        ))}
        <Button className="w-full p-6 bg-blue-700 hover:bg-blue-600 cursor-pointer" type="submit" disabled={loading}> {loading&&<Loader2Icon className='animate-spin h-5 w-5 text-white'/>} Generate Content</Button>
      </form>
    </div>
  );
}

export default FormSection;
