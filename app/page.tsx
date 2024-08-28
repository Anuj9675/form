'use client';
import { Todos } from "@/components/todos/todos";
import Form from "@/components/forms/form";
import Form1 from '@/components/forms/form1';
import { DatePicker } from "nextjs-ui-components";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 h-screen bg-gray-100"> {/* Full height with background color */}
        <Form />
      </div>
      <div className="flex-1 h-screen bg-gray-100">
        <Form1/>
      </div>
      <div className="flex-1 h-screen bg-gray-200"> {/* Full height with a different background color */}
        <Todos />
      </div>
      <div>
        <DatePicker/>
      </div>
    </div>
  );
}
