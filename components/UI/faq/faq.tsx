import { FC } from "react";
import { FAQ } from "../../../types/faq/types";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PlusIcon from "../iconsComponents/icons/plusIcon";

interface FaqBoardProps {
  faq: FAQ[];
}

export const FaqBoard: FC<FaqBoardProps> = ({ faq }) => {
  return (
    <div className="w-full max-w-[1184px]  mx-auto bg-[#FEF7F1] rounded-lg p-8 overflow-hidden">
      
      
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2 mt-4">Find quick answers</p>
        <h1 className="text-3xl font-extrabold text-center">FREQUENTLY ASKED QUESTION</h1>
      </div>

      <div className="space-y-6 shadow-[0px_14px_39px_0px_rgba(0,0,0,0.1)] px-[24px] pt-[24px]">
        {faq.map((faq, index) => (
          <Accordion
            key={index}
            className="bg-transparent shadow-none before:hidden"
            disableGutters={true}
            square
          >
            <AccordionSummary
              expandIcon={
                <div className="w-6 h-6 flex items-center justify-center border border-gray-600 rounded-md ">
                  <PlusIcon width="10" />
                </div>
              }
              className="p-0 hover:bg-transparent min-h-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-800 min-w-[40px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-lg font-medium text-gray-800">{faq.question}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails className="pl-[64px] pt-2 pb-4">
              <p className="text-gray-600">{faq.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};


