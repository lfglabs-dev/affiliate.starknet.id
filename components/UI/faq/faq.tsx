import { FC } from "react";
import { FAQ } from "../../../types/faq/types";
import helper from "../../../styles/components/helper.module.css";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PlusIcon from "../iconsComponents/icons/plusIcon";

interface FaqBoardProps {
  faq: FAQ[];
}

export const FaqBoard: FC<FaqBoardProps> = ({ faq }) => {
  return (
    <div className="flex flex-col justify-center items-start p-4">
      <p>Frequently asked question</p>
      {faq.map((faq, index) => (
        <Accordion key={faq.question} disableGutters={true}>
          <AccordionSummary expandIcon={<PlusIcon width="16" />}>
            <div className="flex flex-row justify-start items-center">
              <p className="text-sm">{`0${index + 1}`}</p>
              <p className="text-sm ml-2 text-left">{faq.question}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-sm text-left">{faq.answer}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}